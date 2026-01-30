import React, { useState, useEffect } from 'react';
import { CycleData, calculateCycleStatus, CycleStatus } from './CycleEngine';
import CycleSetup from './CycleSetup';
import CycleDashboard from './CycleDashboard';

interface CycleTrackerProps {
  onBack: () => void;
}

const STORAGE_KEY = 'petx_period_data';

const CycleTracker: React.FC<CycleTrackerProps> = ({ onBack }) => {
  const [data, setData] = useState<CycleData | null>(null);
  const [status, setStatus] = useState<CycleStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setStatus(calculateCycleStatus(parsed));
      } catch (e) {
        console.error('Failed to parse cycle data', e);
      }
    }
    setIsLoading(false);
  }, []);

  const handleSaveData = (newData: CycleData) => {
    setData(newData);
    setStatus(calculateCycleStatus(newData));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your data? This will clear all history.')) {
      localStorage.removeItem(STORAGE_KEY);
      setData(null);
      setStatus(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] animate-fade-in text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Utilities
        </button>
        {data && (
           <button 
           onClick={handleReset}
           className="text-xs text-slate-500 hover:text-rose-400 transition-colors uppercase tracking-widest font-bold"
         >
           Reset System
         </button>
        )}
      </div>

      {!data ? (
        <CycleSetup onSave={handleSaveData} />
      ) : (
        status && <CycleDashboard data={data} status={status} />
      )}
    </div>
  );
};

export default CycleTracker;
