import { useState } from 'react';
import Lottie from 'lottie-react';
import otpAnimation from '../assets/otp_verify.json';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/verify-otp', { email, otp });
            const token = response.data?.token;
            setMessage('OTP verified successfully! Redirecting...');
            setTimeout(() => {
                navigate(`/reset-password/${token}`);
            }, 2000);
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
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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