import { expect, Page } from "@playwright/test";

export async function clickAndWait(page: Page, selector: string) {
  try {
    await page.click(selector);
    await page.waitForTimeout(500);
    console.log(`Clicked: ${selector}`);
  } catch (error) {
    console.error(`Error clicking ${selector}:`, error);
    throw error;
  }
}

export async function fillAndAssert(page: Page, selector: string, value: string) {
  try {
    await page.fill(selector, value);
    await expect(page.locator(selector)).toHaveValue(value);
    console.log(`Filled ${selector} with value: ${value}`);
  } catch (error) {
    console.error(`Error filling ${selector}:`, error);
    throw error;
  }
}

export async function assertToast(page: Page, message = 'Success') {
  try {
    await expect(page.locator(`div.notification-title:has-text("${message}")`).first()).toBeVisible();
    console.log(`Toast message visible: ${message}`);
  } catch (error) {
    console.error(`Toast message not visible: ${message}`, error);
    throw error;
  }
}

export async function waitForElement(page: Page, selector: string, timeout = 5000) {
  await page.waitForSelector(selector, { timeout });
}

export function generateRandomString(length: number): string {
  return Math.random().toString(36).substring(2, length + 2);
}
