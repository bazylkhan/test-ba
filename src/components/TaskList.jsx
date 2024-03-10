import React, { useState, useEffect } from 'react';
import TableComponent from './common/TableComponent';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TaskList = ({ tasks, employees }) => {
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

    useEffect(() => {
        if (selectedEmployeeId) {
            const filtered = tasks.filter(task => task.employeeId === selectedEmployeeId);
            setFilteredTasks(filtered);
        } else {
            setFilteredTasks(tasks);
        }
    }, [selectedEmployeeId, tasks]);

    const columns = [
        { id: 'description', label: 'Описание' },
    ];

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel id="employee-select-label">Сотрудник</InputLabel>
                <Select
                    labelId="employee-select-label"
                    id="employee-select"
                    value={selectedEmployeeId}
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
            <TableComponent columns={columns} data={filteredTasks.map(task => {
                return {
                    ...task,
                };
            })} />
        </div>
    );
};

export default TaskList;
