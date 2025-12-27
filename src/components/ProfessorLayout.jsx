import { Outlet } from 'react-router-dom';
import ProfessorSidebar from './ProfessorSidebar';
import AIAssistant from './AIAssistant';

export default function ProfessorLayout() {
    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            <ProfessorSidebar />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
            <AIAssistant />
        </div>
    );
}
