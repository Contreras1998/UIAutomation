# Sauce Demo Login BDD Test Plan

## Purpose

This plan documents the Cucumber BDD scenarios for the Sauce Demo login page:

```text
https://www.saucedemo.com/
```

The project demonstrates behavior-driven UI automation. Scenarios are written in Gherkin, implemented through TypeScript step definitions, and executed in a browser through Playwright.

## BDD Structure

```text
tests/features/login.feature
  -> tests/steps/login.steps.ts
    -> tests/page-objects/login.page.ts
    -> tests/page-objects/inventory.page.ts
      -> Sauce Demo in a browser
```

## Page Objects

`LoginPage`

- `goto()`: opens the login page
- `enterUsername(username)`: fills the username field
- `enterPassword(password)`: fills the password field
- `clickLogin()`: submits the form
- `loginAs(username, password)`: performs a complete login attempt
- `submitWithKeyboard()`: submits the form using keyboard navigation

`InventoryPage`

- `inventoryContainer`: main inventory page container
- `title`: page title element
- `validateLoaded()`: checks whether the inventory page is visible

## Test Data

- Valid user: `standard_user` / `secret_sauce`
- Locked user: `locked_out_user` / `secret_sauce`
- Invalid password: `standard_user` / `wrong_pass`
- Security inputs: SQL injection-style and XSS-style payloads
- Edge inputs: long strings, unicode text, and leading or trailing spaces

## Automated Scenarios

### Successful login

Verifies that `standard_user` can log in and reach the inventory page.

### Locked-out user

Verifies that `locked_out_user` receives a clear locked-out error message.

### Invalid credentials

Verifies that a wrong password is rejected and the user remains on the login page.

### Empty username

Verifies that submitting without a username shows a username-required message.

### Empty password

Verifies that submitting without a password shows a password-required message.

### SQL injection-style username

Verifies that a SQL injection-style username is rejected safely.

### XSS-style username

Verifies that script-like input is not executed and is rejected safely.

### Extremely long input

Verifies that very long username and password values do not crash the application.

### Unicode input

Verifies that non-ASCII input is handled consistently.

### Leading and trailing whitespace

Verifies that whitespace around the username is handled consistently.

### Keyboard navigation

Verifies that the login form can be operated with keyboard input.

## Manual Scenario

### Rapid repeated failed attempts

This scenario is tagged `@manual` because rate limiting can be environment-dependent and may create unstable automated results. It is documented in the feature file but excluded from normal Cucumber runs.
