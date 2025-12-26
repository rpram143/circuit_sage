import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Trophy } from 'lucide-react';

const missions = [
    {
        title: "Operation: K-Map Rescue",
        desc: "The logic gates are tangled! Use Karnaugh Maps to simplify 50 gates into just 4.",
        icon: <Shield className="w-8 h-8 text-cyan-400" />,
        xp: "500 XP",
        difficulty: "Medium"
    },
    {
        title: "Mission: Timing Critique",
        desc: "The clock is too fast! Find the critical path and fix the setup violation.",
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        xp: "800 XP",
        difficulty: "Hard"
    },
    {
        title: "Project: State Machine Fix",
        desc: "The vending machine is giving free sodas. Debug the FSM states.",
        icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
        xp: "300 XP",
        difficulty: "Easy"
    }
];

export default function RescueMissions() {
    return (
        <section className="py-24 bg-slate-900 border-t border-white/5 relative overflow-hidden">
            {/* Background particles */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Rescue Missions</h2>
                        <p className="text-slate-400 max-w-xl text-lg">
                            Don't just read. Solve real engineering disasters. Earn badges and prove your mastery.
                        </p>
                    </div>
                    <button className="px-6 py-3 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-950 transition-colors uppercase tracking-wider font-bold text-sm">
                        View All Missions
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {missions.map((mission, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-950 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-900/20 transition-all group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                                    {mission.icon}
                                </div>
                                <div className="px-2 py-1 bg-white/5 rounded text-xs text-slate-400 border border-white/5">
                                    {mission.difficulty}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{mission.title}</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                {mission.desc}
                            </p>
                            <div className="flex items-center gap-2 text-yellow-500 font-mono text-sm font-bold">
                                <Trophy className="w-4 h-4" />
                                {mission.xp}Reward
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
