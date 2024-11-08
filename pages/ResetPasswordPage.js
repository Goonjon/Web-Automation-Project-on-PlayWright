// pages/ResetPasswordPage.js
import { expect } from '@playwright/test';

class ResetPasswordPage {
  constructor(page) {
    this.page = page;
    this.resetLink = page.getByRole('link', { name: 'Reset it here' });
    this.emailInput = page.getByLabel('Email *');
    this.sendResetButton = page.getByRole('button', { name: 'Send Reset Link' });
    this.newPasswordInput = page.getByLabel('New Password *');
    this.confirmPasswordInput = page.getByLabel('Confirm Password *');
    this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password' });
  }

  async navigateToResetPage() {
    await this.page.goto('/login'); // Adjust if your URL differs
    await this.resetLink.click();
  }

  async requestPasswordReset(email) {
    await this.emailInput.fill(email);
    await this.sendResetButton.click();
  }

  async setNewPassword(newPassword) {
    await this.newPasswordInput.fill(newPassword);
    await this.confirmPasswordInput.fill(newPassword);
    await this.resetPasswordButton.click();
  }
}

export default ResetPasswordPage;
