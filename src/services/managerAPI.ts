import api from './api';

export const fetchManagers = async () => {
    const response = await api.get('/admin/managers');
    return response.data;
};

export const validateManager = async (id: string) => {
    const response = await api.patch(`/admin/managers/${id}/validate`);
    return response.data;
};

export const invalidateManager = async (id: string) => {
    const response = await api.patch(`/admin/managers/${id}/invalidate`);
    return response.data;
};

export const blockManager = async (id: string) => {
    const response = await api.patch(`/admin/managers/${id}/block`);
    return response.data;
};

export const deleteManager = async (id: string) => {
    const response = await api.delete(`/admin/managers/${id}`);
    return response.data;
};
