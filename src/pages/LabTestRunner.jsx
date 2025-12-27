import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, CheckCircle2, X, HelpCircle, Trophy, BookOpen, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import LabSimulator from './LabSimulator'; // Use original lab as base if possible, or copy logic
import { CHALLENGES } from '../data/challenges';
import AIAssistant from '../components/AIAssistant';

// Note: In a real app, we'd refactor LabSimulator to be more modular. 
// For this task, I'll create a specialized version that wraps the Lab logic.

export default function LabTestRunner() {
    const { testId } = useParams();
    const navigate = useNavigate();
    const challenge = CHALLENGES.find(c => c.id === testId);

    const [showIntro, setShowIntro] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

    useEffect(() => {
        const handleReopen = () => setShowIntro(true);
        window.addEventListener('reopen-lab-instructions', handleReopen);
        return () => window.removeEventListener('reopen-lab-instructions', handleReopen);
    }, []);

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

        if (errors.length > 0) { setFeedback({ type: 'error', msg: errors[0] }); return; }

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

        if (errors.length > 0) { setFeedback({ type: 'error', msg: errors[0] }); return; }

        // 3. Code Verification
        if (criteria.codeMatches && arduino) {
            const code = (arduino.code || "").toLowerCase();
            const missing = criteria.codeMatches.find(term => !code.includes(term.toLowerCase()));
            if (missing) {
                errors.push(`Your code is missing the ${missing}() instruction.`);
            }
        }

        if (errors.length === 0) {
            setCompleted(true);
            setFeedback({ type: 'success', msg: 'Perfect! Circuit functional and code verified.' });
        } else {
            setFeedback({ type: 'error', msg: errors[0] });
        }
    };

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
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        <HelpCircle className="w-4 h-4" /> Need a hint?
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

                    {/* Completion Modal */}
                    <AnimatePresence>
                        {completed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fixed inset-0 z-[200] bg-cyan-950/20 backdrop-blur-md flex items-center justify-center p-6"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, rotate: -5 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="max-w-md w-full glass-card border-cyan-500/30 p-10 rounded-3xl shadow-[0_30px_60px_rgba(6,182,212,0.3)] text-center relative overflow-hidden"
                                >
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full"></div>
                                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                                    <h2 className="text-3xl font-black text-white mb-2">Success!</h2>
                                    <p className="text-cyan-200/80 text-sm mb-8">
                                        Problem solved. You've demonstrated mastery of Arduino GPIO and Timing.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => navigate('/courses')}
                                            className="w-full py-4 bg-cyan-500 text-slate-950 font-black rounded-2xl hover:bg-white transition-colors"
                                        >
                                            Return to Courses
                                        </button>
                                        <span className="text-[10px] font-bold text-cyan-500 tracking-widest uppercase">+2000 XP EARNED</span>
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
