import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

const competitors = [
    { name: "Circuit Sage", isPrimary: true },
    { name: "Video Courses", isPrimary: false },
    { name: "Pro Simulators", isPrimary: false },
    { name: "Textbooks", isPrimary: false },
];

const features = [
    { name: "Interactive Circuit Building", values: [true, false, true, false] },
    { name: "Real-Time AI Feedback", values: [true, false, false, false] },
    { name: "Gamified Progression", values: [true, false, false, false] },
    { name: "Real-World Glitch Simulation", values: [true, false, true, false] },
    { name: "Zero Setup (Browser Based)", values: [true, true, false, true] },
];

export default function ComparisonSection() {
    return (
        <section className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose <span className="text-cyan-400">Circuit Sage</span>?</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 text-slate-400 font-medium"></th>
                                {competitors.map((comp, i) => (
                                    <th key={i} className={`p-4 text-lg font-bold ${comp.isPrimary ? 'text-cyan-400' : 'text-slate-300'}`}>
                                        {comp.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, i) => (
                                <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-6 text-slate-300 font-medium">{feature.name}</td>
                                    {feature.values.map((val, j) => (
                                        <td key={j} className="p-6">
                                            <div className="flex items-center">
                                                {val ? (
                                                    <div className={`rounded-full p-1 ${j === 0 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                                                        <Check className="w-5 h-5" />
                                                    </div>
                                                ) : (
                                                    <div className="rounded-full p-1 bg-slate-900/50 text-slate-600">
                                                        <Minus className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
