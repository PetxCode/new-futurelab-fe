import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";

// ─── Types ────────────────────────────────────────────────────────────
interface CodePlaygroundProps {
  onBack: () => void;
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
}

type TabId = "html" | "css" | "js";

const TAB_CONFIG: { id: TabId; label: string; lang: string; icon: string }[] = [
  { id: "html", label: "index.html", lang: "html", icon: "🟧" },
  { id: "css", label: "styles.css", lang: "css", icon: "🟦" },
  { id: "js", label: "script.js", lang: "javascript", icon: "🟨" },
];
// background: #0f172a;
//  display: flex;
//   align-items: center;
//   justify-content: center;

// ─── Default starter content ──────────────────────────────────────────
const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Page</title>
</head>
<body>
  <div class="card">
    <h1 class="title">Hello, FutureLab! 🚀</h1>
    <p class="subtitle">Edit the HTML, CSS and JS tabs to build anything.</p>
    <button class="btn" onclick="handleClick()">Click Me!</button>
    <p id="output" class="output"></p>
  </div>
</body>
</html>`;

const DEFAULT_CSS = `/* ── Global Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  padding: 2rem;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 1.5rem;
  padding: 2.5rem 3rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 0 60px rgba(99,102,241,0.15);
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: 900;
  color: #e2e8f0;
  margin-bottom: 0.75rem;
}

.subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(99,102,241,0.4);
}

.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(99,102,241,0.6); }
.btn:active { transform: scale(0.96); }

.output {
  margin-top: 1.25rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #a78bfa;
  min-height: 1.5em;
}`;

const DEFAULT_JS = `// ── Interactive logic ──────────────────────────────
const messages = [
  "Great job! 🎉",
  "You're a coder now! 💻",
  "Keep building! 🚀",
  "HTML + CSS + JS = Magic ✨",
];

let count = 0;

function handleClick() {
  const output = document.getElementById('output');
  output.textContent = messages[count % messages.length];
  count++;
}`;

// ─── Monaco editor theme (dark matching our design) ───────────────────
const defineMonacoTheme = (monaco: any) => {
  monaco.editor.defineTheme("futurelab-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "tag", foreground: "38bdf8" },
      { token: "attribute.name", foreground: "7dd3fc" },
      { token: "attribute.value", foreground: "a3e635" },
      { token: "comment", foreground: "475569", fontStyle: "italic" },
      { token: "keyword", foreground: "c084fc" },
      { token: "string", foreground: "fde68a" },
      { token: "number", foreground: "fb923c" },
      { token: "type", foreground: "34d399" },
    ],
    colors: {
      "editor.background": "#090e1a",
      "editor.foreground": "#cbd5e1",
      "editor.lineHighlightBackground": "#1e293b80",
      "editorLineNumber.foreground": "#334155",
      "editorLineNumber.activeForeground": "#94a3b8",
      "editor.selectionBackground": "#6366f140",
      "editorCursor.foreground": "#a78bfa",
      "editorIndentGuide.background": "#1e293b",
      "editorIndentGuide.activeBackground": "#334155",
    },
  });
};

// ─── Build srcdoc without any network fetch ───────────────────────────
const buildSrcDoc = (html: string, css: string, js: string) => {
  // Inject CSS and JS into the user's HTML. If the user wrote a full <html> doc,
  // we detect it and inject; otherwise we wrap a minimal shell.
  const isFull = /<html/i.test(html);
  const twUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/tailwindcss.js`
      : "/tailwindcss.js";

  if (isFull) {
    // Insert <style> before </head> and <script> before </body>
    let doc = html;
    const styleTag = `<style>${css}</style>`;
    const scriptTag = `<script src="${twUrl}"><\/script><script>${js}<\/script>`;

    if (/<\/head>/i.test(doc)) {
      doc = doc.replace(/<\/head>/i, `${styleTag}\n</head>`);
    } else {
      doc = styleTag + doc;
    }
    if (/<\/body>/i.test(doc)) {
      doc = doc.replace(/<\/body>/i, `${scriptTag}\n</body>`);
    } else {
      doc = doc + scriptTag;
    }
    return doc;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <script src="${twUrl}"><\/script>
  <style>${css}</style>
</head>
<body>
${html}
<script>${js}<\/script>
</body>
</html>`;
};

// ─── Component ────────────────────────────────────────────────────────
const CodePlayground: React.FC<CodePlaygroundProps> = ({
  onBack,
  initialHtml = DEFAULT_HTML,
  initialCss = DEFAULT_CSS,
  initialJs = DEFAULT_JS,
}) => {
  const [html, setHtml] = useState(
    () => localStorage.getItem("pg_html") ?? initialHtml,
  );
  const [css, setCss] = useState(
    () => localStorage.getItem("pg_css") ?? initialCss,
  );
  const [js, setJs] = useState(
    () => localStorage.getItem("pg_js") ?? initialJs,
  );
  const [activeTab, setActiveTab] = useState<TabId>("html");
  const [srcDoc, setSrcDoc] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [layout, setLayout] = useState<"split" | "editor" | "preview">("split");
  const [splitRatio, setSplitRatio] = useState(50); // percentage for editor width
  const [isDragging, setIsDragging] = useState(false);
  const [consoleLines, setConsoleLines] = useState<
    { type: "log" | "error" | "warn"; msg: string }[]
  >([]);
  const [showConsole, setShowConsole] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle dragging the splitter
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newRatio =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      // Clamp between 20% and 80%
      setSplitRatio(Math.max(20, Math.min(80, newRatio)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("pg_html", html);
  }, [html]);
  useEffect(() => {
    localStorage.setItem("pg_css", css);
  }, [css]);
  useEffect(() => {
    localStorage.setItem("pg_js", js);
  }, [js]);

  // Debounced preview refresh
  const refresh = useCallback(() => {
    clearTimeout(debounceRef.current);
    setIsSaved(false);
    debounceRef.current = setTimeout(() => {
      const consolePatch = `
        (function(){
          const _log = console.log, _warn = console.warn, _err = console.error;
          function post(type, args){
            window.parent.postMessage({type:'__console__', level: type, msg: Array.from(args).join(' ')}, '*');
          }
          console.log   = function(){ post('log',  arguments); _log.apply(console, arguments); };
          console.warn  = function(){ post('warn', arguments); _warn.apply(console, arguments); };
          console.error = function(){ post('error',arguments); _err.apply(console, arguments); };
          window.onerror = function(msg){ post('error', [msg]); return false; };
        })();
      `;
      const doc = buildSrcDoc(html, css, consolePatch + js);
      setSrcDoc(doc);
      setIsSaved(true);
    }, 300);
  }, [html, css, js]);

  useEffect(() => {
    refresh();
  }, [html, css, js, refresh]);

  // Console message listener
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "__console__") {
        setConsoleLines((prev) => [
          ...prev.slice(-99),
          { type: e.data.level, msg: e.data.msg },
        ]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleReset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
    setConsoleLines([]);
  };

  const handleFormat = () => {
    // Basic self-closing tag cleanup / whitespace normalize
    // Full formatting would need prettier — we just re-set the value to trigger Monaco's own format
    const models = (window as any).__monaco_models__;
    if (models) {
      Object.values(models).forEach((m: any) =>
        m?.getAction?.("editor.action.formatDocument")?.run(),
      );
    }
  };

  const getTabValue = (id: TabId) =>
    id === "html" ? html : id === "css" ? css : js;
  const setTabValue = (id: TabId, val: string) => {
    if (id === "html") setHtml(val);
    else if (id === "css") setCss(val);
    else setJs(val);
  };

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex flex-col bg-[#090e1a] text-white font-sans overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
      {/* ── Top bar ────────────────────────────────────────────────── */}
      <div className="h-12 bg-[#0d1424] border-b border-slate-800 flex items-center justify-between px-3 shrink-0 gap-2">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md text-xs font-bold text-slate-300 hover:text-white transition"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <div className="w-px h-5 bg-slate-700" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Code <span className="text-indigo-400">Playground</span>
          </span>
        </div>

        {/* Center — layout toggle */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          {(["split", "editor", "preview"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              title={l}
              className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition ${layout === l ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              {l === "split" ? "⬛⬛" : l === "editor" ? "◀◼" : "◼▶"}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition ${isSaved ? "text-emerald-400 bg-emerald-400/10 border border-emerald-500/20" : "text-amber-400 bg-amber-400/10 border border-amber-500/20"}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${isSaved ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}
            />
            {isSaved ? "Saved" : "Updating…"}
          </div>
          <button
            onClick={() => setShowConsole((s) => !s)}
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border transition ${showConsole ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-400" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}`}
          >
            Console{" "}
            {consoleLines.length > 0 && (
              <span className="ml-1 px-1 bg-rose-500 text-white rounded text-[9px]">
                {consoleLines.length}
              </span>
            )}
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 hover:border-rose-500/50 text-slate-400 rounded-md text-[10px] font-bold uppercase tracking-widest transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className={`flex-1 flex overflow-hidden ${isDragging ? "cursor-col-resize select-none pointer-events-none" : ""}`}
      >
        {/* Editor pane */}
        {layout !== "preview" && (
          <div
            className={`flex flex-col overflow-hidden border-r border-slate-800 ${layout === "editor" ? "w-full" : ""}`}
            style={{ width: layout === "split" ? `${splitRatio}%` : undefined }}
          >
            {/* File tabs */}
            <div className="flex items-center bg-[#0d1424] border-b border-slate-800 shrink-0 pointer-events-auto">
              {TAB_CONFIG.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-r border-slate-800 transition relative ${
                    activeTab === tab.id
                      ? "bg-[#090e1a] text-white"
                      : "bg-[#0d1424] text-slate-500 hover:text-slate-300 hover:bg-slate-800/40"
                  }`}
                >
                  {activeTab === tab.id && (
                    <span className="absolute top-0 inset-x-0 h-0.5 bg-indigo-500 rounded-b" />
                  )}
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
              {/* Breadcrumb */}
              <div className="ml-auto px-4 text-[10px] text-slate-600 font-mono">
                {TAB_CONFIG.find((t) => t.id === activeTab)?.lang}
              </div>
            </div>

            {/* Monaco editors — one per tab, keep all mounted for state preservation */}
            <div className="flex-1 relative overflow-hidden pointer-events-auto">
              {TAB_CONFIG.map((tab) => (
                <div
                  key={tab.id}
                  className={`absolute inset-0 ${activeTab === tab.id ? "visible" : "invisible pointer-events-none"}`}
                >
                  <Editor
                    height="100%"
                    language={tab.lang}
                    value={getTabValue(tab.id)}
                    onChange={(val) => setTabValue(tab.id, val ?? "")}
                    theme="futurelab-dark"
                    beforeMount={defineMonacoTheme}
                    options={{
                      fontSize: 14,
                      fontFamily:
                        "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
                      fontLigatures: true,
                      lineNumbers: "on",
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      tabSize: 2,
                      renderWhitespace: "selection",
                      smoothScrolling: true,
                      cursorBlinking: "phase",
                      cursorSmoothCaretAnimation: "on",
                      bracketPairColorization: { enabled: true },
                      formatOnPaste: true,
                      formatOnType: true,
                      autoClosingBrackets: "always",
                      autoClosingQuotes: "always",
                      suggest: { showKeywords: true },
                      quickSuggestions: true,
                      padding: { top: 16, bottom: 16 },
                      overviewRulerBorder: false,
                      hideCursorInOverviewRuler: true,
                      scrollbar: {
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                      },
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Console */}
            {showConsole && (
              <div className="h-36 border-t border-slate-800 bg-[#070b14] flex flex-col shrink-0 pointer-events-auto">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Console
                  </span>
                  <button
                    onClick={() => setConsoleLines([])}
                    className="text-[10px] text-slate-600 hover:text-slate-400 transition"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-0.5">
                  {consoleLines.length === 0 ? (
                    <span className="text-slate-700 italic">
                      No output yet. Try console.log() in the JS tab!
                    </span>
                  ) : (
                    consoleLines.map((l, i) => (
                      <div
                        key={i}
                        className={`px-2 py-0.5 rounded ${l.type === "error" ? "text-rose-400 bg-rose-500/10" : l.type === "warn" ? "text-amber-400" : "text-slate-300"}`}
                      >
                        <span
                          className={`mr-2 ${l.type === "error" ? "text-rose-500" : l.type === "warn" ? "text-amber-500" : "text-slate-600"}`}
                        >
                          {l.type === "error"
                            ? "✗"
                            : l.type === "warn"
                              ? "⚠"
                              : "›"}
                        </span>
                        {l.msg}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resizer */}
        {layout === "split" && (
          <div
            onMouseDown={() => setIsDragging(true)}
            className="w-1.5 bg-slate-900 hover:bg-indigo-500 cursor-col-resize transition-colors z-10 shrink-0 flex items-center justify-center group pointer-events-auto"
          >
            <div className="h-8 w-0.5 bg-slate-700 group-hover:bg-indigo-300 rounded-full transition-colors" />
          </div>
        )}

        {/* Preview pane */}
        {layout !== "editor" && (
          <div
            className={`flex flex-col overflow-hidden pointer-events-auto ${layout === "preview" ? "w-full" : ""}`}
            style={{
              width: layout === "split" ? `${100 - splitRatio}%` : undefined,
            }}
          >
            {/* Preview toolbar */}
            <div className="h-9 bg-[#0d1424] border-b border-slate-800 flex items-center px-3 gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 mx-3 px-3 py-0.5 bg-slate-800/50 border border-slate-700 rounded text-[10px] text-slate-500 font-mono">
                preview://index.html
              </div>
              <button
                onClick={refresh}
                title="Force refresh"
                className="p-1 text-slate-500 hover:text-slate-300 transition"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Live Preview
              </span>
            </div>
            <div className="flex-1 bg-white relative overflow-hidden">
              <iframe
                ref={iframeRef}
                srcDoc={srcDoc}
                title="Live Preview"
                sandbox="allow-scripts allow-modals"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Status bar ─────────────────────────────────────────────── */}
      <div className="h-6 bg-indigo-700 flex items-center px-3 gap-4 shrink-0">
        <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
          FutureLab Code Engine
        </span>
        <div className="w-px h-3 bg-indigo-500" />
        <span className="text-[10px] text-indigo-300 font-mono">
          HTML · CSS · JS
        </span>
        <div className="w-px h-3 bg-indigo-500" />
        <span className="text-[10px] text-indigo-300">
          Tailwind CSS ✓ Offline ✓
        </span>
        <div className="ml-auto text-[10px] text-indigo-300 font-mono uppercase tracking-widest">
          {TAB_CONFIG.find((t) => t.id === activeTab)?.label}
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
