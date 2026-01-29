export interface BotChallenge {
  id: string;
  title: string;
  story: string;
  goal: string;
  concept: string;
  initialCode: string;
  hint: string;
  solution: string;
  check: (code: string) => { success: boolean; message: string };
}

export const BOT_WORKSHOP_LEVELS: BotChallenge[] = [
  {
    id: 'bot-var-1',
    title: 'Core Initialization',
    story: 'The Nano-Bot is offline. To boot up the system, we need to set the "power_level" to 100.',
    goal: 'Declare a variable "power_level" and set it to 100.',
    concept: 'Variable Assignment',
    initialCode: 'power_level = 0',
    hint: 'Change 0 to 100.',
    solution: 'power_level = 100',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('power_level=100')) {
        return { success: true, message: 'Core online! The bot\'s eyes glow a steady blue.' };
      }
      return { success: false, message: 'System remains dark. Did you set power_level to 100?' };
    }
  },
  {
    id: 'bot-math-1',
    title: 'Energy Reserve',
    story: 'The bot needs a boost to jump over a circuit gap. Add 50 to the current energy.',
    goal: 'Update "energy" by adding 50 to its current value of 100.',
    concept: 'Addition Math',
    initialCode: 'energy = 100\nenergy = energy',
    hint: 'Use: energy = energy + 50',
    solution: 'energy = energy + 50',
    check: (code) => {
      if (code.includes('energy + 50') || code.includes('energy += 50')) {
        return { success: true, message: 'Boost engaged! The bot clears the gap with ease.' };
      }
      return { success: false, message: 'Not enough power to jump. Check your addition.' };
    }
  },
  {
    id: 'bot-bool-1',
    title: 'Sensor Calibration',
    story: 'The bot\'s proximity sensor is detecting an obstacle. If "sensor_active" is True, it will avoid the collision.',
    goal: 'Set "sensor_active" to True.',
    concept: 'Booleans',
    initialCode: 'sensor_active = False',
    hint: 'Remember to capitalize the T in True.',
    solution: 'sensor_active = True',
    check: (code) => {
      if (code.includes('sensor_active = True') || code.includes('sensor_active=True')) {
        return { success: true, message: 'Obstacle avoided! Sensors are reading perfectly.' };
      }
      return { success: false, message: 'CRASH! The bot bumped into a capacitor. Check your Boolean.' };
    }
  },
  {
    id: 'bot-string-1',
    title: 'Robot Greeting',
    story: 'The bot needs to identify itself to the machine mainframe. Its name is "Nano-X".',
    goal: 'Set the variable "bot_name" to "Nano-X".',
    concept: 'String Assignment',
    initialCode: 'bot_name = ""',
    hint: 'Put "Nano-X" inside quotes.',
    solution: 'bot_name = "Nano-X"',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('bot_name="Nano-X"') || clean.includes("bot_name='Nano-X'")) {
        return { success: true, message: 'Mainframe: "Identity Confirmed. Access Granted."' };
      }
      return { success: false, message: 'Access Denied. The bot\'s name must be "Nano-X".' };
    }
  },
  {
    id: 'bot-cond-1',
    title: 'Battery Warning',
    story: 'High-power mode! If "battery" is less than 20, set "warning" to True.',
    goal: 'if battery < 20:\n    warning = True',
    concept: 'Conditionals (If)',
    initialCode: 'battery = 15\nwarning = False',
    hint: 'Use: if battery < 20:\n    warning = True',
    solution: 'if battery < 20:\n    warning = True',
    check: (code) => {
      if (code.includes('if battery < 20') && (code.includes('warning = True') || code.includes('warning=True'))) {
        return { success: true, message: 'BEEP BEEP! Warning light is flashing. Good logic!' };
      }
      return { success: false, message: 'The battery drained without warning. Check your if statement.' };
    }
  },
  {
    id: 'bot-list-1',
    title: 'Part Inventory',
    story: 'The bot has found a "Hyper-Core"! Add it to the list of "parts".',
    goal: 'Use .append() to add "Hyper-Core" to the "parts" list.',
    concept: 'List Append',
    initialCode: 'parts = ["Sensor", "Arm"]\n# Append here',
    hint: 'Use: parts.append("Hyper-Core")',
    solution: 'parts.append("Hyper-Core")',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('.append("Hyper-Core")') || clean.includes(".append('Hyper-Core')")) {
        return { success: true, message: 'Inventory Updated! You feel faster already.' };
      }
      return { success: false, message: 'The Hyper-Core fell off. Did you use .append()?' };
    }
  },
  {
    id: 'bot-loop-1',
    title: 'Circuit Pulse',
    story: 'To reboot the data cable, the bot must send 3 pulses. Use a for loop.',
    goal: 'for i in range(3):\n    send_pulse()',
    concept: 'For Loops',
    initialCode: 'for i in range(1):\n    send_pulse()',
    hint: 'Change range(1) to range(3).',
    solution: 'for i in range(3):\n    send_pulse()',
    check: (code) => {
      if (code.includes('range(3)')) {
        return { success: true, message: 'Pulse... Pulse... Pulse... Circuit restored!' };
      }
      return { success: false, message: 'The cable is still dead. Did you send 3 pulses?' };
    }
  },
  {
    id: 'bot-math-2',
    title: 'Energy Efficiency',
    story: 'Calculating efficiency! Divide "input_power" (100) by "loss" (4).',
    goal: 'Set "efficiency" to 100 divided by 4 using the / operator.',
    concept: 'Division',
    initialCode: 'input_power = 100\nloss = 4\nefficiency = 0',
    hint: 'Use: efficiency = 100 / 4',
    solution: 'efficiency = 100 / 4',
    check: (code) => {
      if (code.includes('100 / 4') || code.includes('25')) {
        return { success: true, message: 'Efficiency is 25%. System optimized.' };
      }
      return { success: false, message: 'Math error detected. Check your division.' };
    }
  },
  {
    id: 'bot-func-1',
    title: 'Nano-Repair Drone',
    story: 'Define a function "repair" that prints "Fixing...".',
    goal: 'def repair():\n    print("Fixing...")',
    concept: 'Function Definition',
    initialCode: '# Define here',
    hint: 'Start with def repair(): and indent the print.',
    solution: 'def repair():\n    print("Fixing...")',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('defrepair():') && (clean.includes('print("Fixing...")') || clean.includes("print('Fixing...')"))) {
        return { success: true, message: 'ZAP! The broken circuit is fixed. Repair function active.' };
      }
      return { success: false, message: 'The bot just stared at the repair. Check your function syntax.' };
    }
  },
  {
    id: 'bot-string-2',
    title: 'Status Report',
    story: 'The mainframe needs a status report in all lowercase to save bytes.',
    goal: 'Convert "STATUS" to lowercase using .lower().',
    concept: 'String Methods',
    initialCode: 'report = "STATUS"\nclean_report = report',
    hint: 'Use: clean_report = report.lower()',
    solution: 'clean_report = report.lower()',
    check: (code) => {
      if (code.includes('.lower()')) {
        return { success: true, message: 'status... Data compressed and sent.' };
      }
      return { success: false, message: 'Too many big letters! Use .lower().' };
    }
  },
  {
    id: 'bot-cond-2',
    title: 'Heat Logic',
    story: 'If "heat" is over 80, set "cooling" to "HIGH". Otherwise, set it to "LOW".',
    goal: 'Use if/else: if heat > 80, cooling = "HIGH", else cooling = "LOW".',
    concept: 'If/Else',
    initialCode: 'heat = 85\ncooling = ""',
    hint: 'if heat > 80:\n    cooling = "HIGH"\nelse:\n    cooling = "LOW"',
    solution: 'if heat > 80:\n    cooling = "HIGH"\nelse:\n    cooling = "LOW"',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('ifheat>80') && clean.includes('else') && (clean.includes('"HIGH"') || clean.includes("'HIGH'"))) {
        return { success: true, message: 'The vents open wide. Temperature stabilized.' };
      }
      return { success: false, message: 'The bot is overheating! Check your if/else logic.' };
    }
  },
  {
    id: 'bot-list-2',
    title: 'Sensor Grid',
    story: 'The bot has two sensor lists. Combine them into "full_grid".',
    goal: 'Join list1 and list2 using the + operator.',
    concept: 'List Joins',
    initialCode: 'list1 = [1, 2]\nlist2 = [3, 4]\nfull_grid = []',
    hint: 'Use: full_grid = list1 + list2',
    solution: 'full_grid = list1 + list2',
    check: (code) => {
      if (code.includes('list1 + list2')) {
        return { success: true, message: 'Sensor grid unified! Wide-angle vision active.' };
      }
      return { success: false, message: 'Vision is blurry. Did you combine the lists with +?' };
    }
  },
  {
    id: 'bot-loop-2',
    title: 'Recharge Cycle',
    story: 'While "power" is less than 50, keep "charging".',
    goal: 'while power < 50:\n    power = power + 10',
    concept: 'While Loops',
    initialCode: 'power = 20\n# Loop here',
    hint: 'while power < 50:\n    power += 10',
    solution: 'while power < 50:\n    power += 10',
    check: (code) => {
      if (code.includes('while power < 50') && (code.includes('power + 10') || code.includes('power += 10'))) {
        return { success: true, message: 'Charge complete! Power cells at optimal levels.' };
      }
      return { success: false, message: 'The bot stayed asleep. Check your while loop.' };
    }
  },
  {
    id: 'bot-dict-1',
    title: 'Component Specs',
    story: 'Create a dictionary "specs" for the bot\'s arm. "length" is 15.5.',
    goal: 'specs = {"length": 15.5}',
    concept: 'Dictionaries',
    initialCode: 'specs = {}',
    hint: 'Use curly braces and a colon: {"length": 15.5}',
    solution: 'specs = {"length": 15.5}',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('"length":15.5') || clean.includes("'length':15.5")) {
        return { success: true, message: 'Arm calibrated. Precision grip enabled.' };
      }
      return { success: false, message: 'Specifications unknown. Check your dictionary syntax.' };
    }
  },
  {
    id: 'bot-challenge-15',
    title: 'Functional Synergy',
    story: 'We need a function that returns the square of energy. Define "square(n)" that returns n * n.',
    goal: 'def square(n):\n    return n * n',
    concept: 'Return Values',
    initialCode: 'def square(n):\n    # logic here',
    hint: 'Use the return keyword.',
    solution: 'def square(n):\n    return n * n',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('returnn*n') || clean.includes('returnn**2')) {
        return { success: true, message: 'Power squared! The core is vibrating with energy.' };
      }
      return { success: false, message: 'The calculation is wrong. Return n * n.' };
    }
  },
  {
    id: 'bot-list-3',
    title: 'The Sliced Circuit',
    story: 'The data cable is too long! We only need the first 3 elements of the "signals" list.',
    goal: 'Set "target_signals" to signals[:3] using list slicing.',
    concept: 'List Slicing',
    initialCode: 'signals = [10, 20, 30, 40, 50]\ntarget_signals = []',
    hint: 'Use signals[:3] to get everything from the start up to index 3.',
    solution: 'target_signals = signals[:3]',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('signals[:3]')) {
        return { success: true, message: 'Cable trimmed! Data is flowing perfectly.' };
      }
      return { success: false, message: 'Too much data! Use signals[:3].' };
    }
  },
  {
    id: 'bot-list-4',
    title: 'Emergency Ejection',
    story: 'A "Corrupt-File" is jamming the memory. Use .pop() to remove the last item from "memory".',
    goal: 'memory.pop()',
    concept: 'List.pop()',
    initialCode: 'memory = ["Data1", "Data2", "Corrupt-File"]\n# Pop it!',
    hint: 'Just call .pop() on the memory list.',
    solution: 'memory.pop()',
    check: (code) => {
      if (code.includes('memory.pop()')) {
        return { success: true, message: 'Junk ejected! Memory cleared.' };
      }
      return { success: false, message: 'The corrupt file is still there! Did you use .pop()?' };
    }
  },
  {
    id: 'bot-list-5',
    title: 'Precision Insertion',
    story: 'The "Shield-Mod" must be installed at the very front of the "loadout" list (index 0).',
    goal: 'Use .insert(0, "Shield-Mod") on the loadout list.',
    concept: 'List.insert()',
    initialCode: 'loadout = ["Drill", "Laser"]\n# Insert here',
    hint: 'loadout.insert(0, "Shield-Mod")',
    solution: 'loadout.insert(0, "Shield-Mod")',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('.insert(0,"Shield-Mod")') || clean.includes(".insert(0,'Shield-Mod')")) {
        return { success: true, message: 'Shields deployed! Front-line defense active.' };
      }
      return { success: false, message: 'The shield is in the wrong place. Use .insert(0, ...).' };
    }
  },
  {
    id: 'bot-dict-2',
    title: 'Mainframe Keys',
    story: 'The bot needs to see all available "ports" in the system. Get the keys from the "ports" dictionary.',
    goal: 'Set "available_ports" to ports.keys().',
    concept: 'Dictionary Keys',
    initialCode: 'ports = {"A1": "Active", "B2": "Offline"}\navailable_ports = []',
    hint: 'Use: available_ports = ports.keys()',
    solution: 'available_ports = ports.keys()',
    check: (code) => {
      if (code.includes('ports.keys()')) {
        return { success: true, message: 'Scanning ports... Keys retrieved.' };
      }
      return { success: false, message: 'Ports unknown. Use .keys() to find them.' };
    }
  },
  {
    id: 'bot-dict-3',
    title: 'System Update',
    story: 'Update the bot\'s "firmware" to version 2.0 in the "system" dictionary.',
    goal: 'system["firmware"] = 2.0',
    concept: 'Dictionary Update',
    initialCode: 'system = {"firmware": 1.0, "status": "OK"}',
    hint: 'Use square brackets: system["firmware"] = 2.0',
    solution: 'system["firmware"] = 2.0',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('system["firmware"]=2.0') || clean.includes("system['firmware']=2.0")) {
        return { success: true, message: 'Update Complete! AI processing speed increased.' };
      }
      return { success: false, message: 'Still running version 1.0. Update the "firmware" key.' };
    }
  },
  {
    id: 'bot-loop-3',
    title: 'Scanning the Grid',
    story: 'The bot needs to scan every 2nd node. Use range() with a step! range(0, 10, 2).',
    goal: 'for i in range(0, 10, 2):\n    scan(i)',
    concept: 'Range with Step',
    initialCode: 'for i in range(10):\n    scan(i)',
    hint: 'Add a third number to range: range(start, stop, step).',
    solution: 'for i in range(0, 10, 2):\n    scan(i)',
    check: (code) => {
      if (code.includes('range(0, 10, 2)') || code.includes('range(0,10,2)')) {
        return { success: true, message: 'Nodes 0, 2, 4, 6, 8 scanned. Efficiency up!' };
      }
      return { success: false, message: 'Scanning every node takes too much energy. Use a step of 2.' };
    }
  },
  {
    id: 'bot-str-3',
    title: 'Encryption Key',
    story: 'The password is the reversed version of "NANO". Use slicing [::-1] to reverse it.',
    goal: 'Set "key" to word[::-1].',
    concept: 'String Reversal',
    initialCode: 'word = "NANO"\nkey = ""',
    hint: 'word[::-1] is the Python trick for reversing a string.',
    solution: 'key = word[::-1]',
    check: (code) => {
      if (code.includes('[::-1]')) {
        return { success: true, message: 'ONAN! Encryption broken.' };
      }
      return { success: false, message: 'The door remains locked. Try [::-1].' };
    }
  },
  {
    id: 'bot-math-3',
    title: 'Bitwise Pulse',
    story: 'The machine uses floor division. Set "core_count" to 11 // 3.',
    goal: 'Use // to find the whole number result of 11 divided by 3.',
    concept: 'Floor Division',
    initialCode: 'core_count = 11 / 3',
    hint: 'Use // instead of / to get an integer.',
    solution: 'core_count = 11 // 3',
    check: (code) => {
      if (code.includes('11 // 3') || code.includes('3')) {
        return { success: true, message: 'Integer result: 3. Logic core synchronized.' };
      }
      return { success: false, message: 'Decimals are jamming the system! Use //.' };
    }
  },
  {
    id: 'bot-func-2',
    title: 'The Multi-Tool',
    story: 'Define a function "move" that takes a "direction" and prints it.',
    goal: 'def move(direction):\n    print(direction)',
    concept: 'Functions with Params',
    initialCode: 'def move():\n    print("Going!")',
    hint: 'Add "direction" inside the parentheses and use it in print.',
    solution: 'def move(direction):\n    print(direction)',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('defmove(direction):') && (clean.includes('print(direction)'))) {
        return { success: true, message: 'The bot can now move anywhere! Versatility +1.' };
      }
      return { success: false, message: 'The bot doesn\'t know where to go. Add the parameter.' };
    }
  },
  {
    id: 'bot-bool-2',
    title: 'Logical AND Gate',
    story: 'Only proceed if "has_oil" AND "has_battery" are both True.',
    goal: 'if has_oil and has_battery:\n    can_start = True',
    concept: 'Logical AND',
    initialCode: 'has_oil = True\nhas_battery = True\ncan_start = False',
    hint: 'Use the "and" keyword between the two variables.',
    solution: 'if has_oil and has_battery:\n    can_start = True',
    check: (code) => {
      if (code.includes('and') && code.includes('True')) {
        return { success: true, message: 'Engines humming! Ready for launch.' };
      }
      return { success: false, message: 'Something is missing. Check your AND logic.' };
    }
  },
  {
    id: 'bot-dict-4',
    title: 'Hardware Audit',
    story: 'The bot needs to count its parts. Use len() on the "specs" dictionary.',
    goal: 'Set "count" to len(specs).',
    concept: 'Dictionary Length',
    initialCode: 'specs = {"CPU": 1, "RAM": 2, "GPU": 1}\ncount = 0',
    hint: 'len(specs) works for dictionaries too!',
    solution: 'count = len(specs)',
    check: (code) => {
      if (code.includes('len(specs)')) {
        return { success: true, message: 'Audit complete! 3 hardware components detected.' };
      }
      return { success: false, message: 'Calculation failed. Use len().' };
    }
  },
  {
    id: 'bot-loop-4',
    title: 'Matrix Navigator',
    story: 'The bot is inside a 2D grid. We need a nested loop (loop inside a loop) to scan node (r, c).',
    goal: 'for r in range(2):\n    for c in range(2):\n        scan(r, c)',
    concept: 'Nested Loops',
    initialCode: 'for r in range(2):\n    # Add nested loop for c',
    hint: 'Indent the second "for" under the first one.',
    solution: 'for r in range(2):\n    for c in range(2):\n        scan(r, c)',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('forrinrange(2):forc') && clean.includes('scan(r,c)')) {
        return { success: true, message: 'Grid (2x2) fully explored! No glitches found.' };
      }
      return { success: false, message: 'Only one row scanned! Try a nested loop.' };
    }
  },
  {
    id: 'bot-str-4',
    title: 'Signal Splitter',
    story: 'The mainframe sent a string: "UP,DOWN,LEFT". Split it into a list based on the comma.',
    goal: 'Set "commands" to signal.split(",").',
    concept: 'String Splitting',
    initialCode: 'signal = "UP,DOWN,LEFT"\ncommands = []',
    hint: 'Use .split(",") on the signal variable.',
    solution: 'commands = signal.split(",")',
    check: (code) => {
      if (code.includes('.split(",")') || code.includes(".split(',')")) {
        return { success: true, message: 'Signal processed! commands = ["UP", "DOWN", "LEFT"].' };
      }
      return { success: false, message: 'The string is still one big piece. Use .split().' };
    }
  },
  {
    id: 'bot-func-3',
    title: 'Default Protocols',
    story: 'Define a function "set_mode" with a default parameter "mode" set to "SAFE".',
    goal: 'def set_mode(mode="SAFE"):\n    print(mode)',
    concept: 'Default Parameters',
    initialCode: 'def set_mode(mode):\n    print(mode)',
    hint: 'Inside the parentheses, use mode="SAFE".',
    solution: 'def set_mode(mode="SAFE"):\n    print(mode)',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('mode="SAFE"') || clean.includes("mode='SAFE'")) {
        return { success: true, message: 'Safety protocols active by default. Good engineering!' };
      }
      return { success: false, message: 'The mode must default to "SAFE".' };
    }
  },
  {
    id: 'bot-math-4',
    title: 'Power of Two',
    story: 'The bot needs exponential power! Set "result" to 2 to the power of 8 using **.',
    goal: 'result = 2 ** 8',
    concept: 'Exponentiation',
    initialCode: 'result = 2 * 8',
    hint: 'Use double asterisks ** for power.',
    solution: 'result = 2 ** 8',
    check: (code) => {
      if (code.includes('2 ** 8') || code.includes('256')) {
        return { success: true, message: '256 units of energy generated! Blast off!' };
      }
      return { success: false, message: 'That\'s just 2 times 8. We need 2 to the power of 8!' };
    }
  },
  {
    id: 'bot-list-6',
    title: 'Memory Sorting',
    story: 'Sort the "files" list alphabetically using .sort().',
    goal: 'files.sort()',
    concept: 'List Sorting',
    initialCode: 'files = ["Beta", "Gamma", "Alpha"]\n# Sort them',
    hint: 'Just call files.sort()',
    solution: 'files.sort()',
    check: (code) => {
      if (code.includes('files.sort()')) {
        return { success: true, message: 'Files organized: Alpha, Beta, Gamma.' };
      }
      return { success: false, message: 'The files are still a mess. Use .sort().' };
    }
  },
  {
    id: 'bot-bool-3',
    title: 'The Logical OR',
    story: 'Open the hatch if "has_card" OR "is_admin" is True.',
    goal: 'if has_card or is_admin:\n    hatch_open = True',
    concept: 'Logical OR',
    initialCode: 'has_card = False\nis_admin = True\nhatch_open = False',
    hint: 'Use the "or" keyword.',
    solution: 'if has_card or is_admin:\n    hatch_open = True',
    check: (code) => {
      if (code.includes(' or ') || code.includes('(or)')) {
        return { success: true, message: 'Click! The hatch opens. One of the conditions was met.' };
      }
      return { success: false, message: 'Access denied. Use OR logic.' };
    }
  },
  {
    id: 'bot-none-1',
    title: 'Null Check',
    story: 'Sometimes sensors return nothing. If "data" is None, print "Empty".',
    goal: 'if data is None:\n    print("Empty")',
    concept: 'None Type',
    initialCode: 'data = None\n# Check for None',
    hint: 'Use "if data is None:".',
    solution: 'if data is None:\n    print("Empty")',
    check: (code) => {
      if (code.includes('is None')) {
        return { success: true, message: 'Sensor gap acknowledged. Empty signal confirmed.' };
      }
      return { success: false, message: 'You missed the null signal. Use "is None".' };
    }
  },
  {
    id: 'bot-func-4',
    title: 'The Data Packer',
    story: 'Define a function "pack" that returns multiple values: "CPU" and 100.',
    goal: 'def pack():\n    return "CPU", 100',
    concept: 'Multiple Returns',
    initialCode: 'def pack():\n    return "CPU"',
    hint: 'You can return multiple items by separating them with a comma.',
    solution: 'def pack():\n    return "CPU", 100',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('return"CPU",100') || clean.includes("return'CPU',100")) {
        return { success: true, message: 'Package sealed. Multi-data stream active.' };
      }
      return { success: false, message: 'Return both the name and the value.' };
    }
  },
  {
    id: 'bot-err-1',
    title: 'Shielding Errors',
    story: 'Prevent a crash! Use a "try/except" block to catch any ZeroDivisionError.',
    goal: 'try:\n    result = 10 / 0\nexcept:\n    print("Error")',
    concept: 'Try/Except',
    initialCode: '# Add try/except here\nresult = 10 / 0',
    hint: 'Wrap the division in "try:" and handle the error in "except:".',
    solution: 'try:\n    result = 10 / 0\nexcept:\n    print("Error")',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('try:') && clean.includes('except:')) {
        return { success: true, message: 'Divide by zero avoided! The bot\'s logic core is safe.' };
      }
      return { success: false, message: 'BOOM! The system crashed. Use try/except!' };
    }
  },
  {
    id: 'bot-rec-1',
    title: 'Recursive Pulse',
    story: 'The bot needs to send a signal that repeats. Define a function "ping(n)" that prints n and then calls itself with n-1 if n > 0.',
    goal: 'def ping(n):\n    print(n)\n    if n > 0: ping(n-1)',
    concept: 'Recursion',
    initialCode: 'def ping(n):\n    print(n)\n    # add recursive call',
    hint: 'Check if n > 0 before calling ping(n-1).',
    solution: 'def ping(n):\n    print(n)\n    if n > 0: ping(n-1)',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('ping(n-1)') && clean.includes('ifn>0')) {
        return { success: true, message: 'Ping... ping... ping... The signal echoes through the mainframe.' };
      }
      return { success: false, message: 'The signal stopped too soon. Check your recursive call.' };
    }
  },
  {
    id: 'bot-global-1',
    title: 'Global Override',
    story: 'Access the global system state. Use the "global" keyword to modify "state" inside "override()".',
    goal: 'def override():\n    global state\n    state = "READY"',
    concept: 'Global Keyword',
    initialCode: 'state = "OFFLINE"\ndef override():\n    state = "READY"',
    hint: 'Add "global state" as the first line in the function.',
    solution: 'def override():\n    global state\n    state = "READY"',
    check: (code) => {
      if (code.includes('global state')) {
        return { success: true, message: 'GLOBAL OVERRIDE SUCCESSFUL. System status: READY.' };
      }
      return { success: false, message: 'Local variable change only. We need to override the GLOBAL state.' };
    }
  },
  {
    id: 'bot-type-1',
    title: 'Data Validation',
    story: 'Verify the data type! If type(data) is int, set "is_valid" to True.',
    goal: 'if type(data) == int:\n    is_valid = True',
    concept: 'Type Checking',
    initialCode: 'data = 500\nis_valid = False',
    hint: 'Use the type() function.',
    solution: 'if type(data) == int:\n    is_valid = True',
    check: (code) => {
      if (code.includes('type(data)') && (code.includes('int') || code.includes('Integer'))) {
        return { success: true, message: 'Packet validated. Integer stream accepted.' };
      }
      return { success: false, message: 'Unknown data type. Use type(data) == int.' };
    }
  },
  {
    id: 'bot-fmt-1',
    title: 'Fancy Reporting',
    story: 'Use an f-string to report the "power" level. Format: f"Power: {power}"',
    goal: 'report = f"Power: {power}"',
    concept: 'f-strings',
    initialCode: 'power = 99\nreport = ""',
    hint: 'Start the string with f and put variables in {}.',
    solution: 'report = f"Power: {power}"',
    check: (code) => {
      if (code.includes('f"') || code.includes("f'")) {
        return { success: true, message: 'Report generated: "Power: 99". High resolution!' };
      }
      return { success: false, message: 'Use an f-string for maximum efficiency.' };
    }
  },
  {
    id: 'bot-boss-final',
    title: 'MISSION: OMNI-RESCUE',
    story: 'The Final Boss! Save all Bot-Friends by mastering every system. 1. Set "auth" to True. 2. Define "rescue(name)" that prints f"Saving {name}". 3. Split the "friend_data" string "Bot1,Bot2" into a list.',
    goal: 'auth = True\ndef rescue(name): print(f"Saving {name}")\nfriends = friend_data.split(",")',
    concept: 'Ultimate Mastery',
    initialCode: 'friend_data = "Bot1,Bot2"\n# 1. Auth\n# 2. Rescue Function\n# 3. Friends List',
    hint: 'Combine variables, functions, f-strings, and string methods.',
    solution: 'auth = True\ndef rescue(name): print(f"Saving {name}")\nfriends = friend_data.split(",")',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      const hasAuth = clean.includes('auth=True');
      const hasRescue = clean.includes('defrescue(name):') && (clean.includes('f"Saving{name}"') || clean.includes("f'Saving{name}'"));
      const hasSplit = clean.includes('.split(",")') || clean.includes(".split(',')");
      if (hasAuth && hasRescue && hasSplit) {
        return { success: true, message: 'MAINFRAME RECOVERED! You have saved all Bot-Friends and mastered Nano-Engineering. YOU ARE THE OMNI-BOT!' };
      }
      return { success: false, message: 'Mission failed. The machine is too complex. Check all three objectives.' };
    }
  }
];
