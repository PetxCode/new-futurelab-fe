import React from 'react';
import { Element, elements, CATEGORY_COLORS } from './periodicTableData';

interface PeriodicTableProps {
  onElementSelect: (element: Element) => void;
  onBack: () => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementSelect, onBack }) => {
  return (
    <div className="animate-fade-in space-y-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-white transition-colors font-bold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Utilities
        </button>
        <h2 className="text-2xl font-black text-white">FutureLab: Periodic Table of Elements</h2>
      </div>

      <div className="min-w-[1000px] p-4 bg-slate-900/50 rounded-3xl border border-slate-700/50 relative">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gap: '0.5rem',
        }}>
          {elements.map((element) => {
            const colorClass = CATEGORY_COLORS[element.category] || 'bg-slate-500';
            
            return (
              <button
                key={element.number}
                onClick={() => onElementSelect(element)}
                className={`
                   relative aspect-[4/5] p-1 flex flex-col justify-between items-start rounded-lg transition-transform hover:scale-110 hover:z-10 hover:shadow-lg border border-slate-800/20
                   ${colorClass} text-slate-900
                `}
                style={{
                  gridColumn: element.group,
                  gridRow: element.period
                }}
              >
                  <span className="text-[10px] font-bold opacity-70">{element.number}</span>
                  <div className="self-center font-black text-lg md:text-xl leading-none">{element.symbol}</div>
                  <span className="text-[9px] font-medium opacity-80 truncate w-full">{element.name}</span>
              </button>
            );
          })}
          
          {/* Placeholder for Lanthanides/Actinides label or spacing if needed */}
          {/* <div className="col-span-18 text-center py-4 text-slate-500 text-sm font-bold uppercase tracking-widest mt-4">
            FutureLab Interactive Periodic Table
          </div> */}
        </div>
      </div>
      
      {/* Legend */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-wrap gap-4 justify-center">
         {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
            <div key={category} className="flex items-center space-x-2">
               <div className={`w-4 h-4 rounded-full ${color}`}></div>
               <span className="text-xs text-slate-400 capitalize">{category}</span>
            </div>
         ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
