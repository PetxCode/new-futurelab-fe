
import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

// --- MAZE LEVEL DATA ---

const LEVELS = [
    {
        id: 1,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 3, dir: 1 },
        goal: { x: 3, y: 3 },
        blocks: ['maze_moveForward'],
        maxBlocks: 3,
    },
    {
        id: 2,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 3, dir: 1 },
        goal: { x: 5, y: 2 },
        blocks: ['maze_moveForward', 'maze_turn'],
        maxBlocks: 6,
    },
    {
        id: 3,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 3, dir: 1 },
        goal: { x: 6, y: 3 },
        blocks: ['maze_moveForward', 'maze_repeatUntil'],
        maxBlocks: 2,
    },
    {
        id: 4,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 4, dir: 1 },
        goal: { x: 5, y: 2 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil'],
        maxBlocks: 5,
    },
    {
        id: 5,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 4, dir: 1 },
        goal: { x: 5, y: 1 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil'],
        maxBlocks: 5,
    },
    {
        id: 6,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 5, dir: 1 },
        goal: { x: 1, y: 1 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 5,
    },
    {
        id: 7,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 5, dir: 1 },
        goal: { x: 1, y: 1 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 5,
    },
    {
        id: 8,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 5, dir: 1 },
        goal: { x: 1, y: 1 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
    },
    {
        id: 9,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
            [1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 2, y: 2, dir: 2 },
        goal: { x: 8, y: 8 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
    },
    {
        id: 10,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 8, y: 7 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
    },
    {
        id: 11,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 8, y: 8 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 4,
    },
    {
        id: 12,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 1, y: 7 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 5,
    },
    {
        id: 13,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 2 },
        goal: { x: 8, y: 8 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 6,
    },
    {
        id: 14,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 2 },
        goal: { x: 1, y: 7 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
    },
    {
        id: 15,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 8, y: 1, dir: 3 },
        goal: { x: 1, y: 7 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 8,
    }
];

// --- BLOCKLY BLOCKS & GENERATORS ---

const defineMazeBlocks = () => {
    if (Blockly.Blocks['maze_moveForward']) return;

    Blockly.Blocks['maze_moveForward'] = {
        init: function() {
            this.appendDummyInput().appendField("move forward");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
        }
    };
    Blockly.Blocks['maze_turn'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("turn")
                .appendField(new Blockly.FieldDropdown([["left ↺", "LEFT"], ["right ↻", "RIGHT"]]), "DIR");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
        }
    };
    Blockly.Blocks['maze_repeatUntil'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("repeat until")
                .appendField(new Blockly.FieldImage("https://blockly.games/maze/marker.png", 12, 16));
            this.appendStatementInput("DO").appendField("do");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };
    Blockly.Blocks['maze_ifPath'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("if path")
                .appendField(new Blockly.FieldDropdown([["ahead", "FORWARD"], ["to the left ↺", "LEFT"], ["to the right ↻", "RIGHT"]]), "DIR");
            this.appendStatementInput("DO").appendField("do");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(210);
        }
    };
};

const defineMazeGenerators = () => {
    javascriptGenerator.forBlock['maze_moveForward'] = () => `game.moveForward();\n`;
    javascriptGenerator.forBlock['maze_turn'] = (block: any) => {
        const dir = block.getFieldValue('DIR');
        return `game.turn('${dir}');\n`;
    };
    javascriptGenerator.forBlock['maze_repeatUntil'] = (block: any) => {
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `while (game.notFinished()) {\n${branch}}\n`;
    };
    javascriptGenerator.forBlock['maze_ifPath'] = (block: any) => {
        const dir = block.getFieldValue('DIR');
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `if (game.isPath('${dir}')) {\n${branch}}\n`;
    };
};

// --- MAIN COMPONENT ---

const BlockCodingEngine: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'IDLE' | 'RUNNING' | 'DONE'>('IDLE');
    const [blocksUsed, setBlocksUsed] = useState(0);
    const [currentLevelId, setCurrentLevelId] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const currentLevel = LEVELS.find(l => l.id === currentLevelId) || LEVELS[0];

    // Animation State
    const actorRef = useRef({ ...currentLevel.start });
    const commandQueueRef = useRef<any[]>([]);

    useEffect(() => {
        if (!blocklyDivRef.current) return;
        
        defineMazeBlocks();
        defineMazeGenerators();
        
        const updateToolbox = () => {
            const toolbox = {
                kind: 'flyoutToolbox',
                contents: currentLevel.blocks.map(type => ({ kind: 'block', type }))
            };
            workspaceRef.current?.updateToolbox(toolbox);
        };

        if (!workspaceRef.current) {
            workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
                toolbox: { kind: 'flyoutToolbox', contents: [] },
                scrollbars: true,
                theme: Blockly.Themes.Classic,
                trashcan: true,
                renderer: 'zelos',
                zoom: { startScale: 0.85, controls: true, wheel: true }
            });

            workspaceRef.current.addChangeListener(() => {
                setBlocksUsed(workspaceRef.current!.getAllBlocks(false).length);
            });
        }

        const handleResize = () => {
            if (workspaceRef.current) {
                Blockly.svgResize(workspaceRef.current);
            }
        };

        window.addEventListener('resize', handleResize);
        // Force an initial resize after a short delay to solve the visibility issue
        const timer = setTimeout(handleResize, 100);

        updateToolbox();
        reset();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, [currentLevelId]);
    
    // Additional effect to catch transitions
    useEffect(() => {
        const timer = setTimeout(() => {
            if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const getGameProxy = (queue: any[], state: any) => {
        let shadowX = state.x;
        let shadowY = state.y;
        let shadowDir = state.dir;
        let counter = 0;

        return {
            moveForward: () => {
                if (counter++ > 1000) return;
                const dx = [0, 1, 0, -1][shadowDir];
                const dy = [-1, 0, 1, 0][shadowDir];
                if (currentLevel.map[shadowY + dy]?.[shadowX + dx] === 0) {
                    shadowX += dx;
                    shadowY += dy;
                }
                queue.push({ type: 'MOVE', x: shadowX, y: shadowY, dir: shadowDir });
            },
            turn: (side: 'LEFT' | 'RIGHT') => {
                if (counter++ > 1000) return;
                shadowDir = side === 'LEFT' ? (shadowDir + 3) % 4 : (shadowDir + 1) % 4;
                queue.push({ type: 'TURN', x: shadowX, y: shadowY, dir: shadowDir });
            },
            notFinished: () => {
                return (shadowX !== currentLevel.goal.x || shadowY !== currentLevel.goal.y) && counter < 1000;
            },
            isPath: (dir: string) => {
                let testDir = shadowDir;
                if (dir === 'LEFT') testDir = (shadowDir + 3) % 4;
                if (dir === 'RIGHT') testDir = (shadowDir + 1) % 4;
                const dx = [0, 1, 0, -1][testDir];
                const dy = [-1, 0, 1, 0][testDir];
                return currentLevel.map[shadowY + dy]?.[shadowX + dx] === 0;
            }
        };
    };

    const runProgram = () => {
        if (!workspaceRef.current || isAnimating) return;

        if (blocksUsed > currentLevel.maxBlocks) {
            toast.error(`Too many blocks! Max allowed: ${currentLevel.maxBlocks}`);
            return;
        }
        
        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        const queue: any[] = [];
        const proxy = getGameProxy(queue, { ...currentLevel.start });
        
        try {
            new Function('game', code)(proxy);
            commandQueueRef.current = queue;
            setIsAnimating(true);
            executeNextCommand();
        } catch (e) {
            console.error('Program Error:', e);
            toast.error("Error in your logic!");
        }
    };

    const executeNextCommand = () => {
        if (commandQueueRef.current.length === 0) {
            setGameState('DONE');
            setIsAnimating(false);
            if (actorRef.current.x === currentLevel.goal.x && actorRef.current.y === currentLevel.goal.y) {
                toast.success(`Level ${currentLevelId} Complete!`);
                
                // Log to backend
                try {
                  fetch(`${API_BASE_URL}/api/analytics/log`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-auth-token': localStorage.getItem('token') || '',
                    },
                    body: JSON.stringify({
                      type: 'game',
                      title: `Maze Navigator: Level ${currentLevelId}`,
                      category: 'Robotics',
                      points: 1,
                      score: 100
                    }),
                  });
                } catch (err) {
                  console.error('Error logging maze activity:', err);
                }

                if (currentLevelId < 15) {
                    setTimeout(() => setCurrentLevelId(id => id + 1), 1500);
                }
            }
            return;
        }

        setGameState('RUNNING');
        const cmd = commandQueueRef.current.shift();
        actorRef.current = { x: cmd.x, y: cmd.y, dir: cmd.dir };
        setTimeout(executeNextCommand, 250);
    };

    const reset = () => {
        actorRef.current = { ...currentLevel.start };
        setGameState('IDLE');
        commandQueueRef.current = [];
        setIsAnimating(false);
    };

    // Rendering Logic
    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const gridSize = currentLevel.map.length;
            const tileSize = canvas.width / gridSize;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Tiles
            currentLevel.map.forEach((row, y) => {
                row.forEach((tile, x) => {
                    ctx.fillStyle = tile === 1 ? '#334155' : '#1e293b';
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                    ctx.strokeStyle = '#475569';
                    ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
                });
            });

            // Goal
            const gx = currentLevel.goal.x * tileSize + tileSize/2;
            const gy = currentLevel.goal.y * tileSize + tileSize/2;
            
            // Marker Icon
            const markerImg = new Image();
            markerImg.src = "https://blockly.games/maze/marker.png";
            if (markerImg.complete) {
                ctx.drawImage(markerImg, gx - 10, gy - 16, 20, 26);
            } else {
                ctx.fillStyle = '#d9534f';
                ctx.beginPath(); ctx.arc(gx, gy, 8, 0, Math.PI*2); ctx.fill();
            }

            // Actor
            const ax = actorRef.current.x * tileSize + tileSize/2;
            const ay = actorRef.current.y * tileSize + tileSize/2;
            ctx.save();
            ctx.translate(ax, ay);
            ctx.rotate((actorRef.current.dir * 90) * (Math.PI / 180));
            // Actor - Blue Ball (Premium Look)
            const ballGradient = ctx.createRadialGradient(-3, -3, 2, 0, 0, 10);
            ballGradient.addColorStop(0, '#818cf8');
            ballGradient.addColorStop(1, '#4f46e5');
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(79, 70, 229, 0.5)';
            ctx.fillStyle = ballGradient;
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0; // Reset shadow
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Eye/Direction Indicator
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(6, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            requestAnimationFrame(render);
        };
        render();
    }, [currentLevelId]);

    return (
        <div className="flex flex-col h-full w-full bg-slate-900 text-white font-inter overflow-hidden border-t border-slate-800">
            {/* Nav Header */}
            <div className="flex flex-col md:flex-row bg-slate-900 min-h-[56px] items-center px-6 border-b border-slate-800 py-3 md:py-0">
                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 21l-8-4.5v-9L12 3l8 4.5v9z" /></svg>
                    </div>
                    <span className="text-white font-black uppercase tracking-tighter italic">Maze Navigator</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-1.5 mx-2 md:mx-10">
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(id => (
                        <button 
                            key={id} 
                            onClick={() => setCurrentLevelId(id)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                                currentLevelId === id 
                                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                                    : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300'
                            }`}
                        >
                            {id}
                        </button>
                    ))}
                </div>

                <div className="flex-1 hidden md:block" />
                <select className="bg-slate-800 text-[10px] font-black border border-slate-700 rounded-lg px-2 outline-none h-7 text-slate-300 uppercase tracking-widest">
                    <option>English (US)</option>
                </select>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden relative">
                {/* Game Side */}
                <div className="w-full lg:w-[400px] bg-slate-950/50 backdrop-blur-xl flex flex-col items-center p-6 border-b lg:border-b-0 lg:border-r border-slate-800 shrink-0">
                    <div className="w-full max-w-[320px] aspect-square bg-slate-900 border-4 border-slate-800 relative rounded-3xl shadow-2xl mb-8 overflow-hidden shadow-indigo-500/5">
                        <canvas ref={canvasRef} width={320} height={320} className="w-full h-full" />
                    </div>

                    <div className="flex flex-col space-y-3 w-full max-w-[320px]">
                        <button 
                            onClick={runProgram}
                            disabled={isAnimating}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-50 uppercase tracking-tight italic"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            <span>Run Program</span>
                        </button>
                        <button onClick={reset} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-colors">
                            Reset Level
                        </button>
                    </div>

                    <div className="mt-8 p-4 bg-slate-900/50 rounded-2xl border border-slate-800 w-full max-w-[320px]">
                        <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Efficiency Goal</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">Blocks Used</span>
                            <span className={`text-xs font-black ${blocksUsed > currentLevel.maxBlocks ? 'text-red-500' : 'text-indigo-400'}`}>
                                {blocksUsed} / {currentLevel.maxBlocks}
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-300 ${blocksUsed > currentLevel.maxBlocks ? 'bg-red-500' : 'bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]'}`} 
                                style={{ width: `${Math.min(100, (blocksUsed / currentLevel.maxBlocks) * 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Unified Coding Area */}
                <div className="flex-1 flex flex-col bg-slate-950 min-h-[500px] lg:min-h-0 border-l border-slate-800">
                    <div className="h-10 flex bg-slate-900 border-b border-slate-800 shrink-0">
                        <div className="w-[180px] lg:w-[220px] px-4 flex items-center border-r border-slate-800">
                            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Block Library</span>
                        </div>
                        <div className="flex-1 px-4 flex items-center justify-between">
                            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Main Workspace</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Live Engine</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1" ref={blocklyDivRef} id="blocklyDiv2" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .blocklyToolboxDiv { display: none !important; }
                .blocklyFlyout { width: 220px !important; }
                .blocklyFlyoutBackground { fill: #0f172a !important; fill-opacity: 0.95 !important; }
                .blocklyMainBackground { stroke: none !important; }
                .blocklyPath { stroke-width: 2px !important; }
                .blocklyWorkspace { background: #0f172a !important; }
                .blocklySvg { background: #0f172a !important; }
                .blocklyText { font-family: 'Inter', sans-serif !important; font-weight: 700 !important; }
                .blocklyScrollbarHandle { fill: #334155 !important; }
            `}} />
        </div>
    );
};

export default BlockCodingEngine;
