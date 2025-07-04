//import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('admin_token') || null,
    loading: false,
    error: null,
};

export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', credentials);
            const token = response.data?.token;
            if (token) {
                localStorage.setItem('admin_token', token);
            }
            return token;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem('admin_token');
        },
        // loginSuccess: (state, action) => {
        //     state.token = action.payload;
        //   },
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
          

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<string>) => {
                state.token = action.payload;
                state.loading = false;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { loginSuccess,logout } = authSlice.actions;
export default authSlice.reducer;