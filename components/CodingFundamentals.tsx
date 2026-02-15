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

interface Level {
    id: number;
    title: string;
    category: 'Variables' | 'Conditions' | 'Loops';
    description: string;
    initialCode?: string;
    expectedOutput?: any;
    allowedBlocks: string[];
    hint: string;
    validationType: 'output' | 'code' | 'manual'; // 'output' checks result, 'code' checks block usage
}

const levels: Level[] = [
    // === VARIABLES (1-20) ===
    { id: 1, title: "The Box", category: "Variables", description: "Variables are like boxes. Create a variable named 'score' and put the number 10 in it.", expectedOutput: 10, allowedBlocks: ['variables_set', 'math_number'], hint: "Use the 'set variable' block and a number block.", validationType: 'output' },
    { id: 2, title: "Name Tag", category: "Variables", description: "Create a variable named 'player' and store your name (as a text string) in it.", expectedOutput: "Player1", allowedBlocks: ['variables_set', 'text'], hint: "Use 'set variable' and a 'text' block.", validationType: 'manual' },
    { id: 3, title: "Level Up", category: "Variables", description: "The 'score' is 10. Change it to 20.", initialCode: "score = 10", expectedOutput: 20, allowedBlocks: ['variables_set', 'math_number'], hint: "Set 'score' to 20.", validationType: 'output' },
    { id: 4, title: "Math Magic", category: "Variables", description: "Set 'a' to 5 and 'b' to 3. Create a variable 'total' that is a + b.", expectedOutput: 8, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Use the math block to add 'a' and 'b'.", validationType: 'output' },
    { id: 5, title: "Swap", category: "Variables", description: "Swap the values! Set x=1, y=2. Then make x=2 and y=1.", expectedOutput: [2, 1], allowedBlocks: ['variables_set', 'math_number'], hint: "Just re-assign the variables.", validationType: 'manual' },
    { id: 6, title: "Subtraction", category: "Variables", description: "Set 'x' to 100 and 'y' to 25. Create 'result' that is x - y.", expectedOutput: 75, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Use the subtraction operator.", validationType: 'output' },
    { id: 7, title: "Multiply", category: "Variables", description: "Set 'width' to 7 and 'height' to 4. Create 'area' that is width * height.", expectedOutput: 28, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Use multiplication.", validationType: 'output' },
    { id: 8, title: "Division", category: "Variables", description: "Set 'total' to 50 and 'parts' to 5. Create 'each' that is total / parts.", expectedOutput: 10, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Use division.", validationType: 'output' },
    { id: 9, title: "Text Join", category: "Variables", description: "Set 'first' to 'Hello' and 'second' to 'World'. Create 'message' that joins them.", expectedOutput: "HelloWorld", allowedBlocks: ['variables_set', 'text', 'text_join', 'variables_get'], hint: "Use the text join block.", validationType: 'manual' },
    { id: 10, title: "Counter", category: "Variables", description: "Set 'count' to 0. Then increase it by 1, three times.", expectedOutput: 3, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Add 1 to count, then reassign.", validationType: 'output' },
    { id: 11, title: "Double It", category: "Variables", description: "Set 'num' to 7. Then double it (multiply by 2).", expectedOutput: 14, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Multiply num by 2 and reassign.", validationType: 'output' },
    { id: 12, title: "Triple Math", category: "Variables", description: "Set a=2, b=3, c=4. Create 'sum' that is a+b+c.", expectedOutput: 9, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Add all three variables.", validationType: 'output' },
    { id: 13, title: "Average", category: "Variables", description: "Set x=10, y=20. Create 'avg' that is (x+y)/2.", expectedOutput: 15, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Add then divide by 2.", validationType: 'output' },
    { id: 14, title: "Remainder", category: "Variables", description: "Set 'num' to 17 and 'div' to 5. Create 'rem' that is the remainder.", expectedOutput: 2, allowedBlocks: ['variables_set', 'math_number', 'math_modulo', 'variables_get'], hint: "Use the modulo (%) operator.", validationType: 'output' },
    { id: 15, title: "Power Up", category: "Variables", description: "Set 'base' to 2 and 'exp' to 3. Create 'power' that is base^exp (2^3=8).", expectedOutput: 8, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Use power/exponent operator.", validationType: 'output' },
    { id: 16, title: "Negative", category: "Variables", description: "Set 'positive' to 42. Create 'negative' that is -positive.", expectedOutput: -42, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Multiply by -1 or use negation.", validationType: 'output' },
    { id: 17, title: "Absolute", category: "Variables", description: "Set 'num' to -15. Create 'abs' that is the absolute value (15).", expectedOutput: 15, allowedBlocks: ['variables_set', 'math_number', 'math_single', 'variables_get'], hint: "Use the absolute value function.", validationType: 'output' },
    { id: 18, title: "Round", category: "Variables", description: "Set 'decimal' to 3.7. Create 'rounded' that rounds it to 4.", expectedOutput: 4, allowedBlocks: ['variables_set', 'math_number', 'math_round', 'variables_get'], hint: "Use the round function.", validationType: 'output' },
    { id: 19, title: "Max Value", category: "Variables", description: "Set a=5, b=12. Create 'max' that is the larger of the two.", expectedOutput: 12, allowedBlocks: ['variables_set', 'math_number', 'math_on_list', 'variables_get', 'lists_create_with'], hint: "Use max function.", validationType: 'output' },
    { id: 20, title: "Complex Calc", category: "Variables", description: "Set x=3, y=4. Create 'result' that is (x*y) + (x+y).", expectedOutput: 19, allowedBlocks: ['variables_set', 'math_number', 'math_arithmetic', 'variables_get'], hint: "Combine operations: (3*4)+(3+4)=19.", validationType: 'output' },

    // === CONDITIONS (21-40) ===
    { id: 21, title: "Gatekeeper", category: "Conditions", description: "If 'password' is '1234', set 'access' to True.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text', 'logic_boolean'], hint: "Use 'if' block and 'compare' block.", validationType: 'manual', expectedOutput: true },
    { id: 22, title: "Coin Toss", category: "Conditions", description: "If 'coin' is 'heads', set 'result' to 'win'. Else, set 'result' to 'try again'.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text'], hint: "Use 'if-else' block.", validationType: 'manual', expectedOutput: "win" },
    { id: 23, title: "Traffic Light", category: "Conditions", description: "If 'light' is 'red', set 'action' to 'stop'. Else if 'green', set to 'go'.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text'], hint: "Click the gear on the 'if' block to add 'else if'.", validationType: 'manual', expectedOutput: "stop" },
    { id: 24, title: "Comparison", category: "Conditions", description: "If 'score' > 50, set 'medal' to 'gold'.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text', 'math_number'], hint: "Use the comparison block (>).", validationType: 'manual', expectedOutput: "gold" },
    { id: 25, title: "Logic Master", category: "Conditions", description: "If 'day' is 'Saturday' OR 'Sunday', set 'weekend' to True.", allowedBlocks: ['controls_if', 'logic_operation', 'logic_compare', 'variables_set', 'text', 'logic_boolean'], hint: "Use the 'OR' block.", validationType: 'manual', expectedOutput: true },
    { id: 26, title: "Age Check", category: "Conditions", description: "If 'age' >= 18, set 'adult' to True, else False.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'math_number', 'logic_boolean'], hint: "Use >= comparison.", validationType: 'manual', expectedOutput: true },
    { id: 27, title: "Range Check", category: "Conditions", description: "If 'temp' is between 20 and 30 (inclusive), set 'comfortable' to True.", allowedBlocks: ['controls_if', 'logic_operation', 'logic_compare', 'variables_set', 'math_number', 'logic_boolean'], hint: "Use AND: temp>=20 AND temp<=30.", validationType: 'manual', expectedOutput: true },
    { id: 28, title: "Even or Odd", category: "Conditions", description: "If 'num' is even, set 'type' to 'even', else 'odd'.", allowedBlocks: ['controls_if', 'logic_compare', 'math_modulo', 'variables_set', 'text', 'math_number'], hint: "Use modulo: num % 2 == 0.", validationType: 'manual', expectedOutput: "even" },
    { id: 29, title: "Positive Check", category: "Conditions", description: "If 'value' > 0, set 'sign' to 'positive'. If < 0, 'negative'. Else 'zero'.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text', 'math_number'], hint: "Use if-else if-else.", validationType: 'manual', expectedOutput: "positive" },
    { id: 30, title: "Grade System", category: "Conditions", description: "If 'score' >= 90, set 'grade' to 'A'. Else if >= 80, 'B'. Else 'C'.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text', 'math_number'], hint: "Multiple else-if conditions.", validationType: 'manual', expectedOutput: "A" },
    { id: 31, title: "Login Check", category: "Conditions", description: "If 'user' is 'admin' AND 'pass' is 'secret', set 'logged' to True.", allowedBlocks: ['controls_if', 'logic_operation', 'logic_compare', 'variables_set', 'text', 'logic_boolean'], hint: "Use AND operator.", validationType: 'manual', expectedOutput: true },
    { id: 32, title: "Discount", category: "Conditions", description: "If 'amount' > 100, set 'discount' to 10. Else 0.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'math_number'], hint: "Simple if-else with numbers.", validationType: 'manual', expectedOutput: 10 },
    { id: 33, title: "Max of Three", category: "Conditions", description: "Given a=5, b=12, c=8, set 'max' to the largest.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'math_number'], hint: "Nested if statements.", validationType: 'manual', expectedOutput: 12 },
    { id: 34, title: "Leap Year", category: "Conditions", description: "If 'year' is divisible by 4, set 'leap' to True, else False.", allowedBlocks: ['controls_if', 'logic_compare', 'math_modulo', 'variables_set', 'math_number', 'logic_boolean'], hint: "year % 4 == 0.", validationType: 'manual', expectedOutput: true },
    { id: 35, title: "Triangle Type", category: "Conditions", description: "If a==b AND b==c, set 'type' to 'equilateral'. Else if a==b OR b==c, 'isosceles'. Else 'scalene'.", allowedBlocks: ['controls_if', 'logic_operation', 'logic_compare', 'variables_set', 'text'], hint: "Complex AND/OR logic.", validationType: 'manual', expectedOutput: "equilateral" },
    { id: 36, title: "Voting Age", category: "Conditions", description: "If 'age' >= 18 AND 'citizen' is True, set 'canVote' to True.", allowedBlocks: ['controls_if', 'logic_operation', 'logic_compare', 'variables_set', 'math_number', 'logic_boolean'], hint: "Both conditions must be true.", validationType: 'manual', expectedOutput: true },
    { id: 37, title: "Temperature Alert", category: "Conditions", description: "If 'temp' < 0, set 'alert' to 'freezing'. If > 35, 'hot'. Else 'normal'.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text', 'math_number'], hint: "Multiple conditions.", validationType: 'manual', expectedOutput: "freezing" },
    { id: 38, title: "Password Strength", category: "Conditions", description: "If 'length' >= 8, set 'strong' to True, else False.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'math_number', 'logic_boolean'], hint: "Simple comparison.", validationType: 'manual', expectedOutput: true },
    { id: 39, title: "BMI Category", category: "Conditions", description: "If 'bmi' < 18.5, set 'category' to 'underweight'. If < 25, 'normal'. Else 'overweight'.", allowedBlocks: ['controls_if', 'logic_compare', 'variables_set', 'text', 'math_number'], hint: "Sequential comparisons.", validationType: 'manual', expectedOutput: "underweight" },
    { id: 40, title: "Access Control", category: "Conditions", description: "If 'role' is 'admin' OR 'role' is 'moderator', set 'access' to 'granted'.", allowedBlocks: ['controls_if', 'logic_operation', 'logic_compare', 'variables_set', 'text'], hint: "OR condition.", validationType: 'manual', expectedOutput: "granted" },

    // === LOOPS (41-60) ===
    { id: 41, title: "Repeat Basics", category: "Loops", description: "Create a variable 'count'. Increase it by 1, repeat 5 times.", expectedOutput: 5, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "Use 'repeat 5 times' block.", validationType: 'output' },
    { id: 42, title: "While Locked", category: "Loops", description: "While 'unlocked' is False, keep setting 'try' to 'key'. (Simulated)", allowedBlocks: ['controls_whileUntil', 'logic_boolean', 'variables_set', 'text'], hint: "Use 'while' block.", validationType: 'code', expectedOutput: null },
    { id: 43, title: "Count Down", category: "Loops", description: "Start 'n' at 10. Repeat while 'n' > 0: decrease 'n' by 1.", expectedOutput: 0, allowedBlocks: ['controls_whileUntil', 'logic_compare', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "Use 'while n > 0'.", validationType: 'output' },
    { id: 44, title: "For List", category: "Loops", description: "For every 'item' in the list [1, 2, 3], add it to 'total'.", expectedOutput: 6, allowedBlocks: ['controls_forEach', 'math_arithmetic', 'variables_set', 'variables_get', 'lists_create_with', 'math_number'], hint: "Use 'for each item in list'.", validationType: 'output' },
    { id: 45, title: "Loop Master", category: "Loops", description: "Repeat 3 times: set 'cheer' to 'Hip', then set 'cheer' to 'Hooray'.", expectedOutput: "Hooray", allowedBlocks: ['controls_repeat_ext', 'math_number', 'variables_set', 'text'], hint: "Nested logic inside a loop.", validationType: 'output' },
    { id: 46, title: "Count to 10", category: "Loops", description: "Set 'i' to 0. Repeat 10 times: increase 'i' by 1.", expectedOutput: 10, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "Simple counter loop.", validationType: 'output' },
    { id: 47, title: "Sum List", category: "Loops", description: "For each 'num' in [5, 10, 15], add it to 'sum'.", expectedOutput: 30, allowedBlocks: ['controls_forEach', 'math_arithmetic', 'variables_set', 'variables_get', 'lists_create_with', 'math_number'], hint: "Initialize sum=0 first.", validationType: 'output' },
    { id: 48, title: "Multiply Loop", category: "Loops", description: "Set 'product' to 1. Repeat 4 times: multiply 'product' by 2.", expectedOutput: 16, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "1*2*2*2*2=16.", validationType: 'output' },
    { id: 49, title: "Count Up", category: "Loops", description: "Set 'n' to 0. While 'n' < 5, increase 'n' by 1.", expectedOutput: 5, allowedBlocks: ['controls_whileUntil', 'logic_compare', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "While loop with increment.", validationType: 'output' },
    { id: 50, title: "Factorial", category: "Loops", description: "Set 'fact' to 1, 'i' to 1. Repeat 5 times: multiply 'fact' by 'i', then increase 'i' by 1.", expectedOutput: 120, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "5! = 1*2*3*4*5 = 120.", validationType: 'output' },
    { id: 51, title: "Even Sum", category: "Loops", description: "For each 'num' in [2, 4, 6, 8], add it to 'total'.", expectedOutput: 20, allowedBlocks: ['controls_forEach', 'math_arithmetic', 'variables_set', 'variables_get', 'lists_create_with', 'math_number'], hint: "Sum of even numbers.", validationType: 'output' },
    { id: 52, title: "Double Loop", category: "Loops", description: "Set 'x' to 1. Repeat 3 times: double 'x' (multiply by 2).", expectedOutput: 8, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "1*2*2*2=8.", validationType: 'output' },
    { id: 53, title: "Count by 2", category: "Loops", description: "Set 'count' to 0. Repeat 5 times: increase 'count' by 2.", expectedOutput: 10, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "Add 2 each time.", validationType: 'output' },
    { id: 54, title: "While Limit", category: "Loops", description: "Set 'x' to 1. While 'x' < 100, multiply 'x' by 2.", expectedOutput: 128, allowedBlocks: ['controls_whileUntil', 'logic_compare', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "1,2,4,8,16,32,64,128.", validationType: 'output' },
    { id: 55, title: "List Product", category: "Loops", description: "For each 'num' in [2, 3, 4], multiply it to 'product' (start at 1).", expectedOutput: 24, allowedBlocks: ['controls_forEach', 'math_arithmetic', 'variables_set', 'variables_get', 'lists_create_with', 'math_number'], hint: "2*3*4=24.", validationType: 'output' },
    { id: 56, title: "Nested Count", category: "Loops", description: "Set 'total' to 0. Repeat 3 times: increase 'total' by 5.", expectedOutput: 15, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "5+5+5=15.", validationType: 'output' },
    { id: 57, title: "Power of 2", category: "Loops", description: "Set 'result' to 1. Repeat 6 times: multiply 'result' by 2.", expectedOutput: 64, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "2^6=64.", validationType: 'output' },
    { id: 58, title: "Sum Range", category: "Loops", description: "Set 'sum' to 0, 'i' to 1. Repeat 10 times: add 'i' to 'sum', increase 'i' by 1.", expectedOutput: 55, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "1+2+3+...+10=55.", validationType: 'output' },
    { id: 59, title: "Fibonacci Start", category: "Loops", description: "Set a=0, b=1. Repeat 5 times: set temp=a+b, a=b, b=temp.", expectedOutput: 8, allowedBlocks: ['controls_repeat_ext', 'math_number', 'math_arithmetic', 'variables_set', 'variables_get'], hint: "Fibonacci: 0,1,1,2,3,5,8.", validationType: 'output' },
    { id: 60, title: "Grand Total", category: "Loops", description: "For each 'val' in [10, 20, 30, 40], add it to 'grand'.", expectedOutput: 100, allowedBlocks: ['controls_forEach', 'math_arithmetic', 'variables_set', 'variables_get', 'lists_create_with', 'math_number'], hint: "Sum all values.", validationType: 'output' },
];

const CodingFundamentals: React.FC = () => {
    const blocklyDivRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const [currentOutput, setCurrentOutput] = useState<any>("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<'Variables' | 'Conditions' | 'Loops'>('Variables');
    const [zoomLevel, setZoomLevel] = useState(1);
    const pyodideRef = useRef<any>(null);
    
    const level = levels[currentLevelIdx];
    
    // Filter levels by category
    const filteredLevels = levels.filter(l => l.category === categoryFilter);
    
    // Zoom controls
    const handleZoomIn = () => {
        if (workspaceRef.current) {
            const newZoom = Math.min(zoomLevel + 0.2, 3);
            setZoomLevel(newZoom);
            workspaceRef.current.setScale(newZoom);
        }
    };
    
    const handleZoomOut = () => {
        if (workspaceRef.current) {
            const newZoom = Math.max(zoomLevel - 0.2, 0.5);
            setZoomLevel(newZoom);
            workspaceRef.current.setScale(newZoom);
        }
    };
    
    const handleFitToScreen = () => {
        if (workspaceRef.current) {
            workspaceRef.current.zoomToFit();
            setZoomLevel(workspaceRef.current.scale);
        }
    };

    useEffect(() => {
        const loadPyodide = async () => {
            if (window.loadPyodide) {
                if (!pyodideRef.current) {
                    try {
                        pyodideRef.current = await window.loadPyodide({ indexURL: "/pyodide/" });
                        setIsPyodideLoaded(true);
                    } catch (err) { console.error("Pyodide loading failed", err); }
                } else { setIsPyodideLoaded(true); }
                return;
            }
            const script = document.createElement('script');
            script.src = "/pyodide/pyodide.js";
            script.onload = async () => {
                try {
                    pyodideRef.current = await window.loadPyodide({ indexURL: "/pyodide/" });
                    setIsPyodideLoaded(true);
                } catch (err) { console.error("Pyodide loading failed", err); }
            };
            document.body.appendChild(script);
        };
        loadPyodide();

        if (!blocklyDivRef.current) return;

        const toolbox = {
            kind: 'flyoutToolbox',
            contents: level.allowedBlocks.map(type => ({ kind: 'block', type }))
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
            workspaceRef.current.addChangeListener(() => runLogic());
        } else {
            workspaceRef.current.updateToolbox(toolbox);
            workspaceRef.current.clear();
        }

        // Pre-create variables based on level to prevent scoping issues
        if (workspaceRef.current) {
            const variablesToCreate: string[] = [];
            
            // Define which variables each level needs
            const varMap: Record<number, string[]> = {
                1: ['score'], 2: ['player'], 3: ['score'], 4: ['a', 'b', 'total'], 5: ['x', 'y'],
                6: ['x', 'y', 'result'], 7: ['width', 'height', 'area'], 8: ['total', 'parts', 'each'],
                9: ['first', 'second', 'message'], 10: ['count'], 11: ['num'], 12: ['a', 'b', 'c', 'sum'],
                13: ['x', 'y', 'avg'], 14: ['num', 'div', 'rem'], 15: ['base', 'exp', 'power'],
                16: ['positive', 'negative'], 17: ['num', 'abs'], 18: ['decimal', 'rounded'],
                19: ['a', 'b', 'max'], 20: ['x', 'y', 'result'],
                21: ['password', 'access'], 22: ['coin', 'result'], 23: ['light', 'action'],
                24: ['score', 'medal'], 25: ['day', 'weekend'], 26: ['age', 'adult'],
                27: ['temp', 'comfortable'], 28: ['num', 'type'], 29: ['value', 'sign'],
                30: ['score', 'grade'], 31: ['user', 'pass', 'logged'], 32: ['amount', 'discount'],
                33: ['a', 'b', 'c', 'max'], 34: ['year', 'leap'], 35: ['a', 'b', 'c', 'type'],
                36: ['age', 'citizen', 'canVote'], 37: ['temp', 'alert'], 38: ['length', 'strong'],
                39: ['bmi', 'category'], 40: ['role', 'access'],
                41: ['count'], 42: ['unlocked', 'try'], 43: ['n'], 44: ['item', 'total'], 45: ['cheer'],
                46: ['i'], 47: ['num', 'sum'], 48: ['product'], 49: ['n'], 50: ['fact', 'i'],
                51: ['num', 'total'], 52: ['x'], 53: ['count'], 54: ['x'], 55: ['num', 'product'],
                56: ['total'], 57: ['result'], 58: ['sum', 'i'], 59: ['a', 'b', 'temp'], 60: ['val', 'grand']
            };
            
            const vars = varMap[level.id] || [];
            vars.forEach(varName => {
                if (!workspaceRef.current!.getVariable(varName)) {
                    workspaceRef.current!.createVariable(varName);
                }
            });
        }
    }, [currentLevelIdx]);

    const runLogic = async () => {
        if (!workspaceRef.current || !pyodideRef.current) return;
        try {
            let userCode = pythonGenerator.workspaceToCode(workspaceRef.current);
             // Safety cleanup
            userCode = userCode.split('\n').filter(line => !line.trim().match(/^[a-zA-Z_]\w*\s*=\s*None$/)).join('\n').trim();
            setGeneratedCode(userCode);

            // Context Setup based on level type
            let setupCode = "";
            if (level.id === 2) setupCode = "player = ''";
            if (level.id === 3) setupCode = "score = 10";
            if (level.id === 4) setupCode = "a=0\nb=0\ntotal=0";
            if (level.id === 5) setupCode = "x=1\ny=2";
            if (level.id === 6) setupCode = "x=0\ny=0\nresult=0";
            if (level.id === 7) setupCode = "width=0\nheight=0\narea=0";
            if (level.id === 8) setupCode = "total=0\nparts=0\neach=0";
            if (level.id === 9) setupCode = "first=''\nsecond=''\nmessage=''";
            if (level.id === 10) setupCode = "count=0";
            if (level.id === 11) setupCode = "num=0";
            if (level.id === 12) setupCode = "a=0\nb=0\nc=0\nsum=0";
            if (level.id === 13) setupCode = "x=0\ny=0\navg=0";
            if (level.id === 14) setupCode = "num=0\ndiv=0\nrem=0";
            if (level.id === 15) setupCode = "base=0\nexp=0\npower=0";
            if (level.id === 16) setupCode = "positive=0\nnegative=0";
            if (level.id === 17) setupCode = "num=0\nabs=0";
            if (level.id === 18) setupCode = "decimal=0\nrounded=0";
            if (level.id === 19) setupCode = "a=0\nb=0\nmax=0";
            if (level.id === 20) setupCode = "x=0\ny=0\nresult=0";
            // Conditions (21-40)
            if (level.id === 21) setupCode = "password='1234'\naccess=False";
            if (level.id === 22) setupCode = "coin='heads'\nresult=''";
            if (level.id === 23) setupCode = "light='red'\naction=''";
            if (level.id === 24) setupCode = "score=51\nmedal=''";
            if (level.id === 25) setupCode = "day='Saturday'\nweekend=False";
            if (level.id === 26) setupCode = "age=18\nadult=False";
            if (level.id === 27) setupCode = "temp=25\ncomfortable=False";
            if (level.id === 28) setupCode = "num=4\ntype=''";
            if (level.id === 29) setupCode = "value=5\nsign=''";
            if (level.id === 30) setupCode = "score=90\ngrade=''";
            if (level.id === 31) setupCode = "user='admin'\npass='secret'\nlogged=False";
            if (level.id === 32) setupCode = "amount=101\ndiscount=0";
            if (level.id === 33) setupCode = "a=5\nb=12\nc=8\nmax=0";
            if (level.id === 34) setupCode = "year=2024\nleap=False";
            if (level.id === 35) setupCode = "a=5\nb=5\nc=5\ntype=''";
            if (level.id === 36) setupCode = "age=18\ncitizen=True\ncanVote=False";
            if (level.id === 37) setupCode = "temp=-5\nalert=''";
            if (level.id === 38) setupCode = "length=8\nstrong=False";
            if (level.id === 39) setupCode = "bmi=18\ncategory=''";
            if (level.id === 40) setupCode = "role='admin'\naccess=''";
            // Loops (41-60)
            if (level.id === 41) setupCode = "count=0";
            if (level.id === 43) setupCode = "n=10";
            if (level.id === 44) setupCode = "total=0";
            if (level.id === 46) setupCode = "i=0";
            if (level.id === 47) setupCode = "sum=0";
            if (level.id === 48) setupCode = "product=1";
            if (level.id === 49) setupCode = "n=0";
            if (level.id === 50) setupCode = "fact=1\ni=1";
            if (level.id === 51) setupCode = "total=0";
            if (level.id === 52) setupCode = "x=1";
            if (level.id === 53) setupCode = "count=0";
            if (level.id === 54) setupCode = "x=1";
            if (level.id === 55) setupCode = "product=1";
            if (level.id === 56) setupCode = "total=0";
            if (level.id === 57) setupCode = "result=1";
            if (level.id === 58) setupCode = "sum=0\ni=1";
            if (level.id === 59) setupCode = "a=0\nb=1\ntemp=0";
            if (level.id === 60) setupCode = "grand=0";


            const fullScript = `
${setupCode}
${userCode}
# Wrapper to extract all vars
import json
g = globals().copy()
# Filter out system vars
res = {k: v for k, v in g.items() if not k.startswith('_') and k not in ['json', 'g', 'res', 'js', 'pyodide', 'open', 'quit', 'exit', 'copyright', 'credits', 'license', 'help']}
# Convert list/dict to string if need safely, or just keep as is for JS conversion
result = res
`;
            
            await pyodideRef.current.runPythonAsync(fullScript);
            const resultProxy = pyodideRef.current.globals.get("result");
            const outputValue = resultProxy.toJs();
            
            setCurrentOutput(outputValue);
        } catch (e: any) {
            console.error("Pyodide execution error:", e);
            const errorLines = e.message.trim().split('\n');
            const lastLine = errorLines[errorLines.length - 1].trim();
            setCurrentOutput(`[Error: ${lastLine}]`);
        }
    };

    const checkSolution = () => {
        let isCorrect = false;
        const currentVals = currentOutput as any;

        // Generic validation based on level's validationType
        if (level.validationType === 'output') {
            // For output validation, check the main variable from the level description
            const mainVar = Object.keys(currentVals || {}).find(k => 
                !['a', 'b', 'c', 'x', 'y', 'i', 'temp', 'first', 'second', 'width', 'height', 'parts', 'div', 'exp', 'base', 'positive', 'decimal', 'num'].includes(k)
            );
            if (mainVar && currentVals[mainVar] === level.expectedOutput) {
                isCorrect = true;
            }
        } else if (level.validationType === 'manual') {
            // Manual validation for specific cases
            const id = level.id;
            if (id === 2) isCorrect = typeof currentVals?.player === 'string' && currentVals?.player.length > 0;
            else if (id === 5) isCorrect = currentVals?.x === 2 && currentVals?.y === 1;
            else if (id === 9) isCorrect = typeof currentVals?.message === 'string' && currentVals?.message.length > 0;
            else if ([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].includes(id)) {
                // Conditions - check the result variable
                const resultVars = ['access', 'result', 'action', 'medal', 'weekend', 'adult', 'comfortable', 'type', 'sign', 'grade', 'logged', 'discount', 'max', 'leap', 'canVote', 'alert', 'strong', 'category'];
                const resultVar = resultVars.find(v => currentVals?.[v] !== undefined);
                if (resultVar) isCorrect = currentVals[resultVar] === level.expectedOutput;
            }
        } else if (level.validationType === 'code') {
            // Code structure validation
            isCorrect = generatedCode.includes('while') && !generatedCode.includes('True');
        }

        if (isCorrect) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#6366f1', '#8b5cf6', '#d946ef'] });
            toast.success("Correct!");
            setIsLevelComplete(true);
        } else {
            toast.error("Wrong approach!");
        }
    };

    const nextLevel = () => {
        if (currentLevelIdx < levels.length - 1) {
            setCurrentLevelIdx(prev => prev + 1);
            setIsLevelComplete(false);
            setCurrentOutput("");
            setGeneratedCode("");
        } else {
            toast.success("Code Dojo Master! You've learned the fundamentals!");
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 font-inter select-none overflow-hidden border-t border-slate-900">
             {/* Header */}
             <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-8 justify-between shrink-0 shadow-2xl relative z-20">
                <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-600/30 border border-violet-400/40 transform rotate-3 hover:rotate-0 transition-transform">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-white font-black uppercase italic tracking-tighter leading-none text-2xl hover:text-violet-400 transition-colors">Code<br/>Dojo</h2>
                    </div>
                    <div className="h-8 w-px bg-slate-800 mx-2" />
                    <div>
                        <span className="text-violet-400 text-[10px] font-black uppercase tracking-widest flex items-center">
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse mr-2" />
                            {level.category} Lesson
                        </span>
                        <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">Fundamentals Training</p>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Category Filter Buttons */}
                    <div className="flex items-center space-x-2 bg-slate-950/50 rounded-xl p-1 border border-slate-800">
                        {(['Variables', 'Conditions', 'Loops'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setCategoryFilter(cat);
                                    // Reset to first level of selected category
                                    const firstIdx = levels.findIndex(l => l.category === cat);
                                    setCurrentLevelIdx(firstIdx >= 0 ? firstIdx : 0);
                                    setIsLevelComplete(false);
                                }}
                                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                                    categoryFilter === cat
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Belt Progress</span>
                        <div className="flex space-x-1">
                            {filteredLevels.map((l, i) => (
                                <div 
                                    key={l.id} 
                                    className={`w-2 h-1 rounded-full transition-all duration-500 ${
                                        levels.indexOf(l) <= currentLevelIdx 
                                            ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]' 
                                            : 'bg-slate-800'
                                    }`} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Briefing */}
                <div className="w-64 border-r border-slate-900 flex flex-col bg-slate-950 shrink-0 relative z-10 shadow-2xl">
                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        {/* Instructor */}
                        <div className="flex items-start space-x-3">
                            <img 
                                src="https://api.dicebear.com/9.x/avataaars/svg?seed=Commander&backgroundColor=6366f1"
                                alt="Commander" 
                                className="w-12 h-12 rounded-xl bg-violet-500/20 p-1 border border-violet-500/30"
                            />
                            <div className="flex-1 bg-slate-900/80 rounded-2xl p-4 rounded-tl-none border border-slate-800 backdrop-blur-sm">
                                <h4 className="text-violet-400 font-black text-[9px] uppercase tracking-widest mb-1">Code Commander</h4>
                                <p className="text-slate-300 text-xs font-medium leading-relaxed italic">"{level.description}"</p>
                            </div>
                        </div>

                         <div className="h-px bg-slate-900 w-full" />

                         <div className="space-y-4 p-5 bg-slate-900/50 rounded-2xl border border-slate-800 shadow-inner">
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-2 tracking-widest opacity-60">Lesson Goal</span>
                                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50">
                                    <p className="text-xs font-mono text-violet-300 break-words">{level.hint}</p>
                                </div>
                            </div>
                         </div>

                        {/* Status Output */}
                        <div className="p-5 bg-violet-500/5 rounded-2xl border border-violet-500/10 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest italic">Live Memory</span>
                                <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-ping" />
                            </div>
                            <div className="space-y-2">
                                {currentOutput && typeof currentOutput === 'object' ? (
                                    Object.entries(currentOutput)
                                        .filter(([k, v]) => {
                                            // Filter out error objects and nested structures
                                            if (typeof v === 'object' && v !== null) {
                                                // Check if it's an error-like object
                                                const str = JSON.stringify(v);
                                                if (str.includes('"result"') || str.length > 100) {
                                                    return false;
                                                }
                                            }
                                            return true;
                                        })
                                        .map(([k, v]) => (
                                            <div key={k} className="flex justify-between items-center px-1 border-b border-violet-500/10 last:border-0 pb-1">
                                                <span className="text-[10px] text-slate-500 font-bold">{k}:</span>
                                                <span className="text-xs font-mono font-bold text-violet-300">
                                                    {typeof v === 'string' ? `"${v}"` : String(v)}
                                                </span>
                                            </div>
                                        ))
                                ) : (
                                    <div className="text-[10px] text-slate-600 italic text-center py-2">No variables tracked</div>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="p-6 bg-slate-900 border-t border-slate-800">
                         {isLevelComplete ? (
                                <button 
                                onClick={nextLevel}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase italic tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
                                >
                                    <span>Next Lesson</span>
                                </button>
                         ) : (
                                <button 
                                onClick={checkSolution}
                                disabled={!isPyodideLoaded}
                                className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-black uppercase italic tracking-widest rounded-2xl shadow-xl shadow-violet-600/20 transition-all disabled:opacity-50 transform hover:-translate-y-1 active:translate-y-0"
                                >
                                    {!isPyodideLoaded ? 'Loading Dojo...' : 'Run Code'}
                                </button>
                         )}
                    </div>
                </div>

                {/* Workspace */}
                <div className="flex-1 relative flex flex-col bg-slate-950">
                    <div className="flex-1 relative">
                        <div ref={blocklyDivRef} className="absolute inset-0" />
                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(139,92,246,0.2) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
                        
                        {/* Zoom Controls */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2 pointer-events-auto z-50">
                            <button
                                onClick={handleZoomIn}
                                className="w-10 h-10 bg-slate-900 hover:bg-violet-600 border border-slate-800 hover:border-violet-500 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-lg group"
                                title="Zoom In"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleZoomOut}
                                className="w-10 h-10 bg-slate-900 hover:bg-violet-600 border border-slate-800 hover:border-violet-500 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-lg group"
                                title="Zoom Out"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 12H6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleFitToScreen}
                                className="w-10 h-10 bg-slate-900 hover:bg-violet-600 border border-slate-800 hover:border-violet-500 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-lg group"
                                title="Fit to Screen"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </button>
                            
                            {/* Zoom Level Indicator */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-center">
                                <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest">
                                    {Math.round(zoomLevel * 100)}%
                                </span>
                            </div>
                        </div>
                    </div>
                     <div className="h-80 bg-slate-900 border-t border-slate-800 flex flex-col overflow-hidden font-mono text-xs">
                        <div className="px-6 py-2 bg-slate-950/50 border-b border-slate-800">
                            <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest">Python Output</span>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <pre className="text-violet-300/80 italic leading-relaxed h-64 ">
                                {generatedCode || "# Code will appear here..."}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .blocklyToolboxDiv { background-color: #020617 !important; border-right: 1px solid #1e293b !important; padding-top: 1rem; }
                .blocklyTreeLabel { font-family: 'Inter', sans-serif; font-weight: 700; color: #94a3b8 !important; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; }
                .blocklyTreeRow:hover { background-color: #1e293b !important; }
                .blocklyTreeRow.blocklyTreeSelected { background-color: #4c1d95 !important; border-left: 4px solid #8b5cf6 !important; }
                .blocklyTreeRow.blocklyTreeSelected .blocklyTreeLabel { color: #fff !important; }
                .blocklyFlyoutBackground { fill: #020617 !important; fill-opacity: 0.95 !important; }
                .blocklyWorkspace { background: #020617 !important; }
                .blocklySvg { background: transparent !important; }
                .blocklyPath { stroke-width: 2.5px !important; }
            `}} />
        </div>
    );
};

export default CodingFundamentals;
