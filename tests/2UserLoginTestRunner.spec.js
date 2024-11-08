// tests/UserLoginTestRunner.spec.js
import { test, expect } from '@playwright/test';
import UserLoginPage from '../pages/UserLoginPage';
const { readFromJSONFile } = require('../pages/utils/utils');
import { faker } from '@faker-js/faker';

test.describe('User Login, Add Items, Assert Items, Update Profile Image and Logout', () => {
  test('Login with the user, add two items and assert the two items are showing on the list, then update the profile image and logout', async ({ page }) => {
    const loginPage = new UserLoginPage(page);

    // Retrieve the last registered user from userData.json
    const user = readFromJSONFile();
    if (!user) {
      throw new Error("No user data found in userData.json");
    }

    // Navigate to the login page and log in
    await page.goto('/login');
    await loginPage.login(user.email, user.password);

    // Add first item 
    const itemName1 = 'Mouse';
    const amount1 = faker.finance.amount(50, 500);
    const purchaseDate1 = '09/05/2024';
    const month1 = 'September';
    const remarks1 = 'First test item';

    await loginPage.addItem(itemName1, amount1, purchaseDate1, month1, remarks1, 2);
    //quantity related codes declared in the userlogin page

    // Add second item 
    const itemName2 = 'Earphone';
    const amount2 = faker.finance.amount(50, 500);
    const purchaseDate2 = '08/16/2024';
    const month2 = 'August';
    const remarks2 = 'Second test item';

    await loginPage.addItem(itemName2, amount2, purchaseDate2, month2, remarks2);

     // Assert that the table contains the correct header 'Item Name'
     await expect(page.locator('thead')).toContainText('Item Name');

     // Assert that both items are in the item list
     await expect(page.locator('tbody')).toContainText('Mouse');
     await expect(page.locator('tbody')).toContainText('Earphone');


     
     //Image update section
     // Click on the profile link to go to profile page
    await page.getByLabel('account of current user').click();
    await page.getByRole('menuitem', { name: 'Profile' }).click();

    // Click the 'Edit' button to start editing the profile
    await page.getByRole('button', { name: 'Edit' }).click();

    // Upload a profile photo
    await page.locator('input[type="file"]').click();
    await page.locator('input[type="file"]').setInputFiles('images.jpeg');

    // Handle the popup alert
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept();  // Accept the dialog to continue
    });

    // Click on the 'Upload Image' button to finalize the upload
    await page.getByRole('button', { name: 'Upload Image' }).click();

    
    // Logout by clicking on the account menu and selecting 'Logout'
    await page.getByLabel('account of current user').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
     
  });
});
