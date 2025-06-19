import api from './api';

export const fetchAllOrders = async () => {
    const response = await api.get('/admin/orders');
    return response.data;
};

export const fetchOrdersByUser = async (userId: string) => {
    const response = await api.get(`/admin/orders/user/${userId}`);
    return response.data;
};

export const fetchOrdersByDate = async (start: string, end: string) => {
    const response = await api.get(`/admin/orders?start=${start}&end=${end}`);
    return response.data;
};

export const getOrderStats = async () => {
    const response = await api.get('/admin/orders/stats');
    return response.data;
};
