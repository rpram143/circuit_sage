import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, Github, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function LoginForm({ role }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (role === 'teacher') {
                navigate('/professor');
            } else {
                navigate('/dashboard');
            }
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        {role === 'teacher' ? 'University Email' : 'Email Address'}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="email"
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all"
                            placeholder={role === 'teacher' ? "prof.doe@university.edu" : "name@example.com"}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="password"
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500/50" />
                    <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline">Forgot password?</a>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-bold transition-all ${role === 'student'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        Sign In <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-950 text-slate-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                    <Github className="w-5 h-5" /> GitHub
                </button>
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg> Google
                </button>
            </div>

            <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <a href="#" className="font-medium text-cyan-400 hover:underline">
                    Sign up for free
                </a>
            </p>

        </form>
    );
}
