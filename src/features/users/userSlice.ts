// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';

// export interface User {
//     _id: string;
//     name: string;
//     email: string;
//     isBlocked: boolean;
// }

// interface UserState {
//     users: User[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: UserState = {
//     users: [],
//     loading: false,
//     error: null,
// };

// export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
//     try {
//         const response = await api.get('/users');
//         return response.data;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to fetch users');
//     }
// });

// export const toggleBlockUser = createAsyncThunk(
//     'users/toggleBlock',
//     async (userId: string, thunkAPI) => {
//         try {
//             const response = await api.patch(`/users/${userId}/toggle-block`);
//             return response.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to update user');
//         }
//     }
// );

// const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAllUsers.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//                 state.loading = false;
//                 state.users = action.payload;
//             })
//             .addCase(fetchAllUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(toggleBlockUser.fulfilled, (state, action: PayloadAction<User>) => {
//                 const index = state.users.findIndex((u) => u._id === action.payload._id);
//                 if (index !== -1) {
//                     state.users[index] = action.payload;
//                 }
//             });
//     },
// });

// export default userSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { User } from './userTypes';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// GET USERS
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await api.get('/admin/users');
        return res.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
});

// BLOCK USER
export const blockUserById = createAsyncThunk('users/block', async (id: string, thunkAPI) => {
    try {
        await api.patch(`/admin/users/${id}/block`);
        return id;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Block failed');
    }
});

// UNBLOCK USER
export const unblockUserById = createAsyncThunk('users/unblock', async (id: string, thunkAPI) => {
    try {
        await api.patch(`/admin/users/${id}/unblock`);
        return id;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Unblock failed');
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(blockUserById.fulfilled, (state, action) => {
                const user = state.users.find((u) => u._id === action.payload);
                if (user) user.isBlocked = true;
            })
            .addCase(unblockUserById.fulfilled, (state, action) => {
                const user = state.users.find((u) => u._id === action.payload);
                if (user) user.isBlocked = false;
            });
    },
});

export default userSlice.reducer;
