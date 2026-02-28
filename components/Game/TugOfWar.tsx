import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../../App';

interface User {
  id: string;
  username: string;
  team: 'left' | 'right';
}

interface Question {
  id: number;
  title: string;
  description: string;
  starterCode: string;
  testCase: string;
}

const TugOfWar: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [stage, setStage] = useState(1);
  const [gameState, setGameState] = useState<'lobby' | 'waiting' | 'playing' | 'ended'>('lobby');
  const [users, setUsers] = useState<User[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [code, setCode] = useState('');
  const [ropePosition, setRopePosition] = useState(0); // -50 to 50
  const [winner, setWinner] = useState<User | null>(null);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(60);
  const [hasVotedPass, setHasVotedPass] = useState(false);
  const [passMessage, setPassMessage] = useState('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const roomIdRef = useRef<string | null>(null);

  useEffect(() => {
    const newSocket = io(API_BASE_URL);
    setSocket(newSocket);

    newSocket.on('room_update', ({ roomId, users, gameState: roomGameState }: { roomId: string, users: User[], gameState: any }) => {
      setUsers(users);
      if (roomId) roomIdRef.current = roomId;
      if (roomGameState === 'waiting') setGameState('waiting');
    });

    newSocket.on('game_start', ({ users, question, duration }: { users: User[], question: Question, duration: number }) => {
      setUsers(users);
      setQuestion(question);
      setTimer(duration);
      setGameState('playing');
      setCode(question.starterCode);
      setHasVotedPass(false);
      setPassMessage('');
      startTimer();
    });

    newSocket.on('tug_update', ({ ropePosition: newPos, question: newQuestion, puller, team, reason }: { 
      ropePosition: number, 
      question: Question, 
      puller?: string,
      team?: string,
      reason?: string
    }) => {
      setRopePosition(newPos);
      setQuestion(newQuestion);
      setCode(newQuestion.starterCode);
      setHasVotedPass(false);
      setPassMessage('');
      
      if (puller) {
        toast(`${puller} pulled for Team ${team?.toUpperCase()}!`, {
          icon: team === 'left' ? '⬅️' : '➡️',
          duration: 2000
        });
      } else if (reason) {
        toast(reason, { icon: '⏭️' });
      }

      if (team === (users.find(u => u.id === newSocket.id)?.team)) {
        confetti({
          particleCount: 50,
          spread: 40,
          origin: { x: team === 'left' ? 0.2 : 0.8, y: 0.5 }
        });
      }
    });

    newSocket.on('game_over', ({ winner, reason }: { winner: User, reason: string }) => {
      setWinner(winner);
      setReason(reason);
      setGameState('ended');
      if (timerRef.current) clearInterval(timerRef.current);
      
      if (winner && winner.id === newSocket.id) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    });

    newSocket.on('submission_result', (result: { success: boolean, message?: string }) => {
      setIsSubmitting(false);
      if (!result.success) {
        toast.error(result.message || 'Incorrect solution!');
      } else {
        toast.success("Correct! Rope pulled!");
        setHasVotedPass(false);
        setPassMessage('');
      }
    });

    newSocket.on('pass_notification', ({ message, reset }: { message: string, reset?: boolean }) => {
      if (reset) {
        setHasVotedPass(false);
        setPassMessage('');
      } else {
        setPassMessage(message);
        toast(message, { icon: '🎫' });
      }
    });

    return () => {
      newSocket.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
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
  };

  const joinGame = () => {
    if (!username.trim()) return toast.error("Enter a name!");
    socket?.emit('join_tug_room', { username, stage });
    setGameState('waiting');
  };

  const submitSolution = () => {
    if (!socket || isSubmitting || !question || !roomIdRef.current) return;
    setIsSubmitting(true);
    socket.emit('submit_tug_code', { 
      roomId: roomIdRef.current, 
      code, 
      timeTaken: 60 - timer 
    });
  };

  const votePass = () => {
    if (!socket || !roomIdRef.current || hasVotedPass) return;
    setHasVotedPass(true);
    setPassMessage('Waiting for opponent to agree...');
    socket.emit('pass_question', { roomId: roomIdRef.current });
  };

  const renderRope = () => {
    const offset = ropePosition * 5; // Scale for visual
    return (
      <div className="relative w-full h-32 bg-slate-800/50 rounded-3xl border border-slate-700 overflow-hidden mb-12 flex items-center justify-center">
        {/* Center Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-red-500/50 z-10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
        
        {/* The Rope */}
        <div 
          className="relative flex items-center transition-all duration-500 ease-out"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {/* Left Team Icon */}
          <div className={`text-5xl mr-12 transition-transform ${ropePosition < 0 ? 'scale-125' : 'scale-75 opacity-50'}`}>
            🐍
            <div className="text-xs font-bold text-indigo-400 mt-1 uppercase text-center">Team Python</div>
          </div>
          
          {/* Rope Element */}
          <div className="h-4 w-[600px] bg-gradient-to-r from-slate-600 via-indigo-500 to-slate-600 rounded-full shadow-lg relative flex items-center">
            {/* Knot/Flag */}
            <div className="absolute left-1/2 -ml-3 w-6 h-8 bg-white shadow-lg rounded-sm border-2 border-red-500 animate-bounce"></div>
          </div>

          {/* Right Team Icon */}
          <div className={`text-5xl ml-12 transition-transform ${ropePosition > 0 ? 'scale-125' : 'scale-75 opacity-50'}`}>
            💻
            <div className="text-xs font-bold text-emerald-400 mt-1 uppercase text-center">Team Logic</div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-8 text-slate-500 font-black italic uppercase tracking-widest text-sm">
          {users.find(u => u.team === 'left')?.username || 'Python'} Territory
        </div>
        <div className="absolute top-4 right-8 text-slate-500 font-black italic uppercase tracking-widest text-sm text-right">
          {users.find(u => u.team === 'right')?.username || 'Logic'} Territory
        </div>
      </div>
    );
  };

  if (gameState === 'lobby') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] animate-fade-in">
        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Tug of War</h2>
            <p className="text-slate-400 mb-8 font-medium">Out-code your opponent to pull the rope home!</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Your Hacker Alias</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder:text-slate-700"
                  placeholder="e.g. CodeNinjax"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Select Difficulty Stage</label>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 3, 5, 8, 10].map(s => (
                    <button 
                      key={s}
                      onClick={() => setStage(s)}
                      className={`py-3 rounded-xl border-2 transition-all font-black text-sm ${stage === s ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 scale-105' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      {s === 1 ? 'Start' : s === 5 ? 'Master' : s === 10 ? 'PRO' : s}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={joinGame}
                className="w-full bg-indigo-600 hover:bg-white hover:text-indigo-950 text-white font-black py-5 rounded-2xl transition-all active:scale-95 shadow-xl shadow-indigo-600/20 text-lg uppercase flex items-center justify-center gap-3 overflow-hidden group"
              >
                <span>Find Opponent</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
        <div className="w-24 h-24 mb-8 relative">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl">📡</div>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Scanning for Opponents...</h2>
        <p className="text-slate-400 max-w-sm mb-8 font-medium italic">"The best way to predict the future is to program it." - Stage {stage}</p>
        <div className="flex items-center gap-4 bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-slate-300">Searching global network...</span>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && question) {
    const myTeam = users.find(u => u.id === socket?.id)?.team;
    return (
      <div className="max-w-6xl mx-auto p-4 lg:p-8 animate-fade-in-up">
        {renderRope()}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Side */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                 <div className={`px-4 py-2 rounded-xl border border-slate-800 font-black text-xl tabular-nums ${timer < 10 ? 'text-red-500 animate-pulse' : 'text-indigo-400'}`}>
                   {timer}s
                 </div>
               </div>
               
               <h3 className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">Current Challenge</h3>
               <h2 className="text-3xl font-black text-white mb-6 leading-tight">{question.title}</h2>
               <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 mb-8">
                  <p className="text-slate-300 font-medium leading-relaxed">{question.description}</p>
               </div>
               
               <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Target Outcome</p>
                 <code className="text-xs font-mono text-indigo-300">{question.testCase}</code>
               </div>
            </div>
            
            <div className="flex gap-4">
              {users.map(u => (
                <div key={u.id} className={`flex-1 p-4 rounded-2xl border ${u.id === socket?.id ? 'bg-indigo-600/10 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${u.team === 'left' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}`}>
                      {u.team === 'left' ? 'P' : 'L'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Team {u.team === 'left' ? 'Python' : 'Logic'}</p>
                      <p className="text-sm font-black text-white">{u.username} {u.id === socket?.id ? '(You)' : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor Side */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl h-[500px]">
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Python Console</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
              </div>
            </div>
            <textarea 
              value={code}
              onChange={e => setCode(e.target.value)}
              className="flex-1 bg-slate-900 p-8 font-mono text-slate-300 focus:outline-none resize-none leading-relaxed text-sm selection:bg-indigo-500/30"
              placeholder="# Write your logic here..."
              spellCheck={false}
            />
            <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
              <div className="flex flex-col">
                {passMessage && (
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest animate-pulse">
                    {passMessage}
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={votePass}
                  disabled={hasVotedPass || isSubmitting}
                  className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${hasVotedPass ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}
                >
                  {hasVotedPass ? 'Voted Skip' : 'Skip Question?'}
                </button>
                <button 
                  onClick={submitSolution}
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-50 text-white hover:text-indigo-900 font-black px-10 py-4 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
                >
                  {isSubmitting ? 'Syncing...' : 'TUG THE ROPE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'ended') {
    const iWon = winner?.id === socket?.id;
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] animate-scale-in">
        <div className={`max-w-xl w-full p-12 rounded-[3rem] border-4 text-center ${iWon ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'bg-rose-900/20 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.2)]'}`}>
          <div className="text-8xl mb-6">{iWon ? '🏆' : '💀'}</div>
          <h2 className="text-5xl font-black text-white mb-2 uppercase tracking-tighter">{iWon ? 'Victory!' : 'Defeat!'}</h2>
          <p className="text-xl font-bold text-slate-300 mb-8">{reason}</p>
          
          <div className="bg-black/20 p-6 rounded-2xl mb-10 border border-white/5">
             <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Champion of the Rope</p>
             <p className="text-2xl font-black text-white">{winner?.username || 'Draw'}</p>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="bg-white text-slate-900 font-black px-12 py-5 rounded-2xl hover:scale-105 transition-all active:scale-95 uppercase tracking-widest"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TugOfWar;
