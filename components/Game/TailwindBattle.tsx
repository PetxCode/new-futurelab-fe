import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import MonacoEditor from "@monaco-editor/react";

// ─── Monaco theme ─────────────────────────────────────────────────────
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

const MONACO_OPTIONS = {
  fontSize: 13,
  fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
  fontLigatures: true,
  lineNumbers: "on" as const,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  wordWrap: "on" as const,
  tabSize: 2,
  smoothScrolling: true,
  cursorBlinking: "phase" as const,
  cursorSmoothCaretAnimation: "on" as const,
  bracketPairColorization: { enabled: true },
  formatOnPaste: true,
  formatOnType: true,
  autoClosingBrackets: "always" as const,
  autoClosingQuotes: "always" as const,
  suggest: { showKeywords: true },
  quickSuggestions: true,
  padding: { top: 14, bottom: 14 },
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollbar: { verticalScrollbarSize: 5, horizontalScrollbarSize: 5 },
};
import {
  battleLevels,
  AVATAR_IMAGE_URL,
  PRODUCT_IMAGE_URL,
  BANNER_IMAGE_URL,
} from "./tailwindBattleData";
import MultiplayerTailwind from "./components/MultiplayerTailwind";

import { useTailwindScript } from "../../hooks/useTailwindScript";

function createBlobUrl(html: string): string {
  const blob = new Blob([html], { type: "text/html" });
  return URL.createObjectURL(blob);
}

// Map level ids that use images to their URLs
const LEVEL_IMAGE_MAP: Record<number, string> = {
  1: AVATAR_IMAGE_URL,
  4: AVATAR_IMAGE_URL,
  5: PRODUCT_IMAGE_URL,
  8: AVATAR_IMAGE_URL,
  15: BANNER_IMAGE_URL,
  19: AVATAR_IMAGE_URL,
  20: AVATAR_IMAGE_URL,
};

const PASS_THRESHOLD = 75;

type MobileTab = "info" | "editor" | "preview";

export default function TailwindBattle() {
  const { scriptTag: tailwindScriptTag } = useTailwindScript();
  const [levelIndex, setLevelIndex] = useState(() => {
    const saved = localStorage.getItem("tailwind-battle-level");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [code, setCode] = useState("");
  const [score, setScore] = useState({
    position: 0,
    size: 0,
    styles: 0,
    total: 0,
  });
  const [runKey, setRunKey] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(
    "Write your HTML and Tailwind classes to match the target!",
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "target" | "mine">(
    "split",
  );
  const [unlockedLevels, setUnlockedLevels] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("tailwind-battle-unlocked");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return new Set(parsed);
      } catch (e) {}
    }
    return new Set([0]);
  });
  const [mobileTab, setMobileTab] = useState<MobileTab>("info");
  const [challengeMode, setChallengeMode] = useState<"idle" | "multiplayer">(
    "idle",
  );

  const currentLevel = battleLevels[levelIndex];
  const desktopTargetIframeRef = useRef<HTMLIFrameElement>(null);
  const desktopUserIframeRef = useRef<HTMLIFrameElement>(null);
  const mobileTargetIframeRef = useRef<HTMLIFrameElement>(null);
  const mobileUserIframeRef = useRef<HTMLIFrameElement>(null);

  // Check admin status from localStorage (same pattern as App.tsx)
  const isAdmin = (() => {
    try {
      const saved = localStorage.getItem("userData");
      if (!saved) return false;
      const data = JSON.parse(saved);
      return data?.isAdmin === true;
    } catch {
      return false;
    }
  })();

  useEffect(() => {
    localStorage.setItem("tailwind-battle-level", levelIndex.toString());
  }, [levelIndex]);

  useEffect(() => {
    localStorage.setItem(
      "tailwind-battle-unlocked",
      JSON.stringify(Array.from(unlockedLevels)),
    );
  }, [unlockedLevels]);

  // Load level initial code
  useEffect(() => {
    setCode(currentLevel.initialCode);
    setShowHint(false);
    setIsSuccess(false);
    setScore({ position: 0, size: 0, styles: 0, total: 0 });
    setFeedbackMsg("Write your HTML and Tailwind classes to match the target!");
    setRunKey((prev) => prev + 1);
  }, [levelIndex, currentLevel]);

  // Helper to generate the iframe document content
  const getHtmlDoc = useCallback(
    (html: string) =>
      `<!DOCTYPE html><html><head>${tailwindScriptTag}<style>body { margin: 0; padding: 0; overflow: hidden; height: 100vh; width: 100vw; background-color: #0f172a; color: #f8fafc; font-family: sans-serif; }</style></head><body>${html}</body></html>`,
    [tailwindScriptTag]
  );

  const [targetPreviewUrl, setTargetPreviewUrl] = useState("");
  const targetUrlRef = useRef<string>("");

  useEffect(() => {
    const htmlContent = getHtmlDoc(currentLevel.targetHtml);
    const newUrl = createBlobUrl(htmlContent);
    if (targetUrlRef.current) URL.revokeObjectURL(targetUrlRef.current);
    targetUrlRef.current = newUrl;
    setTargetPreviewUrl(newUrl);

    return () => {
      if (targetUrlRef.current) URL.revokeObjectURL(targetUrlRef.current);
    };
  }, [currentLevel.targetHtml, getHtmlDoc]);

  // ── User ("Yours") preview: debounced 150ms for fast but non-thrashing updates ──
  const [userPreviewUrl, setUserPreviewUrl] = useState("");
  const userUrlRef = useRef<string>("");
  const userDebounceRef = useRef<ReturnType<typeof setTimeout>>();

  const flushUserPreview = useCallback(() => {
    clearTimeout(userDebounceRef.current);
    const htmlContent = getHtmlDoc(code);
    const newUrl = createBlobUrl(htmlContent);
    if (userUrlRef.current) URL.revokeObjectURL(userUrlRef.current);
    userUrlRef.current = newUrl;
    setUserPreviewUrl(newUrl);
  }, [code, getHtmlDoc]);

  useEffect(() => {
    clearTimeout(userDebounceRef.current);
    userDebounceRef.current = setTimeout(() => {
      const htmlContent = getHtmlDoc(code);
      const newUrl = createBlobUrl(htmlContent);
      if (userUrlRef.current) URL.revokeObjectURL(userUrlRef.current);
      userUrlRef.current = newUrl;
      setUserPreviewUrl(newUrl);
    }, 150);
  }, [code, getHtmlDoc]);

  // Cleanup on unmount for user preview
  useEffect(() => {
    return () => {
      if (userUrlRef.current) URL.revokeObjectURL(userUrlRef.current);
    };
  }, []);

  // Reset user preview immediately on level change
  useEffect(() => {
    const htmlContent = getHtmlDoc(currentLevel.initialCode);
    const newUrl = createBlobUrl(htmlContent);
    if (userUrlRef.current) URL.revokeObjectURL(userUrlRef.current);
    userUrlRef.current = newUrl;
    setUserPreviewUrl(newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIndex]);

  // Validate on code change (600ms — kept independent of preview debounce)
  useEffect(() => {
    const timer = setTimeout(validateSolution, 600);
    return () => clearTimeout(timer);
  }, [code, runKey, viewMode, mobileTab]);

  const validateSolution = () => {
    try {
      // Find the currently visible iframes (desktop or mobile)
      const isMobileTargetVisible =
        (mobileTargetIframeRef.current?.getBoundingClientRect().width || 0) > 0;
      const targetIframe = isMobileTargetVisible
        ? mobileTargetIframeRef.current
        : desktopTargetIframeRef.current;

      const isMobileUserVisible =
        (mobileUserIframeRef.current?.getBoundingClientRect().width || 0) > 0;
      const userIframe = isMobileUserVisible
        ? mobileUserIframeRef.current
        : desktopUserIframeRef.current;
      if (!targetIframe || !userIframe) return;

      const targetDoc =
        targetIframe.contentDocument || targetIframe.contentWindow?.document;
      const userDoc =
        userIframe.contentDocument || userIframe.contentWindow?.document;
      if (!targetDoc || !userDoc) return;

      const targetEl = targetDoc.querySelector(currentLevel.targetSelector);
      const userEl =
        userDoc.querySelector(currentLevel.targetSelector) ||
        userDoc.querySelector('[id^="target"]') ||
        userDoc.querySelector(".rounded-full") ||
        userDoc.querySelector(".absolute") ||
        (userDoc.body?.firstElementChild?.firstElementChild ?? null);

      if (!targetEl || !userEl) {
        setScore({ position: 0, size: 0, styles: 0, total: 0 });
        setFeedbackMsg(
          "Add your target element wrapper containing the classes!",
        );
        return;
      }

      const targetRect = targetEl.getBoundingClientRect();
      const userRect = userEl.getBoundingClientRect();

      const positionScore = Math.max(
        0,
        Math.round(
          100 -
            (Math.abs(targetRect.left - userRect.left) +
              Math.abs(targetRect.top - userRect.top)) *
              2,
        ),
      );
      const sizeScore = Math.max(
        0,
        Math.round(
          100 -
            (Math.abs(targetRect.width - userRect.width) +
              Math.abs(targetRect.height - userRect.height)) *
              2.5,
        ),
      );

      const targetStyle =
        targetDoc.defaultView?.getComputedStyle(targetEl) ?? null;
      const userStyle = userDoc.defaultView?.getComputedStyle(userEl) ?? null;

      let styleDiff = 0;
      if (targetStyle && userStyle) {
        if (targetStyle.borderRadius !== userStyle.borderRadius)
          styleDiff += 25;
        if (
          targetStyle.backgroundColor !== userStyle.backgroundColor &&
          targetStyle.backgroundImage !== userStyle.backgroundImage
        )
          styleDiff += 25;
        if (targetStyle.borderWidth !== userStyle.borderWidth) styleDiff += 25;
        if (targetStyle.boxShadow !== userStyle.boxShadow) styleDiff += 25;
      } else {
        styleDiff = 100;
      }
      const stylesScore = Math.max(0, 100 - styleDiff);

      const totalScore = Math.round(
        positionScore * 0.4 + sizeScore * 0.3 + stylesScore * 0.3,
      );

      setScore({
        position: positionScore,
        size: sizeScore,
        styles: stylesScore,
        total: totalScore,
      });

      if (totalScore >= PASS_THRESHOLD) {
        setIsSuccess(true);
        setUnlockedLevels((prev) => {
          const next = new Set(prev);
          if (levelIndex + 1 < battleLevels.length) next.add(levelIndex + 1);
          return next;
        });

        if (totalScore >= 95) {
          setFeedbackMsg(
            "🎉 Brilliant! Perfect layout match! Ready for the next level.",
          );
        } else {
          setFeedbackMsg(
            `✅ Level passed with ${totalScore}%! You can proceed or keep polishing.`,
          );
        }
      } else if (totalScore > 40) {
        setFeedbackMsg(
          `🎨 Score: ${totalScore}%. You need ${PASS_THRESHOLD}% to unlock the next level.`,
        );
      } else {
        setFeedbackMsg(
          "Write your HTML and Tailwind classes to match the target!",
        );
      }
    } catch (err) {
      console.warn("Validation warning:", err);
    }
  };

  const canGoNext = isAdmin || unlockedLevels.has(levelIndex + 1);
  const canGoPrev = isAdmin || unlockedLevels.has(levelIndex - 1);

  const handleNextLevel = () => {
    if (levelIndex < battleLevels.length - 1 && (isAdmin || canGoNext)) {
      setLevelIndex((prev) => prev + 1);
    }
  };

  const handlePrevLevel = () => {
    if (levelIndex > 0 && (isAdmin || canGoPrev)) {
      setLevelIndex((prev) => prev - 1);
    }
  };

  const levelImageUrl = LEVEL_IMAGE_MAP[currentLevel.id];

  // ─── Shared Sub-components ───

  const renderScoreBar = (label: string, value: number, color: string) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-white">{value}%</span>
      </div>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  const renderLevelNavButtons = () => (
    <div className="flex gap-2">
      <button
        onClick={handlePrevLevel}
        disabled={levelIndex === 0 || (!isAdmin && !canGoPrev)}
        className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 rounded-lg text-xs font-bold transition"
      >
        ← Prev
      </button>
      <button
        onClick={handleNextLevel}
        disabled={
          levelIndex === battleLevels.length - 1 || (!isAdmin && !canGoNext)
        }
        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${
          canGoNext || isAdmin
            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/20"
            : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
        }`}
      >
        {canGoNext || isAdmin ? "Next →" : `🔒 ${PASS_THRESHOLD}%`}
      </button>
    </div>
  );

  const renderHintPanel = () => (
    <>
      <button
        onClick={() => setShowHint(!showHint)}
        className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-bold transition"
      >
        {showHint ? "Hide Hint" : "Reveal Hint"}
      </button>
      {showHint && (
        <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700 text-xs text-indigo-300 space-y-2">
          <strong className="text-white">Key classes:</strong>
          {levelImageUrl && (
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                Image URL
              </p>
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 break-all">
                <a
                  href={levelImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-100 underline font-mono text-[10px] leading-relaxed"
                >
                  {levelImageUrl}
                </a>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {currentLevel.hints.map((hint) => (
              <code
                key={hint}
                className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[10px] text-white"
              >
                {hint}
              </code>
            ))}
          </div>
        </div>
      )}
    </>
  );

  // ─── Mobile Tab Bar ───

  const renderMobileTabBar = () => (
    <div className="lg:hidden flex bg-[#111827] border-b border-slate-800 sticky top-0 z-20">
      {[
        { key: "info" as MobileTab, label: "📋 Info" },
        { key: "editor" as MobileTab, label: "✏️ Code" },
        { key: "preview" as MobileTab, label: "👁️ Preview" },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setMobileTab(tab.key)}
          className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
            mobileTab === tab.key
              ? "text-indigo-400 border-indigo-500 bg-indigo-500/5"
              : "text-slate-400 border-transparent hover:text-slate-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  // ─── Info Panel ───

  const renderInfoPanel = (className: string = "") => (
    <div
      className={`bg-[#111827] flex flex-col justify-between p-4 lg:p-6 overflow-y-auto ${className}`}
    >
      <div className="space-y-4">
        {/* Header badges */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 text-[10px] uppercase font-black tracking-widest bg-indigo-500/20 text-indigo-400 rounded-md border border-indigo-500/30">
            Level {currentLevel.id}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChallengeMode("multiplayer")}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-[10px] font-bold text-white transition-transform transform hover:scale-105 shadow-md h-fit"
              title="Multiplayer Race"
            >
              🌐 <span>Multiplayer</span>
            </button>
            {/* {isAdmin && (
              <span className="px-2 py-0.5 text-[9px] uppercase font-black tracking-widest bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                Admin
              </span>
            )} */}
            <span
              className={`px-2.5 py-1 text-[10px] uppercase font-black tracking-widest rounded-md border ${
                currentLevel.difficulty === "Easy"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : currentLevel.difficulty === "Medium"
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "bg-rose-500/20 text-rose-400 border-rose-500/30"
              }`}
            >
              {currentLevel.difficulty}
            </span>
          </div>
        </div>

        {/* Title + Description */}
        <div>
          <h2 className="text-lg lg:text-xl font-black text-white mb-1 leading-tight tracking-tight">
            {currentLevel.title}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {currentLevel.description}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-slate-900/50 rounded-xl p-3 lg:p-4 border border-slate-800/50">
          <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-1.5">
            Instructions
          </h4>
          <p className="text-xs leading-relaxed text-slate-300">
            {currentLevel.instructions}
          </p>
        </div>

        {/* Accuracy Dashboard */}
        <div className="bg-slate-900/50 rounded-xl p-3 lg:p-4 border border-slate-800/50 space-y-2.5">
          <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400">
            Match Accuracy
          </h4>
          {renderScoreBar("Position", score.position, "bg-indigo-500")}
          {renderScoreBar("Size", score.size, "bg-sky-500")}
          {renderScoreBar("Style", score.styles, "bg-emerald-500")}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs font-black text-slate-300">Total</span>
            <span
              className={`text-lg font-black ${score.total >= PASS_THRESHOLD ? "text-emerald-400" : score.total > 40 ? "text-amber-400" : "text-rose-400"}`}
            >
              {score.total}%
            </span>
          </div>
          {!isAdmin && (
            <div className="text-[10px] text-slate-500 text-center">
              Pass: {PASS_THRESHOLD}% to unlock next level
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mt-4">
        {renderLevelNavButtons()}
        {renderHintPanel()}
      </div>
    </div>
  );

  // ─── Editor Panel ───

  const renderEditorPanel = (className: string = "") => (
    <div className={`bg-[#0d1117] flex flex-col ${className}`}>
      {/* Editor header */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-2.5 lg:py-3 bg-[#111827] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400">editor.html</span>
        </div>
        <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
          HTML & Tailwind
        </span>
      </div>

      {/* Monaco Editor body */}
      <div className="flex-1 overflow-hidden min-h-0">
        <MonacoEditor
          height="100%"
          language="html"
          value={code}
          onChange={(val) => setCode(val ?? "")}
          theme="futurelab-dark"
          beforeMount={defineMonacoTheme}
          options={MONACO_OPTIONS}
        />
      </div>

      {/* Feedback + Run */}
      <div className="p-3 lg:p-4 bg-[#0a0d16] border-t border-slate-800 flex items-center justify-between gap-3">
        <span
          className={`text-[11px] lg:text-xs font-medium flex-1 min-w-0 truncate ${isSuccess ? "text-emerald-400" : "text-slate-400"}`}
        >
          {feedbackMsg}
        </span>
        <button
          onClick={() => {
            flushUserPreview();          // instant preview update
            setRunKey((prev) => prev + 1); // re-validate
          }}
          className="px-3 lg:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-indigo-900/20 active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>▶</span> Run
        </button>
      </div>

      {/* Mobile-only: mini score + nav */}
      <div className="lg:hidden p-3 bg-[#111827] border-t border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-400 font-bold">Score:</span>
            <span
              className={`text-sm font-black ${score.total >= PASS_THRESHOLD ? "text-emerald-400" : score.total > 40 ? "text-amber-400" : "text-rose-400"}`}
            >
              {score.total}%
            </span>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={handlePrevLevel}
              disabled={levelIndex === 0 || (!isAdmin && !canGoPrev)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-md text-[10px] font-bold transition"
            >
              ←
            </button>
            <button
              onClick={handleNextLevel}
              disabled={
                levelIndex === battleLevels.length - 1 ||
                (!isAdmin && !canGoNext)
              }
              className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold transition ${
                canGoNext || isAdmin
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-500 opacity-50"
              }`}
            >
              {canGoNext || isAdmin ? "→" : "🔒"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Preview Panel ───

  const renderPreviewPanel = (
    className: string = "",
    isMobile: boolean = false,
  ) => (
    <div className={`bg-[#0f172a] flex flex-col ${className}`}>
      {/* View mode tabs */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-2.5 lg:py-3 bg-[#111827] border-b border-slate-800">
        <span className="text-xs font-bold text-slate-300">Live Preview</span>
        <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          {(["split", "target", "mine"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-2 lg:px-2.5 py-1 text-[10px] font-bold rounded-md transition capitalize ${
                viewMode === mode
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Preview iframes */}
      <div className="flex-1 p-3 lg:p-6 flex flex-col gap-3 lg:gap-4 overflow-y-auto min-h-0">
        {(viewMode === "split" || viewMode === "target") && (
          <div className="flex-1 flex flex-col min-h-[140px] lg:min-h-[160px]">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">
              🎯 Target
            </span>
            <div className="relative flex-1 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
              {/* key=levelIndex: reloads ONLY on level change, not on code edits */}
              <iframe
                key={`target-${levelIndex}-${isMobile ? "m" : "d"}`}
                ref={isMobile ? mobileTargetIframeRef : desktopTargetIframeRef}
                src={targetPreviewUrl}
                title="Target Preview"
                className="w-full h-full border-none pointer-events-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        )}
        {(viewMode === "split" || viewMode === "mine") && (
          <div className="flex-1 flex flex-col min-h-[140px] lg:min-h-[160px]">
            <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1.5">
              💻 Yours
            </span>
            <div className="relative flex-1 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
              {/* userSrcDoc: debounced 150ms — fast updates without thrashing */}
              <iframe
                ref={isMobile ? mobileUserIframeRef : desktopUserIframeRef}
                src={userPreviewUrl}
                title="User Preview"
                className="w-full h-full border-none pointer-events-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile-only: quick score */}
      <div className="lg:hidden p-3 bg-[#111827] border-t border-slate-800">
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] font-medium truncate flex-1 ${isSuccess ? "text-emerald-400" : "text-slate-400"}`}
          >
            {feedbackMsg}
          </span>
          <span
            className={`text-sm font-black ml-3 ${score.total >= PASS_THRESHOLD ? "text-emerald-400" : "text-rose-400"}`}
          >
            {score.total}%
          </span>
        </div>
      </div>
    </div>
  );

  // ─── Render ───

  if (challengeMode === "multiplayer") {
    return <MultiplayerTailwind onExit={() => setChallengeMode("idle")} />;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] bg-[#0b0f19] text-slate-200 rounded-none lg:rounded-2xl overflow-hidden border-0 lg:border border-slate-800/80 shadow-2xl font-inter">
      {/* Mobile tab bar */}
      {renderMobileTabBar()}

      {/* ── Desktop: 3-column layout ── */}
      {/* Left info panel – desktop only */}
      {renderInfoPanel("hidden lg:flex w-80 border-r border-slate-800/80")}

      {/* Center editor – desktop only */}
      {renderEditorPanel("hidden lg:flex flex-1 border-r border-slate-800/80")}

      {/* Right preview – desktop only */}
      {renderPreviewPanel("hidden lg:flex w-96", false)}

      {/* ── Mobile: tab-switched single panel ── */}
      <div className="lg:hidden flex-1 flex flex-col min-h-0 overflow-hidden">
        {mobileTab === "info" && renderInfoPanel("flex-1")}
        {mobileTab === "editor" && renderEditorPanel("flex-1")}
        {mobileTab === "preview" && renderPreviewPanel("flex-1", true)}
      </div>
    </div>
  );
}
