#!/usr/bin/env sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENV="$ROOT/.venv"
PDF="${1:-$ROOT/CV_Serhii_Sydoruk_Senior_Frontend.pdf}"

if [ ! -x "$VENV/bin/ats-reader" ]; then
  sh "$ROOT/scripts/setup-audit-pdf.sh"
fi

if [ ! -f "$PDF" ]; then
  echo "PDF not found: $PDF" >&2
  echo "Run: pnpm export:pdf" >&2
  exit 1
fi

"$VENV/bin/ats-reader" "$PDF"
