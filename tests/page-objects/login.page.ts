import { Locator, Page } from 'playwright';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigate() {
    await this.goto();
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async loginAs(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async submitWithKeyboard() {
    await this.usernameInput.focus();
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Enter');
  }

  async submitInvalidCredentialsRepeatedly(attempts: number) {
    for (let index = 0; index < attempts; index += 1) {
      await this.loginAs(`invalid_user_${index}`, 'invalid_password');
      await this.errorMessage.waitFor({ state: 'visible' });
    }
  }

  async getErrorText() {
    return this.errorMessage.textContent();
  }
}
