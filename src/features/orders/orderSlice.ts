// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';

// export interface Order {
//     _id: string;
//     user: { name: string; email: string };
//     items: string[];
//     totalAmount: number;
//     createdAt: string;
// }

// interface OrderState {
//     allOrders: Order[];
//     userOrders: Order[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: OrderState = {
//     allOrders: [],
//     userOrders: [],
//     loading: false,
//     error: null,
// };

// export const fetchAllOrders = createAsyncThunk('orders/fetchAll', async (_, thunkAPI) => {
//     try {
//         const res = await api.get('/orders');
//         return res.data;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
//     }
// });

// export const fetchOrdersByUser = createAsyncThunk(
//     'orders/fetchByUser',
//     async (userId: string, thunkAPI) => {
//         try {
//             const res = await api.get(`/orders/user/${userId}`);
//             return res.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch user orders');
//         }
//     }
// );

// const orderSlice = createSlice({
//     name: 'orders',
//     initialState,
//     reducers: {
//         clearUserOrders: (state) => {
//             state.userOrders = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAllOrders.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
//                 state.allOrders = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchOrdersByUser.fulfilled, (state, action: PayloadAction<Order[]>) => {
//                 state.userOrders = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchAllOrders.rejected, (state, action) => {
//                 state.error = action.payload as string;
//                 state.loading = false;
//             })
//             .addCase(fetchOrdersByUser.rejected, (state, action) => {
//                 state.error = action.payload as string;
//                 state.loading = false;
//             });
//     },
// });

// export const { clearUserOrders } = orderSlice.actions;
// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Order } from './orderTypes';

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAll',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/admin/orders');
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Order fetch failed');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default orderSlice.reducer;

