import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, Save, Settings, Plus, MousePointer2, X, Cpu, Wifi, Radio, Zap, Monitor, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';
import { LAB_COMPONENTS } from '../data/labComponents';
import LabSidebarRight from '../components/LabSidebarRight';
import { runSimulationStep, runMCUCode } from '../utils/LabLogicEngine';

export default function LabSimulator() {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [components, setComponents] = useState([]);
    const [wires, setWires] = useState([]);
    const [drawingWire, setDrawingWire] = useState(null);
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [simState, setSimState] = useState({ pins: {}, inputs: {} }); // Simulation State
    const [time, setTime] = useState(0);
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
    const GRID_SIZE = 20;

    const canvasRef = useRef(null);

    // --- Simulation Loop ---
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setTime(t => t + 100);

                // 1. Run MCU Logic Code first to update their internal pin states
                const updatedComponents = components.map(comp => {
                    if (comp.category === 'MCU' && comp.code) {
                        const { pinState, mcuState } = runMCUCode(
                            comp,
                            simState.inputs[comp.id] || {},
                            time
                        );
                        return { ...comp, pinState, mcuState };
                    }
                    return comp;
                });

                // 2. Run Circuit Logic
                const { nextInputs, pinValues } = runSimulationStep(updatedComponents, wires);

                // 3. Update component-specific internal data (like Oscilloscope history)
                const finalComponents = updatedComponents.map(comp => {
                    const compInputs = nextInputs[comp.id] || {};
                    if (comp.type === 'Oscilloscope') {
                        const val = compInputs.IN || 0;
                        const history = [...(comp.history || []), val].slice(-50);
                        return { ...comp, history };
                    }
                    if (comp.type === 'Servo Motor') {
                        const sig = compInputs.SIG || 0;
                        return { ...comp, angle: sig * 180 };
                    }
                    if (comp.type === 'RGB LED') {
                        return {
                            ...comp,
                            r: compInputs.RED || 0,
                            g: compInputs.GRN || 0,
                            b: compInputs.BLU || 0
                        };
                    }
                    return comp;
                });

                setComponents(finalComponents);
                setSimState({ pins: pinValues, inputs: nextInputs });

            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, components, wires, time, simState]);

    // Helper to get component definition
    const getDef = (type) => LAB_COMPONENTS[type] || {};

    const handleDragStart = (e, type) => {
        e.dataTransfer.setData('componentType', type);
    };

    const snapToGrid = (val) => Math.round(val / GRID_SIZE) * GRID_SIZE;

    const handleWheel = (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.95 : 1.05;
            const newScale = Math.min(Math.max(0.2, transform.scale * delta), 3);
            setTransform(prev => ({ ...prev, scale: newScale }));
        } else {
            setTransform(prev => ({
                ...prev,
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY
            }));
        }
    };

    const handleCanvasMouseDown = (e) => {
        // Middle click, Alt+Left click, OR just Left click on background to pan
        if (e.button === 1 || e.button === 0 || (e.button === 0 && e.altKey)) {
            const startX = e.clientX - transform.x;
            const startY = e.clientY - transform.y;

            // Visual feedback: change cursor to grabbing
            if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';

            const onMouseMove = (moveE) => {
                setTransform(prev => ({
                    ...prev,
                    x: moveE.clientX - startX,
                    y: moveE.clientY - startY
                }));
            };

            const onMouseUp = () => {
                if (canvasRef.current) canvasRef.current.style.cursor = '';
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('componentType');
        if (!type || !LAB_COMPONENTS[type]) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const def = LAB_COMPONENTS[type];

        const x = snapToGrid((e.clientX - canvasRect.left - transform.x) / transform.scale - (def.width / 2));
        const y = snapToGrid((e.clientY - canvasRect.top - transform.y) / transform.scale - (def.height / 2));

        const newComponent = {
            id: Date.now(),
            type,
            category: def.category,
            x,
            y,
            ...def.defaultProps
        };
        setComponents([...components, newComponent]);
        setSelectedComponentId(newComponent.id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const removeComponent = (id, e) => {
        e.stopPropagation();
        setComponents(components.filter(c => c.id !== id));
        setWires(wires.filter(w => w.startCompId !== id && w.endCompId !== id));
        if (selectedComponentId === id) setSelectedComponentId(null);
    };

    const updateComponent = (id, updates) => {
        setComponents(components.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const handleComponentDrag = (id, e) => {
        // Simple drag implementation could go here
    };

    // --- Wiring Logic ---

    const handlePinClick = (e, compId, pinSide, pinIndex, pinLabel, pinId) => {
        e.stopPropagation();

        if (drawingWire) {
            if (drawingWire.startCompId === compId && drawingWire.startPin === pinId) {
                setDrawingWire(null); // Cancel
                return;
            }

            const newWire = {
                id: Date.now(),
                startCompId: drawingWire.startCompId,
                startPinLabel: drawingWire.startPinLabel,
                startPinSide: drawingWire.startPinSide,
                endCompId: compId,
                endPinLabel: pinId, // Using ID as label for logic
                endPinSide: pinSide,
            };
            setWires([...wires, newWire]);
            setDrawingWire(null);
        } else {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            setDrawingWire({
                startCompId: compId,
                startPinLabel: pinId,
                startPinSide: pinSide,
                currentX: (e.clientX - canvasRect.left - transform.x) / transform.scale,
                currentY: (e.clientY - canvasRect.top - transform.y) / transform.scale
            });
        }
    };

    const handleComponentMouseDown = (id, e) => {
        if (e.button !== 0 || e.altKey) return; // Only left click (without alt) to drag
        e.stopPropagation();
        setSelectedComponentId(id);

        const comp = components.find(c => c.id === id);
        if (!comp) return;

        const startX = e.clientX;
        const startY = e.clientY;
        const initialCompX = comp.x;
        const initialCompY = comp.y;

        const onMouseMove = (moveE) => {
            const dx = (moveE.clientX - startX) / transform.scale;
            const dy = (moveE.clientY - startY) / transform.scale;

            setComponents(prev => prev.map(c =>
                c.id === id ? { ...c, x: snapToGrid(initialCompX + dx), y: snapToGrid(initialCompY + dy) } : c
            ));
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const handleCanvasMouseMove = (e) => {
        if (drawingWire) {
            const canvasRect = canvasRef.current.getBoundingClientRect();
            setDrawingWire({
                ...drawingWire,
                currentX: (e.clientX - canvasRect.left - transform.x) / transform.scale,
                currentY: (e.clientY - canvasRect.top - transform.y) / transform.scale
            });
        }
    };

    const applyZoom = (delta) => {
        setTransform(prev => {
            const newScale = Math.min(Math.max(0.2, prev.scale * delta), 3);
            return { ...prev, scale: newScale };
        });
    };

    // --- Rendering ---

    const Pin = ({ side, pin, comp, index, total }) => {
        const isLeft = side === 'left';
        // Distribute pins evenly
        let topPercent = 10 + (index / (Math.max(1, total - 1))) * 80;
        if (total === 1) topPercent = 50;

        // Check if pin is HIGH (only if playing)
        const pinKey = `${comp.id}-${pin.id}`;
        const isHigh = isPlaying && simState.pins[pinKey] === 1;
        const isDrawingStart = drawingWire && drawingWire.startPinLabel === pin.id && drawingWire.startCompId === comp.id;

        return (
            <div
                className={`absolute flex items-center group/pin ${isLeft ? '-left-2' : '-right-2'}`}
                style={{ top: `${topPercent}%` }}
                onClick={(e) => handlePinClick(e, comp.id, side, index, pin.label, pin.id)}
            >
                {/* Pin Head */}
                <div
                    className={`w-3.5 h-3.5 border-2 rounded-full cursor-crosshair z-50 transition-all duration-300 ${isDrawingStart
                        ? 'bg-cyan-400 border-white scale-125 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                        : isHigh
                            ? 'bg-red-500 border-red-200 shadow-[0_0_12px_rgba(239,68,68,1)]'
                            : 'bg-slate-600 border-slate-800 hover:bg-cyan-400 hover:border-white hover:scale-125 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                        }`}
                    title={pin.label}
                />

                {/* Label Tooltip */}
                <span className={`absolute ${isLeft ? 'left-5' : 'right-5'} text-[8px] font-black tracking-tighter uppercase text-slate-300 opacity-0 group-hover/pin:opacity-100 bg-slate-900/90 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl`}>
                    {pin.label}
                </span>
            </div>
        );
    };

    const renderComponentVisual = (comp) => {
        const def = getDef(comp.type);
        if (!def) return null;

        const leftPins = def.pins.left || [];
        const rightPins = def.pins.right || [];

        const isSelected = selectedComponentId === comp.id;

        const content = () => {
            if (comp.category === 'MCU') {
                const isArduino = comp.type === 'Arduino Uno';
                const isESP = comp.type === 'ESP32';
                const isPico = comp.type.includes('Pico');
                const mcuPins = comp.pinState || {};

                return (
                    <div className={`w-full h-full relative flex flex-col items-center justify-between py-6 shadow-2xl overflow-hidden group/mcu rounded-xl border-2 ${isArduino ? 'bg-blue-900 border-blue-400/30' :
                        isESP ? 'bg-slate-900 border-white/10' :
                            isPico ? 'bg-green-950 border-green-500/30' :
                                'bg-slate-800 border-white/10'}`}>

                        {/* Realistic Board Elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent)]"></div>

                        {/* Board Branding/Details */}
                        <div className="absolute top-8 left-0 right-0 text-center opacity-10 pointer-events-none">
                            <span className="text-[32px] font-black uppercase tracking-tighter text-white select-none whitespace-nowrap">
                                {isArduino ? 'ARDUINO' : isESP ? 'ESPRESSIF' : isPico ? 'RASPBERRY' : ''}
                            </span>
                        </div>

                        {/* Status LEDs */}
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                            <div className="flex flex-col items-center">
                                <span className="text-[5px] text-white/40 font-bold uppercase mb-0.5">PWR</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] border border-white/20"></div>
                            </div>
                            {isArduino && (
                                <div className="flex flex-col items-center">
                                    <span className="text-[5px] text-white/40 font-bold uppercase mb-0.5">L13</span>
                                    <div className={`w-2 h-2 rounded-full transition-all duration-300 border border-white/20 ${mcuPins['13'] ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]' : 'bg-orange-950/40'}`}></div>
                                </div>
                            )}
                        </div>

                        {/* Main IC Package */}
                        <div className="flex flex-col items-center z-10 relative">
                            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 mb-4 group-hover/mcu:border-cyan-500/30 transition-all duration-500 shadow-[20px_20px_40px_rgba(0,0,0,0.6)] transform group-hover/mcu:scale-110">
                                <Cpu className={`${isArduino ? 'text-blue-400' : isESP ? 'text-cyan-400' : isPico ? 'text-green-400' : 'text-slate-400'} w-12 h-12`} />
                            </div>
                            <h3 className="text-sm font-black text-white tracking-[0.2em] text-center px-4 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                {comp.type}
                            </h3>
                        </div>

                        {/* USB/Power Connector Visual */}
                        <div className="absolute top-0 left-4 w-6 h-8 bg-slate-700/50 border-x border-b border-white/10 rounded-b-md shadow-inner"></div>

                        {/* Silk Screen Lines */}
                        <div className="absolute bottom-4 left-6 right-6 h-[1px] bg-white/5 shadow-sm"></div>
                    </div>
                );
            }
            if (comp.category === 'SENSOR') {
                return (
                    <div className="w-full h-full glass-card border-orange-500/30 rounded-2xl flex flex-col items-center justify-center shadow-xl group/sensor">
                        <div className="p-2 rounded-full bg-orange-500/10 mb-1 group-hover/sensor:scale-110 transition-transform">
                            <Radio className="text-orange-400 w-6 h-6" />
                        </div>
                        <span className="text-[8px] font-black text-orange-200 uppercase tracking-widest text-center px-1 leading-none">{comp.type}</span>
                    </div>
                );
            }
            if (comp.category === 'GATE') {
                return (
                    <div className="w-full h-full glass-card border-cyan-500/30 rounded-xl flex flex-col items-center justify-center relative shadow-lg overflow-hidden group/gate">
                        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover/gate:opacity-100 transition-opacity"></div>
                        <span className="font-black text-lg text-white group-hover:text-cyan-400 transition-colors">{comp.type}</span>
                    </div>
                );
            }
            if (comp.type === 'LED Lamp') {
                const isOn = isPlaying && (simState.inputs[comp.id]?.IN > 0);
                const colorMap = {
                    red: 'rgba(239, 68, 68, 0.8)',
                    green: 'rgba(34, 197, 94, 0.8)',
                    blue: 'rgba(59, 130, 246, 0.8)',
                    yellow: 'rgba(234, 179, 8, 0.8)',
                    white: 'rgba(255, 255, 255, 0.8)'
                };
                const glowColor = colorMap[comp.color || 'red'];

                return (
                    <div className={`w-full h-full rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${isOn
                        ? 'border-white'
                        : 'bg-slate-900 border-white/10 shadow-inner'
                        }`}
                        style={{ backgroundColor: isOn ? glowColor : 'transparent', boxShadow: isOn ? `0 0 30px ${glowColor}` : 'none' }}>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent ${isOn ? 'opacity-100' : 'opacity-0'}`}></div>
                        <Zap className={`w-6 h-6 ${isOn ? 'text-white' : 'text-slate-800'}`} />
                    </div>
                );
            }
            if (comp.type === 'Potentiometer') {
                return (
                    <div className="w-full h-full glass-card border-slate-700 rounded-full flex items-center justify-center relative shadow-lg overflow-hidden group/pot">
                        <div className="w-[85%] h-[85%] rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                            <div
                                className="w-1 h-full bg-cyan-500 rounded-full transition-transform duration-300 origin-center"
                                style={{
                                    height: '50%',
                                    marginBottom: '50%',
                                    transform: `rotate(${(comp.rotation || 0) * 270 - 135}deg)`
                                }}
                            ></div>
                        </div>
                        <span className="absolute bottom-2 text-[6px] font-black text-slate-500">POT</span>
                    </div>
                )
            }
            if (comp.type === 'Toggle Switch') {
                return (
                    <div
                        className={`w-full h-full rounded-xl border-2 cursor-pointer flex items-center justify-center transition-all duration-300 relative overflow-hidden ${comp.state
                            ? 'bg-green-500 border-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                            : 'bg-slate-900 border-white/10 hover:border-white/20'
                            }`}
                        onClick={(e) => { e.stopPropagation(); updateComponent(comp.id, { state: !comp.state }) }}
                    >
                        <div className={`absolute inset-0 bg-white/10 ${comp.state ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300`}></div>
                        <span className={`text-[10px] font-black tracking-widest relative z-10 ${comp.state ? 'text-white' : 'text-slate-500'}`}>
                            {comp.state ? 'ON' : 'OFF'}
                        </span>
                    </div>
                )
            }
            if (comp.type === 'Push Button') {
                return (
                    <div
                        className={`w-full h-full rounded-full border-4 flex items-center justify-center transition-all duration-150 ${comp.pressed
                            ? 'bg-cyan-600 border-cyan-400 scale-90 shadow-inner'
                            : 'bg-slate-800 border-slate-700 hover:border-slate-600 shadow-lg'
                            }`}
                        onMouseDown={() => updateComponent(comp.id, { pressed: true })}
                        onMouseUp={() => updateComponent(comp.id, { pressed: false })}
                    >
                        <div className={`w-1/2 h-1/2 rounded-full ${comp.pressed ? 'bg-cyan-200' : 'bg-slate-900 border border-white/5'}`}></div>
                    </div>
                )
            }
            if (comp.category === 'DISPLAY') {
                const pins = simState.inputs[comp.id] || {};
                return (
                    <div className="w-full h-full bg-slate-950 border-4 border-slate-800 rounded-xl p-3 relative shadow-[inset_0_5px_15px_rgba(0,0,0,1)]">
                        <div className="grid grid-cols-3 gap-0.5 h-full relative">
                            <div className={`absolute top-0 left-2 right-2 h-1 rounded-full ${pins.A ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                            <div className={`absolute top-0 right-0 bottom-1/2 w-1 rounded-full ${pins.B ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                            <div className={`absolute top-1/2 right-0 bottom-0 w-1 rounded-full ${pins.C ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                            <div className={`absolute bottom-0 left-2 right-2 h-1 rounded-full ${pins.D ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                            <div className={`absolute top-1/2 left-0 bottom-0 w-1 rounded-full ${pins.E ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                            <div className={`absolute top-0 left-0 bottom-1/2 w-1 rounded-full ${pins.F ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                            <div className={`absolute top-1/2 left-2 right-2 h-1 -translate-y-1/2 rounded-full ${pins.G ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                            <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full ${pins.DP ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950/20'}`}></div>
                        </div>
                    </div>
                )
            }
            if (comp.type === 'Servo Motor') {
                return (
                    <div className="w-full h-full bg-[#1e293b] rounded-md border-b-4 border-slate-900 shadow-xl flex flex-col items-center justify-center p-2 relative overflow-hidden group/servo">
                        <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center relative shadow-inner">
                            {/* Rotating Horn */}
                            <motion.div
                                className="absolute w-16 h-4 bg-white rounded-full border-2 border-slate-300 shadow-md flex items-center justify-center"
                                animate={{ rotate: comp.angle || 0 }}
                                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                            >
                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            </motion.div>
                        </div>
                        <div className="mt-4 text-[7px] font-black text-slate-500 uppercase tracking-widest">Servo XL-300</div>
                    </div>
                );
            }

            if (comp.type === 'Breadboard') {
                return (
                    <div className="w-full h-full bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-xl shadow-2xl flex flex-col p-4 relative">
                        {/* Power Rails (Mocked visually) */}
                        <div className="h-6 flex justify-between border-b-2 border-red-500/10 mb-4 px-2">
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                        </div>

                        {/* Holes Grid */}
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="grid grid-rows-30 gap-1">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div key={i} className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <div key={j} className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400/20"></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-rows-30 gap-1">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div key={i} className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <div key={j} className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400/20"></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-2 text-center text-[8px] font-black text-slate-400 uppercase tracking-tighter opacity-30">Circuit Sage Prototyping Board</div>
                    </div>
                );
            }

            if (comp.type === 'RGB LED') {
                const r = Math.round((comp.r || 0) * 255);
                const g = Math.round((comp.g || 0) * 255);
                const b = Math.round((comp.b || 0) * 255);
                const color = `rgb(${r}, ${g}, ${b})`;
                const isOn = r > 0 || g > 0 || b > 0;

                return (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 group/rgb">
                        <div
                            className="w-10 h-10 rounded-full border-2 border-white/20 transition-all duration-300 relative shadow-inner"
                            style={{
                                backgroundColor: isOn ? color : 'rgba(255,255,255,0.1)',
                                boxShadow: isOn ? `0 0 25px ${color}` : 'none'
                            }}
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent"></div>
                            {/* Visual LED elements inside */}
                            <div className="absolute inset-2 border border-white/10 rounded-full opacity-50"></div>
                        </div>
                        <div className="mt-1 text-[8px] font-bold text-slate-500">RGB</div>
                    </div>
                );
            }

            if (comp.type === 'PIR Sensor') {
                return (
                    <div className="w-full h-full bg-[#166534] rounded-xl border-4 border-slate-800 shadow-2xl flex flex-col items-center p-2 relative group/pir">
                        {/* The white fresnel lens dome */}
                        <div className="w-14 h-14 rounded-full bg-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)] border-2 border-slate-200 flex items-center justify-center overflow-hidden relative mb-2">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[size:4px_4px]"></div>
                            {comp.motion && (
                                <motion.div
                                    className="absolute inset-0 bg-red-500/10"
                                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            )}
                        </div>

                        <button
                            className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter transition-all ${comp.motion ? 'bg-red-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                            onMouseDown={() => updateComponent(comp.id, { motion: true })}
                            onMouseUp={() => updateComponent(comp.id, { motion: false })}
                        >
                            {comp.motion ? 'Motion!' : 'Test PIR'}
                        </button>
                    </div>
                );
            }

            if (comp.type === 'Oscilloscope') {
                const val = simState.inputs[comp.id]?.IN || 0;
                // We'll update the component's history property in the main loop, 
                // but just in case, we'll slice it here for the visual.
                const history = comp.history || [];

                return (
                    <div className="w-full h-full bg-slate-900 border-2 border-slate-700 rounded-lg flex flex-col relative overflow-hidden shadow-2xl">
                        <div className="bg-slate-800 px-2 py-0.5 border-b border-white/5 flex justify-between items-center text-[6px] font-black tracking-widest text-slate-400">
                            <span>OSCILLOSCOPE CH1</span>
                            <span className="text-cyan-400">RUNNING</span>
                        </div>
                        <div className="flex-1 bg-black/50 relative">
                            {/* Grid lines */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                            <svg className="absolute inset-0 w-full h-full">
                                <polyline
                                    fill="none"
                                    stroke="#22d3ee"
                                    strokeWidth="1.5"
                                    points={history.map((v, i) => `${(i / Math.max(1, history.length - 1)) * 180},${100 - (v * 80)}`).join(' ')}
                                    className="drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]"
                                />
                            </svg>
                        </div>
                        <div className="bg-slate-800 h-4 px-2 flex items-center justify-between text-[6px] font-bold text-slate-500">
                            <span>100ms/div</span>
                            <span>1V/div</span>
                        </div>
                    </div>
                )
            }
            if (comp.type === 'Multimeter') {
                const val = simState.inputs[comp.id]?.['V+'] || 0;
                const reading = (val * 5).toFixed(2);
                return (
                    <div className="w-full h-full bg-orange-600 border-4 border-slate-900 rounded-2xl p-2 flex flex-col items-center gap-2 shadow-2xl group/meter">
                        <div className="w-full h-1/3 bg-slate-100 rounded border-2 border-slate-900 flex items-center justify-center shadow-inner">
                            <span className="font-mono text-xl text-slate-900 font-bold">{reading}</span>
                            <span className="text-[6px] text-slate-600 ml-1">V</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-white/20 rounded-full"></div>
                        </div>
                        <span className="text-[6px] font-black text-white/50 uppercase">Circuit Sage XL</span>
                    </div>
                )
            }

            return (
                <div className={`w-full h-full glass-card rounded-xl flex items-center justify-center p-2`}>
                    <span className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-tighter">{comp.type}</span>
                </div>
            )
        };

        return (
            <div
                className={`absolute group cursor-move hover:z-50 rounded-lg transition-shadow ${isSelected ? 'ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}`}
                style={{
                    width: def.width,
                    height: def.height,
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedComponentId(comp.id); }}
            >
                {content()}
                {leftPins.map((pin, i) => <Pin key={pin.id} side="left" pin={pin} comp={comp} index={i} total={leftPins.length} />)}
                {rightPins.map((pin, i) => <Pin key={pin.id} side="right" pin={pin} comp={comp} index={i} total={rightPins.length} />)}

                {/* Delete Button */}
                <button
                    onClick={(e) => removeComponent(comp.id, e)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg scale-75 hover:scale-100 z-50"
                >
                    <X className="w-3 h-3 text-white" />
                </button>
            </div>
        );
    }

    // Get Pin Coords for SVG
    const getPinCoords = (compId, pinId, pinSide) => {
        const comp = components.find(c => c.id === compId);
        if (!comp) return { x: 0, y: 0 };
        const def = LAB_COMPONENTS[comp.type];
        if (!def) return { x: 0, y: 0 };

        const pins = pinSide === 'left' ? def.pins.left : def.pins.right;
        const index = pins.findIndex(p => p.id === pinId);
        if (index === -1) return { x: 0, y: 0 };

        let topPercent = 10 + (index / (Math.max(1, pins.length - 1))) * 80;
        if (pins.length === 1) topPercent = 50;

        const x = comp.x + (pinSide === 'left' ? -8 : def.width + 8);
        const y = comp.y + (def.height * topPercent / 100);
        return { x, y };
    };

    return (
        <div className="h-screen flex flex-col bg-slate-950 overflow-hidden select-none">
            {/* Top Bar */}
            <header className="h-16 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="font-black text-white text-base tracking-tight">Circuit Sage <span className="text-cyan-400">Lab</span></h1>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">v2.0 Beta • Simulation: {isPlaying ? 'Live' : 'Stopped'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${isPlaying
                            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/40'
                            }`}
                    >
                        {isPlaying ? (
                            <><X className="w-4 h-4" /> Stop Simulation</>
                        ) : (
                            <><Play className="w-4 h-4 fill-current" /> Run Simulation</>
                        )}
                    </button>
                    <button
                        onClick={() => { setComponents([]); setWires([]); }}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        title="Clear Workspace"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Save className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                        <Settings className="w-4 h-4 text-slate-500" />
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Toolbox */}
                <aside className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col z-10">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Component Toolbox</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
                        {/* Group components by Category for UI */}
                        {['MCU', 'SENSOR', 'GATE', 'OUTPUT', 'INPUT', 'DISPLAY', 'TOOL'].map(cat => (
                            <div key={cat} className="space-y-3">
                                <h3 className="text-[10px] font-bold text-cyan-500/80 mb-2 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                                    {cat}s
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {Object.entries(LAB_COMPONENTS).filter(([_, def]) => def.category === cat).map(([name, def]) => (
                                        <div
                                            key={name}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, name)}
                                            className="group relative bg-white/5 p-3 rounded-xl border border-white/5 hover:border-cyan-500/50 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-all flex items-center gap-3 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="p-2 rounded-lg bg-slate-950/50 border border-white/5 group-hover:border-cyan-500/20">
                                                <Cpu className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Canvas */}
                <main
                    ref={canvasRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseDown={handleCanvasMouseDown}
                    onWheel={handleWheel}
                    onClick={() => { setSelectedComponentId(null); setDrawingWire(null); }}
                    className="flex-1 bg-slate-950 relative overflow-hidden cursor-crosshair group/canvas"
                >
                    {/* Grid - Transforms with the board */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                            backgroundSize: `${GRID_SIZE * transform.scale}px ${GRID_SIZE * transform.scale}px`,
                            backgroundPosition: `${transform.x}px ${transform.y}px`
                        }}
                    ></div>

                    {/* Transformable Board Container */}
                    <div
                        className="absolute inset-0"
                        style={{
                            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                            transformOrigin: '0 0'
                        }}
                    >
                        {/* Wires - Orthogonal (Manhattan) routing */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                            {wires.map(wire => {
                                const start = getPinCoords(wire.startCompId, wire.startPinLabel, wire.startPinSide);
                                const end = getPinCoords(wire.endCompId, wire.endPinLabel, wire.endPinSide);

                                const startPinKey = `${wire.startCompId}-${wire.startPinLabel}`;
                                const isHot = isPlaying && simState.pins[startPinKey] === 1;

                                // Orthogonal path logic
                                const midX = start.x + (end.x - start.x) / 2;
                                const path = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;

                                return (
                                    <path
                                        key={wire.id}
                                        d={path}
                                        stroke={isHot ? '#ef4444' : '#06b6d4'}
                                        strokeWidth="2"
                                        fill="none"
                                        className={`transition-colors duration-200 ${isHot ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : ''}`}
                                    />
                                );
                            })}
                            {drawingWire && (() => {
                                const start = getPinCoords(drawingWire.startCompId, drawingWire.startPinLabel, drawingWire.startPinSide);
                                const midX = start.x + (drawingWire.currentX - start.x) / 2;
                                const path = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${drawingWire.currentY} L ${drawingWire.currentX} ${drawingWire.currentY}`;

                                return (
                                    <path
                                        d={path}
                                        stroke="#94a3b8"
                                        strokeWidth="2"
                                        strokeDasharray="4"
                                        fill="none"
                                        className="opacity-50"
                                    />
                                );
                            })()}
                        </svg>

                        {/* Components */}
                        {components.map(comp => (
                            <div
                                key={comp.id}
                                style={{ position: 'absolute', left: comp.x, top: comp.y }}
                                onMouseDown={(e) => handleComponentMouseDown(comp.id, e)}
                            >
                                {renderComponentVisual(comp)}
                            </div>
                        ))}
                    </div>

                    {components.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center opacity-30 select-none">
                            <div className="p-8 border-2 border-dashed border-slate-600 rounded-2xl">
                                <MousePointer2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-500">Drag components from the left toolbox</p>
                                <p className="text-[10px] mt-2">Drag Background to Pan • Ctrl+Scroll to Zoom</p>
                            </div>
                        </div>
                    )}

                    {/* Zoom / View Controls */}
                    <div className="absolute bottom-10 right-10 flex flex-col gap-2 z-50">
                        <div className="flex flex-col bg-slate-900/80 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-2xl">
                            <button
                                onClick={() => applyZoom(1.1)}
                                className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
                                title="Zoom In (Ctrl + Scroll)"
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>
                            <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
                            <button
                                onClick={() => applyZoom(0.9)}
                                className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
                                title="Zoom Out (Ctrl + Scroll)"
                            >
                                <ZoomOut className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={() => setTransform({ x: 0, y: 0, scale: 1 })}
                            className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all shadow-2xl flex items-center justify-center"
                            title="Reset View"
                        >
                            <Maximize className="w-5 h-5" />
                        </button>
                        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest text-center shadow-xl">
                            {Math.round(transform.scale * 100)}%
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Properties */}
                <LabSidebarRight
                    selectedComponent={components.find(c => c.id === selectedComponentId)}
                    updateComponent={updateComponent}
                    onClose={() => setSelectedComponentId(null)}
                />

            </div>
            <AIAssistant />
        </div>
    );
}
