# Daily Finance Automation Project on PlayWright
### Project Summary: This project automates the user registration, login, profile management, password reset, and item addition process on the Daily Finance website. It validates key actions such as email confirmation, toast message assertions, profile photo upload, and password reset, ensuring a seamless user experience with robust test coverage.

### Technologies I have used: 
- Playwright: For automating browser interactions and running end-to-end tests.
- JavaScript (ES6+): For scripting and handling test logic.
- Faker.js: For generating dynamic test data such as random names, emails, and phone numbers.
- JSON: For storing and retrieving user data (e.g., registration details).
- VS Code: As the development environment for writing and executing tests.

### Project Flow:
- User Registration: Visit the site and register a new user. Verify successful registration by checking the congratulatory email and assert the appearance of the toast message.
- Login and Add Items: Log in with the registered user credentials, add two random items with different quantities, and verify that both items appear in the item list.
- Profile Update: Navigate to the profile settings, upload a profile photo, and log out.
- Password Reset: From the login page, click on "Reset it here" to reset the password, verify the reset link is received, and set the new password.
- Login with New Password: Log in with the new password and assert that login is successful, confirming that the password reset process was successful.
- Reporting: Use Allure to generate reports for the entire test execution.
- Page Object Model: Follow the Page Object Model (POM) pattern for project structure.

### How to run?
1. Clone the project.
2. Open the project in VS Code.
3. Install Dependencies: Navigate to the project directory and install the necessary dependencies:  ```npm install```
4. Run the Tests: To run all the tests sequentially, use the following command:  ```npx playwright test```
5. Run Specific Tests: If you want to run specific tests or test files, use:  ```npx playwright test <test-file-path>```
6. To generate the Allure report, run:  ```allure generate allure-results --clean```
                                        ```allure open allure-report```

### Screenshots Of the Allure Report:
![Screenshot 2024-11-07 203326](https://github.com/user-attachments/assets/35efb2c7-5caf-42f7-b850-e6bd42841d9e)
![Screenshot 2024-11-07 203357](https://github.com/user-attachments/assets/4ce1c881-6171-4ade-8423-9988c70bea5b)


### Video Record of DailyFinance Automation on PlayWright
### https://drive.google.com/file/d/17xO16eIe9rMcJtN0rSmdDcCBGbTr9pvo/view?usp=drive_link

### Test Case of DailyFinance Automation on PlayWright
### https://docs.google.com/spreadsheets/d/1WHF7XbjNB3nhpW0o5ZdNs3i68_9ptQa-k1Wxbxs_yNk/edit?usp=drive_link
