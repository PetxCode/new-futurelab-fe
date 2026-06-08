import React, { useState, useEffect } from 'react';
import { SUBJECTS, SUGGESTED_RESOURCES } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LearningResource, NavigationItem, Mission, DashboardData, User } from '../types';
import MissionDetails from './MissionDetails';
import CurriculumView from './CurriculumView';
import TermsFocus from './TermsFocus';
import CodePlayground from './CodePlayground';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

const Dashboard: React.FC<{ 
  userData: User | null; 
  onNavigate?: (tab: NavigationItem) => void;
  onBlogClick?: (slug: string) => void;
}> = ({ userData, onNavigate, onBlogClick }) => {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('week');
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState<LearningResource[]>(SUGGESTED_RESOURCES);
  const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [showTermsFocus, setShowTermsFocus] = useState(false);
  const [showCodePlayground, setShowCodePlayground] = useState(false);

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

    const fetchBlogPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/blog`);
        const posts = await res.json();
        if (Array.isArray(posts)) {
          setBlogPosts(posts.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      }
    };

    const fetchCalendarEvents = async () => {
      if (userData?.schoolName) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/calendar/${encodeURIComponent(userData.schoolName)}`, {
             headers: { 'x-auth-token': localStorage.getItem('token') || '' }
          });
          if (res.ok) {
            const events = await res.json();
            setCalendarEvents(events);
          }
        } catch (err) {
          console.error('Error fetching calendar events:', err);
        }
      }
    };

    fetchDashboardData();
    fetchBlogPosts();
    fetchCalendarEvents();
  }, [timeframe, userData?.schoolName]);

  const metrics = [
    { label: 'Current GPA', value: data?.summary?.gpa || '0.00', color: 'text-indigo-400', percentage: 4 },
    { label: 'Intensity Points', value: (data?.summary?.techChamp || 0).toString(), color: 'text-sky-400', percentage: 22 },
    { label: 'Lab Hours', value: `${data?.summary?.labHours || 0}h`, color: 'text-rose-400', percentage: 12 },
    { label: 'Learning Efficiency', value: `${data?.summary?.efficiency || 0}%`, color: 'text-cyan-400', percentage: 0 },
  ];

  if (selectedMission && selectedResource) {
    return (
      <MissionDetails 
        mission={{
           ...selectedResource,
           ...selectedMission,
           category: selectedResource.category,
           estimatedTime: selectedResource.estimatedTime,
           isLocked: selectedMission.isLocked,
           isCompleted: selectedMission.isCompleted
        } as any} 
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
        user={userData}
        resource={selectedResource}
        onBack={() => setSelectedResource(null)}
        onMissionClick={handleMissionClick}
      />
    );
  }
  
  if (showCodePlayground) {
    return (
      <CodePlayground 
        onBack={() => setShowCodePlayground(false)}
      />
    );
  }

  if (showTermsFocus) {
    return (
      <TermsFocus 
        onBack={() => setShowTermsFocus(false)}
        onNavigate={(tab) => {
          setShowTermsFocus(false);
          onNavigate?.(tab);
        }}
        onOpenPlayground={() => setShowCodePlayground(true)}
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
            onClick={() => setShowTermsFocus(true)}
            className="mt-6 w-full py-3 bg-white text-indigo-600 font-black rounded-2xl text-sm shadow-xl hover:bg-indigo-50 transition-colors"
          >
            Terms Focus <span className='text-[10px] text-red-500'>(Click Here)</span>
          </button>
        </div>
      </div>

      {/* School Calendar Section */}
      {userData?.schoolName && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-white">School Curriculum Calendar</h3>
              <p className="text-slate-500 text-sm font-medium">Topics covered recently at {userData.schoolName}</p>
            </div>
            <div className="p-3 bg-indigo-600/10 rounded-2xl border border-indigo-500/20">
               <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calendarEvents.length > 0 ? (
              calendarEvents.map((event) => (
                <div key={event._id} className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 hover:border-indigo-500/50 transition-colors group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 font-black">
                      {new Date(event.date).getDate()}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg leading-tight group-hover:text-indigo-300 transition-colors">{event.topic}</div>
                      <div className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 bg-slate-800/40 border border-slate-700/50 rounded-[2rem] text-center">
                <p className="text-slate-500 font-medium italic">No recent curriculum events posted yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Section (Replacing Subjects) */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-white">Latest Blogs</h3>
            <p className="text-slate-500 text-sm font-medium">Insights and updates from the FutureLab's content room</p>
          </div>
          {(userData?.isAdmin || userData?.isInstructor) && (
            <button 
              onClick={() => onNavigate?.('Signal Control')}
              className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-600/10"
              title="New Blog Post"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <div 
                key={post._id} 
                onClick={() => onBlogClick?.(post.slug)}
                className="bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] overflow-hidden group hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  {post.coverImage ? (
                    <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  ) : (
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center p-6">
                      <img src="/logo.png" alt="FutureLab" className="h-8 w-auto object-contain opacity-30 mix-blend-overlay" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-6">
                    <div className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white bg-indigo-500 shadow-xl">
                       {post.tags[0] || 'BLOG'}
                    </div>
                  </div>
                </div>
                <div className="p-8 pb-10 flex flex-col flex-1">
                  <h4 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight mb-4">
                    {post.title}
                  </h4>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase border border-slate-600">
                        {post.author?.fullName?.charAt(0) || 'U'}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {post.author?.fullName || 'Anonymous'}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-900/50 px-2 py-1 rounded-lg">
                      {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Fallback to subjects if no pins found (or while loading)
            SUBJECTS.map((sub) => (
              <div key={sub.id} className="opacity-40 bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 text-center text-slate-500 italic font-medium">
                  loading blogs...
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
