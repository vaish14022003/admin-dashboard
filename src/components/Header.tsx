
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, HelpCircle } from 'lucide-react';
import Notifications from './Notifications';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleNavigateProfile = () => {
        navigate('/profile');
        setDropdownOpen(false);
    };

    return (
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md ml-1 relative">
            <h1 className="text-3xl font-extrabold text-blue-800 tracking-wider">Admin Panel</h1>

            <div className="flex items-center gap-6 relative">
                <Notifications />

                {/* Profile dropdown */}
                <div className="relative">
                    <button
                        className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-105 transition"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                        <User size={22} />
                    </button>

                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg z-50 py-2"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <button
                                    onClick={handleNavigateProfile}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <User size={16} className="mr-2" />
                                    Your Profile
                                </button>
                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <Settings size={16} className="mr-2" />
                                    Settings
                                </button>
                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <HelpCircle size={16} className="mr-2" />
                                    Help
                                </button>
                                <div className="border-t border-gray-200 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Header;
