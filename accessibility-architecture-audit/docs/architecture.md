# Architecture

## Boundaries

- **client/** — browser-facing UI, components, styles, and client-side state.
- **server/** — HTTP/API boundary, validation, business logic, and persistence adapters.
- **docs/** — audit evidence, architecture decisions, and project documentation.
- **test/** — automated accessibility and integration tests.

## First vertical feature slice

**Feature: Accessibility Audit Dashboard**

```text
Browser
  │
  ▼
client/src
  │  GET /api/audits/latest
  ▼
server/src
  │
  ▼
audit data
  │
  └──────────────► client renders findings
```

The first slice should display the audited URL, audit date, Lighthouse accessibility score, finding count, and remediation priority.

## Local setup

1. Install Node.js 20+.
2. Install dependencies.
3. Run the server.
4. Run the client.
5. Run accessibility tests.
6. Run Lighthouse against the selected public URL.

## Definition of done

- Client starts successfully.
- Server exposes `/api/audits/latest`.
- Client renders the returned audit summary.
- Keyboard focus is visible.
- Automated accessibility test passes.
