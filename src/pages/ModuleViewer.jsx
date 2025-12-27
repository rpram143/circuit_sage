import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Layout, CheckCircle, Trophy, AlertCircle, ChevronRight, Zap } from 'lucide-react';
import { ALL_MODULES } from '../data/learningModules';
import { LESSON_CONTENT } from '../data/lessonContent';
import Confetti from 'react-confetti';

export default function ModuleViewer() {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [xp, setXp] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    // Get Module Data
    const moduleInfo = ALL_MODULES.find(m => m.id === parseInt(moduleId)) || ALL_MODULES[0];
    const moduleContent = LESSON_CONTENT[moduleId] || LESSON_CONTENT['default'];
    // Handle case where moduleContent or lessons might be undefined/empty if ID is invalid
    const lessons = moduleContent?.lessons || [];
    const currentLesson = lessons[currentLessonIndex] || { type: 'error', title: 'Lesson not found' };

    const handleLessonComplete = () => {
        if (!completedLessons.includes(currentLesson.id)) {
            setCompletedLessons([...completedLessons, currentLesson.id]);
            setXp(prev => prev + (currentLesson.xp || 0));
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }

        // Next lesson
        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
            setQuizSelected(null);
            setQuizSubmitted(false);
        }
    };

    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
        if (quizSelected === currentLesson.content.correctAnswer) {
            // Delay slightly for effect then complete
            setTimeout(handleLessonComplete, 1500);
        }
    };

    // Render Content Area based on Type
    const renderContent = () => {
        if (currentLesson.type === 'video') {
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="aspect-video bg-black rounded-xl border border-white/10 flex items-center justify-center relative group overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20"></div>
                        <div className="text-center z-10">
                            <Play className="w-16 h-16 text-white/80 mx-auto mb-4" />
                            <p className="text-slate-400 font-mono">Video Placeholder: {currentLesson.content.videoPlaceholder}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-white">{currentLesson.content.title}</h2>
                        <p className="text-slate-400 leading-relaxed">{currentLesson.content.description}</p>
                    </div>
                    <button
                        onClick={handleLessonComplete}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2"
                    >
                        Complete & Continue <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            );
        }

        if (currentLesson.type === 'quiz') {
            return (
                <div className="max-w-2xl mx-auto py-12 animate-in zoom-in-95 duration-500">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <AlertCircle className="text-yellow-500" />
                            Quick Quiz
                        </h2>
                        <p className="text-lg text-slate-300 mb-8">{currentLesson.content.question}</p>

                        <div className="space-y-4 mb-8">
                            {currentLesson.content.options.map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => !quizSubmitted && setQuizSelected(opt.id)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${quizSubmitted
                                            ? opt.id === currentLesson.content.correctAnswer
                                                ? 'bg-green-500/20 border-green-500 text-white'
                                                : opt.id === quizSelected
                                                    ? 'bg-red-500/20 border-red-500 text-white'
                                                    : 'bg-slate-950 border-white/5 opacity-50'
                                            : quizSelected === opt.id
                                                ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                                : 'bg-slate-950 border-white/10 hover:border-white/30 text-slate-400'
                                        }`}
                                >
                                    {opt.text}
                                    {quizSubmitted && opt.id === currentLesson.content.correctAnswer && <CheckCircle className="text-green-500" />}
                                </button>
                            ))}
                        </div>

                        {!quizSubmitted ? (
                            <button
                                onClick={handleQuizSubmit}
                                disabled={!quizSelected}
                                className="w-full bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition-all"
                            >
                                Submit Answer
                            </button>
                        ) : (
                            <div className={`p-4 rounded-lg text-center font-bold ${quizSelected === currentLesson.content.correctAnswer ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {quizSelected === currentLesson.content.correctAnswer
                                    ? "Correct! +100 XP"
                                    : "Incorrect, try again!"}
                            </div>
                        )}
                        {quizSubmitted && quizSelected !== currentLesson.content.correctAnswer && (
                            <button onClick={() => { setQuizSubmitted(false); setQuizSelected(null); }} className="w-full mt-4 py-3 bg-slate-800 text-white rounded-lg">Try Again</button>
                        )}
                    </div>
                </div>
            );
        }

        if (currentLesson.type === 'simulation') {
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="aspect-video bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center relative overflow-hidden group">
                        <Zap className="w-16 h-16 text-yellow-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Sim Lab Challenge</h3>
                        <p className="text-slate-400 max-w-md text-center mb-6">{currentLesson.content.task}</p>
                        <button
                            onClick={() => navigate('/lab', { state: { projectConfig: currentLesson.content.projectConfig } })}
                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
                        >
                            Launch Lab Simulator <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-500">
                            Launch the simulator with these specific requirements loaded.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleLessonComplete}
                            className="text-slate-400 hover:text-white underline text-sm"
                        >
                            Mark as Done (Manual Override)
                        </button>
                    </div>
                </div>
            )
        }

        return <div className="text-center text-red-500">Error loading lesson content.</div>;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
            {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

            {/* Navbar */}
            <nav className="border-b border-white/5 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/courses')} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="h-6 w-px bg-white/10"></div>
                        <div>
                            <h1 className="text-sm font-bold text-slate-200">{moduleInfo.title}</h1>
                            <p className="text-xs text-slate-500">Lesson {currentLessonIndex + 1} of {lessons.length}</p>
                        </div>
                    </div>

                    {/* XP Pill */}
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 px-4 py-1.5 rounded-full border border-yellow-500/20">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold text-yellow-200">{xp} XP</span>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {renderContent()}
                </div>

                {/* Sidebar Curriculum */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-xl border border-white/5 p-6 shadow-xl sticky top-24">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-300">
                            <Layout className="w-4 h-4 text-cyan-400" /> Course Path
                        </h3>

                        <div className="space-y-2">
                            {lessons.map((lesson, i) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => {
                                        if (completedLessons.includes(lessons[i - 1]?.id) || i === 0 || completedLessons.includes(lesson.id)) {
                                            setCurrentLessonIndex(i);
                                            setQuizSelected(null);
                                            setQuizSubmitted(false);
                                        }
                                    }}
                                    className={`p-3 rounded-lg flex items-center gap-3 transition-all ${i === currentLessonIndex
                                            ? 'bg-cyan-500/10 border border-cyan-500/20 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]'
                                            : completedLessons.includes(lesson.id)
                                                ? 'bg-green-500/5 border border-green-500/10 hover:bg-green-500/10 cursor-pointer'
                                                : 'opacity-50 cursor-not-allowed'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${completedLessons.includes(lesson.id)
                                            ? 'bg-green-500 text-slate-900'
                                            : i === currentLessonIndex
                                                ? 'bg-cyan-500 text-slate-900 scale-110'
                                                : 'bg-slate-800 text-slate-500'
                                        }`}>
                                        {completedLessons.includes(lesson.id) ? <CheckCircle className="w-4 h-4" /> : i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium ${i === currentLessonIndex ? 'text-white' : 'text-slate-400'}`}>{lesson.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-white/5">{lesson.type}</span>
                                            {lesson.xp && <span className="text-[10px] text-yellow-500/80 font-mono">+{lesson.xp} XP</span>}
                                        </div>
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
