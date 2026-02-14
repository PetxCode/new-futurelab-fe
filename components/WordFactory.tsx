
import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../App';

declare global {
    interface Window {
        loadPyodide: any;
    }
}

interface User {
    id: string;
    username: string;
    score: number;
    lastSolveTime: number | null;
}

interface BattleQuestion {
    id: number;
    title: string;
    description: string;
    starterCode: string;
    testCase: string;
    input?: string;
    expected?: string;
}

interface WorkOrder {
    id: number;
    title: string;
    description: string;
    input: string;
    expected: string;
    allowedBlocks: string[];
    hint: string;
}

const workOrders: WorkOrder[] = [
    {
        id: 1,
        title: "The Steam Press",
        description: "Materials are coming in small. Use the Power Press to make them BIG (UPPER CASE).",
        input: "iron_ore",
        expected: "IRON_ORE",
        allowedBlocks: ['text_changeCase', 'variables_get', 'variables_set'],
        hint: "Snap the 'to UPPER CASE' block into your 'set material' block."
    },
    {
        id: 2,
        title: "Rust Remover",
        description: "The 'X' marks on these crates are rusty. Replace all 'X' with an empty space.",
        input: "CRATEX01",
        expected: "CRATE 01",
        allowedBlocks: ['text_replace', 'variables_get', 'variables_set', 'text'],
        hint: "Find 'X' and replace with ' ' (a space)."
    },
    {
        id: 3,
        title: "Conveyor Cleaning",
        description: "Loose dust (spaces) at the ends of our gears. Trim them off!",
        input: "   GEAR_V8   ",
        expected: "GEAR_V8",
        allowedBlocks: ['text_trim', 'variables_get', 'variables_set'],
        hint: "The 'trim' block removes spaces from both sides automatically."
    },
    {
        id: 4,
        title: "Label Cutter",
        description: "We only need the first 4 serial codes. Cut the label!",
        input: "BZ99-XP-04",
        expected: "BZ99",
        allowedBlocks: ['text_getSubstring', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use get substring from letter #1 to #4."
    },
    {
        id: 5,
        title: "Quality Stamp",
        description: "Add the '_OK' stamp to the end of every part name.",
        input: "CYLINDER",
        expected: "CYLINDER_OK",
        allowedBlocks: ['text_join', 'variables_get', 'variables_set', 'text'],
        hint: "Join the material with the text '_OK'."
    },
    {
        id: 6,
        title: "Metal Melter",
        description: "These parts are too harsh (UPPER). Melt them down to small parts (lower case).",
        input: "TITANIUM",
        expected: "titanium",
        allowedBlocks: ['text_changeCase', 'variables_get', 'variables_set'],
        hint: "Use the 'to lower case' setting."
    },
    {
        id: 7,
        title: "Gears of Reverse",
        description: "The conveyor is moving backwards! Flip the signal to read it correctly.",
        input: "LANIGIS_TOL",
        expected: "LOT_SIGNAL",
        allowedBlocks: ['text_reverse', 'variables_get', 'variables_set'],
        hint: "Reverse the text to fix the error."
    },
    {
        id: 8,
        title: "Industrial Inventory",
        description: "We need to know how many letters are in this shipment ID.",
        input: "PRODUCTION_LINE_ALPHA",
        expected: "21",
        allowedBlocks: ['text_length', 'variables_get', 'variables_set'],
        hint: "The length block counts every character, including underscores."
    },
    {
        id: 9,
        title: "Serial Reformatter",
        description: "Change all '_' underscores to '-' dashes for the new system.",
        input: "UNIT_99_TYPE_X",
        expected: "UNIT-99-TYPE-X",
        allowedBlocks: ['text_replace', 'variables_get', 'variables_set', 'text'],
        hint: "Find '_' and replace with '-'."
    },
    {
        id: 10,
        title: "The Factory Master",
        description: "Final Order: Trim spaces, Make it ALL CAPS, and Reverse it!",
        input: "   final_assembly   ",
        expected: "YLBMESSA_LANIF",
        allowedBlocks: ['text_trim', 'text_changeCase', 'text_reverse', 'variables_get', 'variables_set'],
        hint: "Nest Reverse inside Upper Case inside Trim!"
    }
];

const WordFactory: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const [currentOutput, setCurrentOutput] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const pyodideRef = useRef<any>(null);
    const orderRef = useRef(workOrders[currentLevelIdx]);

    // Battle State
    const [socket, setSocket] = useState<Socket | null>(null);
    const [battleMode, setBattleMode] = useState<'idle' | 'lobby' | 'battling' | 'results'>('idle');
    const [users, setUsers] = useState<User[]>([]);
    const [username, setUsername] = useState('Operator');
    const [roomId] = useState('battle-factory');
    const [timer, setTimer] = useState(0);
    const [winner, setWinner] = useState<User | null>(null);
    const [leaderboard, setLeaderboard] = useState<User[]>([]);
    const [firstCorrect, setFirstCorrect] = useState<{username: string, time: number} | null>(null);
    const [battleQuestion, setBattleQuestion] = useState<BattleQuestion | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        orderRef.current = workOrders[currentLevelIdx];
    }, [currentLevelIdx]);

    // Auto-load username
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${API_BASE_URL}/api/user/me`, {
                headers: { 'x-auth-token': token }
            })
            .then(res => res.json())
            .then(data => {
                const name = data.name || data.username || 'Operator';
                setUsername(name);
            })
            .catch(err => {
                console.log('Username load failed', err);
                setUsername('Operator');
            });
        }
    }, []);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize Socket
    useEffect(() => {
        const newSocket = io(API_BASE_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Word Factory Battle Connected');
        });

        newSocket.on('room_update', (roomUsers: User[]) => {
            setUsers(roomUsers);
        });

        newSocket.on('battle_started', ({ question, duration }: { question: BattleQuestion, duration: number }) => {
            setBattleMode('battling');
            setBattleQuestion(question);
            setTimer(duration);
            setFirstCorrect(null);
            setIsLevelComplete(false);
            
            // Sync Blockly to the battle question
            toast.success(`Production Run Started: ${question.title}`, { icon: '⚙️' });

            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        });

        newSocket.on('first_correct', ({ username, time }: { username: string, time: number }) => {
            setFirstCorrect({ username, time });
            toast(`${username} met the quota first! (${time}s)`, { icon: '👑' });
        });

        newSocket.on('scores_updated', (updatedUsers: User[]) => {
            setUsers(updatedUsers);
        });

        newSocket.on('submission_result', (result: { success: boolean, points: number, message?: string }) => {
            setIsSubmitting(false);
            if (result.success) {
                if (result.points > 0) {
                    confetti({
                        particleCount: 150,
                        spread: 100,
                        origin: { y: 0.6 },
                        colors: ['#f97316', '#ea580c']
                    });
                    toast.success(`Quota Met! +${result.points} Efficiency Points`, { icon: '🚀' });
                    setIsLevelComplete(true);
                } else {
                    toast(result.message || "Shipment already verified", { icon: 'ℹ️' });
                }
            } else {
                toast.error(result.message || "Quality Rejection. Recalibrate machinery.", { icon: '❌' });
            }
        });

        newSocket.on('round_ended', ({ message }: { message: string }) => {
            toast(message, { icon: '⏱️' });
        });

        newSocket.on('battle_ended', ({ winner, leaderboard }: { winner: User | null, leaderboard: User[] }) => {
            if (timerRef.current) clearInterval(timerRef.current);
            setWinner(winner);
            setLeaderboard(leaderboard);
            setBattleMode('results');
            if (winner) {
                confetti({
                    particleCount: 200,
                    spread: 120,
                    origin: { y: 0.5 }
                });
            }
        });

        return () => {
            newSocket.disconnect();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const joinBattle = () => {
        if (!username.trim()) return toast.error('Identify yourself, Operator.');
        if (socket) {
            socket.emit('join_room', { username, roomId });
            setBattleMode('lobby');
            toast.success("Joined Industrial Hub. Awaiting orders.");
        }
    };

    const startBattle = () => {
        if (socket) socket.emit('start_battle', roomId);
    };

    const submitBattleCode = (codeOverride?: string) => {
        if (!socket || isSubmitting || !battleQuestion) return;
        setIsSubmitting(true);
        const timeTaken = 90 - timer;
        const codeToSubmit = codeOverride || generatedCode;
        socket.emit('submit_code', { roomId, code: codeToSubmit, timeTaken });
    };

    const playAgain = () => {
        setWinner(null);
        setLeaderboard([]);
        setBattleMode('lobby');
    };

    const order = battleMode === 'battling' && battleQuestion ? {
        ...workOrders[0], // fallback
        title: battleQuestion.title,
        description: battleQuestion.description,
        input: battleQuestion.input || "",
        expected: battleQuestion.expected || "",
        allowedBlocks: ['text_changeCase', 'variables_get', 'variables_set', 'text', 'text_replace', 'text_trim', 'text_getSubstring', 'text_join', 'text_reverse', 'text_length', 'math_number']
    } : workOrders[currentLevelIdx];

    useEffect(() => {
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

        const toolbox = {
            kind: 'flyoutToolbox',
            contents: order.allowedBlocks.map(type => ({ kind: 'block', type }))
        };

        if (!workspaceRef.current) {
            workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
                toolbox,
                theme: Blockly.Themes.Classic,
                trashcan: true,
                renderer: 'zelos',
                scrollbars: false,
                move: { scrollbars: false, wheel: true, drag: true },
                zoom: {
                    controls: false,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2,
                    pinch: true
                }
            });

            workspaceRef.current.addChangeListener(() => {
                runLogic();
            });
        } else {
            workspaceRef.current.updateToolbox(toolbox);
            workspaceRef.current.clear();
        }

        const variable = workspaceRef.current.createVariable('material', 'String');
        
        const starterBlock = workspaceRef.current.newBlock('variables_set');
        starterBlock.setFieldValue(variable.getId(), 'VAR');
        starterBlock.initSvg();
        starterBlock.render();
        starterBlock.moveBy(50, 50);

        // In battle mode, we might want to pre-populate with starter code if provided
        if (battleMode === 'battling' && battleQuestion?.starterCode) {
            // Simplified: we just let the user build from scratch for now to match solo experience
        }

        const handleResize = () => {
            if (workspaceRef.current) {
                Blockly.svgResize(workspaceRef.current);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentLevelIdx, battleMode, battleQuestion]);

    const runLogic = async () => {
        if (!workspaceRef.current || !pyodideRef.current) return;
        try {
            let code = pythonGenerator.workspaceToCode(workspaceRef.current);
            code = code.split('\n')
                       .filter(line => !line.trim().match(/^[a-zA-Z_]\w*\s*=\s*None$/))
                       .join('\n')
                       .trim();
            
            setGeneratedCode(code);
            
            // For Battle support, the input is passed via battleQuestion
            const inputData = battleMode === 'battling' ? (battleQuestion?.input || "") : order.input;
            
            pyodideRef.current.globals.set("material", inputData);
            await pyodideRef.current.runPythonAsync(code);
            const result = pyodideRef.current.globals.get("material");
            const outputString = String(result ?? "");
            setCurrentOutput(outputString);

            // AUTO-SUBMIT in battle mode if correct
            if (battleMode === 'battling' && outputString === (battleQuestion?.expected || "")) {
                submitBattleCode(code);
            }
        } catch (e: any) {
            console.error("Pyodide error:", e);
            // Extract only the final error message from the traceback to avoid long tracebacks
            const errorLines = e.message.trim().split('\n');
            const lastLine = errorLines[errorLines.length - 1].trim();
            setCurrentOutput(`[Runtime Error: ${lastLine}]`);
        }
    };

    useEffect(() => {
        if (isPyodideLoaded) {
            runLogic();
        }
    }, [currentLevelIdx, isPyodideLoaded, battleMode, battleQuestion]);

    const submitOrder = () => {
        if (battleMode === 'battling') {
            submitBattleCode();
            return;
        }
        if (currentOutput === order.expected) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f97316', '#ea580c', '#fb923c']
            });
            toast.success("Order Processed! Shipment Ready.", { icon: '📦' });
            setIsLevelComplete(true);
        } else {
            toast.error("Quality Mismatch. Check the machine setup.");
        }
    };

    const nextOrder = () => {
        if (currentLevelIdx < workOrders.length - 1) {
            setCurrentLevelIdx(prev => prev + 1);
            setIsLevelComplete(false);
            setCurrentOutput("");
        } else {
            toast.success("Factory Overdrive! All orders completed!", { icon: '🏭' });
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#1a1a1a] font-inter select-none overflow-hidden border-t border-orange-950">
            {/* Factory Header */}
            <div className="h-16 bg-[#262626] border-b-2 border-orange-600/30 flex items-center px-8 justify-between shrink-0 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />
                <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-900/50 border-2 border-orange-500/40 transform -rotate-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                        <h2 className="text-orange-500 font-black uppercase tracking-tighter leading-none text-xl drop-shadow-md">Word Factory Tycoon</h2>
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2" />
                            Work Order {order.id}: {order.title}
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    {battleMode === 'idle' ? (
                        <button 
                            onClick={joinBattle}
                            className="bg-orange-600/20 hover:bg-orange-600/40 text-orange-500 border border-orange-500/30 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center space-x-2 shadow-inner"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <span>Enter Battle Arena</span>
                        </button>
                    ) : (
                        <div className="flex items-center space-x-3 bg-red-900/20 border border-red-500/30 px-4 py-1.5 rounded-lg">
                             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                             <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Battle mode</span>
                        </div>
                    )}
                    
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Efficiency Rating</span>
                        <div className="flex space-x-1 mt-1">
                            {workOrders.map((l, i) => (
                                <div key={l.id} className={`w-3 h-1 rounded-full transition-all duration-500 ${i <= currentLevelIdx ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-[#333]'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Battle Lobby Overlay */}
                {battleMode === 'lobby' && (
                    <div className="absolute inset-0 z-[100] bg-[#1a1a1a]/95 backdrop-blur-xl flex items-center justify-center p-8">
                        <div className="max-w-2xl w-full bg-[#262626] border-2 border-orange-600/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="p-8 border-b border-orange-900/20 bg-gradient-to-r from-orange-500/5 to-transparent flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-wider italic">String Challenge mode</h2>
                                    <p className="text-orange-500/60 text-[10px] font-black uppercase tracking-[3px] mt-1">waiting for others to Join </p>
                                </div>
                                <div className="bg-orange-600/10 px-4 py-2 rounded-xl border border-orange-500/20">
                                    <span className="text-xs font-black text-orange-500">{users.length} Connected</span>
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto custom-scrollbar pr-2 leading-none">
                                    {users.map((u, i) => (
                                        <div key={i} className="bg-[#1a1a1a] border border-orange-950/30 p-4 rounded-2xl flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-orange-600/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                                                <span className="text-orange-500 font-black text-lg">{u.username[0].toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-black uppercase text-sm">{u.username}</p>
                                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Ready to Challenge</p>
                                            </div>
                                        </div>
                                    ))}
                                    {users.length === 0 && (
                                        <div className="col-span-2 text-center py-12">
                                            <div className="w-12 h-12 bg-orange-600/5 rounded-full border-2 border-dashed border-orange-900/30 flex items-center justify-center mx-auto mb-4">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                                            </div>
                                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Scanning for available users...</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex space-x-4">
                                    <button 
                                        onClick={startBattle}
                                        className="flex-1 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase italic tracking-widest rounded-xl shadow-lg shadow-orange-900/50 transition-all active:scale-95 border-b-4 border-orange-800"
                                    >
                                        Start Battle
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (socket) socket.disconnect();
                                            setBattleMode('idle');
                                        }}
                                        className="px-8 py-4 bg-transparent hover:bg-white/5 text-slate-500 font-black uppercase text-xs tracking-widest rounded-xl border border-slate-800 transition-all"
                                    >
                                        Leave
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Victory Results Overlay */}
                {battleMode === 'results' && (
                    <div className="absolute inset-0 z-[110] bg-[#1a1a1a]/95 backdrop-blur-xl flex items-center justify-center p-8">
                        <div className="max-w-3xl w-full bg-[#262626] border-2 border-orange-600/30 rounded-3xl shadow-[0_0_100px_rgba(249,115,22,0.1)] overflow-hidden">
                            <div className="p-12 text-center bg-gradient-to-b from-orange-500/10 to-transparent border-b border-orange-900/20">
                                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(249,115,22,0.5)] border-4 border-orange-500/50">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                </div>
                                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Production Victory</h2>
                                {winner && (
                                    <p className="text-xl font-black text-orange-500 uppercase tracking-[4px] mt-4 italic">
                                        Operator {winner.username} has stabilized the lines!
                                    </p>
                                )}
                            </div>

                            <div className="p-8">
                                <div className="space-y-4 mb-10 leading-none">
                                    {leaderboard.map((u, i) => (
                                        <div key={i} className={`p-4 rounded-2xl flex items-center justify-between ${i === 0 ? 'bg-orange-600/10 border border-orange-500/30' : 'bg-[#1a1a1a] border border-slate-800'}`}>
                                            <div className="flex items-center space-x-4 leading-none">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${i === 0 ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                                    {i + 1}
                                                </div>
                                                <span className="text-white font-black uppercase text-sm leading-none">{u.username}</span>
                                            </div>
                                            <div className="text-right leading-none">
                                                <span className="text-orange-500 font-black text-xl leading-none">{u.score}</span>
                                                <span className="text-[9px] text-slate-600 font-bold uppercase block tracking-wider leading-none">Efficiency Points</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex space-x-4">
                                    <button 
                                        onClick={playAgain}
                                        className="flex-1 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-900/50 transition-all active:scale-95 border-b-4 border-orange-800"
                                    >
                                        Re-Join Hub
                                    </button>
                                    <button 
                                        onClick={() => setBattleMode('idle')}
                                        className="flex-1 py-4 bg-transparent hover:bg-white/5 text-slate-500 font-black uppercase tracking-widest rounded-xl border border-slate-800 transition-all"
                                    >
                                        Solo Mode
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Live Battle HUD Widgets */}
                {battleMode === 'battling' && (
                    <>
                        {/* Sync Banner */}
                        {firstCorrect && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-orange-600 px-6 py-2 rounded-full border border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center space-x-3 animate-bounce">
                                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                <span className="text-xs font-black text-white uppercase tracking-wider">
                                    champion <span className="underline italic">{firstCorrect.username}</span> solved first! ({firstCorrect.time}s)
                                </span>
                            </div>
                        )}

                        {/* Battle Timer Widget */}
                        <div className="absolute top-4 right-4 z-[90] bg-[#262626] border-2 border-orange-600/30 p-4 rounded-2xl shadow-2xl flex items-center space-x-4">
                            <div className={`text-4xl font-black tabular-nums transition-colors ${timer < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                {timer}s
                            </div>
                            <div className="w-[2px] h-8 bg-orange-900/30" />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Time Remaining</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase shrink-0 leading-none">Production Round</span>
                            </div>
                        </div>

                        {/* Live Performance Leaderboard */}
                        <div className="absolute top-24 right-4 z-[90] w-48 bg-[#262626]/80 backdrop-blur-md border border-orange-900/20 p-4 rounded-2xl shadow-xl space-y-3 leading-none">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[2px] mb-2 border-b border-orange-900/10 pb-2">Live Rankings</h3>
                            {users.sort((a,b) => b.score - a.score).map((u, i) => (
                                <div key={i} className="flex justify-between items-center leading-none">
                                    <div className="flex items-center space-x-2 leading-none">
                                        <span className={`text-[10px] font-black ${i === 0 ? 'text-orange-500' : 'text-slate-600'}`}>#{i+1}</span>
                                        <span className={`text-xs font-bold truncate max-w-[80px] leading-none ${u.id === socket?.id ? 'text-white underline decoration-orange-500' : 'text-slate-400'}`}>
                                            {u.username}
                                        </span>
                                    </div>
                                    <span className="text-xs font-black text-white leading-none">{u.score}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <div className="w-80 border-r-2 border-orange-900/20 flex flex-col bg-[#1f1f1f] shrink-0 relative">
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
                    
                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        <div className="space-y-3 bg-[#262626] p-4 rounded-xl border border-orange-900/30">
                             <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[2px]">Requirements</span>
                             </div>
                             <p className="text-slate-300 text-xs leading-relaxed font-medium italic">"{order.description}"</p>
                        </div>

                        <div className="space-y-4 p-4 bg-[#1a1a1a] rounded-xl border border-slate-800 shadow-inner">
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-2 tracking-widest opacity-60">Raw Material Bin</span>
                                <div className="bg-[#262626] p-3 rounded-lg border-b-4 border-orange-900/50 flex items-center justify-between">
                                    <code className="text-xs font-mono text-orange-400">"{order.input}"</code>
                                    <svg className="w-4 h-4 text-orange-900/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                </div>
                            </div>
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-2 tracking-widest opacity-60">Manifest Target</span>
                                <div className="bg-[#262626] p-3 rounded-lg border-b-4 border-emerald-900/50">
                                    <code className="text-xs font-mono text-emerald-400">"{order.expected}"</code>
                                </div>
                            </div>
                        </div>

                        {/* Conveyor Belt Mockup */}
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10 space-y-3 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-45 transition-transform duration-1000">
                                <svg className="w-24 h-24 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
                            </div>
                            
                            <span className="text-[10px] font-black text-orange-400 uppercase block mb-1 tracking-widest italic">Live Processing</span>
                            <div className="space-y-3 relative z-10">
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Finished Product:</span>
                                    <span className={`text-xs font-mono font-bold ${currentOutput === order.expected ? 'text-emerald-400' : 'text-orange-400'}`}>
                                        {currentOutput ? `"${currentOutput}"` : '---'}
                                    </span>
                                </div>
                                <div className="h-6 bg-[#1a1a1a] rounded-md p-1 border border-slate-800 flex items-center overflow-hidden">
                                     <div className="flex space-x-2 animate-running-belt">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="w-4 h-full bg-slate-800 rounded-sm shrink-0 flex items-center justify-center">
                                                <div className="w-1 h-1 bg-orange-600 rounded-full opacity-30" />
                                            </div>
                                        ))}
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-[#262626] border-t-2 border-orange-950/20">
                         {isLevelComplete ? (
                                <button 
                                onClick={nextOrder}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase italic tracking-tighter rounded-xl shadow-lg shadow-emerald-900/50 transition-all active:scale-95 flex items-center justify-center space-x-2 animate-bounce"
                                >
                                    <span className='tracking-[1px] font-normal text-[14px]'>Go to NEXT Level</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </button>
                         ) : (
                                <button 
                                onClick={submitOrder}
                                disabled={!isPyodideLoaded}
                                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase italic tracking-tighter rounded-xl shadow-lg shadow-orange-900/50 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2 border-b-4 border-orange-800"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className='tracking-[2px]'>{!isPyodideLoaded ? 'Getting Ready...' : 'Run my code'}</span>
                                </button>
                         )}
                         <p className="text-[10px] text-slate-600 text-center font-black tracking-widest mt-4 opacity-50">JUNIOR CODE BY NEXT</p>
                    </div>
                </div>

                {/* Workspace area */}
                <div className="flex-1 relative flex flex-col bg-[#141414]">
                    <div className="flex-1 relative">
                        <div ref={blocklyDivRef} className="absolute inset-0" />
                        
                        {/* Maintenance Hint */}
                        <div className="absolute bottom-6 left-6 z-10 max-w-sm pointer-events-none">
                            <div className="bg-[#262626]/90 backdrop-blur-md border-2 border-orange-900/30 p-3 rounded-xl flex items-start space-x-3 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-transparent" />
                                <div className="p-1.5 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest block mb-0.5">Maintenance Manual</span>
                                    <p className="text-[10px] text-slate-400 font-bold italic leading-tight">"{order.hint}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Custom Industrial Controls Overlay */}
                        <div className="absolute right-6 bottom-32 flex flex-col space-y-2 z-20">
                            <button 
                                onClick={() => {
                                    if (workspaceRef.current) {
                                        const metrics = workspaceRef.current.getMetrics();
                                        workspaceRef.current.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, 1);
                                    }
                                }}
                                className="w-10 h-10 bg-[#262626] border-2 border-orange-600/30 rounded-lg flex items-center justify-center text-orange-500 hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95 group"
                                title="Zoom In"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                            </button>
                            <button 
                                onClick={() => {
                                    if (workspaceRef.current) {
                                        const metrics = workspaceRef.current.getMetrics();
                                        workspaceRef.current.zoom(metrics.viewWidth / 2, metrics.viewHeight / 2, -1);
                                    }
                                }}
                                className="w-10 h-10 bg-[#262626] border-2 border-orange-600/30 rounded-lg flex items-center justify-center text-orange-500 hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95 group"
                                title="Zoom Out"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
                            </button>
                            <button 
                                onClick={() => {
                                    if (workspaceRef.current) {
                                        workspaceRef.current.zoomToFit();
                                        workspaceRef.current.scrollCenter();
                                    }
                                }}
                                className="w-10 h-10 bg-[#262626] border-2 border-orange-600/30 rounded-lg flex items-center justify-center text-orange-500 hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95 group"
                                title="Fit to Machine"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Machine Logic Readout */}
                    <div className="h-28 bg-[#0f0f0f] border-t-4 border-[#262626] flex flex-col overflow-hidden relative">
                        <div className="px-6 py-2 bg-[#1a1a1a] border-b border-orange-900/20 flex items-center justify-between shadow-md">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Compiler Output: Python V3.x</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-wider">Module Status:</span>
                                <span className="text-[8px] font-black text-orange-500 uppercase tracking-wider px-2 py-0.5 bg-orange-500/5 rounded border border-orange-500/10">ACTIVE</span>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs custom-scrollbar">
                            <div className="flex">
                                <span className="text-slate-800 mr-4 select-none italic text-[10px] leading-tight">001<br/>002<br/>003</span>
                                <pre className="text-orange-300/60 italic font-bold leading-tight whitespace-pre-wrap break-all">
                                    {generatedCode || "# Machinery idle. Awaiting configuration blocks..."}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes beltMove {
                    from { transform: translateX(0); }
                    to { transform: translateX(-40px); }
                }
                .animate-running-belt {
                    animation: beltMove 1.5s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #0f0f0f; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f97316; }

                /* Blockly Theming for Industrial */
                .blocklyTreeLabel { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 13px; color: #fb923c !important; text-transform: uppercase; letter-spacing: 1px; }
                .blocklyTreeRow { padding: 12px 16px; border-radius: 8px; margin: 4px 8px; transition: all 0.3s; background: transparent !important; }
                .blocklyTreeSelected .blocklyTreeLabel { color: #fff !important; }
                .blocklyTreeSelected { background: rgba(249, 115, 22, 0.2) !important; border: 1px solid rgba(249, 115, 22, 0.4); }
                .blocklyMainBackground { stroke: none !important; }
                .blocklyFlyoutBackground { fill: #1a1a1a !important; fill-opacity: 0.98 !important; }
                .blocklyWorkspace { background: #0f0f0f !important; }
                .blocklyToolboxDiv { background: #1a1a1a !important; border-right: 2px solid #262626 !important; padding: 16px 0; width: auto !important; min-width: 140px; }
                .blocklySvg { background: transparent !important; }
                .blocklyText { font-family: 'Inter', sans-serif !important; font-weight: 700 !important; }
                .blocklyPath { stroke-width: 3px !important; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
                .blocklyScrollbarHandle { fill: #262626 !important; }
                .blocklyFlyoutButton { fill: #f97316 !important; }

                /* Industrial Zoom Controls */
                .blocklyZoom>image { opacity: 0.6; transition: opacity 0.2s; cursor: pointer; filter: invert(48%) sepia(79%) border(249, 115, 22) saturate(2476%) hue-rotate(346deg) brightness(118%) contrast(110%); }
                .blocklyZoom>image:hover { opacity: 1; }
            `}} />
        </div>
    );
};

export default WordFactory;
