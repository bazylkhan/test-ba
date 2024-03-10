import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function Header() {
    const { isAuthenticated, userData } = useSelector(state => state.auth); // Здесь мы используем состояние из Redux
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {userData ? userData.fullName : ''}
                </Typography>
                {isAuthenticated && (
                    <>
                        <Button onClick={handleLogout} color="inherit">Выйти</Button>
                        <Button color="inherit" component={RouterLink} to="/employees">Сотрудники</Button>
                        <Button color="inherit" component={RouterLink} to="/calendar">Календарь</Button>
                        <Button color="inherit" component={RouterLink} to="/taskList">Список работ</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
