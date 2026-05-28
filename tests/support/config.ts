export type BrowserName = 'chromium' | 'firefox' | 'webkit';

const supportedBrowsers: BrowserName[] = ['chromium', 'firefox', 'webkit'];

function getBrowserName(): BrowserName {
  const browserName = process.env.BROWSER ?? 'chromium';

  if (supportedBrowsers.includes(browserName as BrowserName)) {
    return browserName as BrowserName;
  }

  throw new Error(`Unsupported browser "${browserName}". Use chromium, firefox, or webkit.`);
}

function getHeadless(): boolean {
  return process.env.HEADLESS?.toLowerCase() !== 'false';
}

export const testConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  browserName: getBrowserName(),
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 10000),
  headless: getHeadless(),
};
