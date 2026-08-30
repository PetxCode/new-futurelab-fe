export interface CageConstraint {
  id: string;
  targetSum: number;
  cells: [number, number][]; // [row, col]
}

export interface CyberGridLevel {
  id: string;
  title: string;
  mode: 'novice' | 'pro' | 'master';
  size: number; // 4, 6, or 9
  boxRows: number;
  boxCols: number;
  initialGrid: (number | null)[][];
  solution: number[][];
  xp: number;
  description: string;
  hint: string;
  cages?: CageConstraint[];
}

export const CYBER_GRID_LEVELS: CyberGridLevel[] = [
  // NOVICE (4x4)
  {
    id: 'cyber-novice-1',
    title: 'Core Initialization',
    mode: 'novice',
    size: 4,
    boxRows: 2,
    boxCols: 2,
    description: 'Stabilize the 4x4 energy grid. Each row, column, and 2x2 quadrant must contain digits 1 through 4 without repeating.',
    hint: 'Look for rows or columns that are missing only a single energy digit!',
    xp: 50,
    initialGrid: [
      [1, null, 3, 4],
      [3, 4, null, 2],
      [2, 1, 4, null],
      [null, 3, 2, 1],
    ],
    solution: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ],
  },
  {
    id: 'cyber-novice-2',
    title: 'Flux Relay',
    mode: 'novice',
    size: 4,
    boxRows: 2,
    boxCols: 2,
    description: 'Fill in the uncalibrated nodes using process of elimination.',
    hint: 'Examine the top-left 2x2 sector: it already has 4 and 3.',
    xp: 65,
    initialGrid: [
      [4, 3, null, 1],
      [null, 1, 4, 3],
      [1, null, 3, 2],
      [3, 2, 1, null],
    ],
    solution: [
      [4, 3, 2, 1],
      [2, 1, 4, 3],
      [1, 4, 3, 2],
      [3, 2, 1, 4],
    ],
  },
  {
    id: 'cyber-novice-3',
    title: 'Quantum Balance',
    mode: 'novice',
    size: 4,
    boxRows: 2,
    boxCols: 2,
    description: 'More nodes are locked offline. Use your logical deduction to restore balance.',
    hint: 'Check Column 1: it has 2 and 4 already placed.',
    xp: 80,
    initialGrid: [
      [2, null, 1, 3],
      [null, 3, 4, null],
      [4, 2, null, 1],
      [3, null, 2, 4],
    ],
    solution: [
      [2, 4, 1, 3],
      [1, 3, 4, 2],
      [4, 2, 3, 1],
      [3, 1, 2, 4],
    ],
  },
  {
    id: 'cyber-novice-4',
    title: 'Plasma Pulse',
    mode: 'novice',
    size: 4,
    boxRows: 2,
    boxCols: 2,
    description: 'A sparse grid requiring multi-step elimination.',
    hint: 'Pencil in candidates for empty cells to narrow down the missing values.',
    xp: 95,
    initialGrid: [
      [3, null, null, 4],
      [null, 4, 3, null],
      [null, 3, 4, null],
      [4, null, null, 3],
    ],
    solution: [
      [3, 1, 2, 4],
      [2, 4, 3, 1],
      [1, 3, 4, 2],
      [4, 2, 1, 3],
    ],
  },
  {
    id: 'cyber-novice-5',
    title: 'Neon Overdrive',
    mode: 'novice',
    size: 4,
    boxRows: 2,
    boxCols: 2,
    description: 'The final test of the Novice tier! Master the 4x4 matrix.',
    hint: 'Row 0 only has 1 and 2 filled in. Where can 4 go?',
    xp: 110,
    initialGrid: [
      [1, null, null, 2],
      [null, 2, 1, null],
      [null, 1, 2, null],
      [2, null, null, 1],
    ],
    solution: [
      [1, 4, 3, 2],
      [3, 2, 1, 4],
      [4, 1, 2, 3],
      [2, 3, 4, 1],
    ],
  },

  // PRO (6x6)
  {
    id: 'cyber-pro-1',
    title: 'Vector Matrix I',
    mode: 'pro',
    size: 6,
    boxRows: 2,
    boxCols: 3,
    description: 'Step up to a 6x6 grid with 2x3 sub-quadrants! Numbers 1 through 6 must occupy every row, column, and box.',
    hint: 'Focus on 2x3 boxes with 4 or more given digits.',
    xp: 130,
    initialGrid: [
      [1, 2, 3, null, 5, 6],
      [4, null, 6, 1, 2, 3],
      [2, 3, null, 5, 6, 4],
      [5, 6, 4, null, 3, 1],
      [3, 1, 2, 6, null, 5],
      [6, 4, 5, 3, 1, null],
    ],
    solution: [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 1, 5, 6, 4],
      [5, 6, 4, 2, 3, 1],
      [3, 1, 2, 6, 4, 5],
      [6, 4, 5, 3, 1, 2],
    ],
  },
  {
    id: 'cyber-pro-2',
    title: 'Vector Matrix II',
    mode: 'pro',
    size: 6,
    boxRows: 2,
    boxCols: 3,
    description: 'A 6x6 challenge requiring systematic cross-referencing between rows and columns.',
    hint: 'Check row 2: numbers 3, 2, 4, 1, 5 are present. Only one digit is missing!',
    xp: 150,
    initialGrid: [
      [6, 4, null, 5, 1, 3],
      [5, 1, 3, null, 2, 4],
      [3, 2, 4, 1, 5, null],
      [null, 5, 6, 2, 4, 3],
      [4, 6, 1, 3, null, 2],
      [2, 3, null, 4, 6, 1],
    ],
    solution: [
      [6, 4, 2, 5, 1, 3],
      [5, 1, 3, 6, 2, 4],
      [3, 2, 4, 1, 5, 6],
      [1, 5, 6, 2, 4, 3],
      [4, 6, 1, 3, 5, 2],
      [2, 3, 5, 4, 6, 1],
    ],
  },
  {
    id: 'cyber-pro-3',
    title: 'Sum Cage Core',
    mode: 'pro',
    size: 6,
    boxRows: 2,
    boxCols: 3,
    description: 'Includes Energy Cages! Cells inside dashed cages must sum to the target value indicated in the top corner.',
    hint: 'For a 2-cell cage summing to 3, the only possible numbers are 1 and 2.',
    xp: 175,
    initialGrid: [
      [null, 2, 3, 4, 5, 6],
      [4, 5, null, 1, 2, 3],
      [2, 3, 1, null, 6, 4],
      [5, 6, 4, 2, null, 1],
      [3, 1, 2, 6, 4, null],
      [6, 4, 5, 3, 1, 2],
    ],
    cages: [
      { id: 'c1', targetSum: 3, cells: [[0, 0], [0, 1]] },
      { id: 'c2', targetSum: 11, cells: [[1, 1], [1, 2]] },
    ],
    solution: [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 1, 5, 6, 4],
      [5, 6, 4, 2, 3, 1],
      [3, 1, 2, 6, 4, 5],
      [6, 4, 5, 3, 1, 2],
    ],
  },

  // MASTER (9x9)
  {
    id: 'cyber-master-1',
    title: 'Neural Core Alpha',
    mode: 'master',
    size: 9,
    boxRows: 3,
    boxCols: 3,
    description: 'The ultimate 9x9 computational thinking challenge. Solve the full matrix with 3x3 sectors.',
    hint: 'Look for digits 1-9 with high frequencies on the board.',
    xp: 220,
    initialGrid: [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9],
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  },
  {
    id: 'cyber-master-2',
    title: 'Quantum Synapse',
    mode: 'master',
    size: 9,
    boxRows: 3,
    boxCols: 3,
    description: 'Advanced 9x9 logic matrix. Use candidate notes to narrow down possibilities.',
    hint: 'Use the Pencil tool to mark candidates when a cell has 2 potential options.',
    xp: 250,
    initialGrid: [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 3, 7, 4, 1, 9],
      [1, 9, null, 8, 4, 1, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 4, 3, 7],
      [3, 7, 4, 6, 8, 2, 9, 5, 1],
      [9, 1, 5, 7, 4, 3, 6, 2, 8],
      [5, 6, 9, 3, 2, 1, 8, 7, 4],
      [4, 1, 8, 5, 7, 9, 2, 3, 6],
      [7, 5, 3, 4, 1, 8, 1, 9, null],
    ],
    solution: [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 3, 7, 4, 1, 9],
      [1, 9, 7, 8, 4, 1, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 4, 3, 7],
      [3, 7, 4, 6, 8, 2, 9, 5, 1],
      [9, 1, 5, 7, 4, 3, 6, 2, 8],
      [5, 6, 9, 3, 2, 1, 8, 7, 4],
      [4, 1, 8, 5, 7, 9, 2, 3, 6],
      [7, 5, 3, 4, 1, 8, 1, 9, 5],
    ],
  },
];
