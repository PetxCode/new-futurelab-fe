
export interface TypingLevel {
  id: number;
  title: string;
  description: string;
  speed: number; 
  spawnRate: number; 
  words: string[];
}

export const TYPING_LEVELS: TypingLevel[] = [
  // ─── PHASE 1: Letter Foundations ───
  {
    id: 1,
    title: "Tadpole Training",
    description: "Start simple! Type the single letters.",
    speed: 1,
    spawnRate: 2000,
    words: ["a", "s", "d", "f", "j", "k", "l", "h", "g", "e", "r", "t", "u", "i", "o"]
  },
  {
    id: 2,
    title: "Double Hop",
    description: "Type two letters! Quick jumps.",
    speed: 1,
    spawnRate: 1900,
    words: ["at", "in", "on", "to", "go", "up", "me", "he", "we", "be", "no", "is", "it"]
  },
  {
    id: 3,
    title: "Tri-Pad Challenge",
    description: "Three letter words! Keep hopping.",
    speed: 1,
    spawnRate: 1800,
    words: ["cat", "dog", "sun", "run", "hop", "fly", "bee", "red", "big", "joy", "sky", "car"]
  },
  {
    id: 4,
    title: "Four-Leaf Clover",
    description: "Four letter words! You're getting faster.",
    speed: 1,
    spawnRate: 1700,
    words: ["frog", "jump", "pond", "swim", "blue", "fast", "cool", "game", "text", "type"]
  },
  {
    id: 5,
    title: "Word Waterway",
    description: "Common five-letter words.",
    speed: 1,
    spawnRate: 1700,
    words: ["water", "green", "happy", "smile", "learn", "start", "cloud", "light", "space"]
  },

  // ─── PHASE 2: Code Symbols Introduction ───
  {
    id: 6,
    title: "Symbol Splash 💧",
    description: "Meet the code symbols! One at a time.",
    speed: 1,
    spawnRate: 2000,
    words: ["(", ")", "{", "}", "[", "]", "<", ">", ";", ":", ".", ",", "!", "?"]
  },
  {
    id: 7,
    title: "Special Keys 🔑",
    description: "Find the special characters on your keyboard!",
    speed: 1,
    spawnRate: 2000,
    words: ["$", "#", "@", "&", "*", "+", "-", "=", "/", "\\", "_", "~", "`", "^", "%"]
  },
  {
    id: 8,
    title: "Bracket Buddies 🤝",
    description: "Brackets always come in pairs! Type the pair.",
    speed: 1,
    spawnRate: 2000,
    words: ["()", "[]", "{}", "<>", "``", "''", '""']
  },
  {
    id: 9,
    title: "Symbol Combos 🎯",
    description: "Two symbols together! Getting trickier...",
    speed: 1,
    spawnRate: 1900,
    words: ["=>", "==", "!=", "<=", ">=", "&&", "||", "++", "--", "+=", "-=", "**", "//", "/*"]
  },

  // ─── PHASE 3: Code Keywords ───
  {
    id: 10,
    title: "Function Flow 🌊",
    description: "Coding basics! Type the keywords.",
    speed: 1,
    spawnRate: 1800,
    words: ["def", "var", "let", "const", "if", "for", "while", "true", "false", "null", "else", "return"]
  },
  {
    id: 11,
    title: "Code Creek 🏔️",
    description: "CamelCase variables appearing!",
    speed: 1,
    spawnRate: 1700,
    words: ["myVar", "userName", "isTrue", "getData", "setKey", "newId", "maxVal", "onClick", "appName"]
  },

  // ─── PHASE 4: Real Code Patterns ───
  {
    id: 12,
    title: "Tag Team 🏷️",
    description: "HTML tags! Open and close them.",
    speed: 1,
    spawnRate: 2000,
    words: ["<p>", "<h1>", "<div>", "<span>", "<img>", "<br>", "<a>", "<ul>", "<li>", "</p>", "</div>", "</h1>"]
  },
  {
    id: 13,
    title: "Call the Function 📞",
    description: "Functions need parentheses! Type them all.",
    speed: 1,
    spawnRate: 1900,
    words: ["fn()", "log()", "run()", "get()", "set()", "add()", "map()", "pop()", "max()", "min()", "sum()"]
  },
  {
    id: 14,
    title: "Arrow Adventure ➡️",
    description: "Arrow functions and modern JS patterns!",
    speed: 1,
    spawnRate: 1900,
    words: ["() =>", "=> {", "x =>", "(x)", "(...)", "[...x]", "{...y}", "x ?? y", "a?.b"]
  },
  {
    id: 15,
    title: "Template Treasure 💎",
    description: "Template literals and string magic!",
    speed: 1,
    spawnRate: 1900,
    words: ["${x}", "`hi`", "${a}", "${1}", '`${}`', "$name", "${id}", "#app", "@click", "!true"]
  },
  {
    id: 16,
    title: "Syntax Swamp 🐊",
    description: "Real code snippets! You're almost a pro!",
    speed: 1,
    spawnRate: 2000,
    words: ["x = 5;", "i < 10", "i++", "a + b", "n > 0", "if(x)", "!(a)", "[0]", "{x: 1}", "a[i]"]
  },
  {
    id: 17,
    title: "Pro Pond 🏆",
    description: "Full code expressions! Show your skills!",
    speed: 1,
    spawnRate: 2200,
    words: ["const x", "let i=0", "for(i)", "if(ok)", "(a, b)", "[1, 2]", "{a: b}", "x => x", "<App/>", "fn(x)"]
  },
  {
    id: 18,
    title: "Master Marsh 👑",
    description: "The ULTIMATE challenge! All symbols, all speed!",
    speed: 1,
    spawnRate: 2200,
    words: ["() => {}", "<div/>", "${val}", "a !== b", "x && y", "arr[0]", "obj.key", "fn(a,b)", "import x", "export{}", "class X{}", "try{}"]
  }
];
