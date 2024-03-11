import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const response = await fetch('http://localhost:3001/tasks');
        if (!response.ok) {
            throw new Error('Не удалось загрузить список задач');
        }
        return await response.json();
    }
);

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (newTask, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Failed to add new task');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        allTasks: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setTasks: (state, action) => {
            state.allTasks = action.payload;
        },
        addTask: (state, action) => {
            state.allTasks.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allTasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewTask.pending, (state) => {
                // Опционально, можно изменить статус или добавить другую логику
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.allTasks.push(action.payload); // Добавление новой задачи в список
                state.status = 'succeeded'; // Опционально изменить статус
            })
            .addCase(addNewTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setTasks, addTask } = tasksSlice.actions;

export const selectAllTasks = state => state.tasks.allTasks;

export default tasksSlice.reducer;
