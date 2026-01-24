
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface AddCourseModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teacher, setTeacher] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800');
  const [isLoading, setIsLoading] = useState(false);

  // Default lesson structure for new courses
  const [subCourses, setSubCourses] = useState([
    { id: '1', title: 'Introduction', duration: '15:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Getting started with the course.', badgeIcon: '🚀' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error('Phase Title and Description required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({
          title,
          description,
          teacher,
          category,
          thumbnail,
          subCourses,
          progress: 0,
          grade: 'A+',
          schedule: 'Self-paced'
        }),
      });

      if (response.ok) {
        toast.success('Course created successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error('Failed to create course');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-[3rem] border border-slate-800 shadow-2xl overflow-y-auto custom-scroll animate-in zoom-in-95 duration-300">
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">New Course</h2>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Design a new learning module</p>
            </div>
            <button type="button" onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Course Header</label>
              <input 
                type="text"
                placeholder="e.g. Advanced Quantum Mechanics"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-bold"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Instructor Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Dr. Aris"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-bold"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Category</label>
                <select 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Engineering</option>
                  <option>Science</option>
                  <option>Humanities</option>
                  <option>Business</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Overview</label>
              <textarea 
                placeholder="Describe what this course covers..."
                rows={3}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Thumbnail URL</label>
              <input 
                type="text"
                placeholder="https://..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
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
              {isLoading ? 'Processing...' : 'Deploy Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
