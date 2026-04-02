import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../App';
import toast from 'react-hot-toast';

const BlogList: React.FC<{ onNavigate: (slug: string) => void }> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        toast.error('Failed to load blog posts');
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-full p-20">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center">
            <img src="/logo.png" alt="FutureLab" className="h-12 w-auto object-contain mr-4" />
            <span className="text-slate-500 uppercase tracking-[0.2em] text-sm font-black mt-2">Blog</span>
          </h1>
          <p className="text-slate-400 mt-3 text-lg font-medium ml-16">Latest tutorials, news, and insights from our team.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div 
            key={post._id} 
            onClick={() => onNavigate(post.slug)} 
            className="group cursor-pointer bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 hover:bg-slate-800 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col"
          >
            <div className="h-56 bg-slate-800 relative w-full overflow-hidden shrink-0">
              {post.coverImage ? (
                <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={post.title} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 to-slate-900 flex items-center justify-center p-8">
                  <img src="/logo.png" alt="FutureLab" className="h-12 w-auto object-contain opacity-30 mix-blend-overlay" />
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl font-black text-white mb-3 line-clamp-3 leading-tight group-hover:text-indigo-300 transition-colors">{post.title}</h2>
              
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-700/50">
                <div className="flex items-center gap-3">
                  {post.author?.avatarUrl ? (
                    <img src={post.author.avatarUrl} className="w-8 h-8 rounded-full border border-slate-600" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                      {post.author?.fullName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-300">{post.author?.fullName || 'Anonymous'}</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-slate-500 text-xs font-bold space-x-1">
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <span>{post.views || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && (
          <div className="col-span-full py-32 text-center bg-slate-800/30 rounded-[3rem] border border-slate-700 border-dashed">
            <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
            <h3 className="text-xl font-black text-white">No Transmissions Yet</h3>
            <p className="text-slate-400 font-medium mt-2 max-w-sm mx-auto">Instructors haven't posted any updates yet. Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
