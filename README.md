# UIAutomation

BDD UI automation demo for [Sauce Demo](https://www.saucedemo.com/) using Cucumber, Gherkin, TypeScript step definitions, Playwright browser automation, and the Page Object Model.

The project is intentionally scoped to demonstrate Cucumber-style BDD tests. Playwright is used only as the browser automation library behind the step definitions; there is no separate Playwright Test suite.

## Tech Stack

- Cucumber.js for BDD scenario execution
- Gherkin feature files for readable behavior examples
- Playwright for browser control inside Cucumber steps
- TypeScript for step definitions, support code, and page objects
- Page Object Model for reusable page behavior
- GitHub Actions for CI execution

## Project Structure

```text
.
|-- .github/workflows/cucumber-bdd.yml # CI workflow for the BDD suite
|-- specs/                             # Test planning documents
|-- tests/
|   |-- features/                      # Gherkin feature files
|   |-- page-objects/                  # Page object models
|   |-- steps/                         # Cucumber step definitions
|   `-- support/                       # Cucumber config, world, and hooks
|-- package.json
|-- package-lock.json
`-- tsconfig.json
```

## How The Framework Works

The BDD flow is:

```text
Feature files -> Step definitions -> Page objects -> Browser
```

1. A scenario is written in `tests/features/login.feature`.
2. Cucumber matches each Gherkin step to code in `tests/steps/login.steps.ts`.
3. Step definitions call reusable methods on page objects.
4. Page objects use Playwright to interact with Sauce Demo in a real browser.
5. Assertions in the step definitions verify the expected user-facing behavior.

## Key Files

- `tests/features/login.feature`: business-readable login scenarios
- `tests/steps/login.steps.ts`: step definitions for the feature file
- `tests/page-objects/login.page.ts`: login page locators and actions
- `tests/page-objects/inventory.page.ts`: inventory page locators and state
- `tests/support/config.ts`: environment-driven runtime config
- `tests/support/world.ts`: Cucumber world that creates the browser, page, and page objects
- `tests/support/hooks.ts`: setup, teardown, and failure screenshots

## Prerequisites

- Node.js installed
- npm installed
- Network access to `https://www.saucedemo.com/`

On Windows PowerShell, your execution policy may block `npm.ps1`. If that happens, use `npm.cmd` instead of `npm`.

## Installation

Install dependencies:

```powershell
npm.cmd install
```

Install Playwright browser binaries:

```powershell
npm.cmd run prepare
```

Equivalent non-Windows commands:

```bash
npm install
npm run prepare
```

## Running Tests

Run the BDD suite:

```powershell
npm.cmd test
```

Run the same suite explicitly:

```powershell
npm.cmd run test:bdd
```

Run TypeScript validation:

```powershell
npm.cmd run test:typecheck
```

Run dependency audit:

```powershell
npm.cmd audit
```

The Cucumber run writes reports to:

```text
reports/cucumber-report.html
reports/cucumber-report.json
```

## Environment Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `BASE_URL` | `https://www.saucedemo.com` | Application under test |
| `BROWSER` | `chromium` | Browser for Cucumber: `chromium`, `firefox`, or `webkit` |
| `HEADLESS` | `true` | Set to `false` to run with a visible browser |
| `DEFAULT_TIMEOUT` | `10000` | Playwright action timeout in milliseconds |

Example:

```powershell
$env:BROWSER = "firefox"
npm.cmd run test:bdd
```

## Available npm Scripts

| Script | Purpose |
| --- | --- |
| `npm test` | Runs the automated BDD scenarios |
| `npm run test:bdd` | Runs Cucumber scenarios excluding `@manual` |
| `npm run test:all` | Alias for the BDD suite |
| `npm run test:typecheck` | Runs `tsc --noEmit` |
| `npm run prepare` | Installs Playwright browser binaries |

## Test Coverage

The current BDD scenarios cover:

- Successful login with `standard_user`
- Locked-out user error handling
- Invalid credential handling
- Empty username and password validation
- SQL injection-style input rejection
- XSS-style input handling
- Extremely long input handling
- Unicode input handling
- Leading and trailing whitespace behavior
- Keyboard submit and validation messaging

Scenarios tagged `@manual` are excluded from `npm test` and `npm run test:bdd`. This keeps the automated suite deterministic while preserving exploratory checks in the feature file.

## CI

GitHub Actions workflow: `.github/workflows/cucumber-bdd.yml`

The workflow:

1. Checks out the repository
2. Installs Node.js
3. Runs `npm ci`
4. Installs Playwright browsers
5. Runs TypeScript validation
6. Runs the Cucumber BDD suite
7. Uploads Cucumber reports as an artifact

## Troubleshooting

### PowerShell blocks npm

If PowerShell shows an error like `npm.ps1 cannot be loaded`, run commands with `npm.cmd`:

```powershell
npm.cmd test
```

### Browser tests cannot reach Sauce Demo

The tests require outbound network access to:

```text
https://www.saucedemo.com/
```

If network access is blocked, tests will fail during `page.goto()`.

### Playwright browsers are missing

Run:

```powershell
npm.cmd run prepare
```

### Cucumber step definitions are not found

Check that feature wording matches step definitions in:

```text
tests/steps/login.steps.ts
```
