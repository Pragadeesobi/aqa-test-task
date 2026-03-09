import { Page, expect } from '@playwright/test';
import { teamLocators } from '../test-data/teamLocators';
import { clickAndWait, fillAndAssert, assertToast } from '../utils/uiUtils';

export class TeamsPage {
  async assertEditHeader(name: string) {
    try {
      // Escape quotes in team name for selector
      const headerSelector = `p.card-header-title:has-text('Edit Team "${name}"')`;
      await expect(this.page.locator(headerSelector)).toBeVisible();
      console.log(`Edit header visible for team: ${name}`);
    } catch (error) {
      console.error('Error asserting edit header:', error);
      throw error;
    }
  }

  async fillSearchUser(username: string) {
    try {
      await this.page.fill(teamLocators.searchUserInput, username);
      console.log(`Filled search user: ${username}`);
    } catch (error) {
      console.error('Error filling search user:', error);
      throw error;
    }
  }

  async clickUsername(username: string) {
    try {
      await this.page.click(teamLocators.username(username));
      console.log(`Clicked username: ${username}`);
    } catch (error) {
      console.error('Error clicking username:', error);
      throw error;
    }
  }

  async clickAddToTeamButton() {
    try {
      await clickAndWait(this.page, teamLocators.addToTeamButton);
      console.log('Clicked add to team button');
    } catch (error) {
      console.error('Error clicking add to team button:', error);
      throw error;
    }
  }

  async assertUsernameVisible(username: string) {
    try {
      await expect(this.page.locator(teamLocators.username(username))).toBeVisible();
      console.log(`Username visible: ${username}`);
    } catch (error) {
      console.error('Error asserting username visible:', error);
      throw error;
    }
  }

  async clickDeleteTeamButton() {
    try {
      await clickAndWait(this.page, teamLocators.deleteTeamButton);
      console.log('Clicked delete team button');
    } catch (error) {
      console.error('Error clicking delete team button:', error);
      throw error;
    }
  }

  async clickCreateTeamButton() {
    try {
      await clickAndWait(this.page, teamLocators.createTeamButton);
      console.log('Clicked create team button');
    } catch (error) {
      console.error('Error clicking create team button:', error);
      throw error;
    }
  }

  async fillTeamName(name: string) {
    try {
      await fillAndAssert(this.page, teamLocators.teamNameInput, name);
      console.log(`Filled team name: ${name}`);
    } catch (error) {
      console.error('Error filling team name:', error);
      throw error;
    }
  }

  async clickCreateButton() {
    try {
      await clickAndWait(this.page, teamLocators.createButton);
      console.log('Clicked create button');
    } catch (error) {
      console.error('Error clicking create button:', error);
      throw error;
    }
  }

  async assertSuccessToast() {
    try {
      await assertToast(this.page);
      console.log('Success toast asserted');
    } catch (error) {
      console.error('Error asserting toast:', error);
      throw error;
    }
  }

  async clickTeamListItem(name: string) {
    try {
      await this.page.locator(teamLocators.teamListItem(name)).first().click();
      console.log(`Clicked team list item: ${name}`);
    } catch (error) {
      console.error('Error clicking team list item:', error);
      throw error;
    }
  }

  async fillTeamDescription(description: string) {
    try {
      const desc = this.page.locator(teamLocators.descriptionInput);
      await desc.first().click();
      await desc.first().fill(description);
      console.log(`Filled team description: ${description}`);
    } catch (error) {
      console.error('Error filling team description:', error);
      throw error;
    }
  }

  async clickSaveButton() {
    try {
      await clickAndWait(this.page, teamLocators.saveButton);
      console.log('Clicked save button');
    } catch (error) {
      console.error('Error clicking save button:', error);
      throw error;
    }
  }

  async assertTeamVisible(name: string) {
    try {
      await expect(this.page.locator(teamLocators.teamListItem(name)).first()).toBeVisible();
      console.log(`Team visible: ${name}`);
    } catch (error) {
      console.error('Error asserting team visible:', error);
      throw error;
    }
  }
  // ...existing code...
  constructor(private page: Page) {}
  // ...existing code...

  async gotoTeams() {
      // ...existing code...
    try {
      await clickAndWait(this.page, teamLocators.sideNavTeams);
      await expect(this.page.locator(teamLocators.sideNavTeams)).toBeVisible();
      console.log('Navigated to Teams page');
    } catch (error) {
      console.error('Error navigating to Teams page:', error);
      throw error;
    }
  }

  async createTeam(name: string, description: string) {
      // ...existing code...
    try {
      await this.clickCreateTeamButton();
      await this.fillTeamName(name);
      await this.clickCreateButton();
      await this.assertSuccessToast();
      await this.clickTeamListItem(name);
      await this.fillTeamDescription(description);
      await this.clickSaveButton();
      await this.assertSuccessToast();
      await this.assertTeamVisible(name);
      console.log(`Team created: ${name}`);
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }

  

  async assertTeamEditView(name: string) {
    try {
      // Assert team edit header is visible
      const headerSelector = `p.card-header-title:has-text('Edit Team "${name}"')`;
      await expect(this.page.locator(headerSelector)).toBeVisible();
      console.log(`Assertion passed: Edit header for team ${name} is visible.`);

      // Assert team description is displayed
      await expect(this.page.locator(teamLocators.teamDescriptionContainer)).toBeVisible();
      console.log('Assertion passed: Team description is visible.');

      // Assert team members section is present
      await expect(this.page.locator(teamLocators.teamMembersHeader)).toBeVisible();
      console.log('Assertion passed: Team Members section is visible.');
    } catch (error) {
      console.error(`Assertion failed in assertTeamEditView for team ${name}:`, error);
      throw error;
    }
  }

  async editTeamName(oldName: string, newName: string) {
      // ...existing code...
    try {
      await this.clickTeamListItem(oldName);
      await this.assertEditHeader(oldName);
      await this.fillTeamName(newName);
      await this.clickSaveButton();
      await this.assertSuccessToast();
      // await this.page.pause();
      await this.gotoTeams();
      
      await this.clickTeamListItem(newName);
      await this.assertEditHeader(newName);
      console.log(`Team name updated from ${oldName} to ${newName}`);
    } catch (error) {
      console.error('Error editing team name:', error);
      throw error;
    }
  }

  async addTeamMember(username: string) {
      // ...existing code...
    try {
      await this.fillSearchUser(username);
      await this.clickUsername(username);
      await this.clickAddToTeamButton();
      await this.assertSuccessToast();
      await this.assertUsernameVisible(username);
      console.log(`Team member added: ${username}`);
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  }

  async clickConfirmDeleteButton() {
    try {
      await clickAndWait(this.page, teamLocators.confirmDeleteButton);
      console.log('Clicked confirm delete button');
    } catch (error) {
      console.error('Error clicking confirm delete button:', error);
      throw error;
    }
  }

  async deleteTeam(name: string) {
      // ...existing code...
    try {
      await this.clickTeamListItem(name);
      await this.clickDeleteTeamButton();
      await this.clickConfirmDeleteButton();
      await this.assertSuccessToast();
      console.log(`Team deleted: ${name}`);
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }

  async leaveTeam() {
      // ...existing code...
    try {
      await clickAndWait(this.page, teamLocators.leaveTeamButton);
      await assertToast(this.page);
      console.log('Left the team successfully');
    } catch (error) {
      console.error('Error leaving team:', error);
      throw error;
    }
  }
}

