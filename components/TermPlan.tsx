import React, { useState } from 'react';
import { PDF_TERM_PLAN_DATA } from './termPlanData';
import { User } from '../types';

interface TermPlanProps {
  user: User | null;
}

const getPhaseStyles = (phase: string) => {
  switch (phase.toLowerCase()) {
    case 'learn':
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]';
    case 'build':
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]';
    case 'project':
      return 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]';
    case 'review':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]';
    case 'demo day':
      return 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]';
    default:
      return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
  }
};

const TermPlan: React.FC<TermPlanProps> = ({ user }) => {
  const init = PDF_TERM_PLAN_DATA.find(g => g.name.toLowerCase() === user?.grade?.toLowerCase())?.id || PDF_TERM_PLAN_DATA[0].id;
  const [sel, setSel] = useState<string>(init);
  const grade = PDF_TERM_PLAN_DATA.find(g => g.id === sel) || PDF_TERM_PLAN_DATA[0];

  return (
    <div className='flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-7xl mx-auto'>
      {/* Header Section */}
      <div className='relative mb-12 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden'>
        <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3' />
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4' />
        
        <div className='relative flex flex-col md:flex-row md:items-end justify-between gap-6'>
          <div>
            <div className='inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
              <span className='text-[10px] font-black uppercase tracking-widest text-slate-300'>Version 2026.4</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-black text-white tracking-tight leading-tight'>
              Curriculum <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'>Architecture</span>
            </h1>
            <p className='text-slate-400 mt-2 text-lg'>First Term Learning Plan • Week-by-week scheme of work</p>
          </div>
        </div>
      </div>
      
      {/* Grade Selector */}
      <div className='relative mb-10'>
        <div className='absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10'></div>
        <div className='flex overflow-x-auto pb-4 gap-3 no-scrollbar relative'>
          {PDF_TERM_PLAN_DATA.map(g => {
            const isSelected = sel === g.id;
            return (
              <button 
                key={g.id} 
                onClick={() => setSel(g.id)} 
                className={`group flex items-center gap-3 flex-shrink-0 px-6 py-4 rounded-2xl font-bold transition-all duration-300 border backdrop-blur-sm
                  ${isSelected 
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-emerald-500/50 shadow-[0_8px_30px_rgba(16,185,129,0.15)] scale-[1.02]' 
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:border-slate-600 hover:text-slate-200'}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
                  ${isSelected ? 'bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                  <span className={`text-xl ${isSelected ? 'animate-bounce' : ''}`}>{g.icon}</span>
                </div>
                <div className='flex flex-col items-start'>
                  <span className='text-sm'>{g.name}</span>
                  <span className={`text-[10px] uppercase tracking-widest ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>{g.theme}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Table Section */}
      <div className='bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden'>
        <div className='p-6 md:p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/80'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/>
              </svg>
            </div>
            <div>
              <h3 className='text-2xl font-black text-white tracking-tight'>{grade.theme}</h3>
              <p className='text-slate-400 text-sm mt-1'>{grade.name} Syllabus</p>
            </div>
          </div>
        </div>
        
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse min-w-[1000px]'>
            <thead>
              <tr className='bg-slate-950/50'>
                <th className='px-6 py-5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black w-24'>Timeline</th>
                <th className='px-6 py-5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black w-1/5'>Topic & Phase</th>
                <th className='px-6 py-5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black w-1/5'>Objective</th>
                <th className='px-6 py-5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black w-1/4'>Activities</th>
                <th className='px-6 py-5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black'>Output / Homework</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-800/50'>
              {grade.lessons.map((lesson, idx) => (
                <tr 
                  key={lesson.week} 
                  className='group hover:bg-slate-800/40 transition-all duration-300 ease-out'
                >
                  <td className='px-6 py-6 align-top'>
                    <div className='flex items-center gap-3'>
                      <span className='text-3xl font-black text-slate-700 group-hover:text-slate-500 transition-colors'>{lesson.week.padStart(2, '0')}</span>
                    </div>
                  </td>
                  <td className='px-6 py-6 align-top'>
                    <div className='flex flex-col items-start gap-3'>
                      <span className='font-bold text-white text-base leading-snug'>{lesson.topic}</span>
                      <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-wider ${getPhaseStyles(lesson.phase)}`}>
                        {lesson.phase}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-6 align-top'>
                    <p className='text-slate-300 text-sm leading-relaxed'>{lesson.objective}</p>
                  </td>
                  <td className='px-6 py-6 align-top'>
                    <p className='text-slate-400 text-sm leading-relaxed'>{lesson.activities}</p>
                  </td>
                  <td className='px-6 py-6 align-top'>
                    <div className='space-y-3'>
                      {lesson.output.split('Homework:').map((part, i) => {
                        const isHomework = i > 0;
                        return (
                          <div key={i} className={`text-sm ${isHomework ? 'bg-slate-900/50 p-3 rounded-xl border border-slate-700/50' : 'text-slate-300'}`}>
                            {isHomework && (
                              <div className='flex items-center gap-2 mb-1'>
                                <svg className='w-4 h-4 text-indigo-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/>
                                </svg>
                                <span className='text-[10px] font-black uppercase tracking-widest text-indigo-400'>Homework</span>
                              </div>
                            )}
                            <span className={isHomework ? 'text-slate-400 italic' : 'font-medium'}>{part.trim()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TermPlan;