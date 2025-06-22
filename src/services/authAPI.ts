

import api from './api';

// export const loginAdmin = async (email: string, password: string) => {
//     const response = await api.post('/auth/admin/login', { email, password });
//     localStorage.setItem('loginToken', response.data.accessToken);
//     localStorage.setItem('refresh_token', response.data.refreshToken);
//     localStorage.setItem('adminId', response.data.adminId); // << this line ensures logout works
//     return response.data;
// };
export const loginAdmin = async (email: string, password: string) => {
    const response = await api.post('/auth/admin/login', { email, password });
    localStorage.setItem('loginToken', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
    localStorage.setItem('adminId', response.data.adminId); // ✅ This must be here
    return response.data;
};


export const forgotPassword = async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const verifyOtp = async (otp: string) => {
    const response = await api.post('/auth/verify-otp', { otp }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('loginToken')}`
        }
    });
    return response.data;
};

export const resetPassword = async (token: string, password: string) => {
    const response = await api.post(`/auth/reset-password/${token}`, { password });
    return response.data;
};


// export const logoutAdmin = async () => {
//     const adminId = localStorage.getItem('adminId');
//     const response = await api.post('/auth/admin/logout', { adminId });
//     return response.data;
// };
export const logoutAdmin = async () => {
    const adminId = localStorage.getItem('adminId');
    console.log("Logging out adminId:", adminId); // ✅
    const response = await api.post('/auth/admin/logout', { adminId });
    return response.data;
};




export const refreshAdminToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await api.post('/auth/admin/refresh', { refreshToken });
    const newAccessToken = response.data?.accessToken;
    if (newAccessToken) {
        localStorage.setItem('admin_token', newAccessToken);
    }
    return newAccessToken;
};