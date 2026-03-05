import axios from "axios";

import { config } from "./config";


// SMTP AJAX worker — makes HTTP requests to the server for sending emails
export class Worker {


    // Send an email via AJAX POST request
    public async sendMessage(inTo: string, inFrom: string, inSubject: string, inMessage: string): Promise<string | void> {

        console.log("SMTP.Worker.sendMessage()");

        await axios.post(`${config.serverAddress}/messages`, {
            to: inTo, from: inFrom, subject: inSubject,
            text: inMessage
        });

    }


}
