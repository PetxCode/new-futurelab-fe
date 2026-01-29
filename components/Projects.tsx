// Final refined version of Projects component with full TypeScript type safety
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { API_BASE_URL } from '../App';
import { toast } from 'react-hot-toast';
import { Category, Project, User } from '../types';


const Projects: React.FC<{ userData: User | null }> = ({ userData }) => {
  const [view, setView] = useState<'categories' | 'list' | 'details'>('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const isAuthorized = userData?.isAdmin || userData?.isInstructor;

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/categories`, {
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async (catId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects?categoryId=${catId}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    fetchProjects(category._id);
    setView('list');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView('details');
  };

  const handleBack = () => {
    if (view === 'details') setView('list');
    else if (view === 'list') {
      setView('categories');
      fetchCategories();
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-800/50 shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 font-inter">
      <div className="p-8 border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-6">
          {view !== 'categories' && (
            <button 
              onClick={handleBack}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl border border-slate-700/50 transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
              {view === 'categories' ? 'Project Hub' : view === 'list' ? selectedCategory?.name : selectedProject?.title}
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">
              {view === 'categories' ? 'Select a path to begin exploration' : view === 'list' ? 'Take home projects for your class' : 'Detailed Project Specifications'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthorized && view === 'categories' && (
            <button 
              onClick={() => setIsAddCategoryOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              Add Category
            </button>
          )}
          {isAuthorized && view === 'list' && (
            <button 
              onClick={() => setIsAddProjectOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              Add Project
            </button>
          )}
          <div className="px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
             <span className="text-indigo-400 font-black text-[10px] uppercase tracking-widest">
               {view === 'categories' ? `${categories.length} Categories` : view === 'list' ? `${projects.length} Projects` : selectedProject?.difficulty}
             </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {view === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div 
                key={cat._id}
                onClick={() => handleCategoryClick(cat)}
                className="group relative bg-slate-900/40 rounded-[2.5rem] border border-slate-800 p-8 cursor-pointer hover:border-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98]"
              >
                <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">{cat.name}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Level up your skills with curated hands-on projects for this module.</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">View Projects</span>
                  <div className="p-2 bg-slate-800 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length === 0 && !isLoading ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500 font-black uppercase tracking-widest">No projects found in this category</p>
              </div>
            ) : (
              projects.map((proj) => (
                <div 
                  key={proj._id}
                  onClick={() => handleProjectClick(proj)}
                  className="group bg-slate-900/40 rounded-[2.5rem] border border-slate-800 overflow-hidden cursor-pointer hover:border-indigo-500/30 transition-all active:scale-[0.99]"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-800">
                    {proj.thumbnail ? (
                      <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">{proj.difficulty}</span>
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">{proj.time}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">{proj.title}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">{proj.description}</p>
                    <div className="mt-8 flex items-center justify-center w-full py-4 bg-slate-800 rounded-2xl group-hover:bg-indigo-600 transition-colors">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Project Details</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {view === 'details' && selectedProject && (
          <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl bg-slate-800">
              {selectedProject.thumbnail && <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                <div className="max-w-2xl">
                  <div className="flex gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-indigo-600 rounded-lg text-[10px] font-black text-white uppercase tracking-widest shadow-xl shadow-indigo-600/30">{selectedProject.difficulty}</span>
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-white/10">{selectedProject.time} to complete</span>
                  </div>
                  <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-6 underline decoration-indigo-500 decoration-8 underline-offset-8">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-12">
                <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 shadow-inner">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Overview
                  </h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 shadow-inner">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Materials Needed
                  </h4>
                  <ul className="space-y-4">
                    {selectedProject.materials.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-4 text-xs font-black text-white uppercase tracking-tight italic">
                        <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xs not-italic text-slate-500">
                           {idx + 1}
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-slate-900/30 p-10 rounded-[2.5rem] border border-slate-800/50">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 !text-4xl" />
                    Step by Step Implementation
                  </h4>
                  <div className="space-y-4">
                    {selectedProject.steps.map((step: string, idx: number) => (
                      <div key={idx} className="group flex gap-8 p-6 hover:bg-slate-800/40 rounded-[2rem] transition-all border border-transparent hover:border-slate-800">
                        <div className="flex-shrink-0">
                           <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black italic text-lg shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                             {idx + 1}
                           </div>
                        </div>
                        <div className="pt-1">
                          <p className="text-white text-md font-bold leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isAddCategoryOpen && <AddCategoryModal onClose={() => setIsAddCategoryOpen(false)} onRefresh={fetchCategories} />}
      {isAddProjectOpen && <AddProjectModal categoryId={selectedCategory?._id || ''} onClose={() => setIsAddProjectOpen(false)} onRefresh={() => selectedCategory && fetchProjects(selectedCategory._id)} />}
    </div>
  );
};

interface AddCategoryModalProps {
  onClose: () => void;
  onRefresh: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ name: '', icon: '💻', color: 'bg-blue-500' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Category created!');
        onRefresh();
        onClose();
      }
    } catch (err) {
      toast.error('Failed to create category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-lg rounded-[2.5rem] border border-slate-700/50 shadow-2xl p-10">
        <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase italic">Create Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Category Name</label>
            <input 
              required
              className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-bold outline-none focus:border-indigo-500 transition-all"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Icon (Emoji)</label>
              <input 
                className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-lg font-bold outline-none focus:border-indigo-500 transition-all text-center"
                value={formData.icon}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Bg Color Class</label>
              <input 
                className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-xs font-bold outline-none focus:border-indigo-500 transition-all"
                value={formData.color}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all">Cancel</button>
            <button disabled={isSubmitting} type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50">
              {isSubmitting ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ProjectFormData {
  categoryId: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  description: string;
  materials: string[];
  steps: string[];
  thumbnail: string;
}

interface AddProjectModalProps {
  categoryId: string;
  onClose: () => void;
  onRefresh: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ categoryId, onClose, onRefresh }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    categoryId,
    title: '',
    difficulty: 'Beginner',
    time: '',
    description: '',
    materials: [''],
    steps: [''],
    thumbnail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Project created!');
        onRefresh();
        onClose();
      }
    } catch (err) {
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addField = (type: 'materials' | 'steps') => {
    setFormData((prev: ProjectFormData) => ({ ...prev, [type]: [...prev[type], ''] }));
  };

  const updateField = (type: 'materials' | 'steps', index: number, value: string) => {
    const next = [...formData[type]];
    next[index] = value;
    setFormData((prev: ProjectFormData) => ({ ...prev, [type]: next }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-slate-700/50 shadow-2xl p-10 custom-scrollbar">
        <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase italic">Create Project</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Project Title</label>
              <input required className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-bold outline-none focus:border-indigo-500 transition-all" value={formData.title} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev: ProjectFormData) => ({ ...prev, title: e.target.value }))} />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Difficulty</label>
              <select className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-bold outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer" value={formData.difficulty} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData((prev: ProjectFormData) => ({ ...prev, difficulty: e.target.value as any }))}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Time Estimate (e.g. 4 hours)</label>
              <input required className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-bold outline-none focus:border-indigo-500 transition-all" value={formData.time} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev: ProjectFormData) => ({ ...prev, time: e.target.value }))} />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Thumbnail URL</label>
              <input className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-bold outline-none focus:border-indigo-500 transition-all" value={formData.thumbnail} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev: ProjectFormData) => ({ ...prev, thumbnail: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Description</label>
            <textarea required rows={3} className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl p-4 text-white text-sm font-bold outline-none focus:border-indigo-500 transition-all resize-none" value={formData.description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData((prev: ProjectFormData) => ({ ...prev, description: e.target.value }))} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <div className="flex items-center justify-between mb-3">
                   <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Materials</label>
                   <button type="button" onClick={() => addField('materials')} className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase underline">Add</button>
                </div>
                <div className="space-y-2">
                   {formData.materials.map((m, i) => (
                      <input key={i} className="w-full bg-slate-800 border border-slate-700/30 rounded-xl p-3 text-white text-xs font-bold outline-none focus:border-indigo-500" value={m} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('materials', i, e.target.value)} />
                   ))}
                </div>
             </div>
             <div>
                <div className="flex items-center justify-between mb-3">
                   <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Steps</label>
                   <button type="button" onClick={() => addField('steps')} className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase underline">Add</button>
                </div>
                <div className="space-y-2">
                   {formData.steps.map((s, i) => (
                      <input key={i} className="w-full bg-slate-800 border border-slate-700/30 rounded-xl p-3 text-white text-xs font-bold outline-none focus:border-indigo-500" value={s} onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('steps', i, e.target.value)} />
                   ))}
                </div>
             </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all">Cancel</button>
            <button disabled={isSubmitting} type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50">
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Projects;
