import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Character {
  id: string;
  emoji: string;
  name: string;
  color: string;
}

export const CHARACTERS: Character[] = [
  { id: 'froggy',   emoji: '🐸', name: 'Froggy',   color: 'from-emerald-500 to-green-600'   },
  { id: 'fox',      emoji: '🦊', name: 'Fox',       color: 'from-orange-500 to-red-500'      },
  { id: 'panda',    emoji: '🐼', name: 'Panda',     color: 'from-gray-700 to-gray-900'       },
  { id: 'penguin',  emoji: '🐧', name: 'Penguin',   color: 'from-slate-600 to-blue-800'      },
  { id: 'cat',      emoji: '🐱', name: 'Cat',       color: 'from-amber-400 to-orange-400'    },
  { id: 'dog',      emoji: '🐶', name: 'Dog',       color: 'from-yellow-500 to-amber-600'    },
  { id: 'lion',     emoji: '🦁', name: 'Lion',      color: 'from-yellow-400 to-orange-500'   },
  { id: 'octopus',  emoji: '🐙', name: 'Octo',      color: 'from-purple-500 to-indigo-600'   },
  { id: 'dragon',   emoji: '🐲', name: 'Dragon',    color: 'from-green-600 to-emerald-800'   },
  { id: 'robot',    emoji: '🤖', name: 'Robot',     color: 'from-cyan-500 to-blue-600'       },
];

interface CharacterSelectProps {
  onReady: (p1: { character: Character; name: string }, p2: { character: Character; name: string }) => void;
  onBack: () => void;
}

export default function CharacterSelect({ onReady, onBack }: CharacterSelectProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [p1Char, setP1Char]   = useState<Character | null>(null);
  const [p2Char, setP2Char]   = useState<Character | null>(null);
  const [p1Name, setP1Name]   = useState('Player 1');
  const [p2Name, setP2Name]   = useState('Player 2');

  const canContinueP1 = p1Char !== null;
  const canStart      = p2Char !== null;

  const handleP1Select = (c: Character) => { setP1Char(c); };
  const handleP2Select = (c: Character) => {
    if (c.id === p1Char?.id) return;
    setP2Char(c);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d1117] flex flex-col items-center justify-center p-4 overflow-y-auto">
      {/* Header */}
      <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 text-sm font-semibold transition"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-rose-500">
          Pick Your Character
        </h1>
        <div className="w-20" />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm">1</div>
                <h2 className="text-xl font-bold text-white">Player 1 — Pick Your Character</h2>
              </div>

              {/* Name Input */}
              <input
                type="text"
                value={p1Name}
                onChange={e => setP1Name(e.target.value || 'Player 1')}
                placeholder="Enter your name…"
                maxLength={16}
                className="w-full mb-5 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 outline-none focus:border-blue-500 text-sm"
              />

              {/* Character Grid */}
              <div className="grid grid-cols-5 gap-3">
                {CHARACTERS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleP1Select(c)}
                    className={`group relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200
                      ${p1Char?.id === c.id
                        ? 'border-blue-500 bg-blue-500/20 scale-105 shadow-lg shadow-blue-500/30'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:scale-105'}`}
                  >
                    <span className="text-4xl">{c.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">{c.name}</span>
                    {p1Char?.id === c.id && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-black">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected preview */}
              {p1Char && (
                <div className={`mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${p1Char.color}`}>
                  <span className="text-3xl">{p1Char.emoji}</span>
                  <div>
                    <p className="text-white font-black">{p1Name}</p>
                    <p className="text-white/70 text-xs">Selected: {p1Char.name}</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canContinueP1}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-black rounded-xl transition"
            >
              Continue → Player 2
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-3xl"
          >
            {/* Player 1 mini summary */}
            <div className={`mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${p1Char!.color} opacity-70`}>
              <span className="text-2xl">{p1Char!.emoji}</span>
              <p className="text-white font-bold text-sm">{p1Name} is playing as {p1Char!.name}</p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-black text-sm">2</div>
                <h2 className="text-xl font-bold text-white">Player 2 — Pick Your Character</h2>
              </div>

              <input
                type="text"
                value={p2Name}
                onChange={e => setP2Name(e.target.value || 'Player 2')}
                placeholder="Enter friend's name…"
                maxLength={16}
                className="w-full mb-5 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 outline-none focus:border-rose-500 text-sm"
              />

              <div className="grid grid-cols-5 gap-3">
                {CHARACTERS.map(c => {
                  const takenByP1 = c.id === p1Char?.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleP2Select(c)}
                      disabled={takenByP1}
                      className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200
                        ${takenByP1
                          ? 'border-slate-800 bg-slate-800/40 opacity-30 cursor-not-allowed'
                          : p2Char?.id === c.id
                            ? 'border-rose-500 bg-rose-500/20 scale-105 shadow-lg shadow-rose-500/30'
                            : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:scale-105'}`}
                    >
                      <span className="text-4xl">{c.emoji}</span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">{c.name}</span>
                      {p2Char?.id === c.id && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-black">✓</span>
                      )}
                      {takenByP1 && (
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-400 bg-slate-900/60 rounded-xl">P1</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {p2Char && (
                <div className={`mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${p2Char.color}`}>
                  <span className="text-3xl">{p2Char.emoji}</span>
                  <div>
                    <p className="text-white font-black">{p2Name}</p>
                    <p className="text-white/70 text-xs">Selected: {p2Char.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition">
                ← Back
              </button>
              <button
                onClick={() => onReady({ character: p1Char!, name: p1Name }, { character: p2Char!, name: p2Name })}
                disabled={!canStart}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 disabled:from-slate-700 disabled:to-slate-600 disabled:text-slate-500 text-white font-black rounded-xl transition text-lg"
              >
                ⚔️ Start Challenge!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
