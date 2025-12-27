import { motion } from 'framer-motion';
import { Play, ArrowRight, TrendingUp, Zap, Clock } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">

            {/* Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

                {/* Text Content */}
                <div className="space-y-8 text-center lg:text-left pt-10 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-400 text-sm font-medium backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        Reimagining Electronics Education
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
                    >
                        Master Digital Logic by <br />
                        <span className="text-gradient animate-gradient-x">Building It.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
                    >
                        Forget confusing textbooks. Circuit Sage turns digital philosophy into an interactive playground. Visualize voltage, debug timing, and design CPUs in your browser.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <Play className="w-5 h-5 fill-current relative z-10" />
                            <span className="relative z-10">Start Learning Free</span>
                        </button>
                        <button className="px-8 py-4 bg-white/5 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2 group backdrop-blur-sm">
                            For Teachers
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 text-sm font-medium"
                    >
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5"><Zap className="w-4 h-4 text-yellow-500" /> Real-time Simulation</div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5"><TrendingUp className="w-4 h-4 text-green-500" /> AI Feedback</div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5"><Clock className="w-4 h-4 text-blue-500" /> Zero Setup</div>
                    </motion.div>
                </div>

                {/* Hero Visual - Animated Circuit Block */}
                <div className="relative h-[550px] hidden lg:block perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20, rotateY: -20, scale: 0.9 }}
                        animate={{ opacity: 1, rotateX: 12, rotateY: -12, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-full h-full glass-card-premium rounded-3xl p-8 relative overflow-hidden group animate-float"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Interactive Sparkle Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                        {/* Fake UI Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3.5 h-3.5 rounded-full bg-red-500/40 border border-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/40 border border-yellow-500/60 shadow-[0_0_8px_rgba(234,179,8,0.4)]"></div>
                                <div className="w-3.5 h-3.5 rounded-full bg-green-500/40 border border-green-500/60 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                            </div>
                            <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">System: Online</div>
                        </div>

                        {/* Circuit Visualization */}
                        <div className="relative h-[380px] w-full rounded-2xl bg-slate-950/80 border border-white/5 grid grid-cols-6 grid-rows-4 gap-6 p-6 overflow-hidden">
                            {/* Glow behind gates */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-50" />

                            {/* Logic Gates */}
                            <motion.div
                                className="col-span-2 row-span-2 bg-slate-900/80 rounded-xl border border-cyan-500/30 flex flex-col items-center justify-center relative group/gate"
                                whileHover={{ scale: 1.05, borderColor: '#06b6d4', backgroundColor: 'rgba(15, 23, 42, 1)' }}
                            >
                                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover/gate:opacity-100 transition-opacity rounded-xl"></div>
                                <span className="text-cyan-400 font-mono font-bold text-lg relative z-10">NAND</span>
                                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full blur-sm opacity-50 animate-ping"></div>
                            </motion.div>

                            <motion.div
                                className="col-span-2 row-span-2 col-start-4 bg-slate-900/80 rounded-xl border border-purple-500/30 flex flex-col items-center justify-center relative group/gate"
                                whileHover={{ scale: 1.05, borderColor: '#8b5cf6', backgroundColor: 'rgba(15, 23, 42, 1)' }}
                            >
                                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover/gate:opacity-100 transition-opacity rounded-xl"></div>
                                <span className="text-purple-400 font-mono font-bold text-lg relative z-10">XOR</span>
                            </motion.div>

                            {/* Animated Signals */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <motion.path
                                    d="M160,120 L320,120"
                                    fill="transparent"
                                    stroke="#06b6d4"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.path
                                    d="M160,160 L320,240"
                                    fill="transparent"
                                    stroke="#8b5cf6"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                                />
                            </svg>

                            {/* Status Indicators */}
                            <div className="absolute bottom-6 left-6 flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] text-green-500 font-mono">STABLE</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
                                    <span className="text-[10px] text-cyan-500 font-mono">4.2 GHz</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
