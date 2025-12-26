import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, Save, Settings, Plus, MousePointer2, X, Cpu, Lightbulb, Wifi, Radio, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';

// Pin Definitions
const MCU_DEFS = {
    'Arduino Uno': {
        left: ['RESET', '3V3', '5V', 'GND', 'VIN', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'],
        right: ['D0/RX', 'D1/TX', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'GND', 'AREF'],
        width: 180,
        height: 320
    },
    'ESP32': {
        left: ['EN', 'VP', 'VN', 'D34', 'D35', 'D32', 'D33', 'D25', 'D26', 'D27', 'D14', 'D12', 'D13', 'GND', 'VIN'],
        right: ['D23', 'D22', 'TX0', 'RX0', 'D21', 'D19', 'D18', 'D5', 'D17', 'D16', 'D4', 'D0', 'D2', 'D15', '3V3'],
        width: 160,
        height: 340
    },
    'Raspberry Pi Pico': {
        left: ['GP0', 'GP1', 'GND', 'GP2', 'GP3', 'GP4', 'GP5', 'GND', 'GP6', 'GP7', 'GP8', 'GP9', 'GND', 'GP10', 'GP11', 'GP12', 'GP13', 'GND', 'GP14', 'GP15'],
        right: ['VBUS', 'VSYS', 'GND', '3V3_EN', '3V3', 'ADC_REF', 'GP28', 'GND', 'GP27', 'GP26', 'RUN', 'GP22', 'GND', 'GP21', 'GP20', 'GP19', 'GP18', 'GND', 'GP17', 'GP16'],
        width: 160,
        height: 480
    }
};

export default function LabSimulator() {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [components, setComponents] = useState([]);
    const [wires, setWires] = useState([]);
    const [drawingWire, setDrawingWire] = useState(null);
    const canvasRef = useRef(null);

    const handleDragStart = (e, type, category) => {
        e.dataTransfer.setData('componentType', type);
        e.dataTransfer.setData('componentCategory', category);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('componentType');
        const category = e.dataTransfer.getData('componentCategory');
        if (!type) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;

        const newComponent = {
            id: Date.now(),
            type,
            category,
            x: x - 40,
            y: y - 40,
        };

        setComponents([...components, newComponent]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const removeComponent = (id, e) => {
        e.stopPropagation();
        setComponents(components.filter(c => c.id !== id));
        setWires(wires.filter(w => w.startCompId !== id && w.endCompId !== id));
    };

    // --- Wiring Logic ---

    const handlePinClick = (e, compId, pinSide, pinIndex, pinLabel) => {
        e.stopPropagation();

        if (drawingWire) {
            if (drawingWire.startCompId === compId && drawingWire.startPin === pinIndex && drawingWire.startPinSide === pinSide) {
                setDrawingWire(null);
                return;
            }

            const newWire = {
                id: Date.now(),
                startCompId: drawingWire.startCompId,
                startPin: drawingWire.startPin,
                startPinSide: drawingWire.startPinSide,
                endCompId: compId,
                endPin: pinIndex,
                endPinSide: pinSide,
                startPinLabel: drawingWire.startPinLabel,
                endPinLabel: pinLabel
            };
            setWires([...wires, newWire]);
            setDrawingWire(null);
        } else {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            setDrawingWire({
                startCompId: compId,
                startPin: pinIndex,
                startPinSide: pinSide,
                startPinLabel: pinLabel,
                currentX: e.clientX - canvasRect.left,
                currentY: e.clientY - canvasRect.top
            });
        }
    };

    const handleCanvasMouseMove = (e) => {
        if (drawingWire) {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            setDrawingWire({
                ...drawingWire,
                currentX: e.clientX - canvasRect.left,
                currentY: e.clientY - canvasRect.top
            });
        }
    };

    // --- Rendering ---

    // Pin Helper
    const Pin = ({ side, index, total, compId, label, mcuHeight }) => {
        // Calculate position
        const isLeft = side === 'left';

        let topPercent = 50;
        if (total > 1) {
            // evenly space pins
            // if MCU, use fixed spacing if provided, or spread
            topPercent = 10 + (index / (total - 1)) * 80;
        }

        return (
            <div
                className={`absolute flex items-center group/pin ${isLeft ? '-left-2' : '-right-2'}`}
                style={{ top: `${topPercent}%` }}
                onClick={(e) => handlePinClick(e, compId, side, index, label)}
            >
                <div className={`w-3 h-3 bg-slate-400 hover:bg-cyan-400 border border-slate-900 rounded-full cursor-crosshair z-50 transition-colors shadow-sm`} title={label} />
                {label && (
                    <span className={`absolute ${isLeft ? 'left-5' : 'right-5'} text-[8px] font-mono font-medium text-slate-400 opacity-0 group-hover/pin:opacity-100 bg-slate-900 px-1 rounded pointer-events-none transition-opacity whitespace-nowrap`}>
                        {label}
                    </span>
                )}
            </div>
        );
    };

    const renderComponentVisual = (comp) => {
        // Define Pins
        let leftPins = [];
        let rightPins = [];

        let width = 'w-16';
        let height = 'h-16';
        let style = {};

        if (comp.category === 'MCU' && MCU_DEFS[comp.type]) {
            const def = MCU_DEFS[comp.type];
            leftPins = def.left;
            rightPins = def.right;
            style = { width: def.width, height: def.height };
        } else if (comp.category === 'GATE') {
            width = 'w-16'; height = 'h-16';
            leftPins = comp.type === 'NOT' ? ['IN'] : ['A', 'B'];
            rightPins = ['OUT'];
        } else if (comp.category === 'SENSOR') {
            width = 'w-16'; height = 'h-16';
            rightPins = ['VCC', 'GND', 'OUT'];
        } else if (comp.category === 'DISPLAY') {
            width = 'w-32'; height = 'h-12';
            leftPins = ['VCC', 'GND', 'SDA', 'SCL'];
        } else if (comp.type === 'Toggle Switch') {
            rightPins = ['OUT'];
        } else if (comp.type === 'LED Lamp') {
            leftPins = ['IN'];
        }

        // Render Content
        const content = () => {
            if (comp.category === 'MCU') {
                return (
                    <div className={`w-full h-full ${comp.type === 'ESP32' ? 'bg-slate-900 border-white/20' : 'bg-teal-700 border-teal-500'} border-2 rounded-lg relative flex flex-col items-center justify-between py-4 shadow-xl`}>
                        {/* Headers */}
                        <div className="flex justify-between w-full px-2">
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        </div>

                        <div className="flex flex-col items-center">
                            <Cpu className="text-white/50 w-8 h-8 mb-2" />
                            <span className="text-xs font-bold text-white tracking-widest text-center px-2">{comp.type}</span>
                        </div>

                        {/* Label Hints */}
                        <div className="w-full px-2 flex justify-between text-[6px] text-white/40 font-mono">
                            <div className="flex flex-col gap-1 items-start">
                                {leftPins.slice(0, 3).map(l => <span key={l}>{l}</span>)}
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                {rightPins.slice(0, 3).map(l => <span key={l}>{l}</span>)}
                            </div>
                        </div>

                        <div className="flex justify-between w-full px-2">
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        </div>
                    </div>
                );
            }
            if (comp.category === 'SENSOR') {
                return (
                    <div className="w-16 h-16 bg-slate-800 border-2 border-orange-500/50 rounded-full flex flex-col items-center justify-center shadow-lg relative">
                        <Radio className="text-orange-400 w-6 h-6" />
                        <span className="text-[8px] text-orange-200 mt-1 uppercase">{comp.type}</span>
                    </div>
                );
            }
            if (comp.category === 'GATE') {
                return (
                    <div className="w-full h-full bg-slate-800 border border-cyan-500/30 rounded-lg flex flex-col items-center justify-center">
                        <span className="font-bold text-xs text-white">{comp.type}</span>
                    </div>
                );
            }
            if (comp.type === 'LCD 16x2') {
                return (
                    <div className="w-full h-full bg-green-900 border-4 border-slate-700 rounded flex items-center justify-center font-mono text-green-400 text-xs shadow-inner">
                        Hello World!
                    </div>
                );
            }
            // Generic / Fallback
            return (
                <div className={`w-full h-full bg-slate-800 border border-white/10 rounded-lg flex flex-col items-center justify-center`}>
                    <span className="text-[10px] text-white text-center p-1">{comp.type}</span>
                </div>
            );
        }

        return (
            <div className={`${!style.width ? width : ''} ${!style.height ? height : ''} relative`} style={style}>
                {content()}
                {leftPins.map((label, i) => <Pin key={`l-${i}`} side="left" index={i} total={leftPins.length} compId={comp.id} label={label} />)}
                {rightPins.map((label, i) => <Pin key={`r-${i}`} side="right" index={i} total={rightPins.length} compId={comp.id} label={label} />)}
            </div>
        )
    }

    // Get Pin Coords for SVG
    const getPinCoords = (compId, pinSide, pinIndex, components) => {
        const comp = components.find(c => c.id === compId);
        if (!comp) return { x: 0, y: 0 };

        // Re-derive dimensions logic from renderVisual
        let width = 64; let height = 64;
        if (comp.category === 'MCU' && MCU_DEFS[comp.type]) {
            width = MCU_DEFS[comp.type].width;
            height = MCU_DEFS[comp.type].height;
        } else if (comp.category === 'DISPLAY') {
            width = 128; height = 48;
        }

        // Re-derive pin counts logic
        let leftPins = []; let rightPins = [];

        if (comp.category === 'MCU' && MCU_DEFS[comp.type]) {
            leftPins = MCU_DEFS[comp.type].left;
            rightPins = MCU_DEFS[comp.type].right;
        } else if (comp.category === 'GATE') {
            leftPins = comp.type === 'NOT' ? ['IN'] : ['A', 'B'];
            rightPins = ['OUT'];
        } else if (comp.category === 'SENSOR') {
            rightPins = ['VCC', 'GND', 'OUT'];
        } else if (comp.category === 'DISPLAY') {
            leftPins = ['VCC', 'GND', 'SDA', 'SCL'];
        } else if (comp.type === 'Toggle Switch') rightPins = ['OUT'];
        else if (comp.type === 'LED Lamp') leftPins = ['IN'];

        const total = pinSide === 'left' ? leftPins.length : rightPins.length;
        let topPercent = 10 + (pinIndex / (total - 1)) * 80;
        if (total === 1) topPercent = 50;

        const x = comp.x + (pinSide === 'left' ? -8 : width + 8); // Offset to match Pin visual
        const y = comp.y + (height * topPercent / 100);

        return { x, y };
    };

    return (
        <div className="h-screen flex flex-col bg-slate-950 overflow-hidden select-none">

            {/* Top Bar */}
            <header className="h-14 border-b border-white/5 bg-slate-900 flex items-center justify-between px-4 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-white/10"></div>
                    <h1 className="font-bold text-slate-200 text-sm">Electronics Lab</h1>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                        {drawingWire ? 'Select target pin...' : 'Ready'}
                    </span>
                </div>

                <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-white/5">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${isPlaying ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500 text-slate-900 hover:bg-green-400'}`}
                    >
                        {isPlaying ? <span className="flex items-center gap-2"><div className="w-2 h-2 bg-current rounded-sm"></div> Stop</span> : <span className="flex items-center gap-2"><Play className="w-4 h-4 fill-current" /> Run Simulation</span>}
                    </button>
                    <button
                        onClick={() => { setComponents([]); setWires([]); }}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-md" title="Clear All">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>

                <div className="w-20"></div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-slate-900 border-r border-white/5 flex flex-col z-10 shadow-xl">
                    <div className="p-4 border-b border-white/5">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Components</h2>
                        <input type="text" placeholder="Search..." className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-700">

                        {/* Microcontrollers */}
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-teal-500"></div> Microcontrollers
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {['Arduino Uno', 'ESP32', 'Raspberry Pi Pico'].map(mcu => (
                                    <div key={mcu} draggable onDragStart={(e) => handleDragStart(e, mcu, 'MCU')} className="bg-slate-800 p-3 rounded-lg border border-white/5 hover:border-teal-500/50 cursor-grab active:cursor-grabbing hover:bg-slate-700 transition-all group">
                                        <Cpu className="w-6 h-6 text-slate-500 group-hover:text-teal-400 mb-2" />
                                        <div className="text-xs font-medium text-slate-300 group-hover:text-white leading-tight">{mcu}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sensors */}
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-orange-500"></div> Sensors
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {['Photoresistor', 'Ultrasonic', 'Temp (DHT11)', 'Motion (PIR)'].map(sensor => (
                                    <div key={sensor} draggable onDragStart={(e) => handleDragStart(e, sensor, 'SENSOR')} className="bg-slate-800 p-3 rounded-lg border border-white/5 hover:border-orange-500/50 cursor-grab active:cursor-grabbing hover:bg-slate-700 transition-all group">
                                        <Wifi className="w-6 h-6 text-slate-500 group-hover:text-orange-400 mb-2" />
                                        <div className="text-xs font-medium text-slate-300 group-hover:text-white leading-tight">{sensor}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gates */}
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-cyan-500"></div> Logic Gates
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'].map(gate => (
                                    <div key={gate} draggable onDragStart={(e) => handleDragStart(e, gate, 'GATE')} className="bg-slate-800 hover:bg-slate-700 border border-white/5 hover:border-cyan-500/30 rounded-lg p-2 flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing group transition-all">
                                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-400">{gate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* IO */}
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-purple-500"></div> Output / Displays
                            </h3>
                            <div className="space-y-2">
                                {['Toggle Switch', 'LED Lamp', 'LCD 16x2', '7-Segment', 'Buzzer'].map(out => (
                                    <div key={out} draggable onDragStart={(e) => handleDragStart(e, out, out.includes('LCD') || out.includes('7') ? 'DISPLAY' : out === 'Toggle Switch' ? 'INPUT' : 'OUT')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-grab active:cursor-grabbing group">
                                        <div className="w-6 h-6 border-2 border-slate-600 rounded flex items-center justify-center group-hover:border-purple-400"><div className="w-2 h-2 bg-slate-600 rounded-full group-hover:bg-purple-400"></div></div>
                                        <span className="text-sm text-slate-400 group-hover:text-white">{out}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Center Canvas */}
                <main
                    ref={canvasRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onMouseMove={handleCanvasMouseMove}
                    onClick={() => setDrawingWire(null)}
                    className="flex-1 bg-slate-950 relative overflow-hidden cursor-crosshair"
                >
                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

                    {/* Wires SVG Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {wires.map(wire => {
                            const start = getPinCoords(wire.startCompId, wire.startPinSide, wire.startPin, components);
                            const end = getPinCoords(wire.endCompId, wire.endPinSide, wire.endPin, components);
                            return (
                                <path
                                    key={wire.id}
                                    d={`M ${start.x} ${start.y} C ${start.x + 50} ${start.y}, ${end.x - 50} ${end.y}, ${end.x} ${end.y}`}
                                    stroke="#06b6d4"
                                    strokeWidth="2"
                                    fill="none"
                                    className="drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]"
                                />
                            );
                        })}
                        {drawingWire && (() => {
                            const start = getPinCoords(drawingWire.startCompId, drawingWire.startPinSide, drawingWire.startPin, components);
                            return (
                                <path
                                    d={`M ${start.x} ${start.y} C ${start.x + 50} ${start.y}, ${drawingWire.currentX - 50} ${drawingWire.currentY}, ${drawingWire.currentX} ${drawingWire.currentY}`}
                                    stroke="#94a3b8"
                                    strokeWidth="2"
                                    strokeDasharray="4"
                                    fill="none"
                                    className="opacity-50"
                                />
                            );
                        })()}
                    </svg>

                    {/* Empty State */}
                    {components.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center opacity-50 select-none">
                            <div>
                                <MousePointer2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-500 text-lg">Drag components from to toolbox to start</p>
                            </div>
                        </div>
                    )}

                    {/* Render Components */}
                    {components.map((comp) => (
                        <div
                            key={comp.id}
                            style={{ left: comp.x, top: comp.y }}
                            className="absolute group cursor-move hover:z-50"
                        >
                            {renderComponentVisual(comp)}

                            {/* Delete Button */}
                            <button
                                onClick={(e) => removeComponent(comp.id, e)}
                                className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg scale-75 hover:scale-100 z-50"
                            >
                                <X className="w-3 h-3 text-white" />
                            </button>
                        </div>
                    ))}
                </main>
            </div>
            <AIAssistant />
        </div>
    );
}
