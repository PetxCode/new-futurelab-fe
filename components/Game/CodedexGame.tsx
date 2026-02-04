import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { LEVELS, GRID_SIZE } from './codedexData';
import { TileType, Position, GridLevel, ConsoleLevel } from './types';
import GameGrid from './components/GameGrid';
import CodeEditor from './components/CodeEditor';
import { getMentorFeedback } from './services/geminiService';
import { soundService } from './services/SoundService';
import { API_BASE_URL } from '../../App';

const CodedexGame: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const currentLevel = LEVELS[currentLevelIdx];

  const [code, setCode] = useState(currentLevel.initialCode);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(90); 
  const [isExecuting, setIsExecuting] = useState(false);
  const [feedback, setFeedback] = useState("Welcome to Codédex! Are you ready to master Python? 🐍");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      if (window.loadPyodide) {
        if (!pyodideRef.current) {
          try {
            pyodideRef.current = await window.loadPyodide({ indexURL: "/pyodide/" });
            setIsPyodideLoaded(true);
          } catch (err) {
            console.error("Pyodide loading failed", err);
          }
        }
        return;
      }
      const script = document.createElement('script');
      script.src = "/pyodide/pyodide.js";
      script.onload = async () => {
        try {
          pyodideRef.current = await window.loadPyodide({ indexURL: "/pyodide/" });
          setIsPyodideLoaded(true);
        } catch (err) {
          console.error("Pyodide loading failed", err);
        }
      };
      document.body.appendChild(script);
    };
    loadPyodide();
  }, []);

  useEffect(() => {
    const lvl = LEVELS[currentLevelIdx];
    setCode(lvl.initialCode);
    setIsSuccess(false);
    setIsFailure(false);
    setConsoleOutput([]);
    setFeedback(`Mission ${lvl.id}: ${lvl.title}. Let's get to work! 💻`);
    
    if (lvl.type === 'GRID') {
      const gridLvl = lvl as GridLevel;
      setPlayerPos(gridLvl.startPos);
      setRotation(90);
    }
    
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
    if (currentLevel.type !== 'GRID') return false;
    const lvl = currentLevel as GridLevel;
    const rad = (rot * Math.PI) / 180;
    const dx = Math.round(Math.sin(rad));
    const dy = Math.round(-Math.cos(rad));
    const nx = pos.x + dx;
    const ny = pos.y + dy;
    if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return true;
    return lvl.grid[ny][nx] === TileType.WALL;
  };

  const logSuccess = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/analytics/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({
          type: 'game',
          title: `Codédex: ${currentLevel.title}`,
          category: 'Coding',
          points: 1,
          score: 100
        }),
      });
    } catch (err) {
      console.error('Error logging game activity:', err);
    }
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setIsFailure(false);
    setIsSuccess(false);
    setConsoleOutput([]);

    try {
      if (currentLevel.type === 'CONSOLE') {
        if (!pyodideRef.current) throw new Error("Python engine initializing...");
        
        const lvl = currentLevel as ConsoleLevel;
        let capturedOutput = "";

        pyodideRef.current.setStdout({
          batched: (text: string) => {
            capturedOutput += text + "\n";
            setConsoleOutput(prev => [...prev, text]);
          }
        });

        await pyodideRef.current.runPythonAsync(code);
        
        const trimmedOutput = capturedOutput.trim();
        let passed = false;

        if (lvl.expectedOutput && trimmedOutput === lvl.expectedOutput) {
            passed = true;
        } else if (lvl.validationRegex && lvl.validationRegex.test(code)) {
            passed = true;
        } else if (lvl.validationRegex && lvl.validationRegex.test(trimmedOutput)) {
            passed = true;
        }

        if (passed) {
             setIsSuccess(true);
             setFeedback("Passed! Amazing work Cadet. 🌟");
             soundService.play('win');
             await logSuccess();
        } else {
             throw new Error(`Output mismatch. Review your code and try again.`);
        }

      } else {
        const lvl = currentLevel as GridLevel;
        let simPos = { ...lvl.startPos };
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
              if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) throw new Error("Robot hit a boundary!");
              if (lvl.grid[ny][nx] === TileType.WALL) throw new Error("Robot hit a wall!");
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
            if (line.includes('=') && !line.startsWith('if')) {
              const [name, val] = line.split('=').map(s => s.trim());
              context[name] = parseInt(val) || val;
            } 
            else if (line.startsWith('for ') && line.endsWith(':')) {
              const rangeMatch = line.match(/range\((.*)\)/);
              if (rangeMatch) {
                const iterations = parseInt(rangeMatch[1].trim());
                const block: string[] = [];
                let j = i + 1;
                while (j < lines.length && (lines[j].startsWith('  ') || lines[j].startsWith('\t'))) {
                  block.push(lines[j]);
                  j++;
                }
                for (let k = 0; k < iterations; k++) {
                  interpreter(block.map(b => b.substring(2))); 
                }
                i = j - 1;
              }
            }
            else {
              createCommand(line);
            }
          }
        };
    
        interpreter(code.split('\n'));
        for (const step of executionQueue) {
            await new Promise(r => setTimeout(r, 450));
            await step();
        }
    
        if (simPos.x === lvl.goalPos.x && simPos.y === lvl.goalPos.y) {
            setIsSuccess(true);
            setFeedback("Success! Grid mission complete. 🏆");
            soundService.play('win');
            await logSuccess();
        } else {
            throw new Error("Goal not reached. Keep trying!");
        }
      }
    } catch (err: any) {
      setIsFailure(true);
      setFeedback(err.message);
      updateMentor(code, err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  if (!currentLevel) return <div className="text-white p-10">Error loading levels.</div>;

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center rounded-3xl overflow-hidden py-8 pt-20 px-2">
      <header className="w-full max-w-6xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-12">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
            Codédex
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 px-4 py-2 rounded-full border border-slate-800 text-sm font-medium flex gap-4">
            <span className="text-slate-500">LEVEL</span>
            <span className="text-emerald-400">{currentLevel.id} / {LEVELS.length}</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl border-t-emerald-500/30">
            <h2 className="text-xl font-semibold mb-2 text-emerald-300 flex items-center gap-2">
               {currentLevel.title}
            </h2>
            <p className="text-slate-400 mb-4">{currentLevel.description}</p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
               <p className="text-sm text-emerald-100 font-medium">{currentLevel.instruction}</p>
            </div>
          </div>

          {currentLevel.type === 'GRID' ? (
            <GameGrid 
              grid={(currentLevel as GridLevel).grid} 
              playerPos={playerPos} 
              goalPos={(currentLevel as GridLevel).goalPos} 
              rotation={rotation}
            />
          ) : (
            <div className="h-[400px] bg-slate-900 rounded-2xl border border-slate-800 p-6 font-mono text-sm relative overflow-hidden">
                <div className="mt-8 space-y-2">
                    {consoleOutput.length === 0 && <div className="text-slate-600 italic">Waiting...</div>}
                    {consoleOutput.map((line, i) => (
                        <div key={i} className="text-emerald-400">{line}</div>
                    ))}
                </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleRunCode}
              disabled={isExecuting || isSuccess || (currentLevel.type === 'CONSOLE' && !isPyodideLoaded)}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${
                isExecuting 
                  ? 'bg-slate-800 text-slate-500' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-lg'
              }`}
            >
              {isExecuting ? "EXECUTING..." : "▶ RUN CODE"}
            </button>
            
            {isSuccess && (
              <button
                onClick={() => setCurrentLevelIdx(i => Math.min(i + 1, LEVELS.length - 1))}
                className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-400 text-slate-900 rounded-xl font-bold text-lg"
              >
                NEXT LEVEL →
              </button>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex-1 min-h-[450px]">
            <CodeEditor code={code} onChange={setCode} isExecuting={isExecuting} />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-200 text-lg">{feedback}</p>
            <div className="mt-4 flex flex-wrap gap-2">
               {currentLevel.concepts.map(concept => (
                 <span key={concept} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold rounded-full border border-emerald-500/20">
                   {concept}
                 </span>
               ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CodedexGame;
