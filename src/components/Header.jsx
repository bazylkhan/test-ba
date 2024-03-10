import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import LogoutButton from "./common/LogoutButton";
import {useAuth} from "../contexts/AuthContext";


function Header() {
    const {isAuthenticated} = useAuth()
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    admin
                </Typography>
                {isAuthenticated && (
                    <>
                    <LogoutButton />
                    <Button color="inherit" component={RouterLink} to="/employees">Employees</Button>
                    <Button color="inherit" component={RouterLink} to="/calendar">Calendar</Button>
                    <Button color="inherit" component={RouterLink} to="/taskList">Task List</Button>
                    </>
                )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header