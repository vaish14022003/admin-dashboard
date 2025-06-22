
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import otpAnimation from '../assets/otp_verify.json';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import type { RootState } from '../app/store';

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) navigate('/dashboard');
    }, [token, navigate]);

    const validateOtp = (value: string) => /^[0-9]{0,6}$/.test(value);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateOtp(value)) {
            setOtp(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error('OTP must be exactly 6 digits');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post(
                '/auth/admin/verify-otp',
                { otp },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
                    },
                }
            );

            const token =
                response.data?.data?.accessToken ||
                response.data?.accessToken ||
                response.data?.token;

            const adminId =
                response.data?.data?.adminId ||
                response.data?.adminId;

            if (token) {
                localStorage.setItem('admin_token', token);
                //localStorage.setItem('adminId', response.data.adminId);
                if (adminId) {
                    localStorage.setItem('adminId', adminId); // ✅ store adminId
                }
                dispatch(loginSuccess(token));
                toast.success('OTP verified! Redirecting...');
                navigate('/dashboard');
            } else {
                toast.error('OTP verification failed');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <Toaster position="top-right" />
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <Lottie animationData={otpAnimation} className="h-40 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Verify OTP</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={otp}
                        onChange={handleOtpChange}
                        className={`w-full px-4 py-2 border rounded-md ${otp.length > 0 && otp.length !== 6 ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtpPage;