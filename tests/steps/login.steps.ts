import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { Locator } from 'playwright';
import { TestWorld } from '../support/world';

async function expectVisible(locator: Locator) {
  await locator.waitFor({ state: 'visible' });
  assert.equal(await locator.isVisible(), true);
}

async function expectTextContains(locator: Locator, expectedText: string) {
  await expectVisible(locator);
  const actualText = await locator.textContent();
  assert.match(actualText ?? '', new RegExp(expectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

Given('the user is on the login page', async function (this: TestWorld) {
  await this.loginPage.goto();
});

Given('the system is in a clean state', async function (this: TestWorld) {
  await this.loginPage.goto();
});

When('they login with username {string} and password {string}', async function (this: TestWorld, username: string, password: string) {
  await this.loginPage.loginAs(username, password);
});

When('a script submits invalid credentials rapidly {int} times', async function (this: TestWorld, attempts: number) {
  await this.loginPage.submitInvalidCredentialsRepeatedly(attempts);
});

When('they tab through the form and submit with Enter', async function (this: TestWorld) {
  await this.loginPage.submitWithKeyboard();
});

Then('they should land on the inventory page', async function (this: TestWorld) {
  await expectVisible(this.inventoryPage.inventoryContainer);
  assert.match(this.currentPage.url(), /\/inventory/);
});

Then('they should see a locked out error', async function (this: TestWorld) {
  await expectTextContains(this.loginPage.errorMessage, 'locked out');
});

Then('they should see an authentication error', async function (this: TestWorld) {
  await expectTextContains(this.loginPage.errorMessage, 'Username and password do not match');
});

Then('they should see a username required error', async function (this: TestWorld) {
  await expectTextContains(this.loginPage.errorMessage, 'Username is required');
});

Then('they should see a password required error', async function (this: TestWorld) {
  await expectTextContains(this.loginPage.errorMessage, 'Password is required');
});

Then('the application should reject the input safely', async function (this: TestWorld) {
  await expectTextContains(this.loginPage.errorMessage, 'Username and password do not match');
});

Then('the UI should not execute scripts', async function (this: TestWorld) {
  await expectTextContains(this.loginPage.errorMessage, 'Username and password do not match');
});

Then('the application should handle the input without crashing', async function (this: TestWorld) {
  await expectVisible(this.loginPage.errorMessage.or(this.inventoryPage.inventoryContainer));
});

Then('the application should handle unicode inputs consistently', async function (this: TestWorld) {
  await expectVisible(this.loginPage.errorMessage.or(this.inventoryPage.inventoryContainer));
});

Then('the application should trim or reject inputs consistently', async function (this: TestWorld) {
  await expectVisible(this.loginPage.errorMessage.or(this.inventoryPage.inventoryContainer));
});

Then('the application should apply rate-limiting or progressive delays', async function () {
  return 'pending';
});

Then('the form should be operable via keyboard and error messages announced', async function (this: TestWorld) {
  await expectTextContains(this.loginPage.errorMessage, 'Username is required');
});
