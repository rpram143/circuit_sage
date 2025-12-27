import {
    Search, BrainCircuit, Scan, Hourglass, Hand, PlayCircle, Camera,
    Zap, Cpu, Radio, Hash, RefreshCcw, Wifi, Layers, PenTool, BookOpen
} from 'lucide-react';

export const ALL_MODULES = [
    // --- Original Tools (MyCourses) ---
    {
        id: 1,
        title: "The Semantic Video Engine",
        desc: "A \"smart search\" that ignores keywords and finds answers. Ask technical questions and find the exact lecture moment.",
        category: "AI Tools",
        progress: 100,
        locked: false,
        completed: true,
        lessons: 8,
        xp: 500,
        icon: <Search className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Glass Box Circuit Architect",
        desc: "AI-powered Text-to-Circuit generator. Type \"Create a 4-bit synchronous counter\" and watch it build itself.",
        category: "AI Tools",
        progress: 45,
        locked: false,
        completed: false,
        lessons: 12,
        xp: 800,
        icon: <BrainCircuit className="w-6 h-6" />
    },
    {
        id: 3,
        title: "The PCB X-Ray (AR)",
        desc: "Augmented Reality bridge. Point your phone at an Arduino to see invisible voltage levels and pin names.",
        category: "AI Tools",
        progress: 0,
        locked: false,
        completed: false,
        lessons: 15,
        xp: 1200,
        icon: <Scan className="w-6 h-6" />
    },
    {
        id: 4,
        title: "The Time Lord",
        desc: "Interactive Timing Analysis. Drag clock signals to see how Setup/Hold violations break a circuit.",
        category: "Advanced Utils",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 10,
        xp: 1500,
        icon: <Hourglass className="w-6 h-6" />
    },
    {
        id: 5,
        title: "The Inclusive Tutor",
        desc: "Accessibility-first ISL Avatar. Translates technical summaries into Indian Sign Language.",
        category: "Accessibility",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 6,
        xp: 600,
        icon: <Hand className="w-6 h-6" />
    },
    {
        id: 6,
        title: "The Smart Player",
        desc: "AI-Augmented Video. It understands the content, adding automatic chapters and context-aware definitions.",
        category: "AI Tools",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 20,
        xp: 2000,
        icon: <PlayCircle className="w-6 h-6" />
    },
    {
        id: 7,
        title: "Snap-to-Sim",
        desc: "Optical Circuit Recognition. Convert hand-drawn circuit sketches into running simulations instantly.",
        category: "AI Tools",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 5,
        xp: 400,
        icon: <Camera className="w-6 h-6" />
    },

    // --- New Electronics Learning Modules (7 Extra) ---
    {
        id: 101,
        title: "Spark & Voltage: The Awakening",
        desc: "Master the fundamentals of Voltage, Current, and Resistance. Includes interactive Ohm's Law challenges.",
        category: "Basics",
        progress: 10,
        locked: false,
        completed: false,
        lessons: 5,
        xp: 300,
        icon: <Zap className="w-6 h-6" />
    },
    {
        id: 102,
        title: "The Silicon Brain: MCU Mastery",
        desc: "Dive into Microcontrollers. Learn GPIO, PWM, and basic coding for Arduino and ESP32.",
        category: "Intermediate",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 10,
        xp: 600,
        icon: <Cpu className="w-6 h-6" />
    },
    {
        id: 103,
        title: "Sensor Sensei",
        desc: "Learn to perceive the world. Interface Ultrasonic, Temp, and Light sensors with your circuits.",
        category: "Intermediate",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 8,
        xp: 450,
        icon: <Radio className="w-6 h-6" />
    },
    {
        id: 104,
        title: "Logic Lords: Digital Dominion",
        desc: "Conquer Boolean Algebra and Logic Gates. Build adders, multiplexers, and ALU blocks.",
        category: "Basics",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 12,
        xp: 700,
        icon: <Hash className="w-6 h-6" />
    },
    {
        id: 105,
        title: "Green Power: Energy Harvesting",
        desc: "Design efficient power supplies and learn about solar harvesting and battery management.",
        category: "Advanced",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 6,
        xp: 500,
        icon: <RefreshCcw className="w-6 h-6" />
    },
    {
        id: 106,
        title: "The Invisible Waves: IoT",
        desc: "Connect your devices to the cloud. MQTT, Wi-Fi, and creating smart home dashboards.",
        category: "Advanced",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 15,
        xp: 1000,
        icon: <Wifi className="w-6 h-6" />
    },
    {
        id: 107,
        title: "PCB Architect",
        desc: "From Schematic to Board. Learn industry standard practices for designing professional PCBs.",
        category: "Professional",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 20,
        xp: 1500,
        icon: <Layers className="w-6 h-6" />
    },

    // --- Additional Curriculum Modules (from AssignModules) ---
    {
        id: 201,
        title: "K-Maps & Minimization",
        desc: "Advanced logic reduction techniques.",
        category: "Intermediate",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 4,
        xp: 400,
        icon: <PenTool className="w-6 h-6" />
    },
    {
        id: 202,
        title: "Sequential Logic",
        desc: "Flip-flops, Counters, and Memory elements.",
        category: "Advanced",
        progress: 0,
        locked: true,
        completed: false,
        lessons: 8,
        xp: 800,
        icon: <BookOpen className="w-6 h-6" />
    },
    // --- Project Modules ---
    {
        id: 301,
        title: "Arduino Workshop: Projects",
        desc: "Hands-on projects with Microcontrollers. Build a Traffic Light controller and more.",
        category: "Projects",
        progress: 0,
        locked: false,
        completed: false,
        lessons: 3,
        xp: 1000,
        icon: <Cpu className="w-6 h-6" />
    }
];
