// gmail.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GMAIL_API_BASE_URL = "https://gmail.googleapis.com/gmail/v1/users/me";

export async function getEmailList() {
  try {
    const response = await axios.get(`${GMAIL_API_BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
      },
    });
    // Extract the latest message ID from the response
    const messageId = response.data.messages?.[0]?.id;
    return messageId;
  } catch (error) {
    console.error("Error fetching email list:", error);
    return null;
  }
}

export async function readLatestEmail() {
  try {
    const messageId = await getEmailList();
    if (!messageId) {
      console.log("No email found.");
      return null;
    }

    const response = await axios.get(`${GMAIL_API_BASE_URL}/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
      },
    });

    // Extract the snippet (preview) of the email message
    const emailSnippet = response.data.snippet;
    return emailSnippet;
  } catch (error) {
    console.error("Error fetching latest email:", error);
    return null;
  }
}

// Function to extract the reset link from the latest email
export async function getGmailResetLink() {
  try {
    const emailSnippet = await readLatestEmail();
    if (!emailSnippet) {
      throw new Error("No email content available");
    }

    // Extract the URL from the email snippet (modify regex as needed)
    const resetLinkMatch = emailSnippet.match(/https:\/\/[^\s]+/);
    if (!resetLinkMatch) {
      throw new Error("Reset link not found in the email content");
    }

    const resetLink = resetLinkMatch[0];
    return resetLink;
  } catch (error) {
    console.error("Error retrieving reset link:", error);
    return null;
  }
}
