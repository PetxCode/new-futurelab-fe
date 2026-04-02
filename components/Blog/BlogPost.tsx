import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../App';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';

interface BlogPostProps {
  slug: string;
  userData: any;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, userData, onBack }) => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        toast.error('Failed to load blog post');
        onBack();
      });
  }, [slug, onBack]);

  const handleDisplayContent = (html: string) => {
    if (!html) return { __html: '' };
    
    // Check if the content is likely raw text (doesn't start with a tag)
    const trimmed = html.trim();
    if (trimmed.length > 0 && !trimmed.startsWith('<')) {
      // Split by double newlines and wrap in p tags, but avoid multiple br
      const formatted = trimmed
        .split(/\r?\n\r?\n+/)
        .map(p => `<p>${p.replace(/\r?\n/g, ' ')}</p>`)
        .join('');
      return { __html: DOMPurify.sanitize(formatted) };
    }
    
    // For HTML content, ensure we don't have empty paragraphs breaking the flow
    const sanitized = DOMPurify.sanitize(html);
    return { __html: sanitized };
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !userData) return;
    
    setSubmittingComment(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/${post._id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({ text: commentText })
      });
      
      if (res.ok) {
        const updatedComments = await res.json();
        setPost({ ...post, comments: updatedComments });
        setCommentText('');
        toast.success('Comment added!');
      } else {
        toast.error('Failed to submit comment');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full p-20">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in pb-24">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-indigo-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </div>
        <span className="font-bold">Back to Articles</span>
      </button>

      {/* Header */}
      <div className="space-y-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-slate-400 border-y border-slate-800 py-6">
          <div className="flex items-center gap-3">
             {post.author?.avatarUrl ? (
                <img src={post.author.avatarUrl} className="w-12 h-12 rounded-full border-2 border-slate-700" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-lg font-black text-white border-2 border-slate-700">
                  {post.author?.fullName?.charAt(0) || 'U'}
                </div>
              )}
            <div>
              <p className="font-bold text-slate-200">{post.author?.fullName || 'Anonymous'}</p>
              <p className="text-xs uppercase tracking-widest font-black text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            <span className="font-bold">{post.views || 0}</span>
          </div>
        </div>
      </div>

      {post.coverImage && (
        <div className="w-full h-[400px] rounded-[3rem] overflow-hidden mb-12 border border-slate-800 shadow-2xl">
          <img src={post.coverImage} className="w-full h-full object-cover" alt={post.title} />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-invert prose-indigo max-w-none prose-xl prose-headings:font-black prose-p:text-slate-300 prose-p:leading-[1.9] prose-p:mb-10 prose-img:rounded-[2.5rem] prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-strong:text-white prose-a:text-indigo-400"
        dangerouslySetInnerHTML={handleDisplayContent(post.content)}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .prose {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          hyphens: auto !important;
        }
        .prose p {
          margin-bottom: 2.5rem !important;
          font-size: 1.25rem !important;
          line-height: 1.9 !important;
          color: #cbd5e1 !important;
          letter-spacing: -0.01em !important;
        }
        .prose h1, .prose h2, .prose h3 {
          margin-top: 4rem !important;
          margin-bottom: 2rem !important;
          color: white !important;
          letter-spacing: -0.03em !important;
          line-height: 1.2 !important;
        }
        .prose h2 {
          font-size: 2.5rem !important;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .prose h3 {
          font-size: 1.875rem !important;
          color: #818cf8 !important; /* Indigo 400 */
        }
        .prose ul, .prose ol {
          margin-bottom: 3rem !important;
          padding-left: 2rem !important;
        }
        .prose li {
          margin-bottom: 1rem !important;
          font-size: 1.125rem !important;
          color: #94a3b8 !important;
          line-height: 1.7 !important;
        }
        /* Specific fix for Word-imported forced breaks */
        .prose br {
          content: "";
          display: block;
          margin-top: 0.5rem;
        }
        /* Gradient divider for sections starting with numbers */
        .prose h2:first-of-type {
          margin-top: 0 !important;
        }
      `}} />

      {/* Comments Section */}
      <div className="mt-20 pt-10 border-t border-slate-800">
        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
          <span className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </span>
          Discussion {post.comments?.length > 0 && `(${post.comments.length})`}
        </h3>

        {userData ? (
          <form onSubmit={handleCommentSubmit} className="mb-12 relative">
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Join the conversation..."
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-3xl p-6 text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[120px] resize-none font-medium"
            />
            <button 
              type="submit" 
              disabled={submittingComment || !commentText.trim()}
              className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-2 rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-indigo-600/20"
            >
              Post
            </button>
          </form>
        ) : (
          <div className="mb-12 bg-slate-800/30 border border-slate-700 rounded-3xl p-6 text-center">
            <p className="text-slate-400 font-medium">Please log in to leave a comment.</p>
          </div>
        )}

        <div className="space-y-6">
          {post.comments?.map((comment: any, idx: number) => (
            <div key={idx} className="bg-slate-800/30 border border-slate-800 rounded-[2rem] p-6 flex gap-4">
              {comment.user?.avatarUrl ? (
                <img src={comment.user.avatarUrl} className="w-10 h-10 rounded-full border border-slate-700 shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {comment.user?.fullName?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-slate-200">{comment.user?.fullName || 'Anonymous'}</span>
                  <span className="text-xs text-slate-500 font-medium">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-400 leading-relaxed font-medium">{comment.text}</p>
              </div>
            </div>
          ))}
          
          {(!post.comments || post.comments.length === 0) && (
            <p className="text-slate-500 text-center py-10 font-medium">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
