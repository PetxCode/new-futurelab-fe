
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

export interface Level {
  id: number;
  title: string;
  description: string;
  instruction: string;
  grid: TileType[][];
  startPos: Position;
  goalPos: Position;
  initialCode: string;
  concepts: string[];
}

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
