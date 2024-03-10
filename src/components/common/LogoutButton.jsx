import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Button color="inherit" onClick={handleLogout}>Выход</Button>
    );
};

export default LogoutButton;
