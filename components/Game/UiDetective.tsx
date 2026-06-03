import React, { useState, useEffect, useRef } from 'react';
import { UI_DETECTIVE_LEVELS, UiDetectiveLevel, BugTarget } from './uiDetectiveData';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
const getHtmlDoc = (html: string) => `<!DOCTYPE html><html><head><script src="/tailwindcss.js"></script><style>*, *::before, *::after { box-sizing: border-box; } ::-webkit-scrollbar { display: none; } body { -ms-overflow-style: none; scrollbar-width: none; margin: 0; padding: 1rem; min-height: 100vh; background-color: #0f172a; color: #f8fafc; font-family: sans-serif; display: flex; align-items: center; justify-content: center; overflow-x: hidden; }</style></head><body>${html}</body></html>`;

// Memoized iframe to completely prevent flashing (wiping away) on re-renders
const IframePreview = React.memo(({ html, isTarget = false }: { html: string, isTarget?: boolean }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use innerHTML for live updates to avoid srcDoc reload flashes
  // We MUST wait for isLoaded, otherwise the browser will overwrite our innerHTML when it finishes parsing srcDoc!
  useEffect(() => {
    if (!isTarget && isLoaded && iframeRef.current?.contentDocument?.body) {
      iframeRef.current.contentDocument.body.innerHTML = html;
    }
  }, [html, isTarget, isLoaded]);

  return (
    <iframe 
      ref={iframeRef}
      srcDoc={getHtmlDoc(isTarget ? html : '')} 
      onLoad={() => setIsLoaded(true)}
      className={`w-full h-full border-none pointer-events-none ${isTarget ? 'absolute inset-0' : ''}`}
      sandbox="allow-scripts allow-same-origin" 
    />
  );
});

export default function UiDetective() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [code, setCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const currentLevel = UI_DETECTIVE_LEVELS[levelIndex];

  // Initialize level
  useEffect(() => {
    setCode(currentLevel.brokenHtml);
    setIsSuccess(false);
    setShowHint(false);
  }, [currentLevel]);

  // Validate on code change
  useEffect(() => {
    if (isSuccess) return;
    const timer = setTimeout(validateSolution, 500);
    return () => clearTimeout(timer);
  }, [code, isSuccess]);

  const validateSolution = () => {
    if (isSuccess) return;
    
    let bugsFixed = 0;
    
    currentLevel.bugs.forEach(bug => {
      const hasWrongClass = code.includes(bug.wrongClass);
      const hasCorrectClass = code.includes(bug.correctClass);
      
      if (!hasWrongClass && hasCorrectClass) {
        bugsFixed++;
      }
    });

    if (bugsFixed === currentLevel.bugs.length) {
      setIsSuccess(true);
      toast.success('Bugs squashed! UI is perfect!', { icon: '🕵️' });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const nextLevel = () => {
    if (levelIndex < UI_DETECTIVE_LEVELS.length - 1) {
      setLevelIndex(prev => prev + 1);
    }
  };

  const applyFix = (bug: BugTarget) => {
    setCode(prev => prev.replace(bug.wrongClass, bug.correctClass));
  };

  const bugsFixedCount = currentLevel.bugs.filter(bug => !code.includes(bug.wrongClass) && code.includes(bug.correctClass)).length;

  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-64px)] bg-[#0d1117] text-slate-200 rounded-xl overflow-hidden border border-slate-800 shadow-2xl font-sans">
      
      {/* Left Panel: Brief & Target */}
      <div className="w-full lg:w-1/3 h-full bg-[#161b22] flex flex-col border-r border-slate-800 z-10 overflow-y-auto min-h-0">
        <div className="p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div>
            <span className="px-2.5 py-1 text-[10px] uppercase font-black tracking-widest bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/30">
              Case #{levelIndex + 1}
            </span>
            <h2 className="text-xl font-black text-white mt-2 leading-tight tracking-tight">{currentLevel.title}</h2>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-500 mb-1">The Brief</h4>
            <p className="text-xs leading-relaxed text-slate-300">{currentLevel.description}</p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-black tracking-wider text-emerald-500 mb-1">Target Evidence (Perfect UI)</h4>
            <div className="relative h-44 bg-slate-950 rounded-xl overflow-hidden border border-emerald-500/30 shadow-inner">
              <IframePreview html={currentLevel.targetHtml} isTarget={true} />
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400">Investigation Progress</h4>
              {!showHint && !isSuccess && (
                <button 
                  onClick={() => setShowHint(true)}
                  className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-md text-[10px] font-bold transition"
                >
                  🔍 Request Hint
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {currentLevel.bugs.map((bug, idx) => {
                const isFixed = !code.includes(bug.wrongClass) && code.includes(bug.correctClass);
                return (
                  <div key={idx} className={`p-2.5 rounded-lg border ${isFixed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{isFixed ? '✅' : '❌'}</span>
                      <span className={`text-xs font-medium ${isFixed ? 'text-emerald-400' : 'text-rose-400'}`}>Bug {idx + 1} {isFixed ? 'Fixed' : 'Identified'}</span>
                    </div>
                    {showHint && !isFixed && (
                      <div className="mt-2 pl-6 space-y-1.5">
                        <p className="text-[10px] text-amber-300">{bug.description}</p>
                        <div className="flex items-center justify-between gap-2 font-mono text-[10px] bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                          <span className="text-amber-400">
                            <span className="text-rose-400 line-through">{bug.wrongClass}</span> → <span className="text-emerald-400">{bug.correctClass}</span>
                          </span>
                          <button 
                            onClick={() => applyFix(bug)}
                            className="px-2 py-0.5 bg-amber-500/30 hover:bg-amber-500/50 text-amber-100 rounded text-[10px] font-bold transition active:scale-95 whitespace-nowrap"
                          >
                            ⚡ Auto-Fix
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Editor & Suspect UI */}
      <div className="flex-1 flex flex-col bg-[#0d1117]">
        {/* Top: Suspect UI */}
        <div className="h-1/2 flex flex-col border-b border-slate-800">
          <div className="px-6 py-3 bg-[#111827] border-b border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Suspect UI (Broken)</span>
            <span className="text-xs font-mono text-slate-400">Live Preview</span>
          </div>
          <div className="flex-1 relative bg-slate-950 overflow-hidden">
            <IframePreview html={code} />
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-emerald-900/40 backdrop-blur-sm flex flex-col items-center justify-center z-20 border-4 border-emerald-500"
              >
                <span className="text-6xl mb-4 block drop-shadow-2xl">🕵️‍♂️</span>
                <h3 className="text-3xl font-black text-emerald-400 uppercase tracking-widest drop-shadow-md">Case Closed</h3>
                <p className="text-white mt-2 font-medium">You fixed all the bugs!</p>
                {levelIndex < UI_DETECTIVE_LEVELS.length - 1 && (
                  <button 
                    onClick={nextLevel}
                    className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105"
                  >
                    Next Case →
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom: Code Editor */}
        <div className="h-1/2 flex flex-col">
          <div className="px-6 py-3 bg-[#111827] border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">suspect_code.html</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fix the Tailwind Classes</span>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-12 bg-[#090d16] text-[#2c374e] text-right pr-3 pt-4 select-none font-mono text-sm leading-7 border-r border-slate-800">
              {Array.from({ length: Math.max(code.split('\n').length, 10) }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              disabled={isSuccess}
              className={`flex-1 bg-transparent text-slate-200 p-4 outline-none resize-none font-mono text-sm leading-7 selection:bg-rose-500/30 ${isSuccess ? 'opacity-50' : ''}`}
              spellCheck={false}
            />
          </div>
          <div className="p-4 bg-[#0a0d16] border-t border-slate-800 flex items-center justify-between">
            <span className={`text-sm font-medium ${isSuccess ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isSuccess ? 'All bugs fixed! Great detective work.' : `Bugs fixed: ${bugsFixedCount} / ${currentLevel.bugs.length}`}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
