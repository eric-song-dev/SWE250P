# Webmail Server – Chapter 8 Implementation

## Objective

This project reproduces and extends the code from **Chapter 8** of the textbook.
The goal is to integrate multiple techniques from previous chapters and assignments to build a **fully functional server-side webmail system**.

All code examples from the chapter are reproduced line-by-line, executed, and understood.
Additional features are implemented to improve functionality, REST compliance, and usability.

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

## How REST Helps the Web Application

REST (Representational State Transfer) provides a clear and scalable architectural style for designing the webmail application's client–server interactions:

1. **Uniform Interface**

    * REST standardizes communication through well-defined HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`, simplifying how the client interacts with server resources.

2. **Separation of Concerns**

    * By decoupling the client-side interface from the server-side logic, REST allows independent development and maintenance of the webmail client and server.

3. **Stateless Communication**

    * Each REST request contains all the information needed to process it, eliminating the need for the server to store client state and improving scalability.

4. **Resource-Oriented Design**

    * Core entities such as contacts, messages, and mailboxes are modeled as resources, each accessed through a unique URL, making the API intuitive and predictable.

5. **Improved Maintainability**

    * Clear resource boundaries and standardized operations make the system easier to extend, debug, and refactor as new features are added.

6. **Interoperability and Flexibility**

    * RESTful APIs use standard HTTP and JSON, enabling seamless communication with different clients, tools, and platforms.

Overall, REST enables the webmail application to remain modular, scalable, and maintainable while providing a consistent and well-structured communication model between the client and server.

### Gmail SMTP and IMAP Setup

* Gmail SMTP and IMAP services are configured following the official Google documentation.
* Account credentials and server configuration are stored in `serverInfo.json`.
* This enables the server to authenticate with Gmail and interact with email data programmatically.

---

## Features Implemented

### Contact Management (REST API)

* **Create Contact** — Adds a new contact using the HTTP `POST` method.
* **Retrieve Contacts** — Fetches all contacts using the HTTP `GET` method.
* **Update Contact** _(Additional Feature)_ — Updates an existing contact using the HTTP `PUT` method. Requires `_id`, and optionally updated `name` and `email`.
* **Delete Contact** — Removes a contact using the HTTP `DELETE` method.

### Email Management (REST API)

* **List Mailboxes** — Gets all mailbox folders via IMAP using `GET`.
* **List Messages** — Gets message list from a specific mailbox using `GET`.
* **Get Message Body** — Retrieves full message content using `GET`.
* **Send Message** — Sends email via SMTP using `POST`.
* **Delete Message** — Removes a message via IMAP using `DELETE`.

---

## HTTP Response Codes

* **200 OK** — Successful GET and DELETE operations
* **201 CREATED** — Successful POST requests creating new resources
* **202 ACCEPTED** — Successful PUT updates
* **400 BAD REQUEST** — Invalid or malformed request data

---

## API Endpoints

### Email Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/mailboxes` | List all mailbox folders |
| GET | `/mailboxes/:mailbox` | List messages in a mailbox |
| GET | `/messages/:mailbox/:id` | Get message body |
| POST | `/messages` | Send a new email |
| DELETE | `/messages/:mailbox/:id` | Delete a message |

### Contact Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/contacts` | List all contacts |
| POST | `/contacts` | Add a new contact |
| PUT | `/contacts` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

---

## How to Test

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure Gmail SMTP and IMAP credentials in `serverInfo.json`.

3. Compile and start the server:

   ```bash
   npm run compile
   ```

4. Use an API testing tool (e.g., Postman or `curl`) to test the endpoints.

5. Connect to the server:

   ```
   http://localhost:8080
   ```

### Example curl Commands

```bash
# List contacts
curl http://localhost:8080/contacts

# Add a contact
curl -X POST http://localhost:8080/contacts \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Update a contact (replace ID with actual _id)
curl -X PUT http://localhost:8080/contacts \
  -H "Content-Type: application/json" \
  -d '{"_id": "YOUR_CONTACT_ID", "name": "Jane Doe", "email": "jane@example.com"}'

# Delete a contact
curl -X DELETE http://localhost:8080/contacts/YOUR_CONTACT_ID

# List mailboxes (requires valid Gmail credentials)
curl http://localhost:8080/mailboxes

# List messages in INBOX
curl http://localhost:8080/mailboxes/INBOX

# Get message body
curl http://localhost:8080/messages/INBOX/1

# Send an email
curl -X POST http://localhost:8080/messages \
  -H "Content-Type: application/json" \
  -d '{"to": "recipient@example.com", "from": "your_gmail@gmail.com", "subject": "Test", "text": "Hello!"}'

# Delete a message
curl -X DELETE http://localhost:8080/messages/INBOX/1
```

### Mailbox Name Mapping

For Gmail sub-folders, use these simplified names in the URL path:

| URL Name | Gmail IMAP Path |
|----------|----------------|
| `INBOX` | `INBOX` |
| `AllMail` | `[Gmail]/All Mail` |
| `Drafts` | `[Gmail]/Drafts` |
| `Important` | `[Gmail]/Important` |
| `SentMail` | `[Gmail]/Sent Mail` |
| `Spam` | `[Gmail]/Spam` |
| `Starred` | `[Gmail]/Starred` |
| `Trash` | `[Gmail]/Trash` |
