import api from './api';

export const loginAdmin = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    // console.log(response.data);
    localStorage.setItem('loginToken', response.data.accessToken)
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
    // const response = await api.post('/auth/verify-otp', {email, otp });
    const response = await api.post('/auth/verify-otp', {  otp }, {
        headers: {
            Authorization: `Bearer: ${localStorage.getItem('loginToken')}`
        }
    });

    return response.data;
};

export const resetPassword = async (token: string, password: string) => {
    const response = await api.post(`/auth/reset-password/${token}`, { password });
    return response.data;
};
export const logoutAdmin = async () => {
    const response = await api.post('/auth/admin/logout');
    return response.data;
};