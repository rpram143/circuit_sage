import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, CheckCircle2, X, HelpCircle, Trophy, BookOpen, Lightbulb, ChevronLeft, ChevronRight, Timer, AlertTriangle, Clock } from 'lucide-react';
import LabSimulator from './LabSimulator'; // Use original lab as base if possible, or copy logic
import { CHALLENGES } from '../data/challenges';
import AIAssistant from '../components/AIAssistant';

export default function LabTestRunner() {
    const { testId } = useParams();
    const navigate = useNavigate();
    const challenge = CHALLENGES.find(c => c.id === testId);

    const [showIntro, setShowIntro] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

    // NEW: Test Runner States
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [attempts, setAttempts] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [examResult, setExamResult] = useState(null);

    // Timer Logic
    useEffect(() => {
        if (showIntro || completed || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [showIntro, completed, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!challenge) return <div>Challenge not found.</div>;

    const handleCheckResult = (components, wires, simState) => {
        const criteria = challenge.successCriteria;
        let errors = [];

        // Pin Key Helper
        const pk = (compId, pinId) => `${compId}-${pinId}`;

        // Build Adjacency List for Net verification
        const adj = {};
        const addEdge = (p1, p2) => {
            if (!adj[p1]) adj[p1] = [];
            if (!adj[p2]) adj[p2] = [];
            adj[p1].push(p2);
            adj[p2].push(p1);
        };

        wires.forEach(w => addEdge(pk(w.startCompId, w.startPinLabel), pk(w.endCompId, w.endPinLabel)));

        // Handle Breadboard shorts
        components.forEach(comp => {
            if (comp.type === 'Breadboard') {
                for (let i = 1; i <= 30; i++) {
                    addEdge(pk(comp.id, `L${i}`), pk(comp.id, `R${i}`));
                }
            }
        });

        const areConnected = (p1, p2) => {
            if (p1 === p2) return true;
            const visited = new Set();
            const queue = [p1];
            while (queue.length > 0) {
                const curr = queue.shift();
                if (curr === p2) return true;
                if (!visited.has(curr)) {
                    visited.add(curr);
                    (adj[curr] || []).forEach(next => {
                        if (!visited.has(next)) queue.push(next);
                    });
                }
            }
            return false;
        };

        // 1. Component Presence
        const arduino = components.find(c => c.type === 'Arduino Uno');
        const led = components.find(c => c.type === 'LED Lamp');

        if (criteria.componentExists === 'Arduino Uno' && !arduino) {
            errors.push("You need an Arduino Uno on the board.");
        }
        if (challenge.id === 'arduino-blink' && !led) {
            errors.push("An LED Lamp is missing from your circuit.");
        }

        if (errors.length > 0) {
            setAttempts(prev => prev + 1);
            setFeedback({ type: 'error', msg: errors[0] });
            return;
        }

        // 2. Connection Verification (arduino-blink specific)
        if (challenge.id === 'arduino-blink') {
            const isAnodeConnected = areConnected(pk(arduino.id, '13'), pk(led.id, 'ANODE')) ||
                areConnected(pk(arduino.id, 'D13'), pk(led.id, 'ANODE'));

            const isGndConnected =
                areConnected(pk(arduino.id, 'GND1'), pk(led.id, 'CAT')) ||
                areConnected(pk(arduino.id, 'GND2'), pk(led.id, 'CAT')) ||
                areConnected(pk(arduino.id, 'GND3'), pk(led.id, 'CAT')) ||
                areConnected(pk(arduino.id, 'GND'), pk(led.id, 'CAT'));

            if (!isAnodeConnected) {
                errors.push("The LED Anode (A) must be connected to Arduino Pin 13.");
            } else if (!isGndConnected) {
                errors.push("The LED Cathode (K) must be connected to one of the Arduino GND pins.");
            }
        }

        if (errors.length > 0) {
            setAttempts(prev => prev + 1);
            setFeedback({ type: 'error', msg: errors[0] });
            return;
        }

        // 3. Code Verification
        if (criteria.codeMatches && arduino) {
            const code = (arduino.code || "").toLowerCase();
            const missing = criteria.codeMatches.find(term => !code.includes(term.toLowerCase()));
            if (missing) {
                errors.push(`Your code is missing the ${missing}() instruction.`);
            }
        }

        if (errors.length === 0) {
            // SUCCESS - Calculate Grade
            const baseXP = 2000;
            const timeBonus = Math.floor(timeLeft * 2);
            const penalty = (attempts * 100) + (hintsUsed * 250);
            const finalXP = Math.max(500, baseXP + timeBonus - penalty);

            let grade = 'S';
            if (attempts > 0 || hintsUsed > 0) grade = 'A';
            if (attempts > 2 || hintsUsed > 1) grade = 'B';
            if (attempts > 5) grade = 'C';

            setExamResult({
                xp: finalXP,
                grade: grade,
                time: 600 - timeLeft,
                attempts: attempts + 1
            });
            setCompleted(true);
            setFeedback({ type: 'success', msg: 'Practical Exam Passed!' });
        } else {
            setAttempts(prev => prev + 1);
            setFeedback({ type: 'error', msg: errors[0] });
        }
    };

    useEffect(() => {
        const handleReopen = () => setShowIntro(true);
        window.addEventListener('reopen-lab-instructions', handleReopen);
        return () => window.removeEventListener('reopen-lab-instructions', handleReopen);
    }, []);

    return (
        <div className="h-screen bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Immersive Lab Background */}
            <div className="flex-1 opacity-50 pointer-events-none blur-sm grayscale">
                {/* This just creates a background vibe until intro is cleared */}
            </div>

            {/* Intro Overlay */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.9 }}
                            animate={{ y: 0, scale: 1 }}
                            className="max-w-xl w-full glass-card border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 opacity-50"></div>

                            <div className="inline-flex p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6 border border-cyan-500/20">
                                <BookOpen className="w-8 h-8" />
                            </div>

                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">{challenge.title}</h2>
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{challenge.difficulty}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Practical Challenge</span>
                            </div>

                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                {challenge.desc}
                            </p>

                            <div className="space-y-3 mb-10 text-left bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Instructions</h4>
                                {challenge.instructions.map((step, i) => (
                                    <div key={i} className="flex gap-3 text-sm text-slate-300">
                                        <span className="text-cyan-500 font-black">{i + 1}.</span>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowIntro(false)}
                                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-white font-black tracking-widest uppercase hover:shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-95"
                            >
                                Enter Practical Lab
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEW: Floating Timer Header */}
            {!showIntro && !completed && (
                <div className="fixed top-24 right-4 z-[100] flex flex-col items-end gap-2">
                    <motion.div
                        className={`px-4 py-2 rounded-2xl border backdrop-blur-xl flex items-center gap-3 shadow-2xl ${timeLeft < 60 ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-slate-900/80 border-white/10 text-white'}`}
                        animate={timeLeft < 60 ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1 } } : {}}
                    >
                        <Timer className={`w-4 h-4 ${timeLeft < 60 ? 'animate-pulse' : ''}`} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 leading-none mb-1">Session Ends In</span>
                            <span className="text-xl font-black tabular-nums">{formatTime(timeLeft)}</span>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Error Feedback Toast */}
            <AnimatePresence>
                {feedback && feedback.type === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-24 left-1/2 z-[150] bg-slate-900 border border-red-500/30 px-6 py-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl shadow-[0_20px_40px_rgba(220,38,38,0.2)]"
                    >
                        <div className="p-3 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/40">
                            <X className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col mr-8">
                            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none mb-1">Update Your Circuit</span>
                            <span className="text-white text-sm font-bold tracking-tight">{feedback.msg}</span>
                        </div>
                        <button
                            onClick={() => setFeedback(null)}
                            className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showIntro && (
                <>
                    {/* The Actual Lab - We'll use a wrapper or the LabSimulator itself */}
                    <div className="flex-1 flex flex-col">
                        <LabSimulator testMode={true} onCheck={handleCheckResult} />
                    </div>

                    {/* Left Challenge Panel (Collapsible) */}
                    <motion.div
                        initial={false}
                        animate={{
                            width: isPanelCollapsed ? '48px' : '288px',
                            x: isPanelCollapsed ? -10 : 0
                        }}
                        className="absolute top-20 left-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-40 overflow-hidden"
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                {!isPanelCollapsed && (
                                    <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                                        <Lightbulb className="w-4 h-4 text-yellow-400" /> Objective
                                    </h3>
                                )}
                                <button
                                    onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all ml-auto"
                                    title={isPanelCollapsed ? "Expand Panel" : "Collapse Panel"}
                                >
                                    {isPanelCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                                </button>
                            </div>

                            {!isPanelCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <p className="text-xs text-slate-200 leading-relaxed mb-4">
                                        {challenge.desc}
                                    </p>

                                    {/* Mission Checklist */}
                                    <div className="space-y-2 mb-6 bg-slate-950/40 p-3 rounded-xl border border-white/5">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Mission Requirements</h4>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                            <span>Arduino Uno Assembly</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                            <span>LED Polarization (A/K)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                            <span>Logic Loop implementation</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (!showHint) setHintsUsed(prev => prev + 1);
                                            setShowHint(!showHint);
                                        }}
                                        className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        <HelpCircle className="w-4 h-4" /> Need a hint? {hintsUsed > 0 && <span className="text-red-400 font-bold">(-250 XP Hint Penalty)</span>}
                                    </button>
                                    {showHint && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="mt-3 p-3 bg-white/5 rounded-lg border border-white/5 text-[10px] text-slate-400 leading-relaxed italic"
                                        >
                                            {challenge.hint}
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {isPanelCollapsed && (
                                <div className="flex flex-col items-center gap-4 py-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500 opacity-50" />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {completed && examResult && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, y: 50 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="max-w-md w-full glass-card border-white/10 p-0 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
                                >
                                    {/* Header Section */}
                                    <div className="bg-gradient-to-b from-cyan-500/20 to-transparent p-12 pb-6">
                                        <div className="relative inline-block mb-6">
                                            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150" />
                                            <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-cyan-500/30 flex items-center justify-center relative z-10 mx-auto shadow-2xl">
                                                <Trophy className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-400 text-slate-950 font-black flex items-center justify-center border-4 border-slate-950 text-xl shadow-lg">
                                                {examResult.grade}
                                            </div>
                                        </div>
                                        <h2 className="text-4xl font-black text-white mb-2 italic tracking-tight">EXAM PASSED</h2>
                                        <p className="text-cyan-400/60 font-medium tracking-widest text-xs uppercase">Practical Certification Verified</p>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="px-10 py-8 grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Time Taken</span>
                                            </div>
                                            <p className="text-xl font-black text-white">{Math.floor(examResult.time / 60)}m {examResult.time % 60}s</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                                <AlertTriangle className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Attempts</span>
                                            </div>
                                            <p className="text-xl font-black text-white">{examResult.attempts}</p>
                                        </div>
                                        <div className="col-span-2 p-6 bg-cyan-500/10 rounded-3xl border border-cyan-500/20 text-center relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-400/20 transition-all duration-700" />
                                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] block mb-2">XP Awarded</span>
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-5xl font-black text-white tracking-tighter">+{examResult.xp}</span>
                                                <span className="text-cyan-400 font-black text-sm self-end mb-1">PTS</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footers */}
                                    <div className="px-10 pb-12 space-y-3">
                                        <button
                                            onClick={() => navigate('/courses')}
                                            className="w-full py-5 bg-white text-slate-950 font-black rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            Collect Rewards & Return
                                        </button>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="w-full py-4 text-slate-500 font-bold text-sm hover:text-white transition-colors"
                                        >
                                            Retake Exam for Better Grade
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            <AIAssistant challenge={challenge} isTestMode={true} />
        </div>
    );
}
