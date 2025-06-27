import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';


const topProducts = [
    { name: 'Burger', count: 120, color: '#60a5fa' },
    { name: 'Pizza', count: 90, color: '#3b82f6' },
    { name: 'Drinks', count: 100, color: '#2563eb' },
];

const TopProductsChart = () => (
   
    
    <div className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-md w-full md:w-1/3 h-[400px]">
        <h3 className="text-2xl font-bold text-indigo-400 mb-4 tracking-wider uppercase">Top Ordered Products</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6">
                    {topProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>

);


export default TopProductsChart;