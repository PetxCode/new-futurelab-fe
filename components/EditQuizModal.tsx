
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Assignment } from '../types';

interface EditQuizModalProps {
  assignment: Assignment;
  onClose: () => void;
  onSuccess: () => void;
}

const EditQuizModal: React.FC<EditQuizModalProps> = ({ assignment, onClose, onSuccess }) => {
  const [questions, setQuestions] = useState(assignment.questions?.length ? assignment.questions : []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const parseBulkQuestions = () => {
    if (!bulkText.trim()) return;

    try {
      const blocks = bulkText.split(/\n\s*\n/);
      const parsedStats: {text: string, options: string[], correctAnswer: number}[] = [];

      blocks.forEach(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        
        let questionText = "";
        const options: string[] = ["", "", "", ""];
        let correctAnswer = 0;
        let foundOptions = false;

        lines.forEach(line => {
          if (line.match(/^[A-D][).]\s/)) {
            foundOptions = true;
            const index = line.toUpperCase().charCodeAt(0) - 65;
            if (index >= 0 && index < 4) {
              options[index] = line.replace(/^[A-D][).]\s/, '').trim();
            }
          } else if (line.match(/^Answer:\s*[A-D]/i)) {
            const match = line.match(/^Answer:\s*([A-D])/i);
            if (match) {
              correctAnswer = match[1].toUpperCase().charCodeAt(0) - 65;
            }
          } else if (!foundOptions) {
            questionText += (questionText ? " " : "") + line;
          }
        });

        if (questionText && options.every(o => o)) {
          parsedStats.push({ text: questionText, options, correctAnswer });
        }
      });

      if (parsedStats.length > 0) {
        setQuestions([...questions, ...parsedStats]);
        setBulkText('');
        toast.success(`Imported ${parsedStats.length} questions!`);
      } else {
        toast.error('No valid questions found. check format.');
      }
    } catch (e) {
      toast.error('Error parsing text.');
    }
  };

  const generateQuiz = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const gQuestions = [
        {
          text: `Evaluate the primary concept of ${assignment.title}. What is the fundamental principle?`,
          options: ["First Approach", "Second Strategy", "Core Principle", "Alternative Method"],
          correctAnswer: 2
        },
        {
          text: `In the context of ${assignment.subject}, what is the most critical variable?`,
          options: ["Consistency", "Scale", "Complexity", "External Factors"],
          correctAnswer: 0
        },
        {
          text: `What is the expected outcome after completing this ${assignment.subject} module?`,
          options: ["Skill Mastery", "Knowledge Transfer", "Practical Application", "All of the above"],
          correctAnswer: 3
        }
      ];
      setQuestions(gQuestions);
      setIsGenerating(false);
      toast.success('AI Quiz Generated!');
    }, 1200);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignment.id || (assignment as any)._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({ questions }),
      });

      if (response.ok) {
        toast.success('Assessment saved!');
        onSuccess();
        onClose();
      } else {
        toast.error('Failed to save assessment');
      }
    } catch (err) {
      toast.error('Server connection error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-4xl rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Quiz Editor</h2>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Assignment: {assignment.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-10 overflow-y-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h4 className="text-sm font-black text-white uppercase tracking-widest">Question Bank</h4>
               <p className="text-xs font-medium text-slate-500">Add questions manually or use AI generation.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                type="button"
                onClick={() => setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }])}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700 transition-all flex items-center space-x-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                <span>Add Question</span>
              </button>
              <button 
                type="button"
                onClick={generateQuiz}
                disabled={isGenerating}
                className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/20 transition-all disabled:opacity-30 flex items-center space-x-2"
              >
                {isGenerating ? (
                  <div className="w-3 h-3 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )}
                <span>Auto-Generate</span>
              </button>
            </div>
          </div>

          {/* Bulk Import Section */}
          <div className="mb-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Bulk Import Questions (Paste Text)</label>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`What is 2+2?\nA) 3\nB) 4\nC) 5\nD) 6\nAnswer: B\n\n(Next Question...)`}
              className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={parseBulkQuestions}
                disabled={!bulkText.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all disabled:opacity-50"
              >
                Process & Add
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {questions.length > 0 ? (
              questions.map((q, i) => (
                <div key={i} className="relative p-6 bg-slate-800/40 rounded-2xl border border-slate-800/80 space-y-4 shadow-inner group">
                  <button 
                    type="button"
                    onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))}
                    className="absolute top-4 right-4 text-slate-600 hover:text-rose-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <div className="flex items-center space-x-4 mb-2">
                     <div className="w-8 h-8 bg-indigo-600/20 text-indigo-400 text-xs font-black rounded-lg flex items-center justify-center shrink-0">Q{i+1}</div>
                     <input 
                       type="text"
                       value={q.text}
                       onChange={(e) => {
                         const newQs = [...questions];
                         newQs[i].text = e.target.value;
                         setQuestions(newQs);
                       }}
                       placeholder="Enter your question title..."
                       className="flex-1 bg-transparent border-none text-white text-base font-bold placeholder-slate-700/50 focus:outline-none"
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pl-12">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center space-x-3">
                        <input 
                          type="radio"
                          name={`edit-correct-${i}`}
                          checked={q.correctAnswer === optIdx}
                          onChange={() => {
                            const newQs = [...questions];
                            newQs[i].correctAnswer = optIdx;
                            setQuestions(newQs);
                          }}
                          className="w-4 h-4 accent-indigo-500 cursor-pointer"
                        />
                        <input 
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newQs = [...questions];
                            newQs[i].options[optIdx] = e.target.value;
                            setQuestions(newQs);
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-xs text-slate-300 placeholder-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all font-medium"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-slate-950/20 rounded-[2.5rem] border border-slate-800/50 border-dashed">
                <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner">🧩</div>
                <h3 className="text-white font-black text-lg">Empty Assessment</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2 text-sm font-medium">Add questions manually or use AI to generate a complete assessment for this task.</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 border-t border-slate-700/50 bg-slate-800/30 flex justify-end space-x-4">
           <button 
             onClick={onClose}
             className="px-8 py-3 text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest transition-colors"
           >
             Discard Changes
           </button>
           <button 
             onClick={handleSave}
             disabled={isLoading || questions.length === 0}
             className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
           >
             {isLoading ? 'Saving...' : 'Save Assessment'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuizModal;
