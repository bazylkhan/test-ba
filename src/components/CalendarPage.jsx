import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Select, MenuItem, Grid, Paper } from '@mui/material';
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
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth, 1).getDay();
    const emptyCells = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 });

    return (
        <Box sx={{ p: 3 }}>
            <Select
                value={selectedMonth}
                onChange={handleMonthChange}
                sx={{ mb: 2, width: 200 }}
                displayEmpty
            >
                {Array.from({ length: 12 }, (_, index) => (
                    <MenuItem key={index} value={index}>
                        {new Date(0, index).toLocaleString('default', { month: 'long' })}
                    </MenuItem>
                ))}
            </Select>
            <Grid container spacing={1} alignItems="center">
                {weekdays.map((day, index) => (
                    <Grid item xs={12 / 7} key={day} sx={{ textAlign: 'center' }}>
                        <Paper elevation={0} sx={{ py: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{day}</Typography>
                        </Paper>
                    </Grid>
                ))}
                {emptyCells.map((_, index) => (
                    <Grid item xs={12 / 7} key={`empty-${index}`} />
                ))}
                {days.map((day, index) => (
                    <Grid item xs={12 / 7} key={day} sx={{ textAlign: 'center' }}>
                        <Paper elevation={3} sx={{ py: 2 }}>
                            <Typography variant="h6">{day}</Typography>
                            {employees.filter(e => new Date(e.birthday).getMonth() === selectedMonth && new Date(e.birthday).getDate() === day).map(e => (
                                <Typography key={e.id} variant="body2">{e.fullName}</Typography>
                            ))}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CalendarPage;
