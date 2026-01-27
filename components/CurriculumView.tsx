import React from 'react';
import { LearningResource, Mission, NavigationItem } from '../types';

interface CurriculumViewProps {
  resource: LearningResource;
  onBack: () => void;
  onMissionClick: (mission: Mission) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ resource, onBack, onMissionClick }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400 hover:text-white transition-all hover:bg-slate-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">{resource.title} Curriculum</h1>
          <p className="text-slate-500 font-medium italic">Complete missions to unlock advanced modules.</p>
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-4">
        {resource.missions?.map((mission) => (
          <div 
            key={mission.id}
            onClick={() => !mission.isLocked && onMissionClick(mission)}
            className={`flex items-center p-6 bg-slate-800/40 rounded-3xl border transition-all ${
              mission.isLocked 
                ? 'border-slate-800 opacity-60 cursor-not-allowed' 
                : 'border-slate-700/50 hover:border-indigo-500/50 cursor-pointer hover:bg-slate-800/60 group'
            }`}
          >
            {/* Mission Icon Box */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mr-6 ${
              mission.isCompleted ? 'bg-emerald-500/10 text-emerald-400' :
              mission.isLocked ? 'bg-slate-900 text-slate-600' : 'bg-slate-700/50 text-white'
            }`}>
              {mission.icon}
            </div>

            {/* Mission Info */}
            <div className="flex-1 min-w-0">
               <h3 className={`text-xl font-black truncate ${mission.isLocked ? 'text-slate-500' : 'text-white group-hover:text-indigo-400'} transition-colors underline decoration-2 decoration-transparent group-hover:decoration-indigo-400/30 underline-offset-4`}>
                 {mission.title}
               </h3>
               <p className="text-sm text-slate-500 font-medium mt-1 truncate">
                 {mission.description}
               </p>
               
               {/* Tags */}
               <div className="flex flex-wrap gap-2 mt-3">
                  {mission.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900/50 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-800">
                       {tag}
                    </span>
                  ))}
               </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center space-x-8 px-6">
               <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-1.5 mb-1">
                     <svg className="w-3.5 h-3.5 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{mission.difficulty}</span>
                  </div>
               </div>

               <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900/50 border border-slate-800">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>

               <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
                 mission.isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                 mission.isLocked ? 'bg-slate-900 text-slate-700 border border-slate-800' : 'bg-indigo-600 shadow-lg shadow-indigo-600/20 text-white'
               }`}>
                 {mission.isCompleted ? (
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                 ) : mission.isLocked ? (
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 ) : (
                   <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumView;
