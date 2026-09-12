# Accessibility Audit Report

## Scope

**Website:** https://www.google.com/  
**Audit type:** Automated evidence review + keyboard-only checklist  
**Target:** WCAG 2.2 AA

### Evidence note
WebAIM Million 2026 reports 3 detectable accessibility errors for google.com and identifies a missing form input label as the top error type. The WAVE detailed example for google.com also documents missing language, an empty link, and two very-low-contrast instances. These automated findings do not replace a complete manual WCAG audit.

## Five findings

| ID | Issue | WCAG reference | Evidence | Severity | Priority |
|---|---|---|---|---|---|
| WEB-001 | Missing form input label | WCAG 1.3.1 / 3.3.2 | Automated evidence identifies a missing form input label. | High | P1 |
| WEB-002 | Missing document language | WCAG 3.1.1 | WAVE detailed example lists missing language. | Medium | P2 |
| WEB-003 | Empty link | WCAG 2.4.4 | WAVE detailed example lists an empty link. | High | P1 |
| WEB-004 | Very low contrast text | WCAG 1.4.3 | WAVE detailed example reports two very-low-contrast instances. | High | P1 |
| WEB-005 | Keyboard-only focus/order issue | WCAG 2.1.1 / 2.4.3 | **TO VERIFY manually** with Tab/Shift+Tab on the live homepage. | TBD | P1/P2 |

## Remediation

### WEB-001 — Missing form label
Associate the input with a visible `<label>` or another programmatically determinable accessible name.

### WEB-002 — Missing language
Set an appropriate language attribute on the root document, for example `<html lang="en">` where English is the document language.

### WEB-003 — Empty link
Give the link an accessible name that communicates its destination/purpose, or remove it from the interactive structure if decorative.

### WEB-004 — Contrast
Adjust foreground/background combinations to meet the applicable WCAG contrast requirement and re-test.

### WEB-005 — Keyboard navigation
Run a manual keyboard pass and record the first focused element, focus visibility, logical tab order, keyboard activation, and absence of keyboard traps.

## Required screenshots

Add these after completing the local audit:

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
