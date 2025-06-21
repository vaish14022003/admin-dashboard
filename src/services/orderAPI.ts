// import api from './api';


// // ✅ NEW
// export const getTotalOrders = async () => {
//     const response = await api.get('/admin/orders/total');
//     return response.data;
// };

// // ✅ NEW
// export const getOrdersByUserId = async (userId: string) => {
//     const response = await api.get(`/admin/orders/user/${userId}`);
//     return response.data;
// };
import api from './api';

// ✅ Get total orders based on required query param
export const getTotalOrders = async (
    period: 'month' | 'year' | 'week',
    status?: string,
    paymentStatus?: string
) => {
    const params = new URLSearchParams({ period });
    if (status) params.append('status', status);
    if (paymentStatus) params.append('paymentStatus', paymentStatus);

    const response = await api.get(`/order/total?${params.toString()}`);
    return response.data;
};

// ✅ Get orders by user ID
export const getOrdersByUserId = async (userId: string) => {
    const response = await api.get(`/order/user/${userId}`);
    return response.data;
};
