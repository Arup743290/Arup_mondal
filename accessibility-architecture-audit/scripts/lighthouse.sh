#!/usr/bin/env bash
set -euo pipefail

mkdir -p docs/audit

npx --yes lighthouse https://www.google.com/ \
  --only-categories=accessibility \
  --output=json \
  --output-path=docs/audit/lighthouse-report.json \
  --chrome-flags="--headless --no-sandbox"

echo "Lighthouse report written to docs/audit/lighthouse-report.json"
