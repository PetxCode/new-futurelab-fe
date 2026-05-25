import type { LayoutLevel } from './layoutMasterData';

export interface ChallengeLevel extends LayoutLevel {
  stage: 1 | 2 | 3 | 4;
  hint: string;
}

export interface Stage {
  id: 1 | 2 | 3 | 4;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export const STAGES: Stage[] = [
  { id: 1, label: 'Flex Basics',    description: 'Master justify-content, align-items and flex-direction',         icon: '🌱', color: 'from-emerald-500 to-teal-500'    },
  { id: 2, label: 'Flex Advanced',  description: 'Tackle flex-wrap, gap, order, align-self and flex-grow',          icon: '🌿', color: 'from-cyan-500 to-blue-600'       },
  { id: 3, label: 'Grid Basics',    description: 'Create grids with template-columns, rows and column/row spans',   icon: '🍀', color: 'from-indigo-500 to-purple-600'  },
  { id: 4, label: 'Grid Advanced',  description: 'Place-items, minmax(), gaps, auto-rows and master challenges',    icon: '🏆', color: 'from-rose-500 to-orange-500'    },
];

const G: Frog = { color: 'green',  id: 'g1' };
const R: Frog = { color: 'red',    id: 'r1' };
const Y: Frog = { color: 'yellow', id: 'y1' };
type Frog = { color: 'green' | 'red' | 'yellow'; id: string };

const TWO   = [{ ...G, id: 'g1' }, { ...G, id: 'g2' }];
const THREE  = [{ ...G, id: 'g1' }, { ...G, id: 'g2' }, { ...G, id: 'g3' }];
const MIX3   = [{ ...G, id: 'g1' }, { ...Y, id: 'y1' }, { ...R, id: 'r1' }];
const FIVE   = [{ ...G, id: 'g1' }, { ...Y, id: 'y1' }, { ...R, id: 'r1' }, { ...Y, id: 'y2' }, { ...G, id: 'g2' }];

export const challengeLevels: ChallengeLevel[] = [
  // ─── STAGE 1: FLEX BASICS ─────────────────────────────────────────────────
  {
    id: 1, stage: 1, mode: 'flex', name: 'Challenge 1',
    instructions: 'Push the frog to the right end of the pond.',
    hint: 'Try: justify-content: flex-end  OR  justify-end',
    frogs: [G],
    targetContainerCSS: { justifyContent: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*flex-end'], expectedTailwind: ['justify-end']
  },
  {
    id: 2, stage: 1, mode: 'flex', name: 'Challenge 2',
    instructions: 'Bring the two frogs to the center.',
    hint: 'Try: justify-content: center  OR  justify-center',
    frogs: TWO,
    targetContainerCSS: { justifyContent: 'center' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*center'], expectedTailwind: ['justify-center']
  },
  {
    id: 3, stage: 1, mode: 'flex', name: 'Challenge 3',
    instructions: 'Space frogs evenly with equal space around each.',
    hint: 'Try: justify-content: space-around  OR  justify-around',
    frogs: THREE,
    targetContainerCSS: { justifyContent: 'space-around' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*space-around'], expectedTailwind: ['justify-around']
  },
  {
    id: 4, stage: 1, mode: 'flex', name: 'Challenge 4',
    instructions: 'Edge frogs touch the shore — equal space between them.',
    hint: 'Try: justify-content: space-between  OR  justify-between',
    frogs: THREE,
    targetContainerCSS: { justifyContent: 'space-between' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*space-between'], expectedTailwind: ['justify-between']
  },
  {
    id: 5, stage: 1, mode: 'flex', name: 'Challenge 5',
    instructions: 'Sink the frogs to the bottom of the pond.',
    hint: 'Try: align-items: flex-end  OR  items-end',
    frogs: THREE,
    targetContainerCSS: { alignItems: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['align-items\\s*:\\s*flex-end'], expectedTailwind: ['items-end']
  },
  {
    id: 6, stage: 1, mode: 'flex', name: 'Challenge 6',
    instructions: 'Center the lone frog perfectly — both axes!',
    hint: 'Try: justify-content: center + align-items: center  OR  justify-center items-center',
    frogs: [G],
    targetContainerCSS: { justifyContent: 'center', alignItems: 'center' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*center', 'align-items\\s*:\\s*center'], expectedTailwind: ['justify-center', 'items-center']
  },
  {
    id: 7, stage: 1, mode: 'flex', name: 'Challenge 7',
    instructions: 'Stack the frogs in a column.',
    hint: 'Try: flex-direction: column  OR  flex-col',
    frogs: MIX3,
    targetContainerCSS: { flexDirection: 'column' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column'], expectedTailwind: ['flex-col']
  },
  {
    id: 8, stage: 1, mode: 'flex', name: 'Challenge 8',
    instructions: 'Reverse the frog order!',
    hint: 'Try: flex-direction: row-reverse  OR  flex-row-reverse',
    frogs: MIX3,
    targetContainerCSS: { flexDirection: 'row-reverse' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*row-reverse'], expectedTailwind: ['flex-row-reverse']
  },
  {
    id: 9, stage: 1, mode: 'flex', name: 'Challenge 9',
    instructions: 'Column, then push them down to the bottom.',
    hint: 'Try: flex-direction: column + justify-content: flex-end  OR  flex-col justify-end',
    frogs: THREE,
    targetContainerCSS: { flexDirection: 'column', justifyContent: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column', 'justify-content\\s*:\\s*flex-end'], expectedTailwind: ['flex-col', 'justify-end']
  },
  {
    id: 10, stage: 1, mode: 'flex', name: 'Challenge 10',
    instructions: 'Row reversed + frogs at bottom-right. Combine direction, justification and alignment!',
    hint: 'Try: flex-direction: row-reverse + justify-content: flex-end + align-items: flex-end',
    frogs: MIX3,
    targetContainerCSS: { flexDirection: 'row-reverse', justifyContent: 'flex-end', alignItems: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*row-reverse', 'justify-content\\s*:\\s*flex-end', 'align-items\\s*:\\s*flex-end'], expectedTailwind: ['flex-row-reverse', 'justify-end', 'items-end']
  },

  // ─── STAGE 2: FLEX ADVANCED ───────────────────────────────────────────────
  {
    id: 11, stage: 2, mode: 'flex', name: 'Challenge 11',
    instructions: 'Too many frogs! Wrap them to the next line.',
    hint: 'Try: flex-wrap: wrap  OR  flex-wrap',
    frogs: [...TWO, ...TWO, ...TWO, ...TWO],
    targetContainerCSS: { flexWrap: 'wrap' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-wrap\\s*:\\s*wrap'], expectedTailwind: ['flex-wrap']
  },
  {
    id: 12, stage: 2, mode: 'flex', name: 'Challenge 12',
    instructions: 'Add breathing room between the frogs using gap.',
    hint: 'Try: gap: 20px  OR  gap-5',
    frogs: THREE,
    targetContainerCSS: { gap: '20px' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['gap\\s*:\\s*20px'], expectedTailwind: ['gap-5']
  },
  {
    id: 13, stage: 2, mode: 'flex', name: 'Challenge 13',
    instructions: 'Send the yellow frog to the back of the line!',
    hint: 'Try on .yellow: order: 1  OR  order-last',
    frogs: MIX3,
    targetItemCSS: { 'y1': { order: 1 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['order\\s*:\\s*[1-9]'], expectedTailwind: ['order-'],
    targetSelector: '.yellow'
  },
  {
    id: 14, stage: 2, mode: 'flex', name: 'Challenge 14',
    instructions: 'Send the red frog to the front!',
    hint: 'Try on .red: order: -1  OR  order-first',
    frogs: [...THREE, { ...R, id: 'r1' }],
    targetItemCSS: { 'r1': { order: -1 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['order\\s*:\\s*-[1-9]'], expectedTailwind: ['order-first'],
    targetSelector: '.red'
  },
  {
    id: 15, stage: 2, mode: 'flex', name: 'Challenge 15',
    instructions: 'Align the yellow frog to the bottom while the rest stay at top.',
    hint: 'Try on .yellow: align-self: flex-end  OR  self-end',
    frogs: [{ ...G, id: 'g1' }, { ...Y, id: 'y1' }, { ...G, id: 'g2' }],
    targetItemCSS: { 'y1': { alignSelf: 'flex-end' } },
    editorBefore: '#pond {\n  display: flex;\n  align-items: flex-start;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['align-self\\s*:\\s*flex-end'], expectedTailwind: ['self-end'],
    targetSelector: '.yellow'
  },
  {
    id: 16, stage: 2, mode: 'flex', name: 'Challenge 16',
    instructions: 'Make the yellow frog grow to fill all remaining space.',
    hint: 'Try on .yellow: flex-grow: 1  OR  grow',
    frogs: [{ ...G, id: 'g1' }, { ...Y, id: 'y1' }, { ...G, id: 'g2' }],
    targetItemCSS: { 'y1': { flexGrow: 1 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['flex-grow\\s*:\\s*1'], expectedTailwind: ['grow'],
    targetSelector: '.yellow'
  },
  {
    id: 17, stage: 2, mode: 'flex', name: 'Challenge 17',
    instructions: 'Stop the red frog from shrinking when the pond gets small.',
    hint: 'Try on .red: flex-shrink: 0  OR  shrink-0',
    frogs: [{ ...G, id: 'g1' }, { ...R, id: 'r1' }, { ...G, id: 'g2' }],
    targetItemCSS: { 'r1': { flexShrink: 0 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['flex-shrink\\s*:\\s*0'], expectedTailwind: ['shrink-0'],
    targetSelector: '.red'
  },
  {
    id: 18, stage: 2, mode: 'flex', name: 'Challenge 18',
    instructions: 'Set the yellow frog initial size to 50% of the container.',
    hint: 'Try on .yellow: flex-basis: 50%  OR  basis-1/2',
    frogs: [{ ...G, id: 'g1' }, { ...Y, id: 'y1' }, { ...G, id: 'g2' }],
    targetItemCSS: { 'y1': { flexBasis: '50%' } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['flex-basis\\s*:\\s*50%'], expectedTailwind: ['basis-1/2'],
    targetSelector: '.yellow'
  },
  {
    id: 19, stage: 2, mode: 'flex', name: 'Challenge 19',
    instructions: 'Wrap frogs in reverse — new rows stack at the bottom first.',
    hint: 'Try: flex-wrap: wrap-reverse  OR  flex-wrap-reverse',
    frogs: [...MIX3, ...MIX3],
    targetContainerCSS: { flexWrap: 'wrap-reverse', alignContent: 'space-around' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-wrap\\s*:\\s*wrap-reverse'], expectedTailwind: ['flex-wrap-reverse']
  },
  {
    id: 20, stage: 2, mode: 'flex', name: 'Challenge 20',
    instructions: 'Master level! Column-reverse + wrap + space-between + items at end + gap 8px.',
    hint: 'Try: flex-direction: column-reverse, flex-wrap: wrap, justify-content: space-between, align-items: flex-end, gap: 8px',
    frogs: FIVE,
    targetContainerCSS: { flexDirection: 'column-reverse', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '8px' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column-reverse', 'flex-wrap\\s*:\\s*wrap', 'justify-content\\s*:\\s*space-between', 'align-items\\s*:\\s*flex-end'], expectedTailwind: ['flex-col-reverse', 'flex-wrap', 'justify-between', 'items-end']
  },

  // ─── STAGE 3: GRID BASICS ─────────────────────────────────────────────────
  {
    id: 21, stage: 3, mode: 'grid', name: 'Challenge 21',
    instructions: 'Create a 3-column grid layout.',
    hint: 'Try: grid-template-columns: repeat(3, 1fr)  OR  grid-cols-3',
    frogs: MIX3,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(3'], expectedTailwind: ['grid-cols-3']
  },
  {
    id: 22, stage: 3, mode: 'grid', name: 'Challenge 22',
    instructions: 'Create a 5-column grid.',
    hint: 'Try: grid-template-columns: repeat(5, 1fr)  OR  grid-cols-5',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(5'], expectedTailwind: ['grid-cols-5']
  },
  {
    id: 23, stage: 3, mode: 'grid', name: 'Challenge 23',
    instructions: 'Move the red frog to column 3 using grid-column-start.',
    hint: 'Try on .red: grid-column-start: 3  OR  col-start-3',
    frogs: [R],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'r1': { gridColumnStart: '3' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['grid-column-start\\s*:\\s*3'], expectedTailwind: ['col-start-3'],
    targetSelector: '.red'
  },
  {
    id: 24, stage: 3, mode: 'grid', name: 'Challenge 24',
    instructions: 'Make the yellow frog span 3 columns.',
    hint: 'Try on .yellow: grid-column: span 3  OR  col-span-3',
    frogs: [Y],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'y1': { gridColumn: '1 / span 3' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['grid-column\\s*:\\s*1\\s*/\\s*span\\s*3'], expectedTailwind: ['col-span-3'],
    targetSelector: '.yellow'
  },
  {
    id: 25, stage: 3, mode: 'grid', name: 'Challenge 25',
    instructions: 'Make the green frog span the full width of the grid.',
    hint: 'Try on .green: grid-column: 1 / -1  OR  col-span-full',
    frogs: [G],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'g1': { gridColumn: '1 / -1' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.green {\n', editorAfter: '}',
    expectedRegex: ['grid-column\\s*:\\s*1\\s*/\\s*-1'], expectedTailwind: ['col-span-full'],
    targetSelector: '.green'
  },
  {
    id: 26, stage: 3, mode: 'grid', name: 'Challenge 26',
    instructions: 'Move the yellow frog to rows 2 through 4.',
    hint: 'Try on .yellow: grid-row: 2 / 4  OR  row-start-2 row-end-4',
    frogs: [Y],
    targetContainerCSS: { display: 'grid', gridTemplateRows: 'repeat(5, 1fr)' },
    targetItemCSS: { 'y1': { gridRow: '2 / 4' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-rows: repeat(5, 1fr);\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['grid-row\\s*:\\s*2\\s*/\\s*4'], expectedTailwind: ['row-start-2', 'row-end-4'],
    targetSelector: '.yellow'
  },
  {
    id: 27, stage: 3, mode: 'grid', name: 'Challenge 27',
    instructions: 'Build a 3×3 grid for the frogs.',
    hint: 'Try: grid-template-columns: repeat(3,1fr) + grid-template-rows: repeat(3,1fr)  OR  grid-cols-3 grid-rows-3',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(3', 'grid-template-rows\\s*:\\s*repeat\\(3'], expectedTailwind: ['grid-cols-3', 'grid-rows-3']
  },
  {
    id: 28, stage: 3, mode: 'grid', name: 'Challenge 28',
    instructions: 'Grid auto-flow by column instead of row.',
    hint: 'Try: grid-auto-flow: column  OR  grid-flow-col',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridAutoFlow: 'column' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-auto-flow\\s*:\\s*column'], expectedTailwind: ['grid-flow-col']
  },
  {
    id: 29, stage: 3, mode: 'grid', name: 'Challenge 29',
    instructions: 'Red frog spans 2 columns and 2 rows — it needs more space!',
    hint: 'Try on .red: grid-column: span 2, grid-row: span 2  OR  col-span-2 row-span-2',
    frogs: [R],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' },
    targetItemCSS: { 'r1': { gridColumn: 'span 2 / span 2', gridRow: 'span 2 / span 2' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(4, 1fr);\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['grid-column\\s*:\\s*span\\s*2', 'grid-row\\s*:\\s*span\\s*2'], expectedTailwind: ['col-span-2', 'row-span-2'],
    targetSelector: '.red'
  },
  {
    id: 30, stage: 3, mode: 'grid', name: 'Challenge 30',
    instructions: 'Place the yellow frog at grid-area 2 / 3 / 4 / 5.',
    hint: 'Try on .yellow: grid-area: 2 / 3 / 4 / 5  OR  row-start-2 col-start-3 row-end-4 col-end-5',
    frogs: [Y],
    targetContainerCSS: { display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'y1': { gridArea: '2 / 3 / 4 / 5' } },
    editorBefore: '#garden {\n  display: grid;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['grid-area\\s*:\\s*2\\s*/\\s*3\\s*/\\s*4\\s*/\\s*5'], expectedTailwind: ['row-start-2', 'col-start-3', 'row-end-4', 'col-end-5'],
    targetSelector: '.yellow'
  },

  // ─── STAGE 4: GRID ADVANCED ───────────────────────────────────────────────
  {
    id: 31, stage: 4, mode: 'grid', name: 'Challenge 31',
    instructions: 'Add a 16px gap between all grid cells.',
    hint: 'Try: gap: 16px  OR  gap-4',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['gap\\s*:\\s*16px'], expectedTailwind: ['gap-4']
  },
  {
    id: 32, stage: 4, mode: 'grid', name: 'Challenge 32',
    instructions: 'Center frogs both horizontally AND vertically inside their cells.',
    hint: 'Try: place-items: center  OR  place-items-center',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', placeItems: 'center' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['place-items\\s*:\\s*center'], expectedTailwind: ['place-items-center']
  },
  {
    id: 33, stage: 4, mode: 'grid', name: 'Challenge 33',
    instructions: 'Align the yellow frog to the right end of its cell.',
    hint: 'Try on .yellow: justify-self: end  OR  justify-self-end',
    frogs: [G, Y, R],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
    targetItemCSS: { 'y1': { justifySelf: 'end' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['justify-self\\s*:\\s*end'], expectedTailwind: ['justify-self-end'],
    targetSelector: '.yellow'
  },
  {
    id: 34, stage: 4, mode: 'grid', name: 'Challenge 34',
    instructions: 'Center the green frog inside its cell on both axes.',
    hint: 'Try on .green: place-self: center  OR  place-self-center',
    frogs: [G, Y, R],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
    targetItemCSS: { 'g1': { placeSelf: 'center' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.green {\n', editorAfter: '}',
    expectedRegex: ['place-self\\s*:\\s*center'], expectedTailwind: ['place-self-center'],
    targetSelector: '.green'
  },
  {
    id: 35, stage: 4, mode: 'grid', name: 'Challenge 35',
    instructions: 'Auto-placed rows should each be 60px tall.',
    hint: 'Try: grid-auto-rows: 60px  OR  auto-rows-[60px]',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: '60px' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n', editorAfter: '}',
    expectedRegex: ['grid-auto-rows\\s*:\\s*60px'], expectedTailwind: ['auto-rows-\\[60px\\]']
  },
  {
    id: 36, stage: 4, mode: 'grid', name: 'Challenge 36',
    instructions: 'Use auto-fill to create as many 50px columns as fit in the container.',
    hint: 'Try: grid-template-columns: repeat(auto-fill, 50px)',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 50px)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(auto-fill,\\s*50px\\)'], expectedTailwind: ['grid-cols-\\[repeat\\(auto-fill,50px\\)\\]']
  },
  {
    id: 37, stage: 4, mode: 'grid', name: 'Challenge 37',
    instructions: 'Create 3 flexible columns — each at least 100px but expanding to fill space using minmax().',
    hint: 'Try: grid-template-columns: repeat(3, minmax(100px, 1fr))',
    frogs: MIX3,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(3,\\s*minmax\\(100px,\\s*1fr\\)\\)'], expectedTailwind: ['grid-cols-\\[repeat\\(3,minmax\\(100px,1fr\\)\\)\\]']
  },
  {
    id: 38, stage: 4, mode: 'grid', name: 'Challenge 38',
    instructions: 'Center the entire grid inside the container horizontally.',
    hint: 'Try: justify-content: center  OR  justify-center',
    frogs: MIX3,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: '50px 50px 50px', justifyContent: 'center' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: 50px 50px 50px;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*center'], expectedTailwind: ['justify-center']
  },
  {
    id: 39, stage: 4, mode: 'grid', name: 'Challenge 39',
    instructions: 'Align the entire grid to the center vertically using align-content.',
    hint: 'Try: align-content: center  OR  content-center',
    frogs: MIX3,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignContent: 'center' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['align-content\\s*:\\s*center'], expectedTailwind: ['content-center']
  },
  {
    id: 40, stage: 4, mode: 'grid', name: 'Challenge 40',
    instructions: '🏆 FINAL BOSS! Build a 4×4 grid, add a 10px gap, center the grid both ways, and use place-items: center to center frogs in their cells.',
    hint: 'Try: grid-template-columns: repeat(4,1fr), grid-template-rows: repeat(4,1fr), gap: 10px, justify-content: center, align-content: center, place-items: center',
    frogs: FIVE,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '10px', justifyContent: 'center', alignContent: 'center', placeItems: 'center' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(4', 'grid-template-rows\\s*:\\s*repeat\\(4', 'gap\\s*:\\s*10px'], expectedTailwind: ['grid-cols-4', 'grid-rows-4', 'gap-2', 'content-center', 'place-items-center']
  },
];
