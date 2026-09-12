# Accessibility tests

Recommended checks for the first vertical slice:
- axe-core automated scan of the client page
- keyboard focus visibility
- heading structure
- accessible names for buttons and links

Example future command:
```bash
npx playwright test
```

Do not report a passing result until the test has actually been executed.