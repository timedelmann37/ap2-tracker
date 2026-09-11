"""Attach a source PDF to an existing private knowledge-base source.

The Markdown export remains the searchable primary representation. The PDF is
stored as a second, page-faithful representation without overwriting chunks,
tables, or images that were already imported from Markdown.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path

from pypdf import PdfReader


REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
SOURCE_CATALOG_PATH = REPO_ROOT / "content" / "sources.json"
SAFE_KEY = re.compile(r"^[a-z0-9][a-z0-9-]*$")


def sha256_file(file_path: Path) -> str:
    digest = hashlib.sha256()
    with file_path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_jsonl(path: Path, values: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    content = "\n".join(json.dumps(value, ensure_ascii=False) for value in values)
    path.write_text(content + ("\n" if content else ""), encoding="utf-8")


def count_page_image_objects(page) -> int:
    """Count direct image XObjects without decoding full-page scan images."""
    try:
        resources = page.get("/Resources") or {}
        xobjects = resources.get("/XObject") or {}
        xobjects = xobjects.get_object() if hasattr(xobjects, "get_object") else xobjects
        count = 0
        for value in xobjects.values():
            obj = value.get_object() if hasattr(value, "get_object") else value
            if obj.get("/Subtype") == "/Image":
                count += 1
        return count
    except Exception:
        return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Hängt eine PDF als seitengetreue Repräsentation an eine bestehende private Quelle."
    )
    parser.add_argument("--source-id", required=True, help="Quellen-ID aus content/sources.json")
    parser.add_argument("--pdf", required=True, type=Path, help="Pfad zur PDF-Datei")
    parser.add_argument("--key", default="original", help="Stabiler Schlüssel, z. B. original oder arbeitsbuch")
    parser.add_argument("--force", action="store_true", help="Abweichende bereits angehängte PDF ersetzen")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not SAFE_KEY.fullmatch(args.key):
        raise ValueError("--key darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten.")

    pdf_path = args.pdf.expanduser().resolve()
    if not pdf_path.is_file() or pdf_path.suffix.lower() != ".pdf":
        raise FileNotFoundError(f"PDF nicht gefunden: {pdf_path}")

    source_catalog = json.loads(SOURCE_CATALOG_PATH.read_text(encoding="utf-8"))
    definitions = {source["id"]: source for source in source_catalog["sources"]}
    if args.source_id not in definitions:
        raise ValueError(f"Unbekannte Quellen-ID: {args.source_id}")

    source_root = (LOCAL_ROOT / args.source_id).resolve()
    if LOCAL_ROOT.resolve() not in source_root.parents:
        raise ValueError("Ungültige Quellen-ID außerhalb der lokalen Wissensbasis.")
    manifest_path = source_root / "manifest.json"
    if not manifest_path.is_file():
        raise FileNotFoundError(
            f"Bestehender Quellenimport fehlt: {manifest_path}. Importiere zuerst den Markdown-Export."
        )

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    input_hash = sha256_file(pdf_path)
    raw_relative = Path("raw") / "pdfs" / f"{args.key}.pdf"
    copied_pdf = source_root / raw_relative
    if copied_pdf.exists():
        existing_hash = sha256_file(copied_pdf)
        if existing_hash != input_hash and not args.force:
            raise FileExistsError(
                f"Für {args.key} ist bereits eine andere PDF angehängt. Nutze --force zum bewussten Ersetzen."
            )
    copied_pdf.parent.mkdir(parents=True, exist_ok=True)
    if not copied_pdf.exists() or sha256_file(copied_pdf) != input_hash:
        shutil.copy2(pdf_path, copied_pdf)

    reader = PdfReader(str(pdf_path))
    pages: list[dict] = []
    chunks: list[dict] = []
    text_pages = 0
    text_characters = 0
    scan_like_pages = 0
    embedded_image_objects = 0

    for page_number, page in enumerate(reader.pages, start=1):
        text = (page.extract_text() or "").strip()
        image_objects = count_page_image_objects(page)
        embedded_image_objects += image_objects
        if text:
            text_pages += 1
            text_characters += len(text)
            chunks.append(
                {
                    "sourceId": args.source_id,
                    "representationId": f"pdf-{args.key}",
                    "chunkId": f"{args.source_id}:pdf:{args.key}:page:{page_number:04d}",
                    "heading": f"PDF-Seite {page_number}",
                    "level": 0,
                    "pageNumber": page_number,
                    "startLine": page_number,
                    "endLine": page_number,
                    "markdown": text,
                    "searchText": " ".join(text.split()),
                    "extractionMethod": "pdf-text-layer",
                }
            )
        scan_like = len(text) < 20 and image_objects > 0
        if scan_like:
            scan_like_pages += 1
        media_box = page.mediabox
        pages.append(
            {
                "sourceId": args.source_id,
                "representationId": f"pdf-{args.key}",
                "pageNumber": page_number,
                "widthPt": round(float(media_box.width), 2),
                "heightPt": round(float(media_box.height), 2),
                "rotation": int(page.rotation or 0),
                "textCharacters": len(text),
                "embeddedImageObjects": image_objects,
                "scanLike": scan_like,
            }
        )

    page_count = len(pages)
    text_coverage = (text_pages / page_count) if page_count else 0
    scan_coverage = (scan_like_pages / page_count) if page_count else 0
    has_markdown_index = bool(manifest.get("primaryMarkdown")) and (source_root / "chunks.jsonl").is_file()
    if text_coverage >= 0.8:
        extraction_status = "text-ready"
    elif has_markdown_index:
        extraction_status = "text-backed-by-markdown"
    else:
        extraction_status = "ocr-required"
    representation_kind = "pdf-scan" if scan_coverage >= 0.8 else "pdf"

    index_root = source_root / "pdf" / args.key
    write_jsonl(index_root / "pages.jsonl", pages)
    write_jsonl(index_root / "chunks.jsonl", chunks)

    pdf_record = {
        "id": f"pdf-{args.key}",
        "key": args.key,
        "kind": representation_kind,
        "originalPath": str(pdf_path),
        "localPath": raw_relative.as_posix(),
        "pagesIndex": (Path("pdf") / args.key / "pages.jsonl").as_posix(),
        "chunksIndex": (Path("pdf") / args.key / "chunks.jsonl").as_posix(),
        "bytes": pdf_path.stat().st_size,
        "sha256": input_hash,
        "pages": page_count,
        "textPages": text_pages,
        "textCharacters": text_characters,
        "embeddedImageObjects": embedded_image_objects,
        "scanLikePages": scan_like_pages,
        "extractionStatus": extraction_status,
        "textAuthority": "markdown-export" if extraction_status == "text-backed-by-markdown" else "pdf",
        "visualAuthority": "pdf",
    }

    representations = [
        item for item in manifest.get("representations", []) if item.get("id") != pdf_record["id"]
    ]
    if not any(item.get("id") == "markdown-export" for item in representations) and manifest.get("primaryMarkdown"):
        representations.insert(
            0,
            {
                "id": "markdown-export",
                "kind": "markdown-export",
                "originalPath": manifest.get("originalPath"),
                "primaryMarkdown": manifest.get("primaryMarkdown"),
                "textAuthority": "primary",
                "visualAuthority": "derived",
            },
        )
    representations.append(pdf_record)
    manifest["representations"] = representations

    files = [
        item
        for item in manifest.get("files", [])
        if item.get("path") != f"pdfs/{args.key}.pdf"
    ]
    files.append(
        {
            "path": f"pdfs/{args.key}.pdf",
            "storagePath": raw_relative.as_posix(),
            "bytes": pdf_record["bytes"],
            "sha256": input_hash,
            "type": "pdf",
        }
    )
    manifest["files"] = files
    stats = manifest.setdefault("stats", {})
    stats["files"] = len(files)
    stats["pdfFiles"] = len([item for item in representations if item.get("kind", "").startswith("pdf")])
    stats["pdfPages"] = sum(int(item.get("pages", 0)) for item in representations if item.get("kind", "").startswith("pdf"))
    stats["bytes"] = sum(int(item.get("bytes", 0)) for item in files)
    write_json(manifest_path, manifest)

    combined_path = LOCAL_ROOT / "catalog.json"
    combined = json.loads(combined_path.read_text(encoding="utf-8")) if combined_path.exists() else {"version": 1, "sources": []}
    combined_sources = {source["id"]: source for source in combined.get("sources", [])}
    current = combined_sources.get(args.source_id, {})
    current.update(
        {
            "id": args.source_id,
            "title": definitions[args.source_id]["title"],
            "originalPath": manifest.get("originalPath"),
            "stats": stats,
            "representations": [
                {
                    "id": item.get("id"),
                    "kind": item.get("kind"),
                    "pages": item.get("pages"),
                    "extractionStatus": item.get("extractionStatus"),
                }
                for item in representations
            ],
        }
    )
    combined_sources[args.source_id] = current
    order = {source["id"]: index for index, source in enumerate(source_catalog["sources"])}
    combined["sources"] = sorted(combined_sources.values(), key=lambda item: order.get(item["id"], 999))
    write_json(combined_path, combined)

    print(
        f"PDF angehängt: {definitions[args.source_id]['title']} - {page_count} Seiten, "
        f"{scan_like_pages} Scan-Seiten, Status {extraction_status}"
    )
    print(f"Privat gespeichert: {copied_pdf}")


if __name__ == "__main__":
    main()
