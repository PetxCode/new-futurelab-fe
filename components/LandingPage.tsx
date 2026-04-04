import React, { useState, useEffect } from 'react';
import PartnershipCarousel from './PartnershipCarousel';
import { API_BASE_URL } from '../App';
import BlogList from './Blog/BlogList';
import BlogPost from './Blog/BlogPost';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
  onViewAllTrainers: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin, onViewAllTrainers }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedDetailTrainer, setSelectedDetailTrainer] = useState<any | null>(null);

  useEffect(() => {
    // Fetch blog posts
    fetch(`${API_BASE_URL}/api/blog`)
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3)))
      .catch(console.error);

    // Fetch instructors
    fetch(`${API_BASE_URL}/api/user/instructors`)
      .then(res => res.json())
      .then(data => setInstructors(data))
      .catch(console.error);
  }, []);

  if (selectedPostSlug) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20">
        <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div onClick={() => setSelectedPostSlug(null)} className="flex items-center cursor-pointer">
              <img src="/logo.png" alt="FutureLab" className="h-8 w-auto object-contain" />
            </div>
          </div>
        </nav>
        <BlogPost slug={selectedPostSlug} userData={null} onBack={() => setSelectedPostSlug(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500/30 font-inter overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="FutureLab" className="h-16 w-auto object-contain" />
          </div>
          {/* <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-400">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Curriculum</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Community</a>
          </div> */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLogin}
              className="px-4 py-2 text-sm font-black text-slate-300 hover:text-white transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={onStart}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-[16/9] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] max-w-5xl mx-auto">
            <span className='text-4xl md:text-6xl tracking-normal'>Climb the Coder's Ladder. </span><br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Master AI, Robotic and Coding for Young Learners.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Step into the Lab of tomorrow. Progress from foundational block-coding to advanced Python, Machine Learning, and Web Development through our structured pathways, summer camps, and after-school programs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Start Your Journey
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl border border-slate-700 transition-all flex items-center justify-center space-x-3">
              <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>Explore the Ladder</span>
            </button>
          </div>

          {/* Social Proof/Stats */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Students Taught', val: '50k+' },
              { label: 'Hours of Code', val: '2.5M' },
              { label: 'Camps Completed', val: '1,200+' },
              { label: 'Schools Partnered', val: '350+' }
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-black text-white">{s.val}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Carousel */}
      <PartnershipCarousel />

      {/* Core Programs */}
      <section id="programs" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Our Core Programs.</h2>
            <p className="text-lg text-slate-400 font-medium mt-4 max-w-2xl mx-auto">Designed for every schedule and learning style. Available online and in-person.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
              {
                title: 'After-School Classes',
                desc: 'Continuous weekly learning throughout the school year. Build foundational skills, tackle long-term projects, and consistently advance up the Coder\'s Ladder.',
                icon: '🏫',
                color: 'bg-indigo-500',
                borderHover: 'hover:border-indigo-500/50'
              },
              {
                title: 'Summer Camps',
                desc: 'Immersive, week-long deep dives into specific tech skills like Game Development, Robotics, and Python. Perfect for rapid skill acquisition and summer fun.',
                icon: '🏕️',
                color: 'bg-emerald-500',
                borderHover: 'hover:border-emerald-500/50'
              },
              {
                title: 'Private Tutoring',
                desc: '1-on-1 personalized sessions guided by expert instructors. Tailored specifically to your child\'s pace, interests, and ambitious coding goals.',
                icon: '👨‍🏫',
                color: 'bg-cyan-500',
                borderHover: 'hover:border-cyan-500/50'
              }
            ].map(f => (
              <div key={f.title} className={`p-10 bg-slate-800/40 border border-slate-700/50 rounded-[3rem] group ${f.borderHover} transition-all`}>
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Trainers Section */}
      {instructors.length > 0 && (
        <section id="instructors" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Meet Our Expert Trainers.</h2>
              <p className="text-lg text-slate-400 font-medium mt-4 max-w-2xl mx-auto">Personalized 1-on-1 guidance from industry veterans to accelerate your child's journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {instructors.slice(0, visibleCount).map((inst, idx) => (
                <div 
                  key={inst._id} 
                  className="bg-slate-800/40 border border-slate-700/50 rounded-[3rem] overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col group p-8"
                >
                  <div className="flex items-center gap-6 mb-8 cursor-pointer" onClick={() => setSelectedDetailTrainer(inst)}>
                    <div className="relative">
                      <img 
                        src={inst.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} 
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-xl group-hover:scale-105 transition-transform"
                        alt={inst.fullName}
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-black border-2 border-slate-800">
                        {inst.instructorProfile?.rating || 4.8}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{inst.fullName}</h3>
                      <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mt-1">
                        {inst.instructorProfile?.yearsExperience || 1}+ Years Exp.
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6 flex-1">
                    "{inst.instructorProfile?.bio || "Full-stack engineer and educator. Focused on empowering students to build real-world web applications and mobile apps."}"
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(inst.instructorProfile?.specialties?.length ? inst.instructorProfile.specialties : ["Python", "Game", "Robotic"]).map((s: string) => (
                      <span key={s} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-700/50 flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Monthly Rate</p>
                      <p className="text-white text-xl font-black">₦{(inst.instructorProfile?.monthlyRate || 20000).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                       <button 
                        onClick={() => setSelectedDetailTrainer(inst)}
                        className="p-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                        title="View Full Profile"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => {
                          localStorage.setItem('selectedInstructor', JSON.stringify({
                            id: inst._id,
                            fullName: inst.fullName,
                            rate: inst.instructorProfile?.monthlyRate
                          }));
                          onStart();
                        }}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                      >
                        Engage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {instructors.length > visibleCount && (
              <div className="mt-16 text-center">
                <button 
                  onClick={onViewAllTrainers}
                  className="px-8 py-4 bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl hover:shadow-indigo-500/10"
                >
                  View All Trainers
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trainer Detail Modal */}
      {selectedDetailTrainer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="relative p-8 md:p-12 pb-6 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <button 
                onClick={() => setSelectedDetailTrainer(null)}
                className="absolute top-8 right-8 p-3 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-2xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative flex-shrink-0">
                <img 
                  src={selectedDetailTrainer.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] object-cover border-4 border-slate-700 shadow-2xl"
                  alt={selectedDetailTrainer.fullName}
                />
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-emerald-500 rounded-2xl flex items-center gap-2 text-white font-black border-4 border-slate-900 shadow-xl">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {selectedDetailTrainer.instructorProfile?.rating || 4.8}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">{selectedDetailTrainer.fullName}</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl text-xs font-black uppercase tracking-widest border border-indigo-500/20">
                    {selectedDetailTrainer.instructorProfile?.yearsExperience || 1}+ Years Exp.
                  </span>
                  <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-500/20">
                    {selectedDetailTrainer.instructorProfile?.studentsTrainedCount || 0}+ Students Trained
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-12 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">About the Trainer</h4>
                    <p className="text-slate-300 font-medium leading-relaxed text-lg">
                      {selectedDetailTrainer.instructorProfile?.detailedBio || selectedDetailTrainer.instructorProfile?.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Master skillset</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedDetailTrainer.instructorProfile?.skillset?.length ? selectedDetailTrainer.instructorProfile.skillset : selectedDetailTrainer.instructorProfile.specialties).map((skill: string) => (
                        <span key={skill} className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-sm font-bold border border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem]">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Training Focus</h4>
                    <ul className="space-y-4">
                      {(selectedDetailTrainer.instructorProfile?.trainingHighlights || ["Fundamental Logic", "Project Building", "Problem Solving"]).map((h: string) => (
                        <li key={h} className="flex items-center gap-3 text-slate-300 font-bold">
                          <div className="w-2 h-2 rounded-full bg-indigo-500" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedDetailTrainer.instructorProfile?.otherCriticalInfo?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Why choose this Trainer?</h4>
                      <div className="space-y-3">
                        {selectedDetailTrainer.instructorProfile.otherCriticalInfo.map((info: string) => (
                          <div key={info} className="flex items-center gap-3 px-4 py-3 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl text-indigo-300 text-sm font-bold">
                            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.9L9.03 9.127L15.9 4.9L15.9 10.223L9.03 14.45L2.166 10.223L2.166 4.9ZM9.03 10.477L15.9 6.25L15.9 5.25L9.03 9.477L2.166 5.25L2.166 6.25L9.03 10.477Z" clipRule="evenodd" />
                            </svg>
                            {info}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 md:p-10 bg-slate-800/80 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Bundled Monthly Rate</p>
                <p className="text-white text-3xl font-black">₦{selectedDetailTrainer.instructorProfile?.monthlyRate?.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedDetailTrainer(null)}
                  className="flex-1 sm:flex-none px-8 py-4 text-slate-400 hover:text-white font-black uppercase tracking-widest transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    localStorage.setItem('selectedInstructor', JSON.stringify({
                      id: selectedDetailTrainer._id,
                      fullName: selectedDetailTrainer.fullName,
                      rate: selectedDetailTrainer.instructorProfile?.monthlyRate
                    }));
                    onStart();
                  }}
                  className="flex-1 sm:flex-none px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  Engage Trainer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The Coder's Ladder (Curriculum) */}
      <section id="curriculum" className="py-24 px-6 relative overflow-hidden">
         <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] -z-10 -translate-y-1/2"></div>
         <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                The <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Coder's Ladder.</span><br/>
                From ABCs to APIs.
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Our proprietary curriculum is designed by computer science experts to guide students through a progressive journey. Just like martial arts belts, young engineers level up as they master new concepts.
              </p>
              
              <div className="space-y-6">
                {[
                  { level: 'Level 1: Little Coders (Ages 5-7)', skills: 'Logic, Sequences, Loops (ScratchJr, Code.org)' },
                  { level: 'Level 2: Junior Builders (Ages 8-10)', skills: 'Variables, Conditionals, Events (Scratch, GameDev)' },
                  { level: 'Level 3: Code Warriors (Ages 11-13)', skills: 'Syntax, Algorithms, Data Structures (Python, Web)' },
                  { level: 'Level 4: Master Architects (Ages 14+)', skills: 'Machine Learning, AI, Full-Stack (React, Data Science)' }
                ].map((item, idx) => (
                   <div key={idx} className="flex items-start space-x-4">
                     <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-black text-slate-300 border border-slate-700 mt-1 shrink-0">
                       {idx + 1}
                     </div>
                     <div>
                       <h4 className="text-white font-bold text-lg">{item.level}</h4>
                       <p className="text-slate-500 text-sm font-medium mt-1">{item.skills}</p>
                     </div>
                   </div>
                ))}
              </div>

               <button 
                  onClick={onStart}
                  className="mt-4 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl border border-slate-700 shadow-xl transition-all flex items-center justify-center space-x-3"
                >
                  <span>Find Your Level</span>
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </button>
            </div>
            
            <div className="flex-1 w-full relative">
               <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                     <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 p-6 flex flex-col justify-end">
                        <span className="text-4xl mb-2">👾</span>
                        <h4 className="text-white font-bold">Game Design</h4>
                        <p className="text-xs text-slate-400 font-medium">Build your own worlds</p>
                     </div>
                     <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 p-6 flex flex-col justify-end">
                        <span className="text-4xl mb-2">🤖</span>
                        <h4 className="text-white font-bold">Robotics</h4>
                        <p className="text-xs text-slate-400 font-medium">Hardware meets code</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 p-6 flex flex-col justify-end">
                        <span className="text-4xl mb-2">🌐</span>
                        <h4 className="text-white font-bold">Web Mastery</h4>
                        <p className="text-xs text-slate-400 font-medium">HTML, CSS, React</p>
                     </div>
                     <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 p-6 flex flex-col justify-end">
                        <span className="text-4xl mb-2">🧠</span>
                        <h4 className="text-white font-bold">AI & Data</h4>
                        <p className="text-xs text-slate-400 font-medium">Python & Machine Learning</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
         </div>
      </section>

      {/* Blog Section */}
      {posts.length > 0 && (
        <section className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Latest from the Lab.</h2>
                <p className="text-lg text-slate-400 font-medium mt-4">Insights, updates, and tutorials from our instructors.</p>
              </div>
              {/* <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl border border-slate-700 transition-all flex items-center space-x-2">
                <span>View All Articles</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map(post => (
                <div 
                  key={post._id} 
                  onClick={() => setSelectedPostSlug(post.slug)}
                  className="group cursor-pointer bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col"
                >
                  <div className="h-48 relative overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <span className="text-slate-600 font-black">FutureLab</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 pb-10 flex flex-col flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      {post.tags.slice(0, 1).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight mb-4">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                       </span>
                       <div className="flex items-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                          <span className="text-xs font-black mr-2">Read</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center">
            <img src="/logo.png" alt="FutureLab" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-slate-500 text-sm font-medium">© 2026 FutureLab: A NEXT Project. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
