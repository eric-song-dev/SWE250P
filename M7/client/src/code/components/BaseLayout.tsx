import React, { Component } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Toolbar from "./Toolbar";
import MailboxList from "./MailboxList";
import MessageList from "./MessageList";
import ContactList from "./ContactList";
import WelcomeView from "./WelcomeView";
import ContactView from "./ContactView";
import MessageView from "./MessageView";
import { createState } from "../state";
import * as IMAP from "../IMAP";
import * as Contacts from "../Contacts";

// Root component that holds the entire application layout and state
class BaseLayout extends Component {

    // Initialize state using the createState factory
    state = createState(this);

    // Load mailboxes and contacts when the component mounts
    componentDidMount(): void {
        this.state.showHidePleaseWait(true);
        const getMailboxes = async () => {
            try {
                const imapWorker: IMAP.Worker = new IMAP.Worker();
                const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
                console.log("Loaded mailboxes:", mailboxes);
                // Filter out the [Gmail] parent folder
                const filteredMailboxes = mailboxes.filter(mb => mb.name !== "[Gmail]");
                this.setState({ mailboxes: filteredMailboxes });
            } catch (error) {
                console.error("Error loading mailboxes:", error);
            }
        };
        getMailboxes().then(() => {
            // Load contacts after mailboxes
            const getContacts = async () => {
                try {
                    const contactsWorker: Contacts.Worker = new Contacts.Worker();
                    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
                    console.log("Loaded contacts:", contacts);
                    this.setState({ contacts: contacts });
                } catch (error) {
                    console.error("Error loading contacts:", error);
                } finally {
                    this.state.showHidePleaseWait(false);
                }
            };
            getContacts().catch(() => {
                this.state.showHidePleaseWait(false);
            });
        }).catch(() => {
            // If loading mailboxes fails, still try to load contacts
            const getContacts = async () => {
                try {
                    const contactsWorker: Contacts.Worker = new Contacts.Worker();
                    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
                    contacts.forEach((inContact) => {
                        this.state.addContactToList(inContact);
                    });
                } catch (error) {
                    console.error("Error loading contacts:", error);
                } finally {
                    this.state.showHidePleaseWait(false);
                }
            };
            getContacts();
        });
    }


    // Render the entire application layout
    render(): JSX.Element {

        return (

            <div className="appContainer">

                {/* Loading dialog */}
                <Dialog open={this.state.pleaseWaitVisible} onClose={() => { }} disableEscapeKeyDown={true}
                    TransitionProps={{ timeout: 0 }}>
                    <DialogTitle style={{ textAlign: "center" }}>Please Wait</DialogTitle>
                    <DialogContent><DialogContentText>...Contacting server...</DialogContentText></DialogContent>
                </Dialog>

                <div className="toolbar"><Toolbar state={this.state} /></div>

                <div className="mailboxList"><MailboxList state={this.state} /></div>

                <div className="centerArea">
                    <div className="messageList"><MessageList state={this.state} /></div>
                    <div className="centerViews">
                        {/* Render the appropriate view based on currentView */}
                        {this.state.currentView === "welcome" && <WelcomeView />}
                        {(this.state.currentView === "message" || this.state.currentView === "compose") &&
                            <MessageView state={this.state} />
                        }
                        {(this.state.currentView === "contact" || this.state.currentView === "contactAdd"
                            || this.state.currentView === "contactEdit") &&
                            <ContactView state={this.state} />
                        }
                    </div>
                </div>

                <div className="contactList"><ContactList state={this.state} /></div>

            </div>
        );

    }


}


export default BaseLayout;
