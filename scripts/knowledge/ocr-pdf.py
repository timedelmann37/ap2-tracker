"""Resume-friendly, local OCR for PDFs in the private AP2 knowledge base.

The script deliberately has no network integration. Pages are rendered with
Poppler's ``pdftoppm`` and recognized either in-process by a local RapidOCR /
ONNX Runtime or by a locally installed Tesseract binary. After every page the
private page and search indexes are written atomically, so an interrupted
full-book run can continue without repeating completed work.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import importlib.util
from importlib import metadata as importlib_metadata
import json
import os
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[2]
LOCAL_ROOT = REPO_ROOT / "knowledge-base" / "local"
DEFAULT_SOURCE_ID = "itlf10-12-2023"
DEFAULT_DPI = 240
DEFAULT_LANGUAGE = "deu"
DEFAULT_RAPIDOCR_LANGUAGE = "german"


class OcrSetupError(RuntimeError):
    """Raised when the required local OCR tooling is unavailable."""


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def sha256_file(file_path: Path) -> str:
    digest = hashlib.sha256()
    with file_path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def atomic_write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    temporary.write_text(content, encoding="utf-8", newline="\n")
    temporary.replace(path)


def atomic_write_json(path: Path, value: object) -> None:
    atomic_write_text(path, json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def atomic_write_jsonl(path: Path, values: Iterable[dict]) -> None:
    content = "\n".join(json.dumps(value, ensure_ascii=False) for value in values)
    atomic_write_text(path, content + ("\n" if content else ""))


def command_path(explicit: str | None, name: str, candidates: list[Path]) -> Path:
    if explicit:
        resolved = shutil.which(explicit)
        explicit_path = Path(explicit).expanduser()
        if resolved:
            return Path(resolved).resolve()
        if explicit_path.is_file():
            return explicit_path.resolve()
        raise OcrSetupError(f"Programm nicht gefunden: {explicit}")

    resolved = shutil.which(name)
    if resolved:
        return Path(resolved).resolve()
    for candidate in candidates:
        if candidate.is_file():
            return candidate.resolve()
    raise OcrSetupError(f"Programm nicht gefunden: {name}")


def find_pdftoppm(explicit: str | None) -> Path:
    bundled = (
        Path.home()
        / ".cache"
        / "codex-runtimes"
        / "codex-primary-runtime"
        / "dependencies"
        / "native"
        / "poppler"
        / "Library"
        / "bin"
        / "pdftoppm.exe"
    )
    configured = explicit or os.environ.get("AP2_PDFTOPPM")
    return command_path(configured, "pdftoppm", [bundled])


def find_tesseract(explicit: str | None) -> Path:
    configured = explicit or os.environ.get("AP2_TESSERACT")
    candidates = [
        Path(os.environ.get("ProgramFiles", r"C:\Program Files")) / "Tesseract-OCR" / "tesseract.exe",
        Path(os.environ.get("LOCALAPPDATA", "")) / "Programs" / "Tesseract-OCR" / "tesseract.exe",
    ]
    try:
        return command_path(configured, "tesseract", candidates)
    except OcrSetupError as error:
        raise OcrSetupError(
            "Keine lokale Tesseract-Engine gefunden. Installiere Tesseract OCR mit dem "
            "deutschen Sprachpaket oder gib den Pfad mit --tesseract bzw. AP2_TESSERACT an."
        ) from error


def configure_python_path(explicit: str | None) -> list[Path]:
    configured = explicit or os.environ.get("AP2_OCR_PYTHONPATH")
    candidates = [Path(item).expanduser() for item in configured.split(os.pathsep)] if configured else []
    default_runtime = LOCAL_ROOT / ".ocr-runtime"
    if default_runtime.is_dir() and default_runtime not in candidates:
        candidates.append(default_runtime)
    if explicit and not all(path.is_dir() for path in candidates):
        missing = [str(path) for path in candidates if not path.is_dir()]
        raise OcrSetupError(f"Lokaler Python-Importpfad fehlt: {', '.join(missing)}")
    resolved: list[Path] = []
    for candidate in candidates:
        if not candidate.is_dir():
            continue
        path = candidate.resolve()
        if path in resolved:
            continue
        if str(path) not in sys.path:
            sys.path.insert(0, str(path))
        resolved.append(path)
    return resolved


def rapidocr_available() -> bool:
    return importlib.util.find_spec("rapidocr") is not None and importlib.util.find_spec("onnxruntime") is not None


def choose_engine(requested: str, tesseract_argument: str | None) -> tuple[str, Path | None]:
    if requested in {"auto", "rapidocr"} and rapidocr_available():
        return "rapidocr", None
    if requested == "rapidocr":
        raise OcrSetupError(
            "RapidOCR ist im lokalen Python-Importpfad nicht vollständig verfügbar. Installiere "
            "rapidocr und onnxruntime nach knowledge-base/local/.ocr-runtime oder setze "
            "--python-path."
        )
    try:
        tesseract = find_tesseract(tesseract_argument)
    except OcrSetupError as error:
        if requested == "tesseract":
            raise
        raise OcrSetupError(
            "Keine lokale OCR-Engine gefunden. Installiere rapidocr und onnxruntime nach "
            "knowledge-base/local/.ocr-runtime oder installiere Tesseract OCR. Es werden "
            "keine PDF-Seiten an externe Dienste gesendet."
        ) from error
    return "tesseract", tesseract


def load_rapidocr(language: str, text_score: float):
    try:
        import onnxruntime
        import rapidocr
        from rapidocr import RapidOCR
    except Exception as error:
        raise OcrSetupError(
            "RapidOCR konnte nicht aus dem lokalen Python-Importpfad geladen werden. "
            f"Ursache: {error}"
        ) from error
    try:
        engine = RapidOCR(
            params={
                "Rec.lang_type": language,
                "Global.text_score": text_score,
            }
        )
    except Exception as error:
        raise OcrSetupError(f"RapidOCR konnte die lokalen Modelle nicht initialisieren: {error}") from error
    try:
        rapidocr_version = importlib_metadata.version("rapidocr")
    except importlib_metadata.PackageNotFoundError:
        rapidocr_version = getattr(rapidocr, "__version__", "unbekannt")
    onnx_version = getattr(onnxruntime, "__version__", "unbekannt")
    return engine, f"RapidOCR {rapidocr_version} / ONNX Runtime {onnx_version}"


def run_checked(command: list[str], timeout: int) -> subprocess.CompletedProcess[str]:
    try:
        result = subprocess.run(
            command,
            check=False,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout,
        )
    except subprocess.TimeoutExpired as error:
        raise RuntimeError(f"Zeitüberschreitung nach {timeout}s: {command[0]}") from error
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "unbekannter Fehler").strip()
        raise RuntimeError(f"{Path(command[0]).name} meldet Fehler {result.returncode}: {detail[:1800]}")
    return result


def check_tesseract(tesseract: Path, language: str) -> str:
    version_result = run_checked([str(tesseract), "--version"], timeout=30)
    version = (version_result.stdout or version_result.stderr).splitlines()[0].strip()
    language_result = run_checked([str(tesseract), "--list-langs"], timeout=30)
    installed = {
        line.strip()
        for line in (language_result.stdout + "\n" + language_result.stderr).splitlines()
        if line.strip() and "available languages" not in line.lower()
    }
    missing = [part for part in language.split("+") if part not in installed]
    if missing:
        found = ", ".join(sorted(installed)) or "keine"
        raise OcrSetupError(
            f"Tesseract-Sprachdaten fehlen: {', '.join(missing)}. Installiert: {found}. "
            "Für dieses Buch wird --language deu empfohlen."
        )
    return version


def parse_page_selection(specification: str, available_pages: list[int]) -> list[int]:
    if specification.strip().lower() in {"all", "alle", "*"}:
        return available_pages
    selected: set[int] = set()
    for part in specification.split(","):
        token = part.strip()
        if not token:
            continue
        if "-" in token:
            start_text, end_text = token.split("-", 1)
            start, end = int(start_text), int(end_text)
            if start > end:
                raise ValueError(f"Ungültiger Seitenbereich: {token}")
            selected.update(range(start, end + 1))
        else:
            selected.add(int(token))
    unavailable = sorted(selected.difference(available_pages))
    if unavailable:
        raise ValueError(f"Seiten außerhalb der PDF: {', '.join(map(str, unavailable))}")
    if not selected:
        raise ValueError("Keine Seiten ausgewählt.")
    return sorted(selected)


def normalize_ocr_text(text: str) -> str:
    normalized = text.replace("\x00", "").replace("\r\n", "\n").replace("\r", "\n")
    lines = [line.rstrip() for line in normalized.split("\n")]
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return "\n".join(lines).strip()


def infer_heading(text: str, page_number: int) -> str:
    for line in text.splitlines():
        candidate = " ".join(line.split()).strip(" -|_")
        if 4 <= len(candidate) <= 140 and not candidate.isdigit():
            return f"PDF-Seite {page_number}: {candidate}"
    return f"PDF-Seite {page_number}"


def render_page(
    pdftoppm: Path,
    pdf_path: Path,
    image_path: Path,
    page_number: int,
    dpi: int,
    timeout: int,
) -> None:
    image_path.parent.mkdir(parents=True, exist_ok=True)
    prefix = image_path.with_suffix("")
    run_checked(
        [
            str(pdftoppm),
            "-f",
            str(page_number),
            "-l",
            str(page_number),
            "-r",
            str(dpi),
            "-gray",
            "-png",
            "-singlefile",
            str(pdf_path),
            str(prefix),
        ],
        timeout=timeout,
    )
    if not image_path.is_file() or image_path.stat().st_size == 0:
        raise RuntimeError(f"Seite {page_number} wurde nicht als PNG gerendert: {image_path}")


def recognize_page_tesseract(
    tesseract: Path,
    image_path: Path,
    language: str,
    psm: int,
    dpi: int,
    timeout: int,
) -> str:
    result = run_checked(
        [
            str(tesseract),
            str(image_path),
            "stdout",
            "-l",
            language,
            "--psm",
            str(psm),
            "--dpi",
            str(dpi),
            "-c",
            "preserve_interword_spaces=1",
        ],
        timeout=timeout,
    )
    return normalize_ocr_text(result.stdout)


def recognize_page_rapidocr(engine, image_path: Path) -> str:
    try:
        result = engine(str(image_path))
    except Exception as error:
        raise RuntimeError(f"RapidOCR konnte {image_path.name} nicht verarbeiten: {error}") from error
    texts = getattr(result, "txts", None)
    if not texts:
        return ""
    boxes = getattr(result, "boxes", None)
    if boxes is None or len(boxes) != len(texts):
        return normalize_ocr_text("\n".join(str(text) for text in texts if str(text).strip()))

    # RapidOCR returns a box for every detected text line. A stable top-to-bottom,
    # left-to-right order produces useful Markdown and search snippets even for
    # diagrams and tables without publishing box geometry.
    positioned: list[tuple[float, float, str]] = []
    for box, text in zip(boxes, texts):
        value = str(text).strip()
        if not value:
            continue
        y = min(float(point[1]) for point in box)
        x = min(float(point[0]) for point in box)
        positioned.append((y, x, value))
    positioned.sort(key=lambda item: (round(item[0] / 8), item[1], item[0]))
    return normalize_ocr_text("\n".join(item[2] for item in positioned))


def page_text_path(text_root: Path, page_number: int) -> Path:
    return text_root / f"page-{page_number:04d}.txt"


def relative_private_path(path: Path, source_root: Path) -> str:
    return path.relative_to(source_root).as_posix()


def make_chunk(source_id: str, page_number: int, text: str) -> dict:
    return {
        "sourceId": source_id,
        "chunkId": f"{source_id}:page:{page_number:04d}",
        "heading": infer_heading(text, page_number),
        "level": 0,
        "pageNumber": page_number,
        "startLine": page_number,
        "endLine": page_number,
        "markdown": text,
        "searchText": " ".join(text.split()),
        "extractionMethod": "local-ocr",
    }


def sync_indexes(
    source_root: Path,
    source_id: str,
    pages: list[dict],
    manifest: dict,
    progress: dict,
    text_root: Path,
) -> None:
    chunks: list[dict] = []
    completed_pages = 0
    text_pages = 0
    text_characters = 0

    for page in sorted(pages, key=lambda item: int(item["pageNumber"])):
        page_number = int(page["pageNumber"])
        record = progress.get("pages", {}).get(str(page_number), {})
        text_path = page_text_path(text_root, page_number)
        if record.get("status") not in {"completed", "empty"} or not text_path.exists():
            if "ocrStatus" in page:
                page["textCharacters"] = 0
                for key in ("ocrStatus", "ocrTextPath", "ocrEngine", "ocrLanguage"):
                    page.pop(key, None)
            continue
        text = normalize_ocr_text(text_path.read_text(encoding="utf-8", errors="replace"))
        completed_pages += 1
        text_characters += len(text)
        if text:
            text_pages += 1
            chunks.append(make_chunk(source_id, page_number, text))
        page.update(
            {
                "textCharacters": len(text),
                "ocrStatus": "completed" if text else "empty",
                "ocrTextPath": relative_private_path(text_path, source_root),
                "ocrEngine": progress.get("engine", "tesseract"),
                "ocrLanguage": progress.get("language", DEFAULT_LANGUAGE),
            }
        )

    atomic_write_jsonl(source_root / "pages.jsonl", sorted(pages, key=lambda item: int(item["pageNumber"])))
    atomic_write_jsonl(source_root / "chunks.jsonl", chunks)

    total_pages = len(pages)
    if completed_pages == total_pages:
        extraction_status = "ocr-ready"
    elif completed_pages:
        extraction_status = "ocr-in-progress"
    else:
        extraction_status = "ocr-required"
    stats = manifest.setdefault("stats", {})
    stats.update(
        {
            "chunks": len(chunks),
            "textPages": text_pages,
            "textCharacters": text_characters,
            "ocrPages": completed_pages,
            "extractionStatus": extraction_status,
        }
    )
    manifest["ocr"] = {
        "engine": progress.get("engine", "tesseract"),
        "engineVersion": progress.get("engineVersion"),
        "language": progress.get("language", DEFAULT_LANGUAGE),
        "dpi": progress.get("dpi", DEFAULT_DPI),
        "completedPages": completed_pages,
        "updatedAt": progress.get("updatedAt"),
        "progressPath": "ocr/progress.json",
    }
    atomic_write_json(source_root / "manifest.json", manifest)

    catalog_path = LOCAL_ROOT / "catalog.json"
    if catalog_path.exists():
        catalog = read_json(catalog_path)
        for source in catalog.get("sources", []):
            if source.get("id") == source_id:
                source["stats"] = dict(stats)
                break
        atomic_write_json(catalog_path, catalog)


def create_or_validate_progress(
    progress_path: Path,
    source_id: str,
    pdf_hash: str,
    dpi: int,
    engine: str,
    language: str,
    psm: int | None,
    rapidocr_text_score: float | None,
    force: bool,
    all_pages_selected: bool,
) -> dict:
    if progress_path.exists():
        progress = read_json(progress_path)
        if progress.get("pdfSha256") != pdf_hash:
            raise RuntimeError(
                "Die importierte PDF hat sich seit Beginn der OCR geändert. "
                "Importiere sie erneut und entferne anschließend den privaten OCR-Arbeitsordner bewusst."
            )
        changed = [
            label
            for label, old, new in (
                ("Engine", progress.get("engine", "tesseract"), engine),
                ("DPI", progress.get("dpi"), dpi),
                ("Sprache", progress.get("language"), language),
                ("PSM", progress.get("psm"), psm),
                ("RapidOCR text_score", progress.get("rapidocrTextScore"), rapidocr_text_score),
            )
            if old != new
        ]
        has_results = any(
            record.get("status") in {"completed", "empty"}
            for record in progress.get("pages", {}).values()
        )
        if changed and has_results and not force:
            raise RuntimeError(
                f"OCR-Einstellungen unterscheiden sich ({', '.join(changed)}). "
                "Nutze dieselben Werte oder wiederhole alle Seiten bewusst mit --force."
            )
        if changed and has_results and force and not all_pages_selected:
            raise RuntimeError("Bei geänderten OCR-Einstellungen muss --force mit --pages all verwendet werden.")
    else:
        progress = {
            "version": 1,
            "sourceId": source_id,
            "pdfSha256": pdf_hash,
            "createdAt": utc_now(),
            "pages": {},
        }
    progress.update(
        {
            "dpi": dpi,
            "language": language,
            "psm": psm,
            "rapidocrTextScore": rapidocr_text_score,
            "engine": engine,
            "updatedAt": utc_now(),
        }
    )
    return progress


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="OCRt eine privat importierte Scan-PDF lokal und setzt abgebrochene Läufe fort."
    )
    parser.add_argument("--source-id", default=DEFAULT_SOURCE_ID, help="Quellen-ID unter knowledge-base/local")
    parser.add_argument("--pages", default="all", help="Seiten, z. B. 1,5-8 oder all")
    parser.add_argument("--dpi", type=int, default=DEFAULT_DPI, help="Renderauflösung für OCR")
    parser.add_argument(
        "--engine",
        choices=("auto", "rapidocr", "tesseract"),
        default="auto",
        help="Lokale OCR-Engine; auto bevorzugt RapidOCR",
    )
    parser.add_argument(
        "--python-path",
        help="Lokaler Importpfad für rapidocr und onnxruntime; Standard: knowledge-base/local/.ocr-runtime",
    )
    parser.add_argument(
        "--rapidocr-language",
        default=DEFAULT_RAPIDOCR_LANGUAGE,
        help="RapidOCR-Erkennungssprache; für dieses Buch: german",
    )
    parser.add_argument(
        "--rapidocr-text-score",
        type=float,
        default=0.45,
        help="Minimale RapidOCR-Konfidenz zwischen 0 und 1",
    )
    parser.add_argument("--language", default=DEFAULT_LANGUAGE, help="Tesseract-Sprachen, z. B. deu+eng")
    parser.add_argument("--psm", type=int, default=3, help="Tesseract Page Segmentation Mode")
    parser.add_argument("--workers", type=int, default=2, help="Parallele lokale OCR-Prozesse")
    parser.add_argument("--tesseract", help="Expliziter Pfad zur lokalen Tesseract-Binärdatei")
    parser.add_argument("--pdftoppm", help="Expliziter Pfad zu pdftoppm")
    parser.add_argument("--keep-images", action="store_true", help="Gerenderte PNGs nach OCR behalten")
    parser.add_argument("--force", action="store_true", help="Ausgewählte bereits fertige Seiten erneut OCRen")
    parser.add_argument("--dry-run", action="store_true", help="Auswahl und Resume-Status prüfen, nichts rendern")
    parser.add_argument(
        "--render-only",
        action="store_true",
        help="Ausgewählte Seiten lokal als PNG rendern, ohne OCR-Indizes zu verändern",
    )
    parser.add_argument("--render-timeout", type=int, default=180, help="Timeout pro Rendering in Sekunden")
    parser.add_argument("--ocr-timeout", type=int, default=240, help="Timeout pro OCR in Sekunden")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.dpi < 100 or args.dpi > 600:
        raise ValueError("--dpi muss zwischen 100 und 600 liegen.")
    if args.workers < 1 or args.workers > 8:
        raise ValueError("--workers muss zwischen 1 und 8 liegen.")
    if args.psm < 0 or args.psm > 13:
        raise ValueError("--psm muss zwischen 0 und 13 liegen.")
    if not 0 <= args.rapidocr_text_score <= 1:
        raise ValueError("--rapidocr-text-score muss zwischen 0 und 1 liegen.")

    source_root = (LOCAL_ROOT / args.source_id).resolve()
    if LOCAL_ROOT.resolve() not in source_root.parents:
        raise ValueError("Ungültige Quellen-ID außerhalb der lokalen Wissensbasis.")
    pdf_path = source_root / "raw" / "source.pdf"
    pages_path = source_root / "pages.jsonl"
    manifest_path = source_root / "manifest.json"
    if not pdf_path.is_file() or not pages_path.is_file() or not manifest_path.is_file():
        raise FileNotFoundError(
            f"PDF-Import unvollständig unter {source_root}. Führe zuerst scripts/knowledge/import-pdf.py aus."
        )

    pages = read_jsonl(pages_path)
    if not pages:
        raise RuntimeError(f"Leerer Seitenindex: {pages_path}")
    available_pages = sorted(int(page["pageNumber"]) for page in pages)
    selected_pages = parse_page_selection(args.pages, available_pages)
    all_pages_selected = selected_pages == available_pages
    manifest = read_json(manifest_path)
    pdf_hash = manifest.get("files", [{}])[0].get("sha256") or sha256_file(pdf_path)

    ocr_root = source_root / "ocr"
    text_root = ocr_root / "text"
    rendered_root = ocr_root / "rendered"
    progress_path = ocr_root / "progress.json"
    existing_progress = read_json(progress_path) if progress_path.exists() else {"pages": {}}
    if existing_progress.get("pdfSha256") not in {None, pdf_hash}:
        raise RuntimeError(
            "Die importierte PDF hat sich seit Beginn der OCR geändert. "
            "Importiere sie erneut und entferne anschließend den privaten OCR-Arbeitsordner bewusst."
        )
    completed = {
        int(page_number)
        for page_number, record in existing_progress.get("pages", {}).items()
        if record.get("status") in {"completed", "empty"}
        and page_text_path(text_root, int(page_number)).exists()
    }
    pending = selected_pages if args.force else [page for page in selected_pages if page not in completed]
    print(
        f"Quelle {args.source_id}: {len(selected_pages)} ausgewählt, "
        f"{len(selected_pages) - len(pending)} bereits fertig, {len(pending)} offen."
    )

    if args.dry_run:
        print("Dry run: keine Dateien verändert.")
        return 0

    pdftoppm = find_pdftoppm(args.pdftoppm)
    if args.render_only:
        for page_number in selected_pages:
            image_path = rendered_root / f"page-{page_number:04d}.png"
            render_page(pdftoppm, pdf_path, image_path, page_number, args.dpi, args.render_timeout)
            print(f"Gerendert: Seite {page_number} -> {image_path}")
        return 0

    if not pending:
        existing_progress["updatedAt"] = utc_now()
        atomic_write_json(progress_path, existing_progress)
        sync_indexes(source_root, args.source_id, pages, manifest, existing_progress, text_root)
        print("OCR bereits vollständig für die ausgewählten Seiten; Indizes wurden synchronisiert.")
        return 0

    python_paths = configure_python_path(args.python_path)
    requested_engine = args.engine
    if requested_engine == "auto" and completed:
        requested_engine = existing_progress.get("engine", "auto")
    engine_name, tesseract = choose_engine(requested_engine, args.tesseract)
    effective_language = args.rapidocr_language if engine_name == "rapidocr" else args.language
    effective_psm = args.psm if engine_name == "tesseract" else None
    effective_score = args.rapidocr_text_score if engine_name == "rapidocr" else None
    progress = create_or_validate_progress(
        progress_path,
        args.source_id,
        pdf_hash,
        args.dpi,
        engine_name,
        effective_language,
        effective_psm,
        effective_score,
        args.force,
        all_pages_selected,
    )

    # Recover the tiny interruption window between writing a page text file and
    # updating progress.json. Existing job metadata proves the file belongs to
    # the same PDF and OCR configuration.
    for page_number in available_pages:
        text_path = page_text_path(text_root, page_number)
        record = progress.setdefault("pages", {}).get(str(page_number))
        if text_path.exists() and not record:
            text = normalize_ocr_text(text_path.read_text(encoding="utf-8", errors="replace"))
            progress["pages"][str(page_number)] = {
                "status": "completed" if text else "empty",
                "textCharacters": len(text),
                "textPath": relative_private_path(text_path, source_root),
                "recovered": True,
                "completedAt": utc_now(),
            }

    completed = {
        int(page_number)
        for page_number, record in progress.get("pages", {}).items()
        if record.get("status") in {"completed", "empty"}
        and page_text_path(text_root, int(page_number)).exists()
    }
    pending = selected_pages if args.force else [page for page in selected_pages if page not in completed]
    if not pending:
        progress["updatedAt"] = utc_now()
        atomic_write_json(progress_path, progress)
        sync_indexes(source_root, args.source_id, pages, manifest, progress, text_root)
        print("Verwaiste Seitentexte wurden wiederhergestellt; keine OCR mehr nötig.")
        return 0

    rapidocr_engine = None
    if engine_name == "rapidocr":
        rapidocr_engine, engine_version = load_rapidocr(args.rapidocr_language, args.rapidocr_text_score)
        worker_count = 1
        if args.workers != 1:
            print("RapidOCR nutzt einen Prozess; ONNX Runtime parallelisiert die Inferenz intern.")
    else:
        if tesseract is None:
            raise OcrSetupError("Interner Fehler: Tesseract-Pfad fehlt.")
        engine_version = check_tesseract(tesseract, args.language)
        worker_count = min(args.workers, len(pending))
    progress["engineVersion"] = engine_version
    if python_paths and engine_name == "rapidocr":
        progress["pythonPath"] = [str(path) for path in python_paths]
    progress["updatedAt"] = utc_now()
    if args.force:
        for page_number in selected_pages:
            progress["pages"][str(page_number)] = {
                "status": "pending-reprocess",
                "queuedAt": progress["updatedAt"],
            }
    atomic_write_json(progress_path, progress)
    if args.force:
        sync_indexes(source_root, args.source_id, pages, manifest, progress, text_root)
    print(f"Lokale Engine: {engine_version}; Poppler: {pdftoppm}")

    def process(page_number: int) -> tuple[int, str, Path]:
        image_path = rendered_root / f"page-{page_number:04d}.png"
        render_page(pdftoppm, pdf_path, image_path, page_number, args.dpi, args.render_timeout)
        if engine_name == "rapidocr":
            text = recognize_page_rapidocr(rapidocr_engine, image_path)
        else:
            text = recognize_page_tesseract(
                tesseract,
                image_path,
                args.language,
                args.psm,
                args.dpi,
                args.ocr_timeout,
            )
        return page_number, text, image_path

    failures: list[tuple[int, str]] = []
    interrupted = False
    executor = concurrent.futures.ThreadPoolExecutor(max_workers=worker_count)
    future_to_page = {executor.submit(process, page): page for page in pending}
    try:
        for future in concurrent.futures.as_completed(future_to_page):
            page_number = future_to_page[future]
            try:
                _, text, image_path = future.result()
                text_path = page_text_path(text_root, page_number)
                atomic_write_text(text_path, text + ("\n" if text else ""))
                progress["pages"][str(page_number)] = {
                    "status": "completed" if text else "empty",
                    "textCharacters": len(text),
                    "textPath": relative_private_path(text_path, source_root),
                    "completedAt": utc_now(),
                }
                if not args.keep_images:
                    image_path.unlink(missing_ok=True)
                print(f"OCR: Seite {page_number} - {len(text)} Zeichen")
            except Exception as error:  # Continue to preserve progress on other pages.
                message = str(error)
                failures.append((page_number, message))
                progress["pages"][str(page_number)] = {
                    "status": "failed",
                    "error": message[:1800],
                    "failedAt": utc_now(),
                }
                print(f"FEHLER: Seite {page_number} - {message}", file=sys.stderr)
            progress["updatedAt"] = utc_now()
            atomic_write_json(progress_path, progress)
            sync_indexes(source_root, args.source_id, pages, manifest, progress, text_root)
    except KeyboardInterrupt:
        interrupted = True
        print("Abbruch angefordert; fertige Seiten bleiben gespeichert.", file=sys.stderr)
        for future in future_to_page:
            future.cancel()
    finally:
        executor.shutdown(wait=not interrupted, cancel_futures=interrupted)

    if interrupted:
        return 130
    if failures:
        print(f"{len(failures)} Seite(n) fehlgeschlagen. Ein erneuter Aufruf versucht nur offene Seiten.", file=sys.stderr)
        return 1

    print(f"OCR-Lauf abgeschlossen: {len(pending)} neue Seite(n).")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OcrSetupError, FileNotFoundError, RuntimeError, ValueError) as error:
        print(f"OCR nicht gestartet: {error}", file=sys.stderr)
        raise SystemExit(2) from error
