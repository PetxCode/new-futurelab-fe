import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import mammoth from 'mammoth';
import { API_BASE_URL } from '../../App';
import toast from 'react-hot-toast';

interface BlogEditorProps {
  userData: any;
  editPostId?: string; // If provided, we are editing
  onSave: () => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ userData, editPostId, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editPostId) {
      setIsLoading(true);
      // Fetch the post details
      fetch(`${API_BASE_URL}/api/blog/manage`, {
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      })
      .then(res => res.json())
      .then(data => {
        const post = data.find((p: any) => p._id === editPostId);
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setContent(post.content);
          setCoverImage(post.coverImage || '');
          setTags(post.tags?.join(', ') || '');
          setStatus(post.status);
        }
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load post');
        setIsLoading(false);
      });
    }
  }, [editPostId]);

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  };

  const handeTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!editPostId) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      toast.error('Please fill in title, slug, and content.');
      return;
    }

    setIsLoading(true);
    
    const postData = {
      title,
      slug,
      content,
      coverImage,
      status,
      tags: tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      const url = editPostId 
        ? `${API_BASE_URL}/api/blog/${editPostId}`
        : `${API_BASE_URL}/api/blog`;
        
      const method = editPostId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(postData)
      });

      if (res.ok) {
        toast.success(`Post ${editPostId ? 'updated' : 'created'} successfully!`);
        onSave();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to save post');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.docx')) {
      toast.error('Please upload a .docx file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      try {
        setIsLoading(true);
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setContent(result.value);
        
        if (result.messages.length > 0) {
          console.warn('Mammoth messages:', result.messages);
        }
        
        toast.success('Word document converted successfully!');
      } catch (err) {
        console.error('Word conversion error:', err);
        toast.error('Failed to convert Word document.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // ReactQuill modules and formats configuration for a rich experience
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">{editPostId ? 'Edit Transmission' : 'New Transmission'}</h2>
          <p className="text-slate-400 mt-1">Draft your article or upload from Word.</p>
        </div>
        <div className="flex gap-4">
          <label className="px-6 py-2 bg-slate-800 border border-slate-700 text-indigo-400 rounded-xl hover:bg-slate-700 transition-all font-bold cursor-pointer flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Word (.docx)
            <input 
              type="file" 
              accept=".docx" 
              onChange={handleWordUpload} 
              className="hidden" 
            />
          </label>
          <button 
            onClick={onCancel}
            className="px-6 py-2 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 transition-colors font-bold"
          >
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Post Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={handeTitleChange}
                  placeholder="E.g. The Future of AI in Education"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold text-lg"
                />
             </div>
             
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">URL Slug</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="the-future-of-ai"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Cover Image URL</label>
                <input 
                  type="text" 
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Tags (Comma Separated)</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Python, AI, Robotics"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Status</label>
                <div className="relative">
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Public)</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Rich Text Editor (Restored with React 19 Support) */}
        <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-700/50 min-h-[500px] flex flex-col">
           <ReactQuill 
             theme="snow" 
             value={content} 
             onChange={setContent} 
             modules={modules}
             className="flex-1 h-full text-slate-900"
             placeholder="Write your brilliant ideas here..."
           />
        </div>
        
        {/* Global style overrides for ReactQuill inside the dark theme */}
        <style dangerouslySetInnerHTML={{__html: `
          .ql-toolbar { border: none !important; border-bottom: 1px solid #e2e8f0 !important; background: #f8fafc; padding: 1rem !important; }
          .ql-container { border: none !important; font-family: 'Inter', sans-serif !important; font-size: 1.125rem !important; min-height: 400px; }
          .ql-editor { padding: 2rem !important; }
        `}} />

        <div className="flex justify-end pt-6 border-t border-slate-800">
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : (status === 'published' ? 'Publish Now' : 'Save Draft')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
