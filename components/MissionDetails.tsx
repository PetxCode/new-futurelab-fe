import React, { useState } from 'react';
import { LearningResource, NavigationItem, Mission } from '../types';

interface MissionDetailsProps {
  mission: LearningResource & { 
    lectureContent?: string; 
    practiceTest?: Mission['practiceTest'];
    bannerImage?: string; 
  };
  onBack: () => void;
  onSolve: (tab: NavigationItem) => void;
  onComplete?: (score: number) => void;
}

const MissionDetails: React.FC<MissionDetailsProps> = ({ mission, onBack, onSolve, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'lecture' | 'quiz'>(mission.lectureContent ? 'lecture' : 'details');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [tempSelection, setTempSelection] = useState<number | null>(null);

  const getTargetEngine = (): NavigationItem => {
    if (mission.category === 'Python' || mission.title.toLowerCase().includes('python')) {
      return 'Python Engine';
    }
    return 'Block Engine';
  };

  const handleNext = () => {
    if (tempSelection === null) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = tempSelection;
    setUserAnswers(newAnswers);
    setTempSelection(null);

    if (mission.practiceTest && currentQuestionIndex < mission.practiceTest.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsQuizFinished(false);
    setTempSelection(null);
  };

  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === mission.practiceTest?.[idx].correctAnswer ? acc + 1 : acc;
  }, 0);

  const totalQuestions = mission.practiceTest?.length || 0;
  const scorePercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const isPassing = scorePercentage >= 70;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <button 
               onClick={onBack}
               className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400 hover:text-white transition-all hover:bg-slate-700"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
               </svg>
            </button>
            <div>
               <h1 className="text-4xl font-black text-white tracking-tight">{mission.title}</h1>
               <div className="flex items-center space-x-3 mt-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest">
                     {mission.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                     mission.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                     mission.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                     {mission.difficulty}
                  </span>
               </div>
            </div>
         </div>
         
         <div className="flex bg-slate-800 p-1 rounded-2xl border border-slate-700">
            {(['details', 'lecture', 'quiz'] as const).map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
                     activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
               >
                  {tab}
               </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden min-h-[500px]">
            {activeTab === 'details' && (
               <>
                  <div className="w-full h-80 relative">
                     <img 
                        src={mission.bannerImage || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"} 
                        className="w-full h-full object-cover opacity-60"
                        alt="Mission Banner"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-10 prose prose-invert max-w-none text-slate-300 font-medium leading-[1.8]">
                     <div dangerouslySetInnerHTML={{ __html: mission.longDescription || '' }} />
                     
                     <div className="mt-12 space-y-4">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Example Verification</h4>
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-sm text-emerald-400/80">
                           <div className="flex items-center space-x-2 mb-2">
                              <span className="text-slate-600">&gt;&gt;&gt;</span>
                              <span>assert run_mission(data_input) == expected_output</span>
                           </div>
                           <div className="flex items-center space-x-2">
                              <span className="text-slate-600">&gt;&gt;&gt;</span>
                              <span>print("Success: 100% logic coverage")</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            )}

            {activeTab === 'lecture' && (
               <div className="p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: mission.lectureContent || '<p>Detailed lecture content coming soon...</p>' }} />
               </div>
            )}

            {activeTab === 'quiz' && (
               <div className="p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-white mb-8">Practice Quiz</h2>
                  {mission.practiceTest && mission.practiceTest.length > 0 ? (
                     !isQuizFinished ? (
                        <div className="space-y-8">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                              <div className="h-1 w-32 bg-slate-700 rounded-full overflow-hidden">
                                 <div 
                                    className="h-full bg-indigo-500 transition-all duration-500" 
                                    style={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
                                 />
                              </div>
                           </div>
                           <p className="text-lg text-slate-200 font-medium">{mission.practiceTest[currentQuestionIndex].question}</p>
                           <div className="space-y-3">
                              {mission.practiceTest[currentQuestionIndex].options.map((opt, i) => (
                                 <button
                                    key={i}
                                    onClick={() => setTempSelection(i)}
                                    className={`w-full p-5 rounded-2xl border text-left font-bold transition-all ${
                                       tempSelection === i 
                                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                    }`}
                                 >
                                    <span>{opt}</span>
                                 </button>
                              ))}
                           </div>

                           <button
                              onClick={handleNext}
                              disabled={tempSelection === null}
                              className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                           >
                              {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                           </button>
                        </div>
                     ) : (
                        <div className="text-center py-12 space-y-8 animate-in zoom-in-95 duration-500">
                           <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 ${isPassing ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-rose-500/10 border-rose-500 text-rose-500'}`}>
                              <span className="text-4xl font-black">{Math.round(scorePercentage)}%</span>
                           </div>
                           
                           <div>
                              <h3 className={`text-3xl font-black mb-2 ${isPassing ? 'text-emerald-400' : 'text-rose-400'}`}>
                                 {isPassing ? 'Mission Passed!' : 'Requires Review'}
                              </h3>
                              <p className="text-slate-400 font-medium italic">
                                 {isPassing 
                                    ? `Excellent work! You've mastered ${mission.title}.` 
                                    : `You got ${correctCount} out of ${totalQuestions} correct. You need 70% to pass.`}
                              </p>
                           </div>

                           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                              <button
                                 onClick={resetQuiz}
                                 className="px-8 py-4 bg-slate-800 text-white font-black rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all w-full sm:w-auto"
                              >
                                 Retake Quiz
                              </button>
                              {isPassing && (
                                 <button
                                    onClick={() => setActiveTab('details')}
                                    className="px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-500 transition-all w-full sm:w-auto"
                                 >
                                    Proceed to Complete
                                 </button>
                              )}
                           </div>
                        </div>
                     )
                  ) : (
                     <p className="text-slate-500 text-center py-20">No practice test available for this mission.</p>
                  )}
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <button 
               onClick={() => onSolve(getTargetEngine())}
               className="py-6 bg-slate-800 text-white font-black text-xl rounded-[2rem] border border-slate-700 shadow-xl hover:bg-slate-700 transition-all hover:translate-y-[-2px]"
            >
               Open Workspace
            </button>
            <button 
               onClick={() => onComplete?.(scorePercentage)}
               disabled={!isPassing}
               className={`py-6 font-black text-xl rounded-[2rem] shadow-2xl transition-all hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale disabled:translate-y-0 ${
                  isPassing 
                     ? 'bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-500' 
                     : 'bg-indigo-600 text-white shadow-indigo-600/20'
               }`}
            >
               {isPassing ? 'Mark as Done' : 'Complete Quiz to Unlock'}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50">
             <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Mission Stats</h3>
             
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <span className="text-slate-400 text-xs font-black uppercase">Reward</span>
                   <span className="px-3 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-xl text-sm font-black tracking-tighter">
                      {mission.reward}
                   </span>
                </div>
                
                <div className="flex items-center justify-between">
                   <span className="text-slate-400 text-xs font-black uppercase">Time Est.</span>
                   <span className="text-white text-sm font-black">{mission.estimatedTime}</span>
                </div>

                <div className="flex items-center justify-between">
                   <span className="text-slate-400 text-xs font-black uppercase">Requirement</span>
                   <span className="text-white text-sm font-black italic">Level 2+</span>
                </div>
                
                <div className="pt-6 border-t border-slate-700/50">
                   <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-4">Tags</span>
                   <div className="flex flex-wrap gap-2">
                      {mission.tags.map((tag, i) => (
                         <span key={i} className="px-3 py-1 bg-slate-900/60 rounded-lg text-[10px] font-black text-slate-400 border border-slate-700/50 uppercase">
                            {tag}
                         </span>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20">
             <h4 className="text-white font-black mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Study Tip
             </h4>
             <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                "Break down the problem into smaller logical steps. Use loops for repeating patterns and conditional branches to handle sensor variances."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetails;
