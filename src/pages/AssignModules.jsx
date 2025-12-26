import { useState } from 'react';
import ProfessorSidebar from '../components/ProfessorSidebar';
import { BookOpen, Check } from 'lucide-react';

export default function AssignModules() {
    const modules = [
        { id: 1, title: "Binary & Boolean Algebra", category: "Basics" },
        { id: 2, title: "Logic Gates Mastery", category: "Basics" },
        { id: 3, title: "K-Maps & Minimization", category: "Intermediate" },
        { id: 4, title: "Combinational Circuits", category: "Intermediate" },
        { id: 5, title: "Sequential Logic", category: "Advanced" },
        { id: 6, title: "State Machines", category: "Advanced" },
        { id: 7, title: "The Semantic Video Engine (AI)", category: "AI Tools" },
        { id: 8, title: "Glass Box Circuit Architect (AI)", category: "AI Tools" },
    ];

    const [selected, setSelected] = useState([]);

    const toggleModule = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            <ProfessorSidebar />
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Assign Modules</h1>
                    <p className="text-slate-400">Select modules to assign to your CS 101 class.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* List */}
                    <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Available Modules</h2>
                        <div className="space-y-2">
                            {modules.map(module => (
                                <div
                                    key={module.id}
                                    onClick={() => toggleModule(module.id)}
                                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${selected.includes(module.id)
                                            ? 'bg-purple-500/10 border-purple-500/50'
                                            : 'bg-slate-950 border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded ${selected.includes(module.id) ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className={`font-medium ${selected.includes(module.id) ? 'text-purple-300' : 'text-slate-300'}`}>{module.title}</div>
                                            <div className="text-xs text-slate-500">{module.category}</div>
                                        </div>
                                    </div>
                                    {selected.includes(module.id) && <Check className="text-purple-400 w-5 h-5" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary / Action */}
                    <div>
                        <div className="bg-slate-900 border border-white/5 rounded-xl p-6 sticky top-6">
                            <h2 className="text-lg font-bold text-white mb-4">Assignment Details</h2>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Assign To</label>
                                <select className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                                    <option>Entire Class (CS 101)</option>
                                    <option>Struggling Students Only</option>
                                    <option>Specific Group A</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Due Date</label>
                                <input type="date" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" />
                            </div>

                            <div className="bg-slate-950 rounded-lg p-4 mb-6 border border-white/5">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Selected Modules:</span>
                                    <span className="text-white font-bold">{selected.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Est. Time:</span>
                                    <span className="text-white font-bold">{selected.length * 45} mins</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors">
                                Publish Assignment
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
