import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Cpu, LayoutDashboard, Trophy, BookOpen, Settings,
    LogOut, Bell, Flame, Zap, Binary, CircuitBoard, Clock
} from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import AIAssistant from '../components/AIAssistant';
import Sidebar from '../components/Sidebar';

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

export default function StudentDashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">

                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome back, Ram 👋</h1>
                        <p className="text-slate-400">Ready to simulate some electrons?</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-bold border border-orange-500/20">
                            <Flame className="w-4 h-4 fill-current" /> 12 Day Streak
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-700 cursor-pointer">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold border-2 border-slate-900">
                            R
                        </div>
                    </div>
                </header>

                {/* Continue Learning Banner */}
                <section className="mb-12">
                    <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 overflow-hidden border border-white/10">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-3">
                                    <Zap className="w-4 h-4" /> Continue Learning
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Logic Gates Mastery</h2>
                                <p className="text-indigo-200 max-w-lg mb-6">You left off at <strong className="text-white">Universal Gates (NAND/NOR)</strong>. Complete this lesson to earn the "Gatekeeper" badge.</p>
                                <button
                                    onClick={() => navigate('/module/2')}
                                    className="px-6 py-3 bg-white text-indigo-950 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
                                >
                                    Resume Lesson
                                </button>
                            </div>

                            {/* Mini Progress Visual */}
                            <div className="bg-slate-900/30 backdrop-blur p-4 rounded-xl border border-white/10 w-full md:w-64">
                                <div className="flex justify-between text-sm text-white mb-2 font-medium">
                                    <span>Progress</span>
                                    <span>45%</span>
                                </div>
                                <div className="h-2 bg-slate-900/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-400 w-[45%]"></div>
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
            <AIAssistant />
        </div>
    );
}
