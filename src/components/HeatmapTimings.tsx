import React from 'react';

const HeatmapTimings = () => {
    const data = [
        { time: 'Morning (8–11 AM)', orders: 40 },
        { time: 'Afternoon (12–3 PM)', orders: 75 },
        { time: 'Evening (5–8 PM)', orders: 120 },
        { time: 'Night (9–11 PM)', orders: 60 },
    ];

    return (
        
        <div className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-md w-full md:w-1/3 h-[400px]">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 tracking-wider uppercase">Order Timings Heatmap</h3>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-400 text-sm">
                        <th className="py-2 px-4">Time</th>
                        <th className="py-2 px-4">Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, idx) => (
                        <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/30">
                            <td className="py-2 px-4 text-white font-medium tracking-wide">{entry.time}</td>
                            <td className="py-2 px-4 text-emerald-400 font-semibold">{entry.orders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default HeatmapTimings;