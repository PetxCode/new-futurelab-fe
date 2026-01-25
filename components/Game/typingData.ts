
export interface TypingLevel {
  id: number;
  title: string;
  description: string;
  speed: number; 
  spawnRate: number; 
  words: string[];
}

export const TYPING_LEVELS: TypingLevel[] = [
  {
    id: 1,
    title: "Tadpole Training",
    description: "Start simple! Type the single letters.",
    speed: 1,
    spawnRate: 2000,
    words: ["a", "s", "d", "f", "j", "k", "l", "h", "g", "a", "s"]
  },
  {
    id: 2,
    title: "Double Hop",
    description: "Type two letters! Quick jumps.",
    speed: 1.1,
    spawnRate: 1900,
    words: ["at", "in", "on", "to", "go", "up", "me", "he", "we", "be", "no", "is", "it"]
  },
  {
    id: 3,
    title: "Tri-Pad Challenge",
    description: "Three letter words! Keep hopping.",
    speed: 1.2,
    spawnRate: 1800,
    words: ["cat", "dog", "sun", "run", "hop", "fly", "bee", "red", "big", "joy", "sky", "car"]
  },
  {
    id: 4,
    title: "Four-Leaf Clover",
    description: "Four letter words! You're getting faster.",
    speed: 1.3,
    spawnRate: 1700,
    words: ["frog", "jump", "pond", "swim", "blue", "fast", "cool", "game", "text", "type"]
  },
  {
    id: 5,
    title: "Word Waterway",
    description: "Common five-letter words.",
    speed: 1.4,
    spawnRate: 1700,
    words: ["water", "green", "happy", "smile", "learn", "start", "cloud", "light", "space"]
  },
  {
    id: 6,
    title: "Speedy Stream",
    description: "Mixed words! Watch your step.",
    speed: 1.6,
    spawnRate: 1600,
    words: ["fast", "quick", "speed", "dash", "race", "win", "hero", "super", "power"]
  },
  {
    id: 7,
    title: "Function Flow",
    description: "Coding basics! Type the keywords.",
    speed: 1.8,
    spawnRate: 1800,
    words: ["def", "var", "let", "const", "if", "for", "while", "true", "false", "null"]
  },
  {
    id: 8,
    title: "Code Creek",
    description: "CamelCase variables appearing!",
    speed: 2.0,
    spawnRate: 1700,
    words: ["myVar", "userName", "isTrue", "getData", "setKey", "newId", "maxVal"]
  },
  {
    id: 9,
    title: "Syntax Swamp",
    description: "Symbols and brackets! Watch out!",
    speed: 2.2,
    spawnRate: 1800,
    words: ["[]", "{}", "()", "=>", "==", "!=", "&&", "||", "++", "--", "+=", "-="]
  },
  {
    id: 10,
    title: "Master Marsh",
    description: "The ultimate challenge! Random chaos.",
    speed: 2.5,
    spawnRate: 1500,
    words: ["r4nd0m", "C0d3", "Frog!", "JUMP!!!", "Lvl_10", "Win?", "G0_G0", "<br/>"]
  }
];
