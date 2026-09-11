"""Build a private, page-aware figure catalog from imported source assets."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path
from typing import Iterable
from urllib.parse import unquote

from PIL import Image


REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
SOURCE_CATALOG_PATH = REPO_ROOT / "content" / "sources.json"
IMAGE_REFERENCE = re.compile(r"!\[[^\]]*\]\(([^)\s]+)(?:\s+['\"].*?['\"])?\)")
PAGE_IN_FILENAME = re.compile(r"(?:^|/)_page_(\d+)_", re.IGNORECASE)
HEADING = re.compile(r"^(#{1,6})\s+(.+?)\s*$")


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


def normalize_path(value: str) -> str:
    return unquote(value.strip().replace("\\", "/").removeprefix("./"))


def compact_text(value: str, limit: int = 900) -> str:
    text = re.sub(r"\s+", " ", value).strip()
    return text if len(text) <= limit else text[: limit - 1].rstrip() + "…"


def build_reference_map(markdown: str) -> dict[str, list[dict]]:
    lines = markdown.splitlines()
    references: dict[str, list[dict]] = {}
    current_heading = "Dokumentanfang"
    for index, line in enumerate(lines):
        heading_match = HEADING.match(line)
        if heading_match:
            current_heading = heading_match.group(2).strip()
        matches = list(IMAGE_REFERENCE.finditer(line))
        if not matches:
            continue
        nearby: list[str] = []
        for candidate_index in range(max(0, index - 3), min(len(lines), index + 4)):
            if candidate_index == index:
                continue
            candidate = lines[candidate_index].strip()
            if not candidate or IMAGE_REFERENCE.search(candidate) or HEADING.match(candidate):
                continue
            nearby.append(candidate)
        context = compact_text(" ".join(nearby))
        for match in matches:
            asset_path = normalize_path(match.group(1))
            references.setdefault(asset_path, []).append(
                {
                    "markdownLine": index + 1,
                    "heading": current_heading,
                    "context": context,
                }
            )
    return references


def load_ocr_engine(text_score: float):
    try:
        import onnxruntime
        import rapidocr
        from rapidocr import RapidOCR
    except Exception as error:
        raise RuntimeError(
            "RapidOCR fehlt im privaten OCR-Runtime-Pfad. Führe zuerst npm run knowledge:install-ocr aus."
        ) from error
    engine = RapidOCR(params={"Rec.lang_type": "german", "Global.text_score": text_score})
    return engine, f"RapidOCR {getattr(rapidocr, '__version__', 'unbekannt')} / ONNX Runtime {onnxruntime.__version__}"


def recognize(engine, image_path: Path) -> str:
    result = engine(str(image_path))
    texts = getattr(result, "txts", None)
    if not texts:
        return ""
    boxes = getattr(result, "boxes", None)
    if boxes is None or len(boxes) != len(texts):
        return "\n".join(str(text).strip() for text in texts if str(text).strip())
    positioned: list[tuple[float, float, str]] = []
    for box, text in zip(boxes, texts):
        value = str(text).strip()
        if not value:
            continue
        positioned.append((min(float(point[1]) for point in box), min(float(point[0]) for point in box), value))
    positioned.sort(key=lambda item: (round(item[0] / 8), item[1], item[0]))
    return "\n".join(item[2] for item in positioned)


def kind_for(path: str, width: int, height: int) -> str:
    name = Path(path).name.lower()
    area = width * height
    aspect = max(width / max(height, 1), height / max(width, 1))
    if width < 80 or height < 50 or area < 12_000 or aspect > 12:
        return "decoration-candidate"
    if "figure" in name:
        return "diagram-or-figure"
    if "picture" in name:
        return "picture-or-screenshot"
    return "image"


def page_number_for(path: str) -> int | None:
    match = PAGE_IN_FILENAME.search(path)
    return int(match.group(1)) + 1 if match else None


def stable_id(source_id: str, path: str) -> str:
    suffix = hashlib.sha256(path.encode("utf-8")).hexdigest()[:12]
    return f"{source_id}:figure:{suffix}"


def catalog_source(source_id: str, with_ocr: bool, text_score: float) -> dict:
    source_root = (LOCAL_ROOT / source_id).resolve()
    if LOCAL_ROOT.resolve() not in source_root.parents:
        raise ValueError("Ungültige Quellen-ID außerhalb der lokalen Wissensbasis.")
    manifest_path = source_root / "manifest.json"
    assets_path = source_root / "assets.jsonl"
    if not manifest_path.is_file() or not assets_path.is_file():
        raise FileNotFoundError(f"Quellenimport unvollständig: {source_root}")
    manifest = read_json(manifest_path)
    primary_markdown = manifest.get("primaryMarkdown")
    if not primary_markdown:
        raise ValueError(f"{source_id} hat keinen Markdown-Export mit einzeln extrahierten Grafiken.")
    markdown_path = source_root / "raw" / primary_markdown
    references = build_reference_map(markdown_path.read_text(encoding="utf-8", errors="replace"))
    assets = [
        item for item in read_jsonl(assets_path) if item.get("type", "").lower() in {"jpeg", "jpg", "png", "webp"}
    ]
    previous_by_hash = {
        item.get("sha256"): item for item in read_jsonl(source_root / "figures.jsonl") if item.get("sha256")
    }
    pdf_pages = max(
        [int(item.get("pages", 0)) for item in manifest.get("representations", []) if item.get("kind", "").startswith("pdf")]
        or [0]
    )

    engine = None
    engine_version = None
    if with_ocr:
        engine, engine_version = load_ocr_engine(text_score)

    figures: list[dict] = []
    first_by_hash: dict[str, str] = {}
    ocr_root = source_root / "figure-ocr"
    for index, asset in enumerate(sorted(assets, key=lambda item: item["path"]), start=1):
        relative_path = normalize_path(asset["path"])
        image_path = source_root / "raw" / Path(relative_path)
        if not image_path.is_file():
            raise FileNotFoundError(f"Grafikdatei fehlt: {image_path}")
        try:
            with Image.open(image_path) as image:
                width, height = image.size
                image_format = (image.format or asset.get("type") or "unknown").lower()
                color_mode = image.mode
        except Exception as error:
            width = height = 0
            image_format = asset.get("type") or "unknown"
            color_mode = "unreadable"
            image_error = str(error)
        else:
            image_error = None

        asset_hash = asset.get("sha256")
        figure_id = stable_id(source_id, relative_path)
        duplicate_of = first_by_hash.get(asset_hash)
        if asset_hash and not duplicate_of:
            first_by_hash[asset_hash] = figure_id
        page_number = page_number_for(relative_path)
        occurrence = references.get(relative_path, [])
        heading = occurrence[0]["heading"] if occurrence else f"Grafik auf PDF-Seite {page_number or '?'}"
        context = compact_text(" ".join(item.get("context", "") for item in occurrence))

        previous = previous_by_hash.get(asset_hash, {})
        ocr_text_path = ocr_root / f"{figure_id.rsplit(':', 1)[-1]}.txt"
        ocr_text = ""
        ocr_status = "not-run"
        ocr_engine = previous.get("ocrEngine")
        if previous.get("ocrStatus") in {"completed", "empty"} and ocr_text_path.is_file():
            ocr_text = ocr_text_path.read_text(encoding="utf-8", errors="replace").strip()
            ocr_status = previous["ocrStatus"]
        elif with_ocr:
            try:
                ocr_text = recognize(engine, image_path).strip()
                atomic_write(ocr_text_path, ocr_text + ("\n" if ocr_text else ""))
                ocr_status = "completed" if ocr_text else "empty"
                ocr_engine = engine_version
            except Exception as error:
                ocr_status = "failed"
                image_error = f"{image_error + '; ' if image_error else ''}OCR: {error}"

        kind = kind_for(relative_path, width, height)
        search_text = compact_text(" ".join([heading, context, ocr_text, Path(relative_path).stem]), limit=4000)
        figures.append(
            {
                "sourceId": source_id,
                "figureId": figure_id,
                "assetPath": f"raw/{relative_path}",
                "sourceAssetPath": relative_path,
                "sha256": asset_hash,
                "bytes": int(asset.get("bytes", image_path.stat().st_size)),
                "format": image_format,
                "width": width,
                "height": height,
                "colorMode": color_mode,
                "pageNumber": page_number,
                "pageReferenceStatus": "matched" if page_number and (not pdf_pages or page_number <= pdf_pages) else "unmatched",
                "kindCandidate": kind,
                "heading": heading,
                "markdownReferences": occurrence,
                "contextText": context,
                "ocrStatus": ocr_status,
                "ocrTextPath": ocr_text_path.relative_to(source_root).as_posix() if ocr_status in {"completed", "empty"} else None,
                "ocrTextCharacters": len(ocr_text),
                "ocrEngine": ocr_engine,
                "searchText": search_text,
                "duplicateOf": duplicate_of,
                "rightsStatus": "private-source-only",
                "reviewStatus": "needs-manual-review",
                "understandingStatus": "machine-context-only" if context or ocr_text else "unclassified",
                "remakeRecommendation": "review-for-redraw" if kind == "diagram-or-figure" else "review-before-use",
                "error": image_error,
            }
        )
        if with_ocr and (index % 20 == 0 or index == len(assets)):
            write_jsonl(source_root / "figures.jsonl", figures)
            print(f"{source_id}: Grafik-OCR {index}/{len(assets)}")

    write_jsonl(source_root / "figures.jsonl", figures)
    summary = {
        "sourceId": source_id,
        "figures": len(figures),
        "pageMatched": sum(item["pageReferenceStatus"] == "matched" for item in figures),
        "withMarkdownContext": sum(bool(item["markdownReferences"]) for item in figures),
        "duplicateOccurrences": sum(bool(item["duplicateOf"]) for item in figures),
        "ocrCompleted": sum(item["ocrStatus"] in {"completed", "empty"} for item in figures),
        "needsManualReview": len(figures),
        "redrawCandidates": sum(item["remakeRecommendation"] == "review-for-redraw" for item in figures),
    }
    write_json(source_root / "figure-catalog.json", summary)
    stats = manifest.setdefault("stats", {})
    stats.update(
        {
            "figures": summary["figures"],
            "figuresPageMatched": summary["pageMatched"],
            "figuresWithContext": summary["withMarkdownContext"],
            "figureDuplicateOccurrences": summary["duplicateOccurrences"],
            "figureOcrCompleted": summary["ocrCompleted"],
        }
    )
    manifest["figureCatalog"] = {
        "path": "figures.jsonl",
        "summaryPath": "figure-catalog.json",
        "status": "machine-cataloged-needs-review",
        "rightsStatus": "private-source-only",
    }
    write_json(manifest_path, manifest)
    combined_path = LOCAL_ROOT / "catalog.json"
    if combined_path.is_file():
        combined = read_json(combined_path)
        for source in combined.get("sources", []):
            if source.get("id") == source_id:
                source["stats"] = stats
                source["figureCatalog"] = summary
                break
        write_json(combined_path, combined)
    return summary


def rebuild_global_catalog(source_ids: list[str]) -> None:
    summaries = []
    sha_sources: dict[str, list[dict]] = {}
    for source_id in source_ids:
        source_root = LOCAL_ROOT / source_id
        summary_path = source_root / "figure-catalog.json"
        figures_path = source_root / "figures.jsonl"
        if not summary_path.is_file() or not figures_path.is_file():
            continue
        summaries.append(read_json(summary_path))
        for item in read_jsonl(figures_path):
            if item.get("sha256"):
                sha_sources.setdefault(item["sha256"], []).append(
                    {"sourceId": source_id, "figureId": item["figureId"], "assetPath": item["assetPath"]}
                )
    cross_source_duplicates = [items for items in sha_sources.values() if len({item["sourceId"] for item in items}) > 1]
    write_json(
        LOCAL_ROOT / "figures-catalog.json",
        {
            "version": 1,
            "sources": summaries,
            "figures": sum(int(item["figures"]) for item in summaries),
            "needsManualReview": sum(int(item["needsManualReview"]) for item in summaries),
            "redrawCandidates": sum(int(item["redrawCandidates"]) for item in summaries),
            "crossSourceDuplicateGroups": cross_source_duplicates,
        },
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Katalogisiert private Buchgrafiken mit Seiten- und Kontextbezug.")
    parser.add_argument("--source-id", action="append", dest="source_ids", help="Quellen-ID; mehrfach möglich")
    parser.add_argument("--all", action="store_true", help="Alle Markdown-Quellen mit Bildinventar katalogisieren")
    parser.add_argument("--ocr", action="store_true", help="Beschriftungen in Grafiken zusätzlich lokal OCRen")
    parser.add_argument("--text-score", type=float, default=0.45, help="RapidOCR-Mindestkonfidenz")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not 0 <= args.text_score <= 1:
        raise ValueError("--text-score muss zwischen 0 und 1 liegen.")
    catalog = read_json(SOURCE_CATALOG_PATH)
    known_ids = [source["id"] for source in catalog["sources"]]
    source_ids = args.source_ids or []
    if args.all:
        source_ids = [
            source_id
            for source_id in known_ids
            if (LOCAL_ROOT / source_id / "manifest.json").is_file()
            and read_json(LOCAL_ROOT / source_id / "manifest.json").get("primaryMarkdown")
        ]
    if not source_ids:
        raise ValueError("Mindestens --source-id ID oder --all angeben.")
    unknown = sorted(set(source_ids).difference(known_ids))
    if unknown:
        raise ValueError(f"Unbekannte Quellen-ID(s): {', '.join(unknown)}")

    for source_id in source_ids:
        summary = catalog_source(source_id, args.ocr, args.text_score)
        print(
            f"{source_id}: {summary['figures']} Grafiken, {summary['pageMatched']} mit PDF-Seite, "
            f"{summary['withMarkdownContext']} mit Textkontext, {summary['redrawCandidates']} Neuzeichnungs-Kandidaten"
        )
    rebuild_global_catalog(known_ids)
    print(f"Globaler Grafikkatalog: {LOCAL_ROOT / 'figures-catalog.json'}")


if __name__ == "__main__":
    try:
        main()
    except (FileNotFoundError, RuntimeError, ValueError, json.JSONDecodeError) as error:
        print(f"Grafikkatalog nicht erstellt: {error}", file=sys.stderr)
        raise SystemExit(1) from error
