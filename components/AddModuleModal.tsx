
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

interface AddModuleModalProps {
  courseId: string;
  onClose: () => void;
  onSuccess: (updatedCourse: any) => void;
}

const AddModuleModal: React.FC<AddModuleModalProps> = ({ courseId, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [badgeIcon, setBadgeIcon] = useState('🎓');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) {
      toast.error('Module Title and Video URL required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/modules`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          duration: duration || '10:00',
          badgeIcon
        }),
      });

      if (response.ok) {
        const updatedCourse = await response.json();
        toast.success('Module added to curriculum!');
        onSuccess(updatedCourse);
        onClose();
      } else {
        toast.error('Failed to add module');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-xl max-h-[90vh] rounded-[3rem] border border-slate-800 shadow-2xl overflow-y-auto custom-scroll animate-in zoom-in-95 duration-300">
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">Add Module</h2>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Append new content to outline</p>
            </div>
            <button type="button" onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Module Header</label>
              <input 
                type="text"
                placeholder="e.g. Fundamental Logic Gates"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-bold"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Video Duration</label>
                <input 
                  type="text"
                  placeholder="e.g. 12:45"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-bold"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Badge Icon</label>
                <input 
                  type="text"
                  placeholder="e.g. ⚡"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white text-center focus:outline-none focus:border-indigo-500 transition-all text-xl"
                  value={badgeIcon}
                  onChange={(e) => setBadgeIcon(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">YouTube Embed URL</label>
              <input 
                type="text"
                placeholder="https://www.youtube.com/embed/..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Module Summary</label>
              <input 
                placeholder="Brief summary of the lesson..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Lesson Content</label>
              <textarea 
                placeholder="Provide detailed reading materials, code snippets, or instructions..."
                rows={5}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium resize-none shadow-inner"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-800 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl border border-slate-700 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Appending...' : 'Add to Outline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModuleModal;
