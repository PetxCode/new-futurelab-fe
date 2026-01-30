
import React, { useState, useEffect, useRef } from 'react';
import { NANO_LEVELS, NanoLevel } from './nanoQuestData';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../App';

const NanoQuest: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<{ success: boolean; message: string } | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [botPos, setBotPos] = useState<[number, number]>([0, 0]);
  const [botDir, setBotDir] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const [hoverPos, setHoverPos] = useState<[number, number] | null>(null);
  const [visitedTargets, setVisitedTargets] = useState<number[]>([]);

  const currentLevel = NANO_LEVELS[currentLevelIdx];

  useEffect(() => {
    resetLevel();
  }, [currentLevelIdx]);

  const resetLevel = () => {
    setBotPos(currentLevel.startPos);
    setBotDir(currentLevel.startDir);
    setCode('');
    setOutput(null);
    setIsExecuting(false);
    setActiveLine(null);
    setStars(0);
    setVisitedTargets([]);
  };

  // --- SENSORS ---
  const checkWallAhead = (pos: [number, number], dir: string) => {
    let nextPos = [...pos] as [number, number];
    if (dir === 'right') nextPos[0]++;
    else if (dir === 'left') nextPos[0]--;
    else if (dir === 'up') nextPos[1]--;
    else if (dir === 'down') nextPos[1]++;

    // Boundary check
    if (nextPos[0] < 0 || nextPos[0] >= currentLevel.gridSize[0] || nextPos[1] < 0 || nextPos[1] >= currentLevel.gridSize[1]) return true;
    // Obstacle check
    return currentLevel.obstacles.some(o => o[0] === nextPos[0] && o[1] === nextPos[1]);
  };

  const runCode = async (isStepMode = false) => {
    if (isExecuting) return;
    setIsExecuting(true);
    
    let currentPos = isStepMode ? [...botPos] as [number, number] : [...currentLevel.startPos] as [number, number];
    let currentDir = isStepMode ? botDir : currentLevel.startDir;
    let localVisited = isStepMode ? [...visitedTargets] : [];
    
    if (!isStepMode) {
        setBotPos(currentPos);
        setBotDir(currentDir);
        setVisitedTargets([]);
        setActiveLine(null);
        setOutput(null);
        await new Promise(r => setTimeout(r, 300));
    }

    const lines = code.trim().split('\n');
    let halted = false;

    const executeBlocks = async (linesToExec: string[], startAtLineOffset: number = 0) => {
        for (let i = 0; i < linesToExec.length; i++) {
            if (halted) return;
            const globalLineIdx = startAtLineOffset + i;
            if (isStepMode && activeLine !== null && globalLineIdx <= activeLine) continue;
            
            setActiveLine(globalLineIdx);
            let line = linesToExec[i].trim().toLowerCase();
            if (!line) continue;

            if (line.startsWith('repeat ')) {
                const countMatch = line.match(/\d+/);
                const count = countMatch ? parseInt(countMatch[0]) : 0;
                let blockLines: string [];
                let skip = 0;
                let foundOpen = false, j = i;
                if (line.includes('{')) { foundOpen = true; const afterBrace = line.split('{')[1].trim(); if (afterBrace) blockLines = [afterBrace]; else blockLines = []; } else { blockLines = []; }
                let openBraces = foundOpen ? 1 : 0;
                while (j + 1 < linesToExec.length) {
                    j++;
                    const nextLine = linesToExec[j].trim();
                    if (nextLine.includes('{')) { openBraces += (nextLine.match(/{/g) || []).length; foundOpen = true; }
                    if (nextLine.includes('}')) { openBraces -= (nextLine.match(/}/g) || []).length; if (openBraces <= 0) { skip = j - i; break; } }
                    if (foundOpen && openBraces > 0) blockLines.push(nextLine);
                }
                for (let r = 0; r < count; r++) { await executeBlocks(blockLines, globalLineIdx + 1); if (halted) return; }
                i += skip;
                if (isStepMode) break;
                continue;
            }

            if (line.startsWith('if ')) {
                const condition = line.includes('wallahead') ? 'wall' : line.includes('isclear') ? 'clear' : '';
                let conditionMet = false;
                if (condition === 'wall') conditionMet = checkWallAhead(currentPos, currentDir);
                if (condition === 'clear') conditionMet = !checkWallAhead(currentPos, currentDir);
                let blockLines: string[] = [], skip = 0, foundOpen = false, j = i;
                if (line.includes('{')) foundOpen = true;
                let openBraces = foundOpen ? 1 : 0;
                while (j + 1 < linesToExec.length) {
                    j++;
                    const nextLine = linesToExec[j].trim();
                    if (nextLine.includes('{')) { openBraces++; foundOpen = true; }
                    if (nextLine.includes('}')) { openBraces--; if (openBraces <= 0) { skip = j - i; break; } }
                    if (foundOpen && openBraces > 0) blockLines.push(nextLine);
                }
                if (conditionMet) await executeBlocks(blockLines, globalLineIdx + 1);
                i += skip;
                if (isStepMode) break;
                continue;
            }

            if (line.startsWith('move(')) {
                const steps = parseInt(line.match(/\d+/)?.[0] || '1');
                for(let s=0; s<steps; s++) {
                    if (currentDir === 'right') currentPos[0]++;
                    else if (currentDir === 'left') currentPos[0]--;
                    else if (currentDir === 'up') currentPos[1]--;
                    else if (currentDir === 'down') currentPos[1]++;
                    setBotPos([...currentPos]);
                    await new Promise(r => setTimeout(r, 400));
                    if (currentLevel.obstacles.some(o => o[0] === currentPos[0] && o[1] === currentPos[1])) {
                        setOutput({ success: false, message: "CRITICAL FAILURE: Collision detected!" });
                        halted = true; return;
                    }
                    if (currentPos[0] < 0 || currentPos[0] >= currentLevel.gridSize[0] || currentPos[1] < 0 || currentPos[1] >= currentLevel.gridSize[1]) {
                        setOutput({ success: false, message: "CRITICAL FAILURE: Out of bounds!" });
                        halted = true; return;
                    }
                }
                currentLevel.targetPos.forEach((t, idx) => { if (t[0] === currentPos[0] && t[1] === currentPos[1] && !localVisited.includes(idx)) { localVisited.push(idx); setVisitedTargets([...localVisited]); } });
            } else if (line.includes('turnleft')) {
                const dirs: any = { right: 'up', up: 'left', left: 'down', down: 'right' };
                currentDir = dirs[currentDir]; setBotDir(currentDir);
                await new Promise(r => setTimeout(r, 400));
            } else if (line.includes('turnright')) {
                const dirs: any = { right: 'down', down: 'left', left: 'up', up: 'right' };
                currentDir = dirs[currentDir]; setBotDir(currentDir);
                await new Promise(r => setTimeout(r, 400));
            }
            if (isStepMode) break;
        }
    };

    await executeBlocks(lines);

    const isDone = !isStepMode || (activeLine !== null && activeLine >= lines.length - 1);
    if (!halted && isDone) {
        const finalOnTarget = currentLevel.targetPos.some(t => t[0] === currentPos[0] && t[1] === currentPos[1]);
        const allCollected = localVisited.length === currentLevel.targetPos.length;
        if (allCollected && finalOnTarget) {
            const lineCount = lines.filter(l => l.trim()).length;
            let earnedStars = 1;
            if (lineCount <= currentLevel.maxLines) earnedStars = 3;
            else if (lineCount <= currentLevel.maxLines + 2) earnedStars = 2;
            setStars(earnedStars);
            setOutput({ success: true, message: "MISSION_STABLE_UL" });
            try {
                await fetch(`${API_BASE_URL}/api/analytics/log`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token') || '' },
                    body: JSON.stringify({ type: 'game', title: `Nano Quest: ${currentLevel.title}`, points: 1, score: earnedStars * 33 })
                });
            } catch(e) {}
        } else if (!isStepMode || activeLine >= lines.length - 1) {
            setOutput({ success: false, message: !allCollected ? "Targets remaining." : "Must end on a station." });
        }
    }
    setIsExecuting(false);
  };

  const getRotation = () => {
    if (botDir === 'right') return 'rotate-0';
    if (botDir === 'down') return 'rotate-90';
    if (botDir === 'left') return 'rotate-180';
    if (botDir === 'up') return '-rotate-90';
    return '';
  };

  return (
    <div className="flex flex-col lg:flex-row h-[750px] w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      
      {/* Visual Stage */}
      <div className="flex-1 p-8 bg-slate-900/50 relative group overflow-hidden">
        <div className="absolute top-6 left-8 z-10 flex flex-col">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-tight tracking-wider">{currentLevel.title}</h2>
            <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-black rounded border border-indigo-500/30 uppercase">{currentLevel.concept}</span>
                <span className="text-slate-500 text-[10px] font-bold">LEVEL {currentLevelIdx + 1}/{NANO_LEVELS.length}</span>
            </div>
        </div>

        <div className="absolute top-6 right-8 flex space-x-2 z-10 bg-slate-950/40 p-2 rounded-xl border border-white/5 backdrop-blur-md">
            {[1, 2, 3].map(s => (
                <div key={s} className={`text-2xl ${stars >= s ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-800'}`}>★</div>
            ))}
        </div>

        <div className="w-full h-full flex items-center justify-center relative mt-8">
            <div 
                className="grid gap-1 bg-slate-950/50 p-1 rounded-xl border border-white/5 relative shadow-inner"
                style={{ 
                    gridTemplateColumns: `repeat(${currentLevel.gridSize[0]}, 1fr)`,
                    maxHeight: '85%',
                    aspectRatio: `${currentLevel.gridSize[0]}/${currentLevel.gridSize[1]}`,
                    width: 'auto',
                    height: 'auto'
                }}
            >
                {Array.from({ length: currentLevel.gridSize[0] * currentLevel.gridSize[1] }).map((_, i) => {
                    const x = i % currentLevel.gridSize[0];
                    const y = Math.floor(i / currentLevel.gridSize[0]);
                    const isTarget = currentLevel.targetPos.some(t => t[0] === x && t[1] === y);
                    const targetIdx = currentLevel.targetPos.findIndex(t => t[0] === x && t[1] === y);
                    const isObstacle = currentLevel.obstacles.some(o => o[0] === x && o[1] === y);

                    return (
                        <div 
                            key={i} 
                            onMouseEnter={() => setHoverPos([x, y])}
                            className={`
                                aspect-square rounded-lg flex items-center justify-center relative
                                ${isObstacle ? 'bg-rose-500/20 shadow-inner' : 'bg-slate-800/20 hover:bg-white/5 cursor-crosshair'}
                            `}
                        >
                            {isTarget && !visitedTargets.includes(targetIdx) && (
                                <div className="w-8 h-8 relative group lg:w-10 lg:h-10">
                                    <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                                        <path d="M10 2 L30 2 L38 10 L38 30 L30 38 L10 38 L2 30 L2 10 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                                        <rect x="8" y="8" width="24" height="24" rx="2" fill="#334155" />
                                        <rect x="12" y="12" width="16" height="16" rx="1" fill="#475569" />
                                        <circle cx="20" cy="20" r="5" fill="#22d3ee" />
                                    </svg>
                                </div>
                            )}
                            {isTarget && visitedTargets.includes(targetIdx) && (
                                <div className="w-8 h-8 opacity-30 brightness-50 grayscale lg:w-10 lg:h-10">
                                    <svg viewBox="0 0 40 40" className="w-full h-full">
                                        <path d="M10 2 L30 2 L38 10 L38 30 L30 38 L10 38 L2 30 L2 10 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
                                        <rect x="8" y="8" width="24" height="24" rx="2" fill="#1e293b" />
                                        <circle cx="20" cy="20" r="4" fill="#334155" />
                                    </svg>
                                </div>
                            )}
                            {isObstacle && (
                                <div className="w-full h-full relative p-0.5">
                                    <svg viewBox="0 0 40 40" className="w-full h-full opacity-80">
                                        <rect x="2" y="2" width="36" height="36" rx="4" fill="#450a0a" stroke="#991b1b" strokeWidth="1" />
                                        <path d="M10 10 L30 30 M30 10 L10 30" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                                        <rect x="8" y="8" width="24" height="24" rx="2" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.3">
                                            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1s" repeatCount="indefinite" />
                                        </rect>
                                    </svg>
                                </div>
                            )}
                            {botPos[0] === x && botPos[1] === y && (
                                <div className={`w-8 h-8 lg:w-10 lg:h-10 z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] ${getRotation()}`}>
                                    <svg viewBox="0 0 40 40" className="w-full h-full">
                                        <rect x="2" y="6" width="36" height="8" rx="2" fill="#1e293b" />
                                        <rect x="2" y="26" width="36" height="8" rx="2" fill="#1e293b" />
                                        <rect x="8" y="10" width="24" height="20" rx="4" fill="#6366f1" />
                                        <rect x="10" y="12" width="20" height="16" rx="2" fill="#4f46e5" />
                                        <path d="M32 15 L36 20 L32 25 Z" fill="#22d3ee" />
                                        <circle cx="16" cy="24" r="2" fill="#22d3ee" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
                {hoverPos && (
                    <div className="absolute top-2 left-2 bg-indigo-600/90 text-white text-[10px] font-black px-2 py-1 rounded backdrop-blur-md pointer-events-none shadow-xl border border-white/20 z-20">
                        COORDS: {hoverPos[0]},{hoverPos[1]}
                    </div>
                )}
            </div>
        </div>

        <div className="absolute bottom-8 left-8 p-4 bg-slate-950/80 rounded-2xl border border-white/5 max-w-sm backdrop-blur-xl">
            <h4 className="text-white text-sm font-black mb-1 uppercase tracking-tighter italic">Mission Intel</h4>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed">{currentLevel.description}</p>
        </div>
      </div>

      {/* Code Editor Side */}
      <div className="lg:w-[450px] bg-slate-910 border-l border-slate-800 flex flex-col relative overflow-hidden">
        
        {/* Success Overlay */}
        {output && output.success && (
            <div className="absolute inset-0 bg-slate-900/98 backdrop-blur-xl z-[100] flex flex-col items-center justify-center p-8 text-center">
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-3xl font-black text-white mb-1 tracking-tighter">MISSION COMPLETE</h3>
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-8 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Uplink Secured</p>
                
                <div className="flex space-x-4 mb-10">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`text-4xl ${stars >= s ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'text-slate-800'}`}>★</div>
                    ))}
                </div>

                <div className="space-y-4 w-full max-w-xs">
                    <button 
                        onClick={() => {
                            if (currentLevelIdx < NANO_LEVELS.length - 1) setCurrentLevelIdx(v => v + 1);
                            else toast.success("Quest Campaign Completed!");
                        }}
                        className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 uppercase tracking-widest text-xs"
                    >
                        {currentLevelIdx < NANO_LEVELS.length - 1 ? 'Deploy Next Mission' : 'Return to Hub'}
                    </button>
                    <button 
                        onClick={resetLevel}
                        className="w-full py-3 bg-slate-800/50 text-slate-400 font-bold rounded-xl hover:text-white text-xs border border-white/5"
                    >
                        Retake Simulation
                    </button>
                </div>
            </div>
        )}

        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                <span className="ml-3 text-slate-500 font-mono text-[10px] font-black uppercase tracking-widest">Nano_Terminal_v5.0</span>
            </div>
            <button onClick={resetLevel} className="text-slate-500 hover:text-rose-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
        </div>

        <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-950/20">
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-slate-950/40 border-r border-white/5 flex flex-col items-center pt-4 text-[9px] font-mono text-slate-700 select-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className={`h-6 flex items-center ${activeLine === i ? 'text-indigo-400 font-black' : ''}`}>{i + 1}</div>
                ))}
            </div>
            <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Start coding fundamentals..."
                spellCheck={false}
                className="flex-1 bg-transparent text-indigo-100 font-mono text-[16px] p-4 pl-14 focus:outline-none resize-none placeholder-slate-800 leading-6 border-none"
            />

            {output && !output.success && (
                <div className="absolute bottom-4 left-14 right-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl backdrop-blur-md">
                    <p className="text-rose-400 text-[10px] font-black mb-1 uppercase tracking-tighter">Status Error</p>
                    <p className="text-slate-300 text-[11px] font-medium leading-tight">{output.message}</p>
                </div>
            )}
        </div>

        {/* Action Tokens Extension */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="flex flex-wrap gap-2">
                {[
                    { cmd: 'move(1)', type: 'action' },
                    { cmd: 'turnLeft()', type: 'action' },
                    { cmd: 'turnRight()', type: 'action' },
                    { cmd: 'repeat 2 {\n  \n}', type: 'loop' },
                    { cmd: 'if wallAhead() {\n  \n}', type: 'logic' }
                ].map(token => (
                    <button 
                        key={token.cmd}
                        onClick={() => setCode(c => c + (c ? '\n' : '') + token.cmd)}
                        className={`
                            px-2 py-1.5 border rounded-lg text-[13px] font-black active:bg-slate-700
                            ${token.type === 'action' ? 'bg-slate-800 border-white/5 text-slate-400 hover:text-white' : ''}
                            ${token.type === 'loop' ? 'bg-indigo-900/30 border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/30' : ''}
                            ${token.type === 'logic' ? 'bg-emerald-900/30 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30' : ''}
                        `}
                    >
                        {token.cmd.split(' ')[0].split('\n')[0]}
                    </button>
                ))}
                
                {/* Special Removal Tool */}
                <button 
                    onClick={() => setCode(c => {
                        const lines = c.trimEnd().split('\n');
                        lines.pop();
                        return lines.join('\n');
                    })}
                    className="px-2 py-1.5 bg-rose-900/40 border border-rose-500/30 text-rose-400 rounded-lg text-[9px] font-black hover:bg-rose-500 hover:text-white"
                >
                    REMOVE
                </button>
            </div>
        </div>

        <div className="p-6 bg-slate-900 border-t border-slate-800 flex space-x-3">
            <button 
                onClick={() => runCode()}
                disabled={isExecuting}
                className="flex-[2] py-4 bg-indigo-600 disabled:opacity-50 text-white font-black rounded-2xl hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 uppercase tracking-widest text-[11px] border-b-4 border-indigo-800"
            >
                {isExecuting ? 'Executing Sequence...' : 'Run Sequence'}
            </button>
            <button 
                onClick={() => runCode(true)}
                disabled={isExecuting}
                className="flex-1 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 uppercase tracking-widest text-[10px]"
            >
                Step
            </button>
        </div>
      </div>
    </div>
  );
};

export default NanoQuest;
