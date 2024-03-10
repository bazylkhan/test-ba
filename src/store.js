import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/authSlice';
import tasksReducer from '../src/features/tasksSlice';
import employeesReducer from '../src/features/employeesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        employees: employeesReducer,
    },
});
