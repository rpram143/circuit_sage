import { motion } from 'framer-motion';
import { Play, ArrowRight, TrendingUp, Zap, Clock } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">

            {/* Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

                {/* Text Content */}
                <div className="space-y-8 text-center lg:text-left pt-10 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/30 text-cyan-400 text-sm font-medium backdrop-blur-md"
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
                        className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                    >
                        Master Digital Logic by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">Building It.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Forget confusing textbooks. Circuit Sage turns digital philosophy into an interactive playground. Visualize voltage, debug timing, and design CPUs in your browser.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <Play className="w-5 h-5 fill-current relative z-10" />
                            <span className="relative z-10">Start Learning Free</span>
                        </button>
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all border border-slate-800 flex items-center justify-center gap-2 group">
                            For Teachers
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="pt-6 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm"
                    >
                        <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" /> Real-time Simulation</div>
                        <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500" /> AI Feedback</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Zero Setup</div>
                    </motion.div>
                </div>

                {/* Hero Visual - Animated Circuit Block */}
                <div className="relative h-[500px] hidden lg:block perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20, rotateY: -20, scale: 0.9 }}
                        animate={{ opacity: 1, rotateX: 10, rotateY: -10, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full h-full bg-slate-900/80 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl p-6 relative overflow-hidden group"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Fake UI Header */}
                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 text-red-500 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 text-green-500 border border-green-500/50"></div>
                            </div>
                            <div className="flex-1 text-center text-xs text-slate-500 font-mono">My_First_ALU.sage</div>
                        </div>

                        {/* Circuit Visualization */}
                        <div className="relative h-[350px] w-full rounded-lg bg-slate-950/50 border border-white/5 grid grid-cols-6 grid-rows-4 gap-4 p-4">
                            {/* Logic Gates */}
                            <motion.div
                                className="col-span-2 row-span-2 bg-slate-800 rounded-lg border border-cyan-500/30 flex items-center justify-center relative"
                                whileHover={{ scale: 1.05, borderColor: '#06b6d4' }}
                            >
                                <span className="text-cyan-400 font-mono font-bold">NAND</span>
                                <div className="absolute -right-2 top-1/2 w-4 h-4 bg-cyan-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                            </motion.div>

                            <motion.div
                                className="col-span-2 row-span-2 col-start-3 bg-slate-800 rounded-lg border border-purple-500/30 flex items-center justify-center relative"
                                whileHover={{ scale: 1.05, borderColor: '#8b5cf6' }}
                            >
                                <span className="text-purple-400 font-mono font-bold">D-FLIPFLOP</span>
                            </motion.div>

                            {/* Animated Signals */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <motion.path
                                    d="M 120 100 L 220 100"
                                    fill="transparent"
                                    stroke="#06b6d4"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.path
                                    d="M 120 140 L 220 140"
                                    fill="transparent"
                                    stroke="#06b6d4"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                />
                            </svg>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-green-500/30 text-green-400 text-xs font-mono shadow-lg"
                            >
                                ✓ Timing Met: 4.2ns
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
