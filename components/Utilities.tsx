import React, { useState } from 'react';
import PeriodicTable from './Utilities/PeriodicTable';
import ElementDetails from './Utilities/ElementDetails';
import CycleTracker from './Utilities/CycleTracker/CycleTracker';
import { Element } from './Utilities/periodicTableData';

type UtilityView = 'menu' | 'periodic-table' | 'element-details' | 'cycle-tracker';

const Utilities: React.FC = () => {
  const [view, setView] = useState<UtilityView>('menu');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const handleElementSelect = (element: Element) => {
    setSelectedElement(element);
    setView('element-details');
  };

  const tools = [
    {
      id: 'periodic-table',
      title: 'Periodic Table',
      description: 'Explore the elements with an interactive periodic table.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      action: () => setView('periodic-table')
    },
    {
      id: 'cycle-tracker',
      title: 'Girls Period Cycle',
      description: 'Track and understand your cycle with our easy-to-use tool.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'from-pink-500 to-rose-500',
      action: () => setView('cycle-tracker')
    },
    {
      id: 'coming-soon',
      title: 'Coming Soon',
      description: 'More helpful tools for your learning journey are on the way!',
      icon: (
         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
         </svg>
      ),
      color: 'from-slate-600 to-slate-500',
      disabled: true,
      action: () => {}
    }
  ];

  if (view === 'periodic-table') {
    return <PeriodicTable onElementSelect={handleElementSelect} onBack={() => setView('menu')} />;
  }

  if (view === 'element-details' && selectedElement) {
    return <ElementDetails element={selectedElement} onBack={() => setView('periodic-table')} />;
  }

  if (view === 'cycle-tracker') {
    return <CycleTracker onBack={() => setView('menu')} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Utilities</h1>
        <p className="text-slate-400 mt-2">Essential tools to support your daily learning and well-being.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div 
            key={index} 
            onClick={tool.disabled ? undefined : tool.action}
            className={`
              relative overflow-hidden rounded-2xl p-6 transition-all duration-300
              ${tool.disabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-xl cursor-pointer'}
              bg-slate-800 border border-slate-700/50 group
            `}
          >
            <div className={`
              absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110
            `} />
            
            <div className={`
              w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-${tool.color.split('-')[1]}-500/30
            `}>
              {tool.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{tool.description}</p>
            
            {!tool.disabled && (
               <div className="mt-6 flex items-center text-indigo-400 text-sm font-bold group-hover:text-indigo-300">
                  Open Tool 
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Utilities;
