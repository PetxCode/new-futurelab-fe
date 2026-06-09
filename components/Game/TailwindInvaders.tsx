import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TAILWIND_INVADERS_LEVELS,
  InvaderTarget,
} from "./tailwindInvadersData";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import MultiplayerInvaders from "./components/MultiplayerInvaders";

interface ActiveInvader extends InvaderTarget {
  uid: string;
  x: number;
  y: number;
  isHit: boolean;
}

const GAME_SPEED_BASE = 0.0005;
const GAME_HEIGHT = 80;

const SPEED_PRESETS = [
  { label: "🐢 Chill", value: 0.6 },
  { label: "😊 Normal", value: 1 },
  { label: "🔥 Fast", value: 2 },
  { label: "⚡ Insane", value: 4 },
];

export default function TailwindInvaders() {
  const [mode, setMode] = useState<"menu" | "solo" | "multiplayer">("menu");

  const [levelIndex, setLevelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [inputVal, setInputVal] = useState("");
  const [activeInvaders, setActiveInvaders] = useState<ActiveInvader[]>([]);
  const [customSpeed, setCustomSpeed] = useState(1);
  const [combo, setCombo] = useState(0);
  const [lastHitMsg, setLastHitMsg] = useState("");

  const currentLevel = TAILWIND_INVADERS_LEVELS[levelIndex];

  const invadersRef = useRef<ActiveInvader[]>([]);
  const requestRef = useRef<number>();
  const lastSpawnTime = useRef<number>(0);

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
          x: Math.random() * 70 + 10,
          y: -10,
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
            if (invader.isHit) return invader;
            const newY =
              invader.y +
              GAME_SPEED_BASE * currentLevel.speedMultiplier * customSpeed * 16;
            if (newY >= GAME_HEIGHT && !invader.isHit) lifeLost = true;
            return { ...invader, y: newY };
          })
          .filter((invader) => invader.isHit || invader.y < GAME_HEIGHT);

        if (lifeLost) {
          setLives((l) => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
            }
            return newLives;
          });
          setCombo(0);
        }

        return updated;
      });

      requestRef.current = requestAnimationFrame(updateLoop);
    },
    [isPlaying, isGameOver, currentLevel, customSpeed, spawnInvader],
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

    const hitIndex = invadersRef.current.findIndex(
      (inv) => !inv.isHit && inv.expectedClass.toLowerCase() === val,
    );

    if (hitIndex !== -1) {
      setInputVal("");
      setCombo((c) => c + 1);
      const newCombo = combo + 1;
      const bonus = newCombo >= 3 ? 150 : 100;
      setLastHitMsg(
        newCombo >= 3
          ? `🔥 x${newCombo} COMBO! +${bonus}`
          : `✅ Hit! +${bonus}`,
      );
      setTimeout(() => setLastHitMsg(""), 900);

      setScore((s) => {
        const newScore = s + bonus;
        if (
          newScore > 0 &&
          newScore % 1000 === 0 &&
          levelIndex < TAILWIND_INVADERS_LEVELS.length - 1
        ) {
          setLevelIndex((l) => l + 1);
          toast.success(
            `Level Up! ${TAILWIND_INVADERS_LEVELS[levelIndex + 1]?.title}`,
            { icon: "🚀" },
          );
          confetti({ particleCount: 50, spread: 60 });
        }
        return newScore;
      });

      setActiveInvaders((prev) => prev.filter((_, i) => i !== hitIndex));
    }
  };

  const startGame = () => {
    setLevelIndex(0);
    setScore(0);
    setLives(10);
    setActiveInvaders([]);
    setIsGameOver(false);
    setIsPlaying(true);
    setCombo(0);
    lastSpawnTime.current = performance.now();
  };

  // ── Multiplayer mode ───────────────────────────────────────────────
  if (mode === "multiplayer") {
    return <MultiplayerInvaders onExit={() => setMode("menu")} />;
  }

  // ── Mode selector menu ─────────────────────────────────────────────
  if (mode === "menu") {
    return (
      <div className="w-full h-full bg-[#0a0e1a] flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="max-w-lg w-full text-center flex flex-col gap-8">
          <div>
            <span className="text-7xl block mb-4">👾</span>
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-tight mb-2">
              Tailwind Invaders
            </h1>
            <p className="text-slate-400 leading-relaxed">
              Unstyled elements are invading! Type the correct{" "}
              <strong className="text-cyan-400">Tailwind class</strong> to style
              them before they crash.
            </p>
          </div>

          {/* Speed selector */}
          <div className="bg-[#111827] border border-cyan-500/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
              ⚡ Select Speed
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SPEED_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setCustomSpeed(p.value)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${customSpeed === p.value ? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "bg-[#0a0e1a] border border-gray-800 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMode("solo");
                startGame();
              }}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition transform hover:scale-105 active:scale-95 text-lg uppercase tracking-wider"
            >
              🎮 Solo Mission
            </button>
            <button
              onClick={() => setMode("multiplayer")}
              className="w-full py-4 bg-[#111827] border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 font-black rounded-xl transition transform hover:scale-105 active:scale-95 text-lg uppercase tracking-wider"
            >
              🌐 Multiplayer Battle
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Solo game ──────────────────────────────────────────────────────
  return (
    <div className="w-full h-full bg-[#0a0e1a] text-white flex flex-col font-sans overflow-hidden border border-slate-800 rounded-xl relative">
      {/* HUD */}
      <div className="p-4 bg-[#111827] border-b border-cyan-500/30 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setMode("menu");
              setIsPlaying(false);
              if (requestRef.current) cancelAnimationFrame(requestRef.current);
            }}
            className="text-xs font-bold text-gray-500 hover:text-cyan-400 uppercase tracking-wider flex items-center gap-1 transition"
          >
            ← Menu
          </button>
          <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-tight">
            Tailwind Invaders
          </h2>
          {isPlaying && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase rounded-md border border-blue-500/30">
              Lv {currentLevel.levelNumber}: {currentLevel.title}
            </span>
          )}
          <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase rounded border border-cyan-500/20">
            {SPEED_PRESETS.find((p) => p.value === customSpeed)?.label ??
              `${customSpeed}x`}
          </span>
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

      {/* Game area */}
      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#16213e] via-[#0f172a] to-[#020617]">
        {/* Combo flash */}
        <AnimatePresence>
          {lastHitMsg && (
            <motion.div
              key={lastHitMsg + Date.now()}
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-black text-sm rounded-full backdrop-blur"
            >
              {lastHitMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start screen */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <div className="max-w-md text-center p-8 bg-slate-900/90 rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <span className="text-6xl mb-6 block">👾</span>
              <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-wider">
                Defend the UI
              </h1>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Type the correct{" "}
                <strong className="text-cyan-400">Tailwind Class</strong> to
                style invaders before they crash your layout.
              </p>
              <div className="flex items-center justify-center gap-2 mb-6 text-sm">
                <span className="text-gray-400">Speed:</span>
                <span className="font-black text-cyan-400">
                  {SPEED_PRESETS.find((p) => p.value === customSpeed)?.label}
                </span>
              </div>
              <button
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition transform hover:scale-105 active:scale-95 text-lg uppercase tracking-wider"
              >
                Start Mission
              </button>
            </div>
          </div>
        )}

        {/* Game over */}
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-950/80 backdrop-blur-md z-20">
            <div className="text-center p-10 bg-slate-900 rounded-3xl border-2 border-rose-500 shadow-[0_0_100px_rgba(225,29,72,0.4)]">
              <span className="text-7xl mb-4 block animate-bounce">💥</span>
              <h2 className="text-4xl font-black text-rose-500 mb-2 uppercase tracking-widest">
                Game Over
              </h2>
              <p className="text-xl text-slate-300 mb-3 font-mono">
                Final Score:{" "}
                <span className="text-white font-black">{score}</span>
              </p>
              {combo > 1 && (
                <p className="text-sm text-amber-400 font-bold mb-4">
                  Best Combo: 🔥 x{combo}
                </p>
              )}
              <button
                onClick={startGame}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition transform hover:scale-105 active:scale-95 text-sm uppercase tracking-wider shadow-lg shadow-rose-900"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent border-t border-slate-800/50 z-0" />

        {/* Invaders */}
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
                <span className="opacity-50 text-xs font-mono">
                  &lt;div/&gt;
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 lg:p-6 bg-[#111827] border-t-2 border-cyan-500 relative z-30 shrink-0 shadow-[0_-10px_30px_rgba(6,182,212,0.15)]">
        {combo >= 2 && isPlaying && (
          <div className="text-center mb-1">
            <span className="text-xs font-black text-amber-400">
              🔥 {combo}x COMBO STREAK!
            </span>
          </div>
        )}
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
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
