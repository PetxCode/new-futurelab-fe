import React, { useState, useEffect } from 'react';
import { CODE_QUEST_LEVELS, Challenge } from './codeQuestData';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../App';

const CodeQuest: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<{ success: boolean; message: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentLevel = CODE_QUEST_LEVELS[currentLevelIndex];

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
      toast.success('Challenge Completed!');

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
            title: `Code Quest: ${currentLevel.title}`,
            category: 'Logic',
            points: 1,
            score: 100
          }),
        });
      } catch (err) {
        console.error('Error logging quest activity:', err);
      }
    } else {
      toast.error('Not quite right, try again!');
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < CODE_QUEST_LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-900 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-2xl shadow-yellow-500/20">
          👑
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Hero of the Glitch Kingdom!</h2>
        <p className="text-slate-400 max-w-md mb-8">
          You have mastered the ancient arts of Variables, Data Types, and Logic. The kingdom is safe... for now.
        </p>
        <button 
          onClick={() => {
            setCurrentLevelIndex(0);
            setIsCompleted(false);
          }}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30"
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Story & Goal Area */}
      <div className="flex-[0.8] p-8 border-r border-slate-800 bg-slate-900/50 overflow-y-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-black uppercase tracking-widest">
            Level {currentLevelIndex + 1} / {CODE_QUEST_LEVELS.length}
          </div>
          <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
            {currentLevel.concept}
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-6 tracking-tight">{currentLevel.title}</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">The Story</h4>
            <p className="text-slate-300 leading-relaxed text-lg italic">"{currentLevel.story}"</p>
          </div>

          <div className="p-6 bg-indigo-600/10 rounded-2xl border border-indigo-500/30">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Your Mission</h4>
            <p className="text-white font-bold leading-relaxed">{currentLevel.goal}</p>
          </div>

          {output && (
            <div className={`p-6 rounded-2xl border animate-in slide-in-from-bottom-4 duration-300 ${
              output.success ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-600/10 border-rose-500/30 text-rose-400'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{output.success ? '✨' : '❌'}</span>
                <span className="font-black uppercase tracking-widest text-xs">{output.success ? 'Success!' : 'Try Again'}</span>
              </div>
              <p className="font-medium">{output.message}</p>
              {output.success && (
                <button 
                  onClick={handleNextLevel}
                  className="mt-4 px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition-all flex items-center gap-2 group"
                >
                  NEXT CHALLENGE
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-rose-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Spellbook Editor
            </span>
          </div>
          <div className="group relative">
             <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors peer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </button>
             <div className="absolute top-12 right-0 w-64 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  <span className="text-indigo-400 font-bold block mb-1">MUSE'S HINT:</span>
                  {currentLevel.hint}
                </p>
             </div>
          </div>
        </div>

        <div className="flex-1 p-8 relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-indigo-300 font-mono text-xl resize-none outline-none caret-white leading-relaxed"
            spellCheck={false}
          />
          <div className="absolute bottom-8 right-8">
            <button 
              onClick={handleRunCode}
              className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-600/40 flex items-center gap-3 uppercase tracking-widest text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Cast Spell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeQuest;
