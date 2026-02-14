import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../App';

// Types
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

const CodeBattle: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('battle-room-1');
    const [gameState, setGameState] = useState<'lobby' | 'waiting' | 'battling' | 'results'>('lobby');
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<{user: string, text: string}[]>([]);
    
    // Battle State
    const [question, setQuestion] = useState<Question | null>(null);
    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pointsEarned, setPointsEarned] = useState<number | null>(null);
    const [timer, setTimer] = useState(0);
    const [winner, setWinner] = useState<User | null>(null);
    const [leaderboard, setLeaderboard] = useState<User[]>([]);
    const [firstCorrect, setFirstCorrect] = useState<{username: string, time: number} | null>(null);
    const [lastSolveTime, setLastSolveTime] = useState<{username: string, time: number} | null>(null);
    const [baseDuration, setBaseDuration] = useState(90);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-populate username from localStorage
    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Fetch user data from the correct base URL
                fetch(`${API_BASE_URL}/api/user/me`, {
                    headers: { 'x-auth-token': token }
                })
                .then(res => res.json())
                .then(data => {
                    if (data && data.name) {
                        setUsername(data.name);
                    }
                })
                .catch(err => console.log('Could not load user data:', err));
            }
        } catch (error) {
            console.log('Error loading username:', error);
        }
    }, []);

    // Initialize Socket
    useEffect(() => {
        const newSocket = io(API_BASE_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
        });

        newSocket.on('welcome_message', (msg: string) => {
            toast.success(msg);
        });

        newSocket.on('room_update', (roomUsers: User[]) => {
            setUsers(roomUsers);
            console.log("Room users updated:", roomUsers);
        });

        newSocket.on('receive_message', (msg: {user: string, text: string}) => {
            setMessages(prev => [...prev, msg]);
            if (msg.user === 'System') toast(msg.text, { icon: '🔔' });
        });

        newSocket.on('battle_started', ({ question, duration, currentRound, totalRounds, currentLevel }: { 
            question: Question, 
            duration: number,
            currentRound: number,
            totalRounds: number,
            currentLevel: number
        }) => {
            setGameState('battling');
            setQuestion(question);
            setTimer(duration);
            setBaseDuration(duration);
            setCode(question.starterCode);
            setLastSolveTime(firstCorrect); // Move current first correct to last solve time
            setFirstCorrect(null); // Reset for new round
            
            // Show round info if available
            if (currentRound && totalRounds) {
                toast.success(`Round ${currentRound}/${totalRounds}: ${question.title}`, {
                    duration: 3000,
                    icon: '🎯'
                });
            } else {
                toast.success('Battle Started! Good Luck!');
            }
            
            // Start Timer
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

        // Round ended - prepare for next question
        newSocket.on('round_ended', ({ message, nextRound }: { message: string, nextRound: number }) => {
            if (timerRef.current) clearInterval(timerRef.current);
            
            toast(message, {
                icon: '⏱️',
                duration: 2500
            });
            
            // Brief pause before next round (handled by server)
        });

        // Real-time score updates
        newSocket.on('scores_updated', (updatedUsers: User[]) => {
            setUsers(updatedUsers);
        });

        newSocket.on('first_correct', ({ username, time }: { username: string, time: number }) => {
            setFirstCorrect({ username, time });
            toast.success(`${username} got it first in ${time}s!`, {
                icon: '👑',
                duration: 4000
            });
        });

        newSocket.on('submission_result', (result: { userId: string, success: boolean, points: number, message?: string }) => {
            setIsSubmitting(false);
            
            if (newSocket && result.userId === newSocket.id) {
                if (result.success) {
                    if (result.points > 0) {
                        // Show points earned animation
                        setPointsEarned(result.points);
                        setTimeout(() => setPointsEarned(null), 2000);
                        
                        toast.success(result.message || `Correct! +${result.points} points!`, {
                            icon: '🎯',
                            duration: 3000
                        });
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    } else {
                        // Already solved or 0 points
                        toast(result.message || "You've already gotten a point", {
                            icon: 'ℹ️',
                            duration: 3000
                        });
                    }
                } else {
                    toast.error(result.message || 'Incorrect solution. Try again!', {
                        icon: '❌',
                        duration: 2000
                    });
                }
            }
        });

        // Battle ended - show winner
        newSocket.on('battle_ended', ({ winner, leaderboard }: { winner: User | null, leaderboard: User[] }) => {
            if (timerRef.current) clearInterval(timerRef.current);
            setWinner(winner);
            setLeaderboard(leaderboard);
            setGameState('results');
            
            // Confetti for winner announcement
            if (winner) {
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.5 }
                });
                toast.success(`🏆 ${winner.username} wins with ${winner.score} points!`, {
                    duration: 5000
                });
            }
        });

        return () => {
            newSocket.disconnect();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const joinRoom = () => {
        if (!username.trim()) return toast.error('Please enter a username');
        if (socket) {
            console.log('Joining room:', roomId, 'as', username);
            socket.emit('join_room', { username, roomId });
            setGameState('waiting');
        } else {
            console.error('Socket not connected!');
            toast.error('Connection error. Please refresh the page.');
        }
    };

    const startBattle = () => {
        if (socket) {
            socket.emit('start_battle', roomId);
        }
    };

    const submitCode = () => {
        if (!socket || !question || isSubmitting) return;
        setIsSubmitting(true);
        const timeTaken = baseDuration - timer;
        socket.emit('submit_code', { roomId, code, timeTaken });
    };
    

    const playAgain = () => {
        setGameState('waiting');
        setWinner(null);
        setLeaderboard([]);
        setQuestion(null);
        setCode('');
        setTimer(0);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-inter p-6 flex flex-col items-center">
            
            {/* HEADER */}
            <div className="w-full max-w-5xl flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">Code <span className="text-indigo-500">Battle</span></h1>
                </div>
                {gameState !== 'lobby' && (
                    <div className="flex items-center space-x-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                        <div className="flex -space-x-2">
                            {users.map((u, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-bold" title={u.username}>
                                    {u.username[0].toUpperCase()}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm font-bold text-slate-400">{users.length} Online</span>
                    </div>
                )}
            </div>

            {/* LOBBY VIEW */}
            {gameState === 'lobby' && (
                <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl animate-fade-in">
                    <h2 className="text-3xl font-black text-center mb-2">Join the Arena</h2>
                    <p className="text-slate-400 text-center mb-8">Compete against friends in real-time coding challenges.</p>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Warrior Name</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-bold"
                                placeholder="Enter your name..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Select Arena</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'room-variables', title: 'Variables', icon: '📦', color: 'indigo' },
                                    { id: 'room-datatypes', title: 'Data Types', icon: '🔢', color: 'blue' },
                                    { id: 'room-strings', title: 'String Methods', icon: '🔡', color: 'pink' },
                                    { id: 'room-conversions', title: 'Type Conversions', icon: '🔄', color: 'orange' },
                                    { id: 'room-lists', title: 'Lists', icon: '📜', color: 'emerald' },
                                    { id: 'room-listmethods', title: 'List Methods', icon: '🧪', color: 'cyan' },
                                    { id: 'room-dictionaries', title: 'Dictionaries', icon: '📖', color: 'amber' },
                                    { id: 'room-advanced', title: 'Advanced', icon: '🚀', color: 'purple' },
                                    { id: 'room-general', title: 'General', icon: '🌍', color: 'slate' }
                                ].map((room) => (
                                    <button
                                        key={room.id}
                                        onClick={() => setRoomId(room.id)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col space-y-2 ${
                                            roomId === room.id 
                                            ? `border-indigo-500 bg-indigo-500/10` 
                                            : `border-slate-800 bg-slate-950 hover:border-slate-700`
                                        }`}
                                    >
                                        <span className="text-2xl">{room.icon}</span>
                                        <span className="font-black text-sm uppercase tracking-tight">{room.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={joinRoom}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2 mt-4"
                        >
                            <span>Enter Battle</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* WAITING ROOM */}
            {gameState === 'waiting' && (
                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User List */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 col-span-2">
                        <h3 className="text-xl font-black mb-4 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                            Waiting for Players...
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {users.length === 0 ? (
                                <div className="col-span-2 text-center py-8">
                                    <p className="text-slate-500 text-sm">No players yet. Waiting for connection...</p>
                                    <p className="text-slate-600 text-xs mt-2">Room ID: {roomId}</p>
                                </div>
                            ) : (
                                users.map((user, i) => (
                                    <div key={i} className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black">
                                            {user.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white leading-tight">{user.username}</p>
                                            <p className="text-xs text-slate-500 font-medium">Ready to code</p>
                                        </div>
                                        {/* Star Badge for Score */}
                                        <div className="ml-auto flex items-center space-x-1 bg-yellow-500/10 px-2 py-1 rounded-lg">
                                            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <span className="text-xs font-bold text-yellow-500">{user.score}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-8">
                             <button 
                                onClick={startBattle}
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all active:scale-95 text-lg uppercase tracking-wide"
                            >
                                Start Battle
                            </button>
                        </div>
                    </div>

                    {/* Chat / Log */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col h-[400px]">
                        <h3 className="text-sm font-black uppercase text-slate-500 mb-4 tracking-wider">Battle Log</h3>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                            {messages.map((msg, i) => (
                                <div key={i} className={`p-3 rounded-lg text-sm font-medium ${msg.user === 'System' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-slate-950 text-slate-300'}`}>
                                    <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">{msg.user}</span>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* BATTLE UI */}
            {gameState === 'battling' && question && (
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
                    {/* Left: Question */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-indigo-600 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wider">Challenge</span>
                                <div className={`flex items-center space-x-2 ${timer < 10 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-xl font-black tabular-nums">{timer}s</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-white mb-4 leading-tight">{question.title}</h2>
                            <p className="text-slate-400 leading-relaxed text-sm mb-6">{question.description}</p>
                            
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                                <p className="mb-2 text-slate-500 uppercase font-black tracking-wider text-[10px]">Test Case</p>
                                {question.testCase}
                            </div>

                            {/* Previous Solve Time Display */}
                            {lastSolveTime && (
                                <div className="mt-4 p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Previous Solve Time</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-indigo-300">{lastSolveTime.username}</span>
                                        <span className="text-xs font-black text-slate-400 tabular-nums bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                                            {lastSolveTime.time}s
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* First Correct Notification */}
                        {firstCorrect && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 px-6 py-2 rounded-full border border-indigo-400 shadow-xl flex items-center space-x-3 animate-bounce">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                                <span className="text-sm font-black text-white uppercase tracking-wider">
                                    <span className="text-yellow-300">{firstCorrect.username}</span> solved first in {firstCorrect.time}s!
                                </span>
                            </div>
                        )}

                         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                             <h3 className="text-sm font-black uppercase text-slate-500 mb-4">Live Leaderboard</h3>
                             <div className="space-y-3">
                                 {users.sort((a,b) => b.score - a.score).map((u, i) => (
                                     <div key={i} className="flex justify-between items-center text-sm font-medium p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                                         <div className="flex items-center space-x-2">
                                             <span className={`text-slate-500 font-black w-4 ${i === 0 ? 'text-yellow-500' : ''}`}>{i+1}</span>
                                             <div className="flex flex-col">
                                                <span className="text-white">{u.username}</span>
                                                {u.lastSolveTime !== null && (
                                                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-tight">
                                                        Solved in {u.lastSolveTime}s
                                                    </span>
                                                )}
                                             </div>
                                         </div>
                                         <div className="text-right flex flex-col items-end">
                                            <span className="font-black text-white">{u.score} pts</span>
                                            {u.lastRoundPoints !== null && (
                                                <span className="text-[10px] text-green-500 font-bold">
                                                    +{u.lastRoundPoints} this round
                                                </span>
                                            )}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>

                    {/* Right: Code Editor */}
                    <div className="lg:col-span-2 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                         <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <span className="text-xs font-mono text-slate-500">solution.js</span>
                         </div>
                         <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 bg-slate-900 p-6 font-mono text-slate-300 focus:outline-none resize-none text-sm leading-relaxed"
                            spellCheck={false}
                         />
                         <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end relative">
                             {/* Points Earned Animation */}
                             {pointsEarned !== null && (
                                 <div className="absolute -top-16 right-4 bg-green-500 text-white px-6 py-3 rounded-xl font-black text-xl shadow-2xl shadow-green-500/50 animate-bounce">
                                     +{pointsEarned} pts!
                                 </div>
                             )}
                             
                             <button 
                                onClick={submitCode}
                                disabled={isSubmitting}
                                className={`${isSubmitting ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'} text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center space-x-2 disabled:opacity-50`}
                             >
                                {isSubmitting ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                        <span>Submit Solution</span>
                                    </>
                                )}
                             </button>
                         </div>
                    </div>
                </div>
            )}

            {/* RESULTS VIEW */}
            {gameState === 'results' && (
                <div className="w-full max-w-4xl animate-fade-in-up">
                    {/* Winner Announcement */}
                    <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-12 rounded-3xl border-2 border-yellow-500/30 mb-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-6 shadow-2xl shadow-yellow-500/50 animate-bounce">
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            </div>
                            <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">Victory!</h2>
                            {winner && (
                                <>
                                    <p className="text-2xl font-bold text-yellow-400 mb-2">{winner.username}</p>
                                    <p className="text-lg text-slate-300 font-medium">Wins with <span className="font-black text-yellow-500">{winner.score} points</span></p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Final Leaderboard */}
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-6">
                        <h3 className="text-2xl font-black mb-6 text-center">Final Leaderboard</h3>
                        <div className="space-y-4">
                            {leaderboard.map((user, i) => (
                                <div 
                                    key={i} 
                                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                                        i === 0 ? 'bg-yellow-500/10 border-2 border-yellow-500/30' : 
                                        i === 1 ? 'bg-slate-800 border border-slate-700' : 
                                        i === 2 ? 'bg-slate-800/50 border border-slate-700/50' : 
                                        'bg-slate-950 border border-slate-800'
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-black text-xl ${
                                            i === 0 ? 'bg-yellow-500 text-white' : 
                                            i === 1 ? 'bg-slate-600 text-white' : 
                                            i === 2 ? 'bg-orange-700 text-white' : 
                                            'bg-slate-700 text-slate-400'
                                        }`}>
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="font-black text-white text-lg">{user.username}</p>
                                            <div className="flex items-center space-x-3 mt-1">
                                                <p className="text-sm text-slate-500 font-medium">
                                                    {i === 0 ? '🏆 Champion' : i === 1 ? '🥈 Runner-up' : i === 2 ? '🥉 Third Place' : 'Participant'}
                                                </p>
                                                {user.lastSolveTime !== null && (
                                                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-indigo-400 border border-slate-700">
                                                        Last solve: {user.lastSolveTime}s
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-white">{user.score}</p>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Total Points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button 
                            onClick={playAgain}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            <span>Play Again</span>
                        </button>
                        <button 
                            onClick={() => {
                                setGameState('lobby');
                                setUsers([]);
                                setMessages([]);
                                setWinner(null);
                                setLeaderboard([]);
                            }}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-xl border border-slate-700 transition-all active:scale-95"
                        >
                            Leave Room
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeBattle;
