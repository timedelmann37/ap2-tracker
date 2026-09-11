"""Prepare and certify the private source compendium for manual curation.

The command owns the boundary between raw book representations and future
learning units. It may derive private indexes and visual candidates, but it
never writes public learning content.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
SOURCE_CATALOG_PATH = REPO_ROOT / "content" / "sources.json"
LAYOUT_SCRIPT = Path(__file__).with_name("extract-pdf-layout.py")
VERIFY_SCRIPT = Path(__file__).with_name("verify-compendium.py")
LOCK_PATH = LOCAL_ROOT / ".prepare.lock"


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


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def pdf_representation(manifest: dict) -> dict:
    candidates = [item for item in manifest.get("representations", []) if item.get("kind", "").startswith("pdf")]
    if not candidates:
        raise RuntimeError(f"{manifest.get('source', {}).get('id')}: PDF-Repräsentation fehlt")
    return candidates[0]


def normalize_markdown_representation(manifest: dict, pages: int) -> None:
    if not manifest.get("primaryMarkdown"):
        return
    representations = manifest.setdefault("representations", [])
    markdown = next((item for item in representations if item.get("id") == "markdown-export"), None)
    if markdown is None:
        markdown = {"id": "markdown-export", "kind": "markdown-export"}
        representations.insert(0, markdown)
    markdown.update(
        {
            "pages": pages,
            "extractionStatus": "ocr-ready",
            "engine": "Surya export",
            "textAuthority": "primary",
            "tableAuthority": "structured-export",
            "visualAuthority": "derived",
        }
    )


def run_layout_if_needed(source_id: str, manifest: dict) -> dict:
    pdf = pdf_representation(manifest)
    expected_pages = int(pdf.get("pages", 0))
    layout = next((item for item in manifest.get("representations", []) if item.get("kind") == "visual-candidates"), {})
    if int(layout.get("pages", 0)) == expected_pages and layout.get("extractionStatus") == "machine-cataloged-needs-review":
        return manifest
    print(f"{source_id}: Layout- und Grafikextraktion wird vervollständigt ({expected_pages} Seiten).", flush=True)
    result = subprocess.run(
        [sys.executable, str(LAYOUT_SCRIPT), "--source-id", source_id, "--pages", "all"],
        cwd=REPO_ROOT,
        check=False,
    )
    if result.returncode:
        raise RuntimeError(f"{source_id}: Layoutanalyse fehlgeschlagen (Exit {result.returncode})")
    return read_json(LOCAL_ROOT / source_id / "manifest.json")


def build_readiness(source: dict, manifest: dict) -> dict:
    source_id = source["id"]
    source_root = LOCAL_ROOT / source_id
    pdf = pdf_representation(manifest)
    pages = int(pdf.get("pages", 0))
    figures = read_jsonl(source_root / "figures.jsonl")
    tables = read_jsonl(source_root / "tables.jsonl")
    table_candidates = read_jsonl(source_root / "table-candidates.jsonl")
    chunks = read_jsonl(source_root / "chunks.jsonl")
    page_index = read_jsonl(source_root / pdf.get("pagesIndex", "")) if pdf.get("pagesIndex") else []
    figure_summary = read_json(source_root / "figure-catalog.json")
    is_pdf_only = bool(manifest.get("primaryPdf"))
    searchable_pages = len({int(item["pageNumber"]) for item in chunks if item.get("pageNumber") is not None}) if is_pdf_only else pages
    ocr_pages = sum(item.get("ocrStatus") in {"completed", "empty"} for item in page_index) if is_pdf_only else pages
    empty_ocr_pages = [int(item["pageNumber"]) for item in page_index if item.get("ocrStatus") == "empty"] if is_pdf_only else []
    layout_pages = int(manifest.get("stats", {}).get("layoutPages", 0)) if is_pdf_only else pages
    chunks_path = source_root / "chunks.jsonl"
    tables_path = source_root / "tables.jsonl"
    figures_path = source_root / "figures.jsonl"
    text_page_link = "exact" if is_pdf_only else "heading-and-asset-context-only"

    capabilities = {
        "originalPdf": {"status": "ready", "pages": pages, "sha256": pdf.get("sha256")},
        "pdfPageMap": {"status": "ready" if len(page_index) == pages else "blocked", "pages": len(page_index)},
        "textToPdfPage": {
            "status": "ready" if is_pdf_only else "partial",
            "method": text_page_link,
            "requiresManualResolution": not is_pdf_only,
        },
        "searchableText": {"status": "ready" if chunks else "blocked", "chunks": len(chunks), "pages": searchable_pages},
        "ocr": {
            "status": "ready-with-review" if empty_ocr_pages else ("ready" if ocr_pages == pages else "blocked"),
            "processedPages": ocr_pages,
            "textPages": searchable_pages,
            "emptyPagesNeedingReview": empty_ocr_pages,
            "engine": "RapidOCR" if is_pdf_only else "Surya export",
        },
        "tables": {
            "status": "candidate-only" if is_pdf_only else "ready",
            "structured": len(tables),
            "candidates": len(table_candidates),
            "requiresManualReview": is_pdf_only,
        },
        "figures": {
            "status": "ready-for-review" if figures and layout_pages == pages else "blocked",
            "items": len(figures),
            "pagesAnalyzed": layout_pages,
            "requiresManualReview": True,
            "rightsStatus": "private-source-only",
        },
        "provenance": {
            "status": "ready" if is_pdf_only else "ready-with-limitations",
            "assetPageAndHashTracked": True,
            "textPageMapping": text_page_link,
        },
        "indexes": {
            "status": "ready",
            "chunks": {"count": len(chunks), "sha256": sha256_file(chunks_path)},
            "tables": {"count": len(tables), "sha256": sha256_file(tables_path)},
            "figures": {"count": len(figures), "sha256": sha256_file(figures_path)},
        },
    }
    blocking = [name for name, value in capabilities.items() if value.get("status") == "blocked"]
    report = {
        "version": 1,
        "sourceId": source_id,
        "title": source["title"],
        "generatedAt": utc_now(),
        "technicalStatus": "READY_FOR_CURATION" if not blocking else "BLOCKED",
        "publicationStatus": "NOT_READY",
        "generatedLearningUnits": False,
        "blockingCapabilities": blocking,
        "capabilities": capabilities,
        "reviewQueue": {
            "figures": int(figure_summary.get("needsManualReview", len(figures))),
            "tableCandidates": len(table_candidates),
            "redrawCandidates": int(figure_summary.get("redrawCandidates", len(figures))),
        },
        "nextGate": "manual-topic-mapping-and-didactic-curation",
    }
    write_json(source_root / "readiness.json", report)
    return report


def rebuild_global_catalog(source_ids: Iterable[str]) -> dict:
    summaries = []
    hashes: dict[str, list[dict]] = {}
    for source_id in source_ids:
        source_root = LOCAL_ROOT / source_id
        summary_path = source_root / "figure-catalog.json"
        figures_path = source_root / "figures.jsonl"
        if not summary_path.is_file() or not figures_path.is_file():
            continue
        summaries.append(read_json(summary_path))
        for item in read_jsonl(figures_path):
            if item.get("sha256"):
                hashes.setdefault(item["sha256"], []).append(
                    {"sourceId": source_id, "figureId": item["figureId"], "assetPath": item["assetPath"]}
                )
    global_catalog = {
        "version": 1,
        "sources": summaries,
        "figures": sum(int(item.get("figures", 0)) for item in summaries),
        "needsManualReview": sum(int(item.get("needsManualReview", 0)) for item in summaries),
        "redrawCandidates": sum(int(item.get("redrawCandidates", 0)) for item in summaries),
        "crossSourceDuplicateGroups": [items for items in hashes.values() if len({i["sourceId"] for i in items}) > 1],
    }
    write_json(LOCAL_ROOT / "figures-catalog.json", global_catalog)
    return global_catalog


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Bereitet alle privaten Buchquellen für die manuelle Lernkurierung vor.")
    parser.add_argument("--skip-layout", action="store_true", help="Nur Report erstellen; unvollständige Layoutanalyse bleibt blockiert")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source_catalog = read_json(SOURCE_CATALOG_PATH)
    known = {source["id"]: source for source in source_catalog["sources"]}
    source_ids = list(known)

    LOCAL_ROOT.mkdir(parents=True, exist_ok=True)
    try:
        descriptor = os.open(LOCK_PATH, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    except FileExistsError as error:
        raise RuntimeError(f"Ein Prepare-Lauf ist bereits aktiv: {LOCK_PATH}") from error
    try:
        os.write(descriptor, f"pid={os.getpid()} started={utc_now()}\n".encode())
        os.close(descriptor)
        reports = []
        for source_id in source_ids:
            manifest_path = LOCAL_ROOT / source_id / "manifest.json"
            if not manifest_path.is_file():
                raise FileNotFoundError(f"{source_id}: Manifest fehlt")
            manifest = read_json(manifest_path)
            pdf = pdf_representation(manifest)
            normalize_markdown_representation(manifest, int(pdf.get("pages", 0)))
            write_json(manifest_path, manifest)
            if manifest.get("primaryPdf") and not args.skip_layout:
                manifest = run_layout_if_needed(source_id, manifest)
            report = build_readiness(known[source_id], manifest)
            reports.append(report)
            print(
                f"{source_id}: {report['technicalStatus']} | "
                f"{report['capabilities']['originalPdf']['pages']} Seiten | "
                f"{report['capabilities']['figures']['items']} Grafiken | "
                f"{report['capabilities']['tables']['structured']} Tabellen | "
                f"{report['capabilities']['tables']['candidates']} Tabellenkandidaten",
                flush=True,
            )

        figure_catalog = rebuild_global_catalog(known)
        global_report = {
            "version": 1,
            "generatedAt": utc_now(),
            "technicalStatus": "READY_FOR_CURATION"
            if len(reports) == len(source_ids) and all(item["technicalStatus"] == "READY_FOR_CURATION" for item in reports)
            else "BLOCKED",
            "publicationStatus": "NOT_READY",
            "generatedLearningUnits": False,
            "sources": reports,
            "totals": {
                "sources": len(reports),
                "pdfPages": sum(item["capabilities"]["originalPdf"]["pages"] for item in reports),
                "chunks": sum(item["capabilities"]["searchableText"]["chunks"] for item in reports),
                "structuredTables": sum(item["capabilities"]["tables"]["structured"] for item in reports),
                "tableCandidates": sum(item["capabilities"]["tables"]["candidates"] for item in reports),
                "figures": figure_catalog["figures"],
                "figuresNeedingReview": figure_catalog["needsManualReview"],
            },
            "nextGate": "manual-topic-mapping-and-didactic-curation",
        }
        write_json(LOCAL_ROOT / "readiness.json", global_report)
        if global_report["technicalStatus"] != "READY_FOR_CURATION":
            raise RuntimeError("Mindestens eine Quelle ist noch nicht bereit für Kuratierung.")
        verification = subprocess.run(
            [sys.executable, str(VERIFY_SCRIPT), "--all", "--require-figure-ocr"],
            cwd=REPO_ROOT,
            check=False,
        )
        if verification.returncode:
            global_report["technicalStatus"] = "BLOCKED"
            global_report["verificationStatus"] = "FAILED"
            write_json(LOCAL_ROOT / "readiness.json", global_report)
            for report in reports:
                report["technicalStatus"] = "BLOCKED"
                report["verificationStatus"] = "FAILED"
                write_json(LOCAL_ROOT / report["sourceId"] / "readiness.json", report)
            raise RuntimeError("Abschließende Integritätsprüfung des Kompendiums ist fehlgeschlagen.")
        for report in reports:
            report["verificationStatus"] = "PASSED"
            report["verifiedAt"] = utc_now()
            write_json(LOCAL_ROOT / report["sourceId"] / "readiness.json", report)
        global_report["verificationStatus"] = "PASSED"
        global_report["verifiedAt"] = utc_now()
        write_json(LOCAL_ROOT / "readiness.json", global_report)
        print(f"Kompendium: READY_FOR_CURATION ({len(reports)} Quellen).", flush=True)
    finally:
        try:
            os.close(descriptor)
        except OSError:
            pass
        LOCK_PATH.unlink(missing_ok=True)


if __name__ == "__main__":
    try:
        main()
    except (FileNotFoundError, RuntimeError, ValueError, json.JSONDecodeError) as error:
        print(f"Kompendium nicht vorbereitet: {error}", file=sys.stderr)
        raise SystemExit(1) from error
