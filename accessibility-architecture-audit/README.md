# Accessibility + Architecture Audit Project

## Selected public website
**Google Search homepage:** https://www.google.com/

## Goal
This repository demonstrates:
1. A public-facing accessibility audit.
2. A keyboard-only navigation checklist.
3. A monorepo-style client/server/docs/test structure.
4. An architecture README and first vertical feature-slice design.

## Repository structure

```text
accessibility-architecture-audit/
├── client/
│   └── src/
├── server/
│   └── src/
├── docs/
│   ├── audit/
│   │   ├── accessibility-audit-template.csv
│   │   └── audit-report.md
│   ├── architecture.md
│   └── screenshots/
├── test/
│   └── accessibility/
├── scripts/
│   └── lighthouse.sh
└── README.md
```

## Local setup

### Prerequisites
- Node.js 20+
- npm
- Google Chrome/Chromium

### Install
```bash
npm install
```

### Run Lighthouse
```bash
bash scripts/lighthouse.sh
```

The script writes a JSON report to `docs/audit/lighthouse-report.json`.

### Keyboard-only pass
Open `https://www.google.com/` in a private browser window and use **Tab** and **Shift+Tab** only. Confirm visible focus, logical order, keyboard activation, and absence of traps; add screenshots and final results to `docs/screenshots/`.

> The manual keyboard finding is intentionally marked **TO VERIFY** until the live page is tested.
