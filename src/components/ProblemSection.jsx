import { motion } from 'framer-motion';
import { AlertTriangle, WifiOff, Activity, BookOpen, Clock, Zap } from 'lucide-react';

const problems = [
    {
        icon: <Zap className="w-8 h-8 text-cyan-400" />,
        title: "Invisible Logic",
        desc: "You can't see voltages inside wires. Without visualization, digital logic feels like magic instead of science."
    },
    {
        icon: <BookOpen className="w-8 h-8 text-purple-400" />,
        title: "Dry Theory",
        desc: "Memorizing truth tables doesn't help when you need to design a complex state machine."
    },
    {
        icon: <Clock className="w-8 h-8 text-red-400" />,
        title: "Timing Chaos",
        desc: "Setup & hold violations are impossible to debug on paper. You need to see the clock edge."
    },
    {
        icon: <Activity className="w-8 h-8 text-blue-400" />,
        title: "Tool Overload",
        desc: "Professional tools like LTSpice are too complex. Breadboards are messy. You need a middle ground."
    }
];

export default function ProblemSection() {
    return (
        <section id="problem" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Why Digital Electronics Feels <span className="text-red-500">Hard</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Most students drop out of digital design because static textbooks can't capture dynamic signals.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-900 hover:border-white/10 transition-all group hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/10"
                        >
                            <div className="mb-6 p-4 bg-slate-950 rounded-xl inline-flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
