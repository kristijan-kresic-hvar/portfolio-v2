#!/usr/bin/env bash
# Render cv/index.html → public/cv/kristijan-kresic-cv.pdf via headless Chrome.
# Zero-dependency: uses the system Chrome install. Override with CHROME=/path/to/chrome.
set -euo pipefail
cd "$(dirname "$0")"

OUT="../public/cv/kristijan-kresic-cv.pdf"

if [ -z "${CHROME:-}" ]; then
  for candidate in \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    google-chrome chromium chromium-browser; do
    if command -v "$candidate" >/dev/null 2>&1; then
      CHROME="$candidate"
      break
    fi
  done
fi

if [ -z "${CHROME:-}" ] || ! command -v "$CHROME" >/dev/null 2>&1; then
  echo "Chrome/Chromium not found on PATH or default location (set CHROME env var)" >&2
  exit 1
fi

mkdir -p ../public/cv

"$CHROME" --headless=new --disable-gpu \
  --no-pdf-header-footer \
  --virtual-time-budget=2000 \
  --print-to-pdf="$OUT" \
  "file://$PWD/index.html"

echo "Rendered $OUT"
