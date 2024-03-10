import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../features/authSlice";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3001/employees');
        const users = await response.json();

        const user = users.find(user => user.userLogin === username && user.password === password);

        if (user) {
            dispatch(login(user));
            navigate('/employees');
        } else {
            alert('Неверный логин или пароль');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" />
            <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </Box>
    );
}

export default LoginPage;
