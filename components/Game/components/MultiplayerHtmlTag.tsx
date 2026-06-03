import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../../../App';
import { HTML_TAG_STAGES } from '../htmlTagMasterData';
import { CHARACTERS, Character } from './CharacterSelect';

const flattenedLevels = HTML_TAG_STAGES.flatMap(stage => stage.levels);

interface Player {
  id: string;
  username: string;
  character: Character;
  score: number;
  currentLevelIndex: number;
  isHost: boolean;
}

interface MultiplayerHtmlTagProps {
  onExit: () => void;
}

export default function MultiplayerHtmlTag({ onExit }: MultiplayerHtmlTagProps) {
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
  const [userInput, setUserInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  
  const currentLevel = flattenedLevels[localLevelIndex];
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize socket
  useEffect(() => {
    const s = io(API_BASE_URL);
    setSocket(s);

    s.on('connect', () => {
      console.log('Multiplayer HTML Tag connected');
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
      setUserInput('');
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
    setUserInput('');
    setIsSuccess(false);
    setShake(false);
    if (gameState === 'playing' && inputRef.current) {
        inputRef.current.focus();
    }
  }, [localLevelIndex, gameState]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setIsSuccess(false);
    setShake(false);
  };

  const checkAnswer = () => {
    const sanitizedInput = userInput.trim().toLowerCase();
    const isCorrect = currentLevel.expectedTags.some(tag => 
      sanitizedInput === tag || 
      sanitizedInput === `<${tag}>` || 
      sanitizedInput === `</${tag}>` ||
      sanitizedInput === `<${tag}/>`
    );

    if (isCorrect) {
      setIsSuccess(true);
      toast.success('Awesome!', { duration: 1000 });
      
      const nextIdx = localLevelIndex + 1;
      setTimeout(() => {
        if (socket) {
          socket.emit('submit_challenge_solve', {
            roomId,
            currentLevelIndex: nextIdx,
            totalLevels: flattenedLevels.length
          });
        }
        if (nextIdx < flattenedLevels.length) {
          setLocalLevelIndex(nextIdx);
        }
      }, 1000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  if (gameState === 'setup') {
    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200 rounded-xl">
        <div className="w-full max-w-4xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 uppercase tracking-tight">
                HTML Tag Multiplayer Race
              </h2>
              <p className="text-sm text-gray-400">Race against up to 8+ players to guess HTML Tags!</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Nickname</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} maxLength={12} placeholder="Enter nickname..." className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white outline-none focus:border-blue-500 transition-colors font-bold text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Connection Mode</label>
              <div className="flex bg-[#0d1117] p-1 rounded-xl border border-gray-800">
                <button type="button" onClick={() => setIsCreating(true)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isCreating ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Create Room</button>
                <button type="button" onClick={() => setIsCreating(false)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isCreating ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Join Room</button>
              </div>
            </div>

            {!isCreating && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Room Code</label>
                <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} maxLength={4} placeholder="Enter 4-letter code..." className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white outline-none focus:border-blue-500 transition-colors font-bold text-sm tracking-widest uppercase text-center" />
              </div>
            )}

            <button onClick={isCreating ? handleCreateRoom : handleJoinRoom} className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black rounded-xl shadow-lg transition-transform transform active:scale-95 text-md uppercase tracking-wider flex items-center justify-center gap-2">
              🏁 {isCreating ? 'Create & Enter Lobby' : 'Join Race Lobby'}
            </button>

            <button onClick={onExit} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition">Back to Arcade</button>
          </div>

          <div className="w-full md:w-[45%] flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Character</label>
            <div className="grid grid-cols-4 gap-2 bg-[#0d1117] p-4 rounded-2xl border border-gray-800 overflow-y-auto max-h-[300px]">
              {CHARACTERS.map(c => (
                <button key={c.id} type="button" onClick={() => setSelectedChar(c)} className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${selectedChar?.id === c.id ? 'border-blue-500 bg-blue-500/20 shadow-lg' : 'border-transparent bg-[#161b22] hover:border-gray-700'}`}>
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
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">Lobby</span>
            <h2 className="text-3xl font-black text-white mt-3">Room Code: <span className="text-blue-400 tracking-wider font-mono">{roomId}</span></h2>
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
                    <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/40 text-blue-400 rounded text-[9px] font-bold">You</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {isHost ? (
              <button onClick={handleStartGame} disabled={players.length < 1} className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-black rounded-xl shadow-lg transition transform active:scale-95 text-lg uppercase tracking-wider">
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
      <div className="flex w-full h-full bg-[#0d1117] text-gray-200 font-sans rounded-xl overflow-hidden border border-gray-800 shadow-2xl flex-col md:flex-row">
        
        {/* Left Panel: Instructions */}
        <div className="w-full md:w-[32%] bg-[#161b22] flex flex-col h-full border-r border-gray-800 relative z-10">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-gray-800">
            <div>
              <p className="text-[10px] text-blue-400 uppercase tracking-widest font-black">Room: {roomId}</p>
              <h2 className="text-base font-black text-white flex items-center gap-1.5">Level {localLevelIndex + 1} of {flattenedLevels.length}</h2>
            </div>
            <button onClick={() => { if (socket) socket.disconnect(); onExit(); }} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-red-950/20 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 rounded transition">Quit Race</button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Identify the Tag</h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">{currentLevel.description}</p>
          </div>
        </div>

        {/* Center Panel: Visual Mockup & Input */}
        <div className="flex-1 bg-[#1f2937] flex flex-col relative overflow-hidden pattern-dots pattern-gray-800 pattern-bg-transparent pattern-size-4 pattern-opacity-100">
          <div className="flex-1 flex items-center justify-center p-12">
            <motion.div key={currentLevel.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white text-gray-900 rounded-xl p-8 shadow-2xl max-w-lg w-full min-h-[200px] flex items-center justify-center text-center font-serif text-xl border-4 border-gray-300 relative">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 border-b border-gray-300 rounded-t-lg flex items-center px-2 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="mt-6 whitespace-pre-wrap">{currentLevel.visualMock}</div>
            </motion.div>
          </div>

          <div className="h-48 bg-[#0d1117] border-t border-gray-800 p-8 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-md flex items-center gap-4 relative">
              <span className="text-2xl text-gray-500 font-mono">&lt;</span>
              <motion.input
                ref={inputRef}
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isSuccess}
                placeholder="tagname"
                className={`flex-1 bg-gray-900 border-2 rounded-lg px-4 py-3 text-2xl font-mono text-center outline-none transition-colors ${isSuccess ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : shake ? 'border-red-500 text-red-400 bg-red-500/10' : 'border-gray-700 text-blue-400 focus:border-blue-500 focus:bg-gray-800'}`}
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <span className="text-2xl text-gray-500 font-mono">&gt;</span>
            </div>
            
            <button onClick={checkAnswer} disabled={isSuccess || !userInput} className={`mt-6 px-8 py-2 rounded-full font-bold transition-all ${isSuccess ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'}`}>
              {isSuccess ? 'Correct!' : 'Check Tag'}
            </button>

            <AnimatePresence>
              {isSuccess && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="text-6xl filter drop-shadow-2xl">✨🎉✨</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: Live Race Leaderboard */}
        <div className="w-full md:w-[23%] bg-[#161b22] flex flex-col h-full p-4 gap-4 overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-500">Live Rankings</h3>
            <p className="text-[10px] text-gray-500">First to solve all tags wins!</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {sortedPlayers.map((p) => {
              const progressPct = (p.currentLevelIndex / flattenedLevels.length) * 100;
              const isLocalPlayer = p.id === socket?.id;

              return (
                <div key={p.id} className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-colors ${isLocalPlayer ? 'bg-blue-500/10 border-blue-500/40 shadow-md shadow-blue-950/20' : 'bg-[#0d1117] border-gray-800'}`}>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold truncate">
                      <span className="text-sm">{p.character.emoji}</span>
                      <span className={`truncate ${isLocalPlayer ? 'text-blue-400' : 'text-white'}`}>{p.username}</span>
                      {isLocalPlayer && <span className="text-[8px] bg-blue-500/20 text-blue-400 px-1 rounded">You</span>}
                    </div>
                    <span className="font-mono text-gray-400 font-bold shrink-0">Lvl {p.currentLevelIndex + 1}/{flattenedLevels.length}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              );
            })}
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
              <p className="text-lg text-blue-400 font-bold">Winner: {winner.character.emoji} {winner.username}</p>
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
            <button onClick={() => { setGameState('setup'); setWinner(null); }} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition shadow-lg text-sm uppercase tracking-wider">Play Again</button>
            <button onClick={onExit} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-gray-300 font-black rounded-xl transition border border-slate-700 text-sm uppercase tracking-wider">Exit Race</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
