export interface Challenge {
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

export const CODE_QUEST_LEVELS: Challenge[] = [
  {
    id: 'var-1',
    title: 'The Name of the Guard',
    story: 'The castle gate is blocked by a Sleepy Golem. He only wakes up if you know his name. The name is currently "None".',
    goal: 'Declare a variable named "guard_name" and set it to "Barnaby".',
    concept: 'Variables & String Assignment',
    initialCode: 'guard_name = "None"',
    hint: 'Replace "None" with "Barnaby". Make sure to use quotes!',
    solution: 'guard_name = "Barnaby"',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('guard_name="Barnaby"') || clean.includes("guard_name='Barnaby'")) {
        return { success: true, message: 'The Golem yawns and steps aside! Welcome to the Glitch Kingdom.' };
      }
      return { success: false, message: 'The Golem remains fast asleep. Check your variable name and value.' };
    }
  },
  {
    id: 'type-1',
    title: 'The Weight of the Bridge',
    story: 'The drawbridge requires a specific number of stones to lower. It currently thinks the weight is text, but it needs a real number!',
    goal: 'Update the variable "stones" to the integer 42.',
    concept: 'Integers vs Strings',
    initialCode: 'stones = "42"',
    hint: 'Remove the quotes from "42" to make it a number instead of text.',
    solution: 'stones = 42',
    check: (code) => {
      if (code.includes('stones = 42') && !code.includes('"42"') && !code.includes("'42'")) {
        return { success: true, message: 'Clank! The bridge lowers perfectly. Numbers are powerful!' };
      }
      return { success: false, message: 'The bridge is stuck. Is the value truly a number (without quotes)?' };
    }
  },
  {
    id: 'string-1',
    title: 'The Magic Shout',
    story: 'To open the echoing cave, you must shout the password. But notice how small the scroll is... it needs to be BIGGER.',
    goal: 'The variable "password" is "open". Use the .upper() method to make it uppercase.',
    concept: 'String Methods',
    initialCode: 'password = "open"\nshout = password',
    hint: 'Add .upper() to the end of your variable: password.upper()',
    solution: 'password = "open"\nshout = password.upper()',
    check: (code) => {
      if (code.includes('.upper()')) {
        return { success: true, message: 'OPEN! The cave echoes back and the doors swing wide.' };
      }
      return { success: false, message: 'The cave is silent. Did you use the .upper() method?' };
    }
  },
  {
    id: 'list-1',
    title: 'The Potion Inventory',
    story: 'The alchemist has a list of ingredients, but "Spider Webs" are missing from the end!',
    goal: 'Create a list called "ingredients" containing "Water", "Herbs", and "Spider Webs".',
    concept: 'Lists',
    initialCode: 'ingredients = ["Water", "Herbs"]',
    hint: 'Add "Spider Webs" inside the square brackets, separated by a comma.',
    solution: 'ingredients = ["Water", "Herbs", "Spider Webs"]',
    check: (code) => {
      const clean = code.replace(/\s/g, '');
      if (clean.includes('"SpiderWebs"') && clean.includes('[') && clean.includes(']')) {
        return { success: true, message: 'The potion bubbles to life! Inventory management is key.' };
      }
      return { success: false, message: 'The potion is missing something. Check your list items and commas.' };
    }
  },
  {
    id: 'cond-1',
    title: 'The Dragon\'s Riddle',
    story: 'The Dragon only lets those with enough "power" pass. If your power is over 100, set "can_pass" to True.',
    goal: 'Use an "if" statement: if power > 100, set can_pass = True.',
    concept: 'Conditionals (If)',
    initialCode: 'power = 150\ncan_pass = False',
    hint: 'Write: if power > 100:\n    can_pass = True',
    solution: 'power = 150\nif power > 100:\n    can_pass = True',
    check: (code) => {
      if (code.includes('if power > 100') && (code.includes('can_pass = True') || code.includes('can_pass=True'))) {
        return { success: true, message: 'The Dragon bows. Your power is recognized!' };
      }
      return { success: false, message: 'The Dragon blocks the way. Check your "if" logic.' };
    }
  },
  {
    id: 'math-1',
    title: 'The Alchemist\'s Precision',
    story: 'The shrinking potion requires exactly 0.5 liters of lunar dew. Too much or too little, and the lab might explode!',
    goal: 'Set the variable "dew_liters" to the float value 0.5.',
    concept: 'Floating Point Numbers',
    initialCode: 'dew_liters = 0',
    hint: 'Floats use a decimal point. Set it to 0.5.',
    solution: 'dew_liters = 0.5',
    check: (code) => {
      if (code.includes('dew_liters = 0.5') || code.includes('dew_liters=0.5')) {
        return { success: true, message: 'The potion shimmers with a soft blue light. Precision pays off!' };
      }
      return { success: false, message: 'The explosion was avoided, but the potion didn\'t work. Set it to exactly 0.5.' };
    }
  },
  {
    id: 'bool-1',
    title: 'The Crystal of Truth',
    story: 'The Crystal of Truth only shines when "is_honest" is set to exactly True. It is currently False.',
    goal: 'Change "is_honest" to True.',
    concept: 'Booleans',
    initialCode: 'is_honest = False',
    hint: 'In Python, True and False must start with a Capital letter!',
    solution: 'is_honest = True',
    check: (code) => {
      if (code.includes('is_honest = True') || code.includes('is_honest=True')) {
        return { success: true, message: 'The Crystal glows brightly, revealing a hidden path!' };
      }
      return { success: false, message: 'The crystal is dark. Did you use a Capital T for True?' };
    }
  },
  {
    id: 'loop-1',
    title: 'The Infinite Staircase',
    story: 'The staircase is endless unless you count exactly 5 steps. Use a "for" loop to climb.',
    goal: 'Use a "for" loop to iterate through "range(5)". Inside the loop, print "climb".',
    concept: 'For Loops',
    initialCode: 'for i in range(1):\n    print("climb")',
    hint: 'Change range(1) to range(5).',
    solution: 'for i in range(5):\n    print("climb")',
    check: (code) => {
      if (code.includes('range(5)') && code.includes('print("climb")')) {
        return { success: true, message: 'One... two... three... four... five! You reached the top.' };
      }
      return { success: false, message: 'You are still climbing. Did you use range(5)?' };
    }
  },
  {
    id: 'func-1',
    title: 'The Spell of Summoning',
    story: 'To summon the Great Eagle, you must define a magic function named "summon" that prints "Eagle!".',
    goal: 'Define a function: def summon():\n    print("Eagle!")',
    concept: 'Functions',
    initialCode: '# Define your function here',
    hint: 'Start with "def summon():" and indent the print statement.',
    solution: 'def summon():\n    print("Eagle!")',
    check: (code) => {
      if (code.includes('def summon():') && code.includes('print("Eagle!")')) {
        return { success: true, message: 'SCREECH! A giant shadow appears from the clouds. The spell worked!' };
      }
      return { success: false, message: 'Nothing happened. Check your function definition syntax.' };
    }
  },
  {
    id: 'cond-2',
    title: 'The Alchemist\'s Grades',
    story: 'The Alchemist is grading potions. If "score" is 90 or above, the grade is "A". If it\'s 80 or above, it\'s "B". Otherwise, it\'s "C".',
    goal: 'Use if/elif/else to set the variable "grade". Current score is 85.',
    concept: 'Elif Conditionals',
    initialCode: 'score = 85\n# Your logic here',
    hint: 'Use if score >= 90:, then elif score >= 80:, then else:',
    solution: 'score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"',
    check: (code) => {
      if (code.includes('elif score >= 80') && (code.includes('grade = "B"') || code.includes("grade='B'"))) {
        return { success: true, message: 'The Alchemist nods. "A solid B-grade potion!"' };
      }
      return { success: false, message: 'The Alchemist is confused. Check your if/elif/else structure.' };
    }
  },
  {
    id: 'loop-2',
    title: 'The Hungry Dragon',
    story: 'The Dragon will eat "apples" until it is "full". Use a while loop to feed it.',
    goal: 'While "apples" is less than 3, add 1 to "apples".',
    concept: 'While Loops',
    initialCode: 'apples = 0\n# Your loop here',
    hint: 'Use: while apples < 3:\n    apples = apples + 1',
    solution: 'apples = 0\nwhile apples < 3:\n    apples = apples + 1',
    check: (code) => {
      if (code.includes('while apples < 3') && (code.includes('apples = apples + 1') || code.includes('apples += 1'))) {
        return { success: true, message: 'Burp! The Dragon is full and happy. You may pass.' };
      }
      return { success: false, message: 'The Dragon is still hungry. Make sure your loop runs until apples is 3.' };
    }
  },
  {
    id: 'list-2',
    title: 'The Backpack Expansion',
    story: 'You found a "Magic Sword"! You need to add it to your items list.',
    goal: 'Use the .append() method to add "Magic Sword" to the "items" list.',
    concept: 'List Methods (.append)',
    initialCode: 'items = ["Map", "Shield"]\n# Use .append here',
    hint: 'Try: items.append("Magic Sword")',
    solution: 'items = ["Map", "Shield"]\nitems.append("Magic Sword")',
    check: (code) => {
      if (code.includes('.append("Magic Sword")') || code.includes(".append('Magic Sword')")) {
        return { success: true, message: 'The sword fits perfectly! You feel much stronger now.' };
      }
      return { success: false, message: 'Your backpack is empty. Did you use the .append() method?' };
    }
  },
  {
    id: 'string-2',
    title: 'The Quiet Whisper',
    story: 'The library of silence requires all text to be in lowercase. The variable "scroll" is "SHOUT".',
    goal: 'Convert "scroll" to lowercase using the .lower() method.',
    concept: 'String Methods (.lower)',
    initialCode: 'scroll = "SHOUT"\nwhisper = scroll',
    hint: 'Use: whisper = scroll.lower()',
    solution: 'scroll = "SHOUT"\nwhisper = scroll.lower()',
    check: (code) => {
      if (code.includes('.lower()')) {
        return { success: true, message: 'shout... The library remains peaceful. You found the secret book!' };
      }
      return { success: false, message: 'SHHH! Too loud! Use the .lower() method.' };
    }
  },
  {
    id: 'func-2',
    title: 'The Power Boost',
    story: 'Define a function "boost" that takes a parameter "n" and returns "n + 10".',
    goal: 'def boost(n):\n    return n + 10',
    concept: 'Functions with Parameters',
    initialCode: '# Define your boost function here',
    hint: 'Functions can take values inside the parentheses, like boost(n).',
    solution: 'def boost(n):\n    return n + 10',
    check: (code) => {
      if (code.includes('def boost(n):') && code.includes('return n + 10')) {
        return { success: true, message: 'Energy surged! Your spells are now 10 times stronger.' };
      }
      return { success: false, message: 'The boost failed. Check your parameter "n" and return statement.' };
    }
  },
  {
    id: 'string-3',
    title: 'The Secret Cipher',
    story: 'The message "Hello Glitch" is compromised! Replace "Glitch" with "Hero" to fix it.',
    goal: 'Use the .replace() method to change "Glitch" to "Hero" in the variable "msg".',
    concept: 'String Methods (.replace)',
    initialCode: 'msg = "Hello Glitch"\nfixed = msg',
    hint: 'Use: fixed = msg.replace("Glitch", "Hero")',
    solution: 'msg = "Hello Glitch"\nfixed = msg.replace("Glitch", "Hero")',
    check: (code) => {
      if (code.includes('.replace(') && code.includes('"Glitch"') && code.includes('"Hero"')) {
        return { success: true, message: 'Hello Hero! The message is clear and the kingdom Rejoices!' };
      }
      return { success: false, message: 'The message still says Glitch. Try the .replace() method.' };
    }
  },
  {
    id: 'string-4',
    title: 'The Hidden Letter',
    story: 'The secret code is hidden at the 4th position (index 3) of the word "ORACLE".',
    goal: 'Set the variable "secret" to oracle[3].',
    concept: 'String Indexing',
    initialCode: 'oracle = "ORACLE"\nsecret = ""',
    hint: 'In Python, we count from 0. So index 3 is actually the 4th letter!',
    solution: 'oracle = "ORACLE"\nsecret = oracle[3]',
    check: (code) => {
      if (code.includes('oracle[3]')) {
        return { success: true, message: 'The letter "C" glows! You found the hidden key.' };
      }
      return { success: false, message: 'The oracle is silent. Check your index number.' };
    }
  },
  {
    id: 'list-3',
    title: 'The Potion Cleanup',
    story: 'Your cauldron has an "Old Sock" in it! You must remove it using the .pop() or .remove() method.',
    goal: 'Remove "Old Sock" from the "cauldron" list.',
    concept: 'List Methods (.pop / .remove)',
    initialCode: 'cauldron = ["Herb", "Old Sock", "Water"]\n# Remove the sock here',
    hint: 'Use: cauldron.remove("Old Sock")',
    solution: 'cauldron = ["Herb", "Old Sock", "Water"]\ncauldron.remove("Old Sock")',
    check: (code) => {
      if (code.includes('.remove("Old Sock")') || code.includes(".remove('Old Sock')") || code.includes('.pop(1)')) {
        return { success: true, message: 'Splash! The sock is gone. The potion smells much better now.' };
      }
      return { success: false, message: 'Eww... the sock is still there. Try .remove("Old Sock")' };
    }
  },
  {
    id: 'final-1',
    title: 'The Treasure Vault',
    story: 'To open the final vault, you must have the "key" (True) AND "level" 15 or higher.',
    goal: 'Use nested logic or "and" operator: if key == True and level >= 15, set "opened" = True.',
    concept: 'Advanced Conditionals (and)',
    initialCode: 'key = True\nlevel = 15\nopened = False\n# Your logic here',
    hint: 'Use: if key and level >= 15:\n    opened = True',
    solution: 'key = True\nlevel = 15\nif key and level >= 15:\n    opened = True',
    check: (code) => {
      if ((code.includes('if key and level >= 15') || code.includes('if key == True and level >= 15')) && (code.includes('opened = True') || code.includes('opened=True'))) {
        return { success: true, message: 'CLICK! The vault doors swing open to reveal a mountain of gold. You are a Master Coder!' };
      }
      return { success: false, message: 'The vault is locked tight. Check your "and" logic.' };
    }
  },
  {
    id: 'math-2',
    title: 'The Giants Footsteps',
    story: 'A giant is walking nearby. His step length is 2.5 meters. Calculate how many meters he covers in 10 steps.',
    goal: 'Set the variable "distance" to 2.5 times 10.',
    concept: 'Float Math',
    initialCode: 'step = 2.5\ndistance = 0',
    hint: 'Use the * operator for multiplication.',
    solution: 'step = 2.5\ndistance = step * 10',
    check: (code) => {
      if (code.includes('25') || code.includes('step * 10')) {
        return { success: true, message: 'Thump! Thump! The giant covers exactly 25 meters.' };
      }
      return { success: false, message: 'The calculation is off. Make sure you use 2.5 * 10.' };
    }
  },
  {
    id: 'list-4',
    title: 'The Sorting Hat',
    story: 'The wizard has a list of names. He needs them in alphabetical order to start the ceremony.',
    goal: 'Use the .sort() method on the "names" list.',
    concept: 'List Sorting',
    initialCode: 'names = ["Zelda", "Arthur", "Merlin"]\n# Sort them here',
    hint: 'Simply use: names.sort()',
    solution: 'names = ["Zelda", "Arthur", "Merlin"]\nnames.sort()',
    check: (code) => {
      if (code.includes('.sort()')) {
        return { success: true, message: 'Arthur, Merlin, Zelda! The ceremony can begin.' };
      }
      return { success: false, message: 'The names are still messy. Use names.sort().' };
    }
  },
  {
    id: 'bool-2',
    title: 'Dual Key Protocol',
    story: 'The high-security dungeon requires EITHER the master key (True) OR the secret password (True) to be valid.',
    goal: 'Set "access" to True if "has_key" is True OR "has_pass" is True.',
    concept: 'Boolean OR Logic',
    initialCode: 'has_key = False\nhas_pass = True\naccess = False',
    hint: 'Use: if has_key or has_pass:\n    access = True',
    solution: 'has_key = False\nhas_pass = True\nif has_key or has_pass:\n    access = True',
    check: (code) => {
      if (code.includes('or') && (code.includes('access = True') || code.includes('access=True'))) {
        return { success: true, message: 'The dungeon doors creak open. Either way works!' };
      }
      return { success: false, message: 'Access denied. Check your "or" logic.' };
    }
  },
  {
    id: 'string-5',
    title: 'The Silent Library II',
    story: 'The librarian only accepts scrolls that START with the word "Greetings".',
    goal: 'Use the .startswith() method to check if "scroll" starts with "Greetings". Set "is_valid" to the result.',
    concept: 'String Methods (.startswith)',
    initialCode: 'scroll = "Greetings Traveler"\nis_valid = False',
    hint: 'Use: is_valid = scroll.startswith("Greetings")',
    solution: 'scroll = "Greetings Traveler"\nis_valid = scroll.startswith("Greetings")',
    check: (code) => {
      if (code.includes('.startswith("Greetings")')) {
        return { success: true, message: 'The librarian nods and accepts your scroll.' };
      }
      return { success: false, message: 'The librarian looks confused. Use .startswith().' };
    }
  },
  {
    id: 'list-5',
    title: 'The Counting Pixies',
    story: 'How many pixies are in the forest? Check the count of "pixie" in the "creatures" list.',
    goal: 'Use the .count() method to find how many times "pixie" appears in the list. Set it to "total".',
    concept: 'List Methods (.count)',
    initialCode: 'creatures = ["pixie", "troll", "pixie", "goblin", "pixie"]\ntotal = 0',
    hint: 'Use: total = creatures.count("pixie")',
    solution: 'creatures = ["pixie", "troll", "pixie", "goblin", "pixie"]\ntotal = creatures.count("pixie")',
    check: (code) => {
      if (code.includes('.count("pixie")')) {
        return { success: true, message: 'Three pixies! They sprinkle fairy dust on your code.' };
      }
      return { success: false, message: 'The pixies are hiding. Use .count().' };
    }
  },
  {
    id: 'math-3',
    title: 'The Power Crystal',
    story: 'To charge the crystal, you must raise its energy (5) to the power of 3 (5 * 5 * 5).',
    goal: 'Set "charge" to 5 to the power of 3 using the ** operator.',
    concept: 'Power Operator',
    initialCode: 'energy = 5\ncharge = 0',
    hint: 'In Python, use ** for power: energy ** 3',
    solution: 'charge = 5 ** 3',
    check: (code) => {
      if (code.includes('** 3') || code.includes('125')) {
        return { success: true, message: 'The crystal pulses with 125 units of energy!' };
      }
      return { success: false, message: 'The crystal is glowing dimly. Use the ** operator.' };
    }
  },
  {
    id: 'nested-1',
    title: 'The Matrix Maze',
    story: 'You found a list inside a list! The treasure is in the second list at position 0.',
    goal: 'Set "treasure" to matrix[1][0].',
    concept: 'Nested Lists (Matrix)',
    initialCode: 'matrix = [["rock", "dirt"], ["gold", "silver"]]\ntreasure = ""',
    hint: 'matrix[1] gets the second list. matrix[1][0] gets the first item of the second list.',
    solution: 'treasure = matrix[1][0]',
    check: (code) => {
      if (code.includes('matrix[1][0]')) {
        return { success: true, message: 'You reached into the sub-list and pulled out the gold!' };
      }
      return { success: false, message: 'You reached the wrong spot. Remember index starts at 0.' };
    }
  },
  {
    id: 'string-6',
    title: 'The Map Splitter',
    story: 'The map is recorded as a single string "Forest,Canyon,Lake". The gate needs these as a list of words!',
    goal: 'Use the .split(",") method on the "map_data" string. Set the result to "locations".',
    concept: 'String Splitting',
    initialCode: 'map_data = "Forest,Canyon,Lake"\nlocations = []',
    hint: 'Use: locations = map_data.split(",")',
    solution: 'locations = map_data.split(",")',
    check: (code) => {
      if (code.includes('.split(",")') || code.includes(".split(',')")) {
        return { success: true, message: 'The map unfolds into three distinct regions. Exploration time!' };
      }
      return { success: false, message: 'The map is still a single block of text. Use .split().' };
    }
  },
  {
    id: 'list-6',
    title: 'The Reverse Curse',
    story: 'A curse has reversed the flow of the river! You must reverse the "river" list to fix it.',
    goal: 'Use the .reverse() method on the "river" list.',
    concept: 'List Reversal',
    initialCode: 'river = ["Ocean", "Middle", "Source"]\n# Reverse it here',
    hint: 'Use: river.reverse()',
    solution: 'river.reverse()',
    check: (code) => {
      if (code.includes('.reverse()')) {
        return { success: true, message: 'Source -> Middle -> Ocean. The water flows correctly now!' };
      }
      return { success: false, message: 'The water is still flowing backwards. Use .reverse().' };
    }
  },
  {
    id: 'dict-1',
    title: 'The Merchant\'s Ledger',
    story: 'The Merchant uses "Dictionaries" (keys and values) to track prices. A "sword" costs 50 gold.',
    goal: 'Create a dictionary "prices" with "sword": 50.',
    concept: 'Dictionaries',
    initialCode: 'prices = {}',
    hint: 'Use curly braces: prices = {"sword": 50}',
    solution: 'prices = {"sword": 50}',
    check: (code) => {
      if (code.includes('{"sword": 50}') || code.includes('{"sword":50}') || code.includes("'sword': 50")) {
        return { success: true, message: 'The Merchant nods. "Fair price! Here is your equipment."' };
      }
      return { success: false, message: 'The ledger is empty. Check your dictionary syntax.' };
    }
  },
  {
    id: 'loop-3',
    title: 'The Orchard Harvester',
    story: 'For every "tree" in the "orchard", you must "pick" a fruit.',
    goal: 'Use a "for tree in orchard:" loop. Inside, print "pick".',
    concept: 'For Each Loops',
    initialCode: 'orchard = ["Apple", "Peach", "Pear"]\n# Your loop here',
    hint: 'for tree in orchard:\n    print("pick")',
    solution: 'for tree in orchard:\n    print("pick")',
    check: (code) => {
      if (code.includes('for tree in orchard') && code.includes('print("pick")')) {
        return { success: true, message: 'Three delicious fruits gathered! Automation is sweet.' };
      }
      return { success: false, message: 'The orchard is still full. Did you loop through orchard?' };
    }
  },
  {
    id: 'math-4',
    title: 'The Dragon\'s Share',
    story: 'The dragon has 100 gold coins and want to share them equally with 3 friends. How much does each person get?',
    goal: 'Set "share" to 100 divided by 3 using the / operator.',
    concept: 'Float Division',
    initialCode: 'gold = 100\nshare = 0',
    hint: 'Use the / operator for division.',
    solution: 'share = 100 / 3',
    check: (code) => {
      if (code.includes('share = 100 / 3') || code.includes('share = 100/3')) {
        return { success: true, message: 'Everyone gets 33.333... coins. Everyone is happy!' };
      }
      return { success: false, message: 'The math seems wrong. Use / for division.' };
    }
  },
  {
    id: 'func-3',
    title: 'The Mage\'s Greeting',
    story: 'Create a function "greet" that takes a "name" and returns "Hello " + name.',
    goal: 'def greet(name):\n    return "Hello " + name',
    concept: 'Functions with Strings',
    initialCode: '',
    hint: 'Don\'t forget the space after "Hello "!',
    solution: 'def greet(name):\n    return "Hello " + name',
    check: (code) => {
      if (code.includes('def greet(name):') && (code.includes('return "Hello " + name') || code.includes('return f"Hello {name}"'))) {
        return { success: true, message: 'The Mage smiles. "Well met, young sorcerer!"' };
      }
      return { success: false, message: 'The Mage didn\'t hear you. Check your string concatenation.' };
    }
  },
  {
    id: 'string-7',
    title: 'The Space Filter',
    story: 'The magic barrier only lets text through if it HAS NO spaces.',
    goal: 'Use the .replace(" ", "") method to remove spaces from the variable "secret".',
    concept: 'String Modification',
    initialCode: 'secret = "Too Many Spaces"\nfixed = secret',
    hint: 'Replace a space " " with an empty string "".',
    solution: 'fixed = secret.replace(" ", "")',
    check: (code) => {
      if (code.includes('.replace(" ", "")') || code.includes(".replace(' ', '')")) {
        return { success: true, message: 'TooManySpaces! The text slides through the barrier.' };
      }
      return { success: false, message: 'Still too many spaces. Use .replace().' };
    }
  },
  {
    id: 'boss-1',
    title: 'The Final Glitch',
    story: 'The Source Code of the kingdom is corrupted! To win, you must: 1. Set "hero" to True. 2. Append "Peace" to the "world" list. 3. Return "Success" from a function called "fix_world".',
    goal: 'Complete all three tasks in one script.',
    concept: 'Mastery Challenge',
    initialCode: 'hero = False\nworld = ["Sun", "Rain"]\ndef fix_world():\n    # fix me!',
    hint: '1. hero = True\n2. world.append("Peace")\n3. Inside the function, write return "Success"',
    solution: 'hero = True\nworld.append("Peace")\ndef fix_world():\n    return "Success"',
    check: (code) => {
      if (code.includes('hero = True') && code.includes('.append') && code.includes('return "Success"')) {
        return { success: true, message: 'THE KINGDOM IS SAVED! You have mastered the Python arts and defeated the Glitch!' };
      }
      return { success: false, message: 'The Glitch is still strong. Did you complete all three tasks?' };
    }
  }
];
