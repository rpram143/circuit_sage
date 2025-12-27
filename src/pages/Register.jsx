import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Cpu, GraduationCap, School } from 'lucide-react';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
    const [role, setRole] = useState('student'); // 'student' or 'teacher'

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950 overflow-hidden">

            {/* Left: Visuals */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 bg-slate-900 border-r border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 opacity-50"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg border border-white/10">
                        <Cpu className="text-cyan-400 w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-white">Circuit Sage</span>
                </div>

                <div className="relative z-10 space-y-8">
                    <motion.div
                        key={role}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            {role === 'student' ? "Begin Your Journey." : "Empower Your Students."}
                            <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${role === 'student' ? 'from-cyan-400 to-blue-500' : 'from-purple-400 to-pink-500'}`}>
                                {role === 'student' ? "Build Circuits in Seconds." : "Streamline Lab Grading."}
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-md">
                            {role === 'student'
                                ? "Create a free account to access interactive labs, AI hints, and earn certifications."
                                : "Join our platform to manage classes, assign practical board exams, and track student performance automatically."}
                        </p>
                    </motion.div>

                    <div className="relative h-48 bg-slate-950 rounded-xl border border-white/10 p-6 overflow-hidden group">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        <div className="relative flex items-center gap-8 h-full">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`w-12 h-12 rounded-lg ${role === 'student' ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-purple-500/20 border-purple-500/50 text-purple-400'} border flex items-center justify-center`}
                            >
                                {role === 'student' ? <GraduationCap /> : <School />}
                            </motion.div>

                            <div className="flex-1 h-0.5 bg-slate-800 relative">
                                <motion.div
                                    className={`absolute top-0 left-0 h-full ${role === 'student' ? 'bg-cyan-500' : 'bg-purple-500'}`}
                                    animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>

                            <div className="w-12 h-12 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-500">
                                <CheckCircle2 />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-slate-500">
                    © 2025 Circuit Sage Inc.
                </div>
            </div>

            {/* Right: Register Form */}
            <div className="relative flex flex-col justify-center items-center p-8">
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-slate-400">Join the next generation of engineers.</p>
                    </div>

                    {/* Role Toggle */}
                    <div className="bg-slate-900 p-1 rounded-lg flex relative">
                        <motion.div
                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-800 rounded-md shadow-sm"
                            animate={{ left: role === 'student' ? '4px' : 'calc(50%)' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setRole('student')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium relative z-10 transition-colors ${role === 'student' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            <GraduationCap className="w-4 h-4" /> Student
                        </button>
                        <button
                            onClick={() => setRole('teacher')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium relative z-10 transition-colors ${role === 'teacher' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            <School className="w-4 h-4" /> Professor
                        </button>
                    </div>

                    <RegisterForm role={role} />

                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-cyan-400 hover:underline">
                            Log in here
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
