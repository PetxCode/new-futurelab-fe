export interface BugTarget {
  wrongClass: string;
  correctClass: string;
  description: string;
}

export interface UiDetectiveLevel {
  id: string;
  title: string;
  description: string;
  targetHtml: string;
  brokenHtml: string;
  bugs: BugTarget[];
}

export const UI_DETECTIVE_LEVELS: UiDetectiveLevel[] = [
  {
    id: '1',
    title: 'The Misaligned Card',
    description: 'This profile card looks a bit off. The spacing is wrong, the background color is a bit too bright, and the corners are sharp!',
    targetHtml: `
<div class="p-6 bg-slate-800 rounded-xl shadow-lg max-w-sm flex flex-col items-center gap-4 w-full">
  <div class="w-20 h-20 bg-indigo-500 rounded-full"></div>
  <h3 class="text-xl font-bold text-white">John Doe</h3>
  <p class="text-slate-400 text-center">Software Engineer from New York.</p>
  <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Follow</button>
</div>
    `.trim(),
    brokenHtml: `
<div class="p-2 bg-slate-400 rounded-none shadow-lg max-w-sm flex flex-col items-center gap-4 w-full">
  <div class="w-20 h-20 bg-indigo-500 rounded-full"></div>
  <h3 class="text-xl font-bold text-white">John Doe</h3>
  <p class="text-slate-400 text-center">Software Engineer from New York.</p>
  <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Follow</button>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'p-2', correctClass: 'p-6', description: 'The card needs more padding.' },
      { wrongClass: 'bg-slate-400', correctClass: 'bg-slate-800', description: 'The background should be darker.' },
      { wrongClass: 'rounded-none', correctClass: 'rounded-xl', description: 'The card needs rounded corners.' }
    ]
  },
  {
    id: '2',
    title: 'Flexing the Wrong Muscles',
    description: 'The navbar items are supposed to be spread out, but they are all bunched up together. And the text should be smaller.',
    targetHtml: `
<nav class="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-700 w-full">
  <div class="text-indigo-400 font-bold text-lg">Logo</div>
  <div class="flex gap-6 text-sm text-slate-300">
    <a href="#" class="hover:text-white">Home</a>
    <a href="#" class="hover:text-white">About</a>
    <a href="#" class="hover:text-white">Contact</a>
  </div>
</nav>
    `.trim(),
    brokenHtml: `
<nav class="flex items-center justify-start p-4 bg-slate-900 border-b border-slate-700 w-full">
  <div class="text-indigo-400 font-bold text-lg">Logo</div>
  <div class="flex gap-1 text-xl text-slate-300">
    <a href="#" class="hover:text-white">Home</a>
    <a href="#" class="hover:text-white">About</a>
    <a href="#" class="hover:text-white">Contact</a>
  </div>
</nav>
    `.trim(),
    bugs: [
      { wrongClass: 'justify-start', correctClass: 'justify-between', description: 'The navbar items should be spread out.' },
      { wrongClass: 'gap-1', correctClass: 'gap-6', description: 'The links need more space between them.' },
      { wrongClass: 'text-xl', correctClass: 'text-sm', description: 'The link text is too large.' }
    ]
  },
  {
    id: '3',
    title: 'The Invisible Button',
    description: 'This call-to-action button is supposed to grab attention! It needs to be block-level, have bold text, and a vibrant background.',
    targetHtml: `
<div class="p-8 text-center bg-slate-800 rounded-lg w-full">
  <h2 class="text-2xl text-white mb-4">Ready to start?</h2>
  <a href="#" class="block w-full py-3 bg-rose-500 font-bold text-white rounded-lg hover:bg-rose-600 transition-colors">
    Click Here Now
  </a>
</div>
    `.trim(),
    brokenHtml: `
<div class="p-8 text-center bg-slate-800 rounded-lg w-full">
  <h2 class="text-2xl text-white mb-4">Ready to start?</h2>
  <a href="#" class="inline w-full py-3 bg-transparent font-normal text-white rounded-lg hover:bg-rose-600 transition-colors">
    Click Here Now
  </a>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'inline', correctClass: 'block', description: 'The button needs to be a block element to take full width.' },
      { wrongClass: 'bg-transparent', correctClass: 'bg-rose-500', description: 'The button needs a vibrant background color.' },
      { wrongClass: 'font-normal', correctClass: 'font-bold', description: 'The text should be bold.' }
    ]
  },
  {
    id: '4',
    title: 'The Squashed Alert',
    description: 'This alert box is missing its layout. It needs to be a flex container with items centered, and a nice border.',
    targetHtml: `
<div class="flex items-center gap-3 p-4 bg-amber-500/10 border-2 border-amber-500 text-amber-500 rounded-lg w-full">
  <span class="text-xl">⚠️</span>
  <p class="font-medium">Warning: Low disk space.</p>
</div>
    `.trim(),
    brokenHtml: `
<div class="block gap-3 p-4 bg-amber-500/10 border-0 border-amber-500 text-amber-500 rounded-none w-full">
  <span class="text-xl">⚠️</span>
  <p class="font-medium">Warning: Low disk space.</p>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'block', correctClass: 'flex items-center', description: 'The alert needs to be a flex container.' },
      { wrongClass: 'border-0', correctClass: 'border-2', description: 'It needs a visible border.' },
      { wrongClass: 'rounded-none', correctClass: 'rounded-lg', description: 'The alert should have rounded corners.' }
    ]
  },
  {
    id: '5',
    title: 'The Uncentered Hero',
    description: 'This hero section content should be perfectly centered, but the text is huge and left-aligned.',
    targetHtml: `
<div class="flex flex-col items-center justify-center h-48 bg-slate-800 text-center w-full rounded-xl">
  <h1 class="text-4xl font-black text-white mb-2">Welcome</h1>
  <p class="text-slate-400">Your journey starts here.</p>
</div>
    `.trim(),
    brokenHtml: `
<div class="flex flex-col items-start justify-start h-48 bg-slate-800 text-left w-full rounded-xl">
  <h1 class="text-xs font-light text-white mb-2">Welcome</h1>
  <p class="text-slate-400">Your journey starts here.</p>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'items-start justify-start', correctClass: 'items-center justify-center', description: 'The content must be perfectly centered.' },
      { wrongClass: 'text-left', correctClass: 'text-center', description: 'The text alignment should be centered.' },
      { wrongClass: 'text-xs font-light', correctClass: 'text-4xl font-black', description: 'The title should be huge and bold.' }
    ]
  },
  {
    id: '6',
    title: 'The Broken Grid',
    description: 'These feature cards are stacked! Put them in a 3-column grid and add some space between them.',
    targetHtml: `
<div class="grid grid-cols-3 gap-6 w-full">
  <div class="bg-slate-800 p-4 rounded-lg h-24">Feature 1</div>
  <div class="bg-slate-800 p-4 rounded-lg h-24">Feature 2</div>
  <div class="bg-slate-800 p-4 rounded-lg h-24">Feature 3</div>
</div>
    `.trim(),
    brokenHtml: `
<div class="grid grid-cols-1 gap-0 w-full">
  <div class="bg-slate-800 p-4 rounded-lg h-24">Feature 1</div>
  <div class="bg-slate-800 p-4 rounded-lg h-24">Feature 2</div>
  <div class="bg-slate-800 p-4 rounded-lg h-24">Feature 3</div>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'grid-cols-1', correctClass: 'grid-cols-3', description: 'Use a 3-column grid.' },
      { wrongClass: 'gap-0', correctClass: 'gap-6', description: 'Add more gap between the columns.' }
    ]
  },
  {
    id: '7',
    title: 'The Ghost Avatar',
    description: 'This avatar should be a perfect circle, but right now it looks like a rectangle. And give it a nice border!',
    targetHtml: `
<div class="w-16 h-16 rounded-full bg-cyan-500 border-4 border-white shadow-lg"></div>
    `.trim(),
    brokenHtml: `
<div class="w-16 h-16 rounded-none bg-cyan-500 border-0 border-white shadow-none"></div>
    `.trim(),
    bugs: [
      { wrongClass: 'rounded-none', correctClass: 'rounded-full', description: 'The avatar must be a perfect circle.' },
      { wrongClass: 'border-0', correctClass: 'border-4', description: 'Add a thick border.' },
      { wrongClass: 'shadow-none', correctClass: 'shadow-lg', description: 'Add a nice drop shadow.' }
    ]
  },
  {
    id: '8',
    title: 'The Ugly Badge',
    description: 'This "New" badge needs to be styled elegantly. Small text, pill-shaped, and positioned perfectly inline.',
    targetHtml: `
<div class="flex items-center gap-2 bg-slate-800 p-4 rounded-lg w-full">
  <span class="text-white font-bold">Inbox</span>
  <span class="px-2.5 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-full">New</span>
</div>
    `.trim(),
    brokenHtml: `
<div class="flex items-center gap-2 bg-slate-800 p-4 rounded-lg w-full">
  <span class="text-white font-bold">Inbox</span>
  <span class="p-0 bg-transparent text-black text-xl font-normal rounded-none">New</span>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'p-0', correctClass: 'px-2.5 py-0.5', description: 'The badge needs horizontal and vertical padding.' },
      { wrongClass: 'bg-transparent text-black text-xl font-normal', correctClass: 'bg-rose-500 text-white text-xs font-bold', description: 'Fix the background color, text size, and font weight.' },
      { wrongClass: 'rounded-none', correctClass: 'rounded-full', description: 'The badge should be pill-shaped.' }
    ]
  },
  {
    id: '9',
    title: 'The Overflowing Image',
    description: 'This image wrapper is letting the image bleed out of its corners. It also needs a proper aspect ratio and shadow.',
    targetHtml: `
<div class="w-full aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
  <img src="https://picsum.photos/400/200" class="w-full h-full object-cover" />
</div>
    `.trim(),
    brokenHtml: `
<div class="w-full h-auto bg-slate-800 rounded-none overflow-visible shadow-none">
  <img src="https://picsum.photos/400/200" class="w-full h-full object-cover" />
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'h-auto', correctClass: 'aspect-video', description: 'Use the video aspect ratio.' },
      { wrongClass: 'rounded-none', correctClass: 'rounded-2xl', description: 'Round the corners of the wrapper.' },
      { wrongClass: 'overflow-visible shadow-none', correctClass: 'overflow-hidden shadow-2xl', description: 'Clip the overflowing image and add a shadow.' }
    ]
  },
  {
    id: '10',
    title: 'The Dark Mode Disaster',
    description: 'This text block is unreadable. The text needs to be light gray, with a dark background, and slightly spaced out letters.',
    targetHtml: `
<div class="bg-slate-900 text-slate-300 tracking-wide p-6 rounded-lg leading-relaxed w-full">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</div>
    `.trim(),
    brokenHtml: `
<div class="bg-white text-black tracking-tighter p-6 rounded-lg leading-none w-full">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'bg-white', correctClass: 'bg-slate-900', description: 'The background should be dark.' },
      { wrongClass: 'text-black tracking-tighter', correctClass: 'text-slate-300 tracking-wide', description: 'The text should be light gray and spaced out.' },
      { wrongClass: 'leading-none', correctClass: 'leading-relaxed', description: 'The line height needs to be relaxed for readability.' }
    ]
  },
  {
    id: '11',
    title: 'The Floating Fab',
    description: 'This Floating Action Button (FAB) is supposed to be absolutely positioned at the bottom right of the card, sticking out.',
    targetHtml: `
<div class="relative p-6 bg-slate-800 w-64 h-64 rounded-xl">
  <h3 class="text-white">Content here</h3>
  <button class="absolute bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full text-white shadow-lg">+</button>
</div>
    `.trim(),
    brokenHtml: `
<div class="static p-6 bg-slate-800 w-64 h-64 rounded-xl">
  <h3 class="text-white">Content here</h3>
  <button class="relative top-0 left-0 w-12 h-12 bg-blue-500 rounded-full text-white shadow-lg">+</button>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'static', correctClass: 'relative', description: 'The container needs to be relative to trap the absolute button.' },
      { wrongClass: 'relative top-0 left-0', correctClass: 'absolute bottom-4 right-4', description: 'Position the button absolutely at the bottom right.' }
    ]
  },
  {
    id: '12',
    title: 'The Invisible Divider',
    description: 'There should be a subtle divider between these items. And they need to be displayed in a column.',
    targetHtml: `
<div class="flex flex-col divide-y divide-slate-700 w-full bg-slate-800 rounded-lg">
  <div class="p-4 text-white">Item One</div>
  <div class="p-4 text-white">Item Two</div>
  <div class="p-4 text-white">Item Three</div>
</div>
    `.trim(),
    brokenHtml: `
<div class="flex flex-row divide-none divide-transparent w-full bg-slate-800 rounded-lg">
  <div class="p-4 text-white">Item One</div>
  <div class="p-4 text-white">Item Two</div>
  <div class="p-4 text-white">Item Three</div>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'flex-row', correctClass: 'flex-col', description: 'The items must be stacked vertically.' },
      { wrongClass: 'divide-none divide-transparent', correctClass: 'divide-y divide-slate-700', description: 'Add a vertical divider between items.' }
    ]
  },
  {
    id: '13',
    title: 'The Sticky Header',
    description: 'This header should stick to the top of its scrolling container. Also add some blur to the background!',
    targetHtml: `
<div class="h-48 overflow-y-auto bg-slate-900 relative w-full border border-slate-700 rounded-lg">
  <header class="sticky top-0 bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700 text-white z-10">Header</header>
  <div class="p-4 text-slate-400 h-[300px]">Scrollable content below...</div>
</div>
    `.trim(),
    brokenHtml: `
<div class="h-48 overflow-y-auto bg-slate-900 relative w-full border border-slate-700 rounded-lg">
  <header class="static top-10 bg-slate-900 backdrop-blur-none p-4 border-b border-slate-700 text-white z-0">Header</header>
  <div class="p-4 text-slate-400 h-[300px]">Scrollable content below...</div>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'static top-10', correctClass: 'sticky top-0', description: 'The header needs to be sticky at the very top.' },
      { wrongClass: 'bg-slate-900 backdrop-blur-none', correctClass: 'bg-slate-900/80 backdrop-blur-sm', description: 'The background should be semi-transparent and blurred.' },
      { wrongClass: 'z-0', correctClass: 'z-10', description: 'The z-index must be higher so it stays on top.' }
    ]
  },
  {
    id: '14',
    title: 'The Hover Effect',
    description: 'This card should lift up and glow when you hover over it. Right now it does nothing.',
    targetHtml: `
<div class="w-full p-6 bg-slate-800 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]">
  <h3 class="text-white font-bold">Hover Me!</h3>
</div>
    `.trim(),
    brokenHtml: `
<div class="w-full p-6 bg-slate-800 rounded-xl transition-none duration-0 hover:translate-y-0 hover:shadow-none">
  <h3 class="text-white font-bold">Hover Me!</h3>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'transition-none duration-0', correctClass: 'transition-all duration-300', description: 'Add a smooth transition over 300ms.' },
      { wrongClass: 'hover:translate-y-0 hover:shadow-none', correctClass: 'hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]', description: 'On hover, move it up slightly and add a glowing shadow.' }
    ]
  },
  {
    id: '15',
    title: 'The Final Boss Layout',
    description: 'This complex dashboard header needs a grid layout to separate the search bar, profile, and stats.',
    targetHtml: `
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-800 p-6 rounded-2xl w-full">
  <div class="md:col-span-1 text-xl font-bold text-white">Dashboard</div>
  <div class="md:col-span-1"><input type="text" placeholder="Search..." class="w-full bg-slate-700 rounded-lg p-2 text-white"></div>
  <div class="md:col-span-1 flex justify-end gap-4"><div class="w-10 h-10 bg-indigo-500 rounded-full"></div></div>
</div>
    `.trim(),
    brokenHtml: `
<div class="flex flex-col md:flex-row gap-0 items-start bg-slate-800 p-6 rounded-2xl w-full">
  <div class="md:col-span-3 text-sm font-normal text-black">Dashboard</div>
  <div class="md:col-span-2"><input type="text" placeholder="Search..." class="w-full bg-slate-700 rounded-lg p-2 text-white"></div>
  <div class="md:col-span-1 flex justify-start gap-0"><div class="w-10 h-10 bg-indigo-500 rounded-full"></div></div>
</div>
    `.trim(),
    bugs: [
      { wrongClass: 'flex flex-col md:flex-row gap-0 items-start', correctClass: 'grid grid-cols-1 md:grid-cols-3 gap-4 items-center', description: 'Use a responsive 3-column grid layout.' },
      { wrongClass: 'md:col-span-3 text-sm font-normal text-black', correctClass: 'md:col-span-1 text-xl font-bold text-white', description: 'Fix the title size, color, and span.' },
      { wrongClass: 'justify-start gap-0', correctClass: 'justify-end gap-4', description: 'The profile section should be pushed to the right with a gap.' },
      { wrongClass: 'md:col-span-2', correctClass: 'md:col-span-1', description: 'The search input wrapper should only take 1 column.' }
    ]
  }
];
