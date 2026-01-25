
import React from 'react';
import { TileType, Position } from '../types';
import { GRID_SIZE } from '../constants';

interface GameGridProps {
  grid: TileType[][];
  playerPos: Position;
  goalPos: Position;
  rotation: number;
}

const GameGrid: React.FC<GameGridProps> = ({ grid, playerPos, goalPos, rotation }) => {
  return (
    <div 
      className="grid gap-1 bg-slate-800 p-2 rounded-xl border-4 border-slate-700 shadow-2xl"
      style={{ 
        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        aspectRatio: '1/1'
      }}
    >
      {grid.map((row, y) => 
        row.map((tile, x) => {
          const isPlayer = playerPos.x === x && playerPos.y === y;
          const isGoal = goalPos.x === x && goalPos.y === y;
          
          return (
            <div 
              key={`${x}-${y}`} 
              className={`relative w-full h-full rounded-md flex items-center justify-center transition-all duration-300 ${
                tile === TileType.WALL ? 'bg-slate-600 shadow-inner' : 
                'bg-slate-900/50 border border-slate-800/50'
              }`}
            >
              {isGoal && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                   <div className="w-3/5 h-3/5 bg-green-500/30 rounded-full border-2 border-green-400 flex items-center justify-center">
                    <span className="text-xl">🔋</span>
                   </div>
                </div>
              )}
              
              {isPlayer && (
                <div 
                  className="z-10 transition-transform duration-300"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="text-3xl filter drop-shadow-lg">🤖</div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                </div>
              )}

              {tile === TileType.WALL && (
                <span className="text-xl opacity-40">🪨</span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default GameGrid;
