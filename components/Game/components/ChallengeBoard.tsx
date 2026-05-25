import React from 'react';
import { motion } from 'framer-motion';
import type { Character } from './CharacterSelect';
import { STAGES } from '../challengeData';

interface Player {
  character: Character;
  name: string;
}

interface ChallengeboardProps {
  stage: 1 | 2 | 3 | 4;
  levelInStage: number; // 1-10
  p1: Player;
  p2: Player;
  p1StageScore: number;
  p2StageScore: number;
  p1TotalScore: number;
  p2TotalScore: number;
  isStageSummary?: boolean;
  isFinal?: boolean;
  onNext: () => void;
}

export default function ChallengBoard({
  stage, levelInStage, p1, p2,
  p1StageScore, p2StageScore,
  p1TotalScore, p2TotalScore,
  isStageSummary = false, isFinal = false,
  onNext
}: ChallengeboardProps) {
  const stageData = STAGES.find(s => s.id === stage)!;

  const stageWinner =
    p1StageScore > p2StageScore ? p1 :
    p2StageScore > p1StageScore ? p2 : null;

  const finalWinner =
    isFinal
      ? p1TotalScore > p2TotalScore ? p1
        : p2TotalScore > p1TotalScore ? p2
        : null
      : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full max-w-md bg-[#0d1117] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${stageData.color} p-5 text-center`}>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
            {isFinal ? '🏆 Final Results' : isStageSummary ? `Stage ${stage} Complete!` : `Stage ${stage} · Level ${levelInStage}/10`}
          </p>
          <h2 className="text-2xl font-black text-white">
            {isFinal ? 'Challenge Over!' : isStageSummary ? stageData.label : 'Scoreboard'}
          </h2>
        </div>

        {/* Scores */}
        <div className="p-6 flex gap-4">
          {/* P1 */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={`flex-1 rounded-2xl p-4 border-2 text-center ${
              (isStageSummary && stageWinner?.name === p1.name) || (isFinal && finalWinner?.name === p1.name)
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            <div className="text-5xl mb-2">{p1.character.emoji}</div>
            <p className="text-white font-black text-sm mb-3">{p1.name}</p>
            {isStageSummary || isFinal ? (
              <>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Stage</p>
                <p className="text-3xl font-black text-emerald-400">{p1StageScore}</p>
                {isFinal && (
                  <>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-3 mb-1">Total</p>
                    <p className="text-2xl font-black text-blue-400">{p1TotalScore}</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Score</p>
                <p className="text-3xl font-black text-emerald-400">{p1TotalScore}</p>
              </>
            )}
            {((isStageSummary && stageWinner?.name === p1.name) || (isFinal && finalWinner?.name === p1.name)) && (
              <div className="mt-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                {isFinal ? '🏆 Winner!' : '⭐ Stage Win'}
              </div>
            )}
          </motion.div>

          {/* VS divider */}
          <div className="flex flex-col items-center justify-center gap-2 px-1">
            <div className="text-slate-600 font-black text-xs uppercase tracking-widest">vs</div>
            <div className="w-px flex-1 bg-slate-700" />
          </div>

          {/* P2 */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={`flex-1 rounded-2xl p-4 border-2 text-center ${
              (isStageSummary && stageWinner?.name === p2.name) || (isFinal && finalWinner?.name === p2.name)
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            <div className="text-5xl mb-2">{p2.character.emoji}</div>
            <p className="text-white font-black text-sm mb-3">{p2.name}</p>
            {isStageSummary || isFinal ? (
              <>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Stage</p>
                <p className="text-3xl font-black text-emerald-400">{p2StageScore}</p>
                {isFinal && (
                  <>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-3 mb-1">Total</p>
                    <p className="text-2xl font-black text-blue-400">{p2TotalScore}</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Score</p>
                <p className="text-3xl font-black text-emerald-400">{p2TotalScore}</p>
              </>
            )}
            {((isStageSummary && stageWinner?.name === p2.name) || (isFinal && finalWinner?.name === p2.name)) && (
              <div className="mt-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                {isFinal ? '🏆 Winner!' : '⭐ Stage Win'}
              </div>
            )}
          </motion.div>
        </div>

        {/* Tie message */}
        {(isStageSummary || isFinal) && !stageWinner && !finalWinner && (
          <p className="text-center text-slate-400 font-bold text-sm pb-2">🤝 It's a Tie!</p>
        )}

        {/* CTA */}
        <div className="px-6 pb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className={`w-full py-3 rounded-xl font-black text-white text-base transition
              ${isFinal
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
              }`}
          >
            {isFinal
              ? '🔄 Play Again'
              : isStageSummary
                ? `Stage ${stage + 1} → ${STAGES.find(s => s.id === stage + 1)?.label ?? ''}`
                : 'Next Level →'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
