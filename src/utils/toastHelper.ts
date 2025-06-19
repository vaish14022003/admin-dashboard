import { toast } from 'react-toastify';

export const showSuccess = (msg: string) => {
    toast.success(msg, {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
    });
};

export const showError = (msg: string) => {
    toast.error(msg, {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
    });
};
