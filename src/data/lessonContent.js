export const LESSON_CONTENT = {
    // Module 101: Spark & Voltage
    101: {
        title: "Spark & Voltage: The Awakening",
        lessons: [
            {
                id: '101-1',
                title: "The Invisible River",
                type: 'video',
                duration: "2:30",
                xp: 50,
                content: {
                    title: "What is Current?",
                    description: "Imagine electricity as water flowing through a pipe. This flow is called Current (measured in Amps).",
                    videoPlaceholder: "current_flow_analogy", // In real app, this would be a URL
                }
            },
            {
                id: '101-2',
                title: "Current Quiz",
                type: 'quiz',
                duration: "2:00",
                xp: 100,
                content: {
                    question: "If Voltage is the pressure, then Current is the...?",
                    options: [
                        { id: 'a', text: "Size of the pipe" },
                        { id: 'b', text: "Flow rate of the water" },
                        { id: 'c', text: "Length of the pipe" }
                    ],
                    correctAnswer: 'b',
                    explanation: "Correct! Current is the rate of flow of electric charge, just like gallons per minute in a pipe."
                }
            },
            {
                id: '101-3',
                title: "Ohm's Law Lab",
                type: 'simulation',
                duration: "5:00",
                xp: 150,
                content: {
                    task: "Build a circuit with a Battery and a Resistor to see how they affect Current.",
                    guide: "1. Drag a Battery. 2. Drag a Resistor. 3. Connect them.",
                    targetComponent: "Resistor",
                    projectConfig: {
                        isProject: true,
                        name: "Ohm's Law Verification",
                        objectives: ["Connect Battery to Resistor"],
                        expectedToHave: ['Resistor']
                    }
                }
            }
        ]
    },
    // Module 301: Arduino Projects
    301: {
        title: "Arduino Workshop: Projects",
        lessons: [
            {
                id: '301-1',
                title: "Project 1: Traffic Light Controller",
                type: 'simulation',
                duration: "15:00",
                xp: 300,
                content: {
                    task: "Build a Traffic Light system using 3 LEDs (Red, Yellow, Green).",
                    guide: "1. Place an Arduino Uno.\n2. Place 3 LED Lamps.\n3. Change their colors to Red, Yellow, Green.\n4. Connect them to pins 13, 12, 11.\n5. Write code to cycle them.",
                    targetComponent: "Arduino Uno",
                    projectConfig: {
                        isProject: true,
                        name: "Traffic Light Operations",
                        objectives: [
                            "Connect Red LED to Pin 13",
                            "Connect Yellow LED to Pin 12",
                            "Connect Green LED to Pin 11",
                            "Write code to blink them in sequence"
                        ],
                        expectedToHave: ['Arduino Uno', 'LED Lamp', 'LED Lamp', 'LED Lamp']
                    }
                }
            },
            {
                id: '301-2',
                title: "Project 2: Night Light",
                type: 'simulation',
                duration: "20:00",
                xp: 400,
                content: {
                    task: "Create a light that turns on when it gets dark.",
                    guide: "1. Use a Photoresistor and an LED.\n2. Read the analog value.\n3. If value < threshold, turn on LED.",
                    targetComponent: "Photoresistor",
                    projectConfig: {
                        isProject: true,
                        name: "Smart Night Light",
                        objectives: [
                            "Connect Photoresistor to Analog Pin A0",
                            "Connect LED to Digital Pin 8",
                            "Write code: if (analogRead(A0) < 500) digitalWrite(8, HIGH)"
                        ],
                        expectedToHave: ['Arduino Uno', 'Photoresistor', 'LED Lamp']
                    }
                }
            }
        ]
    },
    // Default fallback
    'default': {
        title: "Introduction to Logic",
        lessons: [
            {
                id: 'def-1',
                title: "Welcome to Logic",
                type: 'video',
                xp: 50,
                content: { title: "Logic Gates Intro", description: "Basics of digital logic." }
            }
        ]
    }
};
