const path = require("path");
const fs = require("fs");


// Interface for server configuration
// Contains SMTP and IMAP settings
export interface IServerInfo {
    smtp: {
        host: string,
        port: number,
        auth: {
            user: string,
            pass: string
        }
    },
    imap: {
        host: string,
        port: number,
        auth: {
            user: string,
            pass: string
        }
    }
}


// Global server configuration object
export let serverInfo: IServerInfo;


// Read server info from the JSON config file at startup
const rawInfo: string = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
serverInfo = JSON.parse(rawInfo);
console.log("ServerInfo: ", serverInfo);
