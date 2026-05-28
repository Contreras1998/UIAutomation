import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, firefox, Page, webkit } from 'playwright';
import { InventoryPage } from '../page-objects/inventory.page';
import { LoginPage } from '../page-objects/login.page';
import { testConfig } from './config';

const browserTypes = {
  chromium,
  firefox,
  webkit,
};

export class TestWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  login?: LoginPage;
  inventory?: InventoryPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async startBrowser() {
    this.browser = await browserTypes[testConfig.browserName].launch({
      headless: testConfig.headless,
    });

    this.context = await this.browser.newContext({
      baseURL: testConfig.baseUrl,
    });

    this.context.setDefaultTimeout(testConfig.defaultTimeout);
    this.page = await this.context.newPage();
    this.login = new LoginPage(this.page);
    this.inventory = new InventoryPage(this.page);
  }

  async closeBrowser() {
    await this.context?.close();
    await this.browser?.close();
  }

  get currentPage(): Page {
    if (!this.page) {
      throw new Error('Page has not been initialized. Did the Cucumber Before hook run?');
    }

    return this.page;
  }

  get loginPage(): LoginPage {
    if (!this.login) {
      throw new Error('LoginPage has not been initialized. Did the Cucumber Before hook run?');
    }

    return this.login;
  }

  get inventoryPage(): InventoryPage {
    if (!this.inventory) {
      throw new Error('InventoryPage has not been initialized. Did the Cucumber Before hook run?');
    }

    return this.inventory;
  }
}

setWorldConstructor(TestWorld);
