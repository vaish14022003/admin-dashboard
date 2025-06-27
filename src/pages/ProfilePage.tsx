
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: 'Admin',
        email: 'admin@foodify.com',
        role: 'Super Admin',
        lastLogin: '2025-06-22 09:41 AM',
        phone: '123-456-7890',
    });

    const [avatar, setAvatar] = useState<string | null>(null);
    const [activityLog, setActivityLog] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments?_limit=4')
            .then(res => {
                const logs = res.data.map((item: any) => `📝 ${item.name}`);
                setActivityLog(logs);
            })
            .catch(() => {
                setActivityLog([
                    '🟢 Logged in at 9:41 AM',
                    '🍔 Updated menu at 9:00 AM',
                    '📊 Viewed sales report at 8:30 AM',
                    '🚚 Messaged delivery team at 8:10 AM',
                ]);
            });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setAvatar(ev.target?.result as string);
                toast.success('Avatar updated successfully!');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = () => {
        toast.success('Changes saved successfully!');
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Sidebar />

            <motion.div
                className="flex-1 p-10 overflow-y-auto ml-170"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Toaster position="top-right" />
                <h1 className="text-4xl font-extrabold text-blue-800 mb-8 tracking-wide drop-shadow-md ml-25">
                    Admin Profile
                </h1>

                <div className="flex gap-4 mb-6 ml-22">
                    {['profile', 'security', 'billing'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-lg font-semibold capitalize ${activeTab === tab
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'profile' && (
                    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="flex flex-col items-center mb-6">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg" />
                            ) : (
                                <img src="/profile.png" alt="Default Avatar" className="w-24 h-24 rounded-full object-cover shadow-md" />
                            )}
                            <label htmlFor="avatar-upload" className="mt-3 text-blue-600 cursor-pointer text-sm font-medium underline hover:text-blue-800">
                                Change Profile Picture
                            </label>
                            <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                        </div>

                        <div className="space-y-4 text-sm text-gray-700">
                            {['name', 'email', 'phone'].map((field) => (
                                <div key={field}>
                                    <label className="block font-semibold mb-1 text-gray-800 capitalize">{field}</label>
                                    <input
                                        name={field}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        value={(formData as any)[field]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block font-semibold mb-1 text-gray-800">Role</label>
                                <input className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100" value={formData.role} disabled />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1 text-gray-800">Last Login</label>
                                <input className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" value={formData.lastLogin} disabled />
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Save Changes
                        </button>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4">Recent Activity</h2>
                            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                {activityLog.map((log, index) => (
                                    <li key={index}>{log}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="bg-white/90 rounded-xl shadow p-6 max-w-lg">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">Security Settings</h2>
                        <p className="text-gray-600 text-sm">Password updates, 2FA setup, and login device tracking (coming soon).</p>
                    </div>
                )}

                {activeTab === 'billing' && (
                    <div className="bg-white/90 rounded-xl shadow p-6 max-w-lg">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">Billing Info</h2>
                        <p className="text-gray-600 text-sm">No billing info available. You’re currently on the free plan.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ProfilePage;
