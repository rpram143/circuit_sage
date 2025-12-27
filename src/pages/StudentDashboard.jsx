import { useNavigate } from 'react-router-dom';
import { Bell, Flame, Zap, Binary, CircuitBoard, Play } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';

const modules = [
    {
        id: 1,
        title: "Binary & Boolean Algebra",
        desc: "The language of computers. Learn 1s, 0s, and the math behind the magic.",
        progress: 100,
        locked: false,
        completed: true,
        lessons: 8,
        xp: 500,
        icon: <Binary className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Logic Gates Mastery",
        desc: "AND, OR, NOT, and why NAND is the universal god particle of electronics.",
        progress: 45,
        locked: false,
        completed: false,
        lessons: 12,
        xp: 800,
        icon: <CircuitBoard className="w-6 h-6" />
    }
];

import { auth } from '../utils/auth';

export default function StudentDashboard() {
    const navigate = useNavigate();
    const user = auth.getCurrentUser() || { name: 'Student' };
    const firstInitial = user.name.charAt(0).toUpperCase();

    return (
        <main className="p-6 md:p-12">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome back, {user.name} 👋</h1>
                    <p className="text-slate-400">Ready to simulate some electrons?</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-bold border border-orange-500/20">
                        <Flame className="w-4 h-4 fill-current" /> 12 Day Streak
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-700 cursor-pointer">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold border-2 border-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                        {firstInitial}
                    </div>
                </div>
            </header>

            {/* Continue Learning Banner */}
            <section className="mb-12">
                <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-10 overflow-hidden border border-white/10 shadow-2xl group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-700" />
                    <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-between">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-bold uppercase tracking-widest">
                                <Zap className="w-3.5 h-3.5 fill-current" /> Continue Learning
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Logic Gates Mastery</h2>
                            <p className="text-indigo-100/70 max-w-lg text-lg leading-relaxed">
                                You left off at <strong className="text-white">Universal Gates (NAND/NOR)</strong>. <br />
                                Complete this lesson to earn the <span className="text-cyan-400 font-bold">Gatekeeper</span> badge.
                            </p>
                            <button
                                onClick={() => navigate('/module/2')}
                                className="group px-8 py-4 bg-white text-indigo-950 rounded-xl font-black text-lg hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all flex items-center gap-2"
                            >
                                Resume Lesson
                                <Play className="w-4 h-4 fill-current group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Mini Progress Visual */}
                        <div className="w-full md:w-72 glass-card rounded-2xl p-6 border-white/10 shadow-2xl">
                            <div className="flex justify-between text-sm text-white mb-3 font-bold uppercase tracking-wider">
                                <span className="text-slate-400">Course Progress</span>
                                <span className="text-cyan-400">45%</span>
                            </div>
                            <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5 p-0.5">
                                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[45%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                            </div>
                            <div className="mt-4 flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                        {i}
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                                    +5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Grid */}
            <section>
                <h3 className="text-xl font-bold text-white mb-6">Learning Modules</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {modules.map((module, i) => (
                        <ModuleCard key={module.id} module={module} delay={i} />
                    ))}
                </div>
            </section>
        </main>
    );
}
