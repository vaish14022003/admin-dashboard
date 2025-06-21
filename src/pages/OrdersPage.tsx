
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByUser, fetchTotalOrders } from '../features/orders/orderSlice';
import type { RootState, AppDispatch } from '../app/store';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { format } from 'date-fns';

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

    // Filter & pagination state
    const [page, setPage] = useState(1);
    const limit = 5;

    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
    const [status, setStatus] = useState('confirmed');
    const [paymentStatus, setPaymentStatus] = useState('pending');

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrdersByUser({ userId, page, limit }));
        }

        dispatch(
            fetchTotalOrders({
                period,
                status,
                paymentStatus,
            })
        );
    }, [dispatch, userId, page, period, status, paymentStatus]);

    const totalRevenue = useMemo(() => {
        return orders.reduce((acc, o) => acc + o.totalAmount, 0);
    }, [orders]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow ml-64">
                <Header />
                <main className="p-6 bg-gray-50 min-h-screen">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Your Orders</h2>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value as any)}
                            className="border px-3 py-2 rounded-md"
                        >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border px-3 py-2 rounded-md"
                        >
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                        </select>

                        <select
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="border px-3 py-2 rounded-md"
                        >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-lg text-gray-600">Total Orders</h3>
                            <p className="text-3xl font-bold text-blue-700">{totalOrders}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-lg text-gray-600">Total Revenue</h3>
                            <p className="text-3xl font-bold text-green-600">₹{totalRevenue}</p>
                        </div>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-600">{error}</div>
                    ) : (
                        <>
                            <div className="overflow-auto bg-white rounded-xl shadow-md mb-4">
                                <table className="w-full text-left">
                                    <thead className="bg-blue-100 text-blue-800">
                                        <tr>
                                            <th className="px-4 py-2">Order ID</th>
                                            <th className="px-4 py-2">Amount</th>
                                            <th className="px-4 py-2">Status</th>
                                            <th className="px-4 py-2">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id} className="border-t hover:bg-blue-50 transition">
                                                <td className="px-4 py-2">{order._id.slice(-6).toUpperCase()}</td>
                                                <td className="px-4 py-2">₹{order.totalAmount}</td>
                                                <td className="px-4 py-2 text-green-700 font-semibold">
                                                    {order.status}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {format(new Date(order.createdAt), 'dd MMM yyyy')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 mt-4">
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <span className="text-lg font-medium px-3">
                                    Page {page} of {totalPages || 1}
                                </span>
                                <button
                                    onClick={() => setPage((prev) => prev + 1)}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default OrdersPage;
