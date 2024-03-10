import React, { useState } from 'react';
import TableComponent from './common/TableComponent';
import ModalComponent from './common/ModalComponent';
import { TextField, Box } from '@mui/material';

function EmployeesPage({employees}) {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterIIN, setFilterIIN] = useState('');
    const [filterFullName, setFilterFullName] = useState('');
    const [filterPhone, setFilterPhone] = useState('');

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
                    <h2>{selectedEmployee.fullName}</h2>
                </ModalComponent>
            )}
        </div>
    );
}

export default EmployeesPage;
