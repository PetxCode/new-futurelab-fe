
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
        maxBlocks: 5,
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
        maxBlocks: 10,
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
        maxBlocks: 5,
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
            const theme = Blockly.Theme.defineTheme('maze_theme', {
                name: 'maze_theme',
                base: Blockly.Themes.Classic,
                componentStyles: {
                    workspaceBackgroundColour: '#ffffff',
                    toolboxBackgroundColour: '#ddd',
                    flyoutBackgroundColour: '#ddd',
                }
            });

            workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
                toolbox: { kind: 'flyoutToolbox', contents: [] },
                scrollbars: true,
                theme: theme,
                trashcan: true,
                zoom: { startScale: 1.0 }
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

        updateToolbox();
        reset();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentLevelId]);

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
                      points: 100,
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
                    ctx.fillStyle = tile === 1 ? '#e1e1e1' : '#fff';
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                    ctx.strokeStyle = '#ccc';
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
            ballGradient.addColorStop(0, '#6ea1f7');
            ballGradient.addColorStop(1, '#4285f4');
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(66, 133, 244, 0.5)';
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
        <div className="flex flex-col h-[calc(100vh-76px)] rounded-lg bg-white text-black font-sans overflow-hidden pt-14">
            {/* Nav Header - Responsive wrapping for levels */}
            <div className="flex flex-col md:flex-row bg-white min-h-12 items-center px-4 border-b border-gray-300 py-2 md:py-0">
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                    <span className="text-blue-600 font-bold text-sm">Navigator</span>
                    <span className="text-gray-400">:</span>
                    <span className="text-gray-800 font-bold text-sm">Maze</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-1 mx-2 md:mx-6">
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(id => (
                        <div 
                            key={id} 
                            onClick={() => setCurrentLevelId(id)}
                            className={`w-6 h-6 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all ${
                                currentLevelId === id ? 'bg-indigo-600 text-white scale-110 shadow-md' : 'border border-gray-300 text-gray-400 hover:bg-gray-50'
                            }`}
                        >
                            {id}
                        </div>
                    ))}
                </div>

                <div className="flex-1 hidden md:block" />

                <div className="flex items-center justify-between w-full md:w-auto mt-2 md:mt-0">
                    <div className="flex flex-col items-end mr-4">
                        <div className={`transition-all duration-300 ${blocksUsed > currentLevel.maxBlocks ? 'text-red-600 text-sm font-extrabold animate-bounce' : 'text-gray-500 text-[11px] font-bold'}`}>
                            {blocksUsed}/{currentLevel.maxBlocks} blocks
                        </div>
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-0.5 overflow-hidden border border-gray-300">
                            <div 
                                className={`h-full transition-all duration-300 ${blocksUsed > currentLevel.maxBlocks ? 'bg-red-500' : 'bg-green-500'}`} 
                                style={{ width: `${Math.min(100, (blocksUsed / currentLevel.maxBlocks) * 100)}%` }}
                            />
                        </div>
                    </div>
                    <select className="bg-transparent text-[11px] font-bold border border-gray-300 rounded px-1 outline-none h-6"><option>English</option></select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden relative">
                {/* Game Side - Full width on mobile, fixed on desktop */}
                <div className="w-full lg:w-[340px] bg-[#f8f9fa] flex flex-col items-center p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-300 shrink-0">
                    <div className="w-full max-w-[300px] aspect-square bg-gray-200 border border-gray-400 relative rounded-sm shadow-inner mb-4 lg:mb-8 overflow-hidden">
                        <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
                    </div>

                    <div className="flex space-x-2 w-full max-w-[300px]">
                        <button 
                            onClick={runProgram}
                            disabled={isAnimating}
                            className="flex-1 py-3 bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold text-sm rounded border border-gray-600 shadow-sm active:translate-y-px transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            <span>Run Program</span>
                        </button>
                        <button onClick={reset} className="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-sm rounded border border-gray-400 shadow-sm">
                            Reset
                        </button>
                    </div>
                </div>

                {/* Blocks Palette - Collapsible or shorter on mobile */}
                <div className="w-full lg:w-[180px] h-[250px] lg:h-full bg-[#ddd] border-b lg:border-b-0 lg:border-r border-[#bebebe] flex flex-col shrink-0">
                     <div className="bg-[#2c3333] h-10 flex items-center justify-center"><span className="text-white text-[10px] font-bold uppercase tracking-widest text-center">Blocks</span>
                     
                     </div>
                     <div className="flex-1 relative" id="blocksArea" />
                </div>

                {/* Workspace - Takes remaining space */}
                <div className="flex-1 relative flex flex-col bg-white min-h-[400px] lg:min-h-0">
                    <div className="bg-[#2c3333] h-10 flex items-center justify-center"><span className="text-white text-[10px] font-bold uppercase tracking-widest text-center">Workspace</span></div>
                    <div className="flex-1" ref={blocklyDivRef} id="blocklyDiv" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .blocklyFlyout { width: 180px !important; }
                .blocklyFlyoutBackground { fill: #ddd !important; fill-opacity: 1 !important; }
                .blocklyToolboxDiv { display: none !important; }
                .blocklyMainBackground { stroke: none !important; }
                #blocksArea .blocklyFlyout { position: absolute !important; height: 100% !important; }
                .blocklyPath { stroke-width: 1.5px !important; stroke: rgba(0,0,0,0.1) !important; }
            `}} />
        </div>
    );
};

export default BlockCodingEngine;
