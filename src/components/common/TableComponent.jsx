import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

function TableComponent({ columns, data, onRowClick }) {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(1);
    };

    return (
        <Paper sx={{ position: 'relative' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <strong>{column.label}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row, idx) => (
                            <TableRow
                                key={idx}
                                onClick={() => onRowClick(row)}
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(data.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                color="primary"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center', paddingBottom: '16px', }}
            />
            <FormControl variant="standard" sx={{ m: 2, minWidth: 120, position: 'absolute', bottom: 0, right: 0 }}>
                <InputLabel id="rows-per-page-label">Строк на странице</InputLabel>
                <Select
                    labelId="rows-per-page-label"
                    id="rows-per-page"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    label="Строк на странице"
                >
                    {[5, 10, 15, 20].map(pageSize => (
                        <MenuItem key={pageSize} value={pageSize}>{pageSize}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    );
}

export default TableComponent;
