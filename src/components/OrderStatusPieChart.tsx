import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const statusData = [
    { name: 'Confirmed', value: 60 },
    { name: 'Cancelled', value: 25 },
    { name: 'Pending', value: 15 },
];

const COLORS = ['#10b981', '#ef4444', '#facc15'];

const OrderStatusPieChart = () => (
    // <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full">
    //     <h3 className="text-xl font-semibold text-white mb-4">Order Status Breakdown</h3>
    //     <ResponsiveContainer width="100%" height={300}>
    //         <PieChart>
    //             <Pie
    //                 data={statusData}
    //                 dataKey="value"
    //                 nameKey="name"
    //                 cx="50%"
    //                 cy="50%"
    //                 outerRadius={100}
    //                 label
    //             >
    //                 {statusData.map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //                 ))}
    //             </Pie>
    //             <Tooltip />
    //             <Legend />
    //         </PieChart>
    //     </ResponsiveContainer>
    // </div>
    <div className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-md w-full">
        <h3 className="text-2xl font-bold text-indigo-400 mb-4 tracking-wider uppercase">Order Status Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default OrderStatusPieChart;
