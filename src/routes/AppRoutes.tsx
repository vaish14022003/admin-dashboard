
// import { Route } from 'react-router-dom';
// import LandingPage from '../pages/LandingPage';
// import LoginPage from '../pages/LoginPage';

// const AppRoutes = (
//     <>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//     </>
// );

// export default AppRoutes;










// AppRoutes.tsx

import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import type { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ForgotPasswordPage from '../pages/ForgotPassword';
import ResetPasswordPage from '../pages/ResetPassword';
import VerifyOtpPage from '../pages/OTPVerification';
import UsersPage from '../pages/UsersPage';
import ManagersPage from '../pages/ManagersPage';
import OrdersPage from '../pages/OrdersPage';
import ProfilePage from '../pages/ProfilePage';
import "../App.css"


const ProtectedRoutes = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();

    if (!token) return <Navigate to="/login" replace />;

    try {
        const decoded: { exp: number } = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            dispatch(logout());
            return <Navigate to="/login" replace />;
        }
    } catch (e) {
        dispatch(logout());
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />

        <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/managers" element={<ManagersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Route>
    </Routes>
    // <LandingPage />
);

export default AppRoutes;
