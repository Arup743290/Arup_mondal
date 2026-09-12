# Architecture

## Boundaries
- **client/** — browser-facing UI, components, styles, and client-side state.
- **server/** — HTTP/API boundary, validation, business logic, and persistence adapters.
- **docs/** — audit evidence, architecture decisions, and documentation.
- **test/** — automated accessibility and integration tests.

## First vertical feature slice — Accessibility Audit Dashboard
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

The slice should expose the audited URL, audit date, Lighthouse accessibility score, finding count, and remediation priority.

## Why this boundary?
The client remains independent from audit storage, while audit/reporting logic stays behind the server API boundary. Evidence and documentation remain separate from runtime code.

## Local setup
1. Install Node.js 20+.
2. Install dependencies.
3. Run the server and client.
4. Run accessibility tests.
5. Run Lighthouse against the selected public URL.

## Definition of done
- Client starts successfully.
- Server exposes `/api/audits/latest`.
- Client renders the returned audit summary.
- Keyboard focus is visible.
- Automated accessibility test passes.