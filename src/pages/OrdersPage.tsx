// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchAllOrders,
//     fetchOrdersByUser,
//     clearUserOrders,
// } from '../features/orders/orderSlice';
// import { AppDispatch, RootState } from '../app/store';

// const OrdersPage = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { allOrders, userOrders, loading } = useSelector((state: RootState) => state.orders);
//     const [userId, setUserId] = useState('');

//     useEffect(() => {
//         dispatch(fetchAllOrders());
//     }, [dispatch]);

//     const handleSearch = () => {
//         if (userId) {
//             dispatch(fetchOrdersByUser(userId));
//         }
//     };

//     const resetUserOrders = () => {
//         dispatch(clearUserOrders());
//         setUserId('');
//     };

//     return (
//         <div className="p-6 min-h-screen bg-gray-50">
//             <h1 className="text-2xl font-bold text-blue-800 mb-4">All Orders</h1>

//             {/* User Order Search */}
//             <div className="mb-6 flex gap-4 items-center">
//                 <input
//                     type="text"
//                     placeholder="Enter User ID"
//                     className="px-4 py-2 border border-gray-300 rounded-md w-72"
//                     value={userId}
//                     onChange={(e) => setUserId(e.target.value)}
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                 >
//                     Search Orders
//                 </button>
//                 <button
//                     onClick={resetUserOrders}
//                     className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//                 >
//                     Clear
//                 </button>
//             </div>

//             {/* Orders Table */}
//             {loading ? (
//                 <p>Loading orders...</p>
//             ) : (
//                 <div className="overflow-x-auto rounded-lg shadow">
//                     <table className="min-w-full bg-white border border-gray-200">
//                         <thead className="bg-blue-100 text-blue-800 text-left">
//                             <tr>
//                                 <th className="py-3 px-4">Order ID</th>
//                                 <th className="py-3 px-4">User</th>
//                                 <th className="py-3 px-4">Total</th>
//                                 <th className="py-3 px-4">Items</th>
//                                 <th className="py-3 px-4">Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {(userId ? userOrders : allOrders).map((order) => (
//                                 <tr key={order._id} className="border-t">
//                                     <td className="py-2 px-4">{order._id}</td>
//                                     <td className="py-2 px-4">{order.user?.name || 'N/A'}</td>
//                                     <td className="py-2 px-4">₹{order.totalAmount}</td>
//                                     <td className="py-2 px-4">{order.items.length}</td>
//                                     <td className="py-2 px-4">
//                                         {new Date(order.createdAt).toLocaleDateString()}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrdersPage;
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../features/orders/orderSlice';
import type { RootState, AppDispatch } from '../app/store';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { format } from 'date-fns';
//import { useDispatch } from 'react-redux';
//import type { AppDispatch } from '../app/store';

const OrdersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, loading } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const totalRevenue = useMemo(() => {
        return orders.reduce((acc, o) => acc + o.totalAmount, 0);
    }, [orders]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow ml-64">
                <Header />
                <main className="p-6 bg-gray-50 min-h-screen">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">All Orders</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-lg text-gray-600">Total Orders</h3>
                            <p className="text-3xl font-bold text-blue-700">{orders.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-lg text-gray-600">Total Revenue</h3>
                            <p className="text-3xl font-bold text-green-600">₹{totalRevenue}</p>
                        </div>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="overflow-auto bg-white rounded-xl shadow-md">
                            <table className="w-full text-left">
                                <thead className="bg-blue-100 text-blue-800">
                                    <tr>
                                        <th className="px-4 py-2">Order ID</th>
                                        <th className="px-4 py-2">User</th>
                                        <th className="px-4 py-2">Amount</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-t hover:bg-blue-50 transition">
                                            <td className="px-4 py-2">{order._id.slice(-6).toUpperCase()}</td>
                                            <td className="px-4 py-2">
                                                {order.user?.name} <br />
                                                <span className="text-sm text-gray-500">{order.user?.email}</span>
                                            </td>
                                            <td className="px-4 py-2">₹{order.totalAmount}</td>
                                            <td className="px-4 py-2 text-green-700 font-semibold">{order.status}</td>
                                            <td className="px-4 py-2">{format(new Date(order.createdAt), 'dd MMM yyyy')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default OrdersPage;
