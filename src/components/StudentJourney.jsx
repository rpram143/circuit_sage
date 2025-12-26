import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';

const phases = [
    {
        title: "Phase 1: The Binary Basics",
        problem: "Confused by 1s and 0s?",
        solution: "Interactive Boolean Visualizers",
        color: "cyan"
    },
    {
        title: "Phase 2: Gate-Level Design",
        problem: "Struggling to combine NANDs?",
        solution: "Drag & Drop Logic Sandbox",
        color: "blue"
    },
    {
        title: "Phase 3: Combinational Logic",
        problem: "K-Maps giving you a headache?",
        solution: "AI Pattern Recognition Tutor",
        color: "purple"
    },
    {
        title: "Phase 4: Sequential Systems",
        problem: "Flip-flops missing the clock?",
        solution: "Step-by-Step Clock Simulator",
        color: "pink"
    }
];

export default function StudentJourney() {
    const [activePhase, setActivePhase] = useState(0);

    return (
        <section id="journey" className="py-24 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Timeline/Accordion */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">From Confusion to <span className="text-cyan-400">Mastery</span></h2>
                    <div className="space-y-4">
                        {phases.map((phase, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-2xl border transition-all cursor-pointer ${activePhase === index ? 'bg-slate-800 border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'bg-slate-950/50 border-white/5 hover:border-white/10'}`}
                                onClick={() => setActivePhase(index)}
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activePhase === index ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                        {index + 1}
                                    </div>
                                    <h3 className={`text-xl font-bold transition-colors ${activePhase === index ? 'text-white' : 'text-slate-400'}`}>{phase.title}</h3>
                                </div>
                                <motion.div
                                    initial={false}
                                    animate={{ height: activePhase === index ? 'auto' : 0, opacity: activePhase === index ? 1 : 0 }}
                                    className="pl-12 overflow-hidden"
                                >
                                    <div className="pt-2 space-y-2">
                                        <p className="text-red-400 text-sm flex items-center gap-2"><Lock className="w-3 h-3" /> Problem: {phase.problem}</p>
                                        <p className="text-cyan-400 text-sm font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Fix: {phase.solution}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Dynamic Visualizer */}
                <div className="relative h-[500px] bg-slate-950 rounded-2xl border border-white/10 p-8 flex items-center justify-center overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    <motion.div
                        key={activePhase}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 w-full max-w-sm aspect-square bg-slate-900 rounded-xl border border-white/10 p-8 shadow-2xl flex flex-col items-center justify-center text-center"
                    >
                        {/* Dynamic Icon/Color */}
                        <div className={`w-24 h-24 rounded-full bg-${phases[activePhase].color}-500/20 flex items-center justify-center mb-6`}>
                            <div className={`w-12 h-12 rounded-full bg-${phases[activePhase].color}-500 animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.3)]`}></div>
                        </div>

                        <h4 className="text-2xl font-bold text-white mb-2">{phases[activePhase].solution}</h4>
                        <p className="text-slate-400 text-sm mb-8">Current Progress: {25 * (activePhase + 1)}%</p>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${25 * (activePhase + 1)}%` }}
                                transition={{ duration: 0.8 }}
                                className={`h-full bg-${phases[activePhase].color}-500`}
                            ></motion.div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
