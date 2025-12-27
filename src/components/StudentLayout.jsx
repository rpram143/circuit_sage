import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AIAssistant from './AIAssistant';

export default function StudentLayout() {
    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
            <AIAssistant />
        </div>
    );
}
