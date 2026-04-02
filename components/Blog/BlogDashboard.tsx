import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../App';
import toast from 'react-hot-toast';
import BlogEditor from './BlogEditor';

interface BlogDashboardProps {
  userData: any;
}

const BlogDashboard: React.FC<BlogDashboardProps> = ({ userData }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingPostId, setEditingPostId] = useState<string | undefined>();

  const fetchManagePosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/manage`, {
        headers: {
          'x-auth-token': localStorage.getItem('token') || ''
        }
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        toast.error('Failed to load posts');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'list') {
      fetchManagePosts();
    }
  }, [view]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      });
      if (res.ok) {
        toast.success('Post deleted');
        fetchManagePosts();
      } else {
        toast.error('Failed to delete post');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  if (view === 'editor') {
    return (
      <BlogEditor 
        userData={userData} 
        editPostId={editingPostId} 
        onSave={() => setView('list')} 
        onCancel={() => setView('list')} 
      />
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Manage Blogs</h1>
          <p className="text-slate-400 font-medium mt-1">Manage your all blogs.</p>
        </div>
        
        <button 
          onClick={() => { setEditingPostId(undefined); setView('editor'); }}
          className="mt-6 md:mt-0 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          New Post
        </button>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-[3rem] overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/30">
                  <th className="p-6 text-[10px] uppercase tracking-widest font-black text-slate-500">Title</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-black text-slate-500">Status</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-black text-slate-500 hidden md:table-cell">Date</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-black text-slate-500 text-center">Views</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest font-black text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {posts.map(post => (
                  <tr key={post._id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-white mb-1 line-clamp-1">{post.title}</p>
                      <p className="text-xs text-slate-500">{post.slug}</p>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border ${
                        post.status === 'published' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-6 text-sm font-medium text-slate-400 hidden md:table-cell">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6 text-center text-sm font-bold text-slate-300">
                      {post.views}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => { setEditingPostId(post._id); setView('editor'); }}
                          className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(post._id)}
                          className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">
                      No posts found. Start transmitting to your network.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDashboard;
