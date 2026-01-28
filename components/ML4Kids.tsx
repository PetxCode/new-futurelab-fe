import React, { useState } from 'react';
import { Mission, NavigationItem } from '../types';
import MissionDetails from './MissionDetails';

interface MLTopic extends Partial<Mission> {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: any; // Using any to match the dynamic labels in ML4Kids
  color: string;
  duration: string;
  reward?: string;
  tags?: string[];
  longDescription?: string;
  lectureContent?: string;
  practiceTest?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
}

const topics: MLTopic[] = [
  {
    id: 'intro',
    title: 'What is Machine Learning?',
    description: 'Learn how computers can learn from patterns without being programmed.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
      </svg>
    ),
    difficulty: 'Elementary',
    color: 'from-indigo-500 to-purple-500',
    duration: '15 mins',
    reward: '250 XP',
    tags: ['AI', 'Basics'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"Teaching computers to think like us, but faster!"</p>
        <p>Welcome to the most exciting adventure in modern technology! In this module, you'll discover the secret world of Machine Learning (ML). Have you ever wondered how Netflix knows exactly what movie you'll like next? Or how a self-driving car stays on the road? It's not magic—it's a "Brain in a Box" that looks for patterns in mountains of data!</p>
        <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
           <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Adventure Goals</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Master the Basics:</strong> Understand the difference between regular coding and ML.</li>
             <li><strong>Spot the Patterns:</strong> Learn how AI sees things we might miss.</li>
             <li><strong>Brain Training:</strong> Discover how we teach a computer to tell a cat from a dog.</li>
             <li><strong>AI Detectives:</strong> Use data as clues to solve tricky real-world puzzles!</li>
           </ul>
        </div>
        <p class="text-slate-300">By the end of this journey, you won't just know what AI is—you'll understand the logic that powers the futuristic world around you. Let's dive in!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: The Magic of Learning</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Imagine you have a robot friend named <strong>Pixel</strong>. Pixel is brand new and doesn't know what anything is. If you want Pixel to know what a "Cupcake" is, you could write a million instructions about frosting, sprinkles, and cake bases... but there's a problem! Some cupcakes have no sprinkles. Some have fruit. Some are chocolate, others are vanilla.
          </p>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            In the old days of computing, we had to write every single rule ourselves. If we forgot one rule, the computer would get confused. But with <strong>Machine Learning</strong>, we don't give rules. We give <strong>Examples</strong>. Instead of writing code, we show Pixel 1,000 pictures of cupcakes and say, "Find the pattern!"
          </p>
        </section>

        <section class="bg-indigo-600/10 border-l-4 border-indigo-500 p-8 rounded-r-[2rem]">
          <h4 class="text-indigo-400 font-black uppercase tracking-widest mb-3">The Super Power: Pattern Recognition</h4>
          <p class="text-slate-400 leading-relaxed text-lg">
            Machine Learning is like giving a computer <strong>Super Eyes</strong>. While we see a photo of a cat, the computer sees a giant grid of numbers (pixels). To a computer, a cat is just a specific arrangement of numbers. By looking at thousands of "Cat" grids, it starts to notice that they all have certain shapes, edge patterns, and colors in common. These recurring clues are called <strong>Patterns</strong>.
          </p>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 2: The Three Steps of the AI Recipe</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Teaching a computer to "think" is very similar to how you learn to play a new sport or learn a new language. It follows a recipe with three essential ingredients:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              </div>
              <div class="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 font-black mb-6 group-hover:scale-110 transition-transform text-xl">1</div>
              <h5 class="text-white font-black text-xl mb-3">The Clues (Data)</h5>
              <p class="text-slate-500 text-sm leading-relaxed">This is the "food" for the AI. It can be photos of apples, sounds of birds, or numbers from weather reports. The more clues you give, the smarter the AI becomes!</p>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div class="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 font-black mb-6 group-hover:scale-110 transition-transform text-xl">2</div>
              <h5 class="text-white font-black text-xl mb-3">The Training (Learning)</h5>
              <p class="text-slate-500 text-sm leading-relaxed">The computer studies the clues over and over. It looks for what makes an apple different from an orange. It creates a mathematical "map" of these differences.</p>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div class="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 font-black mb-6 group-hover:scale-110 transition-transform text-xl">3</div>
              <h5 class="text-white font-black text-xl mb-3">The Prediction (Testing)</h5>
              <p class="text-slate-500 text-sm leading-relaxed">Now the magic happens. When you show the AI a <strong>brand new</strong> photo of a fruit it has never seen, it uses its "map" to say: "I'm 99% sure this is an Orange!"</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: Why ML is a Game Changer</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Before Machine Learning, computers were like very fast but very "stubborn" calculators. They could only follow the exact steps a human programmer wrote. But the world is messy! Not every "A" looks the same. Some people write neatly, some write messy. A human can recognize an "A" regardless of how it's drawn because our brains are built for pattern recognition.
          </p>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            By using ML, we are teaching computers that same flexibility. This allows them to handle things that are hard to define with simple rules, like:
          </p>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400 font-medium mb-8">
            <li class="flex items-center space-x-3 bg-slate-900/50 p-4 rounded-2xl">
              <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Understanding human speech (like Siri or Alexa)</span>
            </li>
            <li class="flex items-center space-x-3 bg-slate-900/50 p-4 rounded-2xl">
              <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Identifying tumors in medical X-rays</span>
            </li>
            <li class="flex items-center space-x-3 bg-slate-900/50 p-4 rounded-2xl">
              <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Detecting fraudulent credit card transactions</span>
            </li>
            <li class="flex items-center space-x-3 bg-slate-900/50 p-4 rounded-2xl">
              <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Personalizing learning for students just like you!</span>
            </li>
          </ul>
        </section>

        <section class="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 mb-8 shadow-inner">
          <h5 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Deep Dive: A Day in the Life of an AI Model</h5>
          <div class="space-y-6 font-mono text-sm leading-relaxed">
            <div class="flex items-start space-x-4">
              <div class="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</div>
              <p class="text-slate-300 text-base"><strong>Initialization:</strong> I start with no knowledge. All my "connections" are random numbers.</p>
            </div>
            <div class="flex items-start space-x-4">
              <div class="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</div>
              <p class="text-slate-300 text-base"><strong>Data Check:</strong> I am shown a photo of a dog. I predict it's a "cat". My trainer says "Wrong!" and gives me a <strong>Penalty Score</strong>.</p>
            </div>
            <div class="flex items-start space-x-4">
              <div class="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</div>
              <p class="text-slate-300 text-base"><strong>Optimization:</strong> I adjust my internal math to be slightly more "dog-like" next time. I repeat this 1 million times.</p>
            </div>
            <div class="flex items-start space-x-4">
              <div class="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">4</div>
              <p class="text-emerald-400 text-base font-bold"><strong>Success:</strong> I can now identify any dog breed with 99.9% accuracy. Mission Accomplished!</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Summary: Your Journey Begins</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg text-center max-w-2xl mx-auto italic">
            "Machine Learning is the art of teaching machines to solve problems that are too complex for humans to write rules for."
          </p>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            In the next modules, we'll look at the different <strong>Types of Training</strong>. Some AI learn with teachers, some learn by playing around, and some learn by finding hidden groups in data. Are you ready to become an AI Expert? Take the quiz to prove your skills!
          </p>
        </section>

        <div class="bg-amber-600/10 p-10 rounded-[3rem] border border-amber-500/20 italic text-slate-400 text-center">
          <p class="text-xl font-black text-amber-400 mb-2">🚀 Expert Tip</p>
          "The better the data, the better the AI. GARBAGE IN = GARBAGE OUT. Think of data like the fuel for your AI engine!"
        </div>
      </div>
    `,
    practiceTest: [
      {
        question: "What is Machine Learning most like?",
        options: ["Reading a dictionary front to back", "A detective looking for patterns in clues", "Building a Lego set with a missing manual", "Painting a masterpiece by numbers"],
        correctAnswer: 1,
        explanation: "Machine Learning is all about finding hidden patterns and connections in data, much like a detective finding clues!"
      },
      {
        question: "What are the 'Ingredients' (Data) an AI needs to learn?",
        options: ["Electricity and Wi-Fi", "Buttons and Switches", "Photos, sounds, or numbers (Examples)", "A mouse and a keyboard"],
        correctAnswer: 2,
        explanation: "Data is the 'food' for AI. Examples (like photos or numbers) help the computer build its internal map of the world."
      },
      {
        question: "What does 'Pattern Recognition' mean for an AI?",
        options: ["Identifying shapes and numbers in data", "Memorizing every single pixel", "Connecting to the internet", "Asking the user for help"],
        correctAnswer: 0,
        explanation: "Pattern recognition is the ability of an AI to find recurring features in data that help it identify what it's looking at."
      },
       {
        question: "Why is 'Garbage In, Garbage Out' important?",
        options: ["It means the AI needs to be cleaned", "If the data is bad, the AI will make bad predictions", "It refers to the computer's trash can", "It is a type of AI algorithm"],
        correctAnswer: 1,
        explanation: "Bad data leads to bad learning. To build a smart AI, you need high-quality and accurate clues (data)."
      }
    ]
  },
  {
    id: 'training-types',
    title: 'Types of Training',
    description: 'Learn about Supervised, Unsupervised, and Reinforcement learning through games.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    difficulty: 'Beginner',
    color: 'from-blue-500 to-indigo-500',
    duration: '20 mins',
    reward: '300 XP',
    tags: ['Learning Methods'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"There's more than one way to teach a robot!"</p>
        <p>Just like you learn differently when you're in school, playing with friends, or trying a new video game, AI has different ways of gaining wisdom. In this module, we'll explore the three "Schools of AI" and see which one is best for different tasks.</p>
        <div class="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
           <h4 class="text-blue-400 font-black uppercase text-xs mb-2">The Three Paths of Wisdom</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>The Teacher Path:</strong> Learning with labels and guidance.</li>
             <li><strong>The Explorer Path:</strong> Finding secret shapes on your own.</li>
             <li><strong>The High-Score Path:</strong> Learning through action and rewards.</li>
           </ul>
        </div>
        <p class="text-slate-300 italic">Are you ready to discover how different "brains" are built? Let's begin the lesson!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">The Three Schools of AI Wisdom</h2>
          <p class="mb-8 text-slate-300 leading-relaxed text-lg">
            Imagine you want to teach a robot how to navigate the world. Should you give it a map (a teacher)? Should you let it wander around and find interesting spots on its own (an explorer)? Or should you give it points every time it stays on the path (a gamer)? 
          </p>
          <p class="mb-8 text-slate-300 leading-relaxed text-lg text-indigo-400 font-bold">
            In AI, these aren't just ideas—they are mathematically different ways to train a model!
          </p>
        </section>
        
        <section class="space-y-10">
          <div class="group relative p-10 bg-indigo-900/20 border border-indigo-500/30 rounded-[3rem] hover:bg-indigo-900/30 transition-all shadow-xl">
            <div class="absolute top-6 right-8 text-indigo-400/20 group-hover:text-indigo-400 transition-colors">
              <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 class="text-3xl font-black text-indigo-400 mb-6 uppercase tracking-tight">1. Supervised Learning (The Teacher Path)</h3>
            <p class="text-slate-300 leading-relaxed mb-6 text-lg">This is the most common way to train AI today. It's like learning with a <strong>Personal Tutor</strong>. The teacher provides <strong>Labeled Data</strong>. Think of them as flashcards where the photo is on the front and the name is on the back.</p>
            
            <div class="bg-slate-950 p-8 rounded-3xl border border-slate-800 font-medium text-lg text-slate-400 mb-6">
               <p class="mb-4 italic text-indigo-300">"Hey AI, here is a photo of something red and round."</p>
               <div class="flex items-center space-x-4 mb-4">
                  <div class="px-6 py-2 bg-indigo-500/20 border border-indigo-500/50 rounded-xl text-indigo-400 font-bold">Input: [IMAGE]</div>
                  <span class="text-2xl">➡️</span>
                  <div class="px-6 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 font-bold">Label: "APPLE"</div>
               </div>
               <p>The AI looks at millions of these "cards" and eventually learns exactly what an apple looks like compared to an orange.</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <span class="px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-300 text-xs font-black uppercase tracking-widest">Email Spam Filters</span>
              <span class="px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-300 text-xs font-black uppercase tracking-widest">Medical Diagnosis</span>
              <span class="px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-300 text-xs font-black uppercase tracking-widest">Face Recognition</span>
            </div>
          </div>

          <div class="group relative p-10 bg-emerald-900/20 border border-emerald-500/30 rounded-[3rem] hover:bg-emerald-900/30 transition-all shadow-xl">
            <div class="absolute top-6 right-8 text-emerald-400/20 group-hover:text-emerald-400 transition-colors">
              <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 class="text-3xl font-black text-emerald-400 mb-6 uppercase tracking-tight">2. Unsupervised Learning (The Explorer Path)</h3>
            <p class="text-slate-300 leading-relaxed mb-6 text-lg">Imagine giving a robot a pile of 10,000 mixed Lego bricks and saying "Group these together," but you <strong>don't tell it anything else</strong>. There are No Labels and No Teachers.</p>
            <p class="text-slate-400 italic mb-8 text-lg">The AI has to find its own logic. It might notice: "I'll put all the 2x4 bricks over here and the thin 1x2 bricks over there." It finds <strong>Secret Patterns</strong> that even humans might miss!</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="p-6 bg-slate-950 rounded-2xl border border-emerald-500/20">
                <h5 class="text-emerald-400 font-bold mb-2">Clustering</h5>
                <p class="text-slate-500 text-sm">Grouping similar things together (like categorizing users based on what they buy).</p>
              </div>
              <div class="p-6 bg-slate-950 rounded-2xl border border-emerald-500/20">
                <h5 class="text-emerald-400 font-bold mb-2">Association</h5>
                <p class="text-slate-500 text-sm">Finding things that often happen together (like seeing that people who buy milk also buy cereal).</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-3">
              <span class="px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-300 text-xs font-black uppercase tracking-widest">Customer Segments</span>
              <span class="px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-300 text-xs font-black uppercase tracking-widest">Genomic Research</span>
            </div>
          </div>

          <div class="group relative p-10 bg-amber-900/20 border border-amber-500/30 rounded-[3rem] hover:bg-amber-900/30 transition-all shadow-xl">
             <div class="absolute top-6 right-8 text-amber-400/20 group-hover:text-amber-400 transition-colors">
              <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-3xl font-black text-amber-400 mb-6 uppercase tracking-tight">3. Reinforcement Learning (The Gamer Path)</h3>
            <p class="text-slate-300 leading-relaxed mb-6 text-lg">This is the most "futuristic" type of training. It's like training a puppy or playing a video game to get the <strong>Highest Score possible</strong>. The AI doesn't know what to do at first—it learns by <strong>Trial and Error</strong>.</p>
            
            <div class="flex flex-col md:flex-row gap-8 mb-8">
               <div class="flex-1 p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] flex flex-col items-center text-center">
                  <div class="text-5xl mb-4">🍭</div>
                  <span class="text-emerald-400 font-black text-lg mb-2">THE REWARD</span>
                  <p class="text-sm text-slate-400 leading-relaxed">When the AI does something right (like staying on the road), we give it a <strong>Positive Reward</strong> (+10 points).</p>
               </div>
               <div class="flex-1 p-8 bg-rose-500/10 border border-rose-500/30 rounded-[2rem] flex flex-col items-center text-center">
                  <div class="text-5xl mb-4">💥</div>
                  <span class="text-rose-400 font-black text-lg mb-2">THE PENALTY</span>
                  <p class="text-sm text-slate-400 leading-relaxed">When the AI makes a mistake (like hitting a wall), we give it a <strong>Negative Reward</strong> (-10 points).</p>
               </div>
            </div>
            
            <p class="text-slate-300 mb-6 text-lg">Over time, the AI learns that it can maximize its score by following certain behaviors. This is how AlphaGo beat the world's best Go player and how self-driving cars learn to navigate complex traffic!</p>
            <div class="flex flex-wrap gap-3">
              <span class="px-4 py-2 bg-amber-500/10 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest">Self-Driving Cars</span>
              <span class="px-4 py-2 bg-amber-500/10 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest">Robotics</span>
              <span class="px-4 py-2 bg-amber-500/10 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest">Game AI</span>
            </div>
          </div>
        </section>

        <section class="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 text-center">
           <h4 class="text-2xl font-black text-white mb-4">Which School should your AI go to?</h4>
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
             <div class="p-6 border border-slate-800 rounded-3xl bg-slate-900/50">
               <p class="text-indigo-400 font-bold mb-2">I have labels!</p>
               <p class="text-slate-500">Go to Supervised School.</p>
             </div>
             <div class="p-6 border border-slate-800 rounded-3xl bg-slate-900/50">
               <p class="text-emerald-400 font-bold mb-2">I have raw data!</p>
               <p class="text-slate-500">Go to Unsupervised School.</p>
             </div>
             <div class="p-6 border border-slate-800 rounded-3xl bg-slate-900/50">
               <p class="text-amber-400 font-bold mb-2">I have a high score!</p>
               <p class="text-slate-500">Go to Reinforcement School.</p>
             </div>
           </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "Which training type uses 'Labels' provided by a teacher?",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Manual Entry"],
        correctAnswer: 0,
        explanation: "Supervised learning relies on a labeled dataset where each input has a corresponding correct output."
      },
      {
        question: "Reinforcement learning is most similar to which real-world activity?",
        options: ["Reading a textbook", "Sorting laundry", "Training a pet with treats", "Watching a movie"],
        correctAnswer: 2,
        explanation: "Reinforcement learning uses a system of rewards and penalties to guide behavior, much like training an animal."
      }
    ]
  },
  {
    id: 'algorithms',
    title: 'The Algorithm Lab',
    description: 'Discover how Decision Trees and Neural Networks work to solve problems.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-5 8a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm10 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zM4 18h16" />
      </svg>
    ),
    difficulty: 'Junior',
    color: 'from-violet-500 to-purple-600',
    duration: '25 mins',
    reward: '400 XP',
    tags: ['Logic', 'Neural Networks', 'Decision Trees'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"Inside the Engine Room of AI!"</p>
        <p>Have you ever wondered how an AI actually makes a decision? Does it flip a coin? Does it ask a ghost? Nope! It uses clever math blueprints called <strong>Algorithms</strong>. In this lab, you'll become an Architect of Logic. You'll explore the two most famous ways AI thinks: the "Yes/No branches" of Decision Trees and the "Web of Connections" in Neural Networks.</p>
        <div class="bg-violet-500/10 p-6 rounded-2xl border border-violet-500/20">
           <h4 class="text-violet-400 font-black uppercase text-xs mb-2">Lab Objectives</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Decision Mapping:</strong> Learn how to build a logic tree that never fails.</li>
             <li><strong>Brain Imitation:</strong> Discover how Neural Networks try to mimic your own brain cells.</li>
             <li><strong>The Secret Sauce:</strong> See how "Weights and Biases" change the way an AI learns.</li>
           </ul>
        </div>
        <p class="text-slate-300">Prepare your lab coat—it's time to build some digital brains!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: The Logic Branch (Decision Trees)</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Imagine you want to decide if you should wear a coat outside. You probably ask yourself a series of simple "Yes or No" questions: 
          </p>
          <div class="bg-slate-900 p-8 rounded-3xl border border-slate-800 mb-8 font-mono text-sm">
            <div class="flex items-center space-x-2 text-indigo-400">
              <span>Is it raining?</span>
              <span class="text-slate-600">➡️</span>
              <span class="text-emerald-400">YES</span>
              <span class="text-slate-600">➡️</span>
              <span class="text-white">Wear a Coat!</span>
            </div>
            <div class="border-l-2 border-slate-800 h-4 ml-4 my-1"></div>
            <div class="flex items-center space-x-2 text-indigo-400">
              <span class="opacity-50">Is it raining?</span>
              <span class="text-slate-600">➡️</span>
              <span class="text-rose-400">NO</span>
              <span class="text-slate-600">➡️</span>
              <span>Is it below 10°C?</span>
              <span class="text-slate-600">➡️</span>
              <span class="text-emerald-400">YES</span>
              <span class="text-slate-600">➡️</span>
              <span class="text-white">Wear a Coat!</span>
            </div>
          </div>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            This flowchart is exactly what a <strong>Decision Tree</strong> is. It's an algorithm that splits data into smaller and smaller groups based on simple questions. For a computer, these questions are things like "Is the pixel bright?" or "Is the price higher than $50?".
          </p>
          <p class="text-slate-400 italic">Decision Trees are great because they are easy to understand—we can see exactly why the computer made its choice!</p>
        </section>

        <section class="bg-violet-600/10 border-l-4 border-violet-500 p-8 rounded-r-[2rem]">
          <h4 class="text-violet-400 font-black uppercase tracking-widest mb-3">Chapter 2: The Digital Web (Neural Networks)</h4>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            Now, imagine a cat. How do you describe a cat only using "Yes/No" questions? It's really hard! Cat fur can be many colors, ears can be floppy or pointy, and eyes can be different shapes. A Decision Tree might get confused by so many possibilities.
          </p>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            This is where <strong>Neural Networks</strong> come in. They are inspired by the billions of tiny cells (neurons) in your brain. Instead of one big flowchart, a Neural Network has layers of thousands of tiny "switches" that all work together.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="p-6 bg-slate-950 rounded-2xl border border-slate-800">
               <span class="text-violet-400 font-black">Layer 1: Input</span>
               <p class="text-xs text-slate-500 mt-2">The AI sees the raw pixels of an image.</p>
            </div>
            <div class="p-6 bg-slate-950 rounded-2xl border border-slate-800">
               <span class="text-violet-400 font-black">Layer 2: Hidden</span>
               <p class="text-xs text-slate-500 mt-2">It looks for simple shapes: lines, circles, and curves.</p>
            </div>
            <div class="p-6 bg-slate-950 rounded-2xl border border-slate-800">
               <span class="text-violet-400 font-black">Layer 3: Output</span>
               <p class="text-xs text-slate-500 mt-2">It combines the shapes to say "That's a Cat!"</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: Connecting the Dots</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            In a Neural Network, when one "switch" identifies something correctly, it sends a strong signal to the next layer. This is called a <strong>Weight</strong>. If a switch gets it wrong, we turn down the signal. By adjusting these weights millions of times, the network learns to "see" and "hear" just like we do!
          </p>
          <div class="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-inner mb-8">
             <h5 class="text-center text-violet-400 font-black mb-6 uppercase tracking-widest text-sm underline decoration-violet-500 underline-offset-8">Tree vs Network: The Smackdown</h5>
             <div class="grid grid-cols-2 gap-8 text-sm">
                <div class="space-y-4">
                   <p class="text-white font-bold">🌳 Decision Trees</p>
                   <ul class="text-slate-500 space-y-2">
                      <li>✅ Fast and easy to see.</li>
                      <li>✅ Great for "Tabular" data (like Excel rows).</li>
                      <li>❌ Bad at "Soft" data (like photos or sound).</li>
                   </ul>
                </div>
                <div class="space-y-4">
                   <p class="text-white font-bold">🧠 Neural Networks</p>
                   <ul class="text-slate-500 space-y-2">
                      <li>✅ Amazing at Vision and Speech.</li>
                      <li>✅ Can learn incredibly complex patterns.</li>
                      <li>❌ Very hard to "see" inside (The Black Box).</li>
                   </ul>
                </div>
             </div>
          </div>
        </section>

        <section class="bg-indigo-950/20 p-10 rounded-[3rem] border border-indigo-500/20 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-8 opacity-10">
            <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.166a2 2 0 00.547 1.022l1.623 1.623a2 2 0 001.022.547l2.387.477a2 2 0 001.96-1.414l.722-2.166a2 2 0 00-.547-1.022l-1.623-1.623z" /></svg>
          </div>
          <h2 class="text-2xl font-black text-white mb-6">Real-World Case Study: Sorting Mail</h2>
          <p class="text-slate-300 leading-relaxed mb-6">
            Ever wonder how post offices sort millions of letters with messy handwriting? They use Neural Networks! A first layer looks for the edges of the numbers. A second layer checks if they form a circle (like the top of an '8') or a hook (like a '5'). A final layer combines these to read the whole zip code in milliseconds. 
          </p>
          <div class="bg-slate-900/50 p-6 rounded-2xl italic text-sm text-slate-400">
            "Before AI, humans had to read every single letter. Now, machines handle 99.9% of it perfectly!"
          </div>
        </section>

        <section class="text-center pt-8">
          <h2 class="text-3xl font-black text-white mb-6">Final Lesson: The Best Tool for the Job</h2>
          <p class="text-slate-300 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
            Being an AI Engineer isn't about using the "fanciest" algorithm. It's about picking the right tool. Sometimes a simple Decision Tree is all you need! As you build your skills, you'll learn to choose the fastest and smartest path for every new problem.
          </p>
          <div class="inline-flex items-center space-x-2 text-violet-400 font-black animate-bounce">
            <span>READY FOR THE QUIZ?</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "When is a Decision Tree most useful?",
        options: ["When you need to recognize a cat's face", "When you have simple Yes/No questions to branch through", "When you want to play a video game", "When you are writing a poem"],
        correctAnswer: 1,
        explanation: "Decision Trees are perfect for logical, rule-based choices where you can follow a series of clear steps."
      },
      {
        question: "What was the main inspiration for Neural Networks?",
        options: ["The roots of a tree", "A spider's web", "The neurons in a human brain", "A very long snake"],
        correctAnswer: 2,
        explanation: "Neural Networks were designed to mimic the way brain cells (neurons) connect and pass signals to each other."
      },
      {
        question: "In a Neural Network, what do 'Layers' do?",
        options: ["They are like blankets for the computer", "They break down complex input (like photos) into simple steps", "They store the computer's battery power", "They turn the screen off when it's dark"],
        correctAnswer: 1,
        explanation: "Each layer handles a specific task, like finding edges in one layer and eyes/ears in another."
      },
      {
        question: "Why are Neural Networks called a 'Black Box'?",
        options: ["Because computers are usually black", "Because it's very hard for humans to see exactly how they make decisions inside", "Because they only work at night", "Because they are stored in a secret vault"],
        correctAnswer: 1,
        explanation: "While they are accurate, the math inside a huge Neural Network is so complex that it's hard for humans to explain every single choice."
      }
    ]
  },
  {
    id: 'data-cleaning',
    title: 'Data Detective',
    description: 'Learn why clean data is the key to a smart AI and how to fix "messy" data.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    difficulty: 'Junior',
    color: 'from-amber-400 to-orange-500',
    duration: '15 mins',
    reward: '350 XP',
    tags: ['Data Science', 'Preprocessing', 'Bias'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"Garbage In, Garbage Out!"</p>
        <p>Imagine you're building a robot that sorts fruit. But wait! Someone threw a dirty sock and a rusty spoon into the fruit basket. What will the robot do? It might try to turn that sock into apple juice! This is the most important rule in AI: **Your model is only as smart as the data you give it.** In this adventure, you'll become a Data Detective and learn how to find "Bad Data" before it ruins your AI.</p>
        <div class="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
           <h4 class="text-amber-400 font-black uppercase text-xs mb-2">Detective Training</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Spotting the Noise:</strong> Identify data that doesn't belong.</li>
             <li><strong>Fixing Gaps:</strong> What to do when your data has "holes" (missing info).</li>
             <li><strong>Uncovering Bias:</strong> Learn how unfair data leads to unfair AI.</li>
           </ul>
        </div>
        <p class="text-slate-300 italic">Grab your magnifying glass—it's time to scrub some data!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: The Messy Truth About Data</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            In the movies, AI always has perfect information. But in the real world, <strong>Data is Messy</strong>. Imagine you're collecting temperatures from weather stations all over the world. 
          </p>
          <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl mb-8 space-y-4">
             <div class="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm">
                <span class="text-slate-400">Station A:</span>
                <span class="text-emerald-400 font-mono">22.5°C</span>
                <span class="text-slate-600 italic">(Perfect)</span>
             </div>
             <div class="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-rose-500/50 text-sm">
                <span class="text-slate-400">Station B:</span>
                <span class="text-rose-400 font-mono">999°C</span>
                <span class="text-rose-500 italic font-bold">(Error! A sensor broke)</span>
             </div>
             <div class="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-amber-500/50 text-sm">
                <span class="text-slate-400">Station C:</span>
                <span class="text-amber-400 font-mono">NULL</span>
                <span class="text-amber-500 italic font-bold">(Missing! No signal)</span>
             </div>
          </div>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            If you give this data to an AI, it might think the Earth is about to catch fire! Data Cleaners (also called Data Scientists) spend 80% of their time fixing these mistakes before the computer even starts learning.
          </p>
        </section>

        <section class="bg-amber-600/10 border-l-4 border-amber-500 p-8 rounded-r-[2rem]">
          <h4 class="text-amber-400 font-black uppercase tracking-widest mb-3">Chapter 2: The Three Enemies of Clean Data</h4>
          <p class="text-slate-300 leading-relaxed text-lg mb-8">
            As a Data Detective, you need to watch out for three specific villains:
          </p>
          <div class="space-y-6">
            <div class="group bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all">
               <h5 class="text-lg font-black text-amber-500 mb-2">1. Outliers (The Weirdos)</h5>
               <p class="text-slate-400 text-sm">These are data points that are so far away from the rest that they must be a mistake. Like a 7-foot tall toddler or a temperature of 500 degrees indoors.</p>
            </div>
            <div class="group bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all">
               <h5 class="text-lg font-black text-amber-500 mb-2">2. Missing Values (The Holes)</h5>
               <p class="text-slate-400 text-sm">Sometimes data simply isn't there. Maybe the internet cut out, or someone forgot to fill in a form. An AI can't learn from nothing!</p>
            </div>
            <div class="group bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all">
               <h5 class="text-lg font-black text-amber-500 mb-2">3. Noise (The static)</h5>
               <p class="text-slate-400 text-sm">Extra information that distracts the AI. If you're teaching it to recognize birds, a blurry photo with a plane in the background is "Noisy".</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: The Danger of Bias</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            This is the trickiest part of the job. <strong>Bias</strong> is when your data is "unbalanced". Imagine you want to train an AI to recognize "Cool Shoes". You show it 1,000 photos of BLUE sneakers and only 2 photos of RED sneakers.
          </p>
          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center mb-8">
             <p class="text-rose-400 font-black mb-4">The Result?</p>
             <p class="text-slate-300 italic">"If it's not blue, it's not a sneaker!"</p>
             <p class="text-slate-500 text-sm mt-4">The AI has become **Biased** because the data didn't represent the whole world. This can lead to serious problems in things like facial recognition or hospital systems.</p>
          </div>
        </section>

        <section class="bg-emerald-950/20 p-10 rounded-[3rem] border border-emerald-500/20">
          <h2 class="text-2xl font-black text-white mb-6">Detective Toolkit: How to Fix It</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-start space-x-4">
              <div class="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 font-black">ST</div>
              <div>
                <h6 class="text-white font-bold">Standardize</h6>
                <p class="text-xs text-slate-500 mt-1">Make sure everyone is using the same units (meters vs inches).</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 font-black">DU</div>
              <div>
                <h6 class="text-white font-bold">Deduplicate</h6>
                <p class="text-xs text-slate-500 mt-1">Remove exact copies of the same data point so the AI doesn't get bored.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="p-3 bg-amber-500/20 rounded-xl text-amber-400 font-black">IM</div>
              <div>
                <h6 class="text-white font-bold">Imputation</h6>
                <p class="text-xs text-slate-500 mt-1">Fill in missing holes with the "Average" value of other data points.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="p-3 bg-rose-500/20 rounded-xl text-rose-400 font-black">PR</div>
              <div>
                <h6 class="text-white font-bold">Pruning</h6>
                <p class="text-xs text-slate-500 mt-1">Throw away the "Outliers" that are clearly mistakes.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="text-center pt-8">
          <h2 class="text-3xl font-black text-white mb-6">The Golden Rule of Data</h2>
          <p class="text-slate-300 leading-relaxed text-2xl font-black italic mb-8">
            "Better data beats a fancier algorithm, every single time!"
          </p>
          <p class="text-slate-400 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
            Remember, you are the filter. If you give your AI clean, balanced, and accurate data, it will work like magic. If you give it garbage... well, you know the rest!
          </p>
          <div class="bg-slate-900 px-8 py-4 rounded-2xl border border-slate-800 inline-block">
             <p class="text-amber-500 font-black uppercase tracking-widest text-sm">CASE CLOSED. READY FOR THE EXAM?</p>
          </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "What does the phrase 'Garbage In, Garbage Out' mean in AI?",
        options: ["The computer needs to be emptied like a trash can", "Bad quality data will make a bad AI model", "AI can help manage city waste", "Data is always useless"],
        correctAnswer: 1,
        explanation: "If you train your model with incorrect or messy data, its predictions will also be incorrect."
      },
      {
        question: "What is an 'Outlier'?",
        options: ["Someone who plays games outside", "A data point that is very different from the others (likely an error)", "A type of internet connection", "The final result of an AI model"],
        correctAnswer: 1,
        explanation: "Outliers are extreme values that don't fit the rest of the pattern, often caused by sensor errors."
      },
      {
        question: "What can happen if your data is 'Biased'?",
        options: ["The AI will become faster", "The AI will learn unfair patterns (like only recognizing one color)", "The AI will turn itself off", "The AI will become a human"],
        correctAnswer: 1,
        explanation: "Bias occurs when the data doesn't represent everyone equally, leading the AI to make unfair or incorrect assumptions."
      },
      {
        question: "If you have a missing value in your data, what is 'Imputation'?",
        options: ["Deleting the whole computer", "Filling the gap with a reasonable guess or the average value", "Asking the user to type in the answer", "Ignoring the problem completely"],
        correctAnswer: 1,
        explanation: "Imputation is the process of filling in missing data gaps so the AI has a complete set of clues to learn from."
      }
    ]
  },
  {
    id: 'vision',
    title: 'Computers Who See',
    description: 'Explore how AI recognizes images, faces, and objects in the real world.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    difficulty: 'Junior',
    color: 'from-emerald-500 to-teal-500',
    duration: '20 mins',
    reward: '400 XP',
    tags: ['Computer Vision', 'Pixels', 'CNNs'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"Through the Eyes of a Machine!"</p>
        <p>When you look at a photo of a dog, you immediately see fur, a nose, and wagging tail. But to a computer, that same photo is just a giant soup of millions of numbers! How does it turn those numbers back into "Dog"? This is called **Computer Vision**. In this module, you'll discover the secret math that lets AI "see" shapes, faces, and even tell if a tomato is ripe or rotten just by looking at it!</p>
        <div class="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
           <h4 class="text-emerald-400 font-black uppercase text-xs mb-2">Vision Training</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Pixel Power:</strong> Understand how computers read colors as numbers.</li>
             <li><strong>Filter Fun:</strong> Learn how AI uses "filters" to find edges and curves.</li>
             <li><strong>Object Detection:</strong> See how cars know the difference between a person and a tree.</li>
           </ul>
        </div>
        <p class="text-slate-300">Ready to give your computer 20/20 vision? Let's go!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: The World of Pixels</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Every digital image is made of tiny dots called <strong>Pixels</strong>. If you zoom in really close on your screen, you'll see them! For a computer, each pixel is just a number. 
          </p>
          <div class="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 mb-8 flex flex-col items-center">
             <div class="grid grid-cols-3 gap-2 mb-6">
                <div class="w-12 h-12 bg-white flex items-center justify-center text-slate-900 font-bold rounded-lg border-2 border-slate-700 shadow-lg">255</div>
                <div class="w-12 h-12 bg-slate-400 flex items-center justify-center text-white font-bold rounded-lg border-2 border-slate-700 shadow-lg">120</div>
                <div class="w-12 h-12 bg-slate-900 flex items-center justify-center text-white font-bold rounded-lg border-2 border-slate-700 shadow-lg">0</div>
             </div>
             <p class="text-slate-500 text-sm font-mono text-center max-w-sm">To you, this is a gradient from White to Black. To a computer, it's just the sequence [255, 120, 0].</p>
          </div>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            When a computer "sees" an image, it's actually looking at a giant grid (a matrix) of these numbers. Modern photos have millions of pixels, so the computer has a lot of numbers to crunch!
          </p>
        </section>

        <section class="bg-emerald-600/10 border-l-4 border-emerald-500 p-8 rounded-r-[2rem]">
          <h4 class="text-emerald-400 font-black uppercase tracking-widest mb-3">Chapter 2: How AI Finds Shapes (Filters)</h4>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            If I show you a photo of a soccer ball, you recognize it because it's round and has hexagons. AI does the same thing using <strong>Filters</strong> (also called Kernels). 
          </p>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            Imagine a tiny sliding window that moves across the image. It looks for sudden changes in pixel numbers. In a Neural Network for vision (called a <strong>CNN</strong>), the layers work like this:
          </p>
          <div class="space-y-4">
             <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 border-l-4 border-emerald-500/50">
                <p class="text-white font-black mb-1 text-sm">LEVEL 1: EDGES & LINES</p>
                <p class="text-slate-500 text-xs">The AI finds all the straight lines and sharp corners.</p>
             </div>
             <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 border-l-4 border-emerald-500/50">
                <p class="text-white font-black mb-1 text-sm">LEVEL 2: SIMPLE SHAPES</p>
                <p class="text-slate-500 text-xs">It combines lines to find circles, triangles, and squares.</p>
             </div>
             <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 border-l-4 border-emerald-500/50">
                <p class="text-white font-black mb-1 text-sm">LEVEL 3: OBJECT PARTS</p>
                <p class="text-slate-500 text-xs">It finds an eye, a wheel, or a petal.</p>
             </div>
             <div class="p-6 bg-slate-900 rounded-2xl border border-emerald-500/30 border-l-4 border-emerald-500">
                <p class="text-emerald-400 font-black mb-1 text-sm">FINAL LEVEL: THE WHOLE THING</p>
                <p class="text-slate-400 text-xs underline underline-offset-4 decoration-emerald-500/30">"It's a Bicycle!"</p>
             </div>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: More Than Just Photos</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Computer Vision isn't just about identifying static images. It's about understanding the 3D world! Self-driving cars use <strong>Lidar</strong> and Cameras to see where they are. 
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div class="p-8 bg-slate-950 rounded-3xl border border-slate-800 text-center group">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">👤</div>
                <h6 class="text-emerald-400 font-bold mb-2">Face ID</h6>
                <p class="text-slate-500 text-xs leading-relaxed">Measuring the distance between your eyes and the shape of your chin to unlock your phone.</p>
             </div>
             <div class="p-8 bg-slate-950 rounded-3xl border border-slate-800 text-center group">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🚗</div>
                <h6 class="text-emerald-400 font-bold mb-2">Self-Driving</h6>
                <p class="text-slate-500 text-xs leading-relaxed">Spotting a stop sign even in the dark or heavy rain.</p>
             </div>
          </div>
        </section>

        <section class="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative">
          <h2 class="text-2xl font-black text-white mb-6">Interactive Exercise: Be the Filter</h2>
          <p class="text-slate-300 leading-relaxed mb-6">
            If you wanted to teach an AI to find a "Smile" in a photo, what simple shapes would you tell it to look for first?
          </p>
          <div class="flex flex-wrap gap-4">
             <div class="px-6 py-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-sm">1. Curve pointing up</div>
             <span class="mt-4">➕</span>
             <div class="px-6 py-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-sm">2. White rectangles (teeth)</div>
             <span class="mt-4">➕</span>
             <div class="px-6 py-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-sm">3. Squinty eye-corners</div>
          </div>
          <p class="mt-8 text-slate-500 italic text-sm">That's exactly how a vision model builds up its certainty!</p>
        </section>

        <section class="text-center pt-8">
          <h2 class="text-3xl font-black text-white mb-6">Summary: The Eyes of the Future</h2>
          <p class="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
            Computer Vision is one of the fastest-growing parts of AI. From robots that help doctors in surgery to apps that identify rare plants in your garden, the ability for machines to "see" is changing everything.
          </p>
          <div class="bg-emerald-500 text-slate-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20 active:translate-y-1 transition-transform">
             Start the Vision Assessment
          </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "What is a 'Pixel'?",
        options: ["A type of robot", "A tiny dot of color that makes up a digital image", "A computer's keyboard", "A special kind of battery"],
        correctAnswer: 1,
        explanation: "Pixels are the building blocks of all digital screens and images. Computers see them as grids of numbers."
      },
      {
        question: "How does an AI recognize a shape like a circle?",
        options: ["By asking a human", "By using 'Filters' to find curved edges in the pixel grid", "By drawing it with a digital pen", "By memorizing every circle in the world"],
        correctAnswer: 1,
        explanation: "Filtering is the process of sliding a 'template' over an image to find patterns like edges and curves."
      },
      {
        question: "What is a 'CNN' (Convolutional Neural Network) specially used for?",
        options: ["Writing emails", "Calculating tax", "Computer Vision and recognizing images", "Cleaning a house"],
        correctAnswer: 2,
        explanation: "CNNs are the state-of-the-art brain architecture for understanding visual data like photos and videos."
      },
      {
        question: "Why is Computer Vision important for self-driving cars?",
        options: ["To play movies for the passengers", "So the car can 'see' obstacles, roads, and signs to drive safely", "To change the color of the car's paint", "To make the car go faster"],
        correctAnswer: 1,
        explanation: "Vision is the primary way self-driving cars perceive the world and make decisions about where to go."
      }
    ]
  },
  {
    id: 'nlp',
    title: 'Conversational AI',
    description: 'How do chatbots and smart assistants like Siri understand what you say?',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    difficulty: 'Junior',
    color: 'from-blue-500 to-cyan-500',
    duration: '25 mins',
    reward: '450 XP',
    tags: ['NLP', 'Chatbots', 'Tokens', 'LLMs'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"Talking to Computers in Human Language!"</p>
        <p>Have you ever asked Siri for a joke? Or chatted with an AI like ChatGPT? It feels like talking to a real person, but behind the scenes, it's just a very advanced calculator! This is called **NLP** (Natural Language Processing). In this module, you'll discover how computers turn a messy sentence into a clear command, how they predict what you're going to say next, and the secret "Language of Vectors" that lets AI understand the meaning of words.</p>
        <div class="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
           <h4 class="text-blue-400 font-black uppercase text-xs mb-2">Conversation Goals</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Tokenization:</strong> See how AI breaks sentences into "puzzle pieces".</li>
             <li><strong>Context Magic:</strong> Learn how AI knows if a "Bank" is a building or a river edge.</li>
             <li><strong>The Next-Word Game:</strong> Discover the secret logic of Large Language Models (LLMs).</li>
           </ul>
        </div>
        <p class="text-slate-300">Ready to unlock the gift of gab? Let's start the chat!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: Breaking Language Apart</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Human language is complicated. We use slang, we tell jokes, and sometimes we leave words out! To a computer, a sentence like <em>"The quick brown fox"</em> is just a long string of letters.
          </p>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            The first thing an AI does is <strong>Tokenization</strong>. It breaks the sentence into small chunks called "Tokens". 
          </p>
          <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl mb-8 flex flex-wrap gap-3 justify-center">
             <div class="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-xl text-blue-400 font-bold">The</div>
             <div class="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-xl text-blue-400 font-bold">quick</div>
             <div class="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-xl text-blue-400 font-bold">brown</div>
             <div class="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-xl text-blue-400 font-bold">fox</div>
          </div>
          <p class="text-slate-400 italic">Tokens can be whole words, or even just parts of words. They are the "Lego bricks" of conversational AI.</p>
        </section>

        <section class="bg-blue-600/10 border-l-4 border-blue-500 p-8 rounded-r-[2rem]">
          <h4 class="text-blue-400 font-black uppercase tracking-widest mb-3">Chapter 2: The Meaning Map (Embeddings)</h4>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            A computer doesn't know what a "Fox" is. But it knows that the word "Fox" is usually found near words like "Red", "Forest", and "Run". 
          </p>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            AI turns every word into a <strong>Vector</strong>—a list of numbers that describes its meaning and location in a giant 3D "Meaning Map".
          </p>
          <div class="bg-slate-950 p-8 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed mb-6">
             <p class="text-blue-400">Word: "TIGER"</p>
             <p class="text-slate-600">Location: [0.85, 0.42, 0.99, ...]</p>
             <div class="mt-4 border-t border-slate-800 pt-4">
                <p class="text-slate-500 italic">"Tiger is close to 'Lion' and 'Cat', but far away from 'Ice Cream'."</p>
             </div>
          </div>
          <p class="text-slate-300">By measuring the distance between words on this map, the AI can "understand" that a King is related to a Queen in the same way a Boy is related to a Girl!</p>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: The Ultimate Guessing Game</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Large Language Models (like the ones that power chatbots) are essentially the world's best <strong>Auto-Complete</strong> engines. They have read almost everything on the internet to learn the patterns of how humans talk.
          </p>
          <div class="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-inner mb-8">
             <p class="text-slate-500 uppercase tracking-widest text-xs font-black mb-4 text-center">How an LLM Predicts</p>
             <p class="text-center text-xl text-white mb-6">"Once upon a ______"</p>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-slate-950 rounded-xl border border-blue-500/30 text-center">
                   <p class="text-blue-400 font-black">TIME</p>
                   <p class="text-[10px] text-slate-600">95% Likely</p>
                </div>
                <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                   <p class="text-slate-500 font-black">STORY</p>
                   <p class="text-[10px] text-slate-600">4% Likely</p>
                </div>
                <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                   <p class="text-slate-500 font-black">CUPCAKE</p>
                   <p class="text-[10px] text-slate-600">0.01% Likely</p>
                </div>
             </div>
          </div>
          <p class="text-slate-300 leading-relaxed text-lg">By picking the most likely next word millions of times, they can write poems, explain math, and even suggest recipes!</p>
        </section>

        <section class="bg-indigo-950/20 p-10 rounded-[3rem] border border-indigo-500/20 relative">
          <h2 class="text-2xl font-black text-white mb-6">Real-World Logic: Sentiment Analysis</h2>
          <p class="text-slate-300 leading-relaxed mb-6 italic text-lg text-center">
            "I love this game, but it's too hard!" vs "This game's difficulty makes it amazing!"
          </p>
          <p class="text-slate-400 leading-relaxed mb-6">
            A simple computer might just see the word "HARD" and think it's a negative review. But a conversational AI uses <strong>Context</strong> to understand that in the second sentence, "Hard" is actually a good thing! This lets companies automatically sort thousands of customer messages into "Happy" or "Frustrated".
          </p>
        </section>

        <section class="text-center pt-8">
          <h2 class="text-3xl font-black text-white mb-6">Summary: The Power of Connection</h2>
          <p class="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
            Conversational AI is bringing robots closer to us than ever. As these models get smarter, they help scientists research faster, translate any language instantly, and even provide companionship. 
          </p>
          <p class="text-blue-400 font-black text-sm uppercase tracking-widest mb-4 italic animate-pulse">Ready to speak the language of AI?</p>
          <div class="bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
             Unlock the Conversation Quiz
          </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "What is 'Tokenization'?",
        options: ["Buying coins for a video game", "Breaking a sentence into smaller parts (tokens) so the AI can read it", "Turning the computer off and on again", "Encrypting a password"],
        correctAnswer: 1,
        explanation: "Tokenization is the very first step in NLP, breaking down text into manageable chunks."
      },
      {
        question: "How does an AI understand the *meaning* of a word?",
        options: ["By reading a physical dictionary", "By assigning the word a position on a 3D 'Meaning Map' based on other words near it", "By asking a human for the definition", "It doesn't—it just guesses randomly"],
        correctAnswer: 1,
        explanation: "Embeddings (vectors) allow AI to represent meaning as spatial distance between concepts."
      },
      {
        question: "What does an LLM (Large Language Model) primarily do?",
        options: ["Predict the next word in a sequence", "Identify objects in photos", "Solve complex math equations", "Clean the computer's hard drive"],
        correctAnswer: 0,
        explanation: "LLMs are statistical models that predict the most likely next token based on huge amounts of training text."
      },
       {
        question: "What is 'Sentiment Analysis'?",
        options: ["Measuring the weight of a letter", "Using AI to determine if a message is positive, negative, or neutral", "Correcting grammar mistakes", "Translating one language to another"],
        correctAnswer: 1,
        explanation: "Sentiment analysis helps AI understand the emotional tone behind a piece of text."
      }
    ]
  },
  {
    id: 'ethics',
    title: 'AI Ethics & Fairness',
    description: 'Understanding why AI needs to be fair and how to spot bias in data.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    difficulty: 'Junior',
    color: 'from-rose-400 to-red-500',
    duration: '20 mins',
    reward: '500 XP',
    tags: ['Ethics', 'Fairness', 'Responsibility'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"With Great AI Power comes Great Responsibility!"</p>
        <p>As AI starts to make big decisions—like who gets a job or how a self-driving car stays safe—we have to ask: **Is the AI being fair?** AI isn't born with a sense of right and wrong. It only knows what it's taught. If we teach it with unfair data, it will grow up to be an unfair AI! In this vital module, you'll become an Ethical Guardian. You'll learn how to spot "Bias Bullics" in your data and how to build technology that helps everyone equally.</p>
        <div class="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20">
           <h4 class="text-rose-400 font-black uppercase text-xs mb-2">Ethics Training</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Spotting Unfairness:</strong> Learn why AI sometimes makes biased choices.</li>
             <li><strong>Privacy Protection:</strong> Why keeping your data secret is like having a lock on your diary.</li>
             <li><strong>AI Safety:</strong> Discover how we keep robots from making dangerous mistakes.</li>
           </ul>
        </div>
        <p class="text-slate-300 italic">Let's build an AI world that is kind and fair for every human!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: Is the Computer Fair?</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Imagine an AI that helps a school pick the "Best Student." If we only show the AI students who play soccer, it might think that if you play the piano, you can't be a good student! 
          </p>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            This is called <strong>Algorithmic Bias</strong>. It's not because the computer is "mean"—it's because its "Brain Food" (the data) was missing important pieces of the puzzle.
          </p>
          <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-around gap-6">
             <div class="text-center">
                <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-2">⚖️</div>
                <p class="text-xs text-slate-500 uppercase font-black">FAIR AI</p>
                <p class="text-xs text-slate-400 mt-1 max-w-[120px]">Uses data that represents EVERYONE.</p>
             </div>
             <div class="w-12 h-1 bg-slate-800 hidden md:block"></div>
             <div class="text-center">
                <div class="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400 text-3xl mx-auto mb-2">❌</div>
                <p class="text-xs text-slate-500 uppercase font-black">BIASED AI</p>
                <p class="text-xs text-slate-400 mt-1 max-w-[120px]">Favors one group over another.</p>
             </div>
          </div>
        </section>

        <section class="bg-rose-600/10 border-l-4 border-rose-500 p-8 rounded-r-[2rem]">
          <h4 class="text-rose-400 font-black uppercase tracking-widest mb-3">Chapter 2: The Privacy Shield</h4>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            To learn, AI needs data. But some data is <strong>Private</strong>. Your medical records, where you live, and your passwords are parts of your "Digital Diary." 
          </p>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            AI engineers have to make sure that while the AI learns to be smart, it also forgets who you specifically are. This is called <strong>Anonymization</strong>.
          </p>
          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-medium text-sm text-slate-500 italic">
             "It's okay if the AI knows that 'a 10-year-old likes pizza'. It's NOT okay if the AI knows that 'Timmy Smith at 123 Maple Street likes pizza'!"
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: The Danger of "Deepfakes"</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Because AI is so good at patterns, it can now copy a human voice or face almost perfectly. While this is cool for movies, it can be used to trick people into believing something that never happened.
          </p>
          <div class="p-8 bg-slate-900 border border-slate-800 rounded-3xl mb-8">
             <h6 class="text-white font-bold mb-4 flex items-center gap-2">
                <span class="w-2 h-2 bg-rose-500 rounded-full"></span>
                The Ethical Guard's Guide to News:
             </h6>
             <ul class="space-y-3 text-sm text-slate-400">
                <li class="flex items-start gap-3">
                   <span class="text-rose-400">1.</span>
                   <span><strong>Verify the Source:</strong> Is this from a real news site?</span>
                </li>
                <li class="flex items-start gap-3">
                   <span class="text-rose-400">2.</span>
                   <span><strong>Look for Glitches:</strong> AI videos often have weird blurry spots near ears or eyes.</span>
                </li>
                <li class="flex items-start gap-3">
                   <span class="text-rose-400">3.</span>
                   <span><strong>Ask "Why?":</strong> Is this video trying to make me angry or scared?</span>
                </li>
             </ul>
          </div>
        </section>

        <section class="bg-amber-950/20 p-10 rounded-[3rem] border border-amber-500/20">
          <h2 class="text-2xl font-black text-white mb-6 text-center">Your Ethical Pledge 📜</h2>
          <div class="max-w-xl mx-auto space-y-4 italic text-slate-300 text-center leading-relaxed">
             <p>"I will never use AI to trick others."</p>
             <p>"I will always ask if my data is fair to everyone."</p>
             <p>"I will use technology to save time, not to take away human kindness."</p>
          </div>
        </section>

        <section class="text-center pt-8">
          <h2 class="text-3xl font-black text-white mb-6">Final Lesson: Helping, Not Replacing</h2>
          <p class="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
            Ethics is about making sure AI is a <strong>Tool</strong> that helps humans do things better, faster, and more safely. As an AI Architect, you have a seat at the table to make sure the future is a happy one!
          </p>
          <div class="inline-block px-8 py-4 bg-rose-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-rose-500/30 active:translate-y-1 transition-all pointer-events-auto cursor-pointer">
             Take the Ethical Guardian Test
          </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "What is AI 'Bias'?",
        options: ["When the AI is too fast", "When the AI behaves unfairly because its data didn't represent everyone", "When the AI needs a software update", "When the AI is stored in a tilted box"],
        correctAnswer: 1,
        explanation: "Bias occurs when training data is skewed, leading the AI to favor certain groups over others."
      },
      {
        question: "Why is 'Privacy' important in AI?",
        options: ["So the computer doesn't get embarrassed", "To protect personal secrets like where you live and your medical info", "Because electricity is expensive", "So the AI doesn't learn too much"],
        correctAnswer: 1,
        explanation: "Protecting personal data ensures that AI remains a safe and trusted tool for everyone."
      },
      {
        question: "What is a 'Deepfake'?",
        options: ["A very deep hole in the ground", "A fake video or audio clip created by AI that looks very real", "A type of cake with five layers", "An AI that only does math"],
        correctAnswer: 1,
        explanation: "Deepfakes use AI to generate realistic but fake media, which is why we must always verify what we see online."
      }
    ]
  },
  {
    id: 'recommendations',
    title: 'Smart Suggestions',
    description: 'Discover how Netflix and YouTube know exactly what you want to watch next.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.143-5.714L5 13l5.714-2.143L13 3z" />
      </svg>
    ),
    difficulty: 'Explorer',
    color: 'from-rose-500 to-orange-500',
    duration: '20 mins',
    reward: '400 XP',
    tags: ['Recommenders', 'Algorithms', 'User Behavior'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"Your Personal Digital DJ!"</p>
        <p>Do you ever finish a video and see another one that looks *exactly* like something you'd enjoy? Or does Netflix suggest a movie that you've been wanting to see? That's not a coincidence—it's a **Recommendation Engine**. These smart systems study your likes, your skips, and even what people *like you* are watching. In this adventure, you'll learn the two main ways AI makes suggestions: the "BFF Path" (people like you) and the "Favorite Flavors" (stuff you already like)!</p>
        <div class="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20">
           <h4 class="text-rose-400 font-black uppercase text-xs mb-2">Shopping Trip Goals</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Collab Filtering:</strong> Learn how the "People who bought this also bought..." logic works.</li>
             <li><strong>Content Matching:</strong> See how AI tags movies with "Hidden Clues".</li>
             <li><strong>Avoiding the Bubble:</strong> Why it's good to see new things sometimes!</li>
           </ul>
        </div>
        <p class="text-slate-300">Ready to see how the world is personalized for you? Let's go!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: The AI Concierge</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Imagine walking into a library with 10 million books. You'd never find the one you want! But if you had a friend who knew every book you ever read, they could point right to the perfect one. That's a <strong>Recommendation System</strong>.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div class="bg-slate-900 p-8 rounded-[2rem] border border-slate-800">
                <h6 class="text-rose-400 font-black mb-4 uppercase text-xs">Path A: The "BFF" Logic</h6>
                <p class="text-slate-400 text-sm">"If Timmy and Sarah both like Minecraft and Pizza, and Timmy likes Roblox... Sarah might like Roblox too!"</p>
             </div>
             <div class="bg-slate-900 p-8 rounded-[2rem] border border-slate-800">
                <h6 class="text-rose-400 font-black mb-4 uppercase text-xs">Path B: The "Flavor" Logic</h6>
                <p class="text-slate-400 text-sm">"You watched 'Space Wars'—which is Tagged as [ACTION, SCI-FI]. Here are more [ACTION, SCI-FI] movies!"</p>
             </div>
          </div>
        </section>

        <section class="bg-rose-600/10 border-l-4 border-rose-500 p-8 rounded-r-[2rem]">
          <h4 class="text-rose-400 font-black uppercase tracking-widest mb-3">Chapter 2: Collaborative Filtering (Mirroring)</h4>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            This is the most popular type. The AI builds a giant web of users. It looks for people with the exact same taste as you. This is called <strong>User-Based Recommendation</strong>.
          </p>
          <div class="bg-slate-950 p-8 rounded-2xl border border-slate-800 font-medium text-sm text-slate-500 mb-6">
             <p class="mb-4">1. You like User A + User B + User C</p>
             <p class="mb-4">2. Other person likes User A + User B</p>
             <p class="text-emerald-400 font-black">AI SAYS: "Hey other person, you should follow User C!"</p>
          </div>
          <p class="text-slate-400 italic">This is how TikTok and Spotify find new artists for you to discover!</p>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: Content-Based Filtering (Tags)</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            What if you're the first person to ever visit a store? The AI has no "BFFs" to compare you to! This is called the <strong>Cold Start Problem</strong>. 
          </p>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Instead, the AI looks at the items themselves. Every movie, song, and toy has hundreds of secret "Tags" (like 'Blue', 'Fast-Paced', 'Funny'). When you look at one "Fast-Paced" item, the AI shows you all the other ones in the warehouse.
          </p>
        </section>

        <section class="bg-amber-950/20 p-10 rounded-[3rem] border border-amber-500/20">
          <h2 class="text-2xl font-black text-white mb-6">The "Filter Bubble" Warning 🫧</h2>
          <p class="text-slate-300 leading-relaxed mb-6">
            If the AI only shows you what it *thinks* you like, you might missing out on something totally new! This is why scientists create **Diversity Algorithms** that throw in a "Wildcard" suggestion—something completely different just to see if you'll try it. 
          </p>
          <div class="bg-slate-900/50 p-6 rounded-2xl text-xs text-slate-400 border border-slate-800">
             "Don't be afraid to click on something you've never heard of. You might burst your bubble and find a new favorite!"
          </div>
        </section>

        <section class="text-center pt-8">
          <h2 class="text-3xl font-black text-white mb-6">Summary: AI Knows You (Mostly!)</h2>
          <p class="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
            Recommendation engines are everywhere. They help us save time and find things we love. By understanding how they work, you can "train" your own algorithms by liking what you truly enjoy and skipping what you don't!
          </p>
          <div class="bg-rose-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
             Start Recommendation Mission
          </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "What is 'Collaborative Filtering'?",
        options: ["Cleaning the computer's fans", "Suggesting things based on what similar people enjoyed", "Adding a photo filter to a picture", "Blocking all movies with certain words"],
        correctAnswer: 1,
        explanation: "Collaborative filtering finds people with similar tastes to yours and suggests what they like to you."
      },
      {
        question: "What is the 'Cold Start Problem'?",
        options: ["When the computer starts in the winter", "When an AI has no data about a new user to make suggestions", "A type of battery failure", "When an AI can't remember its name"],
        correctAnswer: 1,
        explanation: "New users have no history, so AI has to use 'Content-Based' logic until it learns more about them."
      },
      {
        question: "Why do AI systems sometimes show you 'Wildcard' suggestions?",
        options: ["Because the computer is broken", "To help you 'burst your bubble' and discover new things you didn't know you liked", "To see if you will click on an ad", "They just make mistakes"],
        correctAnswer: 1,
        explanation: "Diversity is key to keeping suggestions fresh and preventing the AI from getting stuck in a loop."
      }
    ]
  },
  {
    id: 'robotics',
    title: 'Future of Robotics',
    description: 'See how self-driving cars use sensors and AI to navigate the streets.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    difficulty: 'Explorer',
    color: 'from-amber-500 to-yellow-500',
    duration: '30 mins',
    reward: '600 XP',
    tags: ['Robotics', 'Sensors', 'Actuators', 'Future'],
    longDescription: `
      <div class="space-y-6">
        <p class="text-xl text-slate-200 font-bold italic">"When AI Gets a Body!"</p>
        <p>We've talked about AI as a "Digital Brain" inside a computer. But what happens when that brain gets arms, legs, or wheels? That's **Robotics**! In this final, futuristic module, you'll see how robots "Sense, Think, and Act" to navigate the real world. From self-driving cars that see through fog to robot dogs that can do backflips, you'll discover the harmony of hardware and software that is building the world of tomorrow.</p>
        <div class="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
           <h4 class="text-amber-400 font-black uppercase text-xs mb-2">Roboticist Handbook</h4>
           <ul class="list-disc list-inside text-sm text-slate-400 space-y-2">
             <li><strong>Sensor Fusion:</strong> How robots use "Super Senses" like Lidar and Sonar.</li>
             <li><strong>The Loop:</strong> Understand the cycle of Sensing, Thinking, and Acting.</li>
             <li><strong>Robot Helpers:</strong> Meet the machines exploring Mars and helping in hospitals.</li>
           </ul>
        </div>
        <p class="text-slate-300 italic">Ready to build the future? The robots are waiting for your commands!</p>
      </div>
    `,
    lectureContent: `
      <div class="space-y-12 pb-12">
        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 1: The Three Pillars of a Robot</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Every robot, whether it's a tiny vacuum cleaner or a giant rocket, follows the same three steps over and over again. This is called the <strong>Robotic Loop</strong>.
          </p>
          <div class="flex flex-col md:flex-row gap-6 mb-8">
             <div class="flex-1 p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center">
                <div class="text-3xl mb-3">👀</div>
                <h6 class="text-amber-400 font-black text-xs uppercase mb-2">1. SENSE</h6>
                <p class="text-slate-500 text-xs text-center">Using cameras, microphones, and touch sensors to gather data about the world.</p>
             </div>
             <div class="flex-1 p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center">
                <div class="text-3xl mb-3">🧠</div>
                <h6 class="text-amber-400 font-black text-xs uppercase mb-2">2. THINK</h6>
                <p class="text-slate-500 text-xs text-center">The AI brain processes the data and decides what to do next (e.g., "Stop! A cat is in the way").</p>
             </div>
             <div class="flex-1 p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center">
                <div class="text-3xl mb-3">🦾</div>
                <h6 class="text-amber-400 font-black text-xs uppercase mb-2">3. ACT</h6>
                <p class="text-slate-500 text-xs text-center">The motors (actuators) move the robot's wheels or arms to carry out the plan.</p>
             </div>
          </div>
        </section>

        <section class="bg-amber-600/10 border-l-4 border-amber-500 p-8 rounded-r-[2rem]">
          <h4 class="text-amber-400 font-black uppercase tracking-widest mb-3">Chapter 2: Super Senses (Sensor Fusion)</h4>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            Human eyes are great, but robots can see things we can't! A self-driving car doesn't just use a camera; it uses <strong>Lidar</strong> (lasers that bounce off objects) and <strong>Radar</strong> (radio waves). 
          </p>
          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            When a robot combines all these inputs together to get one perfect map, it's called <strong>Sensor Fusion</strong>. 
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div class="px-6 py-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span class="text-xs text-slate-400">Cameras</span>
                <span class="text-amber-500 font-bold">Colors & Shapes</span>
             </div>
             <div class="px-6 py-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span class="text-xs text-slate-400">Lidar</span>
                <span class="text-amber-500 font-bold">Perfect Distance</span>
             </div>
             <div class="px-6 py-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span class="text-xs text-slate-400">Ultrasonic</span>
                <span class="text-amber-500 font-bold">Close Obstacles</span>
             </div>
             <div class="px-6 py-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span class="text-xs text-slate-400">IMU</span>
                <span class="text-amber-500 font-bold">Balance & Tilt</span>
             </div>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-black text-white mb-6">Chapter 3: Robots in Strange Places</h2>
          <p class="mb-6 text-slate-300 leading-relaxed text-lg">
            Robots are our pioneers! They go where humans can't. 
          </p>
          <div class="space-y-6">
             <div class="p-8 bg-slate-900 border border-slate-800 rounded-[3rem] relative overflow-hidden group">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-5 group-hover:rotate-12 transition-transform">🚀</div>
                <h6 class="text-white font-black mb-2">Space Explorers</h6>
                <p class="text-slate-400 text-sm leading-relaxed">Rovers like 'Perseverance' on Mars use AI to choose which rocks to study without waiting for commands from Earth (since it takes 20 minutes for a signal to travel!).</p>
             </div>
             <div class="p-8 bg-slate-900 border border-slate-800 rounded-[3rem] relative overflow-hidden group">
                <div class="absolute -right-4 -bottom-4 text-7xl opacity-5 group-hover:rotate-12 transition-transform">🌊</div>
                <h6 class="text-white font-black mb-2">Deep Sea Divers</h6>
                <p class="text-slate-400 text-sm leading-relaxed">Underwater robots explore the darkest parts of the ocean, mapping coral reefs and finding sunken ships where the water pressure is too high for people.</p>
             </div>
          </div>
        </section>

        <section class="bg-indigo-950/20 p-10 rounded-[3rem] border border-indigo-500/20">
          <h2 class="text-2xl font-black text-white mb-6">Interactive Thought Experiment: The Trolley Dilemma</h2>
          <p class="text-slate-300 leading-relaxed mb-6">
            If a self-driving car's brakes fail, and it has to choose between hitting a pothole (risking the car) or swerving onto a sidewalk... what should it do? 
          </p>
          <p class="text-slate-400 italic text-sm mb-6">
            These aren't just technical questions—they are <strong>Ethical</strong> ones. As a roboticist, you'll help write the "rules of the road" for these machines to keep everyone as safe as possible.
          </p>
        </section>

        <section class="text-center pt-8">
          <h2 class="text-3xl font-black text-white mb-6">Summary: The Team of the Future</h2>
          <p class="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto mb-10">
            In the future, robots won't just be machines; they'll be our partners. They'll help us grow food more efficiently, keep our streets clean, and explore new worlds. By learning AI today, you're getting ready to be the person who tells those robots HOW to make the world a better place.
          </p>
          <div class="inline-block px-12 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 font-black rounded-2xl shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto">
             FINISH YOUR FINAL MISSION
          </div>
        </section>
      </div>
    `,
    practiceTest: [
      {
        question: "What is the 'Robotic Loop'?",
        options: ["A circus trick for robots", "The 3-step cycle of Sensing, Thinking, and Acting", "A type of battery for robots", "A software error that never ends"],
        correctAnswer: 1,
        explanation: "The loop allows a robot to constantly update its understanding of the world and respond to changes."
      },
      {
        question: "What is 'Sensor Fusion'?",
        options: ["Melting sensors together with a torch", "Combining data from many different sensors to create one accurate map", "A type of energy used by spaceships", "Ignoring sensors when they disagree"],
        correctAnswer: 1,
        explanation: "By combining different sensors (like cameras and Lidar), a robot can see better and more accurately."
      },
      {
        question: "Why do Mars Rovers need AI?",
        options: ["To play music for the aliens", "Because it takes too long for signals to travel from Earth, so the rover must make its own quick decisions", "To make them go faster than light", "They don't really need it"],
        correctAnswer: 1,
        explanation: "Autonomous decision-making is vital for space missions where real-time remote control is impossible."
      },
      {
        question: "What is an 'Actuator' in robotics?",
        options: ["The robot's battery", "The parts that allow a robot to move (like motors and gears)", "A type of sensor", "The person who builds the robot"],
        correctAnswer: 1,
        explanation: "Actuators are the muscles of the robot, turning the AI's 'thoughts' into physical movement."
      }
    ]
  }
];

const ML4Kids: React.FC<{ onNavigate: (tab: NavigationItem) => void }> = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState<MLTopic | null>(null);

  const handleStartAdventure = (topic: MLTopic) => {
    setSelectedTopic(topic);
  };

  if (selectedTopic) {
    return (
      <MissionDetails
        mission={{
          id: selectedTopic.id,
          category: 'Machine Learning',
          title: selectedTopic.title,
          description: selectedTopic.description,
          longDescription: selectedTopic.longDescription || `<p>Coming soon: Detailed adventure description for ${selectedTopic.title}!</p>`,
          lectureContent: selectedTopic.lectureContent || `<p>Interactive guide for ${selectedTopic.title} is being prepared.</p>`,
          practiceTest: selectedTopic.practiceTest || [],
          bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
          difficulty: selectedTopic.difficulty,
          isLocked: false,
          isCompleted: false,
          reward: selectedTopic.reward || '150 XP',
          icon: '🤖',
          tags: selectedTopic.tags || ['AI', 'ML4Kids'],
          estimatedTime: selectedTopic.duration
        }}
        onBack={() => setSelectedTopic(null)}
        onSolve={(tab) => {
          setSelectedTopic(null);
          onNavigate(tab);
        }}
        onComplete={(score) => {
          console.log(`Topic ${selectedTopic.title} completed with score: ${score}`);
          setSelectedTopic(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">ML4Kids</h1>
          <p className="text-slate-400 mt-2 font-medium text-lg italic">Explore the magic of Machine Learning through interactive adventures!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic) => (
          <div 
            key={topic.id}
            onClick={() => handleStartAdventure(topic)}
            className="group relative bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98] cursor-pointer"
          >
            {/* Background Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-tr ${topic.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
            
            <div className="p-8 space-y-6 relative z-10">
              {/* Header Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${topic.color} p-[1px]`}>
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                  {topic.icon}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-700`}>
                    {topic.difficulty}
                  </span>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">•</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {topic.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-tight">
                  {topic.title}
                </h3>
              </div>

              <p className="text-slate-400 font-medium leading-relaxed">
                {topic.description}
              </p>

              <button 
                onClick={(e) => { e.stopPropagation(); handleStartAdventure(topic); }}
                className={`w-full py-4 rounded-2xl bg-slate-800 text-white font-black text-xs uppercase tracking-widest border border-slate-700 group-hover:bg-gradient-to-tr group-hover:${topic.color} group-hover:border-transparent transition-all duration-500 flex items-center justify-center space-x-2`}
              >
                <span>Start Adventure</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            {/* Premium Corner Detail */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${topic.color} opacity-5 -translate-y-12 translate-x-12 blur-xl transition-transform duration-700 group-hover:translate-x-6 group-hover:-translate-y-6`} />
          </div>
        ))}
      </div>

      {/* Decorative Banner */}
      <div className="mt-12 p-10 bg-gradient-to-br from-indigo-600/10 to-transparent border border-indigo-500/20 rounded-[3rem] relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-3">Ready to Train Your Own AI?</h2>
            <p className="text-slate-400 font-medium max-w-xl">Join thousand of junior engineers and build your first intelligent model today. No coding required!</p>
          </div>
          <button className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
            Join the Lab
          </button>
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
    </div>
  );
};

export default ML4Kids;

