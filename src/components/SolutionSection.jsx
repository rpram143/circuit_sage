import { motion } from 'framer-motion';
import { Gamepad2, Play, Bot, ArrowRight } from 'lucide-react';

const solutions = [
    {
        icon: <Play className="w-8 h-8 text-cyan-400" />,
        title: "Cinematic Lessons",
        desc: "High-quality video modules that visualize electrons, signals, and logic gates in motion.",
        color: "from-cyan-500 to-blue-600"
    },
    {
        icon: <Gamepad2 className="w-8 h-8 text-purple-400" />,
        title: "Gamified Challenges",
        desc: "Earn XP by fixing broken circuits, optimizing logic, and racing against the clock.",
        color: "from-purple-500 to-pink-600"
    },
    {
        icon: <Bot className="w-8 h-8 text-emerald-400" />,
        title: "AI Circuit Assistant",
        desc: "Stuck on a design? Our AI analyzes your circuit and gives conversational hints, not just answers.",
        color: "from-emerald-500 to-teal-600"
    }
];

export default function SolutionSection() {
    return (
        <section id="solution" className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Circuit Sage <span className="text-cyan-400">Solution</span></h2>
                    <p className="text-slate-400 text-lg">Everything you need to go from beginner to pro.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative bg-slate-900 rounded-2xl p-1 overflow-hidden hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative bg-slate-950 rounded-xl p-8 h-full flex flex-col justify-between z-10">
                                <div>
                                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-6 ring-1 ring-white/10 group-hover:ring-white/30 transition-all">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">{item.desc}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                    Try Demo <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
