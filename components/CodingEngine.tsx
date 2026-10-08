import React, { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import Editor, { loader, BeforeMount, OnMount } from '@monaco-editor/react';

// Configure Monaco to use local assets for 100% offline support
loader.config({ paths: { vs: '/monaco/min/vs' } });

// Configure TypeScript language service ONCE when Monaco loads
const setupMonaco: BeforeMount = (monaco) => {
  // Allow top-level await (ESNext module) and treat files as modules
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.Bundler,
    strict: false,
    noImplicitAny: false,
    allowJs: true,
    lib: ['ESNext', 'DOM'],
  });

  // Inject custom ambient types so prompt() returns Promise<string>
  // and top-level await is not flagged
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
    /**
     * FutureLab Coding Engine — interactive terminal prompt.
     * Pauses execution and shows an inline input in the console.
     * @param message - The message to display before the input
     * @returns A Promise that resolves to the string the user typed
     */
    declare function prompt(message: string): Promise<string>;
    `,
    'ts:futurelab-globals.d.ts'
  );

  // Enable full TypeScript syntax + semantic error detection (squiggly lines)
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,      // show type errors
    noSyntaxValidation: false,        // show syntax errors
    noSuggestionDiagnostics: false,   // show suggestions
    diagnosticCodesToIgnore: [
      1375, // 'await' expressions are only allowed at the top level of a file when…
      1378, // Top-level 'await' expressions are only allowed when the 'module' option is set to…
      2304, // Cannot find name 'prompt' (we declare it ourselves above)
    ],
  });

  // Also enable diagnostics on the JavaScript worker (for .js files)
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false,
  });
};

export type SupportedLanguage = 'python' | 'javascript' | 'typescript';

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
    content: 'name = input("What is your name? ")\nage = input("How old are you? ")\nprint(f"Hello {name}! You are {age} years old.")\nprint("Welcome to FutureLab! 🚀")',
  },
  {
    id: '2',
    name: 'main.js',
    language: 'javascript',
    content: 'const name = await prompt("What is your name? ");\nconst age = await prompt("How old are you? ");\nconsole.log(`Hello ${name}! You are ${age} years old.`);\nconsole.log("Welcome to FutureLab! 🚀");',
  },
  {
    id: '3',
    name: 'main.ts',
    language: 'typescript',
    content: 'console.log("This is FutureLab");',
  },
];

const CodingEngine: React.FC = () => {
  const [files, setFiles] = useState<CodeFile[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_FILES;
    try {
      const saved = localStorage.getItem('futurelab_coding_engine_files');
      return saved ? JSON.parse(saved) : DEFAULT_FILES;
    } catch {
      return DEFAULT_FILES;
    }
  });
  
  const [activeFileId, setActiveFileId] = useState<string>(() => {
    if (typeof window === 'undefined') return '1';
    try {
      const saved = localStorage.getItem('futurelab_coding_engine_activeFileId');
      return saved || '1';
    } catch {
      return '1';
    }
  });

  useEffect(() => {
    localStorage.setItem('futurelab_coding_engine_files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('futurelab_coding_engine_activeFileId', activeFileId);
  }, [activeFileId]);
  const [output, setOutput] = useState<{ text: string; type: 'out' | 'err' | 'in' | 'prompt' }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
  const [isTSLoaded, setIsTSLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'Workspace' | 'Console only'>('Workspace');
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileLang, setNewFileLang] = useState<SupportedLanguage>('javascript');
  // Inline terminal input state
  const [pendingInput, setPendingInput] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const pyodideRef = useRef<any>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputResolverRef = useRef<((val: string) => void) | null>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  // Auto-focus terminal input when it appears
  useEffect(() => {
    if (pendingInput !== null) {
      setTimeout(() => terminalInputRef.current?.focus(), 50);
    }
  }, [pendingInput]);

  // Create a promise-based inline prompt (replaces window.prompt)
  const inlinePrompt = useCallback((message: string): Promise<string> => {
    return new Promise((resolve) => {
      setOutput(prev => [...prev, { text: message, type: 'prompt' }]);
      setPendingInput(message);
      setInputValue('');
      inputResolverRef.current = (val: string) => {
        setPendingInput(null);
        setInputValue('');
        setOutput(prev => [...prev, { text: val, type: 'in' }]);
        resolve(val);
      };
    });
  }, []);

  const submitInput = useCallback(() => {
    if (inputResolverRef.current) {
      inputResolverRef.current(inputValue);
      inputResolverRef.current = null;
    }
  }, [inputValue]);

  useEffect(() => {
    const loadPyodide = async () => {
      if (window.loadPyodide) {
        if (!pyodideRef.current) {
          try {
            pyodideRef.current = await window.loadPyodide({ indexURL: "/pyodide/" });
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
          pyodideRef.current = await window.loadPyodide({ indexURL: "/pyodide/" });
          setIsPyodideLoaded(true);
        } catch (err) {
          console.error("Pyodide loading failed", err);
        }
      };
      document.body.appendChild(script);
    };

    const loadTypeScript = () => {
      if ((window as any).ts) { setIsTSLoaded(true); return; }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.js';
      script.onload = () => setIsTSLoaded(true);
      script.onerror = () => console.error('TypeScript compiler CDN load failed');
      document.body.appendChild(script);
    };

    loadPyodide();
    loadTypeScript();
  }, []);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output, pendingInput]);

  const updateActiveFileContent = (newContent: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: newContent } : f));
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) {
      toast.error('File name cannot be empty');
      return;
    }
    const ext = newFileLang === 'python' ? '.py' : newFileLang === 'typescript' ? '.ts' : '.js';
    const finalName = newFileName.endsWith('.py') || newFileName.endsWith('.js') || newFileName.endsWith('.ts')
      ? newFileName
      : `${newFileName}${ext}`;

    const detectedLang: SupportedLanguage = finalName.endsWith('.py') ? 'python' : finalName.endsWith('.ts') ? 'typescript' : 'javascript';
    const newFile: CodeFile = {
      id: Date.now().toString(),
      name: finalName,
      language: detectedLang,
      content: detectedLang === 'python'
        ? '# New Python Script\nprint("Running Python...")'
        : detectedLang === 'typescript'
          ? '// New TypeScript File\nconst message: string = "Hello from TypeScript!";\nconsole.log(message);'
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

  const buildCustomConsole = () => ({
    log: (...args: any[]) => {
      const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      setOutput(prev => [...prev, { text, type: 'out' }]);
    },
    error: (...args: any[]) => {
      const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      setOutput(prev => [...prev, { text: `❌ ${text}`, type: 'err' }]);
    },
    warn: (...args: any[]) => {
      const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      setOutput(prev => [...prev, { text: `⚠️  ${text}`, type: 'out' }]);
    },
    info: (...args: any[]) => {
      const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      setOutput(prev => [...prev, { text, type: 'out' }]);
    },
  });

  const runCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput([]);

    // --- TYPESCRIPT ENGINE ---
    if (activeFile.language === 'typescript') {
      const tsCompiler = (window as any).ts;
      if (!tsCompiler) {
        toast.error('TypeScript compiler is still loading...');
        setIsRunning(false);
        return;
      }
      try {
        const result = tsCompiler.transpileModule(activeFile.content, {
          compilerOptions: {
            module: tsCompiler.ModuleKind.None,
            target: tsCompiler.ScriptTarget.ES2020,
            strict: false,
          },
        });
        const jsCode = result.outputText;
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        const runner = new AsyncFunction('console', 'prompt', jsCode);
        await runner(buildCustomConsole(), inlinePrompt);
        toast.success('TypeScript compiled & executed!');
      } catch (err: any) {
        setOutput(prev => [...prev, { text: `❌ TS Error: ${err.message}`, type: 'err' }]);
        toast.error('TypeScript execution failed');
      } finally {
        setIsRunning(false);
      }
      return;
    }

    // --- JAVASCRIPT ENGINE ---
    if (activeFile.language === 'javascript') {
      try {
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        const runner = new AsyncFunction('console', 'prompt', activeFile.content);
        await runner(buildCustomConsole(), inlinePrompt);
        toast.success('JavaScript executed successfully!');
      } catch (err: any) {
        setOutput(prev => [...prev, { text: `❌ Runtime Error: ${err.message}`, type: 'err' }]);
        toast.error('Execution failed');
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
            if (last && last.type === 'out' && !last.text.endsWith('\n')) {
              return [...prev.slice(0, -1), { text: last.text + text, type: 'out' }];
            }
            return [...prev, { text, type: 'out' }];
          });
        }
      });

      pyodideRef.current.setStderr({
        batched: (text: string) => {
          setOutput(prev => [...prev, { text, type: 'err' }]);
        }
      });

      // Async stdin using the inline terminal
      pyodideRef.current.setStdin({
        stdin: () => {
          // Pyodide stdin must be synchronous — we use a synchronous alert-based workaround
          // but display the prompt inline first by yielding to React
          const val = window.prompt('Input:') ?? '';
          setOutput(prev => [...prev, { text: val, type: 'in' }]);
          return val;
        }
      });

      await pyodideRef.current.runPythonAsync(activeFile.content);
      toast.success('Python executed successfully!');
    } catch (err: any) {
      setOutput(prev => [...prev, { text: `\n❌ ERROR: ${err.message}`, type: 'err' }]);
      toast.error('Execution failed');
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
            <span className="text-sm">
              {activeFile.language === 'python' ? '🐍' : activeFile.language === 'typescript' ? '🔷' : '⚡'}
            </span>
            <span className={`text-xs font-black uppercase tracking-wider ${activeFile.language === 'python' ? 'text-indigo-300' :
              activeFile.language === 'typescript' ? 'text-blue-300' : 'text-amber-300'
              }`}>
              {activeFile.language === 'python' ? 'Python Engine' : activeFile.language === 'typescript' ? 'TypeScript Engine' : 'JavaScript Engine'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {activeFile.language === 'python' && !isPyodideLoaded && (
            <div className="flex items-center space-x-2 text-[10px] font-black text-amber-500 uppercase">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>Loading Python...</span>
            </div>
          )}
          {activeFile.language === 'typescript' && !isTSLoaded && (
            <div className="flex items-center space-x-2 text-[10px] font-black text-blue-400 uppercase">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Loading TS Compiler...</span>
            </div>
          )}
          <button
            onClick={runCode}
            disabled={isRunning || (activeFile.language === 'python' && !isPyodideLoaded) || (activeFile.language === 'typescript' && !isTSLoaded)}
            className={`px-6 py-2 rounded-xl font-black text-xs flex items-center space-x-2 transition-all active:scale-95 ${isRunning || (activeFile.language === 'python' && !isPyodideLoaded) || (activeFile.language === 'typescript' && !isTSLoaded)
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
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${activeFileId === file.id
                  ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <span className="text-base">{file.language === 'python' ? '🐍' : file.language === 'typescript' ? '🔷' : '⚡'}</span>
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
                language={activeFile.language === 'typescript' ? 'typescript' : activeFile.language}
                value={activeFile.content}
                theme="vs-dark"
                beforeMount={setupMonaco}
                onChange={(value) => updateActiveFileContent(value || '')}
                onMount={((editor, monaco) => {
                  // ── TypeScript Diagnostic Engine ──────────────────────────────
                  // Evaluates diagnostics dynamically so it works when switching tabs.
                  const runDiagnostics = () => {
                    const model = editor.getModel();
                    if (!model || model.getLanguageId() !== 'typescript') {
                      if (model) monaco.editor.setModelMarkers(model, 'futurelab-ts', []);
                      return;
                    }

                    const tsLib = (window as any).ts;
                    if (!tsLib) return;

                    const code = model.getValue();
                    const fileName = 'main.ts';
                    const libName = 'lib.d.ts';

                    const MINIMAL_LIB = `
                      interface Console { log(...data: any[]): void; error(...data: any[]): void; warn(...data: any[]): void; info(...data: any[]): void; clear(): void; }
                      declare var console: Console;
                      declare function prompt(message?: string): Promise<string>;
                      declare function alert(message?: any): void;
                      declare function setTimeout(handler: any, timeout?: number, ...args: any[]): number;
                      declare function setInterval(handler: any, timeout?: number, ...args: any[]): number;
                      interface Promise<T> { then(onfulfilled?: any, onrejected?: any): Promise<any>; catch(onrejected?: any): Promise<any>; finally(onfinally?: any): Promise<T>; }
                      declare var Promise: any;
                      interface Array<T> { length: number; [n: number]: T; push(...items: T[]): number; pop(): T | undefined; join(s?: string): string; map(cb: any): any[]; filter(cb: any): any[]; forEach(cb: any): void; }
                      interface String { length: number; [index: number]: string; substring(s: number, e?: number): string; split(s: any): string[]; replace(s: any, r: any): string; toLowerCase(): string; toUpperCase(): string; includes(s: string): boolean; }
                      interface Number { toFixed(f?: number): string; toString(r?: number): string; }
                      interface Boolean {}
                      interface Object {}
                      interface Math { PI: number; abs(x: number): number; ceil(x: number): number; floor(x: number): number; max(...values: number[]): number; min(...values: number[]): number; pow(x: number, y: number): number; random(): number; round(x: number): number; sqrt(x: number): number; }
                      declare var Math: Math;
                      interface JSON { parse(text: string): any; stringify(value: any): string; }
                      declare var JSON: JSON;
                    `;

                    const sourceFile = tsLib.createSourceFile(fileName, code, tsLib.ScriptTarget.ESNext, true);
                    const libFile = tsLib.createSourceFile(libName, MINIMAL_LIB, tsLib.ScriptTarget.ESNext, true);

                    const host = {
                      getSourceFile: (name: string) => name === fileName ? sourceFile : name === libName ? libFile : undefined,
                      writeFile: () => {},
                      getDefaultLibFileName: () => libName,
                      useCaseSensitiveFileNames: () => false,
                      getCanonicalFileName: (f: string) => f,
                      getCurrentDirectory: () => '',
                      getNewLine: () => '\n',
                      fileExists: (name: string) => name === fileName || name === libName,
                      readFile: (name: string) => name === fileName ? code : name === libName ? MINIMAL_LIB : undefined,
                      directoryExists: () => false,
                      getDirectories: () => [],
                    };

                    const program = tsLib.createProgram([libName, fileName], {
                      target: tsLib.ScriptTarget.ESNext,
                      module: tsLib.ModuleKind.CommonJS,
                      strict: false,
                      noImplicitAny: false,
                      noLib: true,
                      skipLibCheck: true,
                      allowJs: true,
                    }, host);

                    const diags = [
                      ...program.getSyntacticDiagnostics(sourceFile),
                      ...program.getSemanticDiagnostics(sourceFile),
                    ];

                    const markers: any[] = diags.map((d: any) => {
                      const start = d.file ? d.file.getLineAndCharacterOfPosition(d.start ?? 0) : { line: 0, character: 0 };
                      const end = d.file ? d.file.getLineAndCharacterOfPosition((d.start ?? 0) + (d.length ?? 1)) : { line: 0, character: 1 };
                      return {
                        severity: d.category === 1 ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
                        message: tsLib.flattenDiagnosticMessageText(d.messageText, '\n'),
                        startLineNumber: start.line + 1,
                        startColumn: start.character + 1,
                        endLineNumber: end.line + 1,
                        endColumn: end.character + 1,
                        source: 'TypeScript',
                      };
                    });

                    monaco.editor.setModelMarkers(model, 'futurelab-ts', markers);
                  };

                  runDiagnostics();
                  const sub1 = editor.onDidChangeModelContent(runDiagnostics);
                  const sub2 = editor.onDidChangeModelLanguage(runDiagnostics);
                  const sub3 = editor.onDidChangeModel(runDiagnostics);

                  editor.onDidDispose(() => {
                    sub1.dispose();
                    sub2.dispose();
                    sub3.dispose();
                  });

                  // Also kick the Monaco built-in worker as a bonus (may or may not work)
                  monaco.languages.typescript
                    .getTypeScriptWorker()
                    .then((getWorker: any) => getWorker(model.uri))
                    .then((worker: any) => worker.getSemanticDiagnostics(model.uri.toString()))
                    .catch(() => { /* worker unavailable — using window.ts fallback above */ });

                }) as OnMount}
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
          <div className={`${viewMode === 'Console only' ? 'flex-1' : 'h-72'} bg-slate-950 border-t border-slate-800 flex flex-col overflow-hidden`}>
            <div className="px-6 py-2 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Console Output ({activeFile.language.toUpperCase()})
                </span>
                {isRunning && (
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Running
                  </span>
                )}
              </div>
              <button onClick={() => setOutput([])} className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Clear</button>
            </div>
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar">
              {output.length === 0 && !pendingInput ? (
                <span className="text-slate-600 italic text-sm">
                  {activeFile.language === 'javascript' || activeFile.language === 'typescript'
                    ? 'Use prompt("message") for user input. Click Run Code to start.'
                    : 'Use input("message") for user input. Click Run Code to start.'}
                </span>
              ) : (
                <div className="space-y-0.5 pb-4">
                  {output.map((line, i) => (
                    <div
                      key={i}
                      className={`break-words whitespace-pre-wrap leading-relaxed ${
                        line.type === 'err' ? 'text-rose-400' :
                        line.type === 'in'  ? 'text-cyan-300' :
                        line.type === 'prompt' ? 'text-amber-300' :
                        'text-emerald-400'
                      }`}
                    >
                      {line.type === 'in' && <span className="text-slate-500 mr-1">{'>'}</span>}
                      {line.text}
                    </div>
                  ))}

                  {/* Inline terminal input */}
                  {pendingInput !== null && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-400">{'>'}</span>
                      <input
                        ref={terminalInputRef}
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') submitInput();
                        }}
                        className="flex-1 bg-transparent outline-none border-none text-cyan-300 font-mono text-sm caret-cyan-400"
                        placeholder="type here and press Enter..."
                        autoComplete="off"
                        spellCheck={false}
                      />
                      <button
                        onClick={submitInput}
                        className="px-3 py-1 text-[10px] font-black bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors uppercase tracking-wider"
                      >
                        Enter ↵
                      </button>
                    </div>
                  )}

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
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewFileLang('javascript')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold text-xs ${newFileLang === 'javascript'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                  >
                    <span className="text-lg">⚡</span>
                    <span>JavaScript</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFileLang('typescript')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold text-xs ${newFileLang === 'typescript'
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                  >
                    <span className="text-lg">🔷</span>
                    <span>TypeScript</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFileLang('python')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold text-xs ${newFileLang === 'python'
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                  >
                    <span className="text-lg">🐍</span>
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
