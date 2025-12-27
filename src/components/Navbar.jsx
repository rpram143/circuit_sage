import { Cpu, Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Solution', path: '/solution' },
        { name: 'Journey', path: '/journey' },
        { name: 'For Teachers', path: '/teachers' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? 'py-4 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-cyan-500/5'
                : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                    <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
                        <div className="relative p-2.5 bg-slate-900/80 rounded-xl border border-white/10 group-hover:border-cyan-500/50 transition-colors backdrop-blur-md">
                            <Cpu className="text-cyan-400 w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                        </div>
                    </div>
                    <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-cyan-400 transition-all duration-500">
                        Circuit Sage
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10 text-slate-400 text-sm font-bold">
                    {navLinks.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`hover:text-cyan-400 transition-all relative group flex items-center gap-1.5 ${isActive(item.path) ? 'text-cyan-400' : 'text-slate-400'
                                }`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            {isActive(item.path) && (
                                <motion.div layoutId="activeDot" className="w-1 h-1 rounded-full bg-cyan-400" />
                            )}
                        </button>
                    ))}
                </div>

                {/* CTA & Mobile Menu Button */}
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => navigate('/login')}
                        className="hidden md:flex items-center gap-2 px-7 py-3 bg-white text-slate-950 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-10px_rgba(255,255,255,0.3)] hover:shadow-cyan-500/40"
                    >
                        Start Learning
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                        className="md:hidden p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navLinks.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center justify-between w-full text-lg font-bold transition-colors ${isActive(item.path) ? 'text-cyan-400' : 'text-slate-400'
                                        }`}
                                >
                                    {item.name}
                                    <ChevronRight className="w-5 h-5 opacity-50" />
                                </button>
                            ))}
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-cyan-500/20"
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
