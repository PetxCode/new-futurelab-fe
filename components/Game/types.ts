
export type Position = {
  x: number;
  y: number;
};

export enum TileType {
  EMPTY = 'EMPTY',
  WALL = 'WALL',
  GOAL = 'GOAL',
  PLAYER = 'PLAYER',
  COLLECTIBLE = 'COLLECTIBLE',
  LAVA = 'LAVA'
}

export type LevelType = 'GRID' | 'CONSOLE';

export interface BaseLevel {
  id: number;
  title: string;
  description: string;
  instruction: string;
  initialCode: string;
  concepts: string[];
  type: LevelType;
}

export interface GridLevel extends BaseLevel {
  type: 'GRID';
  grid: TileType[][];
  startPos: Position;
  goalPos: Position;
}

export interface ConsoleLevel extends BaseLevel {
  type: 'CONSOLE';
  expectedOutput?: string;
  validationRegex?: RegExp;
  hint?: string;
  // Optional: multiple choice quiz? valid validation function?
  // For now, simple output matching is enough for "Hello World"
}

export type Level = GridLevel | ConsoleLevel;

export interface GameState {
  currentLevelIndex: number;
  playerPos: Position;
  isExecuting: boolean;
  history: string[];
  robotRotation: number;
  inventory: string[];
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
}

export interface MentorFeedback {
  message: string;
  type: 'info' | 'error' | 'success';
}
