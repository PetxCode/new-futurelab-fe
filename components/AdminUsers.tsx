import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  fullName: string;
  email: string;
  grade?: string;
  schoolName?: string;
  avatarUrl?: string;
  isAdmin: boolean;
  createdAt: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        name: searchTerm,
        school: schoolFilter,
        grade: gradeFilter
      }).toString();

      const response = await fetch(`https://futurelab-main-be.vercel.app/api/user/list?${query}`, {
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

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, schoolFilter, gradeFilter]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-2">User Registry</h1>
          <p className="text-slate-400 text-lg font-medium">Manage and audit the FutureLab community.</p>
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

        <div className="relative">
          <input 
            type="text" 
            placeholder="Filter by school..."
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder-slate-600"
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
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">User Identity</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Institution / School</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Level / Grade</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-slate-500 font-bold italic animate-pulse">
                    Scanning neural network for user data...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-slate-500 font-bold italic">
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
                      {user.isAdmin ? (
                        <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-rose-500/20">Admin</span>
                      ) : (
                        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/20">Learner</span>
                      )}
                    </td>
                    <td className="px-10 py-6 text-slate-500 text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
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
