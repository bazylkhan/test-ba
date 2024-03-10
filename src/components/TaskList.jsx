import React, { useState, useEffect } from 'react';
import useEmployees from "./hooks/useEmployees";
import { FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from '@mui/material';

const TaskList = ({ tasks, employees }) => {
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

    useEffect(() => {
        if (selectedEmployeeId) {
            const filtered = tasks.filter(task => task.employeeId == selectedEmployeeId);
            setFilteredTasks(filtered);
        } else {
            setFilteredTasks(tasks);
        }
    }, [selectedEmployeeId, tasks]);

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="employee-select-label">Сотрудник</InputLabel>
                <Select
                    labelId="employee-select-label"
                    id="employee-select"
                    value={selectedEmployeeId}
                    label="Сотрудник"
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                    <MenuItem value="">
                        <em>Все сотрудники</em>
                    </MenuItem>
                    {employees.map(employee => (
                        <MenuItem key={employee.id} value={employee.id}>{employee.fullName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <List>
                {filteredTasks.map(task => (
                    <ListItem key={task.id}>
                        <ListItemText primary={task.description} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TaskList;
