import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const monthlyData = [
    { month: 'Jan', orders: 50 },
    { month: 'Feb', orders: 75 },
    { month: 'Mar', orders: 120 },
    { month: 'Apr', orders: 90 },
    { month: 'May', orders: 160 },
    { month: 'Jun', orders: 200 },
];

const MonthlyOrdersChart = () => (
    // <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full">
    //     <h3 className="text-xl font-semibold text-white mb-4">Monthly Order Trend</h3>
    //     <ResponsiveContainer width="100%" height={300}>
    //         <LineChart data={monthlyData}>
    //             <CartesianGrid strokeDasharray="3 3" stroke="#444" />
    //             <XAxis dataKey="month" stroke="#ccc" />
    //             <YAxis stroke="#ccc" />
    //             <Tooltip />
    //             <Line type="monotone" dataKey="orders" stroke="#38bdf8" strokeWidth={2} />
    //         </LineChart>
    //     </ResponsiveContainer>
    // </div>
    <div className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-md w-full">
        <h3 className="text-2xl font-bold text-indigo-400 mb-4 tracking-wider uppercase">Monthly Order Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#38bdf8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default MonthlyOrdersChart;