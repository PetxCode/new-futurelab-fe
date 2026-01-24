import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Analytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analytics', {
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
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Processing Stats...</p>
      </div>
    );
  }

  const studyData = data?.studyData || [
    { day: 'Mon', hours: 0, points: 0 }, { day: 'Tue', hours: 0, points: 0 }, { day: 'Wed', hours: 0, points: 0 },
    { day: 'Thu', hours: 0, points: 0 }, { day: 'Fri', hours: 0, points: 0 }, { day: 'Sat', hours: 0, points: 0 }, { day: 'Sun', hours: 0, points: 0 }
  ];

  const skillMatrix = data?.skillMatrix || [];

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Performance Analytics</h1>
        <p className="text-slate-400 mt-1 font-medium italic">Measuring technical growth across all engineering disciplines.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Learning Momentum */}
        <div className="bg-slate-800 p-10 rounded-[3rem] border border-slate-700/50 shadow-2xl">
           <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Learning Momentum</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Daily study intensity and task completion</p>
              </div>
           </div>
           
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                   <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                   <XAxis 
                     dataKey="day" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                   />
                   <YAxis hide />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #334155', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} 
                     itemStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                   />
                   <Legend 
                     verticalAlign="top" 
                     align="right" 
                     iconType="circle"
                     content={({ payload }) => (
                       <div className="flex justify-end space-x-6 mb-8">
                         {payload?.map((entry: any, index: number) => (
                           <div key={`item-${index}`} className="flex items-center space-x-2">
                             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{entry.value}</span>
                           </div>
                         ))}
                       </div>
                     )}
                   />
                   <Area 
                     type="monotone" 
                     dataKey="hours" 
                     name="Hours" 
                     stroke="#6366f1" 
                     strokeWidth={4}
                     fillOpacity={1} 
                     fill="url(#colorHours)" 
                   />
                   <Area 
                     type="monotone" 
                     dataKey="points" 
                     name="Tasks" 
                     stroke="#22d3ee" 
                     strokeWidth={4}
                     fillOpacity={1} 
                     fill="url(#colorPoints)" 
                   />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Skill Matrix */}
        <div className="bg-slate-800 p-10 rounded-[3rem] border border-slate-700/50 shadow-2xl">
           <div className="mb-10">
              <h3 className="text-2xl font-black text-white tracking-tight">Skill Matrix</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Current Mastery Levels</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {skillMatrix.length > 0 ? skillMatrix.map((s: any) => (
                <div key={s.skill} className="space-y-4">
                   <div className="flex justify-between items-end">
                      <div>
                        <span className="text-white font-black text-lg tracking-tight block">{s.skill}</span>
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Verified Mastery</span>
                      </div>
                      <span className="text-2xl font-black text-white">{s.level}%</span>
                   </div>
                   <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full ${s.color} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,0,0,0.4)]`} style={{ width: `${s.level}%` }} />
                   </div>
                </div>
              )) : (
                <div className="col-span-2 py-10 text-center text-slate-500 font-bold italic">
                  Start learning to populate your skill matrix.
                </div>
              )}
           </div>
        </div>
      </div>

      <div className="bg-slate-800/50 p-10 rounded-[3rem] border border-slate-700/50">
         <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center text-4xl shadow-2xl animate-pulse">
               🚀
            </div>
            <div>
               <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Projection: {data?.projection?.status || 'Active Learner'}</h3>
               <p className="text-slate-400 font-medium leading-relaxed">
                  Based on your actual engagement in technical modules, your mastery is reaching new heights. Your consistency in completing targeted training is significantly improving your trajectory.
               </p>
               <div className="mt-6 flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-700 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Next Milestone: {data?.projection?.nextMilestone || 'Wait...'}</div>
                  <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-700 text-[10px] font-black text-emerald-400 uppercase tracking-widest">Status: Verified</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
