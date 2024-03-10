import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import Button from '@mui/material/Button';

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Button color="inherit" onClick={handleLogout}>
            Выйти
        </Button>
    );
};

export default LogoutButton;
