import { Search, MoreVertical, Mail } from 'lucide-react';

export default function ManageStudents() {
    const students = [
        { id: 1, name: "Alice Johnson", email: "alice@univ.edu", progress: 92, status: "Active" },
        { id: 2, name: "Bob Smith", email: "bob@univ.edu", progress: 45, status: "Struggling" },
        { id: 3, name: "Charlie Davis", email: "charlie@univ.edu", progress: 78, status: "Active" },
        { id: 4, name: "Diana Prince", email: "diana@univ.edu", progress: 15, status: "Inactive" },
        { id: 5, name: "Evan Wright", email: "evan@univ.edu", progress: 88, status: "Active" },
    ];

    return (
        <main className="p-6 md:p-12">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Manage Students</h1>
                    <p className="text-slate-400">View performance and manage enrollments.</p>
                </div>
            </header>

            {/* Filter / Search */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input type="text" placeholder="Search students..." className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <select className="bg-slate-900 border border-white/10 rounded-lg px-4 text-white focus:outline-none">
                    <option>All Classes</option>
                    <option>CS 101 - Intro to Digital Logic</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 text-sm font-medium uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Progress</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {students.map(student => (
                            <tr key={student.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="p-4">
                                    <div>
                                        <div className="font-bold text-white">{student.name}</div>
                                        <div className="text-xs text-slate-500">{student.email}</div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${student.progress > 80 ? 'bg-green-500' : student.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${student.progress}%` }}></div>
                                        </div>
                                        <span className="text-sm text-slate-400">{student.progress}%</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${student.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                                        student.status === 'Inactive' ? 'bg-slate-500/10 text-slate-400' :
                                            'bg-red-500/10 text-red-400'
                                        }`}>
                                        {student.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white" title="Message">
                                            <Mail className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
