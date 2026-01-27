import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { API_BASE_URL } from '../App';

const Analytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/analytics`, {
          headers: {
            'x-auth-token': localStorage.getItem('token') || '',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#DBB468] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#DBB468] font-mono text-xs uppercase tracking-widest">Loading Analytics...</p>
      </div>
    );
  }

  const studyData = data?.studyData || [];
  const skillMatrix = data?.skillMatrix || [];
  const lifetime = data?.lifetime || { totalPoints: 0, totalHours: 0, totalActivities: 0, completedCourses: 0 };
  const recentQuests = data?.recentQuests || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-mono text-slate-200">
      
      {/* Header Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Points (Gold Highlight) */}
        <div className="bg-[#0f0f0f] border border-[#DBB468] p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-50">
             <svg className="w-8 h-8 text-[#DBB468]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <p className="text-[#666] text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-[#DBB468] transition-colors">Total XP</p>
          <h2 className="text-4xl font-black text-white">{lifetime.totalPoints.toLocaleString()} <span className="text-[#DBB468] text-lg">XP</span></h2>
          <p className="text-[#444] text-[10px] mt-2 uppercase tracking-wider">Lifetime Accumulation</p>
        </div>

        {/* Card 2: Hours */}
        <div className="bg-[#0f0f0f] border border-[#222] p-6 rounded-2xl relative overflow-hidden group hover:border-[#333] transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-30">
             <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <p className="text-[#666] text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-slate-300 transition-colors">Time Invested</p>
          <h2 className="text-4xl font-black text-white">{lifetime.totalHours} <span className="text-slate-500 text-lg">HRS</span></h2>
          <p className="text-[#444] text-[10px] mt-2 uppercase tracking-wider">Total Duration</p>
        </div>

        {/* Card 3: Activities */}
        <div className="bg-[#0f0f0f] border border-[#222] p-6 rounded-2xl relative overflow-hidden group hover:border-[#333] transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-30">
             <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
             </svg>
          </div>
          <p className="text-[#666] text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-slate-300 transition-colors">Activities</p>
          <h2 className="text-4xl font-black text-white">{lifetime.totalActivities}</h2>
          <p className="text-[#444] text-[10px] mt-2 uppercase tracking-wider">Sessions & Tasks</p>
        </div>

        {/* Card 4: Courses */}
        <div className="bg-[#0f0f0f] border border-[#222] p-6 rounded-2xl relative overflow-hidden group hover:border-[#333] transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-30">
             <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
             </svg>
          </div>
          <p className="text-[#666] text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-slate-300 transition-colors">Courses</p>
          <h2 className="text-4xl font-black text-white">{lifetime.completedCourses}</h2>
          <p className="text-[#444] text-[10px] mt-2 uppercase tracking-wider">Completed Tracks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Acquisition / Activity Trend */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-3xl p-8 relative">
           <div className="flex items-center gap-2 mb-8">
              <span className="text-[#DBB468] text-lg">⚡</span>
              <h3 className="text-white font-bold text-sm tracking-[0.2em] uppercase">Activity Trend</h3>
           </div>
           
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData}>
                  <defs>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DBB468" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#DBB468" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10, fontWeight: 700 }} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px' }}
                    itemStyle={{ color: '#DBB468', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                    labelStyle={{ color: '#666', fontSize: '10px', marginBottom: '5px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" // Or points? Let's use hours for "Activity"
                    stroke="#DBB468" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorGold)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="absolute bottom-4 left-8 text-[10px] text-[#444] font-bold uppercase tracking-widest">
              Last 7 Days Activity
           </div>
        </div>

        {/* Skill Matrix Bar Chart */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-3xl p-8">
           <div className="flex items-center gap-2 mb-8">
              <span className="text-[#DBB468] text-lg">⚓</span>
              <h3 className="text-white font-bold text-sm tracking-[0.2em] uppercase">Skill Matrix</h3>
           </div>

           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={skillMatrix} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#222" />
                 <XAxis type="number" hide domain={[0, 100]} />
                 <YAxis 
                   dataKey="skill" 
                   type="category" 
                   axisLine={false} 
                   tickLine={false} 
                   width={100}
                   tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} 
                 />
                 <Tooltip 
                    cursor={{fill: '#111'}}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px' }}
                    itemStyle={{ color: '#fff' }}
                 />
                 <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={20}>
                    {skillMatrix.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#333' : '#DBB468'} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Raw Matrix Output (Table) */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-bold text-sm tracking-[0.2em] uppercase">Recent Activity</h3>
            <div className="text-[#444] text-[10px] uppercase font-bold tracking-widest">Raw Matrix Output</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="py-4 text-[#444] text-[10px] font-bold uppercase tracking-widest w-1/4">Activity</th>
                <th className="py-4 text-[#444] text-[10px] font-bold uppercase tracking-widest w-1/4">Category</th>
                <th className="py-4 text-[#444] text-[10px] font-bold uppercase tracking-widest w-1/4">Date</th>
                <th className="py-4 text-[#444] text-[10px] font-bold uppercase tracking-widest w-1/4 text-right">Reward</th>
              </tr>
            </thead>
            <tbody>
              {recentQuests.map((quest: any, i: number) => (
                <tr key={quest.id || i} className="group hover:bg-[#111] transition-colors border-b border-[#111]">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg opacity-50 grayscale group-hover:grayscale-0 transition-all">{quest.icon}</span>
                      <span className="font-bold text-slate-300 text-xs sm:text-sm">{quest.title}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-500 text-xs font-mono">{quest.category}</td>
                  <td className="py-4 text-slate-500 text-xs font-mono">
                    {new Date(quest.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right">
                    <span className="inline-block px-2 py-1 bg-[#DBB468]/10 text-[#DBB468] text-[10px] font-bold rounded border border-[#DBB468]/20">
                      {quest.reward}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentQuests.length === 0 && (
            <p className="text-center py-8 text-[#444] text-xs font-mono">No recent activity detected.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Analytics;
