export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

export interface CycleData {
  lastPeriodStart: string; // ISO Date
  cycleLength: number; // days
  periodLength: number; // days
}

export interface CycleStatus {
  currentDay: number;
  currentPhase: CyclePhase;
  daysUntilNextPeriod: number;
  percentComplete: number;
  phaseProgress: number; // 0 to 1 within the phase
  insights: string[];
}

export const getPhaseDetails = (phase: CyclePhase) => {
  const details = {
    Menstrual: {
      color: 'from-rose-600 to-red-500',
      title: 'Menstrual Phase',
      description: 'Your cycle starts today. This is a time for rest and self-care.',
      tips: ['Stay hydrated', 'Light stretching', 'Iron-rich foods']
    },
    Follicular: {
      color: 'from-emerald-600 to-teal-500',
      title: 'Follicular Phase',
      description: 'Energy levels are rising! Your body is preparing for what follows.',
      tips: ['New challenges', 'High-intensity exercise', 'Socialize']
    },
    Ovulation: {
      color: 'from-amber-400 to-orange-500',
      title: 'Ovulation Phase',
      description: 'You are at your peak energy and confidence levels.',
      tips: ['Public speaking', 'Creative projects', 'Peak fitness']
    },
    Luteal: {
      color: 'from-indigo-600 to-blue-500',
      title: 'Luteal Phase',
      description: 'Your body is slowing down. A perfect time for focus and finishing tasks.',
      tips: ['Consistent sleep', 'Complex carbs', 'Organization']
    }
  };
  return details[phase];
};

export const calculateCycleStatus = (data: CycleData): CycleStatus => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const start = new Date(data.lastPeriodStart);
  start.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const currentDay = (diffDays % data.cycleLength) + 1;
  const daysUntilNextPeriod = data.cycleLength - currentDay + 1;
  const percentComplete = (currentDay / data.cycleLength) * 100;
  
  let currentPhase: CyclePhase = 'Follicular';
  let phaseProgress = 0;
  
  if (currentDay <= data.periodLength) {
    currentPhase = 'Menstrual';
    phaseProgress = currentDay / data.periodLength;
  } else if (currentDay <= 10) {
    currentPhase = 'Follicular';
    phaseProgress = (currentDay - data.periodLength) / (10 - data.periodLength);
  } else if (currentDay <= 16) {
    currentPhase = 'Ovulation';
    phaseProgress = (currentDay - 10) / 6;
  } else {
    currentPhase = 'Luteal';
    phaseProgress = (currentDay - 16) / (data.cycleLength - 16);
  }

  const insights = [
    `Day ${currentDay} of your ${data.cycleLength} day cycle.`,
    `Your next period is expected in ${daysUntilNextPeriod} days.`
  ];

  return {
    currentDay,
    currentPhase,
    daysUntilNextPeriod,
    percentComplete,
    phaseProgress,
    insights
  };
};
