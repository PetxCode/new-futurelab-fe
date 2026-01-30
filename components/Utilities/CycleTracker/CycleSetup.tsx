import React, { useState } from 'react';
import { CycleData } from './CycleEngine';

interface CycleSetupProps {
  onSave: (data: CycleData) => void;
}

const CycleSetup: React.FC<CycleSetupProps> = ({ onSave }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CycleData>({
    lastPeriodStart: new Date().toISOString().split('T')[0],
    cycleLength: 28,
    periodLength: 5
  });

  const handleFinish = () => {
    onSave(formData);
  };

  const steps = [
    {
      title: "When did your last period start?",
      description: "This helps the system calculate where you are in your current cycle.",
      content: (
        <div className="space-y-4">
          <input 
            type="date" 
            value={formData.lastPeriodStart}
            onChange={(e) => setFormData({...formData, lastPeriodStart: e.target.value})}
            className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-6 py-4 text-xl font-bold focus:border-pink-500 transition-colors outline-none text-white appearance-none"
          />
        </div>
      )
    },
    {
      title: "How long is your typical cycle?",
      description: "The time from the start of one period to the start of the next. Average is 28 days.",
      content: (
        <div className="flex flex-col items-center space-y-6">
          <div className="text-6xl font-black text-pink-500 tabular-nums">
            {formData.cycleLength} <span className="text-xl text-slate-500 uppercase">Days</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="45" 
            value={formData.cycleLength}
            onChange={(e) => setFormData({...formData, cycleLength: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between w-full text-slate-500 text-xs font-bold px-2">
            <span>20 DAYS</span>
            <span>SHORTER</span>
            <span>AVERAGE (28)</span>
            <span>LONGER</span>
            <span>45 DAYS</span>
          </div>
        </div>
      )
    },
    {
      title: "How many days does your period usually last?",
      description: "The number of days you experience bleeding. Most periods last between 3-7 days.",
      content: (
        <div className="flex flex-col items-center space-y-6">
          <div className="text-6xl font-black text-rose-500 tabular-nums">
            {formData.periodLength} <span className="text-xl text-slate-500 uppercase">Days</span>
          </div>
          <input 
            type="range" 
            min="2" 
            max="10" 
            value={formData.periodLength}
            onChange={(e) => setFormData({...formData, periodLength: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <div className="flex justify-between w-full text-slate-500 text-xs font-bold px-2">
            <span>2 DAYS</span>
            <span>SHORT</span>
            <span>AVERAGE</span>
            <span>LONG</span>
            <span>10 DAYS</span>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[step - 1];

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs font-black uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span>System Initialization</span>
        </div>
        <h2 className="text-4xl font-black tracking-tight leading-tight italic">
          Let's setup your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 underline decoration-pink-500/30">Cycle Guardian</span>
        </h2>
        <p className="text-slate-400 max-w-md mx-auto">
          We use this data to provide scientific insights into your health. Everything is stored locally.
        </p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-3xl rounded-full -mr-32 -mt-32 group-hover:bg-pink-500/10 transition-colors" />
        
        <div className="relative space-y-10">
          <div className="flex justify-between items-center">
             <div className="flex space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-12 bg-pink-500' : 'w-4 bg-slate-800'}`} />
                ))}
             </div>
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {step} of 3</span>
          </div>

          <div className="space-y-2 min-h-[100px]">
            <h3 className="text-2xl font-bold">{currentStepData.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{currentStepData.description}</p>
          </div>

          <div className="py-8">
            {currentStepData.content}
          </div>

          <div className="flex space-x-4 pt-8 border-t border-slate-800/50">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-800 text-slate-400 font-bold hover:bg-slate-800 transition-all"
              >
                Previous
              </button>
            )}
            <button 
              onClick={() => step < 3 ? setStep(step + 1) : handleFinish()}
              className="flex-[2] px-6 py-4 rounded-xl bg-pink-600 text-white font-black hover:bg-pink-500 hover:scale-[1.02] shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
            >
              {step === 3 ? 'Protect & Launch' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleSetup;
