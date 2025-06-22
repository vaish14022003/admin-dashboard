// import { useState } from 'react';
// import Lottie from 'lottie-react';
// import forgotAnim from '../assets/forgot-password.json';
// import api from '../services/api';

// const ForgotPasswordPage = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await api.post('/auth/forgot-password', { email });
//             setMessage(response.data?.message || 'OTP sent successfully!');
//         } catch (err: any) {
//             setMessage(err.response?.data?.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//                 <Lottie animationData={forgotAnim} className="h-40 mx-auto mb-4" />
//                 <h2 className="text-2xl font-bold text-blue-700 mb-4">Forgot Password</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                     >
//                         {loading ? 'Sending OTP...' : 'Send OTP'}
//                     </button>
//                 </form>
//                 {message && <p className="text-sm text-green-600 mt-4">{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default ForgotPasswordPage;
import { useState } from 'react';
import Lottie from 'lottie-react';
import toast, { Toaster } from 'react-hot-toast';
import forgotAnim from '../assets/forgot-password.json';
import api from '../services/api';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/admin/forgot-password', { email });
            toast.success(response.data?.message || 'OTP sent successfully!');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <Toaster position="top-right" />
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <Lottie animationData={forgotAnim} className="h-40 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;