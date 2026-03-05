import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";

import { IServerInfo } from "./ServerInfo";

// Worker class that handles sending emails via SMTP
export class Worker {

    private static serverInfo: IServerInfo;

    constructor(inServerInfo: IServerInfo) {
        console.log("SMTP.Worker.constructor", inServerInfo);
        Worker.serverInfo = inServerInfo;
    }


    // Send an email message
    // Wraps nodemailer's callback-based API in a Promise for async/await usage
    public sendMessage(options: SendMailOptions): Promise<void> {

        console.log("SMTP.Worker.sendMessage()", options);

        return new Promise((resolve, reject) => {
            const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp);
            transport.sendMail(
                options,
                (error: Error | null, info: SentMessageInfo) => {
                    if (error) {
                        console.log("SMTP.Worker.sendMessage(): Error", error);
                        reject(error);
                    } else {
                        console.log("SMTP.Worker.sendMessage(): Ok", info);
                        resolve(undefined);
                    }
                }
            );
        });
    }
}
