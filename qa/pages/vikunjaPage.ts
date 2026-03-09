import { Page, expect } from '@playwright/test';
import { locators } from '../test-data/locators';
import { clickAndWait, waitForElement, generateRandomString } from '../utils/uiUtils';

export class VikunjaPage {
     
    constructor(private page: Page) {}
    // Login locators
    async fillUsername(username: string) {
      try {
        await waitForElement(this.page, locators.login.username);
        await this.page.fill(locators.login.username, username);
      } catch (error) {
        console.error('Error filling username:', error);
      }
    }

    async fillPassword(password: string) {
      try {
        await waitForElement(this.page, locators.login.password);
        await this.page.fill(locators.login.password, password);
      } catch (error) {
        console.error('Error filling password:', error);
      }
    }

    async clickLoginButton() {
      try {
        await waitForElement(this.page, locators.login.loginButton);
        await clickAndWait(this.page, locators.login.loginButton);
      } catch (error) {
        console.error('Error clicking login button:', error);
      }
    }

    async clickRegisterLink() {
      try {
        await waitForElement(this.page, locators.login.registerLink);
        await clickAndWait(this.page, locators.login.registerLink);
      } catch (error) {
        console.error('Error clicking register link:', error);
      }
    }

    // Register locators
    async fillRegisterUsername(username: string) {
      try {
        await waitForElement(this.page, locators.register.username);
        await this.page.fill(locators.register.username, username);
      } catch (error) {
        console.error('Error filling register username:', error);
      }
    }

    async fillRegisterEmail(email: string) {
      try {
        await waitForElement(this.page, locators.register.email);
        await this.page.fill(locators.register.email, email);
      } catch (error) {
        console.error('Error filling register email:', error);
      }
    }

    async fillRegisterPassword(password: string) {
      try {
        await waitForElement(this.page, locators.register.password);
        await this.page.fill(locators.register.password, password);
      } catch (error) {
        console.error('Error filling register password:', error);
      }
    }

    async clickCreateAccountButton() {
      try {
        await waitForElement(this.page, locators.register.createAccountButton);
        await clickAndWait(this.page, locators.register.createAccountButton);
      } catch (error) {
        console.error('Error clicking create account button:', error);
      }
    }
  
  async assertRegisterSuccess(username: string) {
    try {
      const headingSelector = locators.heading(username);
      const heading = await this.page.locator(headingSelector);
      await expect(heading).toBeVisible();
      console.log(`Assertion passed: Registration heading for ${username} is visible.`);
    } catch (error) {
      console.error('Register assertion failed:', error);
      throw error;
    }
  }

  async assertLoginSuccess(username: string) {
    try {
      const headingSelector = locators.heading(username);
      const heading = await this.page.locator(headingSelector);
      await expect(heading).toBeVisible();
      console.log(`Assertion passed: Login heading for ${username} is visible.`);
    } catch (error) {
      console.error('Login assertion failed:', error);
      throw error;
    }
  }
 

  async goto(path = '/') {
    try {
      await this.page.goto(path);
      await waitForElement(this.page, 'body');
    } catch (error) {
      console.error('Error in goto:', error);
    }
  }

  async login(username: string, password: string) {
    try {
      console.log(`Login started for username: ${username}`);
      await this.fillUsername(username);
      console.log(`Filled username: ${username}`);
      await this.fillPassword(password);
      console.log(`Filled password: ${password}`);
      await this.clickLoginButton();
      console.log('Clicked login button');
      await waitForElement(this.page, 'body'); // Wait for dashboard
      await this.assertLoginSuccess(username);
      console.log(`Login successful for username: ${username}`);
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  }

  async register() {
    const randomUser = `testuser${generateRandomString(5)}`;
    const randomEmail = `test${generateRandomString(5)}@example.com`;
    const password = process.env.TEST_PASSWORD!;
    try {
      console.log('Registration started');
      await this.clickRegisterLink();
      console.log('Clicked register link');
      await this.fillRegisterUsername(randomUser);
      console.log(`Filled register username: ${randomUser}`);
      await this.fillRegisterEmail(randomEmail);
      console.log(`Filled register email: ${randomEmail}`);
      await this.fillRegisterPassword(password);
      console.log(`Filled register password: ${password}`);
      await this.clickCreateAccountButton();
      console.log('Clicked create account button');
      await waitForElement(this.page, 'body');
      await this.assertRegisterSuccess(randomUser);
      console.log(`Registration successful for username: ${randomUser}`);
      return randomUser;
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  }
}

  
