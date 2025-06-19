

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Lottie from 'lottie-react';
import dashboardAnim from '../assets/dashboard-animation.json';

const DashboardPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow ml-64">
                <Header />
                <main className="p-6 bg-gray-50 min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Stats */}
                        {/* <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Users</h2>
                            <p className="text-3xl font-bold text-gray-800">240</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Orders</h2>
                            <p className="text-3xl font-bold text-gray-800">1280</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">Restaurants</h2>
                            <p className="text-3xl font-bold text-gray-800">57</p>
                        </div> */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                                <h2 className="text-xl font-semibold text-green-700 mb-2">Total Revenue</h2>
                                <p className="text-3xl font-bold text-gray-800">₹1,85,000</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                                <h2 className="text-xl font-semibold text-indigo-700 mb-2">Top Restaurant</h2>
                                <p className="text-lg font-medium text-gray-700">Royal Spice</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6 text-center">
                                <h2 className="text-xl font-semibold text-yellow-700 mb-2">Average Order Value</h2>
                                <p className="text-2xl font-bold text-gray-800">₹144.53</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center">
                        <Lottie animationData={dashboardAnim} className="w-[500px] h-[500px]" />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
