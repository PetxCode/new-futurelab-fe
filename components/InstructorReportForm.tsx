import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

const InstructorReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    topic: '',
    contentTaught: '',
    studentProgress: 5,
    challenges: '',
    recommendations: '',
    schoolName: '',
    classIntake: '',
  });
  const [myReports, setMyReports] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [hasChallenges, setHasChallenges] = useState(false);

  useEffect(() => {
    fetchMyReports();
    fetchSchools();
  }, []);

  const fetchMyReports = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reports/my-reports`, {
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      });
      if (res.ok) {
        const data = await res.json();
        setMyReports(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const fetchSchools = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/schools`);
      if (res.ok) {
        const data = await res.json();
        setSchools(data);
      }
    } catch (err) {
      console.error('Error fetching schools:', err);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === 'studentProgress' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.schoolName) {
      toast.error('Please select a school');
      return;
    }
    if (!formData.classIntake.trim()) {
      toast.error('Please enter the class intake');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success('Report submitted successfully!');
        setFormData({
          topic: '',
          contentTaught: '',
          studentProgress: 5,
          challenges: '',
          recommendations: '',
          schoolName: '',
          classIntake: '',
        });
        setHasChallenges(false);
        fetchMyReports();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to submit report');
      }
    } catch (err: any) {
      toast.error('Network error. Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-2">Teaching Report</h2>
            <p className="text-slate-400 mb-8">Share your session insights and challenges with the school admin.</p>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Target School</label>
                  <select
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={onChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium appearance-none"
                  >
                    <option value="">Select a school...</option>
                    {schools.map((school) => (
                      <option key={school._id} value={school.name}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Class Intake</label>
                  <input
                    type="text"
                    name="classIntake"
                    value={formData.classIntake}
                    onChange={onChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium placeholder:text-slate-700"
                    placeholder="e.g. SSS3 Batch A / Intake 2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Today's Topic</label>
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={onChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium placeholder:text-slate-700"
                    placeholder="e.g. Python Loops & Lists"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Content Taught</label>
                <textarea
                  name="contentTaught"
                  value={formData.contentTaught}
                  onChange={onChange}
                  required
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium resize-none"
                  placeholder="Detail what concepts were covered..."
                />
              </div>

              <div className="gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex justify-between">
                    Student General Progress
                    <span className="text-indigo-400 font-black">{formData.studentProgress}/10</span>
                  </label>
                  <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4">
                    <input
                      type="range"
                      name="studentProgress"
                      min="1"
                      max="10"
                      step="1"
                      value={formData.studentProgress}
                      onChange={onChange}
                      className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setHasChallenges(!hasChallenges);
                      if (hasChallenges) setFormData(prev => ({ ...prev, challenges: '' }));
                    }}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${
                      hasChallenges ? 'bg-rose-500 shadow-lg shadow-rose-500/30' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                      hasChallenges ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none" onClick={() => {
                    setHasChallenges(!hasChallenges);
                    if (hasChallenges) setFormData(prev => ({ ...prev, challenges: '' }));
                  }}>
                    Challenges Faced
                    <span className={`ml-2 text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                      hasChallenges ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-600'
                    }`}>
                      {hasChallenges ? 'YES' : 'NO'}
                    </span>
                  </label>
                </div>
                {hasChallenges && (
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={onChange}
                    rows={4}
                    autoFocus
                    className="w-full bg-slate-950 border border-rose-500/30 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-rose-500 transition-all font-medium resize-none animate-fade-in"
                    placeholder="Describe any blockers, issues, or areas that need attention..."
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Recommendations (Optional)</label>
                <textarea
                  name="recommendations"
                  value={formData.recommendations}
                  onChange={onChange}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium resize-none"
                  placeholder="Suggestions for next session..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-white hover:text-indigo-950 text-white font-black py-5 rounded-2xl transition-all active:scale-95 shadow-xl shadow-indigo-600/20 text-lg uppercase flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Session Report'}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: Recent History */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Recent Reports</h3>
            
            {fetching ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-800 rounded-2xl"></div>)}
              </div>
            ) : myReports.length === 0 ? (
              <p className="text-slate-500 text-sm italic">No reports submitted yet.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {myReports.map((report) => (
                  <div key={report._id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 group hover:border-indigo-500 transition-all">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{report.topic}</h4>
                       <span className="text-[10px] text-slate-500 font-mono">
                         {new Date(report.date).toLocaleDateString()}
                       </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{report.contentTaught}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${report.challenges ? 'bg-rose-500 animate-pulse' : 'bg-green-500'}`}></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {report.challenges ? 'Issue Logged' : 'Smooth Session'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorReportForm;
