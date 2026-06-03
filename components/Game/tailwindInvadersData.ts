export interface InvaderTarget {
  id: string;
  instruction: string;
  expectedClass: string;
  baseClasses: string;
}

export interface InvaderLevel {
  levelNumber: number;
  title: string;
  speedMultiplier: number;
  spawnRate: number;
  targets: InvaderTarget[];
}

export const TAILWIND_INVADERS_LEVELS: InvaderLevel[] = [
  {
    levelNumber: 1,
    title: 'Color & Text Basics',
    speedMultiplier: 1,
    spawnRate: 4000,
    targets: [
      { id: '1-1', instruction: 'Make text red!', expectedClass: 'text-red-500', baseClasses: 'p-4 bg-white border border-gray-300 rounded shadow-md' },
      { id: '1-2', instruction: 'Make background blue!', expectedClass: 'bg-blue-500', baseClasses: 'p-4 text-white border border-gray-300 rounded shadow-md' },
      { id: '1-3', instruction: 'Make text bold!', expectedClass: 'font-bold', baseClasses: 'p-4 bg-white text-gray-800 border border-gray-300 rounded shadow-md' },
      { id: '1-4', instruction: 'Round the corners fully!', expectedClass: 'rounded-full', baseClasses: 'w-24 h-24 bg-purple-500 text-white flex items-center justify-center text-center shadow-md' },
      { id: '1-5', instruction: 'Make text extra large!', expectedClass: 'text-xl', baseClasses: 'p-4 bg-white text-gray-800 border border-gray-300 rounded shadow-md' },
    ]
  },
  {
    levelNumber: 2,
    title: 'Spacing & Sizing',
    speedMultiplier: 1.2,
    spawnRate: 3500,
    targets: [
      { id: '2-1', instruction: 'Add padding of 4!', expectedClass: 'p-4', baseClasses: 'bg-indigo-500 text-white rounded shadow-md' },
      { id: '2-2', instruction: 'Add margin-top of 8!', expectedClass: 'mt-8', baseClasses: 'p-4 bg-teal-500 text-white rounded shadow-md' },
      { id: '2-3', instruction: 'Make width full!', expectedClass: 'w-full', baseClasses: 'p-4 bg-rose-500 text-white rounded shadow-md text-center max-w-sm' },
      { id: '2-4', instruction: 'Make height 32 (8rem)!', expectedClass: 'h-32', baseClasses: 'w-32 bg-amber-500 text-white rounded shadow-md flex items-center justify-center' },
      { id: '2-5', instruction: 'Add gap of 4!', expectedClass: 'gap-4', baseClasses: 'flex bg-slate-800 p-4 rounded shadow-md [>div]:w-8 [>div]:h-8 [>div]:bg-white [>div]:rounded' },
    ]
  },
  {
    levelNumber: 3,
    title: 'Flexbox Fundamentals',
    speedMultiplier: 1.4,
    spawnRate: 3000,
    targets: [
      { id: '3-1', instruction: 'Make it a flex container!', expectedClass: 'flex', baseClasses: 'bg-gray-100 p-4 rounded shadow border border-gray-300 gap-2 [>div]:w-8 [>div]:h-8 [>div]:bg-blue-500 [>div]:rounded' },
      { id: '3-2', instruction: 'Center items horizontally!', expectedClass: 'justify-center', baseClasses: 'flex bg-gray-100 p-4 rounded shadow border border-gray-300 gap-2 [>div]:w-8 [>div]:h-8 [>div]:bg-blue-500 [>div]:rounded' },
      { id: '3-3', instruction: 'Center items vertically!', expectedClass: 'items-center', baseClasses: 'flex h-32 bg-gray-100 p-4 rounded shadow border border-gray-300 gap-2 [>div]:w-8 [>div]:h-8 [>div]:bg-blue-500 [>div]:rounded' },
      { id: '3-4', instruction: 'Space items between!', expectedClass: 'justify-between', baseClasses: 'flex w-64 bg-gray-100 p-4 rounded shadow border border-gray-300 gap-2 [>div]:w-8 [>div]:h-8 [>div]:bg-blue-500 [>div]:rounded' },
      { id: '3-5', instruction: 'Make it a column flex!', expectedClass: 'flex-col', baseClasses: 'flex bg-gray-100 p-4 rounded shadow border border-gray-300 gap-2 [>div]:w-8 [>div]:h-8 [>div]:bg-blue-500 [>div]:rounded' },
    ]
  },
  // Additional levels up to 15 for increased difficulty and longer play
  {
    levelNumber: 4,
    title: 'Grid Basics',
    speedMultiplier: 1.6,
    spawnRate: 2800,
    targets: [
      { id: '4-1', instruction: 'Make a grid with 2 columns!', expectedClass: 'grid grid-cols-2', baseClasses: 'bg-gray-200 p-4 rounded shadow' },
      { id: '4-2', instruction: 'Add gap of 2!', expectedClass: 'gap-2', baseClasses: 'grid grid-cols-2 bg-gray-200 p-4 rounded shadow' },
      { id: '4-3', instruction: 'Center items!', expectedClass: 'place-items-center', baseClasses: 'grid grid-cols-2 bg-gray-200 p-4 rounded shadow' },
      { id: '4-4', instruction: 'Make it full height!', expectedClass: 'h-full', baseClasses: 'grid grid-cols-2 bg-gray-200 p-4 rounded shadow' },
      { id: '4-5', instruction: 'Add a border!', expectedClass: 'border', baseClasses: 'grid grid-cols-2 bg-gray-200 p-4 rounded shadow' },
    ]
  },
  {
    levelNumber: 5,
    title: 'Responsive Design',
    speedMultiplier: 1.8,
    spawnRate: 2600,
    targets: [
      { id: '5-1', instruction: 'Hide on small screens!', expectedClass: 'hidden sm:block', baseClasses: 'bg-yellow-300 p-4 rounded' },
      { id: '5-2', instruction: 'Show only on medium!', expectedClass: 'md:block hidden', baseClasses: 'bg-yellow-300 p-4 rounded' },
      { id: '5-3', instruction: 'Padding on large!', expectedClass: 'lg:p-8', baseClasses: 'bg-yellow-300 p-4 rounded' },
      { id: '5-4', instruction: 'Margin on xl!', expectedClass: 'xl:m-4', baseClasses: 'bg-yellow-300 p-4 rounded' },
      { id: '5-5', instruction: 'Text size on 2xl!', expectedClass: '2xl:text-2xl', baseClasses: 'bg-yellow-300 p-4 rounded' },
    ]
  },
  {
    levelNumber: 6,
    title: 'Animation Intro',
    speedMultiplier: 2.0,
    spawnRate: 2400,
    targets: [
      { id: '6-1', instruction: 'Add a spin animation!', expectedClass: 'animate-spin', baseClasses: 'w-12 h-12 bg-indigo-500 rounded-full' },
      { id: '6-2', instruction: 'Fade in!', expectedClass: 'animate-fade-in', baseClasses: 'w-12 h-12 bg-indigo-500 rounded-full' },
      { id: '6-3', instruction: 'Pulse!', expectedClass: 'animate-pulse', baseClasses: 'w-12 h-12 bg-indigo-500 rounded-full' },
      { id: '6-4', instruction: 'Bounce!', expectedClass: 'animate-bounce', baseClasses: 'w-12 h-12 bg-indigo-500 rounded-full' },
      { id: '6-5', instruction: 'Ping!', expectedClass: 'animate-ping', baseClasses: 'w-12 h-12 bg-indigo-500 rounded-full' },
    ]
  },
  {
    levelNumber: 7,
    title: 'Shadow Play',
    speedMultiplier: 2.2,
    spawnRate: 2200,
    targets: [
      { id: '7-1', instruction: 'Add small shadow!', expectedClass: 'shadow-sm', baseClasses: 'w-16 h-16 bg-purple-600 rounded' },
      { id: '7-2', instruction: 'Medium shadow!', expectedClass: 'shadow-md', baseClasses: 'w-16 h-16 bg-purple-600 rounded' },
      { id: '7-3', instruction: 'Large shadow!', expectedClass: 'shadow-lg', baseClasses: 'w-16 h-16 bg-purple-600 rounded' },
      { id: '7-4', instruction: 'XL shadow!', expectedClass: 'shadow-xl', baseClasses: 'w-16 h-16 bg-purple-600 rounded' },
      { id: '7-5', instruction: '2XL shadow!', expectedClass: 'shadow-2xl', baseClasses: 'w-16 h-16 bg-purple-600 rounded' },
    ]
  },
  {
    levelNumber: 8,
    title: 'Transform Tools',
    speedMultiplier: 2.4,
    spawnRate: 2000,
    targets: [
      { id: '8-1', instruction: 'Scale up!', expectedClass: 'scale-125', baseClasses: 'w-12 h-12 bg-green-500' },
      { id: '8-2', instruction: 'Rotate 45deg!', expectedClass: 'rotate-45', baseClasses: 'w-12 h-12 bg-green-500' },
      { id: '8-3', instruction: 'Skew X 12deg!', expectedClass: 'skew-x-12', baseClasses: 'w-12 h-12 bg-green-500' },
      { id: '8-4', instruction: 'Translate Y 4!', expectedClass: 'translate-y-4', baseClasses: 'w-12 h-12 bg-green-500' },
      { id: '8-5', instruction: 'Translate X 8!', expectedClass: 'translate-x-8', baseClasses: 'w-12 h-12 bg-green-500' },
    ]
  },
  {
    levelNumber: 9,
    title: 'Advanced Layouts',
    speedMultiplier: 2.6,
    spawnRate: 1800,
    targets: [
      { id: '9-1', instruction: 'Make it absolute!', expectedClass: 'absolute', baseClasses: 'w-10 h-10 bg-red-500 rounded-full' },
      { id: '9-2', instruction: 'Make it relative!', expectedClass: 'relative', baseClasses: 'w-32 h-32 bg-gray-200' },
      { id: '9-3', instruction: 'Top 0!', expectedClass: 'top-0', baseClasses: 'absolute w-10 h-10 bg-red-500' },
      { id: '9-4', instruction: 'Right 0!', expectedClass: 'right-0', baseClasses: 'absolute w-10 h-10 bg-red-500' },
      { id: '9-5', instruction: 'Z-index 10!', expectedClass: 'z-10', baseClasses: 'relative w-10 h-10 bg-blue-500' },
    ]
  },
  {
    levelNumber: 10,
    title: 'Master Class',
    speedMultiplier: 2.8,
    spawnRate: 1500,
    targets: [
      { id: '10-1', instruction: 'Blur it!', expectedClass: 'blur-md', baseClasses: 'w-24 h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500' },
      { id: '10-2', instruction: 'Grayscale!', expectedClass: 'grayscale', baseClasses: 'w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500' },
      { id: '10-3', instruction: 'Invert colors!', expectedClass: 'invert', baseClasses: 'w-24 h-24 bg-white text-black p-2 flex items-center justify-center font-bold' },
      { id: '10-4', instruction: 'Opacity 50%!', expectedClass: 'opacity-50', baseClasses: 'w-24 h-24 bg-black text-white p-2' },
      { id: '10-5', instruction: 'Mix blend multiply!', expectedClass: 'mix-blend-multiply', baseClasses: 'w-24 h-24 bg-red-500 rounded-full' },
    ]
  },
  {
    levelNumber: 11,
    title: 'Typography Pro',
    speedMultiplier: 3.0,
    spawnRate: 1400,
    targets: [
      { id: '11-1', instruction: 'Uppercase!', expectedClass: 'uppercase', baseClasses: 'text-xl font-bold bg-gray-100 p-2' },
      { id: '11-2', instruction: 'Tracking wide!', expectedClass: 'tracking-wide', baseClasses: 'text-lg bg-gray-100 p-2' },
      { id: '11-3', instruction: 'Leading loose!', expectedClass: 'leading-loose', baseClasses: 'text-sm bg-gray-100 p-4 max-w-xs' },
      { id: '11-4', instruction: 'Text center!', expectedClass: 'text-center', baseClasses: 'w-full bg-gray-100 p-2' },
      { id: '11-5', instruction: 'Underline!', expectedClass: 'underline', baseClasses: 'text-blue-500 font-bold bg-gray-100 p-2' },
    ]
  },
  {
    levelNumber: 12,
    title: 'Colors & Gradients',
    speedMultiplier: 3.2,
    spawnRate: 1300,
    targets: [
      { id: '12-1', instruction: 'Gradient to right!', expectedClass: 'bg-gradient-to-r', baseClasses: 'w-32 h-10 from-cyan-500 to-blue-500 text-white' },
      { id: '12-2', instruction: 'From cyan 500!', expectedClass: 'from-cyan-500', baseClasses: 'w-32 h-10 bg-gradient-to-r to-blue-500 text-white' },
      { id: '12-3', instruction: 'Via purple 500!', expectedClass: 'via-purple-500', baseClasses: 'w-48 h-10 bg-gradient-to-r from-red-500 to-yellow-500 text-white' },
      { id: '12-4', instruction: 'Text transparent!', expectedClass: 'text-transparent', baseClasses: 'bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-bold text-xl' },
      { id: '12-5', instruction: 'Background clip text!', expectedClass: 'bg-clip-text', baseClasses: 'text-transparent bg-gradient-to-r from-red-400 to-pink-500 font-bold text-xl' },
    ]
  },
  {
    levelNumber: 13,
    title: 'Borders & Rings',
    speedMultiplier: 3.4,
    spawnRate: 1200,
    targets: [
      { id: '13-1', instruction: 'Border 4!', expectedClass: 'border-4', baseClasses: 'w-16 h-16 bg-white border-blue-500' },
      { id: '13-2', instruction: 'Border dashed!', expectedClass: 'border-dashed', baseClasses: 'w-16 h-16 bg-white border-2 border-gray-500' },
      { id: '13-3', instruction: 'Ring 2!', expectedClass: 'ring-2', baseClasses: 'w-16 h-16 bg-blue-500 ring-blue-300' },
      { id: '13-4', instruction: 'Ring offset 2!', expectedClass: 'ring-offset-2', baseClasses: 'w-16 h-16 bg-red-500 ring-2 ring-red-500' },
      { id: '13-5', instruction: 'Divide Y!', expectedClass: 'divide-y', baseClasses: 'flex flex-col border rounded p-4 [&>div]:py-2' },
    ]
  },
  {
    levelNumber: 14,
    title: 'The Gauntlet',
    speedMultiplier: 3.6,
    spawnRate: 1100,
    targets: [
      { id: '14-1', instruction: 'Hover background!', expectedClass: 'hover:bg-blue-600', baseClasses: 'bg-blue-500 text-white p-2 rounded' },
      { id: '14-2', instruction: 'Focus ring!', expectedClass: 'focus:ring-2', baseClasses: 'p-2 border rounded outline-none' },
      { id: '14-3', instruction: 'Active scale!', expectedClass: 'active:scale-95', baseClasses: 'bg-green-500 text-white p-2 rounded transition-transform' },
      { id: '14-4', instruction: 'Group hover text!', expectedClass: 'group-hover:text-red-500', baseClasses: 'text-gray-500 p-2' },
      { id: '14-5', instruction: 'Peer checked bg!', expectedClass: 'peer-checked:bg-blue-500', baseClasses: 'w-10 h-10 border rounded' },
    ]
  },
  {
    levelNumber: 15,
    title: 'Final Boss',
    speedMultiplier: 3.8,
    spawnRate: 1000,
    targets: [
      { id: '15-1', instruction: 'Backdrop blur!', expectedClass: 'backdrop-blur-md', baseClasses: 'w-32 h-32 bg-white/30 border border-white/20' },
      { id: '15-2', instruction: 'Object cover!', expectedClass: 'object-cover', baseClasses: 'w-24 h-24 bg-gray-300' },
      { id: '15-3', instruction: 'Pointer events none!', expectedClass: 'pointer-events-none', baseClasses: 'w-24 h-24 bg-blue-500/50 absolute' },
      { id: '15-4', instruction: 'Select none!', expectedClass: 'select-none', baseClasses: 'text-xl font-bold bg-gray-200 p-2 text-gray-800' },
      { id: '15-5', instruction: 'Animate pulse!', expectedClass: 'animate-pulse', baseClasses: 'w-16 h-16 bg-rose-500 rounded-full shadow-lg shadow-rose-500/50' },
    ]
  }
];
