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

    useEffect(() => {
        if (open === false) {
            router.push('/');
        }
    }, [open, router]);

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
                <Button onClick={handleClose} sx={{ mt: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};
