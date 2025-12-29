import { BrainCircuit } from 'lucide-react';

export const ALL_MODULES = [
    {
        id: 401,
        title: "Practical Board Exam: Basic",
        desc: "Test your skills in the virtual lab. Complete challenges to earn the 'Circuit Ninja' certification.",
        category: "Exams",
        progress: 0,
        locked: false,
        completed: false,
        lessons: 1,
        xp: 2000,
        type: 'TEST',
        challengeId: 'arduino-blink',
        icon: <BrainCircuit className="w-6 h-6 text-yellow-400" />
    }
];
