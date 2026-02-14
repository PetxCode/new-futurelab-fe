import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';
import { Assignment } from '../types';

interface EditAssignmentModalProps {
  assignment: Assignment;
  onClose: () => void;
  onSuccess: () => void;
  userData?: any;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({ assignment, onClose, onSuccess, userData }) => {
  const [title, setTitle] = useState(assignment.title);
  const [subject, setSubject] = useState(assignment.subject);
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(assignment.priority);
  const [points, setPoints] = useState(assignment.points);
  const [targetSchools, setTargetSchools] = useState<string[]>(assignment.targetSchools || ['General']);
  const [availableSchools, setAvailableSchools] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/schools`);
      if (resp.ok) {
        const data = await resp.json();
        setAvailableSchools(data.map((s: any) => s.name));
      }
    } catch (err) {
      console.error('Failed to fetch schools', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments/${assignment.id || (assignment as any)._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({ title, subject, dueDate, priority, points, targetSchools }),
      });

      if (response.ok) {
        toast.success('Assignment updated!');
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update assignment');
      }
    } catch (err) {
      toast.error('Server connection error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-xl rounded-[3rem] border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-2xl font-black text-white tracking-tight">Edit Assignment</h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Assignment Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Coding with Python"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Subject</label>
                <input 
                  type="text" 
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Python"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Due Date</label>
                <input 
                  type="text" 
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="e.g. Oct 25"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Priority</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium appearance-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">XP Points</label>
                <input 
                  type="number" 
                  required
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Target Schools / Visibility</label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 mb-2 p-3 bg-slate-900/50 border border-slate-700 rounded-2xl min-h-[50px]">
                  {targetSchools.map(school => (
                    <span key={school} className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg flex items-center gap-2">
                      {school}
                      {(targetSchools.length > 1 || school !== 'General') && (
                        <button 
                          type="button"
                          onClick={() => setTargetSchools(targetSchools.filter(s => s !== school))}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {targetSchools.length === 0 && <span className="text-slate-600 text-[10px] font-bold uppercase italic p-1">No schools selected</span>}
                </div>
                
                <div className="flex gap-3">
                  <select 
                    className="flex-1 bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium appearance-none cursor-pointer"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val) return;
                      if (val === 'General') {
                        setTargetSchools(['General']);
                      } else if (!targetSchools.includes(val)) {
                        setTargetSchools(targetSchools.filter(s => s !== 'General').concat(val));
                      }
                      e.target.value = "";
                    }}
                  >
                    <option value="">Add School...</option>
                    {(userData?.isAdmin || userData?.isInstructor) && <option value="General">General (All Schools)</option>}
                    {availableSchools.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-[2rem] shadow-xl shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Update Assignment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssignmentModal;
