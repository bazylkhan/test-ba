import React from 'react';
import { Modal, Box } from '@mui/material';

function ModalComponent({ open, onClose, children, size }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: size, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                {children}
            </Box>
        </Modal>
    );
}

export default ModalComponent;
