"""Extract reviewable visual candidates from a private scanned PDF.

This is deliberately conservative: it creates private figure/table candidates
with page, bounding-box, OCR, and provenance metadata. It never claims that a
candidate is understood or safe to publish.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

import cv2
import numpy as np
from PIL import Image
from pypdf import PdfReader


REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
EXTRACTOR_ID = "opencv-ocr-layout"
EXTRACTOR_VERSION = 1


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def atomic_write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    temporary.write_text(content, encoding="utf-8", newline="\n")
    temporary.replace(path)


def write_json(path: Path, value: object) -> None:
    atomic_write(path, json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def write_jsonl(path: Path, values: Iterable[dict]) -> None:
    content = "\n".join(json.dumps(value, ensure_ascii=False) for value in values)
    atomic_write(path, content + ("\n" if content else ""))


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def parse_pages(specification: str, maximum: int) -> list[int]:
    if specification.strip().lower() in {"all", "alle", "*"}:
        return list(range(1, maximum + 1))
    pages: set[int] = set()
    for part in specification.split(","):
        token = part.strip()
        if not token:
            continue
        if "-" in token:
            start, end = map(int, token.split("-", 1))
            pages.update(range(start, end + 1))
        else:
            pages.add(int(token))
    invalid = sorted(page for page in pages if page < 1 or page > maximum)
    if invalid:
        raise ValueError(f"Seiten außerhalb 1-{maximum}: {invalid[:8]}")
    return sorted(pages)


def load_rapidocr(text_score: float):
    try:
        import onnxruntime
        import rapidocr
        from rapidocr import RapidOCR
    except Exception as error:
        raise RuntimeError(
            "RapidOCR fehlt im privaten OCR-Runtime-Pfad. Führe zuerst npm run knowledge:install-ocr aus."
        ) from error
    engine = RapidOCR(params={"Rec.lang_type": "german", "Global.text_score": text_score})
    version = f"RapidOCR {getattr(rapidocr, '__version__', 'unbekannt')} / ONNX Runtime {onnxruntime.__version__}"
    return engine, version


def orient_image(image: Image.Image, rotation: int) -> Image.Image:
    image = image.convert("RGB")
    rotation = rotation % 360
    if rotation == 90:
        return image.transpose(Image.Transpose.ROTATE_270)
    if rotation == 180:
        return image.transpose(Image.Transpose.ROTATE_180)
    if rotation == 270:
        return image.transpose(Image.Transpose.ROTATE_90)
    return image


def page_image(page) -> Image.Image:
    images = list(page.images)
    if len(images) != 1:
        raise RuntimeError(f"Erwartet wurde genau ein vollflächiges Scanbild, gefunden: {len(images)}")
    return orient_image(images[0].image, int(page.rotation or 0))


def ocr_lines(engine, rgb: np.ndarray) -> list[dict]:
    result = engine(rgb)
    texts = getattr(result, "txts", None)
    boxes = getattr(result, "boxes", None)
    scores = getattr(result, "scores", None)
    if not texts or boxes is None:
        return []
    lines = []
    for index, (box, text) in enumerate(zip(boxes, texts)):
        value = str(text).strip()
        if not value:
            continue
        points = [[float(point[0]), float(point[1])] for point in box]
        xs = [point[0] for point in points]
        ys = [point[1] for point in points]
        lines.append(
            {
                "text": value,
                "score": round(float(scores[index]), 4) if scores is not None and index < len(scores) else None,
                "polygon": points,
                "bbox": [min(xs), min(ys), max(xs), max(ys)],
            }
        )
    lines.sort(key=lambda item: (round(item["bbox"][1] / 8), item["bbox"][0]))
    return lines


def rect_iou(left: tuple[int, int, int, int], right: tuple[int, int, int, int]) -> float:
    lx1, ly1, lx2, ly2 = left
    rx1, ry1, rx2, ry2 = right
    ix1, iy1 = max(lx1, rx1), max(ly1, ry1)
    ix2, iy2 = min(lx2, rx2), min(ly2, ry2)
    intersection = max(0, ix2 - ix1) * max(0, iy2 - iy1)
    if not intersection:
        return 0.0
    union = (lx2 - lx1) * (ly2 - ly1) + (rx2 - rx1) * (ry2 - ry1) - intersection
    return intersection / max(union, 1)


def contains_center(outer: tuple[int, int, int, int], inner: list[float]) -> bool:
    x1, y1, x2, y2 = outer
    center_x = (inner[0] + inner[2]) / 2
    center_y = (inner[1] + inner[3]) / 2
    return x1 <= center_x <= x2 and y1 <= center_y <= y2


def merge_rectangles(rectangles: list[tuple[int, int, int, int]], width: int, height: int) -> list[tuple[int, int, int, int]]:
    merged = rectangles[:]
    changed = True
    gap_x = max(10, int(width * 0.012))
    gap_y = max(10, int(height * 0.012))
    while changed:
        changed = False
        result: list[tuple[int, int, int, int]] = []
        while merged:
            current = merged.pop(0)
            cx1, cy1, cx2, cy2 = current
            matched = None
            for index, other in enumerate(merged):
                ox1, oy1, ox2, oy2 = other
                expanded = (cx1 - gap_x, cy1 - gap_y, cx2 + gap_x, cy2 + gap_y)
                overlaps = not (expanded[2] < ox1 or ox2 < expanded[0] or expanded[3] < oy1 or oy2 < expanded[1])
                if overlaps and (rect_iou(current, other) > 0 or abs(cy1 - oy1) < gap_y or abs(cx1 - ox1) < gap_x):
                    matched = index
                    current = (min(cx1, ox1), min(cy1, oy1), max(cx2, ox2), max(cy2, oy2))
                    changed = True
                    break
            if matched is not None:
                merged.pop(matched)
                merged.insert(0, current)
            else:
                result.append(current)
        merged = result
    return sorted(merged, key=lambda item: (item[1], item[0]))


def detect_candidates(rgb: np.ndarray, lines: list[dict]) -> list[dict]:
    height, width = rgb.shape[:2]
    page_area = width * height
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    binary = cv2.threshold(gray, 225, 255, cv2.THRESH_BINARY_INV)[1]

    horizontal_size = max(30, width // 22)
    vertical_size = max(30, height // 28)
    horizontal = cv2.morphologyEx(binary, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (horizontal_size, 1)))
    vertical = cv2.morphologyEx(binary, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (1, vertical_size)))
    line_mask = cv2.bitwise_or(horizontal, vertical)
    line_mask = cv2.dilate(line_mask, cv2.getStructuringElement(cv2.MORPH_RECT, (9, 9)))

    text_mask = np.zeros_like(binary)
    for line in lines:
        polygon = np.array(line["polygon"], dtype=np.int32)
        x, y, w, h = cv2.boundingRect(polygon)
        pad_x = max(2, int(w * 0.015))
        pad_y = max(2, int(h * 0.12))
        cv2.rectangle(
            text_mask,
            (max(0, x - pad_x), max(0, y - pad_y)),
            (min(width - 1, x + w + pad_x), min(height - 1, y + h + pad_y)),
            255,
            -1,
        )
    residual = cv2.bitwise_and(binary, cv2.bitwise_not(text_mask))
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    saturation = cv2.threshold(hsv[:, :, 1], 24, 255, cv2.THRESH_BINARY)[1]
    visual = cv2.bitwise_or(residual, saturation)
    visual = cv2.morphologyEx(visual, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2)))
    visual = cv2.dilate(visual, cv2.getStructuringElement(cv2.MORPH_RECT, (13, 9)))
    visual = cv2.morphologyEx(visual, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_RECT, (31, 21)))

    table_rects: list[tuple[int, int, int, int]] = []
    contours, _ = cv2.findContours(line_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        area = w * h
        if w >= width * 0.22 and h >= height * 0.045 and area >= page_area * 0.012:
            table_rects.append((x, y, x + w, y + h))

    visual_rects: list[tuple[int, int, int, int]] = []
    contours, _ = cv2.findContours(visual, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        area = w * h
        if w < width * 0.14 or h < height * 0.045 or area < page_area * 0.008:
            continue
        if area > page_area * 0.78:
            continue
        if y < height * 0.055 and h < height * 0.09:
            continue
        if y > height * 0.91:
            continue
        visual_rects.append((x, y, x + w, y + h))

    merged = merge_rectangles(table_rects + visual_rects, width, height)
    candidates: list[dict] = []
    padding_x = max(8, int(width * 0.01))
    padding_y = max(8, int(height * 0.008))
    for rectangle in merged:
        x1, y1, x2, y2 = rectangle
        x1, y1 = max(0, x1 - padding_x), max(0, y1 - padding_y)
        x2, y2 = min(width, x2 + padding_x), min(height, y2 + padding_y)
        rectangle = (x1, y1, x2, y2)
        area_ratio = ((x2 - x1) * (y2 - y1)) / page_area
        if area_ratio > 0.82:
            continue
        matching_lines = [line for line in lines if contains_center(rectangle, line["bbox"])]
        has_table_lines = any(rect_iou(rectangle, table) > 0.35 for table in table_rects)
        crop_binary = binary[y1:y2, x1:x2]
        ink_density = float(np.count_nonzero(crop_binary)) / max(crop_binary.size, 1)
        if ink_density < 0.01 and not has_table_lines:
            continue
        kind = "table-candidate" if has_table_lines else "figure-candidate"
        confidence = 0.55 + min(area_ratio, 0.25) * 0.8
        if has_table_lines:
            confidence += 0.12
        if len(matching_lines) >= 2:
            confidence += 0.08
        candidates.append(
            {
                "bboxPx": [x1, y1, x2, y2],
                "bboxNormalized": [round(x1 / width, 6), round(y1 / height, 6), round(x2 / width, 6), round(y2 / height, 6)],
                "kindCandidate": kind,
                "confidence": round(min(confidence, 0.92), 3),
                "inkDensity": round(ink_density, 4),
                "ocrLines": matching_lines,
            }
        )

    # Prefer larger candidates when the heuristic creates nested near-duplicates.
    deduplicated: list[dict] = []
    for candidate in sorted(
        candidates,
        key=lambda item: -((item["bboxPx"][2] - item["bboxPx"][0]) * (item["bboxPx"][3] - item["bboxPx"][1])),
    ):
        rectangle = tuple(candidate["bboxPx"])
        if any(rect_iou(rectangle, tuple(existing["bboxPx"])) > 0.72 for existing in deduplicated):
            continue
        deduplicated.append(candidate)
    return sorted(deduplicated[:14], key=lambda item: (item["bboxPx"][1], item["bboxPx"][0]))


def dhash(image: Image.Image) -> str:
    reduced = image.convert("L").resize((9, 8), Image.Resampling.LANCZOS)
    pixels = np.asarray(reduced)
    bits = pixels[:, 1:] > pixels[:, :-1]
    value = 0
    for bit in bits.flatten():
        value = (value << 1) | int(bit)
    return f"{value:016x}"


def table_grid_evidence(image_path: Path) -> dict:
    """Return conservative grid evidence; framed photos must not become tables."""
    image = cv2.imread(str(image_path), cv2.IMREAD_GRAYSCALE)
    if image is None:
        return {"horizontalLines": 0, "verticalLines": 0, "intersections": 0, "isGrid": False}
    height, width = image.shape
    binary = cv2.threshold(image, 220, 255, cv2.THRESH_BINARY_INV)[1]
    horizontal = cv2.morphologyEx(
        binary,
        cv2.MORPH_OPEN,
        cv2.getStructuringElement(cv2.MORPH_RECT, (max(20, width // 5), 1)),
    )
    vertical = cv2.morphologyEx(
        binary,
        cv2.MORPH_OPEN,
        cv2.getStructuringElement(cv2.MORPH_RECT, (1, max(20, height // 5))),
    )
    horizontal_contours, _ = cv2.findContours(horizontal, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    vertical_contours, _ = cv2.findContours(vertical, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    horizontal_lines = sum(cv2.boundingRect(item)[2] >= width * 0.35 for item in horizontal_contours)
    vertical_lines = sum(cv2.boundingRect(item)[3] >= height * 0.2 for item in vertical_contours)
    intersections = int(np.count_nonzero(cv2.bitwise_and(horizontal, vertical)))
    is_grid = horizontal_lines >= 3 and vertical_lines >= 2 and intersections >= 12
    return {
        "horizontalLines": horizontal_lines,
        "verticalLines": vertical_lines,
        "intersections": intersections,
        "isGrid": is_grid,
    }


def source_pdf(manifest: dict, source_root: Path) -> tuple[Path, str]:
    if manifest.get("primaryPdf"):
        return source_root / "raw" / manifest["primaryPdf"], "pdf-original"
    pdfs = [item for item in manifest.get("representations", []) if item.get("kind", "").startswith("pdf")]
    if not pdfs:
        raise FileNotFoundError("Keine PDF-Repräsentation im Manifest.")
    return source_root / pdfs[0]["localPath"], pdfs[0].get("id", "pdf-original")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extrahiert private Grafik- und Tabellenkandidaten aus einer Scan-PDF.")
    parser.add_argument("--source-id", required=True)
    parser.add_argument("--pages", default="all", help="Seiten, z. B. 1,5-8 oder all")
    parser.add_argument("--text-score", type=float, default=0.45)
    parser.add_argument("--force", action="store_true", help="Ausgewählte Seiten neu analysieren")
    parser.add_argument("--max-candidates-per-page", type=int, default=14)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not 0 <= args.text_score <= 1:
        raise ValueError("--text-score muss zwischen 0 und 1 liegen.")
    if args.max_candidates_per_page < 1 or args.max_candidates_per_page > 30:
        raise ValueError("--max-candidates-per-page muss zwischen 1 und 30 liegen.")
    source_root = (LOCAL_ROOT / args.source_id).resolve()
    if LOCAL_ROOT.resolve() not in source_root.parents:
        raise ValueError("Ungültige Quellen-ID außerhalb der lokalen Wissensbasis.")
    manifest_path = source_root / "manifest.json"
    if not manifest_path.is_file():
        raise FileNotFoundError(f"Manifest fehlt: {manifest_path}")
    manifest = read_json(manifest_path)
    pdf_path, representation_id = source_pdf(manifest, source_root)
    if not pdf_path.is_file():
        raise FileNotFoundError(f"PDF fehlt: {pdf_path}")
    pdf_hash = sha256_file(pdf_path)
    reader = PdfReader(str(pdf_path))
    selected_pages = parse_pages(args.pages, len(reader.pages))

    layout_root = source_root / "layout"
    page_layout_root = layout_root / "pages"
    figures_root = source_root / "figures" / "original"
    progress_path = layout_root / "progress.json"
    progress = read_json(progress_path) if progress_path.exists() else {"pages": {}}
    configuration = {
        "extractor": EXTRACTOR_ID,
        "version": EXTRACTOR_VERSION,
        "textScore": args.text_score,
        "maxCandidatesPerPage": args.max_candidates_per_page,
    }
    configuration_hash = sha256_bytes(json.dumps(configuration, sort_keys=True).encode("utf-8"))
    if progress and progress.get("pdfSha256") not in {None, pdf_hash}:
        raise RuntimeError("PDF-Hash hat sich seit der Layoutanalyse geändert.")
    if progress and progress.get("configurationHash") not in {None, configuration_hash} and not args.force:
        raise RuntimeError("Layout-Konfiguration hat sich geändert. Nutze --force --pages all.")
    progress.update(
        {
            "version": 1,
            "sourceId": args.source_id,
            "pdfSha256": pdf_hash,
            "representationId": representation_id,
            "configuration": configuration,
            "configurationHash": configuration_hash,
            "updatedAt": utc_now(),
        }
    )
    progress.setdefault("pages", {})
    if args.force:
        for page_number in selected_pages:
            progress["pages"].pop(str(page_number), None)

    completed_selected = [
        page for page in selected_pages if progress["pages"].get(str(page), {}).get("status") == "completed"
    ]
    print(
        f"Quelle {args.source_id}: {len(selected_pages)} ausgewählt, {len(completed_selected)} bereits fertig, "
        f"{len(selected_pages) - len(completed_selected)} offen."
    )
    engine = None
    engine_version = progress.get("ocrEngine")
    if len(completed_selected) != len(selected_pages):
        engine, engine_version = load_rapidocr(args.text_score)
        progress["ocrEngine"] = engine_version

    for page_number in selected_pages:
        existing = progress["pages"].get(str(page_number), {})
        if existing.get("status") == "completed" and not args.force:
            continue
        try:
            image = page_image(reader.pages[page_number - 1])
            rgb = np.asarray(image)
            lines = ocr_lines(engine, rgb)
            candidates = detect_candidates(rgb, lines)[: args.max_candidates_per_page]
            page_records = []
            for index, candidate in enumerate(candidates, start=1):
                x1, y1, x2, y2 = candidate["bboxPx"]
                crop = image.crop((x1, y1, x2, y2))
                kind_token = "table" if candidate["kindCandidate"] == "table-candidate" else "figure"
                filename = f"page-{page_number:04d}-{kind_token}-{index:02d}.png"
                output_path = figures_root / filename
                output_path.parent.mkdir(parents=True, exist_ok=True)
                temporary = output_path.with_name(f".{output_path.name}.{os.getpid()}.tmp.png")
                crop.save(temporary, format="PNG", optimize=True)
                temporary.replace(output_path)
                data = output_path.read_bytes()
                ocr_text = "\n".join(line["text"] for line in candidate["ocrLines"])
                figure_id = f"{args.source_id}:layout:{page_number:04d}:{index:02d}"
                page_records.append(
                    {
                        "sourceId": args.source_id,
                        "figureId": figure_id,
                        "representationId": representation_id,
                        "sourcePdfSha256": pdf_hash,
                        "pdfPage": page_number,
                        "pageNumber": page_number,
                        "bboxPx": candidate["bboxPx"],
                        "bboxNormalized": candidate["bboxNormalized"],
                        "assetPath": output_path.relative_to(source_root).as_posix(),
                        "sourceAssetPath": output_path.relative_to(source_root).as_posix(),
                        "sha256": sha256_bytes(data),
                        "perceptualHash": dhash(crop),
                        "bytes": len(data),
                        "format": "png",
                        "width": crop.width,
                        "height": crop.height,
                        "kindCandidate": candidate["kindCandidate"],
                        "confidence": candidate["confidence"],
                        "inkDensity": candidate["inkDensity"],
                        "heading": f"{candidate['kindCandidate']} auf PDF-Seite {page_number}",
                        "contextText": ocr_text[:3000],
                        "ocrStatus": "completed" if ocr_text else "empty",
                        "ocrTextCharacters": len(ocr_text),
                        "ocrEngine": engine_version,
                        "searchText": re.sub(r"\s+", " ", ocr_text).strip(),
                        "rightsStatus": "private-source-only",
                        "reviewStatus": "needs-manual-review",
                        "understandingStatus": "machine-context-only" if ocr_text else "unclassified",
                        "remakeRecommendation": "review-for-redraw",
                        "derivedAsset": False,
                        "producer": {
                            "extractor": EXTRACTOR_ID,
                            "version": EXTRACTOR_VERSION,
                            "configurationHash": configuration_hash,
                        },
                    }
                )
            write_jsonl(page_layout_root / f"page-{page_number:04d}.jsonl", page_records)
            progress["pages"][str(page_number)] = {
                "status": "completed",
                "candidates": len(page_records),
                "completedAt": utc_now(),
            }
            print(f"Layout: Seite {page_number} - {len(page_records)} Kandidat(en)")
        except Exception as error:
            progress["pages"][str(page_number)] = {
                "status": "failed",
                "error": str(error)[:1600],
                "failedAt": utc_now(),
            }
            print(f"FEHLER: Seite {page_number} - {error}", file=sys.stderr)
        progress["updatedAt"] = utc_now()
        write_json(progress_path, progress)

    page_files = sorted(page_layout_root.glob("page-*.jsonl"))
    figures = [record for path in page_files for record in read_jsonl(path)]
    figures.sort(key=lambda item: (item["pageNumber"], item["bboxPx"][1], item["bboxPx"][0], item["figureId"]))
    first_by_hash: dict[str, str] = {}
    for figure in figures:
        figure["pageReferenceStatus"] = "matched"
        if figure.get("kindCandidate") == "table-candidate":
            evidence = table_grid_evidence(source_root / figure["assetPath"])
            figure["tableGridEvidence"] = evidence
            if not evidence["isGrid"]:
                figure["kindCandidate"] = "figure-candidate"
                figure["heading"] = f"figure-candidate auf PDF-Seite {figure['pageNumber']}"
        duplicate_of = first_by_hash.get(figure["sha256"])
        figure["duplicateOf"] = duplicate_of
        if not duplicate_of:
            first_by_hash[figure["sha256"]] = figure["figureId"]
    write_jsonl(source_root / "figures.jsonl", figures)
    table_candidates = [item for item in figures if item["kindCandidate"] == "table-candidate"]
    write_jsonl(source_root / "table-candidates.jsonl", table_candidates)

    original_assets = [item for item in read_jsonl(source_root / "assets.jsonl") if item.get("type") == "pdf"]
    derived_assets = [
        {
            "path": item["assetPath"],
            "bytes": item["bytes"],
            "sha256": item["sha256"],
            "type": "png",
            "sourceId": args.source_id,
            "pdfPage": item["pageNumber"],
            "bboxNormalized": item["bboxNormalized"],
            "extractionMethod": EXTRACTOR_ID,
        }
        for item in figures
    ]
    write_jsonl(source_root / "assets.jsonl", original_assets + derived_assets)

    completed = {
        int(page_number)
        for page_number, record in progress["pages"].items()
        if record.get("status") == "completed"
    }
    failed = {
        int(page_number)
        for page_number, record in progress["pages"].items()
        if record.get("status") == "failed"
    }
    summary = {
        "sourceId": args.source_id,
        "status": "machine-cataloged-needs-review" if len(completed) == len(reader.pages) and not failed else "in-progress",
        "pages": len(reader.pages),
        "pagesAnalyzed": len(completed),
        "failedPages": sorted(failed),
        "figures": len(figures),
        "tableCandidates": len(table_candidates),
        "duplicateOccurrences": sum(bool(item.get("duplicateOf")) for item in figures),
        "ocrCompleted": len(figures),
        "needsManualReview": len(figures),
        "redrawCandidates": len(figures),
    }
    write_json(source_root / "figure-catalog.json", summary)

    representations = [
        item
        for item in manifest.get("representations", [])
        if item.get("id") not in {"pdf-original", "ocr-rapidocr", "layout-candidates"}
    ]
    representations.extend(
        [
            {
                "id": "pdf-original",
                "kind": "pdf-scan",
                "localPath": pdf_path.relative_to(source_root).as_posix(),
                "pagesIndex": "pages.jsonl",
                "pages": len(reader.pages),
                "sha256": pdf_hash,
                "visualAuthority": "primary",
                "extractionStatus": "ocr-ready" if manifest.get("stats", {}).get("extractionStatus") == "ocr-ready" else "ocr-required",
            },
            {
                "id": "ocr-rapidocr",
                "kind": "ocr-text",
                "pages": int(manifest.get("stats", {}).get("ocrPages", 0)),
                "textPages": int(manifest.get("stats", {}).get("textPages", 0)),
                "engine": manifest.get("ocr", {}).get("engineVersion"),
                "extractionStatus": manifest.get("stats", {}).get("extractionStatus"),
                "textAuthority": "derived",
            },
            {
                "id": "layout-candidates",
                "kind": "visual-candidates",
                "pages": len(completed),
                "figures": len(figures),
                "tableCandidates": len(table_candidates),
                "extractionStatus": summary["status"],
            },
        ]
    )
    manifest["representations"] = representations
    manifest["figureCatalog"] = {
        "path": "figures.jsonl",
        "summaryPath": "figure-catalog.json",
        "tableCandidatesPath": "table-candidates.jsonl",
        "status": summary["status"],
        "rightsStatus": "private-source-only",
    }
    stats = manifest.setdefault("stats", {})
    stats["images"] = len(figures)
    stats["figures"] = len(figures)
    stats["tableCandidates"] = len(table_candidates)
    stats["figureOcrCompleted"] = len(figures)
    stats["layoutPages"] = len(completed)
    write_json(manifest_path, manifest)
    print(
        f"Layoutkatalog: {len(completed)}/{len(reader.pages)} Seiten, {len(figures)} Grafikobjekte, "
        f"{len(table_candidates)} Tabellenkandidaten, Status {summary['status']}"
    )


if __name__ == "__main__":
    try:
        main()
    except (FileNotFoundError, RuntimeError, ValueError, json.JSONDecodeError) as error:
        print(f"Layoutanalyse nicht abgeschlossen: {error}", file=sys.stderr)
        raise SystemExit(1) from error
