
export interface NanoLevel {
  id: number;
  title: string;
  description: string;
  gridSize: [number, number]; // [width, height]
  startPos: [number, number];
  startDir: 'up' | 'down' | 'left' | 'right';
  targetPos: [number, number][];
  obstacles: [number, number][];
  maxLines: number; // For 3 stars
  concept: string;
}

export const NANO_LEVELS: NanoLevel[] = [
  // --- PHASE 1: SEQUENCING & FOUNDATIONS (1-10) ---
  {
    id: 1,
    title: "The First Step",
    description: "Initialize movement. Use `move()` to reach the logic core.",
    gridSize: [8, 8],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[4, 1]],
    obstacles: [],
    maxLines: 1,
    concept: "Functions"
  },
  {
    id: 2,
    title: "Right Angle Turn",
    description: "The path pivots. `turnRight()` to follow the signal.",
    gridSize: [8, 8],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[4, 4]],
    obstacles: [[3, 1], [3, 2], [3, 3]],
    maxLines: 4,
    concept: "Turning"
  },
  {
    id: 3,
    title: "Double Pivot",
    description: "Navigate the data corridors. Precise turning required.",
    gridSize: [8, 8],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[5, 4]],
    obstacles: [[5, 1], [5, 2], [5, 3], [1, 4], [2, 4], [3, 4]],
    maxLines: 6,
    concept: "Navigation"
  },
  {
    id: 4,
    title: "Corridors",
    description: "Reach the target at the end of the maintenance shaft.",
    gridSize: [8, 8],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[6, 6]],
    obstacles: [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]],
    maxLines: 8,
    concept: "Spatial Logic"
  },
  {
    id: 5,
    title: "Target Array",
    description: "Capture all 3 sequence beacons.",
    gridSize: [8, 8],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[3, 1], [5, 1], [7, 1]],
    obstacles: [],
    maxLines: 5,
    concept: "Multi-Target"
  },
  {
    id: 6,
    title: "The Square Path",
    description: "Complete a full perimeter scan.",
    gridSize: [8, 8],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[6, 1], [6, 6], [1, 6]],
    obstacles: [],
    maxLines: 8,
    concept: "Sequence"
  },
  {
    id: 7,
    title: "Dodge & Weave",
    description: "Obstacles are in your path. Find a way through.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[8, 8]],
    obstacles: [[4,1], [4,2], [4,3], [4,4], [4,5], [4,6], [4,7], [4,9], [6,0], [6,1], [6,2], [6,3], [6,5], [6,6], [6,7], [6,8]],
    maxLines: 10,
    concept: "Navigation"
  },
  {
    id: 8,
    title: "Data Clusters",
    description: "Collect data from both corners of the server.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[8, 1], [1, 8]],
    obstacles: [[5,5]],
    maxLines: 8,
    concept: "Planning"
  },
  {
    id: 9,
    title: "Precision Docking",
    description: "Move exactly to the docking station.",
    gridSize: [10, 10],
    startPos: [5, 5],
    startDir: 'right',
    targetPos: [[8, 2]],
    obstacles: [[7,3], [8,3], [9,3], [6,2], [6,1], [7,1], [8,1], [9,1]],
    maxLines: 6,
    concept: "Coordinates"
  },
  {
    id: 10,
    title: "The Firewall Maze",
    description: "A small maze to test your basic navigation skills.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[8, 8]],
    obstacles: [[3,0], [3,1], [3,2], [3,4], [3,5], [3,6], [3,7], [3,8], [3,9], [6,0], [6,1], [6,2], [6,3], [6,5], [6,6], [6,7], [6,8], [6,9]],
    maxLines: 15,
    concept: "Sequence"
  },

  // --- PHASE 2: BASIC LOOPS (11-20) ---
  {
    id: 11,
    title: "Linear Loop",
    description: "The data packets are far. Use `repeat n { ... }` to save space!",
    gridSize: [12, 12],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[10, 1]],
    obstacles: [],
    maxLines: 2,
    concept: "Loops"
  },
  {
    id: 12,
    title: "The Rectangle",
    description: "Sweep the perimeter of the rectangle.",
    gridSize: [12, 12],
    startPos: [2, 2],
    startDir: 'right',
    targetPos: [[8, 2], [8, 6], [2, 6]],
    obstacles: [],
    maxLines: 4,
    concept: "Loops"
  },
  {
    id: 13,
    title: "The Staircase",
    description: "Ascend the data steps. Identify the repeating pattern.",
    gridSize: [10, 10],
    startPos: [1, 8],
    startDir: 'up',
    targetPos: [[7, 2]],
    obstacles: [],
    maxLines: 4,
    concept: "Patterns"
  },
  {
    id: 14,
    title: "Zig-Zag Drill",
    description: "Alternate moves to dodge static fields.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[9, 9]],
    obstacles: [[3,1], [4,1], [5,1], [1,3], [1,4], [1,5]],
    maxLines: 5,
    concept: "Advanced Loops"
  },
  {
    id: 15,
    title: "Multi-Staircase",
    description: "A longer staircase requires a bigger loop.",
    gridSize: [15, 15],
    startPos: [1, 13],
    startDir: 'up',
    targetPos: [[11, 3]],
    obstacles: [],
    maxLines: 4,
    concept: "Loops"
  },
  {
    id: 16,
    title: "Scanning Beams",
    description: "Collect items in a row using a loop.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]],
    obstacles: [],
    maxLines: 2,
    concept: "Efficiency"
  },
  {
    id: 17,
    title: "Perimeter Patrol",
    description: "Go around the entire grid boundary.",
    gridSize: [10, 10],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[9,0],[9,9],[0,9]],
    obstacles: [],
    maxLines: 4,
    concept: "Loops"
  },
  {
    id: 18,
    title: "The Spiral Step",
    description: "Move in a shrinking spiral pattern.",
    gridSize: [10, 10],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[9,0],[9,9],[0,9],[0,1],[8,1]],
    obstacles: [],
    maxLines: 10,
    concept: "Sequence"
  },
  {
    id: 19,
    title: "Column Swap",
    description: "Move across columns to collect data.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[2,1],[2,8],[3,8],[3,1],[4,1]],
    obstacles: [],
    maxLines: 8,
    concept: "Patterns"
  },
  {
    id: 20,
    title: "Loop Mastery",
    description: "Collect items at regular intervals.",
    gridSize: [20, 20],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[4,1],[7,1],[10,1],[13,1],[16,1]],
    obstacles: [],
    maxLines: 2,
    concept: "Step Loops"
  },

  // --- PHASE 3: NESTED LOOPS & PATTERNS (21-30) ---
  {
    id: 21,
    title: "Grid Sweep",
    description: "Clear a large area. Efficient looping is key.",
    gridSize: [15, 15],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[14, 14]],
    obstacles: [],
    maxLines: 6,
    concept: "Nested Logic"
  },
  {
    id: 22,
    title: "Iterative Grid",
    description: "Can you sweep 20 targets with a single loop block?",
    gridSize: [10, 10],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[1,0], [2,0], [3,0], [4,0], [5,0]],
    obstacles: [],
    maxLines: 3,
    concept: "Loop Invariants"
  },
  {
    id: 23,
    title: "The Helix",
    description: "Spiral inwards to the terminal hub.",
    gridSize: [10, 10],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[5, 5]],
    obstacles: [],
    maxLines: 5,
    concept: "Nested Loops"
  },
  {
    id: 24,
    title: "Checkerboard Scan",
    description: "Collect items in a checkerboard pattern.",
    gridSize: [8, 8],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[2,0],[4,0],[6,0],[1,1],[3,1],[5,1],[7,1]],
    obstacles: [],
    maxLines: 8,
    concept: "Nested Patterns"
  },
  {
    id: 25,
    title: "Snake Mission",
    description: "Move back and forth to cover the grid.",
    gridSize: [8, 8],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[7,0],[7,1],[0,1],[0,2],[7,2]],
    obstacles: [],
    maxLines: 6,
    concept: "Nested Loops"
  },
  {
    id: 26,
    title: "Diamond Perimeter",
    description: "Follow the diamond path.",
    gridSize: [10, 10],
    startPos: [5, 1],
    startDir: 'right',
    targetPos: [[9,5],[5,9],[1,5]],
    obstacles: [],
    maxLines: 4,
    concept: "Repeating Angles"
  },
  {
    id: 27,
    title: "Layered Firewall",
    description: "Navigate through concentric rectangles.",
    gridSize: [12, 12],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[11,0],[11,11],[0,11],[0,2],[9,2],[9,9],[2,9]],
    obstacles: [],
    maxLines: 12,
    concept: "Spatial Reasoning"
  },
  {
    id: 28,
    title: "Cross Scan",
    description: "Collect items in a cross shape.",
    gridSize: [11, 11],
    startPos: [5, 0],
    startDir: 'down',
    targetPos: [[5,10],[0,5],[10,5]],
    obstacles: [],
    maxLines: 8,
    concept: "Navigation"
  },
  {
    id: 29,
    title: "Recursive Descent",
    description: "Descend the levels. Precision is mandatory.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'down',
    targetPos: [[8, 8]],
    obstacles: [[2,2], [3,3], [4,4], [5,5], [6,6], [7,7]],
    maxLines: 4,
    concept: "Patterns"
  },
  {
    id: 30,
    title: "The Weave",
    description: "Navigate through a dense grid of obstacles.",
    gridSize: [10, 10],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[9, 9]],
    obstacles: [[1,1],[1,3],[1,5],[1,7],[1,9],[3,1],[3,3],[3,5],[3,7],[3,9],[5,1],[5,3],[5,5],[5,7],[5,9],[7,1],[7,3],[7,5],[7,7],[7,9]],
    maxLines: 10,
    concept: "Navigation"
  },

  // --- PHASE 4: SENSORS & CONDITIONALS (31-40) ---
  {
    id: 31,
    title: "Sensor Test",
    description: "Move until you sense an obstacle, then turn.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[1, 5]],
    obstacles: [[8, 1], [8, 2], [8, 3], [8, 4], [8, 5]],
    maxLines: 4,
    concept: "Conditionals"
  },
  {
    id: 32,
    title: "Smart Path",
    description: "Capture the target ONLY if the path is clear.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[5, 1]],
    obstacles: [[4, 2], [6, 2]],
    maxLines: 5,
    concept: "Boolean Logic"
  },
  {
    id: 33,
    title: "The Maze Runner",
    description: "Use conditions to navigate this simple maze.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[9, 9]],
    obstacles: [[5,0], [5,1], [5,2], [5,3], [5,4], [5,6], [5,7], [5,8], [5,9]],
    maxLines: 8,
    concept: "Obstacle Detection"
  },
  {
    id: 34,
    title: "Selective Rescue",
    description: "Gather beacons, but stay clear of the red zones.",
    gridSize: [10, 10],
    startPos: [1, 5],
    startDir: 'right',
    targetPos: [[5, 5], [9, 5]],
    obstacles: [[2, 4], [2, 6], [8, 4], [8, 6]],
    maxLines: 6,
    concept: "Decision Making"
  },
  {
    id: 35,
    title: "Corner Logic",
    description: "Turn if you hit a corner.",
    gridSize: [10, 10],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[9, 9]],
    obstacles: [[9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8]],
    maxLines: 10,
    concept: "Conditionals"
  },
  {
    id: 36,
    title: "Dynamic Firewall",
    description: "Sensors will tell you where to go.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[8, 1]],
    obstacles: [[5, 1], [5, 2], [5, 0]],
    maxLines: 6,
    concept: "Logic Gates"
  },
  {
    id: 37,
    title: "The Corridor Sensor",
    description: "Move through a narrowing corridor.",
    gridSize: [10, 10],
    startPos: [0, 5],
    startDir: 'right',
    targetPos: [[9, 5]],
    obstacles: [[1,4],[1,6],[2,4],[2,6],[3,4],[3,6],[4,4],[4,6],[5,4],[5,6],[6,3],[6,7],[7,3],[7,7]],
    maxLines: 5,
    concept: "Sensors"
  },
  {
    id: 38,
    title: "Conditional Turn",
    description: "Turn only if a wall is ahead.",
    gridSize: [10, 10],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[0, 5]],
    obstacles: [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5]],
    maxLines: 10,
    concept: "Conditionals"
  },
  {
    id: 39,
    title: "Multi-Sensor Logic",
    description: "Check for walls in multiple directions.",
    gridSize: [10, 10],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[8, 8]],
    obstacles: [[5,5]],
    maxLines: 15,
    concept: "Logic"
  },
  {
    id: 40,
    title: "Core Access",
    description: "Final logic test before the grand challenge.",
    gridSize: [12, 12],
    startPos: [1, 11],
    startDir: 'right',
    targetPos: [[11, 1]],
    obstacles: [[4,4], [4,5], [4,6], [7,4], [7,5], [7,6]],
    maxLines: 12,
    concept: "Decision Making"
  },

  // --- PHASE 5: THE GRAND CHALLENGE (41-50) ---
  {
    id: 41,
    title: "Algorithm Mastery",
    description: "Solve a complex target array with minimal code.",
    gridSize: [15, 15],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[5,5],[10,10],[5,10],[10,5]],
    obstacles: [],
    maxLines: 10,
    concept: "Algorithms"
  },
  {
    id: 42,
    title: "The Great Wall",
    description: "Navigate around a massive firewall.",
    gridSize: [20, 20],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[19, 19]],
    obstacles: Array.from({length: 18}, (_, i) => [10, i] as [number, number]),
    maxLines: 10,
    concept: "Pathfinding"
  },
  {
    id: 43,
    title: "Recursive Maze",
    description: "A maze with repeating patterns.",
    gridSize: [15, 15],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[13, 13]],
    obstacles: [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,8],[3,9],[3,10]],
    maxLines: 15,
    concept: "Logic"
  },
  {
    id: 44,
    title: "The Synchronized Array",
    description: "Collect items that are perfectly aligned.",
    gridSize: [15, 15],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[2,2],[4,4],[6,6],[8,8],[10,10],[12,12]],
    obstacles: [],
    maxLines: 4,
    concept: "Loops"
  },
  {
    id: 45,
    title: "Constraint Logic",
    description: "Move within a very narrow path.",
    gridSize: [12, 12],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[10, 10]],
    obstacles: Array.from({length: 12}, (_, i) => [i, 0] as [number, number]),
    maxLines: 20,
    concept: "Spatial Awareness"
  },
  {
    id: 46,
    title: "Optimized Path",
    description: "Find the shortest path to collect 5 items.",
    gridSize: [12, 12],
    startPos: [6, 6],
    startDir: 'right',
    targetPos: [[1,1],[1,11],[11,1],[11,11],[6,6]],
    obstacles: [],
    maxLines: 15,
    concept: "Optimization"
  },
  {
    id: 47,
    title: "The Logic Labyrinth",
    description: "A labyrinth where every turn depends on a sensor.",
    gridSize: [15, 15],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[14, 14]],
    obstacles: [[7,7],[7,8],[8,7],[8,8]],
    maxLines: 25,
    concept: "Advanced Logic"
  },
  {
    id: 48,
    title: "Loop Invariants",
    description: "Use a loop that maintains a specific state.",
    gridSize: [15, 15],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[13, 1]],
    obstacles: [],
    maxLines: 3,
    concept: "Loops"
  },
  {
    id: 49,
    title: "The Helix Master",
    description: "A giant helix covering the entire grid.",
    gridSize: [20, 20],
    startPos: [0, 0],
    startDir: 'right',
    targetPos: [[10, 10]],
    obstacles: [],
    maxLines: 40,
    concept: "Nested Loops"
  },
  {
    id: 50,
    title: "Final Retrieval",
    description: "The ultimate test of functions, loops, and logic.",
    gridSize: [25, 25],
    startPos: [1, 1],
    startDir: 'right',
    targetPos: [[23, 23], [23, 1], [1, 23], [12, 12]],
    obstacles: [[12,11], [11,12], [13,12], [12,13]],
    maxLines: 30,
    concept: "Algorithm Design"
  }
];
