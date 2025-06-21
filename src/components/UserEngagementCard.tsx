import React from 'react';

const UserEngagementCard = () => {
    const metrics = [
        { label: 'Returning Users', value: 72 },
        { label: 'New Users', value: 28 },
        { label: 'Avg. Rating', value: 4.3 },
    ];

    return (
      
        <div className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-md w-full md:w-1/3 h-[400px]">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 tracking-wider uppercase">User Engagement</h3>
            <ul className="space-y-6">
                {metrics.map((m, i) => (
                    <li
                        key={i}
                        className="flex justify-between text-lg font-semibold text-white border-b border-white/20 pb-2"
                    >
                        <span className="text-pink-100  drop-shadow-md">{m.label}</span>
                        <span className="text-green-400 font-bold text-xl">{m.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserEngagementCard;