import { motion } from 'framer-motion';
import { Users, BarChart3, GraduationCap, Clock } from 'lucide-react';

const features = [
    {
        icon: <Users className="w-6 h-6 text-purple-400" />,
        title: "Live Class Dashboard",
        desc: "See who's stuck in real-time."
    },
    {
        icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
        title: "Auto-Grading Analytics",
        desc: "Instant feedback on circuit designs."
    },
    {
        icon: <Clock className="w-6 h-6 text-blue-400" />,
        title: "Time-Saving Labs",
        desc: "Pre-built labs for standard curriculums."
    }
];

export default function ProfessorSection() {
    return (
        <section id="profs" className="py-24 bg-slate-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                                <GraduationCap className="w-4 h-4" /> For Professors
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white">Teach Smarter. <br />Grade Faster.</h2>
                            <p className="text-slate-400 text-lg">
                                Stop grading messy breadboard wires. Get deep insights into student performance and identify struggle points instantly.
                            </p>

                            <div className="grid gap-4">
                                {features.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:bg-slate-900 transition-colors">
                                        <div className="p-2 bg-slate-800 rounded-lg">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-slate-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="px-8 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-colors">
                                Request Instructor Access
                            </button>
                        </div>

                        <div className="relative">
                            {/* Dashboard Mockup */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-slate-950 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-slate-500">InstructorDashboard.exe</div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Fake Chart */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-slate-400">Class Performance (Logic Gates Lab)</h4>
                                        <div className="flex items-end gap-2 h-32 pt-4">
                                            {[40, 65, 30, 85, 55, 90, 75].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                                    className="flex-1 bg-cyan-500/20 rounded-t hover:bg-cyan-500/40 transition-colors relative group"
                                                >
                                                    <div className="absolute bottom-0 w-full bg-cyan-500 opacity-50" style={{ height: '20%' }}></div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Student List */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-white/5">
                                            <span>Student</span>
                                            <span>Status</span>
                                            <span>Score</span>
                                        </div>
                                        {[
                                            { name: "John D.", status: "Stuck on Q3", score: 45, color: "red" },
                                            { name: "Sarah M.", status: "Completed", score: 98, color: "green" },
                                            { name: "Alex K.", status: "Working", score: 72, color: "yellow" },
                                        ].map((s, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <span className="text-slate-300">{s.name}</span>
                                                <span className={`text-${s.color}-400 bg-${s.color}-500/10 px-2 py-0.5 rounded text-xs`}>{s.status}</span>
                                                <span className="text-slate-400 font-mono">{s.score}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Access Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="absolute -right-6 -bottom-6 bg-slate-800 p-4 rounded-lg border border-white/10 shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">24</div>
                                        <div className="text-xs text-slate-400">Active Students</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
