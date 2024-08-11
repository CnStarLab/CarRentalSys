'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

export default function AuthWarn(){
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        router.push('/');
    };

    const handleSignIn = () => {
        setOpen(false);
        router.push('/login');
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Warning
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    You must be logged in to access this page.
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 2, ml: -1}}>
                    Close
                </Button>
                <Button onClick={handleSignIn} sx={{ mt: 2, ml: 22 }}>
                    Sign in
                </Button>
            </Box>
        </Modal>
    );
};
