
import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { motion } from 'framer-motion';

const feedbackData = [
    { name: 'Positive', value: 65 },
    { name: 'Neutral', value: 20 },
    { name: 'Negative', value: 15 },
];

const COLORS = ['#10b981', '#fbbf24', '#ef4444']; // Using manager chart colors

const FeedbackPieChart = () => {
    return (
        <motion.div
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-xl w-full md:w-1/2 h-[398px] mt-9"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
        >
            <h3 className="text-2xl font-bold text-emerald-300 mb-4 tracking-wider uppercase text-center">
                User Feedback Overview
            </h3>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={feedbackData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={90}
                        label
                    >
                        {feedbackData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ backgroundColor: '#1f2937', borderRadius: '10px', color: '#f1f5f9' }} />
                    <Legend wrapperStyle={{ color: '#f1f5f9', marginTop: '30px' }} />
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default FeedbackPieChart;
