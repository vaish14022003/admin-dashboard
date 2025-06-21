
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByUser, fetchTotalOrders } from '../features/orders/orderSlice';
import type { RootState, AppDispatch } from '../app/store';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { format } from 'date-fns';

import MonthlyOrdersChart from '../components/MonthlyOrdersChart';
import OrderStatusPieChart from '../components/OrderStatusPieChart';
import TopProductsChart from '../components/TopProductsChart';
import HeatmapTimings from '../components/HeatmapTimings';
import ExportButton from '../components/ExportButton';
import UserEngagementCard from '../components/UserEngagementCard';


const OrdersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        orders,
        totalOrders,
        currentPage,
        totalPages,
        loading,
        error,
    } = useSelector((state: RootState) => state.orders);

    const userId = useSelector((state: RootState) => state.auth.user?._id || '');

    const [page, setPage] = useState(1);
    const limit = 5;

    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
    const [status, setStatus] = useState('confirmed');
    const [paymentStatus, setPaymentStatus] = useState('pending');

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrdersByUser({ userId, page, limit }));
        }
        dispatch(fetchTotalOrders({ period, status, paymentStatus }));
    }, [dispatch, userId, page, period, status, paymentStatus]);

    const totalRevenue = useMemo(() => {
        return orders.reduce((acc, o) => acc + o.totalAmount, 0);
    }, [orders]);

    return (
        <div className="flex bg-gray-900 text-white">
            <Sidebar />
            <div className="flex flex-col flex-grow ml-64">
                <Header />
                <main className="p-6 min-h-screen">
                    <h2 className="text-3xl font-bold text-blue-400 mb-6">Your Orders</h2>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value as any)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                        </select>

                        <select
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold text-white">Total Orders</h3>
                            <p className="text-4xl font-bold text-white mt-2">{totalOrders}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold text-white">Total Revenue</h3>
                            <p className="text-4xl font-bold text-white mt-2">₹{totalRevenue}</p>
                        </div>
                    </div>

                    {/* Orders Table */}
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-400">{error}</div>
                    ) : (
                        <>
                            <div className="overflow-auto bg-gray-800 rounded-xl shadow-md mb-6">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-blue-900 text-blue-100">
                                        <tr>
                                            <th className="px-5 py-3">Order ID</th>
                                            <th className="px-5 py-3">Amount</th>
                                            <th className="px-5 py-3">Status</th>
                                            <th className="px-5 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                                                <td className="px-5 py-3">{order._id.slice(-6).toUpperCase()}</td>
                                                <td className="px-5 py-3">₹{order.totalAmount}</td>
                                                <td className="px-5 py-3">
                                                    <span className={`px-2 py-1 rounded text-sm font-medium 
                                                        ${order.status === 'confirmed' ? 'bg-green-700 text-white' :
                                                            order.status === 'cancelled' ? 'bg-red-700 text-white' :
                                                                'bg-yellow-600 text-white'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    {format(new Date(order.createdAt), 'dd MMM yyyy')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                                 




                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-3 mt-4">
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <span className="text-base font-medium text-white px-2">
                                    Page {page} of {totalPages || 1}
                                </span>
                                <button
                                    onClick={() => setPage((prev) => prev + 1)}
                                    disabled={page === totalPages}
                                    className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>


                                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                                        <MonthlyOrdersChart />
                                        <OrderStatusPieChart />
                                    </div>

                                    {/* <div className="grid md:grid-cols-2 gap-6 mt-10"> */}
                                    <div className="flex flex-col md:flex-row gap-6 mt-10">
                                        <TopProductsChart />
                                        <HeatmapTimings />
                                        <UserEngagementCard/>
                                    </div>

                                    <div className="mt-8">
                                        <ExportButton />
                                    </div>


                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default OrdersPage;
