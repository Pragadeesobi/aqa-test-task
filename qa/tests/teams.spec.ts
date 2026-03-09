import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
import { VikunjaPage } from '../pages/vikunjaPage';
import { TeamsPage } from '../pages/teamsPage';
dotenv.config({ path: '.env' });

test.describe('Teams CRUD', () => {
  let page: any;
  let teamsPage: TeamsPage;
  let vikunjaPage: VikunjaPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    vikunjaPage = new VikunjaPage(page);
    teamsPage = new TeamsPage(page);
    await page.goto(process.env.BASE_URL || 'http://localhost:8080');
    await vikunjaPage.login(process.env.TEST_USER!, process.env.TEST_PASSWORD!);
  });

  test.beforeEach(async () => {
    await teamsPage.gotoTeams();
  });

  test.afterAll(async () => {
    await page.context().close();
  });

  test('should create a team', async () => {
    const teamName = 'cricket';
    const description = 'A team for cricket lovers';
    await teamsPage.createTeam(teamName, description);
    
  });

  test('should read a team', async () => {
    const teamName = 'cricket';
    await teamsPage.clickTeamListItem(teamName);
    await teamsPage.assertTeamEditView(teamName);
  });

  test('should update a team', async () => {
    const teamName = 'cricket';
    const newTeamName = 'football';
    await teamsPage.editTeamName(teamName, newTeamName);
    
  });

  test('should delete a team', async () => {
    const newTeamName = 'football';
    await teamsPage.deleteTeam(newTeamName);
  });
});
