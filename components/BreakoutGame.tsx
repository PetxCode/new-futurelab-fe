import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import toast from 'react-hot-toast';

// --- BREAKOUT CONSTANTS ---
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BRICK_ROW_COUNT = 5;
const BRICK_COLUMN_COUNT = 7;
const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 50;
const BRICK_OFFSET_LEFT = 25;

// --- BLOCKLY CONFIG ---
const defineBreakoutBlocks = () => {
    if (Blockly.Blocks['when_run_breakout']) return;

    // EVENTS
    Blockly.Blocks['when_run_breakout'] = {
        init: function() {
            this.appendDummyInput().appendField("when run");
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['breakout_game_update'] = {
      init: function() {
          this.appendDummyInput().appendField("forever (game loop)");
          this.appendStatementInput("DO").setCheck(null);
          this.setNextStatement(true, null);
          this.setColour(120);
          this.setDeletable(false);
      }
    };

    Blockly.Blocks['when_left_arrow'] = {
        init: function() {
            this.appendDummyInput().appendField("when left arrow pressed");
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['when_right_arrow'] = {
        init: function() {
            this.appendDummyInput().appendField("when right arrow pressed");
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['when_hit_brick'] = {
        init: function() {
            this.appendDummyInput().appendField("when hit brick");
            this.setNextStatement(true, null);
            this.setColour(160);
             this.setDeletable(false);
        }
    };

    // LOGIC (Custom Simplified)
    Blockly.Blocks['breakout_if'] = {
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

    Blockly.Blocks['breakout_compare'] = {
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

    Blockly.Blocks['breakout_number'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldNumber(0), "NUM");
            this.setOutput(true, "Number");
            this.setColour(230);
        }
    };

    // ACTIONS
    Blockly.Blocks['move_paddle'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("move paddle")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "DIR")
                .appendField("speed")
                .appendField(new Blockly.FieldDropdown([["slow", "5"], ["normal", "10"], ["fast", "15"]]), "SPEED");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['play_game_sound'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("play sound")
                .appendField(new Blockly.FieldDropdown([["bounce", "BOUNCE"], ["crack", "CRACK"], ["win", "WIN"], ["lose", "LOSE"]]), "SOUND");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['set_paddle_color'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set paddle color")
                .appendField(new Blockly.FieldDropdown([["Blue", "#3b82f6"], ["Green", "#22c55e"], ["Purple", "#a855f7"], ["Red", "#ef4444"], ["Orange", "#f97316"]]), "COLOR");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
        }
    };
    
      Blockly.Blocks['set_ball_color'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set ball color")
                .appendField(new Blockly.FieldDropdown([["White", "#ffffff"], ["Yellow", "#facc15"], ["Cyan", "#22d3ee"]]), "COLOR");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
        }
    };

    // SENSING
    Blockly.Blocks['get_ball_x'] = {
      init: function() {
        this.appendDummyInput().appendField("ball x position");
        this.setOutput(true, "Number");
        this.setColour(230);
      }
    };

    Blockly.Blocks['get_paddle_x'] = {
      init: function() {
        this.appendDummyInput().appendField("paddle x position");
        this.setOutput(true, "Number");
        this.setColour(230);
      }
    };
};

const defineBreakoutGenerators = () => {
    javascriptGenerator.forBlock['when_run_breakout'] = () => '';
    javascriptGenerator.forBlock['breakout_game_update'] = (block: any) => javascriptGenerator.statementToCode(block, 'DO') || '';
    javascriptGenerator.forBlock['when_left_arrow'] = () => '';
    javascriptGenerator.forBlock['when_right_arrow'] = () => '';
    javascriptGenerator.forBlock['when_hit_brick'] = () => '';
    
    javascriptGenerator.forBlock['move_paddle'] = (block: any) => `game.movePaddle('${block.getFieldValue('DIR')}', ${block.getFieldValue('SPEED')});\n`;
    javascriptGenerator.forBlock['play_game_sound'] = (block: any) => `game.playSound('${block.getFieldValue('SOUND')}');\n`;
    javascriptGenerator.forBlock['set_paddle_color'] = (block: any) => `game.setPaddleColor('${block.getFieldValue('COLOR')}');\n`;
    javascriptGenerator.forBlock['set_ball_color'] = (block: any) => `game.setBallColor('${block.getFieldValue('COLOR')}');\n`;
    
    javascriptGenerator.forBlock['get_ball_x'] = () => [`game.getBallX()`, (javascriptGenerator as any).ORDER_ATOMIC];
    javascriptGenerator.forBlock['get_paddle_x'] = () => [`game.getPaddleX()`, (javascriptGenerator as any).ORDER_ATOMIC];

    // CUSTOM LOGIC
    javascriptGenerator.forBlock['breakout_if'] = (block: any) => {
        const condition = javascriptGenerator.valueToCode(block, 'CONDITION', (javascriptGenerator as any).ORDER_NONE) || 'false';
        const branch = javascriptGenerator.statementToCode(block, 'DO');
        return `if (${condition}) {\n${branch}}\n`;
    };

    javascriptGenerator.forBlock['breakout_compare'] = (block: any) => {
        const a = javascriptGenerator.valueToCode(block, 'A', (javascriptGenerator as any).ORDER_ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', (javascriptGenerator as any).ORDER_ATOMIC) || '0';
        const op = block.getFieldValue('OP');
        return [`(${a} ${op} ${b})`, (javascriptGenerator as any).ORDER_RELATIONAL];
    };

    javascriptGenerator.forBlock['breakout_number'] = (block: any) => {
        return [block.getFieldValue('NUM'), (javascriptGenerator as any).ORDER_ATOMIC];
    };
};

const BreakoutGame: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [gameState, setGameState] = useState<'IDLE' | 'RUNNING' | 'GAMEOVER' | 'VICTORY'>('IDLE');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    
    // Game Refs
    const gameLoopRef = useRef<number | null>(null);
    const paddleRef = useRef({ x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2, color: '#3b82f6' });
    const ballRef = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30, dx: 4, dy: -4, color: '#ffffff' });
    const bricksRef = useRef<any[]>([]);
    const rightPressed = useRef(false);
    const leftPressed = useRef(false);
    
    // Logic Handlers (mapped from Blockly)
    const logicRef = useRef<{ [key: string]: Function }>({});

    // Initialize Bricks
    const initBricks = () => {
        const newBricks = [];
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            newBricks[c] = [];
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                newBricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        bricksRef.current = newBricks;
    };

    useEffect(() => {
        if (!blocklyDivRef.current) return;

        defineBreakoutBlocks();
        defineBreakoutGenerators();

        const toolbox = {
            kind: 'categoryToolbox',
            contents: [
              {
                kind: 'category',
                name: 'Events',
                colour: 120,
                contents: [
                  { kind: 'block', type: 'when_run_breakout' },
                  { kind: 'block', type: 'breakout_game_update' },
                  { kind: 'block', type: 'when_left_arrow' },
                  { kind: 'block', type: 'when_right_arrow' },
                  { kind: 'block', type: 'when_hit_brick' },
                ]
              },
              {
                kind: 'category',
                name: 'Actions',
                colour: 190,
                contents: [
                  { kind: 'block', type: 'move_paddle' },
                  { kind: 'block', type: 'play_game_sound' },
                  { kind: 'block', type: 'set_paddle_color' },
                  { kind: 'block', type: 'set_ball_color' }
                ]
              },
               {
                kind: 'category',
                name: 'Sensing',
                colour: 230,
                contents: [
                  { kind: 'block', type: 'get_ball_x' },
                  { kind: 'block', type: 'get_paddle_x' },
                ]
              },
              {
                kind: 'category',
                name: 'Logic',
                colour: 210,
                contents: [
                   { kind: 'block', type: 'breakout_if' },
                   { kind: 'block', type: 'breakout_compare' },
                   { kind: 'block', type: 'breakout_number' },
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
                <block type="when_run_breakout" x="20" y="20">
                     <next>
                        <block type="set_paddle_color">
                            <field name="COLOR">#3b82f6</field>
                        </block>
                    </next>
                </block>
                <block type="when_left_arrow" x="20" y="150">
                    <next>
                        <block type="move_paddle">
                            <field name="DIR">LEFT</field>
                            <field name="SPEED">10</field>
                        </block>
                    </next>
                </block>
                <block type="when_right_arrow" x="20" y="280">
                     <next>
                        <block type="move_paddle">
                            <field name="DIR">RIGHT</field>
                            <field name="SPEED">10</field>
                        </block>
                    </next>
                </block>
            </xml>
        `;
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), workspaceRef.current);

        const handleResize = () => {
            if (workspaceRef.current) {
                Blockly.svgResize(workspaceRef.current);
            }
        };
        window.addEventListener('resize', handleResize);
        setTimeout(handleResize, 100);

        // Keyboard Logic
        const keyDownHandler = (e: KeyboardEvent) => {
            if (e.key === "Right" || e.key === "ArrowRight") rightPressed.current = true;
            else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed.current = true;
        };

        const keyUpHandler = (e: KeyboardEvent) => {
            if (e.key === "Right" || e.key === "ArrowRight") rightPressed.current = false;
            else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed.current = false;
        };

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        
        initBricks();
        draw(); // Initial draw

        return () => {
             document.removeEventListener("keydown", keyDownHandler);
             document.removeEventListener("keyup", keyUpHandler);
            if (workspaceRef.current) workspaceRef.current.dispose();
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const compileLogic = () => {
        if (!workspaceRef.current) return;
        
        javascriptGenerator.init(workspaceRef.current);
        
        const handlers: { [key: string]: string } = {};
        const allBlocks = workspaceRef.current.getAllBlocks(false);
        
        allBlocks.forEach(block => {
             if (block.type.startsWith('when_') || block.type === 'breakout_game_update') {
                let code = javascriptGenerator.blockToCode(block);
                handlers[block.type] = Array.isArray(code) ? code[0] : code;
            }
        });

        const gameProxy = {
            movePaddle: (dir: string, speed: number) => {
                if (dir === 'LEFT') {
                     paddleRef.current.x = Math.max(0, paddleRef.current.x - speed);
                } else {
                     paddleRef.current.x = Math.min(CANVAS_WIDTH - PADDLE_WIDTH, paddleRef.current.x + speed);
                }
            },
            playSound: (sound: string) => console.log(`Playing sound: ${sound}`), 
            setPaddleColor: (color: string) => paddleRef.current.color = color,
            setBallColor: (color: string) => ballRef.current.color = color,
            getBallX: () => ballRef.current.x,
            getPaddleX: () => paddleRef.current.x + PADDLE_WIDTH / 2, // Center of paddle
        };

        const compiled: { [key: string]: Function } = {};
        Object.entries(handlers).forEach(([event, code]) => {
            try {
                compiled[event] = new Function('game', code).bind(null, gameProxy);
            } catch (e) {
                console.error(`Error compiling ${event}:`, e);
            }
        });
        
        logicRef.current = compiled;
    };

    const startGame = () => {
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        compileLogic();
        setScore(0);
        setLives(3);
        setGameState('RUNNING');
        stateRef.current = 'RUNNING';
        
        // Reset Positions
        paddleRef.current.x = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
        ballRef.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30, dx: 4, dy: -4, color: ballRef.current.color };
        initBricks();

        // Run "When Run" logic
        if (logicRef.current['when_run_breakout']) logicRef.current['when_run_breakout']();
        
        const loop = () => {
            if (stateRef.current !== 'RUNNING') return;
            update();
            gameLoopRef.current = requestAnimationFrame(loop);
        };
        gameLoopRef.current = requestAnimationFrame(loop);
    };

    const stateRef = useRef(gameState);
    useEffect(() => {
        stateRef.current = gameState;
    }, [gameState]);


    const update = () => {
        // Continuous Logic (Forever Loop)
        if (logicRef.current['breakout_game_update']) logicRef.current['breakout_game_update']();

        // Paddle Logic via Blocks
        if (rightPressed.current && logicRef.current['when_right_arrow']) logicRef.current['when_right_arrow']();
        if (leftPressed.current && logicRef.current['when_left_arrow']) logicRef.current['when_left_arrow']();

        // Ball Movement
        let x = ballRef.current.x + ballRef.current.dx;
        let y = ballRef.current.y + ballRef.current.dy;

        // Wall Collision
        if (x + ballRef.current.dx > CANVAS_WIDTH - BALL_RADIUS || x + ballRef.current.dx < BALL_RADIUS) {
            ballRef.current.dx = -ballRef.current.dx;
        }
        if (y + ballRef.current.dy < BALL_RADIUS) {
            ballRef.current.dy = -ballRef.current.dy;
        } else if (y + ballRef.current.dy > CANVAS_HEIGHT - BALL_RADIUS) {
            // Ball hit bottom
             if (x > paddleRef.current.x && x < paddleRef.current.x + PADDLE_WIDTH) {
                 // Hit paddle
                 ballRef.current.dy = -ballRef.current.dy;
             } else {
                 // Game Over / Lose Life
                 setLives(prev => {
                     const newLives = prev - 1;
                     if (newLives <= 0) {
                        setGameState('GAMEOVER');
                        // Move ball to safety to prevent multiple triggers
                         ballRef.current.x = CANVAS_WIDTH / 2;
                         ballRef.current.y = CANVAS_HEIGHT - 30;
                         ballRef.current.dy = 0; 
                         return 0;
                     } 
                     else {
                         // Reset Ball
                         ballRef.current.x = CANVAS_WIDTH / 2;
                         ballRef.current.y = CANVAS_HEIGHT - 30;
                         ballRef.current.dx = 4;
                         ballRef.current.dy = -4;
                         paddleRef.current.x = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
                         return newLives;
                     }
                 });
             }
        }

        // Brick Collision
        let activeBricks = 0;
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                const b = bricksRef.current[c][r];
                if (b.status === 1) {
                     activeBricks++;
                    if (x > b.x && x < b.x + BRICK_WIDTH && y > b.y && y < b.y + BRICK_HEIGHT) {
                        ballRef.current.dy = -ballRef.current.dy;
                        b.status = 0;
                        setScore(prev => prev + 1);
                        if (logicRef.current['when_hit_brick']) logicRef.current['when_hit_brick']();
                    }
                }
            }
        }
        
        if (activeBricks === 0 && gameState === 'RUNNING') {
             setGameState('VICTORY');
        }

        ballRef.current.x += ballRef.current.dx;
        ballRef.current.y += ballRef.current.dy;

        draw();
    };

    const draw = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Bricks
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                 if (bricksRef.current[c][r].status === 1) {
                    const brickX = (c * (BRICK_WIDTH + BRICK_PADDING)) + BRICK_OFFSET_LEFT;
                    const brickY = (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP;
                    bricksRef.current[c][r].x = brickX;
                    bricksRef.current[c][r].y = brickY;
                    
                    // Specific colors for rows
                    const colors = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6'];

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
                    ctx.fillStyle = colors[r];
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }

        // Paddle
        ctx.beginPath();
        ctx.rect(paddleRef.current.x, CANVAS_HEIGHT - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillStyle = paddleRef.current.color;
        ctx.fill();
        ctx.closePath();

        // Ball
        ctx.beginPath();
        ctx.arc(ballRef.current.x, ballRef.current.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = ballRef.current.color;
        ctx.fill();
        ctx.closePath();
    };

    return (
        <div className="flex flex-col lg:flex-row h-full w-full bg-slate-900 border-t border-slate-800 font-inter text-white overflow-hidden">
             {/* LEFT SIDE - GAME */}
            <div className="w-full lg:w-[600px] flex flex-col items-center p-6 border-b lg:border-r lg:border-b-0 border-slate-800 bg-slate-950/50 backdrop-blur-xl shrink-0">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 shadow-sky-500/10 mb-6">
                    <canvas 
                        ref={canvasRef} 
                        width={CANVAS_WIDTH} 
                        height={CANVAS_HEIGHT}
                        className="bg-slate-900 w-full h-auto max-w-[600px]"
                    />
                    
                     {gameState !== 'RUNNING' && (
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10 transition-all">
                             <h2 className={`text-5xl font-black mb-2 tracking-tighter uppercase italic ${gameState === 'VICTORY' ? 'text-green-400' : gameState === 'GAMEOVER' ? 'text-red-500' : 'text-white'}`}>
                                {gameState === 'GAMEOVER' ? 'Game Over' : gameState === 'VICTORY' ? 'You Win!' : 'Breakout'}
                            </h2>
                            {/* <p className="text-slate-400 text-sm mb-8 font-medium max-w-xs text-center">Program your paddle! Try using "Forever" + "If Ball X &gt; Paddle X".</p> */}
                             <button 
                                onClick={startGame}
                                className="px-12 py-4 mt-5 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl shadow-xl shadow-sky-600/40 transition-all active:scale-95 group flex items-center space-x-3"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                <span>{gameState === 'IDLE' ? 'Start Game' : 'Play Again'}</span>
                            </button>
                        </div>
                     )}

                     <div className="absolute top-4 left-6 right-6 flex justify-between items-center pointer-events-none z-20">
                         <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-md shadow-lg">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-0.5">Score</p>
                            <p className="text-2xl font-black text-white tabular-nums">{score}</p>
                        </div>
                        <div className="flex space-x-1">
                             {[...Array(lives)].map((_, i) => (
                                 <div key={i} className="w-8 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
                             ))}
                        </div>
                     </div>
                </div>

                <div className="w-full bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                     <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Challenge</p>
                     <p className="text-xs text-slate-400 leading-relaxed">
                        Can you create an AI that never loses? Try using the <span className="text-sky-400 font-bold">forever</span> loop with logic blocks to make the paddle follow the ball!
                     </p>
                </div>
            </div>

            {/* RIGHT SIDE - WORKSPACE */}
            <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 bg-slate-950">
                 <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        </div>
                        <span className="font-black text-white uppercase tracking-tighter italic">Block Code</span>
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

export default BreakoutGame;
