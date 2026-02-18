import React, { useState, useEffect } from "react";
import { Lesson } from "../constants/curriculumData";
import toast from "react-hot-toast";

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose, onComplete }) => {
  const [view, setView] = useState<"explanation" | "quiz" | "result">("explanation");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes for 10 questions
  const [score, setScore] = useState(0);

  const questions = lesson.questions || [];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (view === "quiz" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && view === "quiz") {
      handleQuizSubmit();
    }
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setView("result");
    onComplete(finalScore);
  };

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="bg-slate-900 w-full max-w-4xl rounded-[3rem] border border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-10 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/50 backdrop-blur-3xl sticky top-0 z-20">
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-3">{lesson.title}</h2>
              <div className="flex items-center space-x-3">
                <span className="text-indigo-400/80 text-[11px] font-black uppercase tracking-[0.2em] px-2.5 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20 shadow-sm shadow-indigo-500/10">
                  {view === "explanation" ? "Interactive Lecture" : view === "quiz" ? "CBT Assessment" : "Results Overview"}
                </span>
                <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                <span className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">Module {lesson.id < 10 ? `0${lesson.id}` : lesson.id}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-4 text-slate-500 hover:text-white hover:bg-slate-800 rounded-[1.5rem] border border-transparent hover:border-slate-700 transition-all active:scale-95 group">
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {view === "explanation" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-invert max-w-none">
                <div className="bg-gradient-to-br from-indigo-500/5 to-transparent border border-indigo-500/20 p-10 rounded-[2.5rem] mb-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
                  <h4 className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] mb-6 flex items-center">
                    <span className="w-8 h-[1px] bg-indigo-500/30 mr-3"></span>
                    Lesson Introduction
                  </h4>
                  <div className="space-y-8">
                    {lesson.content ? (
                      lesson.content.split('\n\n').map((para, i) => {
                        // 1. Check for Hero Heading (### Heading)
                        if (para.startsWith('### ')) {
                          return (
                            <h2 key={i} className="text-3xl font-black text-white mt-12 mb-4 tracking-tight">
                              {para.replace('### ', '')}
                            </h2>
                          );
                        }

                        // 2. Check for Sub-Label Block (:::LABEL::: Text)
                        if (para.startsWith(':::')) {
                          const match = para.match(/^:::(.*?):::\n?([\s\S]*)/);
                          if (match) {
                            const label = match[1];
                            const text = match[2];
                            return (
                              <div key={i} className="bg-indigo-500/10 border-l-4 border-indigo-500 p-6 rounded-r-2xl space-y-3">
                                <h5 className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">{label}</h5>
                                <p className="text-slate-300 font-medium leading-relaxed italic">{text}</p>
                              </div>
                            );
                          }
                        }

                        // 3. Check for Code Block (```lang code ```)
                        if (para.startsWith('```')) {
                          const lines = para.split('\n');
                          const title = lines[0].replace('```', '').toUpperCase() || "EXAMPLE";
                          const code = lines.slice(1, -1).join('\n');
                          return (
                            <div key={i} className="relative group my-8">
                              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                              <div className="relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                                <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
                                  <div className="flex space-x-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                                  </div>
                                </div>
                                <pre className="p-6 font-mono text-sm overflow-x-auto text-indigo-300 leading-relaxed">
                                  <code>{code}</code>
                                </pre>
                              </div>
                            </div>
                          );
                        }
                        
                        // 4. Standard Paragraph with Bold highlights
                        const parts = para.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={i} className="text-slate-300 font-medium leading-relaxed text-lg italic">
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                const term = part.slice(2, -2);
                                return (
                                  <span key={j} className="text-cyan-400 font-black not-italic px-1.5 py-0.5 bg-cyan-400/10 rounded-md border border-cyan-400/20 mx-0.5">
                                    {term}
                                  </span>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-slate-300 font-medium leading-relaxed italic">
                        Detailed content for this lesson is being prepared. Follow the topics below to master the core concepts.
                      </p>
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-white mt-20 mb-6 tracking-tight">Key Learning Objectives</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0">
                  {lesson.topics?.map((topic, i) => (
                    <li key={i} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 flex items-center space-x-4 hover:border-indigo-500/30 transition-colors group/item">
                      <span className="w-8 h-8 bg-indigo-500/10 text-indigo-400 font-black text-xs rounded-xl flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all">0{i+1}</span>
                      <span className="text-slate-300 font-bold group-hover/item:text-white transition-colors">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-20 p-10 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-[3rem] border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="text-center md:text-left relative z-10">
                  <h4 className="text-2xl font-black text-white mb-2">Ready for the Assessment?</h4>
                  <p className="text-slate-400 font-medium">Verify your knowledge with a 10-question CBT test.</p>
                </div>
                <button 
                  onClick={() => {
                    if (!lesson.questions || lesson.questions.length === 0) {
                      toast.error("Quiz questions for this lesson are arriving soon!", { icon: "🚧" });
                      return;
                    }
                    setView("quiz");
                  }}
                  className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center space-x-3 group"
                >
                  <span>Start CBT Test</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {view === "quiz" && currentQuestion && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black rounded-full border border-indigo-500/20 uppercase tracking-widest">
                    Question {currentQuestionIdx + 1} of {questions.length}
                  </span>
                  <div className="h-1.5 w-48 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-500" 
                      style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-rose-500">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   <span className="font-black tabular-nums">{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {currentQuestion.text}
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setAnswers({ ...answers, [currentQuestionIdx]: i })}
                      className={`p-6 rounded-[1.8rem] border text-left transition-all group flex items-center space-x-5 ${
                        answers[currentQuestionIdx] === i
                          ? "bg-indigo-600/10 border-indigo-500 shadow-xl shadow-indigo-600/10"
                          : "bg-slate-950/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800/40"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                        answers[currentQuestionIdx] === i ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className={`text-lg font-bold ${answers[currentQuestionIdx] === i ? "text-white" : "text-slate-300"}`}>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "result" && (
            <div className="flex flex-col items-center justify-center space-y-8 animate-in zoom-in-95 duration-700 py-10">
              <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl ${
                score >= 70 ? "bg-emerald-600 shadow-emerald-600/30" : "bg-indigo-600 shadow-indigo-600/30"
              }`}>
                {score >= 70 ? "🏆" : "🔥"}
              </div>
              
              <div className="text-center">
                <h2 className="text-4xl font-black text-white tracking-tight">Assessment Record</h2>
                <p className="text-slate-500 font-medium mt-2">Class Mastery Level</p>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 p-10 rounded-[3rem] w-full max-w-sm text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
                <div className="text-7xl font-black text-white mb-2">{score}%</div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Score Achieved</div>
                
                <div className="mt-10 pt-10 border-t border-slate-800/50 flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-white font-black text-xl">{Object.keys(answers).length}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Attempted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-400 font-black text-xl">{Math.round((score/100) * questions.length)}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Correct</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 w-full max-w-sm">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-slate-700 transition-all active:scale-95"
                >
                  Close Path
                </button>
                <button 
                  onClick={() => {
                    setView("explanation");
                    setAnswers({});
                    setCurrentQuestionIdx(0);
                    setTimeLeft(600);
                  }}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
                >
                  Review Lesson
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {view === "quiz" && (
          <div className="p-8 border-t border-slate-800/50 bg-slate-800/20 flex justify-between items-center">
            <button 
              onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-8 py-3 bg-slate-950/40 text-slate-400 font-bold rounded-xl border border-slate-800 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Auto-Saving...</span>
              {currentQuestionIdx === questions.length - 1 ? (
                <button 
                  onClick={handleQuizSubmit}
                  disabled={answers[currentQuestionIdx] === undefined}
                  className="px-10 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
                >
                  Finish Assessment
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                  disabled={answers[currentQuestionIdx] === undefined}
                  className="px-10 py-3 bg-slate-200 text-slate-900 font-black rounded-xl hover:bg-white transition-all active:scale-95 disabled:opacity-50"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonModal;
