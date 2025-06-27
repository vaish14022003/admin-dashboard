

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Order } from './orderTypes';

interface OrderState {
    orders: Order[];
    totalOrders: number;
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    totalOrders: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
};

// ✅ Fetch orders by user ID with pagination
export const fetchOrdersByUser = createAsyncThunk(
    'orders/fetchByUser',
    async (
        { userId, page, limit }: { userId: string; page: number; limit: number },
        thunkAPI
    ) => {
        try {
            const res = await api.get(`/order/user/${userId}?page=${page}&limit=${limit}`);
            return {
                orders: res.data.orders,
                currentPage: res.data.currentPage,
                totalPages: res.data.totalPages,
            };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to fetch user orders'
            );
        }
    }
);

// ✅ Fetch total orders with filters
export const fetchTotalOrders = createAsyncThunk(
    'orders/fetchTotalOrders',
    async (
        params: { period: 'week' | 'month' | 'year'; status?: string; paymentStatus?: string },
        thunkAPI
    ) => {
        try {
            const query = new URLSearchParams(params as any).toString();
            const res = await api.get(`/order/total?${query}`);
            return res.data.totalOrders ?? 0;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to fetch total orders'
            );
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Orders by User
            .addCase(fetchOrdersByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
                state.orders = action.payload.orders;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(fetchOrdersByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Total Orders
            .addCase(fetchTotalOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTotalOrders.fulfilled, (state, action) => {
                state.totalOrders = action.payload;
                state.loading = false;
            })
            .addCase(fetchTotalOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default orderSlice.reducer;

