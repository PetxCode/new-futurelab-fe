
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500/30 font-inter overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-white">FutureLab</span>
          </div>
          {/* <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-400">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Curriculum</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Community</a>
          </div> */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLogin}
              className="px-4 py-2 text-sm font-black text-slate-300 hover:text-white transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={onStart}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-[16/9] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 animate-bounce cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">New: AI Study Counselor 2.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] max-w-4xl mx-auto">
            Master Engineering <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">One Quest at a Time.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            The world's first gamified learning dashboard for aspiring engineers. Track focus hours, master neural networks, and level up your technical career.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Start Your Journey
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl border border-slate-700 transition-all flex items-center justify-center space-x-3">
              <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>Watch the Trailer</span>
            </button>
          </div>

          {/* Social Proof/Stats */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Active Learners', val: '12k+' },
              { label: 'Lines of Code', val: '4.2M' },
              { label: 'Courses Mastered', val: '850+' },
              { label: 'Lab Hours', val: '120k' }
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-black text-white">{s.val}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight">Everything you need to succeed.</h2>
            <p className="text-slate-400 font-medium mt-2">Built by engineers, for engineers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Smart Curriculum',
                desc: 'AI-driven paths through Python, Robotics, and Machine Learning subjects.',
                icon: '🧠',
                color: 'bg-indigo-500'
              },
              {
                title: 'Deep Focus Mode',
                desc: 'Built-in Pomodoro timer that tracks your "Flow State" and rewards consistency.',
                icon: '⚡',
                color: 'bg-cyan-500'
              },
              {
                title: 'Visual Analytics',
                desc: 'Professional charts and heatmaps to visualize your growth over semesters.',
                icon: '📈',
                color: 'bg-emerald-500'
              }
            ].map(f => (
              <div key={f.title} className="p-10 bg-slate-800/40 border border-slate-700/50 rounded-[3rem] group hover:border-indigo-500/50 transition-all">
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-white">FutureLab</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">© 2024 FutureLab: A NEXT Project. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
