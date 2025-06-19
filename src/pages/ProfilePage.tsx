import React, { useState } from 'react';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: 'Admin',
        email: 'admin@foodify.com',
        role: 'Super Admin',
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">My Profile</h1>
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    className="w-full mt-1 mb-4 px-4 py-2 border rounded-md"
                    value={formData.name}
                    disabled
                />
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    className="w-full mt-1 mb-4 px-4 py-2 border rounded-md"
                    value={formData.email}
                    disabled
                />
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                    className="w-full mt-1 px-4 py-2 border rounded-md"
                    value={formData.role}
                    disabled
                />
            </div>
        </div>
    );
};

export default ProfilePage;
