import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { STAGES } from '../challengeData';
import type { Character } from './CharacterSelect';

interface StageIntroProps {
  stage: 1 | 2 | 3 | 4;
  p1: { character: Character; name: string };
  p2: { character: Character; name: string };
  onDone: () => void;
}

export default function StageIntro({ stage, p1, p2, onDone }: StageIntroProps) {
  const stageData = STAGES.find(s => s.id === stage)!;
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) { onDone(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0d1117] flex flex-col items-center justify-center overflow-hidden">
      {/* animated bg rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/5"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 800 * i, height: 800 * i, opacity: 0 }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative text-center px-8"
      >
        {/* Stage icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-8xl mb-6"
        >
          {stageData.icon}
        </motion.div>

        <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em] mb-2">
          Stage {stage} of 4
        </p>
        <h1 className={`text-5xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r ${stageData.color}`}>
          {stageData.label}
        </h1>
        <p className="text-slate-400 text-base max-w-sm mx-auto mb-10">
          {stageData.description}
        </p>

        {/* Player matchup */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">{p1.character.emoji}</span>
            <span className="text-white font-bold text-sm">{p1.name}</span>
          </div>
          <div className="text-3xl font-black text-slate-500">VS</div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">{p2.character.emoji}</span>
            <span className="text-white font-bold text-sm">{p2.name}</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center">
          <motion.div
            key={countdown}
            initial={{ scale: 1.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center"
          >
            <span className="text-4xl font-black text-white">
              {countdown === 0 ? '🚀' : countdown}
            </span>
          </motion.div>
        </div>
        <p className="text-slate-500 text-xs mt-3 font-mono">Starting in {countdown}s…</p>
      </motion.div>
    </div>
  );
}
