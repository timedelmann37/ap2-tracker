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
    if not path.exists():
        return []
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
    raw_root = source_root / "raw"
    for item in manifest.get("files", []):
        relative_path = item.get("path")
        if not relative_path or not item.get("sha256"):
            fail(f"{source_id}: unvollständiger Rohdatei-Nachweis")
        raw_path = (raw_root / relative_path).resolve()
        if raw_root.resolve() not in raw_path.parents:
            fail(f"{source_id}: Rohdateipfad verlässt die private Quelle")
        if not raw_path.is_file() or sha256_file(raw_path) != item["sha256"]:
            fail(f"{source_id}: Rohdatei fehlt oder Hash stimmt nicht ({relative_path})")
    pdfs = [item for item in manifest.get("representations", []) if item.get("kind", "").startswith("pdf")]
    if not pdfs:
        fail(f"{source_id}: keine PDF-Repräsentation angehängt")
    for pdf in pdfs:
        pdf_path = source_root / pdf["localPath"]
        pages_index = pdf.get("pagesIndex")
        if not pages_index:
            fail(f"{source_id}: Seitenindex ist in {pdf.get('id')} nicht deklariert")
        pages_path = source_root / pages_index
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
        if page_number is not None and figure.get("pageReferenceStatus") != "matched":
            fail(f"{source_id}: Grafik ist trotz Seitenzahl nicht als zugeordnet markiert")
        image_path = source_root / figure["assetPath"]
        if not image_path.is_file():
            fail(f"{source_id}: Grafikdatei fehlt bei {figure.get('figureId')}")
        if sha256_file(image_path) != figure.get("sha256"):
            fail(f"{source_id}: Grafik-Hash stimmt nicht bei {figure.get('figureId')}")
        if require_figure_ocr and figure.get("ocrStatus") not in {"completed", "empty"}:
            fail(f"{source_id}: Grafik-OCR fehlt bei {figure.get('figureId')}")

    if manifest.get("primaryPdf"):
        pages = read_jsonl(source_root / "pages.jsonl")
        completed_ocr = [page for page in pages if page.get("ocrStatus") in {"completed", "empty"}]
        if len(completed_ocr) != pdf_page_count:
            fail(f"{source_id}: Vollseiten-OCR ist unvollständig ({len(completed_ocr)}/{pdf_page_count})")
        layout = next(
            (item for item in manifest.get("representations", []) if item.get("kind") == "visual-candidates"),
            None,
        )
        if not layout or int(layout.get("pages", 0)) != pdf_page_count:
            fail(f"{source_id}: Layoutanalyse ist unvollständig")
        if layout.get("extractionStatus") != "machine-cataloged-needs-review":
            fail(f"{source_id}: Layoutanalyse hat keinen kuratierbaren Status")
    else:
        markdown_path = raw_root / manifest.get("primaryMarkdown", "")
        if not markdown_path.is_file():
            fail(f"{source_id}: maßgeblicher Markdown-Export fehlt")
        markdown = next(
            (item for item in manifest.get("representations", []) if item.get("id") == "markdown-export"),
            None,
        )
        if not markdown or markdown.get("extractionStatus") != "ocr-ready":
            fail(f"{source_id}: Markdown-/Surya-Repräsentation ist nicht OCR-bereit")

    chunks = read_jsonl(source_root / "chunks.jsonl")
    if not chunks or any(item.get("sourceId") != source_id for item in chunks):
        fail(f"{source_id}: Volltextindex fehlt oder enthält fremde Quellen")
    tables_path = source_root / "tables.jsonl"
    if not tables_path.is_file():
        fail(f"{source_id}: Tabellenindex fehlt")
    tables = read_jsonl(tables_path)
    stats = manifest.get("stats", {})
    if int(stats.get("chunks", -1)) != len(chunks):
        fail(f"{source_id}: Chunk-Zahl widerspricht dem Manifest")
    if int(stats.get("tables", -1)) != len(tables):
        fail(f"{source_id}: Tabellenzahl widerspricht dem Manifest")

    readiness_path = source_root / "readiness.json"
    if not readiness_path.is_file():
        fail(f"{source_id}: Readiness-Report fehlt")
    readiness = read_json(readiness_path)
    if readiness.get("technicalStatus") != "READY_FOR_CURATION":
        fail(f"{source_id}: Quelle ist nicht bereit für Kuratierung")
    if readiness.get("publicationStatus") != "NOT_READY":
        fail(f"{source_id}: private Quellen dürfen nicht als veröffentlichungsbereit markiert sein")
    indexes = readiness.get("capabilities", {}).get("indexes", {})
    expected_indexes = {
        "chunks": (source_root / "chunks.jsonl", len(chunks)),
        "tables": (tables_path, len(tables)),
        "figures": (figures_path, len(figures)),
    }
    for name, (path, count) in expected_indexes.items():
        declared = indexes.get(name, {})
        if int(declared.get("count", -1)) != count or declared.get("sha256") != sha256_file(path):
            fail(f"{source_id}: {name}-Index stimmt nicht mit dem Readiness-Report überein")
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
    parser.add_argument("--all", action="store_true", help="Alle Quellen mit PDF-Repräsentation prüfen")
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
                fail(f"Registrierte Quelle fehlt in der privaten Wissensbasis: {source_id}")
            manifest = read_json(manifest_path)
            if not any(item.get("kind", "").startswith("pdf") for item in manifest.get("representations", [])):
                fail(f"Registrierte Quelle besitzt keine PDF-Repräsentation: {source_id}")
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
    global_source_ids = {item.get("sourceId") for item in read_json(global_catalog).get("sources", [])}
    if args.all and global_source_ids != set(known):
        fail("Globaler Grafikkatalog enthält nicht exakt alle registrierten Quellen.")
    readiness = LOCAL_ROOT / "readiness.json"
    readiness_report = read_json(readiness) if readiness.is_file() else {}
    readiness_source_ids = {item.get("sourceId") for item in readiness_report.get("sources", [])}
    if readiness_report.get("technicalStatus") != "READY_FOR_CURATION":
        fail("Globaler Readiness-Report fehlt oder ist nicht bereit für Kuratierung.")
    if args.all and readiness_source_ids != set(known):
        fail("Globaler Readiness-Report enthält nicht exakt alle registrierten Quellen.")
    print(f"Kompendium gültig und bereit für Kuratierung: {len(source_ids)} Quelle(n)")


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, FileNotFoundError, ValueError, json.JSONDecodeError) as error:
        print(f"Kompendium-Prüfung fehlgeschlagen: {error}", file=sys.stderr)
        raise SystemExit(1) from error
