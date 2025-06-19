import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
    return (
        <div className="relative group cursor-pointer">
            <Bell className="w-6 h-6 text-blue-700" />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
            </span>
            {/* Tooltip */}
            <div className="absolute hidden group-hover:block top-8 right-0 bg-white shadow-md p-4 rounded-md w-64 z-10">
                <p className="text-sm font-medium">🍕 Order #1023 delayed</p>
                <p className="text-sm font-medium mt-1">💳 Payment failed on #1019</p>
                <p className="text-sm font-medium mt-1">🧾 New manager request pending</p>
            </div>
        </div>
    );
};

export default Notifications;
