import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EmployeesPage from './components/Employees';
import CalendarPage from './components/Calendar';
import TaskListPage from './components/TaskList';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';

import useTaskList from './components/hooks/useTaskList';
import useEmployees from './components/hooks/useEmployees';
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {

    const tasks = useTaskList();
    const employees = useEmployees();

    return (
        <AuthProvider>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            My App
                        </Typography>
                        <Button color="inherit" component={RouterLink} to="/">Home</Button>
                        <Button color="inherit" component={RouterLink} to="/employees">Employees</Button>
                        <Button color="inherit" component={RouterLink} to="/calendar">Calendar</Button>
                        <Button color="inherit" component={RouterLink} to="/taskList">Task List</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/employees" element={
                            <PrivateRoute>
                                <EmployeesPage employees={employees} />
                            </PrivateRoute>
                        } />
                        <Route path="/calendar" element={
                            <PrivateRoute>
                                <CalendarPage employees={employees} />
                            </PrivateRoute>
                        } />
                        <Route path="/taskList" element={
                            <PrivateRoute>
                                <TaskListPage tasks={tasks} employees={employees}/>
                            </PrivateRoute>
                        } />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
