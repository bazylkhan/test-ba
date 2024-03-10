import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";



function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Использование функции login из контекста
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            login();
            navigate('/employees');
        } else {
            alert('Неверное имя пользователя или пароль');
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