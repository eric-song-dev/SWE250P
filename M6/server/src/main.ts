// Polyfills for NeDB compatibility with newer Node.js versions
const util = require("util");
if (!util.isArray) {
    util.isArray = Array.isArray;
}
if (!util.isDate) {
    util.isDate = (val: any): val is Date => val instanceof Date;
}
if (!util.isRegExp) {
    util.isRegExp = (val: any): val is RegExp => val instanceof RegExp;
}

import path from "path";

import express, { Express, NextFunction, Request, Response } from "express";

import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts";


// Create the Express application
const app: Express = express();


// Middleware: parse JSON request bodies
app.use(express.json());


// Middleware: serve static files from the client build directory
app.use("/", express.static(path.join(__dirname, "../../client/dist")));


// Middleware: enable CORS for cross-origin requests
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});


// Helper function to map simplified mailbox names to Gmail IMAP paths
function resolveMailboxPath(mailboxName: string): string {
    const mailboxMap: { [key: string]: string } = {
        "INBOX": "INBOX",
        "Gmail": "[Gmail]",
        "AllMail": "[Gmail]/All Mail",
        "Drafts": "[Gmail]/Drafts",
        "Important": "[Gmail]/Important",
        "SentMail": "[Gmail]/Sent Mail",
        "Spam": "[Gmail]/Spam",
        "Starred": "[Gmail]/Starred",
        "Trash": "[Gmail]/Trash"
    };
    return mailboxMap[mailboxName] || mailboxName;
}


// ==================== Mailbox Endpoints ====================

// GET /mailboxes - List all mailbox folders
app.get("/mailboxes",
    async (inRequest: Request, inResponse: Response) => {
        console.log("GET /mailboxes");
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
            console.log("GET /mailboxes: Ok", mailboxes);
            inResponse.status(200);
            inResponse.json(mailboxes);
        } catch (error) {
            console.log("GET /mailboxes: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);

// GET /mailboxes/:mailbox - List messages in a specific mailbox
app.get("/mailboxes/:mailbox",
    async (inRequest: Request, inResponse: Response) => {
        console.log("GET /mailboxes/:mailbox", inRequest.params.mailbox);
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const resolvedPath = resolveMailboxPath(inRequest.params.mailbox);
            const messages: IMAP.IMessage[] = await imapWorker.listMessages({
                mailbox: resolvedPath
            });
            console.log("GET /mailboxes/:mailbox: Ok", messages);
            inResponse.status(200);
            inResponse.json(messages);
        } catch (error) {
            console.log("GET /mailboxes/:mailbox: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);


// ==================== Message Endpoints ====================

// GET /messages/:mailbox/:id - Get the body of a specific message
app.get("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        console.log("GET /messages/:mailbox/:id", inRequest.params.mailbox, inRequest.params.id);
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const resolvedPath = resolveMailboxPath(inRequest.params.mailbox);
            const messageBody: string = await imapWorker.getMessageBody({
                mailbox: resolvedPath,
                id: parseInt(inRequest.params.id, 10)
            });
            console.log("GET /messages/:mailbox/:id: Ok", messageBody);
            inResponse.status(200);
            inResponse.send(messageBody);
        } catch (error) {
            console.log("GET /messages/:mailbox/:id: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);

// POST /messages - Send a new email
app.post("/messages",
    async (inRequest: Request, inResponse: Response) => {
        console.log("POST /messages", inRequest.body);
        try {
            const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
            await smtpWorker.sendMessage(inRequest.body);
            console.log("POST /messages: Ok");
            inResponse.status(201);
            inResponse.send("ok");
        } catch (error) {
            console.log("POST /messages: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);

// DELETE /messages/:mailbox/:id - Delete a specific message
app.delete("/messages/:mailbox/:id",
    async (inRequest: Request, inResponse: Response) => {
        console.log("DELETE /messages/:mailbox/:id");
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
            const resolvedPath = resolveMailboxPath(inRequest.params.mailbox);
            await imapWorker.deleteMessage({
                mailbox: resolvedPath,
                id: parseInt(inRequest.params.id, 10)
            });
            console.log("DELETE /messages/:mailbox/:id: Ok");
            inResponse.status(200);
            inResponse.send("ok");
        } catch (error) {
            console.log("DELETE /messages/:mailbox/:id: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);


// ==================== Contact Endpoints ====================

// GET /contacts - List all contacts
app.get("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        console.log("GET /contacts");
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contacts: IContact[] = await contactsWorker.listContacts();
            console.log("GET /contacts: Ok", contacts);
            inResponse.status(200);
            inResponse.json(contacts);
        } catch (error) {
            console.log("GET /contacts: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);

// POST /contacts - Add a new contact
app.post("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        console.log("POST /contacts", inRequest.body);
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contact: IContact = await contactsWorker.addContact(inRequest.body);
            console.log("POST /contacts: Ok", contact);
            inResponse.status(201);
            inResponse.json(contact);
        } catch (error) {
            console.log("POST /contacts: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);

// PUT /contacts - Update an existing contact (Additional Feature)
app.put("/contacts",
    async (inRequest: Request, inResponse: Response) => {
        console.log("PUT /contacts", inRequest.body);
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contact: IContact = await contactsWorker.updateContact(inRequest.body);
            console.log("PUT /contacts: Ok", contact);
            inResponse.status(202);
            inResponse.json(contact);
        } catch (error) {
            console.log("PUT /contacts: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);

// DELETE /contacts/:id - Delete a contact by ID
app.delete("/contacts/:id",
    async (inRequest: Request, inResponse: Response) => {
        console.log("DELETE /contacts/:id", inRequest.params.id);
        try {
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            await contactsWorker.deleteContact(inRequest.params.id);
            console.log("DELETE /contacts/:id: Ok");
            inResponse.status(200);
            inResponse.send("ok");
        } catch (error) {
            console.log("DELETE /contacts/:id: Error", error);
            inResponse.status(400);
            inResponse.send("error");
        }
    }
);


// ==================== Start Server ====================

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`MailBag server open for requests on port ${PORT}`);
});

// Handle port-in-use errors gracefully
server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n Error: Port ${PORT} is already in use.`);
        console.error(`   Please either:`);
        console.error(`   1. Stop the process using port ${PORT} with: lsof -ti:${PORT} | xargs kill -9`);
        console.error(`   2. Use a different port by setting PORT environment variable: PORT=8081 npm run compile\n`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
        process.exit(1);
    }
});
