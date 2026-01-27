import React, { useState, useEffect } from 'react';
import { Subject, SubCourse } from '../types';
import AddCourseModal from './AddCourseModal';
import AddModuleModal from './AddModuleModal';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

type ViewMode = 'list' | 'outline' | 'content';

interface CoursesPageProps {
  userData?: {
    isAdmin?: boolean;
    [key: string]: any;
  };
  onUpdate: () => void;
}

const SubjectsPage: React.FC<CoursesPageProps> = ({ userData, onUpdate }) => {
  const [courses, setCourses] = useState<Subject[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeLesson, setActiveLesson] = useState<SubCourse | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [isClaiming, setIsClaiming] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses`, {
        headers: {
          'x-auth-token': localStorage.getItem('token') || '',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Sync initial completions from mock data when subject changes
  useEffect(() => {
    if (activeSubject) {
      const initialCompletions = new Set(
        activeSubject.subCourses
          .filter(sc => sc.isCompleted)
          .map(sc => sc.id)
      );
      setCompletedIds(initialCompletions);
    }
  }, [activeSubject]);

  const handleClaimBadge = async () => {
    if (!activeLesson && !activeSubject) return;
    const lessonToComplete = activeLesson || activeSubject!.subCourses[0];
    
    setIsClaiming(true);
    try {
      const response = await fetch(`https://futurelab-main-be.vercel.app/api/courses/${activeSubject!.id || (activeSubject as any)._id}/modules/${lessonToComplete.id}/complete`, {
        method: 'PATCH',
        headers: {
          'x-auth-token': localStorage.getItem('token') || '',
        },
      });

      if (response.ok) {
        const updatedCourse = await response.json();
        setActiveSubject(updatedCourse);
        setShowBadge(true);
        setCompletedIds(prev => new Set([...prev, lessonToComplete.id]));
        toast.success(`Badge Earned: ${lessonToComplete.badgeIcon}`);
        onUpdate();
        setTimeout(() => setShowBadge(false), 3000);
      } else {
        toast.error('Failed to save progress');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setIsClaiming(false);
    }
  };

  const isLocked = (lesson: SubCourse, index: number): boolean => {
    if (!activeSubject) return true;
    if (index === 0) return false; // First lesson is never locked
    const previousLesson = activeSubject.subCourses[index - 1];
    return !completedIds.has(previousLesson.id);
  };

  const handleBack = () => {
    if (viewMode === 'content') {
      setViewMode('outline');
    } else {
      setViewMode('list');
      setActiveSubject(null);
      setActiveLesson(null);
    }
  };

  const renderContent = () => {
    // --- CONTENT VIEW (Video Player + Sidebar) ---
    if (viewMode === 'content' && activeSubject) {
      const currentLesson = activeLesson || activeSubject.subCourses[0];
      const currentIndex = activeSubject.subCourses.findIndex(l => l.id === currentLesson.id);
      const locked = isLocked(currentLesson, currentIndex);

      return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBack}
                className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 text-slate-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">{activeSubject.title}</h1>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Module {currentIndex + 1}: {currentLesson.title}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className={`aspect-video rounded-[2.5rem] border shadow-2xl relative overflow-hidden group transition-all duration-500 ${
                locked ? 'bg-slate-900 border-rose-500/20 grayscale' : 'bg-slate-950 border-slate-800'
              }`}>
                 {locked ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900/20 to-slate-950 z-20">
                      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h3 className="text-white font-black text-xl">Module Locked</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Complete the previous lesson to unlock this video</p>
                      </div>
                   </div>
                 ) : (
                   <iframe 
                     className="w-full h-full"
                     src={`${currentLesson.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
                     title={currentLesson.title}
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     allowFullScreen
                   ></iframe>
                 )}
              </div>

              <div className="bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-700/50 space-y-8">
                 <div className="flex justify-between items-start">
                    <div className={locked ? 'opacity-50' : ''}>
                      <h2 className="text-2xl font-black text-white">{currentLesson.title}</h2>
                      <p className="text-slate-400 font-medium mt-2">{currentLesson.description}</p>
                      
                      {currentLesson.content && !locked && (
                        <div className="mt-8 pt-8 border-t border-slate-700/50">
                          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Lesson Materials</h4>
                          <div className="prose prose-invert max-w-none text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                            {currentLesson.content}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`text-center transition-all ${locked ? 'scale-75 opacity-30 grayscale' : 'animate-pulse'}`}>
                      <span className="block text-3xl mb-1">{currentLesson.badgeIcon}</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Badge</span>
                    </div>
                 </div>
                 <div className="pt-6 border-t border-slate-700 flex gap-4">
                    <button 
                      onClick={handleClaimBadge}
                      disabled={isClaiming || locked || completedIds.has(currentLesson.id)}
                      className={`flex-1 py-4 font-black rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-3 ${
                        completedIds.has(currentLesson.id) 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : (locked ? 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50' : 'bg-indigo-600 text-white hover:bg-indigo-500')
                      }`}
                    >
                      {isClaiming ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : completedIds.has(currentLesson.id) ? (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          <span>Lesson Completed</span>
                        </>
                      ) : locked ? (
                        <span>Module Locked</span>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>Mark as Completed & Claim Badge</span>
                        </>
                      )}
                    </button>
                    <button className="px-6 py-4 bg-slate-900 text-slate-400 rounded-2xl border border-slate-700 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </button>
                 </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-[2.5rem] border border-slate-700/50 flex flex-col h-full">
              <h3 className="text-xl font-black text-white mb-6 px-2">Course Curriculum</h3>
              <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scroll">
                 {activeSubject.subCourses.map((lesson, idx) => {
                   const lockedLesson = isLocked(lesson, idx);
                   const isActive = (activeLesson?.id || activeSubject.subCourses[0].id) === lesson.id;
                   const isDone = completedIds.has(lesson.id);

                   return (
                     <button 
                       key={lesson.id}
                       disabled={lockedLesson}
                       onClick={() => setActiveLesson(lesson)}
                       className={`w-full text-left p-4 rounded-2xl border transition-all group relative ${
                         isActive 
                           ? 'bg-indigo-600/10 border-indigo-500/50' 
                           : lockedLesson 
                             ? 'bg-slate-900/20 border-slate-800 opacity-40 cursor-not-allowed'
                             : 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800'
                       }`}
                     >
                        <div className="flex items-start justify-between">
                           <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black transition-colors ${
                                isDone ? 'bg-emerald-500 text-white' : lockedLesson ? 'bg-slate-800 text-slate-700' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                              }`}>
                                {isDone ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : lockedLesson ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> : idx + 1}
                              </div>
                              <div>
                                 <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>{lesson.title}</h4>
                                 <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{lockedLesson ? 'Restricted' : `${lesson.duration} Video`}</p>
                              </div>
                           </div>
                        </div>
                     </button>
                   );
                 })}
              </div>
            </div>
          </div>

          {showBadge && (
            <div className="fixed bottom-10 right-10 z-[100] bg-slate-800 border-2 border-indigo-500 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
               <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg animate-bounce ring-4 ring-indigo-500/20">{currentLesson.badgeIcon}</div>
                  <div>
                     <h4 className="text-xl font-black text-white">Badge Earned!</h4>
                     <p className="text-slate-400 font-medium">Lesson "{currentLesson.title}" Completed.</p>
                     <p className="text-indigo-400 font-bold text-xs mt-1">Unlocked Next Module +150 EXP</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      );
    }

    // --- OUTLINE VIEW (Curriculum List) ---
    if (viewMode === 'outline' && activeSubject) {
      return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500 max-w-5xl mx-auto pb-20">
          <div className="flex items-center space-x-6">
             <button 
               onClick={handleBack}
               className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-2xl border border-slate-700 text-slate-400 hover:text-white transition-all hover:bg-slate-700"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
             </button>
             <div>
                <h1 className="text-4xl font-black text-white tracking-tight">{activeSubject.title}</h1>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Full Course Syllabus • Instructor: {activeSubject.teacher}</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             <div className="md:col-span-1 space-y-6">
                <div className="bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 overflow-hidden">
                   <img src={activeSubject.thumbnail} className="w-full h-48 object-cover opacity-60" />
                   <div className="p-8">
                      <h3 className="text-xl font-black text-white mb-2">About this Subject</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">{activeSubject.description}</p>
                      <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/50">
                         <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery Level</span>
                            <span className="text-sm font-black text-white">{activeSubject.progress}%</span>
                         </div>
                         <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${activeSubject.progress}%` }} />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4 px-2">
                   <h3 className="text-2xl font-black text-white">Course Outline</h3>
                   <div className="flex items-center space-x-4">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{activeSubject.subCourses.length} Modules Available</span>
                      {userData?.isAdmin && (
                        <button 
                          onClick={() => setIsAddModuleModalOpen(true)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center space-x-2"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                          <span>Add Module</span>
                        </button>
                      )}
                   </div>
                </div>
                
                <div className="space-y-3">
                   {activeSubject.subCourses.map((lesson, idx) => {
                     const locked = isLocked(lesson, idx);
                     const isDone = completedIds.has(lesson.id);

                     return (
                       <div 
                         key={lesson.id}
                         onClick={() => { if (!locked) { setActiveLesson(lesson); setViewMode('content'); }}}
                         className={`p-6 rounded-[2rem] border transition-all group flex items-center justify-between cursor-pointer ${
                           locked 
                             ? 'bg-slate-900/40 border-slate-800 opacity-60' 
                             : 'bg-slate-800/60 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800'
                         }`}
                       >
                          <div className="flex items-center space-x-6">
                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black transition-all ${
                               isDone ? 'bg-emerald-500 text-white' : locked ? 'bg-slate-900 text-slate-700' : 'bg-slate-900 text-white group-hover:bg-indigo-600'
                             }`}>
                               {isDone ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : locked ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> : idx + 1}
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-white">{lesson.title}</h4>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">{lesson.duration} Module • {locked ? 'Locked' : isDone ? 'Completed' : 'Ready'}</p>
                             </div>
                          </div>
                          {!locked && (
                             <div className="p-3 bg-slate-900 rounded-xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                             </div>
                          )}
                       </div>
                     );
                   })}
                </div>
                
                <button 
                  onClick={() => { setActiveLesson(activeSubject.subCourses[0]); setViewMode('content'); }}
                  className="w-full mt-8 py-5 bg-indigo-600 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
                >
                  Start Learning
                </button>
             </div>
          </div>
        </div>
      );
    }

    // --- LIST VIEW (Default Course Selection) ---
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Active Curriculum</h1>
            <p className="text-slate-400 mt-1 font-medium">Technical modules focused on AI, Robotics, and Python engineering.</p>
          </div>
          
          {userData?.isAdmin && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
              <span>New Course</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Courses...</p>
            </div>
          ) : courses.length > 0 ? (
            courses.map((sub) => (
              <div key={sub.id || (sub as any)._id} className="bg-slate-800/40 border border-slate-700/50 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row group hover:border-indigo-500/30 transition-all shadow-xl shadow-black/10">
                <div className="lg:w-1/3 h-64 lg:h-auto overflow-hidden">
                   <img src={sub.thumbnail} alt={sub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0" />
                </div>
                <div className="lg:w-2/3 p-10 flex flex-col justify-between">
                   <div>
                      <div className="flex justify-between items-start mb-2">
                         <h2 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">{sub.title}</h2>
                         <span className="text-3xl font-black text-white tracking-tighter">{sub.grade}</span>
                      </div>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6">Instructor: {sub.teacher} • {sub.schedule}</p>
                      <p className="text-slate-400 leading-relaxed font-medium mb-8">
                        {sub.description}
                      </p>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Syllabus Mastery</span>
                        <span className="text-sm font-black text-white">{sub.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-900 rounded-full p-[2px]">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]" style={{ width: `${sub.progress}%` }} />
                      </div>
                      <div className="flex gap-4 pt-4">
                         <button 
                           onClick={() => { setActiveSubject(sub); setViewMode('outline'); }}
                           className="flex-1 py-3 bg-slate-900 text-slate-200 text-xs font-black rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors"
                         >
                           Course Outline
                         </button>
                         <button 
                           onClick={() => { setActiveSubject(sub); setViewMode('content'); setActiveLesson(null); }}
                           className="flex-1 py-3 bg-indigo-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-colors flex items-center justify-center space-x-2"
                         >
                            <span>Open Modules</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-slate-800/20 rounded-[3rem] border border-slate-700/50 border-dashed">
              <h3 className="text-white font-black text-lg">No Courses Available</h3>
              <p className="text-slate-500 font-medium">Connect with an admin to enroll in new curriculum.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {renderContent()}

      {isAddModalOpen && (
        <AddCourseModal 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchCourses}
        />
      )}

      {isAddModuleModalOpen && activeSubject && (
        <AddModuleModal 
          courseId={activeSubject.id || (activeSubject as any)._id}
          onClose={() => setIsAddModuleModalOpen(false)}
          onSuccess={(updatedCourse) => {
            setActiveSubject(updatedCourse);
            fetchCourses();
          }}
        />
      )}
    </>
  );
};

export default SubjectsPage;

