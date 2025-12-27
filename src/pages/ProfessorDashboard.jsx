import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, AlertCircle, Bell } from 'lucide-react';

export default function ProfessorDashboard() {
    const stats = [
        { title: "Total Students", value: "482", icon: <Users className="text-blue-400" />, trend: "+12%" },
        { title: "Active Modules", value: "8", icon: <BookOpen className="text-purple-400" />, trend: "Same" },
        { title: "Average Score", value: "76%", icon: <TrendingUp className="text-green-400" />, trend: "+4%" },
        { title: "At Risk", value: "24", icon: <AlertCircle className="text-red-400" />, trend: "-2%" },
    ];

    return (
        <main className="p-6 md:p-12">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Professor Dashboard</h1>
                    <p className="text-slate-400">Overview of your classes and student performance.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-700 cursor-pointer">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-slate-950 font-bold border-2 border-slate-900">
                        P
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900 border border-white/5 p-6 rounded-xl relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-950 rounded-lg border border-white/5">
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : stat.trend === 'Same' ? 'bg-slate-500/10 text-slate-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-slate-400 text-sm">{stat.title}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity / At Risk List - Placeholder for now */}
            <section className="grid lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-white/5 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Class Performance</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
                        Chart Placeholder
                    </div>
                </div>
                <div className="bg-slate-900 border border-white/5 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Students Needing Attention</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-white/5 hover:border-red-500/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800"></div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Student Name {i}</p>
                                        <p className="text-xs text-red-400">Low engagement this week</p>
                                    </div>
                                </div>
                                <button className="text-xs bg-slate-800 px-3 py-1.5 rounded text-slate-300 hover:text-white">Profile</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
