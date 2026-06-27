import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { API_BASE_URL } from "../App";
import { useTailwindScript } from "../hooks/useTailwindScript";

function createBlobUrl(html: string): string {
  const blob = new Blob([html], { type: "text/html" });
  return URL.createObjectURL(blob);
}

// ─── Monaco theme (matches CodePlayground) ─────────────────────────
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
  quickSuggestions: true,
  padding: { top: 10, bottom: 10 },
  overviewRulerBorder: false,
  scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 },
};

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

// Sub-component to safely manage Blob URLs for previews in a list
const LivePreviewIframe = ({ html, css, index, tailwindTag }: { html: string; css: string; index: number; tailwindTag: string }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!html && !css) {
      setUrl("");
      return;
    }
    const htmlContent = buildHtmlDoc(html, css, tailwindTag);
    const blobUrl = createBlobUrl(htmlContent);
    setUrl(blobUrl);

    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [html, css, tailwindTag]);

  if (!url) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
        <span className="text-4xl mb-2">👀</span>
        <p className="text-sm">Type HTML/CSS to preview</p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title={`Preview Q${index}`}
      className="w-full h-full border-none pointer-events-none"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};


interface SuperTestResult {
  _id: string;
  testId: { title: string };
  studentId: { fullName: string; email: string };
  totalScore: number;
  completedAt: string;
}

interface AdminSuperTestDashboardProps {
  schoolId: string;
}

const AdminSuperTestDashboard: React.FC<AdminSuperTestDashboardProps> = ({
  schoolId,
}) => {
  const { scriptTag: tailwindScriptTag } = useTailwindScript();
  const [results, setResults] = useState<SuperTestResult[]>([]);
  const [activeTests, setActiveTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestDuration, setNewTestDuration] = useState(10);
  const [newTestQuestions, setNewTestQuestions] = useState([
    { targetHtml: "", targetCss: "", targetImageUrl: "" },
  ]);

  const fetchDashboardData = async () => {
    try {
      const [resResults, resTests] = await Promise.all([
        fetch(`${API_BASE_URL}/api/super-test/results/${schoolId}`),
        fetch(`${API_BASE_URL}/api/super-test/school/${schoolId}`),
      ]);
      const dataResults = await resResults.json();
      const dataTests = await resTests.json();

      if (dataResults.success) {
        setResults(dataResults.data);
      }
      if (dataTests.success) {
        setActiveTests(dataTests.data);
      }
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [schoolId]);

  const handleClearResult = async (resultId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to clear this student's result? They will be able to retake the test.",
      )
    )
      return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/super-test/results/${resultId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to clear result");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddQuestion = () => {
    if (newTestQuestions.length >= 4) return;
    setNewTestQuestions([
      ...newTestQuestions,
      { targetHtml: "", targetCss: "", targetImageUrl: "" },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (newTestQuestions.length <= 1) return;
    setNewTestQuestions(newTestQuestions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...newTestQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setNewTestQuestions(updated);
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/super-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTestTitle,
          schoolId,
          durationMinutes: newTestDuration,
          questions: newTestQuestions,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Test created successfully! Students can now access it.");
        setIsModalOpen(false);
        fetchDashboardData();
        // Reset form
        setNewTestTitle("");
        setNewTestDuration(10);
        setNewTestQuestions([
          { targetHtml: "", targetCss: "", targetImageUrl: "" },
        ]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create test");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 min-h-screen relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Super Test Results
          </h1>
          <p className="text-sm text-slate-500">
            View and print student performance for your school.
          </p>
        </div>
        <div className="flex gap-4 print:hidden">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Test
          </button>
          <button
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print:shadow-none print:border-none print:bg-transparent">
          {/* Print Header */}
          <div className="hidden print:block mb-8 text-center">
            <h1 className="text-3xl font-bold text-black">
              Official Super Test Report
            </h1>
            <p className="text-gray-600">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Published Tests Table */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 px-8">
              Published Tests
            </h2>
            {activeTests.length === 0 ? (
              <div className="text-center py-12 px-8">
                <p className="text-slate-500">No tests published yet.</p>
              </div>
            ) : (
              <div className="mx-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm print:shadow-none print:border-none print:mx-0">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50 print:bg-transparent">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Test Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Questions
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider print:hidden">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {activeTests.map((t) => (
                      <tr
                        key={t._id}
                        className="hover:bg-slate-50 print:hover:bg-transparent"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                          {t.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {t.questions?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {t.durationMinutes} mins
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(t.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium print:hidden">
                          <button
                            onClick={async () => {
                              if (
                                !window.confirm(
                                  `Are you sure you want to delete "${t.title}" and ALL its results? This cannot be undone.`,
                                )
                              )
                                return;
                              try {
                                const res = await fetch(
                                  `${API_BASE_URL}/api/super-test/${t._id}`,
                                  { method: "DELETE" },
                                );
                                const data = await res.json();
                                if (data.success) fetchDashboardData();
                                else alert(data.message);
                              } catch (err) {
                                alert("Failed to delete test");
                              }
                            }}
                            className="text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded transition-colors"
                          >
                            Delete Test
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Results Table */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 px-8">
              Student Results
            </h2>
            {loading ? (
              <div className="p-8 text-center text-slate-500">
                Loading dashboard data...
              </div>
            ) : error ? (
              <div className="p-8 text-center text-rose-500">{error}</div>
            ) : results.length === 0 ? (
              <div className="text-center py-12 px-8">
                <span className="text-4xl mb-4 block">📊</span>
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  No Results Yet
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Once students complete your Super Tests, their performance and
                  scores will appear here.
                </p>
              </div>
            ) : (
              <div className="mx-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm print:shadow-none print:border-none print:mx-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 print:bg-transparent">
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Test Title
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Completed At
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider print:hidden">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {results.map((result) => (
                      <tr
                        key={result._id}
                        className="hover:bg-slate-50 print:hover:bg-transparent"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                          {result.studentId?.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {result.studentId?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {result.testId?.title || "Unknown Test"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.totalScore >= 80
                                ? "bg-emerald-100 text-emerald-800"
                                : result.totalScore >= 50
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                            } print:border print:border-gray-300 print:bg-transparent print:text-black`}
                          >
                            {result.totalScore}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(result.completedAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium print:hidden">
                          <button
                            onClick={() => handleClearResult(result._id)}
                            className="text-rose-600 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded transition-colors"
                          >
                            Clear & Retake
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Create Test Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 print:hidden overflow-y-auto">
            <div className="bg-[#090e1a] border border-slate-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col my-auto">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center shrink-0 bg-[#0d1424]">
                <h2 className="text-xl font-bold text-white">
                  Create New Super Test
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form
                onSubmit={handleCreateTest}
                className="flex-1 overflow-y-auto p-6 space-y-6 text-neutral-200 bg-[#090e1a]"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Test Title
                    </label>
                    <input
                      required
                      type="text"
                      value={newTestTitle}
                      onChange={(e) => setNewTestTitle(e.target.value)}
                      className="w-full bg-[#0d1424] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600"
                      placeholder="e.g., Weekly UI Challenge"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Duration (Minutes)
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      max="180"
                      value={newTestDuration}
                      onChange={(e) =>
                        setNewTestDuration(parseInt(e.target.value) || 10)
                      }
                      className="w-full bg-[#0d1424] border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <h3 className="text-lg font-semibold text-slate-200">
                      Questions ({newTestQuestions.length}/4)
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      disabled={newTestQuestions.length >= 4}
                      className="text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-all shadow-md"
                    >
                      + Add Question
                    </button>
                  </div>

                  {newTestQuestions.map((q, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#0d1424] border border-slate-700 rounded-xl space-y-4 relative shadow-xl"
                    >
                      {newTestQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(i)}
                          className="absolute top-3 right-3 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-2 py-1 rounded transition"
                        >
                          ✕ Remove
                        </button>
                      )}
                      <h4 className="font-bold text-slate-200 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                          {i + 1}
                        </span>{" "}
                        Question {i + 1}
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        {/* HTML Monaco Editor */}
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg">🟧</span>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Target HTML
                            </label>
                            <span className="ml-auto text-[10px] text-slate-600 font-mono">
                              html
                            </span>
                          </div>
                          <div
                            className="rounded-lg overflow-hidden border border-slate-700 shadow-lg"
                            style={{ height: 160 }}
                          >
                            <MonacoEditor
                              height="100%"
                              language="html"
                              value={q.targetHtml}
                              onChange={(val) =>
                                updateQuestion(i, "targetHtml", val ?? "")
                              }
                              theme="futurelab-dark"
                              beforeMount={defineMonacoTheme}
                              options={MONACO_OPTIONS}
                            />
                          </div>
                        </div>
                        {/* CSS Monaco Editor */}
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg">🟦</span>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Target CSS
                            </label>
                            <span className="ml-auto text-[10px] text-slate-600 font-mono">
                              css
                            </span>
                          </div>
                          <div
                            className="rounded-lg overflow-hidden border border-slate-700 shadow-lg"
                            style={{ height: 160 }}
                          >
                            <MonacoEditor
                              height="100%"
                              language="css"
                              value={q.targetCss}
                              onChange={(val) =>
                                updateQuestion(i, "targetCss", val ?? "")
                              }
                              theme="futurelab-dark"
                              beforeMount={defineMonacoTheme}
                              options={MONACO_OPTIONS}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 bg-[#0D1423]">
                          Reference Image URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={q.targetImageUrl}
                          onChange={(e) =>
                            updateQuestion(i, "targetImageUrl", e.target.value)
                          }
                          className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="https://example.com/reference.png"
                        />
                      </div>

                      {/* Live Preview */}
                      <div className="pt-2 border-t border-slate-700">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                          🖥 Live Target Preview
                        </label>
                        <div className="w-[400px] h-[300px] rounded-lg border border-slate-300 overflow-hidden shadow-sm bg-white mx-auto relative">
                          <LivePreviewIframe html={q.targetHtml} css={q.targetCss} index={i + 1} tailwindTag={tailwindScriptTag} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>

              <div className="p-6 border-t border-slate-700 flex justify-end gap-3 shrink-0 bg-[#0d1424] rounded-b-xl">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateTest}
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all"
                >
                  {isSubmitting ? "Saving..." : "Save & Publish Test"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSuperTestDashboard;
