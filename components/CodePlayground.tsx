import React, { useState, useEffect } from 'react';

interface CodePlaygroundProps {
  onBack: () => void;
  initialHtml?: string;
  initialCss?: string;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  onBack, 
  initialHtml = '<h1>Hello FutureLab! 🚀</h1>\n<p>Start typing your HTML here...</p>', 
  initialCss = 'body {\n  background: #0f172a;\n  color: #bef264;\n  font-family: sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  margin: 0;\n}' 
}) => {
  const [html, setHtml] = useState(() => localStorage.getItem('playground_html') || initialHtml);
  const [css, setCss] = useState(() => localStorage.getItem('playground_css') || initialCss);
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <script src="/tailwindcss.js"></script>
            <style>${css}</style>
          </head>
          <body>${html}</body>
        </html>
      `);
      localStorage.setItem('playground_html', html);
      localStorage.setItem('playground_css', css);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onBack}
            className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">
              Code <span className="text-lime-400">Playground</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live HTML/CSS Lab • Experimental</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-lime-400/10 border border-lime-400/20 rounded-none">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-lime-400 uppercase tracking-widest">Auto-Saving</span>
          </div>
          <button 
            onClick={() => {
              setHtml(initialHtml);
              setCss(initialCss);
            }}
            className="px-6 py-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 hover:border-red-500/50 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Reset Lab
          </button>
        </div>
      </div>

      {/* Main Lab Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Side */}
        <div className="w-1/2 flex flex-col border-r border-slate-800">
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-900/80 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Structure (HTML)</span>
              <span className="text-[10px] font-mono text-slate-600">index.html</span>
            </div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="flex-1 bg-[#0a0f1d] p-8 font-mono text-sm text-slate-300 outline-none resize-none focus:ring-1 focus:ring-lime-400/20 transition-all"
              spellCheck={false}
            />
          </div>
          <div className="flex-1 flex flex-col border-t border-slate-800">
            <div className="bg-slate-900/80 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Style (CSS)</span>
              <span className="text-[10px] font-mono text-slate-600">styles.css</span>
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="flex-1 bg-[#0a0f1d] p-8 font-mono text-sm text-slate-300 outline-none resize-none focus:ring-1 focus:ring-lime-400/20 transition-all"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Preview Side */}
        <div className="w-1/2 flex flex-col bg-slate-950">
          <div className="bg-slate-900/80 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-lime-500/50"></div>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Preview</span>
          </div>
          <div className="flex-1 bg-[#0f172a] relative">
            <iframe
              srcDoc={srcDoc}
              title="preview"
              sandbox="allow-scripts"
              className="w-full h-full border-none bg-transparent"
            />
            
            {/* Design Watermark */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 select-none">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Next FutureLab Engine</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Tips */}
      <div className="h-12 bg-slate-900 border-t border-slate-800 flex items-center px-8 justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-500">
            <span className="text-lime-400">TIP:</span>
            <span>Use &lt;h1&gt; for big titles and &lt;p&gt; for normal text!</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-500">
            <span className="text-lime-400">TIP:</span>
            <span>CSS colors like 'red', 'blue', or '#ff0000' work perfectly.</span>
          </div>
        </div>
        <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
          Version 1.0.4-beta • Webkit 6.0
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
