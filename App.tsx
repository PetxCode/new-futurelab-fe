
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AiTips from './components/AiTips';
import Assignments from './components/Assignments';
import Analytics from './components/Analytics';
import SubjectsPage from './components/SubjectsPage';
import Focus from './components/Focus';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Settings from './components/Settings';
import AdminUsers from './components/AdminUsers';

import GameCenter from './components/Game/GameCenter';
import { NavigationItem } from './types';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationItem>('Hub');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Focus Timer Global State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [focusMode, setFocusMode] = useState<'Work' | 'Break'>('Work');

  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem('token');
    if (!authToken) return;
    try {
      const response = await fetch('http://localhost:5000/api/user/me', {
        headers: { 'x-auth-token': authToken }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/user/me', {
            headers: { 'x-auth-token': token }
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Auth check failed", error);
        }
      }
      setIsLoadingAuth(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (focusMode === 'Work') {
        const logFocus = async () => {
          try {
            await fetch('http://localhost:5000/api/analytics/focus', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token') || '',
              },
              body: JSON.stringify({ duration: 25 }) // Default Pomodoro duration
            });
            fetchUserData();
          } catch (err) {
            console.error('Error logging focus session:', err);
          }
        };
        logFocus();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(focusMode === 'Work' ? 25 * 60 : 5 * 60);
  };
  const changeMode = (mode: 'Work' | 'Break') => {
    setFocusMode(mode);
    setIsActive(false);
    setTimeLeft(mode === 'Work' ? 25 * 60 : 5 * 60);
  };
  const adjustTimer = (seconds: number) => {
    setTimeLeft((prev) => Math.max(60, prev + seconds));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAuthMode(null);
    fetchUserData();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('token');
    setActiveTab('Hub');
  };



  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-inter">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 font-medium animate-pulse">Initializing FutureLab...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Hub':
        return <Dashboard />;
      case 'Assignments':
        return <Assignments userData={userData} onUpdate={fetchUserData} />;
      case 'Analytics':
        return <Analytics />;
      case 'Courses':
        return <SubjectsPage userData={userData} onUpdate={fetchUserData} />;
      case 'Focus':
        return (
          <Focus 
            timeLeft={timeLeft} 
            isActive={isActive} 
            mode={focusMode} 
            onToggle={toggleTimer} 
            onReset={resetTimer} 
            onChangeMode={changeMode}
            onAdjust={adjustTimer}
          />
        );
      case 'AI Study Coach':
        return <AiTips />;
      case 'Settings':
        return <Settings userData={userData} onUpdate={fetchUserData} />;
      case 'Admin Users':
        return <AdminUsers />;
      case 'Games':
        return <GameCenter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            fontWeight: 'bold',
          },
          success: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#fff',
            },
          },
        }}
      />

      {!isAuthenticated && !authMode && (
        <LandingPage onStart={() => setAuthMode('signup')} onLogin={() => setAuthMode('login')} />
      )}

      {authMode && (
        <Auth mode={authMode} onBack={() => setAuthMode(null)} onSwitchMode={(mode) => setAuthMode(mode)} onSuccess={handleLogin} />
      )}

      {isAuthenticated && (
        <div className="flex min-h-screen bg-slate-900 overflow-hidden font-inter text-slate-100 selection:bg-indigo-500/30">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }} 
            isOpen={isSidebarOpen}
            onToggle={() => setSidebarOpen(!isSidebarOpen)}
            timerState={{ timeLeft, isActive, mode: focusMode }}
            onLogout={handleLogout}
            userData={userData}
          />

          <main className="flex-1 overflow-y-auto h-screen relative pt-16 md:pt-0">
            <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-xl flex items-center px-6 z-30 border-b border-slate-800 md:hidden">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-slate-300 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <span className="ml-4 font-black text-xl tracking-tight text-white flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-indigo-600/30">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                  </svg>
                </div>
                FutureLab
              </span>
            </header>

            <div className="max-w-7xl mx-auto p-6 md:p-12">
              {renderContent()}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default App;
