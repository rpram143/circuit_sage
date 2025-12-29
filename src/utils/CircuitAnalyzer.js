// Circuit Analyzer - Client-side AI simulation for extracting circuit info from videos

const CIRCUIT_PATTERNS = {
    'led blink': {
        components: [
            { name: 'Arduino Uno', quantity: 1, specs: 'Microcontroller board' },
            { name: 'LED', quantity: 1, specs: 'Red, 5mm' },
            { name: '220Ω Resistor', quantity: 1, specs: 'Current limiting' },
            { name: 'Breadboard', quantity: 1, specs: 'Standard size' },
            { name: 'Jumper Wires', quantity: 3, specs: 'Male-to-male' }
        ],
        wiring: [
            { step: 1, instruction: 'Connect LED positive (longer leg) to Arduino Pin 13', color: 'red' },
            { step: 2, instruction: 'Connect 220Ω resistor to LED negative (shorter leg)', color: 'yellow' },
            { step: 3, instruction: 'Connect other end of resistor to Arduino GND', color: 'black' }
        ],
        code: {
            platform: 'Arduino',
            language: 'C++',
            content: `// LED Blink - Basic Arduino Program
void setup() {
  pinMode(13, OUTPUT);  // Set pin 13 as output
}

void loop() {
  digitalWrite(13, HIGH);  // Turn LED on
  delay(1000);             // Wait 1 second
  digitalWrite(13, LOW);   // Turn LED off
  delay(1000);             // Wait 1 second
}`
        },
        theory: {
            concept: 'Digital Output Control',
            explanation: 'This circuit demonstrates basic digital output control using a microcontroller. The Arduino sends HIGH (5V) and LOW (0V) signals to control the LED.',
            keyPoints: [
                'pinMode() configures pin as output',
                'digitalWrite() controls voltage level',
                'Resistor limits current to protect LED',
                'delay() creates timing intervals'
            ],
            commonMistakes: [
                'Forgetting the current-limiting resistor (LED will burn out)',
                'Reversing LED polarity (won\'t light up)',
                'Using wrong pin number in code'
            ]
        }
    },
    'traffic light': {
        components: [
            { name: 'Arduino Uno', quantity: 1, specs: 'Microcontroller board' },
            { name: 'Red LED', quantity: 1, specs: '5mm' },
            { name: 'Yellow LED', quantity: 1, specs: '5mm' },
            { name: 'Green LED', quantity: 1, specs: '5mm' },
            { name: '220Ω Resistor', quantity: 3, specs: 'Current limiting' },
            { name: 'Breadboard', quantity: 1, specs: 'Standard size' },
            { name: 'Jumper Wires', quantity: 9, specs: 'Male-to-male' }
        ],
        wiring: [
            { step: 1, instruction: 'Connect Red LED+ to Pin 13 via 220Ω resistor', color: 'red' },
            { step: 2, instruction: 'Connect Yellow LED+ to Pin 12 via 220Ω resistor', color: 'yellow' },
            { step: 3, instruction: 'Connect Green LED+ to Pin 11 via 220Ω resistor', color: 'green' },
            { step: 4, instruction: 'Connect all LED negatives to GND rail', color: 'black' },
            { step: 5, instruction: 'Connect GND rail to Arduino GND', color: 'black' }
        ],
        code: {
            platform: 'Arduino',
            language: 'C++',
            content: `// Traffic Light Controller
const int RED = 13;
const int YELLOW = 12;
const int GREEN = 11;

void setup() {
  pinMode(RED, OUTPUT);
  pinMode(YELLOW, OUTPUT);
  pinMode(GREEN, OUTPUT);
}

void loop() {
  // Red light
  digitalWrite(RED, HIGH);
  delay(5000);
  digitalWrite(RED, LOW);
  
  // Yellow light
  digitalWrite(YELLOW, HIGH);
  delay(2000);
  digitalWrite(YELLOW, LOW);
  
  // Green light
  digitalWrite(GREEN, HIGH);
  delay(5000);
  digitalWrite(GREEN, LOW);
}`
        },
        theory: {
            concept: 'Sequential Control & Timing',
            explanation: 'This circuit simulates a traffic light system using sequential LED control with precise timing intervals.',
            keyPoints: [
                'Multiple digital outputs controlled independently',
                'Timing sequences create realistic traffic light behavior',
                'const variables make code more readable',
                'Each LED has its own current-limiting resistor'
            ],
            commonMistakes: [
                'Not turning off previous LED before next one',
                'Incorrect timing values',
                'Sharing one resistor for multiple LEDs'
            ]
        }
    },
    'ultrasonic sensor': {
        components: [
            { name: 'Arduino Uno', quantity: 1, specs: 'Microcontroller board' },
            { name: 'HC-SR04 Ultrasonic Sensor', quantity: 1, specs: 'Distance measurement' },
            { name: 'Breadboard', quantity: 1, specs: 'Standard size' },
            { name: 'Jumper Wires', quantity: 4, specs: 'Male-to-male' }
        ],
        wiring: [
            { step: 1, instruction: 'Connect VCC to Arduino 5V', color: 'red' },
            { step: 2, instruction: 'Connect GND to Arduino GND', color: 'black' },
            { step: 3, instruction: 'Connect TRIG to Arduino Pin 9', color: 'blue' },
            { step: 4, instruction: 'Connect ECHO to Arduino Pin 10', color: 'green' }
        ],
        code: {
            platform: 'Arduino',
            language: 'C++',
            content: `// Ultrasonic Distance Sensor
const int TRIG = 9;
const int ECHO = 10;

void setup() {
  Serial.begin(9600);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  // Send pulse
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  
  // Read echo
  long duration = pulseIn(ECHO, HIGH);
  float distance = duration * 0.034 / 2;
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  delay(500);
}`
        },
        theory: {
            concept: 'Ultrasonic Distance Measurement',
            explanation: 'Uses sound waves to measure distance. Sends ultrasonic pulse and measures time for echo to return.',
            keyPoints: [
                'pulseIn() measures pulse duration',
                'Speed of sound = 340 m/s (0.034 cm/μs)',
                'Divide by 2 because sound travels to object and back',
                'Serial communication displays results'
            ],
            commonMistakes: [
                'Not using delayMicroseconds for trigger pulse',
                'Incorrect distance calculation formula',
                'Forgetting to initialize Serial communication'
            ]
        }
    }
};

export class CircuitAnalyzer {
    analyzeVideo(videoTitle, transcript = '') {
        const titleLower = videoTitle.toLowerCase();

        // Find matching pattern
        let matchedPattern = null;
        let matchedKey = '';

        for (const [key, pattern] of Object.entries(CIRCUIT_PATTERNS)) {
            if (titleLower.includes(key)) {
                matchedPattern = pattern;
                matchedKey = key;
                break;
            }
        }

        // If no exact match, try keyword matching
        if (!matchedPattern) {
            if (titleLower.includes('led') && titleLower.includes('blink')) {
                matchedPattern = CIRCUIT_PATTERNS['led blink'];
                matchedKey = 'led blink';
            } else if (titleLower.includes('traffic')) {
                matchedPattern = CIRCUIT_PATTERNS['traffic light'];
                matchedKey = 'traffic light';
            } else if (titleLower.includes('ultrasonic') || titleLower.includes('distance')) {
                matchedPattern = CIRCUIT_PATTERNS['ultrasonic sensor'];
                matchedKey = 'ultrasonic sensor';
            } else {
                // Default to LED blink for unknown patterns
                matchedPattern = CIRCUIT_PATTERNS['led blink'];
                matchedKey = 'led blink (default)';
            }
        }

        return {
            projectName: this.extractProjectName(videoTitle),
            patternMatched: matchedKey,
            components: matchedPattern.components,
            wiring: matchedPattern.wiring,
            code: matchedPattern.code,
            theory: matchedPattern.theory,
            confidence: this.calculateConfidence(titleLower, matchedKey)
        };
    }

    extractProjectName(title) {
        // Clean up title to get project name
        const cleaned = title
            .replace(/arduino/gi, '')
            .replace(/tutorial/gi, '')
            .replace(/how to/gi, '')
            .replace(/project/gi, '')
            .replace(/\|.*/g, '')
            .trim();

        return cleaned || 'Circuit Project';
    }

    calculateConfidence(title, pattern) {
        const keywords = pattern.split(' ');
        let matches = 0;
        keywords.forEach(keyword => {
            if (title.includes(keyword)) matches++;
        });
        return Math.min((matches / keywords.length) * 100, 100);
    }

    generateQAResponse(question, circuitData) {
        const questionLower = question.toLowerCase();

        // Resistor value questions
        if (questionLower.includes('resistor') && questionLower.includes('change')) {
            return {
                answer: "Changing the resistor value will affect the LED brightness and current. A higher resistance (e.g., 1kΩ) will make the LED dimmer and draw less current. A lower resistance (e.g., 100Ω) will make it brighter but may damage the LED if too low. The 220Ω value is chosen to limit current to about 20mA, which is safe for most LEDs.",
                relatedConcept: "Ohm's Law: V = IR"
            };
        }

        // LED not working
        if (questionLower.includes('led') && (questionLower.includes('not') || questionLower.includes('won\'t'))) {
            return {
                answer: "If the LED is not glowing, check:\n1. LED polarity - longer leg should be positive\n2. Correct pin number in code\n3. Resistor is connected\n4. Arduino is powered and code is uploaded\n5. Try a different LED (it might be damaged)",
                relatedConcept: "LED polarity and current limiting"
            };
        }

        // Pin change questions
        if (questionLower.includes('pin') && questionLower.includes('different')) {
            return {
                answer: "Yes! You can use any digital pin (2-13) on Arduino. Just make sure to:\n1. Update the wiring to connect to the new pin\n2. Change the pin number in your code (pinMode and digitalWrite)\n3. Avoid pins 0 and 1 if using Serial communication",
                relatedConcept: "Arduino digital I/O pins"
            };
        }

        // Default response
        return {
            answer: "That's a great question! For specific circuit questions, try asking about:\n- Component values (resistors, capacitors)\n- Pin connections\n- Troubleshooting (LED not working, etc.)\n- Code modifications",
            relatedConcept: "Circuit fundamentals"
        };
    }
}

export default new CircuitAnalyzer();
