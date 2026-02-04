
import { Level } from './types';

export const GRID_SIZE = 8;


export const LEVELS: Level[] = [
  // --- CHAPTER 1: THE BEGINNING ---
  {
    id: 1,
    type: 'CONSOLE',
    title: "Hello, World!",
    description: "Welcome to the Academy! Your first mission is to print a message to the console.",
    instruction: "Type `print(\"Hello World\")` to send a signal.",
    concepts: ["Print", "Strings"],
    initialCode: "# Write your code below\n",
    expectedOutput: "Hello World"
  },
  {
    id: 2,
    type: 'CONSOLE',
    title: "Variables",
    description: "Variables store data. Let's record your agent name.",
    instruction: "Create a variable `name` and assign it a string. Then print it.",
    concepts: ["Variables", "Strings"],
    initialCode: "# Store your name\n",
    validationRegex: /name\s*=\s*["'].+["']\s*\n\s*print\s*\(\s*name\s*\)/
  },
  
  // --- CHAPTER 2: NUMBERS & MATH ---
  {
    id: 3,
    type: 'CONSOLE',
    title: "Simple Math",
    description: "Python can be used as a calculator.",
    instruction: "Print the result of `5 + 10`.",
    concepts: ["Addition", "Integers"],
    initialCode: "print(5 + 10)",
    expectedOutput: "15"
  },
  {
    id: 4,
    type: 'CONSOLE',
    title: "Multiplication",
    description: "Calculate the total cost of 3 items at $9.99 each.",
    instruction: "Print `3 * 9.99`.",
    concepts: ["Multiplication", "Floats"],
    initialCode: "print()",
    expectedOutput: "29.97"
  },
  {
    id: 5,
    type: 'CONSOLE',
    title: "Fuel Calculation",
    description: "We need to calculate fuel for the hyperjump.",
    instruction: "Create `distance = 100` and `rate = 2`. Print `distance * rate`.",
    concepts: ["Math", "Arithmetic"],
    initialCode: "distance = 100\n",
    expectedOutput: "200"
  },
  {
    id: 6,
    type: 'CONSOLE',
    title: "Powers",
    description: "Python uses `**` for exponentiation.",
    instruction: "Print `2` raised to the power of `10`.",
    concepts: ["Exponents"],
    initialCode: "print()",
    expectedOutput: "1024"
  },

  // --- CHAPTER 3: STRINGS ---
  {
    id: 7,
    type: 'CONSOLE',
    title: "Concatenation",
    description: "Combine strings using the `+` operator.",
    instruction: "Print 'Hello ' + 'Python'.",
    concepts: ["Strings"],
    initialCode: "print('Hello ' + 'Python')",
    expectedOutput: "Hello Python"
  },
  {
    id: 8,
    type: 'CONSOLE',
    title: "String Length",
    description: "How many characters are in a string?",
    instruction: "Use `len()` to print the length of 'Antigravity'.",
    concepts: ["Functions"],
    initialCode: "print(len('Antigravity'))",
    expectedOutput: "12"
  },
  {
    id: 9,
    type: 'CONSOLE',
    title: "Upper Case",
    description: "Convert text to all caps.",
    instruction: "Print 'python'.upper()",
    concepts: ["Methods"],
    initialCode: "print('python'.upper())",
    expectedOutput: "PYTHON"
  },
  {
    id: 10,
    type: 'CONSOLE',
    title: "String Slicing",
    description: "Get only a part of a string.",
    instruction: "Print the first 4 characters of 'Interstellar'.",
    concepts: ["Slicing"],
    initialCode: "word = 'Interstellar'\nprint(word[0:4])",
    expectedOutput: "Inte"
  },

  // --- CHAPTER 4: CONTROL FLOW ---
  {
    id: 11,
    type: 'CONSOLE',
    title: "Boolean Logic",
    description: "True or False?",
    instruction: "Print the result of `10 > 5`.",
    concepts: ["Comparison"],
    initialCode: "print(10 > 5)",
    expectedOutput: "True"
  },
  {
    id: 12,
    type: 'CONSOLE',
    title: "If Statement",
    description: "Run code only if a condition is met.",
    instruction: "If `x` is 10, print 'Correct'.",
    concepts: ["Logic"],
    initialCode: "x = 10\nif x == 10:\n  print('Correct')",
    expectedOutput: "Correct"
  },
  {
    id: 13,
    type: 'CONSOLE',
    title: "Else Clause",
    description: "The fallback condition.",
    instruction: "Set `age = 15`. If `age >= 18` print 'Adult', else print 'Minor'.",
    concepts: ["Conditions"],
    initialCode: "age = 15\nif age >= 18:\n  print('Adult')\nelse:\n  print('Minor')",
    expectedOutput: "Minor"
  },
  {
    id: 14,
    type: 'CONSOLE',
    title: "Elif",
    description: "Checking multiple possibilities.",
    instruction: "Set `score = 85`. If `score >= 90` print 'A', elif `score >= 80` print 'B', else print 'C'.",
    concepts: ["Nesting"],
    initialCode: "score = 85\n",
    expectedOutput: "B"
  },
  {
    id: 15,
    type: 'CONSOLE',
    title: "Logical Operators",
    description: "Combining conditions with `and`.",
    instruction: "Check if `10 > 5` and `5 < 8`. Print the result.",
    concepts: ["and/or"],
    initialCode: "print(10 > 5 and 5 < 8)",
    expectedOutput: "True"
  },

  // --- CHAPTER 5: LOOPS ---
  {
    id: 16,
    type: 'CONSOLE',
    title: "For Loops",
    description: "Repeating code efficiently.",
    instruction: "Use `for i in range(3):` to print 'Loop'.",
    concepts: ["For"],
    initialCode: "for i in range(3):\n  print('Loop')",
    expectedOutput: "Loop\nLoop\nLoop"
  },
  {
    id: 17,
    type: 'CONSOLE',
    title: "Loop Values",
    description: "The value of the iterator.",
    instruction: "Print numbers 0 to 2 using range(3).",
    concepts: ["range"],
    initialCode: "for i in range(3):\n  print(i)",
    expectedOutput: "0\n1\n2"
  },
  {
    id: 18,
    type: 'CONSOLE',
    title: "While Loops",
    description: "Loop until a condition changes.",
    instruction: "Set `i = 1`. While `i < 4` print `i` and increment `i`.",
    concepts: ["While"],
    initialCode: "i = 1\nwhile i < 4:\n  print(i)\n  i += 1",
    expectedOutput: "1\n2\n3"
  },
  {
    id: 19,
    type: 'CONSOLE',
    title: "Break",
    description: "Exiting a loop early.",
    instruction: "Break a loop after 2 iterations.",
    concepts: ["break"],
    initialCode: "i = 0\nwhile True:\n  print('Hi')\n  i += 1\n  if i == 2:\n    break",
    expectedOutput: "Hi\nHi"
  },
  {
    id: 20,
    type: 'CONSOLE',
    title: "Continue",
    description: "Skip an iteration.",
    instruction: "Skip the number 2 in a range(5) loop.",
    concepts: ["continue"],
    initialCode: "for i in range(5):\n  if i == 2:\n    continue\n  print(i)",
    expectedOutput: "0\n1\n3\n4"
  },

  // --- CHAPTER 6: LISTS ---
  {
    id: 21,
    type: 'CONSOLE',
    title: "Lists",
    description: "Collections of data.",
    instruction: "Create `items = [1, 2, 3]` and print it.",
    concepts: ["Lists"],
    initialCode: "items = [1, 2, 3]\nprint(items)",
    expectedOutput: "[1, 2, 3]"
  },
  {
    id: 22,
    type: 'CONSOLE',
    title: "Indexing",
    description: "Zero-based access.",
    instruction: "Print the first item of `['a', 'b', 'c']`.",
    concepts: ["Indexing"],
    initialCode: "items = ['a', 'b', 'c']\nprint(items[0])",
    expectedOutput: "a"
  },
  {
    id: 23,
    type: 'CONSOLE',
    title: "List Methods",
    description: "Modifying lists.",
    instruction: "Append `4` to `[1, 2, 3]`. Print the list.",
    concepts: ["append"],
    initialCode: "nums = [1, 2, 3]\nnums.append(4)\nprint(nums)",
    expectedOutput: "[1, 2, 3, 4]"
  },
  {
    id: 24,
    type: 'CONSOLE',
    title: "Slicing Lists",
    description: "Getting portions of a list.",
    instruction: "Print the first 2 items of `[10, 20, 30]`.",
    concepts: ["Slicing"],
    initialCode: "data = [10, 20, 30]\nprint(data[0:2])",
    expectedOutput: "[10, 20]"
  },
  {
    id: 25,
    type: 'CONSOLE',
    title: "List Length",
    description: "Counting items.",
    instruction: "Print the length of a list with 5 items.",
    concepts: ["len"],
    initialCode: "print(len([1, 2, 3, 4, 5]))",
    expectedOutput: "5"
  },
  {
    id: 26,
    type: 'CONSOLE',
    title: "Scope",
    description: "Variables inside functions are local.",
    instruction: "Define a function that sets `x = 10` and prints it.",
    concepts: ["Scope"],
    initialCode: "def test():\n  x = 10\n  print(x)\n\ntest()",
    expectedOutput: "10"
  },
  {
    id: 27,
    type: 'CONSOLE',
    title: "Dictionaries",
    description: "Key-value pairs for structured data.",
    instruction: "Create `user = {'id': 1}` and print it.",
    concepts: ["Dictionaries"],
    initialCode: "user = {'id': 1}\nprint(user)",
    expectedOutput: "{'id': 1}"
  },
  {
    id: 28,
    type: 'CONSOLE',
    title: "Dictionary Access",
    description: "Getting values by key.",
    instruction: "Print the value of 'id' from `{'id': 101}`.",
    concepts: ["Keys"],
    initialCode: "d = {'id': 101}\nprint(d['id'])",
    expectedOutput: "101"
  },
  {
    id: 29,
    type: 'CONSOLE',
    title: "Dictionary Update",
    description: "Adding or changing keys.",
    instruction: "Add `'name': 'Byte'` to `{}`. Print it.",
    concepts: ["Mutation"],
    initialCode: "d = {}\nd['name'] = 'Byte'\nprint(d)",
    expectedOutput: "{'name': 'Byte'}"
  },
  {
    id: 30,
    type: 'CONSOLE',
    title: "Tuples",
    description: "Immutable sequences.",
    instruction: "Create a tuple `t = (1, 2)` and print it.",
    concepts: ["Immutability"],
    initialCode: "t = (1, 2)\nprint(t)",
    expectedOutput: "(1, 2)"
  },

  // --- CHAPTER 7: ADVANCED FUNCTIONS ---
  {
    id: 31,
    type: 'CONSOLE',
    title: "Default Arguments",
    description: "Setting a fallback value.",
    instruction: "Define `greet(msg='Hi')` and call it without arguments.",
    concepts: ["Defaults"],
    initialCode: "def greet(msg='Hi'):\n  print(msg)\n\ngreet()",
    expectedOutput: "Hi"
  },
  {
    id: 32,
    type: 'CONSOLE',
    title: "Keyword Arguments",
    description: "Passing by name.",
    instruction: "Call `func(a=1, b=2)` with named arguments.",
    concepts: ["Keywords"],
    initialCode: "def func(a, b):\n  print(a + b)\n\nfunc(a=1, b=2)",
    expectedOutput: "3"
  },
  {
    id: 33,
    type: 'CONSOLE',
    title: "*args",
    description: "Variable number of arguments.",
    instruction: "Print the tuple of arguments `*args`.",
    concepts: ["*args"],
    initialCode: "def test(*args):\n  print(args)\n\ntest(1, 2)",
    expectedOutput: "(1, 2)"
  },
  {
    id: 34,
    type: 'CONSOLE',
    title: "Lambda Functions",
    description: "Anonymous one-liners.",
    instruction: "Create a lambda that adds 10 to `x`. Print `f(5)`.",
    concepts: ["Lambda"],
    initialCode: "f = lambda x: x + 10\nprint(f(5))",
    expectedOutput: "15"
  },
  {
    id: 35,
    type: 'CONSOLE',
    title: "Map Function",
    description: "Transforming a list.",
    instruction: "Use `map` to double `[1, 2]`. Print as a list.",
    concepts: ["Functional"],
    initialCode: "nums = [1, 2]\nprint(list(map(lambda x: x*2, nums)))",
    expectedOutput: "[2, 4]"
  },

  // --- CHAPTER 8: CLASSES & OBJECTS ---
  {
    id: 36,
    type: 'CONSOLE',
    title: "Class Definition",
    description: "Blueprints for objects.",
    instruction: "Define `class Bot:` with `pass`.",
    concepts: ["OOP"],
    initialCode: "class Bot:\n  pass",
    validationRegex: /class\s+Bot\s*:/
  },
  {
    id: 37,
    type: 'CONSOLE',
    title: "The Constructor",
    description: "Setting initial state.",
    instruction: "Add `__init__` to set `self.id`.",
    concepts: ["__init__"],
    initialCode: "class Bot:\n  def __init__(self, id):\n    self.id = id",
    validationRegex: /self\.id\s*=\s*id/
  },
  {
    id: 38,
    type: 'CONSOLE',
    title: "Instance Methods",
    description: "Behavior for objects.",
    instruction: "Add `ping(self)` method that prints 'Pong'.",
    concepts: ["Methods"],
    initialCode: "class Bot:\n  def ping(self):\n    print('Pong')",
    validationRegex: /def\s+ping\s*\(self\)/
  },
  {
    id: 39,
    type: 'CONSOLE',
    title: "Instantiation",
    description: "Creating an object instance.",
    instruction: "Create `b = Bot()` and call `b.ping()`.",
    concepts: ["Instances"],
    initialCode: "class Bot:\n  def ping(self):\n    print('Pong')\n\nb = Bot()\nb.ping()",
    expectedOutput: "Pong"
  },
  {
    id: 40,
    type: 'CONSOLE',
    title: "Class Attributes",
    description: "Data shared by all instances.",
    instruction: "Define `version = 1.0` inside `Bot` class. Print `Bot.version`.",
    concepts: ["Static"],
    initialCode: "class Bot:\n  version = 1.0\n\nprint(Bot.version)",
    expectedOutput: "1.0"
  },

  // --- CHAPTER 9: CORE MODULES ---
  {
    id: 41,
    type: 'CONSOLE',
    title: "Math Module",
    description: "Advanced math operations.",
    instruction: "Print `math.floor(3.9)`.",
    concepts: ["math"],
    initialCode: "import math\nprint(math.floor(3.9))",
    expectedOutput: "3"
  },
  {
    id: 42,
    type: 'CONSOLE',
    title: "Random Choice",
    description: "Selecting random items.",
    instruction: "Print a random choice from `['A']`.",
    concepts: ["random"],
    initialCode: "import random\nprint(random.choice(['A']))",
    expectedOutput: "A"
  },
  {
    id: 43,
    type: 'CONSOLE',
    title: "Datetime",
    description: "Working with time.",
    instruction: "Print 'Year' using a mock datetime check.",
    concepts: ["datetime"],
    initialCode: "print('Year')",
    expectedOutput: "Year"
  },
  {
    id: 44,
    type: 'CONSOLE',
    title: "JSON",
    description: "Handling data formats.",
    instruction: "Convert `{'a': 1}` to JSON string. Print it.",
    concepts: ["json"],
    initialCode: "import json\nprint(json.dumps({'a': 1}))",
    expectedOutput: '{"a": 1}'
  },
  {
    id: 45,
    type: 'CONSOLE',
    title: "Statistics",
    description: "Calculating averages.",
    instruction: "Print the mean of `[1, 2, 3]` using `statistics.mean`.",
    concepts: ["statistics"],
    initialCode: "import statistics\nprint(statistics.mean([1, 2, 3]))",
    expectedOutput: "2"
  },

  // --- CHAPTER 10: FINAL MASTERY ---
  {
    id: 46,
    type: 'CONSOLE',
    title: "List Comprehension",
    description: "Compact list creation.",
    instruction: "Create `[x for x in range(3)]`. Print it.",
    concepts: ["Efficiency"],
    initialCode: "print([x for x in range(3)])",
    expectedOutput: "[0, 1, 2]"
  },
  {
    id: 47,
    type: 'CONSOLE',
    title: "Generator Expressions",
    description: "Memory efficient loops.",
    instruction: "Sum `(x for x in range(4))`. Print the result.",
    concepts: ["Generators"],
    initialCode: "print(sum(x for x in range(4)))",
    expectedOutput: "6"
  },
  {
    id: 48,
    type: 'CONSOLE',
    title: "Decorators",
    description: "Wrapping functions.",
    instruction: "Print 'Decorated' to simulate a decorator execution.",
    concepts: ["Advanced"],
    initialCode: "print('Decorated')",
    expectedOutput: "Decorated"
  },
  {
    id: 49,
    type: 'CONSOLE',
    title: "Error Handling",
    description: "Catching exceptions.",
    instruction: "Print 'Caught' in a try/except block.",
    concepts: ["Exceptions"],
    initialCode: "try:\n  1/0\nexcept:\n  print('Caught')",
    expectedOutput: "Caught"
  },
  {
    id: 50,
    type: 'CONSOLE',
    title: "Final Mission",
    description: "You are now a Python Master!",
    instruction: "Print 'Python Master' to graduate.",
    concepts: ["Completion"],
    initialCode: "print('Python Master')",
    expectedOutput: "Python Master"
  }
];
