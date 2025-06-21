
// import React from 'react';
// import {
//     LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import { motion } from 'framer-motion';

// const userData = [
//     { month: 'Jan', users: 200 },
//     { month: 'Feb', users: 400 },
//     { month: 'Mar', users: 600 },
//     { month: 'Apr', users: 800 },
//     { month: 'May', users: 1000 },
//     { month: 'Jun', users: 1300 },
// ];

// const UsersChart = () => {
//     return (
//         <motion.div
//             className="bg-gradient-to-tr from-slate-900 via-gray-900 to-zinc-800 p-6 rounded-xl shadow-2xl w-full transition-all duration-500"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.02 }}
//         >
//             <h3 className="text-3xl font-extrabold text-indigo-200 mb-6 tracking-widest uppercase text-center drop-shadow-md">
//                 Monthly Active Users
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={userData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                     <XAxis dataKey="month" stroke="#dbeafe" />
//                     <YAxis stroke="#dbeafe" />
//                     <Tooltip wrapperStyle={{ backgroundColor: '#1e293b', borderRadius: '10px' }} />
//                     <Legend />
//                     <Line
//                         type="monotone"
//                         dataKey="users"
//                         stroke="#7dd3fc"
//                         strokeWidth={3}
//                         dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
//                         activeDot={{ r: 7 }}
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </motion.div>
//     );
// };

// export default UsersChart;

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const userData = [
    { month: 'Jan', users: 200 },
    { month: 'Feb', users: 400 },
    { month: 'Mar', users: 600 },
    { month: 'Apr', users: 800 },
    { month: 'May', users: 1000 },
    { month: 'Jun', users: 1300 },
];

const UsersChart = () => {
    return (
        <motion.div
            className="bg-gradient-to-tr from-slate-900 via-gray-900 to-zinc-800 p-6 rounded-xl shadow-2xl w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
        >
            <h3 className="text-3xl font-extrabold text-indigo-200 mb-6 tracking-widest uppercase text-center drop-shadow-md">
                Monthly Active Users
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#dbeafe" />
                    <YAxis stroke="#dbeafe" />
                    <Tooltip wrapperStyle={{ backgroundColor: '#1e293b', borderRadius: '10px' }} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#7dd3fc"
                        strokeWidth={3}
                        dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default UsersChart;
