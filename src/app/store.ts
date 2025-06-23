import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import managerReducer from '../features/managers/managerSlice';
import orderReducer from '../features/orders/orderSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        manager: managerReducer,
        orders: orderReducer,
    },
   
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export type AppDispatch = typeof store.dispatch;