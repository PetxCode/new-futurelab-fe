import React, { useState } from 'react';
import { User } from '../types';
import BlockCodingEngine from './BlockCodingEngine';
import EngineBlocks from './EngineBlocks';
import BreakoutGame from './BreakoutGame';
import DinoGame from './DinoGame';
import CodeBattle from './CodeBattle';
import LogicLab from './LogicLab';
import StringDecoder from './StringDecoder';
import WordFactory from './WordFactory';
import CargoTycoon from './CargoTycoon';
import CodingFundamentals from './CodingFundamentals';
import ScratchPad from './ScratchPad';
import MazeBattle from './MazeBattle';

interface JuniorCodeProps {
  userData?: User | null;
}

const JuniorCode: React.FC<JuniorCodeProps> = ({ userData }) => {
  const [activeView, setActiveView] = useState<'menu' | 'maze' | 'flappy' | 'breakout' | 'dino' | 'battle' | 'logic' | 'decoder' | 'factory' | 'cargo' | 'fundamentals' | 'scratch' | 'maze-battle'>('menu');
  const [decoderMode, setDecoderMode] = useState<'solo' | 'battle'>('solo');

  if (activeView === 'maze') {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0">
             <BlockCodingEngine userData={userData} />
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'flappy') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
           <div className="absolute inset-0">
             <EngineBlocks />
           </div>
        </div>
      </div>
    );
  }

  if (activeView === 'breakout') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
           <div className="absolute inset-0">
             <BreakoutGame />
           </div>
        </div>
      </div>
    );
  }

  if (activeView === 'dino') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
           <div className="absolute inset-0">
             <DinoGame />
           </div>
        </div>
      </div>
    );
  }

  if (activeView === 'battle') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-y-auto">
             <CodeBattle />
        </div>
      </div>
    );
  }

  if (activeView === 'logic') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
             <LogicLab />
        </div>
      </div>
    );
  }

  if (activeView === 'decoder') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
             <StringDecoder initialMode={decoderMode} />
        </div>
      </div>
    );
  }

  if (activeView === 'factory') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
             <WordFactory />
        </div>
      </div>
    );
  }


  if (activeView === 'fundamentals') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
           <CodingFundamentals userData={userData} />
        </div>
      </div>
    );
  }

  if (activeView === 'scratch') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
           <ScratchPad />
        </div>
      </div>
    );
  }

  if (activeView === 'maze-battle') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
             <MazeBattle userData={userData} />
        </div>
      </div>
    );
  }

  if (activeView === 'cargo') {
    return (
      <div className="h-full flex flex-col">
         <div className="bg-slate-900 border-b border-slate-800 p-2 flex items-center">
            <button 
            onClick={() => setActiveView('menu')}
            className="text-slate-400 hover:text-white px-4 py-2 flex items-center space-x-2 transition-colors rounded-lg hover:bg-slate-800"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="text-xs font-black uppercase tracking-wider">Back to Hub</span>
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
             <CargoTycoon />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 h-full bg-slate-950 text-white font-inter overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800 mb-4">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
             <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Junior Developer Zone</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2 italic uppercase">
            FutureLab <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 px-2">Junior</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Welcome to the coding playground! Choose your mission and start building amazing things with blocks. No typing required!
          </p>
        </div>

        {/* Instructors */}
        <div className="grid md:grid-cols-2 gap-6">
            {/* Instructor 1 */}
            <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800 flex items-center space-x-6 hover:border-sky-500/30 transition-all hover:bg-slate-900/60 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${"t"}&backgroundColor=b6e3f4`} alt="Commander" className="w-24 h-24 rounded-2xl bg-slate-800 border-4 border-slate-800 shadow-xl group-hover:scale-105 transition-transform rotate-3" />



                <div className="space-y-2 relative z-10">
                        <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        Logic & Algorithms
                        </div>
                        <h3 className="text-2xl font-black text-white italic tracking-tight">Code Commander</h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">"Report for duty! We'll navigate complex mazes using loops and logic."</p>
                </div>
            </div>

             {/* Instructor 2 */}
             <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800 flex items-center space-x-6 hover:border-purple-500/30 transition-all hover:bg-slate-900/60 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${"zeus"}&backgroundColor=b6e3f4`} alt="Pixie" className="w-24 h-24 rounded-2xl bg-slate-800 border-4 border-slate-800 shadow-xl group-hover:scale-105 transition-transform -rotate-3" />
                <div className="space-y-2 relative z-10">
                        <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        Game Design
                        </div>
                        <h3 className="text-2xl font-black text-white italic tracking-tight">Pixel Pixie</h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">"Let's get creative! I'll show you how to build games you can play."</p>
                </div>
            </div>
        </div>

        {/* Game Cards */}
        <div className="space-y-8">
            <div className="flex items-center space-x-4">
                <div className="h-px bg-slate-800 flex-1"/>
                <h2 className="text-2xl font-black text-white uppercase tracking-widest italic text-slate-500">Select Mission</h2>
                <div className="h-px bg-slate-800 flex-1"/>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Code Dojo Card */}
                <button 
                    onClick={() => setActiveView('fundamentals')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20 text-left bg-slate-900 md:col-span-2 lg:col-span-1"
                >
                    <div className="absolute inset-0 bg-slate-900"/>
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139,92,246,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10 w-full mb-auto">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-600/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">New Recruit</span>
                        </div>

                        <div className="space-y-4 mt-8">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-violet-400 transition-colors">Code<br/>Dojo</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Master basic Variables, Conditions, and Loops.</p>
                            
                            <div className="flex items-center space-x-2 text-violet-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Enter Dojo</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                    </div>
                </button>

                {/* Maze Card */}
                <button 
                    onClick={() => setActiveView('maze')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/20 text-left bg-slate-900"
                >
                    <div className="absolute inset-0 bg-slate-900"/>
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                     <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">15 Levels</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-sky-400 transition-colors tracking-wider">Maze<br/>Navigator</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Master the art of movement commands. Guide your bot to the finish line!</p>
                            
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-sky-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-1 transition-transform">
                                    <span>Start Mission</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                </div>
                                <div 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveView('maze-battle');
                                    }}
                                    className="flex items-center space-x-2 text-rose-500 font-black uppercase text-[10px] tracking-widest bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer relative z-20"
                                >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                                    <span>Battle Mode</span>
                                </div>
                            </div>
                        </div>
                     </div>
                </button>

                {/* Flappy Card */}
                <button 
                    onClick={() => setActiveView('flappy')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">Creative Mode</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-purple-400 transition-colors">Engine<br/>Blocks</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Build your own Flappy Bird game! Learn about events, gravity, and game loops.</p>
                            
                            <div className="flex items-center space-x-2 text-purple-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Enter Workshop</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>

                 {/* Breakout Card */}
                <button 
                    onClick={() => setActiveView('breakout')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">New Arrival</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-red-400 transition-colors">Brick<br/>Breaker</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Code your paddle controls! Experiment with physics and inputs.</p>
                            
                            <div className="flex items-center space-x-2 text-red-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Start Breaking</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>

                 {/* Dino Card */}
                 <button 
                    onClick={() => setActiveView('dino')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">Infinite Run</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-green-400 transition-colors">Dino<br/>Runner</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Automate the Dino! Use "When Close" events to jump automatically.</p>
                            
                            <div className="flex items-center space-x-2 text-green-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Start Run</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>

                {/* Code Battle Card */}
                <button 
                    onClick={() => setActiveView('battle')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">Multiplayer</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-indigo-400 transition-colors">Code<br/>Battle</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Challenge your friends! Race to solve coding puzzles in real-time.</p>
                            
                            <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Join Arena</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>

                {/* Logic Lab Card */}
                <button 
                    onClick={() => setActiveView('logic')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">Creative Workshop</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-amber-400 transition-colors">Logic<br/>Lab</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Experiment with pure logic! Use blocks to build your own math and text tricks.</p>
                            
                            <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Enter Workshop</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>

                <button 
                    onClick={() => {
                        setDecoderMode('solo');
                        setActiveView('decoder');
                    }}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">Secret Mission</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors">Spy<br/>Decoder</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Intercepted signals are messy! Use string methods to reveal the truth.</p>
                            
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-blue-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-1 transition-transform">
                                    <span>Decode Signals</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                </div>
                                <div 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDecoderMode('battle');
                                        setActiveView('decoder');
                                    }}
                                    className="flex items-center space-x-2 text-rose-500 font-black uppercase text-[10px] tracking-widest bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer relative z-20"
                                >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                                    <span>Battle Now</span>
                                </div>
                            </div>
                        </div>
                     </div>
                </button>

                {/* Word Factory Card */}
                 <button 
                    onClick={() => setActiveView('factory')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">Industrial Tycoon</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-orange-400 transition-colors">Word<br/>Factory</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Run the machines! Process raw materials using Python assembly lines.</p>
                            
                            <div className="flex items-center space-x-2 text-orange-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Start Production</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>

                {/* Cargo Tycoon Card */}
                <button 
                    onClick={() => setActiveView('cargo')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">New Expedition</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-teal-400 transition-colors">Cargo<br/>Tycoon</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Master Python lists! Maneuver cargo manifests using advanced data structures.</p>
                            
                            <div className="flex items-center space-x-2 text-teal-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Start Shipping</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>

                
                {/* Creative Lab Card */}
                <button 
                    onClick={() => setActiveView('scratch')}
                    className="group relative h-80 rounded-[2rem] overflow-hidden border border-slate-800 transition-all hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 text-left bg-slate-900"
                >
                     <div className="absolute inset-0 bg-slate-900"/>
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                     
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    <div className="absolute inset-0 flex flex-col p-8 z-10">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3zM9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/></svg>
                            </div>
                            <span className="bg-slate-950/50 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-black uppercase px-3 py-1 rounded-full">Creative Workshop</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-purple-400 transition-colors">Creative<br/>Lab</h3>
                            <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 max-w-xs">Build your own stories and games! Use blocks to create anything you can imagine.</p>
                            
                            <div className="flex items-center space-x-2 text-purple-400 font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                                <span>Enter Lab</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </div>
                     </div>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default JuniorCode;
