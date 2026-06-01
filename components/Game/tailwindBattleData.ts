export interface BattleLevel {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  instructions: string;
  initialCode: string;
  targetHtml: string;
  targetSelector: string; // Selector for the element to check properties of
  hints: string[];
}

export const AVATAR_IMAGE_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
export const PRODUCT_IMAGE_URL = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&q=80';
export const BANNER_IMAGE_URL = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';

export const battleLevels: BattleLevel[] = [
  {
    id: 1,
    title: 'Circular Avatar',
    difficulty: 'Easy',
    description: 'Place a perfect circular profile avatar at the top-left corner of the sandbox.',
    instructions: 'Recreate an avatar container (size 64px by 64px) at the top-left (absolute positioned: top 16px, left 16px) with a rounded circular shape and a border.',
    initialCode: `<div class="bg-slate-900 w-full h-full relative">
  <!-- Place your avatar element here -->
  
</div>`,
    targetHtml: `<div class="bg-slate-900 w-full h-full relative">
  <img id="target-element" src="${AVATAR_IMAGE_URL}" class="absolute top-4 left-4 w-16 h-16 rounded-full border-2 border-indigo-400 object-cover shadow-lg shadow-indigo-500/20" />
</div>`,
    targetSelector: '#target-element',
    hints: ['absolute', 'top-4', 'left-4', 'w-16', 'h-16', 'rounded-full', 'border-2', 'border-indigo-400']
  },
  {
    id: 2,
    title: 'Notification Badge',
    difficulty: 'Easy',
    description: 'Position a glowing notification badge at the top-right of a dashboard card element.',
    instructions: 'Recreate a card (w-48 h-24) centered in the box, and position a small red notification circle (w-5 h-5) overlapping the top-right corner of the card.',
    initialCode: `<div class="bg-slate-900 w-full h-full flex items-center justify-center">
  <div class="relative w-48 h-24 bg-slate-800 rounded-xl border border-slate-700">
    <!-- Place your badge here -->

  </div>
</div>`,
    targetHtml: `<div class="bg-slate-900 w-full h-full flex items-center justify-center">
  <div class="relative w-48 h-24 bg-slate-800 rounded-xl border border-slate-700">
    <div id="target-element" class="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50">
      3
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['absolute', '-top-2', '-right-2', 'w-5', 'h-5', 'bg-rose-500', 'rounded-full']
  },
  {
    id: 3,
    title: 'Centered Status Pill',
    difficulty: 'Easy',
    description: 'Align a stylish success status pill exactly in the center of the sandbox screen.',
    instructions: 'Position a flex container to center its children. Recreate the status pill containing a green dot indicator and the text "System Online".',
    initialCode: `<div class="w-full h-full">
  <!-- Center the status pill here -->
  
</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold shadow-inner">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span>System Online</span>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['flex', 'items-center', 'justify-center', 'rounded-full', 'bg-emerald-500/10', 'text-emerald-400']
  },
  {
    id: 4,
    title: 'Profile Header Card',
    difficulty: 'Medium',
    description: 'Recreate a standard profile header layout with a cover background and overlapping avatar.',
    instructions: 'Build a container (w-64, rounded-xl, overflow-hidden) centered in the page. The cover area takes up 64px height, and the avatar overlaps the border from cover to profile.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Build your card profile header here -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="w-64 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl flex flex-col items-center pb-4">
    <div class="w-full h-16 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
    <img src="${AVATAR_IMAGE_URL}" class="-mt-8 w-16 h-16 rounded-full border-4 border-slate-800 bg-slate-750 object-cover shadow-md" />
    <div class="mt-2 text-sm font-bold text-white">Developer Fox</div>
    <div class="text-xs text-slate-400">@tailwind_ninja</div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['w-64', 'bg-slate-800', 'rounded-xl', '-mt-8', 'w-16', 'h-16', 'border-4']
  },
  {
    id: 5,
    title: 'Product Image Tag',
    difficulty: 'Hard',
    description: 'Design a popular product preview card layout with a glowing premium sale tag absolute-positioned over it.',
    instructions: 'Recreate a product card structure (w-56 h-72) in the center, and position a stylish premium tag reading "50% OFF" at top-6 left-6.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Build the product card with the 50% OFF badge here -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div class="relative w-56 h-72 bg-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col p-3 overflow-hidden">
    <img src="${PRODUCT_IMAGE_URL}" class="w-full h-40 object-cover rounded-xl" />
    <div id="target-element" class="absolute top-6 left-6 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-[10px] font-black text-white rounded-md tracking-wider uppercase shadow-md shadow-orange-500/20">
      50% OFF
    </div>
    <div class="mt-3 text-sm font-bold text-white">FutureBox Console</div>
    <div class="text-xs text-slate-400 mt-1">Next-gen learning gear</div>
    <div class="mt-auto flex justify-between items-center">
      <span class="text-sm font-black text-emerald-400">$199</span>
      <span class="text-[10px] text-slate-500 line-through">$399</span>
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['absolute', 'top-6', 'left-6', 'bg-gradient-to-r', 'from-amber-500', 'to-orange-600', 'text-[10px]', 'font-black']
  },
  {
    id: 6,
    title: 'Inline Search Bar',
    difficulty: 'Easy',
    description: 'Build a dark-themed horizontal inline search box.',
    instructions: 'Recreate a flex-row inline bar (w-80 h-10) with a slate-800 rounded-lg background containing a search input and a contrast button next to it.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Inline search elements here -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="flex w-80 h-10 bg-slate-800 rounded-lg overflow-hidden border border-slate-700/85">
    <input type="text" placeholder="Search lessons..." class="flex-1 bg-transparent px-3 text-xs text-slate-300 outline-none" />
    <button class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4">Find</button>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['flex', 'w-80', 'h-10', 'bg-slate-800', 'rounded-lg', 'flex-1', 'bg-transparent', 'px-4']
  },
  {
    id: 7,
    title: 'Gradient Border Card',
    difficulty: 'Medium',
    description: 'Use the background-padding clip trick to construct a glowing gradient border.',
    instructions: 'Build a container (w-64 h-32) that appears to have a glowing gradient border by utilizing a gradient background combined with a slightly smaller interior dark cover.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Glowing border container -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="w-64 h-32 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-xl p-[1.5px] shadow-lg shadow-purple-500/10">
    <div class="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
      <span class="text-xs font-bold text-white tracking-widest uppercase">Glowing Card</span>
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['bg-gradient-to-tr', 'from-pink-500', 'p-[1.5px]', 'bg-slate-900', 'rounded-xl']
  },
  {
    id: 8,
    title: 'Online Avatar Indicator',
    difficulty: 'Easy',
    description: 'Attach a small green bottom-right status indicator to an avatar profile.',
    instructions: 'Place a circular avatar (w-12 h-12) relative inside a container, and attach a green online dot (w-3.5 h-3.5) positioned at absolute bottom-0 right-0.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Status Avatar wrapper -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="relative w-12 h-12">
    <img src="${AVATAR_IMAGE_URL}" class="w-full h-full rounded-full object-cover border border-slate-700" />
    <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['relative', 'w-12', 'h-12', 'absolute', 'bottom-0', 'right-0', 'bg-emerald-500', 'border-2']
  },
  {
    id: 9,
    title: 'Equal Flex Column Layout',
    difficulty: 'Medium',
    description: 'Arrange two dashboard statistic elements side-by-side with equal width.',
    instructions: 'Build a horizontal flex wrapper (w-80 gap-3) containing two equal cards (bg-slate-800, flex-1) with inner paddings.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Flex columns container -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="flex w-80 gap-3">
    <div class="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-xl">
      <div class="text-[10px] text-slate-400 font-bold uppercase">Lessons</div>
      <div class="text-lg font-black text-white mt-1">12</div>
    </div>
    <div class="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-xl">
      <div class="text-[10px] text-slate-400 font-bold uppercase">Points</div>
      <div class="text-lg font-black text-white mt-1">840</div>
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['flex', 'w-80', 'gap-3', 'flex-1', 'bg-slate-800', 'p-3', 'rounded-xl']
  },
  {
    id: 10,
    title: 'Glassmorphism Alert',
    difficulty: 'Medium',
    description: 'Design a glassmorphic floating alert banner with a blurred background.',
    instructions: 'Build a banner (w-80 p-3) using backdrop-blur background opacity, light borders, and text.',
    initialCode: `<div class="w-full h-full relative flex items-center justify-center bg-slate-900">
  <div class="absolute inset-0 bg-gradient-to-tr from-slate-900 to-indigo-900/50"></div>
  <!-- Floating Glass Alert goes here -->

</div>`,
    targetHtml: `<div class="w-full h-full relative flex items-center justify-center bg-slate-900">
  <div class="absolute inset-0 bg-gradient-to-tr from-slate-900 to-indigo-900/50"></div>
  <div id="target-element" class="relative w-80 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-3">
    <span class="text-lg">📢</span>
    <div>
      <div class="text-xs font-bold text-white">Event Starting!</div>
      <div class="text-[10px] text-slate-300">Join the live code challenge.</div>
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['relative', 'w-80', 'bg-white/5', 'backdrop-blur-md', 'border', 'border-white/10', 'rounded-xl']
  },
  {
    id: 11,
    title: 'Glow Interactive Button',
    difficulty: 'Easy',
    description: 'Recreate a high-fidelity interactive button with hover states and glow shadows.',
    instructions: 'Recreate an indigo button (px-6 py-2.5, rounded-lg) with a nice indigo glow effect using the shadow color utilities.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Glowing interactive button -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <button id="target-element" class="px-6 py-2.5 bg-indigo-600 text-white text-xs font-black rounded-lg shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all">
    Start Coding
  </button>
</div>`,
    targetSelector: '#target-element',
    hints: ['px-6', 'py-2.5', 'bg-indigo-600', 'text-white', 'font-black', 'rounded-lg', 'shadow-indigo-500/30', 'transition-all']
  },
  {
    id: 12,
    title: 'Vertical Nav List',
    difficulty: 'Medium',
    description: 'Design a sleek primary sidebar navigation component.',
    instructions: 'Recreate a vertical nav menu containing two items (w-48, flex flex-col gap-1.5), highlighting the active link with indigo backgrounds.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Nav items list container -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="flex flex-col gap-1.5 w-48">
    <div class="flex items-center gap-3 px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-pointer">
      <span>🏡</span>
      <span>Dashboard</span>
    </div>
    <div class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-xs font-bold transition cursor-pointer">
      <span>📚</span>
      <span>Lessons</span>
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['flex', 'flex-col', 'gap-1.5', 'w-48', 'px-3', 'py-2', 'bg-indigo-600', 'rounded-lg']
  },
  {
    id: 13,
    title: 'Flex Tag Cloud',
    difficulty: 'Easy',
    description: 'Render a group of content labels wrapped in a container.',
    instructions: 'Build a container (w-60 flex flex-wrap gap-1.5) that allows tag pills to flow naturally across lines.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Tag Cloud list -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="flex flex-wrap gap-1.5 w-60">
    <span class="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">HTML</span>
    <span class="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">Tailwind</span>
    <span class="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">React</span>
    <span class="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">CSS</span>
    <span class="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">Flexbox</span>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['flex', 'flex-wrap', 'gap-1.5', 'w-60', 'px-2.5', 'py-1', 'bg-slate-800', 'rounded']
  },
  {
    id: 14,
    title: 'Modern Grid Hero Card',
    difficulty: 'Hard',
    description: 'Construct a multi-column dashboard widget grid section.',
    instructions: 'Construct a grid container (w-80 grid-cols-3 gap-2) holding three blocks where the first block spans 2 columns.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Grid columns wrapper -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="grid grid-cols-3 gap-2 w-80">
    <div class="col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-3 h-20">
      <div class="text-[9px] font-bold text-indigo-400">HERO UNIT</div>
      <div class="text-sm font-black text-white mt-1">Main Focus</div>
    </div>
    <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 h-20 flex flex-col justify-between">
      <div class="text-[9px] font-bold text-slate-400">STAT</div>
      <div class="text-lg font-black text-emerald-400">92%</div>
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['grid', 'grid-cols-3', 'gap-2', 'col-span-2', 'bg-slate-800', 'p-3']
  },
  {
    id: 15,
    title: 'Split Banner Layout',
    difficulty: 'Medium',
    description: 'Create a split visual dashboard promo banner.',
    instructions: 'Build a container (w-80 h-24, bg-slate-800) split horizontally. The left side handles text description; the right side is a covered visual image filling the column.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Split layout container -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="flex w-80 h-24 bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
    <div class="flex-1 p-3 flex flex-col justify-center">
      <div class="text-xs font-black text-white">Future Pro</div>
      <div class="text-[9px] text-slate-400 mt-1">Upgrade your space badge level.</div>
    </div>
    <img src="${BANNER_IMAGE_URL}" class="w-24 h-full object-cover" />
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['flex', 'w-80', 'h-24', 'flex-1', 'p-3', 'w-24', 'object-cover']
  },
  {
    id: 16,
    title: 'Shopping Pricing Card',
    difficulty: 'Medium',
    description: 'Design a simple subscription billing selector pill.',
    instructions: 'Recreate a card element (w-64 p-4) containing subscription tier names, features, and active check state styled in violet.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- pricing card structure -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="w-64 bg-slate-800 border-2 border-indigo-500 rounded-2xl p-4 shadow-xl shadow-indigo-500/10">
    <div class="flex justify-between items-center">
      <span class="text-xs font-bold text-indigo-400">PRO MODE</span>
      <span class="text-lg font-black text-white">$15<span class="text-[10px] text-slate-400 font-normal">/mo</span></span>
    </div>
    <div class="text-[10px] text-slate-400 mt-1">Includes unlimited workspace levels.</div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['w-64', 'bg-slate-800', 'border-2', 'border-indigo-500', 'p-4', 'flex', 'justify-between']
  },
  {
    id: 17,
    title: 'Circular Badge Center',
    difficulty: 'Hard',
    description: 'Arrange elements centered inside a concentric circular layout.',
    instructions: 'Build a double-ring layout where a inner circle (w-12 h-12) sits inside a larger ring (w-20 h-20) centered on the page.',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Concentric circular layers -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="w-20 h-20 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center animate-pulse">
    <div class="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-500/40">
      🚀
    </div>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['w-20', 'h-20', 'rounded-full', 'bg-indigo-500/10', 'flex', 'items-center', 'justify-center', 'w-12', 'h-12']
  },
  {
    id: 18,
    title: 'Bottom Floating Bar',
    difficulty: 'Hard',
    description: 'Recreate a mobile floating bottom action sheet bar.',
    instructions: 'Recreate a floating nav item (w-72 h-12) fixed at absolute bottom-4 centered within the outer container.',
    initialCode: `<div class="relative w-full h-full bg-slate-900">
  <!-- Position layout bar at the bottom -->

</div>`,
    targetHtml: `<div class="relative w-full h-full bg-slate-900">
  <div id="target-element" class="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 h-12 bg-slate-800/90 backdrop-blur border border-slate-700 rounded-full flex items-center justify-around px-4 shadow-xl">
    <span class="text-sm cursor-pointer hover:text-white text-indigo-400">🏠</span>
    <span class="text-sm cursor-pointer hover:text-white text-slate-400">📚</span>
    <span class="text-sm cursor-pointer hover:text-white text-slate-400">⚙️</span>
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['absolute', 'bottom-4', 'left-1/2', '-translate-x-1/2', 'w-72', 'h-12', 'bg-slate-800/90', 'rounded-full']
  },
  {
    id: 19,
    title: 'Nested Grid Mosaic',
    difficulty: 'Hard',
    description: 'Design a responsive three-image grid mosaic widget.',
    instructions: 'Build a container grid (w-80 h-32 grid-cols-3 grid-rows-2 gap-1.5) where the first image spans full column height (row-span-2).',
    initialCode: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <!-- Mosaic grids layout -->

</div>`,
    targetHtml: `<div class="w-full h-full flex items-center justify-center bg-slate-900">
  <div id="target-element" class="grid grid-cols-3 grid-rows-2 gap-1.5 w-80 h-32">
    <img src="${AVATAR_IMAGE_URL}" class="row-span-2 col-span-1 w-full h-full object-cover rounded-lg border border-slate-700" />
    <img src="${BANNER_IMAGE_URL}" class="col-span-2 row-span-1 w-full h-full object-cover rounded-lg border border-slate-700" />
    <img src="${PRODUCT_IMAGE_URL}" class="col-span-2 row-span-1 w-full h-full object-cover rounded-lg border border-slate-700" />
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['grid', 'grid-cols-3', 'grid-rows-2', 'gap-1.5', 'row-span-2', 'col-span-2']
  },
  {
    id: 20,
    title: 'Dashboard Full Header',
    difficulty: 'Hard',
    description: 'Recreate a high-fidelity header nav bar.',
    instructions: 'Recreate a header (w-full px-4 h-14) with flex layout aligning title logo to the left, links to center, and avatar to the right.',
    initialCode: `<div class="w-full h-full bg-slate-900 pt-4">
  <!-- Nav header container -->

</div>`,
    targetHtml: `<div class="w-full h-full bg-slate-900 pt-4">
  <div id="target-element" class="flex justify-between items-center h-14 px-4 bg-slate-800 border-y border-slate-700 w-full">
    <span class="text-xs font-black text-indigo-400">FutureLab</span>
    <div class="flex gap-3 text-[10px] text-slate-300 font-bold">
      <span class="hover:text-white cursor-pointer">Learn</span>
      <span class="hover:text-white cursor-pointer">Stats</span>
    </div>
    <img src="${AVATAR_IMAGE_URL}" class="w-8 h-8 rounded-full object-cover border border-indigo-500" />
  </div>
</div>`,
    targetSelector: '#target-element',
    hints: ['flex', 'justify-between', 'items-center', 'h-14', 'px-4', 'bg-slate-800', 'w-full']
  }
];
