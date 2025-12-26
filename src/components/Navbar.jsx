import { Cpu, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                        <div className="relative p-2 bg-slate-900 rounded-lg border border-white/10">
                            <Cpu className="text-cyan-400 w-6 h-6" />
                        </div>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Circuit Sage
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-slate-400 text-sm font-medium">
                    {['Solution', 'Journey', 'For Teachers'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-cyan-400 transition-colors relative group">
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="hidden md:block px-6 py-2.5 bg-white text-slate-950 rounded-full font-semibold hover:bg-cyan-50 transition-colors shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)]"
                    >
                        Start Learning
                    </button>
                    <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {['Solution', 'Journey', 'For Teachers'].map((item) => (
                                <a key={item} href="#" className="block text-slate-400 hover:text-cyan-400 transition-colors">
                                    {item}
                                </a>
                            ))}
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-3 bg-cyan-500 text-white rounded-lg font-bold"
                            >
                                Start Learning Free
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
