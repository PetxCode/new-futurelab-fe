import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

interface AuthProps {
  mode: 'login' | 'signup';
  onBack: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
  onSuccess: () => void;
  onPayment: (userData: any) => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onBack, onSwitchMode, onSuccess, onPayment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolError, setSchoolError] = useState(false);
  const [authView, setAuthView] = useState<'form' | 'reset'>('form');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isOthersSelected = selectedSchool.trim().toLowerCase() === 'others';

  const API_URL = `${API_BASE_URL}/api/auth`;
  const SCHOOLS_URL = `${API_BASE_URL}/api/schools`;



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

    // If an instructor was selected from landing page, default to "Others" (Independent)
    if (mode === 'signup' && localStorage.getItem('selectedInstructor')) {
      setSelectedSchool('Others');
    }
  }, [mode]);

  React.useEffect(() => {
    if (mode === 'signup' && selectedSchool.trim() !== '' && !isOthersSelected) {
      const exists = schools.some(s => s.name.toLowerCase() === selectedSchool.toLowerCase());
      setSchoolError(!exists);
    } else {
      setSchoolError(false);
    }
  }, [selectedSchool, schools, mode, isOthersSelected]);

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
      const schoolCode = (formData.get('schoolCode') as string) || undefined;
      
      let schoolName = mode === 'signup' ? selectedSchool : undefined;
      if (mode === 'signup') {
        if (isOthersSelected) {
          schoolName = 'Independent';
        } else {
          const match = schools.find(s => s.name.toLowerCase() === selectedSchool.toLowerCase());
          if (match) schoolName = match.name;
        }
      }

      if (mode === 'signup' && !isOthersSelected && schoolError) {
        toast.error('Please select a registered institution');
        setIsLoading(false);
        return;
      }

      // If Independent user signing up, skip API registration. Hand over form data to App for payment flow
      if (mode === 'signup' && isOthersSelected) {
        onPayment({ fullName, email: email.toLowerCase(), password, schoolName });
        setIsLoading(false);
        return;
      }

      const endpoint = mode === 'signup' ? '/register' : '/login';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password, fullName, schoolName, schoolCode }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
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
            <button onClick={onBack} className="mx-auto mb-6 hover:scale-105 transition-transform flex items-center justify-center">
              <img src="/logo.png" alt="FutureLab" className="h-12 w-auto object-contain" />
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
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••" 
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium pr-14"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
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
                    placeholder="Peter Oti" 
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={isOthersSelected ? 'md:col-span-3' : 'md:col-span-2'}>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Official School</label>
                    <div className="relative group">
                      <input 
                        type="text"
                        list="schools-list"
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        placeholder="Search your Institution"
                        required
                        className={`w-full bg-slate-900 border ${schoolError ? 'border-rose-500 ring-4 ring-rose-500/10' : isOthersSelected ? 'border-amber-500/50 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10' : 'border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'} rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none transition-all font-bold`}
                      />
                      <datalist id="schools-list">
                        {schools.map(s => (
                          <option key={s._id} value={s.name} />
                        ))}
                        <option value="Others" />
                      </datalist>
                      {schoolError && (
                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2 ml-1 animate-pulse">
                          ⚠️ Institution not registered
                        </p>
                      )}
                      {isOthersSelected && (
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mt-2 ml-1">
                          🌟 You'll choose a subscription plan after signup
                        </p>
                      )}
                    </div>
                  </div>
                  {!isOthersSelected && (
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">School Code</label>
                      <input 
                        type="text" 
                        name="schoolCode"
                        placeholder="4-Digit Code" 
                        required
                        maxLength={4}
                        pattern="\d{4}"
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                      />
                      <p className="text-[9px] text-slate-500 mt-2 ml-1 italic opacity-60">Obtain code from Admin.</p>
                    </div>
                  )}
                </div>
              </>
            )}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="peteroti@FutureLab.ng" 
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
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="••••••••" 
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            </>
          )}

            <button 
              type="submit"
              disabled={isLoading || (mode === 'signup' && (schoolError || !selectedSchool))}
              className={`w-full py-5 ${mode === 'signup' && (schoolError || !selectedSchool) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : isOthersSelected ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-amber-500/20' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'} font-black rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-3 text-lg`}
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
