
import React, { useState, useEffect } from 'react';
import { LEVELS, GRID_SIZE } from './constants';
import { TileType, Position } from './types';
import GameGrid from './components/GameGrid';
import CodeEditor from './components/CodeEditor';
import { getMentorFeedback } from './services/geminiService';
import { soundService } from './services/SoundService';
import { API_BASE_URL } from '../../App';

const PythonGame: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const currentLevel = LEVELS[currentLevelIdx];

  const [code, setCode] = useState(currentLevel.initialCode);
  const [playerPos, setPlayerPos] = useState<Position>(currentLevel.startPos);
  const [rotation, setRotation] = useState(90); // 0=Up, 90=Right, 180=Down, 270=Left
  const [isExecuting, setIsExecuting] = useState(false);
  const [feedback, setFeedback] = useState("Greetings, Cadet! I am Py-Bot. Ready to code? 🚀");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const lvl = LEVELS[currentLevelIdx];
    setPlayerPos(lvl.startPos);
    setRotation(90);
    setCode(lvl.initialCode);
    setIsSuccess(false);
    setIsFailure(false);
    setFeedback(`Mission ${lvl.id}: ${lvl.title}. Systems online! 🛰️`);
    
    soundService.playMusic('bgm_python');
    return () => soundService.stopMusic();
  }, [currentLevelIdx]);

  const updateMentor = async (userCode: string, error: string | null = null) => {
    setIsAiLoading(true);
    const msg = await getMentorFeedback(userCode, error, currentLevel.title, currentLevel.instruction);
    setFeedback(msg);
    setIsAiLoading(false);
  };

  const checkWallAhead = (pos: Position, rot: number): boolean => {
    const rad = (rot * Math.PI) / 180;
    const dx = Math.round(Math.sin(rad));
    const dy = Math.round(-Math.cos(rad));
    const nx = pos.x + dx;
    const ny = pos.y + dy;
    if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return true;
    return currentLevel.grid[ny][nx] === TileType.WALL;
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setIsFailure(false);
    setIsSuccess(false);
    
    let simPos = { ...currentLevel.startPos };
    let simRot = 90;
    setPlayerPos(simPos);
    setRotation(simRot);

    const executionQueue: (() => Promise<void>)[] = [];
    const context: Record<string, any> = {};

    const createCommand = (cmd: string) => {
      if (cmd === 'robot.move_forward()') {
        executionQueue.push(async () => {
          const rad = (simRot * Math.PI) / 180;
          const dx = Math.round(Math.sin(rad));
          const dy = Math.round(-Math.cos(rad));
          const nx = simPos.x + dx;
          const ny = simPos.y + dy;

          if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) throw new Error("Robot hit the boundary of the galaxy! 🌌");
          if (currentLevel.grid[ny][nx] === TileType.WALL) throw new Error("Clang! Robot hit a space rock! 🪨");
          
          simPos = { x: nx, y: ny };
          setPlayerPos({ ...simPos });
        });
      } else if (cmd === 'robot.turn_right()') {
        executionQueue.push(async () => {
          simRot = (simRot + 90) % 360;
          setRotation(simRot);
        });
      } else if (cmd === 'robot.turn_left()') {
        executionQueue.push(async () => {
          simRot = (simRot - 90 + 360) % 360;
          setRotation(simRot);
        });
      }
    };

    const interpreter = (lines: string[]) => {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('#')) continue;

        // Variable assignment
        if (line.includes('=') && !line.startsWith('if')) {
          const [name, val] = line.split('=').map(s => s.trim());
          context[name] = parseInt(val) || val;
        } 
        // For loops
        else if (line.startsWith('for ') && line.endsWith(':')) {
          const rangeMatch = line.match(/range\((.*)\)/);
          if (rangeMatch) {
            const rangeVal = rangeMatch[1].trim();
            const iterations = context[rangeVal] !== undefined ? context[rangeVal] : parseInt(rangeVal);
            
            const block: string[] = [];
            let j = i + 1;
            while (j < lines.length && (lines[j].startsWith('  ') || lines[j].startsWith('\t') || lines[j].trim() === '')) {
              if (lines[j].trim()) block.push(lines[j]);
              j++;
            }
            
            for (let k = 0; k < iterations; k++) {
              interpreter(block.map(b => b.substring(2))); // Strip indentation
            }
            i = j - 1;
          }
        }
        // If statements
        else if (line.startsWith('if ') && line.endsWith(':')) {
          const condition = line.replace('if ', '').replace(':', '').trim();
          
          const block: string[] = [];
          let j = i + 1;
          while (j < lines.length && (lines[j].startsWith('  ') || lines[j].startsWith('\t') || lines[j].trim() === '')) {
            if (lines[j].trim()) block.push(lines[j]);
            j++;
          }

          executionQueue.push(async () => {
            let isTrue = false;
            if (condition === 'robot.is_wall_ahead()') {
              isTrue = checkWallAhead(simPos, simRot);
            }

            if (isTrue) {
               for (const subLine of block) {
                 const trimmedSub = subLine.trim();
                 if (trimmedSub === 'robot.turn_right()') {
                   simRot = (simRot + 90) % 360;
                   setRotation(simRot);
                 } else if (trimmedSub === 'robot.turn_left()') {
                   simRot = (simRot - 90 + 360) % 360;
                   setRotation(simRot);
                 } else if (trimmedSub === 'robot.move_forward()') {
                    const rad = (simRot * Math.PI) / 180;
                    simPos = { x: simPos.x + Math.round(Math.sin(rad)), y: simPos.y + Math.round(-Math.cos(rad)) };
                    setPlayerPos({...simPos});
                    soundService.play('move');
                 }
               }
            }
          });
          i = j - 1;
        }
        // Basic Commands
        else {
          createCommand(line);
        }
      }
    };

    try {
      interpreter(code.split('\n'));
      
      for (const step of executionQueue) {
        await new Promise(r => setTimeout(r, 450));
        await step();
      }

      if (simPos.x === currentLevel.goalPos.x && simPos.y === currentLevel.goalPos.y) {
        setIsSuccess(true);
        setFeedback("Mission Success! Your code is stellar! 🏆");
        soundService.play('win');

        // Log to backend
        try {
          await fetch(`${API_BASE_URL}/api/analytics/log`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('token') || '',
            },
            body: JSON.stringify({
              type: 'game',
              title: `PyQuest: ${currentLevel.title}`,
              category: 'Coding',
              points: 50,
              score: 100
            }),
          });
        } catch (err) {
          console.error('Error logging game activity:', err);
        }
      } else {
        throw new Error("Target not reached. Recalculate and try again! 📡");
      }
    } catch (err: any) {
      setIsFailure(true);
      setFeedback(err.message);
      updateMentor(code, err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  console.log("PythonGame Mounted, Current Level:", currentLevelIdx);
  if (!currentLevel) return <div className="text-white p-10">Error loading level logic.</div>;

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center rounded-3xl overflow-hidden py-8 pt-20 px-2">
      <header className="w-full max-w-6xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-12">
            <span className="text-2xl">🐍</span>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
            PyQuest
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 px-4 py-2 rounded-full border border-slate-800 text-sm font-medium flex gap-4">
            <span className="text-slate-500">LEVEL</span>
            <span className="text-indigo-400">{currentLevel.id} / {LEVELS.length}</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-xl font-semibold mb-2 text-indigo-300 flex items-center gap-2">
              <span className="text-sm opacity-50">#0{currentLevel.id}</span> {currentLevel.title}
            </h2>
            <p className="text-slate-400 mb-4">{currentLevel.description}</p>
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl flex gap-3">
               <span className="text-indigo-400">🎯</span>
               <p className="text-sm text-indigo-100 font-medium">{currentLevel.instruction}</p>
            </div>
          </div>

          <GameGrid 
            grid={currentLevel.grid} 
            playerPos={playerPos} 
            goalPos={currentLevel.goalPos} 
            rotation={rotation}
          />

          <div className="flex gap-4">
            <button
              onClick={handleRunCode}
              disabled={isExecuting || isSuccess}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isExecuting 
                  ? 'bg-slate-800 text-slate-500' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-lg shadow-emerald-500/20'
              }`}
            >
              {isExecuting ? "EXECUTING..." : "▶ RUN CODE"}
            </button>
            
            {isSuccess && (
              <button
                onClick={() => setCurrentLevelIdx(i => Math.min(i + 1, LEVELS.length - 1))}
                className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-400 text-slate-900 rounded-xl font-bold text-lg animate-pulse"
              >
                NEXT SECTOR →
              </button>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex-1 min-h-[450px]">
            <CodeEditor code={code} onChange={setCode} isExecuting={isExecuting} />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-inner relative">
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-3xl animate-float border border-slate-700">
                🤖
              </div>
              <div className="flex-1">
                <p className={`text-slate-200 text-lg leading-relaxed ${isAiLoading ? 'opacity-30' : ''}`}>
                  {feedback}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                   {currentLevel.concepts.map(concept => (
                     <span key={concept} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] uppercase font-bold rounded-full border border-indigo-500/20">
                       {concept}
                     </span>
                   ))}
                </div>
              </div>
            </div>
            {isAiLoading && (
               <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                 <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
               </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PythonGame;
