// // src/pages/ManagersChart.tsx
// import React from 'react';
// import {
//     BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// const managerData = [
//     { restaurant: 'KFC', performance: 85 },
//     { restaurant: 'Dominos', performance: 75 },
//     { restaurant: 'Burger King', performance: 90 },
//     { restaurant: 'Pizza Hut', performance: 60 },
//     { restaurant: 'Subway', performance: 78 },
// ];

// const ManagersChart = () => {
//     return (
//         <div className="bg-gray-800 p-6 rounded-xl shadow-md mt-10">
//             <h3 className="text-xl font-semibold text-white mb-4">Manager Performance by Restaurant</h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={managerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                     <XAxis dataKey="restaurant" stroke="#ccc" />
//                     <YAxis stroke="#ccc" />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="performance" fill="#10b981" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default ManagersChart;
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { motion } from 'framer-motion';

const managerData = [
    { restaurant: 'KFC', performance: 85, color: '#4ade80' },
    { restaurant: 'Dominos', performance: 75, color: '#60a5fa' },
    { restaurant: 'Burger King', performance: 90, color: '#f472b6' },
    { restaurant: 'Pizza Hut', performance: 60, color: '#facc15' },
    { restaurant: 'Subway', performance: 78, color: '#34d399' },
];

const ManagersChart = () => {
    return (
        <motion.div
            className="bg-gradient-to-tr from-slate-900 via-gray-900 to-zinc-800 p-6 rounded-xl shadow-2xl mt-10 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
        >
            <h3 className="text-3xl font-extrabold text-teal-300 mb-6 tracking-widest uppercase text-center drop-shadow-md">
                Manager Performance by Restaurant
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={managerData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="restaurant" stroke="#dbeafe" />
                    <YAxis stroke="#dbeafe" />
                    <Tooltip wrapperStyle={{ backgroundColor: '#1e293b', borderRadius: '10px' }} />
                    <Legend />
                    <Bar dataKey="performance">
                        {managerData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default ManagersChart;