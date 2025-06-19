// import { useEffect, useState } from 'react';
// import Lottie from 'lottie-react';
// import otpAnimation from '../assets/otp_verify.json';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// // import { loginSuccess } from '../auth/authSlice';
// import { loginSuccess } from '../features/auth/authSlice';

// import { useSelector } from 'react-redux';
// import type { RootState } from '../app/store';


// const VerifyOtpPage = () => {
//     const [otp, setOtp] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//    const dispatch=useDispatch();
    
//     const token = useSelector((state: RootState) => state.auth.token);
//     // useEffect(() => {
//     //     if (token) {
//     //         navigate('/dashboard');
//     //     }
//     // }, [token]);

//     useEffect(() => {
//         if (token) {
//             navigate('/dashboard');
//         }
//     }, [token]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             // console.log(localStorage.getItem('loginToken'))
//             // const response = await api.post('/auth/verify-otp', { email, otp });
//             const response = await api.post('/auth/admin/verify-otp', {  otp },{
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('loginToken')}`
//                 }
//             });
//             // const token = response.data?.token;
//             const token = response.data?.accessToken;
            
//             if (token) {
//                 localStorage.setItem('admin_token', token); // ✅ Store token
//                 dispatch(loginSuccess(token)); // ✅ Update Redux state
//             }


//             setMessage('OTP verified successfully! Redirecting...');
//             setTimeout(() => {
//                 // navigate(`/reset-password/${token}`);
//                 navigate('/dashboard')
//             // }, 2000);
//             }, 500);
//         } catch (err: any) {
//             setMessage(err.response?.data?.message || 'Verification failed');
//         } finally {
//             setLoading(false);
//         }
//     };
  

    
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//                 <Lottie animationData={otpAnimation} className="h-40 mx-auto mb-4" />
//                 <h2 className="text-2xl font-bold text-blue-700 mb-4">Verify OTP</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                     />
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                     >
//                         {loading ? 'Verifying...' : 'Verify OTP'}
//                     </button>
//                 </form>
//                 {message && <p className="text-sm text-green-600 mt-4">{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default VerifyOtpPage;

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
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);

    // ✅ Redirect to dashboard if token exists
    useEffect(() => {
        if (token) {
            console.log('✅ Token available, navigating to dashboard...');
            navigate('/dashboard');
        }
    }, [token, navigate]);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         // const response = await api.post(
    //         //     '/auth/admin/verify-otp',
    //         //     { otp },
    //         //     {
    //         //         headers: {
    //         //             Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    //         //         },
    //         //     }
    //         // );

    //         // const token = response.data?.accessToken;

    //         // if (token) {
    //         //     localStorage.setItem('admin_token', token);     // ✅ Save token
    //         //     dispatch(loginSuccess(token));                  // ✅ Redux state update
    //         //     setMessage('OTP verified successfully!');
    //         // } else {
    //         //     setMessage('OTP verification failed: No token received.');
    //         // }
    //         const response = await api.post('/auth/admin/verify-otp', { otp }, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('loginToken')}`
    //             }
    //         });

    //         console.log("OTP Response Data:", response.data); // Debug log

    //         const token = response.data?.accessToken || response.data?.token;

    //         if (token) {
    //             localStorage.setItem('admin_token', token);
    //             dispatch(loginSuccess(token));
    //             setMessage('OTP verified successfully! Redirecting...');
    //             navigate('/dashboard');
    //         } else {
    //             setMessage('OTP verification failed: No token received.');
    //         }
              
    //     } catch (err: any) {
    //         setMessage(err.response?.data?.message || 'OTP verification failed');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
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

            console.log("Extracted Token:", token);

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
                    {/* <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /> */}
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
