import React, { useState, useEffect } from 'react';
import { flexLevels, gridLevels, LayoutLevel, LevelMode, Frog } from './layoutMasterData';
import { motion } from 'framer-motion';
import CharacterSelect, { Character } from './components/CharacterSelect';
import ChallengeGame from './components/ChallengeGame';

type ChallengeMode = 'idle' | 'selecting' | 'playing';

interface ChallengePlayer {
  character: Character;
  name: string;
}

export default function LayoutMaster() {
  const [mode, setMode] = useState<LevelMode>('flex');
  const [syntaxMode, setSyntaxMode] = useState<'tailwind'>('tailwind');

  // Tailwind mode indicator – CSS mode removed for a pure Tailwind UI
  const syntaxLabel = (
    <div className="flex items-center justify-center p-2 bg-[#161b22] border-b border-gray-800 text-sm text-gray-300">
      TailwindCSS mode (fixed)
    </div>
  );  const [levelIndex, setLevelIndex] = useState(0);

  // Challenge a Friend
  const [challengeMode, setChallengeMode] = useState<ChallengeMode>('idle');
  const [p1, setP1] = useState<ChallengePlayer | null>(null);
  const [p2, setP2] = useState<ChallengePlayer | null>(null);
  
  const [userInput, setUserInput] = useState('');
  const [appliedInput, setAppliedInput] = useState(''); // Only updates when 'Run Code' is clicked
  const [isSuccess, setIsSuccess] = useState(false);

  const levels = mode === 'flex' ? flexLevels : gridLevels;
  const currentLevel = levels[levelIndex];

  // ── Challenge Mode Rendering ────────────────────────────────────────
  if (challengeMode === 'selecting') {
    return (
      <CharacterSelect
        onReady={(player1, player2) => {
          setP1(player1);
          setP2(player2);
          setChallengeMode('playing');
        }}
        onBack={() => setChallengeMode('idle')}
      />
    );
  }

  if (challengeMode === 'playing' && p1 && p2) {
    return (
      <ChallengeGame
        p1={p1}
        p2={p2}
        onExit={() => { setChallengeMode('idle'); setP1(null); setP2(null); }}
      />
    );
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
    // Removed auto-validation to allow "Run Code" button to handle it
  };

  const handleRunCode = () => {
    setAppliedInput(userInput);
    
    // Tailwind‑only validation
    const passed = currentLevel.expectedTailwind.every(tw => userInput.includes(tw));

    setIsSuccess(passed);
  };

  const nextLevel = () => {
    if (levelIndex < levels.length - 1) setLevelIndex(levelIndex + 1);
  };

  const prevLevel = () => {
    if (levelIndex > 0) setLevelIndex(levelIndex - 1);
  };

  const containerId = mode === 'flex' ? '#pond' : '#garden';
  
  // No CSS injection needed – Tailwind mode only
  const injectedCSS = '';

  // Tailwind classes to apply (if in tailwind mode)
  const containerTailwind = syntaxMode === 'tailwind' && !currentLevel.targetSelector ? appliedInput : '';
  const itemTailwind = syntaxMode === 'tailwind' && currentLevel.targetSelector ? appliedInput : '';

  const getFrogColor = (color: string) => {
    switch(color) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-400';
      default: return 'bg-green-500';
    }
  };

  const getLilypadColor = (color: string) => {
    switch(color) {
      case 'red': return 'border-red-500/50 bg-red-500/20';
      case 'yellow': return 'border-yellow-400/50 bg-yellow-400/20';
      default: return 'border-green-500/50 bg-green-500/20';
    }
  };

  // Construct editor context based on syntax mode
  const getEditorBefore = () => {
    if (syntaxMode === 'css') return currentLevel.editorBefore;
    const baseClass = mode === 'flex' ? 'flex' : 'grid';
    if (currentLevel.targetSelector) {
      const targetClass = currentLevel.targetSelector.replace('.', '');
      return `<div id="${mode === 'flex' ? 'pond' : 'garden'}" className="${baseClass} ...">\n  <div className="${targetClass} `;
    }
    return `<div id="${mode === 'flex' ? 'pond' : 'garden'}" className="${baseClass} `;
  };

  const getEditorAfter = () => {
    if (syntaxMode === 'css') return currentLevel.editorAfter;
    if (currentLevel.targetSelector) {
      return `">🐸</div>\n</div>`;
    }
    return `">\n  {/* frogs */}\n</div>`;
  };

  return (
    <div className="flex w-full h-full bg-[#0d1117] text-gray-200 font-sans rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
      <style>{injectedCSS}</style>
      
      {/* Left Pane - Editor & Instructions */}
      <div className="w-1/3 bg-[#161b22] flex flex-col h-full border-r border-gray-800 z-10 relative">
        
        {/* Header - Game Mode */}
        <div className="flex items-center justify-between p-4 bg-[#0d1117] border-b border-gray-800">
          {/* Left: Mode toggles */}
          <div className="flex space-x-2">
            <button
              onClick={() => { setMode('flex'); setLevelIndex(0); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'flex' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <span className="text-xl">☰</span> Flex
            </button>
            <button
              onClick={() => { setMode('grid'); setLevelIndex(0); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'grid' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <span className="text-xl">▦</span> Grid
            </button>
          </div>

          {/* Right: Challenge button */}
          <button
            onClick={() => setChallengeMode('selecting')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:from-emerald-600 hover:to-emerald-800 transition-transform transform hover:scale-105 shadow-md"
            aria-label="Challenge a Friend"
          >
            ⚔️ <span>Challenge</span>
          </button>
        </div>

        {/* Level Navigation */}
        <div className="flex items-center justify-end p-2 border-b border-gray-800 bg-[#161b22]">
          <div className="flex items-center gap-2">
            <button onClick={prevLevel} disabled={levelIndex === 0} className="p-1 text-gray-400 hover:text-white disabled:opacity-30 text-xl font-bold">
              ←
            </button>
            <span className="text-sm font-medium">
              Level {levelIndex + 1} of {levels.length}
            </span>
            <button onClick={nextLevel} disabled={levelIndex === levels.length - 1} className="p-1 text-gray-400 hover:text-white disabled:opacity-30 text-xl font-bold">
              →
            </button>
          </div>
        </div>

        {/* Syntax Mode Toggle (CSS / Tailwind) */}
        <div className="flex items-center justify-center p-2 bg-[#161b22] border-b border-gray-800 space-x-2">
          <button
            onClick={() => setSyntaxMode('css')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${syntaxMode === 'css' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            CSS
          </button>
          <button
            onClick={() => setSyntaxMode('tailwind')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${syntaxMode === 'tailwind' ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Tailwind
          </button>
        </div>

        {/* Instructions */}
        <div className="p-6 overflow-y-auto max-h-[30%]">
          <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            {mode === 'flex' ? 'Flexbox Froggy' : 'Grid Garden'} <span className="text-sm font-normal text-gray-400 ml-2">({syntaxMode.toUpperCase()})</span>
          </h2>
          <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
            {currentLevel.instructions}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-[#0d1117] flex flex-col relative pb-16">
          <div className="bg-gray-800/50 px-4 py-2 text-xs font-mono text-gray-400 border-y border-gray-800 flex justify-between">
            <span>{syntaxMode === 'css' ? 'style.css' : 'App.tsx'}</span>
          </div>
          <div className="p-4 font-mono text-sm flex-1 flex flex-col relative overflow-y-auto">
            <div className="text-gray-500 whitespace-pre-wrap">{getEditorBefore()}</div>
            <textarea
              value={userInput}
              onChange={handleInputChange}
              className={`w-full bg-transparent text-emerald-400 outline-none resize-none my-1 ml-4 border-l-2 border-gray-700 pl-2 placeholder:text-gray-700 focus:border-emerald-500 transition-colors ${syntaxMode === 'tailwind' ? 'min-h-[40px]' : 'min-h-[100px]'}`}
              spellCheck={false}
              placeholder={syntaxMode === 'css' ? "/* Type CSS here */" : "/* tailwind-classes */"}
              autoFocus
            />
            <div className="text-gray-500 whitespace-pre-wrap">{getEditorAfter()}</div>
          </div>
          
          {/* Run Code Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0d1117] to-transparent flex justify-end">
            <button 
              onClick={handleRunCode}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-indigo-900/50 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>▶</span> Run Code
            </button>
          </div>
        </div>
        
        {/* Success Banner */}
        {isSuccess && (
          <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 p-6 flex flex-col items-center justify-center gap-4 z-50">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span>✅</span> Awesome!
            </div>
            <button
              onClick={nextLevel}
              className="bg-white text-emerald-600 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Next Level <span>→</span>
            </button>
          </div>
        )}
      </div>

      {/* Right Pane - Visual Game Board */}
      <div id="layout-master-game-board" className="w-2/3 bg-[#1f2937] relative overflow-hidden flex items-center justify-center p-8 pattern-dots pattern-gray-800 pattern-bg-transparent pattern-size-4 pattern-opacity-100">
        
        {/* Background Target Layer (Lilypads/Garden beds) */}
        <div
          className="absolute inset-8 border-2 border-gray-700/30 rounded-xl"
          style={{
            display: mode === 'flex' ? 'flex' : 'grid',
            ...(currentLevel.targetContainerCSS || {})
          }}
        >
          {currentLevel.frogs.map((frog, i) => (
            <div
              key={`target-${frog.id}-${i}`}
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center m-1 shadow-inner opacity-50 ${getLilypadColor(frog.color)}`}
              style={currentLevel.targetItemCSS?.[frog.id] || {}}
            >
              <span className="text-3xl opacity-50 filter grayscale">🍃</span>
            </div>
          ))}
        </div>

        {/* Foreground Active Layer (Frogs) */}
        <div
          id={mode === 'flex' ? 'pond' : 'garden'}
          className={`absolute inset-8 rounded-xl transition-all duration-500 ease-in-out ${containerTailwind}`}
          style={{
            display: mode === 'flex' ? 'flex' : 'grid',
            ...(isSuccess && currentLevel.targetContainerCSS ? currentLevel.targetContainerCSS : {})
          }}
        >
          {currentLevel.frogs.map((frog, i) => {
            const isTargeted = currentLevel.targetSelector && currentLevel.targetSelector.includes(frog.color);
            return (
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 45, damping: 15 }}
                key={`active-${frog.id}-${i}`}
                className={`w-20 h-20 rounded-full flex items-center justify-center m-1 shadow-2xl ${getFrogColor(frog.color)} ${frog.color} ${isTargeted ? itemTailwind : ''}`}
                style={{
                  ...(isSuccess && currentLevel.targetItemCSS?.[frog.id] ? currentLevel.targetItemCSS[frog.id] : {})
                }}
              >
                <span className="text-4xl drop-shadow-md">🐸</span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
