import React from 'react';

interface LogoutConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-sm rounded-[2.5rem] p-8 border border-slate-700 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-3xl shadow-inner border border-rose-500/20">
            👋
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">Sign Out?</h3>
            <p className="text-slate-400 font-medium mt-2 leading-relaxed">
              Are you sure you want to end your current session in FutureLab?
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl shadow-xl shadow-rose-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Confirm Logout
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
