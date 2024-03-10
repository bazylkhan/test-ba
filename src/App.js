import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EmployeesPage from './components/Employees';
import CalendarPage from './components/Calendar';
import TaskListPage from './components/TaskList';
import { Container } from '@mui/material';

import useTaskList from './components/hooks/useTaskList';
import useEmployees from './components/hooks/useEmployees';
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

function App() {

    const tasks = useTaskList();
    const employees = useEmployees();

    return (
        <AuthProvider>
            <Router>
                <Header/>
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
