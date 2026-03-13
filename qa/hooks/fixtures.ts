// fixtures.ts
import { test as base } from '@playwright/test';
import { VikunjaPage } from '../pages/vikunjaPage';
import { TeamsPage } from '../pages/teamsPage';

type TestFixtures = {
  vikunjaPage: VikunjaPage;
  teamsPage: TeamsPage;
};

export const test = base.extend<TestFixtures>({
  vikunjaPage: async ({ page }, use) => {
    const vikunjaPage = new VikunjaPage(page);
    await use(vikunjaPage);
  },
  teamsPage: async ({ page }, use) => {
    const teamsPage = new TeamsPage(page);
    await use(teamsPage);
  },
});
// Clear browser storage after each test
// This ensures every test starts with a clean session and avoids test-order dependencies.
// test.afterEach(async ({ page }) => {
//   await page.evaluate(() => {
//     localStorage.clear();
//     sessionStorage.clear();
//   });
//   await page.context().clearCookies();
//   await page.context().clearPermissions();
// });

export { expect } from '@playwright/test';