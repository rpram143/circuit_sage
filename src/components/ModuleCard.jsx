import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ModuleCard({ module, delay }) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay * 0.1 }}
            className={`relative group glass-card rounded-2xl p-7 overflow-hidden transition-all duration-500 ${module.locked
                    ? 'opacity-60 grayscale cursor-not-allowed'
                    : 'cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-cyan-500/50'
                }`}
            onClick={() => !module.locked && navigate(`/module/${module.id}`)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1.5 bg-slate-900 w-full">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${module.progress}%` }}
                    transition={{ duration: 1, delay: delay * 0.2 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                ></motion.div>
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-3.5 rounded-xl transition-colors duration-500 ${module.locked
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-white/5 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    }`}>
                    {module.icon}
                </div>
                {module.completed ? (
                    <div className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </div>
                ) : module.locked ? (
                    <div className="p-2 bg-slate-800 rounded-lg">
                        <Lock className="w-4 h-4 text-slate-600" />
                    </div>
                ) : (
                    <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {module.progress > 0 ? `${module.progress}% Progress` : 'Start Module'}
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 relative z-10">{module.title}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2 relative z-10 group-hover:text-slate-300 transition-colors">{module.desc}</p>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 relative z-10">
                <span className="flex items-center gap-1.5"><Play className="w-3 h-3" /> {module.lessons} Lessons</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-400">{module.xp} XP</span>
            </div>
        </motion.div>
    );
}
