import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';

interface AllTrainersProps {
  onBack?: () => void;
  onEngage: (trainer: any) => void;
  userData?: any;
  onAssign?: (trainerId: string) => void;
}

const AllTrainers: React.FC<AllTrainersProps> = ({ onBack, onEngage, userData, onAssign }) => {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDetailTrainer, setSelectedDetailTrainer] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/api/user/instructors`)
      .then(res => res.json())
      .then(data => {
        setInstructors(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(instructors.length / trainersPerPage);
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = instructors.slice(indexOfFirstTrainer, indexOfLastTrainer);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500/30 font-inter overflow-x-hidden ${onBack ? 'pt-24' : 'pt-4'} pb-20`}>
      {/* Navigation - Only show if onBack is provided (Landing Page Mode) */}
      {onBack && (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div onClick={onBack} className="flex items-center cursor-pointer group">
              <img src="/logo.png" alt="FutureLab" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            </div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </nav>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            Our World-Class <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Trainers.</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl">
            Choose from our curated pool of approved industry experts. Each trainer is vetted for both technical excellence and educational impact.
          </p>
        </div>

        {instructors.length === 0 ? (
          <div className="text-center py-40 bg-slate-800/20 border-2 border-dashed border-slate-800 rounded-[3rem]">
            <p className="text-slate-500 font-bold text-xl uppercase tracking-widest">No trainers found yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentTrainers.map((inst) => (
                <div 
                  key={inst._id} 
                  className="bg-slate-800/40 border border-slate-700/50 rounded-[3rem] overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col group p-8"
                >
                  <div className="flex items-center gap-6 mb-8 cursor-pointer" onClick={() => setSelectedDetailTrainer(inst)}>
                    <div className="relative">
                      <img 
                        src={inst.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} 
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-xl group-hover:scale-105 transition-transform"
                        alt={inst.fullName}
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-black border-2 border-slate-800">
                        {inst.instructorProfile?.rating || 4.8}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{inst.fullName}</h3>
                      <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mt-1">
                        {inst.instructorProfile?.yearsExperience || 1}+ Years Exp.
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6 flex-1">
                    "{inst.instructorProfile?.bio}"
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(inst.instructorProfile?.specialties || []).map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-700/50 flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Monthly Rate</p>
                      <p className="text-white text-xl font-black">₦{(inst.instructorProfile?.monthlyRate || 20000).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                       <button 
                        onClick={() => setSelectedDetailTrainer(inst)}
                        className="p-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                        title="View Full Profile"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      {userData ? (
                        userData.selectedInstructor === inst._id ? (
                           <button 
                            disabled
                            className="px-6 py-3 bg-emerald-500/20 text-emerald-400 text-sm font-black rounded-xl border border-emerald-500/30 flex items-center gap-2 cursor-default"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Assigned
                          </button>
                        ) : (
                          <button 
                            onClick={() => onEngage({ ...inst, id: inst._id })}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                          >
                            Assign to Child
                          </button>
                        )
                      ) : (
                        <button 
                          onClick={() => {
                            onEngage({
                              id: inst._id,
                              fullName: inst.fullName,
                              rate: inst.instructorProfile?.monthlyRate
                            });
                          }}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                        >
                          Engage
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-4">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-4 bg-slate-800 border border-slate-700 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-500 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-black transition-all ${
                        currentPage === i + 1 
                          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                          : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-4 bg-slate-800 border border-slate-700 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-500 transition-all font-black text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Trainer Detail Modal (Same as LandingPage for consistency) */}
      {selectedDetailTrainer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="relative p-8 md:p-12 pb-6 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <button 
                onClick={() => setSelectedDetailTrainer(null)}
                className="absolute top-8 right-8 p-3 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-2xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative flex-shrink-0">
                <img 
                  src={selectedDetailTrainer.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] object-cover border-4 border-slate-700 shadow-2xl"
                  alt={selectedDetailTrainer.fullName}
                />
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-emerald-500 rounded-2xl flex items-center gap-2 text-white font-black border-4 border-slate-900 shadow-xl">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {selectedDetailTrainer.instructorProfile?.rating || 4.8}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">{selectedDetailTrainer.fullName}</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl text-xs font-black uppercase tracking-widest border border-indigo-500/20">
                    {selectedDetailTrainer.instructorProfile?.yearsExperience || 1}+ Years Exp.
                  </span>
                  <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-500/20">
                    {selectedDetailTrainer.instructorProfile?.studentsTrainedCount || 0}+ Students Trained
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-12 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">About the Trainer</h4>
                    <p className="text-slate-300 font-medium leading-relaxed text-lg">
                      {selectedDetailTrainer.instructorProfile?.detailedBio || selectedDetailTrainer.instructorProfile?.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Master skillset</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedDetailTrainer.instructorProfile?.skillset || []).map((skill: string) => (
                        <span key={skill} className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-sm font-bold border border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem]">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Training Focus</h4>
                    <ul className="space-y-4">
                      {(selectedDetailTrainer.instructorProfile?.trainingHighlights || ["Fundamental Logic", "Project Building", "Problem Solving"]).map((h: string) => (
                        <li key={h} className="flex items-center gap-3 text-slate-300 font-bold">
                          <div className="w-2 h-2 rounded-full bg-indigo-500" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedDetailTrainer.instructorProfile?.otherCriticalInfo?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Why choose this Trainer?</h4>
                      <div className="space-y-3">
                        {selectedDetailTrainer.instructorProfile.otherCriticalInfo.map((info: string) => (
                          <div key={info} className="flex items-center gap-3 px-4 py-3 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl text-indigo-300 text-sm font-bold">
                            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.9L9.03 9.127L15.9 4.9L15.9 10.223L9.03 14.45L2.166 10.223L2.166 4.9ZM9.03 10.477L15.9 6.25L15.9 5.25L9.03 9.477L2.166 5.25L2.166 6.25L9.03 10.477Z" clipRule="evenodd" />
                            </svg>
                            {info}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 md:p-10 bg-slate-800/80 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Bundled Monthly Rate</p>
                <p className="text-white text-3xl font-black">₦{selectedDetailTrainer.instructorProfile?.monthlyRate?.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedDetailTrainer(null)}
                  className="flex-1 sm:flex-none px-8 py-4 text-slate-400 hover:text-white font-black uppercase tracking-widest transition-all"
                >
                  Close
                </button>
                {userData ? (
                   userData.selectedInstructor === selectedDetailTrainer._id ? (
                    <button 
                      disabled
                      className="flex-1 sm:flex-none px-10 py-4 bg-emerald-500/20 text-emerald-400 font-black rounded-2xl border border-emerald-500/30 flex items-center justify-center gap-2 cursor-default"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Assigned to Child
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        onEngage({ ...selectedDetailTrainer, id: selectedDetailTrainer._id });
                      }}
                      className="flex-1 sm:flex-none px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
                    >
                      Assign to Child
                    </button>
                  )
                ) : (
                  <button 
                    onClick={() => {
                      onEngage({
                        id: selectedDetailTrainer._id,
                        fullName: selectedDetailTrainer.fullName,
                        rate: selectedDetailTrainer.instructorProfile?.monthlyRate
                      });
                    }}
                    className="flex-1 sm:flex-none px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
                  >
                    Engage Trainer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrainers;
