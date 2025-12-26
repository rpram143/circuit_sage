import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AIAssistant from '../components/AIAssistant';
import ModuleCard from '../components/ModuleCard';
import {
    Search, BrainCircuit, Scan, Hourglass, Hand, PlayCircle, Camera,
    Bell, Flame
} from 'lucide-react';

const modules = [
    {
        id: 1,
        title: "The Semantic Video Engine",
        desc: "A \"smart search\" that ignores keywords and finds answers. Ask technical questions and find the exact lecture moment.",
        progress: 100,
        locked: false,
        completed: true,
        lessons: 8,
        xp: 500,
        icon: <Search className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Glass Box Circuit Architect",
        desc: "AI-powered Text-to-Circuit generator. Type \"Create a 4-bit synchronous counter\" and watch it build itself.",
        progress: 45,
        locked: false,
        completed: false,
        lessons: 12,
        xp: 800,
        icon: <BrainCircuit className="w-6 h-6" />
    },
    {
        id: 3,
        title: "The PCB X-Ray (AR)",
        desc: "Augmented Reality bridge. Point your phone at an Arduino to see invisible voltage levels and pin names.",
        progress: 0,
        locked: false,
        completed: false,
        lessons: 15,
        xp: 1200,
        icon: <Scan className="w-6 h-6" />
    },
    {
        id: 4,
        title: "The Time Lord",
        desc: "Interactive Timing Analysis. Drag clock signals to see how Setup/Hold violations break a circuit.",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 10,
        xp: 1500,
        icon: <Hourglass className="w-6 h-6" />
    },
    {
        id: 5,
        title: "The Inclusive Tutor",
        desc: "Accessibility-first ISL Avatar. Translates technical summaries into Indian Sign Language.",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 6,
        xp: 600,
        icon: <Hand className="w-6 h-6" />
    },
    {
        id: 6,
        title: "The Smart Player",
        desc: "AI-Augmented Video. It understands the content, adding automatic chapters and context-aware definitions.",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 20,
        xp: 2000,
        icon: <PlayCircle className="w-6 h-6" />
    },
    {
        id: 7,
        title: "Snap-to-Sim",
        desc: "Optical Circuit Recognition. Convert hand-drawn circuit sketches into running simulations instantly.",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 5,
        xp: 400,
        icon: <Camera className="w-6 h-6" />
    }
];

export default function MyCourses() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">

                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Courses</h1>
                        <p className="text-slate-400">Master the art of electronics.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-bold border border-orange-500/20">
                            <Flame className="w-4 h-4 fill-current" /> 12 Day Streak
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-700 cursor-pointer">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold border-2 border-slate-900">
                            R
                        </div>
                    </div>
                </header>

                {/* Modules Grid */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {modules.map((module, i) => (
                            <ModuleCard key={module.id} module={module} delay={i} />
                        ))}
                    </div>
                </section>

            </main>
            <AIAssistant />
        </div>
    );
}
