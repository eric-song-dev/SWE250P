import React from "react";

import { Button, Box } from "@mui/material";


// Mailbox list component displaying all mailbox folders as styled buttons
const MailboxList = ({ state }) => {
    console.log("MailboxList render - mailboxes:", state.mailboxes);

    // Check if a mailbox is currently selected
    const isSelected = (mailboxPath: string) => {
        return state.currentMailbox === mailboxPath;
    };

    return (
        <Box sx={{ padding: 0.75, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {state.mailboxes && state.mailboxes.length > 0 ? (
                state.mailboxes.map((value, index) => {
                    const selected = isSelected(value.path);
                    return (
                        <Button
                            key={value.path || index}
                            onClick={() => state.setCurrentMailbox(value.path)}
                            variant="contained"
                            sx={{
                                width: '100%',
                                minWidth: 0,
                                padding: '10px 16px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#ffffff',
                                backgroundColor: selected ? '#d32f2f' : '#5e35b1',
                                '&:hover': {
                                    backgroundColor: selected ? '#c62828' : '#512da8',
                                },
                                boxShadow: selected
                                    ? '0 2px 4px rgba(211, 47, 47, 0.3)'
                                    : '0 2px 4px rgba(94, 53, 177, 0.3)',
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {value.name}
                        </Button>
                    );
                })
            ) : (
                <div style={{ padding: 8, color: '#666', fontSize: 12 }}>
                    Loading mailboxes...
                </div>
            )}
        </Box>
    );
};


export default MailboxList;
