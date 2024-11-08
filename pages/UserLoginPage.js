// pages/UserLoginPage.js
class UserLoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email *');
    this.passwordInput = page.getByLabel('Password *');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.addCostButton = page.getByRole('button', { name: 'Add Cost' });
    this.itemNameInput = page.getByLabel('Item Name');
    this.amountInput = page.getByLabel('Amount');
    this.purchaseDateInput = page.getByLabel('Purchase Date');
    this.monthSelect = page.getByLabel('Month');
    this.remarksInput = page.getByLabel('Remarks');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.incrementQuantityButton = page.getByRole('button', { name: '+' });
    
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async enterPurchaseDate(purchaseDate) {
    await this.purchaseDateInput.click();
    await this.purchaseDateInput.press('Control+A');
    await this.purchaseDateInput.press('Backspace');
    await this.purchaseDateInput.type(purchaseDate);
  }

  async addItem(itemName, amount, purchaseDate, month, remarks, quantity = 1) {
    await this.addCostButton.click();  // Navigate to the Add Cost page

    // Fill out the item details
    await this.itemNameInput.fill(itemName);

    // Adjust quantity if it’s greater than 1
    if (quantity > 1) {
      for (let i = 1; i < quantity; i++) {
        await this.incrementQuantityButton.click();
      }
    }

    await this.amountInput.fill(amount.toString());

    // Enter the purchase date
    await this.enterPurchaseDate(purchaseDate);

    await this.monthSelect.selectOption(month);
    await this.remarksInput.fill(remarks);

    // Handle the dialog that appears after clicking Submit
    this.page.once('dialog', dialog => dialog.accept());

    await this.submitButton.click(); // Submit the form
  }


}

export default UserLoginPage;
