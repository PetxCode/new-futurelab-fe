
import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
import toast from 'react-hot-toast';

const LogicLab: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [generatedCode, setGeneratedCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const [isOutputExpanded, setIsOutputExpanded] = useState(false);
    const pyodideRef = useRef<any>(null);

    useEffect(() => {
        // ... (existing loadPyodide and injection logic)
        const loadPyodide = async () => {
            if (window.loadPyodide) {
                if (!pyodideRef.current) {
                    try {
                        pyodideRef.current = await window.loadPyodide({
                            indexURL: "/pyodide/"
                        });
                        setIsPyodideLoaded(true);
                    } catch (err) {
                        console.error("Pyodide loading failed", err);
                    }
                } else {
                    setIsPyodideLoaded(true);
                }
                return;
            }

            const script = document.createElement('script');
            script.src = "/pyodide/pyodide.js";
            script.onload = async () => {
                try {
                    pyodideRef.current = await window.loadPyodide({
                        indexURL: "/pyodide/"
                    });
                    setIsPyodideLoaded(true);
                } catch (err) {
                    console.error("Pyodide loading failed", err);
                }
            };
            document.body.appendChild(script);
        };

        loadPyodide();

        if (!blocklyDivRef.current) return;

        // Custom toolbox ...
        const toolbox = {
            kind: 'categoryToolbox',
            contents: [
                {
                    kind: 'category',
                    name: 'Logic',
                    colour: '210',
                    contents: [
                        { kind: 'block', type: 'controls_if' },
                        { kind: 'block', type: 'logic_compare' },
                        { kind: 'block', type: 'logic_operation' },
                        { kind: 'block', type: 'logic_negate' },
                        { kind: 'block', type: 'logic_boolean' },
                    ]
                },
                {
                    kind: 'category',
                    name: 'Loops',
                    colour: '120',
                    contents: [
                        { kind: 'block', type: 'controls_repeat_ext' },
                        { kind: 'block', type: 'controls_whileUntil' },
                        { kind: 'block', type: 'controls_for' },
                    ]
                },
                {
                    kind: 'category',
                    name: 'Math',
                    colour: '230',
                    contents: [
                        { kind: 'block', type: 'math_number' },
                        { kind: 'block', type: 'math_arithmetic' },
                        { kind: 'block', type: 'math_single' },
                        { kind: 'block', type: 'math_random_int' },
                    ]
                },
                {
                    kind: 'category',
                    name: 'Text',
                    colour: '160',
                    contents: [
                        { kind: 'block', type: 'text' },
                        { kind: 'block', type: 'text_print' },
                        { kind: 'block', type: 'text_join' },
                    ]
                },
                {
                    kind: 'sep'
                },
                {
                    kind: 'category',
                    name: 'Variables',
                    custom: 'VARIABLE',
                    colour: '330'
                },
                {
                    kind: 'category',
                    name: 'Functions',
                    custom: 'PROCEDURE',
                    colour: '290'
                }
            ]
        };

        if (!workspaceRef.current) {
            workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
                toolbox,
                theme: Blockly.Themes.Classic,
                trashcan: true,
                renderer: 'zelos',
                zoom: {
                    controls: true,
                    wheel: true,
                    startScale: 0.9,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2,
                    pinch: true
                },
                grid: {
                    spacing: 20,
                    length: 3,
                    colour: '#1e293b',
                    snap: true
                }
            });

            workspaceRef.current.addChangeListener((e: any) => {
                if (e.type === Blockly.Events.BLOCK_MOVE || e.type === Blockly.Events.BLOCK_CHANGE || e.type === Blockly.Events.BLOCK_DELETE) {
                    const code = pythonGenerator.workspaceToCode(workspaceRef.current);
                    setGeneratedCode(code);
                }
            });
        }

        const handleResize = () => {
            if (workspaceRef.current) {
                Blockly.svgResize(workspaceRef.current);
            }
        };

        window.addEventListener('resize', handleResize);
        setTimeout(handleResize, 100);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const runProgram = async () => {
        if (!workspaceRef.current || !pyodideRef.current) return;
        
        setIsRunning(true);
        setConsoleOutput([]); // Clear console
        
        let code = pythonGenerator.workspaceToCode(workspaceRef.current);
        
        // Remove global None initializations to keep output clean and avoid shadowing
        code = code.replace(/^[a-zA-Z_]\w*\s*=\s*None\n/gm, '');
        
        setGeneratedCode(code);
        
        try {
            // Redirect stdout
            pyodideRef.current.setStdout({
                batched: (text: string) => {
                    setConsoleOutput(prev => [...prev, text]);
                }
            });

            await pyodideRef.current.runPythonAsync(code);
            toast.success('Program finished!');
        } catch (err: any) {
            console.error('Logic Lab Error:', err);
            setConsoleOutput(prev => [...prev, `[ERROR]: ${err.message}`]);
            toast.error('Error in your logic!');
        } finally {
            setIsRunning(false);
        }
    };

    const clearWorkspace = () => {
        if (workspaceRef.current) {
            workspaceRef.current.clear();
            setConsoleOutput([]);
            setGeneratedCode("");
            toast('Workspace cleared', { icon: '🧹' });
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-950 text-white font-inter overflow-hidden border-t border-slate-800">
            {/* Header */}
            <div className="flex bg-slate-900 h-14 items-center px-6 border-b border-slate-800 shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" /></svg>
                    </div>
                    <span className="font-black uppercase tracking-tighter italic">Logic Lab <span className="text-amber-500">Workshop</span></span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={clearWorkspace}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase rounded-lg border border-slate-700 transition-all"
                    >
                        Clear All
                    </button>
                    <button 
                        onClick={runProgram}
                        disabled={isRunning || !isPyodideLoaded}
                        className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-amber-600/20 transition-all active:scale-95 flex items-center space-x-2 disabled:opacity-50"
                    >
                        {isRunning ? (
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : !isPyodideLoaded ? (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        ) : (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        )}
                        <span>{isRunning ? 'Executing' : !isPyodideLoaded ? 'Loading Engine' : 'Run Logic'}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Toolbox & Workspace */}
                <div className="flex-1 flex flex-col bg-slate-900 border-r border-slate-800 overflow-hidden">
                    <div className="flex-1 relative">
                        <div ref={blocklyDivRef} className="absolute inset-0 w-full h-full" />
                    </div>
                    
                    {/* Live Code Preview for Workshop */}
                    <div className={`${isOutputExpanded ? 'h-96' : 'h-32'} bg-slate-950 border-t border-slate-800 flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}>
                        <div 
                            className="px-4 py-1.5 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-900/80 transition-colors"
                            onClick={() => setIsOutputExpanded(!isOutputExpanded)}
                        >
                            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest italic">Generated Python Logic</span>
                            <button className="text-slate-500 hover:text-amber-500 transition-colors">
                                <svg className={`w-4 h-4 transform transition-transform duration-300 ${isOutputExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <pre className="font-mono text-[11px] text-amber-100/60 leading-relaxed italic">
                                {generatedCode || "# Start building to see your Python code here..."}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Vertical Console */}
                <div className="w-full lg:w-80 bg-slate-950 flex flex-col shrink-0">
                    <div className="h-10 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Output Console</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 bg-slate-950 shadow-inner">
                        {consoleOutput.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <p>Ready for input...</p>
                            </div>
                        ) : (
                            consoleOutput.map((log, idx) => (
                                <div key={idx} className="flex items-start space-x-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <span className="text-slate-600 select-none">{idx + 1}</span>
                                    <span className={log.startsWith('[ERROR]') ? 'text-red-400' : 'text-emerald-400'}>{log}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                /* HIGH CONTRAST TOOLBOX FIX */
                .blocklyToolboxDiv { 
                    background-color: #0f172a !important; 
                    border-right: 2px solid #1e293b !important; 
                    padding: 16px 0; 
                    width: 140px !important;
                    color: #fff !important;
                }
                
                .blocklyTreeRoot {
                    background: #0f172a !important;
                }

                .blocklyTreeLabel { 
                    font-family: 'Inter', sans-serif; 
                    font-weight: 700; 
                    font-size: 13px; 
                    color: #94bcff !important; 
                }
                
                .blocklyTreeRow { 
                    padding: 12px 16px; 
                    border-radius: 12px; 
                    margin: 4px 8px; 
                    transition: all 0.2s; 
                    background-color: transparent !important; 
                }
                
                .blocklyTreeRow:hover { 
                    background-color: rgba(51, 65, 85, 0.5) !important; 
                }
                
                .blocklyTreeSelected .blocklyTreeLabel { 
                    color: #fff !important; 
                }
                
                .blocklyTreeSelected { 
                    background-color: rgba(79, 70, 229, 0.4) !important; 
                    border: 1px solid rgba(79, 70, 229, 0.5); 
                }
                
                .blocklyMainBackground { stroke: none !important; }
                .blocklyFlyoutBackground { fill: #0f172a !important; fill-opacity: 0.98 !important; }
                .blocklyWorkspace { background: #020617 !important; }
                .blocklySvg { background: transparent !important; }
                .blocklyText { font-family: 'Inter', sans-serif !important; font-weight: 600 !important; }
                .blocklyHtmlInput { font-family: 'Inter', sans-serif !important; border-radius: 4px !important; }
                .blocklyPath { stroke-width: 2px !important; }
                .blocklyMenuItemContent { font-family: 'Inter', sans-serif !important; font-weight: 600 !important; }
                .blocklyScrollbarHandle { fill: #1e293b !important; }
                
                /* Ensure no nested divs are white */
                .blocklyToolboxDiv div {
                    background-color: transparent !important;
                }
            `}} />
        </div>
    );
};

export default LogicLab;
