import React from "react";

import { Button, TextField } from "@mui/material";


// Contact view component for viewing, adding, or editing contacts
const ContactView = ({ state }) => (

    <form>

        <TextField margin="dense" id="contactName" label="Name" value={state.contactName} variant="outlined"
            InputProps={{ style: { color: "#000000" } }}
            disabled={state.currentView === "contact"}
            style={{ width: 260 }}
            onChange={state.fieldChangeHandler} />
        <br />
        <TextField margin="dense" id="contactEmail" label="Email" value={state.contactEmail} variant="outlined"
            InputProps={{ style: { color: "#000000" } }}
            disabled={state.currentView === "contact"}
            style={{ width: 520 }}
            onChange={state.fieldChangeHandler} />
        <br />

        {/* Save button for adding new contacts */}
        {state.currentView === "contactAdd" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10 }}
                onClick={state.saveContact}>
                Save
            </Button>
        }

        {/* Delete button when viewing a contact */}
        {state.currentView === "contact" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10, marginRight: 10 }}
                onClick={state.deleteContact}>
                Delete
            </Button>
        }

        {/* Edit button when viewing a contact (Additional Feature) */}
        {state.currentView === "contact" &&
            <Button variant="contained" color="secondary" size="small" style={{ marginTop: 10, marginRight: 10 }}
                onClick={state.showEditContact}>
                Edit
            </Button>
        }

        {/* Send Email button when viewing a contact */}
        {state.currentView === "contact" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10 }}
                onClick={() => state.showComposeMessage("contact")}>Send Email</Button>
        }

        {/* Save Changes button when editing a contact (Additional Feature) */}
        {state.currentView === "contactEdit" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10, marginRight: 10 }}
                onClick={state.updateContact}>
                Save Changes
            </Button>
        }

        {/* Cancel button when editing a contact (Additional Feature) */}
        {state.currentView === "contactEdit" &&
            <Button variant="outlined" color="primary" size="small" style={{ marginTop: 10 }}
                onClick={() => state.showContact(state.contactID, state.contactName, state.contactEmail)}>
                Cancel
            </Button>
        }

    </form>

);


export default ContactView;
