import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { challengeLevels, STAGES } from '../challengeData';
import type { Character } from './CharacterSelect';
import StageIntro from './StageIntro';
import ChallengBoard from './ChallengeBoard';

interface PlayerInfo {
  character: Character;
  name: string;
}

interface ChallengeGameProps {
  p1: PlayerInfo;
  p2: PlayerInfo;
  onExit: () => void;
}

type TurnPhase =
  | 'stage-intro'
  | 'p1-play'
  | 'p1-result'
  | 'p2-play'
  | 'p2-result'
  | 'level-board'
  | 'stage-board'
  | 'final-board';

const TIMER_SECONDS = 30;
const LEVELSPER_STAGE = 10;

function getStageForLevel(levelIndex: number): 1 | 2 | 3 | 4 {
  return (Math.floor(levelIndex / LEVELSPER_STAGE) + 1) as 1 | 2 | 3 | 4;
}

export default function ChallengeGame({ p1, p2, onExit }: ChallengeGameProps) {
  const [levelIndex, setLevelIndex]       = useState(0);
  const [phase, setPhase]                 = useState<TurnPhase>('stage-intro');
  const [userInput, setUserInput]         = useState('');
  const [timeLeft, setTimeLeft]           = useState(TIMER_SECONDS);
  const [hintUsed, setHintUsed]           = useState(false);
  const [showHint, setShowHint]           = useState(false);
  const [p1Scores, setP1Scores]           = useState<number[]>([]); // per-level scores
  const [p2Scores, setP2Scores]           = useState<number[]>([]);
  const [lastResult, setLastResult]       = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [syntaxMode]                      = useState<'css' | 'tailwind'>('tailwind');

  const currentLevel = challengeLevels[levelIndex];
  const currentStage = getStageForLevel(levelIndex) as 1 | 2 | 3 | 4;
  const levelInStage = (levelIndex % LEVELSPER_STAGE) + 1;

  const isP1Turn = phase === 'p1-play' || phase === 'p1-result';
  const activePlayer = isP1Turn ? p1 : p2;

  // ── Score helpers ──────────────────────────────────────────────────────────
  const totalScore = (scores: number[]) => scores.reduce((a, b) => a + b, 0);

  const stageScores = (scores: number[], stage: number) => {
    const start = (stage - 1) * LEVELSPER_STAGE;
    return scores.slice(start, start + LEVELSPER_STAGE).reduce((a, b) => a + b, 0);
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = useCallback((input: string): boolean => {
    if (syntaxMode === 'css') {
      return currentLevel.expectedRegex.every(r => new RegExp(r, 'i').test(input));
    }
    return currentLevel.expectedTailwind.every(tw => input.includes(tw));
  }, [currentLevel, syntaxMode]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'p1-play' && phase !== 'p2-play') return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  const resetTurn = () => {
    setUserInput('');
    setTimeLeft(TIMER_SECONDS);
    setHintUsed(false);
    setShowHint(false);
    setLastResult(null);
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleTimeout = () => {
    setLastResult('timeout');
    if (phase === 'p1-play') {
      setP1Scores(s => [...s, 0]);
      setPhase('p1-result');
    } else {
      setP2Scores(s => [...s, 0]);
      setPhase('p2-result');
    }
  };

  const handleRun = () => {
    const correct = validate(userInput);
    if (correct) {
      const pts = hintUsed ? 1 : 3;
      setLastResult('correct');
      if (phase === 'p1-play') {
        setP1Scores(s => [...s, pts]);
        setPhase('p1-result');
      } else {
        setP2Scores(s => [...s, pts]);
        setPhase('p2-result');
      }
    } else {
      setLastResult('wrong');
      if (phase === 'p1-play') {
        setP1Scores(s => [...s, 0]);
        setPhase('p1-result');
      } else {
        setP2Scores(s => [...s, 0]);
        setPhase('p2-result');
      }
    }
  };

  const handleNextAfterResult = () => {
    if (phase === 'p1-result') {
      resetTurn();
      setPhase('p2-play');
    } else {
      // p2 just finished — decide what to show next
      const nextLevelIndex = levelIndex + 1;
      const isLastLevelOfStage = levelInStage === LEVELSPER_STAGE;
      const isLastLevel = nextLevelIndex >= challengeLevels.length;

      resetTurn();

      if (isLastLevel) {
        setPhase('final-board');
      } else if (isLastLevelOfStage) {
        setPhase('stage-board');
      } else {
        setPhase('level-board');
      }
    }
  };

  const handleBoardNext = () => {
    const nextLevelIndex = levelIndex + 1;
    const isLastLevel    = nextLevelIndex >= challengeLevels.length;

    if (isLastLevel || phase === 'final-board') {
      onExit();
      return;
    }

    setLevelIndex(nextLevelIndex);
    resetTurn();

    const nextStage = getStageForLevel(nextLevelIndex);
    if (nextStage !== currentStage) {
      setPhase('stage-intro');
    } else {
      setPhase('p1-play');
    }
  };

  // ── Render helpers ─────────────────────────────────────────────────────────
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timeLeft > 15 ? 'bg-emerald-500' :
    timeLeft > 8  ? 'bg-amber-400'   : 'bg-red-500';

  const containerId = currentLevel.mode === 'flex' ? '#pond' : '#garden';
  const injectedCSS =
    phase === 'final-board' || phase === 'stage-board' ? '' :
    `#challenge-preview-board ${containerId} { ${
      !currentLevel.targetSelector ? userInput : ''
    } }
    ${currentLevel.targetSelector
      ? `#challenge-preview-board ${currentLevel.targetSelector} { ${userInput} }`
      : ''}`;

  const getFrogBg = (color: string) =>
    color === 'red' ? 'bg-red-500' : color === 'yellow' ? 'bg-yellow-400' : 'bg-green-500';
  const getLilyBorder = (color: string) =>
    color === 'red' ? 'border-red-500/50 bg-red-500/20' : color === 'yellow' ? 'border-yellow-400/50 bg-yellow-400/20' : 'border-green-500/50 bg-green-500/20';

  // ── Stage intro ────────────────────────────────────────────────────────────
  if (phase === 'stage-intro') {
    return (
      <StageIntro
        stage={currentStage}
        p1={p1} p2={p2}
        onDone={() => { resetTurn(); setPhase('p1-play'); }}
      />
    );
  }

  // ── Stage board ────────────────────────────────────────────────────────────
  if (phase === 'stage-board') {
    return (
      <ChallengBoard
        stage={currentStage}
        levelInStage={levelInStage}
        p1={p1} p2={p2}
        p1StageScore={stageScores(p1Scores, currentStage)}
        p2StageScore={stageScores(p2Scores, currentStage)}
        p1TotalScore={totalScore(p1Scores)}
        p2TotalScore={totalScore(p2Scores)}
        isStageSummary
        onNext={handleBoardNext}
      />
    );
  }

  // ── Final board ────────────────────────────────────────────────────────────
  if (phase === 'final-board') {
    return (
      <ChallengBoard
        stage={currentStage}
        levelInStage={levelInStage}
        p1={p1} p2={p2}
        p1StageScore={stageScores(p1Scores, currentStage)}
        p2StageScore={stageScores(p2Scores, currentStage)}
        p1TotalScore={totalScore(p1Scores)}
        p2TotalScore={totalScore(p2Scores)}
        isFinal
        onNext={handleBoardNext}
      />
    );
  }

  // ── Main game UI ───────────────────────────────────────────────────────────
  return (
    <div className="flex w-full h-full bg-[#0d1117] text-gray-200 rounded-xl overflow-hidden border border-gray-800 shadow-2xl flex-col">
      <style>{injectedCSS}</style>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
        {/* Player badges */}
        <div className="flex items-center gap-3">
          <PlayerBadge player={p1} score={totalScore(p1Scores)} active={phase === 'p1-play' || phase === 'p1-result'} />
          <span className="text-slate-600 font-black text-xs">VS</span>
          <PlayerBadge player={p2} score={totalScore(p2Scores)} active={phase === 'p2-play' || phase === 'p2-result'} />
        </div>

        {/* Stage + level info */}
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Stage {currentStage} · Level {levelInStage}/10
          </p>
          <p className="text-xs text-slate-400 font-semibold">{STAGES[currentStage - 1].label}</p>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 hover:border-red-500/50 text-slate-400 rounded-lg transition"
        >
          Exit
        </button>
      </div>

      {/* Active player turn banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 px-4 py-1.5 border-b border-gray-800 text-xs font-bold
            ${isP1Turn ? 'bg-blue-900/30 border-blue-900/50' : 'bg-rose-900/30 border-rose-900/50'}`}
        >
          <span className="text-lg">{activePlayer.character.emoji}</span>
          <span className={isP1Turn ? 'text-blue-400' : 'text-rose-400'}>
            {activePlayer.name}'s Turn
          </span>
          {(phase === 'p1-play' || phase === 'p2-play') && (
            <span className="ml-auto text-slate-400">
              ⏱ {timeLeft}s
            </span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Timer bar */}
      {(phase === 'p1-play' || phase === 'p2-play') && (
        <div className="h-1 bg-slate-800 relative">
          <motion.div
            className={`h-full ${timerColor} transition-colors`}
            style={{ width: `${timerPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left — editor */}
        <div className="w-1/3 flex flex-col bg-[#161b22] border-r border-gray-800">
          {/* Instructions */}
          <div className="p-4 border-b border-gray-800 overflow-y-auto max-h-40">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Challenge</p>
            <p className="text-sm text-gray-200 leading-relaxed">{currentLevel.instructions}</p>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 font-mono"
              >
                💡 {currentLevel.hint}
              </motion.div>
            )}
          </div>

          {/* Code editor */}
          <div className="flex-1 bg-[#0d1117] flex flex-col relative pb-24">
            <div className="bg-gray-800/50 px-4 py-1.5 text-xs font-mono text-gray-400 border-b border-gray-800">
              style.css
            </div>
            <div className="p-4 font-mono text-sm flex-1 flex flex-col overflow-y-auto">
              <div className="text-gray-500 whitespace-pre-wrap">{currentLevel.editorBefore}</div>
              {(phase === 'p1-play' || phase === 'p2-play') ? (
                <textarea
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  className="w-full bg-transparent text-emerald-400 outline-none resize-none my-1 ml-4 border-l-2 border-gray-700 pl-2 placeholder:text-gray-700 focus:border-emerald-500 transition-colors min-h-[80px]"
                  spellCheck={false}
                  placeholder="/* tailwind-classes */"
                  autoFocus
                />
              ) : (
                <div className="my-1 ml-4 border-l-2 border-gray-700 pl-2 text-emerald-400 font-mono text-sm min-h-[40px] whitespace-pre-wrap opacity-60">
                  {userInput || '/* —— */'}
                </div>
              )}
              <div className="text-gray-500 whitespace-pre-wrap">{currentLevel.editorAfter}</div>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0d1117] to-transparent">
              {(phase === 'p1-play' || phase === 'p2-play') && (
                <div className="flex gap-2">
                  {!hintUsed && (
                    <button
                      onClick={() => { setShowHint(true); setHintUsed(true); }}
                      className="px-3 py-2 text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg transition"
                    >
                      💡 Hint (–2pts)
                    </button>
                  )}
                  <button
                    onClick={handleRun}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    ▶ Run Code
                  </button>
                </div>
              )}

              {(phase === 'p1-result' || phase === 'p2-result') && (
                <ResultBanner result={lastResult} onNext={handleNextAfterResult} isP1={phase === 'p1-result'} nextPlayer={p2} />
              )}
            </div>
          </div>
        </div>

        {/* Right — preview */}
        <div id="challenge-preview-board" className="w-2/3 bg-[#1f2937] relative overflow-hidden flex items-center justify-center p-8">
          {/* Target lilypads layer */}
          <div
            className="absolute inset-8 border-2 border-gray-700/30 rounded-xl"
            style={{
              display: currentLevel.mode === 'flex' ? 'flex' : 'grid',
              ...(currentLevel.targetContainerCSS || {}),
            }}
          >
            {currentLevel.frogs.map((frog, i) => (
              <div
                key={`target-${frog.id}-${i}`}
                className={`w-16 h-16 rounded-full border-4 flex items-center justify-center m-1 opacity-40 ${getLilyBorder(frog.color)}`}
                style={currentLevel.targetItemCSS?.[frog.id] || {}}
              >
                <span className="text-2xl opacity-50 filter grayscale">🍃</span>
              </div>
            ))}
          </div>

          {/* Frog layer */}
          <div
            id={currentLevel.mode === 'flex' ? 'pond' : 'garden'}
            className="absolute inset-8 rounded-xl transition-all duration-500"
            style={{ display: currentLevel.mode === 'flex' ? 'flex' : 'grid' }}
          >
            {currentLevel.frogs.map((frog, i) => (
              <div
                key={`frog-${frog.id}-${i}`}
                className={`w-16 h-16 rounded-full flex items-center justify-center m-1 shadow-2xl ${getFrogBg(frog.color)} ${frog.color}`}
              >
                <span className="text-3xl">🐸</span>
              </div>
            ))}
          </div>

          {/* Level board mini overlay (between turns) */}
          {phase === 'level-board' && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <ChallengBoard
                stage={currentStage}
                levelInStage={levelInStage}
                p1={p1} p2={p2}
                p1StageScore={stageScores(p1Scores, currentStage)}
                p2StageScore={stageScores(p2Scores, currentStage)}
                p1TotalScore={totalScore(p1Scores)}
                p2TotalScore={totalScore(p2Scores)}
                onNext={handleBoardNext}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
function PlayerBadge({ player, score, active }: { player: PlayerInfo; score: number; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-all ${
      active ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-800/50'
    }`}>
      <span className="text-xl">{player.character.emoji}</span>
      <div>
        <p className={`text-xs font-black ${active ? 'text-blue-300' : 'text-slate-400'}`}>{player.name}</p>
        <p className="text-[10px] text-slate-500 font-mono">{score} pts</p>
      </div>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse ml-1" />}
    </div>
  );
}

function ResultBanner({
  result, onNext, isP1, nextPlayer
}: { result: 'correct' | 'wrong' | 'timeout' | null; onNext: () => void; isP1: boolean; nextPlayer: PlayerInfo }) {
  const config = {
    correct: { bg: 'bg-emerald-600', icon: '✅', text: 'Correct!' },
    wrong:   { bg: 'bg-red-600',     icon: '❌', text: 'Wrong!'   },
    timeout: { bg: 'bg-amber-600',   icon: '⏰', text: 'Time Up!' },
  }[result ?? 'wrong'];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${config.bg} rounded-xl p-3 flex items-center justify-between`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{config.icon}</span>
        <span className="text-white font-black text-sm">{config.text}</span>
      </div>
      <button
        onClick={onNext}
        className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-lg transition flex items-center gap-1"
      >
        {isP1 ? `${nextPlayer.character.emoji} ${nextPlayer.name}'s Turn →` : 'Next Level →'}
      </button>
    </motion.div>
  );
}
