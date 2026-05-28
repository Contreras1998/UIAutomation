import { Locator, Page } from 'playwright';

export class InventoryPage {
  readonly inventoryContainer: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.title = page.locator('[data-test="title"]');
  }

  async validateLoaded() {
    return this.inventoryContainer.isVisible();
  }

  async getTitle() {
    return this.title.textContent();
  }
}
