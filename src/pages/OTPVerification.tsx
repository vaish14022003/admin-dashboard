
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import otpAnimation from '../assets/otp_verify.json';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import type { RootState } from '../app/store';

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);

    // ✅ Redirect if already logged in
    useEffect(() => {
        if (token) {
            console.log('✅ Token available, navigating to dashboard...');
            navigate('/dashboard');
        }
    }, [token, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

            console.log("OTP Response Data:", response.data);

            const token =
                response.data?.data?.accessToken ||
                response.data?.accessToken ||
                response.data?.token;

            if (token) {
                localStorage.setItem('admin_token', token);
                dispatch(loginSuccess(token));
                setMessage('OTP verified successfully! Redirecting...');
                navigate('/dashboard');
            } else {
                setMessage('OTP verification failed: No token received');
            }
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <Lottie animationData={otpAnimation} className="h-40 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Verify OTP</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
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

                {message && <p className="text-sm text-green-600 mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default VerifyOtpPage;
