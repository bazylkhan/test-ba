import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async () => {
        const response = await fetch('http://localhost:3001/employees');
        if (!response.ok) {
            throw new Error('Не удалось загрузить список сотрудников');
        }
        return await response.json();
    }
);

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        allEmployees: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setEmployees: (state, action) => {
            state.allEmployees = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allEmployees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setEmployees } = employeesSlice.actions;

export const selectAllEmployees = state => state.employees.allEmployees;

export default employeesSlice.reducer;
