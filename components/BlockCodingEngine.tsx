
import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';
import { User } from '../types';

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
        solution: [
            { type: 'move forward' },
            { type: 'move forward' }
        ]
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
        solution: [
            { type: 'move forward' },
            { type: 'move forward' },
            { type: 'move forward' },
            { type: 'move forward' },
            { type: 'turn left ↺' },
            { type: 'move forward' }
        ]
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
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' }
            ]}
        ]
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
        solution: [
          { type: 'repeat until 🏁', children: [
              { type: 'move forward' },
              { type: 'turn left ↺' },
              { type: 'move forward' },
              { type: 'turn right ↻' }
          ]}
        ]
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
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
                { type: 'turn left ↺' },
                { type: 'move forward' },
                { type: 'turn right ↻' }
            ]}
        ]
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
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]}
            ]}
        ]
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
        maxBlocks: 6,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]}
            ]}
        ]
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
        maxBlocks: 8,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]}
            ]}
        ]
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
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'if path ahead', children: [
                    { type: 'move forward' }
                ]},
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]}
            ]}
        ]
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
        goal: { x: 3, y: 5 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'if path ahead', children: [
                    { type: 'move forward' }
                ]},
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]}
            ]}
        ]
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
        maxBlocks: 8,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]}
            ]}
        ]
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
        maxBlocks: 7,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]}
            ]}
        ]
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
        maxBlocks: 8,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'if path ahead', children: [
                    { type: 'move forward' }
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]},
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]}
            ]}
        ]
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
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'if path ahead', children: [
                    { type: 'move forward' }
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]},
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]}
            ]}
        ]
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
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
                { type: 'if path ahead', children: [
                    { type: 'if path to the left ↺', children: [
                        { type: 'turn left ↺' }
                    ]}
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]}
            ]}
        ]
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
const HintModal = ({ show, onHide, solution }: { show: boolean, onHide: () => void, solution?: any[] }) => {
    if (!show) return null;

    const renderBlock = (block: any, depth = 0, index = 0) => (
        <div key={`${block.type}-${depth}-${index}`} className={`flex flex-col mb-1`} style={{ marginLeft: `${depth * 20}px` }}>
            <div className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border-l-4 ${
                block.type.toLowerCase().includes('move') ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300' :
                block.type.toLowerCase().includes('turn') ? 'bg-purple-900/40 border-purple-500 text-purple-300' :
                block.type.toLowerCase().includes('repeat') ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300' :
                'bg-amber-900/40 border-amber-500 text-amber-300'
            }`}>
                {block.type}
            </div>
            {block.children && (
                <div className="mt-1 border-l border-slate-700 ml-2">
                    {block.children.map((child: any, idx: number) => renderBlock(child, depth + 1, idx))}
                </div>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onHide()}>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl">💡</span>
                        <h3 className="font-black italic uppercase tracking-tight text-white">Solution Guide</h3>
                    </div>
                    <button onClick={onHide} className="text-slate-500 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6 bg-slate-950/50 max-h-[400px] overflow-y-auto">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-widest">Logic Flow</p>
                    <div className="space-y-1">
                        {solution?.map((block: any, idx: number) => renderBlock(block, 0, idx))}
                    </div>
                </div>
                <div className="p-6 border-t border-slate-800">
                    <button 
                        onClick={onHide}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

const BlockCodingEngine: React.FC<{ userData?: User | null }> = ({ userData }) => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'IDLE' | 'RUNNING' | 'DONE'>('IDLE');
    const [blocksUsed, setBlocksUsed] = useState(0);
    const [currentLevelId, setCurrentLevelId] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [maxSolvedLevel, setMaxSolvedLevel] = useState<number>(() => {
        const saved = localStorage.getItem('maze_max_solved');
        return saved ? parseInt(saved, 10) : 1;
    });

    useEffect(() => {
        localStorage.setItem('maze_max_solved', maxSolvedLevel.toString());
    }, [maxSolvedLevel]);

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

        // Clear previous level's blocks
        if (workspaceRef.current) {
            workspaceRef.current.clear();
        }

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
        const MAX_ITERATIONS = 1000;

        return {
            moveForward: () => {
                const dx = [0, 1, 0, -1][shadowDir];
                const dy = [-1, 0, 1, 0][shadowDir];
                if (currentLevel.map[shadowY + dy]?.[shadowX + dx] === 0) {
                    shadowX += dx;
                    shadowY += dy;
                }
                queue.push({ type: 'MOVE', x: shadowX, y: shadowY, dir: shadowDir });
            },
            turn: (side: 'LEFT' | 'RIGHT') => {
                shadowDir = side === 'LEFT' ? (shadowDir + 3) % 4 : (shadowDir + 1) % 4;
                queue.push({ type: 'TURN', x: shadowX, y: shadowY, dir: shadowDir });
            },
            notFinished: () => {
                if (counter++ >= MAX_ITERATIONS) return false;
                return shadowX !== currentLevel.goal.x || shadowY !== currentLevel.goal.y;
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
                    setMaxSolvedLevel(prev => Math.max(prev, currentLevelId + 1));
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

            // Actor - Floating Droid (Premium Redesign)
            const ax = actorRef.current.x * tileSize + tileSize/2;
            const ay = actorRef.current.y * tileSize + tileSize/2;
            
            ctx.save();
            ctx.translate(ax, ay);
            // Rotate so 0 is North, 1 is East, 2 is South, 3 is West
            // Our coordinate eye (0, -6) is North, so we subtract 90 degrees if needed or just use current logic with fixed eye pos
            ctx.rotate((actorRef.current.dir * 90) * (Math.PI / 180));
            
            // 1. Shadow / Glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(99, 102, 241, 0.6)';
            
            // 2. Main Body (Outer Shell)
            const bodyGradient = ctx.createRadialGradient(-2, -2, 2, 0, 0, 11);
            bodyGradient.addColorStop(0, '#a5b4fc'); // Indigo 300
            bodyGradient.addColorStop(0.5, '#6366f1'); // Indigo 500
            bodyGradient.addColorStop(1, '#4338ca'); // Indigo 700
            
            ctx.fillStyle = bodyGradient;
            ctx.beginPath();
            ctx.arc(0, 0, 11, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // stop shadow for inner parts

            // 3. Glass Cover Reflection
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.ellipse(-3, -3, 5, 3, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();

            // 4. Directional "Eye" / Lens
            // Since rotation 0 is North (dy=-1), we draw the eye at (0, -6)
            ctx.translate(0, -6);
            
            // Lens Background
            ctx.fillStyle = '#1e1b4b'; // Very dark indigo
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Glowing Pupil
            const pupilGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 3);
            pupilGradient.addColorStop(0, '#ffffff');
            pupilGradient.addColorStop(0.4, '#60a5fa'); // blue 400
            pupilGradient.addColorStop(1, '#2563eb'); // blue 600
            
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#60a5fa';
            ctx.fillStyle = pupilGradient;
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Small Lens Glint
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(-1, -1, 0.8, 0, Math.PI * 2);
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
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(id => {
                        const isUnlocked = userData?.isAdmin || userData?.isSchoolAdmin || id <= maxSolvedLevel;
                        return (
                            <button 
                                key={id} 
                                onClick={() => {
                                    if (isUnlocked) {
                                        setCurrentLevelId(id);
                                    }
                                }}
                                title={!isUnlocked ? 'Complete the current level to progress' : undefined}
                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                                    currentLevelId === id 
                                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                                        : isUnlocked
                                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300 cursor-pointer'
                                            : 'bg-slate-900 text-slate-700 cursor-not-allowed opacity-40'
                                }`}
                            >
                                {id}
                            </button>
                        );
                    })}
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
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span>Run Program</span>
                        </button>
                        <div className={`grid gap-3 ${userData?.isAdmin ? 'grid-cols-2' : 'grid-cols-1'} `}>
                            <button onClick={reset} className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-colors flex items-center justify-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                <span>Reset</span>
                            </button>
                            { (userData?.isAdmin || userData?.isSchoolAdmin) && (
                                <button 
                                    onClick={() => setShowHint(true)}
                                    className={`py-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 font-bold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(245,158,11,0.1)]`}
                                >
                                    <span className="text-amber-500">💡</span>
                                    <span>Hint</span>
                                </button>
                            )}
                        </div>
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

            <HintModal show={showHint} onHide={() => setShowHint(false)} solution={currentLevel.solution} />

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
