
import React, { useState, useEffect, useRef } from 'react';
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
import CodingEngine from './components/CodingEngine';
import EngineBlocks from './components/EngineBlocks';
import ML4Kids from './components/ML4Kids';
import NextTeach from './components/NextTeach';
import Projects from './components/Projects';
import Utilities from './components/Utilities';
import JuniorCode from './components/JuniorCode';
import CodeBattle from './components/CodeBattle';
import LearningPath from './components/LearningPath';
import InstructorReportForm from './components/InstructorReportForm';
import AdminReportDashboard from './components/AdminReportDashboard';
import ErrorBoundary from './components/ErrorBoundary';

import GameCenter from './components/Game/GameCenter';
import { NavigationItem, User } from './types';
import { Toaster } from 'react-hot-toast';

export const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:5000' 
  // ? 'https://futurelab-main-be.onrender.com' 
  : 'https://futurelab-main-be.onrender.com';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationItem>('Hub');
  const [tabResetKey, setTabResetKey] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Focus Timer Global State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [focusMode, setFocusMode] = useState<'Work' | 'Break'>('Work');

  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem('token');
    if (!authToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/me`, {
        headers: { 'x-auth-token': authToken }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else if (response.status === 401 || response.status === 403) {
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
          const response = await fetch(`${API_BASE_URL}/api/user/me`, {
            headers: { 'x-auth-token': token }
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setIsAuthenticated(true);
          } else if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Auth check failed (network/server error)", error);
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
            await fetch(`${API_BASE_URL}/api/analytics/focus`, {
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

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setShowScrollTop(scrollContainerRef.current.scrollTop > 200);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Auto-scroll to top on navigation/tab change
      container.scrollTo(0, 0);
      handleScroll();
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeTab]); // Remove isAuthenticated if not strictly needed for scroll reset



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
        return <Dashboard userData={userData} onNavigate={(tab) => setActiveTab(tab)} />;
      case 'Assignments':
        return <Assignments userData={userData} onUpdate={fetchUserData} />;
      case 'Analytics':
        return <Analytics />;
      case 'Courses':
        return <SubjectsPage userData={userData} onUpdate={fetchUserData} />;
      // case 'Focus':
      //   return (
      //     <Focus 
      //       timeLeft={timeLeft} 
      //       isActive={isActive} 
      //       mode={focusMode} 
      //       onToggle={toggleTimer} 
      //       onReset={resetTimer} 
      //       onChangeMode={changeMode}
      //       onAdjust={adjustTimer}
      //     />
      //   );
      // case 'AI Study Coach':
      //   return <AiTips />;
      case 'Settings':
        return <Settings userData={userData} onUpdate={fetchUserData} />;
      case 'Admin Users':
        return <AdminUsers userData={userData} isSchoolContext={false} />;
      case 'School Registry':
        return <AdminUsers userData={userData} isSchoolContext={true} />;
      case 'Games':
        return <GameCenter />;
      case 'Junior Code':
        return <JuniorCode userData={userData} />;
      case 'Code Battle':
        return <CodeBattle />;
      case 'Python Engine':
        return <CodingEngine />;
      case 'Engine Blocks':
        return <EngineBlocks />;
      case 'ML4Kids':
        return <ML4Kids onNavigate={(tab) => setActiveTab(tab)} />;
      case 'NEXT Teach':
        return <NextTeach userData={userData} />;
      case 'Projects':
        return <Projects userData={userData} />;
      case 'Utilities':
        return <Utilities />;
      case 'Learning Path':
        return <LearningPath user={userData} />;
      case 'Reports':
        if (userData?.isAdmin || userData?.isSchoolAdmin) return <AdminReportDashboard />;
        if (userData?.isInstructor) return <InstructorReportForm />;
        return (
          <div className="flex flex-col items-center justify-center h-full py-40 gap-4">
            <span className="text-5xl">🔒</span>
            <h2 className="text-2xl font-black text-white">Access Restricted</h2>
            <p className="text-slate-400 text-sm">Only instructors and school admins can view reports.</p>
          </div>
        );
      default:
        return <Dashboard userData={userData} />;
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
        <div className="flex h-screen bg-slate-900 overflow-hidden font-inter text-slate-100 selection:bg-indigo-500/30">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              if (tab === activeTab) {
                setTabResetKey(prev => prev + 1);
              } else {
                setActiveTab(tab);
                setTabResetKey(0); // Optional: Reset on tab switch
              }
              setSidebarOpen(false);
            }} 
            isOpen={isSidebarOpen}
            onToggle={() => setSidebarOpen(!isSidebarOpen)}
            timerState={{ timeLeft, isActive, mode: focusMode }}
            onLogout={handleLogout}
            userData={userData}
          />

          <main 
            ref={scrollContainerRef}
            className={`flex-1 ${activeTab === 'Engine Blocks' || activeTab === 'Python Engine' || activeTab === 'Junior Code' ? 'overflow-hidden' : 'overflow-y-auto'} h-full relative pt-16 md:pt-0`}
          >
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

            <div className={`${(activeTab === 'Engine Blocks' || activeTab === 'Python Engine' || activeTab === 'Junior Code') ? 'h-full w-full' : 'max-w-7xl mx-auto p-6 md:p-12'}`}>
              <ErrorBoundary key={`${activeTab}-${tabResetKey}`}>
                {renderContent()}
              </ErrorBoundary>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className={`fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-600/40 border border-indigo-500 transition-all duration-500 z-50 hover:scale-110 active:scale-95 group ${
                showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
              }`}
              aria-label="Scroll to top"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 group-hover:-translate-y-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </main>
        </div>
      )}
    </>
  );
};

export default App;
