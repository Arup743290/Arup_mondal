# Accessibility + Architecture Audit Project

## Implementation
This project demonstrates an accessible multi-page HTML5 interface with a navigation header, sidebar, main content area, data tables, modal dialog, and accessible forms.

### Included
- Semantic HTML5: `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`.
- Keyboard-friendly skip links, visible focus indicators, logical tab order, and native dialog behavior.
- Form controls with explicit `label` elements, `aria-label` / `aria-describedby` where useful, `fieldset` / `legend`, required fields, and validation attributes.
- Data tables with captions and scoped row/column headers.
- Separate pages for dashboard, audit data, and accessible forms.
- W3C validation evidence documentation in `docs/html-validator-check.md`.

## Repository structure
```text
accessibility-architecture-audit/
├── index.html
├── styles.css
├── app.js
├── client/src/
├── pages/
│   ├── data.html
│   └── forms.html
├── server/src/
├── docs/
│   ├── audit/
│   ├── architecture.md
│   ├── html-validator-check.md
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

For the manual keyboard pass, use Tab and Shift+Tab only and document focus visibility, logical order, activation, and keyboard traps.

## Validation
The implementation is ready for W3C HTML validation. The repository deliberately does not claim a zero-error validator result until the final HTML pages have been run through the W3C checker.

## Architecture
See `docs/architecture.md` for the client/server boundary and first vertical feature slice.
