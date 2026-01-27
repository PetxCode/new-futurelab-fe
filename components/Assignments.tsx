import React, { useState, useEffect } from 'react';
import { Assignment } from '../types';
import AddAssignmentModal from './AddAssignmentModal';
import EditQuizModal from './EditQuizModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import toast from 'react-hot-toast';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}


interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

const CBTModal: React.FC<{ 
  assignment: Assignment; 
  onClose: () => void;
  onComplete: (score: number) => void;
}> = ({ assignment, onClose, onComplete }) => {
  const questions = assignment.questions || [];
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (timeLeft === 0) handleSubmit();
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelect = (optionIdx: number) => {
    setAnswers({ ...answers, [currentQuestionIdx]: optionIdx });
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let scoreCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) scoreCount++;
    });
    return Math.round((scoreCount / questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    const score = calculateScore();
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="bg-slate-800 w-full max-w-lg rounded-[3rem] p-10 border border-slate-700 shadow-2xl text-center space-y-8">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-2xl shadow-indigo-600/40 animate-bounce">
            {score >= 70 ? '🎉' : '📚'}
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">Assessment Complete!</h2>
            <p className="text-slate-400 font-medium mt-2">Results for: {assignment.title}</p>
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">
             <div className="text-5xl font-black text-indigo-400 mb-2">{score}%</div>
             <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Mastery Score</p>
             <div className="mt-6 flex justify-center space-x-3">
                <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded-lg border border-emerald-500/20">+{Math.round(assignment.points * (score/100))} EXP Earned</div>
             </div>
          </div>
          <button 
            onClick={() => { onComplete(score); onClose(); }}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-500 transition-all active:scale-95"
          >
            Return to Tracker
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="bg-slate-800 w-full max-w-lg rounded-[3rem] p-10 border border-slate-700 shadow-2xl text-center space-y-6">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-2xl font-black text-white">No Quiz Available</h2>
          <p className="text-slate-400 font-medium">This assignment doesn't have any questions yet. Use the Quiz Editor to add some!</p>
          <button onClick={onClose} className="w-full py-4 bg-slate-700 text-white font-black rounded-2xl hover:bg-slate-600 transition-all">Close</button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-3xl rounded-[3rem] border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
           <div>
              <h2 className="text-xl font-black text-white">{assignment.title}</h2>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Assessment In Progress • Part {currentQuestionIdx + 1} of {questions.length}</p>
           </div>
           <div className="flex items-center space-x-4">
              <div className="text-right">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Time Remaining</p>
                 <p className={`text-lg font-black tabular-nums ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>{formatTime(timeLeft)}</p>
              </div>
              <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-900">
           <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Question Area */}
        <div className="p-10 flex-1 overflow-y-auto space-y-8">
           <div className="space-y-4">
              <span className="px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[10px] font-black rounded-full border border-indigo-500/20 uppercase tracking-widest">Question {currentQuestionIdx + 1}</span>
              <h3 className="text-2xl font-bold text-white leading-tight">{q.text}</h3>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`p-6 rounded-[1.5rem] border text-left transition-all group flex items-center space-x-4 ${
                    answers[currentQuestionIdx] === i 
                      ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                      : 'bg-slate-900/40 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-colors ${
                    answers[currentQuestionIdx] === i ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className={`font-medium ${answers[currentQuestionIdx] === i ? 'text-white' : 'text-slate-300'}`}>{opt}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-700 flex justify-between items-center bg-slate-800/50">
           <button 
             onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
             disabled={currentQuestionIdx === 0}
             className="px-6 py-3 bg-slate-900 text-slate-400 font-bold rounded-xl border border-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
           >
             Previous
           </button>
           
           {currentQuestionIdx === questions.length - 1 ? (
             <button 
               onClick={handleSubmit}
               disabled={answers[currentQuestionIdx] === undefined}
               className="px-10 py-3 bg-emerald-600 text-white font-black rounded-xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50"
             >
               Finalize & Submit
             </button>
           ) : (
             <button 
               onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
               disabled={answers[currentQuestionIdx] === undefined}
               className="px-10 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
             >
               Next Question
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

interface AssignmentsProps {
  userData?: {
    isAdmin?: boolean;
    [key: string]: any;
  };
  onUpdate: () => void;
}

const Assignments: React.FC<AssignmentsProps> = ({ userData, onUpdate }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCbt, setActiveCbt] = useState<Assignment | null>(null);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'Active' | 'Completed'>('Active');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editQuizAssignment, setEditQuizAssignment] = useState<Assignment | null>(null);
  const [deleteModalAssignment, setDeleteModalAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://futurelab-main-be.vercel.app/api/assignments', {
        headers: {
          'x-auth-token': localStorage.getItem('token') || '',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      }
    } catch (err) {
      console.error('Error fetching assignments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (score: number) => {
    if (activeCbt) {
      try {
        const response = await fetch(`https://futurelab-main-be.vercel.app/api/assignments/${activeCbt.id || (activeCbt as any)._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token') || '',
          },
          body: JSON.stringify({ 
            score, 
            status: score >= 70 ? 'Completed' : 'In Progress' 
          }),
        });

        if (response.ok) {
          toast.success('Result saved!');
          fetchAssignments();
          onUpdate();
        }
      } catch (err) {
        console.error('Error saving score:', err);
      }
    }
  };

  const handleGenerateExistingQuiz = async (assignment: Assignment) => {
    toast.loading('Generating assessment...', { id: 'gen-quiz' });
    
    // Mocking an AI generation delay (reusing the logic from modal)
    setTimeout(async () => {
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

      try {
        const response = await fetch(`https://futurelab-main-be.vercel.app/api/assignments/${assignment.id || (assignment as any)._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token') || '',
          },
          body: JSON.stringify({ questions: gQuestions }),
        });

        if (response.ok) {
          toast.success('Quiz generated!', { id: 'gen-quiz' });
          fetchAssignments();
        } else {
          toast.error('Failed to save quiz.', { id: 'gen-quiz' });
        }
      } catch (err) {
        toast.error('Network error.', { id: 'gen-quiz' });
      }
    }, 1500);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://futurelab-main-be.vercel.app/api/assignments/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token') || '',
        },
      });
      if (response.ok) {
        toast.success('Assignment deleted');
        fetchAssignments();
        setDeleteModalAssignment(null);
      } else {
        toast.error('Failed to delete assignment');
      }
    } catch (err) {
      toast.error('Network error - could not delete');
      console.error('Error deleting assignment:', err);
    }
  };

  const filteredAssignments = assignments.filter(task => {
    const isDone = task.status === 'Completed' || completedTaskIds.has(task.id);
    if (filter === 'Active') return !isDone;
    return isDone;
  });

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Assignment Tracker</h1>
          <p className="text-slate-400 mt-1 font-medium italic">Monitor progress and engineering tasks.</p>
        </div>
        <div className="flex items-center space-x-6">
          {userData?.isAdmin && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
              <span>New Assignment</span>
            </button>
          )}

          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
             <button 
              onClick={() => setFilter('Active')}
              className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${filter === 'Active' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}
             >
              Active
             </button>
             <button 
              onClick={() => setFilter('Completed')}
              className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${filter === 'Completed' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}
             >
              Completed
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 ">
        <div className="mt-10"/>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Tasks...</p>
          </div>
        ) : filteredAssignments.length > 0 ? (
          filteredAssignments.map((task) => {
            const isDone = task.status === 'Completed' || completedTaskIds.has(task.id || (task as any)._id);
            return (
              <div key={task.id || (task as any)._id} className="bg-[#1e293b]/40 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col lg:flex-row lg:items-center justify-between hover:bg-[#1e293b]/60 hover:border-slate-700/50 transition-all group animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center space-x-8">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                     isDone ? 'bg-emerald-500/10 text-emerald-400' : 
                     task.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-600'
                   }`}>
                      {isDone ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors leading-none tracking-tight">{task.title}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-slate-500 text-xs font-black uppercase tracking-widest">{task.subject}</span>
                        <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                        <span className="text-slate-500 text-xs font-medium">Due: {task.dueDate}</span>
                        <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                        <span className="text-indigo-400 text-xs font-black">{task.points} EXP</span>
                      </div>
                   </div>
                </div>

                <div className="mt-8 lg:mt-0 flex items-center space-x-6">
                   <div className="flex items-center space-x-2">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        task.priority === 'High' ? 'bg-rose-500/5 text-rose-500 border-rose-500/20' : 
                        task.priority === 'Medium' ? 'bg-amber-500/5 text-amber-500 border-amber-500/20' : 'bg-slate-800/50 text-slate-500 border-slate-700/50'
                      }`}>
                        {task.priority} Priority
                      </span>
                   </div>
                   <div className="flex items-center space-x-3">
                     {userData?.isAdmin && (
                       <>
                         <button 
                           onClick={() => setEditQuizAssignment(task)}
                           className="p-3 text-slate-500 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-xl transition-all active:scale-95"
                           title="Edit Quiz"
                         >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                         </button>

                         <button 
                           onClick={() => setDeleteModalAssignment(task)}
                           className="p-3 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all active:scale-95"
                           title="Delete Assignment"
                         >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                         </button>
                       </>
                     )}
                     
                     {(!task.questions || task.questions.length === 0) ? (
                        <button 
                          onClick={() => setEditQuizAssignment(task)}
                          className="px-8 py-3 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                        >
                           Create Quiz
                        </button>
                     ) : (
                        <button 
                          onClick={() => setActiveCbt(task)}
                          className="px-8 py-3 bg-[#0f172a] text-slate-200 text-xs font-black rounded-xl border border-slate-800 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all shadow-xl active:scale-95"
                        >
                           {isDone ? 'View Results' : 'Task Quiz'}
                        </button>
                     )}
                   </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-slate-800/10 rounded-[3rem] border border-dashed border-slate-800">
             <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center text-4xl shadow-inner">
                {filter === 'Active' ? '🎯' : '📭'}
             </div>
             <div>
                <h3 className="text-2xl font-black text-white">No {filter.toLowerCase()} tasks</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2 font-medium">
                  {filter === 'Active' ? 'You have cleared all your assignments for now. Good job!' : 'Complete your active tasks to see them here.'}
                </p>
             </div>
          </div>
        )}
        {/* Edit Quiz Modal */}
      {editQuizAssignment && (
        <EditQuizModal 
          assignment={editQuizAssignment}
          onClose={() => setEditQuizAssignment(null)}
          onSuccess={fetchAssignments}
        />
      )}
    </div>

      {/* Bonus Area */}
      <div className="p-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[3rem] shadow-2xl shadow-indigo-600/20 flex flex-col md:flex-row items-center justify-between text-center md:text-left relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
         <div className="relative z-10 mb-8 md:mb-0">
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Ready for a Sprint?</h3>
            <p className="text-indigo-100 font-medium text-lg">Batch your small coding tasks and get <span className="text-white font-black underline decoration-white/30 underline-offset-4">+50 bonus XP</span>.</p>
         </div>
         <button className="relative z-10 px-10 py-5 bg-white text-indigo-600 font-black rounded-[1.5rem] shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">Start Power Hour</button>
      </div>

      {/* CBT Modal */}
      {activeCbt && (
        <CBTModal 
          assignment={activeCbt} 
          onClose={() => setActiveCbt(null)} 
          onComplete={handleComplete}
        />
      )}

      {/* Add Assignment Modal */}
      {isAddModalOpen && (
        <AddAssignmentModal 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchAssignments}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalAssignment && (
        <DeleteConfirmationModal 
          title={deleteModalAssignment.title}
          onClose={() => setDeleteModalAssignment(null)}
          onConfirm={() => handleDelete(deleteModalAssignment.id || (deleteModalAssignment as any)._id)}
        />
      )}
    </div>
  );
};

export default Assignments;
