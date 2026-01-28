
import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import toast from 'react-hot-toast';

// --- FLAPPY BIRD CONSTANTS ---
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 480;
const BIRD_SIZE = 34;
const PIPE_WIDTH = 52;
const PIPE_GAP = 120;
const GRAVITY = 0.4;
const JUMP_FORCE = -7;
const SPEED = 2.5;

// --- BLOCKLY CONFIG ---
const defineFlappyBlocks = () => {
    if (Blockly.Blocks['when_run']) return;

    // EVENT BLOCKS
    Blockly.Blocks['when_run'] = {
        init: function() {
            this.appendDummyInput().appendField("when run");
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['when_click'] = {
        init: function() {
            this.appendDummyInput().appendField("when click");
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['when_hit_ground'] = {
        init: function() {
            this.appendDummyInput().appendField("when hit the ground");
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['when_hit_obstacle'] = {
        init: function() {
            this.appendDummyInput().appendField("when hit an obstacle");
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setDeletable(false);
        }
    };

    Blockly.Blocks['when_pass_obstacle'] = {
        init: function() {
            this.appendDummyInput().appendField("when pass obstacle");
            this.setNextStatement(true, null);
            this.setColour(160);
            this.setDeletable(false);
        }
    };

    // ACTION BLOCKS
    Blockly.Blocks['flap'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("flap a")
                .appendField(new Blockly.FieldDropdown([["normal", "NORMAL"], ["small", "SMALL"], ["large", "LARGE"]]), "AMOUNT")
                .appendField("amount");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['play_sound'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("play")
                .appendField(new Blockly.FieldDropdown([["wing", "WING"], ["hit", "HIT"], ["point", "POINT"], ["swoosh", "SWOOSH"]]), "SOUND")
                .appendField("sound");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['score_point'] = {
        init: function() {
            this.appendDummyInput().appendField("score a point");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['end_game'] = {
        init: function() {
            this.appendDummyInput().appendField("end game");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(190);
        }
    };

    Blockly.Blocks['set_speed'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set speed")
                .appendField(new Blockly.FieldDropdown([["very slow", "VERY_SLOW"], ["slow", "SLOW"], ["normal", "NORMAL"], ["fast", "FAST"], ["very fast", "VERY_FAST"]]), "SPEED");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
        }
    };

    Blockly.Blocks['set_scene'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set scene")
                .appendField(new Blockly.FieldDropdown([["City (day)", "CITY_DAY"], ["City (night)", "CITY_NIGHT"], ["Sci-Fi", "SCIFI"], ["Underwater", "UNDERWATER"]]), "SCENE");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
        }
    };

    Blockly.Blocks['set_player'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("set player")
                .appendField(new Blockly.FieldDropdown([["Yellow Bird", "YELLOW"], ["Red Bird", "RED"], ["Blue Bird", "BLUE"], ["Shark", "SHARK"], ["Spaceship", "SPACESHIP"]]), "PLAYER");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);
        }
    };
};

const defineFlappyGenerators = () => {
    javascriptGenerator.forBlock['flap'] = (block: any) => `game.flap('${block.getFieldValue('AMOUNT')}');\n`;
    javascriptGenerator.forBlock['play_sound'] = (block: any) => `game.playSound('${block.getFieldValue('SOUND')}');\n`;
    javascriptGenerator.forBlock['score_point'] = () => `game.scorePoint();\n`;
    javascriptGenerator.forBlock['end_game'] = () => `game.endGame();\n`;
    javascriptGenerator.forBlock['set_speed'] = (block: any) => `game.setSpeed('${block.getFieldValue('SPEED')}');\n`;
    javascriptGenerator.forBlock['set_scene'] = (block: any) => `game.setScene('${block.getFieldValue('SCENE')}');\n`;
    javascriptGenerator.forBlock['set_player'] = (block: any) => `game.setPlayer('${block.getFieldValue('PLAYER')}');\n`;
    
    // Event generators (just to get the code inside)
    javascriptGenerator.forBlock['when_run'] = (block: any) => javascriptGenerator.statementToCode(block, 'DO') || '';
    javascriptGenerator.forBlock['when_click'] = (block: any) => javascriptGenerator.statementToCode(block, 'DO') || '';
    javascriptGenerator.forBlock['when_hit_ground'] = (block: any) => javascriptGenerator.statementToCode(block, 'DO') || '';
    javascriptGenerator.forBlock['when_hit_obstacle'] = (block: any) => javascriptGenerator.statementToCode(block, 'DO') || '';
    javascriptGenerator.forBlock['when_pass_obstacle'] = (block: any) => javascriptGenerator.statementToCode(block, 'DO') || '';
};

const EngineBlocks: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [gameState, setGameState] = useState<'IDLE' | 'RUNNING' | 'GAMEOVER'>('IDLE');
    const [score, setScore] = useState(0);
    const scoreRef = useRef(0);
    const [highScore, setHighScore] = useState(0);
    
    // Game Engine Refs
    const gameLoopRef = useRef<number | null>(null);
    const birdRef = useRef({ y: 200, velocity: 0, rotation: 0 });
    const pipesRef = useRef<any[]>([]);
    const configRef = useRef({
        speed: SPEED,
        scene: 'CITY_DAY',
        player: 'YELLOW',
        obstacle: 'PIPE'
    });
    
    // Logic Handlers (mapped from Blockly)
    const logicRef = useRef<{ [key: string]: Function }>({});

    useEffect(() => {
        if (!blocklyDivRef.current) return;

        defineFlappyBlocks();
        defineFlappyGenerators();

        const toolbox = {
            kind: 'flyoutToolbox',
            contents: [
                { kind: 'block', type: 'flap' },
                { kind: 'block', type: 'play_sound' },
                { kind: 'block', type: 'score_point' },
                { kind: 'block', type: 'end_game' },
                { kind: 'block', type: 'set_speed' },
                { kind: 'block', type: 'set_scene' },
                { kind: 'block', type: 'set_player' }
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
                <block type="when_run" x="20" y="20"></block>
                <block type="when_click" x="20" y="150"></block>
                <block type="when_hit_ground" x="250" y="20"></block>
                <block type="when_hit_obstacle" x="250" y="110"></block>
                <block type="when_pass_obstacle" x="250" y="200"></block>
            </xml>
        `;
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), workspaceRef.current);

        const handleResize = () => {
            if (workspaceRef.current) {
                Blockly.svgResize(workspaceRef.current);
            }
        };
        window.addEventListener('resize', handleResize);
        // Initial resize to ensure everything fits
        setTimeout(handleResize, 100);

        return () => {
            if (workspaceRef.current) workspaceRef.current.dispose();
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const compileLogic = () => {
        if (!workspaceRef.current) return;
        
        // Initialize generator for the current workspace
        javascriptGenerator.init(workspaceRef.current);
        
        const handlers: { [key: string]: string } = {};
        const allBlocks = workspaceRef.current.getAllBlocks(false);
        
        allBlocks.forEach(block => {
            if (block.type.startsWith('when_')) {
                // Get code for blocks attached BELOW the event block
                const nextBlock = block.getNextBlock();
                let code = '';
                if (nextBlock) {
                    const generated = javascriptGenerator.blockToCode(nextBlock);
                    code = typeof generated === 'string' ? generated : generated[0];
                }
                handlers[block.type] = code;
            }
        });

        const gameProxy = {
            flap: (amount: string) => {
                const force = amount === 'SMALL' ? -5 : amount === 'LARGE' ? -10 : -7;
                birdRef.current.velocity = force;
            },
            playSound: (sound: string) => console.log(`Playing sound: ${sound}`),
            scorePoint: () => {
                scoreRef.current += 1;
                setScore(scoreRef.current);
                if (scoreRef.current > highScore) setHighScore(scoreRef.current);
            },
            endGame: () => setGameState('GAMEOVER'),
            setSpeed: (val: string) => {
                const multi = val === 'VERY_FAST' ? 2 : val === 'FAST' ? 1.5 : val === 'SLOW' ? 0.7 : val === 'VERY_SLOW' ? 0.4 : 1;
                configRef.current.speed = SPEED * multi;
            },
            setScene: (scene: string) => configRef.current.scene = scene,
            setPlayer: (player: string) => configRef.current.player = player
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
        compileLogic();
        setScore(0);
        scoreRef.current = 0;
        setGameState('RUNNING');
        stateRef.current = 'RUNNING';
        birdRef.current = { y: 200, velocity: 0, rotation: 0 };
        pipesRef.current = [];
        
        // Execute "When Run"
        if (logicRef.current['when_run']) {
            try {
                logicRef.current['when_run']();
            } catch (e) {
                console.error("Error in when_run:", e);
            }
        }
        
        // Use a persistent loop function that checks the ref
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
        // We check stateRef.current in the loop function now

        // Bird Physics
        birdRef.current.velocity += GRAVITY;
        birdRef.current.y += birdRef.current.velocity;
        birdRef.current.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, birdRef.current.velocity * 0.1));

        // Ground Check
        if (birdRef.current.y + BIRD_SIZE/2 > CANVAS_HEIGHT - 50) {
            if (logicRef.current['when_hit_ground']) logicRef.current['when_hit_ground']();
            else setGameState('GAMEOVER');
        }

        // Pipe Generation
        if (pipesRef.current.length === 0 || pipesRef.current[pipesRef.current.length - 1].x < CANVAS_WIDTH - 200) {
            const gapY = 100 + Math.random() * (CANVAS_HEIGHT - 250);
            pipesRef.current.push({ x: CANVAS_WIDTH, gapY, passed: false });
        }

        // Pipe Movement & Collision
        pipesRef.current.forEach((pipe, index) => {
            pipe.x -= configRef.current.speed;

            // Collision
            const birdX = 50;
            if (birdX + BIRD_SIZE/2 > pipe.x && birdX - BIRD_SIZE/2 < pipe.x + PIPE_WIDTH) {
                if (birdRef.current.y - BIRD_SIZE/2 < pipe.gapY || birdRef.current.y + BIRD_SIZE/2 > pipe.gapY + PIPE_GAP) {
                    if (logicRef.current['when_hit_obstacle']) logicRef.current['when_hit_obstacle']();
                    else setGameState('GAMEOVER');
                }
            }

            // Score Check
            if (!pipe.passed && pipe.x + PIPE_WIDTH < birdX) {
                pipe.passed = true;
                if (logicRef.current['when_pass_obstacle']) logicRef.current['when_pass_obstacle']();
            }
        });

        // Cleanup
        pipesRef.current = pipesRef.current.filter(p => p.x > -PIPE_WIDTH);

        draw();
    };

    const draw = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        // Background
        ctx.fillStyle = configRef.current.scene === 'CITY_NIGHT' ? '#1e293b' : configRef.current.scene === 'SCIFI' ? '#2e1065' : '#70c5ce';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Pipes
        ctx.fillStyle = '#22c55e';
        pipesRef.current.forEach(p => {
            ctx.fillRect(p.x, 0, PIPE_WIDTH, p.gapY);
            ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_WIDTH, CANVAS_HEIGHT - p.gapY - PIPE_GAP);
        });

        // Ground
        ctx.fillStyle = '#ded895';
        ctx.fillRect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);

        // Bird
        ctx.save();
        ctx.translate(50, birdRef.current.y);
        ctx.rotate(birdRef.current.rotation);
        ctx.fillStyle = configRef.current.player === 'RED' ? '#ef4444' : configRef.current.player === 'SHARK' ? '#64748b' : '#fbbf24';
        ctx.beginPath();
        ctx.arc(0, 0, BIRD_SIZE/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    const handleCanvasClick = () => {
        if (gameState === 'RUNNING') {
            if (logicRef.current['when_click']) logicRef.current['when_click']();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full w-full bg-slate-900 overflow-y-auto lg:overflow-hidden font-inter border-t border-slate-800">
            {/* GAME PREVIEW */}
            <div className="w-full lg:w-[600px] flex flex-col items-center p-4 lg:p-6 border-b lg:border-r lg:border-b-0 border-slate-800 bg-slate-950/50 backdrop-blur-xl">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 shadow-indigo-500/10">
                    <canvas 
                        ref={canvasRef} 
                        width={CANVAS_WIDTH} 
                        height={CANVAS_HEIGHT}
                        onClick={handleCanvasClick}
                        className="cursor-pointer bg-sky-400 w-full h-auto max-w-[550px]"
                    />
                    
                    {gameState !== 'RUNNING' && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
                            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">
                                {gameState === 'GAMEOVER' ? 'Game Over' : 'Engine Blocks'}
                            </h2>
                            <p className="text-slate-400 text-sm mb-8 font-medium">Build your rules in the workspace!</p>
                            <button 
                                onClick={startGame}
                                className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/40 transition-all active:scale-95 group flex items-center space-x-3"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                <span>{gameState === 'GAMEOVER' ? 'Try Again' : 'Run Game'}</span>
                            </button>
                        </div>
                    )}

                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
                        <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-md">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-0.5">Score</p>
                            <p className="text-2xl font-black text-white tabular-nums">{score}</p>
                        </div>
                        <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-md text-right">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-0.5">Best</p>
                            <p className="text-2xl font-black text-indigo-400 tabular-nums">{highScore}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                   <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
                      <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Instructions</p>
                      <ul className="text-xs text-slate-400 space-y-2">
                         <li className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                            <span>1. Drag blocks to the <b>When Click</b> event.</span>
                         </li>
                         <li className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                            <span>2. Add sound effects and score points.</span>
                         </li>
                         <li className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                            <span>3. Hit <b>Run Game</b> to test!</span>
                         </li>
                      </ul>
                   </div>
                   <div className="p-4 bg-indigo-600/5 rounded-2xl border border-indigo-500/10">
                      <p className="text-[10px] font-black uppercase text-indigo-400 mb-2">Did you know?</p>
                      <p className="text-[10px] leading-relaxed text-slate-400">Computer games work by listening to <b>Events</b>—just like you're building here!</p>
                   </div>
                </div>
            </div>

            {/* BLOCKLY WORKSPACE */}
            <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
                <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-6 justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 114 0v1a2 2 0 01-2 2h8a2 2 0 012-2V4z" /></svg>
                        </div>
                        <span className="font-black text-white uppercase tracking-tighter italic">Logic Lab</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-xs font-bold text-slate-500">Workspace: <span className="text-indigo-400">Flappy Logic</span></p>
                        <button 
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold border border-slate-700 transition-colors"
                            onClick={() => {
                                if (workspaceRef.current) workspaceRef.current.clear();
                                const initialXml = `<xml><block type="when_run" x="20" y="20"></block><block type="when_click" x="20" y="150"></block><block type="when_hit_ground" x="250" y="20"></block><block type="when_hit_obstacle" x="250" y="110"></block><block type="when_pass_obstacle" x="250" y="200"></block></xml>`;
                                Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), workspaceRef.current!);
                            }}
                        >
                            Reset Blocks
                        </button>
                    </div>
                </div>
                <div ref={blocklyDivRef} className="flex-1 relative" style={{ minHeight: '500px' }} />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .blocklyTreeLabel { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 13px; }
                .blocklyTreeRow { padding: 12px 16px; border-radius: 12px; margin: 4px 8px; }
                .blocklyMainBackground { stroke: none !important; }
                .blocklyFlyoutBackground { fill: #0f172a !important; fill-opacity: 0.95 !important; }
                .blocklyWorkspace { background: #0f172a !important; }
                .blocklyToolboxDiv { background: #1e293b !important; border-right: 1px solid #334155 !important; padding: 12px 0; }
                .blocklySvg { background: transparent !important; }
                .blocklyText { font-family: 'Inter', sans-serif !important; font-weight: 600 !important; }
                .blocklyHtmlInput { font-family: 'Inter', sans-serif !important; }
            `}} />
        </div>
    );
};

export default EngineBlocks;
