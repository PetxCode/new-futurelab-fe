import React, { useState, useEffect } from 'react';
import { SUBJECTS, SUGGESTED_RESOURCES } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LearningResource, NavigationItem, Mission, DashboardData } from '../types';
import MissionDetails from './MissionDetails';
import CurriculumView from './CurriculumView';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

const Dashboard: React.FC<{ onNavigate?: (tab: NavigationItem) => void }> = ({ onNavigate }) => {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('week');
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState<LearningResource[]>(SUGGESTED_RESOURCES);
  const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  // Sync resources with constants if they change in dev
  useEffect(() => {
    setResources(SUGGESTED_RESOURCES);
  }, []);

  const handleResourceClick = (res: LearningResource) => {
    // Find the current state of this resource
    const currentRes = resources.find(r => r.id === res.id) || res;
    
    // If no missions are defined, navigate directly to the engine (backward compatibility)
    if (!currentRes.missions || currentRes.missions.length === 0) {
      if (currentRes.title === 'Python Engine' || currentRes.title === 'TensorFlow 2.0 Workshop' || currentRes.category === 'AI' || currentRes.category === 'Practice') {
        onNavigate('Python Engine');
      } else {
        onNavigate('Engine Blocks');
      }
      return;
    }

    setSelectedResource(currentRes);
    setSelectedMission(null);
  };

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
  };

  const handleMissionComplete = async (score: number) => {
    if (!selectedMission || !selectedResource) return;

    // Log to backend
    try {
      await fetch(`${API_BASE_URL}/api/analytics/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({
          type: 'quiz',
          title: selectedMission.title,
          category: selectedResource.category,
          points: parseInt(selectedMission.reward.replace(' XP', '')) || 1,
          score: Math.round(score)
        }),
      });
    } catch (err) {
      console.error('Error logging activity:', err);
    }

    const updatedResources = resources.map(res => {
      if (res.id === selectedResource.id) {
        const updatedMissions = res.missions?.map(m => {
          if (m.id === selectedMission.id) {
            return { ...m, isCompleted: true };
          }
          // Unlock any mission that requires this one
          if (m.unlockRequirement === selectedMission.title) {
            return { ...m, isLocked: false };
          }
          return m;
        });
        return { ...res, missions: updatedMissions };
      }
      return res;
    });

    setResources(updatedResources);
    
    // Update selected resource/mission refs if needed
    const updatedRes = updatedResources.find(r => r.id === selectedResource.id);
    if (updatedRes) setSelectedResource(updatedRes);
    
    toast.success(`${selectedMission.title} marked as done! Next mission unlocked.`);
    setSelectedMission(null); // Return to curriculum view
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/analytics?timeframe=${timeframe}&t=${Date.now()}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') || '' }
        });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [timeframe]);

  const metrics = [
    { label: 'Current GPA', value: data?.summary?.gpa || '0.00', color: 'text-indigo-400', percentage: 4 },
    { label: 'Intensity Points', value: (data?.summary?.techChamp || 0).toString(), color: 'text-violet-400', percentage: 22 },
    { label: 'Lab Hours', value: `${data?.summary?.labHours || 0}h`, color: 'text-fuchsia-400', percentage: 12 },
    { label: 'Learning Efficiency', value: `${data?.summary?.efficiency || 0}%`, color: 'text-cyan-400', percentage: 0 },
  ];

  if (selectedMission && selectedResource) {
    return (
      <MissionDetails 
        mission={{
           ...selectedResource,
           title: selectedMission.title,
           description: selectedMission.description,
           longDescription: selectedMission.longDescription,
           lectureContent: selectedMission.lectureContent,
           practiceTest: selectedMission.practiceTest,
           bannerImage: selectedMission.bannerImage,
           difficulty: selectedMission.difficulty,
           reward: selectedMission.reward,
           icon: selectedMission.icon,
           tags: selectedMission.tags
        }} 
        onBack={() => setSelectedMission(null)} 
        onSolve={(tab) => {
          setSelectedMission(null);
          setSelectedResource(null);
          onNavigate(tab);
        }}
        onComplete={handleMissionComplete}
      />
    );
  }

  if (selectedResource) {
    return (
      <CurriculumView 
        resource={selectedResource}
        onBack={() => setSelectedResource(null)}
        onMissionClick={handleMissionClick}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Academic Overview</h1>
          <p className="text-slate-400 mt-1 font-medium italic">"The beautiful thing about learning is that no one can take it away from you."</p>
        </div>
        <div className="flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
           {(['today', 'week', 'month'] as const).map((t) => (
             <button 
               key={t}
               onClick={() => setTimeframe(t)}
               className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${timeframe === t ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
             >
               {t.charAt(0).toUpperCase() + t.slice(1)}
             </button>
           ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/40 hover:border-indigo-500/30 transition-all hover:translate-y-[-4px] group">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">{metric.label}</span>
              <div className={`p-2 rounded-xl bg-slate-900 ${metric.color}`}>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tighter">{metric.value}</span>
              {metric.percentage !== 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400`}>
                  +{metric.percentage}%
                </span>
              )}
            </div>
            <div className="w-full h-1 bg-slate-700 mt-4 rounded-full overflow-hidden">
               <div className={`h-full opacity-60 bg-current ${metric.color}`} style={{ width: '70%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Stats Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800 p-8 rounded-[2rem] border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-white">Learning Momentum</h3>
              <p className="text-slate-400 text-sm font-medium">Daily study intensity and task completion</p>
            </div>
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                  <span>Hours</span>
               </div>
               <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                  <span>Tasks</span>
               </div>
            </div>
          </div>
          
          <div className="h-80 w-full">
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.studyData || []}>
                  <defs>
                    <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="hours" name="Study Hours" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorStudy)" />
                  <Area type="monotone" dataKey="points" name="Tasks Points" stroke="#22d3ee" strokeWidth={4} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Quest Log / Resources */}
        <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl shadow-indigo-500/20 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <h3 className="text-xl font-black text-white mb-1 relative">Study Quests</h3>
          <p className="text-indigo-100 text-xs mb-6 font-bold relative opacity-80 uppercase tracking-widest">Recommended Challenges</p>
          
          <div className="space-y-4 flex-1">
            {resources.map((res: LearningResource) => (
              <div 
                key={res.id} 
                onClick={() => handleResourceClick(res)}
                className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                    {res.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-white truncate tracking-wider">{res.title}</h4>
                    <p className="text-[10px] text-indigo-100 font-bold uppercase opacity-70">{res.category} • {res.difficulty}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                   <div className="flex items-center space-x-1.5">
                      <div className="px-2 py-0.5 rounded bg-amber-400 text-amber-900 text-[9px] font-black uppercase">{res.reward}</div>
                      <span className="text-[10px] text-indigo-500 bg-white px-2 py-0.5 rounded font-black">{res.estimatedTime}</span>
                   </div>
                   <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="mt-6 w-full py-3 bg-white text-indigo-600 font-black rounded-2xl text-sm shadow-xl hover:bg-indigo-50 transition-colors"
          >
            Discover Library <span className='text-[10px] text-red-500'>(coming soon)</span>
          </button>
        </div>
      </div>

      {/* Subject Cards */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-white">Active Subjects</h3>
            <p className="text-slate-500 text-sm font-medium">Your core curriculum and current standings</p>
          </div>
          <button className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400 hover:text-white transition-all">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBJECTS.map((sub) => (
            <div key={sub.id} className="bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] overflow-hidden group hover:border-indigo-500/50 transition-all">
              <div className="relative h-48">
                <img src={sub.thumbnail} alt={sub.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6">
                   <span className="text-white text-3xl font-black tracking-tighter">{sub.grade}</span>
                </div>
                <div className="absolute top-4 right-6">
                   <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-xl ${
                     sub.status === 'Exam Prep' ? 'bg-rose-500' : sub.status === 'Needs Review' ? 'bg-amber-500' : 'bg-emerald-500'
                   }`}>
                     {sub.status}
                   </div>
                </div>
              </div>
              <div className="p-8">
                 <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">{sub.title}</h4>
                 </div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Instructor: {sub.teacher}</p>
                 
                 <div className="space-y-3">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syllabus Progress</span>
                       <span className="text-sm font-black text-white">{sub.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full p-[2px]">
                       <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${sub.progress}%` }} />
                    </div>
                 </div>
                 
                 <div className="mt-8 grid grid-cols-2 gap-3">
                    <button className="py-2.5 bg-slate-900 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">Study Notes</button>
                    <button className="py-2.5 bg-indigo-600/10 text-indigo-400 text-xs font-bold rounded-xl border border-indigo-500/20 hover:bg-indigo-600/20 transition-colors">Exam Prep</button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
