import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Cpu, Zap, Code, BookOpen, Play, Copy, Check, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CircuitBuilderPanel({ isOpen, onClose, circuitData, videoTitle }) {
    const [copiedCode, setCopiedCode] = useState(false);
    const [showQA, setShowQA] = useState(false);
    const [question, setQuestion] = useState('');
    const [qaHistory, setQaHistory] = useState([]);
    const navigate = useNavigate();

    const copyCode = () => {
        navigator.clipboard.writeText(circuitData.code.content);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const handleOpenInLab = () => {
        // Store circuit data in localStorage (without the function)
        const dataToStore = {
            projectName: circuitData.projectName,
            components: circuitData.components,
            wiring: circuitData.wiring,
            code: circuitData.code,
            theory: circuitData.theory,
            fromLearnTube: true,
            videoTitle
        };

        localStorage.setItem('circuitSageLabData', JSON.stringify(dataToStore));

        // Navigate to lab simulator
        navigate('/lab');
        onClose();
    };

    const handleAskQuestion = () => {
        if (!question.trim()) return;

        const response = circuitData.qaEngine(question);
        setQaHistory([...qaHistory, { question, answer: response.answer, concept: response.relatedConcept }]);
        setQuestion('');
    };

    if (!isOpen || !circuitData) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-cyan-600 to-blue-600 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles className="w-6 h-6 text-white" />
                                    <h2 className="text-2xl font-bold text-white">Circuit Analysis Complete</h2>
                                </div>
                                <p className="text-blue-100 text-sm">{circuitData.projectName}</p>
                                <p className="text-blue-200 text-xs mt-1">Confidence: {circuitData.confidence.toFixed(0)}%</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Components List */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Cpu className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-xl font-bold text-white">Required Components</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                {circuitData.components.map((component, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-800 border border-white/5 rounded-lg p-4 flex items-start gap-3"
                                    >
                                        <div className="w-6 h-6 bg-cyan-500/10 rounded flex items-center justify-center flex-shrink-0">
                                            <span className="text-cyan-400 text-xs font-bold">{component.quantity}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold text-sm">{component.name}</h4>
                                            <p className="text-slate-400 text-xs mt-1">{component.specs}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Wiring Instructions */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                <h3 className="text-xl font-bold text-white">Wiring Instructions</h3>
                            </div>
                            <div className="space-y-3">
                                {circuitData.wiring.map((wire, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-800 border border-white/5 rounded-lg p-4 flex items-start gap-4"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">{wire.step}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm">{wire.instruction}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className={`w-3 h-3 rounded-full bg-${wire.color}-500`}></div>
                                                <span className="text-slate-400 text-xs capitalize">{wire.color} wire</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Code */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-green-400" />
                                    <h3 className="text-xl font-bold text-white">Microcontroller Code</h3>
                                </div>
                                <button
                                    onClick={copyCode}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm text-white transition-colors"
                                >
                                    {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    {copiedCode ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                            <div className="bg-slate-950 border border-white/10 rounded-lg p-4 overflow-x-auto">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs font-medium border border-cyan-500/20">
                                        {circuitData.code.platform}
                                    </span>
                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium border border-blue-500/20">
                                        {circuitData.code.language}
                                    </span>
                                </div>
                                <pre className="text-green-400 text-sm font-mono leading-relaxed">
                                    {circuitData.code.content}
                                </pre>
                            </div>
                        </section>

                        {/* Theory & Concept */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="w-5 h-5 text-purple-400" />
                                <h3 className="text-xl font-bold text-white">Theory & Concept</h3>
                            </div>
                            <div className="bg-slate-800 border border-white/5 rounded-lg p-5 space-y-4">
                                <div>
                                    <h4 className="text-cyan-400 font-semibold mb-2">{circuitData.theory.concept}</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">{circuitData.theory.explanation}</p>
                                </div>

                                <div>
                                    <h5 className="text-white font-semibold text-sm mb-2">Key Points:</h5>
                                    <ul className="space-y-2">
                                        {circuitData.theory.keyPoints.map((point, index) => (
                                            <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                                                <span className="text-cyan-400 mt-1">•</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="text-red-400 font-semibold text-sm mb-2">Common Mistakes:</h5>
                                    <ul className="space-y-2">
                                        {circuitData.theory.commonMistakes.map((mistake, index) => (
                                            <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                                                <span className="text-red-400 mt-1">⚠</span>
                                                <span>{mistake}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Q&A Section */}
                        {showQA && (
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="w-5 h-5 text-orange-400" />
                                    <h3 className="text-xl font-bold text-white">Ask Questions</h3>
                                </div>
                                <div className="bg-slate-800 border border-white/5 rounded-lg p-4 space-y-4">
                                    {qaHistory.map((qa, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                                <p className="text-blue-300 text-sm font-medium">Q: {qa.question}</p>
                                            </div>
                                            <div className="bg-slate-900 border border-white/5 rounded-lg p-3">
                                                <p className="text-slate-300 text-sm whitespace-pre-line">{qa.answer}</p>
                                                <p className="text-cyan-400 text-xs mt-2">💡 {qa.concept}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                                            placeholder="Ask about the circuit..."
                                            className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                        />
                                        <button
                                            onClick={handleAskQuestion}
                                            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Ask
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-slate-800/50 border-t border-white/10 flex items-center justify-between">
                        <button
                            onClick={() => setShowQA(!showQA)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
                        >
                            <MessageSquare className="w-4 h-4" />
                            {showQA ? 'Hide Q&A' : 'Ask Questions'}
                        </button>

                        <button
                            onClick={handleOpenInLab}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20"
                        >
                            <Play className="w-5 h-5" />
                            Open in Lab Simulator
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
