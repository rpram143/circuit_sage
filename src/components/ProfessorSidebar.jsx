import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Cpu, ClipboardList } from 'lucide-react';

export default function ProfessorSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard />, path: "/professor" },
        { name: "Manage Students", icon: <Users />, path: "/professor/students" },
        { name: "Assign Modules", icon: <ClipboardList />, path: "/professor/assign" },
        { name: "Settings", icon: <Settings />, path: "/professor/settings" },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-white/5 flex-col hidden md:flex sticky top-0 h-screen">
            <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/professor')}>
                <div className="p-1.5 bg-slate-800 rounded-lg border border-white/10">
                    <Cpu className="text-purple-400 w-5 h-5" />
                </div>
                <span className="font-bold text-white">Circuit Sage <span className="text-xs font-normal text-purple-400 block">Professor Mode</span></span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
