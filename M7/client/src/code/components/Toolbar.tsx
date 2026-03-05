import React from "react";

import Button from "@mui/material/Button";


// Toolbar component with buttons for creating new messages and contacts
const Toolbar = ({ state }) => (

    <div>
        <Button variant="contained" color="primary" size="small" style={{ marginRight: 10 }}
            onClick={() => state.showComposeMessage("new")} >
            New Message
        </Button>
        <Button variant="contained" color="primary" size="small" style={{ marginRight: 10 }}
            onClick={state.showAddContact} >
            New Contact
        </Button>
    </div>

);


export default Toolbar;
