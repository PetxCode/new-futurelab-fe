import React, { useState, useEffect, useRef } from 'react';
import { HTML_TAG_STAGES } from './htmlTagMasterData';
import { motion, AnimatePresence } from 'framer-motion';

export default function HtmlTagMaster() {
  const [stageIndex, setStageIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const currentStage = HTML_TAG_STAGES[stageIndex];
  const currentLevel = currentStage.levels[levelIndex];
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserInput('');
    setIsSuccess(false);
    setShowHint(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [stageIndex, levelIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setIsSuccess(false);
    setShake(false);
  };

  const checkAnswer = () => {
    const sanitizedInput = userInput.trim().toLowerCase();
    
    // Check against expected tags
    const isCorrect = currentLevel.expectedTags.some(tag => 
      sanitizedInput === tag || 
      sanitizedInput === `<${tag}>` || 
      sanitizedInput === `</${tag}>` ||
      sanitizedInput === `<${tag}/>`
    );

    if (isCorrect) {
      setIsSuccess(true);
      setTimeout(() => {
        nextLevel();
      }, 1500);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const nextLevel = () => {
    if (levelIndex < currentStage.levels.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (stageIndex < HTML_TAG_STAGES.length - 1) {
      setStageIndex(stageIndex + 1);
      setLevelIndex(0);
    }
  };

  const prevLevel = () => {
    if (levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    } else if (stageIndex > 0) {
      setStageIndex(stageIndex - 1);
      setLevelIndex(HTML_TAG_STAGES[stageIndex - 1].levels.length - 1);
    }
  };

  return (
    <div className="flex w-full h-full bg-[#0d1117] text-gray-200 font-sans rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
      
      {/* Left Pane - Navigation & Instructions */}
      <div className="w-1/3 bg-[#161b22] flex flex-col h-full border-r border-gray-800 z-10">
        
        {/* Header - Stage Selection */}
        <div className="p-4 bg-[#0d1117] border-b border-gray-800">
          <select 
            value={stageIndex}
            onChange={(e) => {
              setStageIndex(Number(e.target.value));
              setLevelIndex(0);
            }}
            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 outline-none focus:border-emerald-500 transition-colors"
          >
            {HTML_TAG_STAGES.map((stage, idx) => (
              <option key={stage.id} value={idx}>{stage.title}</option>
            ))}
          </select>
          <div className="text-xs text-gray-400 mt-2">{currentStage.description}</div>
        </div>
        
        {/* Level Navigation */}
        <div className="flex items-center justify-between p-4 bg-[#161b22] border-b border-gray-800">
          <button onClick={prevLevel} disabled={stageIndex === 0 && levelIndex === 0} className="text-gray-400 hover:text-white disabled:opacity-30">
            ← Prev
          </button>
          <span className="text-sm font-medium">
            Level {levelIndex + 1} of {currentStage.levels.length}
          </span>
          <button onClick={nextLevel} disabled={stageIndex === HTML_TAG_STAGES.length - 1 && levelIndex === currentStage.levels.length - 1} className="text-gray-400 hover:text-white disabled:opacity-30">
            Next →
          </button>
        </div>

        {/* Level Instructions */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-emerald-400">
            Identify the Tag
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
            {currentLevel.description}
          </p>

          {/* Hint Section */}
          <div className="mt-8 border-t border-gray-800 pt-6">
            {!showHint ? (
              <button 
                onClick={() => setShowHint(true)}
                className="text-sm text-yellow-500 hover:text-yellow-400 border border-yellow-500/30 rounded px-3 py-1 bg-yellow-500/10 transition-colors"
              >
                💡 Need a Hint?
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-sm text-yellow-300"
              >
                <strong>Hint:</strong> {currentLevel.hint}
              </motion.div>
            )}
          </div>
        </div>

      </div>

      {/* Right Pane - Visual Element & Input */}
      <div className="w-2/3 bg-[#1f2937] flex flex-col relative overflow-hidden pattern-dots pattern-gray-800 pattern-bg-transparent pattern-size-4 pattern-opacity-100">
        
        {/* Visual Mockup Display */}
        <div className="flex-1 flex items-center justify-center p-12">
          <motion.div
            key={currentLevel.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white text-gray-900 rounded-xl p-8 shadow-2xl max-w-lg w-full min-h-[200px] flex items-center justify-center text-center font-serif text-xl border-4 border-gray-300 relative"
          >
            {/* Browser-like header for aesthetic */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 border-b border-gray-300 rounded-t-lg flex items-center px-2 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            
            <div className="mt-6 whitespace-pre-wrap">
              {currentLevel.visualMock}
            </div>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="h-48 bg-[#0d1117] border-t border-gray-800 p-8 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-md flex items-center gap-4 relative">
            <span className="text-2xl text-gray-500 font-mono">&lt;</span>
            <motion.input
              ref={inputRef}
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isSuccess}
              placeholder="tagname"
              className={`flex-1 bg-gray-900 border-2 rounded-lg px-4 py-3 text-2xl font-mono text-center outline-none transition-colors
                ${isSuccess ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 
                  shake ? 'border-red-500 text-red-400 bg-red-500/10' : 
                  'border-gray-700 text-blue-400 focus:border-blue-500 focus:bg-gray-800'}
              `}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            <span className="text-2xl text-gray-500 font-mono">&gt;</span>
          </div>
          
          <button 
            onClick={checkAnswer}
            disabled={isSuccess || !userInput}
            className={`mt-6 px-8 py-2 rounded-full font-bold transition-all
              ${isSuccess ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 
                'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'}
            `}
          >
            {isSuccess ? 'Correct!' : 'Check Tag'}
          </button>

          {/* Success Confetti overlay */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <div className="text-6xl filter drop-shadow-2xl">✨🎉✨</div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
