import { expect, test } from '../hooks/fixtures';
import * as dotenv from 'dotenv';
import { VikunjaPage } from '../pages/vikunjaPage';
dotenv.config();

test.describe('Authentication', () => {
  test.beforeEach(async ({ vikunjaPage }) => {
    await vikunjaPage.goto('/');
  });

  test('should register a new user', async ({ vikunjaPage }) => {
    await vikunjaPage.register();
  });

  test('should login with existing user', async ({ vikunjaPage }) => {
    await vikunjaPage.login(process.env.TEST_USER!, process.env.TEST_PASSWORD!);
    await vikunjaPage.logout();
  });

  test('should show error for invalid login credentials', async ({ vikunjaPage }) => {
    const invalidUsername = 'testdggdgd123';
    const invalidPassword = 'dssdsdsd';

    await vikunjaPage.fillUsername(invalidUsername);
    await vikunjaPage.fillPassword(invalidPassword);
    await vikunjaPage.clickLoginButton();

    const errorText = await vikunjaPage.getLoginErrorText();
    expect(errorText).toContain('Wrong username or password.');
  });

  test('should show validation errors for invalid registration input', async ({ vikunjaPage }) => {
    const invalidEmail = 'test';
    const invalidPassword = 'ddd5';

    await vikunjaPage.clickRegisterLink();
    await vikunjaPage.fillRegisterUsername('');
    await vikunjaPage.fillRegisterEmail(invalidEmail);
    await vikunjaPage.fillRegisterPassword(invalidPassword);
    await vikunjaPage.pressEnter();

    const usernameError = await vikunjaPage.getRegisterUsernameErrorText();
    const emailError = await vikunjaPage.getRegisterEmailErrorText();
    const passwordError = await vikunjaPage.getRegisterPasswordErrorText();

    expect(usernameError).toContain('Please provide a username.');
    expect(emailError).toContain('Please enter a valid email address.');
    expect(passwordError).toContain('Password must have at least 8 characters.');
  });

  test('should show error for existing username on registration', async ({ vikunjaPage }) => {
    
    await vikunjaPage.clickRegisterLink();
    await vikunjaPage.fillRegisterUsername(process.env.TEST_USER!);
    await vikunjaPage.fillRegisterEmail(process.env.TEST_EMAIL!);
    await vikunjaPage.fillRegisterPassword(process.env.TEST_PASSWORD!);
    await vikunjaPage.clickCreateAccountButton();

    const errorText = await vikunjaPage.getRegisterErrorText();
    expect(errorText).toContain('A user with this username already exists.');
  });
});