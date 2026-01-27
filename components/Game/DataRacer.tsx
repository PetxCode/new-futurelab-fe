
import React, { useState, useEffect, useRef } from 'react';
import { RACER_LEVELS, DATA_ITEMS, DataType } from './dataRacerData';
import { soundService } from './services/SoundService';
import { API_BASE_URL } from '../../App';

interface GameItem {
  id: number;
  type: DataType;
  value: string;
  lane: 0 | 1 | 2;
  y: number; // Percentage 0-100
  collected: boolean;
}

const LANES = [0, 1, 2];
const CAR_Y = 80;


const SCENERY_ITEMS = ['🌲', '🌳', '🌴', '🌵', '🏢', '🏠'];

const DataRacer: React.FC = () => {
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLevel = RACER_LEVELS[levelIdx];
  
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'levelcomplete'>('start');
  const [playerLane, setPlayerLane] = useState<0 | 1 | 2>(1);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [items, setItems] = useState<GameItem[]>([]);
  const [combo, setCombo] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  
  const requestRef = useRef<number>();
  const lastSpawnTime = useRef<number>(0);
  const itemIdCounter = useRef(0);
  const playerLaneRef = useRef<0 | 1 | 2>(1);
  const gameTimeRef = useRef(0);

  // Key Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft') {
        setPlayerLane(prev => {
           const next = Math.max(0, prev - 1) as 0 | 1 | 2;
           playerLaneRef.current = next; 
           return next;
        });
      } else if (e.key === 'ArrowRight') {
         setPlayerLane(prev => {
            const next = Math.min(2, prev + 1) as 0 | 1 | 2;
            playerLaneRef.current = next; 
            return next;
         });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Game Loop
  const updateGame = (time: number) => {
    if (gameState !== 'playing') return;
    
    // Increment speed over time/score
    if (time - gameTimeRef.current > 5000) { // Every 5 seconds
       setSpeedMultiplier(prev => Math.min(prev + 0.1, 2.5)); // Cap at 2.5x speed
       gameTimeRef.current = time;
    }

    // 1. Spawn Items
    const effectiveSpawnRate = currentLevel.spawnRate / speedMultiplier;
    
    if (time - lastSpawnTime.current > effectiveSpawnRate) {
      const isTarget = Math.random() > 0.5;
      const typeToSpawn: DataType = isTarget 
        ? currentLevel.targetType 
        : (Object.keys(DATA_ITEMS) as DataType[]).filter(t => t !== currentLevel.targetType)[Math.floor(Math.random() * 4)];
      
      const valPool = DATA_ITEMS[typeToSpawn] || ['?'];
      const val = valPool[Math.floor(Math.random() * valPool.length)];

      const newItem: GameItem = {
        id: itemIdCounter.current++,
        type: typeToSpawn,
        value: val,
        lane: Math.floor(Math.random() * 3) as 0 | 1 | 2,
        y: -15, // Start further up
        collected: false
      };
      
      setItems(prev => [...prev, newItem]);
      lastSpawnTime.current = time;
    }

    // 2. Move Items & Collision
    setItems(prev => {
      const nextItems: GameItem[] = [];
      let hpChange = 0;
      let scoreChange = 0;
      let comboReset = false;
      let comboInc = false;

      prev.forEach(item => {
        if (item.collected) return; 

        // Move down with speed multiplier
        const nextY = item.y + (currentLevel.speed * 0.1 * speedMultiplier);
        
        // Collision Box
        const hitCar = item.lane === playerLaneRef.current && Math.abs(nextY - CAR_Y) < 6; // slightly more forgiving hitbox

// ... inside collision logic ...

// ... inside collision logic ...

        if (hitCar) {
           item.collected = true; 
           if (item.type === currentLevel.targetType) {
             scoreChange += 10 + (combo * 2);
             comboInc = true;
             soundService.play('collect');
           } else {
             hpChange -= 20;
             comboReset = true;
             soundService.play('error');
           }
        } 
        else if (nextY > 110) { 
           // passed
        } 
        else {
           nextItems.push({ ...item, y: nextY });
        }
      });

      if (hpChange < 0) setHealth(h => Math.max(0, h + hpChange));
      if (scoreChange > 0) setScore(s => s + scoreChange);
      
      if (comboReset) setCombo(0);
      if (comboInc) setCombo(c => Math.min(c + 1, 10));

      return nextItems;
    });

    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, levelIdx]);

  useEffect(() => {
    if (health <= 0) {
        setGameState('gameover');
        soundService.play('lose');
        soundService.stopMusic();
    }
    if (score >= 200) {
        setGameState('levelcomplete');
        soundService.play('win');
        soundService.stopMusic();

        // Log to backend
        try {
          fetch(`${API_BASE_URL}/api/analytics/log`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('token') || '',
            },
            body: JSON.stringify({
              type: 'game',
              title: `Data Racer: Track ${currentLevel.title}`,
              category: 'Data Science',
              points: 150,
              score: 100
            }),
          });
        } catch (err) {
          console.error('Error logging racer activity:', err);
        }
    }
  }, [health, score]);

  const startGame = () => {
    setGameState('playing');
    setItems([]);
    setScore(0);
    setHealth(100);
    setCombo(0);
    setSpeedMultiplier(1);
    setPlayerLane(1);
    playerLaneRef.current = 1;
    lastSpawnTime.current = performance.now();
    gameTimeRef.current = performance.now();
    soundService.play('engine');
    soundService.play('start');
    soundService.playMusic('bgm_racer');
  };

  // Stop music on unmount
  useEffect(() => {
     return () => soundService.stopMusic();
  }, []);

  const nextLevel = () => {
    if (levelIdx < RACER_LEVELS.length - 1) {
      setLevelIdx(prev => prev + 1);
      startGame();
    } else {
      setLevelIdx(0);
      startGame();
    }
  };

  return (
    <div className="w-full h-full min-h-[600px] bg-sky-900 relative overflow-hidden flex flex-col items-center border-4 border-slate-700 rounded-3xl shadow-2xl">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-100 z-0"></div>
      
      {/* Animated Clouds */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-80">
        <div className="absolute top-10 left-[-20%] animate-[float_20s_linear_infinite] text-6xl opacity-80">☁️</div>
        <div className="absolute top-24 left-[-10%] animate-[float_25s_linear_infinite_2s] text-9xl opacity-60">☁️</div>
        <div className="absolute top-5 right-[-20%] animate-[float_30s_linear_infinite_5s] text-7xl opacity-70">☁️</div>
      </div>

      {/* Horizon/Cityscape */}
      <div className="absolute bottom-[40%] w-full h-32 bg-[url('https://www.transparenttextures.com/patterns/city-skyline.png')] bg-repeat-x opacity-30 z-0 animate-[slide_60s_linear_infinite]"></div>

      {/* Perspective Grid / Ground */}
      <div className="absolute bottom-0 w-full h-[45%] bg-emerald-600 z-0 overflow-hidden transform-gpu perspective-500">
         {/* Moving Trees/Scenery */}
         {gameState === 'playing' && (
           <>
            <div className={`absolute -left-10 bottom-0 text-5xl animate-[passBy_1s_linear_infinite]`} style={{animationDuration: `${2 / speedMultiplier}s`}}>🌲</div>
            <div className={`absolute -right-10 bottom-0 text-5xl animate-[passByRight_1s_linear_infinite_0.5s]`} style={{animationDuration: `${2.5 / speedMultiplier}s`}}>🌳</div>
           </>
         )}
      </div>

      {/* Road Layer */}
      <div className="absolute bottom-0 h-[90%] w-full max-w-lg mx-auto z-10 perspective-1000">
         <div className="w-full h-full bg-slate-800 relative border-x-8 border-slate-700 transform-style-3d rotate-x-60 origin-bottom">
            {/* Lane Dividers */}
            <div className="absolute left-1/3 top-0 bottom-0 w-2 border-l-4 border-dashed border-white/30"></div>
            <div className="absolute right-1/3 top-0 bottom-0 w-2 border-r-4 border-dashed border-white/30"></div>
            
            {/* Speed Lines */}
            <div 
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"
              style={{
                animation: gameState === 'playing' ? `scrollRoad ${0.5 / speedMultiplier}s linear infinite` : 'none'
              }}
            ></div>
         </div>
      </div>

      {/* HUD & Foreground */}
      <div className="z-20 w-full p-4 flex justify-between bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg items-end">
        <div className="flex gap-4 items-center">
           {/* Speedometer */}
           <div className="relative w-20 h-20 bg-slate-900 rounded-full border-4 border-slate-700 shadow-xl flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border-2 border-slate-600 opacity-50"></div>
              {/* Scale marks */}
              {[0, 45, 90, 135, 180, 225, 270].map(deg => (
                 <div key={deg} className="absolute w-1 h-3 bg-white/30 origin-bottom" style={{bottom: '50%', left: 'calc(50% - 2px)', transform: `rotate(${deg - 135}deg) translateY(-28px)`}}></div>
              ))}
              {/* Needle */}
              <div 
                 className="absolute w-1 h-8 bg-red-500 origin-bottom rounded-full transition-transform duration-500 ease-out z-10"
                 style={{ 
                    bottom: '50%', 
                    left: 'calc(50% - 2px)', 
                    transform: `rotate(${(speedMultiplier - 1) * 120 - 120}deg)` // range from -120 to +something
                 }}
              ></div>
              <div className="absolute w-3 h-3 bg-white rounded-full z-20"></div>
              
              <div className="absolute bottom-4 text-[8px] font-black text-white">KM/H</div>
           </div>

           <div>
              <h2 className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-comic drop-shadow">
                DATA RACER
              </h2>
              <div className="mt-1 flex items-center gap-2">
                 <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-black text-white shadow-lg border-2 border-white/20">
                   GET: {currentLevel.targetType.toUpperCase()}
                 </span>
              </div>
           </div>
        </div>
        
        <div className="flex gap-6 text-right">
           <div className="flex flex-col items-center">
             <div className="text-[10px] font-bold text-slate-800">SCORE</div>
             <div className="text-2xl font-black text-white drop-shadow-md">{score}</div>
           </div>
           <div className="flex flex-col items-end">
             <div className="text-[10px] font-bold text-slate-800">HEALTH</div>
             <div className="w-24 h-4 bg-slate-900 rounded-full border border-slate-600 overflow-hidden">
                <div className={`h-full ${health > 30 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-red-500'} transition-all`} style={{width: `${health}%`}}></div>
             </div>
           </div>
        </div>
      </div>

      {/* Items Rendering (Foreground) */}
      <div className="absolute inset-0 w-full max-w-lg mx-auto pointer-events-none z-20 mt-[10%]">
         {items.map(item => !item.collected && (
           <div 
             key={item.id}
             className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform"
             style={{ 
               left: `${(item.lane * 33.33) + 16.66}%`, 
               top: `${item.y}%`,
               scale: `${0.5 + (item.y / 200)}` // Perspective scale effect
             }}
           >
             <div className={`px-4 py-2 rounded-xl font-bold border-b-4 shadow-xl text-sm transition-transform
               ${item.type === currentLevel.targetType 
                 ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white border-blue-700 ring-2 ring-white/50' 
                 : 'bg-slate-700 text-slate-300 border-slate-900'}`}
             >
               {item.value}
             </div>
           </div>
         ))}
      </div>

      {/* Player Car (Foreground Top-Down CSS) */}
      <div className="absolute inset-0 w-full max-w-lg mx-auto pointer-events-none z-30 mt-[10%]">
         <div 
           className="absolute transition-all duration-150 ease-out transform -translate-x-1/2"
           style={{ 
             left: `${(playerLane * 33.33) + 16.66}%`, 
             top: `${CAR_Y}%` 
           }}
         >
           {/* CSS Top-Down Car Construction */}
           <div className="relative w-12 h-20 transition-transform hover:scale-105">
              {/* Wheels */}
              <div className="absolute top-2 -left-1 w-2 h-5 bg-black rounded-l"></div>
              <div className="absolute top-2 -right-1 w-2 h-5 bg-black rounded-r"></div>
              <div className="absolute bottom-2 -left-1 w-2 h-5 bg-black rounded-l"></div>
              <div className="absolute bottom-2 -right-1 w-2 h-5 bg-black rounded-r"></div>
              
              {/* Body */}
              <div className="absolute inset-x-1 inset-y-0 bg-red-600 rounded-2xl shadow-lg flex flex-col items-center">
                 {/* Stripe */}
                 <div className="w-2 h-full bg-white/90"></div>
              </div>
              
              {/* Cockpit */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-5 bg-slate-800 rounded-lg border-2 border-slate-600"></div>
              
              {/* Rear Wing */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-red-700 rounded shadow-md border-t border-red-400"></div>

              {/* Exhaust Fumes */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-6 bg-orange-400/50 blur-md rounded-full animate-rocket-thrust"></div>
           </div>
         </div>
      </div>

      {/* Style Injection for Animations */}
      <style>{`
        @keyframes float {
          from { transform: translateX(0); }
          to { transform: translateX(120vw); }
        }
        @keyframes scrollRoad {
          from { background-position: 0 0; }
          to { background-position: 0 100px; }
        }
        @keyframes passBy {
          from { bottom: 30%; left: 40%; opacity: 0; scale: 0.1; }
          to { bottom: -10%; left: -20%; opacity: 1; scale: 1.5; }
        }
        @keyframes passByRight {
          from { bottom: 30%; right: 40%; opacity: 0; scale: 0.1; }
          to { bottom: -10%; right: -20%; opacity: 1; scale: 1.5; }
        }
      `}</style>


      {/* Overlays */}
      {gameState === 'start' && (
        <div className="absolute inset-0 z-20 bg-slate-950/90 flex items-center justify-center p-6">
           <div className="bg-slate-900 border-4 border-indigo-500 p-8 rounded-3xl max-w-2xl text-center shadow-2xl w-full">
             <h1 className="text-4xl font-black text-white italic mb-2">CHOOSE YOUR TRACK</h1>
             <p className="text-indigo-400 font-bold mb-6 text-lg">Select a data type to master:</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 h-64 overflow-y-auto pr-2 custom-scrollbar">
               {RACER_LEVELS.map((level, idx) => (
                 <button 
                   key={level.id}
                   onClick={() => setLevelIdx(idx)}
                   className={`p-4 rounded-xl border-2 text-left transition-all ${
                     levelIdx === idx 
                       ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-[1.02]' 
                       : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
                   }`}
                 >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-black text-white uppercase text-sm">{level.title}</span>
                      {levelIdx === idx && <span className="text-xs bg-white text-indigo-900 px-1.5 rounded font-bold">SELECTED</span>}
                    </div>
                    <div className="text-xs text-indigo-200 font-mono mb-2">Target: {level.targetType}</div>
                    <p className="text-xs text-slate-400 leading-tight">{level.description}</p>
                 </button>
               ))}
             </div>

             <div className="flex gap-4">
                <div className="flex-1 bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center justify-center gap-3 text-slate-400 text-sm font-bold">
                   <span>⬅️ ➡️ Steer</span>
                   <div className="w-px h-4 bg-slate-600"></div>
                   <span>🏎️ Dodge Obstacles</span>
                </div>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-xl rounded-xl shadow-[0_4px_0_rgb(161,98,7)] active:shadow-none active:translate-y-1 transition-all flex-[2]"
                >
                  RACE START! 🚦
                </button>
             </div>
           </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="absolute inset-0 z-20 bg-red-900/90 flex items-center justify-center p-6">
           <div className="bg-slate-900 border-4 border-red-500 p-8 rounded-3xl max-w-md text-center shadow-2xl">
             <div className="text-6xl mb-4">🔥</div>
             <h1 className="text-4xl font-black text-white mb-2">CRASHED!</h1>
             <p className="text-red-400 font-bold mb-8">Wrong data type caused a system failure.</p>
             <button onClick={startGame} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-xl shadow-[0_4px_0_rgb(153,27,27)] active:shadow-none active:translate-y-1 transition-all">
                RETRY RACE 🔄
             </button>
           </div>
        </div>
      )}

      {gameState === 'levelcomplete' && (
        <div className="absolute inset-0 z-20 bg-emerald-900/90 flex items-center justify-center p-6">
           <div className="bg-slate-900 border-4 border-emerald-500 p-8 rounded-3xl max-w-md text-center shadow-2xl">
             <div className="text-6xl mb-4">🏁</div>
             <h1 className="text-4xl font-black text-white mb-2">FINISH LINE!</h1>
             <p className="text-emerald-400 font-bold mb-8">Data collected successfully.</p>
             <button onClick={nextLevel} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xl rounded-xl shadow-[0_4px_0_rgb(6,95,70)] active:shadow-none active:translate-y-1 transition-all">
                NEXT TRACK 🏆
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default DataRacer;
