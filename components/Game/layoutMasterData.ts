export type LevelMode = 'flex' | 'grid';

export interface Frog {
  color: 'green' | 'red' | 'yellow';
  id: string;
}

export interface LayoutLevel {
  id: number;
  mode: LevelMode;
  name: string;
  instructions: string;
  targetContainerCSS?: React.CSSProperties; 
  targetItemCSS?: Record<string, React.CSSProperties>; 
  frogs: Frog[];
  editorBefore: string;
  editorAfter: string;
  expectedRegex: string[]; // e.g. /justify-content\s*:\s*flex-end/
  expectedTailwind: string[]; // e.g. ['justify-end']
  targetSelector?: string; 
}

const GREEN_FROG: Frog = { color: 'green', id: 'g1' };
const RED_FROG: Frog = { color: 'red', id: 'r1' };
const YELLOW_FROG: Frog = { color: 'yellow', id: 'y1' };

const TWO_GREEN = [{ ...GREEN_FROG, id: 'g1' }, { ...GREEN_FROG, id: 'g2' }];
const THREE_GREEN = [{ ...GREEN_FROG, id: 'g1' }, { ...GREEN_FROG, id: 'g2' }, { ...GREEN_FROG, id: 'g3' }];
const THREE_MIX = [{ ...GREEN_FROG, id: 'g1' }, { ...YELLOW_FROG, id: 'y1' }, { ...RED_FROG, id: 'r1' }];
const FIVE_MIX = [
  { ...GREEN_FROG, id: 'g1' }, { ...YELLOW_FROG, id: 'y1' }, { ...RED_FROG, id: 'r1' },
  { ...YELLOW_FROG, id: 'y2' }, { ...GREEN_FROG, id: 'g2' }
];

export const flexLevels: LayoutLevel[] = [
  {
    id: 1, mode: 'flex', name: 'Level 1',
    instructions: 'Welcome to Flexbox Froggy! Bring the frog to the lilypad on the right by using `justify-content` (CSS) or `justify-end` (Tailwind).',
    frogs: [GREEN_FROG],
    targetContainerCSS: { justifyContent: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*flex-end'], expectedTailwind: ['justify-end']
  },
  {
    id: 2, mode: 'flex', name: 'Level 2',
    instructions: 'Move these two frogs to the center of the pond.',
    frogs: TWO_GREEN,
    targetContainerCSS: { justifyContent: 'center' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*center'], expectedTailwind: ['justify-center']
  },
  {
    id: 3, mode: 'flex', name: 'Level 3',
    instructions: 'Help all three frogs find their lilypads. The lilypads have lots of space all around them.',
    frogs: THREE_GREEN,
    targetContainerCSS: { justifyContent: 'space-around' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*space-around'], expectedTailwind: ['justify-around']
  },
  {
    id: 4, mode: 'flex', name: 'Level 4',
    instructions: 'Now the lilypads on the edges have drifted to the shore, increasing the space between them.',
    frogs: THREE_GREEN,
    targetContainerCSS: { justifyContent: 'space-between' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*space-between'], expectedTailwind: ['justify-between']
  },
  {
    id: 5, mode: 'flex', name: 'Level 5',
    instructions: 'Align the frogs to the bottom of the pond.',
    frogs: THREE_GREEN,
    targetContainerCSS: { alignItems: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['align-items\\s*:\\s*flex-end'], expectedTailwind: ['items-end']
  },
  {
    id: 6, mode: 'flex', name: 'Level 6',
    instructions: 'Lead the frog to the center of the pond using both alignment and justification.',
    frogs: [GREEN_FROG],
    targetContainerCSS: { justifyContent: 'center', alignItems: 'center' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*center', 'align-items\\s*:\\s*center'], expectedTailwind: ['justify-center', 'items-center']
  },
  {
    id: 7, mode: 'flex', name: 'Level 7',
    instructions: 'The frogs need to cross the pond again, this time for some lilypads with plenty of space around them, located at the bottom.',
    frogs: THREE_GREEN,
    targetContainerCSS: { justifyContent: 'space-around', alignItems: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*space-around', 'align-items\\s*:\\s*flex-end'], expectedTailwind: ['justify-around', 'items-end']
  },
  {
    id: 8, mode: 'flex', name: 'Level 8',
    instructions: 'Reverse the order of the frogs!',
    frogs: THREE_MIX,
    targetContainerCSS: { flexDirection: 'row-reverse' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*row-reverse'], expectedTailwind: ['flex-row-reverse']
  },
  {
    id: 9, mode: 'flex', name: 'Level 9',
    instructions: 'Help the frogs find their column of lilypads.',
    frogs: THREE_GREEN,
    targetContainerCSS: { flexDirection: 'column' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column'], expectedTailwind: ['flex-col']
  },
  {
    id: 10, mode: 'flex', name: 'Level 10',
    instructions: 'Help the frogs get to their own lilypads using direction and justification.',
    frogs: THREE_MIX,
    targetContainerCSS: { flexDirection: 'row-reverse', justifyContent: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*row-reverse', 'justify-content\\s*:\\s*flex-end'], expectedTailwind: ['flex-row-reverse', 'justify-end']
  },
  {
    id: 11, mode: 'flex', name: 'Level 11',
    instructions: 'Help the frogs find their lilypads.',
    frogs: THREE_GREEN,
    targetContainerCSS: { flexDirection: 'column', justifyContent: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column', 'justify-content\\s*:\\s*flex-end'], expectedTailwind: ['flex-col', 'justify-end']
  },
  {
    id: 12, mode: 'flex', name: 'Level 12',
    instructions: 'Help the frogs find their lilypads.',
    frogs: THREE_MIX,
    targetContainerCSS: { flexDirection: 'column-reverse', justifyContent: 'space-between' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column-reverse', 'justify-content\\s*:\\s*space-between'], expectedTailwind: ['flex-col-reverse', 'justify-between']
  },
  {
    id: 13, mode: 'flex', name: 'Level 13',
    instructions: 'Help the frogs find their lilypads.',
    frogs: THREE_MIX,
    targetContainerCSS: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*row-reverse', 'justify-content\\s*:\\s*center', 'align-items\\s*:\\s*flex-end'], expectedTailwind: ['flex-row-reverse', 'justify-center', 'items-end']
  },
  {
    id: 14, mode: 'flex', name: 'Level 14',
    instructions: 'Apply the `order` property (or `order-last`) to individual items. Give the yellow frog a positive order.',
    frogs: THREE_MIX,
    targetItemCSS: { 'y1': { order: 1 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['order\\s*:\\s*[1-9]'], expectedTailwind: ['order-'],
    targetSelector: '.yellow'
  },
  {
    id: 15, mode: 'flex', name: 'Level 15',
    instructions: 'Use the `order` property (or `order-first`) to send the red frog to his lilypad.',
    frogs: [{ ...GREEN_FROG, id: 'g1' }, { ...GREEN_FROG, id: 'g2' }, { ...GREEN_FROG, id: 'g3' }, { ...RED_FROG, id: 'r1' }, { ...GREEN_FROG, id: 'g4' }],
    targetItemCSS: { 'r1': { order: -1 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['order\\s*:\\s*-[1-9]'], expectedTailwind: ['order-first'],
    targetSelector: '.red'
  },
  {
    id: 16, mode: 'flex', name: 'Level 16',
    instructions: 'Another property you can apply to individual items is `align-self` (or `self-end`).',
    frogs: [{ ...GREEN_FROG, id: 'g1' }, { ...YELLOW_FROG, id: 'y1' }, { ...GREEN_FROG, id: 'g2' }, { ...GREEN_FROG, id: 'g3' }, { ...GREEN_FROG, id: 'g4' }],
    targetItemCSS: { 'y1': { alignSelf: 'flex-end' } },
    editorBefore: '#pond {\n  display: flex;\n  align-items: flex-start;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['align-self\\s*:\\s*flex-end'], expectedTailwind: ['self-end'],
    targetSelector: '.yellow'
  },
  {
    id: 17, mode: 'flex', name: 'Level 17',
    instructions: 'Combine order and align-self to help the yellow frogs.',
    frogs: [{ ...GREEN_FROG, id: 'g1' }, { ...YELLOW_FROG, id: 'y1' }, { ...YELLOW_FROG, id: 'y2' }, { ...GREEN_FROG, id: 'g2' }, { ...GREEN_FROG, id: 'g3' }],
    targetItemCSS: { 'y1': { order: 1, alignSelf: 'flex-end' }, 'y2': { order: 1, alignSelf: 'flex-end' } },
    editorBefore: '#pond {\n  display: flex;\n  align-items: flex-start;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['order\\s*:\\s*[1-9]', 'align-self\\s*:\\s*flex-end'], expectedTailwind: ['order-', 'self-end'],
    targetSelector: '.yellow'
  },
  {
    id: 18, mode: 'flex', name: 'Level 18',
    instructions: 'Spread them out using `flex-wrap` (or `flex-wrap` in Tailwind).',
    frogs: [...TWO_GREEN, ...TWO_GREEN, ...TWO_GREEN, ...TWO_GREEN],
    targetContainerCSS: { flexWrap: 'wrap' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-wrap\\s*:\\s*wrap'], expectedTailwind: ['flex-wrap']
  },
  {
    id: 19, mode: 'flex', name: 'Level 19',
    instructions: 'Help this army of frogs form three orderly columns using a combination of direction and wrap.',
    frogs: [...THREE_MIX, ...THREE_MIX, ...THREE_MIX],
    targetContainerCSS: { flexDirection: 'column', flexWrap: 'wrap' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column', 'flex-wrap\\s*:\\s*wrap'], expectedTailwind: ['flex-col', 'flex-wrap']
  },
  {
    id: 20, mode: 'flex', name: 'Level 20',
    instructions: 'Use the shorthand `flex-flow` (CSS) or combine Tailwind classes.',
    frogs: [...THREE_MIX, ...THREE_MIX],
    targetContainerCSS: { flexFlow: 'column wrap' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-flow\\s*:\\s*column\\s*wrap'], expectedTailwind: ['flex-col', 'flex-wrap']
  },
  {
    id: 21, mode: 'flex', name: 'Level 21',
    instructions: 'You can use `align-content` (or `content-start` in Tailwind) to set how multiple lines are spaced.',
    frogs: [...TWO_GREEN, ...TWO_GREEN, ...TWO_GREEN, ...TWO_GREEN],
    targetContainerCSS: { flexWrap: 'wrap', alignContent: 'flex-start' },
    editorBefore: '#pond {\n  display: flex;\n  flex-wrap: wrap;\n', editorAfter: '}',
    expectedRegex: ['align-content\\s*:\\s*flex-start'], expectedTailwind: ['content-start']
  },
  {
    id: 22, mode: 'flex', name: 'Level 22',
    instructions: 'Now the current has pushed the lilypads to the bottom.',
    frogs: [...TWO_GREEN, ...TWO_GREEN, ...TWO_GREEN, ...TWO_GREEN],
    targetContainerCSS: { flexWrap: 'wrap', alignContent: 'flex-end' },
    editorBefore: '#pond {\n  display: flex;\n  flex-wrap: wrap;\n', editorAfter: '}',
    expectedRegex: ['align-content\\s*:\\s*flex-end'], expectedTailwind: ['content-end']
  },
  {
    id: 23, mode: 'flex', name: 'Level 23',
    instructions: 'The frogs have had a party, but it is time to go home.',
    frogs: [...THREE_MIX, ...THREE_MIX, ...THREE_MIX],
    targetContainerCSS: { flexWrap: 'wrap', flexDirection: 'column-reverse', alignContent: 'center' },
    editorBefore: '#pond {\n  display: flex;\n  flex-wrap: wrap;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column-reverse', 'align-content\\s*:\\s*center'], expectedTailwind: ['flex-col-reverse', 'content-center']
  },
  {
    id: 24, mode: 'flex', name: 'Level 24',
    instructions: 'Bring the frogs home one last time.',
    frogs: FIVE_MIX,
    targetContainerCSS: { flexFlow: 'column-reverse wrap-reverse', justifyContent: 'center', alignContent: 'space-between', alignItems: 'center' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-flow\\s*:\\s*column-reverse\\s*wrap-reverse', 'justify-content\\s*:\\s*center', 'align-content\\s*:\\s*space-between', 'align-items\\s*:\\s*center'], expectedTailwind: ['flex-col-reverse', 'flex-wrap-reverse', 'justify-center', 'content-between', 'items-center']
  },
  {
    id: 25, mode: 'flex', name: 'Level 25',
    instructions: 'Use the `gap` property (or `gap-5` in Tailwind) to add space between the frogs.',
    frogs: THREE_GREEN,
    targetContainerCSS: { gap: '20px' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['gap\\s*:\\s*20px'], expectedTailwind: ['gap-5']
  },
  {
    id: 26, mode: 'flex', name: 'Level 26',
    instructions: 'Use the `row-gap` property (or `gap-y-8` in Tailwind) to add vertical spacing between wrapped rows of frogs.',
    frogs: [...THREE_GREEN, ...THREE_GREEN],
    targetContainerCSS: { flexWrap: 'wrap', rowGap: '32px' },
    editorBefore: '#pond {\n  display: flex;\n  flex-wrap: wrap;\n', editorAfter: '}',
    expectedRegex: ['row-gap\\s*:\\s*32px'], expectedTailwind: ['gap-y-8']
  },
  {
    id: 27, mode: 'flex', name: 'Level 27',
    instructions: 'Use the `column-gap` property (or `gap-x-4` in Tailwind) to add horizontal spacing between columns of frogs.',
    frogs: [...THREE_GREEN, ...THREE_GREEN],
    targetContainerCSS: { flexDirection: 'column', flexWrap: 'wrap', columnGap: '16px' },
    editorBefore: '#pond {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n', editorAfter: '}',
    expectedRegex: ['column-gap\\s*:\\s*16px'], expectedTailwind: ['gap-x-4']
  },
  {
    id: 28, mode: 'flex', name: 'Level 28',
    instructions: 'Use the `flex-grow` property (or `grow` in Tailwind) to make the yellow frog expand and fill the remaining space.',
    frogs: [{ ...GREEN_FROG, id: 'g1' }, { ...YELLOW_FROG, id: 'y1' }, { ...GREEN_FROG, id: 'g2' }],
    targetItemCSS: { 'y1': { flexGrow: 1 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['flex-grow\\s*:\\s*1'], expectedTailwind: ['grow'],
    targetSelector: '.yellow'
  },
  {
    id: 29, mode: 'flex', name: 'Level 29',
    instructions: 'Prevent the red frog from shrinking when the container is small by using `flex-shrink: 0` (or `shrink-0` in Tailwind).',
    frogs: [{ ...GREEN_FROG, id: 'g1' }, { ...RED_FROG, id: 'r1' }, { ...GREEN_FROG, id: 'g2' }],
    targetItemCSS: { 'r1': { flexShrink: 0 } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['flex-shrink\\s*:\\s*0'], expectedTailwind: ['shrink-0'],
    targetSelector: '.red'
  },
  {
    id: 30, mode: 'flex', name: 'Level 30',
    instructions: 'Set the initial main size of the yellow frog to 50% using `flex-basis: 50%` (or `basis-1/2` in Tailwind).',
    frogs: [{ ...GREEN_FROG, id: 'g1' }, { ...YELLOW_FROG, id: 'y1' }, { ...GREEN_FROG, id: 'g2' }],
    targetItemCSS: { 'y1': { flexBasis: '50%' } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['flex-basis\\s*:\\s*50%'], expectedTailwind: ['basis-1/2'],
    targetSelector: '.yellow'
  },
  {
    id: 31, mode: 'flex', name: 'Level 31',
    instructions: 'Use the shorthand `flex: 1 1 auto` (or `flex-auto` in Tailwind) on the yellow frog to grow and shrink it as needed.',
    frogs: [{ ...GREEN_FROG, id: 'g1' }, { ...YELLOW_FROG, id: 'y1' }, { ...GREEN_FROG, id: 'g2' }],
    targetItemCSS: { 'y1': { flex: '1 1 auto' } },
    editorBefore: '#pond {\n  display: flex;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['flex\\s*:\\s*1\\s+1\\s+auto'], expectedTailwind: ['flex-auto'],
    targetSelector: '.yellow'
  },
  {
    id: 32, mode: 'flex', name: 'Level 32',
    instructions: 'Help the frogs find their spots by reversing direction, spacing them evenly, and adding a gap of 12px (Tailwind: `flex-row-reverse justify-normal gap-3`).',
    frogs: THREE_MIX,
    targetContainerCSS: { flexDirection: 'row-reverse', justifyContent: 'normal', gap: '12px' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*row-reverse', 'gap\\s*:\\s*12px'], expectedTailwind: ['flex-row-reverse', 'gap-3']
  },
  {
    id: 33, mode: 'flex', name: 'Level 33',
    instructions: 'Reorder the green frog using `order: 2` (or `order-2` in Tailwind) and center it with `align-self: center` (or `self-center` in Tailwind).',
    frogs: THREE_MIX,
    targetItemCSS: { 'g1': { order: 2, alignSelf: 'center' } },
    editorBefore: '#pond {\n  display: flex;\n  align-items: flex-start;\n}\n\n.green {\n', editorAfter: '}',
    expectedRegex: ['order\\s*:\\s*2', 'align-self\\s*:\\s*center'], expectedTailwind: ['order-2', 'self-center'],
    targetSelector: '.green'
  },
  {
    id: 34, mode: 'flex', name: 'Level 34',
    instructions: 'Wrap the frogs in reverse order of lines with `flex-wrap: wrap-reverse` and space the lines evenly with `align-content: space-around` (Tailwind: `flex-wrap-reverse content-around`).',
    frogs: [...THREE_MIX, ...THREE_MIX],
    targetContainerCSS: { flexWrap: 'wrap-reverse', alignContent: 'space-around' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-wrap\\s*:\\s*wrap-reverse', 'align-content\\s*:\\s*space-around'], expectedTailwind: ['flex-wrap-reverse', 'content-around']
  },
  {
    id: 35, mode: 'flex', name: 'Level 35',
    instructions: 'The Ultimate Flex Challenge! Lay out the frogs in a reverse column, wrap them, justify them with space-between, align items to the end, and add a gap of 8px.',
    frogs: FIVE_MIX,
    targetContainerCSS: { flexDirection: 'column-reverse', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '8px' },
    editorBefore: '#pond {\n  display: flex;\n', editorAfter: '}',
    expectedRegex: ['flex-direction\\s*:\\s*column-reverse', 'flex-wrap\\s*:\\s*wrap', 'justify-content\\s*:\\s*space-between', 'align-items\\s*:\\s*flex-end', 'gap\\s*:\\s*8px'], expectedTailwind: ['flex-col-reverse', 'flex-wrap', 'justify-between', 'items-end', 'gap-2']
  }
];

export const gridLevels: LayoutLevel[] = [
  {
    id: 1, mode: 'grid', name: 'Grid 1',
    instructions: 'Use `grid-template-columns` (CSS) or `grid-cols-5` (Tailwind) to create 5 columns.',
    frogs: [...TWO_GREEN, ...THREE_GREEN],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*20%\\s*20%\\s*20%\\s*20%\\s*20%|repeat\\(5'], expectedTailwind: ['grid-cols-5']
  },
  {
    id: 2, mode: 'grid', name: 'Grid 2',
    instructions: 'Create 8 columns.',
    frogs: [...TWO_GREEN, ...THREE_GREEN, ...THREE_MIX],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*.*50px.*|repeat\\(8'], expectedTailwind: ['grid-cols-8']
  },
  {
    id: 3, mode: 'grid', name: 'Grid 3',
    instructions: 'The `fr` unit sets the size to a fraction of the free space.',
    frogs: [...TWO_GREEN, ...THREE_GREEN],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*1fr\\s*1fr\\s*1fr\\s*1fr\\s*1fr'], expectedTailwind: ['grid-cols-5']
  },
  {
    id: 4, mode: 'grid', name: 'Grid 4',
    instructions: 'Columns can have different sizes. Make a 50px column, an `auto` column, and another 50px column.',
    frogs: THREE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: '50px auto 50px' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*50px\\s*auto\\s*50px'], expectedTailwind: ['grid-cols-\\[50px_auto_50px\\]']
  },
  {
    id: 5, mode: 'grid', name: 'Grid 5',
    instructions: 'Use the `repeat()` function: `repeat(5, 1fr)`.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(5,\\s*1fr\\)'], expectedTailwind: ['grid-cols-5']
  },
  {
    id: 6, mode: 'grid', name: 'Grid 6',
    instructions: 'Rows work just like columns.',
    frogs: THREE_GREEN,
    targetContainerCSS: { display: 'grid', gridTemplateRows: '50px 1fr 50px' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-rows\\s*:\\s*50px\\s*1fr\\s*50px'], expectedTailwind: ['grid-rows-\\[50px_1fr_50px\\]']
  },
  {
    id: 7, mode: 'grid', name: 'Grid 7',
    instructions: 'Move the red frog to the 3rd vertical grid line (CSS: `grid-column-start`, Tailwind: `col-start-3`).',
    frogs: [RED_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'r1': { gridColumnStart: '3' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['grid-column-start\\s*:\\s*3'], expectedTailwind: ['col-start-3'],
    targetSelector: '.red'
  },
  {
    id: 8, mode: 'grid', name: 'Grid 8',
    instructions: 'Set both start and end lines for the yellow frog.',
    frogs: [YELLOW_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'y1': { gridColumn: '2 / 5' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['grid-column\\s*:\\s*2\\s*/\\s*5'], expectedTailwind: ['col-start-2', 'col-end-5'],
    targetSelector: '.yellow'
  },
  {
    id: 9, mode: 'grid', name: 'Grid 9',
    instructions: 'Use the `span` keyword (Tailwind: `col-span-3`).',
    frogs: [RED_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'r1': { gridColumn: '1 / span 3' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['grid-column\\s*:\\s*1\\s*/\\s*span\\s*3'], expectedTailwind: ['col-span-3'],
    targetSelector: '.red'
  },
  {
    id: 10, mode: 'grid', name: 'Grid 10',
    instructions: 'Negative numbers count from the end! (Tailwind: `col-span-full`).',
    frogs: [GREEN_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'g1': { gridColumn: '1 / -1' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.green {\n', editorAfter: '}',
    expectedRegex: ['grid-column\\s*:\\s*1\\s*/\\s*-1'], expectedTailwind: ['col-span-full'],
    targetSelector: '.green'
  },
  {
    id: 11, mode: 'grid', name: 'Grid 11',
    instructions: 'Rows work exactly the same way! (Tailwind: `row-start-2 row-end-4`).',
    frogs: [YELLOW_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateRows: 'repeat(5, 1fr)' },
    targetItemCSS: { 'y1': { gridRow: '2 / 4' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-rows: repeat(5, 1fr);\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['grid-row\\s*:\\s*2\\s*/\\s*4'], expectedTailwind: ['row-start-2', 'row-end-4'],
    targetSelector: '.yellow'
  },
  {
    id: 12, mode: 'grid', name: 'Grid 12',
    instructions: 'Combine `grid-row` and `grid-column`.',
    frogs: [RED_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'r1': { gridRow: '1 / span 2', gridColumn: '3 / span 2' } },
    editorBefore: '#garden {\n  display: grid;\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['grid-row\\s*:\\s*1\\s*/\\s*span\\s*2', 'grid-column\\s*:\\s*3\\s*/\\s*span\\s*2'], expectedTailwind: ['row-span-2', 'col-start-3', 'col-span-2'],
    targetSelector: '.red'
  },
  {
    id: 13, mode: 'grid', name: 'Grid 13',
    instructions: 'Use the `grid-area` shorthand! Or combine Tailwind row/col classes.',
    frogs: [YELLOW_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'y1': { gridArea: '2 / 3 / 4 / 5' } },
    editorBefore: '#garden {\n  display: grid;\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['grid-area\\s*:\\s*2\\s*/\\s*3\\s*/\\s*4\\s*/\\s*5'], expectedTailwind: ['row-start-2', 'col-start-3', 'row-end-4', 'col-end-5'],
    targetSelector: '.yellow'
  },
  {
    id: 14, mode: 'grid', name: 'Grid 14',
    instructions: 'Order works in Grid just like Flexbox! Give the red frog an `order` of 1.',
    frogs: THREE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    targetItemCSS: { 'r1': { order: 1 } },
    editorBefore: '#garden {\n  display: grid;\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['order\\s*:\\s*1'], expectedTailwind: ['order-'],
    targetSelector: '.red'
  },
  {
    id: 15, mode: 'grid', name: 'Grid 15',
    instructions: 'Let\'s create a 3x3 grid! Use both `grid-template-columns` and `grid-template-rows`.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(3,\\s*1fr\\)', 'grid-template-rows\\s*:\\s*repeat\\(3,\\s*1fr\\)'], expectedTailwind: ['grid-cols-3', 'grid-rows-3']
  },
  {
    id: 16, mode: 'grid', name: 'Grid 16',
    instructions: 'Use `justify-items` to align the frogs horizontally inside their grid cells. Try `center`.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyItems: 'center' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['justify-items\\s*:\\s*center'], expectedTailwind: ['justify-items-center']
  },
  {
    id: 17, mode: 'grid', name: 'Grid 17',
    instructions: 'Use `align-items` to align the frogs vertically inside their grid cells. Try `end`.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'end' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['align-items\\s*:\\s*end'], expectedTailwind: ['items-end']
  },
  {
    id: 18, mode: 'grid', name: 'Grid 18',
    instructions: 'Use `justify-content` to align the entire grid inside its container. Try `center`.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: '50px 50px 50px', justifyContent: 'center' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: 50px 50px 50px;\n', editorAfter: '}',
    expectedRegex: ['justify-content\\s*:\\s*center'], expectedTailwind: ['justify-center']
  },
  {
    id: 19, mode: 'grid', name: 'Grid 19',
    instructions: 'Use `align-content` to align the entire grid vertically. Try `space-between`.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: '50px 50px 50px', gridTemplateRows: '50px 50px', alignContent: 'space-between' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: 50px 50px 50px;\n  grid-template-rows: 50px 50px;\n', editorAfter: '}',
    expectedRegex: ['align-content\\s*:\\s*space-between'], expectedTailwind: ['content-between']
  },
  {
    id: 20, mode: 'grid', name: 'Grid 20',
    instructions: 'The `grid-auto-flow` property controls how auto-placed items flow. Set it to `column` (Tailwind: `grid-flow-col`).',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridAutoFlow: 'column' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-auto-flow\\s*:\\s*column'], expectedTailwind: ['grid-flow-col']
  },
  {
    id: 21, mode: 'grid', name: 'Grid 21',
    instructions: 'Use `grid-auto-columns: 50px` to set the size of auto-generated columns.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '50px' },
    editorBefore: '#garden {\n  display: grid;\n  grid-auto-flow: column;\n', editorAfter: '}',
    expectedRegex: ['grid-auto-columns\\s*:\\s*50px'], expectedTailwind: ['auto-cols-\\[50px\\]']
  },
  {
    id: 22, mode: 'grid', name: 'Grid 22',
    instructions: 'The `auto-fill` keyword creates as many columns as fit.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 50px)' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(auto-fill,\\s*50px\\)'], expectedTailwind: ['grid-cols-\\[repeat\\(auto-fill,50px\\)\\]']
  },
  {
    id: 23, mode: 'grid', name: 'Grid 23',
    instructions: 'Combine `auto-fit` with `minmax()`!',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(auto-fit,\\s*minmax\\(50px,\\s*1fr\\)\\)'], expectedTailwind: ['grid-cols-\\[repeat\\(auto-fit,minmax\\(50px,1fr\\)\\)\\]']
  },
  {
    id: 24, mode: 'grid', name: 'Grid 24',
    instructions: 'The Final Grid Challenge! Recreate this complex layout.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: '50px 1fr 50px', gridTemplateRows: '50px 1fr 50px', justifyContent: 'center', alignContent: 'center' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*50px\\s*1fr\\s*50px', 'grid-template-rows\\s*:\\s*50px\\s*1fr\\s*50px'], expectedTailwind: ['grid-cols-\\[50px_1fr_50px\\]', 'grid-rows-\\[50px_1fr_50px\\]']
  },
  {
    id: 25, mode: 'grid', name: 'Grid 25',
    instructions: 'Use the `gap` property (or `gap-4` in Tailwind) to add 16px of spacing between all grid cells.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['gap\\s*:\\s*16px'], expectedTailwind: ['gap-4']
  },
  {
    id: 26, mode: 'grid', name: 'Grid 26',
    instructions: 'Use the `row-gap` property (or `gap-y-6` in Tailwind) to add 24px of vertical spacing between rows.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: '24px' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['row-gap\\s*:\\s*24px'], expectedTailwind: ['gap-y-6']
  },
  {
    id: 27, mode: 'grid', name: 'Grid 27',
    instructions: 'Use the `column-gap` property (or `gap-x-3` in Tailwind) to add 12px of horizontal spacing between columns.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '12px' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['column-gap\\s*:\\s*12px'], expectedTailwind: ['gap-x-3']
  },
  {
    id: 28, mode: 'grid', name: 'Grid 28',
    instructions: 'Use `place-items: center` (or `place-items-center` in Tailwind) to center the frogs both horizontally and vertically inside their cells.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', placeItems: 'center' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n', editorAfter: '}',
    expectedRegex: ['place-items\\s*:\\s*center'], expectedTailwind: ['place-items-center']
  },
  {
    id: 29, mode: 'grid', name: 'Grid 29',
    instructions: 'Align the yellow frog to the end of its grid cell horizontally using `justify-self: end` (or `justify-self-end` in Tailwind).',
    frogs: [GREEN_FROG, YELLOW_FROG, RED_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
    targetItemCSS: { 'y1': { justifySelf: 'end' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['justify-self\\s*:\\s*end'], expectedTailwind: ['justify-self-end'],
    targetSelector: '.yellow'
  },
  {
    id: 30, mode: 'grid', name: 'Grid 30',
    instructions: 'Align the red frog to the center of its grid cell vertically using `align-self: center` (or `self-center` in Tailwind).',
    frogs: [GREEN_FROG, YELLOW_FROG, RED_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
    targetItemCSS: { 'r1': { alignSelf: 'center' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.red {\n', editorAfter: '}',
    expectedRegex: ['align-self\\s*:\\s*center'], expectedTailwind: ['self-center'],
    targetSelector: '.red'
  },
  {
    id: 31, mode: 'grid', name: 'Grid 31',
    instructions: 'Align the green frog to the center of its cell both horizontally and vertically using `place-self: center` (or `place-self-center` in Tailwind).',
    frogs: [GREEN_FROG, YELLOW_FROG, RED_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
    targetItemCSS: { 'g1': { placeSelf: 'center' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.green {\n', editorAfter: '}',
    expectedRegex: ['place-self\\s*:\\s*center'], expectedTailwind: ['place-self-center'],
    targetSelector: '.green'
  },
  {
    id: 32, mode: 'grid', name: 'Grid 32',
    instructions: 'Set the size of implicitly-created rows to 60px using `grid-auto-rows: 60px` (or `auto-rows-[60px]` in Tailwind).',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: '60px' },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n', editorAfter: '}',
    expectedRegex: ['grid-auto-rows\\s*:\\s*60px'], expectedTailwind: ['auto-rows-\\[60px\\]']
  },
  {
    id: 33, mode: 'grid', name: 'Grid 33',
    instructions: 'Use the `minmax()` function to create 3 columns that are at least 100px wide but grow to fill available space (CSS: `grid-template-columns: repeat(3, minmax(100px, 1fr))`, Tailwind: `grid-cols-[repeat(3,minmax(100px,1fr))]`).',
    frogs: THREE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(3,\\s*minmax\\(100px,\\s*1fr\\)\\)'], expectedTailwind: ['grid-cols-\\[repeat\\(3,minmax\\(100px,1fr\\)\\)\\]']
  },
  {
    id: 34, mode: 'grid', name: 'Grid 34',
    instructions: 'Make the yellow frog span 2 columns and 2 rows using `grid-column: span 2` and `grid-row: span 2` (or `col-span-2 row-span-2` in Tailwind).',
    frogs: [YELLOW_FROG],
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' },
    targetItemCSS: { 'y1': { gridColumn: 'span 2 / span 2', gridRow: 'span 2 / span 2' } },
    editorBefore: '#garden {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(4, 1fr);\n}\n\n.yellow {\n', editorAfter: '}',
    expectedRegex: ['grid-column\\s*:\\s*span\\s*2', 'grid-row\\s*:\\s*span\\s*2'], expectedTailwind: ['col-span-2', 'row-span-2'],
    targetSelector: '.yellow'
  },
  {
    id: 35, mode: 'grid', name: 'Grid 35',
    instructions: 'The Final Grid Challenge! Recreate this grid with 4 columns, 4 rows, a gap of 10px, and center the entire grid both horizontally and vertically.',
    frogs: FIVE_MIX,
    targetContainerCSS: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '10px', justifyContent: 'center', alignContent: 'center' },
    editorBefore: '#garden {\n  display: grid;\n', editorAfter: '}',
    expectedRegex: ['grid-template-columns\\s*:\\s*repeat\\(4,\\s*1fr\\)', 'grid-template-rows\\s*:\\s*repeat\\(4,\\s*1fr\\)', 'gap\\s*:\\s*10px', 'justify-content\\s*:\\s*center', 'align-content\\s*:\\s*center'], expectedTailwind: ['grid-cols-4', 'grid-rows-4', 'gap-2.5', 'justify-center', 'content-center']
  }
];
