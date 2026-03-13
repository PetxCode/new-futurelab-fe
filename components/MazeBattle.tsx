import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../App';
import { User } from '../types';
import BlockCodingEngine from './BlockCodingEngine';

interface MazeUser {
  id: string;
  username: string;
  currentLevel: number;
  finished: boolean;
  finishTime: number | null;
}

interface MazeRoom {
  users: MazeUser[];
  gameState: 'lobby' | 'active' | 'ended';
  startTime: number | null;
  winner: MazeUser | null;
}

interface MazeBattleProps {
  userData: User | null;
}

const MazeBattle: React.FC<MazeBattleProps> = ({ userData }) => {
  const [roomId, setRoomId] = useState('maze');
  const [username, setUsername] = useState(userData?.name || '');
  const [room, setRoom] = useState<MazeRoom | null>(null);
  const [joined, setJoined] = useState(false);
  const [isBattleMode, setIsBattleMode] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Please enter a Room ID and Username");
      return;
    }

    socketRef.current = io(`${API_BASE_URL}/maze-battle`);

    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join_room', { username, roomId });
    });

    socketRef.current.on('room_update', (roomData: MazeRoom) => {
      setRoom(roomData);
    });

    socketRef.current.on('battle_started', (roomData: MazeRoom) => {
      setRoom(roomData);
      setIsBattleMode(true);
      toast.success("Battle Started! Race to Level 15!");
    });

    socketRef.current.on('winner_announced', (winner: MazeUser) => {
      toast((t) => (
        <span>
            🏆 <b>{winner.username}</b> has finished the maze first!
        </span>
      ), { duration: 5000, icon: '🎉' });
      
      if (winner.username === username) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    });

    setJoined(true);
  };

  const startBattle = () => {
    socketRef.current?.emit('start_battle', roomId);
  };

  const updateProgress = (level: number) => {
    socketRef.current?.emit('update_progress', { roomId, level });
  };

  if (isBattleMode) {
    return (
      <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
        {/* Battle Header / Leaderboard */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Maze Battle</span>
                    <span className="text-white font-bold text-lg italic uppercase">Room: {roomId}</span>
                </div>
                <div className="h-10 w-px bg-slate-800 hidden md:block" />
                <div className="flex items-center space-x-3">
                    {room?.users.sort((a, b) => b.currentLevel - a.currentLevel).map((u, i) => (
                        <div key={u.id} className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${u.username === username ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
                            <div className="relative">
                                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}`} className="w-6 h-6 rounded-lg" alt="" />
                                {u.finished && <span className="absolute -top-1 -right-1 text-[10px]">👑</span>}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-[10px] font-bold truncate max-w-[80px] ${u.username === username ? 'text-indigo-400' : 'text-slate-300'}`}>{u.username}</span>
                                <div className="flex items-center space-x-1">
                                    <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full transition-all duration-500 ${u.finished ? 'bg-green-500' : 'bg-indigo-500'}`} 
                                            style={{ width: `${(u.currentLevel / 15) * 100}%` }} 
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase">{u.currentLevel}/15</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={() => {
                    setIsBattleMode(false);
                    setJoined(false);
                    socketRef.current?.disconnect();
                }}
                className="text-slate-500 hover:text-rose-400 text-[10px] font-black uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-xl hover:bg-rose-500/10 hover:border-rose-500/20 transition-all"
            >
                Leave Battle
            </button>
        </div>

        {/* The Game */}
        <div className="flex-1 relative overflow-hidden">
            <BlockCodingEngine userData={userData} battleMode={true} onLevelChange={updateProgress} />
        </div>
      </div>
    );
  }

  if (joined) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"/>
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Battle Lobby</span>
                </div>
                <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase underline decoration-indigo-500/30">Lobby: {roomId}</h1>
                <p className="text-slate-400 font-medium">Waiting for the host to start the battle...</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="text-left space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Joined Players ({room?.users.length || 0})</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {room?.users.map((u) => (
                            <div key={u.id} className="flex items-center space-x-3 bg-slate-900 p-3 rounded-2xl border border-slate-800 group hover:border-indigo-500/30 transition-all">
                                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}`} className="w-10 h-10 rounded-xl group-hover:scale-110 transition-transform" alt="" />
                                <span className={`font-bold text-sm ${u.username === username ? 'text-indigo-400' : 'text-white'}`}>{u.username}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {room?.users[0]?.id === socketRef.current?.id && (
                    <button 
                        onClick={startBattle}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest italic"
                    >
                        Blast Off! (Start Battle)
                    </button>
                )}
            </div>

            <button 
                onClick={() => {
                    setJoined(false);
                    socketRef.current?.disconnect();
                }}
                className="text-slate-500 hover:text-white text-xs font-black uppercase tracking-widest"
            >
                ← Back to Menu
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-slate-950 p-6 overflow-y-auto">
      <div className="max-w-xl w-full space-y-12 py-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/20">
             <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"/>
             <span className="text-[10px] uppercase font-black tracking-widest text-rose-400">Competitive Arena</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-center text-white italic uppercase leading-tight">
            Maze <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 inline-block">Navigator Battle</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm mx-auto">
            Challenge your friends to a race! Who can navigate all 15 levels first?
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Room name</label>
                    <input 
                        type="text" 
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="ENTER-ROOM-ID"
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-3xl py-5 px-8 text-white font-black uppercase tracking-widest focus:border-rose-500/50 outline-none transition-all placeholder:text-slate-700"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">signed Name</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="YOUR CALLSIGN"
                        className="w-full bg-slate-950 border-2 border-slate-800 rounded-3xl py-5 px-8 text-white font-black uppercase tracking-widest focus:border-rose-500/50 outline-none transition-all placeholder:text-slate-700"
                    />
                </div>

                <button 
                    onClick={joinRoom}
                    className="w-full bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black py-6 rounded-3xl shadow-2xl shadow-rose-600/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] italic flex items-center justify-center space-x-3 group"
                >
                    <span>Enter the Arena</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-6 opacity-40">
            <div className="text-center space-y-2">
                <div className="text-white font-black text-2xl">15</div>
                <div className="text-[8px] uppercase font-black tracking-widest text-slate-500">Deadly Levels</div>
            </div>
            <div className="text-center space-y-2 border-x border-slate-800">
                <div className="text-white font-black text-2xl">∞</div>
                <div className="text-[8px] uppercase font-black tracking-widest text-slate-500">Real-time Intel</div>
            </div>
            <div className="text-center space-y-2">
                <div className="text-white font-black text-2xl">01</div>
                <div className="text-[8px] uppercase font-black tracking-widest text-slate-500">True Champion</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MazeBattle;
