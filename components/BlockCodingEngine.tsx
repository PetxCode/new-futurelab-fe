
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
    },
    {
        id: 16,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 4, y: 5 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 6,
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
        id: 17,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 7, dir: 1 },
        goal: { x: 7, y: 1 },
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
        id: 18,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 1, y: 7 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
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
        id: 19,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 1, y: 7 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 8,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
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
        id: 20,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 8, y: 7 },
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
        id: 21,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 4, y: 5 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 6,
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
        id: 22,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 8, y: 7 },
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
        id: 23,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 2 },
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
                ]},
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]}
            ]}
        ]
    },
    {
        id: 24,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 8, y: 8 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
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
        id: 25,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 4, y: 5 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 6,
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
        id: 26,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
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
                ]},
                { type: 'if path to the left ↺', children: [
                    { type: 'turn left ↺' }
                ]}
            ]}
        ]
    },
    {
        id: 27,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 5, y: 4 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 7,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'if path to the right ↻', children: [
                    { type: 'turn right ↻' }
                ]},
                { type: 'if path ahead', children: [
                    { type: 'move forward' }
                ]}
            ]}
        ]
    },
    {
        id: 28,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 4, y: 5 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 6,
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
        id: 29,
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
        maxBlocks: 8,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
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
        id: 30,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1, dir: 1 },
        goal: { x: 4, y: 5 },
        blocks: ['maze_moveForward', 'maze_turn', 'maze_repeatUntil', 'maze_ifPath'],
        maxBlocks: 6,
        solution: [
            { type: 'repeat until 🏁', children: [
                { type: 'move forward' },
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

const BlockCodingEngine: React.FC<{ 
    userData?: User | null, 
    battleMode?: boolean,
    onLevelChange?: (level: number) => void
}> = ({ userData, battleMode, onLevelChange }) => {
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

                if (currentLevelId < 30) {
                    setMaxSolvedLevel(prev => Math.max(prev, currentLevelId + 1));
                    onLevelChange?.(currentLevelId);
                    setTimeout(() => setCurrentLevelId(id => id + 1), 1500);
                } else if (currentLevelId === 30) {
                    onLevelChange?.(30);
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
            
            // 1. Bot Body (Main Shell)
            ctx.fillStyle = '#4f46e5'; // Indigo 600
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.fill();

            // 2. Metallic Rim
            ctx.strokeStyle = '#312e81'; // Indigo 900
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.stroke();

            // 3. Glowing Core / Power Indicator
            const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 8);
            coreGradient.addColorStop(0, 'rgba(129, 140, 248, 0.8)'); // Indigo 400
            coreGradient.addColorStop(1, 'rgba(79, 70, 229, 0)'); // Indigo 600
            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();

            // 4. Glass Cover Reflection (Subtle)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.ellipse(-4, -4, 6, 4, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();

            // 5. Directional Face / Eye Module (Properly Positioned)
            ctx.translate(0, -5); 
            
            // Face Plate
            ctx.fillStyle = '#0f172a'; // Slate 950
            ctx.beginPath();
            ctx.ellipse(0, 0, 7, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Main Eye / Lens (The "White Dot" but improved)
            const pupilGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 3.5);
            pupilGradient.addColorStop(0, '#ffffff');
            pupilGradient.addColorStop(0.3, '#c7d2fe'); // indigo 200
            pupilGradient.addColorStop(1, '#6366f1'); // indigo 500
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#818cf8';
            ctx.fillStyle = pupilGradient;
            ctx.beginPath();
            ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Tiny Glint
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(-1, -1, 1, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            requestAnimationFrame(render);
        };
        render();
    }, [currentLevelId]);

    const currentUserData = userData || (() => {
        try {
            const stored = localStorage.getItem('userData');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    })();

    const isAdminUser = Boolean(
        currentUserData?.isAdmin ||
        currentUserData?.isSchoolAdmin ||
        currentUserData?.isInstructor ||
        currentUserData?.role === 'admin' ||
        currentUserData?.role === 'superadmin' ||
        localStorage.getItem('isAdmin') === 'true'
    );

    const stages = [
        { number: 1, title: 'Stage 1', levels: [1, 2, 3, 4, 5] },
        { number: 2, title: 'Stage 2', levels: [6, 7, 8, 9, 10] },
        { number: 3, title: 'Stage 3', levels: [11, 12, 13, 14, 15] },
        { number: 4, title: 'Stage 4', levels: [16, 17, 18, 19, 20] },
        { number: 5, title: 'Stage 5', levels: [21, 22, 23, 24, 25] },
        { number: 6, title: 'Stage 6', levels: [26, 27, 28, 29, 30] },
    ];

    const [activeStage, setActiveStage] = useState<number>(() => Math.ceil(currentLevelId / 5));

    useEffect(() => {
        setActiveStage(Math.ceil(currentLevelId / 5));
    }, [currentLevelId]);

    return (
        <div className="flex flex-col h-full w-full bg-slate-900 text-white font-inter overflow-hidden border-t border-slate-800">
            {/* Nav Header */}
            <div className="flex flex-col bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-3">
                {/* Top Row: Title, Admin Badge, Stage Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 21l-8-4.5v-9L12 3l8 4.5v9z" /></svg>
                        </div>
                        <div>
                            <span className="text-white font-black uppercase tracking-tighter italic text-base">Maze Navigator</span>
                            <span className="text-[10px] text-slate-400 font-bold ml-2">30 Levels • 6 Stages</span>
                        </div>
                        {isAdminUser && (
                            <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                <span>🛡️</span> Admin Access
                            </span>
                        )}
                    </div>

                    {/* Stage Selector Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
                        {stages.map(stage => {
                            const isCurrentStage = activeStage === stage.number;
                            const hasCurrentLevel = stage.levels.includes(currentLevelId);

                            return (
                                <button
                                    key={stage.number}
                                    onClick={() => setActiveStage(stage.number)}
                                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all flex items-center space-x-1.5 shrink-0 ${
                                        isCurrentStage
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                                            : hasCurrentLevel
                                                ? 'bg-slate-800 text-indigo-300 border border-indigo-500/30'
                                                : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                                    }`}
                                >
                                    <span>{stage.title}</span>
                                    <span className="text-[9px] opacity-70 font-normal">({stage.levels[0]}-{stage.levels[4]})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Level Selector Bar (5 Levels for Active Stage + quick jump) */}
                <div className="flex items-center justify-between bg-slate-950/70 border border-slate-800/80 rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mr-1">
                            Stage {activeStage} Levels:
                        </span>
                        <div className="flex items-center space-x-2">
                            {stages.find(s => s.number === activeStage)?.levels.map(id => {
                                const isUnlocked = isAdminUser || id <= maxSolvedLevel;
                                const isCurrent = currentLevelId === id;

                                return (
                                    <button
                                        key={id}
                                        onClick={() => {
                                            if (isUnlocked) {
                                                setCurrentLevelId(id);
                                            }
                                        }}
                                        title={isAdminUser ? `Level ${id} (Admin Unlocked)` : !isUnlocked ? `Complete Level ${id - 1} to unlock` : `Level ${id}`}
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all relative ${
                                            isCurrent
                                                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] ring-2 ring-indigo-400 scale-105'
                                                : isUnlocked
                                                    ? 'bg-slate-800 text-slate-200 hover:bg-indigo-900/40 hover:text-indigo-200 hover:border-indigo-500/50 border border-slate-700 cursor-pointer'
                                                    : 'bg-slate-900/60 text-slate-600 border border-slate-800/60 cursor-not-allowed'
                                        }`}
                                    >
                                        <span>{id}</span>
                                        {!isUnlocked && !isAdminUser && (
                                            <span className="absolute -top-1 -right-1 text-[8px]">🔒</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Level Navigation Controls */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                if (currentLevelId > 1) setCurrentLevelId(prev => prev - 1);
                            }}
                            disabled={currentLevelId <= 1}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 rounded-lg text-xs font-bold transition flex items-center space-x-1"
                        >
                            <span>←</span>
                            <span className="hidden sm:inline">Prev</span>
                        </button>
                        <span className="text-xs font-black text-slate-400 px-1">
                            {currentLevelId} / 30
                        </span>
                        <button
                            onClick={() => {
                                const nextId = currentLevelId + 1;
                                if (nextId <= 30 && (isAdminUser || nextId <= maxSolvedLevel)) {
                                    setCurrentLevelId(nextId);
                                }
                            }}
                            disabled={currentLevelId >= 30 || (!isAdminUser && currentLevelId + 1 > maxSolvedLevel)}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 rounded-lg text-xs font-bold transition flex items-center space-x-1"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
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
                        <div className={`grid gap-3 ${isAdminUser ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            <button onClick={reset} className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-colors flex items-center justify-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                <span>Reset</span>
                            </button>
                            {isAdminUser && (
                                <button 
                                    onClick={() => setShowHint(true)}
                                    className="py-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 font-bold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(245,158,11,0.1)] cursor-pointer"
                                >
                                    <span className="text-amber-500">💡</span>
                                    <span>Hint Solution</span>
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
