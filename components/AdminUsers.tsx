import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import StudentProgressDetail from './StudentProgressDetail';
import { API_BASE_URL } from '../App';
import { User } from '../types';
import moment from 'moment';

interface AdminUsersProps {
  userData?: User | null;
  isSchoolContext?: boolean;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ userData, isSchoolContext }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolAddress, setNewSchoolAddress] = useState('');
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [schoolStats, setSchoolStats] = useState<any[]>([]);
  const [isFetchingStats, setIsFetchingStats] = useState(false);

  // Sync filter with context
  useEffect(() => {
    if (isSchoolContext && userData?.schoolName) {
      setSchoolFilter(userData.schoolName);
    } else if (!isSchoolContext) {
      setSchoolFilter('');
    }
  }, [isSchoolContext, userData]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        name: searchTerm,
        school: schoolFilter,
        grade: gradeFilter
      }).toString();

      const response = await fetch(`${API_BASE_URL}/api/user/list?${query}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token') || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (err) {
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (userId: string, role: 'isAdmin' | 'isSchoolAdmin' | 'isInstructor', currentValue: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/role/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({ [role]: !currentValue })
      });

      if (response.ok) {
        toast.success(`Role updated successfully`);
        fetchUsers();
      } else {
        const errData = await response.json();
        toast.error(errData.message || 'Failed to update role');
      }
    } catch (err) {
      toast.error('Error connecting to server');
    }
  };

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName.trim()) return;

    setIsCreatingSchool(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/schools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({ name: newSchoolName, address: newSchoolAddress })
      });

      if (response.ok) {
        toast.success('School created successfully');
        setShowSchoolModal(false);
        setNewSchoolName('');
        setNewSchoolAddress('');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to create school');
      }
    } catch (err) {
      toast.error('Error connecting to server');
    } finally {
      setIsCreatingSchool(false);
    }
  };

  const fetchSchoolStats = async () => {
    setIsFetchingStats(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/schools/stats`, {
        headers: {
          'x-auth-token': localStorage.getItem('token') || ''
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSchoolStats(data);
      } else {
        toast.error('Failed to fetch school statistics');
      }
    } catch (err) {
      toast.error('Error connecting to server');
    } finally {
      setIsFetchingStats(false);
    }
  };

  const handleToggleSchoolSuspension = async (schoolId: string, schoolName: string, currentlySuspended: boolean) => {
    const action = currentlySuspended ? 'unsuspend' : 'suspend';
    const message = currentlySuspended 
      ? `Are you sure you want to restore access for ${schoolName}? Students will be able to log in again.`
      : `Are you sure you want to suspend ${schoolName}? This will block all students from this school from accessing the platform.`;

    if (!confirm(message)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/schools/${schoolId}/toggle-suspension`, {
        method: 'PUT',
        headers: {
          'x-auth-token': localStorage.getItem('token') || ''
        }
      });

      if (response.ok) {
        toast.success(`School ${schoolName} ${currentlySuspended ? 'restored' : 'suspended'} successfully.`);
        fetchSchoolStats(); // Refresh the list
      } else {
        const data = await response.json();
        toast.error(data.message || `Failed to ${action} school`);
      }
    } catch (err) {
      toast.error('Error connecting to server');
    }
  };

  useEffect(() => {
    if (showStatsModal) {
      fetchSchoolStats();
    }
  }, [showStatsModal]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, schoolFilter, gradeFilter]);

  if (selectedUser) {
    return (
      <StudentProgressDetail 
        user={selectedUser} 
        onBack={() => setSelectedUser(null)} 
      />
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-2">Student Registry</h1>
          <p className="text-slate-400 text-lg font-medium">Manage and Review Stduent's Performance this community.</p>
        </div>
        
        <div className="flex items-center space-x-4 bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50">
          <div className="px-4 py-2 bg-indigo-600/20 rounded-xl text-indigo-400 text-sm font-black uppercase tracking-widest">
            {users.length} Total Users
          </div>
          <button 
            onClick={() => setShowSchoolModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            <span>Create School</span>
          </button>
          <button 
            onClick={() => setShowStatsModal(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest rounded-xl border border-slate-700 transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span>View Schools</span>
          </button>
        </div>
      </div>

      {/* School Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-5xl max-h-[85vh] rounded-[3rem] shadow-3xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50 backdrop-blur-xl">
              <div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter mb-1">Institutional Overview</h2>
                <p className="text-slate-400 font-medium text-sm">Real-time engagement metrics across all registered schools.</p>
              </div>
              <button 
                onClick={() => setShowStatsModal(false)}
                className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 custom-scroll">
              {isFetchingStats ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-indigo-400 font-black uppercase tracking-widest text-xs animate-pulse">Aggregating Global Data...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-700/30">
                        <th className="pb-6 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">School Identity</th>
                        <th className="pb-6 px-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Students</th>
                        <th className="pb-6 px-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Instructors</th>
                        <th className="pb-6 px-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Admins</th>
                        <th className="pb-6 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Engagement Level</th>
                        <th className="pb-6 px-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/20">
                      {schoolStats.map((school) => (
                        <tr key={school._id} className="group hover:bg-slate-700/10 transition-colors">
                          <td className="py-6 px-4">
                            <div className="flex flex-col">
                              <div className="flex items-center space-x-2">
                                <span className={`text-lg font-bold ${school.isSuspended ? 'text-slate-500 line-through' : 'text-white'} group-hover:text-indigo-400 transition-colors`}>{school.name}</span>
                                {school.isSuspended && (
                                  <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[8px] font-black uppercase rounded border border-rose-500/20">Suspended</span>
                                )}
                              </div>
                              <span className="text-slate-500 text-xs font-medium">
                                {school.address || 'Global Campus'} 
                                <span className="mx-2 opacity-30">|</span> 
                                <span className="text-indigo-400 font-black">Code: {school.schoolCode}</span>
                              </span>
                            </div>
                          </td>
                          <td className="py-6 px-4 text-center">
                            <span className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl border border-indigo-500/20 font-black text-sm">
                              {school.studentCount}
                            </span>
                          </td>
                          <td className="py-6 px-4 text-center">
                             <span className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 font-black text-sm">
                              {school.instructorCount}
                            </span>
                          </td>
                          <td className="py-6 px-4 text-center">
                            <span className="bg-amber-500/10 text-amber-400 px-4 py-2 rounded-xl border border-amber-500/20 font-black text-sm">
                              {school.adminCount}
                            </span>
                          </td>
                          <td className="py-6 px-4 min-w-[240px]">
                            <div className="flex flex-col space-y-2">
                               <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                                  <span>Activity Tracker</span>
                                  <span className="text-white italic">{school.totalUsers} Total</span>
                               </div>
                               <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5">
                                  <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                    style={{ width: `${Math.min(100, (school.totalUsers / 100) * 100)}%` }}
                                  />
                               </div>
                            </div>
                          </td>
                          <td className="py-6 px-4 text-right">
                            <button 
                              onClick={() => handleToggleSchoolSuspension(school._id, school.name, !!school.isSuspended)}
                              className={`p-3 rounded-xl transition-all shadow-sm group/btn ${
                                school.isSuspended 
                                  ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white' 
                                  : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'
                              }`}
                              title={school.isSuspended ? 'Restore Institution' : 'Suspend Institution'}
                            >
                              {school.isSuspended ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="p-8 bg-slate-900/50 border-t border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Real-time Sync Active</span>
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">Total School's Info</p>
            </div>
          </div>
        </div>
      )}

      {/* Create School Modal */}
      {showSchoolModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-[2.5rem] p-10 shadow-3xl animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-black text-white italic tracking-tight mb-2">Register School</h2>
            <p className="text-slate-400 font-medium mb-8 text-sm">Add a new institution to ensure naming consistency.</p>
            
            <form onSubmit={handleCreateSchool} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Official Name</label>
                <input 
                  type="text" 
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  placeholder="Future Lab Academy"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Location / Address</label>
                <input 
                  type="text" 
                  value={newSchoolAddress}
                  onChange={(e) => setNewSchoolAddress(e.target.value)}
                  placeholder="Lagos, Nigeria"
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder-slate-700"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowSchoolModal(false)}
                  className="flex-1 py-4 bg-slate-900 text-slate-400 font-black rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isCreatingSchool}
                  className="flex-2 py-4 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isCreatingSchool ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span>Register School</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold placeholder-slate-600"
          />
          {/* <svg className="absolute right-6 top-4.5 w-6 h-6 text-slate-600 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> */}
        </div>

        <div className={`relative ${isSchoolContext ? 'opacity-60' : ''}`}>
          <input 
            type="text" 
            placeholder={isSchoolContext ? `School: ${userData?.schoolName || 'Specified'}` : "Filter by school..."}
            value={schoolFilter}
            disabled={isSchoolContext}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder-slate-600 disabled:cursor-not-allowed"
          />
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder="Filter by grade..."
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder-slate-600"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">User Details</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institution / School</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Level / Grade</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Learning Track</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Avg Mastery</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Joined</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-10 py-20 text-center text-slate-500 font-bold italic animate-pulse">
                    Scanning neural network for user data...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-10 py-20 text-center text-slate-500 font-bold italic">
                    No users found matching your search criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="group hover:bg-slate-700/20 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 flex-shrink-0">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-indigo-500 font-black text-xl">
                              {(user.fullName || (user as any).FullName || '?').charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-bold group-hover:text-indigo-400 transition-colors">{user.fullName || (user as any).FullName || 'Unknown User'}</p>
                          <p className="text-slate-500 text-xs font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-slate-300 font-semibold">{user.schoolName || 'Independent'}</p>
                    </td>
                    <td className="px-10 py-6 text-slate-300 font-semibold">
                      {user.grade || 'Not Specified'}
                    </td>
                    <td className="px-10 py-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center w-32">
                          <span className="text-[10px] font-black text-indigo-400">{(user.totalXP || 0).toLocaleString()} XP</span>
                          <span className="text-[10px] font-black text-slate-500">{(user.missionsCompleted || 0)}/{(user.totalMissions || 0)}</span>
                        </div>
                        <div className="w-32 h-1.5 bg-slate-700/50 rounded-full overflow-hidden p-[0.5px]">
                          <div 
                            className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]" 
                            style={{ width: `${user.totalMissions ? ((user.missionsCompleted || 0) / user.totalMissions) * 100 : 0}%` }} 
                          />
                        </div>
                        {user.lastActivityAt && (
                          <div className="flex flex-col text-[9px] text-slate-500">
                             <div className="flex items-center space-x-1">
                                <span className="font-bold text-amber-500/80">+{user.lastPoints} XP</span>
                                <span className="opacity-50">•</span>
                                <span className="truncate max-w-[80px]">{user.lastActivityTitle}</span>
                             </div>
                             <div className="font-medium text-white opacity-90 mt-2">
                                {/* {new Date(user.lastActivityAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })} */}
                                {moment(user.lastActivityAt).format("ddd, DD-MM-YYYY: HH:mm")}
                             </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-black ${
                          (user.averageScore || 0) >= 90 ? 'text-emerald-400' :
                          (user.averageScore || 0) >= 70 ? 'text-indigo-400' :
                          (user.averageScore || 0) > 0 ? 'text-amber-400' : 'text-slate-600'
                        }`}>
                          {user.averageScore ? `${user.averageScore}%` : 'N/A'}
                        </span>
                        {user.averageScore ? (
                          <div className="w-12 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                             <div 
                               className={`h-full ${(user.averageScore || 0) >= 70 ? 'bg-indigo-500' : 'bg-amber-500'}`} 
                               style={{ width: `${user.averageScore}%` }} 
                             />
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col space-y-2">
                        {userData?.isAdmin && !isSchoolContext ? (
                          <>
                            <button 
                              onClick={() => handleToggleRole(user._id, 'isAdmin', user.isAdmin)}
                              className={`w-[110px] text-center px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                                user.isAdmin 
                                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30' 
                                  : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-rose-400 hover:border-rose-500/30'
                              }`}
                            >
                              Admin
                            </button>
                            <button 
                              onClick={() => handleToggleRole(user._id, 'isSchoolAdmin', !!user.isSchoolAdmin)}
                              className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                                user.isSchoolAdmin 
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30' 
                                  : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-amber-400 hover:border-amber-500/30'
                                }`}
                            >
                              School Admin
                            </button>
                            <button 
                              onClick={() => handleToggleRole(user._id, 'isInstructor', !!user.isInstructor)}
                              className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                                user.isInstructor 
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30' 
                                  : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-emerald-400 hover:border-emerald-500/30'
                              }`}
                            >
                              Instructor
                            </button>
                          </>
                        ) : (
                          <>
                            {user.isAdmin ? (
                              <span className="w-[110px] text-center px-3 py-1 bg-rose-500/10 text-rose-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-rose-500/20">Admin</span>
                            ) : user.isSchoolAdmin ? (
                              <span className="w-[110px] text-center  px-3 py-1 bg-amber-500/10 text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-amber-500/20">School Admin</span>
                            ) : user.isInstructor ? (
                                <span className="w-[110px] text-center px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20">Instructor</span>
                            ) : (
                                <span className="w-[110px] text-center px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/20">Learner</span>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-slate-500 text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-10 py-6">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-3 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-500/20 hover:bg-indigo-600/20 transition-all font-black text-[10px] uppercase tracking-widest flex items-center space-x-2 whitespace-nowrap"
                      >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                         <span>Track Progress</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
