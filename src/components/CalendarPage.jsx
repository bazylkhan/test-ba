import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Select, MenuItem, Grid } from '@mui/material';
import { getDaysInMonth } from './hooks/getDaysInMonth';
import { fetchEmployees, selectAllEmployees } from '../features/employeesSlice';

function CalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const dispatch = useDispatch();
    const employees = useSelector(selectAllEmployees);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <Box>
            <Select value={selectedMonth} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, index) => (
                    <MenuItem key={index} value={index}>
                        {new Date(0, index).toLocaleString('default', { month: 'long' })}
                    </MenuItem>
                ))}
            </Select>
            <Grid container spacing={2}>
                {days.map((day) => (
                    <Grid item xs={2} key={day}>
                        <Typography>{day}</Typography>
                        {employees.filter(e => new Date(e.birthday).getMonth() === selectedMonth && new Date(e.birthday).getDate() === day).map(e => (
                            <Typography key={e.id}>{e.fullName}</Typography>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CalendarPage;
