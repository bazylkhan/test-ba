import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableComponent from './common/TableComponent';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from 'date-fns/format';
import {fetchTasks, selectAllTasks} from "../features/tasksSlice";
import {selectAllEmployees} from "../features/employeesSlice";

const TaskList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const tasks = useSelector(selectAllTasks);
    const employees = useSelector(selectAllEmployees);
    const columns = [
        { id: 'description', label: 'Описание', minWidth: 170 },
        { id: 'date', label: 'Дата', minWidth: 120 },
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
            <Button
                sx={{ marginLeft: 2 }}
                variant="outlined"
                onClick={() => setSelectedDate(null)}
            >
                Сбросить дату
            </Button>
            <TableComponent
                columns={columns}
                data={filteredTasks.map(task => ({
                    ...task,
                    date: format(new Date(task.date), 'dd.MM.yyyy')
                }))}
            />
        </div>
    );
};

export default TaskList;
