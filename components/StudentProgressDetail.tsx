import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { User } from './AdminUsers';
import { API_BASE_URL } from '../App';

interface StudentProgressDetailProps {
  user: User;
  onBack: () => void;
}

const StudentProgressDetail: React.FC<StudentProgressDetailProps> = ({ user, onBack }) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentAnalytics = async () => {
      setIsLoading(true);
      try {
        // Fetch specific student analytics by passing user ID
        const response = await fetch(`${API_BASE_URL}/api/analytics?userId=${user._id}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token') || '',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        console.error('Error fetching student analytics:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudentAnalytics();
  }, [user._id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-400 font-bold animate-pulse">Scanning student's Profile...</p>
      </div>
    );
  }

  const studyData = data?.studyData || [];
  const skillMatrix = data?.skillMatrix || [];
  const lifetime = data?.lifetime || { totalPoints: 0, totalHours: 0, totalActivities: 0, completedCourses: 0 };
  const recentActivities = data?.recentActivities || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onBack}
            className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400 hover:text-white transition-all group"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">{user.fullName || (user as any).FullName}</h1>
            <p className="text-slate-500 font-medium">{user.email} • {user.schoolName || 'Independent Learner'}</p>
          </div>
        </div>
        <div className="hidden md:block">
           <div className="px-6 py-3 bg-indigo-600/10 rounded-2xl border border-indigo-500/20">
              <span className="text-indigo-400 font-black text-xs uppercase tracking-widest">Student's Analytics</span>
           </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 p-6 rounded-[2rem] border border-slate-700/50">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Points</p>
          <h3 className="text-3xl font-black text-white">{lifetime.totalPoints.toLocaleString()} <span className="text-indigo-500 text-sm">XP</span></h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-[2rem] border border-slate-700/50">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Current Level</p>
          <h3 className="text-3xl font-black text-white">LVL {Math.floor(lifetime.totalPoints / 1000) + 1}</h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-[2rem] border border-slate-700/50">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Lab Hours</p>
          <h3 className="text-3xl font-black text-white">{lifetime.totalHours} <span className="text-slate-500 text-sm">HRS</span></h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-[2rem] border border-slate-700/50">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Completed</p>
          <h3 className="text-3xl font-black text-white">{lifetime.completedCourses} <span className="text-slate-500 text-sm">TRACKS</span></h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Trend */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-white font-black text-sm uppercase tracking-widest">Engagement History</h3>
             <span className="text-indigo-400 text-xs font-bold uppercase">7 Day Interval</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studyData}>
                <defs>
                  <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorInd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Matrix */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-white font-black text-sm uppercase tracking-widest">Technical Proficiency</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillMatrix} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="skill" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  width={90}
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                />
                <Bar dataKey="level" radius={[0, 6, 6, 0]} barSize={24}>
                  {skillMatrix.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#475569'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Learning Track / Log */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-[3rem] p-10">
        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-8">Detailed Learning Track</h3>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((act: any, i: number) => (
              <div key={act.id || i} className="flex items-center justify-between p-6 bg-slate-900/50 rounded-2xl border border-slate-700/30 group hover:border-indigo-500/30 transition-all">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl">
                      {act.icon}
                   </div>
                   <div>
                      <h4 className="text-white font-bold">{act.title}</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mt-1">{act.category} • {new Date(act.createdAt).toLocaleDateString()}</p>
                   </div>
                </div>
                <div className="flex items-center space-x-4">
                   <span className="text-indigo-400 font-bold text-sm">+{act.reward} XP</span>
                   <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase rounded-lg">Verified</div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-500 font-bold italic">No learning modules completed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProgressDetail;
