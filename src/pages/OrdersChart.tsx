
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { motion } from 'framer-motion';


const managerData = [
    { restaurant: 'KFC', performance: 85, color: '#e879f9' },
    { restaurant: 'Dominos', performance: 75, color: '#f87171' },
    { restaurant: 'Burger King', performance: 90, color: '#60a5fa' },
    { restaurant: 'Pizza Hut', performance: 60, color: '#fcd34d' },
    { restaurant: 'Subway', performance: 78, color: '#86efac' },
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