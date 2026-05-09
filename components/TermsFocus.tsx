import React, { useState } from 'react';
import { User, NavigationItem } from '../types';

interface Term {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  topics: string[];
  activities: string[];
}

interface Tier {
  id: string;
  title: string;
  subtitle: string;
  terms: Term[];
  info: string;
  objectives: string[];
}

const TIERS: Tier[] = [
  {
    id: 'basic',
    title: 'Basic',
    subtitle: 'HTML Coding Adventure',
    info: 'An 8-week coding adventure for young builders aged 7–10. Every week you learn something new and exciting about building websites with HTML!',
    objectives: [
      'Understand Boxification & Layouts',
      'Create & Structure HTML Files',
      'Master Text, Links & Images',
      'Style with CSS & Present Projects'
    ],
    terms: [
      { 
        id: 'b-1', 
        title: 'Boxification!', 
        description: 'Everything on a website is a box!', 
        icon: '📦', 
        color: 'bg-blue-500',
        topics: ['Everything is a box', 'Nesting toys analogy', 'Box layout principles'],
        activities: ['Spot boxes on websites', 'Paper layout building', 'Scissors & layout lab']
      },
      { 
        id: 'b-2', 
        title: 'First Code!', 
        description: 'Creating your very first HTML file', 
        icon: '📄', 
        color: 'bg-teal-500',
        topics: ['What is HTML?', 'The HTML Skeleton', 'Opening/Closing tags'],
        activities: ['Create index.html', 'Type basic skeleton', 'Open file in browser']
      },
      { 
        id: 'b-3', 
        title: 'Text Tags!', 
        description: 'Headings, paragraphs, and text logic', 
        icon: '✍️', 
        color: 'bg-emerald-500',
        topics: ['Headings (h1-h6)', 'Paragraphs (<p>)', 'Text hierarchy'],
        activities: ['Build About Me page', 'Heading size comparison', 'Self-description lab']
      },
      { 
        id: 'b-4', 
        title: 'Links & Images', 
        description: 'Making pages come alive!', 
        icon: '🔗', 
        color: 'bg-purple-500',
        topics: ['<a> tags for links', '<img> tags for pictures', 'Attributes (href, src, alt)'],
        activities: ['Link to favorite site', 'Add animal pictures', 'Attribute explanation lab']
      },
      { 
        id: 'b-5', 
        title: 'CSS Colour!', 
        description: 'Adding style with basic CSS', 
        icon: '🎨', 
        color: 'bg-orange-500',
        topics: ['CSS basics', '<style> tags', 'Color names & Hex codes'],
        activities: ['Add background colors', 'Style headings & text', 'Favorite color styling']
      },
      { 
        id: 'b-6', 
        title: 'Lists & Tables', 
        description: 'Organising information like a pro', 
        icon: '📋', 
        color: 'bg-rose-500',
        topics: ['Lists (ul, ol, li)', 'Tables (table, tr, td)', 'Information organization'],
        activities: ['Create "Favorite Things" list', 'Build a class timetable', 'Styling lists & tables']
      },
      { 
        id: 'b-7', 
        title: 'Full Page!', 
        description: 'Building your final polished project', 
        icon: '🏗️', 
        color: 'bg-pink-500',
        topics: ['Build week!', 'Group with <div>', 'Formatting (br, hr)'],
        activities: ["Final About Me build", "Peer review session", "Debugging missing tags"]
      },
      { 
        id: 'b-8', 
        title: 'Show & Tell!', 
        description: 'Present your masterpiece!', 
        icon: '🎤', 
        color: 'bg-amber-500',
        topics: ['Presentation skills', 'Project reflection', 'Next steps (CSS/JS)'],
        activities: ["Live demo to class", "Tag explanation quiz", "Certificate ceremony"]
      },
    ]
  },
  {
    id: 'jss1',
    title: 'JSS 1',
    subtitle: 'Python Fundamentals',
    info: 'Establish a solid foundation in Python. Set up environments, master basic syntax, and understand the core mechanics of storing and displaying information.',
    objectives: [
      'Understand Compiler vs Interpreter',
      'Master Variable Declaration & Naming',
      'Handle Input/Output Operations',
      'Apply Basic Arithmetic Logic'
    ],
    terms: [
      { 
        id: 't1-1', 
        title: 'Hello World', 
        description: 'Environment setup and output basics', 
        icon: '👋', 
        color: 'bg-emerald-500',
        topics: ['Computer programming basics', 'Compiler vs Interpreter', 'Environment installation'],
        activities: ['Setup local environment', 'Print "Hello World"', 'Fix first syntax error']
      },
      { 
        id: 't1-2', 
        title: 'Variables', 
        description: 'Dynamic data storage and naming rules', 
        icon: '📦', 
        color: 'bg-indigo-500',
        topics: ['Data storage concepts', 'Variable declaration', 'Naming conventions'],
        activities: ['Create player profile variables', 'Variable reassignment exercise', 'Dynamic math outputs']
      },
      { 
        id: 't1-3', 
        title: 'Data Types', 
        description: 'Ints, Floats, Strings, and Booleans', 
        icon: '🔢', 
        color: 'bg-sky-500',
        topics: ['Numbers vs Text', 'Boolean logic values', 'Type conversion basics'],
        activities: ['Classify data types', 'Build a simple age calculator', 'Boolean challenge script']
      },
      { 
        id: 't1-4', 
        title: 'Math & Logic', 
        description: 'Arithmetic operators and PEMDAS', 
        icon: '➗', 
        color: 'bg-amber-500',
        topics: ['Standard operators', 'Exponentiation (**) and Modulo (%)', 'Order of operations'],
        activities: ['Build a percentage calculator', 'Solve PEMDAS code puzzles', 'Even/Odd number checker']
      },
      { 
        id: 't1-5', 
        title: 'Dealing with Strings', 
        description: 'Manipulation, slicing, and formatting', 
        icon: '🔤', 
        color: 'bg-rose-500',
        topics: ['String concatenation', 'Indexing and slicing', 'f-string formatting'],
        activities: ['Name tag generator', 'Reverse string exercise', 'Dynamic welcome message build']
      },
      { 
        id: 't1-6', 
        title: 'Functional Logic', 
        description: 'Input processing and return values', 
        icon: 'ƒ', 
        color: 'bg-cyan-500',
        topics: ['Defining functions', 'Parameters and arguments', 'Return statements'],
        activities: ['Create reusable math functions', 'Build a unit converter', 'Function-based greet system']
      },
      { 
        id: 't1-7', 
        title: 'Advanced Collections', 
        description: 'Introduction to structured data storage', 
        icon: '📚', 
        color: 'bg-violet-500',
        topics: ['Introduction to Lists', 'Accessing list elements', 'List methods (.append, .pop)'],
        activities: ['Manage an inventory list', 'Grocery list simulator', 'List search exercise']
      },
      { 
        id: 't1-8', 
        title: 'Final Project', 
        description: 'Building your first full Python app', 
        icon: '🏆', 
        color: 'bg-lime-500',
        topics: ['Project architecture', 'Combining all JSS1 skills', 'Debugging workflows'],
        activities: ['Build "My Digital Identity" app', 'Final presentation prep', 'Instructor review session']
      },
    ]
  },
  {
    id: 'jss2',
    title: 'JSS 2',
    subtitle: 'Data Structures & Logic',
    info: 'Master complex data collections and decision-making logic. Learn how to navigate, search, and manipulate datasets efficiently.',
    objectives: [
      'Master List & Dictionary Methods',
      'Implement Complex Search Logic',
      'Understand Nested Conditionals',
      'Introduction to AI Flow Logic'
    ],
    terms: [
      { 
        id: 't2-1', 
        title: 'List & Methods', 
        description: 'Managing ordered item collections', 
        icon: '📜', 
        color: 'bg-rose-500',
        topics: ['Understanding lists as objects', 'Mutable vs Immutable', 'Common list operations'],
        activities: ['Create shopping list', 'Use .append() and .pop()', 'Sorting algorithms intro']
      },
      { 
        id: 't2-2', 
        title: 'Dictionary', 
        description: 'Key-value mapping and data retrieval', 
        icon: '📖', 
        color: 'bg-cyan-500',
        topics: ['Key-value pairs', 'Accessing values via keys', 'Dictionary methods'],
        activities: ['Student database build', 'JSON mapping exercise', 'Dictionary search script']
      },
      { 
        id: 't2-3', 
        title: 'String Methods', 
        description: 'Advanced text processing power', 
        icon: '🧪', 
        color: 'bg-slate-500',
        topics: ['.upper(), .lower(), .strip()', 'Search & Replace', 'Formatting templates'],
        activities: ['Text cleaner script', 'Word count challenge', 'Automatic email formatter']
      },
      { 
        id: 't2-4', 
        title: 'Decision Logic', 
        description: 'If/Else branching and truthiness', 
        icon: '⚖️', 
        color: 'bg-indigo-500',
        topics: ['Comparison operators', 'Indentation importance', 'Multi-condition branching'],
        activities: ['Grading system build', 'Weather advice app', 'Nested if-else logic']
      },
      { 
        id: 't2-5', 
        title: 'Iterative Logic', 
        description: 'For and While loops for repetition', 
        icon: '🔄', 
        color: 'bg-orange-500',
        topics: ['For loops syntax', 'While loop mechanics', 'Range function'],
        activities: ['Multiplication table gen', 'Number guessing game', 'Countdown timer build']
      },
      { 
        id: 't2-6', 
        title: 'Nested Logic', 
        description: 'Methods within loops and logic', 
        icon: '🕸️', 
        color: 'bg-teal-500',
        topics: ['Loops within loops', 'Conditional logic inside loops', 'Matrix navigation'],
        activities: ['Building a 2D grid', 'Pattern printing exercises', 'Complex data search']
      },
      { 
        id: 't2-7', 
        title: 'AI and Logic', 
        description: 'Connecting code to intelligent flow', 
        icon: '🧠', 
        color: 'bg-red-500',
        topics: ['Logic flow for AI', 'State management', 'Decision trees'],
        activities: ['Simple chatbot logic', 'AI pathfinding simulation', 'Logic flow diagramming']
      },
    ]
  },
  {
    id: 'jss3',
    title: 'JSS 3',
    subtitle: 'Object Oriented Programming',
    info: 'Transition from procedural to object-oriented programming. Build reusable blueprints for complex systems and AI-integrated modules.',
    objectives: [
      'Encapsulate Logic into Functions',
      'Understand Variable Scope (Local/Global)',
      'Construct Class-Based Blueprints',
      'Apply Inheritance & Polymorphism'
    ],
    terms: [
      { 
        id: 't3-1', 
        title: 'Functions', 
        description: 'Modularizing code for reusability', 
        icon: '🏗️', 
        color: 'bg-violet-500',
        topics: ['Defining functions', 'Parameters & Arguments', 'Return values'],
        activities: ['Math library build', 'Reusable code modules', 'Unit converter project']
      },
      { 
        id: 't3-2', 
        title: 'Scope', 
        description: 'Local vs Global data visibility', 
        icon: '🔭', 
        color: 'bg-fuchsia-500',
        topics: ['Local vs Global scope', 'Namespace isolation', 'The "global" keyword'],
        activities: ['Scope shadow exercise', 'State tracker build', 'Security isolation test']
      },
      { 
        id: 't3-3', 
        title: 'OOP Foundations', 
        description: 'Introduction to Class architecture', 
        icon: '🏛️', 
        color: 'bg-blue-500',
        topics: ['Classes as blueprints', 'Objects as instances', 'The __init__ method'],
        activities: ['Robot blueprint build', 'Game character creation', 'Object property mapping']
      },
      { 
        id: 't3-4', 
        title: 'Classes & Methods', 
        description: 'Defining behaviors for objects', 
        icon: '🧬', 
        color: 'bg-indigo-600',
        topics: ['Instance methods', 'Class variables', 'Self keyword deep dive'],
        activities: ['Bank account simulation', 'Inventory system architecture', 'Behavioral scripting']
      },
      { 
        id: 't3-5', 
        title: 'Advanced OOP', 
        description: 'Inheritance and polymorphism', 
        icon: '⚡', 
        color: 'bg-amber-500',
        topics: ['Inheritance patterns', 'Method overriding', 'Polymorphism basics'],
        activities: ['Vehicle class hierarchy', 'Custom UI element build', 'Complex system modeling']
      },
      { 
        id: 't3-6', 
        title: 'Modular Code', 
        description: 'Importing and export patterns', 
        icon: '📦', 
        color: 'bg-emerald-500',
        topics: ['Importing modules', 'Creating packages', 'External libraries'],
        activities: ['Custom library export', 'API consumption setup', 'Modular system build']
      },
      { 
        id: 't3-7', 
        title: 'Final Project', 
        description: 'Full System Architecture build', 
        icon: '🎯', 
        color: 'bg-rose-600',
        topics: ['Full system design', 'Architecture review', 'Presentation skills'],
        activities: ['School Management System', 'Instructor review', 'Final deployment']
      },
    ]
  },
  {
    id: 'ss1',
    title: 'SS 1',
    subtitle: 'AI Automation & LangChain',
    info: 'Master the art of AI automation using LangChain. Build complex chains, manage persistent memory, and deploy autonomous agents that solve real-world problems.',
    objectives: [
      'Build AI Chains with LangChain',
      'Control Smart Chat Memory',
      'Create Autonomous AI Agents',
      'Automate Real-World Problems'
    ],
    terms: [
      { 
        id: 'ts1-1', 
        title: 'What is AI Automation?', 
        description: 'LLM basics and API environment setup', 
        icon: '🤖', 
        color: 'bg-orange-600',
        topics: ['What is an LLM? (GPT, Claude, Gemini)', 'What can AI automate?', 'API keys & environment setup'],
        activities: ['Sign up & first API call', 'Compare 3 LLM outputs', 'Brainstorming automation ideas']
      },
      { 
        id: 'ts1-2', 
        title: 'LangChain Foundations', 
        description: 'Introduction to chain-based logic', 
        icon: '🔗', 
        color: 'bg-indigo-600',
        topics: ['What is LangChain?', 'LLMChain basics', 'PromptTemplate class'],
        activities: ['Install LangChain & run first chain', 'Build a dynamic QA chain', 'LLM swapping analysis']
      },
      { 
        id: 'ts1-3', 
        title: 'Prompt & Variables', 
        description: 'Dynamic templating and formatting', 
        icon: '📝', 
        color: 'bg-teal-600',
        topics: ['Dynamic variables in prompts', 'System vs Human messages', 'Output formatting patterns'],
        activities: ['Build CV summary generator', 'Test 3 template variations', 'Best output competition']
      },
      { 
        id: 'ts1-4', 
        title: 'Sequential Chains', 
        description: 'Multi-step AI pipelines', 
        icon: '⛓️', 
        color: 'bg-rose-600',
        topics: ['Chaining outputs as inputs', 'SimpleSequentialChain', 'Multi-step pipeline design'],
        activities: ['Headline to Tweet chain', 'News summarizer pipeline', 'Pipeline debugging session']
      },
      { 
        id: 'ts1-5', 
        title: 'Memory Systems', 
        description: 'Persistent context and chat history', 
        icon: '🧠', 
        color: 'bg-cyan-600',
        topics: ['ConversationBufferMemory', 'Context window limits', 'Adding state to chains'],
        activities: ['Build a chatbot with memory', 'Test memory across 10 turns', 'State persistence lab']
      },
      { 
        id: 'ts1-6', 
        title: 'Agents & Tools', 
        description: 'Autonomous agents and tool integration', 
        icon: '🛠️', 
        color: 'bg-lime-600',
        topics: ['What is an agent?', 'ReAct pattern', 'Tool use (Search, Math)'],
        activities: ['Build web search agent', 'Math problem solving agent', 'Agent task design']
      },
      { 
        id: 'ts1-7', 
        title: 'Solving Problems', 
        description: 'Designing end-to-end AI solutions', 
        icon: '🎯', 
        color: 'bg-amber-600',
        topics: ['Combining chains + memory + agents', 'Planning automation solutions', 'Testing AI pipelines'],
        activities: ['Build school automation task', 'Peer review session', 'Pitch automation project']
      },
      { 
        id: 'ts1-8', 
        title: 'Grand Project', 
        description: 'Final AI automation capstone', 
        icon: '🚀', 
        color: 'bg-slate-900',
        topics: ['Final polish & test', 'Presentation design', 'Live demo prep'],
        activities: ['Present LangChain project', 'Investor-style Q&A', 'Certificate ceremony']
      },
    ]
  },
  {
    id: 'ss2',
    title: 'SS 2',
    subtitle: 'Prompt Engineering Pro',
    info: 'Master the art of high-level AI communication. Learn to control, structure, and optimize AI output for industrial-scale applications.',
    objectives: [
      'Master Few-Shot & CoT Prompting',
      'Implement Output Validation Gates',
      'Design Multi-Step Agent Workflows',
      'Solve Complex Edge-Case Logic'
    ],
    terms: [
      { 
        id: 'ts2-1', 
        title: 'Intro to Prompting', 
        description: 'Basic AI communication patterns', 
        icon: '💬', 
        color: 'bg-zinc-700',
        topics: ['Zero-shot vs One-shot', 'Role prompting', 'Delimiters and structure'],
        activities: ['Basic prompt lab', 'Instruction tuning', 'Constraint mapping']
      },
      { 
        id: 'ts2-2', 
        title: 'Advanced Prompt', 
        description: 'Few-shot and Chain-of-Thought', 
        icon: '🧩', 
        color: 'bg-lime-500',
        topics: ['Few-shot learning', 'Chain of Thought (CoT)', 'Multi-step reasoning'],
        activities: ['Complex logic prompts', 'Reasoning trace build', 'Self-correction lab']
      },
      { 
        id: 'ts2-3', 
        title: 'Elements of Prompt', 
        description: 'Context, Persona, and Goal', 
        icon: '💎', 
        color: 'bg-cyan-400',
        topics: ['Contextual grounding', 'Output constraints', 'Persona development'],
        activities: ['Industrial prompt build', 'Persona-based testing', 'Constraint validation']
      },
      { 
        id: 'ts2-4', 
        title: 'Output Quality', 
        description: 'Validation and control systems', 
        icon: '⚖️', 
        color: 'bg-amber-400',
        topics: ['Validation systems', 'Filtering and guardrails', 'Consistency checks'],
        activities: ['Output filter build', 'Hallucination testing', 'Quality gate setup']
      },
      { 
        id: 'ts2-5', 
        title: 'AI Agent Design', 
        description: 'Architecture for task completion', 
        icon: '🏗️', 
        color: 'bg-indigo-500',
        topics: ['Memory systems', 'Planning modules', 'Tool execution logic'],
        activities: ['Architect an agent', 'Memory bank setup', 'Task planning lab']
      },
      { 
        id: 'ts2-6', 
        title: 'Complex Problems', 
        description: 'Solving industrial edge cases', 
        icon: '⚡', 
        color: 'bg-orange-600',
        topics: ['Iterative refinement', 'Prompt chaining', 'Debugging AI logic'],
        activities: ['Solve edge cases', 'Chain debugging lab', 'Optimization report']
      },
      { 
        id: 'ts2-7', 
        title: 'Final Project', 
        description: 'Autonomous Enterprise AI build', 
        icon: '🏢', 
        color: 'bg-slate-900',
        topics: ['Autonomous enterprise design', 'Production ready agents', 'System verification'],
        activities: ['Build industry solution', 'Final audit', 'Production deployment']
      },
    ]
  }
];

interface TermsFocusProps {
  onBack: () => void;
  onNavigate: (tab: NavigationItem) => void;
  onOpenPlayground: () => void;
}

const TermsFocus: React.FC<TermsFocusProps> = ({ onBack, onNavigate, onOpenPlayground }) => {
  const [activeTier, setActiveTier] = useState<string>('basic');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const tier = TIERS.find(t => t.id === activeTier) || TIERS[0];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onBack}
            className="group p-4 bg-slate-800/80 backdrop-blur-xl rounded-none border border-slate-700/50 text-slate-400 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-6 h-6 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-2">
              Terms <span className="text-lime-400">Focus</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Curriculum Architecture • Version 2026.4</p>
          </div>
        </div>
        
        {/* Tier Selector */}
        <div className="flex flex-wrap gap-2 bg-slate-900/50 p-2 border border-slate-800">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => {
                setActiveTier(tier.id);
                setSelectedTerm(null);
              }}
              className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                activeTier === tier.id 
                  ? 'bg-lime-400 text-slate-900 shadow-[0_0_20px_rgba(190,242,100,0.4)]' 
                  : 'text-slate-500 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tier.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Info Sheet */}
        <div className="lg:col-span-4 space-y-8">
          <div className="animate-in slide-in-from-left duration-700">
            <div className="bg-slate-900 border-2 border-white/5 p-8 relative overflow-hidden group">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-lime-400/10 transition-colors"></div>
              <div className="absolute -bottom-4 -left-4 text-white/5 font-black text-8xl select-none">{tier.title}</div>
              
              <h2 className="text-sm font-black text-lime-400 uppercase tracking-[0.4em] mb-4">Phase Description</h2>
              <h3 className="text-3xl font-black mb-6 tracking-tight">{tier.subtitle}</h3>
              <p className="text-slate-400 font-medium leading-relaxed mb-8 border-l-2 border-lime-400/30 pl-6">
                {tier.info}
              </p>

              <div className="space-y-4 mb-8">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Learning Objectives</h4>
                {tier.objectives.map((obj, i) => (
                  <div key={i} className="flex items-center space-x-3 text-xs font-bold text-slate-300">
                    <div className="w-1.5 h-1.5 bg-lime-400 rotate-45"></div>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Complexity</span>
                  <span className="text-white">High</span>
                </div>
                <div className="w-full h-1 bg-slate-800">
                  <div className="w-[85%] h-full bg-lime-400"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mt-6">
              {activeTier === 'basic' && (
                <button 
                  onClick={onOpenPlayground}
                  className="w-full py-5 bg-lime-400 text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors flex items-center justify-center space-x-3 group shadow-[0_0_30px_rgba(190,242,100,0.2)]"
                >
                  <span className="text-xl">⚡</span>
                  <span>Launch Code Playground</span>
                </button>
              )}
              
              <button 
                onClick={() => onNavigate('Learning Path')}
                className="w-full py-5 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-lime-400 transition-colors flex items-center justify-center space-x-3 group"
              >
                <span>Jump to Full Roadmap</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Terms Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {tier.terms.map((term, index) => (
            <div 
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className="group bg-slate-900/40 border border-slate-800 hover:border-lime-400/50 p-8 transition-all hover:-translate-y-1 animate-in slide-in-from-bottom duration-700 cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-lime-400/5 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-lime-400/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${term.color} flex items-center justify-center text-2xl shadow-lg shadow-black/20`}>
                  {term.icon}
                </div>
                <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Module 0{index + 1}</span>
              </div>
              
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-lime-400 transition-colors">{term.title}</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">{term.description}</p>
              
              <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-widest text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Lesson Plan</span>
                <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
          
          {/* Footer Decoration */}
          <div className="md:col-span-2 mt-4 pt-8 border-t border-slate-800 flex justify-between items-center opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
            <div className="flex space-x-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI verified</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Peer Reviewed</span>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em]">NEXT FUTURELAB © 2026</div>
          </div>
        </div>
      </div>

      {/* Module Detail Modal */}
      {selectedTerm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80 animate-in fade-in duration-300"
          onClick={() => setSelectedTerm(null)}
        >
          <div 
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Design Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-lime-400"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl"></div>
            
            <div className="p-10">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center space-x-6">
                  <div className={`w-20 h-20 ${selectedTerm.color} flex items-center justify-center text-4xl shadow-2xl`}>
                    {selectedTerm.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{selectedTerm.title}</h2>
                    <p className="text-lime-400 font-black uppercase tracking-widest text-[10px] mt-2">Week {tier.terms.indexOf(selectedTerm) + 1} • {tier.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTerm(null)}
                  className="p-3 hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Topics Column */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
                    <div className="w-2 h-2 bg-lime-400"></div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Topic & Content</h4>
                  </div>
                  <ul className="space-y-4">
                    {selectedTerm.topics?.map((topic, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className="text-lime-400/50 font-mono text-[10px] mt-1">{i + 1}.</span>
                        <span className="text-sm font-bold text-slate-300 leading-relaxed">{topic}</span>
                      </li>
                    ))}
                    {(!selectedTerm.topics || selectedTerm.topics.length === 0) && (
                      <li className="text-slate-500 text-xs italic">Syllabus details pending upload...</li>
                    )}
                  </ul>
                </div>

                {/* Activities Column */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
                    <div className="w-2 h-2 bg-indigo-500"></div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Activities & Deliverables</h4>
                  </div>
                  <ul className="space-y-4">
                    {selectedTerm.activities?.map((act, i) => (
                      <li key={i} className="flex items-start space-x-3 group/item">
                        <div className="mt-1 w-4 h-4 border-2 border-slate-700 group-hover/item:border-lime-400 transition-colors flex items-center justify-center cursor-pointer">
                          <div className="w-1.5 h-1.5 bg-lime-400 scale-0 group-hover/item:scale-100 transition-transform"></div>
                        </div>
                        <span className="text-sm font-bold text-slate-400 group-hover/item:text-slate-200 transition-colors">{act}</span>
                      </li>
                    ))}
                    {(!selectedTerm.activities || selectedTerm.activities.length === 0) && (
                      <li className="text-slate-500 text-xs italic">Deliverables pending definition...</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-800 flex justify-between items-center">
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  Instructor Control Panel • Real-time Tracking
                </div>
                <button 
                  onClick={() => {
                    setSelectedTerm(null);
                    onNavigate('Learning Path');
                  }}
                  className="px-8 py-3 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-lime-400 transition-colors shadow-xl shadow-black/20"
                >
                  Go to Learning Path
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsFocus;
