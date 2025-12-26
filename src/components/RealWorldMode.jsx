import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToggleLeft, ToggleRight, Zap, AlertTriangle } from 'lucide-react';

export default function RealWorldMode() {
    const [isReal, setIsReal] = useState(false);

    return (
        <section className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                    <div className="bg-slate-900 rounded-xl border border-white/10 p-2 shadow-2xl relative group">
                        {/* Glow effect */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${isReal ? 'from-yellow-500 to-red-600' : 'from-cyan-500 to-blue-600'} rounded-xl blur opacity-30 transition-all duration-500`}></div>

                        <div className="relative bg-slate-950 rounded-lg p-6 h-[400px] relative overflow-hidden flex items-center justify-center border border-white/5">
                            {/* Scope Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(#334155_1px,transparent_1px),linear-gradient(90deg,#334155_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

                            {/* Signal Animation */}
                            <svg className="w-full h-48 relative z-10" viewBox="0 0 400 200">
                                <motion.path
                                    d={isReal
                                        ? "M0,150 L50,150 L70,50 L100,50 L120,150 L150,150 L170,50 L200,50 L220,150 L250,150 L270,50 L300,50 L320,150 L350,150 L370,50 L400,50"
                                        : "M0,150 L50,150 L50,50 L100,50 L100,150 L150,150 L150,50 L200,50 L200,150 L250,150 L250,50 L300,50 L300,150 L350,150 L350,50 L400,50"
                                    }
                                    fill="none"
                                    stroke={isReal ? "#fbbf24" : "#06b6d4"}
                                    strokeWidth="3"
                                    strokeLinejoin="round"
                                    animate={{
                                        d: isReal
                                            ? "M0,150 L50,150 L65,55 L100,55 L115,150 L150,150 L165,55 L200,55 L215,150 L250,150 L265,55 L300,55 L315,150 L350,150 L365,55 L400,55"
                                            : "M0,150 L50,150 L50,50 L100,50 L100,150 L150,150 L150,50 L200,50 L200,150 L250,150 L250,50 L300,50 L300,150 L350,150 L350,50 L400,50"
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                                {/* Glitch artifacts in Real mode */}
                                {isReal && (
                                    <motion.path
                                        d="M200,50 L205,80 L210,50"
                                        stroke="#ef4444"
                                        strokeWidth="2"
                                        fill="none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
                                    />
                                )}
                            </svg>

                            {/* Annotations */}
                            {isReal && (
                                <>
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-24 left-20 bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500/50 backdrop-blur-md">Propagation Delay: 5ns</motion.div>
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="absolute bottom-24 right-32 bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded border border-red-500/50 backdrop-blur-md flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Overshoot</motion.div>
                                </>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="mt-4 flex items-center justify-between px-4">
                            <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">Simulation Mode</span>
                            <button
                                onClick={() => setIsReal(!isReal)}
                                className={`flex items-center gap-3 px-5 py-2.5 rounded-lg transition-all border ${isReal ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50' : 'bg-slate-800 text-slate-400 border-white/5 hover:bg-slate-700'}`}
                            >
                                <span>{isReal ? "Real World Physics" : "Ideal Textbook Model"}</span>
                                {isReal ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium">
                        <Zap className="w-4 h-4" /> Feature Highlight
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">The "Real World" Check</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Textbooks lie to you. They show perfect square waves.
                        In the real world, signals have delays, glitches, and noise.
                        <br /><br />
                        Circuit Sage lets you toggle between <span className="text-cyan-400 font-bold">Ideal Mode</span> (for learning logic) and <span className="text-yellow-400 font-bold">Real World Mode</span> (for mastering engineering).
                    </p>
                    <ul className="space-y-4">
                        {['Visualize propagation delays', 'Debug setup/hold violations', 'Simulate capacitive loading', 'See race conditions happen live'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-white/5 text-sm">✓</div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
