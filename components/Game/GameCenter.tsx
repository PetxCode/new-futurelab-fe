
import React, { useState } from 'react';
import PythonGame from './PythonGame';
import CodedexGame from './CodedexGame';
import TypingGame from './TypingGame';
import DataRacer from './DataRacer';
import BlockCodingEngine from '../BlockCodingEngine';
import CodeQuest from './CodeQuest';
import BotWorkshop from './BotWorkshop';
import NanoQuest from './NanoQuest';
import TugOfWar from './TugOfWar';
import LayoutMaster from './LayoutMaster';
import HtmlTagMaster from './HtmlTagMaster';
import TailwindBattle from './TailwindBattle';
import TailwindInvaders from './TailwindInvaders';
import UiDetective from './UiDetective';

interface GameConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isNew?: boolean;
}

const GAMES: GameConfig[] = [
  {
    id: 'pyquest',
    title: 'PyQuest: Robot Chronicles',
    description: 'Master spatial logic by guiding Byte the robot through complex space mazes!',
    icon: '🤖',
    color: 'from-indigo-500 to-emerald-500'
  },
  {
    id: 'codedex',
    title: 'Codedex: Python Legend',
    description: 'Complete the ultimate 50-level Python curriculum. Learn variables, loops, and more!',
    icon: '🐍',
    color: 'from-emerald-500 to-teal-600',
    isNew: true
  },
  {
    id: 'nanoquest',
    title: 'Nano Quest: Terminal Rescue',
    description: 'Master spatial logic and code efficiency in this high-fidelity rescue mission!',
    icon: '🛰️',
    color: 'from-indigo-600 via-blue-700 to-cyan-500',
    isNew: true
  },
  {
    id: 'codequest',
    title: 'Code Quest: Glitch Kingdom',
    description: 'Use your coding spells to repair the magical kingdom of Glitch!',
    icon: '🔮',
    color: 'from-indigo-600 to-blue-700'
  },
  {
    id: 'botworkshop',
    title: 'Bot Workshop: Nano-Rescue',
    description: 'Program a tiny robot inside a machine to save your Bot-Friends!',
    icon: '🤖',
    color: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'typing',
    title: 'Froggy Jump',
    description: 'Type fast to help the frog hop across the pond! Don\'t fall in!',
    icon: '🐸',
    color: 'from-emerald-400 to-cyan-500'
  },
  {
    id: 'racer',
    title: 'Data Racer: Type Turbo',
    description: 'Race through the data stream! Collect specific data types and dodge the rest.',
    icon: '🏎️',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'maze',
    title: 'Maze Navigator',
    description: 'Master ROS2 navigation basics by guiding the blue ball through complex mazes!',
    icon: '🧭',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'tugofwar',
    title: 'Tug of War: Python Duel',
    description: 'Battle 1v1 in a real-time coding duel. Out-code your opponent to pull the rope home!',
    icon: '🪢',
    color: 'from-rose-600 via-indigo-600 to-emerald-600',
    isNew: true
  },
  {
    id: 'layoutmaster',
    title: 'Layout Master: Frog & Grid',
    description: 'Master CSS Flexbox and Grid by guiding frogs to their lilypads and growing a grid garden!',
    icon: '🐸',
    color: 'from-emerald-500 to-green-600',
    isNew: true
  },
  {
    id: 'htmlmaster',
    title: 'HTML Tag Master',
    description: 'Master HTML tags by identifying the correct element for the visual mockups!',
    icon: '🏷️',
    color: 'from-orange-500 to-red-600',
    isNew: true
  },
  {
    id: 'tailwindbattle',
    title: 'Tailwind Battle',
    description: 'Recreate target element designs exactly using HTML and Tailwind CSS classes!',
    icon: '⚡',
    color: 'from-blue-600 via-indigo-650 to-purple-600',
    isNew: true
  },
  {
    id: 'tailwindinvaders',
    title: 'Tailwind Invaders',
    description: 'Defend the UI from unstyled elements! Type Tailwind classes fast to style them before they crash.',
    icon: '👾',
    color: 'from-cyan-500 to-blue-600',
    isNew: true
  },
  {
    id: 'uidetective',
    title: 'UI Detective',
    description: 'Find and fix bugs in broken Tailwind UIs to match the perfect target design.',
    icon: '🕵️‍♂️',
    color: 'from-amber-500 to-orange-600',
    isNew: true
  },
  {
    id: 'coming-soon',
    title: 'More Games Coming Soon',
    description: 'Stay tuned for more coding adventures!',
    icon: '🚀',
    color: 'from-slate-700 to-slate-600'
  }
];

const GameCenter: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'pyquest') {
    return (
      <div className="relative w-full h-full">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm "
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="pt- x-2">
          <PythonGame />
        </div>
      </div>
    );
  }

  if (activeGame === 'codedex') {
    return (
      <div className="relative w-full h-full">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm "
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="pt- x-2">
          <CodedexGame />
        </div>
      </div>
    );
  }

  if (activeGame === 'typing') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-12">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm "
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full max-w-5xl mt-10">
            <TypingGame />
        </div>
      </div>
    );
  }

  if (activeGame === 'racer') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-12">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full max-w-3xl  mt-10">
            <DataRacer />
        </div>
      </div>
    );
  }

  if (activeGame === 'codequest') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-12">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full max-w-6xl mt-10">
          <CodeQuest />
        </div>
      </div>
    );
  }

  if (activeGame === 'botworkshop') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-12">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full max-w-6xl mt-10">
          <BotWorkshop />
        </div>
      </div>
    );
  }

  if (activeGame === 'nanoquest') {
    return (
      <div className="relative w-full h-full p-4 lg:p-8">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="h-full pt-8">
            <NanoQuest />
        </div>
      </div>
    );
  }

  if (activeGame === 'maze') {
    return (
      <div className="relative w-full h-full">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-[calc(100vh-56px)]">
          <BlockCodingEngine />
        </div>
      </div>
    );
  }

  if (activeGame === 'tugofwar') {
    return (
      <div className="relative w-full h-full p-4 lg:p-8">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="h-full pt-8">
            <TugOfWar />
        </div>
      </div>
    );
  }

  if (activeGame === 'layoutmaster') {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full pt-16 pb-4 px-4 lg:px-8">
            <LayoutMaster />
        </div>
      </div>
    );
  }

  if (activeGame === 'htmlmaster') {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full pt-16 pb-4 px-4 lg:px-8">
            <HtmlTagMaster />
        </div>
      </div>
    );
  }

  if (activeGame === 'tailwindbattle') {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full pt-16 pb-4 px-4 lg:px-8">
            <TailwindBattle />
        </div>
      </div>
    );
  }

  if (activeGame === 'tailwindinvaders') {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full pt-16 pb-4 px-4 lg:px-8">
            <TailwindInvaders />
        </div>
      </div>
    );
  }

  if (activeGame === 'uidetective') {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        <button 
          onClick={() => setActiveGame(null)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-800/80 backdrop-blur text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <span>←</span> Back to Arcade
        </button>
        <div className="w-full h-full pt-16 pb-4 px-4 lg:px-8">
            <UiDetective />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-900 text-white p-8 font-inter overflow-y-auto">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 tracking-tight">
          FutureLab Arcade
        </h1>
        <p className="text-slate-400 text-lg">Level up your skills through play.</p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game) => (
          <div 
            key={game.id}
            className={`
              group relative overflow-hidden rounded-2xl bg-slate-800 border-2 border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1
              ${game.id === 'coming-soon' ? 'opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer'}
            `}
            onClick={() => game.id !== 'coming-soon' && setActiveGame(game.id)}
          >
            <div className={`h-32 bg-gradient-to-br ${game.color} flex items-center justify-center relative`}>
              {game.isNew && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-rose-500 text-[8px] font-black text-white rounded-md shadow-lg animate-pulse">NEW</div>
              )}
              <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                {game.icon}
              </span>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{game.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{game.description}</p>
              
              {game.id !== 'coming-soon' && (
                <button className="w-full py-3 bg-slate-900 border border-indigo-500/30 text-indigo-400 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  PLAY NOW
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCenter;
