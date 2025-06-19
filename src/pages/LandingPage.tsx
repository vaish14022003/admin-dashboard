

// 2.

import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/admin-hero.json';
import FeatureIcons from '../components/FeatureIcons';
import logo from '../assets/logo-removebg-preview.png';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
            {/* Responsive 2-column layout */}
            <div className="flex flex-col md:flex-row flex-grow">

                {/* Sidebar */}
                <aside className="w-full md:w-1/4 bg-blue-100 text-blue-800 flex flex-col items-center pt-12 px-6 shadow-md">
                    <img
                        src={logo}
                        alt="Foodify Logo"
                        className="h-40 w-40 md:h-64 md:w-64 object-contain mb-4 drop-shadow-md"
                    />

                    <h2 className="text-2xl md:text-4xl font-extrabold text-teal-700 text-center tracking-wide uppercase">
                        Admin Panel
                    </h2>
                </aside>

                {/* Right Content */}
                <main className="w-full md:w-3/4 flex flex-col items-center justify-center text-center px-6 py-10 md:py-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Manage with Ease.
                    </h1>
                    <p className="text-base md:text-lg text-gray-500 max-w-md mb-8">
                        Effortless restaurant & order management in one place.
                    </p>

                    <Lottie
                        animationData={animationData}
                        className="w-72 h-72 md:w-[550px] md:h-[550px] mb-10"
                    />

                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-md transition-colors duration-300"
                    >
                        Login as Admin →
                    </button>
                </main>
            </div>

            {/* Feature Icons */}
            <FeatureIcons />

            {/* Footer */}
            <footer className="text-md text-gray-500 text-center py-4 border-t border-gray-100">
                © 2025 Foodify | Admin Panel v1.0.0
            </footer>
        </div>
    );
};

export default LandingPage;



