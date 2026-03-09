import { test } from '../hooks/fixtures';
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
    
  });
});