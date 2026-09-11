"""Install the pinned local OCR runtime into the ignored knowledge directory."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
TARGET = (REPO_ROOT / "knowledge-base" / "local" / ".ocr-runtime").resolve()
LOCAL_ROOT = (REPO_ROOT / "knowledge-base" / "local").resolve()

if LOCAL_ROOT not in TARGET.parents:
    raise SystemExit(f"Unsicheres OCR-Ziel: {TARGET}")

TARGET.mkdir(parents=True, exist_ok=True)
command = [
    sys.executable,
    "-m",
    "pip",
    "install",
    "--no-cache-dir",
    "--upgrade",
    "--target",
    str(TARGET),
    "rapidocr==3.9.2",
    "onnxruntime==1.30.0",
    "pypdf==6.10.0",
]
raise SystemExit(subprocess.run(command, check=False).returncode)
