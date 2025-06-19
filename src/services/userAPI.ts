import api from './api';

export const fetchUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const blockUserById = async (id: string) => {
    const response = await api.patch(`/admin/users/${id}/block`);
    return response.data;
};

export const unblockUserById = async (id: string) => {
    const response = await api.patch(`/admin/users/${id}/unblock`);
    return response.data;
};
