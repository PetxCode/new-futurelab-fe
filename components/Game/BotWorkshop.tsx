import React, { useState, useEffect } from 'react';
import { BOT_WORKSHOP_LEVELS, BotChallenge } from './botWorkshopData';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../App';

const BotWorkshop: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<{ success: boolean; message: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentLevel = BOT_WORKSHOP_LEVELS[currentLevelIndex];

  useEffect(() => {
    if (currentLevel) {
      setCode(currentLevel.initialCode);
      setOutput(null);
    }
  }, [currentLevelIndex]);

  const handleRunCode = async () => {
    const result = currentLevel.check(code);
    setOutput(result);
    if (result.success) {
      toast.success('System Component Fixed!');
      
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
            title: `Bot Workshop: ${currentLevel.title}`,
            category: 'Engineering',
            points: 1,
            score: 100
          }),
        });
      } catch (err) {
        console.error('Error logging workshop activity:', err);
      }
    } else {
      toast.error('System Error: Re-evaluate logic!');
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < BOT_WORKSHOP_LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-900 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-2xl shadow-cyan-500/20">
          🤖
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Nano-Rescue Success!</h2>
        <p className="text-slate-400 max-w-md mb-8">
          The complex machine is restored, and all Bot-Friends are safe. Your systems engineering skills are elite!
        </p>
        <button 
          onClick={() => {
            setCurrentLevelIndex(0);
            setIsCompleted(false);
          }}
          className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/30"
        >
          RESTART WORKSHOP
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-slate-900 border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
      {/* Narrative & Status Area */}
      <div className="flex-[0.8] p-8 border-r border-slate-700/50 bg-slate-900/50 overflow-y-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest">
            Module {currentLevelIndex + 1} / {BOT_WORKSHOP_LEVELS.length}
          </div>
          <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
            {currentLevel.concept}
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
            <span className="text-cyan-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </span>
            {currentLevel.title}
        </h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-700/50 group hover:border-cyan-500/30 transition-colors">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                Diagnostic Story
            </h4>
            <p className="text-slate-300 leading-relaxed text-lg font-mono">"{currentLevel.story}"</p>
          </div>

          <div className="p-6 bg-cyan-600/5 rounded-2xl border border-cyan-500/20">
            <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">System Objective</h4>
            <p className="text-white font-bold leading-relaxed">{currentLevel.goal}</p>
          </div>

          {output && (
            <div className={`p-6 rounded-2xl border animate-in slide-in-from-bottom-4 duration-300 ${
              output.success ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-600/10 border-rose-500/30 text-rose-400'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{output.success ? '🛡️' : '⚠️'}</span>
                <span className="font-black uppercase tracking-widest text-xs">{output.success ? 'Resolved' : 'Warning'}</span>
              </div>
              <p className="font-medium">{output.message}</p>
              {output.success && (
                <button 
                  onClick={handleNextLevel}
                  className="mt-4 px-6 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/20 flex items-center gap-2 group"
                >
                  NEXT COMPONENT
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Control Panel Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-rose-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Logic Terminal
            </span>
          </div>
          <div className="group relative">
             <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </button>
             <div className="absolute top-12 right-0 w-64 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  <span className="text-cyan-400 font-bold block mb-1">TECH ARCHIVE:</span>
                  {currentLevel.hint}
                </p>
             </div>
          </div>
        </div>

        <div className="flex-1 p-8 relative overflow-hidden">
          {/* Cyberpunk grid background effect */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-cyan-300 font-mono text-xl resize-none outline-none caret-white leading-relaxed relative"
            spellCheck={false}
          />
          
          <div className="absolute bottom-8 right-8 z-20">
            <button 
              onClick={handleRunCode}
              className="px-10 py-5 bg-slate-800 text-cyan-400 font-black rounded-2xl border border-cyan-500/30 hover:bg-cyan-600 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-cyan-500/10 flex items-center gap-3 uppercase tracking-widest text-sm"
            >
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Upload Logic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotWorkshop;
