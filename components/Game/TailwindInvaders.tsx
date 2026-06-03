import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TAILWIND_INVADERS_LEVELS,
  InvaderLevel,
  InvaderTarget,
} from "./tailwindInvadersData";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

interface ActiveInvader extends InvaderTarget {
  uid: string; // unique id per spawn
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  isHit: boolean;
}

const GAME_SPEED_BASE = 0.0005; // Slower vertical movement speed

  // Input field placeholder styling for visibility
  // (Added Tailwind classes for placeholder text color)

const GAME_HEIGHT = 80; // Ground level percentage

export default function TailwindInvaders() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [inputVal, setInputVal] = useState("");
  const [activeInvaders, setActiveInvaders] = useState<ActiveInvader[]>([]);

  const currentLevel = TAILWIND_INVADERS_LEVELS[levelIndex];

  const invadersRef = useRef<ActiveInvader[]>([]);
  const requestRef = useRef<number>();
  const lastSpawnTime = useRef<number>(0);

  // Sync ref with state for the game loop
  useEffect(() => {
    invadersRef.current = activeInvaders;
  }, [activeInvaders]);

  const spawnInvader = useCallback(
    (timestamp: number) => {
      if (timestamp - lastSpawnTime.current > currentLevel.spawnRate) {
        const targetTemplate =
          currentLevel.targets[
            Math.floor(Math.random() * currentLevel.targets.length)
          ];
        const newInvader: ActiveInvader = {
          ...targetTemplate,
          uid: `${Date.now()}-${Math.random()}`,
          x: Math.random() * 70 + 10, // 10% to 80% width
          y: -10, // start above screen
          isHit: false,
        };

        setActiveInvaders((prev) => [...prev, newInvader]);
        lastSpawnTime.current = timestamp;
      }
    },
    [currentLevel],
  );

  const updateLoop = useCallback(
    (timestamp: number) => {
      if (!isPlaying || isGameOver) return;

      spawnInvader(timestamp);

      setActiveInvaders((prev) => {
        let lifeLost = false;

        const updated = prev
          .map((invader) => {
            if (invader.isHit) return invader; // Don't move if hit (playing animation)

            const newY =
              invader.y + GAME_SPEED_BASE * currentLevel.speedMultiplier * 16; // ~16ms per frame

            if (newY >= GAME_HEIGHT && !invader.isHit) {
              lifeLost = true;
            }

            return { ...invader, y: newY };
          })
          .filter((invader) => {
            // Keep invaders that are hit (to finish animation) or haven't reached bottom
            if (invader.isHit) return true; // Handled by a timeout elsewhere, but for now we'll just filter them out immediately on hit below
            return invader.y < GAME_HEIGHT;
          });

        if (lifeLost) {
          setLives((l) => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
            } else {
              // Optional: Shake screen or flash red
            }
            return newLives;
          });
        }

        return updated;
      });

      requestRef.current = requestAnimationFrame(updateLoop);
    },
    [isPlaying, isGameOver, currentLevel, spawnInvader],
  );

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      requestRef.current = requestAnimationFrame(updateLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isGameOver, updateLoop]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setInputVal(e.target.value);

    // Check for match
    const hitIndex = invadersRef.current.findIndex(
      (inv) => !inv.isHit && inv.expectedClass.toLowerCase() === val,
    );

    if (hitIndex !== -1) {
      // Hit!
      setInputVal("");
      setScore((s) => {
        const newScore = s + 100;
        // Level progression
        if (
          newScore > 0 &&
          newScore % 1000 === 0 &&
          levelIndex < TAILWIND_INVADERS_LEVELS.length - 1
        ) {
          setLevelIndex((l) => l + 1);
          toast.success(
            `Level Up! ${TAILWIND_INVADERS_LEVELS[levelIndex + 1].title}`,
            { icon: "🚀" },
          );
          confetti({ particleCount: 50, spread: 60 });
        }
        return newScore;
      });

      setActiveInvaders((prev) => prev.filter((_, i) => i !== hitIndex));

      // Optional: Visual pop effect could be added here by setting isHit to true and delaying removal
    }
  };

  const startGame = () => {
    setLevelIndex(0);
    setScore(0);
    setLives(10);
    setActiveInvaders([]);
    setIsGameOver(false);
    setIsPlaying(true);
    lastSpawnTime.current = performance.now();
  };

  return (
    <div className="w-full h-full bg-[#0d1117] text-white flex flex-col font-sans overflow-hidden border border-slate-800 rounded-xl relative">
      {/* HUD Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-tight">
            Tailwind Invaders
          </h2>
          {isPlaying && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase rounded-md border border-blue-500/30">
              Level {currentLevel.levelNumber}: {currentLevel.title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-8 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Score
            </span>
            <span className="text-2xl font-black text-cyan-400 leading-none">
              {score}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Lives
            </span>
            <div className="flex flex-wrap max-w-[120px] justify-end gap-1 text-rose-500 text-sm leading-none">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className={i < lives ? "opacity-100" : "opacity-20"}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#16213e] via-[#0f172a] to-[#020617]">
        {/* Starfield background effect could go here */}

        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <div className="max-w-md text-center p-8 bg-slate-900/90 rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <span className="text-6xl mb-6 block">👾</span>
              <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-wider">
                Defend the UI
              </h1>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Unstyled elements are invading! Type the correct{" "}
                <strong className="text-cyan-400">Tailwind Class</strong> to
                style them before they crash into your layout.
              </p>
              <button
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition transform hover:scale-105 active:scale-95 text-lg uppercase tracking-wider"
              >
                Start Mission
              </button>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-950/80 backdrop-blur-md z-20">
            <div className="text-center p-10 bg-slate-900 rounded-3xl border-2 border-rose-500 shadow-[0_0_100px_rgba(225,29,72,0.4)]">
              <span className="text-7xl mb-4 block animate-bounce">💥</span>
              <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-widest text-rose-500">
                Game Over
              </h2>
              <p className="text-xl text-slate-300 mb-8 font-mono">
                Final Score:{" "}
                <span className="text-white font-black">{score}</span>
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition transform hover:scale-105 active:scale-95 text-sm uppercase tracking-wider shadow-lg shadow-rose-900"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* The Ground */}
        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent border-t border-slate-800/50 z-0"></div>

        {/* Falling Invaders */}
        <AnimatePresence>
          {activeInvaders.map((invader) => (
            <motion.div
              key={invader.uid}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              className="absolute flex flex-col items-center shadow-2xl z-10"
              style={{
                left: `${invader.x}%`,
                top: `${invader.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="bg-slate-900/90 backdrop-blur border border-cyan-500/50 text-cyan-100 text-xs font-bold px-3 py-1.5 rounded-full mb-3 shadow-[0_0_15px_rgba(6,182,212,0.3)] whitespace-nowrap">
                {invader.instruction}
              </div>
              <div
                className={`transition-all duration-300 ${invader.baseClasses}`}
              >
                {/* Visual representation of the unstyled element */}
                <span className="opacity-50 text-xs font-mono">
                  &lt;div/&gt;
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 lg:p-6 bg-slate-900 border-t-2 border-cyan-500 relative z-30 shrink-0 shadow-[0_-10px_30px_rgba(6,182,212,0.15)]">
        <div className="max-w-3xl mx-auto flex items-center gap-4 relative">
          <span className="absolute left-6 text-cyan-500 font-mono text-2xl font-black">
            &gt;
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            disabled={!isPlaying || isGameOver}
            placeholder={
              isPlaying ? "Type Tailwind class here..." : "Press Start..."
            }
            className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-500 rounded-xl py-4 pl-14 pr-4 text-2xl font-mono text-cyan-300 placeholder:text-gray-400 placeholder:italic outline-none transition-colors shadow-inner disabled:opacity-50"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
