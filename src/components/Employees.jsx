import React, { useState } from 'react';
import TableComponent from './common/TableComponent';
import ModalComponent from './common/ModalComponent';

function EmployeesPage({employees}) {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
        { id: 'phone', label: 'Телефон' },
    ];

    return (
        <div>
            <TableComponent columns={columns} data={employees} onRowClick={handleOpenModal} />
            {selectedEmployee && (
                <ModalComponent open={modalOpen} onClose={handleCloseModal}>
                    <h2>{selectedEmployee.fullName}</h2>
                </ModalComponent>
            )}
        </div>
    );
}

export default EmployeesPage;
