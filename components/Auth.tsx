
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface AuthProps {
  mode: 'login' | 'signup';
  onBack: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onBack, onSwitchMode, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolError, setSchoolError] = useState(false);
  const [authView, setAuthView] = useState<'form' | 'reset'>('form');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Use the same base URL as App.tsx if possible, or stick to the one in this file.
  // The file current uses hardcoded 'https://futurelab-main-be.vercel.app'
  // const API_URL = 'http://localhost:5000/api/auth'; // Using local for now as per App.tsx
  const API_URL = 'https://futurelab-main-be.vercel.app/api/auth';
  // const SCHOOLS_URL = 'http://localhost:5000/api/schools';
  const SCHOOLS_URL = 'https://futurelab-main-be.vercel.app/api/schools';



  React.useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(SCHOOLS_URL);
        if (response.ok) {
          const data = await response.json();
          setSchools(data);
        }
      } catch (err) {
        console.error('Error fetching schools:', err);
      }
    };
    fetchSchools();
  }, []);

  React.useEffect(() => {
    if (mode === 'signup' && selectedSchool.trim() !== '') {
      const exists = schools.some(s => s.name.toLowerCase() === selectedSchool.toLowerCase());
      setSchoolError(!exists);
    } else {
      setSchoolError(false);
    }
  }, [selectedSchool, schools, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authView === 'reset') {
        const response = await fetch(`${API_URL}/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: resetEmail.toLowerCase(), newPassword }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Password updated successfully!');
          setAuthView('form');
        } else {
          toast.error(data.message || 'Error updating password');
        }
        return;
      }

      // Standard Login/Signup
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const fullName = (formData.get('fullName') as string) || undefined;
      
      let schoolName = mode === 'signup' ? selectedSchool : undefined;
      if (mode === 'signup') {
        const match = schools.find(s => s.name.toLowerCase() === selectedSchool.toLowerCase());
        if (match) schoolName = match.name;
      }

      if (mode === 'signup' && schoolError) {
        toast.error('Please select a registered institution');
        setIsLoading(false);
        return;
      }

      const endpoint = mode === 'signup' ? '/register' : '/login';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password, fullName, schoolName }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSuccess();
      } else {
        toast.error(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Auth error:', err);
      toast.error('Could not connect to authentication server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

      <div className="w-full max-w-lg relative animate-in zoom-in-95 fade-in duration-500">
        <button 
          onClick={onBack}
          className="absolute -top-16 left-0 text-slate-500 hover:text-white flex items-center space-x-2 font-bold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          <span>Back to Home</span>
        </button>

        <div className="bg-slate-800 border border-slate-700 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="text-center mb-10">
            <button onClick={onBack} className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/30 hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </button>
            <h2 className="text-4xl font-black text-white tracking-tight">
              {authView === 'reset' ? 'Update Password' : mode === 'login' ? 'Welcome back.' : 'Get Started'}
            </h2>
            <p className="text-slate-400 font-medium mt-2">
              {authView === 'reset' ? 'Enter your email and new credentials.' :
               mode === 'login' ? 'Continue your engineering mastery.' : 'Create your free learner account today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {authView === 'reset' ? (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="yourname@email.com" 
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••" 
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </>
            ) : (
              // Normal Form Flow
              <>
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Leo Sterling" 
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Official School</label>
                  <div className="relative group">
                    <input 
                      type="text"
                      list="schools-list"
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      placeholder="Search your Institution"
                      required
                      className={`w-full bg-slate-900 border ${schoolError ? 'border-rose-500 ring-4 ring-rose-500/10' : 'border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'} rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none transition-all font-bold`}
                    />
                    <datalist id="schools-list">
                      {schools.map(s => (
                        <option key={s._id} value={s.name} />
                      ))}
                    </datalist>
                    {schoolError && (
                      <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2 ml-1 animate-pulse">
                        ⚠️ Institution not registered
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="leo@FutureLab.ai" 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                {mode === 'login' && (
                  <button 
                    type="button"
                    onClick={() => setShowResetModal(true)}
                    className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
              />
            </div>
            </>
          )}

            <button 
              type="submit"
              disabled={isLoading || (mode === 'signup' && (schoolError || !selectedSchool))}
              className={`w-full py-5 ${mode === 'signup' && (schoolError || !selectedSchool) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'} font-black rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-3 text-lg`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>
                  {authView === 'reset' ? 'Update Password' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </span>
              )}
            </button>
            <div className="text-center mt-6">
              <button 
                type="button"
                onClick={() => {
                  if (authView !== 'form') {
                    setAuthView('form');
                  } else {
                    onSwitchMode(mode === 'login' ? 'signup' : 'login');
                  }
                }}
                className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
              >
                {authView !== 'form' ? (
                  <>Back to <span className="text-indigo-400">Sign In</span></>
                ) : mode === 'login' ? (
                  <>Don't have an account? <span className="text-indigo-400">Join Quest</span></>
                ) : (
                  <>Already have an account? <span className="text-indigo-400">Sign In</span></>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span className="bg-slate-800 px-4 italic">Social Connection</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-3 py-4 bg-slate-900 border border-slate-700 rounded-2xl hover:bg-slate-700 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-3 py-4 bg-slate-900 border border-slate-700 rounded-2xl hover:bg-slate-700 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">GitHub</span>
            </button>
          </div>
        </div>
      </div>
      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-3xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/20">
                <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4">Reset Password?</h3>
              <p className="text-slate-400 font-medium leading-relaxed mb-10">
                You are about to initiate a password reset. This will allow you to set a new credential for your account. Continue?
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowResetModal(false);
                    setAuthView('reset');
                  }}
                  className="py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
