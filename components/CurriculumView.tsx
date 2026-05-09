import { LearningResource, Mission, User } from '../types';
import toast from 'react-hot-toast';

interface CurriculumViewProps {
  user: User | null;
  resource: LearningResource;
  onBack: () => void;
  onMissionClick: (mission: Mission) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ user, resource, onBack, onMissionClick }) => {
  const isRoadmap = resource.title === 'Curriculum' || resource.tags?.includes('Roadmap');

  const isAccessible = (mission: Mission) => {
    // No restriction: all users should be able to access all missions
    return true;
  };
  // Group missions by educational tier
  const roadmapTiers = [
    { 
      name: 'Primary Education', 
      color: 'emerald', 
      range: ['cur-p4', 'cur-p5', 'cur-p6'],
      gradient: 'from-emerald-400 to-teal-500',
      bgLight: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    { 
      name: 'Junior Secondary', 
      color: 'indigo', 
      range: ['cur-j1', 'cur-j2', 'cur-j3'],
      gradient: 'from-indigo-400 to-blue-500',
      bgLight: 'bg-indigo-500/10',
      border: 'border-indigo-500/20'
    },
    { 
      name: 'Senior Secondary', 
      color: 'slate', 
      range: ['cur-s1', 'cur-s2', 'cur-s3'],
      gradient: 'from-slate-400 to-slate-600',
      bgLight: 'bg-slate-500/10',
      border: 'border-slate-500/20'
    }
  ];

  // Identifer missions that don't fit into the roadmap tiers
  const roadmapMissionIds = roadmapTiers.flatMap(t => t.range);
  const generalMissions = resource.missions?.filter(m => !roadmapMissionIds.includes(m.id)) || [];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/5">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onBack}
            className="group p-4 bg-slate-800/80 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-95 hover:bg-slate-700 shadow-xl"
          >
            <svg className="w-6 h-6 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-indigo-500/20 shadow-sm">{resource.category || 'Learning Path'}</span>
              <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{resource.difficulty || 'All Levels'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
              {resource.title}
            </h1>
          </div>
        </div>
        <div className="hidden lg:block text-right">
           <p className="text-slate-500 text-sm font-medium italic max-w-xs ml-auto">
             {isRoadmap ? "\"A comprehensive journey from digital logic to frontier artificial intelligence.\"" : "\"Master the skills through focused module sequences.\""}
           </p>
        </div>
      </div>

      {/* Roadmap Container */}
      <div className="relative pl-12 md:pl-20">
        {/* The Vertical Line/Path */}
        <div className="absolute left-[47px] md:left-[79px] top-8 bottom-8 w-1.5 bg-gradient-to-b from-emerald-500 via-indigo-600 to-slate-800 rounded-full opacity-10" />

        <div className="space-y-32">
          {/* 1. Roadmap Tiers (Educational Phases) */}
          {roadmapTiers.map((tier) => {
            const tierMissions = resource.missions?.filter(m => tier.range.includes(m.id)) || [];
            if (tierMissions.length === 0) return null;

            return (
              <div key={tier.name} className="relative">
                <div className="mb-12 ml-10 md:ml-6">
                   <div className={`inline-flex items-center px-4 py-2 ${tier.bgLight} ${tier.border} border rounded-2xl mb-4`}>
                      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/90">{tier.name}</h2>
                   </div>
                   <p className="text-slate-500 text-sm font-medium">Mastering the fundamentals for this educational phase.</p>
                </div>

                <div className="space-y-16">
                  {tierMissions.map((mission) => (
                    <div 
                      key={mission.id}
                      onClick={() => {
                        const accessible = isAccessible(mission);
                        if (accessible) {
                          onMissionClick(mission);
                        } else {
                          toast.error(`This roadmap is for ${mission.tags[0] || 'another class'}. Please stick to your ${user?.grade || 'assigned'} curriculum!`, {
                            icon: '🔒',
                            style: {
                              borderRadius: '1.5rem',
                              background: '#1e293b',
                              color: '#fff',
                              border: '1px solid rgba(255,255,255,0.1)'
                            }
                          });
                        }
                      }}
                      className={`relative flex items-start group ${isAccessible(mission) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    >
                      {/* Node/Point on the line */}
                      <div className={`absolute -left-12 md:-left-20 w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] md:rounded-[2.2rem] flex items-center justify-center text-2xl md:text-3xl z-10 border-8 border-[#0f172a] transition-all duration-700 group-hover:duration-300 ${
                        mission.isCompleted ? 'bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)] rotate-3' :
                        !isAccessible(mission) ? 'bg-slate-800 text-slate-600 scale-90 grayscale' : 
                        `bg-slate-700 text-white group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-2xl shadow-[0_0_30px_rgba(99,102,241,0.2)]`
                      }`}>
                        {mission.icon}
                        {isAccessible(mission) && !mission.isCompleted && (
                          <div className={`absolute -inset-1 rounded-[2rem] border-2 border-indigo-500/30 animate-pulse`} />
                        )}
                      </div>

                      {/* Content Card */}
                      <div className={`ml-10 md:ml-6 flex-1 bg-slate-800/20 backdrop-blur-xl rounded-[3rem] border-2 p-10 md:p-12 transition-all duration-700 group-hover:duration-300 ${
                        !isAccessible(mission) 
                          ? 'border-white/[0.02] opacity-40 bg-transparent grayscale pointer-events-none' 
                          : 'border-white/[0.05] hover:border-indigo-500/30 group-hover:bg-slate-800/40 group-hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)] group-hover:-translate-y-2'
                      }`}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                          <div className="space-y-2">
                            <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${!isAccessible(mission) ? 'text-slate-600' : 'text-white group-hover:text-indigo-400'} transition-colors`}>
                              {mission.title}
                            </h3>
                            <div className="flex items-center gap-3">
                               <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                 !isAccessible(mission) ? 'bg-slate-800 text-slate-600' :
                                 mission.difficulty === 'Elementary' ? 'bg-emerald-500/10 text-emerald-400' :
                                 mission.difficulty === 'Junior' ? 'bg-indigo-500/10 text-indigo-400' :
                                 'bg-slate-500/10 text-slate-400'
                               }`}>
                                 {mission.difficulty}
                               </span>
                               {mission.reward && isAccessible(mission) && (
                                 <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 rounded-lg">
                                   <span className="text-amber-400 text-xs text-[10px] font-black uppercase tracking-widest">+{mission.reward}</span>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>

                        <p className={`font-medium leading-relaxed max-w-3xl mb-10 text-lg ${!isAccessible(mission) ? 'text-slate-700' : 'text-slate-400'}`}>
                          {mission.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5">
                          {mission.tags.map((tag, i) => (
                            <span key={i} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                              !isAccessible(mission) ? 'bg-slate-900/40 text-slate-700 border-white/5' : 'bg-[#0f172a]/80 text-slate-500 border-white/5'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* 2. General Modules (Any missions not in special tiers) */}
          {generalMissions.length > 0 && (
            <div className="relative">
              <div className="mb-12 ml-10 md:ml-6">
                 <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-4">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/90">Curriculum Modules</h2>
                 </div>
                 <p className="text-slate-500 text-sm font-medium">A structured sequence of modules to master this subject.</p>
              </div>

              <div className="space-y-16">
                {generalMissions.map((mission) => {
                  const accessible = isAccessible(mission);
                  return (
                    <div 
                      key={mission.id}
                      onClick={() => {
                        if (accessible) {
                          onMissionClick(mission);
                        }
                      }}
                      className={`relative flex items-start group ${accessible ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    >
                      <div className={`absolute -left-12 md:-left-20 w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] md:rounded-[2.2rem] flex items-center justify-center text-2xl md:text-3xl z-10 border-8 border-[#0f172a] transition-all duration-700 group-hover:duration-300 ${
                        mission.isCompleted ? 'bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)] rotate-3' :
                        !accessible ? 'bg-slate-800 text-slate-600 scale-90 grayscale' : 
                        `bg-indigo-600 text-white group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-2xl shadow-[0_0_30px_rgba(79,70,229,0.3)]`
                      }`}>
                        {!accessible ? '🔒' : mission.icon}
                      </div>

                      <div className={`ml-10 md:ml-6 flex-1 bg-slate-800/20 backdrop-blur-xl rounded-[3rem] border-2 p-10 md:p-12 transition-all duration-700 group-hover:duration-300 ${
                        !accessible 
                          ? 'border-white/[0.02] opacity-40 bg-transparent grayscale pointer-events-none' 
                          : 'border-white/[0.05] hover:border-indigo-500/30 group-hover:bg-slate-800/40 group-hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)] group-hover:-translate-y-2'
                      }`}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                          <div className="space-y-2">
                            <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${!accessible ? 'text-slate-600' : 'text-white group-hover:text-indigo-400'} transition-colors`}>
                              {mission.title}
                            </h3>
                            <div className="flex items-center gap-3">
                               <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                 !accessible ? 'bg-slate-800 text-slate-600' : 'bg-slate-500/10 text-slate-400'
                               }`}>
                                 {mission.difficulty}
                               </span>
                               {mission.reward && accessible && (
                                 <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 rounded-lg">
                                   <span className="text-amber-400 text-xs text-[10px] font-black uppercase tracking-widest">+{mission.reward}</span>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                        <p className={`font-medium leading-relaxed max-w-3xl mb-10 text-lg ${!accessible ? 'text-slate-700' : 'text-slate-400'}`}>
                          {mission.description}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {mission.tags.map((tag, i) => (
                            <span key={i} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                              !accessible ? 'bg-slate-900/40 text-slate-700 border-white/5' : 'bg-[#0f172a]/80 text-slate-500 border-white/5'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurriculumView;
