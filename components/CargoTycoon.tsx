import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

declare global {
    interface Window {
        loadPyodide: any;
    }
}

interface CargoOrder {
    id: number;
    title: string;
    description: string;
    input: any;
    expected: any;
    allowedBlocks: string[];
    hint: string;
}

const cargoOrders: CargoOrder[] = [
    {
        id: 1,
        title: "Cargo Arrival",
        description: "Our first shipment is here. Create a list containing exactly one item: 'iron_ore'.",
        input: [],
        expected: ["iron_ore"],
        allowedBlocks: ['lists_create_with', 'text', 'variables_get', 'variables_set'],
        hint: "Use 'create list with' and add a text block 'iron_ore'."
    },
    {
        id: 2,
        title: "First Bin",
        description: "We need the first item from this inventory list. Get the element at index 0.",
        input: ["gold", "silver", "bronze"],
        expected: "gold",
        allowedBlocks: ['lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use 'in list cargo get subitem #1' (Blockly uses 1-based indexing for these blocks)."
    },
    {
        id: 3,
        title: "Last Call",
        description: "The warehouse needs the very last item in the shipment. Get the element from the end.",
        input: ["box_a", "box_b", "box_c"],
        expected: "box_c",
        allowedBlocks: ['lists_getIndex', 'variables_get', 'variables_set'],
        hint: "Change the dropdown in 'get' block to 'last'."
    },
    {
        id: 4,
        title: "Loading Dock",
        description: "A new crate has arrived! Add 'crate' to the end of our current cargo list.",
        input: ["barrel"],
        expected: ["barrel", "crate"],
        allowedBlocks: ['lists_setIndex', 'text', 'variables_get', 'variables_set'],
        hint: "Use 'in list cargo set last as crate'."
    },
    {
        id: 5,
        title: "Middle Man",
        description: "Urgent! Insert 'battery' at the very beginning of the list.",
        input: ["robot", "chip"],
        expected: ["battery", "robot", "chip"],
        allowedBlocks: ['lists_setIndex', 'text', 'variables_get', 'variables_set'],
        hint: "Use 'in list cargo insert at #1 as battery'."
    },
    {
        id: 6,
        title: "Full Shipment",
        description: "Combine our cargo with this extra list: ['tool', 'gear'].",
        input: ["drill"],
        expected: ["drill", "tool", "gear"],
        allowedBlocks: ['lists_create_with', 'text', 'variables_get', 'variables_set'],
        hint: "In Python, you can add lists together. Try creating a new list and adding it."
    },
    {
        id: 7,
        title: "Unloading",
        description: "The last item is fragile. Remove it from the cargo list.",
        input: ["glass", "vial", "mirror"],
        expected: ["glass", "vial"],
        allowedBlocks: ['lists_getIndex', 'variables_get', 'variables_set'],
        hint: "Use 'in list cargo remove last'."
    },
    {
        id: 8,
        title: "Specific Retrieval",
        description: "Order #1 is ready. Remove the item at index 0 from the list.",
        input: ["order_01", "order_02"],
        expected: ["order_02"],
        allowedBlocks: ['lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use 'in list cargo remove #1'."
    },
    {
        id: 9,
        title: "Contamination",
        description: "We found 'waste' in the cargo! Remove it.",
        input: ["food", "waste", "water"],
        expected: ["food", "water"],
        allowedBlocks: ['lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use 'in list cargo remove object' if available, or find the index and remove it."
    },
    {
        id: 10,
        title: "Sanitize",
        description: "Clear the whole list for the next shipment. Make it empty.",
        input: ["old", "data"],
        expected: [],
        allowedBlocks: ['lists_create_with', 'variables_get', 'variables_set'],
        hint: "Just set cargo to an empty 'create list with' block."
    },
    {
        id: 11,
        title: "Inventory Location",
        description: "Where is the 'diamond'? Find its index (1-based for Blockly).",
        input: ["coal", "coal", "diamond", "coal"],
        expected: 3,
        allowedBlocks: ['lists_indexOf', 'text', 'variables_get', 'variables_set'],
        hint: "Use the 'find first occurrence of' block."
    },
    {
        id: 12,
        title: "Stock Count",
        description: "How many 'apples' do we have? Count them.",
        input: ["apple", "orange", "apple", "apple"],
        expected: 3,
        allowedBlocks: ['lists_length', 'variables_get', 'variables_set'],
        hint: "Wait, counting specific items? In Python it's .count(). In Blockly, you might need a loop or check list blocks."
    },
    {
        id: 13,
        title: "Warehouse Sort",
        description: "Everything is a mess! Sort the cargo alphabetically.",
        input: ["zebra", "apple", "monkey"],
        expected: ["apple", "monkey", "zebra"],
        allowedBlocks: ['lists_sort', 'variables_get', 'variables_set'],
        hint: "Use the 'sort' block with 'alphabetic' and 'ascending'."
    },
    {
        id: 14,
        title: "Priority Flip",
        description: "Reverse the order of the cargo for backward loading.",
        input: ["part_1", "part_2", "part_3"],
        expected: ["part_3", "part_2", "part_1"],
        allowedBlocks: ['lists_reverse', 'variables_get', 'variables_set'],
        hint: "Use the 'reverse' block."
    },
    {
        id: 15,
        title: "Duplicate Shipment",
        description: "We need 5 crates of 'coal'. Create a list with 'coal' repeated 5 times.",
        input: "coal",
        expected: ["coal", "coal", "coal", "coal", "coal"],
        allowedBlocks: ['lists_repeat', 'text', 'math_number', 'variables_get', 'variables_set'],
        hint: "Use 'create list with item ... repeated ... times'."
    },
    {
        id: 16,
        title: "Short Slice",
        description: "We only need the first 2 items of this long list.",
        input: ["a", "b", "c", "d"],
        expected: ["a", "b"],
        allowedBlocks: ['lists_getSublist', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use 'get sub-list from #1 to #2'."
    },
    {
        id: 17,
        title: "End Slice",
        description: "Take only the last 2 items from the cargo.",
        input: ["x", "y", "z", "w"],
        expected: ["z", "w"],
        allowedBlocks: ['lists_getSublist', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use 'get sub-list from #3 to #4'."
    },
    {
        id: 18,
        title: "Range Slice",
        description: "Extract items from position 2 to 3 (inclusive).",
        input: ["item0", "item1", "item2", "item3", "item4"],
        expected: ["item1", "item2"],
        allowedBlocks: ['lists_getSublist', 'variables_get', 'variables_set', 'math_number'],
        hint: "Use 'get sub-list from #2 to #3'."
    },
    {
        id: 19,
        title: "Gap Scan",
        description: "Identify every second item in the cargo list (indices 0, 2, 4...).",
        input: [1, 2, 3, 4, 5, 6],
        expected: [1, 3, 5],
        allowedBlocks: ['lists_getSublist', 'variables_get', 'variables_set', 'math_number'],
        hint: "Python slice: [::2]. In Blockly, you might need a loop if sub-list doesn't support steps."
    },
    {
        id: 20,
        title: "Reverse Scan",
        description: "Create a reversed copy of the cargo using a specific technique.",
        input: ["start", "mid", "end"],
        expected: ["end", "mid", "start"],
        allowedBlocks: ['lists_reverse', 'variables_get', 'variables_set'],
        hint: "Reverse the list."
    },
    {
        id: 21,
        title: "Minimum Load",
        description: "Find the smallest number in the shipment.",
        input: [50, 10, 30, 80],
        expected: 10,
        allowedBlocks: ['math_on_list', 'variables_get', 'variables_set'],
        hint: "Use 'min of list' in the Math category (if available) or math_on_list."
    },
    {
        id: 22,
        title: "Maximum Load",
        description: "Find the largest number in the shipment.",
        input: [5, 99, 2, 45],
        expected: 99,
        allowedBlocks: ['math_on_list', 'variables_get', 'variables_set'],
        hint: "Use 'max of list'."
    },
    {
        id: 23,
        title: "Total Weight",
        description: "Calculate the sum of all numerical cargo.",
        input: [100, 200, 300],
        expected: 600,
        allowedBlocks: ['math_on_list', 'variables_get', 'variables_set'],
        hint: "Use 'sum of list'."
    },
    {
        id: 24,
        title: "Manifest Search",
        description: "Is 'gold' in the list? Return True or False.",
        input: ["iron", "copper", "gold"],
        expected: true,
        allowedBlocks: ['lists_indexOf', 'logic_compare', 'math_number', 'variables_get', 'variables_set'],
        hint: "If index of 'gold' is > 0, then it is in the list."
    },
    {
        id: 25,
        title: "Manifest Size",
        description: "How many items are in the cargo? Get the length.",
        input: ["a", "b", "c", "d", "e"],
        expected: 5,
        allowedBlocks: ['lists_length', 'variables_get', 'variables_set'],
        hint: "Use the 'length of' block."
    },
    {
        id: 26,
        title: "Nested Cargo",
        description: "Get the first item inside the second list: cargo[1][0].",
        input: [["a", "b"], ["target", "x"]],
        expected: "target",
        allowedBlocks: ['lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Get the 2nd item of cargo, then get the 1st item of that."
    },
    {
        id: 27,
        title: "Matrix Load",
        description: "Create a list containing two lists: [1, 2] and [3, 4].",
        input: [],
        expected: [[1, 2], [3, 4]],
        allowedBlocks: ['lists_create_with', 'math_number', 'variables_get', 'variables_set'],
        hint: "Create a list with two 'create list with' blocks inside."
    },
    {
        id: 28,
        title: "Flattening",
        description: "Combine [[1], [2]] into [1, 2].",
        input: [[1], [2]],
        expected: [1, 2],
        allowedBlocks: ['lists_create_with', 'lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Get both inner lists and join them."
    },
    {
        id: 29,
        title: "Filtering",
        description: "Keep only numbers greater than 10. Start with [5, 15, 2, 20].",
        input: [5, 15, 2, 20],
        expected: [15, 20],
        allowedBlocks: ['lists_create_with', 'variables_get', 'variables_set'],
        hint: "Manually construct the list with items > 10 for now."
    },
    {
        id: 30,
        title: "Processing",
        description: "Double every number: [1, 2, 3] becomes [2, 4, 6].",
        input: [1, 2, 3],
        expected: [2, 4, 6],
        allowedBlocks: ['lists_create_with', 'math_arithmetic', 'lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Create a list containing (item1 * 2), (item2 * 2), etc."
    },
    {
        id: 31,
        title: "Type Check",
        description: "Remove the number from the list [ \"A\", 1, \"B\" ].",
        input: ["A", 1, "B"],
        expected: ["A", "B"],
        allowedBlocks: ['lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Remove item at index 2."
    },
    {
        id: 32,
        title: "Formatting",
        description: "Join the list ['Cargo', 'Ready'] into a single string 'Cargo-Ready'.",
        input: ["Cargo", "Ready"],
        expected: "Cargo-Ready",
        allowedBlocks: ['text_join', 'lists_getIndex', 'text', 'variables_get', 'variables_set', 'math_number'],
        hint: "Join the first item, a dash '-', and the second item."
    },
    {
        id: 33,
        title: "Breaking",
        description: "Split the string 'item1,item2' into a list ['item1', 'item2'].",
        input: "item1,item2",
        expected: ["item1", "item2"],
        allowedBlocks: ['text_split', 'text', 'variables_get', 'variables_set'],
        hint: "Use 'split text with delimiter ','."
    },
    {
        id: 34,
        title: "Mapping",
        description: "Upper case all items in ['a', 'b'].",
        input: ["a", "b"],
        expected: ["A", "B"],
        allowedBlocks: ['lists_create_with', 'text_changeCase', 'lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Create a list with upper case of item 1 and item 2."
    },
    {
        id: 35,
        title: "Find and Replace",
        description: "Replace 'old' with 'new' in cargo ['old', 'stay', 'old'].",
        input: ["old", "stay", "old"],
        expected: ["new", "stay", "new"],
        allowedBlocks: ['lists_setIndex', 'text', 'variables_get', 'variables_set', 'math_number'],
        hint: "Set index 1 to 'new' and index 3 to 'new'."
    },
    {
        id: 36,
        title: "Range Generator",
        description: "Create a list with numbers 1, 2, 3.",
        input: [],
        expected: [1, 2, 3],
        allowedBlocks: ['lists_create_with', 'math_number', 'variables_get', 'variables_set'],
        hint: "Create a list with 1, 2, 3."
    },
    {
        id: 37,
        title: "Conditional Mapping",
        description: "Change negative -5 to 0 in [10, -5, 20].",
        input: [10, -5, 20],
        expected: [10, 0, 20],
        allowedBlocks: ['lists_setIndex', 'math_number', 'variables_get', 'variables_set'],
        hint: "Set item 2 to 0."
    },
    {
        id: 38,
        title: "Zip Packing",
        description: "Create a list of pairs: [[1, 'A'], [2, 'B']].",
        input: [],
        expected: [[1, "A"], [2, "B"]],
        allowedBlocks: ['lists_create_with', 'math_number', 'text', 'variables_get', 'variables_set'],
        hint: "Create nested lists."
    },
    {
        id: 39,
        title: "Unpack",
        description: "Get the first element of each pair in [[1, 'A'], [2, 'B']].",
        input: [[1, "A"], [2, "B"]],
        expected: [1, 2],
        allowedBlocks: ['lists_create_with', 'lists_getIndex', 'variables_get', 'variables_set', 'math_number'],
        hint: "Extract items."
    },
    {
        id: 40,
        title: "Grand Master",
        description: "Ultimate Test: Reverse the list, then sort it (ascending).",
        input: ["c", "a", "b"],
        expected: ["a", "b", "c"],
        allowedBlocks: ['lists_reverse', 'lists_sort', 'variables_get', 'variables_set'],
        hint: "Reverse then Sort!"
    }
];

const CargoTycoon: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const [currentOutput, setCurrentOutput] = useState<any>("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const pyodideRef = useRef<any>(null);
    const orderRef = useRef(cargoOrders[currentLevelIdx]);

    useEffect(() => {
        orderRef.current = cargoOrders[currentLevelIdx];
    }, [currentLevelIdx]);

    const order = cargoOrders[currentLevelIdx];

    useEffect(() => {
        const loadPyodide = async () => {
            if (window.loadPyodide) {
                if (!pyodideRef.current) {
                    try {
                        pyodideRef.current = await window.loadPyodide({
                            indexURL: "/pyodide/"
                        });
                        setIsPyodideLoaded(true);
                    } catch (err) {
                        console.error("Pyodide loading failed", err);
                    }
                } else {
                    setIsPyodideLoaded(true);
                }
                return;
            }

            const script = document.createElement('script');
            script.src = "/pyodide/pyodide.js";
            script.onload = async () => {
                try {
                    pyodideRef.current = await window.loadPyodide({
                        indexURL: "/pyodide/"
                    });
                    setIsPyodideLoaded(true);
                } catch (err) {
                    console.error("Pyodide loading failed", err);
                }
            };
            document.body.appendChild(script);
        };

        loadPyodide();

        if (!blocklyDivRef.current) return;

        const toolbox = {
            kind: 'flyoutToolbox',
            contents: order.allowedBlocks.map(type => ({ kind: 'block', type }))
        };

        if (!workspaceRef.current) {
            workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
                toolbox,
                theme: Blockly.Themes.Classic,
                trashcan: true,
                renderer: 'zelos',
                scrollbars: false,
                move: { scrollbars: false, wheel: true, drag: true }
            });

            workspaceRef.current.addChangeListener(() => {
                runLogic();
            });
        } else {
            workspaceRef.current.updateToolbox(toolbox);
            workspaceRef.current.clear();
        }

        const variable = workspaceRef.current.createVariable('cargo', 'Array');
        
        const starterBlock = workspaceRef.current.newBlock('variables_set');
        starterBlock.setFieldValue(variable.getId(), 'VAR');
        starterBlock.initSvg();
        starterBlock.render();
        starterBlock.moveBy(50, 50);

    }, [currentLevelIdx]);

    const runLogic = async () => {
        if (!workspaceRef.current || !pyodideRef.current) return;
        try {
            let userCode = pythonGenerator.workspaceToCode(workspaceRef.current);
            // Clean up Blockly variable initializers (e.g., 'cargo = None')
            userCode = userCode.split('\n')
                       .filter(line => !line.trim().match(/^[a-zA-Z_]\w*\s*=\s*None$/))
                       .join('\n')
                       .trim();
            
            setGeneratedCode(userCode);
            
            // Build a complete script that initializes the variable safely
            const inputJson = JSON.stringify(order.input);
            const fullScript = `
import json
cargo = json.loads('${inputJson.replace(/'/g, "\\'")}')
${userCode}
# Final state for result extraction
import pyodide
from js import console
result = cargo
`;
            
            await pyodideRef.current.runPythonAsync(fullScript);
            const resultProxy = pyodideRef.current.globals.get("cargo");
            
            // Convert result back to JS
            let outputValue;
            if (resultProxy && typeof resultProxy === 'object' && resultProxy.toJs) {
                outputValue = resultProxy.toJs();
            } else {
                outputValue = resultProxy;
            }
            
            setCurrentOutput(outputValue);
        } catch (e: any) {
            console.error("Pyodide execution error:", e);
            // Extract only the final error message from the traceback (e.g., "IndexError: ...")
            const errorLines = e.message.trim().split('\n');
            const lastLine = errorLines[errorLines.length - 1].trim();
            setCurrentOutput(`[Runtime Error: ${lastLine}]`);
        }
    };

    useEffect(() => {
        if (isPyodideLoaded) {
            runLogic();
        }
    }, [currentLevelIdx, isPyodideLoaded]);

    const checkSolution = () => {
        if (JSON.stringify(currentOutput) === JSON.stringify(order.expected)) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0d9488', '#0f766e', '#2dd4bf']
            });
            toast.success("Cargo Verified! Shipment Ready.");
            setIsLevelComplete(true);
        } else {
            toast.error("Manifest mismatch. Check the cargo setup.");
        }
    };

    const nextLevel = () => {
        if (currentLevelIdx < cargoOrders.length - 1) {
            setCurrentLevelIdx(prev => prev + 1);
            setIsLevelComplete(false);
            setCurrentOutput("");
        } else {
            toast.success("Grand Master Tycoon! All 40 cargo orders completed!");
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#111827] font-inter select-none overflow-hidden border-t border-teal-950">
            {/* Header */}
            <div className="h-16 bg-[#1f2937] border-b-2 border-teal-600/30 flex items-center px-8 justify-between shrink-0 shadow-2xl relative">
                <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-900/50 border-2 border-teal-500/40 transform -rotate-3">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <div>
                        <h2 className="text-teal-500 font-black uppercase tracking-tighter leading-none text-xl drop-shadow-md">Cargo Tycoon</h2>
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center">
                            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse mr-2" />
                            Work Order {order.id}: {order.title}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Efficiency Rating</span>
                    <div className="flex space-x-0.5 mt-1 overflow-x-auto max-w-[200px] h-2 pb-1">
                        {cargoOrders.map((l, i) => (
                            <div key={l.id} className={`w-1.5 h-1 rounded-full transition-all duration-500 shrink-0 ${i <= currentLevelIdx ? 'bg-teal-500' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Briefing */}
                <div className="w-80 border-r border-teal-900/20 flex flex-col bg-[#111827] shrink-0">
                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        <div className="space-y-3 bg-[#1f2937] p-4 rounded-xl border border-teal-900/30">
                             <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-black text-teal-400 uppercase tracking-[2px]">Requirements</span>
                             </div>
                             <p className="text-slate-300 text-xs leading-relaxed font-medium italic">"{order.description}"</p>
                        </div>

                        <div className="space-y-4 p-4 bg-[#030712] rounded-xl border border-slate-800 shadow-inner">
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-2 tracking-widest opacity-60">Raw Material Bin</span>
                                <div className="bg-[#1f2937] p-3 rounded-lg border-b-4 border-teal-900/50">
                                    <code className="text-xs font-mono text-teal-400 break-all">{JSON.stringify(order.input)}</code>
                                </div>
                            </div>
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-2 tracking-widest opacity-60">Manifest Target</span>
                                <div className="bg-[#1f2937] p-3 rounded-lg border-b-4 border-emerald-900/50">
                                    <code className="text-xs font-mono text-emerald-400 break-all">{JSON.stringify(order.expected)}</code>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/10 space-y-3">
                            <span className="text-[10px] font-black text-teal-400 uppercase block mb-1 tracking-widest italic">Live Processing</span>
                            <div className="space-y-3 relative z-10">
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Finished Product:</span>
                                    <span className={`text-xs font-mono font-bold ${JSON.stringify(currentOutput) === JSON.stringify(order.expected) ? 'text-emerald-400' : 'text-teal-400'} break-all`}>
                                        {currentOutput !== "" ? JSON.stringify(currentOutput) : '---'}
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)] transition-all duration-500" 
                                        style={{ width: `${(JSON.stringify(currentOutput).length / JSON.stringify(order.expected).length) * 100}%` }}
                                     />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-[#1f2937] border-t border-teal-900/20">
                         {isLevelComplete ? (
                                <button 
                                onClick={nextLevel}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase italic tracking-tighter rounded-xl shadow-lg transition-all animate-bounce"
                                >
                                    <span>Next Level</span>
                                </button>
                         ) : (
                                <button 
                                onClick={checkSolution}
                                disabled={!isPyodideLoaded}
                                className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-black uppercase italic tracking-[2px] rounded-xl shadow-lg transition-all"
                                >
                                    {!isPyodideLoaded ? 'Loading Crawler...' : 'Run code'}
                                </button>
                         )}
                         <p className="text-[9px] text-slate-600 text-center font-black tracking-widest mt-4 opacity-50 uppercase">Junior Code by NEXT</p>
                    </div>
                </div>

                {/* Workspace area */}
                <div className="flex-1 relative flex flex-col bg-[#030712]">
                    <div className="flex-1 relative">
                        <div ref={blocklyDivRef} className="absolute inset-0" />
                        
                        {/* Hint */}
                        <div className="absolute bottom-6 left-6 z-10 max-w-sm pointer-events-none">
                            <div className="bg-[#1f2937]/90 backdrop-blur-md border border-teal-900/30 p-3 rounded-xl flex items-start space-x-3 shadow-2xl">
                                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-500/20">
                                    <span className="text-teal-400 font-black">?</span>
                                </div>
                                <div>
                                    <span className="text-[8px] font-black text-teal-500 uppercase tracking-widest block mb-0.5">Instruction Manual</span>
                                    <p className="text-[10px] text-slate-400 font-bold italic leading-tight">"{order.hint}"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-32 bg-[#020617] border-t border-teal-900/20 flex flex-col overflow-hidden font-mono text-xs">
                        <div className="px-6 py-2 bg-[#0f172a] border-b border-teal-900/10 flex items-center">
                            <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Scanner Code Output</span>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <pre className="text-teal-400/80 italic leading-relaxed">
                                {generatedCode || "# Assemble blocks to scan cargo manifest..."}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .blocklyToolboxDiv { background-color: #030712 !important; border-right: 1px solid #111827 !important; }
                .blocklyTreeLabel { font-family: 'Inter', sans-serif; font-weight: 700; color: #5eead4 !important; }
                .blocklyFlyoutBackground { fill: #030712 !important; fill-opacity: 0.9 !important; }
                .blocklyWorkspace { background: #030712 !important; }
                .blocklySvg { background: transparent !important; }
                .blocklyPath { stroke-width: 2px !important; }
            `}} />
        </div>
    );
};

export default CargoTycoon;
