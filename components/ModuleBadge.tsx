
import React from 'react';

interface ModuleBadgeProps {
  icon: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  locked?: boolean;
}

const ModuleBadge: React.FC<ModuleBadgeProps> = ({ icon, size = 'md', locked = false }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
    xl: 'w-32 h-32 text-6xl'
  };

  return (
    <div className={`relative group transition-all duration-500 ${locked ? 'opacity-30 grayscale' : 'hover:scale-110'}`}>
      {/* Outer Glow / Pulse */}
      {!locked && (
        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      )}
      
      {/* Main Container */}
      <div className={`
        relative ${sizeClasses[size]} 
        bg-slate-900 border-2 rounded-2xl flex items-center justify-center 
        backdrop-blur-xl shadow-2xl transition-all duration-500
        ${locked 
          ? 'border-slate-800 bg-slate-950/50' 
          : 'border-indigo-500/30 group-hover:border-indigo-500 hover:shadow-indigo-500/20'}
      `}>
        {/* Inner Gradient Mesh (Premium feel) */}
        {!locked && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/5 rounded-2xl"></div>
        )}
        
        {/* The Icon */}
        <span className={`relative z-10 transition-transform duration-500 ${locked ? '' : 'group-hover:rotate-12'}`}>
          {icon}
        </span>
        
        {/* Decorative Corner (Optional tech detail) */}
        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${locked ? 'bg-slate-800' : 'bg-indigo-500 animate-pulse'}`}></div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ModuleBadge;
