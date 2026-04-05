import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { PIXEL_ART_LEVELS, PixelColor } from './Game/pixelArtLevels';

interface PixelArtProps {
  userData?: User | null;
}

const PALETTE: { id: string; class: PixelColor | 'bg-slate-900 border text-center text-slate-500' }[] = [
  { id: 'purple', class: 'bg-purple-500' },
  { id: 'blue', class: 'bg-sky-500' },
  { id: 'black', class: 'bg-slate-800' }, // Dark/Black
  { id: 'yellow', class: 'bg-yellow-400' },
  { id: 'orange', class: 'bg-orange-500' },
  { id: 'red', class: 'bg-red-500' },
  { id: 'green', class: 'bg-green-500' },
  { id: 'pink', class: 'bg-pink-400' },
  { id: 'white', class: 'bg-white' },
];

const PixelArt: React.FC<PixelArtProps> = ({ userData }) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [grid, setGrid] = useState<(string | null)[][]>(
    Array(8).fill(null).map(() => Array(8).fill(null))
  );
  
  const [selectedColor, setSelectedColor] = useState<string>('bg-yellow-400');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentLevel = PIXEL_ART_LEVELS[currentLevelIndex];

  useEffect(() => {
    // Reset the success state on level load
    let isMatch = true;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const targetColor = currentLevel.grid[r][c];
        // Treat both null and 'bg-slate-900 border text-center text-slate-500' eraser as null
        const gridColor = grid[r][c];
        if (gridColor !== targetColor) {
          isMatch = false;
          break;
        }
      }
      if (!isMatch) break;
    }
    setIsSuccess(isMatch);
  }, [grid, currentLevel]);

  const handleCellAction = (row: number, col: number) => {
    if (isSuccess) return;
    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = selectedColor === 'bg-slate-900 border text-center text-slate-500' ? null : selectedColor;
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(Array(8).fill(null).map(() => Array(8).fill(null)));
    setIsSuccess(false);
  };

  const nextLevel = () => {
    if (currentLevelIndex < PIXEL_ART_LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
      clearGrid();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 relative overflow-y-auto w-full text-slate-300 font-inter">
      
      {/* Top Graphic Header */}
      <div className="w-full flex-shrink-0 bg-slate-900/50 shadow-sm flex flex-col items-center justify-center p-6 border-b border-slate-800">
        <div className="flex space-x-[-10px] mb-4">
           {['#4CAF50', '#F44336', '#FF9800', '#2196F3', '#9C27B0'].map((color, i) => (
              <div 
                key={i} 
                className="w-12 h-16 rounded-full border-2 border-slate-900 shadow-sm flex items-center justify-center overflow-hidden relative"
                style={{ backgroundColor: color }}
              >
                 <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                 <div className="w-full h-full opacity-40 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.8) 5px, rgba(255,255,255,0.8) 10px)' }} />
              </div>
           ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600 tracking-tighter text-center uppercase italic">
          Pixel Studio
        </h1>
        <p className="text-slate-400 font-medium mt-2 tracking-wide uppercase text-sm">
          Stage {currentLevelIndex + 1} of {PIXEL_ART_LEVELS.length}: <span className="text-pink-400">{currentLevel.name}</span>
        </p>
      </div>

      <div className="flex-1 flex justify-center items-start p-6 md:p-12">
         <div className="flex flex-col lg:flex-row gap-12 w-full max-w-5xl">
            
            {/* LEFT COLUMN: Target and Palette */}
            <div className="flex flex-col space-y-6 shrink-0 w-full lg:w-64">
               {/* Target Design */}
               <div className="bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <div className="bg-slate-800/80 text-slate-300 text-center font-black py-3 text-[10px] uppercase tracking-widest border-b border-slate-700">
                     Recreate this Design
                  </div>
                  <div className="p-6 flex justify-center bg-slate-900">
                      <div className="grid grid-cols-8 gap-px bg-slate-800 border-2 border-slate-700 shadow-inner">
                         {currentLevel.grid.map((row, r) => 
                           row.map((cell, c) => (
                             <div 
                                key={`target-cell-${r}-${c}`} 
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${cell || 'bg-slate-900'}`}
                              />
                           ))
                         )}
                      </div>
                  </div>
               </div>

               {/* Palette */}
               <div className="bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 shadow-xl shrink-0">
                  <div className="bg-slate-800/80 text-slate-300 text-center font-black py-3 text-[10px] uppercase tracking-widest border-b border-slate-700">
                     Using these blocks
                  </div>
                  <div className="p-6 grid grid-cols-3 gap-3 bg-slate-900">
                     {PALETTE.map((color) => (
                       <button
                         key={color.id}
                         onClick={() => setSelectedColor(color.class)}
                         className={`w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all relative border-4 flex items-center justify-center
                           ${color.class} 
                           ${selectedColor === color.class
                              ? 'border-pink-500 shadow-lg shadow-pink-500/20 scale-105 z-10' 
                              : 'border-slate-800 hover:border-slate-700'
                           }
                         `}
                       >
                         {selectedColor === color.class ? (
                           <div className="absolute inset-0 border-4 border-white/20 rounded-lg pointer-events-none" />
                         ) : null}
                       </button>
                     ))}
                     {/* Eraser */}
                     <button
                        onClick={() => setSelectedColor('bg-slate-900 border text-center text-slate-500')}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all relative border-4 flex items-center justify-center bg-slate-950
                           ${selectedColor === 'bg-slate-900 border text-center text-slate-500' 
                              ? 'border-pink-500 shadow-lg shadow-pink-500/20 scale-105 z-10' 
                              : 'border-slate-800 hover:border-slate-700'
                           }
                        `}
                     >
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                  </div>
               </div>
            </div>

            {/* RIGHT COLUMN: Canvas Grid */}
            <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[400px]">
                {isSuccess && (
                  <div className="mb-8 animate-bounce bg-pink-500 text-white px-8 py-4 rounded-2xl font-black text-xl shadow-2xl shadow-pink-500/20 border border-pink-400 flex items-center gap-4">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                     <span className="uppercase tracking-widest">Masterpiece Complete!</span>
                  </div>
                )}

                <div 
                   className={`grid grid-cols-8 gap-px border-4 border-slate-800 bg-slate-800 shadow-2xl shrink-0 transition-transform ${isSuccess ? 'scale-105 shadow-pink-500/30' : ''}`}
                   onMouseLeave={() => setIsDrawing(false)}
                   onMouseUp={() => setIsDrawing(false)}
                   style={{ touchAction: 'none' }} // Prevents scrolling on touch when drawing
                >
                   {grid.map((row, r) => 
                     row.map((cell, c) => (
                       <div 
                         key={`cell-${r}-${c}`} 
                         onMouseDown={() => {
                           setIsDrawing(true);
                           handleCellAction(r, c);
                         }}
                         onMouseEnter={() => {
                           if (isDrawing) handleCellAction(r, c);
                         }}
                         onTouchStart={() => {
                           handleCellAction(r, c); // for mobile taps
                         }}
                         className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-colors cursor-pointer hover:bg-slate-700/50 flex justify-center items-center ${cell || 'bg-slate-900'}`}
                       />
                     ))
                   )}
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                     onClick={clearGrid}
                     className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-400 font-bold rounded-xl hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2"
                  >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                     Reset Canvas
                  </button>

                  {isSuccess && currentLevelIndex < PIXEL_ART_LEVELS.length - 1 && (
                     <button 
                        onClick={nextLevel}
                        className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg flex items-center gap-2 animate-pulse"
                     >
                        Next Stage
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </button>
                  )}
                  {isSuccess && currentLevelIndex === PIXEL_ART_LEVELS.length - 1 && (
                     <button 
                        className="px-6 py-3 bg-sky-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                     >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        All Stages Cleared!
                     </button>
                  )}
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default PixelArt;
