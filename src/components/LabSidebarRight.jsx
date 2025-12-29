import { X, Save, RefreshCw, BookOpen, Cpu, Zap, Code } from 'lucide-react';

export default function LabSidebarRight({ selectedComponent, updateComponent, onClose, learnTubeData }) {
    // Show Learn Tube data if no component is selected
    if (!selectedComponent && learnTubeData) {
        return (
            <aside className="w-80 bg-slate-900 border-l border-white/5 flex flex-col h-full shadow-2xl z-20">
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-gradient-to-r from-orange-500/20 to-red-500/20">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-orange-400" />
                        <h2 className="font-bold text-orange-400 text-sm">Learn Tube Circuit</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Project Info */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-2">{learnTubeData.projectName}</h3>
                        <p className="text-xs text-slate-400">{learnTubeData.theory?.concept || 'Circuit Project'}</p>
                    </div>

                    {/* Components List */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-4 h-4 text-cyan-400" />
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Components</label>
                        </div>
                        <div className="space-y-2">
                            {learnTubeData.components.map((comp, idx) => (
                                <div key={idx} className="bg-slate-800 rounded-lg p-2 border border-white/5">
                                    <div className="flex items-start justify-between">
                                        <span className="text-xs text-white font-semibold">{comp.name}</span>
                                        <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded">×{comp.quantity}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1">{comp.specs}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wiring Instructions */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wiring Steps</label>
                        </div>
                        <div className="space-y-2">
                            {learnTubeData.wiring.map((wire, idx) => (
                                <div key={idx} className="bg-slate-800 rounded-lg p-2 border border-white/5">
                                    <div className="flex items-start gap-2">
                                        <span className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">{wire.step}</span>
                                        <p className="text-xs text-slate-300 flex-1">{wire.instruction}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-green-400" />
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Code</label>
                        </div>
                        <div className="bg-slate-950 border border-white/10 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-[10px] font-medium border border-cyan-500/20">
                                    {learnTubeData.code.platform}
                                </span>
                            </div>
                            <pre className="text-green-400 text-[10px] font-mono leading-relaxed overflow-x-auto">
                                {learnTubeData.code.content}
                            </pre>
                        </div>
                    </div>

                    {/* Theory */}
                    {learnTubeData.theory && (
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Theory</label>
                            <div className="bg-slate-800 rounded-lg p-3 border border-white/5 space-y-2">
                                <p className="text-xs text-slate-300">{learnTubeData.theory.explanation}</p>
                                {learnTubeData.theory.keyPoints && learnTubeData.theory.keyPoints.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold text-cyan-400 mb-1">Key Points:</p>
                                        <ul className="space-y-1">
                                            {learnTubeData.theory.keyPoints.map((point, idx) => (
                                                <li key={idx} className="text-[10px] text-slate-400 flex items-start gap-1">
                                                    <span className="text-cyan-400">•</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        );
    }

    if (!selectedComponent) return null;

    const handleChange = (key, value) => {
        updateComponent(selectedComponent.id, { [key]: value });
    };

    return (
        <aside className="w-80 bg-slate-900 border-l border-white/5 flex flex-col h-full shadow-2xl z-20">
            {/* Header */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-slate-800/50">
                <h2 className="font-bold text-slate-200 text-sm">Properties</h2>
                <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {/* Info Block */}
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Component</label>
                    <div className="bg-slate-800 rounded-lg p-3 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">{selectedComponent.type}</span>
                            <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">ID: {selectedComponent.id}</span>
                        </div>
                        <div className="text-xs text-slate-400">
                            ({Math.round(selectedComponent.x)}, {Math.round(selectedComponent.y)})
                        </div>
                    </div>
                </div>

                {/* Properties Form */}
                {selectedComponent.category === 'MCU' && (
                    <div className="flex-1 flex flex-col h-[500px]">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex justify-between">
                            Code Editor
                            <span className="text-[10px] normal-case bg-yellow-500/20 text-yellow-500 px-2 rounded">JS Mode</span>
                        </label>
                        <textarea
                            className="flex-1 w-full bg-slate-950 border border-white/10 rounded-lg p-3 font-mono text-xs text-slate-300 resize-none focus:outline-none focus:border-cyan-500/50 leading-relaxed"
                            value={selectedComponent.code || ''}
                            onChange={(e) => handleChange('code', e.target.value)}
                            spellCheck="false"
                            placeholder="// Write your code here..."
                        />
                        <p className="text-[10px] text-slate-500 mt-2">
                            Supported: digitalWrite(pin, val), delay(ms), pinMode(pin, mode)
                        </p>
                    </div>
                )}


                {selectedComponent.type === 'Photoresistor' && (
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Light Level</label>
                        <input
                            type="range"
                            min="0" max="1023"
                            value={selectedComponent.value || 0}
                            onChange={(e) => handleChange('value', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>Dark ({selectedComponent.value})</span>
                            <span>Bright</span>
                        </div>
                    </div>
                )}

                {selectedComponent.type === 'Ultrasonic' && (
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Distance (cm)</label>
                        <input
                            type="range"
                            min="2" max="400"
                            value={selectedComponent.value || 100}
                            onChange={(e) => handleChange('value', parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="text-right text-xs text-cyan-400 font-mono mt-1">{selectedComponent.value || 100} cm</div>
                    </div>
                )}

                {selectedComponent.type === 'Potentiometer' && (
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Rotation</label>
                        <input
                            type="range"
                            min="0" max="1" step="0.01"
                            value={selectedComponent.rotation || 0}
                            onChange={(e) => handleChange('rotation', parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>0%</span>
                            <span className="text-cyan-400 font-mono">{Math.round((selectedComponent.rotation || 0) * 100)}%</span>
                            <span>100%</span>
                        </div>
                    </div>
                )}

                {selectedComponent.type === 'Push Button' && (
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Interaction</label>
                        <button
                            onMouseDown={() => handleChange('pressed', true)}
                            onMouseUp={() => handleChange('pressed', false)}
                            className={`w-full py-4 rounded-xl font-bold transition-all ${selectedComponent.pressed ? 'bg-cyan-500 text-slate-900 shadow-lg scale-95' : 'bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700'}`}
                        >
                            {selectedComponent.pressed ? 'BUTTON PRESSED' : 'HOLD TO PRESS'}
                        </button>
                    </div>
                )}

                {selectedComponent.type === 'LED Lamp' && (
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Color</label>
                        <div className="flex gap-2">
                            {['red', 'green', 'blue', 'yellow', 'white'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => handleChange('color', color)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all ${selectedComponent.color === color ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </aside>
    );
}
