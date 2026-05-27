import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../../../App';
import { challengeLevels } from '../challengeData';
import { CHARACTERS, Character } from './CharacterSelect';

interface Player {
  id: string;
  username: string;
  character: Character;
  score: number;
  currentLevelIndex: number;
  isHost: boolean;
}

interface MultiplayerChallengeProps {
  onExit: () => void;
}

export default function MultiplayerChallenge({ onExit }: MultiplayerChallengeProps) {
  // Socket and Connection State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(true); // create vs join UI toggle

  // Game States
  const [gameState, setGameState] = useState<'setup' | 'lobby' | 'playing' | 'ended'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [hostId, setHostId] = useState('');
  const [winner, setWinner] = useState<Player | null>(null);

  // Active Play States for Local Player
  const [localLevelIndex, setLocalLevelIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [appliedInput, setAppliedInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [syntaxMode, setSyntaxMode] = useState<'css' | 'tailwind'>('tailwind');

  const currentLevel = challengeLevels[localLevelIndex];

  // Initialize socket
  useEffect(() => {
    const s = io(API_BASE_URL);
    setSocket(s);

    s.on('connect', () => {
      console.log('Multiplayer challenge connected');
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
      setAppliedInput('');
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
    setAppliedInput('');
    setIsSuccess(false);
  }, [localLevelIndex]);

  // Actions
  const handleCreateRoom = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    if (!selectedChar) {
      toast.error('Please select a character');
      return;
    }
    // Generate a clean 4-letter room code
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

  const handleRunCode = () => {
    setAppliedInput(userInput);
    let passed = false;
    if (syntaxMode === 'css') {
      passed = currentLevel.expectedRegex.every(r => new RegExp(r, 'i').test(userInput));
    } else {
      passed = currentLevel.expectedTailwind.every(tw => userInput.includes(tw));
    }

    if (passed) {
      setIsSuccess(true);
      toast.success('Awesome!', { duration: 1000 });
      
      const nextIdx = localLevelIndex + 1;
      setTimeout(() => {
        if (socket) {
          socket.emit('submit_challenge_solve', {
            roomId,
            currentLevelIndex: nextIdx,
            totalLevels: challengeLevels.length
          });
        }
        if (nextIdx < challengeLevels.length) {
          setLocalLevelIndex(nextIdx);
        }
      }, 1000);
    } else {
      toast.error('Incorrect. Keep trying!', { duration: 1500 });
    }
  };

  // UI Helpers
  const getFrogBg = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-400';
      default: return 'bg-green-500';
    }
  };

  const getLilyBorder = (color: string) => {
    switch (color) {
      case 'red': return 'border-red-500/50 bg-red-500/20';
      case 'yellow': return 'border-yellow-400/50 bg-yellow-400/20';
      default: return 'border-green-500/50 bg-green-500/20';
    }
  };

  const getEditorBefore = () => {
    const baseClass = currentLevel.mode === 'flex' ? 'flex' : 'grid';
    if (currentLevel.targetSelector) {
      const targetClass = currentLevel.targetSelector.replace('.', '');
      return `<div id="${currentLevel.mode === 'flex' ? 'pond' : 'garden'}" className="${baseClass} ...">\n  <div className="${targetClass} `;
    }
    return `<div id="${currentLevel.mode === 'flex' ? 'pond' : 'garden'}" className="${baseClass} `;
  };

  const getEditorAfter = () => {
    if (currentLevel.targetSelector) {
      return `">🐸</div>\n</div>`;
    }
    return `">\n  {/* frogs */}\n</div>`;
  };

  const containerTailwind = syntaxMode === 'tailwind' && !currentLevel.targetSelector ? appliedInput : '';
  const itemTailwind = syntaxMode === 'tailwind' && currentLevel.targetSelector ? appliedInput : '';

  // 1. SETUP / ENTRY SCREEN
  if (gameState === 'setup') {
    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200">
        <div className="w-full max-w-4xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-8">
          
          {/* Left setup box: Form & Character Selector */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 uppercase tracking-tight">
                Multiplayer Race
              </h2>
              <p className="text-sm text-gray-400">Race against up to 8+ players to solve CSS Layout levels!</p>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Nickname</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={12}
                placeholder="Enter nickname..."
                className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-500 transition-colors font-bold text-sm"
              />
            </div>

            {/* Mode Select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Connection Mode</label>
              <div className="flex bg-[#0d1117] p-1 rounded-xl border border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsCreating(true)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isCreating ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  Create Room
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isCreating ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  Join Room
                </button>
              </div>
            </div>

            {/* Room Code (if joining) */}
            {!isCreating && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Room Code</label>
                <input
                  type="text"
                  value={roomId}
                  onChange={e => setRoomId(e.target.value)}
                  maxLength={4}
                  placeholder="Enter 4-letter code..."
                  className="w-full px-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-500 transition-colors font-bold text-sm tracking-widest uppercase text-center"
                />
              </div>
            )}

            <button
              onClick={isCreating ? handleCreateRoom : handleJoinRoom}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-xl shadow-lg transition-transform transform active:scale-95 text-md uppercase tracking-wider flex items-center justify-center gap-2"
            >
              🏁 {isCreating ? 'Create & Enter Lobby' : 'Join Race Lobby'}
            </button>

            <button
              onClick={onExit}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition"
            >
              Back to Arcade
            </button>
          </div>

          {/* Right box: Avatar emoji selector */}
          <div className="w-full md:w-[45%] flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Character</label>
            <div className="grid grid-cols-4 gap-2 bg-[#0d1117] p-4 rounded-2xl border border-gray-800 overflow-y-auto max-h-[300px]">
              {CHARACTERS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedChar(c)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all hover:scale-105
                    ${selectedChar?.id === c.id
                      ? 'border-emerald-500 bg-emerald-500/20 shadow-lg'
                      : 'border-transparent bg-[#161b22] hover:border-gray-700'}`}
                >
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

  // 2. WAITING LOBBY SCREEN
  if (gameState === 'lobby') {
    const isHost = socket?.id === hostId;

    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200">
        <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative">
          
          <div className="text-center">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest">
              Lobby
            </span>
            <h2 className="text-3xl font-black text-white mt-3">Room Code: <span className="text-emerald-400 tracking-wider font-mono">{roomId}</span></h2>
            <p className="text-sm text-gray-400 mt-1">Share this code with friends to join up to 8+ players!</p>
          </div>

          {/* Players Grid */}
          <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-4 min-h-[160px] flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-800 pb-2">
              Racer Lineup ({players.length}/8+)
            </h3>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {players.map((p, i) => (
                <div
                  key={p.id || i}
                  className="flex items-center gap-3 bg-[#161b22] p-3 rounded-xl border border-gray-800 relative"
                >
                  <span className="text-3xl">{p.character.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-white">{p.username}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">
                      {p.id === hostId ? 'Host 👑' : 'Racer'}
                    </p>
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
              <button
                onClick={handleStartGame}
                disabled={players.length < 1}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-black rounded-xl shadow-lg transition transform active:scale-95 text-lg uppercase tracking-wider"
              >
                🏁 Start the Race!
              </button>
            ) : (
              <div className="w-full text-center py-3 bg-[#0d1117] border border-gray-800 rounded-xl">
                <span className="text-sm font-semibold text-gray-400 animate-pulse">
                  Waiting for Host to start...
                </span>
              </div>
            )}
            
            <button
              onClick={() => {
                if (socket) socket.disconnect();
                setGameState('setup');
              }}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition"
            >
              Leave Lobby
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 3. MAIN REAL-TIME GAMEPLAY SCREEN
  if (gameState === 'playing') {
    // Sort players by level index (desc) to show live race rankings
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.currentLevelIndex !== a.currentLevelIndex) {
        return b.currentLevelIndex - a.currentLevelIndex;
      }
      return b.score - a.score;
    });

    return (
      <div className="flex w-full h-full bg-[#0d1117] text-gray-200 font-sans rounded-xl overflow-hidden border border-gray-800 shadow-2xl flex-col md:flex-row">
        
        {/* Left Panel: Challenge, instructions & Editor */}
        <div className="w-full md:w-[32%] bg-[#161b22] flex flex-col h-full border-r border-gray-800 relative z-10">
          {/* Header Info */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-gray-800">
            <div>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-black">
                Room: {roomId}
              </p>
              <h2 className="text-base font-black text-white flex items-center gap-1.5">
                Level {localLevelIndex + 1} of {challengeLevels.length}
              </h2>
            </div>
            <button
              onClick={() => {
                if (socket) socket.disconnect();
                onExit();
              }}
              className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-red-950/20 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 rounded transition"
            >
              Quit Race
            </button>
          </div>

          {/* Syntax Mode Toggle */}
          <div className="flex items-center justify-center p-2 bg-[#161b22] border-b border-gray-800 space-x-2">
            <button
              onClick={() => setSyntaxMode('css')}
              className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${syntaxMode === 'css' ? 'bg-indigo-500 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
            >
              CSS
            </button>
            <button
              onClick={() => setSyntaxMode('tailwind')}
              className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${syntaxMode === 'tailwind' ? 'bg-sky-500 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Tailwind
            </button>
          </div>

          {/* Instructions */}
          <div className="p-4 border-b border-gray-800 overflow-y-auto max-h-[30%]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">Goal</p>
            <p className="text-xs text-gray-300 leading-relaxed font-semibold">
              {currentLevel.instructions}
            </p>
          </div>

          {/* Code Editor */}
          <div className="flex-1 bg-[#0d1117] flex flex-col relative pb-16">
            <div className="bg-gray-800/50 px-4 py-1.5 text-xs font-mono text-gray-400 border-b border-gray-800 flex justify-between">
              <span>{syntaxMode === 'css' ? 'style.css' : 'App.tsx'}</span>
            </div>
            <div className="p-4 font-mono text-xs flex-1 flex flex-col overflow-y-auto">
              <div className="text-gray-500 whitespace-pre-wrap">{getEditorBefore()}</div>
              <textarea
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                className="w-full bg-transparent text-emerald-400 outline-none resize-none my-1 ml-4 border-l-2 border-gray-700 pl-2 placeholder:text-gray-700 focus:border-emerald-500 transition-colors min-h-[60px]"
                spellCheck={false}
                placeholder={syntaxMode === 'css' ? "/* Type CSS here */" : "/* tailwind-classes */"}
                autoFocus
              />
              <div className="text-gray-500 whitespace-pre-wrap">{getEditorAfter()}</div>
            </div>

            {/* Run Button */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0d1117] to-transparent flex justify-end">
              <button
                onClick={handleRunCode}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition active:scale-95 text-xs flex items-center gap-1.5"
              >
                <span>▶</span> Run Code
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel: Visual Game Board */}
        <div id="layout-master-game-board" className="flex-1 bg-[#1f2937] relative overflow-hidden flex items-center justify-center p-8 border-r border-gray-800">
          {/* Target Layer (Lilypads) */}
          <div
            className="absolute inset-8 border-2 border-gray-700/30 rounded-xl"
            style={{
              display: currentLevel.mode === 'flex' ? 'flex' : 'grid',
              ...(currentLevel.targetContainerCSS || {})
            }}
          >
            {currentLevel.frogs.map((frog, i) => (
              <div
                key={`target-${frog.id}-${i}`}
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center m-1 shadow-inner opacity-50 ${getLilyBorder(frog.color)}`}
                style={currentLevel.targetItemCSS?.[frog.id] || {}}
              >
                <span className="text-2xl opacity-50 filter grayscale">🍃</span>
              </div>
            ))}
          </div>

          {/* Active Frog Layer */}
          <div
            id={currentLevel.mode === 'flex' ? 'pond' : 'garden'}
            className={`absolute inset-8 rounded-xl transition-all duration-500 ease-in-out ${containerTailwind}`}
            style={{
              display: currentLevel.mode === 'flex' ? 'flex' : 'grid',
              ...(isSuccess && currentLevel.targetContainerCSS ? currentLevel.targetContainerCSS : {})
            }}
          >
            {currentLevel.frogs.map((frog, i) => {
              const isTargeted = currentLevel.targetSelector && currentLevel.targetSelector.includes(frog.color);
              return (
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 45, damping: 15 }}
                  key={`active-${frog.id}-${i}`}
                  className={`w-16 h-16 rounded-full flex items-center justify-center m-1 shadow-2xl ${getFrogBg(frog.color)} ${frog.color} ${isTargeted ? itemTailwind : ''}`}
                  style={{
                    ...(isSuccess && currentLevel.targetItemCSS?.[frog.id] ? currentLevel.targetItemCSS[frog.id] : {})
                  }}
                >
                  <span className="text-3xl drop-shadow-md">🐸</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Live Race Leaderboard */}
        <div className="w-full md:w-[23%] bg-[#161b22] flex flex-col h-full p-4 gap-4 overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Live Rankings</h3>
            <p className="text-[10px] text-gray-500">First to solve all levels wins!</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {sortedPlayers.map((p, idx) => {
              const progressPct = (p.currentLevelIndex / challengeLevels.length) * 100;
              const isLocalPlayer = p.id === socket?.id;

              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-colors
                    ${isLocalPlayer
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-md shadow-emerald-950/20'
                      : 'bg-[#0d1117] border-gray-800'}`}
                >
                  {/* Top line: Name & Emoji */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold truncate">
                      <span className="text-sm">{p.character.emoji}</span>
                      <span className={`truncate ${isLocalPlayer ? 'text-emerald-400' : 'text-white'}`}>
                        {p.username}
                      </span>
                      {isLocalPlayer && (
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded">You</span>
                      )}
                    </div>
                    <span className="font-mono text-gray-400 font-bold shrink-0">
                      Lvl {p.currentLevelIndex + 1}/{challengeLevels.length}
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // 4. VICTORY / END SCREEN
  if (gameState === 'ended') {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200">
        <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 text-center">
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl animate-bounce">🏆</span>
            <h2 className="text-4xl font-black text-white mt-2">Race Complete!</h2>
            {winner && (
              <p className="text-lg text-emerald-400 font-bold">
                Winner: {winner.character.emoji} {winner.username}
              </p>
            )}
          </div>

          {/* Final Standings / Leaderboard */}
          <div className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-800 pb-2">
              Final Standings
            </h3>
            <div className="flex flex-col gap-2.5 mt-2">
              {sortedPlayers.map((p, i) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all
                    ${i === 0 ? 'bg-amber-500/10 border-amber-500/30' : 
                      i === 1 ? 'bg-slate-800/40 border-slate-700' :
                      'bg-[#161b22] border-gray-800/60'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs
                      ${i === 0 ? 'bg-amber-500 text-white shadow' :
                        i === 1 ? 'bg-slate-500 text-white' :
                        'bg-gray-800 text-gray-400'}`}>
                      {i + 1}
                    </span>
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
            <button
              onClick={() => {
                setGameState('setup');
                setWinner(null);
              }}
              className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition shadow-lg text-sm uppercase tracking-wider"
            >
              Play Again
            </button>
            <button
              onClick={onExit}
              className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-gray-300 font-black rounded-xl transition border border-slate-700 text-sm uppercase tracking-wider"
            >
              Exit Race
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
}
