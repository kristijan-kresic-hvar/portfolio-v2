#!/usr/bin/env bash
# Render cv/index.html → public/cv/kristijan-kresic-cv.pdf via headless Chrome.
# Zero-dependency: uses the system Chrome install. Override with CHROME=/path/to/chrome.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="../public/cv/kristijan-kresic-cv.pdf"

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME (set CHROME env var)" >&2
  exit 1
fi

mkdir -p ../public/cv

"$CHROME" --headless=new --disable-gpu \
  --no-pdf-header-footer \
  --virtual-time-budget=2000 \
  --print-to-pdf="$OUT" \
  "file://$PWD/index.html"

echo "Rendered $OUT"
