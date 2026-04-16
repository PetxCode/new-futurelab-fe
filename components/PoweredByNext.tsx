import React from 'react';

const PoweredByNext: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <a 
      href="https://justnext.ng" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`group transition-all duration-300 ${className}`}
    >
      <p className="text-[9px] font-black tracking-[0.1em] text-slate-500 uppercase flex items-center gap-1 mt-1">
        Powered by <span className="text-slate-400 group-hover:text-indigo-400 transition-colors">NEXT</span>
      </p>
    </a>
  );
};

export default PoweredByNext;
