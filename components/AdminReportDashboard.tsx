import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { API_BASE_URL } from '../App';

const AdminReportDashboard: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reports/school`, {
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      });
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: reports.length,
    withChallenges: reports.filter(r => r.challenges && r.challenges.length > 10).length,
    latestReport: reports[0]?.date ? new Date(reports[0].date).toLocaleDateString() : 'N/A'
  };

  const chartData = [
    { name: 'Success', value: stats.total - stats.withChallenges },
    { name: 'Challenges', value: stats.withChallenges },
  ];

  const COLORS = ['#10b981', '#f43f5e'];

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 animate-fade-in">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2 italic tracking-tighter">School Report Insight</h1>
        <p className="text-slate-400">Tracking learning progress and instructor feedback channels.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl italic font-black text-white">REPORTS</span>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Total Submissions</p>
          <h2 className="text-5xl font-black text-white tabular-nums">{stats.total}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-rose-500">
             ⚠️
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Issue Alerts</p>
          <h2 className="text-5xl font-black text-rose-500 tabular-nums">{stats.withChallenges}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Last Update</p>
          <h2 className="text-3xl font-black text-indigo-400">{stats.latestReport}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Report List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Instructor Feedback Stream</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
            
            <div className="divide-y divide-slate-800 max-h-[800px] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="p-8 space-y-4 animate-pulse">
                  {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-800/50 rounded-2xl"></div>)}
                </div>
              ) : reports.length === 0 ? (
                <div className="p-20 text-center">
                  <span className="text-5xl mb-4 block">📝</span>
                  <p className="text-slate-400 font-medium">No reports available yet.</p>
                </div>
              ) : (
                reports.map((report) => (
                  <div
                    key={report._id}
                    onClick={() => setSelectedReport(report)}
                    className={`p-6 hover:bg-slate-800/50 transition-all cursor-pointer group ${selectedReport?._id === report._id ? 'bg-indigo-600/10 border-l-4 border-indigo-500' : report.challenges ? 'border-l-4 border-rose-500/40' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Topic</span>
                        <h4 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors uppercase italic">{report.topic}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="inline-block text-[9px] font-black text-white bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-lg uppercase tracking-widest">
                            🏫 {report.schoolName}
                          </span>
                          {report.classIntake && (
                            <span className="inline-block text-[9px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-lg uppercase tracking-widest">
                              📚 {report.classIntake}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-xs font-medium text-slate-500">{new Date(report.date).toLocaleDateString()}</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{report.instructorName}</p>
                        {report.challenges ? (
                          <span className="inline-flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            Challenge Flagged
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            All Clear
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Details & Charts Side */}
        <div className="space-y-8">
          {/* Chart Card */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
             <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-center">Efficiency Balance</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Alerts</span>
                </div>
             </div>
          </div>

          {/* Report Details View */}
          {selectedReport ? (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-black text-white mb-6 uppercase italic">Full Insight</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Institution</label>
                    <span className="inline-block text-sm font-bold text-white bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl">
                      🏫 {selectedReport.schoolName}
                    </span>
                  </div>
                  {selectedReport.classIntake && (
                    <div>
                      <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1 block">Class Intake</label>
                      <span className="inline-block text-sm font-bold text-white bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-2xl">
                        📚 {selectedReport.classIntake}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Content Delivered</label>
                   <p className="text-sm font-medium text-slate-300 leading-relaxed">{selectedReport.contentTaught}</p>
                </div>
                
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Student Progress Average</label>
                   <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-2xl">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-indigo-100 italic">Score: {selectedReport.studentProgress}/10</span>
                        <span className="text-[10px] font-black text-indigo-400 capitalize">
                          {selectedReport.studentProgress >= 8 ? 'Exceptional' : selectedReport.studentProgress >= 5 ? 'Steady' : 'Needs Support'}
                        </span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${selectedReport.studentProgress >= 8 ? 'bg-emerald-500' : selectedReport.studentProgress >= 5 ? 'bg-indigo-500' : 'bg-rose-500'}`}
                          style={{ width: `${(selectedReport.studentProgress / 10) * 100}%` }}
                        />
                     </div>
                   </div>
                </div>

                <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl">
                   <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1 block italic">Instructor's Challenges</label>
                   <p className="text-sm font-medium text-rose-100 leading-relaxed">{selectedReport.challenges || 'No challenges reported.'}</p>
                </div>

                {selectedReport.recommendations && (
                  <div>
                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 block">Actionable Feedback</label>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">{selectedReport.recommendations}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 border-dashed p-12 rounded-[2.5rem] text-center">
              <span className="text-4xl opacity-20 block mb-4 italic font-black">SELECT</span>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Select a report to view full insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReportDashboard;
