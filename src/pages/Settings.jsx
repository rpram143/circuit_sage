import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import ProfessorSidebar from '../components/ProfessorSidebar';
import AIAssistant from '../components/AIAssistant';
import {
    User, Bell, Moon, Sun, Shield, Key, LogOut,
    Smartphone, Mail, Globe, Palette
} from 'lucide-react';

export default function Settings({ role = 'student' }) {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        marketing: false
    });
    const [theme, setTheme] = useState('dark');

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            {role === 'professor' ? <ProfessorSidebar /> : <Sidebar />}

            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-slate-400">Manage your account and preferences.</p>
                </header>

                <div className="max-w-4xl space-y-8">

                    {/* Profile Section */}
                    <section className="bg-slate-900 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <User className="text-cyan-400" /> Profile
                        </h2>

                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-3xl font-bold text-slate-950 border-4 border-slate-800">
                                    R
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-slate-700 rounded-full border border-white/10 text-white hover:bg-slate-600 transition-colors">
                                    <Palette className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                        <input type="text" defaultValue="Ram" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                        <input type="email" defaultValue="ram@example.com" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Bio</label>
                                        <textarea defaultValue="Electronics enthusiast learning digital logic." rows="3" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Appearance */}
                    <section className="bg-slate-900 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Palette className="text-purple-400" /> Appearance
                        </h2>

                        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-800 rounded-lg">
                                    {theme === 'dark' ? <Moon className="w-6 h-6 text-purple-400" /> : <Sun className="w-6 h-6 text-yellow-400" />}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Theme Mode</h3>
                                    <p className="text-sm text-slate-400">Select your preferred interface theme</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'light' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-slate-800 text-white border border-white/10' : 'text-slate-400 hover:text-white'}`}
                                >
                                    Dark
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Notifications */}
                    <section className="bg-slate-900 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Bell className="text-orange-400" /> Notifications
                        </h2>

                        <div className="space-y-4">
                            {[
                                { id: 'email', icon: <Mail className="w-5 h-5" />, title: 'Email Notifications', desc: 'Receive daily summaries and course updates' },
                                { id: 'push', icon: <Smartphone className="w-5 h-5" />, title: 'Push Notifications', desc: 'Get notified about streak reminders' },
                                { id: 'marketing', icon: <Globe className="w-5 h-5" />, title: 'Product Updates', desc: 'News about new features and modules' }
                            ].map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium text-sm">{item.title}</h3>
                                            <p className="text-xs text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleNotification(item.id)}
                                        className={`w-12 h-6 rounded-full relative transition-colors ${notifications[item.id] ? 'bg-green-500' : 'bg-slate-700'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications[item.id] ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Security */}
                    <section className="bg-slate-900 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Shield className="text-red-400" /> Security
                        </h2>

                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5 hover:bg-slate-800 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white">
                                        <Key className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-white font-medium text-sm">Change Password</h3>
                                        <p className="text-xs text-slate-400">Update your account password</p>
                                    </div>
                                </div>
                                <span className="text-slate-500 text-sm">Update</span>
                            </button>

                            <button className="w-full flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-red-400">
                                        <LogOut className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-white group-hover:text-red-400 font-medium text-sm">Delete Account</h3>
                                        <p className="text-xs text-slate-400 group-hover:text-red-400/70">Permanently remove all your data</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </section>

                </div>
            </main>
            <AIAssistant />
        </div>
    );
}
