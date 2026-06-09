import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../../../App';
import { CHARACTERS, Character } from './CharacterSelect';
import DinoGame from '../../DinoGame';

interface Player {
  id: string;
  username: string;
  character: Character;
  score: number;
  isDead: boolean;
  isHost: boolean;
}

interface MultiplayerDinoProps {
  onExit: () => void;
}

export default function MultiplayerDino({ onExit }: MultiplayerDinoProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(true);

  const [gameState, setGameState] = useState<'setup' | 'lobby' | 'playing' | 'ended'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [hostId, setHostId] = useState('');
  const [winner, setWinner] = useState<Player | null>(null);

  useEffect(() => {
    const s = io(API_BASE_URL);
    setSocket(s);

    s.on('connect', () => {
      console.log('Multiplayer Dino connected');
    });

    s.on('room_update', ({ users, gameState: roomState, hostId: currentHostId }) => {
      setPlayers(users);
      setHostId(currentHostId);
      if (roomState === 'playing') {
        setGameState('playing');
      }
    });

    s.on('dino_started', ({ users }) => {
      setPlayers(users);
      setGameState('playing');
      toast.success('🚀 The race has started! Survive as long as you can!', { icon: '🏁' });
    });

    s.on('dino_ended', ({ winner: matchWinner, users }) => {
      setWinner(matchWinner);
      setPlayers(users);
      setGameState('ended');
      if (s.id === matchWinner.id) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        toast.success('🏆 You survived the longest!', { duration: 5000 });
      } else {
        toast(`Game over! ${matchWinner.username} won the race!`, { icon: '🏁' });
      }
    });

    s.on('error_message', (msg: string) => {
      toast.error(msg);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const handleCreateRoom = () => {
    if (!username.trim()) return toast.error('Please enter a username');
    if (!selectedChar) return toast.error('Please select a character');
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomId(code);
    if (socket) {
      socket.emit('join_dino', { username, character: selectedChar, roomId: code });
      setGameState('lobby');
    }
  };

  const handleJoinRoom = () => {
    if (!username.trim()) return toast.error('Please enter a username');
    if (!selectedChar) return toast.error('Please select a character');
    if (!roomId.trim()) return toast.error('Please enter a Room Code');
    const cleanCode = roomId.trim().toUpperCase();
    setRoomId(cleanCode);
    if (socket) {
      socket.emit('join_dino', { username, character: selectedChar, roomId: cleanCode });
      setGameState('lobby');
    }
  };

  const handleStartGame = () => {
    if (socket) socket.emit('start_dino', { roomId });
  };

  const handleProgress = (score: number) => {
    if (socket && gameState === 'playing') {
      socket.emit('dino_progress', { roomId, score });
    }
  };

  const handleGameOver = (finalScore: number) => {
    if (socket && gameState === 'playing') {
      socket.emit('dino_game_over', { roomId, finalScore });
      toast.error(`You died! Final Score: ${finalScore}. Waiting for others...`);
    }
  };

  if (gameState === 'setup') {
    return (
      <div className="w-full h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200 rounded-xl overflow-auto">
        <div className="w-full max-w-4xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-8 mt-12 mb-12">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500 uppercase tracking-tight">
                Dino Survival Race
              </h2>
              <p className="text-sm text-gray-400">Compete against friends. Last one standing wins!</p>
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

            <button onClick={onExit} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition">Back to Solo</button>
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
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'lobby') {
    const isHost = socket?.id === hostId;
    return (
      <div className="w-full h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200 rounded-xl overflow-auto">
        <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative mt-12 mb-12">
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
                🏁 Start Survival Race!
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
      if (a.isDead !== b.isDead) return a.isDead ? 1 : -1;
      return b.score - a.score;
    });

    return (
      <div className="flex w-full h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] bg-[#0d1117] text-slate-200 font-sans rounded-xl overflow-hidden border border-gray-800 shadow-2xl flex-col lg:flex-row relative">
        <div className="flex-1 overflow-hidden relative">
            <DinoGame 
              isMultiplayer={true} 
              onProgress={handleProgress} 
              onGameOver={handleGameOver} 
              multiplayerGameState={gameState} 
            />
            <button onClick={() => { if (socket) socket.disconnect(); onExit(); }} className="absolute top-4 left-4 z-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-red-950/40 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 rounded transition backdrop-blur-sm">Quit Match</button>
        </div>
        
        {/* Leaderboard Panel */}
        <div className="w-full lg:w-80 flex flex-col h-full bg-[#161b22] border-l border-slate-800/80 overflow-y-auto">
          <div className="p-4 border-b border-slate-800 bg-[#0d1117]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1">Live Rankings</h3>
            <p className="text-[10px] text-gray-500">Last one standing wins!</p>
          </div>

          <div className="flex flex-col gap-2.5 p-4 mt-1">
            {sortedPlayers.map((p) => {
              const isLocalPlayer = p.id === socket?.id;
              return (
                <div key={p.id} className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-colors ${isLocalPlayer ? 'bg-indigo-500/10 border-indigo-500/40 shadow-md shadow-indigo-950/20' : 'bg-[#0d1117] border-gray-800'} ${p.isDead ? 'opacity-50 grayscale' : ''}`}>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold truncate">
                      <span className="text-xl leading-none">{p.character.emoji}</span>
                      <span className={`truncate ${isLocalPlayer ? 'text-indigo-400' : 'text-white'}`}>{p.username}</span>
                      {isLocalPlayer && <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-1 rounded ml-1">You</span>}
                    </div>
                    <span className="font-mono text-gray-400 font-bold shrink-0">{p.score} pts</span>
                  </div>
                  {p.isDead && (
                    <div className="text-[9px] uppercase font-black tracking-widest text-red-500 mt-1">Eliminated</div>
                  )}
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
      <div className="w-full h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] bg-[#0d1117] flex flex-col items-center justify-center p-6 text-gray-200 rounded-xl overflow-auto">
        <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 text-center mt-12 mb-12">
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl animate-bounce">🏆</span>
            <h2 className="text-4xl font-black text-white mt-2">Match Complete!</h2>
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

