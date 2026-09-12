# Accessibility + Architecture Audit Project

## Selected public website
**Google Search homepage:** https://www.google.com/

## Goal
1. A public-facing accessibility audit.
2. A keyboard-only navigation checklist.
3. A monorepo-style client/server/docs/test structure.
4. An architecture README and first vertical feature slice.

## Repository structure
```text
accessibility-architecture-audit/
├── client/src/
├── server/src/
├── docs/
│   ├── audit/
│   ├── architecture.md
│   └── screenshots/
├── test/accessibility/
├── scripts/lighthouse.sh
└── README.md
```

## Local setup
- Node.js 20+
- npm
- Google Chrome/Chromium

Run `bash scripts/lighthouse.sh` to generate `docs/audit/lighthouse-report.json`.

For the manual keyboard pass, use Tab and Shift+Tab only and document focus visibility, logical order, activation, and keyboard traps. Add screenshots to `docs/screenshots/`.

> Manual findings are marked TO VERIFY until the live page has actually been tested.

## Evidence source
The audit report records external automated-tool evidence and clearly separates it from manual verification. Automated tools are not a substitute for complete WCAG conformance testing.