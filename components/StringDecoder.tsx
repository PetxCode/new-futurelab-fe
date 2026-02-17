
import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../App';

const ScrollbarStyles = () => (
    <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(51, 65, 85, 0.5);
            border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(71, 85, 105, 0.8);
        }
    `}} />
);

interface User {
    id: string;
    username: string;
    score: number;
    lastSolveTime: number | null;
    lastRoundPoints: number | null;
}

interface Question {
    id: number;
    title: string;
    description: string;
    starterCode: string;
    testCase: string;
}

interface Level {
    id: number;
    title: string;
    mission: string;
    signal: string;
    target: string;
    allowedBlocks: string[];
    hint: string;
}

interface StringDecoderProps {
    initialMode?: 'solo' | 'battle';
}

const levels: Level[] = [
    {
        id: 1,
        title: "Clear the Static",
        mission: "The signal has extra spaces at the ends. Trim them off to read the secret.",
        signal: "   SECURE_BASE   ",
        target: "SECURE_BASE",
        allowedBlocks: ['text_trim', 'variables_get', 'variables_set'],
        hint: "Use the 'trim' block to remove empty spaces from the start and end."
    },
    {
        id: 2,
        title: "Uniform Code",
        mission: "The password must be in ALL CAPS to pass the firewall.",
        signal: "password123",
        target: "PASSWORD123",
        allowedBlocks: ['text_changeCase', 'variables_get', 'variables_set'],
        hint: "Change the case of the text to UPPER CASE."
    },
    {
        id: 3,
        title: "Hidden Symbol",
        mission: "There is an extra '#' in the coordinates. Replace it with an empty space.",
        signal: "Agent#Smith",
        target: "Agent Smith",
        allowedBlocks: ['text_replace', 'variables_get', 'variables_set', 'text'],
        hint: "Find the '#' and replace it with a space ' '."
    },
    {
        id: 4,
        title: "Extract the Key",
        mission: "We only need the first 5 characters of this long transmission.",
        signal: "ALPHA_OMEGA_SECRET",
        target: "ALPHA",
        allowedBlocks: ['text_getSubstring', 'variables_get', 'variables_set', 'math_number'],
        hint: "Get a substring starting from the first letter."
    },
    {
        id: 5,
        title: "Mirror Protocol",
        mission: "The intercepted signal is reversed! We need to flip it back to read the actual data.",
        signal: "ESAB_ID_MAIP",
        target: "PIAM_DI_BASE",
        allowedBlocks: ['text_reverse', 'variables_get', 'variables_set'],
        hint: "Use the 'reverse' block to flip the text around."
    },
    {
        id: 6,
        title: "The Secure Bridge",
        mission: "The data packet is split. Join this fragment with '_ACTIVE' to restore the signal.",
        signal: "COMMAND",
        target: "COMMAND_ACTIVE",
        allowedBlocks: ['text_join', 'variables_get', 'variables_set', 'text'],
        hint: "Join the signal variable with the extra text '_ACTIVE'."
    },
    {
        id: 7,
        title: "Left-Side Leak",
        mission: "A specific encryption error added spaces only on the LEFT. Trim them off.",
        signal: "     GHOST_ONE",
        target: "GHOST_ONE",
        allowedBlocks: ['text_trim', 'variables_get', 'variables_set'],
        hint: "Change the trim block to only remove 'leading' spaces."
    },
    {
        id: 8,
        title: "Official ID",
        mission: "Spy aliases must be in 'Title Case' to match the database. Correct this one.",
        signal: "agent penguin",
        target: "Agent Penguin",
        allowedBlocks: ['text_changeCase', 'variables_get', 'variables_set'],
        hint: "Set the case block to 'Title Case'."
    },
    {
        id: 9,
        title: "Signal Statistics",
        mission: "The firewall needs the length of this signal. Calculate how many characters it has.",
        signal: "MISSION_IMPOSSIBLE",
        target: "18",
        allowedBlocks: ['text_length', 'variables_get', 'variables_set'],
        hint: "Use the 'length' block to count the characters."
    },
    {
        id: 10,
        title: "The Omega Protocol",
        mission: "Final Boss! Lowercase it, remove '#' symbols, and trim all spaces.",
        signal: "  #AGENT_#007#  ",
        target: "agent_007",
        allowedBlocks: ['text_changeCase', 'text_replace', 'text_trim', 'variables_get', 'variables_set', 'text'],
        hint: "You need to nest three blocks: Lower Case, Replace, and Trim."
    },
    {
        id: 11,
        title: "Double Agent Shift",
        mission: "The signal is in lower case and has extra underscores. Uppercase it and replace '_' with '-'.",
        signal: "spy_mission_alpha",
        target: "SPY-MISSION-ALPHA",
        allowedBlocks: ['text_changeCase', 'text_replace', 'variables_get', 'variables_set', 'text'],
        hint: "Use Upper Case first, then Replace."
    },
    {
        id: 12,
        title: "Cipher Fragmentation",
        mission: "The signal is reversed and has leading spaces. Trim the leading spaces then flip it!",
        signal: "     _EDOC_T_CRET_ES",
        target: "SE_TERC_T_CODE_",
        allowedBlocks: ['text_trim', 'text_reverse', 'variables_get', 'variables_set'],
        hint: "Trim the leading spaces, then use the reverse block."
    },
    {
        id: 13,
        title: "Binary Echo",
        mission: "We need to join 'SIGNAL:' with the length of the transmission.",
        signal: "TRANSMISSION_XYZ",
        target: "SIGNAL:16",
        allowedBlocks: ['text_join', 'text_length', 'variables_get', 'variables_set', 'text'],
        hint: "Join 'SIGNAL:' with the length of the signal variable."
    },
    {
        id: 14,
        title: "Ghost in the Machine",
        mission: "Remove all '0's from this ghost signal and trim the trailing spaces.",
        signal: "S0P0Y0 0M0I0S0S0I0O0N0    ",
        target: "SPY MISSION",
        allowedBlocks: ['text_replace', 'text_trim', 'variables_get', 'variables_set', 'text'],
        hint: "Replace '0' with nothing, then trim the spaces."
    },
    {
        id: 15,
        title: "The Silent Key",
        mission: "Get the last 4 characters of the signal to find the secret key.",
        signal: "ENCRYPTED_8829",
        target: "8829",
        allowedBlocks: ['text_getSubstring', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use get substring from letter # to last letter."
    },
    {
        id: 16,
        title: "Case Sensitive Bridge",
        mission: "The central server expects 'Title Case' and no '#' symbols. Correct it.",
        signal: "hacker#protocol",
        target: "Hacker Protocol",
        allowedBlocks: ['text_changeCase', 'text_replace', 'variables_get', 'variables_set', 'text'],
        hint: "Replace '#' with ' ', then change case to Title Case."
    },
    {
        id: 17,
        title: "Reversed Metadata",
        mission: "Reverse the signal, then take only the first 3 characters.",
        signal: "XRAY_DELTA",
        target: "ATL",
        allowedBlocks: ['text_reverse', 'text_getSubstring', 'variables_get', 'variables_set', 'math_number'],
        hint: "Reverse first, then get the substring."
    },
    {
        id: 18,
        title: "The Hidden Prefix",
        mission: "Add 'AGENT_' to the start of the lowercase version of the signal.",
        signal: "PHANTOM",
        target: "AGENT_phantom",
        allowedBlocks: ['text_join', 'text_changeCase', 'variables_get', 'variables_set', 'text'],
        hint: "Join 'AGENT_' with the lower case version of the signal."
    },
    {
        id: 19,
        title: "Corrupted Coordinates",
        mission: "The coordinates have '@' instead of '.'. Replace them and trim all spaces.",
        signal: "  12@34@56  ",
        target: "12.34.56",
        allowedBlocks: ['text_replace', 'text_trim', 'variables_get', 'variables_set', 'text'],
        hint: "Replace '@' with '.', then trim both sides."
    },
    {
        id: 20,
        title: "The Split Secret",
        mission: "Joining the reversed signal with '_END'.",
        signal: "TOP_SECRET",
        target: "TERCES_POT_END",
        allowedBlocks: ['text_join', 'text_reverse', 'variables_get', 'variables_set', 'text'],
        hint: "Reverse the signal and join it with '_END'."
    },
    {
        id: 21,
        title: "Deep Scan",
        mission: "Find the length of the signal after removing all hyphens.",
        signal: "A-B-C-D-E-F",
        target: "6",
        allowedBlocks: ['text_length', 'text_replace', 'variables_get', 'variables_set', 'text'],
        hint: "Replace '-' with nothing, then get the length."
    },
    {
        id: 22,
        title: "The Middle Man",
        mission: "Get the characters from position 3 to 7 (inclusive).",
        signal: "INTERCEPT_NODE",
        target: "TERCE",
        allowedBlocks: ['text_getSubstring', 'variables_get', 'variables_set', 'math_number'],
        hint: "Get substring from letter #3 to letter #7."
    },
    {
        id: 23,
        title: "Final Verification",
        mission: "Lowercase it, reverse it, and join it with '!!!'.",
        signal: "ALERT",
        target: "trela!!!",
        allowedBlocks: ['text_join', 'text_changeCase', 'text_reverse', 'variables_get', 'variables_set', 'text'],
        hint: "Change to lower case, reverse, then join with '!!!'."
    },
    {
        id: 24,
        title: "Vault Access",
        mission: "Replace 'X' with '9', 'Y' with '0', and ensure it's trimmed.",
        signal: "  XYXY  ",
        target: "9090",
        allowedBlocks: ['text_replace', 'text_trim', 'variables_get', 'variables_set', 'text'],
        hint: "Use two replace blocks and one trim block."
    },
    {
        id: 25,
        title: "Grand Master Decoder",
        mission: "Ultimate Test: Trim, Reverse, Upper Case, and append '_DONE'.",
        signal: "    final_boss    ",
        target: "SSOB_LANIF_DONE",
        allowedBlocks: ['text_trim', 'text_reverse', 'text_changeCase', 'text_join', 'variables_get', 'variables_set', 'text'],
        hint: "Chain all four operations: Trim, Reverse, Upper Case, then Join with '_DONE'."
    }
];

const StringDecoder: React.FC<StringDecoderProps> = ({ initialMode = 'solo' }) => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const [currentOutput, setCurrentOutput] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const [isOutputExpanded, setIsOutputExpanded] = useState(false);
    const pyodideRef = useRef<any>(null);

    // BATTLE MODE STATE
    const [gameState, setGameState] = useState<'solo' | 'lobby' | 'waiting' | 'battling' | 'results'>(initialMode === 'battle' ? 'waiting' : 'solo');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [username, setUsername] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<{username: string, text: string}[]>([]);
    const [question, setQuestion] = useState<Question | null>(null);
    const [timer, setTimer] = useState(0);
    const [baseDuration, setBaseDuration] = useState(90);
    const [pointsEarned, setPointsEarned] = useState(0);
    const [winner, setWinner] = useState<User | null>(null);
    const [leaderboard, setLeaderboard] = useState<User[]>([]);
    const [firstCorrect, setFirstCorrect] = useState<{username: string, time: number} | null>(null);
    const [lastSolveTime, setLastSolveTime] = useState<{username: string, time: number} | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentRound, setCurrentRound] = useState(1);
    const [totalRounds, setTotalRounds] = useState(5);

    const levelRef = useRef(levels[currentLevelIdx]);

    useEffect(() => {
        levelRef.current = levels[currentLevelIdx];
    }, [currentLevelIdx]);

    const level = levels[currentLevelIdx];

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
            contents: level.allowedBlocks.map(type => ({ kind: 'block', type }))
        };

        if (!workspaceRef.current) {
            workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
                toolbox,
                theme: Blockly.Themes.Classic,
                trashcan: true,
                renderer: 'zelos',
                scrollbars: false,
                move: { scrollbars: false, wheel: true, drag: true }
            });

            workspaceRef.current.addChangeListener(() => {
                runLogic();
            });
        } else {
            workspaceRef.current.updateToolbox(toolbox);
            workspaceRef.current.clear();
        }

        // Initialize variable and pre-populate workspace with "set signal to ..."
        const variable = workspaceRef.current.createVariable('signal', 'String');
        
        // Pre-fill the workspace with a "set signal" block to guide the student
        const starterBlock = workspaceRef.current.newBlock('variables_set');
        starterBlock.setFieldValue(variable.getId(), 'VAR');
        starterBlock.initSvg();
        starterBlock.render();
        starterBlock.moveBy(50, 50);

    }, [currentLevelIdx, gameState, question]); // Re-init on question change

    // MULTIPLAYER SOCKET LOGIC
    useEffect(() => {
        if (!socket) return;

        socket.on('room_update', (users: User[]) => {
            setUsers(users);
        });

        socket.on('receive_message', (message: {username?: string, user?: string, text: string}) => {
            setMessages(prev => [...prev, { 
                username: message.user || message.username || 'System', 
                text: message.text 
            }]);
        });

        socket.on('battle_started', ({ question: newQuestion, duration, currentRound, totalRounds }: {
            question: Question,
            duration: number,
            currentRound: number,
            totalRounds: number
        }) => {
            setGameState('battling');
            setQuestion(newQuestion);
            setTimer(duration);
            setBaseDuration(duration);
            setPointsEarned(0);
            setIsSubmitting(false);
            setCurrentRound(currentRound);
            setTotalRounds(totalRounds);
            setLastSolveTime(firstCorrect);
            setFirstCorrect(null);
            
            // Sync current level idx if possible for UI matching
            // Level 10 questions start at ID 101
            setCurrentLevelIdx(newQuestion.id - 101);
            
            toast.success(`Round ${currentRound} Started! Decode the signal!`);
        });

        socket.on('first_correct', (data: {username: string, time: number}) => {
            setFirstCorrect(data);
            toast(`${data.username} solved it first!`, { icon: '⚡' });
        });

        socket.on('submission_result', (result: { success: boolean, points: number, message?: string }) => {
            setIsSubmitting(false);
            if (result.success) {
                setPointsEarned(result.points);
                toast.success(`Correct! +${result.points} points`);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                toast.error(result.message || "Incorrect solution.");
            }
        });

        socket.on('round_ended', () => {
            toast("Round Ended!", { icon: '⏰' });
        });

        socket.on('battle_ended', ({ winner: finalWinner, leaderboard: finalLeaderboard }: {
            winner: User,
            leaderboard: User[]
        }) => {
            setGameState('results');
            setWinner(finalWinner);
            setLeaderboard(finalLeaderboard);
        });

        return () => {
            socket.off('room_users');
            socket.off('chat_message');
            socket.off('battle_started');
            socket.off('first_correct');
            socket.off('submission_result');
            socket.off('round_ended');
            socket.off('battle_ended');
        };
    }, [socket, firstCorrect]);

    // Timer effect
    useEffect(() => {
        if (gameState !== 'battling' || timer <= 0) return;
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [gameState, timer]);

    const joinRoom = (enteredUsername: string, enteredRoomId: string) => {
        if (!enteredUsername || !enteredRoomId) return;
        
        const newSocket = io(API_BASE_URL);
        setSocket(newSocket);
        setUsername(enteredUsername);
        setRoomId(enteredRoomId);

        newSocket.emit('join_room', { 
            username: enteredUsername, 
            roomId: enteredRoomId, 
            topic: 'spydecoder' 
        });
        
        setGameState('lobby');
    };

    const startBattle = () => {
        if (!socket) return;
        socket.emit('start_battle', roomId);
    };

    const submitCode = () => {
        if (!socket || !question || isSubmitting || pointsEarned > 0) return;
        setIsSubmitting(true);
        const timeTaken = baseDuration - timer;
        socket.emit('submit_code', { roomId, code: generatedCode, timeTaken });
    };

    const leaveBattle = () => {
        if (socket) socket.disconnect();
        setSocket(null);
        setGameState('solo');
        setQuestion(null);
    };

    // Add listener for real-time preview
    const runLogic = async () => {
        if (!workspaceRef.current || !pyodideRef.current) return;
        try {
            let code = pythonGenerator.workspaceToCode(workspaceRef.current);
            
            // AGGRESSIVE CLEANING:
            // Blockly prepends 'var = None' for all variables used.
            // We strip these so they don't overwrite the 'signal' we inject via globals.
            code = code.split('\n')
                       .filter(line => !line.trim().match(/^[a-zA-Z_]\w*\s*=\s*None$/))
                       .join('\n')
                       .trim();
            
            setGeneratedCode(code);
            
            // Set initial variable in Pyodide
            let startSignal = levelRef.current.signal;
            if (gameState === 'battling' && question) {
                // Extract signal from starterCode if it matches signal = '...'
                const match = question.starterCode.match(/signal\s*=\s*'([^']+)'/);
                if (match) startSignal = match[1];
            }
            
            pyodideRef.current.globals.set("signal", startSignal);
            
            // Execute generated code
            await pyodideRef.current.runPythonAsync(code);
            
            // Extract resulting variable
            const result = pyodideRef.current.globals.get("signal");
            setCurrentOutput(String(result ?? ""));
        } catch (e: any) {
            console.error("Pyodide error:", e);
            // Extract only the final error message from the traceback
            const errorLines = e.message.trim().split('\n');
            const lastLine = errorLines[errorLines.length - 1].trim();
            setCurrentOutput(`[Python Error: ${lastLine}]`);
        }
    };

    useEffect(() => {
        if (isPyodideLoaded) {
            runLogic();
        }
    }, [currentLevelIdx, isPyodideLoaded]);

    const checkSolution = () => {
        if (gameState === 'battling') {
            submitCode();
            return;
        }

        if (currentOutput === level.target) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#1e40af', '#60a5fa']
            });
            toast.success("Signal Decoded! Great job, Agent.");
            setIsLevelComplete(true);
        } else {
            toast.error("Your code is not correct. Try again.");
        }
    };

    const nextLevel = () => {
        if (currentLevelIdx < levels.length - 1) {
            setCurrentLevelIdx(prev => prev + 1);
            setIsLevelComplete(false);
            setCurrentOutput("");
        } else {
            toast.success("All missions completed! Level Up!");
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 font-inter select-none">
            <ScrollbarStyles />
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-blue-500/20 flex items-center px-8 justify-between shrink-0">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                    <div>
                        <h2 className="text-white font-black uppercase italic tracking-tighter leading-none">Spy Decoder</h2>
                        <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Mission {level.id}: {level.title}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {gameState === 'solo' ? (
                        <button 
                            onClick={() => setGameState('waiting')}
                            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            <span>Battle Mode</span>
                        </button>
                    ) : (
                        <div className="flex items-center space-x-3">
                             <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-lg text-[10px] font-black text-rose-500 tracking-widest animate-pulse">
                                ROOM: {roomId}
                             </div>
                        </div>
                    )}
                    <div className="flex space-x-1">
                        {levels.map((l, i) => (
                            <div key={l.id} className={`w-2 h-2 rounded-full ${i <= currentLevelIdx ? 'bg-blue-500' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* ENTRANCE FORM */}
                {gameState === 'waiting' && !socket && (
                    <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
                        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-8">
                            <div className="text-center">
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Join the Arena</h3>
                                <p className="text-slate-400 text-sm font-medium italic">Enter your agent details</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-2">Agent Alias</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Agent 007" 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm focus:border-blue-500 outline-none transition-all font-bold"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const roomInput = document.getElementById('room-id-input') as HTMLInputElement;
                                                joinRoom((e.target as HTMLInputElement).value, roomInput.value || 'DECODER');
                                            }
                                        }}
                                        id="username-input"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-2">Room Identifier</label>
                                    <input 
                                        type="text" 
                                        defaultValue="DECODER"
                                        id="room-id-input"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm focus:border-blue-500 outline-none transition-all font-bold"
                                    />
                                </div>
                                <button 
                                    onClick={() => {
                                        const userInput = document.getElementById('username-input') as HTMLInputElement;
                                        const roomInput = document.getElementById('room-id-input') as HTMLInputElement;
                                        joinRoom(userInput.value, roomInput.value);
                                    }}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase italic tracking-tighter rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                                >
                                    Enter Room
                                </button>
                                <button 
                                    onClick={() => setGameState('solo')}
                                    className="w-full py-2 text-slate-500 hover:text-slate-300 font-bold uppercase text-[9px] tracking-widest"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* LOBBY VIEW */}
                {(gameState === 'lobby' || (gameState === 'waiting' && socket)) && (
                    <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
                        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 space-y-8">
                                <div className="text-center space-y-2">
                                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] uppercase font-black tracking-widest text-blue-400">Spy Training Room</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic truncate uppercase">Room: {roomId}</h3>
                                    <p className="text-slate-400 text-sm font-medium italic">"Waiting for agents to assemble..."</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest px-2">
                                        <span>Active Agents</span>
                                        <span className="text-blue-500">{users.length} Joined</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {users.map((u) => (
                                            <div key={u.id} className="group relative">
                                                <div className="w-full aspect-square bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-slate-700 group-hover:border-blue-500/50 transition-all overflow-hidden">
                                                    <img 
                                                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=b6e3f4`} 
                                                        alt={u.username}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-slate-950 px-2 py-0.5 rounded text-[8px] font-black text-white border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {u.username}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <button 
                                        onClick={startBattle}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase italic tracking-tight rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                        <span>Initialize Mission</span>
                                    </button>
                                    <button 
                                        onClick={leaveBattle}
                                        className="w-full py-3 text-slate-500 hover:text-slate-300 font-bold uppercase text-[10px] tracking-widest transition-colors"
                                    >
                                        Abort Mission
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* RESULTS VIEW */}
                {gameState === 'results' && (
                    <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6">
                        <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            
                            <div className="relative z-10 space-y-10">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Mission Accomplished</h3>
                                        <p className="text-slate-400 font-medium italic">Final Intelligence Report</p>
                                    </div>
                                </div>

                                <div className="bg-slate-950/50 rounded-[2rem] border border-slate-800 overflow-hidden">
                                    <div className="px-8 py-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ranked Agents</span>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency Points</span>
                                    </div>
                                    <div className="divide-y divide-slate-800">
                                        {leaderboard.map((u, i) => (
                                            <div key={u.id} className="px-8 py-5 flex justify-between items-center group hover:bg-white/5 transition-colors">
                                                <div className="flex items-center space-x-4">
                                                    <span className={`text-lg font-black italic ${i === 0 ? 'text-amber-400' : 'text-slate-600'}`}>#{(i + 1).toString().padStart(2, '0')}</span>
                                                    <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=b6e3f4`} alt="" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700" />
                                                    <span className="text-white font-bold uppercase tracking-tight">{u.username} {u.id === socket?.id && <span className="text-[8px] text-blue-500 ml-1">(YOU)</span>}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-black text-emerald-400 tabular-nums">{u.score.toLocaleString()}</div>
                                                    <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Total XP</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={leaveBattle}
                                        className="py-4 bg-slate-800 hover:bg-slate-700 text-white font-black uppercase italic tracking-tighter rounded-2xl transition-all"
                                    >
                                        Return to Hub
                                    </button>
                                    <button 
                                        onClick={() => joinRoom(username, roomId)}
                                        className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase italic tracking-tighter rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                                    >
                                        New Mission
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Left Panel: Briefing */}
                <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-950/50 backdrop-blur-xl shrink-0">
                    <div className="p-6 space-y-6 overflow-y-auto flex-1">
                        {gameState === 'battling' && (
                            <div className="space-y-4">
                                {/* Timer & Round */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Time Left</div>
                                        <div className={`text-2xl font-black italic tabular-nums ${timer < 10 ? 'text-rose-500 animate-pulse' : 'text-blue-400'}`}>
                                            {timer}s
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Mission</div>
                                        <div className="text-2xl font-black italic text-white tabular-nums">
                                            {currentRound}/{totalRounds}
                                        </div>
                                    </div>
                                </div>

                                 {/* Live Leaderboard */}
                                 <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                                     <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                         <span>Agent Status</span>
                                         <span>XP</span>
                                     </div>
                                     <div className="max-h-[160px] overflow-y-auto divide-y divide-slate-800/50 custom-scrollbar">
                                         {[...users].sort((a, b) => b.score - a.score).map((u, i) => (
                                             <div key={u.id} className="px-4 py-2 flex items-center justify-between group">
                                                 <div className="flex items-center space-x-2">
                                                     <div className="relative">
                                                         <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=b6e3f4`} alt="" className="w-6 h-6 rounded-lg bg-slate-800" />
                                                         {u.lastSolveTime && (
                                                             <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border border-slate-900" />
                                                         )}
                                                     </div>
                                                     <span className={`text-[10px] font-bold truncate max-w-[80px] ${u.id === socket?.id ? 'text-blue-400' : 'text-slate-400'}`}>
                                                         {u.username}
                                                     </span>
                                                 </div>
                                                 <span className="text-[10px] font-black text-slate-200 tabular-nums">{u.score}</span>
                                             </div>
                                         ))}
                                     </div>
                                 </div>

                                {/* First Correct Notification */}
                                {firstCorrect && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center space-x-3 animate-bounce">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest truncate">{firstCorrect.username}</div>
                                            <div className="text-[8px] text-emerald-400 font-medium italic">Signal Decoded in {firstCorrect.time}s</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="space-y-2 pt-2">
                             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Mission Protocol</span>
                             <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                {gameState === 'battling' && question ? question.description : level.mission}
                             </p>
                        </div>

                        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-[3px]">Raw Signal</span>
                                <code className="text-sm font-mono text-rose-400 bg-rose-400/10 px-2 py-1 rounded w-full block truncate">
                                    "{gameState === 'battling' && question ? question.starterCode.match(/'([^']+)'/)?.[1] : level.signal}"
                                </code>
                            </div>
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-[3px]">Target Output</span>
                                <code className="text-sm font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded w-full block truncate">
                                    "{gameState === 'battling' && question ? question.testCase.match(/'([^']+)'/)?.[1] : level.target}"
                                </code>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                            <span className="text-[10px] font-black text-blue-400 uppercase block mb-1 italic tracking-[2px]">Agent Preview</span>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-slate-500">Decoded:</span>
                                    <span className="text-xs font-mono text-blue-400 truncate max-w-[120px]">"{currentOutput}"</span>
                                </div>
                                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 transition-all duration-500" 
                                        style={{ width: `${Math.min(100, (currentOutput.length / (level.target.length || 1)) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-3 shrink-0">
                         {gameState === 'solo' ? (
                             isLevelComplete ? (
                                <button 
                                onClick={nextLevel}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase italic tracking-tighter rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center space-x-2 animate-bounce"
                                >
                                    <span>Next LEVEL</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </button>
                             ) : (
                                <button 
                                onClick={checkSolution}
                                disabled={!isPyodideLoaded}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase italic tracking-tighter rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {!isPyodideLoaded ? 'Loading Engine...' : 'RUN MY CODE'}
                                </button>
                             )
                         ) : (
                            <button 
                                onClick={submitCode}
                                disabled={!isPyodideLoaded || isSubmitting || pointsEarned > 0 || timer <= 0}
                                className={`w-full py-4 font-black uppercase italic tracking-tighter rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 ${
                                    pointsEarned > 0 
                                    ? 'bg-emerald-600 text-white shadow-emerald-500/20 select-none cursor-default' 
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                                }`}
                            >
                                {pointsEarned > 0 ? `DECODED (+${pointsEarned})` : isSubmitting ? 'UPLOADING...' : 'SUBMIT SOLUTION'}
                            </button>
                         )}
                         <p className="text-[9px] text-slate-600 text-center font-bold tracking-widest px-4 uppercase">Junior Code by NEXT</p>
                    </div>
                </div>

                {/* Workspace area */}
                <div className="flex-1 relative flex flex-col bg-slate-900">
                    <div className="flex-1 relative">
                        <div ref={blocklyDivRef} className="absolute inset-0" />
                        
                        {/* Tooltip hint */}
                        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                            <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-4 rounded-2xl flex items-start space-x-4 max-w-xl shadow-2xl">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-blue-400 font-black">?</span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium italic">"Psst... {level.hint}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Python Code Preview */}
                    <div className={`${isOutputExpanded ? 'h-96' : 'h-32'} bg-slate-950 border-t border-slate-800 flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}>
                        <div 
                            className="px-6 py-2 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-900/80 transition-colors"
                            onClick={() => setIsOutputExpanded(!isOutputExpanded)}
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Python Mission Code</span>
                                <div className="px-1.5 py-0.5 bg-emerald-500/10 rounded text-[8px] font-black text-emerald-500 uppercase tracking-tighter shadow-sm border border-emerald-500/20">LIVE</div>
                            </div>
                            <button className="text-slate-500 hover:text-emerald-500 transition-colors">
                                <svg className={`w-4 h-4 transform transition-transform duration-300 ${isOutputExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs custom-scrollbar">
                            <pre className="text-emerald-400/80 italic font-medium leading-relaxed">
                                {generatedCode || "# Start snapping blocks to generate Python code..."}
                            </pre>
                        </div>
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
                    background-color: rgba(59, 130, 246, 0.4) !important; 
                    border: 1px solid rgba(59, 130, 246, 0.5); 
                }
                
                .blocklyMainBackground { stroke: none !important; }
                .blocklyFlyoutBackground { fill: #0f172a !important; fill-opacity: 0.98 !important; }
                .blocklyWorkspace { background: #020617 !important; }
                .blocklySvg { background: transparent !important; }
                .blocklyText { font-family: 'Inter', sans-serif !important; font-weight: 600 !important; }
                .blocklyPath { stroke-width: 2px !important; }
                .blocklyScrollbarHandle { fill: #1e293b !important; }

                /* Ensure no nested divs are white */
                .blocklyToolboxDiv div {
                    background-color: transparent !important;
                }
            `}} />
        </div>
    );
};

export default StringDecoder;
