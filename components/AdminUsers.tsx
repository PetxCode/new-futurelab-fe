import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import StudentProgressDetail from './StudentProgressDetail';
import { API_BASE_URL } from '../App';
import moment from 'moment';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  grade?: string;
  schoolName?: string;
  avatarUrl?: string;
  isAdmin: boolean;
  isSchoolAdmin?: boolean;
  createdAt: string;
  // Progress metrics for at-a-glance view
  totalXP?: number;
  missionsCompleted?: number;
  totalMissions?: number;
  averageScore?: number;
  lastActivityAt?: string | null;
  lastPoints?: number;
  lastActivityTitle?: string;
}

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

  const handleToggleRole = async (userId: string, role: 'isAdmin' | 'isSchoolAdmin', currentValue: boolean) => {
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
        </div>
      </div>

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
                          </>
                        ) : (
                          <>
                            {user.isAdmin ? (
                              <span className="w-[110px] text-center px-3 py-1 bg-rose-500/10 text-rose-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-rose-500/20">Admin</span>
                            ) : user.isSchoolAdmin ? (
                              <span className="w-[110px] text-center  px-3 py-1 bg-amber-500/10 text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-amber-500/20">School Admin</span>
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
