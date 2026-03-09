// fixtures.ts
import { test as base } from '@playwright/test';
import { VikunjaPage } from '../pages/vikunjaPage';

type TestFixtures = {
  vikunjaPage: VikunjaPage;
};

export const test = base.extend<TestFixtures>({
  vikunjaPage: async ({ page }, use) => {
    const vikunjaPage = new VikunjaPage(page);
    await use(vikunjaPage);
  },
});
// Clear browser storage after each test
test.afterEach(async ({ page }) => {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

export { expect } from '@playwright/test';