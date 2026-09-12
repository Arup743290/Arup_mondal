# Accessibility Audit Report

## Scope
**Website:** https://www.google.com/  
**Audit type:** Automated evidence review + keyboard-only checklist  
**Target:** WCAG 2.2 AA

### Evidence note
External automated-tool findings are recorded as evidence, not as proof of complete WCAG conformance. The manual keyboard item remains **TO VERIFY** until tested on the live page.

## Findings

| ID | Issue | WCAG reference | Evidence | Severity | Priority |
|---|---|---|---|---|---|
| WEB-001 | Missing form input label | WCAG 1.3.1 / 3.3.2 | WebAIM reports a missing form input label; WAVE evidence identifies `label_missing`. | High | P1 |
| WEB-002 | Missing document language | WCAG 3.1.1 | WAVE detailed example lists `language_missing`. | Medium | P2 |
| WEB-003 | Empty link | WCAG 2.4.4 | WAVE detailed example lists `link_empty`. | High | P1 |
| WEB-004 | Very low contrast text | WCAG 1.4.3 | WAVE detailed example reports two very-low-contrast instances, with ratios 2.48:1 and 2.81:1. | High | P1 |
| WEB-005 | Keyboard-only focus/order issue | WCAG 2.1.1 / 2.4.3 | **TO VERIFY manually** with Tab/Shift+Tab on the live homepage. | TBD | P1/P2 |

## Remediation

### WEB-001 — Missing form label
Associate the input with a visible `<label>` or another programmatically determinable accessible name.

### WEB-002 — Missing language
Set an appropriate language attribute on the root document, e.g. `<html lang="en">`.

### WEB-003 — Empty link
Give the link an accessible name that communicates its purpose, or remove it from the interactive structure if decorative.

### WEB-004 — Contrast
Adjust foreground/background combinations to meet the applicable WCAG contrast requirement and re-test.

### WEB-005 — Keyboard navigation
Record the first focused element, focus visibility, logical tab order, keyboard activation, and absence of keyboard traps.

## Required screenshots
```text
docs/screenshots/
├── lighthouse-accessibility-score.png
├── lighthouse-finding-1.png
├── keyboard-focus-start.png
└── keyboard-focus-issue.png
```

## Submission checklist
- [ ] Lighthouse run completed
- [ ] Lighthouse screenshot added
- [ ] Keyboard-only pass completed
- [ ] Five findings have evidence
- [ ] CSV updated with final evidence
- [ ] Architecture README reviewed
- [ ] Client/server/docs/test directories present
- [ ] Repository pushed to GitHub