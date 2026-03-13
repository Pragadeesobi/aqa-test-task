import { test } from '../hooks/fixtures';
import { expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { VikunjaPage } from '../pages/vikunjaPage';
import { TeamsPage } from '../pages/teamsPage';
import { teamLocators } from '../test-data/teamLocators';
dotenv.config();

test.describe('Teams CRUD', () => {
  test.beforeEach(async ({ vikunjaPage, teamsPage }) => {
    await vikunjaPage.goto('/');
    await vikunjaPage.login(process.env.TEST_USER!, process.env.TEST_PASSWORD!);
    await teamsPage.gotoTeams();
  });

  test.afterEach(async ({ vikunjaPage }) => {
    await vikunjaPage.logout();
  });

  test('should create a team', async ({ teamsPage }) => {
    const teamName = 'cricket';
    const description = 'A team for cricket lovers';
    await teamsPage.createTeam(teamName, description);
    await teamsPage.assertTeamVisible(teamName);
    console.log(`Team "${teamName}" created and visible`);
  });

  test('should read a team', async ({ teamsPage }) => {
    const teamName = 'basketball';
    const description = 'Team for reading test';
    await teamsPage.createTeam(teamName, description);
    await teamsPage.clickTeamListItem(teamName);
    await teamsPage.assertEditHeader(teamName);
    console.log(`Team "${teamName}" read successfully`);
  });

  test('should update a team', async ({ teamsPage }) => {
    const teamName = 'football';
    const newTeamName = 'soccer';
    const description = 'Team for update test';
    await teamsPage.createTeam(teamName, description);
    await teamsPage.editTeamName(teamName, newTeamName);
    await teamsPage.assertTeamVisible(newTeamName);
    console.log(`Team updated from "${teamName}" to "${newTeamName}"`);
  });

  test('should delete a team', async ({ teamsPage }) => {
    const teamName = 'hockey';
    const description = 'Team for delete test';
    await teamsPage.createTeam(teamName, description);
    await teamsPage.deleteTeam(teamName);
    await teamsPage.gotoTeams();
    
    await teamsPage.assertTeamNotVisible(teamName);
    console.log(`Team "${teamName}" deleted successfully`);
  });

  test('should show error for empty team name on create', async ({ teamsPage }) => {
    await teamsPage.clickCreateTeamButton();
    await teamsPage.fillTeamName('');
    await teamsPage.assertCreateButtonDisabled();
    await teamsPage.closeModal();
    console.log('Create button is disabled for empty team name');
  });

  test('should allow creating teams with duplicate names', async ({ teamsPage }) => {
    const teamName = 'tennis';
    const description = 'First team';
    await teamsPage.createTeam(teamName, description);
    await teamsPage.assertTeamVisible(teamName);
    await teamsPage.gotoTeams();
    await teamsPage.createTeam(teamName, 'Duplicate description');
    await teamsPage.gotoTeams();
    const teams = await teamsPage.getTeamCount(teamName);
    expect(teams).toBeGreaterThanOrEqual(2);
    console.log('Duplicate team names are allowed');
    
  });
});
