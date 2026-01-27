
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Editor, { loader } from '@monaco-editor/react';

// Configure Monaco to use local assets for 100% offline support
loader.config({ paths: { vs: '/monaco/min/vs' } });

const CodingEngine: React.FC = () => {
  const [code, setCode] = useState('print("Hello FutureLab! 👋")\n\n# Try writing some Python code here\nfor i in range(5):\n    print(f"Iteration {i+1}")');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'Workspace' | 'Console only'>('Workspace');
  const pyodideRef = useRef<any>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      if (window.loadPyodide) {
        if (!pyodideRef.current) {
          try {
            pyodideRef.current = await window.loadPyodide({
              indexURL: "/pyodide/"
            });
            setIsPyodideLoaded(true);
          } catch (err) {
            console.error("Pyodide loading failed", err);
            toast.error("Failed to initialize Python engine");
          }
        }
        return;
      }

      const script = document.createElement('script');
      script.src = "/pyodide/pyodide.js";
      script.onload = async () => {
        try {
          pyodideRef.current = await window.loadPyodide({
            indexURL: "/pyodide/"
          });
          setIsPyodideLoaded(true);
        } catch (err) {
          console.error("Pyodide loading failed", err);
          toast.error("Failed to initialize Python engine");
        }
      };
      document.body.appendChild(script);
    };

    loadPyodide();
  }, []);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const runCode = async () => {
    if (!pyodideRef.current || isRunning) return;
    
    setIsRunning(true);
    setOutput([]);
    
    try {
      // Redirect stdout
      pyodideRef.current.setStdout({
        batched: (text: string) => {
          setOutput(prev => [...prev, text]);
        }
      });

      await pyodideRef.current.runPythonAsync(code);
      toast.success("Code executed successfully!");
    } catch (err: any) {
      setOutput(prev => [...prev, `\n❌ ERROR: ${err.message}`]);
      toast.error("Execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="flex flex-col h-screen bg-slate-950 overflow-hidden font-mono">
      {/* Header */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button 
              onClick={() => setViewMode('Workspace')}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${viewMode === 'Workspace' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Workspace
            </button>
            <button 
              onClick={() => setViewMode('Console only')}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${viewMode === 'Console only' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Console only
            </button>
          </div>
          <div className="h-4 w-[1px] bg-slate-800 mx-2" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">TensorFlow 2.0 Workshop</span>
        </div>

        <div className="flex items-center space-x-3">
          {!isPyodideLoaded && (
            <div className="flex items-center space-x-2 text-[10px] font-black text-amber-500 uppercase">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>Loading Engine...</span>
            </div>
          )}
          <button 
            onClick={runCode}
            disabled={!isPyodideLoaded || isRunning}
            className={`px-6 py-2 rounded-xl font-black text-xs flex items-center space-x-2 transition-all active:scale-95 ${
              !isPyodideLoaded || isRunning 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
            }`}
          >
            {isRunning ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
            <span>{isRunning ? 'EXECUTING' : 'RUN CODE'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Files</span>
            <button className="text-slate-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
          <div className="p-2 space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
              <span className="text-lg">🐍</span>
              <span className="text-sm font-bold">main.py</span>
            </div>
          </div>
        </div>

        {/* Editor & Console Split */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {viewMode === 'Workspace' && (
            <div className="flex-1 flex overflow-hidden">
               <Editor
                height="100%"
                defaultLanguage="python"
                value={code}
                theme="vs-dark"
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                  padding: { top: 20 },
                  fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                }}
              />
            </div>
          )}

          {/* Console */}
          <div className={`${viewMode === 'Console only' ? 'flex-1' : 'h-64'} bg-slate-950 border-t border-slate-800 flex flex-col overflow-hidden`}>
            <div className="px-6 py-2 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Console Output</span>
              <button onClick={() => setOutput([])} className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Clear</button>
            </div>
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar">
              {output.length === 0 ? (
                <span className="text-slate-600 italic">No output yet. Click 'Run Code' to execute.</span>
              ) : (
                <div className="space-y-1">
                  {output.map((line, i) => (
                    <div key={i} className="text-emerald-400 break-words whitespace-pre-wrap">{line}</div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingEngine;

declare global {
  interface Window {
    loadPyodide: any;
  }
}
