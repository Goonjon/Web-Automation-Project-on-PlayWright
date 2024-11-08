// tests/UpdateUserLoginTestRunner.spec.js
import { test, expect } from '@playwright/test';
import UpdateUserLoginPage from '../pages/UpdateUserLoginPage';
import { readFromJSONFile } from '../pages/utils/utils';

test.describe('User Login with Updated Password', () => {
  test('Login with the updated password and verify login success', async ({ page }) => {
    const loginPage = new UpdateUserLoginPage(page);

    // Retrieve the last registered user from userData.json
    const user = readFromJSONFile();
    if (!user) {
      throw new Error("No user data found in userData.json");
    }

    // Define the new password
    const newPassword = 'Password123';

    // Navigate to the login page
    await page.goto('/login');

    // Log in using the retrieved email and new password
    await loginPage.login(user.email, newPassword);

    // Assert login is successful by checking the appearance of the "Dashboard" text
    const isLoginSuccessful = await loginPage.isLoginSuccessful();
    expect(isLoginSuccessful).toBeTruthy();
  });
  
});
