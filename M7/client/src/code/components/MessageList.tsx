import React from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// Message list component showing all messages in the selected mailbox
const MessageList = ({ state }) => (

    <Table stickyHeader size="small">
        <TableHead>
            <TableRow>
                <TableCell sx={{ width: 120 }}>Date</TableCell>
                <TableCell sx={{ width: 300 }}>From</TableCell>
                <TableCell>Subject</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {state.messages.map(message => (
                <TableRow
                    key={message.id}
                    onClick={() => state.showMessage(message)}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'action.hover'
                        }
                    }}>
                    <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
                    <TableCell>{message.from}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>

);


export default MessageList;
