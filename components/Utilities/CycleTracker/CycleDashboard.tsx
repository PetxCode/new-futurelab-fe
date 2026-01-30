import React from 'react';
import { CycleData, CycleStatus, getPhaseDetails } from './CycleEngine';

interface CycleDashboardProps {
  data: CycleData;
  status: CycleStatus;
}

const CycleDashboard: React.FC<CycleDashboardProps> = ({ data, status }) => {
  const phase = getPhaseDetails(status.currentPhase);

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Top Banner: Status & Phase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`
          lg:col-span-2 relative overflow-hidden rounded-[2.5rem] p-10 md:p-14
          bg-gradient-to-br ${phase.color} shadow-2xl
        `}>
           <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48" />
           
           <div className="relative z-10 space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-[0.2em]">
                  Live Status • {status.currentPhase}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  Day {status.currentDay} of {data.cycleLength}
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none italic uppercase">
                   {phase.title}
                </h1>
                <p className="text-white/90 text-xl font-medium max-w-xl leading-relaxed">
                  {phase.description}
                </p>
              </div>

              <div className="pt-4">
                 <div className="h-4 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 p-1">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${status.phaseProgress * 100}%` }}
                    />
                 </div>
                 <div className="flex justify-between mt-3 text-[0.65rem] font-black uppercase tracking-widest text-white/60">
                    <span>Phase Start</span>
                    <span>Progression: {Math.round(status.phaseProgress * 100)}%</span>
                    <span>Phase End</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Next Period Countdown Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8">
              <svg className="w-12 h-12 text-slate-800 group-hover:text-pink-500/10 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
           </div>
           
           <div className="relative z-10 space-y-2">
              <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest">Prediction</h3>
              <div className="text-7xl font-black tabular-nums tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
                {status.daysUntilNextPeriod}
              </div>
              <div className="text-lg font-bold text-slate-400 leading-tight">
                Days until <br/> your next period
              </div>
           </div>

           <div className="relative z-10 pt-6">
              <div className="inline-flex items-center space-x-2 text-pink-500 text-sm font-bold bg-pink-500/5 px-4 py-2 rounded-xl border border-pink-500/10">
                 <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                 <span>High Accuracy Mode</span>
              </div>
           </div>
        </div>
      </div>

      {/* Detailed Insights & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {/* Phase Tips Card */}
         <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black tracking-tight flex items-center italic">
               <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mr-3 not-italic">✦</span>
               Daily Recommendations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {phase.tips.map((tip, i) => (
                 <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="text-emerald-400 font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors">#{i+1} Focus</div>
                    <div className="text-slate-100 font-medium">{tip}</div>
                 </div>
               ))}
            </div>
         </div>

         {/* Cycle Statistics */}
         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mb-4">Cycle Vitals</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white font-bold">{data.cycleLength} Days</span>
               </div>
               <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-slate-400 text-sm">Period</span>
                  <span className="text-white font-bold">{data.periodLength} Days</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Ovulation</span>
                  <span className="text-white font-bold italic">~ Day 14</span>
               </div>
            </div>
         </div>

         {/* Scientific Insight Card */}
         <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/10 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
            <div className="relative z-10 space-y-4">
               <h3 className="text-indigo-400 text-xs font-black uppercase tracking-widest">Did you know?</h3>
               <p className="text-slate-300 text-sm leading-relaxed italic">
                 The {status.currentPhase} phase is triggered by changes in hormones like Estrogen and Progesterone, which influence your energy, mood, and focus.
               </p>
               <button className="text-xs font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors flex items-center group/btn">
                  Learn Science
                  <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CycleDashboard;
