
import React from 'react';

interface FocusProps {
  timeLeft: number;
  isActive: boolean;
  mode: 'Work' | 'Break';
  onToggle: () => void;
  onReset: () => void;
  onChangeMode: (mode: 'Work' | 'Break') => void;
  onAdjust: (seconds: number) => void;
}

const Focus: React.FC<FocusProps> = ({ timeLeft, isActive, mode, onToggle, onReset, onChangeMode, onAdjust }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in zoom-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white tracking-tight">Focus Zone</h1>
        <p className="text-slate-400 mt-1 font-medium italic">Deep work mode active. Clear the noise, start the flow.</p>
      </div>

      <div className="bg-[#1e293b]/50 backdrop-blur-xl p-12 lg:p-20 rounded-[4rem] border border-slate-700/50 shadow-3xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-50"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Mode Switcher */}
          <div className="flex bg-slate-900/40 p-1 rounded-full border border-slate-700/50 mb-16">
            <button 
              onClick={() => onChangeMode('Work')}
              className={`px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'Work' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Study Session
            </button>
            <button 
              onClick={() => onChangeMode('Break')}
              className={`px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'Break' ? 'bg-indigo-600/80 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Short Break
            </button>
          </div>

          {/* Time Display */}
          <div className={`text-[12rem] font-black tracking-tighter mb-16 tabular-nums transition-colors duration-500 leading-none select-none ${isActive ? 'text-white' : 'text-slate-400 opacity-60'}`}>
             {formatTime(timeLeft)}
          </div>

          {/* Primary Controls */}
          <div className="flex items-center space-x-8">
             {/* Decrease Button */}
             <button 
               onClick={() => onAdjust(-60)}
               className="w-14 h-14 bg-slate-900/60 text-slate-400 rounded-full flex items-center justify-center border border-slate-700/50 hover:text-white hover:border-slate-500 transition-all active:scale-90"
               title="Decrease 1 min"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
             </button>

             {/* Play / Pause Toggle */}
             <button 
               onClick={onToggle}
               className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl active:scale-95 ${isActive ? 'bg-slate-800 text-white border-2 border-slate-700' : 'bg-white text-indigo-600 shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}
             >
                {isActive ? (
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                ) : (
                  <svg className="w-10 h-10 ml-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                )}
             </button>

             {/* Increase Button */}
             <button 
               onClick={() => onAdjust(60)}
               className="w-14 h-14 bg-slate-900/60 text-slate-400 rounded-full flex items-center justify-center border border-slate-700/50 hover:text-white hover:border-slate-500 transition-all active:scale-90"
               title="Increase 1 min"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
             </button>

             {/* Reset Button */}
             <button 
               onClick={onReset}
               className="w-14 h-14 bg-slate-900/60 text-slate-400 rounded-full flex items-center justify-center border border-slate-700/50 hover:text-rose-400 hover:border-rose-500/50 transition-all active:scale-90"
               title="Reset Timer"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
             </button>
          </div>
        </div>
      </div>

      {/* Meta Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Ambient Noise', val: mode === 'Work' ? 'Deep Space Focus' : 'Rainy Forest', icon: '🔊' },
          { label: 'Auto DND', val: isActive ? 'Active' : 'Disabled', icon: '📱' },
          { label: 'Session Reward', val: mode === 'Work' ? '+250 XP' : 'Refreshment', icon: '🎁' }
        ].map(opt => (
          <div key={opt.label} className="bg-slate-800/50 p-6 rounded-[2.5rem] border border-slate-700/50 flex items-center space-x-4 hover:border-indigo-500/30 transition-colors">
             <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-xl shadow-inner">{opt.icon}</div>
             <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{opt.label}</p>
                <p className="text-white font-bold text-sm">{opt.val}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Focus;
