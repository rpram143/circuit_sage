import { X, Save, RefreshCw } from 'lucide-react';

export default function LabSidebarRight({ selectedComponent, updateComponent, onClose }) {
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
