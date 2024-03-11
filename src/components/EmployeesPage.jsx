import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, selectAllEmployees } from '../features/employeesSlice';
import TableComponent from './common/TableComponent';
import ModalComponent from './common/ModalComponent';
import {TextField, Box, CircularProgress, Typography, CardContent, Card, Grid, Divider} from '@mui/material';

function EmployeesPage() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterIIN, setFilterIIN] = useState('');
    const [filterFullName, setFilterFullName] = useState('');
    const [filterPhone, setFilterPhone] = useState('');

    const dispatch = useDispatch();
    const employees = useSelector(selectAllEmployees);
    const loading = useSelector(state => state.employees.loading);


    useEffect(() => {
        dispatch(fetchEmployees());
    }, [employees]);

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const columns = [
        { id: 'fullName', label: 'ФИО' },
        { id: 'iin', label: 'ИИН' },
        { id: 'phone', label: 'Телефон' }
    ];

    const filteredEmployees = employees.filter(employee => {
        return employee.iin.includes(filterIIN) &&
            employee.fullName.toLowerCase().includes(filterFullName.toLowerCase()) &&
            employee.phone.includes(filterPhone);
    });

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                    label="ФИО"
                    variant="outlined"
                    value={filterFullName}
                    onChange={(e) => setFilterFullName(e.target.value)}
                />
                <TextField
                    label="ИИН"
                    variant="outlined"
                    value={filterIIN}
                    onChange={(e) => setFilterIIN(e.target.value)}
                />
                <TextField
                    label="Телефон"
                    variant="outlined"
                    value={filterPhone}
                    onChange={(e) => setFilterPhone(e.target.value)}
                />
            </Box>
            <TableComponent columns={columns} data={filteredEmployees} onRowClick={handleOpenModal} />
            {selectedEmployee && (
                <ModalComponent open={modalOpen} onClose={handleCloseModal}>
                    <div>
                        <Typography variant="h5" component="div" gutterBottom>
                            Сотрудник: {selectedEmployee.fullName}
                        </Typography>
                        <Divider variant="middle" sx={{ my: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1">ИИН: {selectedEmployee.iin}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">Телефон: {selectedEmployee.phone}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">Почта: {selectedEmployee.email}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">Адрес: {selectedEmployee.address}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">День рождения: {selectedEmployee.birthdate}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </ModalComponent>
            )}

        </div>
    );
}

export default EmployeesPage;
