
import React from 'react';
import { MOCK_STUDENT } from '../constants';
import { NavigationItem } from '../types';
import LogoutConfirmationModal from './LogoutConfirmationModal';

interface SidebarProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  isOpen: boolean;
  onToggle: () => void;
  timerState: {
    timeLeft: number;
    isActive: boolean;
    mode: 'Work' | 'Break';
  };
  onLogout: () => void;
  userData: any;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onToggle, timerState, onLogout, userData }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const navItems: { id: NavigationItem; icon: React.ReactNode }[] = [
    { 
      id: 'Hub', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> 
    },
    { 
      id: 'Courses', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> 
    },
    { 
      id: 'Assignments', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> 
    },
    { 
      id: 'Analytics', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> 
    },
    { 
      id: 'Focus', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
    },
    { 
      id: 'AI Study Coach', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> 
    },
    {
      id: 'Settings',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    }
  ];

  if (userData?.isAdmin) {
    navItems.push({
      id: 'Admin Users',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    });
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-slate-800 border-r border-slate-700 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
        </div>
        <span className="font-bold text-2xl tracking-tight text-white">FutureLab</span>
      </div>

      <div className="px-6 py-4 flex flex-col items-center border-b border-slate-700/50">
        <div className="relative p-1 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-full">
          <img src={userData?.avatarUrl || MOCK_STUDENT.avatar} alt={userData?.fullName || MOCK_STUDENT.name} className="w-20 h-20 rounded-full bg-slate-800 object-cover" />
          <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-[10px] font-black text-white px-2 py-0.5 rounded-full border-2 border-slate-800">
            LVL {Math.floor((userData?.totalPoints || 0) / 100) + 1}
          </div>
        </div>
        <h2 className="mt-4 font-semibold text-lg text-white">{userData?.fullName || MOCK_STUDENT.name}</h2>
        <p className="text-slate-400 text-sm text-center font-medium flex items-center">
          {userData?.grade || MOCK_STUDENT.grade} 
          <span className="w-1 h-1 rounded-full bg-gray-500 mx-2" />
          {userData?.schoolName || "Independent Learner"}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {MOCK_STUDENT.achievements.map(ach => (
            <span key={ach} className="px-2 py-1 bg-slate-900 text-indigo-300 text-[9px] font-bold uppercase tracking-wider rounded-md border border-slate-700">
              {ach}
            </span>
          ))}
        </div>

        <div className="w-full mt-6">
          <div className="flex justify-between items-center text-xs mb-1.5">
            {(() => {
              const points = userData?.totalPoints || 0;
              const level = Math.floor(points / 100) + 1;
              const expInLevel = points % 100;
              const nextLevel = level + 1;
              
              return (
                <>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Exp to Level {nextLevel}</span>
                  <span className="text-indigo-400 font-black">{expInLevel}%</span>
                </>
              );
            })()}
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-1000" 
              style={{ width: `${(userData?.totalPoints || 0) % 100}%` }} 
            />
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('Focus')}
          className={`w-full mt-6 py-3 px-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center space-x-3 active:scale-95 group ${
            timerState.isActive 
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30' 
              : activeTab === 'Focus'
                ? 'bg-slate-700 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20'
          }`}
        >
          {timerState.isActive ? (
            <>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span className="tabular-nums">{formatTime(timerState.timeLeft)}</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Focus Session</span>
            </>
          )}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-slate-700/50 text-indigo-400 shadow-inner' 
                : 'text-slate-500 hover:bg-slate-700/30 hover:text-slate-300'
            }`}
          >
            <div className={`${activeTab === item.id ? 'text-indigo-400' : 'text-slate-600'}`}>
              {item.icon}
            </div>
            <span className="font-bold text-sm tracking-wide">{item.id}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all font-bold text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span>Sign Out</span>
        </button>
      </div>

      {isLogoutModalOpen && (
        <LogoutConfirmationModal 
          onClose={() => setIsLogoutModalOpen(false)} 
          onConfirm={() => {
            setIsLogoutModalOpen(false);
            onLogout();
          }} 
        />
      )}
    </aside>
  );
};

export default Sidebar;
