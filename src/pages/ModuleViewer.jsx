import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Layout, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ModuleViewer() {
    const { moduleId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Simplified Navbar */}
            <nav className="border-b border-white/5 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-white/10"></div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-200">Module {moduleId}: Logic Gates</h1>
                        <p className="text-xs text-slate-500">Lesson 1 of 5</p>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
                {/* Main Content (Video/Sim) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-video bg-black rounded-xl border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20"></div>

                        {/* Play Button */}
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Understanding the NAND Gate</h2>
                        <p className="text-slate-400 leading-relaxed">
                            In digital electronics, a NAND gate (NOT-AND) is a logic gate which produces an output which is false only if all its inputs are true; thus its output is complement to that of an AND gate. A LOW (0) output results only if all the inputs to the gate are HIGH (1); if any input is LOW (0), a HIGH (1) output results.
                        </p>
                    </div>
                </div>

                {/* Sidebar Curriculum */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-xl border border-white/5 p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Layout className="w-4 h-4 text-cyan-400" /> Course Content
                        </h3>

                        <div className="space-y-1">
                            {[
                                { title: "Introduction to Logic", duration: "5:00", active: false, completed: true },
                                { title: "The NAND Gate", duration: "12:30", active: true, completed: false },
                                { title: "Truth Tables", duration: "8:15", active: false, completed: false },
                                { title: "Building a Latch", duration: "15:00", active: false, completed: false },
                                { title: "Unit Quiz", duration: "10m", active: false, completed: false, isQuiz: true },
                            ].map((lesson, i) => (
                                <div
                                    key={i}
                                    className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${lesson.active ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/5'}`}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${lesson.completed ? 'bg-green-500 text-slate-950' : lesson.active ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                                        {lesson.completed ? <CheckCircle className="w-3 h-3" /> : i + 1}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${lesson.active ? 'text-white' : 'text-slate-400'}`}>{lesson.title}</p>
                                        <p className="text-xs text-slate-600">{lesson.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
