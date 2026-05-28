import { After, Before, ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import { TestWorld } from './world';

Before(async function (this: TestWorld) {
  await this.startBrowser();
});

After(async function (this: TestWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  await this.closeBrowser();
});
