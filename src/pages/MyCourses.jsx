import { useNavigate } from 'react-router-dom';
import ModuleCard from '../components/ModuleCard';
import { Bell, Flame } from 'lucide-react';
import { ALL_MODULES } from '../data/learningModules';

export default function MyCourses() {
    const navigate = useNavigate();

    return (
        <main className="p-6 md:p-12">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Courses</h1>
                    <p className="text-slate-400">Master the art of electronics.</p>
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

            {/* Modules Grid */}
            <section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ALL_MODULES.map((module, i) => (
                        <ModuleCard key={module.id} module={module} delay={i} />
                    ))}
                </div>
            </section>
        </main>
    );
}
