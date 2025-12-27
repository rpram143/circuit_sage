
// Advanced Logic Engine for Circuit Simulation

/**
 * Net-based Simulation Step
 * 1. Groups all connected pins into "Nets"
 * 2. Identifies drivers for each net
 * 3. Propagates driver values to all points in the net
 */
export function runSimulationStep(components, wires) {
    const pinKey = (compId, pinId) => `${compId}-${pinId}`;

    // 1. Build Nets (Disjoint Set or Adjacency List)
    // We'll use a simple adjacency list and BFS to find connected components (nets)
    const adj = {};
    const allPins = new Set();

    components.forEach(comp => {
        // We need component defs to know which pins exist? 
        // Or just rely on what's wired + sources.
        // For now, let's just collect pins mentioned in wires or components.
    });

    wires.forEach(w => {
        const p1 = pinKey(w.startCompId, w.startPinLabel);
        const p2 = pinKey(w.endCompId, w.endPinLabel);
        if (!adj[p1]) adj[p1] = [];
        if (!adj[p2]) adj[p2] = [];
        adj[p1].push(p2);
        adj[p2].push(p1);
        allPins.add(p1);
        allPins.add(p2);
    });

    const nets = [];
    const visited = new Set();

    // Breadboard Row Shorts: L1-R1, L2-R2...
    components.forEach(comp => {
        if (comp.type === 'Breadboard') {
            for (let i = 1; i <= (comp.rows || 30); i++) {
                const p1 = pinKey(comp.id, `L${i}`);
                const p2 = pinKey(comp.id, `R${i}`);
                if (!adj[p1]) adj[p1] = [];
                if (!adj[p2]) adj[p2] = [];
                adj[p1].push(p2);
                adj[p2].push(p1);
                allPins.add(p1);
                allPins.add(p2);
            }
        }
    });

    allPins.forEach(pin => {
        if (!visited.has(pin)) {
            const net = [];
            const queue = [pin];
            visited.add(pin);
            while (queue.length > 0) {
                const p = queue.shift();
                net.push(p);
                (adj[p] || []).forEach(neighbor => {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                });
            }
            nets.push(net);
        }
    });

    // 2. Identify Drivers and calculate Output values
    const pinValues = {}; // Driven values
    const componentOutputs = {}; // compId -> { pinId: value }

    components.forEach(comp => {
        const outputs = {};

        // Logic Gates
        if (comp.category === 'GATE') {
            const inA = comp.inputs?.A || 0;
            const inB = comp.inputs?.B || 0;
            const inVal = comp.inputs?.IN || 0;
            let out = 0;
            switch (comp.type) {
                case 'AND': out = (inA && inB) ? 1 : 0; break;
                case 'OR': out = (inA || inB) ? 1 : 0; break;
                case 'NOT': out = inVal ? 0 : 1; break;
                case 'NAND': out = (inA && inB) ? 0 : 1; break;
                case 'NOR': out = (inA || inB) ? 0 : 1; break;
                case 'XOR': out = (inA !== inB) ? 1 : 0; break;
            }
            outputs['OUT'] = out;
        }

        // MCU Pins
        if (comp.category === 'MCU') {
            if (comp.pinState) {
                Object.entries(comp.pinState).forEach(([pin, val]) => {
                    outputs[pin] = val;
                });
            }
            outputs['5V'] = 1;
            outputs['3V3'] = 1;
            outputs['GND'] = 0;
        }

        // Inputs
        if (comp.type === 'Toggle Switch') outputs['OUT'] = comp.state ? 1 : 0;
        if (comp.type === 'Push Button') outputs['OUT'] = comp.pressed ? 1 : 0;
        if (comp.type === 'Potentiometer') outputs['OUT'] = comp.rotation || 0; // Analog

        // Sensors
        if (comp.type === 'Photoresistor') {
            // Analog out based on value
            outputs['OUT'] = (comp.value || 512) / 1023;
        }
        if (comp.type === 'Ultrasonic') {
            outputs['ECHO'] = (comp.value || 100) / 400;
        }
        if (comp.type === 'PIR Sensor') {
            outputs['OUT'] = comp.motion ? 1 : 0;
        }

        if (comp.type === '555 Timer') {
            const trg = comp.inputs?.['2'] || 0;
            const thr = comp.inputs?.['6'] || 0;
            const rst = comp.inputs?.['4'] !== undefined ? comp.inputs?.['4'] : 1;
            let state = comp.state || 'LOW';

            if (rst === 0) {
                state = 'LOW';
            } else {
                if (trg < 0.33) state = 'HIGH';
                else if (thr > 0.66) state = 'LOW';
            }
            outputs['3'] = state === 'HIGH' ? 1 : 0;
            comp.state = state;
        }

        componentOutputs[comp.id] = outputs;
        Object.entries(outputs).forEach(([pId, val]) => {
            pinValues[pinKey(comp.id, pId)] = val;
        });
    });

    // 3. Propagate values to Nets
    const netValues = {}; // Index of net -> Value
    const finalPinStates = {}; // All pins on board

    nets.forEach((net, idx) => {
        let val = 0;
        let isAnalog = false;

        // A net's value is the MAX of its drivers (for digital) 
        // or a resolved voltage (for analog, simplified here as max)
        net.forEach(pin => {
            if (pinValues[pin] !== undefined) {
                const driveVal = pinValues[pin];
                if (typeof driveVal === 'number' && driveVal > 0) {
                    val = Math.max(val, driveVal);
                }
            }
        });
        netValues[idx] = val;
        net.forEach(pin => {
            finalPinStates[pin] = val;
        });
    });

    // 4. Update Inputs for next tick
    const nextInputs = {};
    components.forEach(comp => {
        const inputs = {};
        // We need to know which pins are "inputs" for this component
        // For simplicity, we just look at all pins of the component in finalPinStates
        // and if they aren't driven by THIS component, we consider them external inputs
        // This is a bit lazy but works for basic logic.

        // In a better system, we'd use the component's pin definitions.
        // Let's just create an inputs object for all pins.
        const compId = comp.id;
        // Optimization: only track what the component logic actually reads?
        // For now, track everything.
    });

    // Map finalPinStates back to component-relative inputs
    Object.entries(finalPinStates).forEach(([pKey, val]) => {
        const [cId, pId] = pKey.split('-');
        if (!nextInputs[cId]) nextInputs[cId] = {};
        nextInputs[cId][pId] = val;
    });

    return { nextInputs, pinValues: finalPinStates };
}

/**
 * Enhanced MCU Interpreter
 * Supports persistent state, setup/loop, and basic variables.
 */
export function runMCUCode(component, inputs, currentTime, deltaTime = 100) {
    if (!component.code) return { pins: {}, state: {} };

    // Persistent state stored on the component object
    const mcuState = component.mcuState || {
        variables: {},
        initialized: false,
        lastLoopTime: 0,
        serialLog: []
    };

    const pinState = { ...(component.pinState || {}) };

    const digitalWrite = (pin, val) => {
        const pLabel = pin.toString();
        pinState[pLabel] = (val === 'HIGH' || val === 1 || val === '1' || val === true) ? 1 : 0;
    };

    const digitalRead = (pin) => {
        const pLabel = pin.toString();
        return inputs[pLabel] || 0;
    };

    const analogRead = (pin) => {
        const pLabel = (typeof pin === 'number' || !isNaN(pin)) ? `A${pin}` : pin;
        return (inputs[pLabel] || 0) * 1023;
    };

    // --- Execution Context ---
    const code = component.code;

    const getFuncBody = (name) => {
        const regex = new RegExp(`(?:void|int|float|let|var|const)?\\s*${name}\\s*\\(\\s*(?:void)?\\s*\\)\\s*{([\\s\\S]*?)}`, 'm');
        const match = code.match(regex);
        return match ? match[1] : null;
    };

    const setupBody = getFuncBody('setup');
    const loopBody = getFuncBody('loop');

    // 1. Run Setup (only once)
    if (!mcuState.initialized && setupBody) {
        try {
            const varMatches = code.match(/(?:int|float|let|var|const)\s+(\w+)\s*=\s*([^;]+)/gi);
            if (varMatches) {
                varMatches.forEach(m => {
                    const matchArr = m.match(/(?:int|float|let|var|const)\s+(\w+)\s*=\s*([^;]+)/i);
                    if (matchArr) {
                        const [_, name, val] = matchArr;
                        let value = val.trim();
                        if (value === 'HIGH') value = 1;
                        if (value === 'LOW') value = 0;
                        mcuState.variables[name] = parseFloat(value) || 0;
                    }
                });
            }
            mcuState.initialized = true;
        } catch (e) { console.error("MCU Setup Error", e); }
    }

    // 2. Run Loop (every tick)
    if (loopBody) {
        const statements = loopBody.split(/[;\n]/).map(s => s.trim()).filter(s => s && !s.startsWith('//'));
        let currentOffset = 0;
        const sequence = [];

        statements.forEach(statement => {
            const dwMatch = statement.match(/digitalWrite\s*\(\s*([^,]+)\s*,\s*(HIGH|LOW|1|0)\s*\)/i);
            if (dwMatch) {
                let pin = dwMatch[1].trim();
                if (mcuState.variables[pin] !== undefined) pin = mcuState.variables[pin];
                sequence.push({ start: currentOffset, type: 'WRITE', pin: pin, val: dwMatch[2].toUpperCase() });
            }
            const delayMatch = statement.match(/delay\s*\(\s*([^)]+)\s*\)/i);
            if (delayMatch) {
                let dVal = delayMatch[1].trim();
                if (mcuState.variables[dVal] !== undefined) dVal = mcuState.variables[dVal];
                currentOffset += parseInt(dVal) || 0;
            }
        });

        if (sequence.length > 0) {
            const totalDuration = Math.max(currentOffset, 100);
            const cycleTime = currentTime % totalDuration;

            sequence.sort((a, b) => a.start - b.start);
            sequence.forEach(step => {
                if (cycleTime >= step.start) {
                    digitalWrite(step.pin, step.val);
                }
            });
        }
    } else {
        // Fallback for flat code
        const statements = code.split(/[;\n]/).map(s => s.trim()).filter(s => s && !s.startsWith('//'));
        statements.forEach(statement => {
            const dwMatch = statement.match(/digitalWrite\s*\(\s*([^,]+)\s*,\s*(HIGH|LOW|1|0)\s*\)/i);
            if (dwMatch) {
                let pin = dwMatch[1].trim();
                if (mcuState.variables[pin] !== undefined) pin = mcuState.variables[pin];
                digitalWrite(pin, dwMatch[2].toUpperCase());
            }
        });
    }

    return { pinState, mcuState };
}
