// pages/UpdateUserLoginPage.js
class UpdateUserLoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByLabel('Email *'); 
      this.passwordInput = page.getByLabel('Password *'); 
      this.loginButton = page.getByRole('button', { name: 'Login' });
      this.dashboardText = 'text=Dashboard'; // Locator updated to use text selector
    }
  
    async login(email, password) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  
    async isLoginSuccessful() {
      // Wait for the "Dashboard" text to be visible
      try {
        await this.page.waitForSelector(this.dashboardText, { state: 'visible', timeout: 5000 });
        return true;
      } catch {
        return false; // Return false if "Dashboard" text is not found within timeout
      }
    }
  }
  
  export default UpdateUserLoginPage;
  