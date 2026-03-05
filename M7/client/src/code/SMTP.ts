import axios from "axios";

import { config } from "./config";

// SMTP AJAX worker — makes HTTP requests to the server for sending emails
export class Worker {

    // Send an email via AJAX POST request
    public async sendMessage(to: string, from: string, subject: string, text: string): Promise<string | void> {
        console.log("SMTP.Worker.sendMessage()");

        await axios.post(`${config.serverAddress}/messages`, {
            to: to, from: from, subject: subject, text: text
        });
    }
}
