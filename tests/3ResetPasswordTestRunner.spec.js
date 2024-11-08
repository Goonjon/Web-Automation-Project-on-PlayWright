import { test, expect } from '@playwright/test';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import { readFromJSONFile } from '../pages/utils/utils';
import { getGmailResetLink } from '../pages/utils/gmail';

test.describe('Password Reset Flow', () => {
  test('Reset new password for the registered user', async ({ page }) => {
    const resetPasswordPage = new ResetPasswordPage(page);

    // Retrieve the last registered user's details from userData.json
    const user = readFromJSONFile();
    if (!user) {
      throw new Error("No user data found in userData.json");
    }

    // Navigate to the login page and click on 'Reset it here' link
    await page.goto('/'); // Relative URL, will use baseURL from config
    await page.getByRole('link', { name: 'Reset it here' }).click();

    // Fill the email input with the last registered user's email and click 'Send Reset Link'
    await page.getByLabel('Email *').click();
    await page.getByLabel('Email *').fill(user.email);  // Use the email from userData.json
    await page.getByRole('button', { name: 'Send Reset Link' }).click();

    // Wait for sometime to ensure the email is received
    await page.waitForTimeout(7000);

    // Retrieve the reset link from Gmail
    const resetLink = await getGmailResetLink();
    if (!resetLink) {
      throw new Error("Failed to retrieve reset link from email");
    }

    // Go to the reset link page
    await page.goto(resetLink);

    // Set a new password
    const newPassword = 'Password123';  // You can change this to any strong password
    await resetPasswordPage.setNewPassword(newPassword);

    // Assert that the success message is displayed
    await expect(page.locator('text=Password reset successfully')).toBeVisible();
  });
  
});
