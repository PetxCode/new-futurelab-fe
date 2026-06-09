import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../../../App';
import { CHARACTERS, Character } from './CharacterSelect';
import {
  TAILWIND_INVADERS_LEVELS,
  InvaderTarget,
} from '../tailwindInvadersData';

// ─── Game constants ───────────────────────────────────────────────────
const GAME_HEIGHT = 80;

interface ActiveInvader extends InvaderTarget {
  uid: string;
  x: number;
  y: number;
  isHit: boolean;
}

interface Player {
  id: string;
  username: string;
  character: Character;
  score: number;
  isEliminated: boolean;
  isHost: boolean;
}

interface MultiplayerInvadersProps {
  onExit: () => void;
}

// ─── Speed preset labels ──────────────────────────────────────────────
const SPEED_PRESETS = [
  { label: '🐢 Chill', value: 0.6 },
  { label: '😊 Normal', value: 1 },
  { label: '🔥 Fast', value: 2 },
  { label: '⚡ Insane', value: 4 },
];

export default function MultiplayerInvaders({ onExit }: MultiplayerInvadersProps) {
  // ── Connection / lobby ──────────────────────────────────────────────
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(true);
  const [gameState, setGameState] = useState<'setup' | 'lobby' | 'playing' | 'ended'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [hostId, setHostId] = useState('');
  const [winner, setWinner] = useState<Player | null>(null);
  const [lobbySpeed, setLobbySpeed] = useState(1);

  // ── Active game ─────────────────────────────────────────────────────
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [inputVal, setInputVal] = useState('');
  const [activeInvaders, setActiveInvaders] = useState<ActiveInvader[]>([]);
  const [levelIndex, setLevelIndex] = useState(0);
  const [serverSpeed, setServerSpeed] = useState(1);
  const [combo, setCombo] = useState(0);
  const [lastHitMsg, setLastHitMsg] = useState('');

  const invadersRef = useRef<ActiveInvader[]>([]);
  const requestRef = useRef<number>();
  const lastSpawnTime = useRef<number>(0);
  const scoreRef = useRef(0);
  const isGameOverRef = useRef(false);
  const socketRef = useRef<Socket | null>(null);
  const roomIdRef = useRef('');

  useEffect(() => { invadersRef.current = activeInvaders; }, [activeInvaders]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { isGameOverRef.current = isGameOver; }, [isGameOver]);

  // ── Socket setup ────────────────────────────────────────────────────
  useEffect(() => {
    const s = io(API_BASE_URL);
    setSocket(s);
    socketRef.current = s;

    s.on('invaders_room_update', ({ users, hostId: hId, speedMultiplier }) => {
      setPlayers(users);
      setHostId(hId);
      setLobbySpeed(speedMultiplier ?? 1);
    });

    s.on('invaders_started', ({ users, speedMultiplier }) => {
      setPlayers(users);
      setServerSpeed(speedMultiplier ?? 1);
      setGameState('playing');
      setScore(0); scoreRef.current = 0;
      setLives(10);
      setLevelIndex(0);
      setIsGameOver(false); isGameOverRef.current = false;
      setActiveInvaders([]);
      setCombo(0);
      lastSpawnTime.current = performance.now();
      toast.success('🚀 Invaders incoming! Defend the UI!', { icon: '👾' });
    });

    s.on('invaders_ended', ({ winner: w, users }) => {
      setWinner(w);
      setPlayers(users);
      setGameState('ended');
      if (s.id === w.id) {
        confetti({ particleCount: 180, spread: 90, origin: { y: 0.6 } });
        toast.success('🏆 You survived the longest!', { duration: 5000 });
      } else {
        toast(`${w.username} survived the longest! 👾`, { icon: '🏆' });
      }
    });

    s.on('error_message', (msg: string) => toast.error(msg));

    return () => { s.disconnect(); };
  }, []);

  // ── Game loop ───────────────────────────────────────────────────────
  const currentLevel = TAILWIND_INVADERS_LEVELS[levelIndex];

  const spawnInvader = useCallback((timestamp: number) => {
    if (timestamp - lastSpawnTime.current > currentLevel.spawnRate) {
      const template = currentLevel.targets[Math.floor(Math.random() * currentLevel.targets.length)];
      const newInvader: ActiveInvader = {
        ...template,
        uid: `${Date.now()}-${Math.random()}`,
        x: Math.random() * 70 + 10,
        y: -10,
        isHit: false,
      };
      setActiveInvaders(prev => [...prev, newInvader]);
      lastSpawnTime.current = timestamp;
    }
  }, [currentLevel]);

  const updateLoop = useCallback((timestamp: number) => {
    if (isGameOverRef.current) return;

    spawnInvader(timestamp);

    setActiveInvaders(prev => {
      let lifeLost = false;
      const updated = prev
        .map(inv => {
          if (inv.isHit) return inv;
          const newY = inv.y + 0.0005 * currentLevel.speedMultiplier * serverSpeed * 16;
          if (newY >= GAME_HEIGHT && !inv.isHit) lifeLost = true;
          return { ...inv, y: newY };
        })
        .filter(inv => inv.isHit || inv.y < GAME_HEIGHT);

      if (lifeLost) {
        setLives(l => {
          const next = l - 1;
          if (next <= 0) {
            isGameOverRef.current = true;
            setIsGameOver(true);
            // Notify server
            if (socketRef.current && roomIdRef.current) {
              socketRef.current.emit('invaders_game_over', { roomId: roomIdRef.current });
            }
          }
          return next;
        });
        setCombo(0);
      }

      return updated;
    });

    requestRef.current = requestAnimationFrame(updateLoop);
  }, [currentLevel, serverSpeed, spawnInvader]);

  useEffect(() => {
    if (gameState === 'playing' && !isGameOver) {
      requestRef.current = requestAnimationFrame(updateLoop);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [gameState, isGameOver, updateLoop]);

  // Score reporting
  useEffect(() => {
    if (gameState !== 'playing' || !socket || !roomIdRef.current) return;
    socket.emit('invaders_score_update', { roomId: roomIdRef.current, score });
  }, [score, gameState, socket]);

  // Level up
  useEffect(() => {
    if (score > 0 && score % 1000 === 0 && levelIndex < TAILWIND_INVADERS_LEVELS.length - 1) {
      setLevelIndex(l => l + 1);
      toast('⬆️ Level Up!', { icon: '🚀' });
      confetti({ particleCount: 40, spread: 50 });
    }
  }, [score, levelIndex]);

  // ── Input handler ───────────────────────────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setInputVal(e.target.value);

    const hitIndex = invadersRef.current.findIndex(inv => !inv.isHit && inv.expectedClass.toLowerCase() === val);
    if (hitIndex !== -1) {
      setInputVal('');
      setCombo(c => c + 1);
      const newCombo = combo + 1;
      const bonus = newCombo >= 3 ? 150 : 100;
      if (newCombo >= 3) setLastHitMsg(`🔥 x${newCombo} COMBO! +${bonus}`);
      else setLastHitMsg(`✅ Hit! +${bonus}`);
      setTimeout(() => setLastHitMsg(''), 900);

      setScore(s => {
        const next = s + bonus;
        scoreRef.current = next;
        return next;
      });
      setActiveInvaders(prev => prev.filter((_, i) => i !== hitIndex));
    }
  };

  // ── Lobby handlers ──────────────────────────────────────────────────
  const handleCreateRoom = () => {
    if (!username.trim()) return toast.error('Please enter a username');
    if (!selectedChar) return toast.error('Please select a character');
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomId(code);
    roomIdRef.current = code;
    socket?.emit('join_invaders', { username, character: selectedChar, roomId: code });
    setGameState('lobby');
  };

  const handleJoinRoom = () => {
    if (!username.trim()) return toast.error('Please enter a username');
    if (!selectedChar) return toast.error('Please select a character');
    if (!roomId.trim()) return toast.error('Please enter a room code');
    const clean = roomId.trim().toUpperCase();
    setRoomId(clean);
    roomIdRef.current = clean;
    socket?.emit('join_invaders', { username, character: selectedChar, roomId: clean });
    setGameState('lobby');
  };

  const handleSetSpeed = (val: number) => {
    setLobbySpeed(val);
    socket?.emit('invaders_set_speed', { roomId: roomIdRef.current || roomId, speedMultiplier: val });
  };

  const handleStartGame = () => {
    socket?.emit('start_invaders', { roomId: roomIdRef.current || roomId });
  };

  // ════════════════════════════════════════════════════════════════════
  // SETUP SCREEN
  // ════════════════════════════════════════════════════════════════════
  if (gameState === 'setup') {
    return (
      <div className="w-full min-h-full bg-[#0a0e1a] flex flex-col items-center justify-center p-6 text-gray-200 overflow-auto">
        <div className="w-full max-w-4xl bg-[#111827] border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col md:flex-row gap-8 my-8">
          {/* Left: form */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-tight">
                👾 Invaders: Battle Mode
              </h2>
              <p className="text-sm text-gray-400 mt-1">Last defender standing wins! Type the correct Tailwind class to destroy invaders.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Callsign</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} maxLength={12} placeholder="Enter nickname..." className="w-full px-4 py-3 bg-[#0a0e1a] border border-gray-700 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors font-bold text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Mode</label>
              <div className="flex bg-[#0a0e1a] p-1 rounded-xl border border-gray-800">
                <button type="button" onClick={() => setIsCreating(true)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isCreating ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Create Room</button>
                <button type="button" onClick={() => setIsCreating(false)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isCreating ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Join Room</button>
              </div>
            </div>

            {!isCreating && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Room Code</label>
                <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} maxLength={4} placeholder="e.g. AB3X" className="w-full px-4 py-3 bg-[#0a0e1a] border border-gray-700 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors font-mono font-bold text-sm tracking-widest uppercase text-center" />
              </div>
            )}

            <button onClick={isCreating ? handleCreateRoom : handleJoinRoom} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-transform transform active:scale-95 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
              👾 {isCreating ? 'Create Battle Room' : 'Join Battle'}
            </button>
            <button onClick={onExit} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition">Back to Solo</button>
          </div>

          {/* Right: character grid */}
          <div className="w-full md:w-[45%] flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Defender</label>
            <div className="grid grid-cols-4 gap-2 bg-[#0a0e1a] p-4 rounded-2xl border border-gray-800 overflow-y-auto max-h-[320px]">
              {CHARACTERS.map(c => (
                <button key={c.id} type="button" onClick={() => setSelectedChar(c)} className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${selectedChar?.id === c.id ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-transparent bg-[#111827] hover:border-gray-700'}`}>
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wide mt-1 text-gray-400">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  // LOBBY SCREEN
  // ════════════════════════════════════════════════════════════════════
  if (gameState === 'lobby') {
    const isHost = socket?.id === hostId;
    const effectiveRoomId = roomIdRef.current || roomId;

    return (
      <div className="w-full min-h-full bg-[#0a0e1a] flex flex-col items-center justify-center p-6 text-gray-200 overflow-auto">
        <div className="w-full max-w-2xl bg-[#111827] border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col gap-6 my-8">
          <div className="text-center">
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-black uppercase tracking-widest">Battle Lobby</span>
            <h2 className="text-3xl font-black text-white mt-3">Room: <span className="text-cyan-400 tracking-wider font-mono">{effectiveRoomId}</span></h2>
            <p className="text-sm text-gray-400 mt-1">Share this code — last defender alive wins! 👾</p>
          </div>

          {/* Speed selector — host only */}
          {isHost && (
            <div className="bg-[#0a0e1a] border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">⚡ Invader Speed (Host Setting)</h3>
              <div className="grid grid-cols-2 gap-2">
                {SPEED_PRESETS.map(p => (
                  <button key={p.value} onClick={() => handleSetSpeed(p.value)} className={`py-3 rounded-xl font-bold text-sm transition-all ${lobbySpeed === p.value ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-[#111827] border border-gray-800 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-300'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-500 text-center">This speed applies to everyone in the room.</p>
            </div>
          )}

          {!isHost && (
            <div className="bg-[#0a0e1a] border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-400">Speed set by host: <span className="font-bold text-cyan-400">{SPEED_PRESETS.find(p => p.value === lobbySpeed)?.label ?? `${lobbySpeed}x`}</span></p>
            </div>
          )}

          {/* Players */}
          <div className="bg-[#0a0e1a] border border-gray-800 rounded-2xl p-4 flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-800 pb-2">Defenders ({players.length})</h3>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {players.map((p, i) => (
                <div key={p.id || i} className="flex items-center gap-3 bg-[#111827] p-3 rounded-xl border border-gray-800">
                  <span className="text-3xl">{p.character.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-white">{p.username}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{p.id === hostId ? 'Host 👑' : 'Defender'}</p>
                  </div>
                  {p.id === socket?.id && <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 rounded text-[9px] font-bold">You</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {isHost ? (
              <button onClick={handleStartGame} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition transform active:scale-95 text-lg uppercase tracking-wider">
                👾 Launch Invasion!
              </button>
            ) : (
              <div className="w-full text-center py-3 bg-[#0a0e1a] border border-gray-800 rounded-xl">
                <span className="text-sm font-semibold text-gray-400 animate-pulse">Waiting for host to launch...</span>
              </div>
            )}
            <button onClick={() => { socket?.disconnect(); setGameState('setup'); }} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition">Leave Lobby</button>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  // PLAYING SCREEN
  // ════════════════════════════════════════════════════════════════════
  if (gameState === 'playing') {
    const sortedPlayers = [...players].sort((a, b) => {
      if (a.isEliminated !== b.isEliminated) return a.isEliminated ? 1 : -1;
      return b.score - a.score;
    });

    return (
      <div className="flex w-full h-full bg-[#0a0e1a] text-white font-sans overflow-hidden flex-col lg:flex-row">
        {/* Main game */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* HUD */}
          <div className="px-4 py-2 bg-[#111827] border-b border-cyan-500/30 flex justify-between items-center z-10 shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-tight">👾 Invaders</h2>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase rounded border border-blue-500/30">
                Lv{currentLevel.levelNumber}: {currentLevel.title}
              </span>
              <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {SPEED_PRESETS.find(p => p.value === serverSpeed)?.label ?? `${serverSpeed}x`}
              </span>
            </div>
            <div className="flex items-center gap-6 font-mono">
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest">Score</span>
                <span className="text-xl font-black text-cyan-400">{score}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest">Lives</span>
                <div className="flex gap-0.5 text-rose-500 text-xs">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className={i < lives ? 'opacity-100' : 'opacity-10'}>❤️</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Game area */}
          <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#16213e] via-[#0f172a] to-[#020617]">
            {/* Animated starfield */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="absolute w-px h-px bg-white rounded-full opacity-30 animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 90}%`, animationDelay: `${Math.random() * 3}s` }} />
            ))}

            {/* Combo flash */}
            <AnimatePresence>
              {lastHitMsg && (
                <motion.div
                  key={lastHitMsg + Date.now()}
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-black text-sm rounded-full backdrop-blur"
                >
                  {lastHitMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game over overlay */}
            {isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-950/80 backdrop-blur-md z-20">
                <div className="text-center p-8 bg-[#111827] rounded-3xl border-2 border-rose-500 shadow-[0_0_80px_rgba(225,29,72,0.4)]">
                  <span className="text-6xl mb-4 block animate-bounce">💥</span>
                  <h2 className="text-3xl font-black text-rose-400 uppercase tracking-widest mb-2">Eliminated!</h2>
                  <p className="text-slate-300 text-lg font-mono mb-4">Score: <span className="text-white font-black">{score}</span></p>
                  <p className="text-sm text-gray-400 animate-pulse">Watching others fight... 👀</p>
                </div>
              </div>
            )}

            {/* Ground */}
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent border-t border-slate-700/30 z-0" />

            {/* Invaders */}
            <AnimatePresence>
              {activeInvaders.map(invader => (
                <motion.div
                  key={invader.uid}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.8, filter: 'blur(8px)' }}
                  className="absolute flex flex-col items-center z-10"
                  style={{ left: `${invader.x}%`, top: `${invader.y}%`, transform: 'translate(-50%,-50%)' }}
                >
                  <div className="bg-[#0a0e1a]/90 backdrop-blur border border-cyan-500/60 text-cyan-200 text-xs font-bold px-3 py-1.5 rounded-full mb-2 shadow-[0_0_12px_rgba(6,182,212,0.4)] whitespace-nowrap">
                    {invader.instruction}
                  </div>
                  <div className={`transition-all duration-300 ${invader.baseClasses}`}>
                    <span className="opacity-40 text-xs font-mono">&lt;div/&gt;</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="p-3 lg:p-4 bg-[#111827] border-t-2 border-cyan-500 shrink-0 shadow-[0_-8px_30px_rgba(6,182,212,0.15)]">
            {combo >= 2 && (
              <div className="text-center mb-1">
                <span className="text-xs font-black text-amber-400">🔥 {combo}x COMBO STREAK!</span>
              </div>
            )}
            <div className="max-w-3xl mx-auto flex items-center gap-4 relative">
              <span className="absolute left-4 text-cyan-500 font-mono text-xl font-black">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                disabled={isGameOver}
                placeholder={isGameOver ? 'Eliminated... watching...' : 'Type Tailwind class here...'}
                className="w-full bg-[#0a0e1a] border-2 border-slate-700 focus:border-cyan-500 rounded-xl py-3 pl-12 pr-4 text-xl font-mono text-cyan-300 placeholder:text-gray-600 placeholder:italic outline-none transition-colors disabled:opacity-40"
                autoFocus autoComplete="off" spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Leaderboard sidebar */}
        <div className="w-full lg:w-72 flex flex-col bg-[#111827] border-l border-cyan-500/20 overflow-y-auto shrink-0">
          <div className="p-4 border-b border-gray-800 bg-[#0a0e1a]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-0.5">⚡ Live Scoreboard</h3>
            <p className="text-[10px] text-gray-500">Last defender standing wins!</p>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {sortedPlayers.map(p => {
              const isMe = p.id === socket?.id;
              return (
                <div key={p.id} className={`p-3 rounded-xl border flex flex-col gap-1 transition-all ${isMe ? 'bg-cyan-500/10 border-cyan-500/40' : 'bg-[#0a0e1a] border-gray-800'} ${p.isEliminated ? 'opacity-40 grayscale' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs truncate">
                      <span className="text-xl">{p.character.emoji}</span>
                      <span className={`truncate ${isMe ? 'text-cyan-400' : 'text-white'}`}>{p.username}</span>
                    </div>
                    <span className="font-mono text-xs text-gray-400 font-bold shrink-0">{p.score}</span>
                  </div>
                  {p.isEliminated && <div className="text-[9px] uppercase font-black text-rose-500 tracking-widest">💥 Eliminated</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  // ENDED SCREEN
  // ════════════════════════════════════════════════════════════════════
  if (gameState === 'ended') {
    const sorted = [...players].sort((a, b) => b.score - a.score);
    return (
      <div className="w-full min-h-full bg-[#0a0e1a] flex flex-col items-center justify-center p-6 text-gray-200 overflow-auto">
        <div className="w-full max-w-2xl bg-[#111827] border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(6,182,212,0.2)] flex flex-col items-center gap-6 text-center my-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl animate-bounce">🏆</span>
            <h2 className="text-4xl font-black text-white mt-2">Invasion Repelled!</h2>
            {winner && <p className="text-lg text-cyan-400 font-bold">{winner.character.emoji} {winner.username} survived the longest!</p>}
          </div>

          <div className="w-full bg-[#0a0e1a] border border-gray-800 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-800 pb-2">Final Standings</h3>
            <div className="flex flex-col gap-2 mt-2">
              {sorted.map((p, i) => (
                <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl border ${i === 0 ? 'bg-amber-500/10 border-amber-500/30' : i === 1 ? 'bg-slate-800/40 border-slate-700' : 'bg-[#111827] border-gray-800/60'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-amber-500 text-white' : i === 1 ? 'bg-slate-400 text-white' : 'bg-gray-700 text-gray-400'}`}>{i + 1}</span>
                    <span className="text-2xl">{p.character.emoji}</span>
                    <span className="font-bold text-sm text-white">{p.username}</span>
                  </div>
                  <span className="font-mono font-black text-white">{p.score} pts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button onClick={() => { setGameState('setup'); setWinner(null); }} className="flex-1 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.3)] text-sm uppercase tracking-wider">Play Again</button>
            <button onClick={onExit} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-gray-300 font-black rounded-xl transition border border-slate-700 text-sm uppercase tracking-wider">Back to Solo</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
