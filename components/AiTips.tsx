
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const AiTips: React.FC = () => {
  const [tips, setTips] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAiTips = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fix: Strictly follow initialization guidelines by using process.env.API_KEY directly
      // Use type assertion to avoid lint errors in Vite/React environment
      const apiKey = (process.env as any).API_KEY;
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a world-class educational counselor for secondary students. 
        Student Profile: 11th Grade Honors Student.
        Stats: GPA 3.82, 128 focus hours this month, 42 tasks completed. 
        Context: The student is falling behind in 'Computer Science' (Grade B+, Progress 65%) but excelling in Physics.
        Task: Provide 3 short, encouraging, and high-impact study strategies to boost the CS grade while maintaining overall momentum. 
        Format: Use professional but motivating tone, bold headers, and short bullet points. Avoid flowery intros.`,
        config: {
            temperature: 0.8,
            topP: 0.9,
        }
      });
      
      setTips(response.text || "I'm currently reviewing your curriculum. Check back in a moment!");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the Study Counselor. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAiTips();
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-in zoom-in duration-500">
      <div className="bg-slate-800 rounded-[3rem] p-10 border border-slate-700 shadow-3xl relative overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>

        <div className="relative">
          <div className="flex items-center space-x-6 mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 ring-4 ring-indigo-500/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">AI Study Counselor</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Active Session: Academic Strategy</p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-[2rem] border border-slate-700/50 p-8 min-h-[400px] backdrop-blur-xl shadow-inner">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-80 space-y-6">
                <div className="relative">
                   <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-indigo-500/20 rounded-full animate-pulse"></div>
                   </div>
                </div>
                <div className="text-center">
                   <p className="text-white font-black text-lg">Analyzing Academic Trajectory</p>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Comparing 11th Grade Benchmark Data</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <p className="text-slate-300 font-bold mb-6">{error}</p>
                <button onClick={fetchAiTips} className="px-8 py-3 bg-slate-800 text-white font-black rounded-2xl hover:bg-slate-700 transition-all border border-slate-700">Reconnect to Counselor</button>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed font-medium text-lg">
                {tips}
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3 bg-slate-900/40 px-5 py-3 rounded-2xl border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Real-time performance sync active</span>
            </div>
            <button 
              onClick={fetchAiTips}
              disabled={loading}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-[1.25rem] shadow-xl shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <span>Refresh Strategy</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700/50 flex items-center space-x-8">
          <div className="relative w-24 h-24 flex-shrink-0">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="text-slate-700 stroke-current" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" className="text-indigo-500 stroke-current" strokeWidth="3" strokeDasharray="92, 100" strokeLinecap="round" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center font-black text-white text-xl">92%</div>
          </div>
          <div>
            <h4 className="text-white font-black text-lg mb-1">Weekly Task Score</h4>
            <p className="text-slate-400 text-sm font-medium">You completed 38/42 assignments this week. Outstanding consistency!</p>
          </div>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700/50 flex items-center space-x-8">
           <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-3xl shadow-inner border border-emerald-500/20">
              🔥
           </div>
           <div>
              <h4 className="text-white font-black text-lg mb-1">14 Day Streak</h4>
              <p className="text-slate-400 text-sm font-medium">Daily study streak. You're in the top 5% of students in your district!</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AiTips;
