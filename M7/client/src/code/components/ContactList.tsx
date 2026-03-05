import React from "react";

import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import Person from "@mui/icons-material/Person";


// Contact list component showing all contacts in the right sidebar
const ContactList = ({ state }) => (

    <List>

        {state.contacts.map(value => {
            return (
                <ListItemButton
                    key={value._id || value}
                    onClick={() => state.showContact(value._id, value.name, value.email)}>
                    <ListItemAvatar>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${value.name}`} />
                </ListItemButton>
            );
        })}

    </List>

);


export default ContactList;
