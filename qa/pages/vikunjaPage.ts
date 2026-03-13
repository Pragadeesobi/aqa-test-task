import { Page, expect } from '@playwright/test';
import { locators } from '../test-data/locators';
import { clickAndWait, waitForElement, generateRandomString } from '../utils/uiUtils';

export class VikunjaPage {
     
    constructor(private page: Page) {}
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

    async getLoginErrorText() {
      try {
        const errorLocator = this.page.locator(locators.login.errorMessage);
        await expect(errorLocator).toBeVisible();
        const text = await errorLocator.textContent();
        const trimmed = text?.trim() ?? '';
        console.log(`Login error message displayed: ${trimmed}`);
        return trimmed;
      } catch {
        return '';
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

    async getRegisterUsernameErrorText() {
      try {
        const usernameErrorLocator = this.page.locator(locators.register.usernameError);
        await expect(usernameErrorLocator).toBeVisible();
        const text = await usernameErrorLocator.textContent();
        const trimmed = text?.trim() ?? '';
        console.log(`Register username validation message: ${trimmed}`);
        return trimmed;
      } catch (error) {
        console.error('Error reading register username error message:', error);
        throw error;
      }
    }

    async getRegisterEmailErrorText() {
      try {
        const emailErrorLocator = this.page.locator(locators.register.emailError);
        await expect(emailErrorLocator).toBeVisible();
        const text = await emailErrorLocator.textContent();
        const trimmed = text?.trim() ?? '';
        console.log(`Register email validation message: ${trimmed}`);
        return trimmed;
      } catch (error) {
        console.error('Error reading register email error message:', error);
        throw error;
      }
    }

    async getRegisterPasswordErrorText() {
      try {
        const passwordErrorLocator = this.page.locator(locators.register.passwordError);
        await expect(passwordErrorLocator).toBeVisible();
        const text = await passwordErrorLocator.textContent();
        const trimmed = text?.trim() ?? '';
        console.log(`Register password validation message: ${trimmed}`);
        return trimmed;
      } catch (error) {
        console.error('Error reading register password error message:', error);
        throw error;
      }
    }

    async getRegisterErrorText() {
      try {
        const errorLocator = this.page.locator(locators.register.errorMessage);
        await expect(errorLocator).toBeVisible();
        const text = await errorLocator.textContent();
        const trimmed = text?.trim() ?? '';
        console.log(`Register error message displayed: ${trimmed}`);
        return trimmed;
      } catch (error) {
        console.error('Error reading register error message:', error);
        throw error;
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

    async pressEnter() {
      try {
        await this.page.keyboard.press('Enter');
        console.log('Pressed Enter key');
      } catch (error) {
        console.error('Error pressing Enter key:', error);
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
      await this.page.waitForLoadState('domcontentloaded');
      await waitForElement(this.page, 'body');
    } catch (error) {
      console.error('Error in goto:', error);
    }
  }

  async login(username: string, password: string, attempt = 1): Promise<void> {
    try {
      console.log(`Login started for username: ${username} (attempt ${attempt})`);
      await this.fillUsername(username);
      console.log(`Filled username: ${username}`);
      await this.fillPassword(password);
      console.log(`Filled password: ${password}`);
      await this.page.waitForTimeout(2000); // Delay to avoid rate limiting
      await this.clickLoginButton();
      console.log('Clicked login button');

      // Wait for either success or an error message to appear
      await Promise.race([
        this.page.waitForSelector(locators.heading(username), { state: 'visible', timeout: 5000 }),
        this.page.waitForSelector(locators.login.errorMessage, { state: 'visible', timeout: 5000 }),
      ]);

      const errorText = await this.getLoginErrorText();
      if (errorText) {
        console.warn(`Danger message detected: "${errorText}". Waiting 20 seconds then reloading login page...`);
        await this.page.waitForTimeout(20000);
        await this.goto('/');
        await this.page.waitForTimeout(2000);
        return this.login(username, password, attempt + 1);
      }

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

  async logout() {
    try {
      console.log('Logout started');
      await clickAndWait(this.page, locators.logout.dropdown);
      console.log('Clicked dropdown');      await this.page.waitForSelector(locators.logout.button, { state: 'visible', timeout: 2000 });      await clickAndWait(this.page, locators.logout.button);
      console.log('Clicked logout button');
      await waitForElement(this.page, locators.login.loginButton);
      console.log('Logout successful, login button visible');
    } catch (error) {
      console.error('Error in logout:', error);
      throw error;
    }
  }
}

  
