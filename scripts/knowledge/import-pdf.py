"""Import a PDF into the private AP2 knowledge base without publishing it."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from pathlib import Path

from pypdf import PdfReader


REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
SOURCE_CATALOG_PATH = REPO_ROOT / "content" / "sources.json"


def sha256_file(file_path: Path) -> str:
    digest = hashlib.sha256()
    with file_path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_jsonl(path: Path, values: list[dict]) -> None:
    content = "\n".join(json.dumps(value, ensure_ascii=False) for value in values)
    path.write_text(content + ("\n" if content else ""), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Importiert eine PDF in die private AP2-Wissensbasis.")
    parser.add_argument("--source-id", required=True, help="Quellen-ID aus content/sources.json")
    parser.add_argument("--pdf", required=True, type=Path, help="Pfad zur PDF-Datei")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    pdf_path = args.pdf.expanduser().resolve()
    if not pdf_path.is_file() or pdf_path.suffix.lower() != ".pdf":
        raise FileNotFoundError(f"PDF nicht gefunden: {pdf_path}")

    source_catalog = json.loads(SOURCE_CATALOG_PATH.read_text(encoding="utf-8"))
    definitions = {source["id"]: source for source in source_catalog["sources"]}
    if args.source_id not in definitions:
        raise ValueError(f"Unbekannte Quellen-ID: {args.source_id}")
    definition = definitions[args.source_id]

    target_root = LOCAL_ROOT / args.source_id
    raw_root = target_root / "raw"
    raw_root.mkdir(parents=True, exist_ok=True)
    copied_pdf = raw_root / "source.pdf"
    shutil.copy2(pdf_path, copied_pdf)

    reader = PdfReader(str(pdf_path))
    pages: list[dict] = []
    chunks: list[dict] = []
    text_pages = 0
    text_characters = 0
    for index, page in enumerate(reader.pages, start=1):
        text = (page.extract_text() or "").strip()
        if text:
            text_pages += 1
            text_characters += len(text)
            chunks.append(
                {
                    "sourceId": args.source_id,
                    "chunkId": f"{args.source_id}:page:{index:04d}",
                    "heading": f"PDF-Seite {index}",
                    "level": 0,
                    "startLine": index,
                    "endLine": index,
                    "markdown": text,
                    "searchText": " ".join(text.split()),
                }
            )
        media_box = page.mediabox
        pages.append(
            {
                "sourceId": args.source_id,
                "pageNumber": index,
                "widthPt": round(float(media_box.width), 2),
                "heightPt": round(float(media_box.height), 2),
                "rotation": int(page.rotation or 0),
                "textCharacters": len(text),
            }
        )

    file_size = pdf_path.stat().st_size
    file_hash = sha256_file(pdf_path)
    extraction_status = "text-ready" if text_pages >= max(1, len(pages) * 0.8) else "ocr-required"
    stats = {
        "kind": "pdf",
        "files": 1,
        "pdfFiles": 1,
        "pages": len(pages),
        "pageImages": len(pages),
        "images": 0,
        "chunks": len(chunks),
        "tables": 0,
        "textPages": text_pages,
        "textCharacters": text_characters,
        "bytes": file_size,
        "extractionStatus": extraction_status,
    }
    file_record = {
        "path": "source.pdf",
        "bytes": file_size,
        "sha256": file_hash,
        "type": "pdf",
    }
    manifest = {
        "source": definition,
        "originalPath": str(pdf_path),
        "primaryPdf": "source.pdf",
        "stats": stats,
        "files": [file_record],
    }
    write_jsonl(target_root / "pages.jsonl", pages)
    write_jsonl(target_root / "chunks.jsonl", chunks)
    write_jsonl(target_root / "tables.jsonl", [])
    write_jsonl(target_root / "assets.jsonl", [file_record])
    write_json(target_root / "manifest.json", manifest)

    combined_catalog_path = LOCAL_ROOT / "catalog.json"
    if combined_catalog_path.exists():
        combined = json.loads(combined_catalog_path.read_text(encoding="utf-8"))
    else:
        combined = {"version": 1, "sources": []}
    by_id = {source["id"]: source for source in combined.get("sources", [])}
    by_id[args.source_id] = {
        "id": definition["id"],
        "title": definition["title"],
        "originalPath": str(pdf_path),
        "stats": stats,
    }
    source_order = {source["id"]: index for index, source in enumerate(source_catalog["sources"])}
    combined["sources"] = sorted(by_id.values(), key=lambda source: source_order.get(source["id"], 999))
    write_json(combined_catalog_path, combined)

    print(
        f"Importiert: {definition['title']} - {len(pages)} Seiten, "
        f"{text_pages} Textseiten, Status {extraction_status}"
    )
    print(f"Lokale Wissensbasis: {target_root}")


if __name__ == "__main__":
    main()
