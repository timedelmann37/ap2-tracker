"""Verify the private OCR index and optionally smoke-test PDF rendering."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
OCR_SCRIPT = Path(__file__).with_name("ocr-pdf.py")


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def parse_page_list(specification: str) -> list[int]:
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
    return sorted(pages)


def fail(message: str) -> None:
    raise AssertionError(message)


def verify_rendered_image(path: Path) -> str:
    local_runtime = LOCAL_ROOT / ".ocr-runtime"
    if local_runtime.is_dir() and str(local_runtime.resolve()) not in sys.path:
        sys.path.insert(0, str(local_runtime.resolve()))
    try:
        from PIL import Image, ImageStat
    except ImportError as error:
        raise AssertionError(
            "Für den optionalen Rendering-Smoke-Test fehlt Pillow. Installiere es in den lokalen OCR-Importpfad."
        ) from error
    if not path.is_file():
        fail(f"Render fehlt: {path}")
    with Image.open(path) as image:
        image.verify()
    with Image.open(path) as image:
        width, height = image.size
        if width < 500 or height < 500:
            fail(f"Render zu klein: {path} ({width}x{height})")
        grayscale = image.convert("L")
        extrema = grayscale.getextrema()
        deviation = ImageStat.Stat(grayscale.resize((256, 256))).stddev[0]
        if extrema[0] == extrema[1] or deviation < 1:
            fail(f"Render scheint leer zu sein: {path}")
    return f"{width}x{height}, Kontrastabweichung {deviation:.1f}"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Prüft OCR-Fortschritt, Seitenindex und Volltextindex.")
    parser.add_argument("--source-id", default="itlf10-12-2023")
    parser.add_argument("--expect-pages", help="Diese Seiten müssen erfolgreich OCRt sein, z. B. 1,206,413")
    parser.add_argument("--expect-text-pages", help="Diese Stichprobenseiten müssen erkannten Text enthalten")
    parser.add_argument("--require-complete", action="store_true", help="Alle PDF-Seiten müssen OCRt sein")
    parser.add_argument(
        "--min-text-coverage",
        type=float,
        default=0.8,
        help="Mindestanteil nichtleerer Textseiten bei --require-complete",
    )
    parser.add_argument(
        "--render-smoke",
        help="Diese repräsentativen Seiten vor der Prüfung neu rendern, z. B. 1,206,413",
    )
    parser.add_argument("--dpi", type=int, default=160, help="DPI nur für den Rendering-Smoke-Test")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if not 0 <= args.min_text_coverage <= 1:
        fail("--min-text-coverage muss zwischen 0 und 1 liegen.")
    source_root = (LOCAL_ROOT / args.source_id).resolve()
    if LOCAL_ROOT.resolve() not in source_root.parents:
        fail("Ungültige Quellen-ID außerhalb der lokalen Wissensbasis.")
    pdf_path = source_root / "raw" / "source.pdf"
    pages_path = source_root / "pages.jsonl"
    chunks_path = source_root / "chunks.jsonl"
    manifest_path = source_root / "manifest.json"
    for required in (pdf_path, pages_path, chunks_path, manifest_path):
        if not required.exists():
            fail(f"Erforderliche Datei fehlt: {required}")

    if args.render_smoke:
        smoke_pages = parse_page_list(args.render_smoke)
        command = [
            sys.executable,
            str(OCR_SCRIPT),
            "--source-id",
            args.source_id,
            "--pages",
            ",".join(map(str, smoke_pages)),
            "--dpi",
            str(args.dpi),
            "--render-only",
        ]
        result = subprocess.run(command, check=False)
        if result.returncode != 0:
            fail(f"Rendering-Smoke-Test fehlgeschlagen (Exit {result.returncode}).")
        for page_number in smoke_pages:
            path = source_root / "ocr" / "rendered" / f"page-{page_number:04d}.png"
            detail = verify_rendered_image(path)
            print(f"Render Seite {page_number}: {detail}")

    pages = read_jsonl(pages_path)
    chunks = read_jsonl(chunks_path)
    manifest = read_json(manifest_path)
    page_numbers = [int(page["pageNumber"]) for page in pages]
    if not pages or len(page_numbers) != len(set(page_numbers)):
        fail("Seitenindex ist leer oder enthält doppelte Seitennummern.")
    if page_numbers != sorted(page_numbers):
        fail("Seitenindex ist nicht nach Seitennummer sortiert.")
    declared_pages = int(manifest.get("stats", {}).get("pages", 0))
    if declared_pages != len(pages):
        fail(f"Manifest nennt {declared_pages} Seiten, pages.jsonl enthält {len(pages)}.")

    chunk_ids = [chunk["chunkId"] for chunk in chunks]
    if len(chunk_ids) != len(set(chunk_ids)):
        fail("chunks.jsonl enthält doppelte chunkId-Werte.")
    if any(chunk.get("sourceId") != args.source_id for chunk in chunks):
        fail("chunks.jsonl enthält Einträge einer anderen Quelle.")

    completed_pages = {
        int(page["pageNumber"])
        for page in pages
        if page.get("ocrStatus") in {"completed", "empty"}
    }
    text_pages = {int(page["pageNumber"]) for page in pages if int(page.get("textCharacters", 0)) > 0}
    chunk_pages = {int(chunk["pageNumber"]) for chunk in chunks}
    if chunk_pages != text_pages:
        fail(
            "Volltextindex und Seitenindex widersprechen sich: "
            f"Chunks {len(chunk_pages)}, Textseiten {len(text_pages)}."
        )

    for page in pages:
        page_number = int(page["pageNumber"])
        if page_number not in completed_pages:
            continue
        relative_text_path = page.get("ocrTextPath")
        if not relative_text_path:
            fail(f"Seite {page_number} hat keinen ocrTextPath.")
        text_path = source_root / relative_text_path
        if not text_path.is_file():
            fail(f"OCR-Text für Seite {page_number} fehlt: {text_path}")
        actual_characters = len(text_path.read_text(encoding="utf-8").strip())
        if actual_characters != int(page.get("textCharacters", -1)):
            fail(f"Zeichenzahl von Seite {page_number} stimmt nicht mit der Textdatei überein.")

    expected = set(parse_page_list(args.expect_pages)) if args.expect_pages else set()
    missing_expected = sorted(expected.difference(completed_pages))
    if missing_expected:
        fail(f"Erwartete OCR-Seiten fehlen: {', '.join(map(str, missing_expected))}")
    expected_text = set(parse_page_list(args.expect_text_pages)) if args.expect_text_pages else set()
    missing_expected_text = sorted(expected_text.difference(text_pages))
    if missing_expected_text:
        fail(f"Erwartete Textseiten sind leer: {', '.join(map(str, missing_expected_text))}")
    if args.require_complete and completed_pages != set(page_numbers):
        missing = sorted(set(page_numbers).difference(completed_pages))
        preview = ", ".join(map(str, missing[:12]))
        fail(f"OCR ist unvollständig: {len(missing)} Seiten fehlen (z. B. {preview}).")
    if args.require_complete:
        coverage = len(text_pages) / len(pages)
        if coverage < args.min_text_coverage:
            fail(
                f"Textabdeckung zu niedrig: {coverage:.1%}; "
                f"erwartet sind mindestens {args.min_text_coverage:.1%}."
            )
        if sum(int(page.get("textCharacters", 0)) for page in pages) < len(pages) * 100:
            fail("Die gesamte OCR-Textausbeute ist auffällig niedrig.")

    stats = manifest.get("stats", {})
    if int(stats.get("chunks", 0)) != len(chunks):
        fail("Chunk-Zahl im Manifest ist nicht aktuell.")
    if int(stats.get("ocrPages", len(completed_pages))) != len(completed_pages):
        fail("OCR-Seitenzahl im Manifest ist nicht aktuell.")

    print(
        f"OCR-Index gültig: {len(pages)} Seiten, {len(completed_pages)} verarbeitet, "
        f"{len(chunks)} durchsuchbare Textseiten."
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, FileNotFoundError, ValueError, json.JSONDecodeError) as error:
        print(f"OCR-Prüfung fehlgeschlagen: {error}", file=sys.stderr)
        raise SystemExit(1) from error
