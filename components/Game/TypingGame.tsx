
import React, { useState, useEffect, useRef } from 'react';
import { TYPING_LEVELS } from './typingData';
import { soundService } from './services/SoundService';
import { API_BASE_URL } from '../../App';

interface Lilypad {
  id: number;
  word: string;
  x: number; // percentage
  y: number; // percentage
  angle: number;
}

const FROG_SKINS = ['🐸', '🐸', '👑', '🧙‍♂️'];

const TypingGame: React.FC = () => {
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLevel = TYPING_LEVELS[levelIdx];
  
  const [pads, setPads] = useState<Lilypad[]>([]);
  const [frogPadId, setFrogPadId] = useState<number>(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start');
  const [frogSkin, setFrogSkin] = useState(FROG_SKINS[0]);
  
  const padIdCounter = useRef(0);
  const gameTimerRef = useRef<number>();

  // Initialize Pads
  const initPads = () => {
    const initialPads: Lilypad[] = [];
    // Start pad (empty/safe)
    initialPads.push({
      id: 0,
      word: "START",
      x: 10,
      y: 40,
      angle: 0
    });
    
    // Generate next few pads
    padIdCounter.current = 1;
    for (let i = 1; i < 5; i++) {
       initialPads.push(generatePad(initialPads[i-1], i));
    }
    setPads(initialPads);
    setFrogPadId(0);
    padIdCounter.current = 5;
  };

  const generatePad = (prevPad: Lilypad, index: number): Lilypad => {
    // Zig zag pattern
    const isUp = index % 2 !== 0; 
    const newX = prevPad.x + 18;
    // Shifted up to 45% center, +/- 15% spread (range 30-60%) to avoid bottom input area
    const newY = 40 + (isUp ? -15 : 15) + (Math.random() * 10 - 5);
    
    const word = currentLevel.words[Math.floor(Math.random() * currentLevel.words.length)];
    
    return {
      id: padIdCounter.current++,
      word: word,
      x: newX,
      y: newY,
      angle: Math.random() * 360
    };
  };

  // Timer
  useEffect(() => {
    if (gameState === 'playing') {
      gameTimerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
             setGameState('lost');
             return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(gameTimerRef.current);
  }, [gameState]);



// ... inside component ...

  // Win
  useEffect(() => {
    if (score >= 20) {
        setGameState('won');
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
              title: `Froggy Jump: Level ${currentLevel.id}`,
              category: 'Typing',
              points: 75,
              score: 100
            }),
          });
        } catch (err) {
          console.error('Error logging typing activity:', err);
        }
    }
  }, [score]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing') {
      const id = window.setInterval(() => {
        setTimeLeft(prev => {
          // If we hit 0, lose
          if (prev <= 0) {
             setGameState('lost');
             soundService.play('lose');
             soundService.stopMusic();
             return 0;
          }
          // Slowed down: 0.05 per 100ms = 0.5s per real second. (2x duration feel)
          return Math.max(0, prev - 0.05); 
        });
      }, 100);
      gameTimerRef.current = id;
    }
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [gameState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'playing') return;
    
    const val = e.target.value;
    setInput(val);

    // Find next pad
    const currentPadIdx = pads.findIndex(p => p.id === frogPadId);
    if (currentPadIdx === -1 || currentPadIdx >= pads.length - 1) return;

    const nextPad = pads[currentPadIdx + 1];

    if (val.trim().toLowerCase() === nextPad.word.toLowerCase()) {
       // JUMP!
       setFrogPadId(nextPad.id);
       setScore(s => s + 1);
       setInput("");
       setTimeLeft(prev => Math.min(prev + 5, 60)); // Cap at 60s, +5s bonus
       soundService.play('jump');
       soundService.play('correct', 0.3);

       // Add new pad specific to game constraints
       setPads(prev => {
          const newPads = [...prev];
          const lastPad = newPads[newPads.length - 1];
          newPads.push(generatePad(lastPad, newPads.length));
          return newPads;
       });
    }
  };

  const startGame = () => {
    // Force stop any existing audio/timer
    soundService.stopMusic();
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    
    // Reset Logic
    padIdCounter.current = 0;
    setScore(0);
    setInput("");
    initPads();
    
    // Set time AND state together
    // Using a timeout to ensure clean slate if coming from 'lost' (React batching safety)
    setGameState('start'); // Temporary reset if needed, or just go separate
    setTimeLeft(60);
    
    setTimeout(() => {
       setGameState('playing');
       soundService.play('start');
       soundService.playMusic('bgm_frog');
    }, 10);
  };

  const nextLevel = () => {
    if (levelIdx < TYPING_LEVELS.length - 1) {
       setLevelIdx(p => p + 1);
       startGame();
    } else {
       setLevelIdx(0);
       startGame();
    }
  };

  // Calculate Camera Offset to keep frog centered-ish
  const frogPad = pads.find(p => p.id === frogPadId);
  const cameraOffset = frogPad ? 30 - frogPad.x : 0;

  return (
    <div className="w-full h-full min-h-[700px] bg-sky-300 relative overflow-hidden flex flex-col items-center border-4 border-emerald-600 rounded-3xl shadow-2xl font-comic ">
        {/* Pond Water Background */}
        <div className="absolute inset-0 bg-sky-400 opacity-50 z-0">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 animate-pulse"></div>
        </div>
        
        {/* Ripples */}
        {gameState === 'playing' && (
           <div className="absolute top-1/2 left-1/2 w-[200vw] h-[200vw] bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-ping"></div>
        )}

        {/* HUD */}
        <div className="z-20  w-full p-4 flex justify-between bg-white/30 backdrop-blur-md border-b border-white/40 shadow-sm relative">
            <div>
               <h2 className="text-3xl font-black text-emerald-800 drop-shadow-sm">FROGGY JUMP 🐸</h2>
               <div className="text-emerald-900 font-bold text-sm bg-white/50 px-2 py-1 rounded inline-block">
                  Level {currentLevel.id}: {currentLevel.title}
               </div>
            </div>
            
            <div className="flex gap-4 items-center">
               <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-emerald-900">TIME</span>
                  <div className="w-32 h-6 bg-emerald-900/20 rounded-full border-2 border-emerald-800 overflow-hidden relative">
                     <div 
                       className={`h-full transition-all duration-100 ${timeLeft < 3 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} 
                       style={{width: `${(timeLeft / 60) * 100}%`}}
                     />
                     <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white z-10">{timeLeft.toFixed(1)}s</span>
                  </div>
               </div>
               <div className="bg-white/80 p-2 rounded-xl text-center min-w-[3rem]">
                  <div className="text-xs font-bold text-slate-500">SCORE</div>
                  <div className="text-2xl font-black text-emerald-600">{score}/20</div>
               </div>
            </div>
        </div>

        {/* Game Area (Scrolls) */}
        <div className="absolute inset-0 z-10 pt-32 pointer-events-none transition-transform duration-500 ease-out" style={{ transform: `translateX(${cameraOffset}%) mt-10` }}>
           
           {/* Connection Lines (Stems) */}
           <svg className="absolute inset-0 w-full mt-16 h-full z-0 opacity-30">
              {pads.map((pad, i) => {
                 if (i === 0) return null;
                 const prev = pads[i-1];
                 return (
                    <line 
                      key={`line-${pad.id}`} 
                      x1={`${prev.x}%`} y1={`${prev.y}%`} 
                      x2={`${pad.x}%`} y2={`${pad.y}%`} 
                      stroke="#065f46" 
                      strokeWidth="2" 
                      strokeDasharray="4"
                    />
                 );
              })}
           </svg>

           {/* Pads */}
           {pads.map(pad => {
              const isPast = pad.id < frogPadId;
              const isNext = pad.id === frogPadId + 1;

              return (
                <div 
                  key={pad.id}
                  className="absolute w-32 h-32 flex items-center justify-center mt-16 transition-all duration-300"
                  style={{ left: `${pad.x}%`, top: `${pad.y}%`, opacity: isPast ? 0.6 : 1, transform: `translate(-50%, -50%) scale(${isPast ? 0.8 : 1})` }}
                >
                   {/* Lilypad */}
                   <div className="w-24 h-24 bg-emerald-500 rounded-full border-b-8 border-emerald-700 shadow-xl relative transform rotate-12 transition-colors duration-300">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-sky-300 rounded-bl-full transition-colors duration-300"></div> {/* Cutout */}
                      <div className="absolute mt- inset-2 border-2 border-emerald-400/30 rounded-full"></div>
                   </div>

                   {/* Word Label */}
                   {!isPast && (
                     <div className={`absolute -bottom-8 bg-white/90 px-3 py-1 rounded-lg font-black text-lg border-2 shadow-md z-30 transition-all
                        ${isNext ? 'border-emerald-500 text-emerald-800 scale-110' : 'border-slate-300 text-slate-400 scale-90'}
                     `}>
                        {pad.word}
                     </div>
                   )}
                </div>
              );
           })}

           {/* Independent Frog Character */}
           {frogPad && (
             <div 
               className="absolute w-32 h-32 mt-16 flex items-center justify-center z-20 transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)"
               style={{ 
                 left: `${frogPad.x}%`, 
                 top: `${frogPad.y}%`, 
                 transform: 'translate(-50%, -50%)' 
               }}
             >
                <div className="text-7xl animate-bounce filter drop-shadow-lg relative -top-6">
                  {frogSkin}
                </div>
             </div>
           )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-8 z-30 w-full max-w-md px-4">
           <input
             type="text"
             autoFocus
             value={input}
             onChange={handleInputChange}
             disabled={gameState !== 'playing'}
             placeholder={gameState === 'playing' ? "Type next word to jump!" : ""}
             className="w-full bg-white/90 backdrop-blur border-4 border-emerald-500 rounded-2xl py-4 px-6 text-center text-3xl font-black text-emerald-800 placeholder:text-emerald-800/30 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 shadow-2xl transition-all"
           />
        </div>

        {/* Start Overlay */}
        {gameState === 'start' && (
           <div className="absolute inset-0 z-40 bg-sky-900/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl text-center max-w-md border-b-8 border-sky-200">
                  <div className="text-6xl mb-4">🐸</div>
                  <h1 className="text-4xl font-black text-sky-900 mb-2">FROGGY JUMP</h1>
                  <p className="text-sky-600 font-bold mb-6 text-lg">{currentLevel.description}</p>
                  <p className="text-slate-400 mb-8">Type the words on the lilypads to help the frog cross safely!</p>
                  <button onClick={startGame} className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-2xl rounded-xl shadow-[0_6px_0_rgb(6,95,70)] active:shadow-none active:translate-y-1 transition-all">
                     START HOPPING!
                  </button>
              </div>
           </div>
        )}
        
        {/* Game Over Overlay */}
        {gameState === 'lost' && (
           <div className="absolute inset-0 z-40 bg-sky-900/90 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl text-center max-w-md border-b-8 border-red-200">
                  <div className="text-6xl mb-4">💦</div>
                  <h1 className="text-4xl font-black text-red-500 mb-2">SPLASH!</h1>
                  <p className="text-slate-500 font-bold mb-6 text-lg">You ran out of time!</p>
                  <button onClick={startGame} className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-2xl rounded-xl shadow-[0_6px_0_rgb(6,95,70)] active:shadow-none active:translate-y-1 transition-all">
                     TRY AGAIN
                  </button>
              </div>
           </div>
        )}

        {/* Won Overlay */}
        {gameState === 'won' && (
           <div className="absolute inset-0 z-40 bg-emerald-900/90 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl text-center max-w-md border-b-8 border-yellow-200 animate-bounce-in">
                  <div className="text-6xl mb-4">👑</div>
                  <h1 className="text-4xl font-black text-emerald-600 mb-2">POND MASTER!</h1>
                  <p className="text-slate-500 font-bold mb-6 text-lg">You crossed the pond safely!</p>
                  <button onClick={nextLevel} className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-2xl rounded-xl shadow-[0_6px_0_rgb(6,95,70)] active:shadow-none active:translate-y-1 transition-all">
                     NEXT LEVEL
                  </button>
              </div>
           </div>
        )}
    </div>
  );
};

export default TypingGame;
