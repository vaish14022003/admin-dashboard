// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     withCredentials: true, // If using cookies or sessions
// });

// export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
