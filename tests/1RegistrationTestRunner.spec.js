// registrationTestRunner.spec.js
import { test, expect } from "@playwright/test";
import Registration from "../pages/RegistrationPage";
import { writeJSONFile } from "../pages/utils/utils";
import { faker } from "@faker-js/faker";
import { readLatestEmail } from "../pages/utils/gmail";

test.describe("Daily finance registration and email confirmation", () => {
  test("User can register successfully and receive confirmation email", async ({ page }) => {
    await page.goto("/");

    const reg = new Registration(page);

    function generatePhoneNumber() {
      return (
        "01" + Math.floor(100000000 + Math.random() * 900000000).toString()
      );
    }

    const phoneNumber = generatePhoneNumber();

    const userData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `goonjonpromy1234+${faker.number.int({ min: 1, max: 1000 })}@gmail.com`,
      password: faker.internet.password(),
      phoneNumber: phoneNumber,
      address: faker.location.city(),
    };

    await reg.registerUser(userData);

    // Write user data to JSON 
    writeJSONFile(userData);

    // Add an initial wait to allow time for the email to arrive
    console.log("Waiting for initial 7 seconds for the email to arrive...");
    await page.waitForTimeout(7000); // Wait for 7 seconds before checking

    // Email wait and retrieval parameters
    const maxWaitTime = 30000;  // Total wait time in ms (30 seconds)
    const checkInterval = 5000; // Interval between checks (5 seconds)
    let emailSnippet = null;

    const startTime = Date.now();
    while (!emailSnippet && Date.now() - startTime < maxWaitTime) {
      console.log(`Checking email at ${new Date().toLocaleTimeString()}`);
      
      emailSnippet = await readLatestEmail();

      if (!emailSnippet) {
        console.log("Email not found, retrying in 15 seconds...");
        await new Promise(resolve => setTimeout(resolve, checkInterval)); // Explicit wait for checkInterval
      }
    }

    // Assert that emailSnippet contains the expected message
    if (emailSnippet) {
      console.log("Email received!");
      expect(emailSnippet).toContain("Welcome to our platform!");
    } else {
      console.error("Failed to receive the email within the wait period.");
      expect(emailSnippet).not.toBeNull(); // This line will fail if emailSnippet is null
    }
  });
  
});
