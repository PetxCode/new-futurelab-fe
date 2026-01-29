import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';
import { User, YouTubeVideo } from '../types';


const NEXT_TEACH_VIDEOS: YouTubeVideo[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning with FutureLab',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    channel: 'FutureLab Academy',
    duration: '15:20',
    views: '12K views',
    publishedAt: '2 days ago',
    videoId: 'dQw4w9WgXcQ',
    grade: 'SSS 3'
  },
  {
    id: '2',
    title: 'Modern Web Development with React 19',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    channel: 'Code Masters',
    duration: '45:10',
    views: '8K views',
    publishedAt: '1 week ago',
    videoId: 'dQw4w9WgXcQ',
    grade: 'SSS 2'
  },
  {
    id: '3',
    title: 'Python for Data Science - Complete Guide',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    channel: 'FutureLab Academy',
    duration: '1:20:00',
    views: '45K views',
    publishedAt: '1 month ago',
    videoId: 'dQw4w9WgXcQ',
    grade: 'SSS 3'
  },
  {
    id: '4',
    title: 'UI/UX Design Principles for 2026',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    channel: 'Design Hub',
    duration: '22:15',
    views: '20K views',
    publishedAt: '3 days ago',
    videoId: 'dQw4w9WgXcQ',
    grade: 'JSS 1'
  },
  {
    id: '5',
    title: 'Clean Code Patterns in TypeScript',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
    channel: 'Arch Master',
    duration: '30:45',
    views: '15K views',
    publishedAt: '5 days ago',
    videoId: 'dQw4w9WgXcQ',
    grade: 'JSS 3'
  },
  {
    id: '6',
    title: 'Vite & Tailwind: The Perfect Duo',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    channel: 'FutureLab Academy',
    duration: '18:10',
    views: '5K views',
    publishedAt: '6 days ago',
    videoId: 'dQw4w9WgXcQ',
    grade: 'JSS 2'
  }
];

const GRADES = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];
const SUBJECT_DOMAINS = ['Mathematics', 'Basic Science', 'AI & Tech', 'Computer Science', 'Physics', 'Chemistry', 'Biology'];

const AddVideoModal: React.FC<{ onClose: () => void, onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    grade: 'JSS 1',
    subject: '',
    channel: 'FutureLab Academy',
    duration: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const extractVideoID = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoID(formData.url);
    if (!videoId) {
      toast.error('Invalid YouTube URL');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/next-teach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({
          ...formData,
          youtubeUrl: formData.url,
          videoId,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }),
      });

      if (response.ok) {
        toast.success('Video Class Added Successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error('Failed to add video class');
      }
    } catch (err) {
      console.error(err);
      toast.error('Connection Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-lg rounded-[2.5rem] border border-slate-700/50 shadow-2xl p-10 overflow-hidden relative">
        <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase italic">Create Video Class</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">YouTube URL</label>
            <input 
              required
              type="text" 
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-medium focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 shadow-inner"
              value={formData.url}
              onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Class Title</label>
            <input 
              required
              type="text" 
              placeholder="Basic Science: Human Reproductive System"
              className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-medium focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 shadow-inner"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Classroom</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-black uppercase tracking-widest focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                value={formData.grade}
                onChange={e => setFormData(prev => ({ ...prev, grade: e.target.value }))}
              >
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Subject Domain</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-black uppercase tracking-widest focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                value={formData.subject}
                onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              >
                <option value="" disabled>Select Subject</option>
                {SUBJECT_DOMAINS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-slate-800 text-slate-400 font-black rounded-2xl hover:bg-slate-750 transition-all border border-slate-700/50 uppercase text-[10px] tracking-widest"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-95"
            >
              {isSubmitting ? 'Syncing...' : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CustomSelect: React.FC<{ 
  label: string; 
  icon: React.ReactNode; 
  value: string; 
  options: string[]; 
  onChange: (val: string) => void;
  isItalic?: boolean;
}> = ({ label, icon, value, options, onChange, isItalic = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800/40 px-5 py-3 rounded-[1.5rem] border border-slate-700/30 relative group hover:border-indigo-500/30 transition-all cursor-pointer shadow-lg"
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
          </div>
          <svg className={`w-3 h-3 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'translate-y-0.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className={`text-sm font-black text-white uppercase tracking-tighter transition-colors ${isItalic ? 'italic text-indigo-400 group-hover:text-indigo-300' : 'group-hover:text-indigo-300'}`}>
          {value}
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-[1.5rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`px-6 py-4 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
                    value === opt 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const NextTeach: React.FC<{ userData: User | null }> = ({ userData }) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>(userData?.grade || 'JSS 1');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [activeSideTab, setActiveSideTab] = useState<'SCHEME' | 'TEACH'>('TEACH');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/next-teach`, {
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      });
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
        if (data.length > 0) setActiveVideo(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(v => v.grade === selectedGrade && (selectedSubject ? v.subject === selectedSubject : true));

  useEffect(() => {
    if (filteredVideos.length > 0 && (!activeVideo || !filteredVideos.find(v => v.id === activeVideo.id))) {
      setActiveVideo(filteredVideos[0]);
    }
  }, [filteredVideos, activeVideo]);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-800/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sidebar Section */}
      <div className="w-80 border-r border-slate-800/50 flex flex-col bg-slate-900/50 backdrop-blur-xl">
        {/* Sidebar Header: Filters */}
        <div className="p-6 space-y-5 border-b border-slate-800/20">
          {/* <div className="flex bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/30">
            <button 
              onClick={() => setActiveSideTab('SCHEME')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSideTab === 'SCHEME' ? 'bg-slate-700 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Scheme
            </button>
            <button 
              onClick={() => setActiveSideTab('TEACH')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeSideTab === 'TEACH' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Teach
            </button>
          </div> */}

          <div className="space-y-4">
             <CustomSelect 
               label="Classroom Search"
               icon={<svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
               value={selectedGrade}
               options={GRADES}
               onChange={setSelectedGrade}
             />

             <CustomSelect 
               label="Subject Domain"
               icon={<svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
               value={selectedSubject}
               options={SUBJECT_DOMAINS}
               onChange={setSelectedSubject}
               isItalic={false}
             />
          </div>
        </div>

        {/* Video List Sidebar */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar">
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Loading...</span>
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="text-center py-10 opacity-50">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">No Content</p>
              </div>
            ) : (
              filteredVideos.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all border ${activeVideo?.id === video.id ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="aspect-video relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-indigo-600/20 transition-opacity ${activeVideo?.id === video.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'}`} />
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[7px] font-black text-white uppercase tracking-tighter border border-white/10">
                      {video.grade}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-800/40">
                    <h4 className={`text-[9px] font-black uppercase tracking-tight line-clamp-2 leading-tight ${activeVideo?.id === video.id ? 'text-indigo-400' : 'text-slate-300'}`}>
                      {video.title}
                    </h4>
                    <p className="text-[7px] font-bold text-slate-500 mt-1 uppercase tracking-widest">{video.channel}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Classroom Search / Subject Filter (Refined Sidebar Header) */}
        {/* // This section was moved up */}


        {/* Add Button at Bottom of Sidebar */}
        {userData?.isAdmin && (
          <div className="p-4 border-t border-slate-800/50">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-700/50 hover:border-indigo-500/30"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add Video
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area: Large Player */}
      <div className="flex-1 flex flex-col bg-slate-950/50 relative">
        {activeVideo ? (
          <>
            <div className="flex-1 p-8 pb-4">
              <div className="w-full h-full bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=0`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute top-8 right-8">
                  {/* <div className="bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-white/10 flex items-center gap-2">
                     <span className="text-white font-black italic text-xl">NEXT</span>
                     <span className="bg-indigo-600 px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-tighter">TEACH</span>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="px-10 pb-10 flex items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                  {activeVideo.title}
                </h2>
                <div className="flex items-center gap-4 mt-6">
                   <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                     {activeVideo.subject} • {activeVideo.grade}
                   </div>
                   <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                     {activeVideo.views}
                   </div>
                </div>
              </div>
              
              <button className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Explore Curriculum 
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <div className="w-32 h-32 bg-slate-900 rounded-[3rem] border border-slate-800 flex items-center justify-center mb-8">
              <svg className="w-16 h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Select a Knowledge Module</h3>
            <p className="max-w-md text-slate-500 font-medium leading-relaxed">Choose a video from the sidebar to begin your learning session. Content is filtered by your selected grade and subject domain.</p>
          </div>
        )}
      </div>

      {isAddModalOpen && <AddVideoModal onClose={() => setIsAddModalOpen(false)} onSuccess={fetchVideos} />}
    </div>
  );
};

export default NextTeach;

