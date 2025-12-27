export const CHALLENGES = [
    {
        id: 'arduino-blink',
        title: 'Mission: The Eternal Blink',
        difficulty: 'Easy',
        desc: 'Program the Arduino Uno to make an LED connected to Pin 13 blink with a 1-second interval.',
        instructions: [
            'Drag an Arduino Uno into the workspace.',
            'Connect an LED (Cathode to GND, Anode to Pin 13).',
            'Click the Arduino to open the code editor.',
            'Write code using digitalWrite(13, HIGH) and delay(1000).',
            'Run the simulation and verify the blinking.'
        ],
        type: 'PRACTICAL',
        successCriteria: {
            componentExists: 'Arduino Uno',
            codeMatches: ['digitalWrite', 'delay', 'HIGH', 'LOW'],
            pinsPulsing: [13]
        },
        hint: 'Use the delay() function to control time. Make sure you set the pin to HIGH and then to LOW in the loop().'
    },
    {
        id: 'rgb-mood-lamp',
        title: 'RGB Color Mixer',
        difficulty: 'Medium',
        desc: 'Create a circuit that cycles an RGB LED through Red, Green, and Blue colors.',
        instructions: [
            'Connect an RGB LED to pins 9, 10, and 11 of the Arduino.',
            'Use analogWrite() to create a color cycling effect.',
            'Connect the common cathode (CAT) to GND.'
        ],
        type: 'PRACTICAL',
        successCriteria: {
            componentExists: 'RGB LED',
            pinsActive: [9, 10, 11]
        },
        hint: 'Pins 9, 10, and 11 support PWM (analogWrite). Try values between 0 and 255.'
    }
];
