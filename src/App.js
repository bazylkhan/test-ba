import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EmployeesPage from './components/EmployeesPage';
import CalendarPage from './components/CalendarPage';
import TaskListPage from './components/TaskList';
import { Container } from '@mui/material';
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

function App() {
    return (
            <Router>
                <Header/>
                <Container>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/employees" element={
                            <PrivateRoute>
                                <EmployeesPage />
                            </PrivateRoute>
                        } />
                        <Route path="/calendar" element={
                            <PrivateRoute>
                                <CalendarPage />
                            </PrivateRoute>
                        } />
                        <Route path="/taskList" element={
                            <PrivateRoute>
                                <TaskListPage />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Container>
            </Router>
    );
}

export default App;
