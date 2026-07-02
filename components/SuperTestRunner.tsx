import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import html2canvas from "html2canvas";
import pixelmatch from "pixelmatch";
import { API_BASE_URL } from "../App";
import { useTailwindScript } from "../hooks/useTailwindScript";

function createBlobUrl(html: string): string {
  const blob = new Blob([html], { type: "text/html" });
  return URL.createObjectURL(blob);
}

interface SuperTestQuestion {
  _id?: string;
  type?: "ui" | "cbt";
  // UI fields
  targetHtml: string;
  targetCss: string;
  targetImageUrl?: string;
  // CBT fields
  questionText?: string;
  options?: { label: string; text: string }[];
  correctOption?: string;
}

interface SuperTestRunnerProps {
  testId: string;
  studentId?: string;
  fullName: string;
  classNameProp: string;
  schoolName: string;
  questions: SuperTestQuestion[];
  durationMinutes: number;
  onBack: () => void;
  onSubmit: (responses: any[]) => void;
}

const buildHtmlDoc = (html: string, css: string, tailwindTag: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  ${tailwindTag}
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; width: 400px; height: 300px; overflow: hidden; background: white; }
    ${css}
  </style>
</head>
<body>
${html}
</body>
</html>`;
};

const SuperTestRunner: React.FC<SuperTestRunnerProps> = ({
  testId,
  studentId,
  fullName,
  classNameProp,
  schoolName,
  questions,
  durationMinutes,
  onBack,
  onSubmit,
}) => {
  const { scriptTag: tailwindScriptTag } = useTailwindScript();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [checkLoading, setCheckLoading] = useState(true);

  // Unique identifier for local storage draft and timer based on name and class
  const userSlug = `${fullName.trim().toLowerCase().replace(/[^a-z0-9]/g, "_")}_${classNameProp.trim().toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
  const draftKey = `supertest_draft_${testId}_${userSlug}`;
  const endTimerKey = `supertest_endtimer_${testId}_${userSlug}`;

  // Initialize responses from LocalStorage or Default
  const [responses, setResponses] = useState(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved drafts");
    }
    return questions.map((q) => {
      if (q.type === "cbt") {
        return { type: "cbt", selectedOption: "", score: 0 };
      }
      return { type: "ui", html: '<div class="w-32 h-32 bg-blue-500"></div>', css: "/* Custom CSS here */\nbody { margin: 0; }", score: 0 };
    });
  });

  const currentResponse = responses[currentQIndex];
  const currentQuestion = questions[currentQIndex];

  const [activeTab, setActiveTab] = useState<"html" | "css">("html");
  const [studentPreviewUrl, setStudentPreviewUrl] = useState("");
  const studentUrlRef = useRef<string>("");
  const [targetPreviewUrl, setTargetPreviewUrl] = useState("");
  const targetUrlRef = useRef<string>("");
  const [isChecking, setIsChecking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  const targetIframeRef = useRef<HTMLIFrameElement>(null);
  const studentIframeRef = useRef<HTMLIFrameElement>(null);
  const targetCanvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);

  // Check if already taken based on details
  useEffect(() => {
    const checkTaken = async () => {
      if (!fullName || !classNameProp) {
        setCheckLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/super-test/check-details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            testId,
            fullName,
            className: classNameProp,
            schoolName,
          }),
        });
        const data = await res.json();
        if (data.success && data.exists) {
          setIsCompleted(true);
        }
      } catch (err) {
        console.error("Failed to check test status", err);
      } finally {
        setCheckLoading(false);
      }
    };
    checkTaken();
  }, [testId, fullName, classNameProp, schoolName]);

  // Timer Initialization & Logic
  useEffect(() => {
    if (isCompleted || checkLoading) return;

    let endTime = parseInt(localStorage.getItem(endTimerKey) || "0", 10);
    const now = Date.now();

    if (!endTime || endTime <= now - 10000) { // If no timer or already expired completely
      endTime = now + durationMinutes * 60 * 1000;
      localStorage.setItem(endTimerKey, endTime.toString());
    }

    const calculateTimeLeft = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        handleFinalSubmit(); // Auto submit
      }
    };

    calculateTimeLeft(); // Initial tick
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [isCompleted, checkLoading, durationMinutes]);

  // Target preview URL
  useEffect(() => {
    if (!currentQuestion) return;
    const htmlContent = buildHtmlDoc(currentQuestion.targetHtml, currentQuestion.targetCss, tailwindScriptTag);
    const newUrl = createBlobUrl(htmlContent);
    if (targetUrlRef.current) URL.revokeObjectURL(targetUrlRef.current);
    targetUrlRef.current = newUrl;
    setTargetPreviewUrl(newUrl);
  }, [currentQuestion]);

  // Debounce student preview
  useEffect(() => {
    if (!currentResponse) return;
    const timer = setTimeout(() => {
      const htmlContent = buildHtmlDoc(currentResponse.html, currentResponse.css, tailwindScriptTag);
      const newUrl = createBlobUrl(htmlContent);
      if (studentUrlRef.current) URL.revokeObjectURL(studentUrlRef.current);
      studentUrlRef.current = newUrl;
      setStudentPreviewUrl(newUrl);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentResponse, tailwindScriptTag]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (targetUrlRef.current) URL.revokeObjectURL(targetUrlRef.current);
      if (studentUrlRef.current) URL.revokeObjectURL(studentUrlRef.current);
    };
  }, []);

  const updateResponse = (field: "html" | "css", value: string) => {
    setResponses((prev: any) => {
      const newResp = [...prev];
      newResp[currentQIndex] = { ...newResp[currentQIndex], [field]: value };
      localStorage.setItem(draftKey, JSON.stringify(newResp));
      return newResp;
    });
  };

  const updateCbtResponse = (selectedOption: string) => {
    setResponses((prev: any) => {
      const newResp = [...prev];
      newResp[currentQIndex] = { ...newResp[currentQIndex], selectedOption };
      localStorage.setItem(draftKey, JSON.stringify(newResp));
      return newResp;
    });
  };

  const calculateScore = async () => {
    if (
      !targetIframeRef.current ||
      !studentIframeRef.current ||
      !targetCanvasRef.current ||
      !outputCanvasRef.current
    )
      return;
    setIsChecking(true);
    try {
      const targetBody = targetIframeRef.current.contentDocument?.body;
      const studentBody = studentIframeRef.current.contentDocument?.body;
      if (!targetBody || !studentBody) return;

      const [targetCanvas, studentCanvas] = await Promise.all([
        html2canvas(targetBody, { width: 400, height: 300, useCORS: true }),
        html2canvas(studentBody, { width: 400, height: 300, useCORS: true }),
      ]);

      const targetCtx = targetCanvas.getContext("2d");
      const studentCtx = studentCanvas.getContext("2d");
      const outputCtx = outputCanvasRef.current.getContext("2d");
      if (!targetCtx || !studentCtx || !outputCtx) return;

      const targetData = targetCtx.getImageData(0, 0, 400, 300);
      const studentData = studentCtx.getImageData(0, 0, 400, 300);
      const outputData = outputCtx.createImageData(400, 300);

      const numDiffPixels = pixelmatch(
        studentData.data,
        targetData.data,
        outputData.data,
        400,
        300,
        { threshold: 0.15 }
      );

      const totalPixels = 400 * 300;
      const matchPercentage = ((totalPixels - numDiffPixels) / totalPixels) * 100;
      const roundedScore = Math.round(matchPercentage);

      setResponses((prev: any) => {
        const newResp = [...prev];
        newResp[currentQIndex] = { ...newResp[currentQIndex], score: roundedScore };
        // Save score persistence too
        localStorage.setItem(draftKey, JSON.stringify(newResp));
        return newResp;
      });
    } catch (err) {
      console.error("Error calculating score:", err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleFinalSubmit = () => {
    localStorage.removeItem(draftKey);
    localStorage.removeItem(endTimerKey);

    const formattedResponses = responses.map((r: any, i: number) => {
      const q = questions[i];
      const isCbt = q?.type === "cbt";
      const cbtScore = isCbt
        ? (r.selectedOption && r.selectedOption === q.correctOption ? 100 : 0)
        : r.score;
      return {
        questionIndex: i,
        questionType: isCbt ? "cbt" : "ui",
        submittedHtml: r.html || "",
        submittedCss: r.css || "",
        selectedOption: r.selectedOption || "",
        score: cbtScore,
      };
    });
    onSubmit(formattedResponses);
  };

  const quitAndClear = () => {
    // Optionally we leave the draft if they quit? Yes, leave it so they can resume if there's time.
    onBack();
  };

  if (checkLoading) {
    return <div className="flex items-center justify-center h-full text-white">Loading Test...</div>;
  }

  if (isCompleted) {
    return (
      <div className="flex flex-col h-[calc(100vh-2rem)] bg-[#090e1a] text-white rounded-xl overflow-hidden shadow-2xl border border-slate-800 items-center justify-center p-8 text-center">
        <span className="text-6xl mb-4">🔒</span>
        <h2 className="text-3xl font-black mb-2 text-rose-500">Test Completed</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          You have already completed this Super Test. You cannot retake it unless cleared by an instructor or school administrator.
        </p>
        <button onClick={onBack} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold">
          Return to Hub
        </button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-2rem)] text-slate-400">
        No questions provided.
      </div>
    );
  }

  const scoreColor =
    currentResponse?.score >= 80
      ? "text-emerald-400"
      : currentResponse?.score >= 50
      ? "text-amber-400"
      : "text-rose-400";

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-[#090e1a] text-white rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      {/* ── Header ── */}
      <div className="flex justify-between items-center bg-[#0d1424] px-4 py-3 border-b border-slate-800 shrink-0">
        <button
          onClick={quitAndClear}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-bold text-slate-300 hover:text-white transition"
        >
          ← Quit
        </button>

        {/* Timer */}
        <div className="flex flex-col items-center">
          <span className={`text-xl font-black font-mono ${timeLeft < 60 ? "text-rose-500 animate-pulse" : "text-white"}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Time Remaining</span>
        </div>

        {/* Score / Status bar for current question */}
        {currentQuestion?.type === "cbt" ? (
          <div className="flex flex-col items-center gap-1">
            <span className={`text-sm font-black ${currentResponse?.selectedOption ? "text-emerald-400" : "text-slate-400"}`}>
              Q{currentQIndex + 1}: {currentResponse?.selectedOption ? `Option ${currentResponse.selectedOption} Selected ✓` : "No option selected"}
            </span>
            <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${currentResponse?.selectedOption ? "bg-emerald-400" : "bg-slate-600"}`}
                style={{ width: currentResponse?.selectedOption ? "100%" : "0%" }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className={`text-sm font-black ${scoreColor}`}>
              Q{currentQIndex + 1} Match: {currentResponse?.score || 0}%
            </span>
            <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  currentResponse?.score >= 80
                    ? "bg-emerald-400"
                    : currentResponse?.score >= 50
                    ? "bg-amber-400"
                    : "bg-rose-400"
                }`}
                style={{ width: `${currentResponse?.score || 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {currentQuestion?.type !== "cbt" && (
            <button
              onClick={calculateScore}
              disabled={isChecking}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg font-bold text-sm transition"
            >
              {isChecking ? "Checking…" : "⚡ Check Q"}
            </button>
          )}
          <button
            onClick={handleFinalSubmit}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold text-sm transition"
          >
            ✓ Final Submit
          </button>
        </div>
      </div>

      {/* Question Navigation */}
      {questions.length > 1 && (
        <div className="flex bg-[#0b101a] border-b border-slate-800 shrink-0 p-2 gap-2 justify-center flex-wrap">
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQIndex(idx)}
              className={`px-4 py-1.5 rounded text-sm font-bold transition flex items-center gap-1.5 ${
                currentQIndex === idx
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {q.type === "cbt" ? "📝" : "🎨"} Q{idx + 1}
            </button>
          ))}
        </div>
      )}

      {currentQuestion?.type === "cbt" ? (
        /* ── CBT Multiple Choice Card ── */
        <div className="flex-1 overflow-y-auto flex items-start justify-center p-8 bg-[#090e1a]">
          <div className="w-full max-w-2xl space-y-6">
            {/* Question Text */}
            <div className="bg-[#0d1424] border border-slate-700 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-black flex items-center justify-center">
                  {currentQIndex + 1}
                </span>
                <p className="text-lg font-semibold text-slate-100 leading-relaxed flex-1">
                  {currentQuestion.questionText || "No question text provided."}
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {(currentQuestion.options || []).map((opt) => {
                const isSelected = currentResponse?.selectedOption === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => updateCbtResponse(opt.label)}
                    className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all duration-200 group ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10"
                        : "bg-[#0d1424] border-slate-700 hover:border-slate-500 hover:bg-slate-800/40"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 font-black text-sm flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-indigo-500 border-indigo-400 text-white"
                          : "border-slate-600 text-slate-400 group-hover:border-slate-400"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className={`text-base font-medium leading-snug ${isSelected ? "text-white" : "text-slate-300"}`}>
                      {opt.text}
                    </span>
                    {isSelected && (
                      <span className="ml-auto text-indigo-400 font-black text-lg">✓</span>
                    )}
                  </button>
                );
              })}
              {(!currentQuestion.options || currentQuestion.options.length === 0) && (
                <p className="text-center text-slate-500 py-8 italic">No options configured for this question.</p>
              )}
            </div>

            {/* Hint */}
            <p className="text-center text-xs text-slate-600 italic">
              Select one option. Your choice is auto-saved. Navigate between questions using the tabs above.
            </p>
          </div>
        </div>
      ) : (
        /* ── UI Detective Coding Pane ── */
        <div className="flex flex-1 overflow-hidden">
          {/* ── Editor Pane ── */}
          <div className="w-1/2 flex flex-col border-r border-slate-800">
            {/* Tabs */}
            <div className="flex bg-[#0d1424] border-b border-slate-800 shrink-0">
              {(["html", "css"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest transition relative ${
                    activeTab === tab
                      ? "bg-[#090e1a] text-white"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {activeTab === tab && (
                    <span className="absolute top-0 inset-x-0 h-0.5 bg-indigo-500 rounded-b" />
                  )}
                  {tab === "html" ? "🟧 HTML" : "🟦 CSS"}
                </button>
              ))}
            </div>
            {/* Monaco */}
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={activeTab}
                value={activeTab === "html" ? currentResponse?.html : currentResponse?.css}
                onChange={(val) => updateResponse(activeTab, val || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                  fontLigatures: true,
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  padding: { top: 12, bottom: 12 },
                }}
              />
            </div>
          </div>

          {/* ── Preview Pane ── */}
          <div className="w-1/2 flex flex-col bg-slate-900 overflow-y-auto">
            {/* Target */}
            <div className="p-4 border-b border-slate-800 flex justify-center items-center flex-col">
              <div className="flex w-full items-center gap-2 mb-3 max-w-[400px]">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Target UI (Q{currentQIndex + 1})
                </h3>
                <span className="ml-auto text-[10px] text-slate-600 font-mono">
                  Match this exactly
                </span>
              </div>
              <div className="w-[400px] h-[300px] shrink-0 rounded-lg border border-slate-700 overflow-hidden shadow-lg bg-white">
                <iframe
                  ref={targetIframeRef}
                  src={targetPreviewUrl}
                  title="Target UI"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            {/* Student output */}
            <div className="p-4 flex justify-center items-center flex-col">
              <div className="flex w-full items-center gap-2 mb-3 max-w-[400px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Your Live Output
                </h3>
              </div>
              <div className="w-[400px] h-[300px] shrink-0 rounded-lg border border-slate-700 overflow-hidden shadow-lg bg-white relative">
                <iframe
                  ref={studentIframeRef}
                  src={studentPreviewUrl}
                  title="Live Preview"
                  className="w-full h-full border-none pointer-events-none"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            {/* Hidden canvases for pixelmatch diff */}
            <canvas ref={targetCanvasRef} style={{ display: "none" }} width={400} height={300} />
            <canvas ref={outputCanvasRef} style={{ display: "none" }} width={400} height={300} />

            {/* Reference Image URL */}
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-2 max-w-[400px] mx-auto">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Reference Image
                </h3>
              </div>
              <div className="max-w-[400px] mx-auto w-full">
              {currentQuestion?.targetImageUrl ? (
                <div className="space-y-2">
                  <img
                    src={currentQuestion.targetImageUrl}
                    alt="Reference"
                    className="w-full rounded-lg border border-slate-700 shadow"
                  />
                  <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2 border border-slate-700">
                    <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-xs text-slate-400 font-mono truncate flex-1">{currentQuestion.targetImageUrl}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(currentQuestion.targetImageUrl!)}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold shrink-0 transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-600 italic">No reference image provided for this challenge.</p>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperTestRunner;
