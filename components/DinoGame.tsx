import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import toast from 'react-hot-toast';

// --- DINO GAME CONSTANTS ---
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 300;
const GROUND_Y = 250;
const DINO_X = 50;
const DINO_WIDTH = 40;
const DINO_HEIGHT = 44;
const OBSTACLE_WIDTH = 24;
const OBSTACLE_HEIGHT = 46;
const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const INITIAL_SPEED = 5;

// --- BLOCKLY CONFIG ---
const defineDinoBlocks = () => {
    if (Blockly.Blocks['when_run_dino']) return;

    // EVENTS
    Blockly.Blocks['when_run_dino'] = {
        init: function() {
            this.appendDummyInput().appendField("when run");
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['dino_game_update'] = {
        init: function() {
            this.appendDummyInput().appendField("forever (game loop)");
            this.appendStatementInput("DO").setCheck(null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['when_space_pressed'] = {
        init: function() {
            this.appendDummyInput().appendField("when space key pressed");
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    // ACTIONS
    Blockly.Blocks['dino_jump'] = {
        init: function() {
            this.appendDummyInput().appendField("jump");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    // LOGIC (Custom Simplified)
    Blockly.Blocks['dino_if'] = {
        init: function() {
            this.appendValueInput("CONDITION")
                .setCheck("Boolean")
                .appendField("if");
            this.appendStatementInput("DO")
                .setCheck(null)
                .appendField("do");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(210);
        }
    };

    Blockly.Blocks['dino_compare'] = {
        init: function() {
            this.appendValueInput("A")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["<", "<"], [">", ">"], ["=", "=="]]), "OP");
            this.appendValueInput("B")
                .setCheck("Number");
            this.setOutput(true, "Boolean");
            this.setColour(210);
        }
    };

    Blockly.Blocks['dino_number'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldNumber(0), "NUM");
            this.setOutput(true, "Number");
            this.setColour(230);
        }
    };

    // SENSING
    Blockly.Blocks['get_obstacle_distance'] = {
        init: function() {
            this.appendDummyInput().appendField("distance to obstacle");
            this.setOutput(true, "Number");
            this.setColour(230);
        }
    };
};


const defineDinoGenerators = () => {
    javascriptGenerator.forBlock['when_run_dino'] = () => '';
    javascriptGenerator.forBlock['dino_game_update'] = (block: any) => javascriptGenerator.statementToCode(block, 'DO') || '';
    javascriptGenerator.forBlock['when_space_pressed'] = () => '';
    
    javascriptGenerator.forBlock['dino_jump'] = () => `game.jump();\n`;
    
    // CUSTOM LOGIC GENERATORS
    javascriptGenerator.forBlock['dino_if'] = (block: any) => {
        const condition = javascriptGenerator.valueToCode(block, 'CONDITION', (javascriptGenerator as any).ORDER_NONE) || 'false';
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `if (${condition}) {\n${branch}}\n`;
    };

    javascriptGenerator.forBlock['dino_compare'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', (javascriptGenerator as any).ORDER_ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', (javascriptGenerator as any).ORDER_ATOMIC) || '0';
        const op = block.getFieldValue('OP');
        return [`(${a} ${op} ${b})`, (javascriptGenerator as any).ORDER_RELATIONAL];
    };

    javascriptGenerator.forBlock['dino_number'] = (block: any) => {
        return [block.getFieldValue('NUM'), (javascriptGenerator as any).ORDER_ATOMIC];
    };
    
    javascriptGenerator.forBlock['get_obstacle_distance'] = () => [`game.getObstacleDistance()`, (javascriptGenerator as any).ORDER_ATOMIC];
};

const DinoGame: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [gameState, setGameState] = useState<'IDLE' | 'RUNNING' | 'GAMEOVER'>('IDLE');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(INITIAL_SPEED);
    
    // Game State Refs
    const gameLoopRef = useRef<number | null>(null);
    const dinoRef = useRef({ 
        y: GROUND_Y - DINO_HEIGHT, 
        vy: 0, 
        isJumping: false, 
        isDucking: false,
        width: DINO_WIDTH,
        height: DINO_HEIGHT
    });
    const obstaclesRef = useRef<any[]>([]);
    const frameCountRef = useRef(0);
    const speedRef = useRef(INITIAL_SPEED);
    const groundOffsetRef = useRef(0);
    const cloudsRef = useRef<{x: number, y: number, speed: number, size: number}[]>([]);
    
    // Logic Handlers (mapped from Blockly)
    const logicRef = useRef<{ [key: string]: Function }>({});


    useEffect(() => {
        if (!blocklyDivRef.current) return;

        defineDinoBlocks();
        defineDinoGenerators();

        const toolbox = {
            kind: 'categoryToolbox',
            contents: [
                {
                    kind: 'category',
                    name: 'Events',
                    colour: 120,
                    contents: [
                        { kind: 'block', type: 'when_run_dino' },
                        { kind: 'block', type: 'dino_game_update' },
                        { kind: 'block', type: 'when_space_pressed' },
                    ]
                },
                {
                    kind: 'category',
                    name: 'Actions',
                    colour: 190,
                    contents: [
                        { kind: 'block', type: 'dino_jump' },
                    ]
                },
                {
                    kind: 'category',
                    name: 'Sensing',
                    colour: 230,
                    contents: [
                        { kind: 'block', type: 'get_obstacle_distance' },
                    ]
                },
                {
                    kind: 'category',
                    name: 'Logic',
                    colour: 210,
                    contents: [
                        { kind: 'block', type: 'dino_if' },
                        { kind: 'block', type: 'dino_compare' },
                        { kind: 'block', type: 'dino_number' },
                    ]
                }
            ]
        };

        workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
            toolbox: toolbox,
            theme: Blockly.Themes.Classic,
            renderer: 'zelos',
            zoom: { controls: true, wheel: true, startScale: 0.9 }
        });

        // Initial blocks
        const initialXml = `
            <xml>
                <block type="when_run_dino" x="20" y="20"></block>
                <block type="when_space_pressed" x="20" y="100">
                    <next>
                        <block type="dino_jump"></block>
                    </next>
                </block>
            </xml>
        `;
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), workspaceRef.current);

        const handleResize = () => {
            if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);
        };
        window.addEventListener('resize', handleResize);
        setTimeout(handleResize, 100);

        // Keyboard Logic
        const keyDownHandler = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.key === " ") {
                e.preventDefault(); 
                if (stateRef.current === 'RUNNING') {
                    if (logicRef.current['when_space_pressed']) logicRef.current['when_space_pressed']();
                } else {
                    startGame();
                }
            }
        };

        document.addEventListener("keydown", keyDownHandler);
        
        draw(); // Initial Draw

        return () => {
             document.removeEventListener("keydown", keyDownHandler);
            if (workspaceRef.current) workspaceRef.current.dispose();
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Run setup only once

    const compileLogic = () => {
        if (!workspaceRef.current) return;
        
        javascriptGenerator.init(workspaceRef.current);
        const handlers: { [key: string]: string } = {};
        const allBlocks = workspaceRef.current.getAllBlocks(false);
        
        allBlocks.forEach(block => {
            if (block.type.startsWith('when_') || block.type === 'dino_game_update') {
               // Only compile top-level "Event" blocks
               // Since dino_game_update is now a hat/event block
                
                // Get the code inside the block first (for statement inputs like DO)
                let code = javascriptGenerator.blockToCode(block);
                
                // If blockToCode returns a string, use it.
                // Note: blockToCode for 'dino_game_update' returns the inner statements.
                
                // However, our manual compiler previously relied on getNextBlock().
                // But now dino_game_update contains statements inside DO input.
                // javascriptGenerator.statementToCode(block, 'DO') returns the inner code.
                
                handlers[block.type] = Array.isArray(code) ? code[0] : code;
            }
        });

        const gameProxy = {
            jump: () => {
                if (!dinoRef.current.isJumping) {
                    dinoRef.current.vy = JUMP_FORCE;
                    dinoRef.current.isJumping = true;
                }
            },
            duck: () => {},
            getObstacleDistance: () => {
                if (obstaclesRef.current.length === 0) return 999;
                const nextObs = obstaclesRef.current.find(obs => obs.x + obs.width > DINO_X);
                if (!nextObs) return 999;
                return Math.max(0, nextObs.x - (DINO_X + DINO_WIDTH));
            }
        };

        const compiled: { [key: string]: Function } = {};
        Object.entries(handlers).forEach(([event, code]) => {
            try {
                if (code) {
                    compiled[event] = new Function('game', code).bind(null, gameProxy);
                } else {
                    // Provide a default empty function for empty events
                    compiled[event] = () => {};
                }
            } catch (e) {
                console.error(`Error compiling ${event}:`, e);
                toast.error(`Faulty logic in ${event} block!`);
            }
        });
        logicRef.current = compiled;
    };

    const startGame = () => {
        try {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            
            // Set state first so UI updates immediately
            setGameState('RUNNING');
            stateRef.current = 'RUNNING';
            
            compileLogic();
            
            setScore(0);
            setGameSpeed(INITIAL_SPEED);
            speedRef.current = INITIAL_SPEED;
            
            dinoRef.current = { y: GROUND_Y - DINO_HEIGHT, vy: 0, isJumping: false, isDucking: false, width: DINO_WIDTH, height: DINO_HEIGHT };
        obstaclesRef.current = [];
        frameCountRef.current = 0;
        groundOffsetRef.current = 0;
        
        // Initial Clouds
        cloudsRef.current = [
            { x: 100, y: 50, speed: 0.2, size: 40 },
            { x: 350, y: 80, speed: 0.3, size: 60 },
            { x: 500, y: 40, speed: 0.1, size: 30 }
        ];

            if (logicRef.current['when_run_dino']) {
                try {
                    logicRef.current['when_run_dino']();
                } catch (e) {
                    console.error("Error in 'when run' logic:", e);
                }
            }
            
            const loop = () => {
                if (stateRef.current !== 'RUNNING') return;
                try {
                    update();
                    gameLoopRef.current = requestAnimationFrame(loop);
                } catch (e) {
                    console.error("Game loop crashed:", e);
                    gameOver();
                }
            };
            gameLoopRef.current = requestAnimationFrame(loop);
            toast.success("Safe run started!", { icon: '🏃' });
        } catch (error: any) {
            console.error("Failed to start game:", error);
            toast.error(`System Failure: ${error.message}`);
            setGameState('IDLE');
            stateRef.current = 'IDLE';
        }
    };

    const stateRef = useRef(gameState);
    useEffect(() => {
        stateRef.current = gameState;
    }, [gameState]);

    const update = () => {
        frameCountRef.current++;

        // Continuous Logic (Forever Loop)
        if (logicRef.current['dino_game_update']) logicRef.current['dino_game_update']();
        
        // --- PHYSICS ---
        // Dino Physics
        dinoRef.current.y += dinoRef.current.vy;
        dinoRef.current.vy += GRAVITY;

        // Ground Collision
        if (dinoRef.current.y > GROUND_Y - DINO_HEIGHT) {
            dinoRef.current.y = GROUND_Y - DINO_HEIGHT;
            dinoRef.current.vy = 0;
            dinoRef.current.isJumping = false;
        }

        // Scrolling background
        groundOffsetRef.current = (groundOffsetRef.current + speedRef.current) % 100;
        
        // Move Clouds
        cloudsRef.current.forEach(cloud => {
            cloud.x -= cloud.speed * speedRef.current;
            if (cloud.x < -100) cloud.x = CANVAS_WIDTH + 100;
        });

        // --- OBSTACLES ---
        const spawnChance = 0.02 + (speedRef.current * 0.002); 
        let canSpawn = true;
        if (obstaclesRef.current.length > 0) {
            const lastObs = obstaclesRef.current[obstaclesRef.current.length - 1];
            if (CANVAS_WIDTH - lastObs.x < 250) canSpawn = false; // Min distance
        }

        if (canSpawn && Math.random() < spawnChance) {
             obstaclesRef.current.push({
                 x: CANVAS_WIDTH,
                 y: GROUND_Y - OBSTACLE_HEIGHT,
                 width: OBSTACLE_WIDTH,
                 height: OBSTACLE_HEIGHT,
                 passed: false
             });
        }

        // Move Obstacles
        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
            obstaclesRef.current[i].x -= speedRef.current;
            
            // Cleanup
            if (obstaclesRef.current[i].x < -50) {
                obstaclesRef.current.splice(i, 1);
                continue;
            }

            // Collision
            // AABB
            const dino = dinoRef.current;
            const obs = obstaclesRef.current[i];
            
            // Simple hitbox reduction for better feel
            const buffer = 8; 
            if (
                dino.y + dino.height - buffer > obs.y &&
                dino.y + buffer < obs.y + obs.height &&
                DINO_X + dino.width - buffer > obs.x &&
                DINO_X + buffer < obs.x + obs.width
            ) {
                gameOver();
            }
        }

        // --- SCORE & SPEED ---
        if (frameCountRef.current % 10 === 0) { // Score every 10 frames
            setScore(prev => {
                const newScore = prev + 1;
                // Increase speed every 50 points for better progression
                if (newScore > 0 && newScore % 50 === 0) {
                     speedRef.current += 0.3;
                     setGameSpeed(speedRef.current);
                     toast("Speed Up!", { icon: '⚡', id: 'speed-up' });
                }
                if (newScore > highScore) setHighScore(newScore);
                return newScore;
            });
        }

        draw();
    };
    
    const gameOver = () => {
        setGameState('GAMEOVER');
        stateRef.current = 'GAMEOVER';
        toast.error(`Game Over! Score: ${score}`);
    };

    const draw = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Ground
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y);
        ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Ground Details (Scrolling)
        for (let i = -100; i < CANVAS_WIDTH + 100; i += 50) {
            const x = i - groundOffsetRef.current;
            ctx.beginPath();
            ctx.moveTo(x, GROUND_Y + 4);
            ctx.lineTo(x + 10, GROUND_Y + 4);
            ctx.strokeStyle = '#334155';
            ctx.stroke();
        }

        // Clouds (Parallax)
        ctx.fillStyle = '#e2e8f0';
        cloudsRef.current.forEach(cloud => {
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size / 2, 0, Math.PI * 2);
            ctx.arc(cloud.x + 20, cloud.y - 10, cloud.size / 2.5, 0, Math.PI * 2);
            ctx.arc(cloud.x + 40, cloud.y, cloud.size / 2, 0, Math.PI * 2);
            ctx.fill();
        });

        // Dino
        ctx.fillStyle = '#6366f1'; 
        const dy = dinoRef.current.y;
        ctx.beginPath();
        // Head
        ctx.rect(DINO_X + 20, dy, 20, 20);
        // Body
        ctx.rect(DINO_X, dy + 20, 30, 24);
        // Legs
        if (frameCountRef.current % 20 < 10 || !stateRef.current) {
             ctx.rect(DINO_X + 5, dy + 44, 4, 10); // Leg 1
             ctx.rect(DINO_X + 20, dy + 44, 4, 10); // Leg 2
        } else {
             ctx.rect(DINO_X + 5, dy + 44, 4, 4); // Run anim
             ctx.rect(DINO_X + 20, dy + 44, 4, 10);
        }
        ctx.fill();

        // Obstacles (Cacti)
        ctx.fillStyle = '#22c55e'; // Green Cactus
        obstaclesRef.current.forEach(obs => {
            // Cactus Shape
            ctx.beginPath();
            ctx.rect(obs.x + 8, obs.y, 8, 46); // Center Stem
            ctx.rect(obs.x, obs.y + 10, 8, 4); // Left arm
            ctx.rect(obs.x, obs.y + 10, 4, 15); // Left arm up
             ctx.rect(obs.x + 16, obs.y + 15, 8, 4); // Right arm
            ctx.rect(obs.x + 20, obs.y + 8, 4, 11); // Right arm up
            ctx.fill();
        });
        
        // Speed Indicator
        ctx.font = 'bold 12px Inter';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`SPEED: ${speedRef.current.toFixed(1)}x`, 10, 20);
    };

    return (
        <div className="flex flex-col lg:flex-row h-full w-full bg-slate-900 border-t border-slate-800 font-inter text-white overflow-hidden">
             {/* LEFT SIDE - GAME */}
            <div className="w-full lg:w-[600px] flex flex-col items-center p-6 border-b lg:border-r lg:border-b-0 border-slate-800 bg-slate-950/50 backdrop-blur-xl shrink-0">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 shadow-indigo-500/10 mb-6 bg-slate-50">
                    <canvas 
                        ref={canvasRef} 
                        width={CANVAS_WIDTH} 
                        height={CANVAS_HEIGHT}
                        className="w-full h-auto max-w-[600px]"
                    />
                    
                     {gameState !== 'RUNNING' && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm z-10 transition-all">
                             <h2 className={`text-5xl font-black mb-2 tracking-tighter uppercase italic ${gameState === 'GAMEOVER' ? 'text-red-500' : 'text-white'}`}>
                                {gameState === 'GAMEOVER' ? 'Game Over' : 'Dino Runner'}
                            </h2>
                            {/* <p className="text-slate-300 text-sm mb-8 font-medium max-w-xs text-center">Program the dino to jump! Use "Forever" + "If distance &lt; 100".</p> */}
                             <button 
                                onClick={startGame}
                                className="px-12 py-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/40 transition-all active:scale-95 group flex items-center space-x-3"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                <span>{gameState === 'IDLE' ? 'Start Run' : 'Try Again'}</span>
                            </button>
                        </div>
                     )}

                     <div className="absolute top-4 right-6 flex justify-between items-center pointer-events-none z-20 space-x-4">
                         <div className="bg-white/90 px-4 py-2 rounded-xl border border-slate-200 shadow-lg">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-0.5">Score</p>
                            <p className="text-2xl font-black text-slate-900 tabular-nums">{Math.floor(score)}</p>
                        </div>
                        <div className="bg-white/90 px-4 py-2 rounded-xl border border-slate-200 shadow-lg text-right">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-0.5">HI</p>
                            <p className="text-2xl font-black text-slate-900 tabular-nums">{Math.floor(highScore)}</p>
                        </div>
                     </div>
                </div>

                <div className="w-full bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                     <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Challenge Mode</p>
                     <p className="text-xs text-slate-400 leading-relaxed">
                        The game speed increases every 100 points! Can you automate the dino to survive indefinitely using the <span className="text-indigo-400 font-bold">"distance to obstacle"</span> block?
                     </p>
                </div>
            </div>

            {/* RIGHT SIDE - WORKSPACE */}
            <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 bg-slate-950">
                 <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        </div>
                        <span className="font-black text-white uppercase tracking-tighter italic">Dino Logic</span>
                    </div>
                </div>
                <div ref={blocklyDivRef} className="flex-1 relative" />
            </div>

             <style dangerouslySetInnerHTML={{ __html: `
                .blocklyTreeLabel { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 13px; color: #cbd5e1 !important; }
                .blocklyTreeRow { padding: 8px 16px; border-radius: 8px; margin: 4px 8px; }
                .blocklyMainBackground { stroke: none !important; }
                .blocklyFlyoutBackground { fill: #0f172a !important; fill-opacity: 0.95 !important; }
                .blocklyWorkspace { background: #020617 !important; }
                .blocklyToolboxDiv { background: #1e293b !important; border-right: 1px solid #334155 !important; }
                .blocklySvg { background: transparent !important; }
                .blocklyText { font-family: 'Inter', sans-serif !important; font-weight: 600 !important; }
            `}} />
        </div>
    );
};

export default DinoGame;
