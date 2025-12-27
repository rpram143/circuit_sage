
export const LAB_COMPONENTS = {
    // Microcontrollers
    'Arduino Uno': {
        category: 'MCU',
        width: 200,
        height: 280, // Approximate relative size
        pins: {
            left: [
                { id: 'RESET', label: 'RESET', type: 'in' },
                { id: '3V3', label: '3.3V', type: 'power' },
                { id: '5V', label: '5V', type: 'power' },
                { id: 'GND1', label: 'GND', type: 'ground' },
                { id: 'GND2', label: 'GND', type: 'ground' },
                { id: 'VIN', label: 'VIN', type: 'power' },
                { id: 'A0', label: 'A0', type: 'analog' },
                { id: 'A1', label: 'A1', type: 'analog' },
                { id: 'A2', label: 'A2', type: 'analog' },
                { id: 'A3', label: 'A3', type: 'analog' },
                { id: 'A4', label: 'A4', type: 'analog' },
                { id: 'A5', label: 'A5', type: 'analog' },
            ],
            right: [
                { id: '0', label: 'RX/0', type: 'digital' },
                { id: '1', label: 'TX/1', type: 'digital' },
                { id: '2', label: 'D2', type: 'digital' },
                { id: '3', label: 'D3~', type: 'digital' },
                { id: '4', label: 'D4', type: 'digital' },
                { id: '5', label: 'D5~', type: 'digital' },
                { id: '6', label: 'D6~', type: 'digital' },
                { id: '7', label: 'D7', type: 'digital' },
                { id: '8', label: 'D8', type: 'digital' },
                { id: '9', label: 'D9~', type: 'digital' },
                { id: '10', label: 'D10~', type: 'digital' },
                { id: '11', label: 'D11~', type: 'digital' },
                { id: '12', label: 'D12', type: 'digital' },
                { id: '13', label: 'D13', type: 'digital' },
                { id: 'GND3', label: 'GND', type: 'ground' },
                { id: 'AREF', label: 'AREF', type: 'in' },
            ]
        },
        defaultProps: {
            code: '// Arduino Setup\nvoid setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}'
        }
    },
    'ESP32': {
        category: 'MCU',
        width: 160,
        height: 300,
        pins: {
            left: [
                { id: 'EN', label: 'EN', type: 'in' },
                { id: 'VP', label: 'VP', type: 'in' },
                { id: 'VN', label: 'VN', type: 'in' },
                { id: '34', label: 'D34', type: 'digital' },
                { id: '35', label: 'D35', type: 'digital' },
                { id: '32', label: 'D32', type: 'digital' },
                { id: '33', label: 'D33', type: 'digital' },
                { id: '25', label: 'D25', type: 'digital' },
                { id: '26', label: 'D26', type: 'digital' },
                { id: '27', label: 'D27', type: 'digital' },
                { id: '14', label: 'D14', type: 'digital' },
                { id: '12', label: 'D12', type: 'digital' },
                { id: '13', label: 'D13', type: 'digital' },
                { id: 'GND1', label: 'GND', type: 'ground' },
                { id: 'VIN', label: 'VIN', type: 'power' },
            ],
            right: [
                { id: '23', label: 'D23', type: 'digital' },
                { id: '22', label: 'D22', type: 'digital' },
                { id: '1', label: 'TX0', type: 'digital' },
                { id: '3', label: 'RX0', type: 'digital' },
                { id: '21', label: 'D21', type: 'digital' },
                { id: '19', label: 'D19', type: 'digital' },
                { id: '18', label: 'D18', type: 'digital' },
                { id: '5', label: 'D5', type: 'digital' },
                { id: '17', label: 'D17', type: 'digital' },
                { id: '16', label: 'D16', type: 'digital' },
                { id: '4', label: 'D4', type: 'digital' },
                { id: '0', label: 'D0', type: 'digital' },
                { id: '2', label: 'D2', type: 'digital' },
                { id: '15', label: 'D15', type: 'digital' },
                { id: '3V3', label: '3V3', type: 'power' },
            ]
        },
        defaultProps: {
            code: '// ESP32 Setup\nvoid setup() {\n  pinMode(2, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(2, HIGH);\n  delay(500);\n  digitalWrite(2, LOW);\n  delay(500);\n}'
        }
    },
    'Raspberry Pi Pico': {
        category: 'MCU',
        width: 140,
        height: 360,
        pins: {
            left: [
                { id: '0', label: 'GP0', type: 'digital' }, { id: '1', label: 'GP1', type: 'digital' }, { id: 'GND1', label: 'GND', type: 'ground' },
                { id: '2', label: 'GP2', type: 'digital' }, { id: '3', label: 'GP3', type: 'digital' }, { id: '4', label: 'GP4', type: 'digital' },
                { id: '5', label: 'GP5', type: 'digital' }, { id: 'GND2', label: 'GND', type: 'ground' }, { id: '6', label: 'GP6', type: 'digital' },
                { id: '7', label: 'GP7', type: 'digital' }, { id: '8', label: 'GP8', type: 'digital' }, { id: '9', label: 'GP9', type: 'digital' },
                { id: 'GND3', label: 'GND', type: 'ground' }, { id: '10', label: 'GP10', type: 'digital' }, { id: '11', label: 'GP11', type: 'digital' },
                { id: '12', label: 'GP12', type: 'digital' }, { id: '13', label: 'GP13', type: 'digital' }, { id: 'GND4', label: 'GND', type: 'ground' },
                { id: '14', label: 'GP14', type: 'digital' }, { id: '15', label: 'GP15', type: 'digital' }
            ],
            right: [
                { id: 'VBUS', label: 'VBUS', type: 'power' }, { id: 'VSYS', label: 'VSYS', type: 'power' }, { id: 'GND5', label: 'GND', type: 'ground' },
                { id: '3V3_EN', label: '3V3_EN', type: 'in' }, { id: '3V3', label: '3V3(OUT)', type: 'power' }, { id: 'ADC_REF', label: 'ADC_REF', type: 'in' },
                { id: '28', label: 'GP28', type: 'digital' }, { id: 'GND6', label: 'GND', type: 'ground' }, { id: '27', label: 'GP27', type: 'digital' },
                { id: '26', label: 'GP26', type: 'digital' }, { id: 'RUN', label: 'RUN', type: 'in' }, { id: '22', label: 'GP22', type: 'digital' },
                { id: 'GND7', label: 'GND', type: 'ground' }, { id: '21', label: 'GP21', type: 'digital' }, { id: '20', label: 'GP20', type: 'digital' },
                { id: '19', label: 'GP19', type: 'digital' }, { id: '18', label: 'GP18', type: 'digital' }, { id: 'GND8', label: 'GND', type: 'ground' },
                { id: '17', label: 'GP17', type: 'digital' }, { id: '16', label: 'GP16', type: 'digital' }
            ]
        },
        defaultProps: {
            code: '// Pico Setup\nimport machine\nimport time\nled = machine.Pin(25, machine.Pin.OUT)\nwhile True:\n  led.toggle()\n  time.sleep(0.5)'
        }
    },

    // Gates
    'AND': {
        category: 'GATE',
        width: 80, height: 60,
        pins: {
            left: [{ id: 'A', label: 'A', type: 'in' }, { id: 'B', label: 'B', type: 'in' }],
            right: [{ id: 'OUT', label: 'OUT', type: 'out' }]
        }
    },
    'OR': {
        category: 'GATE',
        width: 80, height: 60,
        pins: {
            left: [{ id: 'A', label: 'A', type: 'in' }, { id: 'B', label: 'B', type: 'in' }],
            right: [{ id: 'OUT', label: 'OUT', type: 'out' }]
        }
    },
    'NOT': {
        category: 'GATE',
        width: 80, height: 60,
        pins: {
            left: [{ id: 'IN', label: 'IN', type: 'in' }],
            right: [{ id: 'OUT', label: 'OUT', type: 'out' }]
        }
    },
    'NAND': {
        category: 'GATE',
        width: 80, height: 60,
        pins: { left: [{ id: 'A', label: 'A', type: 'in' }, { id: 'B', label: 'B', type: 'in' }], right: [{ id: 'OUT', label: 'OUT', type: 'out' }] }
    },
    'NOR': {
        category: 'GATE',
        width: 80, height: 60,
        pins: { left: [{ id: 'A', label: 'A', type: 'in' }, { id: 'B', label: 'B', type: 'in' }], right: [{ id: 'OUT', label: 'OUT', type: 'out' }] }
    },
    'XOR': {
        category: 'GATE',
        width: 80, height: 60,
        pins: { left: [{ id: 'A', label: 'A', type: 'in' }, { id: 'B', label: 'B', type: 'in' }], right: [{ id: 'OUT', label: 'OUT', type: 'out' }] }
    },

    '555 Timer': {
        category: 'GATE',
        width: 80, height: 100,
        pins: {
            left: [
                { id: '1', label: 'GND', type: 'ground' },
                { id: '2', label: 'TRIG', type: 'in' },
                { id: '3', label: 'OUT', type: 'out' },
                { id: '4', label: 'RESET', type: 'in' }
            ],
            right: [
                { id: '8', label: 'VCC', type: 'power' },
                { id: '7', label: 'DISCH', type: 'in' },
                { id: '6', label: 'THRES', type: 'in' },
                { id: '5', label: 'CTRL', type: 'in' }
            ]
        },
        defaultProps: {
            state: 'LOW',
            threshold: 0.66,
            trigger: 0.33
        }
    },
    // Sensors
    'Photoresistor': {
        category: 'SENSOR',
        width: 60, height: 60,
        pins: {
            left: [],
            right: [{ id: 'VCC', label: 'VCC', type: 'power' }, { id: 'GND', label: 'GND', type: 'ground' }, { id: 'OUT', label: 'OUT', type: 'analog' }]
        },
        defaultProps: { value: 512 }
    },
    'Ultrasonic': {
        category: 'SENSOR',
        width: 80, height: 50,
        pins: {
            left: [{ id: 'TRIG', label: 'TRIG', type: 'in' }, { id: 'ECHO', label: 'ECHO', type: 'out' }],
            right: [{ id: 'VCC', label: 'VCC', type: 'power' }, { id: 'GND', label: 'GND', type: 'ground' }]
        },
        defaultProps: { value: 100 } // cm
    },

    // Inputs / Outputs
    'Toggle Switch': {
        category: 'INPUT',
        width: 60, height: 40,
        pins: { left: [], right: [{ id: 'OUT', label: 'OUT', type: 'out' }] },
        defaultProps: { state: false }
    },
    'LED Lamp': {
        category: 'OUTPUT',
        width: 40, height: 40,
        pins: { left: [{ id: 'IN', label: 'IN', type: 'in' }], right: [] },
        defaultProps: { color: 'red' }
    },
    'Push Button': {
        category: 'INPUT',
        width: 40, height: 40,
        pins: { left: [], right: [{ id: 'OUT', label: 'OUT', type: 'out' }] },
        defaultProps: { pressed: false }
    },
    'Potentiometer': {
        category: 'INPUT',
        width: 50, height: 50,
        pins: { left: [{ id: 'VCC', label: 'VCC' }, { id: 'GND', label: 'GND' }], right: [{ id: 'OUT', label: 'OUT', type: 'analog' }] },
        defaultProps: { rotation: 0 } // 0-1
    },
    '7-Segment': {
        category: 'DISPLAY',
        width: 80, height: 100,
        pins: {
            left: [{ id: 'A', label: 'A' }, { id: 'B', label: 'B' }, { id: 'C', label: 'C' }, { id: 'D', label: 'D' }],
            right: [{ id: 'E', label: 'E' }, { id: 'F', label: 'F' }, { id: 'G', label: 'G' }, { id: 'DP', label: 'DP' }]
        }
    },
    'Oscilloscope': {
        category: 'TOOL',
        width: 180, height: 120,
        pins: {
            left: [{ id: 'IN', label: 'CH1', type: 'in' }],
            right: [{ id: 'GND', label: 'GND', type: 'ground' }]
        },
        defaultProps: {
            history: [], // Buffer for waveform
            timeScale: 100, // ms per div
            voltScale: 1 // V per div
        }
    },
    'Multimeter': {
        category: 'TOOL',
        width: 100, height: 140,
        pins: {
            left: [{ id: 'V+', label: 'V+', type: 'in' }],
            right: [{ id: 'V-', label: 'V-', type: 'ground' }]
        },
        defaultProps: {
            mode: 'VOLTS'
        }
    },

    'Servo Motor': {
        category: 'OUTPUT',
        width: 80, height: 100,
        pins: {
            left: [
                { id: 'SIG', label: 'SIG', type: 'in' },
                { id: 'VCC', label: 'VCC', type: 'power' },
                { id: 'GND', label: 'GND', type: 'ground' }
            ],
            right: []
        },
        defaultProps: { angle: 0 }
    },

    'Breadboard': {
        category: 'TOOL',
        width: 240, height: 480,
        pins: {
            left: Array.from({ length: 30 }, (_, i) => ({ id: `L${i + 1}`, label: `${i + 1}`, type: 'io' })),
            right: Array.from({ length: 30 }, (_, i) => ({ id: `R${i + 1}`, label: `${i + 1}`, type: 'io' }))
        },
        // Power rails will be handled visually/logically as special strips
        defaultProps: { rows: 30 }
    },

    'RGB LED': {
        category: 'OUTPUT',
        width: 50, height: 60,
        pins: {
            left: [
                { id: 'RED', label: 'R', type: 'in' },
                { id: 'GRN', label: 'G', type: 'in' },
            ],
            right: [
                { id: 'BLU', label: 'B', type: 'in' },
                { id: 'GND', label: 'CAT', type: 'ground' }
            ]
        },
        defaultProps: { r: 0, g: 0, b: 0 }
    },

    'PIR Sensor': {
        category: 'SENSOR',
        width: 80, height: 80,
        pins: {
            left: [
                { id: 'VCC', label: 'VCC', type: 'power' },
                { id: 'GND', label: 'GND', type: 'ground' }
            ],
            right: [
                { id: 'OUT', label: 'OUT', type: 'out' }
            ]
        },
        defaultProps: { motion: false }
    }
};
