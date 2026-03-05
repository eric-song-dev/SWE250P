import React from "react";
import { TextField, Button } from "@mui/material";


// Message view component for reading messages or composing new ones
const MessageView = ({ state }) => (

    <form>

        {/* Show ID and date when viewing a message */}
        {state.currentView === "message" &&
            <TextField value={`ID ${state.messageID}`} margin="dense" disabled={true} fullWidth={true}
                className="messageInfoField" variant="outlined" InputProps={{ readOnly: true }} />
        }
        {state.currentView === "message" && <br />}
        {state.currentView === "message" &&
            <TextField value={state.messageDate} margin="dense" disabled={true} fullWidth={true}
                className="messageInfoField" variant="outlined" InputProps={{ readOnly: true }} />
        }
        {state.currentView === "message" && <br />}

        {/* Show From field when viewing */}
        {state.currentView === "message" &&
            <TextField margin="dense" variant="outlined" fullWidth={true} label="From" value={state.messageFrom}
                disabled={true} InputProps={{ style: { color: "#000000" } }} />
        }
        {state.currentView === "message" && <br />}

        {/* Show To field when composing */}
        {state.currentView === "compose" &&
            <TextField margin="dense" id="messageTo" variant="outlined" fullWidth={true} label="To"
                value={state.messageTo} InputProps={{ style: { color: "#000000" } }}
                onChange={state.fieldChangeHandler} />
        }
        {state.currentView === "compose" && <br />}

        {/* Subject field */}
        <TextField margin="dense" id="messageSubject" label="Subject" variant="outlined" fullWidth={true}
            value={state.messageSubject} disabled={state.currentView === "message"}
            InputProps={{ style: { color: "#000000" } }} onChange={state.fieldChangeHandler} />
        <br />

        {/* Message body */}
        <TextField margin="dense" id="messageBody" variant="outlined" fullWidth={true} multiline={true} rows={12}
            value={state.messageBody} disabled={state.currentView === "message"}
            InputProps={{ style: { color: "#000000" } }} onChange={state.fieldChangeHandler} />

        {/* Action buttons based on current view */}
        {state.currentView === "compose" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10 }}
                onClick={state.sendMessage}>
                Send
            </Button>
        }
        {state.currentView === "message" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10, marginRight: 10 }}
                onClick={() => state.showComposeMessage("reply")}>
                Reply
            </Button>
        }
        {state.currentView === "message" &&
            <Button variant="contained" color="primary" size="small" style={{ marginTop: 10 }}
                onClick={state.deleteMessage}>
                Delete
            </Button>
        }

    </form>

);


export default MessageView;
