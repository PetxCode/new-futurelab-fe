
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface SettingsProps {
  userData: any;
  onUpdate: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userData, onUpdate }) => {
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [grade, setGrade] = useState(userData?.grade || '');
  const [schoolName, setSchoolName] = useState(userData?.schoolName || '');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userData?.avatarUrl || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName);
      setGrade(userData.grade || '');
      setSchoolName(userData.schoolName || '');
      setAvatarPreview(userData.avatarUrl || null);
    }
  }, [userData]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://futurelab-main-be.vercel.app/api/user/profile', {
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
      const response = await fetch('https://futurelab-main-be.vercel.app/api/user/avatar', {
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
                    {fullName.charAt(0) || '?'}
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
                  <input 
                    type="text" 
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    placeholder="E.g. Senior Year, Level 4"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Institution / School Name</label>
                  <input 
                    type="text" 
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
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
      </div>
    </div>
  );
};

export default Settings;
