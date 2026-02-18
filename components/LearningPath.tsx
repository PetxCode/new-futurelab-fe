import React, { useState } from "react";
import { CURRICULUM_DATA, GradeLevel, Term, Lesson } from "../constants/curriculumData";
import LessonModal from "./LessonModal";

import { User } from "../types";

interface LearningPathProps {
  user: User | null;
}

const LearningPath: React.FC<LearningPathProps> = ({ user }) => {
  const initialGradeId = CURRICULUM_DATA.find(g => g.name.toLowerCase() === user?.grade?.toLowerCase())?.id || CURRICULUM_DATA[0].id;
  const [selectedGradeId, setSelectedGradeId] = useState<string>(initialGradeId);
  const [expandedTermId, setExpandedTermId] = useState<string | null>(CURRICULUM_DATA[0].terms[0].id);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTermId, setActiveTermId] = useState<string | null>(null);
  const [completedScores, setCompletedScores] = useState<Record<string, number>>({});

  const selectedGrade = CURRICULUM_DATA.find((g) => g.id === selectedGradeId) || CURRICULUM_DATA[0];

  React.useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`/api/analytics/scores/${selectedGradeId}`, {
          headers: { 'x-auth-token': token }
        });
        if (response.ok) {
          const scores = await response.json();
          setCompletedScores(scores);
        }
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      }
    };

    fetchScores();
  }, [selectedGradeId]);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Path</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg font-medium">
            Your journey to engineering mastery, one lesson at a time.
          </p>
        </div>
        
        {/* Progress Overview Placeholder */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl flex items-center space-x-4 shadow-xl shadow-indigo-500/5">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-slate-700"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 * (1 - 0.15)}
                className="text-indigo-500 stroke-round transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-[10px] font-black text-white">15%</span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Class Progress</div>
            <div className="text-white font-black">class: {selectedGrade.name}</div>
          </div>
        </div>
      </div>

      {/* Grade Selector */}
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
        {CURRICULUM_DATA.map((grade) => (
          <button
            key={grade.id}
            onClick={() => {
              setSelectedGradeId(grade.id);
              setExpandedTermId(grade.terms[0].id);
            }}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-bold transition-all border ${
              selectedGradeId === grade.id
                ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25 scale-105"
                : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:bg-slate-700/50"
            }`}
          >
            <span className="mr-2">{grade.icon}</span>
            {grade.name}
          </button>
        ))}
      </div>

      {/* Curriculum Grid */}
      <div className="grid grid-cols-1 gap-6">
        {selectedGrade.terms.map((term) => (
          <div
            key={term.id}
            className={`bg-slate-800/30 backdrop-blur-md rounded-3xl border border-slate-700/50 overflow-hidden transition-all duration-500 ${
              expandedTermId === term.id ? "ring-1 ring-indigo-500/30 shadow-2xl" : "hover:border-slate-600"
            }`}
          >
            <button
              onClick={() => setExpandedTermId(expandedTermId === term.id ? null : term.id)}
              className="w-full px-8 py-6 flex items-center justify-between text-left group"
            >
              <div className="flex items-center space-x-6">
                <div className={`p-3 rounded-2xl ${
                  expandedTermId === term.id ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-400 group-hover:bg-slate-600 transition-colors"
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{term.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mt-1">
                    {term.lessons.length} Core Lessons • Estimated {term.lessons.length * 2} Hours
                  </p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${expandedTermId === term.id ? "rotate-180 text-white" : "text-slate-600 group-hover:text-slate-400"}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {expandedTermId === term.id && (
              <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {term.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className="group relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 hover:border-indigo-500/50 transition-all hover:translate-y-[-4px]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded-md">
                          Lesson {lesson.id}
                        </span>
                        {completedScores[`${term.id}_${lesson.id}`] !== undefined ? (
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                            Score: {completedScores[`${term.id}_${lesson.id}`]}%
                          </span>
                        ) : idx === 0 && (
                          <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                        )}
                      </div>
                      
                      <h4 className="text-white font-bold leading-tight mb-3 group-hover:text-indigo-300 transition-colors">
                        {lesson.title}
                      </h4>

                      {lesson.topics && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {lesson.topics.map((topic, tIdx) => (
                            <span key={tIdx} className="text-[9px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="space-y-3 mt-auto">
                        {lesson.assignment && (
                          <div className="flex items-start space-x-2 text-xs">
                            <span className="text-cyan-400 mt-0.5">📝</span>
                            <span className="text-slate-400 leading-normal"><span className="text-slate-300 font-bold">Assignment:</span> {lesson.assignment}</span>
                          </div>
                        )}
                        {lesson.pocketProject && (
                          <div className="flex items-start space-x-2 text-xs">
                            <span className="text-purple-400 mt-0.5">🚀</span>
                            <span className="text-slate-400 leading-normal"><span className="text-slate-300 font-bold">Project:</span> {lesson.pocketProject}</span>
                          </div>
                        )}
                        {lesson.quiz && (
                          <div className="flex items-start space-x-2 text-xs">
                            <span className="text-rose-400 mt-0.5">💡</span>
                            <div className="flex flex-col">
                              <span className="text-slate-400 leading-normal"><span className="text-slate-300 font-bold">Quiz:</span> {lesson.quiz}</span>
                              <span className="text-[10px] font-bold text-rose-400/80 mt-1 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                10 Questions to Master
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={() => {
                          setActiveTermId(term.id);
                          setActiveLesson(lesson);
                        }}
                        className="w-full mt-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-widest rounded-xl border border-slate-700/50 transition-all active:scale-95 flex items-center justify-center space-x-2"
                      >
                        <span>{completedScores[`${term.id}_${lesson.id}`] !== undefined ? "Review Lesson" : "Start Lesson"}</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lesson Modal */}
      {activeLesson && (
        <LessonModal 
          lesson={activeLesson}
          onClose={() => {
            setActiveLesson(null);
            setActiveTermId(null);
          }}
          onComplete={async (score) => {
            const compositeKey = `${activeTermId}_${activeLesson.id}`;
            setCompletedScores(prev => ({ ...prev, [compositeKey]: score }));
            
            // Persist to backend
            try {
              const token = localStorage.getItem('token');
              if (!token) return;

              await fetch('/api/analytics/log', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'x-auth-token': token 
                },
                body: JSON.stringify({
                  type: 'quiz',
                  title: activeLesson.title,
                  category: selectedGrade.name,
                  score,
                  points: 100, // Graduation stakes
                  gradeId: selectedGradeId,
                  termId: activeTermId,
                  lessonId: activeLesson.id
                })
              });
            } catch (error) {
              console.error("Failed to log score:", error);
            }
          }}
        />
      )}
    </div>
  );
};

export default LearningPath;
