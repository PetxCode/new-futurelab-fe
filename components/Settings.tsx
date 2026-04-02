
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

import { User } from '../types';

interface SettingsProps {
  userData: User | null;
  onUpdate: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userData, onUpdate }) => {
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [grade, setGrade] = useState(userData?.grade || '');
  const [schoolName, setSchoolName] = useState(userData?.schoolName || '');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userData?.avatarUrl || null);
  const [isLoading, setIsLoading] = useState(false);

  // Instructor-specific state
  const [bio, setBio] = useState(userData?.instructorProfile?.bio || '');
  const [detailedBio, setDetailedBio] = useState(userData?.instructorProfile?.detailedBio || '');
  const [yearsExperience, setYearsExperience] = useState(userData?.instructorProfile?.yearsExperience?.toString() || '0');
  const [monthlyRate, setMonthlyRate] = useState(userData?.instructorProfile?.monthlyRate?.toString() || '20000');
  const [specialties, setSpecialties] = useState(userData?.instructorProfile?.specialties?.join(', ') || '');
  const [skillset, setSkillset] = useState(userData?.instructorProfile?.skillset?.join(', ') || '');
  const [availability, setAvailability] = useState(userData?.instructorProfile?.availability || 'Flexible');
  const [trainingHighlights, setTrainingHighlights] = useState(userData?.instructorProfile?.trainingHighlights?.join(', ') || '');
  const [studentsTrainedCount, setStudentsTrainedCount] = useState(userData?.instructorProfile?.studentsTrainedCount?.toString() || '0');
  const [otherCriticalInfo, setOtherCriticalInfo] = useState(userData?.instructorProfile?.otherCriticalInfo?.join(', ') || '');

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName || '');
      setGrade(userData.grade || '');
      setSchoolName(userData.schoolName || '');
      setAvatarPreview(userData.avatarUrl || null);
      
      if (userData.instructorProfile) {
        setBio(userData.instructorProfile.bio || '');
        setDetailedBio(userData.instructorProfile.detailedBio || '');
        setYearsExperience(userData.instructorProfile.yearsExperience?.toString() || '0');
        setMonthlyRate(userData.instructorProfile.monthlyRate?.toString() || '20000');
        setSpecialties(userData.instructorProfile.specialties?.join(', ') || '');
        setSkillset(userData.instructorProfile.skillset?.join(', ') || '');
        setAvailability(userData.instructorProfile.availability || 'Flexible');
        setTrainingHighlights(userData.instructorProfile.trainingHighlights?.join(', ') || '');
        setStudentsTrainedCount(userData.instructorProfile.studentsTrainedCount?.toString() || '0');
        setOtherCriticalInfo(userData.instructorProfile.otherCriticalInfo?.join(', ') || '');
      }
    }
  }, [userData]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '' 
        },
        body: JSON.stringify({ fullName, grade, schoolName }),
      });

      if (response.ok) {
        toast.success('Profile updated!');
        onUpdate();
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (err) {
      toast.error('Server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatar) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/avatar`, {
        method: 'POST',
        headers: { 'x-auth-token': localStorage.getItem('token') || '' },
        body: formData,
      });

      if (response.ok) {
        toast.success('Avatar uploaded!');
        onUpdate();
        setAvatar(null);
      } else {
        toast.error('Avatar upload failed.');
      }
    } catch (err) {
      toast.error('Error uploading avatar.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInstructorProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/instructor-profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '' 
        },
        body: JSON.stringify({ 
          bio, 
          detailedBio, 
          yearsExperience: parseInt(yearsExperience), 
          monthlyRate: parseInt(monthlyRate),
          specialties: specialties.split(',').map(s => s.trim()).filter(s => s),
          skillset: skillset.split(',').map(s => s.trim()).filter(s => s),
          availability,
          trainingHighlights: trainingHighlights.split(',').map(s => s.trim()).filter(s => s),
          studentsTrainedCount: parseInt(studentsTrainedCount),
          otherCriticalInfo: otherCriticalInfo.split(',').map(s => s.trim()).filter(s => s)
        }),
      });

      if (response.ok) {
        toast.success('Trainer profile updated!');
        onUpdate();
      } else {
        toast.error('Failed to update trainer profile.');
      }
    } catch (err) {
      toast.error('Server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-5xl font-black text-white tracking-tight mb-2">Settings</h1>
        <p className="text-slate-400 text-lg font-medium">Manage your profile and account preferences.</p>
      </div>

      <div className="space-y-8">
        {/* Avatar Upload - Now on top */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-10 rounded-[3rem] shadow-xl text-center max-w-2xl mx-auto w-full">
          <div className="flex flex-col items-center">
            <div className="mb-6">
               <h3 className="text-xl font-bold text-white flex items-center justify-center">
                <span className="w-8 h-8 bg-cyan-600/20 text-cyan-400 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </span>
                Profile Identity
              </h3>
            </div>

            <div className="relative inline-block mb-8 group">
              <div className="w-48 h-48 rounded-[3.5rem] overflow-hidden border-4 border-slate-700 shadow-2xl relative bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-105 duration-500">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-7xl font-black text-indigo-500/30 uppercase">
                    {fullName?.charAt?.(0) || '?'}
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-all shadow-lg group-hover:scale-110 duration-200 ring-4 ring-slate-900">
                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </label>
            </div>

            <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto font-medium">Capture your best look. Recommended: Square image, 512px minimum.</p>

            {avatar && (
              <button 
                onClick={handleUploadAvatar}
                disabled={isLoading}
                className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl shadow-lg shadow-cyan-600/20 transition-all animate-in slide-in-from-top-4 duration-300"
              >
                {isLoading ? 'Uploading...' : 'Confirm New Avatar'}
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-10 rounded-[3rem] shadow-xl">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center">
              <span className="w-8 h-8 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 118 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              Account Details
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    placeholder="E.g. Leo Sterling"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Current Grade / Level</label>
                  <div className="relative">
                    <select 
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-900">Select Grade</option>
                      {['Primary 4', 'Primary 5', 'Primary 6', 'JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'].map(g => (
                        <option key={g} value={g} className="bg-slate-900">{g}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Institution / School Name</label>
                  <input 
                    type="text" 
                    value={schoolName}
                    disabled
                    className="w-full bg-slate-900/30 border border-slate-800 rounded-2xl px-6 py-4 text-slate-500 font-bold cursor-not-allowed focus:outline-none transition-all"
                    placeholder="E.g. Future Academy"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Address (Registry Only)</label>
                <input 
                  type="email" 
                  value={userData?.email || ''} 
                  disabled
                  className="w-full bg-slate-900/30 border border-slate-800 rounded-2xl px-6 py-4 text-slate-500 font-bold cursor-not-allowed"
                />
              </div>

              <div className="flex justify-center pt-6">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full max-w-xs py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? 'Updating Account...' : 'Apply Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Instructor Onboarding Section */}
        {!userData?.isInstructor && (
          <div className="max-w-4xl mx-auto w-full mt-8">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-10 rounded-[3rem] shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-emerald-600/20 text-emerald-400 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </span>
                Instructor Onboarding
              </h3>
              <p className="text-slate-400 font-medium mb-8 text-sm">
                Want to share your expertise? Apply to become a trainer at FutureLab and help shape the next generation of engineers.
              </p>

              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 mb-8">
                {userData?.isInstructorPending ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                      <div>
                        <p className="text-amber-400 font-black uppercase tracking-widest text-xs">Application Pending</p>
                        <p className="text-slate-500 text-xs font-medium mt-1">An administrator is currently reviewing your profile.</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-amber-500/20">
                      In Review
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-white font-bold mb-1">Join the Elite Instructor Pool</p>
                      <p className="text-slate-500 text-xs font-medium">Approved trainers gain access to advanced reporting and the ability to mentor students globally.</p>
                    </div>
                    <button 
                      onClick={async () => {
                        setIsLoading(true);
                        try {
                          const response = await fetch(`${API_BASE_URL}/api/user/request-instructor`, {
                            method: 'PUT',
                            headers: { 'x-auth-token': localStorage.getItem('token') || '' }
                          });
                          if (response.ok) {
                            toast.success('Your application has been submitted!');
                            onUpdate();
                          } else {
                            toast.error('Failed to submit application.');
                          }
                        } catch (err) {
                          toast.error('Connection error.');
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      disabled={isLoading}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
                    >
                      {isLoading ? 'Processing...' : 'Apply for Instructor Status'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Professional Trainer Profile */}
        {userData?.isInstructor && (
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-10 rounded-[3rem] shadow-xl">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center">
                <span className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                Professional Trainer Profile
              </h3>

              <form onSubmit={handleUpdateInstructorProfile} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Short Bio (Teaser)</label>
                    <input 
                      type="text" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                      placeholder="e.g. Full-stack engineer and educator."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Years of Experience</label>
                    <input 
                      type="number" 
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Monthly Rate (₦)</label>
                    <input 
                      type="number" 
                      value={monthlyRate}
                      onChange={(e) => setMonthlyRate(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Availability</label>
                    <input 
                      type="text" 
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                      placeholder="e.g. Weekends only, Flexible"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Students Trained</label>
                    <input 
                      type="number" 
                      value={studentsTrainedCount}
                      onChange={(e) => setStudentsTrainedCount(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Training Focus / Highlights (comma separated)</label>
                  <input 
                    type="text" 
                    value={trainingHighlights}
                    onChange={(e) => setTrainingHighlights(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    placeholder="e.g. Fundamental Logic, Project Building, Problem Solving"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Detailed Biography</label>
                  <textarea 
                    value={detailedBio}
                    onChange={(e) => setDetailedBio(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="Describe your teaching philosophy and professional background..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Specialties (comma separated)</label>
                    <input 
                      type="text" 
                      value={specialties}
                      onChange={(e) => setSpecialties(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                      placeholder="e.g. Python, AI, Robotics"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Master Skillset (comma separated)</label>
                    <input 
                      type="text" 
                      value={skillset}
                      onChange={(e) => setSkillset(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                      placeholder="e.g. React, Node.js, TensorFlow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Why Choose You? (Critical Highlights - comma separated)</label>
                  <textarea 
                    value={otherCriticalInfo}
                    onChange={(e) => setOtherCriticalInfo(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="e.g. Industry Veteran, 50+ Projects Completed, Passionate Mentor"
                  />
                </div>

                <div className="flex justify-center pt-6">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-12 py-5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-lg rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? 'Updating Profile...' : 'Save Professional Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
