import React from "react";
import { CURRICULUM_DATA } from "../constants/curriculumData";
import { User } from "../types";

interface TermPlanModalProps {
  onClose: () => void;
  userData: User | null;
}

const TermPlanModal: React.FC<TermPlanModalProps> = ({ onClose, userData }) => {
  // Find the curriculum data for the user's grade, or default to the first one
  const userGradeName = userData?.grade || "JSS 1";
  const gradeData =
    CURRICULUM_DATA.find((g) => g.name.toLowerCase() === userGradeName.toLowerCase()) ||
    CURRICULUM_DATA[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="bg-slate-900 w-full max-w-5xl rounded-[3rem] border border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-10 py-10 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/50 backdrop-blur-3xl sticky top-0 z-20">
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
              <svg
                className="w-8 h-8 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-3">
                Term Plan
              </h2>
              <div className="flex items-center space-x-3">
                <span className="text-emerald-400/80 text-[11px] font-black uppercase tracking-[0.2em] px-2.5 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shadow-sm shadow-emerald-500/10">
                  {gradeData.name} Curriculum
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-4 text-slate-500 hover:text-white hover:bg-slate-800 rounded-[1.5rem] border border-transparent hover:border-slate-700 transition-all active:scale-95 group"
          >
            <svg
              className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="space-y-12">
            {gradeData.terms.map((term) => (
              <div
                key={term.id}
                className="bg-slate-800/30 rounded-[2rem] border border-slate-700/50 p-8 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30 text-indigo-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white">{term.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {term.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50 flex flex-col h-full hover:border-emerald-500/30 transition-all hover:-translate-y-1"
                    >
                      <div className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-3">
                        Lesson {lesson.id}
                      </div>
                      <h4 className="text-white font-bold text-lg mb-4 leading-tight">
                        {lesson.title}
                      </h4>
                      {lesson.topics && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {lesson.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-md border border-slate-700/50"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-auto space-y-3">
                        {lesson.assignment && (
                          <div className="flex items-start space-x-2 text-xs">
                            <span className="text-cyan-400 mt-0.5">📝</span>
                            <span className="text-slate-400 leading-normal">
                              <span className="text-slate-300 font-bold">Assignment:</span>{" "}
                              {lesson.assignment}
                            </span>
                          </div>
                        )}
                        {lesson.pocketProject && (
                          <div className="flex items-start space-x-2 text-xs">
                            <span className="text-purple-400 mt-0.5">🚀</span>
                            <span className="text-slate-400 leading-normal">
                              <span className="text-slate-300 font-bold">Project:</span>{" "}
                              {lesson.pocketProject}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermPlanModal;
