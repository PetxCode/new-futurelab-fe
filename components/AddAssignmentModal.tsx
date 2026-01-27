import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

interface AddAssignmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [points, setPoints] = useState(100);
  const [questions, setQuestions] = useState<{text: string, options: string[], correctAnswer: number}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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
    // Mocking an AI generation delay
    setTimeout(() => {
      const gQuestions = [
        {
          text: `Evaluate the primary concept of ${title || 'this task'}. What is the fundamental principle?`,
          options: ["First Approach", "Second Strategy", "Core Principle", "Alternative Method"],
          correctAnswer: 2
        },
        {
          text: `In the context of ${subject || 'general study'}, what is the most critical variable?`,
          options: ["Consistency", "Scale", "Complexity", "External Factors"],
          correctAnswer: 0
        },
        {
          text: `What is the expected outcome after completing this ${subject} module?`,
          options: ["Skill Mastery", "Knowledge Transfer", "Practical Application", "All of the above"],
          correctAnswer: 3
        }
      ];
      setQuestions(gQuestions);
      setIsGenerating(false);
      toast.success('Custom Quiz Generated!');
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({ title, subject, dueDate, priority, points, questions }),
      });

      if (response.ok) {
        toast.success('Assignment published!');
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to create assignment');
      }
    } catch (err) {
      toast.error('Server connection error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-xl rounded-[3rem] border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-2xl font-black text-white tracking-tight">New Assignment</h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Assignment Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Coding with Python"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Subject</label>
                <input 
                  type="text" 
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Python"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Due Date</label>
                <input 
                  type="text" 
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="e.g. Oct 25"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Priority</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium appearance-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">XP Points</label>
                <input 
                  type="number" 
                  required
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Quiz Preview / Generation / Manual Entry */}
          {/* <div className="p-8 bg-slate-900/50 rounded-[2rem] border border-slate-700/50 border-dashed"> */}
            {/* <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Custom Assessment</h4>
                <p className="text-xs font-medium text-slate-500 mt-1">Specific questions for this assignment.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  onClick={() => setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }])}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700 transition-all flex items-center space-x-2"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                  <span>Manual Add</span>
                </button>
                <button 
                  type="button"
                  onClick={generateQuiz}
                  disabled={isGenerating || !title}
                  className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/20 transition-all disabled:opacity-30 flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <div className="w-3 h-3 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )}
                  <span>{questions.length > 0 ? 'Regenerate' : 'Generate'}</span>
                </button>
              </div>
            </div> */}

            {/* Bulk Import Section */}
            {/* <div className="mb-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
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

            {questions.length > 0 ? (
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <div key={i} className="relative p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                    <button 
                      type="button"
                      onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))}
                      className="absolute top-4 right-4 text-slate-600 hover:text-rose-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="flex items-center space-x-3 mb-2">
                       <div className="w-6 h-6 bg-indigo-600/20 text-indigo-400 text-[10px] font-black rounded flex items-center justify-center shrink-0">Q{i+1}</div>
                       <input 
                         type="text"
                         value={q.text}
                         onChange={(e) => {
                           const newQs = [...questions];
                           newQs[i].text = e.target.value;
                           setQuestions(newQs);
                         }}
                         placeholder="Type your question..."
                         className="flex-1 bg-transparent border-none text-white text-sm font-bold placeholder-slate-700 focus:outline-none"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pl-9">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center space-x-2">
                          <input 
                            type="radio"
                            name={`correct-${i}`}
                            checked={q.correctAnswer === optIdx}
                            onChange={() => {
                              const newQs = [...questions];
                              newQs[i].correctAnswer = optIdx;
                              setQuestions(newQs);
                            }}
                            className="w-3 h-3 accent-indigo-500 cursor-pointer"
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
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-[10px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center bg-slate-900/40 rounded-2xl border border-slate-800/50 border-dashed">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📝</div>
                <p className="text-xs font-bold text-slate-500 tracking-tight">No assessment defined. Generate or add manually.</p>
              </div>
            )} */}
          {/* </div> */}

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-[2rem] shadow-xl shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Publish Assignment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignmentModal;
