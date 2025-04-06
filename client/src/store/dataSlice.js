// src/store/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Table Data Fetcher
export const fetchTasks = createAsyncThunk(
    'data/fetchTasks',
    async (_, { getState, rejectWithValue }) => {
        const { page } = getState().data.table;
        try {
            const response = await fetch(`${API_BASE_URL}/tasks?page=${page}&limit=10`);
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Dashboard Data Fetcher
export const fetchDashboardTasks = createAsyncThunk(
    'data/fetchDashboardTasks',
    async ({ from, to }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/tasks?from=${from}&to=${to}`);
            const data = await response.json();
            return data.tasks;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        table: {
            tasks: [],
            page: 1,
            hasMore: true,
        },
        dashboard: {
            tasks: [],
            loading: false,
            error: null,
        },
        searchQuery: '',
        selectedStatus: 'All',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload.toLowerCase();
        },
        setSelectedStatus: (state, action) => {
            state.selectedStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.table.tasks = [...state.table.tasks, ...action.payload.tasks];
            state.table.page += 1;
            state.table.hasMore = action.payload.hasMore;
        });

        builder.addCase(fetchDashboardTasks.pending, (state) => {
            state.dashboard.loading = true;
            state.dashboard.error = null;
        });
        builder.addCase(fetchDashboardTasks.fulfilled, (state, action) => {
            state.dashboard.tasks = action.payload;
            state.dashboard.loading = false;
        });
        builder.addCase(fetchDashboardTasks.rejected, (state, action) => {
            state.dashboard.error = action.payload;
            state.dashboard.loading = false;
        });
    },
});

// Selectors
export const selectFilteredTasks = (state) => {
    const { tasks } = state.data.table;
    const { searchQuery, selectedStatus } = state.data;
    return tasks.filter((task) => {
        const matchesSearch = task.name?.toLowerCase().includes(searchQuery); // ✅ FIXED
        const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });
};


export const selectDashboardTasks = (state) => state.data.dashboard.tasks;
export const selectDashboardLoading = (state) => state.data.dashboard.loading;
export const selectDashboardError = (state) => state.data.dashboard.error;

export const { setSearchQuery, setSelectedStatus } = dataSlice.actions;
export default dataSlice.reducer;