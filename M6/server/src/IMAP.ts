import { ParsedMail } from "mailparser";
const ImapClient = require("emailjs-imap-client");
import { simpleParser } from "mailparser";

import { IServerInfo } from "./ServerInfo";

// Options passed to IMAP worker methods
// mailbox is required, id is optional (only needed for single message ops)
export interface ICallOptions {
    mailbox: string,
    id?: number
}

// Represents an email message
// body is optional since listing messages doesn't need full content
export interface IMessage {
    id: string,
    date: string,
    from: string,
    subject: string,
    body?: string
}

// Represents a mailbox folder
export interface IMailbox {
    name: string,
    path: string
}

// Disable TLS certificate verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Worker class that handles all IMAP operations
export class Worker {

    private static serverInfo: IServerInfo;

    constructor(inServerInfo: IServerInfo) {
        console.log("IMAP.Worker.constructor", inServerInfo);
        Worker.serverInfo = inServerInfo;
    }

    // Create a connection to the IMAP server
    private async connectToServer(): Promise<any> {
        const client: any = new ImapClient.default(
            Worker.serverInfo.imap.host,
            Worker.serverInfo.imap.port,
            { auth: Worker.serverInfo.imap.auth }
        );
        client.logLevel = client.LOG_LEVEL_NONE;
        client.onerror = (error: Error) => {
            console.log("IMAP.Worker.connectToServer(): Connection error", error);
        };
        await client.connect();
        console.log("IMAP.Worker.connectToServer(): Connected");

        return client;
    }

    // List all mailboxes (folders) in the email account
    public async listMailboxes(): Promise<IMailbox[]> {

        console.log("IMAP.Worker.listMailboxes()");

        const client: any = await this.connectToServer();
        const mailboxes: any = await client.listMailboxes();
        await client.close();

        // Recursively flatten the mailbox tree into a flat array
        const finalMailboxes: IMailbox[] = [];
        const iterateChildren: Function = (inArray: any[]): void => {
            inArray.forEach((inValue: any) => {
                finalMailboxes.push({
                    name: inValue.name,
                    path: inValue.path
                });
                iterateChildren(inValue.children);
            });
        };
        iterateChildren(mailboxes.children);

        return finalMailboxes;
    }

    // List all messages in a specific mailbox
    public async listMessages(inCallOptions: ICallOptions): Promise<IMessage[]> {

        console.log("IMAP.Worker.listMessages()", inCallOptions);

        const client: any = await this.connectToServer();
        const mailbox: any = await client.selectMailbox(inCallOptions.mailbox);
        console.log(`IMAP.Worker.listMessages(): Message count = ${mailbox.exists}`);

        // Return empty array if no messages exist
        if (mailbox.exists === 0) {
            await client.close();
            return [];
        }

        // Fetch message envelopes (metadata only, not full body)
        const messages: any[] = await client.listMessages(
            inCallOptions.mailbox,
            "1:*",
            ["uid", "envelope"]
        );

        await client.close();

        // Transform raw IMAP data into our IMessage format
        const finalMessages: IMessage[] = [];
        messages.forEach((inValue: any) => {
            finalMessages.push({
                id: inValue.uid,
                date: inValue.envelope.date,
                from: inValue.envelope.from[0].address,
                subject: inValue.envelope.subject
            });
        });
        return finalMessages;
    }

    // Retrieve the full body text of a specific message
    public async getMessageBody(inCallOptions: ICallOptions): Promise<string> {

        console.log("IMAP.Worker.getMessageBody()", inCallOptions);

        const client: any = await this.connectToServer();
        const messages: any[] = await client.listMessages(
            inCallOptions.mailbox,
            inCallOptions.id,
            ["body[]"],
            { byUid: true }
        );
        // Parse the raw message into structured data
        const parsed: ParsedMail = await simpleParser(messages[0]["body[]"]);
        await client.close();
        return parsed.text || "";
    }

    // Delete a specific message from a mailbox
    public async deleteMessage(inCallOptions: ICallOptions): Promise<any> {

        console.log("IMAP.Worker.deleteMessage()", inCallOptions);

        const client: any = await this.connectToServer();
        await client.deleteMessages(
            inCallOptions.mailbox,
            inCallOptions.id,
            { byUid: true }
        );
        await client.close();
    }
}
