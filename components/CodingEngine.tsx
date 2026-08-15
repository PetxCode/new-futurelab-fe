import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Editor, { loader } from '@monaco-editor/react';

// Configure Monaco to use local assets for 100% offline support
loader.config({ paths: { vs: '/monaco/min/vs' } });

export type SupportedLanguage = 'python' | 'javascript';

export interface CodeFile {
  id: string;
  name: string;
  language: SupportedLanguage;
  content: string;
}

const DEFAULT_FILES: CodeFile[] = [
  {
    id: '1',
    name: 'main.py',
    language: 'python',
    content: 'print("Hello FutureLab! 👋")\n\n# Try writing some Python code here\nfor i in range(5):\n    print(f"Iteration {i+1}")',
  },
  {
    id: '2',
    name: 'main.js',
    language: 'javascript',
    content: 'console.log("Hello FutureLab! 👋");\n\n// Try writing some JavaScript code here\nfor (let i = 1; i <= 5; i++) {\n  console.log(`Iteration ${i}`);\n}',
  },
];

const CodingEngine: React.FC = () => {
  const [files, setFiles] = useState<CodeFile[]>(DEFAULT_FILES);
  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'Workspace' | 'Console only'>('Workspace');
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileLang, setNewFileLang] = useState<SupportedLanguage>('javascript');
  
  const pyodideRef = useRef<any>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

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
        }
      };
      document.body.appendChild(script);
    };

    loadPyodide();
  }, []);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const updateActiveFileContent = (newContent: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: newContent } : f));
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) {
      toast.error('File name cannot be empty');
      return;
    }
    const ext = newFileLang === 'python' ? '.py' : '.js';
    const finalName = newFileName.endsWith('.py') || newFileName.endsWith('.js') 
      ? newFileName 
      : `${newFileName}${ext}`;

    const newFile: CodeFile = {
      id: Date.now().toString(),
      name: finalName,
      language: finalName.endsWith('.py') ? 'python' : 'javascript',
      content: finalName.endsWith('.py') 
        ? '# New Python Script\nprint("Running Python...")' 
        : '// New JavaScript Script\nconsole.log("Running JavaScript...");',
    };

    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setShowNewFileModal(false);
    setNewFileName('');
    toast.success(`Created ${finalName}`);
  };

  const deleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (files.length <= 1) {
      toast.error("Cannot delete the only file");
      return;
    }
    const filtered = files.filter(f => f.id !== id);
    setFiles(filtered);
    if (activeFileId === id) {
      setActiveFileId(filtered[0].id);
    }
    toast.success("File removed");
  };

  const runCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput([]);

    // --- JAVASCRIPT ENGINE ---
    if (activeFile.language === 'javascript') {
      try {
        const customConsole = {
          log: (...args: any[]) => {
            const formatted = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            setOutput(prev => [...prev, formatted]);
          },
          error: (...args: any[]) => {
            const formatted = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            setOutput(prev => [...prev, `❌ ${formatted}`]);
          },
          warn: (...args: any[]) => {
            const formatted = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            setOutput(prev => [...prev, `⚠️ ${formatted}`]);
          },
          info: (...args: any[]) => {
            const formatted = args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            setOutput(prev => [...prev, formatted]);
          }
        };

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const runner = new AsyncFunction('console', 'prompt', activeFile.content);
        await runner(customConsole, window.prompt);
        toast.success("JavaScript executed successfully!");
      } catch (err: any) {
        setOutput(prev => [...prev, `❌ Runtime Error: ${err.message}`]);
        toast.error("Execution failed");
      } finally {
        setIsRunning(false);
      }
      return;
    }

    // --- PYTHON ENGINE ---
    if (!pyodideRef.current) {
      toast.error("Python engine is still loading...");
      setIsRunning(false);
      return;
    }

    try {
      pyodideRef.current.setStdout({
        batched: (text: string) => {
          setOutput(prev => {
            const last = prev[prev.length - 1];
            if (last && !last.endsWith('\n')) {
              return [...prev.slice(0, -1), last + text];
            }
            return [...prev, text];
          });
        }
      });

      pyodideRef.current.setStderr({
        batched: (text: string) => {
          setOutput(prev => [...prev, `❌ ${text}`]);
        }
      });

      pyodideRef.current.setStdin({
        stdin: () => {
          const result = window.prompt("Python Input Required:");
          if (result !== null) {
            setOutput(prev => [...prev, `${result}\n`]);
            return result;
          }
          return "";
        }
      });

      await pyodideRef.current.runPythonAsync(activeFile.content);
      toast.success("Python executed successfully!");
    } catch (err: any) {
      setOutput(prev => [...prev, `\n❌ ERROR: ${err.message}`]);
      toast.error("Execution failed");
    } finally {
      setIsRunning(false);
    }
  };

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
          
          {/* Active Engine Badge */}
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
            <span className="text-sm">{activeFile.language === 'python' ? '🐍' : '⚡'}</span>
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">
              {activeFile.language === 'python' ? 'Python Engine' : 'JavaScript Engine'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {activeFile.language === 'python' && !isPyodideLoaded && (
            <div className="flex items-center space-x-2 text-[10px] font-black text-amber-500 uppercase">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>Loading Pyodide...</span>
            </div>
          )}
          <button 
            onClick={runCode}
            disabled={isRunning || (activeFile.language === 'python' && !isPyodideLoaded)}
            className={`px-6 py-2 rounded-xl font-black text-xs flex items-center space-x-2 transition-all active:scale-95 ${
              isRunning || (activeFile.language === 'python' && !isPyodideLoaded)
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
        {/* File Tree Sidebar */}
        <div className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">FILES</span>
            <button 
              onClick={() => setShowNewFileModal(true)}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
              title="Create New File"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <div className="p-2 space-y-1 overflow-y-auto flex-1">
            {files.map(file => (
              <div 
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${
                  activeFileId === file.id
                    ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <span className="text-base">{file.language === 'python' ? '🐍' : '⚡'}</span>
                  <span className="text-xs truncate">{file.name}</span>
                </div>
                {files.length > 1 && (
                  <button 
                    onClick={(e) => deleteFile(file.id, e)}
                    className="opacity-0 group-hover:opacity-100 hover:text-rose-400 text-slate-600 p-1"
                    title="Delete File"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Editor & Console Split */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {viewMode === 'Workspace' && (
            <div className="flex-1 flex overflow-hidden">
              <Editor
                height="100%"
                language={activeFile.language}
                value={activeFile.content}
                theme="vs-dark"
                onChange={(value) => updateActiveFileContent(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 18,
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

          {/* Console Output */}
          <div className={`${viewMode === 'Console only' ? 'flex-1' : 'h-64'} bg-slate-950 border-t border-slate-800 flex flex-col overflow-hidden`}>
            <div className="px-6 py-2 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Console Output ({activeFile.language.toUpperCase()})
              </span>
              <button onClick={() => setOutput([])} className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Clear</button>
            </div>
            <div className="flex-1 p-6 font-mono text-lg overflow-y-auto custom-scrollbar">
              {output.length === 0 ? (
                <span className="text-slate-600 italic">No output yet. Click 'Run Code' to execute.</span>
              ) : (
                <div className="space-y-1 pb-20">
                  {output.map((line, i) => (
                    <div key={i} className="text-emerald-400 break-words whitespace-pre-wrap leading-relaxed">{line}</div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New File Modal */}
      {showNewFileModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Create New Code File</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">File Name</label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. app.js or script.py"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 font-mono text-sm"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Language Engine</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewFileLang('javascript')}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 font-bold text-xs ${
                      newFileLang === 'javascript'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>⚡</span>
                    <span>JavaScript</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFileLang('python')}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 font-bold text-xs ${
                      newFileLang === 'python'
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🐍</span>
                    <span>Python</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewFileModal(false)}
                className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 text-xs"
              >
                Create File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingEngine;

declare global {
  interface Window {
    loadPyodide: any;
  }
}
