import React from 'react';
import { Element, CATEGORY_COLORS } from './periodicTableData';

interface ElementDetailsProps {
  element: Element;
  onBack: () => void;
}

const ElementDetails: React.FC<ElementDetailsProps> = ({ element, onBack }) => {
  const colorClass = CATEGORY_COLORS[element.category] || 'bg-slate-500';
  const borderClass = colorClass.replace('bg-', 'border-');

  // Simple formatter for the detailed content to handle basic markdown-like headers
  const formatDetails = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('###')) {
        return <h4 key={i} className="text-md font-medium text-white mt-8 mb-4 tracking-[0.0em] border-l-4 border-slate-500 pl-4 bg-slate-800/50 py-2">
          {para.replace('###', '').trim()}
        
        </h4>;
      }
      return <p key={i} className="text-slate-300 leading-[1.8] mb-6 text-lg">{para}</p>;
    });
  };

  return (
    <div className="relative min-h-screen text-slate-200 overflow-hidden pb-20">
      {/* Background Hero Layer - Large Symbol */}
      <div className="fixed top-0 right-0 -translate-y-1/4 translate-x-1/4 select-none pointer-events-none opacity-[0.03] animate-pulse-slow">
        <span className="text-[600px] font-black leading-none">{element.symbol}</span>
      </div>

      {/* Header Strategy */}
      <div className="flex justify-between items-center mb-12 relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 px-6 py-3 border border-slate-700 bg-slate-900/50 hover:bg-white hover:text-black transition-all duration-500 hover:border-white"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Index</span>
        </button>

        <div className="flex flex-col items-end">
          <span className="text-xs font-mono text-slate-500 tracking-[0.5em] mb-1">Element Info</span>
          <span className="text-6xl font-black text-white/5 tracking-tighter tabular-nums leading-none"># {element.number}</span>
          <div className={`h-[2px] w-32 mt-2 ${colorClass}`}></div>
        </div>
      </div>

      {/* Main Content: Staggered Technical Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
        
        {/* Module Area: Technical Specifications (Left Column) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Identity Module */}
          <div className="border border-slate-700 bg-slate-900/80 p-10 relative overflow-hidden group shadow-2xl">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${colorClass}`}></div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase">Element </span>
              <span className="text-[10px] font-mono text-white px-2 bg-slate-800">CLASS: {element.category.toUpperCase()}</span>
            </div>
            
            <h1 className="text-9xl font-black text-white leading-none tracking-tighter mb-4">{element.symbol}</h1>
            <h2 className="text-3xl font-bold text-slate-400 uppercase tracking-widest leading-none mb-10">{element.name}</h2>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800">
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block mb-2">Atomic Mass</span>
                <p className="text-xl font-mono text-white">{element.atomicMass} <span className="text-xs text-slate-500 font-sans">u</span></p>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block mb-2">Phase STP</span>
                <p className="text-xl font-mono text-white tracking-widest">{element.phase.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Metric Matrix */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-600 transition-colors group">
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest block mb-2 group-hover:text-slate-400">Group Position</span>
              <span className="text-3xl font-black text-white tracking-tighter">{element.group}</span>
            </div>
            <div className="border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-600 transition-colors group">
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest block mb-2 group-hover:text-slate-400">Period Position</span>
              <span className="text-3xl font-black text-white tracking-tighter">{element.period}</span>
            </div>
          </div>

          {/* Classification Banner */}
          <div className={`border-l border-t border-b border-slate-700 bg-slate-900/40 p-6 flex items-center justify-between border-r-8 ${borderClass.replace('border-', 'border-')}`}>
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Family Classification</span>
             <span className="text-xs font-bold text-white uppercase tracking-widest">
               {element.category}
             </span>
          </div>

          {/* Electron Config Visualizer */}
          <div className="border border-slate-700 bg-slate-950 p-8 relative overflow-hidden">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[length:20px_20px] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)]"></div>
            
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-[10px] font-mono text-white tracking-[0.4em] uppercase">Bohr Shell Scan</h3>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-green-500 animate-pulse"></div>
                <div className="w-1 h-1 bg-green-500/50"></div>
              </div>
            </div>

            <div className="flex items-end justify-between h-40 gap-3 relative">
              {element.shells.map((count, i) => {
                const height = (count / 32) * 100;
                return (
                  <div key={i} className="group relative flex-1 flex flex-col items-center justify-end h-full">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-300 bg-white text-black text-[10px] font-bold px-2 py-1 z-20">
                      SHELL {i+1}: {count}e-
                    </div>
                    {/* Technical Bar */}
                    <div 
                      className={`w-full ${colorClass} transition-all duration-700 ease-out origin-bottom group-hover:brightness-150 relative`}
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-40 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>
                    <span className="mt-4 text-[9px] font-mono text-slate-600 group-hover:text-white transition-colors">S{i+1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Module Area: Intel & Research (Right Column) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Summary Lead-in */}
          <div className="relative group">
             <div className="absolute -left-4 top-0 bottom-0 w-1 bg-slate-700 group-hover:bg-white transition-colors duration-500"></div>
             <div className="bg-slate-900/20 p-10 border border-slate-800/50 backdrop-blur-sm">
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.5em] block mb-6 uppercase">Element Summary</span>
                <p className="text-3xl font-light text-slate-200 leading-[1.6]">
                  {element.summary}
                </p>
             </div>
          </div>

          {/* Deep Content Reservoir */}
          {element.details ? (
            <div className="border border-slate-800 bg-slate-900/20 p-12 relative overflow-hidden">
               {/* Design Flourish - Technical Corner Labels */}
               {/* <div className="absolute top-0 right-0 p-4 border-l border-b border-slate-800 flex flex-col items-end gap-1">
                 <span className="text-[8px] font-mono text-slate-600 uppercase">Document Ver: 2026.04</span>
                 <span className="text-[8px] font-mono text-slate-600 uppercase">Security Lv: INTERNAL</span>
               </div> */}
               
               <div className="max-w-none">
                 {formatDetails(element.details)}
               </div>

               {/* Design Flourish - Bottom Technical Bar */}
               <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
                 <div className="flex gap-4">
                    <div className="h-1 w-8 bg-slate-800"></div>
                    <div className="h-1 w-2 bg-slate-800"></div>
                    <div className="h-1 w-1 bg-slate-800"></div>
                 </div>
                 <span className="text-[9px] font-mono text-slate-600 tracking-widest">{element.symbol}</span>
               </div>
            </div>
          ) : (
            <div className="py-20 px-10 border border-slate-800/30 bg-slate-900/10 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 border-4 border-slate-800 border-t-slate-500 rounded-full animate-spin mb-6 opacity-30"></div>
               <p className="text-slate-500 font-mono text-sm tracking-widest uppercase mb-2">Technical Dossier Pending</p>
               <p className="text-slate-700 text-xs max-w-xs italic leading-relaxed">The internal research engine is currently cataloging detailed metrics for {element.name}. Please check the main directory for featured elements.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ElementDetails;
