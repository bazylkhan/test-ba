import React, { useState, useEffect } from 'react';
import TableComponent from './common/TableComponent';
import {FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


const TaskList = ({ tasks, employees }) => {
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const columns = [
        { id: 'description', label: 'Описание' },
    ];

    useEffect(() => {
        const filtered = tasks.filter(task => {
            const matchEmployee = selectedEmployeeId ? task.employeeId === selectedEmployeeId : true;
            const matchDate = selectedDate ? new Date(task.date).toDateString() === selectedDate.toDateString() : true;
            return matchEmployee && matchDate;
        });
        setFilteredTasks(filtered);
    }, [tasks, selectedEmployeeId, selectedDate]);


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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Filter by Date"
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <TableComponent columns={columns} data={filteredTasks.map(task => {
                return {
                    ...task,
                };
            })} />
        </div>
    );
};

export default TaskList;
