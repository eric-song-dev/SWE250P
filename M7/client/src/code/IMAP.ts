import axios, { AxiosResponse } from "axios";

import { config } from "./config";


// Mailbox data structure
export interface IMailbox { name: string, path: string }


// Message data structure
export interface IMessage {
    id: string,
    date: string,
    from: string,
    subject: string,
    body?: string
}


// Helper function to map Gmail IMAP paths to URL-safe names
function resolveMailboxName(inMailbox: string): string {
    const mailboxMap: { [key: string]: string } = {
        "[Gmail]": "Gmail",
        "[Gmail]/All Mail": "AllMail",
        "[Gmail]/Drafts": "Drafts",
        "[Gmail]/Important": "Important",
        "[Gmail]/Sent Mail": "SentMail",
        "[Gmail]/Spam": "Spam",
        "[Gmail]/Starred": "Starred",
        "[Gmail]/Trash": "Trash"
    };
    return mailboxMap[inMailbox] || inMailbox;
}


// IMAP AJAX worker — makes HTTP requests to the server for email operations
export class Worker {

    // Get all mailbox folders via AJAX
    public async listMailboxes(): Promise<IMailbox[]> {
        console.log("IMAP.Worker.listMailboxes()");

        const response: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes`);
        return response.data;
    }

    // Get messages in a specific mailbox via AJAX
    public async listMessages(inMailbox: string): Promise<IMessage[]> {
        console.log("IMAP.Worker.listMessages()", inMailbox);

        const resolvedName = resolveMailboxName(inMailbox);
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes/${resolvedName}`);
        return response.data;
    }

    // Get the body of a specific message via AJAX
    public async getMessageBody(inID: string, inMailbox: String): Promise<string> {
        console.log("IMAP.Worker.getMessageBody()", inID);

        const resolvedName = resolveMailboxName(inMailbox as string);
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/messages/${resolvedName}/${inID}`);
        return response.data;
    }

    // Delete a specific message via AJAX
    public async deleteMessage(inID: string, inMailbox: String): Promise<void> {
        console.log("IMAP.Worker.deleteMessage()", inID);

        const resolvedName = resolveMailboxName(inMailbox as string);
        await axios.delete(`${config.serverAddress}/messages/${resolvedName}/${inID}`);
    }
}
