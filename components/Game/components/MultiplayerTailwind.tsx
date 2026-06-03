import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../../../App';
import { battleLevels, AVATAR_IMAGE_URL, PRODUCT_IMAGE_URL, BANNER_IMAGE_URL } from '../tailwindBattleData';
import { CHARACTERS, Character } from './CharacterSelect';

const PASS_THRESHOLD = 75;

const LEVEL_IMAGE_MAP: Record<number, string> = {
  1: AVATAR_IMAGE_URL,
  4: AVATAR_IMAGE_URL,
  5: PRODUCT_IMAGE_URL,
  8: AVATAR_IMAGE_URL,
  15: BANNER_IMAGE_URL,
  19: AVATAR_IMAGE_URL,
  20: AVATAR_IMAGE_URL,
};

interface Player {
  id: string;
  username: string;
  character: Character;
  score: number;
  currentLevelIndex: number;
  isHost: boolean;
}

interface MultiplayerTailwindProps {
  onExit: () => void;
}

export default function MultiplayerTailwind({ onExit }: MultiplayerTailwindProps) {
  // Socket and Connection State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(true);

  // Game States
  const [gameState, setGameState] = useState<'setup' | 'lobby' | 'playing' | 'ended'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [hostId, setHostId] = useState('');
  const [winner, setWinner] = useState<Player | null>(null);

  // Active Play States for Local Player
  const [localLevelIndex, setLocalLevelIndex] = useState(0);
  const [code, setCode] = useState('');
  const [score, setScore] = useState({ position: 0, size: 0, styles: 0, total: 0 });
  const [isSuccess, setIsSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'target' | 'mine'>('split');
  const [feedbackMsg, setFeedbackMsg] = useState('Write your HTML and Tailwind classes to match the target!');

  const currentLevel = battleLevels[localLevelIndex];
  
  const desktopTargetIframeRef = useRef<HTMLIFrameElement>(null);
  const desktopUserIframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize socket
  useEffect(() => {
    const s = io(API_BASE_URL);
    setSocket(s);

    s.on('connect', () => {
      console.log('Multiplayer Tailwind connected');
    });

    s.on('room_update', ({ users, gameState: roomState, hostId: currentHostId }) => {
      setPlayers(users);
      setHostId(currentHostId);
      if (roomState === 'playing') {
        setGameState('playing');
      }
    });

    s.on('challenge_started', ({ users }) => {
      setPlayers(users);
      setLocalLevelIndex(0);
      setIsSuccess(false);
      setGameState('playing');
      toast.success('🚀 The race has started! Good luck!', { icon: '🏁' });
    });

    s.on('challenge_ended', ({ winner: matchWinner, users }) => {
      setWinner(matchWinner);
      setPlayers(users);
      setGameState('ended');
      if (s.id === matchWinner.id) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        toast.success('🏆 You won the race!', { duration: 5000 });
      } else {
        toast(`Race complete! ${matchWinner.username} took 1st place!`, { icon: '🏁' });
      }
    });

    s.on('error_message', (msg: string) => {
      toast.error(msg);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  // Sync inputs on level changes
  useEffect(() => {
    setCode(currentLevel?.initialCode || '');
    setIsSuccess(false);
    setScore({ position: 0, size: 0, styles: 0, total: 0 });
    setFeedbackMsg('Write your HTML and Tailwind classes to match the target!');
  }, [localLevelIndex, currentLevel]);

  const handleCreateRoom = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    if (!selectedChar) {
      toast.error('Please select a character');
      return;
    }
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomId(code);
    if (socket) {
      socket.emit('join_challenge', { username, character: selectedChar, roomId: code });
      setGameState('lobby');
    }
  };

  const handleJoinRoom = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    if (!selectedChar) {
      toast.error('Please select a character');
      return;
    }
    if (!roomId.trim()) {
      toast.error('Please enter a Room Code');
      return;
    }
    const cleanCode = roomId.trim().toUpperCase();
    setRoomId(cleanCode);
    if (socket) {
      socket.emit('join_challenge', { username, character: selectedChar, roomId: cleanCode });
      setGameState('lobby');
    }
  };

  const handleStartGame = () => {
    if (socket) {
      socket.emit('start_challenge', { roomId });
    }
  };

  // Helper to generate the iframe document content
  const getHtmlDoc = (html: string) => `<!DOCTYPE html><html><head><script src="/tailwindcss.js"></script><style>body { margin: 0; padding: 0; overflow: hidden; height: 100vh; width: 100vw; background-color: #0f172a; color: #f8fafc; font-family: sans-serif; }</style></head><body>${html}</body></html>`;

  useEffect(() => {
    if (gameState !== 'playing' || isSuccess) return;
    const timer = setTimeout(validateSolution, 600);
    return () => clearTimeout(timer);
  }, [code, viewMode, gameState]);

  const validateSolution = () => {
    if (isSuccess || gameState !== 'playing') return;

    try {
      const targetIframe = desktopTargetIframeRef.current;
      const userIframe = desktopUserIframeRef.current;
      if (!targetIframe || !userIframe) return;

      const targetDoc = targetIframe.contentDocument || targetIframe.contentWindow?.document;
      const userDoc = userIframe.contentDocument || userIframe.contentWindow?.document;
      if (!targetDoc || !userDoc) return;

      const targetEl = targetDoc.querySelector(currentLevel.targetSelector);
      const userEl =
        userDoc.querySelector(currentLevel.targetSelector) ||
        userDoc.querySelector('[id^="target"]') ||
        userDoc.querySelector('.rounded-full') ||
        userDoc.querySelector('.absolute') ||
        (userDoc.body?.firstElementChild?.firstElementChild ?? null);

      if (!targetEl || !userEl) {
        setScore({ position: 0, size: 0, styles: 0, total: 0 });
        setFeedbackMsg('Add your target element wrapper containing the classes!');
        return;
      }

      const targetRect = targetEl.getBoundingClientRect();
      const userRect = userEl.getBoundingClientRect();

      const positionScore = Math.max(0, Math.round(100 - (Math.abs(targetRect.left - userRect.left) + Math.abs(targetRect.top - userRect.top)) * 2));
      const sizeScore = Math.max(0, Math.round(100 - (Math.abs(targetRect.width - userRect.width) + Math.abs(targetRect.height - userRect.height)) * 2.5));

      const targetStyle = targetDoc.defaultView?.getComputedStyle(targetEl) ?? null;
      const userStyle = userDoc.defaultView?.getComputedStyle(userEl) ?? null;

      let styleDiff = 0;
      if (targetStyle && userStyle) {
        if (targetStyle.borderRadius !== userStyle.borderRadius) styleDiff += 25;
        if (targetStyle.backgroundColor !== userStyle.backgroundColor && targetStyle.backgroundImage !== userStyle.backgroundImage) styleDiff += 25;
        if (targetStyle.borderWidth !== userStyle.borderWidth) styleDiff += 25;
        if (targetStyle.boxShadow !== userStyle.boxShadow) styleDiff += 25;
      } else {
        styleDiff = 100;
      }
      const stylesScore = Math.max(0, 100 - styleDiff);

      const totalScore = Math.round(positionScore * 0.4 + sizeScore * 0.3 + stylesScore * 0.3);
      setScore({ position: positionScore, size: sizeScore, styles: stylesScore, total: totalScore });

      if (totalScore >= PASS_THRESHOLD) {
        setIsSuccess(true);
        if (totalScore >= 95) {
          setFeedbackMsg('🎉 Brilliant! Perfect layout match! Advancing...');
        } else {
          setFeedbackMsg(`✅ Level passed with ${totalScore}%! Advancing...`);
        }
        
        toast.success(`Passed Level ${localLevelIndex + 1}!`, { duration: 1000 });
        
        const nextIdx = localLevelIndex + 1;
        setTimeout(() => {
          if (socket) {
            socket.emit('submit_challenge_solve', {
              roomId,
              currentLevelIndex: nextIdx,
              totalLevels: battleLevels.length
            });
          }
          if (nextIdx < battleLevels.length) {
            setLocalLevelIndex(nextIdx);
          }
        }, 1500);
      } else if (totalScore > 40) {
        setFeedbackMsg(`🎨 Score: ${totalScore}%. You need ${PASS_THRESHOLD}% to advance.`);
      } else {
        setFeedbackMsg('Write your HTML and Tailwind classes to match the target!');
      }
    } catch (err) {
      console.warn('Validation warning:', err);
    }
  };

  if (gameState === 'setup') {
    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200 rounded-xl">
        <div className="w-full max-w-4xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500 uppercase tracking-tight">
                Tailwind Multiplayer Race
              </h2>
              <p className="text-sm text-gray-400">Race against up to 8+ players to replicate Tailwind designs!</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Nickname</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} maxLength={12} placeholder="Enter nickname..." className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors font-bold text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Connection Mode</label>
              <div className="flex bg-[#0d1117] p-1 rounded-xl border border-gray-800">
                <button type="button" onClick={() => setIsCreating(true)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isCreating ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Create Room</button>
                <button type="button" onClick={() => setIsCreating(false)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isCreating ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Join Room</button>
              </div>
            </div>

            {!isCreating && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Room Code</label>
                <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} maxLength={4} placeholder="Enter 4-letter code..." className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors font-bold text-sm tracking-widest uppercase text-center" />
              </div>
            )}

            <button onClick={isCreating ? handleCreateRoom : handleJoinRoom} className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black rounded-xl shadow-lg transition-transform transform active:scale-95 text-md uppercase tracking-wider flex items-center justify-center gap-2">
              🏁 {isCreating ? 'Create & Enter Lobby' : 'Join Race Lobby'}
            </button>

            <button onClick={onExit} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition">Back to Arcade</button>
          </div>

          <div className="w-full md:w-[45%] flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Character</label>
            <div className="grid grid-cols-4 gap-2 bg-[#0d1117] p-4 rounded-2xl border border-gray-800 overflow-y-auto max-h-[300px]">
              {CHARACTERS.map(c => (
                <button key={c.id} type="button" onClick={() => setSelectedChar(c)} className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${selectedChar?.id === c.id ? 'border-indigo-500 bg-indigo-500/20 shadow-lg' : 'border-transparent bg-[#161b22] hover:border-gray-700'}`}>
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wide mt-1 text-gray-400">{c.name}</span>
                </button>
              ))}
            </div>
            {selectedChar && (
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${selectedChar.color} mt-2 shadow-xl`}>
                <span className="text-3xl">{selectedChar.emoji}</span>
                <div>
                  <p className="text-white font-black text-sm">{username || 'Guest Racer'}</p>
                  <p className="text-white/80 text-[10px] uppercase font-bold tracking-wide">Racer: {selectedChar.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'lobby') {
    const isHost = socket?.id === hostId;
    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200 rounded-xl">
        <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative">
          <div className="text-center">
            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest">Lobby</span>
            <h2 className="text-3xl font-black text-white mt-3">Room Code: <span className="text-indigo-400 tracking-wider font-mono">{roomId}</span></h2>
            <p className="text-sm text-gray-400 mt-1">Share this code with friends to join up to 8+ players!</p>
          </div>

          <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-4 min-h-[160px] flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-800 pb-2">Racer Lineup ({players.length}/8+)</h3>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {players.map((p, i) => (
                <div key={p.id || i} className="flex items-center gap-3 bg-[#161b22] p-3 rounded-xl border border-gray-800 relative">
                  <span className="text-3xl">{p.character.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-white">{p.username}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{p.id === hostId ? 'Host 👑' : 'Racer'}</p>
                  </div>
                  {p.id === socket?.id && (
                    <span className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 rounded text-[9px] font-bold">You</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {isHost ? (
              <button onClick={handleStartGame} disabled={players.length < 1} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-black rounded-xl shadow-lg transition transform active:scale-95 text-lg uppercase tracking-wider">
                🏁 Start the Race!
              </button>
            ) : (
              <div className="w-full text-center py-3 bg-[#0d1117] border border-gray-800 rounded-xl">
                <span className="text-sm font-semibold text-gray-400 animate-pulse">Waiting for Host to start...</span>
              </div>
            )}
            <button onClick={() => { if (socket) socket.disconnect(); setGameState('setup'); }} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition">Leave Lobby</button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.currentLevelIndex !== a.currentLevelIndex) return b.currentLevelIndex - a.currentLevelIndex;
      return b.score - a.score;
    });

    return (
      <div className="flex w-full h-full bg-[#0d1117] text-slate-200 font-sans rounded-xl overflow-hidden border border-gray-800 shadow-2xl flex-col lg:flex-row">
        
        {/* Left Panel: Instructions */}
        <div className="w-full lg:w-80 bg-[#111827] flex flex-col h-full border-r border-slate-800/80 relative z-10 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-gray-800">
            <div>
              <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black">Room: {roomId}</p>
              <h2 className="text-base font-black text-white flex items-center gap-1.5">Level {localLevelIndex + 1} of {battleLevels.length}</h2>
            </div>
            <button onClick={() => { if (socket) socket.disconnect(); onExit(); }} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-red-950/20 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 rounded transition">Quit</button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-lg lg:text-xl font-black text-white mb-1 leading-tight tracking-tight">{currentLevel.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{currentLevel.description}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3 lg:p-4 border border-slate-800/50">
              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1.5">Instructions</h4>
              <p className="text-xs leading-relaxed text-slate-300">{currentLevel.instructions}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3 lg:p-4 border border-slate-800/50 space-y-2.5">
              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400">Match Accuracy</h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-black text-slate-300">Total Score</span>
                <span className={`text-lg font-black ${score.total >= PASS_THRESHOLD ? 'text-emerald-400' : score.total > 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {score.total}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Editor */}
        <div className="flex-1 bg-[#0d1117] flex flex-col relative overflow-hidden border-r border-slate-800/80">
          <div className="flex items-center justify-between px-4 lg:px-6 py-2.5 lg:py-3 bg-[#111827] border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">editor.html</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">HTML & Tailwind</span>
          </div>

          <div className="flex-1 flex overflow-hidden min-h-0">
            <div className="w-8 lg:w-12 bg-[#090d16] text-[#2c374e] text-right pr-2 lg:pr-3 pt-3 lg:pt-4 select-none font-mono text-[10px] lg:text-xs leading-6 border-r border-slate-800 overflow-hidden">
              {Array.from({ length: Math.max(code.split('\n').length, 12) }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              disabled={isSuccess}
              className={`flex-1 bg-transparent text-slate-200 p-3 lg:p-4 outline-none resize-none font-mono text-[11px] lg:text-xs leading-6 selection:bg-indigo-500/30 ${isSuccess ? 'opacity-50' : ''}`}
              spellCheck={false}
              placeholder="Type your HTML & Tailwind code here..."
              autoFocus
            />
          </div>

          <div className="p-3 lg:p-4 bg-[#0a0d16] border-t border-slate-800 flex items-center justify-between gap-3">
            <span className={`text-[11px] lg:text-xs font-medium flex-1 min-w-0 truncate ${isSuccess ? 'text-emerald-400' : 'text-slate-400'}`}>
              {feedbackMsg}
            </span>
          </div>
        </div>

        {/* Right Panel: Previews & Leaderboard */}
        <div className="w-full lg:w-96 flex flex-col h-full bg-[#0f172a] overflow-y-auto">
          {/* Previews */}
          <div className="p-3 lg:p-6 flex flex-col gap-3 lg:gap-4 flex-none min-h-[300px]">
            <div className="flex-1 flex flex-col min-h-[140px]">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">🎯 Target</span>
              <div className="relative flex-1 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe ref={desktopTargetIframeRef} srcDoc={getHtmlDoc(currentLevel.targetHtml)} title="Target Preview" className="w-full h-full border-none pointer-events-none" sandbox="allow-scripts allow-same-origin" />
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-[140px]">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1.5">💻 Yours</span>
              <div className="relative flex-1 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe ref={desktopUserIframeRef} srcDoc={getHtmlDoc(code)} title="User Preview" className="w-full h-full border-none pointer-events-none" sandbox="allow-scripts allow-same-origin" />
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="p-4 border-t border-slate-800 bg-[#161b22] flex-1">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-500">Live Rankings</h3>
              <p className="text-[10px] text-gray-500">First to build all layouts wins!</p>
            </div>

            <div className="flex flex-col gap-2.5 mt-3">
              {sortedPlayers.map((p) => {
                const progressPct = (p.currentLevelIndex / battleLevels.length) * 100;
                const isLocalPlayer = p.id === socket?.id;

                return (
                  <div key={p.id} className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-colors ${isLocalPlayer ? 'bg-indigo-500/10 border-indigo-500/40 shadow-md shadow-indigo-950/20' : 'bg-[#0d1117] border-gray-800'}`}>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold truncate">
                        <span className="text-sm">{p.character.emoji}</span>
                        <span className={`truncate ${isLocalPlayer ? 'text-indigo-400' : 'text-white'}`}>{p.username}</span>
                        {isLocalPlayer && <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-1 rounded">You</span>}
                      </div>
                      <span className="font-mono text-gray-400 font-bold shrink-0">Lvl {p.currentLevelIndex + 1}/{battleLevels.length}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (gameState === 'ended') {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200 rounded-xl">
        <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl animate-bounce">🏆</span>
            <h2 className="text-4xl font-black text-white mt-2">Race Complete!</h2>
            {winner && (
              <p className="text-lg text-indigo-400 font-bold">Winner: {winner.character.emoji} {winner.username}</p>
            )}
          </div>

          <div className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-800 pb-2">Final Standings</h3>
            <div className="flex flex-col gap-2.5 mt-2">
              {sortedPlayers.map((p, i) => (
                <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${i === 0 ? 'bg-amber-500/10 border-amber-500/30' : i === 1 ? 'bg-slate-800/40 border-slate-700' : 'bg-[#161b22] border-gray-800/60'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-amber-500 text-white shadow' : i === 1 ? 'bg-slate-500 text-white' : 'bg-gray-800 text-gray-400'}`}>{i + 1}</span>
                    <span className="text-2xl">{p.character.emoji}</span>
                    <span className="font-bold text-sm text-white">{p.username}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white font-mono">{p.score} pts</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase">Solved {p.currentLevelIndex} Levels</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 w-full mt-4">
            <button onClick={() => { setGameState('setup'); setWinner(null); }} className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition shadow-lg text-sm uppercase tracking-wider">Play Again</button>
            <button onClick={onExit} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-gray-300 font-black rounded-xl transition border border-slate-700 text-sm uppercase tracking-wider">Exit Race</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
