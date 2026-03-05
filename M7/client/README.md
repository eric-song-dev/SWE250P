# Webmail Client – Chapter 9 Implementation

## Objective

This project reproduces and extends the code from **Chapter 9** of the textbook.
The goal is to build a **fully functional client-side webmail system** using React, TypeScript, Webpack, MUI, and Axios.

All code examples from the chapter are reproduced line-by-line, executed, and understood.
Additional features are implemented to improve functionality and usability.

---

## Environment

* **Programming Language & Runtime**

    * Node.js version: v23.3.0
    * npm version: 10.9.0

* **Operating System**

    * macOS (Sequoia 15.3)

* **Computer Architecture**

    * ARM64 (Apple M-series processor)

* **Web Browser Used for Testing**

    * Google Chrome (latest version)

---

## How AJAX Helps the Web Application

AJAX (Asynchronous JavaScript and XML) enables the webmail client to communicate with the server without full page reloads:

1. **Asynchronous Communication**

    * AJAX allows the client to send HTTP requests and receive responses in the background, so the user interface remains responsive while data is being fetched or sent.

2. **Improved User Experience**

    * Users can browse mailboxes, read messages, and manage contacts without waiting for full page refreshes. This creates a smooth, desktop-like experience in the browser.

3. **Efficient Data Transfer**

    * Only the necessary data (JSON) is transferred between client and server, rather than entire HTML pages. This reduces bandwidth usage and speeds up interactions.

4. **Dynamic Content Updates**

    * React components re-render only the parts of the UI that change when new data arrives via AJAX, resulting in fast and efficient updates.

5. **Separation of Concerns**

    * AJAX enables a clean separation between the client-side UI (React) and the server-side logic (Express). The client makes HTTP requests to RESTful endpoints, and the server responds with JSON data.

6. **Error Handling**

    * AJAX requests via Axios provide built-in error handling through Promises and async/await, making it easy to show error states to the user when server communication fails.

In this application, Axios is used as the AJAX library to make HTTP requests to the Express server's REST API endpoints.

---

## Features Implemented

### Email Management
* **List Mailboxes** — Fetches all mailbox folders via AJAX GET
* **List Messages** — Fetches messages in a selected mailbox via AJAX GET
* **Read Message** — Fetches full message body via AJAX GET
* **Compose Message** — New message, reply, or email to contact
* **Send Message** — Sends email via AJAX POST
* **Delete Message** — Removes message via AJAX DELETE

### Contact Management
* **List Contacts** — Fetches all contacts via AJAX GET
* **Add Contact** — Creates new contact via AJAX POST
* **Edit Contact** _(Additional Feature)_ — Edits existing contact inline via AJAX PUT
* **Delete Contact** — Removes contact via AJAX DELETE
* **Send Email to Contact** — Opens compose with recipient pre-filled

---

## Additional Feature: Contact Editing

The textbook's client only supports adding and deleting contacts. This implementation adds an **Edit** button on the contact view that switches to an editable mode, allowing the user to modify the contact's name and email. Changes are saved to the server via an AJAX PUT request.

---

## How to Run

1. Start the server (from `../server/`):
   ```bash
   cd ../server
   npm install
   npm run compile
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Build the client:
   ```bash
   npm run build
   ```

4. Open `http://localhost:8080` in Chrome (the server serves the client's built files).

---

## How to Test

1. **Start the server** on port 8080
2. **Build the client** with `npm run build`
3. **Open Chrome** and navigate to `http://localhost:8080`
4. **Test the following features**:
   - Click a mailbox in the left sidebar → messages should load
   - Click a message → body should display below
   - Click "New Message" → compose view appears
   - Click "New Contact" → add contact form appears
   - Click a contact → view contact details
   - Click "Edit" on a contact → fields become editable
   - Click "Save Changes" → contact is updated
   - Click "Send Email" on a contact → compose with recipient pre-filled
