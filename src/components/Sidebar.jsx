import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Zap, Settings, LogOut, Cpu, Search, Youtube } from 'lucide-react';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
        { name: "My Courses", icon: <BookOpen />, path: "/courses" },
        { name: "Learn Tube", icon: <Youtube />, path: "/learntube" },
        { name: "Lab Simulator", icon: <Zap />, path: "/lab" },
        { name: "Settings", icon: <Settings />, path: "/settings" },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-white/5 flex-col hidden md:flex sticky top-0 h-screen">
            <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="p-1.5 bg-slate-800 rounded-lg border border-white/10">
                    <Cpu className="text-cyan-400 w-5 h-5" />
                </div>
                <span className="font-bold text-white">Circuit Sage</span>
            </div>

            <div className="px-4 mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-slate-800 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm"
                    />
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </div>
        </aside>
    );
}
