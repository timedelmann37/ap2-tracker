"""Verify private source representations and page-aware figure catalogs."""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
SOURCE_CATALOG_PATH = REPO_ROOT / "content" / "sources.json"


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def read_jsonl(path: Path) -> list[dict]:
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def fail(message: str) -> None:
    raise AssertionError(message)


def verify_source(source_id: str, require_figure_ocr: bool) -> dict:
    source_root = (LOCAL_ROOT / source_id).resolve()
    if LOCAL_ROOT.resolve() not in source_root.parents:
        fail("Ungültige Quellen-ID außerhalb der lokalen Wissensbasis.")
    manifest_path = source_root / "manifest.json"
    if not manifest_path.is_file():
        fail(f"Manifest fehlt: {manifest_path}")
    manifest = read_json(manifest_path)
    pdfs = [item for item in manifest.get("representations", []) if item.get("kind", "").startswith("pdf")]
    if not pdfs:
        fail(f"{source_id}: keine PDF-Repräsentation angehängt")
    for pdf in pdfs:
        pdf_path = source_root / pdf["localPath"]
        pages_path = source_root / pdf["pagesIndex"]
        if not pdf_path.is_file() or not pages_path.is_file():
            fail(f"{source_id}: PDF oder Seitenindex fehlt ({pdf.get('id')})")
        if sha256_file(pdf_path) != pdf.get("sha256"):
            fail(f"{source_id}: PDF-Prüfsumme stimmt nicht ({pdf.get('id')})")
        pages = read_jsonl(pages_path)
        if len(pages) != int(pdf.get("pages", 0)):
            fail(f"{source_id}: Seitenzahl stimmt nicht ({pdf.get('id')})")
        page_numbers = [int(page["pageNumber"]) for page in pages]
        if page_numbers != list(range(1, len(pages) + 1)):
            fail(f"{source_id}: Seitenindex ist nicht lückenlos ({pdf.get('id')})")

    assets = [
        item
        for item in read_jsonl(source_root / "assets.jsonl")
        if item.get("type", "").lower() in {"jpeg", "jpg", "png", "webp"}
    ]
    figures_path = source_root / "figures.jsonl"
    summary_path = source_root / "figure-catalog.json"
    if not figures_path.is_file() or not summary_path.is_file():
        fail(f"{source_id}: Grafikkatalog fehlt")
    figures = read_jsonl(figures_path)
    summary = read_json(summary_path)
    if len(figures) != len(assets) or int(summary.get("figures", -1)) != len(figures):
        fail(f"{source_id}: Asset- und Grafikkatalog-Zahlen widersprechen sich")
    figure_ids = [item.get("figureId") for item in figures]
    asset_paths = [item.get("sourceAssetPath") for item in figures]
    if len(figure_ids) != len(set(figure_ids)) or len(asset_paths) != len(set(asset_paths)):
        fail(f"{source_id}: doppelte figureId oder Assetpfade")
    expected_asset_paths = {item["path"].replace("\\", "/") for item in assets}
    if set(asset_paths) != expected_asset_paths:
        fail(f"{source_id}: nicht alle Bildassets sind im Grafikkatalog")
    pdf_page_count = max(int(pdf.get("pages", 0)) for pdf in pdfs)
    for figure in figures:
        required = ("sourceId", "figureId", "sha256", "rightsStatus", "reviewStatus", "understandingStatus")
        if any(not figure.get(field) for field in required):
            fail(f"{source_id}: unvollständige Grafikmetadaten bei {figure.get('figureId')}")
        page_number = figure.get("pageNumber")
        if page_number is not None and not 1 <= int(page_number) <= pdf_page_count:
            fail(f"{source_id}: ungültiger Seitenbezug bei {figure.get('figureId')}")
        image_path = source_root / figure["assetPath"]
        if not image_path.is_file():
            fail(f"{source_id}: Grafikdatei fehlt bei {figure.get('figureId')}")
        if require_figure_ocr and figure.get("ocrStatus") not in {"completed", "empty"}:
            fail(f"{source_id}: Grafik-OCR fehlt bei {figure.get('figureId')}")
    return {
        "sourceId": source_id,
        "pdfPages": sum(int(pdf.get("pages", 0)) for pdf in pdfs),
        "figures": len(figures),
        "pageMatched": sum(item.get("pageReferenceStatus") == "matched" for item in figures),
        "ocrCompleted": sum(item.get("ocrStatus") in {"completed", "empty"} for item in figures),
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Prüft PDF- und Grafikkataloge der privaten Wissensbasis.")
    parser.add_argument("--source-id", action="append", dest="source_ids", help="Quellen-ID; mehrfach möglich")
    parser.add_argument("--all", action="store_true", help="Alle Quellen mit Markdown- und PDF-Repräsentation prüfen")
    parser.add_argument("--require-figure-ocr", action="store_true", help="Lokale OCR für jedes Bild verlangen")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    known = [source["id"] for source in read_json(SOURCE_CATALOG_PATH)["sources"]]
    source_ids = args.source_ids or []
    if args.all:
        source_ids = []
        for source_id in known:
            manifest_path = LOCAL_ROOT / source_id / "manifest.json"
            if not manifest_path.is_file():
                continue
            manifest = read_json(manifest_path)
            if manifest.get("primaryMarkdown") and any(
                item.get("kind", "").startswith("pdf") for item in manifest.get("representations", [])
            ):
                source_ids.append(source_id)
    if not source_ids:
        fail("Mindestens --source-id ID oder --all angeben.")
    for source_id in source_ids:
        if source_id not in known:
            fail(f"Unbekannte Quellen-ID: {source_id}")
        result = verify_source(source_id, args.require_figure_ocr)
        print(
            f"{source_id}: {result['pdfPages']} PDF-Seiten, {result['figures']} Grafiken, "
            f"{result['pageMatched']} mit Seitenbezug, {result['ocrCompleted']} mit Grafik-OCR"
        )
    global_catalog = LOCAL_ROOT / "figures-catalog.json"
    if not global_catalog.is_file():
        fail("Globaler Grafikkatalog fehlt.")
    print(f"Kompendium gültig: {len(source_ids)} Quelle(n)")


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, FileNotFoundError, ValueError, json.JSONDecodeError) as error:
        print(f"Kompendium-Prüfung fehlgeschlagen: {error}", file=sys.stderr)
        raise SystemExit(1) from error
