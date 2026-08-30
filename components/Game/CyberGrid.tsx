import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { CYBER_GRID_LEVELS, CyberGridLevel } from './cyberGridData';
import { API_BASE_URL } from '../../App';

interface CyberGridProps {
  onBack?: () => void;
}

const playTone = (freq: number, duration: number = 0.1, type: OscillatorType = 'sine') => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio context restriction errors
  }
};

const CyberGrid: React.FC<CyberGridProps> = ({ onBack }) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const level: CyberGridLevel = CYBER_GRID_LEVELS[currentLevelIndex] || CYBER_GRID_LEVELS[0];

  // Grid state
  const [grid, setGrid] = useState<(number | null)[][]>(() => 
    level.initialGrid.map(row => [...row])
  );
  // Candidates notes: pencilNotes[row][col] = Set of numbers
  const [candidates, setCandidates] = useState<Set<number>[][]>(() =>
    Array(level.size).fill(null).map(() => Array(level.size).fill(null).map(() => new Set<number>()))
  );

  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isPencilMode, setIsPencilMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [modeFilter, setModeFilter] = useState<'all' | 'novice' | 'pro' | 'master'>('all');

  // Reset grid whenever level changes
  useEffect(() => {
    setGrid(level.initialGrid.map(row => [...row]));
    setCandidates(
      Array(level.size).fill(null).map(() => Array(level.size).fill(null).map(() => new Set<number>()))
    );
    setSelectedCell(null);
    setMistakes(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setIsComplete(false);
    setHintMessage(null);
  }, [currentLevelIndex, level]);

  // Timer interval
  useEffect(() => {
    if (!isTimerRunning || isComplete) return;
    const interval = setInterval(() => {
      setTimerSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isComplete]);

  // Check conflicts helper
  const hasConflict = (r: number, c: number, val: number | null): boolean => {
    if (!val) return false;

    // Check row
    for (let col = 0; col < level.size; col++) {
      if (col !== c && grid[r][col] === val) return true;
    }
    // Check column
    for (let row = 0; row < level.size; row++) {
      if (row !== r && grid[row][c] === val) return true;
    }
    // Check box
    const startRow = Math.floor(r / level.boxRows) * level.boxRows;
    const startCol = Math.floor(c / level.boxCols) * level.boxCols;
    for (let row = startRow; row < startRow + level.boxRows; row++) {
      for (let col = startCol; col < startCol + level.boxCols; col++) {
        if ((row !== r || col !== c) && grid[row][col] === val) return true;
      }
    }
    return false;
  };

  // Check overall board completion
  const checkVictory = (currentBoard: (number | null)[][]) => {
    for (let r = 0; r < level.size; r++) {
      for (let c = 0; c < level.size; c++) {
        if (currentBoard[r][c] !== level.solution[r][c]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellClick = (r: number, c: number) => {
    setSelectedCell([r, c]);
    playTone(440, 0.05);
  };

  const handleInputNumber = useCallback((num: number) => {
    if (!selectedCell || isComplete) return;
    const [r, c] = selectedCell;

    // Fixed initial given cell cannot be modified
    if (level.initialGrid[r][c] !== null) {
      toast.error('Locked node cannot be altered');
      playTone(200, 0.1, 'sawtooth');
      return;
    }

    if (isPencilMode) {
      setCandidates(prev => {
        const next = prev.map(row => row.map(cellSet => new Set(cellSet)));
        const cellSet = next[r][c];
        if (cellSet.has(num)) {
          cellSet.delete(num);
        } else {
          cellSet.add(num);
        }
        return next;
      });
      playTone(520, 0.05);
      return;
    }

    // Direct value assignment
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);

    // If incorrect according to solution, increment mistakes
    if (num !== level.solution[r][c]) {
      setMistakes(m => m + 1);
      playTone(220, 0.2, 'sawtooth');
      toast.error('Energy conflict detected!', { duration: 1500 });
    } else {
      playTone(660, 0.1);
      // Remove candidate notes of this number in same row, col, box
      setCandidates(prev => {
        const next = prev.map(row => row.map(cellSet => new Set(cellSet)));
        next[r][c].clear();
        return next;
      });
    }

    if (checkVictory(newGrid)) {
      setIsComplete(true);
      setIsTimerRunning(false);
      playTone(880, 0.4, 'triangle');
      toast.success(`Grid Stabilized! +${level.xp} XP Earned!`);

      // Record analytics/XP to backend if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${API_BASE_URL}/api/analytics/log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({
            activityType: 'game',
            title: `CyberGrid: ${level.title}`,
            points: level.xp,
          }),
        }).catch(() => {});
      }
    }
  }, [selectedCell, isComplete, isPencilMode, level, grid]);

  const handleErase = useCallback(() => {
    if (!selectedCell || isComplete) return;
    const [r, c] = selectedCell;
    if (level.initialGrid[r][c] !== null) return;

    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = null;
    setGrid(newGrid);

    setCandidates(prev => {
      const next = prev.map(row => row.map(cellSet => new Set(cellSet)));
      next[r][c].clear();
      return next;
    });
    playTone(300, 0.05);
  }, [selectedCell, isComplete, level, grid]);

  // Keyboard navigation and input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) return;

      if (e.key >= '1' && e.key <= String(level.size)) {
        handleInputNumber(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleErase();
      } else if (e.key.toLowerCase() === 'p') {
        setIsPencilMode(prev => !prev);
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setSelectedCell(prev => {
          if (!prev) return [0, 0];
          let [r, c] = prev;
          if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
          if (e.key === 'ArrowDown') r = Math.min(level.size - 1, r + 1);
          if (e.key === 'ArrowLeft') c = Math.max(0, c - 1);
          if (e.key === 'ArrowRight') c = Math.min(level.size - 1, c + 1);
          return [r, c];
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInputNumber, handleErase, isComplete, level.size]);

  // Smart Hint Engine
  const handleGetHint = () => {
    if (isComplete) return;
    let targetCell = selectedCell;

    if (!targetCell || grid[targetCell[0]][targetCell[1]] === level.solution[targetCell[0]][targetCell[1]]) {
      // Find first un-filled or incorrect cell
      for (let r = 0; r < level.size; r++) {
        for (let c = 0; c < level.size; c++) {
          if (grid[r][c] !== level.solution[r][c]) {
            targetCell = [r, c];
            break;
          }
        }
        if (targetCell) break;
      }
    }

    if (targetCell) {
      const [r, c] = targetCell;
      setSelectedCell([r, c]);
      const correctVal = level.solution[r][c];

      setHintMessage(
        `Node [Row ${r + 1}, Col ${c + 1}] should be energy digit ${correctVal}. ${level.hint}`
      );
      playTone(587, 0.2);
    }
  };

  const filteredLevels = CYBER_GRID_LEVELS.filter(l => 
    modeFilter === 'all' ? true : l.mode === modeFilter
  );

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 custom-scroll animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                CyberGrid Matrix
              </h1>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.2)]">
                Logic Stamina Engine
              </span>
            </div>
            <p className="text-slate-400 text-xs font-medium mt-1">
              Deductive reasoning & matrix constraint puzzle matrix for sharp minds
            </p>
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
          {(['all', 'novice', 'pro', 'master'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setModeFilter(mode)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                modeFilter === mode
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Game Interface */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Level Select List & Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Level Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  {level.mode} tier ({level.size}x{level.size})
                </span>
                <h2 className="text-xl font-black text-white italic mt-1">{level.title}</h2>
              </div>
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-xl font-black text-xs">
                +{level.xp} XP
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              {level.description}
            </p>

            {/* Timers & Counters */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Time Elapsed</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{formatTime(timerSeconds)}</span>
              </div>
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Conflicts</span>
                <span className={`text-lg font-black font-mono ${mistakes === 0 ? 'text-slate-300' : 'text-rose-400'}`}>
                  {mistakes}
                </span>
              </div>
            </div>
          </div>

          {/* Level Selection Drawer */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Matrix Levels</h3>
            <div className="space-y-2 max-h-[260px] overflow-y-auto custom-scroll pr-1">
              {filteredLevels.map(lvl => {
                const idx = CYBER_GRID_LEVELS.findIndex(l => l.id === lvl.id);
                const isActive = idx === currentLevelIndex;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setCurrentLevelIndex(idx)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                      isActive
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-black text-xs uppercase tracking-wider">{lvl.title}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">{lvl.size}x{lvl.size} • {lvl.mode}</p>
                    </div>
                    <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg">
                      +{lvl.xp} XP
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Grid Matrix & Controls */}
        <div className="lg:col-span-8 space-y-6">
          {/* Grid Board Container */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center">
            {/* The Sudoku Matrix */}
            <div 
              className="grid gap-1.5 p-3 bg-slate-950 border-2 border-slate-800 rounded-2xl shadow-inner max-w-[500px] w-full aspect-square relative"
              style={{
                gridTemplateColumns: `repeat(${level.size}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${level.size}, minmax(0, 1fr))`
              }}
            >
              {grid.map((row, r) =>
                row.map((val, c) => {
                  const isGiven = level.initialGrid[r][c] !== null;
                  const isSelected = selectedCell && selectedCell[0] === r && selectedCell[1] === c;
                  const isSameRowCol = selectedCell && (selectedCell[0] === r || selectedCell[1] === c);
                  const isErr = hasConflict(r, c, val);
                  const cellCandidates = Array.from(candidates[r][c] || []);

                  // Thick border boundaries for boxes
                  const isBoxRight = (c + 1) % level.boxCols === 0 && c + 1 !== level.size;
                  const isBoxBottom = (r + 1) % level.boxRows === 0 && r + 1 !== level.size;

                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative flex items-center justify-center rounded-xl text-lg md:text-2xl font-black transition-all select-none ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] z-20 scale-105 border-2 border-white'
                          : isErr
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
                          : isGiven
                          ? 'bg-slate-900/90 text-emerald-400 border border-slate-800/80 font-mono font-black'
                          : val !== null
                          ? 'bg-slate-800/80 text-cyan-300 border border-slate-700/60 font-mono'
                          : isSameRowCol
                          ? 'bg-slate-800/30 border border-slate-800/40 text-slate-500 hover:bg-slate-800/50'
                          : 'bg-slate-900/40 border border-slate-800/40 text-slate-600 hover:border-slate-700 hover:bg-slate-800/40'
                      } ${isBoxRight ? 'mr-1 border-r-2 border-r-indigo-500/30' : ''} ${
                        isBoxBottom ? 'mb-1 border-b-2 border-b-indigo-500/30' : ''
                      }`}
                    >
                      {val !== null ? (
                        <span>{val}</span>
                      ) : cellCandidates.length > 0 ? (
                        <div className="grid grid-cols-3 gap-0.5 w-full h-full p-1 text-[8px] md:text-[10px] text-slate-400 font-bold leading-none items-center justify-items-center opacity-80">
                          {Array.from({ length: level.size }, (_, i) => i + 1).map(n => (
                            <span key={n} className={cellCandidates.includes(n) ? 'text-indigo-300' : 'opacity-0'}>
                              {n}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </button>
                  );
                })
              )}
            </div>

            {/* Smart Hint Bar */}
            {hintMessage && (
              <div className="mt-4 w-full max-w-[500px] p-3.5 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-start space-x-3 text-xs text-indigo-300 animate-in fade-in duration-300">
                <svg className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{hintMessage}</span>
              </div>
            )}

            {/* Number Keypad & Action Buttons */}
            <div className="mt-6 max-w-[500px] w-full space-y-4">
              {/* Digit Selection Row */}
              <div className="grid grid-cols-5 md:grid-cols-9 gap-2">
                {Array.from({ length: level.size }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => handleInputNumber(num)}
                    className="py-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-white font-mono font-black text-lg rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center"
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Utility Tools */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setIsPencilMode(!isPencilMode)}
                  className={`py-3 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all flex items-center justify-center space-x-2 ${
                    isPencilMode
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Pencil {isPencilMode ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={handleErase}
                  className="py-3 bg-slate-900 text-slate-400 border border-slate-800 hover:text-rose-400 hover:border-rose-500/40 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Erase</span>
                </button>

                <button
                  onClick={handleGetHint}
                  className="py-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Hint</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isComplete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-[2.5rem] p-8 max-w-md w-full text-center space-y-6 shadow-3xl shadow-emerald-500/10 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-3xl border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white italic">Matrix Stabilized!</h3>
              <p className="text-slate-400 text-xs font-medium mt-1">
                You successfully solved {level.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Completion Time</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{formatTime(timerSeconds)}</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">XP Earned</span>
                <span className="text-lg font-black text-indigo-400 font-mono">+{level.xp} XP</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsComplete(false);
                  setGrid(level.initialGrid.map(row => [...row]));
                }}
                className="flex-1 py-4 bg-slate-800 text-slate-300 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-700 transition-all"
              >
                Replay
              </button>
              <button
                onClick={() => {
                  if (currentLevelIndex < CYBER_GRID_LEVELS.length - 1) {
                    setCurrentLevelIndex(idx => idx + 1);
                  } else {
                    toast.success('Congratulations! You completed all available CyberGrid matrices!');
                  }
                }}
                className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
              >
                Next Level →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CyberGrid;
