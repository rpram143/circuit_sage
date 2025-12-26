import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ModuleCard({ module, delay }) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1 }}
            className={`relative group bg-slate-900 border border-white/5 rounded-xl p-6 overflow-hidden hover:border-cyan-500/50 transition-all ${module.locked ? 'opacity-70 grayscale' : 'cursor-pointer hover:shadow-lg hover:shadow-cyan-900/10'}`}
            onClick={() => !module.locked && navigate(`/module/${module.id}`)}
        >
            {/* Background Progress */}
            <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
                <div className="h-full bg-cyan-500" style={{ width: `${module.progress}%` }}></div>
            </div>

            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${module.locked ? 'bg-slate-800 text-slate-500' : 'bg-cyan-500/10 text-cyan-400'}`}>
                    {module.icon}
                </div>
                {module.completed ? (
                    <div className="text-green-500 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" /> Completed
                    </div>
                ) : module.locked ? (
                    <Lock className="w-5 h-5 text-slate-600" />
                ) : (
                    <div className="text-cyan-500 text-xs font-bold uppercase tracking-wider bg-cyan-500/10 px-2 py-1 rounded">
                        {module.progress > 0 ? 'In Progress' : 'Start'}
                    </div>
                )}
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{module.title}</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">{module.desc}</p>

            <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{module.lessons} Lessons</span>
                <span>{module.xp} XP</span>
            </div>
        </motion.div>
    );
}
