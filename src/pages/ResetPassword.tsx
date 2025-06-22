
// // ✅ ResetPasswordPage.tsx (corrected request + validation)
// import { useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import Lottie from 'lottie-react';
// import resetAnim from '../assets/reset-password.json';
// import api from '../services/api';
// import toast, { Toaster } from 'react-hot-toast';

// const ResetPasswordPage = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const token = searchParams.get('token');
//     const [password, setPassword] = useState('');
//     const [confirm, setConfirm] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!token) {
//             toast.error('Token missing. Please check the reset link.');
//             return;
//         }

//         if (password !== confirm) {
//             toast.error('Passwords do not match');
//             return;
//         }

//         if (password.length < 6) {
//             toast.error('Password must be at least 6 characters long');
//             return;
//         }

//         try {
//             setLoading(true);
//             // await api.post(`/auth/admin/reset-password?token=${token}`, {
//             //     newPassword: password,
//             // });
//             await api.post(`/auth/admin/reset-password`, {
//                 token,
//                 newPassword: password,
//             });
            
//             toast.success('Password reset successfully! Redirecting to login...');
//             setTimeout(() => navigate('/login'), 2000);
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || 'Reset failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//             <Toaster position="top-right" />
//             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//                 <Lottie animationData={resetAnim} className="h-40 mx-auto mb-4" />
//                 <h2 className="text-2xl font-bold text-blue-700 mb-4">Reset Password</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="password"
//                         placeholder="New Password"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Confirm Password"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                         value={confirm}
//                         onChange={(e) => setConfirm(e.target.value)}
//                         required
//                     />
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                     >
//                         {loading ? 'Resetting...' : 'Reset Password'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPasswordPage;
// ✅ ResetPasswordPage.tsx (corrected request + validation)
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import resetAnim from '../assets/reset-password.json';
import api from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error('Token missing. Please check the reset link.');
            return;
        }

        if (password !== confirm) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true);
            // await api.post(`/auth/admin/reset-password?token=${token}`, {
            //     newPassword: password,
            // });
            await api.post(`/auth/admin/reset-password`, {
                             token,
                        newPassword: password,
                            });
            toast.success('Password reset successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Reset failed');
        } finally {
            setLoading(false);
        }
    };

    // 🔐 Token expiration auto-logout
    useEffect(() => {
        const checkTokenExpiry = () => {
            const token = localStorage.getItem('admin_token');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const now = Date.now() / 1000;
                if (payload.exp < now) {
                    toast.error('Session expired. Logging out...');
                    handleLogout();
                }
            }
        };
        checkTokenExpiry();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <Toaster position="top-right" />
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <Lottie animationData={resetAnim} className="h-40 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
