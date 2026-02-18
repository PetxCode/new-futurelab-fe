export interface Lesson {
  id: number;
  title: string;
  topics?: string[];
  content?: string;
  assignment?: string;
  pocketProject?: string;
  quiz?: string;
  questions?: {
    text: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
}

export interface Term {
  id: string;
  name: string;
  lessons: Lesson[];
}

export interface GradeLevel {
  id: string;
  name: string;
  icon: string;
  color: string;
  terms: Term[];
}

const DEFAULT_QUIZ = "Full 10-question module quiz";

export const CURRICULUM_DATA: GradeLevel[] = [
  {
    id: "jss1",
    name: "JSS 1",
    icon: "🟢",
    color: "emerald",
    terms: [
      {
        id: "jss1-t1",
        name: "1st Term – Python Foundations & Coding Basics",
        lessons: [
          {
            id: 1,
            title: "Introduction to Programming & VS Code",
            topics: ["What is programming?", "VS Code interface", "Running Python scripts"],
            content: `### Introduction to Programming\n\n**Programming** is the foundational art of modern engineering. At its core, it is the process of translating human logic and problem-solving into a language that digital circuits can interpret. Imagine you are directing a film—you write a screenplay (the code) that instructs the actors (the hardware) on exactly where to move and what to say.\n\n:::THE PURPOSE:::\nProgramming allows us to automate mundane tasks, process millions of data points in milliseconds, and build complex simulations of reality. Without that structure, the performance of hardware would be chaotic.\n\n### Meet VS Code\n\n**Visual Studio Code (VS Code)** is the stage where this creative work happens. It is not just a text editor; it is an **Integrated Development Environment (IDE)**. Developed by Microsoft, it has become the gold standard for developers because of its speed and extensibility.\n\n### Your First Command\n\nYou can test your setup by creating a file and writing your first line of code. This command tells the system to read your file, execute the logic, and return the results immediately.\n\n\`\`\`python\nprint("Hello, FutureLab!")\n\`\`\`\n\n### Understanding the Interpreter\n\nPython is designed to be readable by humans, resembling English in its syntax. However, your computer's CPU only understands **Binary**—ones and zeros. The **Interpreter** acts as a real-time translator, converting your elegant lines of code into electrical pulses. By learning VS Code, you are mastering the cockpit of the most powerful machinery ever built by mankind.` ,
            assignment: "Install VS Code and run a “Hello World” program",
            pocketProject: "Create a simple greeting program",
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is programming?", options: ["Cooking a meal", "Giving instructions to a computer", "Fixing a TV", "Playing video games"], correctAnswer: 1 },
              { text: "What does VS Code stand for?", options: ["Visual Standard Code", "Virtual Studio Code", "Visual Studio Code", "Verified System Code"], correctAnswer: 2 },
              { text: "Which file extension is used for Python scripts?", options: [".py", ".html", ".css", ".js"], correctAnswer: 0 },
              { text: "Which part of VS Code is used to write and edit your code?", options: ["Terminal", "Explorer", "Editor Area", "Search"], correctAnswer: 2 },
              { text: "How do you run a Python script in the VS Code terminal?", options: ["Type 'run script.html'", "Type 'python script.py'", "Type 'start coding'", "Drag and drop"], correctAnswer: 1 },
              { text: "What is a 'Bug' in programming?", options: ["An insect", "An error in the code", "A new feature", "A storage device"], correctAnswer: 1 },
              { text: "Which symbol is used for comments in Python?", options: ["//", "/*", "#", "--"], correctAnswer: 2 },
              { text: "What is the output of print('Hello World')?", options: ["Error", "Hello World", "'Hello World'", "Print"], correctAnswer: 1 },
              { text: "VS Code is an example of an:", options: ["Operating System", "IDE/Code Editor", "Web Browser", "Social Media"], correctAnswer: 1 },
              { text: "What is the 'Terminal' used for in VS Code?", options: ["Browsing the web", "Running commands and executing code", "Saving files", "Styling text"], correctAnswer: 1 }
            ]
          },
          {
            id: 2,
            title: "Python Basics (Variables & Data Types)",
            topics: ["int, float, string, bool"],
            content: `### The Atoms of Code\n\nOnce you have mastered the tools of the trade, the next step is understanding the 'atoms' of code: **Data Types**. In the physical world, we use different containers for different materials—you wouldn't put soup in a sieve or gasoline in a cardboard box.\n\n### What is a Variable?\n\n**Variables** are essentially named locations in your computer's memory. When you write \`age = 15\`, you are telling the computer to reserve a small patch of silicon, label it 'age', and store the value inside it.\n\n:::THE PURPOSE:::\nVariables allow us to store data, give it a meaningful name, and retrieve or change it later. Instead of using hard-coded values everywhere, we use variables to make our programs dynamic and flexible.\n\n\`\`\`python\nplayer_score = 0\nplayer_score = 100 # The value has changed!\nprint(player_score)\n\`\`\`\n\n### Common Data Types\n\nThere are four primary data types we encounter in everyday coding. Understanding these is critical for professional software engineering.\n\n:::DATA TYPES:::\n1. **Integers (int)**: Whole numbers like 42.\n2. **Floats (float)**: Decimal numbers like 3.14.\n3. **Strings (str)**: Text in quotes like "Hello".\n4. **Booleans (bool)**: True or False values.\n\n\`\`\`python\nname = "FutureLab"\npi = 3.14159\nlevel = 1\nis_online = True\n\`\`\`\n\n### Practical Application\n\nIn this lesson, we will also explore **Type Casting**—the ability to convert one type to another. For example, when a user enters their age in a web form, Python sees it as a string. To perform math on it, we must 'cast' it into an integer using \`int()\`. Mastering these rules is the first real step in becoming a software architect.`,
            assignment: "Create variables of each data type",
            pocketProject: "Simple calculator (2 numbers)",
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a variable in Python?", options: ["A mathematical constant", "A named memory location", "A type of computer virus", "A hardware component"], correctAnswer: 1 },
              { text: "Which of these is an integer (int)?", options: ["3.14", "True", "'Hello'", "42"], correctAnswer: 3 },
              { text: "What data type is used for decimals?", options: ["int", "float", "str", "bool"], correctAnswer: 1 },
              { text: "What does 'str' stand for?", options: ["Strong", "Store", "String", "Structure"], correctAnswer: 2 },
              { text: "Which data type can only be True or False?", options: ["bool", "float", "int", "str"], correctAnswer: 0 },
              { text: "How do you define a string in Python?", options: ["Parentheses ()", "Curly braces {}", "Quotes '' or \"\"", "Brackets []"], correctAnswer: 2 },
              { text: "What is 'Type Casting'?", options: ["Acting in a film", "Converting one data type to another", "Buying a new computer", "Deleting variables"], correctAnswer: 1 },
              { text: "Which of these is a boolean value?", options: ["'True'", "true", "True", "1"], correctAnswer: 2 },
              { text: "What happens if you add '5' (str) and 5 (int)?", options: ["10", "'55'", "TypeError", "'10'"], correctAnswer: 2 },
              { text: "Variables allow us to create ____ systems.", options: ["Static", "Dynamic", "Broken", "Physical"], correctAnswer: 1 }
            ]
          },
          {
            id: 3,
            title: "Input & Output",
            topics: ["input()", "print() formatting"],
            content: `### Interaction in Code\n\n**Interaction** is what separates a static script from a true application. In this lesson, we dive deep into the **Life Cycle of Data**—how it enters a program, how it is stored, and how it is presented to the user.\n\n### The Ears of Your Program\n\nThe **input()** function in Python is your program's eyes and ears. When you call this function, the program pauses and waits for the user to type something.\n\n:::DATA CAPTURE:::\nIt's important to remember that \`input()\` always captures data as a **String**. Even if you type a number, Python hears it as text. To use it as a number, you must convert it.\n\n\`\`\`python\nuser_name = input("What is your name? ")\nprint(f"Welcome to FutureLab, {user_name}!")\n\`\`\`\n\n### Formatted Output\n\nProfessional engineers use **Formatting** to make data readable. We will explore **f-strings** (formatted strings), which allow you to embed variables directly into your text using curly braces \`{}\`.\n\n:::PRO TIP:::\nAlways provide clear **Prompts**. Instead of just showing a blinking cursor, your input function should include a helpful message like "Enter your age: " to guide the user.`,
            assignment: "Build a student info collector",
            pocketProject: "Age calculator",
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "Which function is used to get data from the user?", options: ["output()", "input()", "get()", "scan()"], correctAnswer: 1 },
              { text: "What data type does input() return by default?", options: ["Integer", "Float", "String", "Boolean"], correctAnswer: 2 },
              { text: "Which function displays text on the screen?", options: ["show()", "write()", "print()", "display()"], correctAnswer: 2 },
              { text: "What is an 'f-string' used for?", options: ["Filtering data", "Formatting strings with variables", "Fixing bugs", "Folding code"], correctAnswer: 1 },
              { text: "Which character is used to start an f-string?", options: ["s", "f", "x", "p"], correctAnswer: 1 },
              { text: "How do you add a new line in a print statement?", options: ["\\t", "\\n", "\\l", "\\v"], correctAnswer: 1 },
              { text: "The message inside input() is called a:", options: ["Warning", "Prompt", "Error", "Variable"], correctAnswer: 1 },
              { text: "What symbol do you use to embed variables in f-strings?", options: ["[]", "()", "{}", "<>"], correctAnswer: 2 },
              { text: "User Experience (UX) in I/O means:", options: ["Making code run fast", "Making interactions easy for users", "Using advanced hardware", "Writing long scripts"], correctAnswer: 1 },
              { text: "Which character creates a large space (tab) in text?", options: ["\\n", "\\s", "\\t", "\\b"], correctAnswer: 2 }
            ]
          },
          {
            id: 4,
            title: "Conditional Statements",
            topics: ["if, else, elif"],
            content: `### Control Flow & Logic\n\nLogic is the brain of your software. Without logic, a computer would just execute one line after another until it hit the end. **Conditionals** allow us to build 'forks in the road', where the program can choose different paths based on the data it receives.\n\n### The If Statement\n\nThe most basic building block of logic is the **if** statement. It's like saying: "If the light is green, then I will drive."\n\n:::THE ARCHITECTURE:::\nIn Python, we use indentation to show which code belongs to the conditional. This keeps the code clean and easy to read for other engineers.\n\n\`\`\`python\ntemperature = 30\nif temperature > 25:\n    print("It's a hot day!")\nelse:\n    print("It's nice outside.")\n\`\`\`\n\n### Multiple Conditions\n\nSometimes, you need more than just Two options. That's where **elif** (else if) comes in. It allows you to check multiple possibilities in a row. \n\n:::COMPARISON:::\nEngineers use **Comparison Operators** to check values:\n- \`==\` (Equal to)\n- \`!=\` (Not equal to)\n- \`>\` (Greater than)\n- \`<\` (Less than)\n\n\`\`\`python\nscore = 85\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")\n\`\`\`\n\n### Boolean Logic\n\nWe will also look at **Logical Operators** like **and**, **or**, and **not**. This allows you to combine multiple checks into a single line of logic. By mastering conditionals, you are moving away from simple instructions and starting to build truly intelligent software that can make complex decisions on its own.`,
            assignment: "Grade checker",
            pocketProject: "Even/odd checker",
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "Which keyword starts a conditional statement?", options: ["case", "if", "switch", "then"], correctAnswer: 1 },
              { text: "What does 'elif' stand for?", options: ["else if", "every if", "end if", "error if"], correctAnswer: 0 },
              { text: "Which operator checks if two values are equal?", options: ["=", "==", "===", "!="], correctAnswer: 1 },
              { text: "When does the 'else' block execute?", options: ["Always", "If the 'if' condition is True", "If no previous conditions are met", "Never"], correctAnswer: 2 },
              { text: "Python uses ____ to show which code belongs in a block.", options: ["Brackets", "Parentheses", "Indentation", "Semicolons"], correctAnswer: 2 },
              { text: "Which operator checks if values are NOT equal?", options: ["<>", "==", "!=", "not"], correctAnswer: 2 },
              { text: "How do you check two conditions at once where both must be true?", options: ["or", "and", "plus", "also"], correctAnswer: 1 },
              { text: "Which operator is used to check if the left value is bigger?", options: ["<", ">", ">=", "<="], correctAnswer: 1 },
              { text: "Conditional statements create ____ in your code.", options: ["Errors", "Loops", "Branching paths", "Static data"], correctAnswer: 2 },
              { text: "What is the result of 5 > 3?", options: ["True", "False", "None", "Error"], correctAnswer: 0 }
            ]
          },
          {
            id: 5,
            title: "Loops (While & For)",
            topics: ["while loops", "for in range()"],
            content: `### The Power of Repetition\n\n**Iteration** is the engine of productivity in software engineering. One of the most famous quotes in programming is: 'Computers are fast, but they are also very literal.'\n\n### The While Loop\n\nThe **while** loop continues as long as a certain condition stays True. It's like saying: 'While I am still hungry, I will keep eating.'\n\n:::CAUTION:::\nIf you're not careful, you can create an **Infinite Loop**—a program that never stops because the condition never becomes False.\n\n\`\`\`python\ncount = 1\nwhile count <= 5:\n    print(f"Counting: {count}")\n    count += 1 # Critical step!\n\`\`\`\n\n### The For Loop\n\nThe **for** loop is used for 'definite iteration'. Use this when you know exactly how many times you want to repeat something. We often use the **range()** function to generate sequences.\n\n:::ITERATION:::\nFor-loops are incredibly efficient for processing data sets or generating graphics. Mastering this structure is the foundation of data engineering and automation.\n\n\`\`\`python\nfor i in range(5):\n    print(f"Iteration number {i}")\n\`\`\`\n\n### Data Processing\n\nBeyond just repeating code, loops are essential for **Data Processing**. You will learn how to use loops to search for a specific item in a list or to calculate a total sum. We will also explore the **break** and **continue** keywords, which give you the power to jump out of a loop early or skip specific iterations based on logic.`,
            assignment: "Write a loop that counts to 100",
            pocketProject: "Multiplication table generator",
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the purpose of a loop?", options: ["To delete code", "To repeat a block of code", "To change the screen color", "To speed up the internet"], correctAnswer: 1 },
              { text: "Which loop runs as long as a condition is True?", options: ["for", "while", "if", "static"], correctAnswer: 1 },
              { text: "What happens in an 'Infinite Loop'?", options: ["The program crashes immediately", "The program never stops running", "The program saves itself", "The program turns off"], correctAnswer: 1 },
              { text: "Which function generates a sequence of numbers for a for-loop?", options: ["sequence()", "list()", "range()", "generate()"], correctAnswer: 2 },
              { text: "What does count += 1 do?", options: ["Decreases count by 1", "Increases count by 1", "Deletes count", "Resets count to 0"], correctAnswer: 1 },
              { text: "Which keyword is used to EXIT a loop early?", options: ["stop", "break", "exit", "end"], correctAnswer: 1 },
              { text: "Which keyword SKIPS the current iteration and moves to the next?", options: ["skip", "pass", "continue", "next"], correctAnswer: 2 },
              { text: "A for-loop is best used when you:", options: ["Don't know when to stop", "Know the exact number of repetitions", "Want to check a single condition", "Are out of memory"], correctAnswer: 1 },
              { text: "Iteration is the process of:", options: ["Naming variables", "Repeating a process", "Fixing bugs", "Saving files"], correctAnswer: 1 },
              { text: "What is the first number generated by range(5)?", options: ["1", "0", "5", "None"], correctAnswer: 1 }
            ]
          },
          {
            id: 6,
            title: "Logic & Problem Solving",
            topics: ["Algorithmic thinking", "Pseudocode"],
            content: `### How to Think Like an Engineer\n\nBefore a professional engineer touches the keyboard, they must first solve the problem in their mind. This is called **Algorithmic Thinking**.\n\n### The Algorithm\n\nAn **Algorithm** is simply a step-by-step set of instructions to complete a task. Whether it's baking a cake, building a bridge, or writing a search engine, the process starts with a plan.\n\n:::THE ARCHITECT:::\nOne of the most powerful tools in an engineer's toolkit is **Pseudocode**. This is a way of writing out your logic in plain English before translating it into Python.\n\n\`\`\`text\n1. Ask user for password\n2. IF password is "Secret123":\n3.    OPEN the vault\n4. ELSE:\n5.    ALARM sounds\n\`\`\`\n\n### Strategic Skills\n\nWe will also explore **Decomposition**, which is the practice of breaking a large, scary problem into small, manageable pieces. If you want to build a video game, don't try to build the whole world at once. Instead, decompose it: first, make the player move; then, make them jump; then, add an enemy.\n\n:::PATTERN RECOGNITION:::\nEngineers look for similarities between problems they've solved before. If you've learned how to calculate the average of three numbers, you now have the pattern to calculate the average of a million numbers. By mastering these conceptual skills, you are becoming more than just a "coder"—you are becoming a **Problem Solver**.`,
            assignment: "Write pseudocode for an ATM withdrawal",
            pocketProject: "Logical flowchart for a daily routine",
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is an 'Algorithm'?", options: ["A fast computer", "A step-by-step set of instructions", "A type of battery", "A social media post"], correctAnswer: 1 },
              { text: "What is 'Pseudocode'?", options: ["A new programming language", "Logic written in plain language (English)", "Encrypted code", "Broken code"], correctAnswer: 1 },
              { text: "Breaking a large problem into smaller parts is called:", options: ["Decomposition", "Deletion", "Destruction", "Division"], correctAnswer: 0 },
              { text: "Why is pseudocode useful?", options: ["It runs faster than Python", "It helps plan logic before coding", "It's required by the hardware", "It changes screen colors"], correctAnswer: 1 },
              { text: "An engineer who looks for similarities between problems is using:", options: ["Pattern Recognition", "Search Engines", "Social Media", "Calculators"], correctAnswer: 0 },
              { text: "Algorithmic thinking is mostly about:", options: ["Typing speed", "Logical problem solving", "Buying hardware", "Using icons"], correctAnswer: 1 },
              { text: "Which of these is a 'Decomposed' task for making tea?", options: ["Boil the water", "Make the whole tea", "Enjoy the drink", "Think about tea"], correctAnswer: 0 },
              { text: "What comes BEFORE writing actual code?", options: ["Testing", "Planning/Pseudocode", "Selling the app", "Deleting files"], correctAnswer: 1 },
              { text: "A step-by-step plan for a recipe is an example of an:", options: ["Error", "Algorithm", "Variable", "Loop"], correctAnswer: 1 },
              { text: "High-level logic is more important than ____.", options: ["User Needs", "Typing 'syntax'", "Hardware", "Internet Speed"], correctAnswer: 1 }
            ]
          },
        ]
      },

      {
        id: "jss1-t2",
        name: "2nd Term – Web Basics & Logic",
        lessons: [
          { 
            id: 1, 
            title: "HTML Basics", 
            content: `### The Blueprint of the Web\n\nThe World Wide Web is a vast ecosystem built on a simple yet profound language: **HTML (HyperText Markup Language)**. While Python is for logic and 'behind-the-scenes' processing, HTML is the blueprint for everything you see on a webpage. In this lesson, we shift our focus from terminal-based programs to building interfaces that live in a web browser.\n\n### Foundations of Structure\n\nUnderstanding HTML is like learning how to frame a house—before you can paint the walls (CSS) or install the plumbing (JavaScript), you must have a solid structure of beams and supports. Without a proper frame, no amount of decoration will make the house functional.\n\n:::THE ARCHITECTURE:::\nHTML uses a system of **Tags** to define the different parts of a page. A tag is like a label that tells the browser what kind of content is inside it. For example, \`<h1>\` defines a main heading, while \`<p>\` is for standard paragraphs. These tags often come in pairs: an opening tag and a closing tag. Everything in between is treated as part of that element.\n\n\`\`\`html\n<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Welcome to FutureLab</h1>\n    <p>This is where your web engineering journey begins!</p>\n  </body>\n</html>\n\`\`\`\n\n### Essential Semantic Tags\n\nIn this module, we will explore the essential **Semantic Tags** that define the skeleton of a modern website. We'll start with the \`<!DOCTYPE html>\` declaration, which tells the browser we are using the latest version of HTML. We'll then look at the \`<html>\`, \`<head>\`, and \`<body>\` tags, which are the fundamental containers for every webpage. You'll learn how to create lists using \`<ul>\` and \`<li>\`, how to link to other pages using the anchor tag \`<a>\`, and how to display images using \`<img>\`.\n\n### Beyond the Surface\n\nBeyond just learning the names of tags, we will focus on **Accessibility**—the practice of ensuring your website can be used by everyone, including people with visual impairments. We'll talk about the importance of **alt text** for images and why using the correct heading levels matters for screen readers. By the end of this lesson, you won't just be looking at the web as a user; you'll be seeing the code beneath the surface, ready to build your first personal profile page from scratch. HTML is the first step in your journey to becoming a full-stack engineer, turning you from a consumer of the web into a creator of it. You are now mastering the grammar of the digital world.`,
            assignment: "Create personal profile page", 
            pocketProject: "School website homepage", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does HTML stand for?", options: ["HyperText Markup Language", "HighTech Modern Language", "Hyperlink Text Management", "Home Tool Markup Language"], correctAnswer: 0 },
              { text: "Which tag is used for the largest heading?", options: ["<h6 >", "<head>", "<h1>", "<header>"], correctAnswer: 2 },
              { text: "Which character is used to indicate a closing tag?", options: ["/", "<", ">", "*"], correctAnswer: 0 },
              { text: "Where is the visible content of an HTML document located?", options: ["<head>", "<body>", "<footer>", "<meta>"], correctAnswer: 1 },
              { text: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correctAnswer: 1 },
              { text: "Which attribute is used to provide the source of an image?", options: ["href", "src", "alt", "link"], correctAnswer: 1 },
              { text: "Which tag is used to create an unordered list?", options: ["<ol>", "<li>", "<ul>", "<list>"], correctAnswer: 2 },
              { text: "What is the purpose of the 'alt' attribute on an <img> tag?", options: ["To style the image", "To provide text if the image fails to load", "To change the image size", "To link to another page"], correctAnswer: 1 },
              { text: "Which tag creates a line break without a new paragraph?", options: ["<lb>", "<break>", "<br>", "<hr>"], correctAnswer: 2 },
              { text: "HTML is used primarily to define a website's ____.", options: ["Logic", "Style", "Structure", "Animation"], correctAnswer: 2 }
            ]
          },
          { 
            id: 2, 
            title: "CSS Basics", 
            content: `### Aesthetics & Design\n\nIf HTML is the skeleton of a house, then **CSS (Cascading Style Sheets)** is the paint, the wallpaper, the lighting, and the interior design. Without CSS, the web would be a dry collection of black text on a white background. CSS is the language we use to tell the browser exactly how our HTML elements should look—from their colors and fonts to their spacing and layout. In the modern tech world, **Design Engineering** is a highly valued skill that bridges the gap between raw code and beautiful user experiences.\n\n### The Rule of Style\n\nAt the core of CSS is the **Rule Set**. Every rule consists of a **Selector** (which element to style) and a **Declaration Block** (what styles to apply). Inside the block, we write **Properties** and **Values**. This separation of concerns—HTML for structure and CSS for presentation—is one of the most powerful concepts in web development, allowing you to change the entire look of a website without touching a single line of content.\n\n\`\`\`css\nh1 {\n  color: #4f46e5;\n  font-size: 32px;\n  text-align: center;\n  text-transform: uppercase;\n}\n\`\`\`\n\n### The Box Model\n\nIn this lesson, we will master the **Box Model**, which is the governing principle of all web layout. Every HTML element is essentially a box, consisting of **Content**, **Padding**, **Border**, and **Margin**. Understanding how these four layers interact is the key to creating clean, professional designs. We'll also explore **Selectors** in depth, learning how to target specific items using **Classes** ('.') and **IDs** ('#'). While tags style every instance of an element, classes allow you to create unique styles that you can reuse across your project.\n\n:::DESIGN TIP:::\nWe will also touch upon the beauty of **Colors and Typography**. You'll learn how to use hex codes and RGB values to select from millions of colors, and how to import professional fonts from services like Google Fonts. We'll discuss **Responsive Design**—the idea that a website should look great on both a massive desktop monitor and a small smartphone screen. By the end of this module, you'll be styling your profile page with gradients, shadows, and perfect spacing, transforming a basic document into a stunning piece of digital art ready for the world to see. Engineering is not just about function; it is about providing a delightful experience to your users.`,
            assignment: "Style profile page", 
            pocketProject: "Styled school homepage", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does CSS stand for?", options: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style System", "Computer Style Sheets"], correctAnswer: 1 },
              { text: "Which HTML attribute is used to refer to an external CSS file?", options: ["<style>", "<link>", "<css>", "<script>"], correctAnswer: 1 },
              { text: "Which character is used to select an element by class?", options: ["#", ".", "*", "@"], correctAnswer: 1 },
              { text: "Which character is used to select an element by ID?", options: ["#", ".", "!", "@"], correctAnswer: 0 },
              { text: "In the Box Model, which layer is between the content and the border?", options: ["Margin", "Outline", "Padding", "Space"], correctAnswer: 2 },
              { text: "Which property is used to change the background color?", options: ["text-color", "bg-color", "background-color", "color"], correctAnswer: 2 },
              { text: "Which CSS property controls the text size?", options: ["font-size", "text-size", "font-weight", "text-style"], correctAnswer: 0 },
              { text: "How do you make text bold in CSS?", options: ["font-weight: bold;", "text-style: bold;", "font: bold;", "style: bold;"], correctAnswer: 0 },
              { text: "What is the correct way to add a comment in CSS?", options: ["// comment", "# comment", "/* comment */", "<-- comment -->"], correctAnswer: 2 },
              { text: "Which property is used to change the font of an element?", options: ["font-style", "font-family", "type-face", "font-weight"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "JavaScript Basics", 
            content: `### The Logic of Action\n\nIf HTML provides the structure and CSS the beauty, then **JavaScript (JS)** provides the 'Life' and 'Intelligence'. JavaScript is a high-level, interpreted programming language that makes websites interactive. It is what allows a button to do something when clicked, a form to check for errors before submitting, or a social media feed to update in real-time without refreshing the page. In the modern tech world, JavaScript is the engine that drives nearly every web experience you enjoy.\n\n### Foundations of JS\n\nJavaScript is the most popular programming language in the world, powering everything from simple websites to complex applications like Facebook and Google Maps. It was originally created in just 10 days, but it has evolved into a powerhouse of engineering. In this lesson, we explore **Variables**. In JS, we use keywords like \`let\` and \`const\` to store data. We'll then look at **Functions**—reusable blocks of code that perform specific tasks. Imagine a function is a worker who knows how to perform a specific calculation; whenever you need it, you just call their name.\n\n\`\`\`javascript\nconst welcomeUser = (name) => {\n  const message = \`Hello, \${name}! Welcome to the digital frontier.\`;\n  console.log(message);\n  return message;\n}\n\nwelcomeUser("Future Engineer");\n\`\`\`\n\n### Living Interfaces\n\nOne of the most important concepts we'll cover is **DOM Manipulation**. The DOM (Document Object Model) is how JavaScript 'sees' your HTML page. By using JS, you can change text, switch colors, or even add new HTML elements on the fly. We'll learn how to use **Event Listeners** to respond to user actions like clicks, typing, and hovering.\n\n:::INTERACTIVITY:::\nBy using JavaScript, you are moving beyond static documents and into the realm of **Dynamic Applications**. You'll learn how to capture user input, process it with logic (if/else statements and loops), and display the results back on the screen instantly. By the end of this module, you'll be building interactive buttons and simple calculators that live right in your web browser. JavaScript is the final piece of the 'Big Three' web technologies, and mastering it gives you the power to build truly intelligent, responsive, and dynamic experiences for anyone with a web browser. Every line of JS you write adds a heartbeat to your code.`,
            assignment: "Alert & simple math", 
            pocketProject: "Interactive button", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "Which keyword is used to declare a variable that can change?", options: ["var", "let", "fix", "static"], correctAnswer: 1 },
              { text: "Which keyword is used for a variable that should NEVER change?", options: ["let", "const", "var", "stay"], correctAnswer: 1 },
              { text: "How do you write 'Hello World' to the browser's secret log?", options: ["print()", "console.log()", "log.text()", "browser.show()"], correctAnswer: 1 },
              { text: "What does DOM stand for?", options: ["Data Object Mode", "Document Object Model", "Digital Order Method", "Desktop Open Media"], correctAnswer: 1 },
              { text: "Which symbol is used for comments in JavaScript?", options: ["#", "--", "//", "/*"], correctAnswer: 2 },
              { text: "How do you start an 'if' statement in JS?", options: ["if i == 5 then", "if (i == 5)", "if i = 5", "if {i == 5}"], correctAnswer: 1 },
              { text: "Which function is used to respond to a user's click?", options: ["handleClick()", "onClick()", "addEventListener('click', ...)", "onAction()"], correctAnswer: 2 },
              { text: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "start myFunction", "run.myFunction"], correctAnswer: 1 },
              { text: "Which operator is used to add two numbers?", options: ["*", "+", "&", "add"], correctAnswer: 1 },
              { text: "JavaScript is primarily used to make websites ____.", options: ["Faster", "Beautiful", "Interactive", "Standardized"], correctAnswer: 2 }
            ]
          },
          { 
            id: 4, 
            title: "Console Games (JS or Python)", 
            content: `Gaming is one of the most exciting ways to push your coding skills to the limit. In this lesson, we move beyond simple exercises and start building 'Console Games'. These are games that run entirely in the terminal or browser console using text-based interactions. While they might not have 3D graphics, they are the best way to master 'Game Logic'—the complex series of rules that determine how a game starts, how a player scores points, and what happens when they win or lose.\n\nThe foundation of any game is the 'Game Loop'. This is a continuous loop that runs while the game is active, constantly asking: 'What is the current state? Has the user made a move? What should happen next?' We'll learn how to build this loop using 'while' statements. For example, in a Number Guessing Game, the loop continues 'while' the player's guess is incorrect. This structure teaches you how to maintain 'State'—remembering the player's current score, remaining attempts, or inventory items across different steps of the program.\n\nWe will also explore 'Randomness', which is essential for making games unpredictable and fun. In Python, we use the 'random' module; in JavaScript, we use 'Math.random()'. You'll learn how to generate a random number within a specific range, creating a dynamic challenge every time the game resets. This randomness is the secret ingredient that keeps players coming back. We'll also dive into 'User Feedback', ensuring your program gives clear, encouraging messages based on the player's performance. Instead of just saying 'Wrong', your game should say 'Too high! Try a lower number.' This is the beginning of thinking like a Game Designer.\n\nFinally, we'll discuss 'Win/Loss Conditions'. Every great game needs a clear goal and a sense of stakes. You'll learn how to use nested if-statements to check for these conditions. Has the player guessed the number in under 5 tries? Win! Have they run out of lives? Game Over. By the end of this module, you'll have built a fully functional Quiz Game or Guessing Game, proving that you can manage complex logic flows and create engaging user experiences. Console games are the perfect playground for testing your architectural skills before moving on to visual game engines and complex AI simulations.`,
            assignment: "Simple text game", 
            pocketProject: "Quiz game", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the heart of every functional game program?", options: ["A fast CPU", "Graphics card", "The Game Loop", "Sound effects"], correctAnswer: 2 },
              { text: "Which loop is most commonly used for a Game Loop?", options: ["for", "while", "if", "static"], correctAnswer: 1 },
              { text: "Why is 'Randomness' important in games?", options: ["To make code shorter", "To produce different results each time", "To fix bugs", "To make it run faster"], correctAnswer: 1 },
              { text: "In Python, which module is used for random numbers?", options: ["math", "random", "os", "sys"], correctAnswer: 1 },
              { text: "What does 'State' mean in a game?", options: ["The location of the player", "All current variables (score, lives, etc.)", "The graphics settings", "The file size"], correctAnswer: 1 },
              { text: "How do you generate a random number in JavaScript?", options: ["random.get()", "Math.random()", "num.random", "getRand()"], correctAnswer: 1 },
              { text: "What is a 'Win/Loss Condition'?", options: ["The color of the screen", "The rules that end the game", "The player's name", "How long the game takes to load"], correctAnswer: 1 },
              { text: "A 'Too high!' message in a guessing game is an example of:", options: ["User Feedback", "A bug", "System setting", "Data type"], correctAnswer: 0 },
              { text: "Which statement is best for checking the player's guess against the answer?", options: ["loop", "if", "while", "print"], correctAnswer: 1 },
              { text: "Console games are primarily ____ based.", options: ["Graphic", "Sound", "Text", "Physical"], correctAnswer: 2 }
            ]
          },
          { 
            id: 5, 
            title: "Data Structures (Lists)", 
            content: `### Organized Collections\n\nAs your programs grow in complexity, you'll find that individual variables aren't enough to manage all your information. Imagine trying to run a grocery store where every single item was kept in its own separate, unlabeled box—it would be a disaster! In programming, **Data Structures** are the sophisticated containers we use to organize and manage groups of related data. The most fundamental and powerful of these is the **List** (also known as an Array in other languages).\n\n### Foundations of Lists\n\nA List is an ordered collection of items. In Python, we define them using square brackets: \`inventory = ["Sword", "Shield", "Potion"]\`. The magic of a list lies in its **Index**. Every item in a list has a specific position, starting with number 0. This **Zero-based Indexing** is a hallmark of professional programming. By knowing the index, you can retrieve any item instantly, change it, or remove it. Lists allow you to treat a thousand data points as a single unit, making your code significantly more powerful and easier to read.\n\n\`\`\`python\nprojects = ["Web UI", "Python Game", "AI Chatbot"]\nprint(f"My favorite project is: {projects[0]}")\n\nprojects.append("Mobile App") # Expanding the list\nprint(f"Total projects: {len(projects)}")\n\`\`\`\n\n### Scaling with Loops\n\nLists allow you to treat a thousand data points as a single unit. We use **Loops** to iterate through these collections automatically. This is how a banking app calculates the total balance of all your transactions or how a search engine checks thousands of pages for a keyword. By mastering lists, you are graduating from 'Scripting' to **Data Engineering**.\n\n:::DATA ARCHITECTURE:::\nYou're learning how to build systems that can scale, handling not just one piece of information, but millions of them with elegance and speed. Data structures are the building blocks of every major application, and the List is the strongest brick in your toolkit. In this lesson, we will explore **List Methods**—the built-in tools that allow us to manipulate our collections. You'll learn how to \`append\` (add to the end), \`insert\` (add at a specific spot), and \`pop\` (remove the last item). We'll also look at **Slicing**, which lets you grab a specific portion of a list, like taking the first five items out of a hundred. This is essential for tasks like pagination or filtering results in a social media feed. By mastering lists, you are mastering the art of organization in a digital world. Every professional engineer must be a master of their data structures.`,
            assignment: "List of student names", 
            pocketProject: "Simple attendance tracker", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'List' in Python?", options: ["A type of error", "An ordered collection of items", "A hardware device", "A secret code"], correctAnswer: 1 },
              { text: "Which symbol is used to define a list?", options: ["()", "{}", "[]", "<>"], correctAnswer: 2 },
              { text: "What number does list indexing start with?", options: ["1", "0", "-1", "10"], correctAnswer: 1 },
              { text: "How do you add an item to the END of a list?", options: ["push()", "add()", "append()", "insert()"], correctAnswer: 2 },
              { text: "What does list.pop() do?", options: ["Adds an item", "Removes the last item", "Clears the screen", "Prints the list"], correctAnswer: 1 },
              { text: "How do you get the length of a list in Python?", options: ["list.length", "count()", "len(list)", "size()"], correctAnswer: 2 },
              { text: "Accessing a part of a list is called ____.", options: ["Chopping", "Slicing", "Breaking", "Scaling"], correctAnswer: 1 },
              { text: "If my_list = ['A', 'B'], what is my_list[1]?", options: ["'A'", "'B'", "Error", "None"], correctAnswer: 1 },
              { text: "Which loop is best for processing every item in a list?", options: ["for", "while", "if", "static"], correctAnswer: 0 },
              { text: "Data Structures help us ____ collections of data.", options: ["Delete", "Slow down", "Organize", "Break"], correctAnswer: 2 }
            ]
          },
          { 
            id: 6, 
            title: "Intro to Machine Learning Concepts", 
            topics: ["Data vs Information"], 
            content: `### The Oxygen of AI\n\nTo build the intelligent systems of the future, we must first understand the 'Oxygen' that feeds them: **Data**. In the world of **Machine Learning (ML)**, there is a profound difference between simple 'Data' and meaningful **Information**. Raw data is just a collection of facts—like a list of temperatures. Information is what happens when we process that data to reveal patterns—like realizing that the temperature is rising every day. In this lesson, we dive into the **Data Life Cycle** and explore how we prepare information for our AI models to learn from.\n\n### Foundations of Learning\n\nThe most critical step in Machine Learning is **Data Collection**. If you want to train an AI to recognize a cat, you need thousands of images of cats. But not just any images—they need to be diverse. If you only show the machine black cats, it will never learn that ginger cats exist! This leads us to the concept of **Bias**. As a Machine Learning engineer, your most important job is ensuring your data is fair and representative. \n\n:::GIGO PRINCIPLE:::\nIf the input is 'Garbage', the output will be 'Garbage' (**GIGO**). Understanding this ethics-first approach is what separates a great engineer from a dangerous one. You are responsible for the 'brain' you build. Engineering is not just about logic; it's about responsibility.\n\n\`\`\`python\n# Building a sentiment analyzer\n# Problem: Biased training data\ntraining_data = ["I love this!", "Great job!", "Bad."] # Missing neutral or complex cases\n# Result: Model becomes over-optimistic or fails on nuance\n\`\`\`\n\n### Feature Identification\n\nWe will also explore **Feature Identification**. A feature is a specific characteristic that a machine uses to make a prediction. If we're predicting the price of a house, the features might be the number of rooms, the size of the garden, and the location. Learning which features are important is a skill called **Feature Engineering**. Sometimes, having too much data can actually confuse a machine, so we learn how to select only the most 'Signal-rich' information. This focus on quality over quantity is a hallmark of professional AI development.\n\n### The Feedback Loop\n\nFinally, we'll talk about **Ground Truth**. This is the 'Answer Key' we use to tell the machine if its prediction was right or wrong. By comparing its guess to the ground truth, the machine calculates its **Loss** (error) and tweaks its internal math to do better next time. This iterative process of 'Guess, Check, and Correct' is how AI learns to play Chess, drive cars, and diagnose diseases. By the end of this module, you'll be identifying features for your own ML projects, understanding that intelligence isn't magic—it's just well-organized data treated with architectural precision and a strong sense of responsibility.`,
            assignment: "Collect 10 student data points", 
            pocketProject: "Manual prediction exercise", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "In ML, what is 'Raw Data'?", options: ["A finished program", "Unprocessed facts", "A computer virus", "A fast internet"], correctAnswer: 1 },
              { text: "What is 'Information' compared to data?", options: ["Processed data revealing patterns", "Data that has been deleted", "Secret data", "Hardware settings"], correctAnswer: 0 },
              { text: "What does GIGO stand for?", options: ["Great Input Great Output", "Garbage In Garbage Out", "Get In Get Out", "General Intelligence Global Office"], correctAnswer: 1 },
              { text: "Why must ML data be diverse?", options: ["To use more memory", "To avoid biased learning", "To make it colorful", "To hide errors"], correctAnswer: 1 },
              { text: "An 'Answer Key' for training a machine is called:", options: ["The Feature", "Ground Truth", "The Error", "The Result"], correctAnswer: 1 },
              { text: "Which of these is a typical 'Feature' for a car price model?", options: ["The owner's name", "Mileage (distance driven)", "The car's favorite color", "The time of day"], correctAnswer: 1 },
              { text: "Selecting the best data characteristics is called:", options: ["Feature Engineering", "Data Deletion", "System Scaling", "Code Breaking"], correctAnswer: 0 },
              { text: "ML models learn by identifying ____ in data.", options: ["Bugs", "Hidden patterns", "File names", "Users"], correctAnswer: 1 },
              { text: "What is 'Loss' in Machine Learning?", options: ["Losing a game", "The measure of prediction error", "Deleted files", "Slow processing"], correctAnswer: 1 },
              { text: "Machine Learning intelligence is primarily built on...", options: ["Magic", "Hardware speed", "Well-organized data", "Fancy icons"], correctAnswer: 2 }
            ]
          }
        ]
      },
      {
        id: "jss1-t3",
        name: "3rd Term – Algorithms & Simple APIs",
        lessons: [
          { 
            id: 1, 
            title: "Algorithms (Flowcharts & Pseudocode)", 
            topics: ["Logic flows", "Symbols", "Efficiency", "Planning"],
            content: `### Thinking Before Coding\n\nIn the world of high-level engineering, the most important work doesn't happen at the keyboard—it happens in your mind. An **Algorithm** is a step-by-step procedure for solving a problem or accomplishing a task. Whether you are baking a cake, sorting a list of names, or launching a rocket, you are following an algorithm. In this lesson, we learn how to design these logic flows using **Flowcharts** and **Pseudocode**.\n\n### The Grammar of Logic\n\n**Flowcharts** are visual diagrams of an algorithm. We use specific shapes to represent different actions: **Ovals** for start/end, **Rectangles** for processes, and **Diamonds** for decisions (if-statements). This visual language allows you to see the 'skeleton' of your program before you write a single line of code. It helps you identify 'Infinite Loops' or dead ends in your logic before they become expensive bugs.\n\n:::PSEUDOCODE PROTOCOL:::\n**Pseudocode** is the bridge between human language and computer code. It is a way of writing out your logic in plain English but using the structure of a program. For example: "IF temperature is greater than 30, THEN turn on fan." This allows you to focus on the **Logic** without worrying about the specific syntax of Python or JavaScript. Professional architects use pseudocode to share ideas with their teams before implementation begins.\n\n\`\`\`text\n# Algorithm: User Login\nINPUT username, password\nIF username exists in DB AND password matches:\n  PRINT "Access Granted"\n  NAVIGATE to Dashboard\nELSE:\n  PRINT "Error: Invalid Credentials"\n  RETRY login\n\`\`\`\n\n### Engineering Efficiency\n\nWe will also explore **Algorithm Efficiency**. Two programs can solve the same problem, but one might be a thousand times faster than the other. You'll learn how to identify the shortest path to a solution, a skill that is essential for building scalable systems. \n\nBy the end of this module, you'll be building flowcharts for 'Login Systems' and 'Decision-making bots'. You are moving from being a 'Coder' to being a **Problem Solver**. You are learning to see the world as a series of logical steps, a superpower that will allow you to build any system you can imagine. Every great piece of software started as a simple flowchart.`,
            assignment: "Flowchart for a login system", 
            pocketProject: "Algorithm for making decisions", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is an 'Algorithm'?", options: ["A computer part", "A step-by-step procedure to solve a problem", "A type of internet connection", "A screen setting"], correctAnswer: 1 },
              { text: "In a flowchart, what does a Diamond represent?", options: ["A start point", "A process", "A decision (IF statement)", "An output"], correctAnswer: 2 },
              { text: "What is 'Pseudocode'?", options: ["A secret language", "Plain English logic structured like code", "A fake program", "A video game"], correctAnswer: 1 },
              { text: "Why do we use flowcharts before coding?", options: ["To make the code longer", "To visualize logic and prevent errors", "To use more colors", "Because the computer requires it"], correctAnswer: 1 },
              { text: "An Oval in a flowchart represents ____.", options: ["A decision", "Start or End", "A variable", "A loop"], correctAnswer: 1 },
              { text: "What is the bridge between human language and code?", options: ["Keyboard", "Pseudocode", "Monitor", "Mouse"], correctAnswer: 1 },
              { text: "A rectangle in a flowchart represents a ____.", options: ["Decision", "Process or Action", "User input", "Error"], correctAnswer: 1 },
              { text: "Algorithm efficiency is about finding the ____.", options: ["Brightest color", "Fastest/shortest path to a solution", "Longest variable name", "Most files"], correctAnswer: 1 },
              { text: "Which shape represents user input in some flowchart standards?", options: ["Circle", "Parallelogram", "Square", "Star"], correctAnswer: 1 },
              { text: "Great software starts with ____.", options: ["Random typing", "A solid algorithm/plan", "Deleting files", "Buying a new PC"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Functions in Python", 
            topics: ["Reusability", "Parameters", "Return values", "DRY Principle"],
            content: `### The Art of Reusability\n\nImagine if every time you wanted to drive your car, the engineers had to rebuild the engine from scratch. It would be impossible! In programming, we solve this using **Functions**. A function is a reusable block of code that performs a specific task. By wrapping your code in a function, you can 'call' it whenever you need it, avoiding the need to write the same logic over and over again. This is known as the **DRY Principle (Don't Repeat Yourself)**, and it is the foundation of professional software engineering.\n\n### Foundations of Functions\n\nIn Python, we define a function using the \`def\` keyword. A function consists of three main parts: the **Name**, the **Parameters** (inputs), and the **Return Value** (output). Parameters allow you to pass specific data into the function, while the return value sends the result back to the rest of the program. This separation of concerns allows you to build small, predictable modules that you can combine to create complex systems.\n\n:::MODULARITY:::\nModularity is the practice of breaking a big problem into small, manageable pieces. Each function should do **One Thing Well**. For example, one function might calculate a student's average grade, while another function prints the final report. This makes your code easier to read, easier to test, and much easier to fix when something goes wrong.\n\n\`\`\`python\ndef calculate_score(correct, total):\n    percentage = (correct / total) * 100\n    return round(percentage, 2)\n\n# Reusing the logic multiple times\nprint(calculate_score(18, 20)) # 90.0\nprint(calculate_score(15, 20)) # 75.0\n\`\`\`\n\n### Expanding Your Toolkit\n\nWe will also explore **Scope**—the rules that determine where a variable can be seen. You'll learn why variables created inside a function are 'private' to that function, a concept known as **Local Scope**. This prevents different parts of your program from accidentally interfering with each other. \n\nBy the end of this module, you'll be building 'Reusable Math Functions' and a 'Calculator Module'. You are moving from writing 'Scripts' to building **Applications**. You are learning to think in modules, a skill that is essential for every developer, from web designers to AI engineers. Every professional codebase in the world—from Google to Netflix—is built on thousands of well-organized, small functions.`,
            assignment: "Create reusable math functions", 
            pocketProject: "Calculator module", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Function' in Python?", options: ["A type of error", "A reusable block of code for a specific task", "A hardware switch", "A system update"], correctAnswer: 1 },
              { text: "Which keyword is used to define a function?", options: ["function", "def", "create", "start"], correctAnswer: 1 },
              { text: "What does DRY stand for?", options: ["Do Right Yesterday", "Don't Repeat Yourself", "Data Read Yearly", "Direct Response Yield"], correctAnswer: 1 },
              { text: "Data passed INTO a function are called:", options: ["Returns", "Results", "Parameters/Arguments", "Variables"], correctAnswer: 2 },
              { text: "How do you send a result BACK from a function?", options: ["print", "give", "return", "exit"], correctAnswer: 2 },
              { text: "The variable space inside a function is called its ____.", options: ["Global Scope", "Local Scope", "Empty Scope", "Logic Scope"], correctAnswer: 1 },
              { text: "A function should ideally do ____.", options: ["Everything", "One thing well", "Nothing", "Ten things"], correctAnswer: 1 },
              { text: "BREAKING a problem into functions is called ____.", options: ["Multiplication", "Modularity", "Deletion", "Looping"], correctAnswer: 1 },
              { text: "What happens to a function if you don't 'Call' its name?", options: ["It runs anyway", "It never executes", "It causes an error", "It deletes itself"], correctAnswer: 1 },
              { text: "Functions help make code more ____.", options: ["Confusing", "Readable and maintainable", "Slower", "Permanent"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Simple API Concept (Without DB)", 
            topics: ["Endpoints", "JSON structure", "Requests", "Data exchange"],
            content: `### The Web's Conversation\n\nHow does your phone know the weather in another city? How does a game update the high scores of players across the world? They use an **API (Application Programming Interface)**. An API is the 'waiter' in a restaurant—you ask it for information (the request), it goes to the kitchen (the server), and it brings back your food (the data). Web APIs are the foundation of the modern internet, allowing different programs to 'talk' to each other.\n\n### Foundations of Data Exchange\n\nIn this lesson, we explore how data travels across the web using **JSON (JavaScript Object Notation)**. JSON is a lightweight, human-readable format for storing and exchanging data. It looks very similar to a Python Dictionary, with keys and values. Nearly every major service—Spotify, Instagram, YouTube—provides an API that returns JSON data for other developers to use.\n\n:::THE ENDPOINT:::\nAn API **Endpoint** is like a specific address on a server where you can find specific data. For example, \`/weather/lagos\` might give you the current temperature in Lagos. You'll learn how to structure your data into JSON objects, ensuring that any program in the world can understand it.\n\n\`\`\`json\n{\n  "status": "success",\n  "data": {\n    "temperature": 32,\n    "condition": "Sunny",\n    "city": "Lagos"\n  }\n}\n\`\`\`\n\n### Building Mock Services\n\nWe will also build **Mock APIs**. Without needing a complex database, we will design systems that receive requests and send back pre-defined JSON responses. This is a critical skill for **Frontend Developers**, allowing them to build user interfaces before the backend is even finished. \n\nBy the end of this module, you'll be building a 'Mock Weather API Client' and completing a 'JSON structure exercise'. Digital engineering is increasingly about **Integration**—connecting different pieces of software together. By understanding APIs, you are unlocking the power to use the world's most powerful computers and datasets in your own projects. You are becoming a node in the global network of data.`,
            assignment: "JSON structure exercise", 
            pocketProject: "Mock weather API client", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does API stand for?", options: ["Advanced Program Input", "Application Programming Interface", "Automated Policy Integration", "Always Print Information"], correctAnswer: 1 },
              { text: "What is JSON used for?", options: ["Writing graphics", "Exchanging and storing data on the web", "Calculating math", "Deleting files"], correctAnswer: 1 },
              { text: "Which data structure does JSON closely resemble?", options: ["List", "Tuple", "Dictionary", "Set"], correctAnswer: 2 },
              { text: "An address on a server used to find data is called an ____.", options: ["Exit point", "Endpoint", "Start point", "Data point"], correctAnswer: 1 },
              { text: "JSON data is organized into ____ pairs.", options: ["Math-Logic", "Key-Value", "Start-Stop", "User-Name"], correctAnswer: 1 },
              { text: "Why is JSON popular?", options: ["It is colorful", "It is lightweight and human-readable", "It is only for Python", "It is very heavy"], correctAnswer: 1 },
              { text: "An API is like a ____ in a restaurant.", options: ["Chef", "Waiter", "Table", "Menu"], correctAnswer: 1 },
              { text: "Mock APIs are useful for ____.", options: ["Deleting code", "Testing UIs before the backend is ready", "Hacking", "Playing games"], correctAnswer: 1 },
              { text: "Which format is standard for modern web APIs?", options: ["XML", "JSON", "TXT", "BIN"], correctAnswer: 1 },
              { text: "Integration means ____.", options: ["Deleting files", "Connecting different software together", "Writing long code", "Shutting down"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Error Handling & Debugging", 
            topics: ["Exceptions", "Try/Except", "Logic errors", "Debugging tools"],
            content: `### The Reality of Failure\n\nIn professional engineering, writing code is only 40% of the job. The other 60% is **Debugging**. Errors (also known as 'bugs') are not a sign of failure; they are an inevitable part of the process. A senior engineer is not someone who never makes mistakes, but someone who knows exactly how to find and fix them. In this lesson, we master **Error Handling** and **Systematic Debugging**.\n\n### Foundations of Resilience\n\nIn Python, errors that happen during runtime are called **Exceptions**. If your code tries to divide by zero or open a file that doesn't exist, it will 'raise' an exception and crash. To prevent this, we use the **Try/Except** block. This allows us to 'try' a piece of risky code and provide a 'back-up plan' (the except block) if it fails. This is known as **Defensive Programming**, and it is how we build software that is robust and reliable.\n\n:::THE DEBUGGER'S MINDSET:::\nWhen your code fails, don't just guess—be a **Detective**. We will learn how to use **Print Debugging** (printing values at different steps) and **Stack Trace Analysis** (reading the error message to find the exact line of failure). Most errors come from three sources: **Syntax Errors** (grammar mistakes), **Runtime Errors** (logic crashes), and **Semantic Errors** (code runs but does the wrong thing).\n\n\`\`\`python\ntry:\n    age = int(input("Enter your age: "))\n    print(f"In 10 years, you will be {age + 10}")\nexcept ValueError:\n    print("Error: Please enter a valid NUMBER, not text!")\n\`\`\`\n\n### Building Stable Systems\n\nWe will also look at **Logging**—keeping a record of what your program is doing so you can find errors after they happen. You'll learn to anticipate where things might go wrong and build 'safety nets' into your code. \n\nBy the end of this module, you'll be fixing '5 code bugs' and building a 'Defensive programming script'. You are moving from making 'Scripts that work' to 'Systems that survive'. This resilience is what separates a student project from a professional application that millions of people can depend on every day. Errors are opportunities to learn how your system truly works. Embrace the bug!`,
            assignment: "Fix 5 code bugs", 
            pocketProject: "Defensive programming script", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Bug' in programming?", options: ["An insect", "An error in the code", "A hardware part", "A secret feature"], correctAnswer: 1 },
              { text: "Errors that happen during RUNTIME are called:", options: ["Crashes", "Exceptions", "Glitches", "Syntax"], correctAnswer: 1 },
              { text: "Which block is used to catch and handle errors?", options: ["if/else", "try/except", "while/for", "start/stop"], correctAnswer: 1 },
              { text: "What is 'Defensive Programming'?", options: ["Attacking other code", "Writing code to handle potential failures", "Typing behind a shield", "Using a password"], correctAnswer: 1 },
              { text: "A grammar mistake (like missing a colon) is a:", options: ["Runtime Error", "Syntax Error", "Logic Error", "Semantic Error"], correctAnswer: 1 },
              { text: "What is 'Stack Trace'?", options: ["A list of colors", "A report showing where an error happened", "A network tool", "A save file"], correctAnswer: 1 },
              { text: "Using print() to check variable values is called ____.", options: ["Print Debugging", "Visual Coding", "Hacking", "Texting"], correctAnswer: 0 },
              { text: "An error where the code runs but gives the WRONG answer is a:", options: ["Syntax Error", "Logic/Semantic Error", "Hardware Error", "Input Error"], correctAnswer: 1 },
              { text: "Handling errors keeps the program from ____.", options: ["Ending", "Crashing", "Updating", "Scaling"], correctAnswer: 1 },
              { text: "Professional code is defined by its ____.", options: ["Length", "Resilience and error handling", "Color", "Complexity"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "GitHub Basics", 
            topics: ["Version control", "Commits", "Branches", "Repositories"],
            content: `### The Time Machine of Code\n\nIn professional engineering, you never work alone, and you never write code only once. **Version Control** is the cornerstone of modern software development. **Git** (and its online home, **GitHub**) is like a 'Time Machine' for your project. It allows you to save 'snapshots' of your code at every step. If you make a mistake today, you can instantly 'travel back' to yesterday when the code was working perfectly. This is the foundation of **Software Reliability**.\n\n### Foundations of Git\n\nA **Repository** (or 'Repo') is the container for your project. Inside the repo, we make **Commits**. A commit is more than just a save; it's a permanent record of what you changed and why. By writing clear **Commit Messages**, you create a history of your project that other developers can follow. This allows teams of hundreds of engineers to work on the exact same files without losing each other's work.\n\n:::COLLABORATION PROTOCOL:::\nWe will explore **Branching**. A branch is a parallel version of your code where you can test new ideas without breaking the main version. Once your new feature is ready, you 'merge' it back into the main code. This workflow—**The GitHub Flow**—is used by every major tech company in the world. \n\n\`\`\`bash\ngit add .       # Stage changes\ngit commit -m "Added login logic" # Save snapshot\ngit push origin main # Share with the world\n\`\`\`\n\n### The Open Source World\n\nGitHub is also the world's largest social network for developers. You'll learn how to **Clone** (download) other people's projects and how to collaborate using **Pull Requests**. This is how 'Open Source' software like Linux and Android are built—by thousands of people across the globe contributing their skills to a single repository. \n\nBy the end of this module, you'll be performing a 'Clone and branch exercise' and managing a 'Class collaborative repo'. You are joining the global community of engineers. You are no longer just building for yourself; you are building for, and with, the world. Your GitHub profile is your professional portfolio in the digital age.`,
            assignment: "Clone and branch exercise", 
            pocketProject: "Class collaborative repo", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Version Control'?", options: ["Controlling the TV volume", "Tracking and managing changes to code", "A type of internet speed", "Deleting old files"], correctAnswer: 1 },
              { text: "A container for a project is called a ____.", options: ["Box", "Repository (Repo)", "Folder", "Drive"], correctAnswer: 1 },
              { text: "What is a 'Commit'?", options: ["A promise to code later", "A snapshot and record of changes", "An error message", "A hardware key"], correctAnswer: 1 },
              { text: "Git is like a ____ for your code.", options: ["Calculator", "Time Machine", "Printer", "Monitor"], correctAnswer: 1 },
              { text: "What is a 'Branch'?", options: ["A part of a tree", "A parallel version of code for testing", "A type of cable", "A computer error"], correctAnswer: 1 },
              { text: "Combining code from a branch back to the main repo is a ____.", options: ["Split", "Merge", "Break", "Shift"], correctAnswer: 1 },
              { text: "What does 'git push' do?", options: ["Deletes code", "Uploads changes to a remote server like GitHub", "Restarts the PC", "Prints the code"], correctAnswer: 1 },
              { text: "GitHub is primarily for ____.", options: ["Playing games", "Collaborative development and hosting code", "Social media photos", "Watching movies"], correctAnswer: 1 },
              { text: "Git tracks WHO made WHAT change and ____.", options: ["Where", "Why", "When", "All of these"], correctAnswer: 3 },
              { text: "Your GitHub profile is your professional ____.", options: ["Secret", "Passport", "Portfolio", "Game score"], correctAnswer: 2 }
            ]
          },
          { 
            id: 6, 
            title: "Mini ML Project", 
            topics: ["Rule-based systems", "Classification", "Problem framing", "Iteration"],
            content: `### Engineering Intelligence\n\nIn our final lesson of JSS 1, we put everything we've learned together into a **Mini Machine Learning Project**. While advanced ML uses complex neural networks, the foundation of AI is **Problem Framing**—the ability to identify a problem that a machine can solve. In this module, we will build a **Rule-based Classifier**. This is a program that makes intelligent decisions based on a series of nested logical patterns (if/else/functions).\n\n### Foundations of the Project\n\nYou'll start by selecting a challenge. For example: "Can a program identify a fruit based on its weight, skin texture, and color?" or "Can a program detect if a user's password is weak, medium, or strong?" To solve this, you must first act as the **Data Scientist**. You will collect data, identify the most important **Features**, and decide on the **Decision Logic** that the program will use.\n\n:::THE ITERATIVE PROCESS:::\nBuilding AI is not a one-and-done process; it is **Iterative**. You build a simple version, test it with real data, see where it fails, and improve the logic. This loop—**Build, Test, Learn, Refine**—is the secret to creating high-quality software. You'll learn to look at your failures as data that helps you build a stronger system.\n\n\`\`\`python\n# Identifying prime candidates for ML\ndef classifier(features):\n    if features['has_wings'] and features['is_small']:\n        return "Potentially a Bird/Insect"\n    # Adding more complexity through iteration...\n\`\`\`\n\n### Scaling Your Impact\n\nWe will also look at **Problem Scope**. What are the limits of your program? Where would it fail? Identifying the 'Edge Cases' is a hallmark of a senior architect. You are learning that AI is not a magic black box; it is a system of well-designed, documented, and tested logic that you have full control over.\n\nBy the end of this module, you'll be 'Identifying features for ML' and building a 'Rule-based classifier'. Congratulations! You have completed the first year of the FutureLab curriculum. You have moved from a beginner to an apprentice engineer who understands structure (HTML), beauty (CSS), logic (JS), and architecture (Python & Data). You are officially ready for the more advanced challenges of JSS 2 and beyond. The future is yours to build!`,
            assignment: "Identify features for ML", 
            pocketProject: "Rule-based classifier", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Problem Framing' in AI?", options: ["Putting code in a frame", "Identifying a problem a machine can solve", "Deleting a problem", "Buying new software"], correctAnswer: 1 },
              { text: "A 'Rule-based Classifier' uses ____ to make decisions.", options: ["Random guesses", "Nested logic (if/else)", "Magic", "Luck"], correctAnswer: 1 },
              { text: "Iterative development means ____.", options: ["Writing code once", "Building, testing, and refining multiple times", "Deleting code daily", "Only working on weekends"], correctAnswer: 1 },
              { text: "Failure in the testing phase should be used as ____.", options: ["A reason to quit", "Data to improve the logic", "A secret", "A joke"], correctAnswer: 1 },
              { text: "What are 'Edge Cases'?", options: ["The corners of the screen", "Situations that happen at the limit of the logic", "Fast code", "Slow computers"], correctAnswer: 1 },
              { text: "AI is best described as a ____.", options: ["Magic box", "System of well-designed logic", "A hardware part", "A video game"], correctAnswer: 1 },
              { text: "Which is the first step of an ML project?", options: ["Writing code", "Problem framing and data collection", "Deployment", "Publicity"], correctAnswer: 1 },
              { text: "Refining your logic after seeing it fail is called ____.", options: ["Iteration", "Deletion", "Addition", "Subtraction"], correctAnswer: 0 },
              { text: "What is the goal of identifying 'Features'?", options: ["To make code pretty", "To provide the machine with data to make decisions", "To hide information", "To increase file size"], correctAnswer: 1 },
              { text: "Completing this project makes you an ____.", options: ["Absolute Beginner", "Apprentice Engineer", "Hardware Expert", "Hacker"], correctAnswer: 1 }
            ]
          }
        ]
      },
    ]
  },
  {
    id: "jss2",
    name: "JSS 2",
    icon: "🟢",
    color: "blue",
    terms: [
      {
        id: "jss2-t1",
        name: "1st Term – Python Intermediate & Data",
        lessons: [
          { 
            id: 1, 
            title: "Python Advanced (Classes & OOP Basics)", 
            topics: ["Classes", "Objects", "Self keyword", "Constructors"],
            content: `### Blueprint for the Real World\n\nAs you move into intermediate programming, you'll encounter a world-changing concept called **Object-Oriented Programming (OOP)**. Until now, we've written 'procedural' code—steps that happen one after another. But the real world isn't just a list of steps; it's a collection of **Objects**. A car is an object; a student is an object; even a bank account is an object. Each of these have **Properties** (what they are) and **Methods** (what they can do).\n\n### The Architecture of Classes\n\nA **Class** is the blueprint for an object. If a house is an object, the original architectural drawing is the class. In Python, we define a class to specify what data an object should hold and how it should behave. We use the \`__init__\` method (the constructor) to set up a new object when it is 'born'. This allows us to create thousands of unique objects from a single blueprint, each with its own specific data but following the same rules.\n\n\`\`\`python\nclass FutureLeader:\n    def __init__(self, name, passion):\n        self.name = name\n        self.passion = passion\n        self.level = 1\n\n    def introduce(self):\n        return f"I am {self.name}, and I will change the world using {self.passion}!"\n\nstudent1 = FutureLeader("Ayo", "AI Engineering")\nprint(student1.introduce())\n\`\`\`\n\n### The 'Self' Secret\n\nOne of the most important concepts in OOP is the **'self' keyword**. It is how an object refers to its own internal data. Without 'self', the object wouldn't know which name or passion belongs to it specifically. Understanding this internal reference is the key to building complex, scalable systems that mimic real-world interactions. \n\n:::ARCHITECTURAL THINKING:::\nBy mastering OOP, you are learning to think like a **System Architect**. You're no longer just writing scripts; you're building digital universes where objects interact, communicate, and solve problems. This is how major platforms like Instagram, Spotify, and Uber are built. In this lesson, we will build a 'Virtual Pet' class, where each pet has its own hunger level, mood, and name. You'll learn how to 'instantiate' (create) multiple pets and make them interact. This modular way of thinking is the hallmark of a professional developer, allowing for code that is reusable, maintainable, and incredibly powerful. Welcome to the world of objects!`,
            assignment: "Build a Car class", 
            pocketProject: "Virtual pet simulator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does OOP stand for?", options: ["Only One Program", "Object-Oriented Programming", "Open Origin Protocol", "Optional Output Process"], correctAnswer: 1 },
              { text: "What is a 'Class' in Python?", options: ["A group of students", "A blueprint for creating objects", "A type of error", "A computer monitor"], correctAnswer: 1 },
              { text: "Which method is the 'Constructor' in a Python class?", options: ["__start__", "__main__", "__init__", "__create__"], correctAnswer: 2 },
              { text: "What does the 'self' keyword refer to?", options: ["The computer's memory", "The specific instance of the object", "The user's name", "A global variable"], correctAnswer: 1 },
              { text: "A 'Method' is basically a ____ inside a class.", options: ["Variable", "Function", "Loop", "Comment"], correctAnswer: 1 },
              { text: "Creating an object from a class is called:", options: ["Construction", "Instatiation", "Deletion", "Looping"], correctAnswer: 1 },
              { text: "If 'Dog' is the Class, what is 'Bingo' (a specific dog)?", options: ["The Blueprint", "The Object/Instance", "The Method", "The Variable"], correctAnswer: 1 },
              { text: "OOP helps make code more ____.", options: ["Slower", "Confusing", "Reusable/Modular", "Permanent"], correctAnswer: 2 },
              { text: "What are 'Attributes' in a class?", options: ["Calculations performed", "Data/Properties stored", "Errors found", "Hardware keys"], correctAnswer: 1 },
              { text: "Why is OOP useful for large projects?", options: ["It uses more files", "It organizes data into real-world structures", "It is required by the browser", "It makes the code shorter"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Lists, Tuples, Sets", 
            topics: ["Mutability", "Immutability", "Set operations", "Performance"],
            content: `### Beyond the Basics\n\nIn our previous modules, we mastered the **List**—the flexible, ordered collection that can grow and shrink as needed. In this lesson, we explore the wider family of Python collections: **Tuples** and **Sets**. Understanding when to use each of these is the difference between a beginner who writes code that works and a **Performance Engineer** who writes code that is fast and secure.\n\n### The Power of Stability\n\nA **Tuple** is like a list that cannot be changed. This is known as being **Immutable**. Once you create a tuple, you cannot add, remove, or change its items. Why would we want this? Stability! Tuples are perfect for data that should remain constant throughout your program, like the (latitude, longitude) of a city or the (Red, Green, Blue) values of a color. Because they are immutable, tuples are faster and use less memory than lists.\n\n\`\`\`python\ncoordinates = (6.5244, 3.3792) # Lagos, Nigeria\n# coordinates[0] = 7.0 # This would cause an ERROR!\n\`\`\`\n\n### Distinct Collections\n\nA **Set** is an unordered collection of **Unique** items. Sets are incredible for tasks where duplicates are not allowed, like a list of users currently online or a collection of tags for a blog post. Sets also allow for powerful mathematical **Set Operations** like **Union** (combining two sets) and **Intersection** (finding items common to both). This allows you to perform complex data filtering in just one line of code.\n\n:::EFFICIENCY TIP:::\nChecking if an item exists 'in' a Set is much faster than checking a List. While a list has to check every item one by one, a set uses a 'Hash Table' to find the answer instantly. This is a critical lesson in **Computational Complexity**.\n\nBy the end of this module, you'll be able to choose the perfect container for any data problem. You'll learn to use Tuples for security, Lists for flexibility, and Sets for uniqueness and speed. Mastering these data structures is the foundation of becoming a data scientist or high-level software architect. Every choice you make in data storage impacts the speed and reliability of your final system. Use your tools wisely!`,
            assignment: "Performance comparison", 
            pocketProject: "Unique name generator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the main difference between a List and a Tuple?", options: ["Size", "Color", "Mutability (can it change?)", "Language"], correctAnswer: 2 },
              { text: "Which symbol defines a Tuple?", options: ["[]", "()", "{}", "<>"], correctAnswer: 1 },
              { text: "What does 'Immutable' mean?", options: ["Can be changed", "Cannot be changed", "Invisible", "Fast"], correctAnswer: 1 },
              { text: "What is unique about a 'Set'?", options: ["It has no name", "It only stores unique items", "It is always blue", "It uses more memory"], correctAnswer: 1 },
              { text: "Which symbol defines a Set?", options: ["[]", "()", "{}", "<>"], correctAnswer: 2 },
              { text: "Finding common items in two sets is called:", options: ["Union", "Intersection", "Difference", "Addition"], correctAnswer: 1 },
              { text: "Which collection is fastest for checking if an item exists?", options: ["List", "Tuple", "Set", "String"], correctAnswer: 2 },
              { text: "Tuples are best for data that:", options: ["Changes often", "Should stay constant", "Is sorted alphabetically", "Is very long"], correctAnswer: 1 },
              { text: "Combining two sets into one is called:", options: ["Union", "Intersection", "Subtraction", "Division"], correctAnswer: 0 },
              { text: "In terms of memory efficiency, which is usually better for static data?", options: ["List", "Tuple", "Array", "Dictionary"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Dictionaries", 
            topics: ["Key-Value pairs", "Mapping", "Lookups", "Dictionary methods"],
            content: `### The Power of Mapping\n\nIn our journey through data structures, we've mastered the **List** (ordered collections) and the **Set** (unique collections). Today, we unlock the most versatile and powerful structure in Python: the **Dictionary**. While a list uses numbers (indexes) to find items, a dictionary uses **Keys**. Imagine a real dictionary where you look up a word (the Key) to find its definition (the Value). This is why dictionaries are also known as **Mapping** structures—they map keys to values with incredible speed.\n\n### Foundations of Keys\n\nDictionaries are defined using curly braces: \`student = {"name": "Ayo", "passion": "AI"}\`. In this example, "name" is the key, and "Ayo" is the value. The most important rule of dictionaries is that **Keys must be unique**. You can't have two definitions for the same key in a single dictionary. This uniqueness allows Python to find any value instantly, no matter how large the dictionary grows. Whether you have 10 users or 10 million, looking up a user by their ID takes the same amount of time. This is known as **O(1) Time Complexity**, and it's a hallmark of efficient engineering.\n\n\`\`\`python\ncapitals = {"Nigeria": "Abuja", "Ghana": "Accra", "Kenya": "Nairobi"}\nprint(f"The capital of Ghana is {capitals['Ghana']}")\n\n# Adding new data\ncapitals["Egypt"] = "Cairo"\n\`\`\`\n\n### Nesting and Scaling\n\nDictionaries become truly powerful when we **Nest** them. You can have a dictionary of lists, or even a dictionary containing other dictionaries. This is exactly how complex data is organized in the real world—from the user profile of a social media app to the product catalog of an e-commerce giant. Understanding how to navigate these nested structures is a critical skill for any **Full-Stack Developer**.\n\n:::ENGINEERING PROTOCOL:::\nWe will explore **Dictionary Methods** like \`.keys()\`, \`.values()\`, and \`.items()\`, which allow you to loop through and manipulate your data with precision. You'll learn how to safely retrieve data using \`.get()\`, which prevents your program from crashing if a key is missing. By the end of this lesson, you'll be building a 'Translator App' and a 'City Population Map', proving that you can organize complex, real-world information with the skill of a senior data architect. Dictionaries are the heart of Data Engineering, and once you master them, the way you think about information will change forever.`,
            assignment: "Map city populations", 
            pocketProject: "Translator app", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the primary way to find data in a Dictionary?", options: ["By its position", "By its Key", "By its color", "By its size"], correctAnswer: 1 },
              { text: "Which symbol defines a Dictionary?", options: ["[]", "()", "{}", "<>"], correctAnswer: 2 },
              { text: "In the pair 'name': 'Ayo', what is 'name'?", options: ["The Value", "The Method", "The Key", "The Loop"], correctAnswer: 2 },
              { text: "Can a Dictionary have two identical keys?", options: ["Yes", "No", "Only if they are numbers", "Only in JSS 3"], correctAnswer: 1 },
              { text: "What happens if you use a key that doesn't exist?", options: ["Nothing", "The program crashes with a KeyError", "It creates a new key", "It prints a warning"], correctAnswer: 1 },
              { text: "Which method safely gets a value without crashing?", options: ["find()", "search()", "get()", "fetch()"], correctAnswer: 2 },
              { text: "What does .keys() return?", options: ["All values", "All keys", "All pairs", "Nothing"], correctAnswer: 1 },
              { text: "Dictionaries are also known as ____.", options: ["Strings", "Mappings", "Arrays", "Functions"], correctAnswer: 1 },
              { text: "Which is faster for looking up specific data?", options: ["Searching a large List", "Looking up a Key in a Dictionary", "Reading a file", "Printing the data"], correctAnswer: 1 },
              { text: "A Dictionary inside another Dictionary is called ____.", options: ["Double Dictionary", "Nested Dictionary", "Hidden Dictionary", "Super Dictionary"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "File Handling", 
            topics: ["Reading files", "Writing files", "Context managers", "CSV handling"],
            content: `### From Memory to Disk\n\nUntil now, every program we've written has 'forgotten' everything as soon as it finished running. The variables we created existed only in the computer's **RAM (Random Access Memory)**. But what happens when we want to save a high score, store a user's profile, or analyze a massive database of student records? We need **Persistence**. In this lesson, we learn **File Handling**—the art of saving data to and reading data from the computer's hard drive.\n\n### The Open-Process-Close Cycle\n\nInteracting with a file follows a strict protocol: **Open**, **Read/Write**, and **Close**. In Python, we use the \`open()\` function to create a connection to a file. We also specify a **Mode**: 'r' for reading, 'w' for writing (which overwrites the file), and 'a' for appending (adding to the end). It is critical to always close your files to save memory and prevent data corruption.\n\n:::ENGINEERING BEST PRACTICE:::\nInstead of manually opening and closing, professional Python developers use the **'with' statement** (also known as a Context Manager). This automatically closes the file for you, even if an error occurs. It is the safest and cleanest way to handle data persistence.\n\n\`\`\`python\nwith open("mission_log.txt", "w") as file:\n    file.write("Mission Successful: JSS 2 Level unlocked.\\n")\n    file.write("Pilot: Future Engineer.\\n")\n\n# Reading it back\nwith open("mission_log.txt", "r") as file:\n    print(file.read())\n\`\`\`\n\n### Structured Data: CSV\n\nWe will also look at **CSV (Comma Separated Values)** files. These are the standard for data science and business. You'll learn how to use Python's \`csv\` module to parse rows of data and transform them into Dictionaries. This allows you to build programs that can 'talk' to Excel and other data tools.\n\nBy the end of this module, you'll be building a 'Log Parser' and a 'Text Diary'. You are graduating from writing simple scripts to building **Data Systems** that can remember the past and prepare for the future. Every major company—from Amazon to NASA—relies on efficient file handling to manage their vast amounts of information. You are now mastering the bridge between temporary logic and permanent knowledge.`,
            assignment: "Log file parser", 
            pocketProject: "Text diary program", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Persistence' in programming?", options: ["Running a loop forever", "Saving data so it isn't lost when the program ends", "Typing fast", "Fixing bugs"], correctAnswer: 1 },
              { text: "Which mode is used to READ a file?", options: ["'w'", "'r'", "'a'", "'x'"], correctAnswer: 1 },
              { text: "What does 'append' mode ('a') do?", options: ["Deletes the file", "Adds data to the end of the file", "Overwrites the file", "Reads the middle of the file"], correctAnswer: 1 },
              { text: "Which statement is the SAFEST way to open a file?", options: ["open()", "with open()", "file.start()", "connect()"], correctAnswer: 1 },
              { text: "Why must we 'close' a file?", options: ["To make it private", "To free up system resources", "To change its name", "To delete the code"], correctAnswer: 1 },
              { text: "What does CSV stand for?", options: ["Computer System Version", "Comma Separated Values", "Code Script Variable", "Central Storage Vault"], correctAnswer: 1 },
              { text: "The harder drive is' ____ storage.", options: ["Temporary", "Permanent/Persistent", "Invisible", "Logic"], correctAnswer: 1 },
              { text: "Which mode overwrites existing content?", options: ["'r'", "'a'", "'w'", "'fetch'"], correctAnswer: 2 },
              { text: "RAM is ____ memory.", options: ["Persistent", "Volatile/Temporary", "Mechanical", "Binary"], correctAnswer: 1 },
              { text: "To save a new user's name to a file, you should use:", options: ["file.read()", "file.write()", "file.print()", "file.save()"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Intro to Data Cleaning", 
            topics: ["Missing data", "Duplicates", "Dtypes", "Normalization"],
            content: `### The Craft of Quality\n\nIn the world of professional engineering and Data Science, there is a secret truth: **80% of the work is Data Cleaning**. No matter how powerful your AI model is, if you feed it messy, inaccurate, or incomplete data, it will produce 'Garbage' results (GIGO). Data Cleaning is the meticulous process of fixing or removing 'dirty' data from a dataset. This includes handling missing values, deleting duplicates, and ensuring all information is in the correct format.\n\n### Foundations of Clean Data\n\nData comes from many sources—sensors, user input, old databases—and it is almost always messy. In this lesson, we explore the most common 'Data Sins'. First are **Duplicate Records**: when the same piece of info appears twice, it biases your analysis. Second is **Missing Data**: what do you do when a student forgot to enter their grade? You'll learn techniques like **Imputation** (filling in the blanks) or **Removal** (deleting incomplete rows).\n\n:::DATA INTEGRITY:::\nMaintaining High **Data Integrity** means ensuring your data is accurate and consistent. For example, ensuring that a 'Birth Date' field actually contains dates, not names. You'll learn how to use Python to check for these errors automatically, saving hours of manual proofreading.\n\n\`\`\`python\n# Identifying missing values in a list\ngrades = [85, None, 90, 75, None]\n# Cleaning: Filling None with the average\nclean_grades = [g if g is not None else 80 for g in grades]\nprint(f"Cleaned Grades: {clean_grades}")\n\`\`\`\n\n### Normalization and Formatting\n\nWe will also look at **Normalization**. This is the process of making different types of data comparable. Is "Lagos" the same as "lagos" or " LAGOS "? To a computer, no! You'll learn how to use **String Methods** to standardize your data so it can be analyzed correctly. \n\nBy the end of this module, you'll be building an 'Auto-Formatter' and a 'Duplicate Remover'. You are moving beyond just 'using' data and starting to **Control** it. Cleaning data isn't just a chore; it is an act of engineering excellence that ensures the systems you build are trustworthy, reliable, and scientifically sound. Every great AI started as a clean dataset.`,
            assignment: "Remove duplicates from CSV", 
            pocketProject: "Basic data formatter", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What percentage of data work is usually 'Cleaning'?", options: ["5%", "20%", "50%", "80%"], correctAnswer: 3 },
              { text: "What happens if you use 'dirty' data for AI?", options: ["It works faster", "It produces inaccurate/garbage results", "It fixies itself", "Nothing"], correctAnswer: 1 },
              { text: "Filling in missing values with an average is called:", options: ["Deletion", "Imputation", "Multiplication", "Hiding"], correctAnswer: 1 },
              { text: "Data that is consistent and accurate has high ____.", options: ["Speed", "Integrity", "Color", "Length"], correctAnswer: 1 },
              { text: "Standardizing 'LAGOS' and 'lagos' is part of:", options: ["Deletion", "Normalization", "Looping", "Math"], correctAnswer: 1 },
              { text: "What is a 'Duplicate'?", options: ["A file that is too large", "An identical record appearing twice", "A missing number", "A type of variable"], correctAnswer: 1 },
              { text: "Data cleaning is mostly about ____.", options: ["Making data look pretty", "Ensuring data accuracy and usability", "Deleting all data", "Writing long code"], correctAnswer: 1 },
              { text: "A value like 'None' or 'NaN' represents:", options: ["A secret number", "Missing data", "The end of a file", "A success message"], correctAnswer: 1 },
              { text: "Which Python tool is best for cleaning large amounts of data?", options: ["print()", "Loops and Conditionals", "The mouse", "The monitor"], correctAnswer: 1 },
              { text: "Cleaning data before analysis is ____.", options: ["Optional", "Mandatory for professional work", "Only for JSS 1 students", "Impossible"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "Machine Learning (Pattern Recognition Basics)", 
            topics: ["Patterns vs Rules", "Training sets", "Test sets", "Classification"],
            content: `### The Science of Seeing\n\nIn intermediate Machine Learning, we move from just 'handling' data to **Pattern Recognition**. This is the core ability of AI: the power to look at a thousand examples and discover the underlying rules that connect them. While traditional programming is about writing 'Rules' (if X then Y), Machine Learning is about the machine **Discovering its own Rules** by analyzing patterns in a **Training Set**.\n\n### Foundations of Patterns\n\nImagine teaching a computer to recognize a handwritten letter 'A'. You could try to write a rule for every possible stroke, but you would fail—everyone writes differently! Instead, you provide ten thousand 'A's and tell the machine: "These are A's. Find the pattern." The machine then builds a mathematical model based on the common characteristics (features) it sees across all those examples.\n\n:::THE SPLIT:::\nTo ensure our machine has actually 'learned' and isn't just 'memorizing', we use a **Train/Test Split**. We use 80% of our data to train the model, and we hide the other 20% to **Test** it. If the machine can accurately recognize patterns in data it has never seen before, we know it has truly learned. This is known as **Generalization**.\n\n\`\`\`python\n# Logic of a simple classifier\ndef recognize_shape(sides):\n    if sides === 3: return "Triangle"\n    if sides === 4: return "Square/Rectangle"\n    return "Unknown Pattern"\n\n# ML would discover these rules by looking at images!\n\`\`\`\n\n### Classification Basics\n\nWe will also explore **Classification**—the process of putting data into 'Buckets'. Is this email Spam or Not Spam? Is this image a healthy leaf or a sick one? You'll learn how to identify the 'Decision Boundary'— the line that clear separates one group from another. \n\nBy the end of this module, you'll have built a 'Simple Shape Classifier' and completed a 'Pattern identification' exercise. You are no longer just a coder; you are a **Machine Learning Apprentice**. You are learning how to build systems that can interpret the world around them, making sense of chaos by finding the patterns that hide within the data. This is the first step toward building the intelligent assistants, self-driving cars, and diagnostic tools of tomorrow.`,
            assignment: "Visual pattern identification", 
            pocketProject: "Simple shape classifier", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Pattern Recognition'?", options: ["Solving a math problem", "The ability to find regularities in data", "Typing code without errors", "Deleting data"], correctAnswer: 1 },
              { text: "In ML, the data used to teach the model is the ____.", options: ["Logic Set", "Training Set", "Hidden Set", "Error Set"], correctAnswer: 1 },
              { text: "What is a 'Train/Test Split' used for?", options: ["To make the program longer", "To verify if the model truly learned", "To hide data from the user", "To delete errors"], correctAnswer: 1 },
              { text: "A machine that performs well on NEW data is said to have:", options: ["Memorized", "Generalized", "Failed", "Restarted"], correctAnswer: 1 },
              { text: "Putting data into groups like 'Spam' or 'Not Spam' is:", options: ["Addition", "Classification", "Subtraction", "Formatting"], correctAnswer: 1 },
              { text: "The line that separates two data groups is the ____.", options: ["Finish line", "Decision Boundary", "Error margin", "Code block"], correctAnswer: 1 },
              { text: "ML models discover their own ____ by looking at data.", options: ["File names", "Mathematical rules", "Internet links", "User names"], correctAnswer: 1 },
              { text: "Which split is most common for Training/Testing?", options: ["10/90", "50/50", "80/20", "100/0"], correctAnswer: 2 },
              { text: "Machine Learning is different from traditional coding because...", options: ["It uses less math", "The machine discovers the rules", "It is only for games", "It doesn't use data"], correctAnswer: 1 },
              { text: "Pattern Recognition is the core of ____.", options: ["Database design", "Artificial Intelligence", "Hardware manufacturing", "Social media"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "jss2-t2",
        name: "2nd Term – Data & Visualization",
        lessons: [
          { 
            id: 1, 
            title: "Introduction to Numpy", 
            topics: ["Numerical Python", "Arrays vs Lists", "Shape/Dimensions", "Vectorization"],
            content: `### The Engine of Science\n\nWelcome to the foundation of Numerical Engineering. While Python is a beautiful language, its standard lists can be slow when handling millions of numbers. To build AI, simulate galaxies, or analyze global financial markets, we need speed. This is where **NumPy** (Numerical Python) comes in. It is the core library that powers almost all scientific computing and Machine Learning in the world. \n\n### The Power of the Array\n\nThe most important concept in NumPy is the **ndarray** (n-dimensional array). At first glance, it looks like a Python List, but under the hood, it is drastically different. While a list can hold any type of data (strings, integers, floats) and is scattered across your computer's memory, a NumPy array holds only one type and is stored in a single, contiguous block. This allows the computer's CPU to process the data up to 100 times faster than a standard list.\n\n\`\`\`python\nimport numpy as np\n\n# Creating a 2D Array (a Matrix)\ngrades = np.array([[85, 90, 78], [92, 88, 95]])\nprint(f"Shape: {grades.shape}") # Prints (2, 3)\nprint(f"Dimensions: {grades.ndim}")\n\`\`\`\n\n### Vectorization: Coding at Scale\n\nIn standard Python, if you want to add 10 to every number in a list, you have to write a 'for loop'. In NumPy, we use **Vectorization**. You can simply write \`grades + 10\`, and NumPy performs the math on every single element simultaneously. This isn't just shorter code; it's a fundamental shift in how we process information. It allows us to perform 'Massive Parallelism', treating large datasets as single mathematical entities.\n\n:::NUMERICAL PROTOCOL:::\nWe will explore **Broadcasting**, a powerful rule that allows NumPy to perform math between arrays of different shapes. You'll learn how to 'Slice' higher-dimensional data, extracting specific rows or columns of a matrix with a single command. By the end of this lesson, you'll be building an 'Image Pixel Manipulator', treating a digital photo as a matrix of numbers and changing its colors using raw math. You are no longer just a coder; you are a **Computational Engineer**, mastering the tools that drive modern technology from NASA to Google.`,
            assignment: "Matrix operations", 
            pocketProject: "Image pixel manipulator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does NumPy stand for?", options: ["Number Python", "Numerical Python", "New Python", "Network Python"], correctAnswer: 1 },
              { text: "What is the primary data structure in NumPy?", options: ["List", "Dictionary", "ndArray", "Tuple"], correctAnswer: 2 },
              { text: "Why is a NumPy array faster than a Python list?", options: ["It uses colors", "It stores data in a contiguous memory block", "It is shorter", "It is always 1D"], correctAnswer: 1 },
              { text: "The term for performing math on entire arrays without loops is:", options: ["Looping", "Vectorization", "Printing", "Subtraction"], correctAnswer: 1 },
              { text: "What does the .shape attribute tell you?", options: ["The color of the array", "The size and dimensions of the array", "The memory used", "The file name"], correctAnswer: 1 },
              { text: "Broadcasting allows math between arrays of ____.", options: ["The same name", "Different shapes", "Only integers", "Only 1D"], correctAnswer: 1 },
              { text: "A 2D array is also known as a ____.", options: ["Vector", "Matrix", "Scalar", "Volume"], correctAnswer: 1 },
              { text: "Which keyword is usually used to import NumPy?", options: ["import numpy as ny", "import numpy as np", "use numpy", "include numpy"], correctAnswer: 1 },
              { text: "How do you check the number of dimensions of an array?", options: [".ndim", ".size", ".len", ".dim"], correctAnswer: 0 },
              { text: "NumPy is essential for ____.", options: ["Web layout", "Machine Learning and Scientific Computing", "Sending emails", "Typing text"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Introduction to Pandas", 
            topics: ["DataFrames", "Series", "CSV Loading", "Slicing/Filtering"],
            content: `### The Librarian of Big Data\n\nIf NumPy is the 'Engine', then **Pandas** is the 'Cockpit'. In the world of Data Science, Pandas is the most important tool for organizing, analyzing, and cleaning information. While NumPy handles raw numbers, Pandas is designed to handle 'Tabular Data'—information structured in rows and columns, just like an Excel spreadsheet or a SQL database. It allows you to turn messy files into structured, searchable libraries.\n\n### The DataFrame Revolution\n\nThe heart of Pandas is the **DataFrame**. A DataFrame is a 2D table where every column has a name (like 'Student Name') and every row has an index. This structure allows you to perform complex questions (queries) instantly. Instead of writing 50 lines of code to find all students who scored above 90, you can do it in one: \`df[df['Score'] > 90]\`. This is 'Declarative' programming—you tell the computer **What** you want, not **How** to find it.\n\n\`\`\`python\nimport pandas as pd\n\n# Loading a real database\ndf = pd.read_csv("school_data.csv")\n\n# Inspecting the top of the data\nprint(df.head())\n\n# Selecting just one column (a Series)\nnames = df["Student Name"]\n\`\`\`\n\n### Navigating the Columns\n\nWe will explore the **Series**, which is a single column of data. You'll learn how to use \`.iloc\` and \`.loc\` to 'Slice' your data, extracting specific sections of your database with surgical precision. You'll also learn how to calculate **Descriptive Statistics** (Mean, Median, Mode) for an entire column with a single command (\`.describe()\`). \n\n:::DATA STRATEGY:::\nPandas is unique because it handles 'Missing Data' automatically. You'll learn how to identify where information is missing and how to 'Fill' those gaps so your analysis remains accurate. By the end of this lesson, you'll be building a 'School Database Filter', loading a real file and extracting insights that would take hours to find manually. You are graduating from 'Programming' to **Data Exploration**, developing the skills needed to find the 'Signal' in the 'Noise' of the modern information age.`,
            assignment: "Load school database", 
            pocketProject: "Students list filtered", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the primary table structure in Pandas?", options: ["Matrix", "DataFrame", "ndArray", "ExcelSheet"], correctAnswer: 1 },
              { text: "Which library is usually imported alongside Pandas?", options: ["Math", "NumPy", "Time", "Random"], correctAnswer: 1 },
              { text: "What is a single column in Pandas called?", options: ["List", "Series", "Row", "Segment"], correctAnswer: 1 },
              { text: "Which function loads a CSV file in Pandas?", options: ["open_csv()", "load_csv()", "read_csv()", "fetch_csv()"], correctAnswer: 2 },
              { text: "What does the .head() method do?", options: ["Deletes the first row", "Prints the first few rows of data", "Counts the total rows", "Sorts the data"], correctAnswer: 1 },
              { text: "Finding data by its coordinate using numbers is done with:", options: [".loc", ".iloc", ".find", ".get"], correctAnswer: 1 },
              { text: "Which method gives a quick statistical summary?", options: [".sum()", ".describe()", ".info()", ".math()"], correctAnswer: 1 },
              { text: "Standard import for Pandas is:", options: ["import pandas as p", "import pandas as pd", "use pandas", "import pd"], correctAnswer: 1 },
              { text: "Pandas is best suited for handling ____ data.", options: ["3D Graphics", "Tabular (Rows/Columns)", "Audio", "Binary"], correctAnswer: 1 },
              { text: "How do you filter students with a score > 50?", options: ["df['score'] > 50", "df[df['score'] > 50]", "find(score > 50)", "df.filter(50)"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Data Cleaning", 
            topics: ["Dropping NaNs", "Filling NaNs", "Dtypes", "Duplicate deletion"],
            content: `### The Craft of Clarity\n\nIn our introduction to strings and lists, we touched on 'Dirty Data'. Now, with the power of Pandas, we dive deep into the professional art of **Data Cleaning**. In the real world, data is rarely perfect. Files are missing values, names are misspelled, and sensors fail. As a Data Engineer, your job is to transform this 'Mess' into 'Truth'. Without clean data, the most advanced AI in the world is useless.\n\n### Handling the 'None'\n\nIn Pandas, missing values are represented as **NaN** (Not a Number). You have two primary strategies for handling them: **Dropping** or **Filling**. Dropping (\`.dropna()\`) removes the incomplete row entirely—this is best if only a tiny fraction of your data is missing. Filling (\`.fillna()\`) is more sophisticated; you replace the missing value with something sensible, like the 'Average' of the column or the value 'Unknown'. Choosing the right strategy is a critical engineering decision.\n\n\`\`\`python\n# Loading messy data\ndf = pd.read_csv("raw_sensor_data.csv")\n\n# Removing rows where the ID is missing\nclean_df = df.dropna(subset=["Sensor_ID"])\n\n# Filling missing temperatures with the average\navg_temp = df["Temp"].mean()\ndf["Temp"] = df["Temp"].fillna(avg_temp)\n\`\`\`\n\n### Data Type Integrity\n\nWe will also explore **Dtypes**. Sometimes, a computer reads a number like "90" as text (a string). You can't perform math on text! You'll learn how to 'Cast' your data into the correct types using \`.astype()\`, ensuring your columns are ready for analysis. We will also master **Duplicate Deletion**, identifying and removing repeated records that would bias our results.\n\n:::ENGINEERING AUDIT:::\nCleaning is not a one-time step; it is an **Auditing** process. You'll learn how to verify your results using \`.isnull().sum()\` to prove that every gap has been filled. By the end of this lesson, you'll be building an 'Auto-Cleaner Tool', a script that takes any messy file and automatically prepares it for a deep-dive analysis. You are becoming a guardian of **Data Quality**, ensuring that the systems you build are defined by accuracy and trust. Every great insight starts with a clean dataset.`,
            assignment: "Handle missing values", 
            pocketProject: "Auto-cleaner tool", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does 'NaN' stand for in Pandas?", options: ["New and Nice", "Not a Number", "Now and Next", "Name and Number"], correctAnswer: 1 },
              { text: "Which method removes all rows with missing values?", options: [".remove()", ".delete()", ".dropna()", ".clean()"], correctAnswer: 2 },
              { text: "Replacing missing data with the average is part of ____.", options: ["Deletion", "Imputation/Filling", "Subtraction", "Sorting"], correctAnswer: 1 },
              { text: "Which method fills missing values with a specific number?", options: [".fillna()", ".put()", ".insert()", ".add()"], correctAnswer: 0 },
              { text: "To check how many values are missing per column, use:", options: [".count()", ".isnull().sum()", ".check()", ".info()"], correctAnswer: 1 },
              { text: "Changing a string to an integer is called ____.", options: ["Loading", "Casting/Type Conversion", "Printing", "Merging"], correctAnswer: 1 },
              { text: "Which Pandas method removes identical rows?", options: [".drop_duplicates()", ".unique()", ".remove_double()", ".cut()"], correctAnswer: 0 },
              { text: "Why is 'Data Type' important?", options: ["It changes the color", "It determines what math/operations are possible", "It makes the file smaller", "It is optional"], correctAnswer: 1 },
              { text: "The first step in a data science project is usually ____.", options: ["Deployment", "Data Cleaning", "Marketing", "Buying a mouse"], correctAnswer: 1 },
              { text: "Cleaning ensures data ____.", options: ["Speed", "Integrity and Accuracy", "Length", "Privacy"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Data Processing", 
            topics: ["Normalization", "Scaling", "Feature Engineering", "Categorical Encoding"],
            content: `### The Alchemy of Data\n\nIn our previous lesson, we learned how to 'Clean' data. Today, we learn how to **Process** it. Data Processing is the stage where we transform 'Usable' data into 'High-Performance' data. Imagine you are building an AI to predict exam scores. You have one column for Age (10 to 18) and another for SAT scores (400 to 1600). Because 1600 is so much larger than 18, the computer might think the SAT score is 'more important'. To fix this, we use **Normalization** and **Scaling**.\n\n### Scaling the Mountains\n\n**Scaling** to the process of putting all your numbers into the same range, usually between 0 and 1. This ensures that every 'Feature' (column) in your dataset has an equal voice in the final decision. You'll learn the 'Min-Max' formula, a simple set of math steps that levels the playing field for your data. We will also explore **Standardization**, which centers your data around zero, a technique used by major scientific research teams.\n\n\`\`\`python\nimport pandas as pd\n\n# A simple Min-Max scaling logic\ndef min_max_scale(column):\n    return (column - column.min()) / (column.max() - column.min())\n\n# Applying it to our data\ndf["Scaled_Score"] = min_max_scale(df["Score"])\n\`\`\`\n\n### Feature Engineering\n\nWe will also look at **Feature Engineering**—the art of creating NEW data from existing columns. For example, if you have 'Date of Birth', you can create a new 'Age' column. If you have 'Exam 1' and 'Exam 2', you can create a 'Progress Improvement' column. This creativity is what separates a good data scientist from a great one. You are learning to see the 'Hidden Information' that exists between the rows.\n\n:::DATA TRANSFORMATION:::\nYou'll also learn about **Categorical Encoding**. Computers can't do math on the word "Red" or "Blue". You'll learn how to turn these labels into numbers so the machine can process them. By the end of this module, you'll be building a 'Data Scaler', a tool that automatically prepares complex datasets for Machine Learning. You are moving beyond just 'reading' files and starting to **Engineer** them for maximum intelligence and impact.`,
            assignment: "Normalize data values", 
            pocketProject: "Data scaler", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is Normalization?", options: ["Deleting data", "Adjusting values to a common scale (e.g., 0 to 1)", "Printing data", "Sorting alphabetically"], correctAnswer: 1 },
              { text: "Why do we scale data for AI?", options: ["To make the file smaller", "To give every feature an equal 'voice' in the logic", "To change the text color", "Because it is required by the keyboard"], correctAnswer: 1 },
              { text: "Min-Max scaling usually puts data between which range?", options: ["-100 to 100", "0 to 1", "10 to 20", "0 to 1000"], correctAnswer: 1 },
              { text: "Creating a NEW column from existing data is called ____.", options: ["Data Deletion", "Feature Engineering", "Hardware Repair", "Web Design"], correctAnswer: 1 },
              { text: "Standardization centers data around which number?", options: ["100", "0", "1", "10"], correctAnswer: 1 },
              { text: "How does a computer process 'Red' vs 'Blue' for math?", options: ["Through Categorical Encoding/Numbers", "It just understands the words", "It skips the words", "It shows an error"], correctAnswer: 0 },
              { text: "What is a 'Feature' in a dataset?", options: ["A bug", "A column/Attribute", "A row", "A file name"], correctAnswer: 1 },
              { text: "Subtracting the minimum and dividing by the range is ____ scaling.", options: ["Max-Only", "Min-Max", "Circular", "Inverse"], correctAnswer: 1 },
              { text: "Highly skewed data often needs ____.", options: ["Deletion", "Transformation/Scaling", "No changes", "Printing"], correctAnswer: 1 },
              { text: "Data Processing is the bridge to ____.", options: ["Web Design", "Effective Machine Learning", "Microsoft Word", "Hardware Gaming"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Matplotlib (Visualization)", 
            topics: ["Line plots", "Bar charts", "Scatter plots", "Customization"],
            content: `### The Art of Insight\n\nA picture is worth a thousand rows of data. In this lesson, we master **Matplotlib**, the industry-standard library for creating charts and graphs in Python. While a database of a million student records is hard to read, a single chart can instantly show us if grades are improving or falling. This is **Data Visualization**—the art of turning numbers into knowledge.\n\n### The Visual Vocabulary\n\nWe will explore the three most important charts in an engineer's toolkit. First, the **Line Plot**: perfect for showing trends over time, like the growth of a plant or the price of a stock. Second, the **Bar Chart**: ideal for comparing different categories, like the number of students in each grade. Third, the **Scatter Plot**: the secret weapon of data scientists, used to find relationships (correlations) between two numbers (like 'Hours Studied' vs 'Exam Score').\n\n\`\`\`python\nimport matplotlib.pyplot as plt\n\n# Plotting student progress\ndays = [1, 2, 3, 4, 5]\nscores = [10, 25, 45, 80, 95]\n\nplt.plot(days, scores, marker='o', color='green')\nplt.title("Student Skill Growth")\nplt.xlabel("Days of Practice")\nplt.ylabel("Confidence Level")\nplt.show()\n\`\`\`\n\n### Design for Discovery\n\nWe will learn not just 'how' to plot, but 'why' to plot. You'll explore how to customize your charts with accurate labels, legends, and vibrant colors. You'll learn how to use **Subplots** to show multiple charts on the same screen, allowing you to tell a complex story with your data. \n\n:::PRESENTATION PROTOCOL:::\nProfessional engineers must be able to explain their findings to non-engineers. A clear, well-labeled chart is your most powerful communication tool. By the end of this lesson, you'll be building an 'Animated Sales Chart' and plotting 'Grade Distributions'. You are moving from 'Calculating' results to **Communicating** them. You are learning to make data 'speak', unlocking insights that were hidden in the spreadsheets. The world's most powerful decisions—from fighting climate change to launching new apps—are all driven by the clear, visual stories that you are now learning to build.`,
            assignment: "Plot grade distribution", 
            pocketProject: "Animated sales chart", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the standard library for plotting in Python?", options: ["NumPy", "Matplotlib", "Pandas", "Time"], correctAnswer: 1 },
              { text: "Which chart is best for showing 'Trends Over Time'?", options: ["Bar Chart", "Line Plot", "Pie Chart", "Histogram"], correctAnswer: 1 },
              { text: "Which chart is best for finding 'Relationships between two numbers'?", options: ["Scatter Plot", "Bar Chart", "Vertical Line", "Circle"], correctAnswer: 0 },
              { text: "What does plt.show() do?", options: ["Deletes the data", "Displays the chart on the screen", "Saves the file", "Prints the colors"], correctAnswer: 1 },
              { text: "To label the bottom axis, you use:", options: ["plt.ylabel()", "plt.xlabel()", "plt.title()", "plt.bottom()"], correctAnswer: 1 },
              { text: "Comparing categories (e.g., Classes in a school) is best with a:", options: ["Line Plot", "Bar Chart", "Scatter Plot", "Dots"], correctAnswer: 1 },
              { text: "Showing multiple charts on one screen is done with:", options: ["Subplots", "MultiPlots", "DoubleView", "Grid"], correctAnswer: 0 },
              { text: "What keyword is usually used to import the plotting tool?", options: ["import matplotlib as ml", "import matplotlib.pyplot as plt", "use matplotlib", "include plt"], correctAnswer: 1 },
              { text: "Visualization helps turn data into ____.", options: ["Colors", "Knowledge/Insights", "Longer files", "Errors"], correctAnswer: 1 },
              { text: "The title of your chart is set using:", options: ["plt.name()", "plt.title()", "plt.head()", "plt.label()"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "Mini ML: Simple Linear Idea", 
            topics: ["Linear Regression", "Slope and Intercept", "Correlation", "Prediction"],
            content: `### Predicting the Future\n\nIn our final lesson of JSS 2 Term 2, we move from just 'seeing' data to **Predicting** it. This is **Linear Regression**, the most foundational algorithm in all of Machine Learning. It is the mathematical version of 'connecting the dots'. If you know how many hours a student studied for five exams, can you predict their score for the sixth? With Linear Regression, the answer is a scientific **Yes**.\n\n### The Line of Best Fit\n\nImagine a scatter plot of data points. Linear Regression finds the single straight line that passes as close as possible to all those points. This is called the **Line of Best Fit**. This line is defined by two numbers you've seen in math class: the **Slope** (how steep the line is) and the **Intercept** (where it starts). By finding these two numbers, the computer creates a mathematical 'Forward-thinking' rule that it can apply to NEW data it has never seen before.\n\n\`\`\`python\n# The simple logic of a linear prediction\ndef predict_score(hours_studied, slope, intercept):\n    return (slope * hours_studied) + intercept\n\n# If slope=5 and intercept=40:\n# 10 hours studied = (5 * 10) + 40 = 90!\n\`\`\`\n\n### Correlation vs Causation\n\nWe will explore **Correlation**—how strongly two variables are linked. Does 'Ice Cream Sales' cause 'Sunburns'? No! Both are caused by 'Summer'. You'll learn to identify which features are truly useful for your model and which are just 'Noise'. You are learning the difference between a pattern that is real and a pattern that is a coincidence.\n\n:::THE PREDICTION PROTOCOL:::\nWe will build a 'Manual Slope Calculator' and a 'Line of Best Fit Generator'. By the end of this module, you'll be able to explain how a computer 'learns' a trend and uses it to make a forecast. You are moving from 'Describing' the past to **Forecasting** the future. This is the heart of engineering intelligence—the ability to use the data of today to prepare for the challenges of tomorrow. Every major AI, from stock market bots to medical diagnosis tools, started with this simple, linear idea.`,
            assignment: "Manual slope calculation", 
            pocketProject: "Line of best fit generator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is Linear Regression used for?", options: ["Deleting data", "Predicting numerical values based on trends", "Web design", "Playing music"], correctAnswer: 1 },
              { text: "The single line that passes closest to all data points is the:", options: ["Error Line", "Line of Best Fit", "Start Line", "Border"], correctAnswer: 1 },
              { text: "The 'slope' in a linear model represents:", options: ["Where the line starts", "How steep the line is / how fast values change", "The color of the dots", "The total number of points"], correctAnswer: 1 },
              { text: "Predicting a score based on 'Hours Studied' is a ____ problem.", options: ["Classification", "Regression", "Subtraction", "Naming"], correctAnswer: 1 },
              { text: "What is the 'Intercept'?", options: ["The end of the line", "Where the line crosses the Y-axis", "A type of virus", "The file name"], correctAnswer: 1 },
              { text: "Does Correlation always mean one thing CAUSED the other?", options: ["Yes", "No (Correlation is not always Causation)", "Only in math", "Always in AI"], correctAnswer: 1 },
              { text: "Which chart is best for visualizing a linear trend?", options: ["Bar Chart", "Scatter Plot with a Trend Line", "Pie Chart", "Circular Map"], correctAnswer: 1 },
              { text: "A 'Perfect Correlation' would have a score of:", options: ["1.0", "0", "100", "0.5"], correctAnswer: 0 },
              { text: "Machine Learning 'learns' by finding the best ____.", options: ["Colors", "Mathematical Parameters (Slope/Intercept)", "Usernames", "File sizes"], correctAnswer: 1 },
              { text: "Linear Regression is a foundational ____.", options: ["Web browser", "Machine Learning Algorithm", "Hardware Part", "Search Engine"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "jss2-t3",
        name: "3rd Term – Web + Data Integration",
        lessons: [
          { 
            id: 1, 
            title: "JavaScript Advanced", 
            topics: ["Async/Await", "Promises", "The DOM", "Event Loop"],
            content: `### Beyond the Script\n\nUntil now, we've used JavaScript to add simple logic to our web pages. But to build modern, interactive applications like Netflix or Gmail, we need to master the **Advanced Engine** of JavaScript. Modern JS is defined by its ability to handle multiple tasks at once without slowing down. This is the world of **Asynchronous Programming**, and it's what makes the web feel alive and responsive.\n\n### The Asynchronous Secret\n\nImagine ordering food at a restaurant. If the waiter stood at the kitchen door waiting for your meal to cook before serving anyone else, the restaurant would fail. This is 'Blocking' code. Instead, the waiter takes your order and starts serving others while the kitchen works. This is **Asynchronous** behavior. In JS, we use **Promises** and the **Async/Await** keywords to handle tasks that take time, like fetching data from a server or loading a large image. This ensures our app never 'Freezes' while it's waiting for information.\n\n\`\`\`javascript\n// Modern Async/Await pattern\nasync function fetchUserData() {\n    try {\n        const response = await fetch("https://api.futurelab.com/user/101");\n        const data = await response.json();\n        console.log(\`Welcome back, \${data.name}!\`);\n    } catch (error) {\n        console.error("The server is resting. Try again later.");\n    }\n}\n\`\`\`\n\n### The Virtual DOM and Events\n\nWe will also explore the **DOM (Document Object Model)** in detail. You'll learn how to manipulate every pixel of your website using logic, creating 'Live' elements that respond to the user's every click and scroll. We will master the **Event Loop**, the heartbeat of JavaScript that determines which task is most important. \n\n:::ENGINEERING PERFORMANCE:::\nUnderstanding how JS manages memory and execution is the key to building high-performance websites. You'll learn how to write 'Non-Blocking' code that remains fast even on slow devices. By the end of this lesson, you'll be building a 'Real-Time Clock' and mastering the art of the 'Wait-less' user experience. You are moving from 'Writing code' to **Orchestrating Interaction**, developing the skills needed to build the complex, multi-layered applications of tomorrow. The web is your canvas, and Advanced JS is your brush.`,
            assignment: "Async/Await exercise", 
            pocketProject: "Real-time clock", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does 'Asynchronous' mean in programming?", options: ["Tasks run one after another", "Tasks can overlap and wait for results without freezing", "Tasks only run at night", "Tasks are impossible to track"], correctAnswer: 1 },
              { text: "Which keyword is used to wait for a Promise to resolve?", options: ["wait", "await", "pause", "stop"], correctAnswer: 1 },
              { text: "A 'Blocking' program is one that ____.", options: ["Is very secure", "Freezes while waiting for a task to finish", "Has many files", "Uses colors"], correctAnswer: 1 },
              { text: "What is a 'Promise' in JavaScript?", options: ["A guarantee that code will be perfect", "A container for a future result", "A type of variable", "A secret password"], correctAnswer: 1 },
              { text: "The try/catch block is used for ____.", options: ["Looping", "Handling errors in async code", "Formatting text", "Sorting lists"], correctAnswer: 1 },
              { text: "DOM stands for ____.", options: ["Data Object Method", "Document Object Model", "Digital Output Monitor", "Design Only Menu"], correctAnswer: 1 },
              { text: "The 'Event Loop' is responsible for ____.", options: ["Drawing lines", "Managing the order of execution", "Connecting the mouse", "Deleting data"], correctAnswer: 1 },
              { text: "Fetching data from an API is usually ____.", options: ["Synchronous", "Asynchronous", "Forbidden", "Mechanical"], correctAnswer: 1 },
              { text: "Which keyword defines an asynchronous function?", options: ["func", "async", "start", "task"], correctAnswer: 1 },
              { text: "Modern web apps feel fast because they are ____.", options: ["Heavy", "Non-Blocking", "Old", "Static"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "React Basics", 
            topics: ["Components", "Props", "State", "JSX"],
            content: `### The LEGO System of the Web\n\nWelcome to **React**, the most popular library for building user interfaces. Created by Facebook, React changed the web by introducing a 'Modular' way of thinking. Instead of building one giant website, we build many small **Components**. Like LEGO blocks, these components can be combined and reused to create anything from a simple button to a complex dashboard. This is the foundation of **Scale**.\n\n### Components and Props\n\nA **Component** is a self-contained piece of UI, like a 'Navbar' or a 'ProfileCard'. We use **Props (Properties)** to pass data into these components, allowing the same component to look different depending on the data it receives. For example, a single 'Avatar' component can show a different photo and name for every user on your site. This separation of 'Structure' and 'Data' is what makes React incredibly powerful and easy to maintain.\n\n\`\`\`jsx\nfunction WelcomeCard(props) {\n  return (\n    <div className="card">\n      <h1>Hello, {props.name}!</h1>\n      <p>Passion: {props.skill}</p>\n    </div>\n  );\n}\n\n// Reusing the component\n<WelcomeCard name="Ayo" skill="AI" />\n<WelcomeCard name="Zainab" skill="Web" />\n\`\`\`\n\n### The Magic of State\n\nThe most important concept in React is **State**. State is the 'memory' of a component. If a user clicks a button to increase a counter, the counter number is stored in state. When the state changes, React automatically 'Re-renders' (updates) the screen to show the new value. You don't have to manually tell the browser to change the text—React handles the magic for you.\n\n:::REACT PROTOCOL:::\nWe will explore **JSX**, a syntax that looks like HTML but allows you to write logic directly inside your UI. You'll learn how to use the \`useState\` hook to create interactive, 'living' elements. By the end of this lesson, you'll be building your first 'Counter App', proving that you can build interfaces that respond to user data in real-time. You are moving from 'Static Pages' to **Dynamic Applications**. You are learning the language of the modern internet.`,
            assignment: "First 'Hello Component'", 
            pocketProject: "Counter app", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is React?", options: ["A hardware part", "A library for building user interfaces", "A type of CSS", "A search engine"], correctAnswer: 1 },
              { text: "Small, reusable pieces of UI in React are called ____.", options: ["Groups", "Components", "Lists", "Variables"], correctAnswer: 1 },
              { text: "What are 'Props' used for?", options: ["Managing animation", "Passing data into components", "Loading files", "Connecting to the server"], correctAnswer: 1 },
              { text: "What is 'State' in React?", options: ["The computer's location", "The internal memory/data of a component", "A type of URL", "The name of the file"], correctAnswer: 1 },
              { text: "React was created by ____.", options: ["Google", "Facebook (Meta)", "Microsoft", "Apple"], correctAnswer: 1 },
              { text: "JSX allows you to write ____ inside your UI code.", options: ["CSS", "JavaScript/Logic", "Binary", "Python"], correctAnswer: 1 },
              { text: "When state changes, React automatically ____ the component.", options: ["Deletes", "Re-renders/Updates", "Hides", "Prints"], correctAnswer: 1 },
              { text: "Which hook is used to create state in a component?", options: ["useLogic", "useState", "useData", "useStart"], correctAnswer: 1 },
              { text: "React components must always start with a ____.", options: ["Lowercase letter", "Capital letter", "Number", "Symbol"], correctAnswer: 1 },
              { text: "Why is React 'Modular'?", options: ["It uses colors", "It builds apps using small, reusable blocks", "It is very heavy", "It only runs on phones"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Simple Frontend Project", 
            topics: ["Project Structure", "Mapping Data", "Conditional Rendering", "Layouts"],
            content: `### From Logic to Product\n\nIn our previous lessons, we learned the theory of React. Today, we put it into practice by building a **Frontend Project**. The transition from 'Coding' to 'Product Building' is the most exciting step for any engineer. It involves taking your logic and data and wrapping them in a beautiful, structured layout that a user can actually interact with. This is the essence of **Full-Stack Development**.\n\n### Organizing the Blueprint\n\nA professional project is all about **Structure**. You'll learn how to organize your files into 'Components', 'Constants', and 'Styles'. For our project—a **To-Do List (Task Manager)**—we will design the architecture first. We need a 'TaskInput' component to capture data, a 'TaskList' component to display it, and a 'TaskItem' component to handle individual actions like 'Delete' or 'Complete'.\n\n\`\`\`jsx\n// Logic for mapping a list of tasks\nfunction TaskList({ tasks }) {\n  return (\n    <ul>\n      {tasks.map((task) => (\n        <TaskItem key={task.id} name={task.name} />\n      ))}\n    </ul>\n  );\n}\n\`\`\`\n\n### The Power of Mapping and Filters\n\nWe will explore **Array Mapping**, the secret to displaying lists of data efficiently. Instead of writing 10 cards manually, we write one card and tell React: "Map this card to every item in my list." You'll also learn **Conditional Rendering**—showing different UI elements based on the program's state. (For example: showing a "No Tasks Found" message if the list is empty).\n\n:::UX BEST PRACTICE:::\nGood engineering is invisible. Your goal is to create a 'Smooth' experience where the user doesn't have to think. We will focus on 'Layout Flow', ensuring that buttons are where they should be and the UI responds instantly to every click. By the end of this module, you'll have built a fully functional 'To-Do List App (React Version)'. You are moving from 'Learning Tools' to **Building Solutions**. You is proving that you can take a complex idea and turn it into a real, working digital product. The web is ready for your creations!`,
            assignment: "Layout structure", 
            pocketProject: "To-do list (React)", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the first step in building a React project?", options: ["Writing 1000 lines of CSS", "Organizing components and structure", "Buying a server", "Deleting old files"], correctAnswer: 1 },
              { text: "Which method is used to display a list of items efficiently?", options: [".filter()", ".map()", ".find()", ".every()"], correctAnswer: 1 },
              { text: "What is 'Conditional Rendering'?", options: ["Using more colors", "Displaying UI only if certain conditions are met", "Printing the screen", "Stopping the app"], correctAnswer: 1 },
              { text: "The 'key' prop in a list is used by React to ____.", options: ["Secure the data", "Uniquely identify and track list items", "Change the font", "Unlock the CSS"], correctAnswer: 1 },
              { text: "A 'TaskButton' inside a 'TaskList' is an example of ____.", options: ["Component Nesting", "Logic Error", "Hardware Failure", "Web Speed"], correctAnswer: 0 },
              { text: "Good engineering should feel ____ to the user.", options: ["Complicated", "Visible", "Invisible/Smooth", "Colorful"], correctAnswer: 2 },
              { text: "React apps are usually divided into which directories?", options: ["Only .txt files", "Components, Constants, Styles", "Only .jpg files", "Bin and System"], correctAnswer: 1 },
              { text: "Mapping turns an array of data into an array of ____.", options: ["Numbers", "Components/UI elements", "Strings", "Errors"], correctAnswer: 1 },
              { text: "To show an 'Empty' message when a list is 0, we use:", options: ["if/else or logical &&", "Loops", "Math", "Printing"], correctAnswer: 0 },
              { text: "Building a To-Do list teaches you the basics of ____.", options: ["CRUD (Create, Read, Update, Delete)", "Game Design", "Operating Systems", "Hardware Repair"], correctAnswer: 0 }
            ]
          },
          { 
            id: 4, 
            title: "API Integration", 
            topics: ["Fetch API", "JSON", "GET Requests", "Error Handling"],
            content: `### The Global Nervous System\n\nIn the modern world, no application exists in isolation. Your favorite weather app doesn't have a thermometer in every city; it 'Talks' to a weather server. Your social media app doesn't store all photos on your phone; it 'Fetches' them from a database. This communication is made possible by **APIs (Application Programming Interfaces)**. In this lesson, we learn how to connect our React apps to the global nervous system of the internet.\n\n### The Language of JSON\n\nWhen two computers talk, they need a common language. That language is **JSON (JavaScript Object Notation)**. It looks exactly like a JavaScript object, making it incredibly easy for us to read and use. You'll learn how to take a 'String' of data from a server and turn it into a 'Live' object that your app can display. Mastering JSON is the key to working with any modern service, from YouTube to ChatGPT.\n\n\`\`\`javascript\n// Fetching real-world data\nfetch("https://api.weatherlab.com/v1/lagos")\n  .then(response => response.json())\n  .then(data => {\n    console.log(\`Current Temp: \${data.temperature}°C\`);\n  })\n  .catch(error => console.error("Network hiccup!", error));\n\`\`\`\n\n### Handling the Unknown\n\nWe will explore **Error Handling** in detail. The internet is messy—connections drop, servers go down, and data gets lost. A senior engineer is defined by how they handle these failures. You'll learn how to show 'Loading Spinners' while data is fetching and 'Error Messages' if something goes wrong. This is the difference between an app that feels 'Broken' and an app that feels 'Professional'.\n\n:::DATA PROTOCOL:::\nWe will build a 'Weather Dashboard' that pulls live data from a mock API. You'll learn the 'Lifecycle' of a data request—from the moment the user clicks a button to the moment the data appears on the screen. By the end of this module, you'll be an **Integration Engineer**, capable of pulling information from anywhere in the world and making it useful for your users. The entire internet is now your database.`,
            assignment: "Fetch data from URL", 
            pocketProject: "Weather dashboard", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does API stand for?", options: ["Application Programming Interface", "Advanced Personal Integration", "Automated Pixel Index", "Apple Power Input"], correctAnswer: 0 },
              { text: "Which language do computers use to share data over APIs?", options: ["HTML", "JSON", "Python", "Binary"], correctAnswer: 1 },
              { text: "The most common JavaScript function to get data is ____.", options: ["get()", "fetch()", "pull()", "grab()"], correctAnswer: 1 },
              { text: "JSON stands for ____.", options: ["Java Search Online Network", "JavaScript Object Notation", "Just Simple Object News", "Joint System Online"], correctAnswer: 1 },
              { text: "What should you show a user while data is loading?", options: ["An error", "A loading spinner/placeholder", "A blank white screen", "The final result"], correctAnswer: 1 },
              { text: "What does .catch() do in a fetch request?", options: ["Deletes the data", "Handles errors if the request fails", "Repeats the request", "Prints the success message"], correctAnswer: 1 },
              { text: "Getting data from a server is a ____ task.", options: ["Synchronous", "Asynchronous", "Forbidden", "Mechanical"], correctAnswer: 1 },
              { text: "A successful API response usually has a status code of ____.", options: ["200", "404", "500", "0"], correctAnswer: 0 },
              { text: "API requests allow your app to stay ____.", options: ["Static", "Dynamic and connected", "Heavy", "Old"], correctAnswer: 1 },
              { text: "Sending a 'GET' request means you want to ____ data.", options: ["Delete", "Retrieve/Receive", "Overwrite", "Block"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "KPI Basics", 
            topics: ["Key Performance Indicators", "Success Metrics", "Engagement", "Retention"],
            content: `### The Science of Success\n\nHow do you know if your app is actually 'Good'? It's not just about clean code or pretty colors; it's about **Impact**. In the professional world, we measure impact using **KPIs (Key Performance Indicators)**. Whether you are building a game, a social network, or a learning platform, you must define what 'Success' looks like and track the data to prove it. This is **Growth Engineering**.\n\n### Defining the Metrics\n\nWe will explore the three 'North Star' metrics of software. First, **Engagement**: How often do users use your app? Do they click the buttons you want them to click? Second, **Retention**: Do users come back the next day? A great app isn't used once; it's a habit. Third, **Conversion**: Does the user perform the main goal (like finishing a lesson or buying a product)? By tracking these numbers, you move from 'Guessing' to 'Knowing'.\n\n:::THE DASHBOARD THINKING:::\nIn professional teams, everyone—from the CEO to the Engineer—looks at a 'KPI Dashboard'. You'll learn how to think about 'Event Tracking'—sending a signal to your database every time a user completes a task. This data allows you to see where users get 'Stuck' and helps you decide what to build next.\n\n\`\`\`javascript\n// Simple logic for tracking success\nfunction onLessonComplete(userId, timeSpent) {\n    trackEvent("lesson_finished", {\n        user: userId,\n        duration: timeSpent,\n        status: "success"\n    });\n}\n\`\`\`\n\n### Data-Driven Decisions\n\nWe will learn the importance of **A/B Testing**—showing two versions of a feature to see which one performs better. You are learning that as an engineer, your job is to build tools that solve problems. By measuring the results, you ensure that every line of code you write adds real value to the world. \n\nBy the end of this module, you'll be building a 'Personal Goal Tracker' and defining your own success metrics. You are no longer just building 'Toys'; you are building **Growth Systems**. You is developing the mindset of a 'Product Engineer'—someone who understands both the technology and the mission. You are building for scale, for impact, and for a better future.`,
            assignment: "Define success metrics", 
            pocketProject: "Personal goal tracker", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does KPI stand for?", options: ["Key Performance Indicator", "Kids Playing Internally", "Known Pixel Input", "Knowledge Power Index"], correctAnswer: 0 },
              { text: "In software, 'Retention' means ____.", options: ["How many users sign up", "How many users keep coming back", "How fast the app loads", "How many bugs are fixed"], correctAnswer: 1 },
              { text: "A 'North Star Metric' is the ____.", options: ["Slowest part of the code", "Most important goal for the product", "The color of the logo", "A type of server"], correctAnswer: 1 },
              { text: "Why do we track 'Engagement'?", options: ["To make the code longer", "To see if users find the app useful/interesting", "To delete old data", "Because it is required by law"], correctAnswer: 1 },
              { text: "Comparing two versions of a feature is called ____.", options: ["Double Testing", "A/B Testing", "Split Coding", "Mirror View"], correctAnswer: 1 },
              { text: "What is a 'Conversion'?", options: ["Changing a file type", "The user completing a desired goal", "Restarting the PC", "Updating the OS"], correctAnswer: 1 },
              { text: "KPIs help engineers make decisions based on ____.", options: ["Guesses", "Data", "Luck", "Dreams"], correctAnswer: 1 },
              { text: "Where do teams usually view their KPIs?", options: ["In a text file", "On a Dashboard", "In the console", "Through email"], correctAnswer: 1 },
              { text: "If users leave an app after 5 seconds, it has low ____.", options: ["Size", "Engagement/Retention", "Color", "Math"], correctAnswer: 1 },
              { text: "Tracking progress makes you a ____ engineer.", options: ["Slow", "Product-Oriented", "Hardware", "Secret"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "ML Mini Project", 
            topics: ["Design Thinking", "Feature Selection", "UI Design for AI", "Deployment"],
            content: `### Bringing it All Together\n\nCongratulations! You have reached the final milestone of JSS 2. To celebrate, we put everything we've learned—from Python Data Cleaning to React Frontend Logic—into a single **Machine Learning Mini Project**. Our goal is to build a **Stock Prediction UI**. While we won't be building a professional trading bot, we will build the 'Engine' and the 'Interface' that shows how AI is presented to real users.\n\n### The Design Flow\n\nA great AI product is defined by its **User Experience (UX)**. How do you explain an 'ML Confidence Score' to a regular person? How do you visualize a 'Prediction' without confusing the user? You'll start with **Design Thinking**, sketching out your UI before writing a single line of React. You'll ensure your app is responsive, intuitive, and trustworthy.\n\n:::ENGINEERING ARCHITECTURE:::\nWe will build a 'Modular' system. The 'Predictor Engine' will be a clean function that processes input data. The 'UI Dashboard' will be a collection of React components that display the results. This separation ensures that your code is easy to 'Debug' and 'Scale'.\n\n\`\`\`jsx\n// Example of an AI Result Component\nfunction PredictionView({ prediction, confidence }) {\n  return (\n    <div className="ai-result">\n      <h3>Forecast: {prediction}</h3>\n      <div className="gauge">\n          Confidence: {confidence}%\n      </div>\n    </div>\n  );\n}\n\`\`\`\n\n### The Path to Senior Engineer\n\nWe will also discuss **Deployment Concepts**. How do you share your creation with the world? You've moved from writing 'steps' to building 'systems'. You understand data (JSS 2 T1), you can see patterns (JSS 2 T2), and you can build the interface to share those patterns (JSS 2 T3).\n\nBy the end of this module, you'll have designed a full 'Stock Prediction UI' and mapped out an 'ML flow'. You have completed the intermediate year of the FutureLab curriculum. You are now a **System Integrator**, capable of bridging the gap between 'Back-end Intelligence' and 'Front-end Beauty'. You are ready for the advanced challenges of JSS 3, where we dive into Scalability, Security, and Production-grade AI. The future isn't just coming; you are building it!`,
            assignment: "Design ML flow", 
            pocketProject: "Stock prediction UI", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "A successful AI project requires both ____ and ____.", options: ["Math and Physics", "Backend Intelligence and Frontend UX", "Fast typing and long code", "Money and Fame"], correctAnswer: 1 },
              { text: "What is 'Design Thinking'?", options: ["Thinking about colors", "Solving problems with the user in mind before coding", "Deleting files", "Buying a new mouse"], correctAnswer: 1 },
              { text: "Why separate the 'Engine' from the 'UI'?", options: ["To use more folders", "To make the code modular and easier to debug", "It is required for AI", "To make the app slower"], correctAnswer: 1 },
              { text: "A 'Confidence Score' tells the user ____.", options: ["The price of the app", "How certain the AI is about its prediction", "The internet speed", "The user's age"], correctAnswer: 1 },
              { text: "The Stock Prediction UI proves you can build ____.", options: ["Video games", "Real-world data systems", "Only text files", "Small scripts"], correctAnswer: 1 },
              { text: "In React, each part of your UI (like a chart or a button) is a ____.", options: ["Folder", "Component", "Script", "Line"], correctAnswer: 1 },
              { text: "Deployment means ____.", options: ["Writing more code", "Making your app available to users on the internet", "Deleting the code", "Restarting the PC"], correctAnswer: 1 },
              { text: "User Experience (UX) is about making the app feel ____.", options: ["Complicated", "Intuitive and Trustworthy", "Loud", "Secret"], correctAnswer: 1 },
              { text: "JSS 2 has trained you to be a ____.", options: ["Beginner", "System Integrator", "Hardware Repairer", "Social Media Expert"], correctAnswer: 1 },
              { text: "What is the next step after JSS 2?", options: ["Quitting", "JSS 3: Scalability and Security", "Going back to JSS 1", "Buying a new phone"], correctAnswer: 1 }
            ]
          },
        ]
      }
    ]
  },
  {
    id: "jss3",
    name: "JSS 3",
    icon: "🟢",
    color: "purple",
    terms: [
      {
        id: "jss3-t1",
        name: "1st Term – Structured Programming & Testing",
        lessons: [
          { 
            id: 1, 
            title: "Advanced OOP", 
            topics: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
            content: `### The Pillars of Architecture\n\nWelcome to JSS 3, the year of **Professional Excellence**. In JSS 1 and 2, we learned the basics of coding and systems. Now, we dive into the deep architecture used by senior engineers at companies like NASA, SpaceX, and Google. We begin with the four pillars of Object-Oriented Programming: **Inheritance**, **Polymorphism**, **Encapsulation**, and **Abstraction**. These are not just coding tricks; they are the intellectual tools used to manage massive, world-scale software systems.\n\n### The Power of Inheritance\n\n**Inheritance** allows us to create a 'Base Class' with common properties and then create 'Sub-classes' that inherit those properties. Imagine a base class called 'Robot'. It has a power level and a name. We can then create a 'Drone' sub-class and a 'Rover' sub-class. Both are robots, but the Drone has wings and the Rover has wheels. This prevents us from writing the same code twice, making our systems **Modular** and **Efficient**.\n\n\`\`\`python\nclass Robot:\n    def __init__(self, name):\n        self.name = name\n    def boot_up(self):\n        return f"{self.name} is online."\n\nclass Drone(Robot):\n    def fly(self):\n        return f"{self.name} taking to the skies!"\n\nmy_drone = Drone("SkyHawk")\nprint(my_drone.boot_up()) # Inherited method\n\`\`\`\n\n### Polymorphism and Beyond\n\n**Polymorphism** (Greek for 'Many Forms') allows different objects to respond to the same command in their own way. A 'Dog' and a 'Cat' can both 'speak()', but one barks and the other meows. This allows us to write code that interacts with thousands of different objects using the same simple interface. \n\n:::ARCHITECTURAL PROTOCOL:::\nWe will also explore **Encapsulation** (hiding sensitive data inside an object) and **Abstraction** (showing only what is necessary to the user). By the end of this lesson, you'll be building a 'Bank System Simulator', where you manage different types of accounts (Savings, Business) using a single, powerful architecture. You are moving from 'Coding' to **Software Engineering**, mastering the structural secrets that allow the digital world to function at scale. Welcome to the elite level.`,
            assignment: "Inheritance and Polymorphism", 
            pocketProject: "Bank system sim", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What are the 'Four Pillars' of OOP?", options: ["Math, Science, Art, Music", "Inheritance, Polymorphism, Encapsulation, Abstraction", "Loops, Ifs, Lists, Dicts", "HTML, CSS, JS, Python"], correctAnswer: 1 },
              { text: "Inheritance allows a sub-class to ____ code from a base class.", options: ["Delete", "Reuse/Inherit", "Ignore", "Block"], correctAnswer: 1 },
              { text: "What does 'Polymorphism' mean?", options: ["Single form", "Many forms", "No form", "Invisible form"], correctAnswer: 1 },
              { text: "Hiding internal data to protect it is called ____.", options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"], correctAnswer: 1 },
              { text: "Showing only necessary features and hiding complexity is ____.", options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"], correctAnswer: 0 },
              { text: "A 'Drone' inheriting from a 'Robot' class is a ____.", options: ["Base class", "Sub-class", "Parent class", "Root class"], correctAnswer: 1 },
              { text: "Why is inheritance useful?", options: ["It makes files larger", "It prevents writing the same code twice", "It is only for games", "It is required for the screen to work"], correctAnswer: 1 },
              { text: "Polymorphism allows different objects to respond to the ____ command.", options: ["Same", "Different", "Delete", "Stop"], correctAnswer: 0 },
              { text: "Senior engineers use these pillars to manage ____.", options: ["Small files", "Massive, world-scale systems", "Only hardware", "Social media posts"], correctAnswer: 1 },
              { text: "A SavingsAccount inheriting from BankAccount is an example of:", options: ["Polymorphism", "Inheritance", "Abstraction", "Deletion"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Data Structures & Algorithms", 
            topics: ["Big O Notation", "Searching Algorithms", "Sorting Algorithms", "Stacks & Queues"],
            content: `### The Science of Efficiency\n\nIn the early stages of coding, we focus on making things 'Work'. In JSS 3, we focus on making things **Fast**. As you build systems that handle thousands or millions of users, the efficiency of your code becomes its most important feature. This is the domain of **Data Structures and Algorithms (DSA)**—the mathematical study of how we organize data and how we solve problems.\n\n### Foundations of Big O\n\nHow do we measure if one piece of code is 'better' than another? We use **Big O Notation**. This is a way of describing how much longer a program takes to run as the amount of data grows. An **O(1)** algorithm is instant, no matter how much data you have. An **O(n)** algorithm grows linearly—if you have 10 times more data, it takes 10 times longer. Understanding these 'Complexity Classes' is the hallmark of a senior engineer.\n\n\`\`\`python\n# Linear Search - O(n) complexity\ndef find_item(target, collection):\n    for index, item in enumerate(collection):\n        if item == target:\n            return index\n    return -1\n\n# Binary Search - O(log n) complexity (much faster!)\n# (We will implement this in the assignment)\n\`\`\`\n\n### Stacks, Queues, and Beyond\n\nWe will explore specialized structures like the **Stack** (Last-In, First-Out, like a pile of plates) and the **Queue** (First-In, First-Out, like a line at the movies). These structures are used everywhere in technology—from the 'Undo' button in Word to how your computer manages background tasks. You'll learn when to use a List and when a more specialized structure is required for speed.\n\n:::ALGORITHMIC THINKING:::\nWe will also master **Sorting Algorithms**. You'll learn the difference between 'Bubble Sort' (easy to write, but slow) and 'Quick Sort' (complex, but incredibly fast). By the end of this lesson, you'll be building a 'Sorting Visualizer' and implementing your own 'Binary Search'. You are moving from 'Using' software to **Analyzing** it, developing the mathematical intuition needed to solve the world's most complex computational challenges. Speed is the new luxury in engineering.`,
            assignment: "Binary search impl", 
            pocketProject: "Sorting visualizer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does Big O notation measure?", options: ["The color of the code", "How the runtime grows with data size", "The total number of files", "The user's speed"], correctAnswer: 1 },
              { text: "Which complexity is faster for large data?", options: ["O(n)", "O(n^2)", "O(log n)", "O(n!)"], correctAnswer: 2 },
              { text: "A 'Stack' follows which principle?", options: ["LIFO (Last-In, First-Out)", "FIFO (First-In, First-Out)", "Random", "Always empty"], correctAnswer: 0 },
              { text: "A 'Queue' follows which principle?", options: ["LIFO", "FIFO", "Sorted", "Hidden"], correctAnswer: 1 },
              { text: "Binary Search requires the data to be ____.", options: ["Random", "Sorted", "Deleted", "Formatted as text"], correctAnswer: 1 },
              { text: "An O(1) algorithm is also called ____.", options: ["Infinite time", "Linear time", "Constant time", "Slow time"], correctAnswer: 2 },
              { text: "Bubble Sort is generally considered ____.", options: ["Fast", "Inefficient for large data", "Impossible to write", "Only for JS"], correctAnswer: 1 },
              { text: "Which structure is best for an 'Undo' feature?", options: ["Queue", "Stack", "List", "Set"], correctAnswer: 1 },
              { text: "Which structure is best for a printer task list?", options: ["Queue", "Stack", "Dictionary", "Tuple"], correctAnswer: 0 },
              { text: "Searching every item one by one is called ____.", options: ["Binary Search", "Linear Search", "Quick Search", "Deep Search"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Unit Testing", 
            topics: ["PyTest", "AAA Pattern", "Mocking", "Test Coverage"],
            content: `### The Guardian of Quality\n\nIn professional software engineering, you never trust that your code works just because you 'tried it'. Every line of code must be verified by another piece of code. This is **Unit Testing**. It is the process of writing small, automated tests that check if individual 'units' of your program function correctly. Tests are the safety net that allow engineers to build at incredible speed without breaking the system.\n\n### The AAA Pattern\n\nTo write high-quality tests, we use the **AAA Pattern**: **Arrange**, **Act**, and **Assert**. First, you **Arrange** your data (set up the test). Second, you **Act** (run the function you want to test). Third, you **Assert** (check if the result is what you expected). If the assertion fails, the test 'breaks', alerting you to a bug before a single user ever sees it.\n\n\`\`\`python\nimport unittest\n\n# The function to test\ndef add(a, b):\n    return a + b\n\n# The test case\nclass TestMath(unittest.TestCase):\n    def test_add_positive_numbers(self):\n        # 1. Arrange & 2. Act\n        result = add(10, 5)\n        # 3. Assert\n        self.assertEqual(result, 15)\n\`\`\`\n\n### Resilience and Mocking\n\nWe will explore **Mocking**—creating 'fake' versions of complex systems (like a database or the internet) so we can test our code in isolation. You'll also learn about **Test Coverage**, a metric that tells you what percentage of your code is currently being checked by tests. A professional team usually aims for 80% to 100% coverage.\n\n:::TEST-DRIVEN PROTOCOL:::\nWe will practice **Test-Driven Development (TDD)**—is the habit of writing your test BEFORE you write the actual code. This forces you to think clearly about your design before you start typing. By the end of this lesson, you'll be building a 'Test-Driven Calculator' and writing '10 Test Cases' for a real system. You are moving from 'Building' to **Validating**, developing the rigorous habits that define a senior infrastructure engineer. You don't just write code; you write code that is **Proven**.`,
            assignment: "Write 10 test cases", 
            pocketProject: "Test-driven calculator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Unit Test'?", options: ["A test for the whole computer", "An automated test for a small part of code", "A typing test", "A hardware check"], correctAnswer: 1 },
              { text: "What does the AAA pattern stand for?", options: ["Add, Add, Add", "Arrange, Act, Assert", "Always Ask Anyone", "Automated Action Alert"], correctAnswer: 1 },
              { text: "Checking if a result is correct is the ____ step.", options: ["Arrange", "Act", "Assert", "Start"], correctAnswer: 2 },
              { text: "Writing tests BEFORE the code is called ____.", options: ["TDD (Test-Driven Development)", "Slow Coding", "Backwards Logic", "Manual Testing"], correctAnswer: 0 },
              { text: "What is 'Mocking'?", options: ["Making fun of code", "Using fake data to test in isolation", "Deleting tests", "Printing errors"], correctAnswer: 1 },
              { text: "What is 'Test Coverage'?", options: ["The color of the test file", "The percentage of code checked by tests", "The total number of tests", "The size of the test report"], correctAnswer: 1 },
              { text: "Why are unit tests important?", options: ["They make code pretty", "They catch bugs automatically before users see them", "They are required by the mouse", "They make code run slower"], correctAnswer: 1 },
              { text: "A test that fails is a sign of a ____.", options: ["Success", "Bug or logic error", "Slow internet", "Formatting issue"], correctAnswer: 1 },
              { text: "The 'Act' step involves ____.", options: ["Setting up variables", "Running the actual function", "Checking the answer", "Closing the file"], correctAnswer: 1 },
              { text: "TDD helps engineers ____.", options: ["Write more files", "Design better, more reliable code", "Save money on energy", "Finish in 5 minutes"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Error Handling & Debugging", 
            topics: ["Custom Exceptions", "Logging vs Printing", "Breakpoints", "Resilience"],
            content: `### The Art of Resilience\n\nIn JSS 1, we learned about 'Syntax Errors'. Now, we move to **Professional Error Handling**. In a complex system, things WILL go wrong. A database might be offline, a user might enter the wrong data, or a network might fail. A senior engineer doesn't just hope things stay working; they design systems that 'Fail Gracefully'. This is **Software Resilience**.\n\n### Beyond the Print Statement\n\nWhile \`print()\` is great for beginners, professional engineers use **Logging**. Logging allows you to keep a permanent record of what happened in your program, categorized by importance: **DEBUG**, **INFO**, **WARNING**, and **ERROR**. This allows teams to find and fix problems on a server thousands of miles away without having to see the computer screen. \n\n\`\`\`python\nimport logging\n\n# Setting up a professional log\nlogging.basicConfig(level=logging.INFO)\n\ntry:\n    result = 100 / 0\nexcept ZeroDivisionError:\n    logging.error("Math Failure: A user tried to divide by zero!")\n    result = 0 # Defaulting to a safe value\n\`\`\`\n\n### Custom Exceptions and Breakpoints\n\nWe will explore **Custom Exceptions**—creating your own types of errors to make your code more readable. You'll also learn how to use **Breakpoints** in your IDE (like VS Code), which allow you to 'Pause time' and inspect your program's memory while it is running. This is 'Deep-Sea Debugging', allowing you to see exactly what is happening inside the machine.\n\n:::ENGINEERING PROTOCOL:::\nWe will build a 'Fault-Tolerant Script' that can survive even if parts of its data are corrupted. You'll learn the 'Safe-Default' pattern, ensuring your app never crashes for the user, no matter what happens in the background. By the end of this lesson, you'll be a **Response Engineer**, developing the stoic and analytical mindset needed to keep systems running during a crisis. You are no longer just building code; you are building code that **Endures**.`,
            assignment: "Custom exceptions", 
            pocketProject: "Fault-tolerant script", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Software Resilience'?", options: ["Fast code", "The ability of code to handle errors without crashing", "Using more memory", "Deleting bugs"], correctAnswer: 1 },
              { text: "Why is 'Logging' better than 'Printing' for pros?", options: ["It uses more colors", "It can be saved to files and sorted by importance", "It is shorter to type", "It is only for Python"], correctAnswer: 1 },
              { text: "Which log level is for critical failures?", options: ["DEBUG", "INFO", "ERROR", "HAPPY"], correctAnswer: 2 },
              { text: "A 'Custom Exception' helps to ____.", options: ["Hide errors", "Create specific, readable error types for your app", "Slow down the code", "Delete the file"], correctAnswer: 1 },
              { text: "What does a 'Breakpoint' do?", options: ["Crashes the PC", "Pauses code execution so you can inspect memory", "Speeds up the loop", "Deletes the variable"], correctAnswer: 1 },
              { text: "Failing 'Gracefully' means ____.", options: ["Crashing with a loud sound", "Handling an error so the user isn't affected", "Deleting all data", "Quitting the job"], correctAnswer: 1 },
              { text: "Which block is used to 'Watch' for errors?", options: ["try", "except", "finally", "watch"], correctAnswer: 0 },
              { text: "Which block runs NO MATTER WHAT happened?", options: ["try", "except", "finally", "always"], correctAnswer: 2 },
              { text: "Professional debugging is mostly about ____.", options: ["Guessing", "Evidence and inspection", "Luck", "Deleting code"], correctAnswer: 1 },
              { text: "A 'Fault-Tolerant' script is one that ____.", options: ["Has no errors", "Can handle and recover from errors", "Is only 10 lines long", "Uses only integers"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "GitHub Collaboration", 
            topics: ["Pull Requests", "Merge Conflicts", "Code Review", "Git Flow"],
            content: `### The Power of the Team\n\nNo great piece of software was ever built by a single person. Whether it is the Linux kernel, the search engine you use, or the game you play, it was built by hundreds of engineers working together. In this lesson, we master **GitHub Collaboration**, the essential workflow for modern software teams. You've learned how to save your own code; now you'll learn how to merge your ideas with others without breaking the system.\n\n### The Pull Request Workflow\n\nWhen you want to add a feature to a team project, you don't just 'upload' it. You create a **Pull Request (PR)**. This is a formal request to merge your code into the main project. It creates a space for **Code Review**, where your teammates can look at your work, suggest improvements, and ensure everything follows the project's standards. This 'Peer Review' process is what ensures that professional software remains reliable and secure.\n\n\`\`\`bash\n# Standard team workflow\ngit checkout -b feature-new-ai-bot\ngit add .\ngit commit -m "Add new logic for AI bot"\ngit push origin feature-new-ai-bot\n# Then, you open the PR on GitHub.com\n\`\`\`\n\n### Handling the Conflict\n\nWe will tackle the most feared part of collaboration: **Merge Conflicts**. This happens when two people change the same line of code at the same time. You'll learn how to 'Resolve' these conflicts, choosing the best version of the code and ensuring the project stays intact. You'll also learn about **Git Flow**—the strategy teams use to manage 'Development', 'Testing', and 'Production' versions of their software.\n\n:::COLLABORATION PROTOCOL:::\nWe will build a 'Team Project Portal' where you'll practice handling real merge conflicts in a controlled environment. By the end of this module, you'll be a **Collaborative Engineer**, capable of working inside any professional software team in the world. You are moving from 'Solo Coder' to **Global Contributor**, ready to join the worldwide community of developers building the future of technology together. Your code is now part of something bigger.`,
            assignment: "Handle merge conflicts", 
            pocketProject: "Team project portal", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Pull Request' (PR)?", options: ["A request to delete code", "A formal request to merge your changes into a project", "A hardware part", "A type of URL"], correctAnswer: 1 },
              { text: "What happens during 'Code Review'?", options: ["The computer deletes your code", "Teammates check your work for quality and bugs", "The user pays for the app", "The internet speed increases"], correctAnswer: 1 },
              { text: "When does a 'Merge Conflict' occur?", options: ["When the internet is slow", "When two people change the same line of code", "When you forget your password", "When you use a different font"], correctAnswer: 1 },
              { text: "The main version of a project is usually called the ____ branch.", options: ["Side", "Main or Master", "Hidden", "Final"], correctAnswer: 1 },
              { text: "Which command creates a new branch?", options: ["git delete", "git checkout -b <name>", "git stop", "git restart"], correctAnswer: 1 },
              { text: "Peer review helps ensure code is ____.", options: ["Longer", "Reliable and Secure", "Expensive", "Only for Python"], correctAnswer: 1 },
              { text: "What should you do before starting a new feature?", options: ["Delete the project", "Create a new branch", "Restart the PC", "Buy a new mouse"], correctAnswer: 1 },
              { text: "Resolving a conflict means ____.", options: ["Deleting the whole file", "Choosing which code version to keep", "Starting a fight", "Ignoring the error"], correctAnswer: 1 },
              { text: "Why is GitHub important for teams?", options: ["It provides free music", "It allows developers to work together on the same code", "It is only for single players", "It makes code run faster"], correctAnswer: 1 },
              { text: "A 'Contributor' is someone who ____.", options: ["Uses the app once", "Adds code/value to a project", "Sells the app", "Writes text files"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "ML: Supervised vs Unsupervised", 
            topics: ["Labeled Data", "Classification", "Clustering", "Neural Network Intro"],
            content: `### The Two Paths of Intelligence\n\nWelcome to the final milestone of the 1st Term. In this lesson, we explore the fundamental split in the world of Artificial Intelligence: **Supervised vs Unsupervised Learning**. This is the difference between a computer being 'Taught' by a teacher and a computer 'Discovering' patterns on its own. Understanding this distinction is the key to knowing which tool to use for any given problem.\n\n### Supervised Learning: The Teacher\n\nIn **Supervised Learning**, we provide the computer with **Labeled Data**. This means we give it the questions AND the answers. For example, if we want to train an AI to recognize cats, we give it 10,000 photos and tell it: "This is a cat, this is not a cat." The computer learns the 'Mapping' between the image and the label. This is used for **Classification** (Is this spam or not?) and **Regression** (What will the stock price be?).\n\n\`\`\`python\n# Supervised - We know the labels\ndata = [\n    {"features": [1, 2], "label": "Cat"},\n    {"features": [3, 4], "label": "Dog"}\n]\n\`\`\`\n\n### Unsupervised Learning: The Explorer\n\nIn **Unsupervised Learning**, there are no labels. We give the computer a massive pile of data and say: "Find something interesting." The computer use **Clustering** to group similar items together. This is how Netflix knows which movies you might like or how scientists discover new types of galaxies. The computer isn't being 'Taught'; it is **Detecting Patterns** that humans might missed.\n\n:::AI THEORY PROTOCOL:::\nWe will also touch upon the basics of **Neural Networks**—AI models inspired by the human brain. By the end of this lesson, you'll be building a 'Cluster Analyzer' and performing a 'Labeling Exercise'. You are finishing the first term of JSS 3 with a deep theoretical understanding of how machines learn. You are moving from 'Coding' to **Data Science**, ready for the advanced automation and capstone projects that lie ahead. The horizon of AI is now in your sight.`,
            assignment: "Labeling exercise", 
            pocketProject: "Cluster analyzer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is Supervised Learning?", options: ["Training an AI with labeled data (questions + answers)", "Letting the AI do whatever it wants", "Turning off the computer", "Writing code without errors"], correctAnswer: 0 },
              { text: "What is Unsupervised Learning?", options: ["The computer has a teacher", "The computer finds patterns in unlabeled data on its own", "The code is deleted", "The computer is broken"], correctAnswer: 1 },
              { text: "In AI, 'Labeled Data' means ____.", options: ["Data with names", "Data that has been categorized with the correct answers", "Data that is very large", "Data that is secret"], correctAnswer: 1 },
              { text: "Which task is an example of Supervised Learning?", options: ["Finding clusters of stars", "Spam Detection (is this email spam?)", "Discovering new music genres", "Randomly sorting files"], correctAnswer: 1 },
              { text: "Which task is an example of Unsupervised Learning?", options: ["Predicting house prices", "Grouping similar customers together (Clustering)", "Identifying fruit in a photo", "Subtracting numbers"], correctAnswer: 1 },
              { text: "Classification is used to ____.", options: ["Predict a number", "Assign an item to a category (Like Cat or Dog)", "Delete a file", "Format the text"], correctAnswer: 1 },
              { text: "Clustering is the process of ____.", options: ["Grouping similar data points together", "Listing all data", "Deleting old data", "Multiplying values"], correctAnswer: 0 },
              { text: "Neural Networks are inspired by ____.", options: ["The human brain", "The water cycle", "Clockwork", "The internet only"], correctAnswer: 0 },
              { text: "Regression is used to predict ____.", options: ["Categories", "Numerical values (like prices)", "Colors", "Names"], correctAnswer: 1 },
              { text: "Supervised learning requires a ____ to 'tell' the computer the answers.", options: ["Human or Labeled dataset", "Virus", "Printer", "New keyboard"], correctAnswer: 0 }
            ]
          },
        ]
      },
      {
        id: "jss3-t2",
        name: "2nd Term – Data & Automation",
        lessons: [
          { 
            id: 1, 
            title: "Automation with Python", 
            topics: ["OS Module", "Shutil", "Automated Backups", "Cron Jobs"],
            content: `### The Robot on Your Desktop\n\nImagine you have a folder with 10,000 files—PDFs, Images, and Spreadsheets—all mixed together. Sorting them manually would take days. But with Python, you can write a script that does it in 3 seconds. This is the power of **Automation**. In this lesson, we learn how to use Python to control your computer's operating system, allowing you to automate the boring, repetitive tasks that humans hate but computers love.\n\n### Controlling the System\n\nWe will master the **os** and **shutil** modules. These are the built-in libraries that allow Python to 'talk' to your hard drive. You'll learn how to create folders, move files, and even delete temporary 'junk' files automatically. This is **System Engineering**—treating your operating system as a piece of software that you can program and optimize.\n\n\`\`\`python\nimport os\nimport shutil\n\n# Logic to automatically sort files by extension\ndef sort_files(folder_path):\n    for filename in os.listdir(folder_path):\n        if filename.endswith(".jpg"):\n            shutil.move(filename, "Images/")\n        elif filename.endswith(".pdf"):\n            shutil.move(filename, "Documents/")\n\`\`\`\n\n### Set It and Forget It\n\nWe will explore **Cron Jobs** (on Linux/Mac) and the **Task Scheduler** (on Windows). This allows your scripts to run automatically even when you aren't at the computer. Imagine a script that backups your most important projects to the cloud every night at 3:00 AM. This is the foundation of **DevOps**—ensuring that systems stay maintained and secure without human intervention.\n\n:::AUTOMATION PROTOCOL:::\nWe will build an 'Auto-Sort File Bot' and an 'Email Sender Bot' that can notify you when a task is finished. By the end of this lesson, you'll be an **Automation Architect**, capable of turning a computer into a tireless digital assistant. You are moving from 'Building Apps' to **Building Workflows**, developing the efficiency mindset that separates the average developer from the elite engineer. Time is your most valuable resource; learn to automate it.`,
            assignment: "Auto-sort files", 
            pocketProject: "Email sender bot", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the main goal of Automation?", options: ["To make code more complex", "To save time by making repetitive tasks automatic", "To use more memory", "To change the screen color"], correctAnswer: 1 },
              { text: "Which Python module is used to move and copy files?", options: ["math", "shutil", "random", "time"], correctAnswer: 1 },
              { text: "What does 'os.listdir()' do?", options: ["Deletes the OS", "Lists all files and folders in a directory", "Starts a new game", "Changes the password"], correctAnswer: 1 },
              { text: "A 'Cron Job' is used to ____.", options: ["Draw 3D shapes", "Schedule a script to run at specific times", "Delete temporary files", "Fix a broken keyboard"], correctAnswer: 1 },
              { text: "Automation is the foundation of which field?", options: ["DevOps / System Administration", "Graphic Design", "History", "Sports"], correctAnswer: 0 },
              { text: "How long does a computer take to sort 10,000 files with a script?", options: ["Days", "Seconds", "Hours", "Years"], correctAnswer: 1 },
              { text: "Which Windows tool is like a Cron Job?", options: ["Paint", "Task Scheduler", "Notepad", "Calculator"], correctAnswer: 1 },
              { text: "Using scripts to manage your PC is called ____.", options: ["System Engineering", "Social Media", "Video Editing", "Gaming"], correctAnswer: 0 },
              { text: "What is a 'junk' file?", options: ["The most important file", "Temporary file that is no longer needed", "A video file", "A password file"], correctAnswer: 1 },
              { text: "Why are humans bad at repetitive tasks?", options: ["They are too fast", "They get tired, bored, and make mistakes", "They don't have enough files", "They like computers"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "CSV & Data Handling", 
            topics: ["Comma Separated Values", "DictReader", "Data Cleaning", "Data Integrity"],
            content: `### The Language of Databases\n\nIn the professional world, data is rarely stored in a simple list. It's stored in massive tables called **CSV (Comma Separated Values)**. Whether it's a list of 1 million customers, a record of every transaction in a bank, or the results of a scientific experiment, CSV is the universal language of data storage. In this lesson, we learn how to master this format and handle data like a pro.\n\n### Parsing the World\n\nWe will explore the **csv** module and the powerful **DictReader**. Instead of just seeing a line of text, DictReader turns every row of a CSV into a Python Dictionary. This allows you to access data by its header name (like 'Price' or 'User_ID') instead of its position. This is the first step toward **Data Analysis**—being able to extract specific insights from a sea of raw information.\n\n\`\`\`python\nimport csv\n\n# Reading a complex dataset\nwith open('sales_data.csv', mode='r') as file:\n    reader = csv.DictReader(file)\n    for row in reader:\n        if int(row['Sales']) > 1000:\n            print(f"Top Seller: {row['Product']}")\n\`\`\`\n\n### Data Integrity and Cleaning\n\nWe will tackle **Data Cleaning**. Real-world data is 'dirty'—columns might be missing, numbers might be written as text, and there might be duplicate entries. You'll learn how to identify these errors and fix them automatically, ensuring **Data Integrity**. If your data is bad, your results will be bad. Engineering is about ensuring accuracy at every step.\n\n:::DATA ARCHITECT PROTOCOL:::\nWe will build a 'CSV to JSON Converter', a tool used by developers to move data between different types of systems. By the end of this lesson, you'll be a **Data Interoperability Specialist**, capable of taking information from any source and making it usable. You are moving from 'Small Samples' to **Massive Datasets**, preparing yourself for the world of High-Scale Data Science. Information is the new gold; learn to mine it.`,
            assignment: "Parse large datasets", 
            pocketProject: "CSV to JSON converter", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does CSV stand for?", options: ["Computer Shared Value", "Comma Separated Values", "Color System View", "Central Scan Variable"], correctAnswer: 1 },
              { text: "Why is CSV used globally?", options: ["It is a very pretty format", "It is a simple, universal way to store tabular data", "It is only for Python", "It is the largest file type"], correctAnswer: 1 },
              { text: "What does 'DictReader' do?", options: ["Reads a dictionary aloud", "Converts CSV rows into Python dictionaries", "Deletes the CSV", "Creates a new folder"], correctAnswer: 1 },
              { text: "If your data has missing or wrong values, it is called ____.", options: ["Clean data", "Dirty data", "Hard data", "Fast data"], correctAnswer: 1 },
              { text: "The process of ensuring data is accurate is called ____.", options: ["Data Deletion", "Data Integrity/Cleaning", "Slow Coding", "Social Networking"], correctAnswer: 1 },
              { text: "Which character is most common as a 'separator' in a CSV?", options: ["Comma (,)", "Space ( )", "Dollar ($)", "Number (#)"], correctAnswer: 0 },
              { text: "Converting CSV to JSON is useful for ____.", options: ["Printing the screen", "Moving data between different apps and systems", "Deleting the code", "Changing the font"], correctAnswer: 1 },
              { text: "Reading data one row at a time instead of all at once is called ____.", options: ["Mapping", "Streaming/Iterating", "Blocking", "Restarting"], correctAnswer: 1 },
              { text: "What is a 'header' in a CSV?", options: ["The last line of the file", "The first row that names the columns", "The size of the file", "A type of virus"], correctAnswer: 1 },
              { text: "A dataset with 1 million rows would be best stored in ____.", options: ["A single variable", "A CSV or Database", "A text message", "A sticky note"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Advanced Pandas", 
            topics: ["DataFrames", "GroupBy", "Pivot Tables", "Advanced Filtering"],
            content: `### The Engine of Science\n\nWelcome to **Pandas**, the industry-standard library for Data Science. If Python is the car, Pandas is the high-performance engine that allows you to analyze millions of rows of data with just one line of code. In this lesson, we move beyond simple CSV reading and enter the world of **Advanced Data Manipulation**, learning the skills used by data scientists at Netflix, Uber, and Amazon to predict user behavior.\n\n### Mastering the DataFrame\n\nThe central power of Pandas is the **DataFrame**—a super-powered table that can hold any kind of data. You'll learn how to perform **Vectorized Operations**, applying math to an entire column at once instead of using slow loops. You'll also master **Boolean Indexing**, allowing you to filter through a million rows to find only the specific data points that matter to your project.\n\n\`\`\`python\nimport pandas as pd\n\n# Advanced analysis in just 3 lines\ndf = pd.read_csv("market_data.csv")\nsummary = df.groupby("Category")["Sales"].sum()\ntop_results = df[df["Profit"] > 5000]\n\`\`\`\n\n### Aggregation and Insights\n\nWe will explore **GroupBy** and **Pivot Tables**. These are the tools used to summarize data. Imagine you have a list of every sale in a store for a year. With a Pivot Table, you can instantly see which month was the most profitable or which product sold best in which city. This is the difference between having 'Data' and having **Insights**. You are learning to see the story hidden inside the numbers.\n\n:::DATA SCIENTIST PROTOCOL:::\nWe will build a 'Sales Analyzer' that generates a summary report from a complex dataset. By the end of this lesson, you'll be a **Pandas Power User**, capable of taking a chaotic pile of data and turning it into a clear, actionable strategy. You are moving from 'Collecting' data to **Interpreting** it, preparing for the world of Predictive Modeling and Artificial Intelligence. The data is talking; you are learning how to listen.`,
            assignment: "Pivot multi-index tables", 
            pocketProject: "Sales analyzer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is Pandas?", options: ["An animal", "A high-performance data analysis library for Python", "A type of hardware", "A web browser"], correctAnswer: 1 },
              { text: "The main data structure in Pandas is the ____.", options: ["List", "DataFrame", "Stack", "Tuple"], correctAnswer: 1 },
              { text: "What does 'df.groupby()' do?", options: ["Deletes groups", "Summarizes data by categories", "Changes the group name", "Closes the file"], correctAnswer: 1 },
              { text: "Vectorized operations allow you to ____.", options: ["Perform math on one item at a time", "Perform math on an entire column at once (very fast)", "Draw vectors", "Delete all data"], correctAnswer: 1 },
              { text: "Filtering data based on true/false conditions is called ____.", options: ["Boolean Indexing", "Math Sorting", "Color Mapping", "Random Selection"], correctAnswer: 0 },
              { text: "A 'Pivot Table' is used to ____.", options: ["Turn the computer", "Reorganize and summarize complex data", "Delete duplicate rows", "Start a new project"], correctAnswer: 1 },
              { text: "Why is Pandas better than basic Python for large data?", options: ["It uses more files", "It is optimized for speed and complex calculations", "It is shorter to install", "It is only for games"], correctAnswer: 1 },
              { text: "Pandas is the industry standard for ____.", options: ["Data Science and Analysis", "Word Processing", "Image Editing", "Listening to music"], correctAnswer: 0 },
              { text: "A Pandas DataFrame is similar to which other tool?", options: ["Notepad", "Excel/Spreadsheets", "Calculator", "Paint"], correctAnswer: 1 },
              { text: "How many lines of code does a complex Pandas analysis usually take?", options: ["Thousands", "A few powerful lines", "Exactly one million", "Infinity"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Data Visualization Project", 
            topics: ["Plotly", "Interactive Maps", "Data Storytelling", "Dashboards"],
            content: `### The Art of Information\n\nData without visualization is just a pile of numbers. To make data useful, we must turn it into a story that the human eye can understand. In this lesson, we move beyond static charts and learn how to build **Interactive Visualizations**. Using libraries like **Plotly** and **Folium**, we will create charts that users can zoom into, hover over, and filter in real-time. This is **Data Storytelling**.\n\n### Interactive Maps and 3D Plots\n\nWe will explore how to visualize geographic data using **Interactive Maps**. Imagine putting a marker on a map for every customer in a business or every sensor in a smart city. We will also dive into **3D Scatter Plots**, allowing you to see patterns in data with three different variables at once. This depth allowed engineers to find correlations that are impossible to see in a flat, 2D world.\n\n\`\`\`python\nimport plotly.express as px\n\n# Creating an interactive 3D map of data\nfig = px.scatter_3d(df, x='Year', y='Sales', z='Profit', color='Region')\nfig.show()\n\`\`\`\n\n### The Dashboard Mindset\n\nWe will learn the principles of **UI/UX for Data**. How do you choose the right color for a chart? When is a Bar Chart better than a Pie Chart? You'll learn how to design 'Dashboards' that provide an instant overview of a complex system. A great visualization doesn't just show data; it provides **Clarity**.\n\n:::VISUALIZATION PROTOCOL:::\nWe will build an 'Interactive Map Data' project where you plot real-world coordinate data onto a live map. By the end of this module, you'll be a **Data Visualization Specialist**, capable of turning numerical chaos into beautiful, actionable insights. You are moving from 'Calculating' to **Communicating**, developing the creative and analytical skills needed to present your findings to the world. A picture is worth a thousand rows of data.`,
            assignment: "3D plots", 
            pocketProject: "Interactive map data", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Interactive Visualization'?", options: ["A video", "A chart that users can zoom, hover, and interact with", "A printed paper", "A text file"], correctAnswer: 1 },
              { text: "Which library is known for interactive 3D plots?", options: ["Math", "Plotly", "Random", "Time"], correctAnswer: 1 },
              { text: "A Pie Chart is best for ____.", options: ["Showing changes over time", "Showing parts of a whole (percentages)", "Listing names", "Subtracting numbers"], correctAnswer: 1 },
              { text: "3D Scatter Plots allow you to see ____ variables at once.", options: ["1", "2", "3", "100"], correctAnswer: 2 },
              { text: "The goal of data storytelling is to provide ____.", options: ["Complexity", "Clarity and Insights", "Noise", "Confusion"], correctAnswer: 1 },
              { text: "A 'Dashboard' is a ____.", options: ["Single button", "Collection of visualizations for a quick overview", "Type of car engine", "Password"], correctAnswer: 1 },
              { text: "Which library is used for interactive maps in Python?", options: ["Folium/Plotly", "OS", "Shutil", "CSV"], correctAnswer: 0 },
              { text: "Zooming into a chart helps researchers find ____.", options: ["Colors", "Specific data points and local patterns", "The exit button", "The file size"], correctAnswer: 1 },
              { text: "Why use interactive charts over static ones?", options: ["They are lighter", "They allow the user to explore the data themselves", "They are cheaper", "They only work on phones"], correctAnswer: 1 },
              { text: "Data visualization bridges the gap between ____ and ____.", options: ["Math and Art", "Numbers and Understanding", "Input and Output", "Keyboard and Mouse"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Database Concept", 
            topics: ["SQL vs NoSQL", "Relational Schema", "Primary Keys", "SQLite Queries"],
            content: `### The Storage of the Modern World\n\nWhere does Facebook store millions of photos? Where does a bank keep track of every cent? They don't use simple files like CSVs; they use **Databases**. In this lesson, we learn the foundations of **Relational Databases** and the language used to talk to them: **SQL (Structured Query Language)**. This is the bedrock of back-end engineering, allowing you to manage massive amounts of data with perfect accuracy.\n\n### The Relational Schema\n\nWe will explore **Schema Design**—the blueprint for a database. You'll learn how to organize data into tables and connect them using **Relationships**. For example, a 'Students' table can be connected to a 'Grades' table using a **Primary Key**. This prevents data duplication and ensures that if you change a student's name in one place, it updates everywhere. This is the foundation of **Data Consistency**.\n\n\`\`\`sql\n-- A simple SQL query to find top students\nSELECT name, grade \nFROM students \nWHERE grade = 'A' \nORDER BY last_name ASC;\n\`\`\`\n\n### SQLite and Local Storage\n\nWe will work with **SQLite**, a light but powerful database engine that lives directly inside your Python environment. You'll learn how to 'Query' the database—writing commands to Insert, Select, Update, and Delete data. This is **CRUD**, the acronym for the four basic operations of any data-driven application. \n\n:::DATABASE ARCHITECT PROTOCOL:::\nWe will design a 'SQLite Student DB' schema from scratch. By the end of this lesson, you'll be a **Database Architect**, capable of designing the storage systems that power the digital world. You are moving from 'Flat Files' to **Relational Systems**, developing the structural thinking needed to build robust, industrial-grade software. Your data now has a permanent, secure home.`,
            assignment: "Design DB schema", 
            pocketProject: "SQLite student DB", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does SQL stand for?", options: ["Simple Query Link", "Structured Query Language", "Shared Quick Library", "System Quality Level"], correctAnswer: 1 },
              { text: "A 'Relational Database' organizes data into ____.", options: ["Circles", "Tables with rows and columns", "One long line", "Random files"], correctAnswer: 1 },
              { text: "What is a 'Primary Key'?", options: ["The first file created", "A unique identifier for a row in a table", "The enter key", "A password"], correctAnswer: 1 },
              { text: "What does CRUD stand for?", options: ["Create, Read, Update, Delete", "Carry, Run, Use, Deliver", "Central, Real, Urban, Digital", "Clear, Reset, Undo, Done"], correctAnswer: 0 },
              { text: "Which SQL command is used to retrieve data?", options: ["GET", "SELECT", "PULL", "FIND"], correctAnswer: 1 },
              { text: "Why are databases better than CSVs for massive data?", options: ["They are cheaper", "They are faster, more secure, and handle relationships", "They have more colors", "They are only for Python"], correctAnswer: 1 },
              { text: "SQLite is special because it is ____.", options: ["Huge", "A serverless, lightweight database engine", "Only for web", "A type of CSS"], correctAnswer: 1 },
              { text: "The blueprint of a database is called its ____.", options: ["Map", "Schema", "List", "Code"], correctAnswer: 1 },
              { text: "Connecting two tables together creates a ____.", options: ["Relationship", "Error", "New file", "Virus"], correctAnswer: 0 },
              { text: "Which SQL command is used to add new data?", options: ["ADD", "INSERT", "PUSH", "NEW"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "ML: Data Preparation", 
            topics: ["Feature Engineering", "Scaling", "Handling Missing Data", "Preprocessing"],
            content: `### Preparing the Fuel for AI\n\nIn Machine Learning, there is a famous saying: "Garbage In, Garbage Out." No matter how advanced your AI model is, if the data you give it is messy, the predictions will be wrong. In this lesson, we learn the most important part of any AI project: **Data Preparation**. This is where we take 'Raw Data' and transform it into 'Clean Fuel' that a machine can actually understand.\n\n### Scaling and Encoding\n\nWe will explore **Feature Scaling**. Imagine a dataset where 'Age' is 15 but 'Income' is 50,000. To a computer, 50,000 looks much more 'Important' than 15, even if they aren't related. We use **Normalization** to put all numbers on a similar scale (like 0 to 1). We also tackle **One-Hot Encoding**—turning categories like 'City' or 'Color' into numbers so the mathematical engine of AI can process them.\n\n\`\`\`python\nfrom sklearn.preprocessing import StandardScaler\n\n# Scaling data for better AI performance\nscaler = StandardScaler()\nscaled_data = scaler.fit_transform(raw_data)\n\`\`\`\n\n### The Science of Feature Engineering\n\nWe will master **Feature Engineering**—the art of creating NEW variables from old ones. Imagine having 'Birth Year' and 'Current Year'. By subtracting them, you create 'Age'—a much more useful feature for the model. You'll also learn how to 'Impute' missing data, using averages to fill in the gaps so your model doesn't crash. \n\n:::PREPROCESSING PROTOCOL:::\nWe will build a 'Preprocessing Pipeline' that automates the cleaning of a messy dataset. By the end of this module, you'll be a **Data Preprocessing Specialist**, capable of turning chaotic, real-world information into high-quality AI fuel. You have completed the technical training of JSS 3 and are ready for the final Capstone Project. You are no longer just a 'student'; you are a **Data Engineer**. The future of AI is built on the foundation you are creating today.`,
            assignment: "Feature engineering", 
            pocketProject: "Preprocessing pipeline", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does 'Garbage In, Garbage Out' mean?", options: ["The computer needs cleaning", "Bad data leads to bad AI predictions", "Trash is useful", "AI is perfect"], correctAnswer: 1 },
              { text: "Putting all data on a similar scale (like 0 to 1) is called ____.", options: ["Naming", "Normalization / Scaling", "Subtraction", "Deleting"], correctAnswer: 1 },
              { text: "Turning text categories into numbers is called ____.", options: ["Scaling", "Encoding", "Printing", "Formatting"], correctAnswer: 1 },
              { text: "What is 'Feature Engineering'?", options: ["Building a keyboard", "Creating new, useful variables from existing data", "Deleting old features", "Using more memory"], correctAnswer: 1 },
              { text: "If a dataset is missing values, we can ____ them.", options: ["Delete the project", "Impute (fill in) with averages", "Ignore it", "Guess randomly"], correctAnswer: 1 },
              { text: "Why is data preparation the longest part of an AI project?", options: ["It is the hardest", "Real-world data is messy and needs careful cleaning", "Calculators are slow", "It is required for the screen"], correctAnswer: 1 },
              { text: "Scikit-Learn (sklearn) is a top library for ____.", options: ["Web design", "Machine Learning and Preprocessing", "Gaming", "Music"], correctAnswer: 1 },
              { text: "A 'Preprocessing Pipeline' is a series of steps that ____.", options: ["Create more bugs", "Automatically clean and prepare data", "Delete the data", "Stop the PC"], correctAnswer: 1 },
              { text: "Data Engineering is the foundation of ____.", options: ["AI and Data Science", "Social Media", "History", "Sports"], correctAnswer: 0 },
              { text: "Preparing data ensures that your model is ____.", options: ["Slow", "Accurate and Reliable", "Invisible", "Colorful"], correctAnswer: 1 }
            ]
          },
        ]
      },
      {
        id: "jss3-t3",
        name: "3rd Term – Capstone",
        lessons: [
          { 
            id: 1, 
            title: "Full Data Project", 
            topics: ["Scientific Method", "Hypothesis Testing", "Exploratory Data Analysis", "Presentation"],
            content: `### The Final Voyage\n\nWelcome to JSS 3 Term 3—the **Capstone Phase**. In the last two years, you've learned Python, Web Development, Databases, and AI Theory. Now, you will combine all these powers into your first **End-to-End Data Science Project**. This is no longer a 'practice exercise'; this is a real-world investigation using the same **Scientific Method** used by researchers at Harvard and MIT. \n\n### The Hypothesis and EDA\n\nA great project starts with a **Hypothesis**—a 'Question' about the world. Does social media usage affect sleep? Do students in certain cities perform better in math? You will then perform **Exploratory Data Analysis (EDA)**, using your Pandas and Plotly skills to find the initial clues in the data. You are a 'Data Detective', looking for the evidence that proves or disproves your hypothesis.\n\n\`\`\`python\n# Using EDA to test a hypothesis\ncorrelation = df['Screen_Time'].corr(df['Sleep_Hours'])\nif correlation < -0.5:\n    print("Significant negative link detected!")\n\`\`\`\n\n### The Art of the Report\n\nWe will explore **Scientific Writing**. It's not enough to 'know' the answer; you must be able to 'explain' it. You'll learn how to structure a report with an Introduction, Methodology, Results, and Conclusion. This transition from 'Writing code' to **Writing Insight** is the final step in becoming a professional. \n\n:::CAPSTONE PROTOCOL:::\nWe will build a 'Poll Result Analysis' project, taking raw survey data and turning it into a professional research report. By the end of this module, you'll be a **Research Engineer**, capable of using data to answer the world's most difficult questions. You are starting the final lap of your Junior Secondary journey. You have the tools, the logic, and the mindset. Now, show the world what the data is saying.`,
            assignment: "Hypothesis testing", 
            pocketProject: "Poll result analysis", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "A 'Hypothesis' is a ____.", options: ["Proven Fact", "Testable scientific question/prediction", "Random guess", "Type of script"], correctAnswer: 1 },
              { text: "What does EDA stand for?", options: ["Every Day Action", "Exploratory Data Analysis", "Electronic Digital Access", "Early Data Alert"], correctAnswer: 1 },
              { text: "The Scientific Method starts with an ____.", options: ["Answer", "Observation and Question", "Error", "Final Report"], correctAnswer: 1 },
              { text: "Finding the link between two variables is called ____.", options: ["Correlation", "Addition", "Subtraction", "Deletion"], correctAnswer: 0 },
              { text: "A professional report must include a ____ section describing HOW the study was done.", options: ["Intro", "Methodology", "Result", "Ending"], correctAnswer: 1 },
              { text: "Capstone projects combine ____.", options: ["One skill", "Everything you've learned in the curriculum", "Only CSS", "Only math"], correctAnswer: 1 },
              { text: "Hypothesis testing allows you to ____.", options: ["Ignore data", "Prove or disprove a prediction with evidence", "Delete files", "Change the screen"], correctAnswer: 1 },
              { text: "Why is 'Insight' more important than 'Code' in a project?", options: ["It is shorter", "It explains WHAT the data actually means for people", "It is only for Python", "It is free"], correctAnswer: 1 },
              { text: "A 'Data Detective' uses ____ to find clues.", options: ["Luck", "EDA and Logic", "A dictionary", "The internet only"], correctAnswer: 1 },
              { text: "The final step of the scientific method is to ____.", options: ["Close the PC", "Communicate the results", "Delete the code", "Start over"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Frontend + Backend Intro", 
            topics: ["Node.js", "Express.js", "Middleware", "JSON API"],
            content: `### Connecting the Worlds\n\nUntil now, we've built Front-end apps (the face) and Back-end scripts (the brain) separately. In this lesson, we learn how to connect them. This is the foundation of **Full-Stack Engineering**. You'll learn how a button on a website can send a request to a server, have the server calculate something, and send the result back. This is the cycle of **Client-Server Architecture**.\n\n### The Express Server\n\nWe will master **Express.js**, the most popular back-end framework for Node.js. You'll learn how to build 'Endpoints' (like \`/api/data\`) that serve information in the **JSON** format. You'll also explore **Middleware**—functions that check if a user is logged in or log the time of every request as it passes through the server. This is how professional websites handle millions of users securely.\n\n\`\`\`javascript\nconst express = require('express');\nconst app = express();\n\n// A simple API endpoint\napp.get('/api/greeting', (req, res) => {\n  res.json({ message: "Hello from the Back-end!" });\n});\n\napp.listen(3000, () => console.log("Server running!"));\n\`\`\`\n\n### Data Flow and Fetch\n\nWe will return to React and learn the \`fetch()\` command. You'll build a component that 'asks' the server for data when it loads. This is the transition from a 'Static' app to a **Dynamic System**. Imagine a weather app that gets live temperatures or a store that shows live stock levels. \n\n:::SYSTEM INTEGRATION PROTOCOL:::\nWe will build a 'Mini CRM System' where a React frontend saves student names to a real Express server. By the end of this module, you'll be a **Full-Stack Apprentice**, capable of building applications that span across different machines and languages. You are moving from 'isolated pieces' to **Integrated Ecosystems**, preparing for the complex systems you'll architecture in Senior Secondary school. The loop is closed.`,
            assignment: "Express server bascis", 
            pocketProject: "Mini CRM system", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Full-Stack' development?", options: ["Only CSS", "Combining Frontend and Backend architecture", "Only Python", "Buying a new PC"], correctAnswer: 1 },
              { text: "Which framework is used for Node.js backends?", options: ["React", "Express.js", "Pandas", "Plotly"], correctAnswer: 1 },
              { text: "What is an 'Endpoint'?", options: ["The end of a cable", "A specific URL path on a server (like /api/data)", "A hardware error", "A type of color"], correctAnswer: 1 },
              { text: "The format used to send data between apps is called ____.", options: ["Panda", "JSON", "Word", "Voice"], correctAnswer: 1 },
              { text: "What does 'Middleware' do?", options: ["Deletes the OS", "Processes requests as they pass through the server", "Changes the font", "Speeds up the mouse"], correctAnswer: 1 },
              { text: "The 'Client' in a web app is usually the ____.", options: ["Server", "User's Web Browser", "Network cable", "Keyboard"], correctAnswer: 1 },
              { text: "The 'Server' is responsible for ____.", options: ["Drawing colors", "Storing data and running heavy logic", "Making coffee", "Listening to music"], correctAnswer: 1 },
              { text: "Which JavaScript function 'calls' an API?", options: ["print()", "fetch()", "save()", "push()"], correctAnswer: 1 },
              { text: "Dynamic systems are different from static ones because ____.", options: ["They use more files", "They change based on live data from a server", "They are only for Python", "They are invisible"], correctAnswer: 1 },
              { text: "What does `app.listen(3000)` do?", options: ["Starts the server on port 3000", "Stops the PC", "Mutes the volume", "Deletes the variable"], correctAnswer: 0 }
            ]
          },
          { 
            id: 3, 
            title: "KPI Dashboard", 
            topics: ["Key Performance Indicators", "Data Aggregation", "Chart.js", "Business Intelligence"],
            content: `### The Commander's View\n\nSenior leaders in business and technology don't look at long lists of data; they look at **KPI Dashboards**. In this lesson, we learn how to build the ultimate monitoring tool. You'll learn how to aggregate data—turning a million sales into a single 'Total Revenue' number—and display it using beautiful, live charts. This is **Business Intelligence (BI)**.\n\n### Designing the Metrics\n\nWe will define what makes a good **Key Performance Indicator (KPI)**. You'll learn the 'S.M.A.R.T' goal framework: Specific, Measurable, Achievable, Relevant, and Time-bound. You'll use your React and Charting skills to build a 'Mission Control' for a business, showing things like 'Active Users', 'Growth Rate', and 'System Health'.\n\n\`\`\`javascript\n// Aggregating data for a dashboard KPI\nconst totalActiveUsers = users.filter(u => u.lastLogin > 24).length;\nconst growthRate = ((newUsers - oldUsers) / oldUsers) * 100;\n\`\`\`\n\n### Real-time Awareness\n\nWe will touch upon 'Streaming Data'—how apps update their charts automatically every few seconds without the user having to refresh the page. This is the difference between a 'Report' (looking at the past) and a 'Dashboard' (monitoring the present). You are learning to build systems that provide **Strategic Awareness**.\n\n:::BI ANALYST PROTOCOL:::\nWe will build a 'Live Metrics Display' that pulls data from your Express server and visualizes it in real-time. By the end of this lesson, you'll be a **Business Intelligence Developer**, capable of building the critical tools that CEOs use to run global companies. You are moving from 'Writing scripts' to **Building Value**, developing the executive mindset that understands the 'Why' behind the data. You are the architect of clarity.`,
            assignment: "Chart integration", 
            pocketProject: "Live metrics display", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does KPI stand for?", options: ["Key Performance Indicator", "Known Program Input", "Keyboard Pixel Increase", "Keep Playing Instead"], correctAnswer: 0 },
              { text: "A dashboard is used to ____.", options: ["Hide data", "Provide an instant overview of system performance", "Play videos", "Check emails only"], correctAnswer: 1 },
              { text: "Aggregation means ____.", options: ["Deleting data", "Combining many data points into a single summary (like a Total or Average)", "Multiplying values", "Changing colors"], correctAnswer: 1 },
              { text: "What is 'S.M.A.R.T' in goal-setting?", options: ["Fast and Small", "Specific, Measurable, Achievable, Relevant, Time-bound", "Secret, Meaningful, Acted, Result, Task", "Simple, Made, Awesome, Real, True"], correctAnswer: 1 },
              { text: "Business Intelligence (BI) is the field of ____.", options: ["Designing games", "Using data to make better business decisions", "Writing music", "Selling hardware"], correctAnswer: 1 },
              { text: "A 'Live' metric updates ____.", options: ["Once a year", "Automatically as data changes", "Only when you call", "Never"], correctAnswer: 1 },
              { text: "Which chart is best for showing a trend over time?", options: ["Pie Chart", "Line Chart", "List of names", "Background color"], correctAnswer: 1 },
              { text: "Strategic Awareness means ____.", options: ["Knowing your password", "Understanding the current state and future trends of a system", "Playing chess well", "Deleting errors"], correctAnswer: 1 },
              { text: "Why do CEOs use dashboards?", options: ["They like colors", "They need to make fast, evidence-based decisions", "They are required by law", "They don't have keyboards"], correctAnswer: 1 },
              { text: "Which library is common for React dashboards?", options: ["OS", "Recharts / Chart.js", "Shutil", "Time"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Prompt Engineering Intro", 
            topics: ["LLM Basics", "Context Windows", "Zero-shot vs Few-shot", "AI Assistance"],
            content: `### Talking to the Brains of the World\n\nWelcome to the newest frontier of technology: **Generative AI**. You've learned how to code computers; now you'll learn how to 'Talk' to them. Large Language Models (LLMs) like those powering ChatGPT or Gemini aren't programmed with rigid rules; they are coached with **Natural Language**. In this lesson, we master **Prompt Engineering**—the art of getting high-quality output from the most powerful machines ever built.\n\n### The Anatomy of a Prompt\n\nWe will explore the three pillars of a great prompt: **Role, Context, and Goal**. You'll learn that instead of just asking a question, you should 'Set the Stage'. For example: "You are a Senior Python Developer (Role). I am build a data app (Context). Optimize this loop for speed (Goal)." This precision is what separates a professional AI user from a beginner.\n\n\`\`\`text\n# Zero-shot (No examples)\nSummarize this text in 3 bullet points.\n\n# Few-shot (Providing examples)\nInput: Apple | Output: Fruit\nInput: Car | Output: Vehicle\nInput: Book | Output: \n\`\`\`\n\n### Context Windows and Tokens\n\nWe will learn how AI sees the world through **Tokens** (chunks of words) and the **Context Window** (the AI's 'Short-term Memory'). You'll learn how to use **Few-shot Prompting**—giving the AI examples of the answer you want—to drastically improve its accuracy. \n\n:::AI STRATEGY PROTOCOL:::\nWe will build an 'AI Helper Assistant' using specific prompt templates. By the end of this module, you'll be an **AI Orchestrator**, capable of leveraging Large Language Models to write code, analyze data, and accelerate your own learning. You are moving from 'Building Tools' to **Commanding Intelligence**. The era of AI is here; you are the one who knows how to direct it.`,
            assignment: "Context crafting", 
            pocketProject: "AI helper assistant", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is an LLM?", options: ["Last Lesson Module", "Large Language Model", "Local Loop Manager", "Light Logic Machine"], correctAnswer: 1 },
              { text: "Prompt Engineering is the art of ____.", options: ["Building a CPU", "Designing text inputs to get better results from AI", "Deleting code", "Buying a server"], correctAnswer: 1 },
              { text: "Giving the AI an example in the prompt is called ____.", options: ["Zero-shot", "Few-shot", "Fast-shot", "No-shot"], correctAnswer: 1 },
              { text: "The AI's 'Short-term Memory' limit is called its ____.", options: ["Hard drive", "Context Window", "Screen size", "Battery"], correctAnswer: 1 },
              { text: "What is a 'Token' in AI?", options: ["A coin", "A chunk of characters/words used by the AI to process text", "A type of password", "A keyboard key"], correctAnswer: 1 },
              { text: "Setting a 'Role' for the AI helps it ____.", options: ["Run faster", "Adopt a specific persona and expertise level", "Change its color", "Close the file"], correctAnswer: 1 },
              { text: "Which is a 'Good' prompt component?", options: ["Vague request", "Clear Context and Goal", "One-word input", "Angry tone"], correctAnswer: 1 },
              { text: "AI Hallucination is when an AI ____.", options: ["Sleeps", "Confidently provides incorrect information", "Runs very fast", "Deletes a file"], correctAnswer: 1 },
              { text: "Why is context important for AI?", options: ["It isn't", "It helps the AI understand the specific situation and constraints", "It makes the font larger", "It saves electricity"], correctAnswer: 1 },
              { text: "Generative AI creates ____.", options: ["Physical objects", "New content (Text, Images, Code) based on patterns", "Only errors", "Only math"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "ML Mini Model (Guided)", 
            topics: ["Scikit-learn Training", "Model Evaluation", "Accuracy vs Precision", "Predictions"],
            content: `### The Moment of Truth\n\nYou've studied the theory, prepared the data, and built the pipeline. Now, you will finally **Train a Model**. In this guided lesson, we use the industry-standard **Scikit-earn** library to build a 'Classifier'. This is a machine that looks at data and makes a prediction—like identifying a flower species or predicting if a student will pass a test.\n\n### The Training Cycle\n\nWe will explore the **Train/Test Split**. We never show the computer all the data at once; we hide some of it to 'Test' the computer later. You'll learn how to 'Fit' the model—allowing the mathematical algorithms to find the patterns in the data automatically. This is the 'Learning' phase of Machine Learning.\n\n\`\`\`python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\n# The ML workflow\nX_train, X_test, y_train, y_test = train_test_split(X, y)\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\`\`\`\n\n### Accuracy and Metrics\n\nHow do we know if our AI is 'Good'? We will learn about **Metrics**. You'll distinguish between **Accuracy** (how many were right?), **Precision** (how many of our 'Yes' were actually yes?), and **Recall**. Understanding these numbers is what separates a 'User' of AI from a **Data Scientist**. \n\n:::MODEL ENGINEER PROTOCOL:::\nWe will build a 'Flower Classifier' (Iris model) from start to finish. By the end of this lesson, you'll be a **Machine Learning Developer**, capable of taking a dataset and turning it into a working prediction engine. You have achieved one of the most difficult skills in modern technology. You are ready for your final presentation. You aren't just predicting the future; you are building the systems that calculate it.`,
            assignment: "Scikit-learn iris flow", 
            pocketProject: "Flower classifier", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What happens during 'Training' (fit)?", options: ["The computer deletes data", "The AI model finds mathematical patterns in the data", "The screen turns off", "The user types the code"], correctAnswer: 1 },
              { text: "Why do we hide 'Test Data' from the model?", options: ["To see if it can handle data it hasn't seen before", "To save space", "The computer is too fast", "It's a secret"], correctAnswer: 0 },
              { text: "What is 'Accuracy'?", options: ["The speed of the model", "The percentage of correct predictions", "The size of the data", "The font used"], correctAnswer: 1 },
              { text: "Scaling data before training helps to ____.", options: ["Slow down the AI", "Ensure all features have a fair chance to influence the model", "Delete duplicate rows", "Change the color"], correctAnswer: 1 },
              { text: "A 'Classifier' predicts ____.", options: ["A exact number (like 3.5)", "A category (like 'Spam' or 'Inbox')", "A person's name", "The current time"], correctAnswer: 1 },
              { text: "Scikit-Learn (sklearn) is used for ____.", options: ["Web layout", "Machine Learning in Python", "Drawing shapes", "Email"], correctAnswer: 1 },
              { text: "Predicting a house price is a ____ task.", options: ["Classification", "Regression", "Deleting", "Naming"], correctAnswer: 1 },
              { text: "Predicting if an image is a dog is a ____ task.", options: ["Classification", "Regression", "Math", "Reading"], correctAnswer: 0 },
              { text: "Precision tells us ____.", options: ["How many total right", "How accurate the 'Positive' predictions were", "The file size", "The internet speed"], correctAnswer: 1 },
              { text: "Machine Learning is based on ____.", options: ["Magic", "Statistics and Math", "Luck", "Text messages"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "Final Presentation Project", 
            topics: ["Technical Pitching", "Demo Techniques", "System Architecture", "Future Roadmap"],
            content: `### The Final Standing\n\nCongratulations. You have reached the graduation point of the JSS Computer Science and AI curriculum. In this final lesson, we learn how to **Present Your Work**. A senior engineer isn't just someone who codes; they are someone who can explain their vision to others. You will take everything you've built this year and prepare a professional **Technical Presentation**.\n\n### The Art of the Demo\n\nWe will master **Live Demoing**. You'll learn how to show your code, your dashboard, and your AI model in a way that 'Wows' the audience. You'll practice explaining your **System Architecture**—how the Frontend, Backend, Database, and ML model all work together as a single organism. This is the **High-Level Thinking** required for Senior Secondary school and the professional world.\n\n\`\`\`text\n# Final Presentation Checklist\n1. The Problem: What are we solving?\n2. The Solution: How does our code solve it?\n3. The Tech Stack: What tools did we use?\n4. The Demo: Show it in action!\n5. The Impact: Why does this matter?\n\`\`\`\n\n### The Roadmap of Your Future\n\nWe will finalize your **Student Portfolio**. You'll learn how to host your code on GitHub and document your journey. We'll also look ahead at the SSS curriculum: Deep Learning, Advanced Web Systems, and Professional Data Engineering. You are no longer a beginner. You have the logic, the skills, and the projects to prove it. \n\n:::GRADUATION PROTOCOL:::\nWe will record a 'Capstone Demo Video' of your final project. By the end of this module, you'll be a **Junior Tech Leader**, ready to enter Senior Secondary school with a competitive edge. You have completed the foundation. You are a builder of the future. The digital world is yours to create. Welcome to the next level.`,
            assignment: "Pitch deck", 
            pocketProject: "Capstone demo video", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the goal of a Technical Presentation?", options: ["To confuse the user", "To clearly communicate how a complex system works and why it matters", "To show only the code", "To talk very fast"], correctAnswer: 1 },
              { text: "System Architecture explains ____.", options: ["The colors used", "How different parts of an app (FE, BE, DB) connect together", "The weight of the PC", "The price of the mouse"], correctAnswer: 1 },
              { text: "A 'Demo' is used to ____.", options: ["Delete the app", "Show the working application in real-time", "Write more text", "Hide bugs"], correctAnswer: 1 },
              { text: "What should be the first part of a tech pitch?", options: ["The price", "The Problem you are solving", "The credits", "A song"], correctAnswer: 1 },
              { text: "Hosting your code on GitHub helps build your ____.", options: ["Storage", "Professional Portfolio", "Music list", "Email count"], correctAnswer: 1 },
              { text: "Technical Communication is the skill of ____.", options: ["Typing fast", "Explaining complex tech to others clearly", "Using big words", "Muting the mic"], correctAnswer: 1 },
              { text: "A 'Roadmap' describes ____.", options: ["Street names", "Future plans and improvements for a project", "The current bugs", "The history of the PC"], correctAnswer: 1 },
              { text: "The 'Impact' of a project is ____.", options: ["How loud it is", "How it helps people or solves a real-world problem", "The screen size", "The background color"], correctAnswer: 1 },
              { text: "Graduating the JSS curriculum makes you a ____.", options: ["Gamer", "Junior Tech Leader", "Student only", "User"], correctAnswer: 1 },
              { text: "What is the next level after JSS?", options: ["Primary", "SSS (Senior Secondary School)", "University only", "Kindergarten"], correctAnswer: 1 }
            ]
          },
        ]
      }
    ]
  },
  {
    id: "sss1",
    name: "SSS 1",
    icon: "🔵",
    color: "indigo",
    terms: [
      {
        id: "sss1-t1",
        name: "1st Term – Advanced Python & Data",
        lessons: [
          { 
            id: 1, 
            title: "Advanced OOP", 
            topics: ["Multiple Inheritance", "Decorators", "Abstract Base Classes", "Properties"],
            content: `### The Architecture of the Pro\n\nWelcome to Senior Secondary Computer Science. In JSS 3, you learned the basics of Classes and Objects. Now, we dive into **Advanced Object-Oriented Programming (OOP)**. This is how professional engineers build large, scalable systems like the banking software, social media backends, and game engines used globally. We are moving from 'Coding' to **Software Architecture**.\n\n### Decorators and Properties\n\nWe will master **Decorators**—special functions that 'wrap' another function to change its behavior without modifying its source code. This is used for logging, security checks, and timing your code. We also explore the **@property** decorator, which allows you to treat a method like a simple variable. This is the foundation of **Encapsulation**, ensuring that data inside your class is protected and accessed correctly.\n\n\`\`\`python\nclass BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n\n    @property\n    def balance(self):\n        """Only allow viewing balance, not direct editing."""\n        return self._balance\n\n    @balance.setter\n    def balance(self, value):\n        if value < 0:\n            raise ValueError("Balance cannot be negative!")\n        self._balance = value\n\`\`\`\n\n### Multiple Inheritance and ABCs\n\nWe will tackle **Multiple Inheritance**—allowing a class to inherit features from more than one parent—and **Abstract Base Classes (ABCs)**. ABCs act as 'Blueprints' that cannot be used on their own; they force other classes to follow a specific structure. This is critical for building **Plugin Systems** and Ensuring 'Interface Consistency' across a team of developers.\n\n:::SENIOR ARCHITECT PROTOCOL:::\nWe will build a 'Plugin Manager' that uses abstract classes to allow different modules to be plugged in and out of a main application. By the end of this lesson, you'll be a **Python Architect**, capable of designing systems that are not just working, but are 'Maintainable' and 'Extensible'. You are moving from 'How it works' to **How it is structured**, developing the high-level thinking required for professional software engineering. Design is just as important as logic.`,
            assignment: "Decorators and Properties", 
            pocketProject: "Plugin manager", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does the @property decorator do?", options: ["Deletes the class", "Allows a method to be accessed like a variable (attribute)", "Makes the code run in a loop", "Changes the font"], correctAnswer: 1 },
              { text: "What is an 'Abstract Base Class' (ABC)?", options: ["A class that does nothing", "A blueprint class that cannot be instantiated and forces structure on children", "A class only for numbers", "A type of virus"], correctAnswer: 1 },
              { text: "Multiple Inheritance allows a class to ____.", options: ["Have many objects", "Inherit from more than one parent class", "Run many times", "Delete its parents"], correctAnswer: 1 },
              { text: "A 'Decorator' is used to ____.", options: ["Draw on the screen", "Modify the behavior of a function without changing its source", "Hide errors", "Multiply variables"], correctAnswer: 1 },
              { text: "Encapsulation is the principle of ____.", options: ["Writing long code", "Protecting internal data from direct outside access", "Deleting files", "Using more memory"], correctAnswer: 1 },
              { text: "The '@balance.setter' allows you to ____.", options: ["Delete the balance", "Run code when a property value is changed", "Print the balance", "Hide the balance"], correctAnswer: 1 },
              { text: "Why are ABCs useful in teams?", options: ["They are shorter", "They ensure all team members follow the same interface/structure", "They are only for Python", "They save electricity"], correctAnswer: 1 },
              { text: "Inheriting from multiple parents can lead to the ____ problem.", options: ["Slow loop", "Diamond Problem (MRO)", "Fast crash", "Memory loss"], correctAnswer: 1 },
              { text: "A 'Mixins' is a type of ____.", options: ["Food", "Incomplete class used to add specific features to others", "Error", "Variable"], correctAnswer: 1 },
              { text: "Professional code is judged by its ____.", options: ["Length", "Architecture and Maintainability", "Color", "Complexity only"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Data Structures Deep Dive", 
            topics: ["Linked Lists", "Complexity Analysis", "Memory Layouts", "Stacks and Queues"],
            content: `### Thinking Like the Machine\n\nIn JSS, we used Lists and Dictionaries. In Senior Secondary, we learn how they actually work inside the RAM. This is **Data Structures Deep Dive**. A senior engineer doesn't just store data; they choose the 'Perfect Container' for that data to ensure the application is lightning fast and memory efficient. This is the difference between an app that crashes and one that scales to billions of users.\n\n### Linked Lists and Memory\n\nWe will explore **Linked Lists**. Unlike a standard array, where data is stored side-by-side, a Linked List stores data anywhere in memory, with each piece 'Pointing' to the next. You'll learn the trade-offs: Linked Lists are great for adding data quickly but slow for searching. Understanding this **Memory Management** is the key to passing technical interviews at companies like Google and Microsoft.\n\n\`\`\`python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None # The pointer to the next memory block\n\`\`\`\n\n### Big O and Efficiency\n\nWe will introduce **Complexity Analysis (Big O Notation)**. This is the mathematical language used to describe how fast an algorithm is as the data grows. You'll learn why a 'Nested Loop' (O(n²)) can be 1,000 times slower than a 'Hash Map' (O(1)) when handling millions of records. This is **Algorithmic Thinking**.\n\n:::DATA ENGINEER PROTOCOL:::\nWe will build a 'Queue/Stack Visualizer' that shows how data moves through memory in real-time. By the end of this module, you'll be a **Data Systems Specialist**, capable of optimizing even the most complex applications for speed. You are moving from 'Storing' data to **Optimizing** it, developing the deep technical intuition needed to build high-performance software. Every byte counts.`,
            assignment: "Linked lists vs Arrays", 
            pocketProject: "Queue/Stack visualizer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Big O Notation'?", options: ["The size of the file", "A mathematical way to describe code efficiency (speed/memory)", "A type of font", "A brand of computer"], correctAnswer: 1 },
              { text: "In a 'Linked List', each item is called a ____.", options: ["Link", "Node", "Block", "Point"], correctAnswer: 1 },
              { text: "Which structure follows 'First-In, First-Out' (FIFO)?", options: ["Stack", "Queue", "Tree", "Array"], correctAnswer: 1 },
              { text: "Which structure follows 'Last-In, First-Out' (LIFO)?", options: ["Queue", "Stack", "Map", "Link"], correctAnswer: 1 },
              { text: "A pointer in a node tells the computer ____.", options: ["The color of data", "The memory address of the next item", "The price of the RAM", "The time"], correctAnswer: 1 },
              { text: "Searching a standard list has a complexity of ____.", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correctAnswer: 1 },
              { text: "Adding to the front of a Linked List is ____ than an Array.", options: ["Slower", "Faster", "The same", "Harder"], correctAnswer: 1 },
              { text: "RAM stands for ____.", options: ["Read All Memory", "Random Access Memory", "Run Action Mode", "Rapid Access Module"], correctAnswer: 1 },
              { text: "Which structure is best for an 'Undo' button?", options: ["Queue", "Stack (LIFO)", "Tree", "CSV"], correctAnswer: 1 },
              { text: "Modern software performance is mostly about ____.", options: ["Keyboard speed", "Data structure choice and memory management", "Screen brightness", "Typing long names"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Algorithms", 
            topics: ["Binary Search", "Quick Sort", "Merge Sort", "Recursion", "Big O"],
            content: `### The Logic of the Greats\n\nHow does Google find one website among trillions in milliseconds? How does Spotify sort millions of songs instantly? They use **Algorithms**. In this lesson, we master the most famous algorithms in computer science history. we move beyond simply 'Doing' a task and learn how to do it with **Mathematical Efficiency**. \n\n### Searching and Sorting Mastery\n\nWe will explore **Binary Search**—a 'Divide and Conquer' algorithm that can find an item in a sorted list of 1 billion items in just 30 steps. You'll compare local 'Bubble Sort' (slow) with industrial-grade **Quick Sort** and **Merge Sort** (fast). Understanding the difference between O(n) and O(log n) is what separates a programmer from a **Computer Scientist**.\n\n\`\`\`python\n# Binary Search Logic (Divide and Conquer)\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1\n\`\`\`\n\n### The Power of Recursion\n\nWe will tackle **Recursion**—the process of a function calling itself to solve smaller versions of the same problem. You'll learn how to think 'Fractally', breaking down complex tasks into simple, repeating steps. This is the key to solving difficult problems like maze-solving, file system traversal, and complex AI tree-searching. \n\n:::ALGORITHM ARCHITECT PROTOCOL:::\nWe will build a 'Maze Solver' using recursion and a complexity test to compare different sorting methods. By the end of this module, you'll be an **Efficiency Engineer**, capable of choosing and implementing the most optimal algorithm for any data problem. You are moving from 'Step-by-Step' logic to **Strategic Logic**, developing the deep problem-solving abilities needed for top-tier technology roles. Efficiency is the ultimate elegance.`,
            assignment: "Recursion depth test", 
            pocketProject: "Maze solver", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Divide and Conquer'?", options: ["Deleting the code", "Breaking a large problem into smaller pieces and solving them", "Using more RAM", "A type of virus"], correctAnswer: 1 },
              { text: "Binary Search requires the data to be ____.", options: ["Random", "Sorted", "Large", "Deleted"], correctAnswer: 1 },
              { text: "What is the time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctAnswer: 1 },
              { text: "What is 'Recursion'?", options: ["A function calling itself", "A for-loop", "An error", "A type of variable"], correctAnswer: 0 },
              { text: "Which sorting algorithm is usually fastest for large data?", options: ["Bubble Sort", "Merge/Quick Sort", "Random Sort", "Slow Sort"], correctAnswer: 1 },
              { text: "The complexity O(n²) usually indicates ____.", options: ["Very fast code", "Nested loops (slow for large data)", "Simple addition", "A dictionary"], correctAnswer: 1 },
              { text: "A 'Base Case' in recursion prevents ____.", options: ["The code from starting", "Infinite loops (Stack Overflow)", "The font from changing", "The user from typing"], correctAnswer: 1 },
              { text: "Which algorithm is like searching a dictionary by splitting it in half?", options: ["Linear Search", "Binary Search", "Random Search", "Sorting"], correctAnswer: 1 },
              { text: "Sorting data first makes ____ much faster.", options: ["Addition", "Searching", "Printing", "Formatting"], correctAnswer: 1 },
              { text: "Computer scientists value algorithms that are ____.", options: ["Long", "Scalable and Efficient", "Secret", "Expensive"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Numpy", 
            topics: ["N-dimensional Arrays", "Vectorization", "Broadcasting", "Linear Algebra"],
            content: `### The Foundation of AI Math\n\nPython is a great language, but for heavy math, it can be slow. Welcome to **NumPy** (Numerical Python), the high-performance library that handles trillions of calculations per second. In this lesson, we learn how to master **N-dimensional Arrays (ndarrays)**. If you want to work in Artificial Intelligence, Rocket Science, or Finance, NumPy is the first tool you must master. This is **Computational Engineering**.\n\n### Vectorization and Speed\n\nWe will explore **Vectorization**. Traditional Python loops are slow because the computer has to 're-think' every step. NumPy uses pre-compiled C code to perform operations on entire arrays at once. You'll learn why adding 1 million numbers in NumPy is 50 times faster than a standard loop. This is the difference between an AI that learns in a day and one that takes a year.\n\n\`\`\`python\nimport numpy as np\n\n# Performing a calculation on 1 million items at once\narr = np.array([1, 2, 3, 4, 5])\nresult = arr * 2 # Fast vectorized multiplication\nprint(result.mean()) # Instant statistical analysis\n\`\`\`\n\n### Broadcasting and Tensors\n\nWe will tackle **Broadcasting**—how NumPy allows math between arrays of different shapes—and the basics of **Tensors** (multi-dimensional arrays). You'll learn how to treat images as arrays of numbers, allowing you to manipulate pixels, adjust brightness, and apply filters using math. This is the foundation of **Computer Vision**.\n\n:::NUMERICAL ARCHITECT PROTOCOL:::\nWe will build an 'Image Filter Engine' that uses NumPy math to change the colors and brightness of a digital photo. By the end of this module, you'll be a **NumPy Power User**, capable of handling the massive numerical datasets required for modern AI research. You are moving from 'Basic Variables' to **High-Dimensional Data**, preparing for the tensor operations of TensorFlow and PyTorch. Numbers are the language of reality; NumPy is the translator.`,
            assignment: "Tensor operations", 
            pocketProject: "Image filter engine", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does NumPy stand for?", options: ["Number Python", "Numerical Python", "New Python", "Next Python"], correctAnswer: 1 },
              { text: "The primary data structure in NumPy is the ____.", options: ["List", "ndarray (N-dimensional array)", "Tuple", "Dict"], correctAnswer: 1 },
              { text: "Why is NumPy faster than standard Python loops?", options: ["It uses more files", "It uses pre-compiled C code and vectorized operations", "It has colors", "It is only for SSS students"], correctAnswer: 1 },
              { text: "What is 'Vectorization'?", options: ["Drawing lines", "Applying an operation to an entire array at once without loops", "Deleting data", "Printing data"], correctAnswer: 1 },
              { text: "A digital image can be represented as a ____ array in NumPy.", options: ["1D", "3D (Height, Width, Color Channels)", "Random", "Invisible"], correctAnswer: 1 },
              { text: "What is 'Broadcasting'?", options: ["Watching TV", "Performing math between arrays of different shapes", "Sharing code", "Restarting the PC"], correctAnswer: 1 },
              { text: "Calculating the 'Mean' of an array gives you the ____.", options: ["Total", "Average", "Minimum", "Maximum"], correctAnswer: 1 },
              { text: "NumPy is the foundation for which field?", options: ["Data Science and AI", "Social Media Management", "History", "Graphic Design only"], correctAnswer: 0 },
              { text: "What happens when you multiply a NumPy array by 2?", options: ["It gets 2 times longer", "Every number inside is multiplied by 2 instantly", "It creates an error", "It deletes the array"], correctAnswer: 1 },
              { text: "Which library works most closely with NumPy for data tables?", options: ["Word", "Pandas", "Paint", "Chrome"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Pandas", 
            topics: ["Multi-Index", "Merging Datasets", "Time Series", "Window Functions"],
            content: `### The Command Center of Data\n\nYou've used Pandas for basic analysis. Now, we master **Professional Data Engineering**. In the real world, data doesn't come in one clean file. It's scattered across different systems, time zones, and formats. In this lesson, we learn how to join these pieces together and analyze them like a professional Data Architect. This is **Data Sovereignty**.\n\n### Merging and Joining\n\nWe will explore **Merging and Joining Datasets**. You'll learn the difference between 'Inner', 'Outer', 'Left', and 'Right' joins—the logic used to connect tables from different departments into a single source of truth. This is critical for building **Data Lakes** and enterprise-scale reporting systems.\n\n\`\`\`python\nimport pandas as pd\n\n# Joining two massive datasets together\nus-sales = pd.read_csv("usa.csv")\neuro-sales = pd.read_csv("europe.csv")\nglobal_data = pd.concat([us-sales, euro-sales])\n\n# Advanced merging on keys\nfinal_report = pd.merge(sales, stock, on="ProductID", how="inner")\n\`\`\`\n\n### Time Series and Window Functions\n\nWe will tackle **Time Series Analysis**. You'll learn how to analyze trends over weeks, months, and years—calculating 'Rolling Averages' and 'Growth Streaks'. This is the foundation of **Predictive Analytics**. We also explore **Multi-Indexing**, allowing you to create complex, hierarchical tables that can represent several dimensions of data at once.\n\n:::DATA ARCHITECT PROTOCOL:::\nWe will build a 'Global Data Parser' that joins three separate geographical datasets and performs a window analysis to find growth trends. By the end of this module, you'll be a **Senior Data Analyst**, capable of handling the most complex data structures in modern business. You are moving from 'Reading tables' to **Engineering Knowledge**, developing the analytical depth needed to lead data-driven organizations. Context is everything.`,
            assignment: "Join 3 massive datasets", 
            pocketProject: "Global data parser", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Join' in Pandas?", options: ["Adding a number", "Connecting two datasets based on a common column (key)", "Deleting a file", "Closing the app"], correctAnswer: 1 },
              { text: "An 'Inner Join' only keeps data that is ____.", options: ["In both datasets", "In the first dataset only", "In the second dataset only", "Nowhere"], correctAnswer: 0 },
              { text: "An 'Outer Join' keeps data that is ____.", options: ["In both datasets (full set)", "Only in the first", "Only in the second", "In the trash"], correctAnswer: 0 },
              { text: "What is 'Time Series Analysis'?", options: ["Measuring how fast a loop is", "Analyzing data that changes over time", "Setting an alarm", "Deleting a clock"], correctAnswer: 1 },
              { text: "A 'Rolling Average' helps to ____.", options: ["Slow down data", "Smooth out noise and see long-term trends", "Multiply data", "Hide the mean"], correctAnswer: 1 },
              { text: "Multi-Indexing allows a table to have ____.", options: ["One row", "Hierarchical structure (sub-categories under main ones)", "No names", "Only one column"], correctAnswer: 1 },
              { text: "Which function combines two DataFrames vertically?", options: ["pd.merge", "pd.concat", "pd.add", "pd.zip"], correctAnswer: 1 },
              { text: "Why is data joining essential for companies?", options: ["They only have one file", "Valuable information is often split across different departments and systems", "It makes code prettier", "It's a secret"], correctAnswer: 1 },
              { text: "A 'Left Join' keeps all data from the ____ dataset.", options: ["First (left) one", "Second (right) one", "Smaller one", "Newest one"], correctAnswer: 0 },
              { text: "Professional data engineering is about building a ____.", options: ["Wall", "Single Source of Truth", "New keyboard", "Simple list"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "Intro to Machine Learning", 
            topics: ["ML Lifecycle", "Overfitting vs Underfitting", "Validation Sets", "Model Evaluation"],
            content: `### Beyond the Buzzwords\n\nWelcome to the final milestone of SSS 1 Term 1. You've mastered the math (NumPy) and the data (Pandas). Now, we enter the world of **Professional Machine Learning**. In this lesson, we move beyond just 'Using' an AI model and learn the **Engineering Science** behind how they are built, validated, and optimized for the real world. This is **Model Stewardship**.\n\n### The ML Lifecycle and Validation\n\nWe will explore the **Machine Learning Lifecycle**—from data collection and preprocessing to training and **Model Maintenance**. You'll learn about the **Validation Set**—a third set of data used to 'Tweak' the model before the final exam. This 'Double-Blind' testing is what ensures that an AI works just as well in the real world as it did in the laboratory.\n\n\`\`\`python\n# The Advanced ML Workflow\n# Split into 3: Train (for learning), Val (for tuning), Test (for final grade)\ntrain, temp = train_test_split(df, test_size=0.4)\nval, test = train_test_split(temp, test_size=0.5)\n\`\`\`\n\n### Overfitting and the Bias-Variance Tradeoff\n\nWe will tackle **Overfitting**—the most common failure in AI. This happens when a model 'Memorizes' the training data instead of 'Learning' the patterns. You'll learn how to detect this and fix it using techniques like **Regularization**. You'll also explore the **Bias-Variance Tradeoff**, the fundamental balance between a model being too simple and being too complex.\n\n:::MODEL SCIENTIST PROTOCOL:::\nWe will build a 'Simple Regressor' and perform a 'Theory Review' of the most common AI failure points. By the end of this module, you'll be a **Machine Learning Associate**, possessing the deep theoretical knowledge required for advanced model development in SSS 2 and SSS 3. You are moving from 'Following tutorials' to **Scientific Research**, developing the critical and analytical mindset that separates an AI user from an **AI Creator**. The data has stories to tell; you are learning how to prove them.`,
            assignment: "Theory review", 
            pocketProject: "Simple regressor", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Overfitting'?", options: ["The computer is too hot", "When a model memorizes data instead of learning patterns (fails on new data)", "When the code is too short", "When the font is too big"], correctAnswer: 1 },
              { text: "What is the 'Validation Set' used for?", options: ["The final grade", "Tuning the model and choosing hyperparameters during training", "Deleting data", "Printing data"], correctAnswer: 1 },
              { text: "What is 'Stewardship' in AI?", options: ["Selling AI", "Responsibility for the accuracy and safety of a model", "Writing fast code", "Muting the mic"], correctAnswer: 1 },
              { text: "The Bias-Variance Tradeoff is the balance between ____ and ____.", options: ["Input and Output", "Simplicity and Complexity", "Fast and Slow", "Price and Quality"], correctAnswer: 1 },
              { text: "Underfitting happens when a model is ____.", options: ["Too complex", "Too simple (missing the patterns)", "Too fast", "Invisible"], correctAnswer: 1 },
              { text: "Which technique helps prevent Overfitting?", options: ["Regularization", "Deleting the code", "Ignoring the error", "Buying more RAM"], correctAnswer: 0 },
              { text: "The ML Lifecycle ends with ____.", options: ["Training", "Deployment and Continuous Monitoring", "The first prediction", "Closing the PC"], correctAnswer: 1 },
              { text: "A model that works perfectly on training data but fails in the real world is ____.", options: ["A success", "Overfitted", "Broken hardware", "Too simple"], correctAnswer: 1 },
              { text: "Data collection is often the ____ step in the ML lifecycle.", options: ["Final", "Initial", "Optional", "Shortest"], correctAnswer: 1 },
              { text: "Scientific Research in AI requires ____.", options: ["Luck", "Rigorous testing and evidence", "Guessing", "A lot of text"], correctAnswer: 1 }
            ]
          },
        ]
      },
      {
        id: "sss1-t2",
        name: "2nd Term – Machine Learning Foundations",
        lessons: [
          { 
            id: 1, 
            title: "Data Cleaning", 
            topics: ["Z-score Outlier Detection", "IQR Method", "KNN Imputer", "SimpleImputer"],
            content: `### The Purge of Chaos\n\nYou've heard the saying "Garbage In, Garbage Out," but in SSS 1, we learn how to ensure the garbage never gets into the system. Professional Data Science is 80% cleaning and 20% modeling. In this lesson, we master **Data Cleaning** using statistical methods that ensure your AI models are trained on pure, high-quality information. This is **Data Governance**.\n\n### Outlier Detection (Z-score & IQR)\n\nWe will explore **Outliers**—data points that are so far from the average they can 'Confuse' your AI. You'll learn the **Z-score** method (measuring how many Standard Deviations a point is from the mean) and the **Interquartile Range (IQR)** method. Learning to identify and 'Handle' these anomalies—whether by deleting them or capping them—is what makes your predictions reliable.\n\n\`\`\`python\nimport numpy as np\nfrom scipy import stats\n\n# Detecting outliers using Z-score\nz_scores = stats.zscore(df['Price'])\nabs_z_scores = np.abs(z_scores)\nfiltered_entries = (abs_z_scores < 3)\nnew_df = df[filtered_entries]\n\`\`\`\n\n### Advanced Imputation\n\nWe will tackle **Missing Data** with professional tools. Instead of just filling zeros, you'll learn to use **SimpleImputer** (for averages) and the **KNN Imputer**, which uses the 'K-Nearest Neighbors' algorithm to guess what a missing value should be based on similar data points. This is **Statistical Accuracy**.\n\n:::DATA SURGEON PROTOCOL:::\nWe will build an 'Auto-cleaner API' that automatically detects outliers and imputes missing data in any uploaded dataset. By the end of this module, you'll be a **Data Cleaning Specialist**, capable of taking the messiest real-world datasets and transforming them into 'Clean Gold' for machine learning. You are moving from 'Basic scripts' to **Professional Pipelines**, developing the high-precision mindset needed for industrial data science. Clean data is power.`,
            assignment: "Outlier detection", 
            pocketProject: "Auto-cleaner API", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "A Z-score tells us ____.", options: ["How many standard deviations a point is from the mean", "The total price", "The file size", "The time"], correctAnswer: 0 },
              { text: "What is an 'Outlier'?", options: ["A normal data point", "An extreme value that deviates significantly from the rest of the data", "An error in the code", "A type of chart"], correctAnswer: 1 },
              { text: "The IQR method uses which percentiles?", options: ["10th and 90th", "25th and 75th", "50th and 100th", "1st and 2nd"], correctAnswer: 1 },
              { text: "What does an 'Imputer' do?", options: ["Deletes data", "Fills in missing values using statistical strategies", "Speeds up the CPU", "Changes the font"], correctAnswer: 1 },
              { text: "KNN Imputation is based on ____.", options: ["Random guessing", "Values from similar records in the dataset", "A dictionary", "The date"], correctAnswer: 1 },
              { text: "What is the 'Purge of Chaos'?", options: ["A game", "The process of removing errors and noise from a dataset", "A type of loop", "A hardware error"], correctAnswer: 1 },
              { text: "Handling outliers before training helps to ____.", options: ["Slow down the AI", "Ensure the model isn't 'Confused' by extreme errors", "Delete the project", "Change the color"], correctAnswer: 1 },
              { text: "Professional data cleaning takes up about ____ of a project.", options: ["10%", "80%", "50%", "100%"], correctAnswer: 1 },
              { text: "SimpleImputer (mean) replaces missing values with the ____.", options: ["Minimum", "Average", "Maximum", "Zero"], correctAnswer: 1 },
              { text: "Data Governance is about ____.", options: ["Buying servers", "The management and quality control of data assets", "Writing emails", "Playing games"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Data Processing", 
            topics: ["Standardization", "Normalization", "One-Hot Encoding", "Label Encoding"],
            content: `### The Language of Logistics\n\nAI models are essentially giant math equations. To speak to them, we must translate our human data (names, categories, mixed numbers) into a unified mathematical format. This is **Data Processing**. In this lesson, we master the 'Scientific Translation' of data, ensuring that every variable in your model is balanced and ready for calculation. This is **Feature Normalization**.\n\n### Scaling: Standard vs Min-Max\n\nWe will explore **Scaling**. Imagine comparing 'Age' (0-100) and 'Salary' (0-1,000,000). A computer will think Salary is 10,000 times more 'Important' simply because the numbers are bigger. You'll learn to use **StandardScaler** (to center data around a mean of 0) and **MinMaxScaler** (to squish data between 0 and 1). This ensures that your model treats every feature with 'Fairness'.\n\n\`\`\`python\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\n# Standardization for balanced math\nscaler = StandardScaler()\nprocessed_data = scaler.fit_transform(raw_numeric_data)\n\n# Encoding categories into binary vectors\nencoder = OneHotEncoder()\ncategorical_data = encoder.fit_transform(df[['City']])\n\`\`\`\n\n### Encoding Categories\n\nWe will tackle **Category Encoding**. Computers can't calculate 'Lagos' + 'Abuja'. You'll learn **Label Encoding** (0, 1, 2) and **One-Hot Encoding** (creating separate columns for each category). Understanding which one to use is the difference between a working model and one that fails to learn. \n\n:::FEATURE ENGINEER PROTOCOL:::\nWe will build an 'Encoder Service' that takes mixed categorical and numerical data and returns a fully processed tensor ready for training. By the end of this module, you'll be a **Feature Engineering Specialist**, capable of preparing data for even the most advanced Deep Learning models. You are moving from 'Raw Information' to **Calculated Features**, developing the precision mindset needed for high-stakes AI development. Logic is in the balance.`,
            assignment: "Label encoding", 
            pocketProject: "Encoder service", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "Why do we scale numerical data?", options: ["To make the file smaller", "To ensure all features have a balanced influence on the model math", "To change the font", "To save energy"], correctAnswer: 1 },
              { text: "StandardScaler transforms data to have a mean of ____.", options: ["1", "0", "100", "-1"], correctAnswer: 1 },
              { text: "MinMaxScaler squishes data between which values?", options: ["0 and 1", "-1 and 1", "0 and 100", "Min and Max"], correctAnswer: 0 },
              { text: "One-Hot Encoding is used to ____.", options: ["Heat up the PC", "Turn categorical text into binary (0/1) columns", "Delete rows", "Multiply numbers"], correctAnswer: 1 },
              { text: "Label Encoding turns text into ____.", options: ["Images", "Integers (0, 1, 2...)", "Random characters", "Voice"], correctAnswer: 1 },
              { text: "Which encoder creates 'One' column per category item?", options: ["Label Encoder", "One-Hot Encoder", "Scaling Encoder", "Text Encoder"], correctAnswer: 1 },
              { text: "What is 'Feature Fairness'?", options: ["Giving every student an A", "Ensuring no feature dominates the model due to its scale", "Buying new hardware", "Deleting bugs"], correctAnswer: 1 },
              { text: "Calculated Features are ____.", options: ["Errors", "Data that has been processed and prepared for math", "A list of names", "A type of loop"], correctAnswer: 1 },
              { text: "Deep Learning models require data to be in ____ format.", options: ["CSV", "Tensor / Numerical Matrix", "Word", "Email"], correctAnswer: 1 },
              { text: "What is 'Feature Engineering'?", options: ["Building a keyboard", "The process of preparing and transforming raw data for AI", "Deleting code", "Buying a mouse"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Matplotlib", 
            topics: ["Object-Oriented API", "Subplots", "Heatmaps", "Custom Styling"],
            content: `### The Art of the Insight\n\nIn JSS, you made simple charts. In Senior Secondary, we learn how to create publication-quality visualizations that can be used in scientific papers and corporate reports. This is **Visual Analytics**. In this lesson, we master the **Object-Oriented API** of Matplotlib, allowing you to control every single pixel, line, and color on your charts. This is **Data Aesthetics**.\n\n### Figures, Axes, and Subplots\n\nWe will explore the hierarchy of Matplotlib. You'll learn to create a **Figure** (the canvas) and multiple **Axes** (the individual charts). This allows you to build complex 'Subplot' layouts where you can compare several variables at once—like showing 'Sales', 'Profit', and 'Loss' in three different charts on the same screen. This is the foundation of professional **Dashboards**.\n\n\`\`\`python\nimport matplotlib.pyplot as plt\n\n# Creating a professional subplot layout\nfig, axes = plt.subplots(1, 2, figsize=(10, 5))\naxes[0].plot(x, y, color='blue', label='Growth')\naxes[1].scatter(x, z, marker='o', color='red')\nfig.suptitle('Advanced Data Analysis 2025')\nplt.show()\n\`\`\`\n\n### Heatmaps and Color Palettes\n\nWe will tackle **Heatmaps**—visualizing large matrices of numbers as colors. You'll learn how to use 'Colormaps' to highlight patterns that are invisible in raw text. We also explore **Custom Styling**, where you'll learn how to create your own theme, adjusting fonts, grid lines, and background colors to make your data 'Pop'. \n\n:::VISUAL ARCHITECT PROTOCOL:::\nWe will build a 'Correlative Chart' that uses a heatmap to show the relationships between 10 different business variables. By the end of this module, you'll be a **Matplotlib Expert**, capable of turning chaotic numbers into beautiful, clear, and actionable visual stories. You are moving from 'Drawing graphs' to **Designing Understanding**, developing the artistic and analytical depth needed for modern research. Clarity is the ultimate goal.`,
            assignment: "Heatmap generation", 
            pocketProject: "Correlative chart", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the 'Figure' in Matplotlib?", options: ["A number", "The top-level container (the window/canvas) for all plot elements", "A type of table", "An error"], correctAnswer: 1 },
              { text: "What does 'plt.subplots()' return?", options: ["Only a list", "A Figure and an array of Axes objects", "A text file", "A sound"], correctAnswer: 1 },
              { text: "An 'Axes' object represents ____.", options: ["A single plot (chart) with its own x and y axis", "The entire screen", "A piece of data", "A label"], correctAnswer: 0 },
              { text: "A 'Heatmap' represents data as ____.", options: ["Lines", "Colors in a grid", "Dots", "Voices"], correctAnswer: 1 },
              { text: "What is a 'Colormap'?", options: ["A map of cities", "A range of colors used to represent numerical values", "A type of brush", "A dictionary"], correctAnswer: 1 },
              { text: "Why use 'Subplots'?", options: ["They are cheaper", "To compare multiple datasets side-by-side in one figure", "To slow down the PC", "To hide data"], correctAnswer: 1 },
              { text: "Object-Oriented plotting is better because it gives ____.", options: ["Less code", "Full granular control over every element", "More errors", "More colors"], correctAnswer: 1 },
              { text: "Which command shows the final plot?", options: ["plt.draw()", "plt.show()", "plt.print()", "plt.exit()"], correctAnswer: 1 },
              { text: "Data Aesthetics is about ____.", options: ["Making charts pretty", "Designing visualizations that are both beautiful and clear to understand", "Drawing cartoons", "Buying a new monitor"], correctAnswer: 1 },
              { text: "Publication-quality means ____.", options: ["Small font", "High-resolution, clear, and professionally styled", "Only for books", "Secret"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Linear Regression (Basic)", 
            topics: ["Regression Lines", "Slope and Intercept", "Mean Squared Error", "Correlation"],
            content: `### Predicting the Trend\n\nIf you know how much a house cost last year, can you guess its price next year? This is the core of **Predictive Modeling**. In this lesson, we master **Linear Regression**—the grandfather of all machine learning algorithms. It is the mathematical attempt to find a 'Best Fit Line' through a cloud of data points. This is the foundation of **Statistical Forecasting**.\n\n### The Math of the Line (y=mx+c)\n\nWe will explore the **Regression Equation**. You'll understand the **Slope** (how fast the trend changes) and the **Intercept** (where the trend starts). You'll learn how the computer uses the 'Method of Least Squares' to find the line that has the absolute minimum distance from all data points simultaneously. This is **Optimization Math**.\n\n\`\`\`python\nfrom sklearn.linear_model import LinearRegression\n\n# Creating and training a linear model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Predicting future values\npredictions = model.predict(X_test)\nprint(f"Slope: {model.coef_} | Intercept: {model.intercept_}")\n\`\`\`\n\n### Residuals and Loss\n\nWe will tackle **Loss Functions**. You'll learn about **Residuals**—the difference between what the model 'Predicted' and what 'Actually' happened. By squaring these errors and finding the average (Mean Squared Error), we get a single number that tells us if our model is becoming a 'Better Guesser'. \n\n:::FORECASTING PROTOCOL:::\nWe will build a 'Trend Predictor' that analyzes stock prices and predicts the next day's value. By the end of this module, you'll be a **Regression Analyst**, capable of using simple but powerful math to predict future events based on historical trends. You are moving from 'Seeing data' to **Forecasting the Future**, developing the predictive intuition needed for global finance and planning. The line is your guide.`,
            assignment: "Residual analysis", 
            pocketProject: "Trend predictor", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is Linear Regression?", options: ["A type of game", "A method for predicting a continuous value by finding a 'Best Fit' trend line", "A way to delete data", "A sorting algorithm"], correctAnswer: 1 },
              { text: "The 'Slope' (m) represents ____.", options: ["The starting value", "The rate of change between variables", "The total count", "An error"], correctAnswer: 1 },
              { text: "The 'Intercept' (c) is the value where ____.", options: ["X is 100", "X is 0 (where the line hits the vertical axis)", "The data ends", "The model crashes"], correctAnswer: 1 },
              { text: "What is a 'Residual'?", options: ["Remaining data", "The difference between the actual value and the predicted value", "A type of color", "A save file"], correctAnswer: 1 },
              { text: "The Goal of Linear Regression is to ____.", options: ["Multiply data", "Minimize the distance between the line and the data points (Minimize Loss)", "Draw a circle", "Hide the trend"], correctAnswer: 1 },
              { text: "Which library is used for industrial Linear Regression?", options: ["Word", "Scikit-Learn (sklearn)", "Paint", "Chrome"], correctAnswer: 1 },
              { text: "Predicting a person's weight based on height is ____.", options: ["Classification", "Regression", "Deleting", "Sorting"], correctAnswer: 1 },
              { text: "A 'Continuous Value' is one that ____.", options: ["Is a category only", "Can be any number (like 3.14 or 100.2)", "Is always 0", "Is a secret"], correctAnswer: 1 },
              { text: "If the Slope is positive, the line goes ____.", options: ["Down", "Up", "Sideways", "Nowhere"], correctAnswer: 1 },
              { text: "The 'Best Fit Line' is the one with the ____.", options: ["Highest error", "Lowest total squared distance from points", "Most colors", "Shortest length"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Model Evaluation", 
            topics: ["R2 Score", "MSE", "RMSE", "MAE"],
            content: `### The Grade of the Machine\n\nYou've trained a model, but is it actually 'Good'? In professional AI engineering, "It looks right" is never an acceptable answer. In this lesson, we learn the mathematical **Metrics** used to grade a prediction engine. This is **Model Validation**. We are moving from 'Guesses' to **Precision Measurement**.\n\n### Mean Squared Error (MSE) and R2 Score\n\nWe will explore the **R2 Score (Coefficient of Determination)**. This is a magic number between 0 and 1 that tells you what percentage of the data your model 'Explains'. An R2 of 0.9 means your model is a 90% accurate engine of reality. We also tackle **Mean Squared Error (MSE)**, which tells you how much your guesses are 'Missing' the target on average. \n\n\`\`\`python\nfrom sklearn.metrics import mean_squared_error, r2_score\n\n# Evaluating the model\nmse = mean_squared_error(y_test, predictions)\nr2 = r2_score(y_test, predictions)\n\nprint(f"Confidence Score (R2): {r2}")\nprint(f"Error Rate (MSE): {mse}")\n\`\`\`\n\n### RMSE vs MAE\n\nWe will tackle **RMSE (Root Mean Squared Error)** and **MAE (Mean Absolute Error)**. While they both measure error, RMSE 'punishes' large mistakes more heavily. This is critical when building systems where one big error is worse than many small ones—like an AI controlling a car or a bank loan. \n\n:::QUALITY ASSURANCE PROTOCOL:::\nWe will build an 'Evaluator Tool' that compares two different models and picks the winner based on these four metrics. By the end of this module, you'll be a **Model QA Specialist**, capable of proving exactly how accurate a system is with scientific evidence. You are moving from 'Building' to **Validating**, developing the rigorous mindset needed for high-stakes technology. Evidence over opinion.`,
            assignment: "MSE & R2 score", 
            pocketProject: "Evaluator tool", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does a high R2 Score (close to 1.0) mean?", options: ["The model is perfect", "The model explains a large portion of the data patterns correctly", "The model is too slow", "The model has no data"], correctAnswer: 1 },
              { text: "What does 'MSE' stand for?", options: ["Mean Squared Error", "Most Simple Entry", "Map System Error", "Move Slowly Everytime"], correctAnswer: 0 },
              { text: "Why do we 'Square' the error in MSE?", options: ["To make numbers smaller", "To ensure all errors are positive and to punish large errors more heavily", "Because we like math", "To save space"], correctAnswer: 1 },
              { text: "The score that measures the absolute average miss is ____.", options: ["R2", "MAE (Mean Absolute Error)", "CPU", "RAM"], correctAnswer: 1 },
              { text: "RMSE is the ____ of MSE.", options: ["Square", "Square Root", "Inverse", "Opposite"], correctAnswer: 1 },
              { text: "If a model has an R2 of 0.0, it is ____.", options: ["Perfect", "No better than guessing the average for every point", "Fast", "A virus"], correctAnswer: 1 },
              { text: "Which metric 'punishes' large outliers the most?", options: ["MAE", "RMSE", "Count", "Mean"], correctAnswer: 1 },
              { text: "Validation is about ____.", options: ["Making it pretty", "Providing scientific proof of accuracy", "Printing code", "Setting a password"], correctAnswer: 1 },
              { text: "Model QA stands for ____.", options: ["Quality Assurance", "Quick Action", "Query Analysis", "Question Asked"], correctAnswer: 0 },
              { text: "Scientific evidence in AI means ____.", options: ["User reviews", "Mathematical metrics and testing scores", "Luck", "Text messages"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "ML Mini Project", 
            topics: ["End-to-End Regression", "Linear Models", "Evaluation Pipelines", "Insights"],
            content: `### The Full Cycle of AI\n\nCongratulations. You have completed the foundation of Senior Secondary Machine Learning. You've cleaned data, scaled features, visualized trends, and calculated error. Now, you will combine all these skills into a single **End-to-End Regression Project**. This is no longer a tutorial; this is a professional investigation. \n\n### The Salary Predictor Case Study\n\nWe will build a **Salary Predictor**. Imagine having data from 10,000 employees: their years of experience, their education level, and their location. You will build a system that can accurately guess the 'True Market Value' of a new job applicant. This is a real-world use case for AI in **Human Resources and Finance**. \n\n\`\`\`python\n# The Professional ML Pipeline\ncleaned_data = auto_clean(raw_data)\nscaled_data = feature_scaler.fit_transform(cleaned_data)\nmodel.fit(scaled_data, target)\nfinal_accuracy = r2_score(test_y, model.predict(test_x))\n\`\`\`\n\n### Writing the Technical Insight\n\nWe will finalize your project by writing a **Technical Insight Report**. You'll explain NOT JUST the code, but 'WHAT' the model discovered. Does experience matter more than education? Does location significantly impact profit? You are moving from 'Writing lines of code' to **Generating Business Value**. \n\n:::AI PROJECT LEAD PROTOCOL:::\nWe will build a 'Regression App' that allows a user to input job details and receive a salary prediction with a confidence score. By the end of this module, you'll be a **Junior Machine Learning Engineer**, possessing the full set of skills required to build, test, and deploy simple AI systems. You have completed SSS 1 Term 2. You are becoming a builder of the intelligent economy. The future is calculated on your screen.`,
            assignment: "Scikit-learn flow", 
            pocketProject: "Salary predictor", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is an 'End-to-End' project?", options: ["Only the beginning", "The complete workflow from raw data to a working, evaluated model", "Only the code", "Only the quiz"], correctAnswer: 1 },
              { text: "Why is Salary Prediction a good regression task?", options: ["It uses text only", "The target value (Money) is continuous and depends on multiple features", "It is easy", "It's a secret"], correctAnswer: 1 },
              { text: "A 'Confidence Score' in regression is usually represented by ____.", options: ["The file size", "The R2 Score", "The date", "The student name"], correctAnswer: 1 },
              { text: "What is 'Market Value' in AI context?", options: ["The price of a PC", "The target continuous value the model is trying to predict accurately", "A type of loop", "A dictionary"], correctAnswer: 1 },
              { text: "The first step in our professional pipeline is ____.", options: ["Training", "Data Cleaning / Preprocessing", "Evaluation", "Printing"], correctAnswer: 1 },
              { text: "A project report should explain the ____.", options: ["Colors", "Insights and Value discovered in the data", "Typing speed", "Keyboard brand"], correctAnswer: 1 },
              { text: "Deploying a model means ____.", options: ["Deleting it", "Making it available for users to actually use for predictions", "Closing the PC", "Buying a server"], correctAnswer: 1 },
              { text: "A Junior ML Engineer knows how to ____.", options: ["Build, test, and explain models", "Play games only", "Write one line of code", "Use a mouse only"], correctAnswer: 0 },
              { text: "Regression discoveries help businesses make ____.", options: ["Songs", "Evidence-based decisions", "Games", "Errors"], correctAnswer: 1 },
              { text: "Congratulations on completing SSS 1 Term 2! What is next?", options: ["Primary school", "Web and Automation (Term 3)", "Kindergarten", "Retirement"], correctAnswer: 1 }
            ]
          },
        ]
      },
      {
        id: "sss1-t3",
        name: "3rd Term – Web & Automation",
        lessons: [
          { 
            id: 1, 
            title: "React", 
            topics: ["Functional Components", "useState & useEffect", "Props & State", "Component Lifecycle"],
            content: `### The Modern Web Engine\n\nIn JSS, you learned HTML and basic CSS. Now, we enter the professional world of **React**—the library used by Facebook, Instagram, and Netflix to build high-performance user interfaces. In this lesson, we master **Component-Based Architecture**. Instead of writing one long HTML file, we build a website as a collection of small, reusable 'Components'. This is **UI Engineering**.\n\n### Hooks: useState and useEffect\n\nWe will explore **React Hooks**. You'll learned how to use **useState** to give your website 'Memory'—remembering what a user typed or if a button was clicked. We also tackle **useEffect**, which allows your app to 'Perform Actions' at specific times, like fetching data from a server when the page first opens. This is the foundation of **State Management**.\n\n\`\`\`javascript\nimport React, { useState, useEffect } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="p-4 bg-slate-800 text-white">\n      <p>Click count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n};\n\`\`\`\n\n### Props and the Virtual DOM\n\nWe will tackle **Props**—the way we pass information from one component to another. You'll understand the **Virtual DOM**, the magic technology that allows React to update only the parts of the screen that changed, making your app incredibly fast. \n\n:::FRONTEND ARCHITECT PROTOCOL:::\nWe will build a 'Dashboard Layout' using Tailwind CSS and React components. By the end of this module, you'll be a **React Developer**, capable of building complex, interactive interfaces that feel fast and premium. You are moving from 'Making sites' to **Engineering Applications**, developing the modular mindset needed for modern web development. Components are your building blocks.`,
            assignment: "Tailwind UI integration", 
            pocketProject: "Dashboard layout", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is React?", options: ["A language", "A JavaScript library for building user interfaces", "A type of database", "A game engine"], correctAnswer: 1 },
              { text: "What is a 'Component' in React?", options: ["A hardware part", "A reusable piece of UI (like a button or header)", "A type of error", "A style guide"], correctAnswer: 1 },
              { text: "Which hook is used to manage data that changes?", options: ["useEffect", "useState", "useData", "useMemory"], correctAnswer: 1 },
              { text: "What are 'Props'?", options: ["Stage support", "A way to pass data from parent to child components", "A type of color", "An error code"], correctAnswer: 1 },
              { text: "The Virtual DOM makes React fast by ____.", options: ["Deleting the screen", "Updating only the parts of the real DOM that actually changed", "Using more RAM", "Ignoring CSS"], correctAnswer: 1 },
              { text: "What does `setCount(count + 1)` do?", options: ["Deletes count", "Updates the state variable and triggers a re-render", "Prints count", "Sets count to 0"], correctAnswer: 1 },
              { text: "React follows which design pattern?", options: ["One long file", "Component-Based Architecture", "Top-down only", "Secret"], correctAnswer: 1 },
              { text: "Which hook handles 'Side Effects' (like data fetching)?", options: ["useState", "useEffect", "useCall", "useFetch"], correctAnswer: 1 },
              { text: "Tailwind CSS is used for ____.", options: ["Logic", "Utility-first styling inside React components", "Database management", "Server speed"], correctAnswer: 1 },
              { text: "A 'Render' is when React ____.", options: ["Crashes", "Calculates how the UI should look and updates the screen", "Deletes a file", "Plays a sound"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "API Development", 
            topics: ["FastAPI", "RESTful Principles", "Type Hinting (Pydantic)", "JSON Schema"],
            content: `### The High-Speed Gateway\n\nYou've used Express.js (Node.js) for APIs. Now, we master **FastAPI**—the modern Python framework designed for speed and data science. In this lesson, we learn how to build 'Industrial-Grade' backends that are automatically documented and high-performance. This is **API Engineering**.\n\n### REST and Type Hinting\n\nWe will explore **RESTful Principles**. You'll learned the standard way servers talk to the world using GET, POST, PUT, and DELETE. We jump into **Python Type Hinting** and **Pydantic Models**, which ensure that the data coming into your API is 100% correct before it ever touches your database. This is **Type Safety**.\n\n\`\`\`python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Book(BaseModel):\n    title: str\n    price: float\n\n@app.post("/books/")\ndef create_book(book: Book):\n    return {"message": f"Added {book.title}"}\n\`\`\`\n\n### Automatic Documentation\n\nWe will tackle **Swagger and Redoc**—the tools FastAPI uses to build a 'Testing Website' for your API automatically. You'll learn how to share your API with other developers so they can use your backend for their apps. \n\n:::BACKEND ARCHITECT PROTOCOL:::\nWe will build a 'Bookstore API' with full validation and automatic documentation. By the end of this module, you'll be a **Backend Developer**, capable of building the high-speed 'Brains' that power applications for thousands of users. You are moving from 'Scripts' to **Industrial Systems**, developing the rigorous architectural thinking needed for modern software engineering. The server is the anchor.`,
            assignment: "FastAPI endpoints", 
            pocketProject: "Bookstore API", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is FastAPI?", options: ["A slow server", "A modern, high-performance web framework for building APIs with Python", "A game", "An image editor"], correctAnswer: 1 },
              { text: "What does 'REST' stand for?", options: ["Recover Every System Time", "Representational State Transfer (an API design style)", "Run Every Second Task", "Real Error System Test"], correctAnswer: 1 },
              { text: "Pydantic is used in FastAPI for ____.", options: ["Drawing charts", "Data validation and settings management (Type safety)", "Deleting files", "Printing"], correctAnswer: 1 },
              { text: "Which HTTP method is used to CREATE data?", options: ["GET", "POST", "DELETE", "PUT"], correctAnswer: 1 },
              { text: "Which HTTP method is used to RETRIEVE data?", options: ["POST", "GET", "PUSH", "PULL"], correctAnswer: 1 },
              { text: "FastAPI is built on which standard?", options: ["Word", "ASGI / Starlette", "Excel", "Paint"], correctAnswer: 1 },
              { text: "Automatic Documentation (Swagger) allows you to ____.", options: ["Listen to music", "Test your API endpoints directly in the browser", "Delete the code", "Change the font"], correctAnswer: 1 },
              { text: "Type Hinting in Python looks like ____.", options: ["x = 10", "x: int = 10", "int x = 10", "x int 10"], correctAnswer: 1 },
              { text: "API response format is usually ____.", options: ["CSV", "JSON", "Word", "PDF"], correctAnswer: 1 },
              { text: "A 'Status Code' of 200 means ____.", options: ["Error", "Success", "Forbidden", "Not Found"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Database (Server-side)", 
            topics: ["PostgreSQL", "Relational Integrity", "Migrations (Alembic)", "Database Constraints"],
            content: `### The Vault of the Enterprise\n\nYou've used SQLite for local projects. Now, we master **PostgreSQL**—the world's most advanced open-source database used by industry giants like Instagram and Spotify. In this lesson, we learn how to manage data on a 'Server Scale'. This is **Database Engineering**. You'll learn how to ensure your data is safe, connected, and lightning-fast even with millions of records. This is **Data Integrity**.\n\n### Migrations and Schemas\n\nWe will explore **Database Migrations** using tools like Alembic. In a professional environment, you never 'manually' change a database; you write a script that 'Migrates' it to a new version. This allows a team of 100 developers to stay in sync. You'll also learn about **Constraints** (Unique, Not Null) and **Foreign Keys** that prevent your data from becoming messy and inconsistent.\n\n\`\`\`sql\n-- A professional SQL migration to add a user table\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    username VARCHAR(50) UNIQUE NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\`\`\`\n\n### Relational Excellence\n\nWe will tackle **One-to-Many and Many-to-Many Relationships**. You'll learn how to connect an 'Orders' table to a 'Products' table without duplicating data. This is the foundation of **Normalization**. You are moving from 'Saving files' to **Architecting Information**, developing the technical discipline needed to build secure, industrial-grade storage systems. \n\n:::DB ARCHITECT PROTOCOL:::\nWe will build an 'Inventory DB' schema that handles thousands of products and orders with perfect accuracy. By the end of this module, you'll be a **Database Engineer**, capable of designing the storage systems that power global applications. You are moving from 'Local' to **Server-Side**, preparing for the complex architectures of SSS 2 and SSS 3. The foundation is solid.`,
            assignment: "Postgres migrations", 
            pocketProject: "Inventory DB", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is PostgreSQL?", options: ["A language", "A powerful, open-source relational database system", "A game", "A type of memory"], correctAnswer: 1 },
              { text: "What is a 'Database Migration'?", options: ["Moving the computer", "A version control script for database structure changes", "A type of virus", "A chart"], correctAnswer: 1 },
              { text: "A 'Foreign Key' is used to ____.", options: ["Access the PC", "Link two tables together and enforce relationships", "Delete a file", "Hide data"], correctAnswer: 1 },
              { text: "Which constraint ensures no two users have the same email?", options: ["NOT NULL", "UNIQUE", "DEFAULT", "PRIMARY"], correctAnswer: 1 },
              { text: "Data Integrity means ____.", options: ["Data is correct and consistent", "Data is fast", "Data is secret", "Data is deleted"], correctAnswer: 0 },
              { text: "What does 'VARCHAR(50)' mean in SQL?", options: ["50 numbers", "A text string with a maximum of 50 characters", "50 files", "An error"], correctAnswer: 1 },
              { text: "A 'Primary Key' must be ____ and ____.", options: ["Short and Long", "Unique and Not Null", "Red and Blue", "Slow and Fast"], correctAnswer: 1 },
              { text: "Normalization is the process of ____.", options: ["Adding more data", "Reducing data duplication and improving integrity", "Making things pretty", "Printing"], correctAnswer: 1 },
              { text: "Why use Postgres over SQLite for big apps?", options: ["It's cheaper", "It handles many simultaneous users and massive data more efficiently", "It has more colors", "It's a secret"], correctAnswer: 1 },
              { text: "An 'Index' in a database is used to ____.", options: ["Slow down math", "Speed up data retrieval (searching)", "Delete the table", "Change the font"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Automation", 
            topics: ["Cron Jobs", "Task Scheduling", "Systemd", "Bash Automation"],
            content: `### The Infinite Intern\n\nWhy do a task yourself when a computer can do it every day at 3 AM while you sleep? Welcome to **Automation Systems**. In this lesson, we learn how to turn your Python scripts into 'Background Workers' that run automatically based on schedules or events. This is **DevOps Engineering**. We are moving from 'Running code' to **Managing Systems**.\n\n### Cron and Scheduling\n\nWe will explore **Cron Jobs**—the standard way systems schedule tasks. You'll learn the syntax for "Run this every Monday" or "Run this every 5 minutes". We also tackle **Task Queues**, allowing your app to handle 'Heavy' work (like sending 10,000 emails or processing a video) in the background so the user doesn't have to wait. This is **Asynchronous Processing**.\n\n\`\`\`bash\n# A Cron job to backup the database every day at midnight\n0 0 * * * /usr/bin/python3 /scripts/db_backup.py\n\`\`\`\n\n### System Services and Monitoring\n\nWe will tackle **Systemd**—learning how to make your app run as a 'Service' that automatically restarts if the computer reboots. You'll also learn how to log the activities of your automations so you can find and fix errors before the user even notices. This is **Operational Reliability**. \n\n:::AUTOMATION LEAD PROTOCOL:::\nWe will build a 'Backup Automator' that compresses files and syncs them to a secure location on a schedule. By the end of this module, you'll be an **Automation Architect**, capable of building invisible systems that work 24/7 to keep the digital world running. You are moving from 'Building' to **Scaling**, developing the systemic thinking needed for professional infrastructure management. Set it and forget it—but monitor everything.`,
            assignment: "Cron job scripts", 
            pocketProject: "Backup automator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Cron Job'?", options: ["A game", "A time-based job scheduler in Unix-like operating systems", "A type of memory", "A search engine"], correctAnswer: 1 },
              { text: "Asynchronous processing means ____.", options: ["Running tasks in the background without making the user wait", "Running tasks slowly", "Running tasks with more colors", "Deleting tasks"], correctAnswer: 0 },
              { text: "What does '0 0 * * *' mean in Cron syntax?", options: ["Every hour", "Every day at midnight", "Every year", "Never"], correctAnswer: 1 },
              { text: "A 'Service' is a program that ____.", options: ["Plays music", "Runs in the background and often starts automatically", "Shows a website", "Only works for 1 hour"], correctAnswer: 1 },
              { text: "Why is 'Logging' important in automation?", options: ["It's pretty", "It tracks what happened and helps debug errors in background tasks", "It saves electricity", "It makes the code longer"], correctAnswer: 1 },
              { text: "Which tool can be used to manage background services?", options: ["Paint", "Systemd / Docker", "Word", "Chrome"], correctAnswer: 1 },
              { text: "Background workers are used for ____ tasks.", options: ["Short", "Long or heavy (like video processing)", "Fast", "Invisible only"], correctAnswer: 1 },
              { text: "Scheduling a task for every Monday at 9 AM is ____.", options: ["Manual", "Automation", "Input", "Output"], correctAnswer: 1 },
              { text: "DevOps is the field of ____.", options: ["Drawing", "Connecting Software Development and IT Operations/Automation", "History", "Sports"], correctAnswer: 1 },
              { text: "Monitoring automation means ____.", options: ["Watching it with your eyes", "Using software to track if tasks succeed or fail", "Deleting the code", "Changing the theme"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "KPI Dashboard", 
            topics: ["Anomaly Detection", "Real-time Streaming", "Z-Score Visualization", "Alerting"],
            content: `### The Watchtower\n\nYou've built static dashboards. Now, we build **Intelligent Dashboards**. In the real world, data is a constant stream that never stops. In this lesson, we learn how to build systems that don't just 'Show' data—they 'Watch' it for you. This is **Operational Intelligence**. We are moving from 'Reports' to **Real-Time Monitoring**.\n\n### Anomaly Detection and Z-Scores\n\nWe will explore **Anomaly Detection**. You'll learned how to use your math skills (Z-scores) to automatically highlight data points that look 'Wrong' or 'Dangerous'. For example, if a server's temperature suddenly spikes, your dashboard will turn red and send an alert. This is **Automated Oversight**.\n\n\`\`\`javascript\n// Simple anomaly detection on a dashboard feed\nconst zScore = (value - mean) / stdDev;\nif (Math.abs(zScore) > 3) {\n  triggerAlert("Anomaly detected in system telemetry!");\n}\n\`\`\`\n\n### Streaming and Alerts\n\nWe will tackle **Alerting Systems**. You'll learn how to connect your dashboard to email or messaging apps, notifying you immediately if a KPI drops below a certain level. You are building the **Nervous System** of an organization. \n\n:::DASHBOARD ENGINEER PROTOCOL:::\nWe will build an 'Anomalies Tracker' that visualizes live system health and alerts the user to unusual patterns. By the end of this module, you'll be an **Analytics Architect**, capable of building the mission-critical monitoring systems that protect global networks and businesses. You are moving from 'Data Display' to **System Awareness**, developing the high-responsibility mindset needed for critical infrastructure. You see what others miss.`,
            assignment: "Z-score visualization", 
            pocketProject: "Anomalies tracker", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is an 'Anomaly'?", options: ["A normal point", "An unusual data point that doesn't fit the expected pattern (outlier)", "A save file", "An error in spelling"], correctAnswer: 1 },
              { text: "Operational Intelligence is about ____.", options: ["Writing code", "Monitoring systems in real-time to make fast decisions", "History", "Playing games"], correctAnswer: 1 },
              { text: "A Z-score higher than 3 often indicates an ____.", options: ["Error", "Anomaly / Outlier", "Average", "Minimum"], correctAnswer: 1 },
              { text: "A 'Streaming' dashboard is one that ____.", options: ["Plays videos", "Updates continuously as new data arrives", "Only works on TV", "Is a secret"], correctAnswer: 1 },
              { text: "The Goal of Alerting is to ____.", options: ["Annoy the user", "Notify people immediately when something goes wrong", "Delete the data", "Change the font"], correctAnswer: 1 },
              { text: "Telemetry is ____.", options: ["A type of phone", "Automatic measurement and collection of data from remote sources (like servers)", "A chart", "A dictionary"], correctAnswer: 1 },
              { text: "A 'Threshold' is a ____.", options: ["Door", "Set limit that triggers an action if crossed", "Type of color", "Variable"], correctAnswer: 1 },
              { text: "Why is anomaly detection important in banking?", options: ["It's cheaper", "It helps detect fraud or unusual spending patterns instantly", "It has colors", "It saves paper"], correctAnswer: 1 },
              { text: "Mission-critical means ____.", options: ["Optional", "Essential for the survival/success of the operation", "Fun", "Secret"], correctAnswer: 1 },
              { text: "Real-time Monitoring provides ____.", options: ["Slow data", "Strategic Awareness of the current situation", "Errors only", "Music"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "Prompt Engineering", 
            topics: ["Logical Chaining", "System Prompts", "Few-Shot Synthesis", "Autonomous Agents"],
            content: `### The Final Command\n\nCongratulations. You have completed the first year of the Senior Secondary Computer Science and AI curriculum. You've mastered Python, advanced math, backend systems, and web architecture. In this final lesson, we master **Advanced AI Orchestration**. We are moving from 'Asking' to **Commanding**.\n\n### Logic Chaining and Synthesis\n\nWe will explore **Logical Chaining**—the process of breaking down a massive problem into a series of smaller, logical steps for the AI to solve sequentially. You'll learn how to write 'System Prompts' that turn a generic AI into a professional specialist—a lawyer, a doctor, or a senior coder. This is **Intelligence Synthesis**.\n\n\`\`\`text\n# Advanced Prompt Template (Logical Chaining)\nTask: Build a database migration script.\nSteps:\n1. Analyze the current schema provided below.\n2. Identify the required changes for the 'Orders' table.\n3. Write the SQL script to implement these changes.\n4. Explain any potential risks of this migration.\n\`\`\`\n\n### Autonomous Agents intro\n\nWe will touch upon **AI Agents**—systems that don't just chat, but can 'Act' by writing files, searching the web, or running code automatically. You are moving from 'Building Tools' to **Architecting Intelligence**. \n\n:::AI ORCHESTRATOR PROTOCOL:::\nWe will build a 'Content Generator' that uses multi-step logical chaining to produce complex research reports automatically. By the end of this module, you'll be an **AI Strategy Specialist**, ready to enter SSS 2 with the technical edge required for Deep Learning and Neural Networks. You have the tools. You have the logic. You are the architect of the future. Welcome to the next level of mastery.`,
            assignment: "Few-shot prompting", 
            pocketProject: "Content generator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Logical Chaining'?", options: ["A physical chain", "Breaking a complex task into sequential logical steps for an AI to solve", "Deleting code", "A type of loop"], correctAnswer: 1 },
              { text: "A 'System Prompt' is used to ____.", options: ["Boot the PC", "Define the AI's identity, role, and constraints globally", "Print text", "Change the color"], correctAnswer: 1 },
              { text: "Synthesis means ____.", options: ["Breaking apart", "Combining different pieces into a new, complex whole", "Deleting", "Ignoring"], correctAnswer: 1 },
              { text: "An 'AI Agent' is different because it can ____.", options: ["Talk only", "Take actions (like run code or edit files) autonomously to reach a goal", "Save electricity", "Print errors"], correctAnswer: 1 },
              { text: "Multi-step prompts improve AI ____.", options: ["Speed", "Accuracy and reasoning quality", "Size", "Font"], correctAnswer: 1 },
              { text: "Few-shot Prompting uses ____.", options: ["No examples", "A few examples of desired Input/Output to teach patterns", "Many files", "One word"], correctAnswer: 1 },
              { text: "What is the goal of AI Strategy?", options: ["To use AI for everything", "To use AI most effectively to solve real-world problems and create value", "To delete the keyboard", "To hide the mouse"], correctAnswer: 1 },
              { text: "Orchestration means ____.", options: ["Playing music", "Coordinating different AI models and tools to complete a complex mission", "Drawing", "History"], correctAnswer: 1 },
              { text: "Congratulations on SSS 1! What is the focus of SSS 2?", options: ["Kindergarten", "Deep Machine Learning and Neural Networks", "History", "Sports"], correctAnswer: 1 },
              { text: "You are now a ____.", options: ["Beginner", "Junior Tech Leader and Architect", "Student only", "User"], correctAnswer: 1 }
            ]
          },
        ]
      }
    ]
  },
  {
    id: "sss2",
    name: "SSS 2",
    icon: "🔵",
    color: "pink",
    terms: [
      {
        id: "sss2-t1",
        name: "1st Term – Deep Machine Learning",
        lessons: [
          { 
            id: 1, 
            title: "Supervised Learning", 
            topics: ["SVM (Support Vector Machines)", "Hyperplanes", "The Kernel Trick", "Margin Maximization"],
            content: `### The Boundary of Truth\n\nYou've used Linear Regression to predict numbers. Now, we enter the world of **Advanced Supervised Learning**. In this lesson, we master the **Support Vector Machine (SVM)**—the algorithm that finds the 'Widest Possible Gap' between categories. In a world of chaos, the SVM finds the definitive boundary. This is **Mathematical Precision**.\n\n### Hyperplanes and Margins\n\nWe will explore the **Hyperplane**. Imagine a 3D space with data points scattered like stars. An SVM doesn't just draw a line; it calculates a 'Plane' that separates the data with the maximum 'Safety Margin'. You'll learn how to identify **Support Vectors**—the specific data points that define the edge of the boundary. This is the science of **Optimal Separation**.\n\n\`\`\`python\nfrom sklearn.svm import SVC\n\n# Creating a professional SVM Classifier\n# C=1.0 is the 'Penalty' for errors. Lower C = softer boundary.\nmodel = SVC(kernel='linear', C=1.0)\nmodel.fit(X_train, y_train)\n\`\`\`\n\n### The Kernel Trick\n\nWe will tackle **Kernels**. Sometimes, data isn't separable by a straight line. You'll learn how the 'Kernel Trick' mathematically transforms your data into a higher dimension where a clean boundary becomes possible. We'll explore RBF, Polynomial, and Sigmoid kernels. \n\n:::ALGORITHM ARCHITECT PROTOCOL:::\nWe will build an 'SVM Classifier' that can distinguish between healthy and diseased cells with high confidence. By the end of this module, you'll be a **Supervised Learning Specialist**, capable of building robust boundaries in even the messiest data. You are moving from 'Guessing' to **Categorizing Reality**, developing the rigorous mathematical mindset needed for deep tech research. The margin is your shield.`,
            assignment: "Support Vector Machines", 
            pocketProject: "SVM Classifier", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is an SVM (Support Vector Machine)?", options: ["A type of hardware", "A supervised learning model that finds the optimal hyperplane to separate classes", "A game", "A sound editor"], correctAnswer: 1 },
              { text: "What is a 'Hyperplane'?", options: ["A fast plane", "A decision boundary that separates data points into different classes", "A type of list", "An error"], correctAnswer: 1 },
              { text: "Support Vectors are the points that ____.", options: ["Are far from the boundary", "Are closest to the hyperplane and define its position", "Are deleted", "Are random"], correctAnswer: 1 },
              { text: "What is the 'Margin' in SVM?", options: ["The edge of paper", "The distance between the hyperplane and the nearest support vectors", "The font size", "The total count"], correctAnswer: 1 },
              { text: "The 'Kernel Trick' allows SVM to ____.", options: ["Run faster", "Handle non-linear data by projecting it into higher dimensions", "Delete files", "Change colors"], correctAnswer: 1 },
              { text: "Which kernel is best for data that looks like a circle?", options: ["Linear", "RBF (Radial Basis Function)", "Text", "Audio"], correctAnswer: 1 },
              { text: "In SVM, a 'penalty' for misclassification is set by ____.", options: ["The Z-score", "The C parameter", "The CPU", "The RAM"], correctAnswer: 1 },
              { text: "Optimal Separation means finding the ____.", options: ["Smallest gap", "Widest Possible Margin between classes", "Random gap", "Shortest line"], correctAnswer: 1 },
              { text: "SVM is primarily used for ____.", options: ["Counting", "Classification and Regression", "Drawing", "Music"], correctAnswer: 1 },
              { text: "A 'Soft Margin' allows for ____.", options: ["Perfect separation", "Some misclassifications to handle noisy data", "No mistakes", "Faster death"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Unsupervised Learning", 
            topics: ["K-Means Clustering", "The Elbow Method", "Centroids", "Pattern Discovery"],
            content: `### Finding Order in Silence\n\nWhat do you do when your data has no 'Labels'? No answers? No grades? You use **Unsupervised Learning**. In this lesson, we master **K-Means Clustering**—the algorithm that finds hidden groups within raw data by looking at how points 'Stick Together'. This is **Discovery Science**. We are moving from 'Following' to **Exploration**.\n\n### Centroids and Clusters\n\nWe will explore **Centroids**—the mathematical 'Heart' of a cluster. You'll learn how the K-Means algorithm starts with random points and iteratively moves them until every data point is grouped with its closest neighbor. We tackle 'K'—the most important question in clustering: "How many groups are there actually?". This is **Structural Analysis**.\n\n\`\`\`python\nfrom sklearn.cluster import KMeans\n\n# Grouping customers into 5 segments\nkmeans = KMeans(n_components=5)\nclusters = kmeans.fit_predict(segment_data)\n\n# Finding the coordinates of the cluster centers\ncenters = kmeans.cluster_centers_\n\`\`\`\n\n### The Elbow Method\n\nWe will tackle **The Elbow Method**. You'll learn the statistical way to prove the 'Right' number of clusters by plotting the 'Inertia' (the distance error). We'll also dive into **PCA (Principal Component Analysis)**, which allows you to 'Flatten' 100 dimensions of data into just 2 or 3 so you can actually see the clusters on a screen. \n\n:::DATA EXPLORER PROTOCOL:::\nWe will build a 'Customer Segmenter' that automatically groups shoppers into categories like 'Big Spenders' or 'Occasional Browsers'. By the end of this module, you'll be an **Unsupervised Learning Expert**, capable of finding hidden value in vast amounts of unorganized data. You are moving from 'Learning' to **Observing**, developing the intuitive mindset needed for market research and genome analysis. The data speaks for itself.`,
            assignment: "K-Means clustering", 
            pocketProject: "Customer segmenter", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Unsupervised Learning'?", options: ["Learning with a teacher", "Finding hidden patterns in data that has no labels or answers", "Writing code alone", "A type of virus"], correctAnswer: 1 },
              { text: "K-Means is used for ____.", options: ["Counting", "Clustering (grouping similar data points)", "Regression", "Deleting"], correctAnswer: 1 },
              { text: "A 'Centroid' is the ____.", options: ["Boundary of a chart", "Mathematical center of a cluster", "The first data point", "An error code"], correctAnswer: 1 },
              { text: "What does 'K' represent in K-Means?", options: ["The keyboard", "The number of clusters (groups) to create", "The speed", "The RAM"], correctAnswer: 1 },
              { text: "The Elbow Method helps us choose ____.", options: ["The best color", "The optimal number of clusters (K)", "A type of loop", "A font"], correctAnswer: 1 },
              { text: "Clustering is based on the ____ between points.", options: ["Similarity / Distance", "File size", "Names", "Colors"], correctAnswer: 0 },
              { text: "Inertia in K-Means measures ____.", options: ["Speed", "How internally coherent the clusters are (sum of squared distances)", "Weight", "Memory usage"], correctAnswer: 1 },
              { text: "Grouping news articles into topics is an example of ____.", options: ["Regression", "Clustering", "Addition", "Sorting"], correctAnswer: 1 },
              { text: "PCA stands for ____.", options: ["Print Computer App", "Principal Component Analysis (Dimension reduction)", "Private Code Area", "Personal Call Asset"], correctAnswer: 1 },
              { text: "Which library is used to perform K-Means?", options: ["Word", "Scikit-Learn (sklearn)", "VLC", "Chrome"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Classification", 
            topics: ["Decision Trees", "Random Forest", "Ensemble Learning", "Gini Impurity"],
            content: `### The Power of the Crowd\n\nWhy rely on one model when you can use a hundred? Welcome to **Ensemble Learning**. In this lesson, we master **Random Forest**—one of the most powerful and versatile algorithms in the world of AI. It works by building a 'Forest' of many **Decision Trees** and letting them vote on the final answer. This is **Collective Intelligence**. We are moving from 'Single Models' to **Model Systems**.\n\n### Decision Trees and Gini Impurity\n\nWe will explore the **Decision Tree**. You'll learned how a computer builds a flowchart of questions (e.g., "Is the color red?", "Is the price > $50?") to classify data. We tackle **Gini Impurity**—the mathematical formula that tells the computer which 'Question' is the most powerful for splitting the data correctly. This is **Information Theory**.\n\n\`\`\`python\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Building an Ensemble Model with 100 Trees\nmodel = RandomForestClassifier(n_estimators=100, max_depth=10)\nmodel.fit(X_train, y_train)\n\n# Feature Importance - Seeing what the forest learned\nimportances = model.feature_importances_\n\`\`\`\n\n### Random Forests and Bagging\n\nWe will tackle **Random Forests**. You'll understand why adding 'Randomness' to the training process actually makes the model more accurate and less likely to overfit. We explore **Feature Importance**, which allows your model to tell YOU which variables in your data are the most valuable for making a prediction. \n\n:::ENSEMBLE ARCHITECT PROTOCOL:::\nWe will build a 'Spam Detector' that uses a Random Forest to identify malicious emails with 99% accuracy. By the end of this module, you'll be an **Ensemble Learning Specialist**, capable of building robust, industrial-grade classification systems. You are moving from 'Logic' to **Wisdom**, developing the system-level thinking needed for modern data engineering. The forest sees all.`,
            assignment: "Random Forest study", 
            pocketProject: "Spam detector", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Random Forest'?", options: ["A forest of trees", "An ensemble learning model made of many decision trees", "A random list", "A game"], correctAnswer: 1 },
              { text: "Ensemble Learning is the practice of ____.", options: ["Running one model", "Combining multiple models to improve accuracy and robustness", "Deleting code", "Printing charts"], correctAnswer: 1 },
              { text: "A Decision Tree splits data based on ____.", options: ["Randomness", "Logical questions (if/then) that minimize impurity", "Colors", "Sounds"], correctAnswer: 1 },
              { text: "Gini Impurity measures ____.", options: ["How dirty the data is", "The probability of a random sample being classified incorrectly", "The speed", "The RAM"], correctAnswer: 1 },
              { text: "What is 'Feature Importance'?", options: ["Buying a keyboard", "A metric that tells you which data columns have the most impact on predictions", "A type of chart", "A secret"], correctAnswer: 1 },
              { text: "Why use many trees instead of one?", options: ["It's cheaper", "To reduce overfitting and increase the reliability of the answer (Voting)", "To slow the PC", "To hide errors"], correctAnswer: 1 },
              { text: "The number of trees in a forest is called ____.", options: ["Depth", "n_estimators", "Width", "Height"], correctAnswer: 1 },
              { text: "Bagging is a technique where trees are trained on ____.", options: ["The same data", "Random subsets of the data (Bootstrap Aggregating)", "One row only", "No data"], correctAnswer: 1 },
              { text: "Social media 'Fraud Detection' often uses ____.", options: ["Addition", "Random Forests / Ensembles", "History", "Drawing"], correctAnswer: 1 },
              { text: "A Decision Tree with infinite depth will likely ____.", options: ["Be perfect", "Overfit (memorize the data too much)", "Be invisible", "Delete files"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Regression", 
            topics: ["Ridge Regression", "Lasso Regression", "L1 vs L2 Regularization", "ElasticNet"],
            content: `### The Discipline of the Model\n\nSometimes, a model is 'Too Smart' for its own good—it memorizes the noise in your data instead of the signal. This is Overfitting. In this lesson, we master **Regularization**—the mathematical 'Penalty' we add to a model to keep it simple, honest, and accurate. This is **Model Discipline**. We are moving from 'Fitting' to **Generalizing**.\n\n### Ridge and Lasso (L1 and L2)\n\nWe will explore **Ridge Regression (L2)** and **Lasso Regression (L1)**. You'll learn how Ridge 'Shrinks' the importance of less useful features to near-zero, while Lasso can actually delete them entirely by setting their importance to exactly zero. This is **Feature Selection** through math. We tackle the 'Alpha' parameter—the knob you turn to control how 'Strict' your model should be.\n\n\`\`\`python\nfrom sklearn.linear_model import Ridge, Lasso\n\n# Using Ridge to prevent overfitting\n# alpha = 1.0 is the strictness of the penalty\nmodel = Ridge(alpha=1.0)\nmodel.fit(X_train, y_train)\n\`\`\`\n\n### ElasticNet and Bias-Variance\n\nWe will tackle **ElasticNet**—the hybrid algorithm that combines the best of both Ridge and Lasso. We dive deep into the **Bias-Variance Tradeoff**, understanding why a slightly 'Biased' model is often better in the real world than a perfectly 'Varied' one. \n\n:::STATISTICAL ARCHITECT PROTOCOL:::\nWe will build a 'Price Estimator' for real estate that stays accurate even when the input data is messy and full of useless variables. By the end of this module, you'll be a **Regularization Specialist**, capable of building models that don't just 'Work' on your computer, but 'Win' in the real world. You are moving from 'Training' to **Evaluation**, developing the professional rigor needed for high-stakes forecasting. Simple is powerful.`,
            assignment: "Ridge vs Lasso", 
            pocketProject: "Price estimator", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Regularization'?", options: ["Changing fonts", "Adding a mathematical penalty to complexity to prevent overfitting", "Deleting data", "Printing"], correctAnswer: 1 },
              { text: "Ridge Regression uses which penalty?", options: ["L1", "L2 (Squared penalty)", "None", "Random"], correctAnswer: 1 },
              { text: "Lasso Regression is unique because it can ____.", options: ["Multiply values", "Shrink feature coefficients to exactly zero (Feature Selection)", "Delete the OS", "Change colors"], correctAnswer: 1 },
              { text: "The 'Alpha' parameter controls ____.", options: ["The speed", "The strength of the regularization penalty", "The font", "The RAM"], correctAnswer: 1 },
              { text: "ElasticNet is a combination of ____ and ____.", options: ["Ridge and Linear", "Ridge and Lasso", "Lasso and Random", "Math and Art"], correctAnswer: 1 },
              { text: "Overfitting happens when a model has ____.", options: ["Low bias / High variance", "High bias / Low variance", "No data", "No code"], correctAnswer: 0 },
              { text: "Generalization means a model works well on ____.", options: ["The training data only", "New, unseen data in the real world", "The first row", "A specific computer"], correctAnswer: 1 },
              { text: "Which regression is best when you have many irrelevant features?", options: ["Linear", "Lasso (L1)", "Addition", "Sorting"], correctAnswer: 1 },
              { text: "L2 penalty is the sum of the ____ of coefficients.", options: ["Absolute values", "Squares", "Minima", "Maxima"], correctAnswer: 1 },
              { text: "Regularization 'punishes' models that are ____.", options: ["Too slow", "Too complex (having very large weights)", "Too short", "Invisible"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Model Optimization", 
            topics: ["GridSearchCV", "RandomizedSearchCV", "Cross-Validation", "Pipeline Design"],
            content: `### The Search for Perfection\n\nAI isn't just about picking an algorithm; it's about picking the right 'Settings' (Hyperparameters). In this lesson, we master **Hyperparameter Tuning**—learning how to make an algorithm automatically 'Test' thousands of different settings to find the one that works best. This is **Meta-Programming**. We are moving from 'Manual Tweak' to **Automated Optimization**.\n\n### GridSearchCV and RandomizedSearchCV\n\nWe will explore **Grid Search**. Imagine a grid of every possible setting. Your computer will systematically test every single combination and report the winner. We also tackle **Randomized Search**, which tests random combinations much faster—perfect for massive datasets where you don't have days to wait for a result. This is **Computational Efficiency**.\n\n\`\`\`python\nfrom sklearn.model_selection import GridSearchCV\n\n# Defining the 'Grid' of settings to test\nparam_grid = {'n_estimators': [50, 100, 200], 'max_depth': [5, 10, 20]}\n\n# Automatically finding the best settings\ngrid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)\ngrid_search.fit(X_train, y_train)\nprint(f"Best settings: {grid_search.best_params_}")\n\`\`\`\n\n### Cross-Validation and Pipelines\n\nWe will tackle **K-Fold Cross-Validation**. You'll learned how to split your data into 'K' pieces and train the model 'K' times to ensure your accuracy isn't just a lucky guess. We also explore **Pipelines**, allowing you to 'Chain' cleaning, scaling, and training into a single automated workflow. \n\n:::OPTIMIZATION LEAD PROTOCOL:::\nWe will build a 'Tuning Service' that takes a raw dataset and automatically finds the perfect AI model and settings for it. By the end of this module, you'll be an **Automation Optimization Specialist**, capable of squeezing every last drop of accuracy out of any system. You are moving from 'Trying code' to **Orchestrating Math**, developing the high-level engineering mindset needed for industrial AI. The best setting is out there; let the machine find it for you.`,
            assignment: "GridSearch CV", 
            pocketProject: "Tuning service", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Hyperparameter'?", options: ["A fast parameter", "A setting of an algorithm that is set before training (like depth or alpha)", "A type of chart", "A save file"], correctAnswer: 1 },
              { text: "GridSearchCV works by ____.", options: ["Randomly guessing", "Exhaustively testing every combination in a specified grid of settings", "Deleting files", "Printing"], correctAnswer: 1 },
              { text: "RandomizedSearchCV is better for ____.", options: ["Small grids", "Large search spaces (it's faster than testing everything)", "Drawing", "Music"], correctAnswer: 1 },
              { text: "Cross-Validation (CV) is used to ____.", options: ["Slow the model", "Ensure the accuracy score is reliable and not just a fluke of one data split", "Delete bugs", "Add colors"], correctAnswer: 1 },
              { text: "A 'Pipeline' allows you to ____.", options: ["Carry oil", "Chain multiple steps (cleaning, scaling, modeling) into one object", "Print text", "Change fonts"], correctAnswer: 1 },
              { text: "In 5-Fold CV, the data is split into ____ pieces.", options: ["2", "5", "100", "50"], correctAnswer: 1 },
              { text: "The '.best_params_' attribute tells you ____.", options: ["The file size", "The winning settings found by the search", "The CPU speed", "The RAM"], correctAnswer: 1 },
              { text: "Meta-Programming is ____.", options: ["Playing a game", "Writing code that generates or optimizes other code/models", "History", "Drawing"], correctAnswer: 1 },
              { text: "Grid Search ensures you find the ____ best combination.", options: ["Maybe", "Globally (within your grid)", "Locally only", "Never"], correctAnswer: 1 },
              { text: "Squeezing accuracy means ____.", options: ["Deleting code", "Iteratively optimizing every part of the ML workflow", "Making text bold", "Buying a new PC"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "ML Project", 
            topics: ["Cross-Domain AI", "Recommendation Engines", "Model Stewardship", "Full-Stack Deployment"],
            content: `### The Professional Culmination\n\nCongratulations. You have completed Term 1 of SSS 2. You have moved beyond simple models into the world of **Advanced AI Architecture**. You've mastered SVMs, Clustering, Random Forests, Regularization, and Automated Tuning. Now, you will build a system that represents the pinnacle of modern data engineering: a **Product Recommender Engine**. \n\n### The Intelligence of Choice\n\nWe will build a system similar to those used by Amazon or Netflix. You'll take raw shopping data and build an **Ensemble Model** that can predict if a customer will like a product they haven't seen yet. This requires combining **Clustering** (to find similar users) with **Classification** (to predict interest). This is **Hybrid AI Architecture**. \n\n\`\`\`python\n# The Advanced Ensemble Workflow\noptimized_svc = GridSearchCV(SVC(), svm_grid, cv=5).fit(X, y)\nforest_model = RandomForestClassifier(n_estimators=500).fit(X, y)\n# Voting classifier: combining multiple models for one answer\nfinal_model = VotingClassifier(estimators=[('svc', optimized_svc), ('rf', forest_model)])\n\`\`\`\n\n### Deployment and Stewardship\n\nWe will finalize your project by preparing it for **Cloud Deployment**. You'll write a 'Technical Architecture Doc' explaining how your system scales and how you prevent bias. You are moving from 'Building projects' to **Leading Innovation**. \n\n:::ML LEAD PROTOCOL:::\nWe will build a 'Recommender App' that takes a user ID and returns 5 personalized product suggestions with confidence levels. By the end of this module, you'll be a **Machine Learning Associate Engineer**, possessing the full set of skills required to lead AI initiatives in any modern tech company. You have completed the first third of your second year. The machine is learning from you.`,
            assignment: "End-to-end model", 
            pocketProject: "Product recommender", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Recommendation Engine'?", options: ["A type of search bar", "An AI system that predicts user preference for items (like Netflix suggestions)", "A game", "A video player"], correctAnswer: 1 },
              { text: "Hybrid Architecture involves ____.", options: ["One line of code", "Combining different types of ML (like Clustering + Classification)", "Using a mouse", "Printing"], correctAnswer: 1 },
              { text: "A 'Voting Classifier' works by ____.", options: ["Random guessing", "Taking the final prediction based on the majority vote of multiple models", "Asking the user", "Deleting code"], correctAnswer: 1 },
              { text: "What is 'Model Stewardship' in SSS 2?", options: ["Selling the model", "Responsibility for the accuracy, ethics, and performance of a complex system", "Buying a server", "Writing text"], correctAnswer: 1 },
              { text: "Term 1 of SSS 2 focused on ____.", options: ["Basic HTML", "Deep Machine Learning and Ensemble Methods", "History", "Drawing"], correctAnswer: 1 },
              { text: "Personalization in AI means ____.", options: ["Adding your name", "Tailoring outputs to individual user behavior and data", "Changing themes", "Making text big"], correctAnswer: 1 },
              { text: "Ensemble systems are generally ____.", options: ["Less accurate", "More robust and accurate than single models", "Slower and worse", "Only for games"], correctAnswer: 1 },
              { text: "Cloud Deployment means ____.", options: ["Making it rain", "Running your AI on a remote server accessible via the internet", "Closing the PC", "Deleting the code"], correctAnswer: 1 },
              { text: "A Recommender Engine creates value by ____.", options: ["Showing everything", "Reducing the 'Search Cost' for users by showing them what they actually want", "Printing text", "Hiding data"], correctAnswer: 1 },
              { text: "Congratulations on completing SSS 2 Term 1! Ready for SSS 2 Term 2?", options: ["No", "Yes! High-performance TensorFlow and AI awaits!", "Maybe", "I'm retiring"], correctAnswer: 1 }
            ]
          },
        ]
      },
      {
        id: "sss2-t2",
        name: "2nd Term – TensorFlow & AI",
        lessons: [
          { 
            id: 1, 
            title: "Intro to TensorFlow", 
            topics: ["Tensors", "Computation Graphs", "Keras API", "Matrix Operations"],
            content: `### The Engine of Modern AI\n\nYou've used Scikit-Learn. Now, we enter the big leagues: **TensorFlow**. Created by Google, TensorFlow is the engine behind Google Search, Translate, and the world's most advanced robots. In this lesson, we learn why 'Tensors' are the fundamental building blocks of all AI. This is **High-Performance Computation**. We are moving from 'DataFrames' to **Multidimensional Tensors**.\n\n### What is a Tensor?\n\nWe will explore the **Tensor**. In simple terms, a tensor is a container for numbers. A 0D tensor is a single number (scalar), a 1D tensor is a list (vector), and a 2D tensor is a table (matrix). In Deep Learning, we often use 4D or 5D tensors to represent batches of images or videos. You'll learn how to perform math on these structures at lightning speed. This is **Matrix Algebra**.\n\n\`\`\`python\nimport tensorflow as tf\n\n# Creating a professional 2D Tensor (Matrix)\nx = tf.constant([[1.0, 2.0], [3.0, 4.0]])\ny = tf.constant([[5.0, 6.0], [7.0, 8.0]])\n\n# Matrix multiplication - the bread and butter of AI\nz = tf.matmul(x, y)\n\`\`\`\n\n### Keras and Computation Graphs\n\nWe will tackle **Keras**—the high-level API that makes building deep learning models as easy as stacking LEGO blocks. You'll also learn about 'Computation Graphs', understanding how TensorFlow plans out complex math before executing it on a GPU. \n\n:::TENSOR ARCHITECT PROTOCOL:::\nWe will build a 'Tensor Visualizer' that displays how data changes shape as it passes through a neural network. By the end of this module, you'll be a **TensorFlow Associate**, capable of initializing and manipulating the high-dimensional data structures used in modern research labs. You are moving from 'Variables' to **Tensors**, developing the spatial mathematical thinking needed for neural networks. Think in dimensions.`,
            assignment: "Installation & Config", 
            pocketProject: "Tensor visualizer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is TensorFlow?", options: ["A video editor", "An open-source library for high-performance numerical computation and AI", "A type of database", "A game engine"], correctAnswer: 1 },
              { text: "A 'Tensor' is essentially a ____.", options: ["Website", "Multidimensional array of numbers", "String of text", "User input"], correctAnswer: 1 },
              { text: "A 1D Tensor is also known as a ____.", options: ["Scalar", "Vector", "Matrix", "Cube"], correctAnswer: 1 },
              { text: "A Matrix is a ____ Tensor.", options: ["0D", "1D", "2D", "3D"], correctAnswer: 2 },
              { text: "Keras is the ____ interface for TensorFlow.", options: ["Low-level", "High-level (user-friendly)", "Secret", "Broken"], correctAnswer: 1 },
              { text: "tf.matmul() is used for ____.", options: ["Adding numbers", "Matrix Multiplication", "Printing text", "Deleting files"], correctAnswer: 1 },
              { text: "A GPU is often used for TensorFlow because it is ____.", options: ["Cheaper", "Optimized for parallel matrix math (faster training)", "Bigger", "Greener"], correctAnswer: 1 },
              { text: "Computation Graphs help TensorFlow ____.", options: ["Draw pictures", "Optimize and schedule math operations", "Hide code", "Play music"], correctAnswer: 1 },
              { text: "TensorFlow was created by ____.", options: ["Microsoft", "Google Brain Team", "Apple", "Netflix"], correctAnswer: 1 },
              { text: "Deep Learning models are built by ____ layers together.", options: ["Multiplying", "Stacking (Sequential)", "Dividing", "Formatting"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Neural Networks", 
            topics: ["Artifical Neurons", "Hidden Layers", "Activation Functions (ReLU, Softmax)", "Dense Connections"],
            content: `### Architecting the Digital Brain\n\nHow does a machine 'Think'? It mimics the human brain. In this lesson, we master the **Neural Network**—the core architecture of Deep Learning. We move beyond simple logic into 'Soft Computing', where computers learn to recognize patterns that are too complex for human-written code. This is **Neural Engineering**. We are moving from 'Functions' to **Layers**.\n\n### The Artificial Neuron\n\nWe will explore the **Perceptron**. You'll learned how a single artificial neuron takes inputs, gives them 'Weights', adds a 'Bias', and passes them through an **Activation Function**. This is the mathematical 'Bang' that determines if a neuron 'Fires' or stays silent. You'll master the **ReLU (Rectified Linear Unit)**—the world's most used activation function. This is **Non-Linear Mapping**.\n\n\`\`\`python\nfrom tensorflow.keras import layers, models\n\n# Building a professional Multi-Layer Perceptron (MLP)\nmodel = models.Sequential([\n  layers.Dense(64, activation='relu', input_shape=(784,)), # Hidden Layer\n  layers.Dense(32, activation='relu'),                     # Hidden Layer\n  layers.Dense(10, activation='softmax')                   # Output Layer\n])\n\`\`\`\n\n### Layers and Softmax\n\nWe will tackle **Hidden Layers**. You'll understand why adding more layers allows a network to understand deeper concepts (like eyes, then faces, then identities). We explore the **Softmax** function, which turns raw numbers into 'Probabilities'—telling you, for example, that an image is 98% a cat and 2% a dog. \n\n:::NEURAL ARCHITECT PROTOCOL:::\nWe will build a 'Deep Digit Recognizer' that can read handwritten numbers with human-like accuracy. By the end of this module, you'll be an **AI Design Specialist**, capable of architecting complex multi-layer networks for any data challenge. You are moving from 'Coding' to **Designing Intelligence**, developing the structural thinking needed for deep learning research. The brain is now in your hands.`,
            assignment: "Building Layers", 
            pocketProject: "Deep digit recognizer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "An Artificial Neuron is inspired by ____.", options: ["A transistor", "The biological neurons in the human brain", "A car engine", "A book"], correctAnswer: 1 },
              { text: "What is an 'Activation Function'?", options: ["A start button", "A mathematical filter that decides if a neuron's signal is important (fires)", "A type of memory", "A color"], correctAnswer: 1 },
              { text: "ReLU (Rectified Linear Unit) is popular because it ____.", options: ["Is slow", "Is simple, fast to compute, and helps networks learn better", "Is blue", "Is secret"], correctAnswer: 1 },
              { text: "A 'Dense' layer means ____.", options: ["It's hard to read", "Every neuron in the layer is connected to every neuron in the next layer", "It has no data", "It's small"], correctAnswer: 1 },
              { text: "The 'Input Shape' defines ____.", options: ["The font", "The dimensions of the incoming data (like 28x28 pixels)", "The color", "The file name"], correctAnswer: 1 },
              { text: "Hidden Layers are located between ____ and ____.", options: ["Mouse and Screen", "Input and Output layers", "Python and C++", "RAM and CPU"], correctAnswer: 1 },
              { text: "Adding more layers allows a network to learn ____.", options: ["Random text", "Increasingly complex and abstract patterns", "Nothing", "How to sleep"], correctAnswer: 1 },
              { text: "The Softmax activation is usually used in the ____.", options: ["Input layer", "Output layer (for classification probabilities)", "Hidden layer", "GPU"], correctAnswer: 1 },
              { text: "Weights in a neuron represent the ____ of an input.", options: ["Name", "Importance or strength", "Color", "Size"], correctAnswer: 1 },
              { text: "A Multi-Layer Perceptron (MLP) is a basic ____.", options: ["Calculator", "Neural Network architecture", "Website", "Game"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Model Training", 
            topics: ["Backpropagation", "Loss Functions", "Optimizers (Adam, SGD)", "Gradient Descent"],
            content: `### The Science of Learning\n\nA neural network starts with random weights—it essentially knows nothing. How does it learn? In this lesson, we master **Model Training**. We dive into the mathematical magic of **Backpropagation** and **Optimization**. This is the feedback loop that allows an AI to learn from its own mistakes. This is **Algorithmic Self-Correction**. We are moving from 'Randomness' to **Precision**.\n\n### Loss and Gradients\n\nWe will explore **Loss Functions**. Think of 'Loss' as a score of 'How wrong the AI is'. A high loss means the AI is guessing poorly. You'll learn how the network uses **Gradient Descent** to calculate exactly how much to 'Turn the knobs' of its weights to make the loss go down. This is **Calculus in Action**. We tackle **Adam**—the world-class optimizer that manages learning speed automatically. \n\n\`\`\`python\n# Compiling the model with loss and optimizer\nmodel.compile(\n  optimizer='adam',\n  loss='categorical_crossentropy',\n  metrics=['accuracy']\n)\n\n# The training process: Epochs and Batches\nmodel.fit(X_train, y_train, epochs=20, batch_size=32)\n\`\`\`\n\n### Epochs and Batches\n\nWe will tackle **Epochs**—the number of times the AI looks at the entire dataset. You'll understand why too many epochs lead to 'Overfitting' (memorization) while too few lead to 'Underfitting' (cluelessness). We also explore **Batch Size**, learning how to feed data in small chunks to keep the computer's memory stable. \n\n:::TRAINING COMMANDER PROTOCOL:::\nWe will build a 'Training Monitor' that visualizes the AI's 'Dying Error' as it learns to solve a problem in real-time. By the end of this module, you'll be a **Deep Learning Specialist**, capable of steering the complex training process of global-scale AI models. You are moving from 'Building' to **Teaching**, developing the analytical patience needed for professional AI development. The error is your guide.`,
            assignment: "Epochs & Batches", 
            pocketProject: "Training monitor", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Backpropagation'?", options: ["Moving data forward", "The algorithm that calculates how to adjust weights by moving the error backward from the output to inputs", "Deleting code", "Printing text"], correctAnswer: 1 },
              { text: "A 'Loss Function' measures ____.", options: ["Speed", "How poorly the model is performing (the error)", "Weight", "Memory"], correctAnswer: 1 },
              { text: "An 'Optimizer' is responsible for ____.", options: ["Drawing", "Updating the model's weights to minimize the loss", "Sounding", "Closing"], correctAnswer: 1 },
              { text: "What is an 'Epoch'?", options: ["A type of computer", "One complete pass of the entire training dataset through the network", "A file", "A variable"], correctAnswer: 1 },
              { text: "Batch Size refers to ____.", options: ["The total data size", "The number of training examples used in one iteration to update weights", "The screen size", "The font"], correctAnswer: 1 },
              { text: "Adam is a popular type of ____.", options: ["Data", "Optimizer", "Layer", "Function"], correctAnswer: 1 },
              { text: "If Loss is decreasing, the model is ____.", options: ["Failing", "Learning / Improving", "Sleeping", "Deleting"], correctAnswer: 1 },
              { text: "Overfitting happens when a model ____.", options: ["Is too simple", "Memorizes the training data too well and fails on new data", "Is too fast", "Has no memory"], correctAnswer: 1 },
              { text: "Gradient Descent is like ____.", options: ["Walking up a hill", "Walking down a hill to find the lowest point of error", "Staying still", "Running in circles"], correctAnswer: 1 },
              { text: "Categorical Cross-Entropy is a loss function for ____.", options: ["Number prediction", "Multi-class classification", "Addition", "Drawing"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Model Testing", 
            topics: ["Early Stopping", "Dropout Layers", "Validation Split", "Learning Curves"],
            content: `### The Art of Knowing When to Stop\n\nTraining a neural network is like baking a cake—leave it in too long, and it burns (Overfitting); take it out too soon, and it's raw (Underfitting). In this lesson, we master **Model Evaluation** and the techniques that prevent your AI from 'Memorizing' the answers. This is **Deep Learning Stability**. We are moving from 'Training' to **Validation**.\n\n### Early Stopping and Dropout\n\nWe will explore **Early Stopping**. You'll learned how to build systems that automatically stop training the moment the AI's accuracy on 'New' data stops improving. We also tackle **Dropout Layers**—a fascinating technique where the computer randomly 'Turns Off' neurons during training to force the remaining ones to work harder and learn more robust patterns. This is **Algorithmic Resilience**.\n\n\`\`\`python\nfrom tensorflow.keras.callbacks import EarlyStopping\nfrom tensorflow.keras.layers import Dropout\n\n# Adding a Dropout layer to prevent memorization\nmodel.add(Dropout(0.2))\n\n# Setting up an 'Early Warning' system\ncallback = EarlyStopping(monitor='val_loss', patience=3)\nmodel.fit(X_train, y_train, validation_split=0.2, callbacks=[callback])\n\`\`\`\n\n### Validation Split and Metrics\n\nWe will tackle the **Validation Split**. You'll understand why we always set aside a 'Secret' portion of data that the AI never sees during training, using it only to verify the truth. We explore **Confusion Matrices** for deep learning, learning how to tell if your model is confusing cats with dogs. \n\n:::VALIDATION GURU PROTOCOL:::\nWe will build a 'Testing Dashboard' that tracks the AI's performance across different data splits and highlights potential overfitting. By the end of this module, you'll be a **Model Calibration Specialist**, capable of delivering reliable AI systems that perform perfectly on data they've never seen before. You are moving from 'Developing' to **Auditing**, developing the skeptical and rigorous mindset needed for professional quality assurance. Don't trust the training score.`,
            assignment: "Validation Split", 
            pocketProject: "Testing dashboard", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Overfitting' in Deep Learning?", options: ["The model is too small", "The model memorizes the training data but fails to generalize to new data", "The model is too fast", "The model is invisible"], correctAnswer: 1 },
              { text: "What does 'Dropout' do?", options: ["Deletes the code", "Randomly ignores neurons during training to prevent the network from becoming too dependent on specific ones", "Saves the file", "Plays music"], correctAnswer: 1 },
              { text: "Early Stopping monitors ____.", options: ["The CPU temperature", "The validation loss (to stop training when it stops improving)", "The mouse cursor", "The font size"], correctAnswer: 1 },
              { text: "A Validation Split is used to ____.", options: ["Print data", "Test the model on unseen data during the training process", "Delete data", "Increase speed"], correctAnswer: 1 },
              { text: "If Training Accuracy is high but Validation Accuracy is low, you have ____.", options: ["A perfect model", "Overfitting", "Underfitting", "No data"], correctAnswer: 1 },
              { text: "The 'Patience' parameter in Early Stopping tells it how many ____ to wait.", options: ["Seconds", "Epochs with no improvement before stopping", "Hours", "Days"], correctAnswer: 1 },
              { text: "Model Stability means ____.", options: ["It doesn't crash", "The model gives consistent, reliable results on different data", "It has more colors", "It's short"], correctAnswer: 1 },
              { text: "A Confusion Matrix helps you see ____.", options: ["If you are confused", "Exactly which classes the model is confusing with each other", "A random number", "The weather"], correctAnswer: 1 },
              { text: "Deep Learning stability is reached by ____.", options: ["Luck", "Balancing complexity with regularization and validation", "Adding more RAM", "Using a faster mouse"], correctAnswer: 1 },
              { text: "Generalization is the goal of ____.", options: ["Every player", "Every AI model", "Only scientists", "Nobody"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "AI Ethics", 
            topics: ["Algorithmic Bias", "Explainable AI (XAI)", "Data Privacy", "Fairness Metrics"],
            content: `### The Moral Code\n\nAI is powerful, but it's not always 'Fair'. If you train an AI on biased data, it will produce biased results. In this lesson, we master **AI Ethics**. We move beyond 'How' to build AI, and ask 'Should' we build it this way? This is **Algorithmic Responsibility**. We are moving from 'Engineers' to **Stewards of Intelligence**.\n\n### Bias and Fairness\n\nWe will explore **Algorithmic Bias**. You'll learned how AI can accidentally learn human prejudices from historical data—affecting who gets a loan, who gets a job, or how medical care is prioritized. You'll learn how to audit your models for 'Fairness' using statistical metrics. This is **Social Data Science**. \n\n\`\`\`text\n# Ethics Audit Checklist\n1. Is the training data representative of all groups?\n2. Does the model perform equally well for different demographics?\n3. Can the model's decisions be explained (XAI)?\n4. What is the human impact if this AI makes an error?\n\`\`\`\n\n### Explainable AI (XAI)\n\nWe will tackle **Explainability**. A 'Black Box' AI that makes a decision without a reason is dangerous. You'll learn the techniques used to peek inside the neural network and see 'Why' it made a certain choice. This is **Transparency Engineering**. \n\n:::ETHICS AUDITOR PROTOCOL:::\nWe will build an 'Inclusion Checker' that audits a dataset for imbalances and predicts where an AI might exhibit unfair bias. By the end of this module, you'll be an **Ethical AI Strategist**, capable of leading the development of responsible, transparent, and fair software systems. You are moving from 'Power' to **Accountability**, developing the high-integrity mindset needed for leadership in the AI era. Code with a conscience.`,
            assignment: "Bias audit", 
            pocketProject: "Inclusion checker", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Algorithmic Bias'?", options: ["A fast algorithm", "When an AI produces unfair or prejudiced results due to biased training data", "A type of chart", "A save file"], correctAnswer: 1 },
              { text: "Explainable AI (XAI) is about ____.", options: ["Making AI more complex", "Making it possible for humans to understand why an AI made a certain decision", "Deleting AI", "Running AI faster"], correctAnswer: 1 },
              { text: "A 'Black Box' model is one where ____.", options: ["It's painted black", "The internal decision-making is hidden or too complex for humans to understand", "It only works at night", "It's broken"], correctAnswer: 1 },
              { text: "Why is representative data important?", options: ["It's cheaper", "To ensure the AI treats all groups of people fairly and accurately", "It's bigger", "It's colorful"], correctAnswer: 1 },
              { text: "AI Ethics is the responsibility of ____.", options: ["Governments only", "The AI developers (you!)", "Nobody", "The mouse"], correctAnswer: 1 },
              { text: "Transparency in AI means ____.", options: ["Being invisible", "Being open about how data is used and how the AI reaches decisions", "Having no code", "Only using glass computers"], correctAnswer: 1 },
              { text: "Data Privacy involves ____.", options: ["Deleting data", "Managing and protecting sensitive user information ethically and legally", "Hiding data from yourself", "Selling data"], correctAnswer: 1 },
              { text: "An AI making a loan decision should be ____.", options: ["Secret", "Fair, explainable, and audited for bias", "Random", "Fast only"], correctAnswer: 1 },
              { text: "Algorithmic Responsibility means ____.", options: ["Writing more code", "Being accountable for the real-world impact of your software", "Buying a server", "Ignoring errors"], correctAnswer: 1 },
              { text: "Integrity in AI is ____.", options: ["Optional", "Essential for building trust and safe systems", "A type of loop", "A font"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "AI Project", 
            topics: ["Computer Vision", "Layer Engineering", "Deep Model Tuning", "Performance Benchmarking"],
            content: `### The Deep Learning Masterpiece\n\nCongratulations. You have completed the core Deep Learning curriculum of SSS 2. You have mastered TensorFlow, neural network architecture, model stability, and ethical AI auditing. Now, you will build the 'Eye' of the machine: an **Image Recognizer**. This is **Computer Vision**. \n\n### The Vision System\n\nUsing the famous **Fashion MNIST** dataset, you will build a multi-layer neural network capable of recognizing clothing items (shoes, shirts, bags) with professional accuracy. You'll need to use every skill you've learned: **Dense layers** for classification, **ReLU** for non-linearity, **Dropout** to prevent overfitting, and an **Adam optimizer** to find the truth. \n\n\`\`\`python\n# The Term 2 Capstone: Deep Image Recognizer\nmodel = models.Sequential([\n    layers.Flatten(input_shape=(28, 28)),\n    layers.Dense(128, activation='relu'),\n    layers.Dropout(0.2),\n    layers.Dense(10, activation='softmax')\n])\n\nmodel.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\nmodel.fit(train_images, train_labels, epochs=10)\n\`\`\`\n\n### The Future of Vision\n\nWe will finalize your project with a **Performance Audit**, analyzing where your model succeeds and where it fails. You are moving from 'Student' to **AI Innovator**. \n\n:::DEEP LEARNING LEAD PROTOCOL:::\nWe will build a 'Live Recognizer' that takes an image and outputs its category with a confidence percentage. By the end of this module, you'll be a **Deep Learning Specialist**, possessing the foundational skills required to enter the world of CNNs and RNNs in SSS 3. You've completed two-thirds of your second year. The machine can now see.`,
            assignment: "TensorFlow model", 
            pocketProject: "Image recognizer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Computer Vision'?", options: ["A headset", "The field of AI that enables computers to 'see' and interpret visual information", "A video game", "A glasses brand"], correctAnswer: 1 },
              { text: "Fashion MNIST is a dataset of ____.", options: ["Cars", "Clothing items (shirts, shoes, bags)", "Phones", "Trees"], correctAnswer: 1 },
              { text: "The Flatten layer is used to ____.", options: ["Add color", "Convert a 2D image (matrix) into a 1D vector for processing in Dense layers", "Delete data", "Save files"], correctAnswer: 1 },
              { text: "A 'Confidence Percentage' tells you ____.", options: ["The file size", "How sure the AI is about its prediction", "The RAM usage", "The price"], correctAnswer: 1 },
              { text: "Term 2 of SSS 2 focused on ____.", options: ["Basic CSS", "Deep Learning and Neural Networks with TensorFlow", "History", "Drawing"], correctAnswer: 1 },
              { text: "Benchmarking means ____.", options: ["Sitting on a bench", "Comparing your model's performance against standard metrics or other models", "Deleting code", "Printing text"], correctAnswer: 1 },
              { text: "Success in Image Recognition requires ____.", options: ["One layer only", "Correct data preprocessing and optimized layer architecture", "Random luck", "A high-end mouse"], correctAnswer: 1 },
              { text: "Multilayer networks allow for ____ level features.", options: ["Single", "Hierarchical (complex features built from simple ones)", "No", "Random"], correctAnswer: 1 },
              { text: "A 'Dense' model for vision is ____.", options: ["Professional and high-end", "The foundation for CNNs (Convolutional Neural Networks)", "A mistake", "Invisible"], correctAnswer: 1 },
              { text: "Congratulations on SSS 2 Term 2! Are you ready for Term 3 (Systems & Engineering)?", options: ["No", "Yes! Advancing to Backend & Full Systems!", "Maybe", "I'm retiring"], correctAnswer: 1 }
            ]
          },
        ]
      },
      {
        id: "sss2-t3",
        name: "3rd Term – Data Engineering & Systems",
        lessons: [
          { 
            id: 1, 
            title: "Advanced Database", 
            topics: ["NoSQL Architecture", "MongoDB", "JSON/BSON Storage", "Horizontal Scaling"],
            content: `### Beyond the Table\n\nYou've mastered SQL and relational tables. Now, we enter the world of **NoSQL**. In this lesson, we master **MongoDB**—the leading document database designed for the speed and flexibility of modern AI applications. In the era of Big Data, we move from 'Rows' to **Documents**. This is **Schema-less Architecture**. We are moving from 'Fixed Structures' to **Dynamic Data**.\n\n### Document-Oriented Storage\n\nWe will explore the **BSON (Binary JSON)** format. You'll learn how to store complex, nested data structures in a single document, eliminating the need for complex SQL 'Joins'. This is particularly powerful for AI applications where data shapes change constantly as you test new models. You'll master **Collections** and **Aggregations**. This is **High-Velocity Storage**.\n\n\`\`\`javascript\n// A professional MongoDB document for an AI user profile\n{\n  "user_id": "u4321",\n  "preferences": {\n    "theme": "dark",\n    "languages": ["Python", "JavaScript"]\n  },\n  "last_prediction_score": 0.98,\n  "tags": ["AI_ENTHUSIAST", "SSS2_STUDENT"]\n}\n\`\`\`\n\n### Scaling and Availability\n\nWe will tackle **Horizontal Scaling**. You'll understand how NoSQL databases scale by 'Sharding' (splitting) data across multiple servers, allowing your application to handle millions of users simultaneously. We explore **Replica Sets**, ensuring that even if one server dies, your AI system stays online. \n\n:::DATA ARCHITECT PROTOCOL:::\nWe will build a 'MongoDB Service' that manages a fleet of AI-generated content with sub-millisecond retrieval times. By the end of this module, you'll be a **NoSQL Specialist**, capable of designing the flexible and massive data layers required for global-scale AI platforms. You are moving from 'Storage' to **Data Infrastructure**, developing the scalable thinking needed for modern data engineering. The schema is yours to define.`,
            assignment: "NoSQL patterns", 
            pocketProject: "MongoDB service", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does 'NoSQL' stand for?", options: ["No SQL allowed", "Not Only SQL (A non-relational database)", "New SQL only", "None of these"], correctAnswer: 1 },
              { text: "MongoDB is a ____ database.", options: ["Relational", "Document-oriented", "Table-based", "Paper"], correctAnswer: 1 },
              { text: "BSON is basically a binary version of ____.", options: ["HTML", "JSON", "CSS", "Python"], correctAnswer: 1 },
              { text: "A 'Collection' in MongoDB is similar to a ____ in SQL.", options: ["Row", "Table", "Column", "Database"], correctAnswer: 1 },
              { text: "Schema-less means ____.", options: ["You have no data", "The database doesn't enforce a rigid structure on documents", "The code is broken", "It's a secret"], correctAnswer: 1 },
              { text: "Horizontal Scaling involves ____.", options: ["Making one server bigger", "Adding more servers to handle the load", "Deleting servers", "Nothing"], correctAnswer: 1 },
              { text: "Aggregation in MongoDB is used for ____.", options: ["Printing", "Processing and analyzing data (like calculating averages)", "Saving files", "Drawing"], correctAnswer: 1 },
              { text: "A 'Document' in NoSQL represents ____.", options: ["One file", "A single record/object in a collection", "A whole database", "A screen"], correctAnswer: 1 },
              { text: "Which language is similar to MongoDB queries?", options: ["Java", "JavaScript (JSON style)", "C++", "R"], correctAnswer: 1 },
              { text: "High Availability is reached using ____.", options: ["One server", "Replica Sets (Multiple copies of data)", "No servers", "Tape"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Backend Systems", 
            topics: ["Redis Caching", "In-Memory Datastores", "Latenty Reduction", "Pub/Sub Messaging"],
            content: `### The Need for Speed\n\nIn the world of AI, milliseconds matter. If your database takes 500ms to answer, your user will leave. In this lesson, we master **In-Memory Systems** using **Redis**. Redis is the world's most popular 'Cache'—a system that stores data in RAM (Memory) rather than on a slow Hard Drive. This is **High-Performance Backend Engineering**. We are moving from 'Disk' to **RAM**.\n\n### Caching Strategies\n\nWe will explore **LRU (Least Recently Used) Caching**. You'll learned how to store the results of expensive AI predictions in memory so that if the same question is asked again, the answer is returned instantly. This is **Latency Optimization**. We tackle **TTL (Time To Live)**, learning how to make data automatically expire once it's no longer useful. This is **Memory Stewardship**.\n\n\`\`\`python\nimport redis\n\n# Connecting to a professional Redis cache\nr = redis.Redis(host='localhost', port=6379, db=0)\n\n# Storing an AI result for 1 hour (3600 seconds)\nr.setex("prediction:u1", 3600, "{\"result\": \"Success\"}")\n\n# Retrieving at the speed of light\nresult = r.get("prediction:u1")\n\`\`\`\n\n### Pub/Sub and Real-time Messaging\n\nWe will tackle **Redis Pub/Sub**. You'll understand how different parts of a massive system 'Talk' to each other by subscribing to channels. One part of your system can 'Publish' an AI result, and 100 other parts can receive it instantly. \n\n:::BACKEND MASTER PROTOCOL:::\nWe will build a 'Speedy API' that uses Redis to serve AI data 10x faster than a traditional database. By the end of this module, you'll be a **Caching Expert**, capable of optimizing the high-load systems that power millions of real-time AI interactions. You are moving from 'Logic' to **Performance**, developing the hardware-aware mindset needed for top-tier engineering. Every millisecond counts.`,
            assignment: "Redis caching", 
            pocketProject: "Speedy API", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is Redis primarily used for?", options: ["Writing documents", "Caching data in memory for extreme speed", "Drawing", "Editing videos"], correctAnswer: 1 },
              { text: "Where does Redis store its data?", options: ["The Hard Drive", "The RAM (Random Access Memory)", "A USB stick", "Online only"], correctAnswer: 1 },
              { text: "Latency refers to ____.", options: ["The size of a file", "The delay or time it takes to get a response", "The color of code", "A type of loop"], correctAnswer: 1 },
              { text: "TTL (Time To Live) in Redis means ____.", options: ["The code lives forever", "The data has an expiration time after which it is deleted", "The PC will restart", "A game mode"], correctAnswer: 1 },
              { text: "Pub/Sub stands for ____.", options: ["Print and Save", "Publish and Subscribe (a messaging pattern)", "Python and Swift", "Push and Stop"], correctAnswer: 1 },
              { text: "RAM is ____ than a Hard Drive.", options: ["Slower", "Much Faster", "The same speed", "Heavier"], correctAnswer: 1 },
              { text: "A 'Cache Hit' means ____.", options: ["The data was found in the fast cache", "The data was missing", "The server crashed", "A virus"], correctAnswer: 0 },
              { text: "Distributed Systems are systems that ____.", options: ["Don't work", "Run across multiple connected computers", "Only use one CPU", "Are for kids"], correctAnswer: 1 },
              { text: "Setting a 3600s TTL means ____.", options: ["1 minute", "1 hour", "1 day", "Forever"], correctAnswer: 1 },
              { text: "Redis is excellent for 'Leaderboards' because ____.", options: ["It's pretty", "It's extremely fast at updating and sorting numbers in real-time", "It uses no power", "It's free"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "API + Frontend Integration", 
            topics: ["WebSockets", "Socket.io", "Bi-directional Data", "Real-time Streaming"],
            content: `### The Living Application\n\nTraditional websites ask for data and wait for a response. But AI, chat apps, and live dashboards need to 'Push' data to the user instantly. In this lesson, we master **WebSockets**. We move beyond 'Request/Response' into **Bi-directional Communication**. This is **Real-Time Integration**. We are moving from 'Static Pages' to **Streaming Apps**.\n\n### WebSockets and Socket.io\n\nWe will explore the **WebSocket Protocol**. Unlike HTTP, which closes the connection after every message, WebSockets keep the pipe open. You'll learn how to use **Socket.io** to send data from your Python/Node server directly to the user's screen without them having to refresh the page. This is the secret behind live sports scores, chat apps (like WhatsApp), and real-time AI agents. \n\n\`\`\`javascript\n// Professional Socket.io connection (Frontend)\nconst socket = io("http://api.ai-server.com");\n\n// Listening for a live AI message\nsocket.on("new_prediction", (data) => {\n  console.log("AI Just said:", data.message);\n  updateDashboard(data);\n});\n\`\`\`\n\n### Bi-directional Flux\n\nWe will tackle **Events**. You'll understand how both the server and the client can 'Emit' events to each other at any time. We also dive into **Broadcasting**, learning how to send one update to 1,000 users simultaneously. \n\n:::REAL-TIME ARCHITECT PROTOCOL:::\nWe will build a 'Live Data Portal' that streams real-time AI probabilities to a beautiful dashboard. By the end of this module, you'll be a **Streaming Systems Specialist**, capable of building the hyper-responsive interfaces that modern users expect. You are moving from 'Building pages' to **Architecting Experiences**, developing the event-driven mindset needed for interactive software. The stream never stops.`,
            assignment: "Real-time updates", 
            pocketProject: "Live data portal", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'WebSocket'?", options: ["A type of browser", "A protocol that allows for constant, two-way communication between server and client", "A save button", "A coding style"], correctAnswer: 1 },
              { text: "WebSockets are 'Bi-directional', meaning ____.", options: ["Only the server talks", "Both server and client can send messages to each other at any time", "Data only moves one way", "The code is twice as long"], correctAnswer: 1 },
              { text: "Socket.io is a library that ____.", options: ["Plays music", "Simplifies the use of WebSockets with fallbacks and features", "Deletes data", "Starts the PC"], correctAnswer: 1 },
              { text: "Traditional HTTP is like ____, while WebSockets are like ____.", options: ["A phone call / A letter", "A letter / A phone call", "A car / A bike", "None"], correctAnswer: 1 },
              { text: "An 'Event' in Socket.io is a ____.", options: ["Party", "Named message that can carry data", "Error", "Font"], correctAnswer: 1 },
              { text: "Emit means ____.", options: ["To delete", "To send out a message/event", "To save", "To hide"], correctAnswer: 1 },
              { text: "Broadcasting is sending a message to ____.", options: ["One person", "All connected users simultaneously", "Nobody", "The admin only"], correctAnswer: 1 },
              { text: "WebSockets are used for ____.", options: ["Static blogs", "Real-time apps like Chat, Dashboards, and AI Agents", "Printed books", "Email"], correctAnswer: 1 },
              { text: "The connection in WebSockets is ____.", options: ["Closed every second", "Kept open (persistent)", "Deleted by the user", "Secret"], correctAnswer: 1 },
              { text: "Why is real-time important for AI?", options: ["It's pretty", "It allows the user to see AI thoughts and results as they happen", "It's cheap", "It's new"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Automation Systems", 
            topics: ["CI/CD Pipelines", "Docker Containers", "GitHub Actions", "Infrastructure as Code"],
            content: `### The Self-Updating System\n\nYou've built code. Now, we build **Pipelines**. In the professional world, you don't 'Upload' files manually; you commit code, and a robot automatically tests it, builds it, and deploys it to the world. In this lesson, we master **DevOps & CI/CD**. This is **Industrial Lifecycle Management**. We are moving from 'Coding' to **Continuous Delivery**.\n\n### CI/CD and GitHub Actions\n\nWe will explore **Continuous Integration (CI)** and **Continuous Deployment (CD)**. You'll learn how to write **GitHub Actions**—scripts that run every time you push code. These scripts will automatically run your AI tests, check your code for bugs, and ensure everything is perfect before the users see it. This is **Quality Assurance Automation**. We take the 'Human Error' out of the loop. \n\n\`\`\`yaml\n# A professional GitHub Action for AI Testing\nname: AI Model CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Run Model Unit Tests\n        run: python -m pytest tests/model_tests.py\n\`\`\`\n\n### Docker and Containerization\n\nWe will tackle **Docker**. You'll understand how to 'Containerize' your AI application, ensuring it runs exactly the same on your laptop, your friend's PC, and a massive cloud server. We explore **Images** and **Containers**, the fundamental units of modern software deployment. \n\n:::DEVOPS ARCHITECT PROTOCOL:::\nWe will build an 'Auto-Deploy Bot' that detects code changes and automatically updates a live AI service without any downtime. By the end of this module, you'll be a **DevOps Associate**, capable of managing the complex release cycles of world-class technology products. You are moving from 'Software' to **Systems**, developing the operational mindset needed for reliable engineering. If it's not automated, it's broken.`,
            assignment: "CI/CD flows", 
            pocketProject: "Auto-deploy bot", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does 'CI/CD' stand for?", options: ["Computer Input / Code Delivery", "Continuous Integration / Continuous Deployment", "Code Inspection / Cloud Design", "None"], correctAnswer: 1 },
              { text: "GitHub Actions are used to ____.", options: ["Play games", "Automate workflows like testing and deployment", "Write text", "Draw"], correctAnswer: 1 },
              { text: "What is a 'Pipeline' in DevOps?", options: ["A physical pipe", "A series of automated steps that code passes through from development to production", "A type of variable", "An error"], correctAnswer: 1 },
              { text: "Docker allows you to 'Containerize' an app, which means ____.", options: ["Putting it in a box", "Packaging software with all its dependencies so it runs anywhere", "Deleting the code", "Changing the color"], correctAnswer: 1 },
              { text: "Infrastructure as Code (IaC) means ____.", options: ["Writing code for buildings", "Managing servers and networks using configuration files/code", "Printing paper", "History"], correctAnswer: 1 },
              { text: "A 'Unit Test' in a CI pipeline is used to ____.", options: ["Add numbers", "Verify that individual pieces of code work correctly", "Slow down the build", "Print a report"], correctAnswer: 1 },
              { text: "Automation reduces 'Human Error' by ____.", options: ["Deleting humans", "Ensuring tasks are performed exactly the same way every time by robots", "Making code shorter", "Hiding files"], correctAnswer: 1 },
              { text: "A Docker 'Image' is like a ____.", options: ["Photo", "Blueprint or snapshot of a working system", "Screen", "Video"], correctAnswer: 1 },
              { text: "Downtime is when ____.", options: ["The sun sets", "A service is unavailable to users", "The PC is fast", "Code is blue"], correctAnswer: 1 },
              { text: "The Goal of DevOps is to ____.", options: ["Write more code", "Create a fast and reliable bridge between Development and Operations", "Buy more CPUs", "Draw"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "KPI Analytics", 
            topics: ["Predictive Analytics", "Forecasting", "Alert Triggers", "Data Storytelling"],
            content: `### The Oracle of Data\n\nYou have data. You have speed. Now, you need **Wisdom**. In this lesson, we master **KPI Analytics** (Key Performance Indicators). We move beyond 'Descriptive' analytics (what happened) into **Predictive Analytics** (what WILL happen). In a world of infinite signals, we learn to find the ones that matter most. This is **Strategic Intelligence**. We are moving from 'Charts' to **Forecasts**.\n\n### Predictive Metrics and Alerts\n\nWe will explore **Time-Series Forecasting**. You'll learned how to use your regression skills to predict future trends—like when a server might run out of memory or when a user might quit your app. We tackle **Alert Triggers**, creating systems that don't just 'Watch' data, but 'Act' when a KPI crosses a dangerous threshold. This is **Automated Vigilance**. \n\n\`\`\`javascript\n// Predictive KPI Alert logic\nconst currentKPI = getLatestMetric();\nconst predictedKPI = forecastNextHour();\n\nif (predictedKPI < CRITICAL_THRESHOLD) {\n  triggerEmergencyAlert("Warning: KPI predicted to drop below safety levels!");\n}\n\`\`\`\n\n### Data Storytelling\n\nWe will tackle **Narrative Data**. It's not enough to have a dashboard; you must be able to explain the 'Why' behind the numbers to leaders and stakeholders. You'll learn how to structure data visualizations to drive decisions. This is **Communication Engineering**. \n\n:::ANALYTICS LEAD PROTOCOL:::\nWe will build a 'Risk Dashboard' that uses predictive AI to highlight potential system failures before they happen. By the end of this module, you'll be a **KPI Analytics Specialist**, capable of turning raw data streams into the strategic insights that guide billion-dollar organizations. You are moving from 'Data' to **Insight**, developing the business-aware mindset needed for executive leadership. The future is written in the data.`,
            assignment: "Predictive metrics", 
            pocketProject: "Risk dashboard", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "Whas is a 'KPI'?", options: ["Keyboard Print Input", "Key Performance Indicator (a metric used to evaluate success)", "Known Python Import", "None"], correctAnswer: 1 },
              { text: "Predictive Analytics is about ____.", options: ["Explaining the past", "Forecasting future trends based on historical data", "Drawing", "Printing"], correctAnswer: 1 },
              { text: "A 'Threshold' in analytics is a ____.", options: ["Door", "Value that triggers an action if crossed", "Color", "Font"], correctAnswer: 1 },
              { text: "Time-Series data is data that is ____.", options: ["Random", "Ordered by time (e.g., stock prices per minute)", "Very large", "Hidden"], correctAnswer: 1 },
              { text: "Data Storytelling is the art of ____.", options: ["Writing a book", "Communicating complex insights through structured visuals and narrative", "Lying with data", "Hiding results"], correctAnswer: 1 },
              { text: "An 'Alert Trigger' is used to ____.", options: ["Annoy users", "Instantly notify the system/user when a KPI enters a critical state", "Save power", "Delete files"], correctAnswer: 1 },
              { text: "Forecasting helps organizations ____.", options: ["Spend more", "Prepare for future events and mitigate risks", "Go back in time", "Sleep better"], correctAnswer: 1 },
              { text: "A 'Risk Dashboard' focuses on ____.", options: ["Good news only", "Highlighting potential failures or dangerous trends", "Games", "Photos"], correctAnswer: 1 },
              { text: "Descriptive analytics tells you ____.", options: ["What will happen", "What has already happened", "Why it happened", "How to fix it"], correctAnswer: 1 },
              { text: "The peak of analytics is reached when data becomes ____.", options: ["Actionable (leads to a clear decision or action)", "Bigger", "Colorful", "Secret"], correctAnswer: 0 }
            ]
          },
          { 
            id: 6, 
            title: "Full System Project", 
            topics: ["System Design", "Load Balancing", "Cloud Orchestration", "Microservices"],
            content: `### The Engineering Epic\n\nCongratulations. You have completed the entire SSS 2 curriculum. You have mastered Machine Learning, Deep Learning, Data Engineering, and Automation. Now, you will build your masterpiece: a **Marketplace Backend Architecture**. This isn't just a 'Project'; it's a **System**. This is **Infrastructure Engineering**. \n\n### The Marketplace Engine\n\nIn this final project, you will design a system that can handle thousands of concurrent users. You'll need to use your **NoSQL (MongoDB)** skills for product catalogs, your **Redis** skills for fast price-checks, your **WebSocket** skills for live bid updates, and your **CI/CD** skills for automated deployment. This is the culmination of everything you've learned. \n\n\`\`\`text\n# System Architecture Overview\n1. Web Tier: React Frontend with Socket.io streaming.\n2. API Tier: FastAPI python backend with Load Balancing.\n3. Cache Tier: Redis for high-speed session management.\n4. Data Tier: MongoDB for flexible product and user storage.\n5. DevOps: GitHub Actions + Docker for 24/7 uptime.\n\`\`\`\n\n### Architectural Stewardship\n\nWe will finalize your project with a **System Design Document**, proving that your architecture is scalable, secure, and resilient. You are no longer just a coder; you are a **System Architect**. \n\n:::SYSTEM LEAD PROTOCOL:::\nWe will build a 'Marketplace Backend' that simulates a high-load environment and proves its stability through stress-testing. By the end of this module, you'll be a **Full System Engineer**, ready to enter SSS 3 and take on your Final Year Capstone Project. You've reached the summit of Year 2. The world of complex systems is yours to command.`,
            assignment: "Architecure diagram", 
            pocketProject: "Marketplace backend", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'System Design'?", options: ["Drawing a UI", "The process of defining the architecture, components, and data for a complex system to satisfy requirements", "Writing one file", "Buying a mouse"], correctAnswer: 1 },
              { text: "Load Balancing is used to ____.", options: ["Add weight", "Distribute incoming traffic across multiple servers to prevent any one server from being overwhelmed", "Slow the system", "Delete data"], correctAnswer: 1 },
              { text: "A Microservices architecture is where ____.", options: ["One file does everything", "An application is built as a collection of small, independent services", "Code is very tiny", "It's for small businesses only"], correctAnswer: 1 },
              { text: "Scalability is the ability of a system to ____.", options: ["Change colors", "Handle a growing amount of work or users gracefully", "Print paper", "Stay the same size"], correctAnswer: 1 },
              { text: "High-Load refers to a system with ____.", options: ["High weight", "Many concurrent users or data requests (e.g., 10,000 requests per second)", "A lot of text", "A big battery"], correctAnswer: 1 },
              { text: "In a Marketplace backend, WebSockets are used for ____.", options: ["Static images", "Real-time BID or PRICE updates", "Writing emails", "Saving files"], correctAnswer: 1 },
              { text: "Resilience means the system can ____.", options: ["Draw", "Recover quickly from difficulties or failures", "Stop working", "Be invisible"], correctAnswer: 1 },
              { text: "Cloud Orchestration is ____.", options: ["Making it rain", "Automated management and coordination of complex cloud services and containers", "History", "Drawing"], correctAnswer: 1 },
              { text: "Uptime refers to ____.", options: ["The time you wake up", "The percentage of time a service is operational and available to users", "A type of font", "A game score"], correctAnswer: 1 },
              { text: "Congratulations on SSS 2! What is the focus of SSS 3?", options: ["Kindergarten", "Final Capstone Project and Advanced Systems Masterclass", "Sports", "Drawing"], correctAnswer: 1 }
            ]
          },
        ]
      }
    ]
  },
  {
    id: "sss3",
    name: "SSS 3",
    icon: "🔵",
    color: "slate",
    terms: [
      {
        id: "sss3-t1",
        name: "1st Term – Advanced Systems & ML",
        lessons: [
          { 
            id: 1, 
            title: "Advanced Algorithms", 
            topics: ["Graph Theory", "Dijkstra's Algorithm", "BFS/DFS", "Topological Sorting"],
            content: `### Mapping the Interconnected World\n\nMost complex problems in the world—social networks, Google Maps, the internet itself—are not lists; they are **Graphs**. In this lesson, we master **Advanced Graph Theory**. This is the mathematical foundation of connectivity. We move beyond simple loops into **Structural Logic**. We are moving from 'Sequences' to **Networks**.\n\n### Nodes and Edges\n\nWe will explore **Graphs**. You'll learned how to represent data as 'Nodes' (points) and 'Edges' (connections). You'll master the difference between **Directed** (one-way) and **Undirected** graphs. This is the logic used by Facebook to suggest friends and by Amazon to suggest products. You'll dive deep into **BFS (Breadth-First Search)** and **DFS (Depth-First Search)**, the two fundamental ways to explore a network. \n\n\`\`\`python\nimport networkx as nx\n\n# Building a professional Social Network Graph\nG = nx.Graph()\nG.add_edge("Alice", "Bob")\nG.add_edge("Bob", "Charlie")\n\n# Finding the Shortest Path using Dijkstra\npath = nx.shortest_path(G, source="Alice", target="Charlie")\nprint(f"Connection Path: {path}")\n\`\`\`\n\n### Dijkstra and Optimization\n\nWe will tackle **Shortest Path Algorithms**. You'll master **Dijkstra's Algorithm**, the same logic used by your GPS to find the fastest way home. We also explore **Topological Sorting**, used by compilers and project management tools to determine the correct order of dependencies. \n\n:::ALGORITHMIC LEAD PROTOCOL:::\nWe will build a 'Network Analyzer' that calculates the most 'Influential' people in a social network using PageRank-style logic. By the end of this module, you'll be an **Algorithmic Architect**, capable of solving the highest-level optimization problems in computer science. You are moving from 'Solving' to **Mapping**, developing the spatial logical thinking needed for advanced engineering. Everything is connected.`,
            assignment: "Graph theory", 
            pocketProject: "Network analyzer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "In Graph Theory, a 'Node' is ____.", options: ["A connection", "A point or entity in the network", "A file", "A line"], correctAnswer: 1 },
              { text: "What is an 'Edge'?", options: ["The end of a page", "The connection between two nodes", "A type of browser", "A variable"], correctAnswer: 1 },
              { text: "Dijkstra's Algorithm is used for ____.", options: ["Sorting names", "Finding the shortest path between nodes", "Drawing circles", "Deleting data"], correctAnswer: 1 },
              { text: "BFS (Breadth-First Search) explores a graph ____.", options: ["Randomly", "Layer by layer (closest neighbors first)", "Depth first", "By skipping nodes"], correctAnswer: 1 },
              { text: "A 'Directed Graph' means ____.", options: ["The edges have a specific direction (one-way)", "The connections are secret", "It has no edges", "It's for movies"], correctAnswer: 0 },
              { text: "Graph Theory is used by Google Maps to ____.", options: ["Take photos", "Calculate the best route through a network of roads", "Show colors", "Record sounds"], correctAnswer: 1 },
              { text: "A 'Cycle' in a graph is ____.", options: ["A bicycle", "A path that starts and ends at the same node", "A type of loop", "A mistake"], correctAnswer: 1 },
              { text: "Topological Sorting is useful for ____.", options: ["Cooking", "Determining the order of tasks with dependencies", "Drawing", "Printing"], correctAnswer: 1 },
              { text: "NetworkX is a Python library for ____.", options: ["Playing music", "Complex network analysis and graph manipulation", "Editing text", "Managing files"], correctAnswer: 1 },
              { text: "Connectivity in a graph refers to ____.", options: ["The internet speed", "Whether there is a path between nodes", "The number of colors", "The battery life"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Data Engineering", 
            topics: ["ETL Pipelines", "Data Lakes vs Warehouses", "Batch vs Stream Processing", "Apache Spark Basics"],
            content: `### The Pipeline of modern Industry\n\nAI is only as good as the data it consumes. In the real world, data is messy, huge, and scattered across different servers. In this lesson, we master **Data Engineering**. We move beyond 'Reading CSVs' into building **ETL Pipelines** (Extract, Transform, Load). This is **Large-Scale Information Logistics**. We are moving from 'Data Science' to **Data Systems**.\n\n### Extract, Transform, Load (ETL)\n\nWe will explore the **ETL Lifecycle**. You'll learned how to 'Extract' data from databases, APIs, and logs; 'Transform' it into a clean, structured format for AI; and 'Load' it into a high-performance **Data Warehouse**. This is the backbone of companies like Netflix and Uber. You'll master **Data Cleaning at Scale**, learning how to handle millions of missing or corrupt records automatically. \n\n\`\`\`python\n# A simplified professional ETL flow\ndef etl_pipeline():\n    raw_data = extract_from_api("source_url")\n    clean_data = transform_remove_outliers(raw_data)\n    load_to_production_warehouse(clean_data)\n\n# Managing Big Data flows\nprint("Pipeline Running: Data Logistics in progress...")\n\`\`\`\n\n### Lakes, Warehouses, and Spark\n\nWe will tackle **Data Lakes vs Warehouses**. You'll understand where to store 'Raw' data versus 'Processed' data. We take a first look at **Apache Spark**, the world's standard for processing massive 'Big Data' datasets that are too large for a single computer. \n\n:::DATA ENGINEER PROTOCOL:::\nWe will build a 'Big Data Cleaner' that can process and standardize 1,000,000+ data points in seconds. By the end of this module, you'll be a **Data Engineering Specialist**, possessing the skills requested by the world's largest tech companies. You are moving from 'Analyzing Data' to **Building Data Engines**, developing the industrial mindset needed for enterprise AI. The data is fuel; you are the refinery.`,
            assignment: "ETL Pipelines", 
            pocketProject: "Big data cleaner", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does ETL stand for?", options: ["Edit, Track, Look", "Extract, Transform, Load", "Extra Time Logic", "None"], correctAnswer: 1 },
              { text: "A 'Data Warehouse' is used for ____.", options: ["Storing random files", "Storing clean, structured data for analysis and AI", "Keeping physical computers", "Drawing"], correctAnswer: 1 },
              { text: "Data Engineering is focused on ____.", options: ["Making charts pretty", "Building the infrastructure and pipelines that move and prepare data", "Writing blog posts", "Playing games"], correctAnswer: 1 },
              { text: "A 'Data Lake' is typically for ____.", options: ["Fishing", "Storing raw, unstructured data in its natural format", "Saving code only", "Printing"], correctAnswer: 1 },
              { text: "Extracting data means ____.", options: ["Deleting it", "Retrieving data from a source (like an API or Database)", "Hiding it", "Drawing it"], correctAnswer: 1 },
              { text: "Apache Spark is used for ____.", options: ["Editing photos", "Processing massive 'Big Data' across many computers", "Writing CSS", "Sound editing"], correctAnswer: 1 },
              { text: "Transforming data involves ____.", options: ["Changing its color", "Cleaning, reformatting, and preparing data for use", "Deleting everything", "Moving it to the trash"], correctAnswer: 1 },
              { text: "Batch Processing is ____.", options: ["Processing data one by one", "Processing large blocks of data at specific times (e.g., nightly)", "Playing music", "A type of font"], correctAnswer: 1 },
              { text: "Stream Processing is ____.", options: ["Watching a movie", "Processing data in real-time as it arrives", "Drawing", "Writing letters"], correctAnswer: 1 },
              { text: "Quality Control in data engineering ensures ____.", options: ["The code is short", "The data is accurate and reliable for AI models", "The fonts are nice", "The screen is bright"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "TensorFlow Advanced", 
            topics: ["CNNs for Vision", "RNNs for Sequences", "Pooling Layers", "LSTM (Long Short-Term Memory)"],
            content: `### Mastering the Deep Architectures\n\nYou've built basic neural networks. Now, we master the specialized architectures that changed the world. In this lesson, we dive into **Advanced TensorFlow**. We move beyond 'Dense' layers into **CNNs** for images and **RNNs** for text and time. This is **Deep Architectural Engineering**. We are moving from 'Seeing' to **Understanding**.\n\n### Convolutional Neural Networks (CNN)\n\nWe will explore **CNNs**. You'll learned how 'Convolution' layers act like digital filters, detecting edges, shapes, and finally objects. You'll master **Pooling Layers**, which shrink images to save memory while keeping the most important information. This is the technology inside self-driving cars and medical imaging AI. This is **Visual Feature Extraction**.\n\n\`\`\`python\nfrom tensorflow.keras import layers, models\n\n# Building a professional Convolutional Neural Network (CNN)\nmodel = models.Sequential([\n    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),\n    layers.MaxPooling2D((2, 2)),\n    layers.Flatten(),\n    layers.Dense(64, activation='relu'),\n    layers.Dense(1, activation='sigmoid')\n])\n\`\`\`\n\n### Recurrent Neural Networks (RNN) and LSTM\n\nWe will tackle **RNNs**. You'll understand why traditional networks can't remember the past, and how RNNs use 'Loops' to process sequences like speech and long text. We delve into **LSTM (Long Short-Term Memory)**—the genius architecture that allows an AI to remember information from 1,000 steps ago. \n\n:::DEEP VISION PROTOCOL:::\nWe will build a 'Video Frame Analyzer' that can detect objects and track their movement over time. By the end of this module, you'll be a **Deep Learning Expert**, capable of architecting the specialized networks used in world-leading AI research labs. You are moving from 'Stacks' to **Complex Structures**, developing the high-dimensional thinking needed for vision and language AI. The machine is becoming aware.`,
            assignment: "CNN vs RNN", 
            pocketProject: "Video frame analyzer", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What does 'CNN' stand for?", options: ["Cable News Network", "Convolutional Neural Network", "Code Node Network", "None"], correctAnswer: 1 },
              { text: "CNNs are primarily used for ____ tasks.", options: ["Audio only", "Image and Vision", "Simple math", "Printing text"], correctAnswer: 1 },
              { text: "A 'Convolution' in a CNN acts like a ____.", options: ["Battery", "Filter that detects specific features (like edges)", "Save button", "Font style"], correctAnswer: 1 },
              { text: "MaxPooling is used to ____.", options: ["Make images bigger", "Reduce the spatial dimensions (size) of data to save memory and focus on key features", "Add color", "Delete code"], correctAnswer: 1 },
              { text: "What does 'RNN' stand for?", options: ["Random Node Network", "Recurrent Neural Network", "Read Note Now", "None"], correctAnswer: 1 },
              { text: "RNNs are best for ____ data.", options: ["Static photos", "Sequential data (Text, Speech, Time-series)", "Colors", "Single numbers"], correctAnswer: 1 },
              { text: "LSTM (Long Short-Term Memory) solves the problem of ____.", options: ["Long code", "The network 'forgetting' information over long sequences", "Slow CPUs", "Small RAM"], correctAnswer: 1 },
              { text: "A CNN's 'Input Shape' for a color image usually has ____ channels.", options: ["1", "3 (Red, Green, Blue)", "10", "100"], correctAnswer: 1 },
              { text: "Sequence Modeling involves ____.", options: ["Drawing lines", "Predicting the next item in a sequence based on previous ones", "Naming files", "Printing"], correctAnswer: 1 },
              { text: "Deep Learning Architectures allow for ____ level learning.", options: ["Basic", "Hierarchical (complex patterns from simple features)", "Zero", "Random"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Deep Learning Concepts", 
            topics: ["Transformers", "Attention Mechanisms", "Self-Attention", "Multi-head Attention"],
            content: `### The Age of Transformers\n\nIn 2017, a paper titled "Attention Is All You Need" changed the world forever. It introduced the **Transformer**—the architecture behind ChatGPT, BERT, and every modern AI miracle. In this lesson, we master the **Attention Mechanism**. We move beyond 'Processing' data into 'Focusing' on what matters. This is **Generative Deep Learning**. We are moving from 'Recurrence' to **Parallelism**.\n\n### Self-Attention and Context\n\nWe will explore **Self-Attention**. You'll learned how a Transformer looks at every word in a sentence simultaneously and calculates which words are most related to each other. In the sentence 'The bank of the river', the model uses attention to know that 'bank' refers to land, not money. This is **Contextual Understanding**. This is why Transformers are 100x more powerful than previous models. This is **Positional Encoding**.\n\n\`\`\`python\n# Concept: The Scaled Dot-Product Attention\n# Query, Key, and Value matrices are the core of the brain\nattention_score = softmax((Q @ K.T) / sqrt(d_k)) @ V\n\nprint("Transformer Logic: Focusing on the most relevant features...")\n\`\`\`\n\n### Multi-head Attention and GPT\n\nWe will tackle **Multi-head Attention**. You'll understand how the model can 'Focus' on multiple things at once—like the grammar, the meaning, and the tone of a sentence—all at the same time. We explore the foundation of **Large Language Models (LLMs)** and how they are pre-trained on the entire internet. \n\n:::TRANSFORMER ENGINEER PROTOCOL:::\nWe will build a 'Small GPT Model' that can generate human-like text responses based on a specific prompt. By the end of this module, you'll be a **Generative AI Specialist**, possessing the knowledge required to work with the world's most advanced AI models. You are moving from 'Classification' to **Generation**, developing the abstract thinking needed for the cutting edge of AI. Attention is indeed all you need.`,
            assignment: "Transformers intro", 
            pocketProject: "Small GPT model", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the key innovation of the Transformer architecture?", options: ["It's faster", "The Attention Mechanism", "It's smaller", "It's blue"], correctAnswer: 1 },
              { text: "Self-Attention allows a model to ____.", options: ["Ignore the user", "Understand the relationship between all parts of an input simultaneously", "Delete data", "Save power"], correctAnswer: 1 },
              { text: "Transformers replaced ____ for most NLP tasks.", options: ["CSS", "RNNs and LSTMs", "HTML", "Excel"], correctAnswer: 1 },
              { text: "Multi-head Attention means the model ____.", options: ["Has multiple CPUs", "Can focus on multiple aspects of data simultaneously", "Is twice as big", "Is broken"], correctAnswer: 1 },
              { text: "Large Language Models (LLMs) like ChatGPT are based on ____.", options: ["Random numbers", "Transformers", "Single lines of code", "A database"], correctAnswer: 1 },
              { text: "Positional Encoding is used because Transformers ____.", options: ["Are too fast", "Do not inherently know the order of data (since they process in parallel)", "Are too slow", "Are secret"], correctAnswer: 1 },
              { text: "Generative AI is capable of ____.", options: ["Only reading", "Creating new content like text, images, or code", "Nothing", "Deleting the internet"], correctAnswer: 1 },
              { text: "A 'Head' in attention refers to ____.", options: ["A human head", "An independent attention mechanism layer", "A variable name", "A screen"], correctAnswer: 1 },
              { text: "Pre-training involves ____.", options: ["Learning from a teacher", "Training a model on a massive dataset before fine-tuning it for a specific task", "Drawing", "Printing"], correctAnswer: 1 },
              { text: "Context in a Transformer is managed by ____.", options: ["The mouse", "The Attention weights", "The battery", "A folder"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Prompt Engineering Advanced", 
            topics: ["Chain of Thought (CoT)", "Few-Shot Prompting", "AI Agents", "System Prompts"],
            content: `### Orchestrating the Model\n\nHaving an LLM is like having a genius intern—you must know how to give them exact instructions. In this lesson, we master **Advanced Prompt Engineering**. We move beyond 'Chatting' into **Algorithmic Instruction**. This is the art and science of steering massive AI models. This is **Knowledge Orchestration**. We are moving from 'Asking' to **Programming with Language**.\n\n### Chain of Thought (CoT)\n\nWe will explore **Chain of Thought**. You'll learned that if you ask an AI to 'Think step-by-step', its accuracy on complex logic problems increases by over 80%. You'll master the art of breaking down problems into logical sequences that the AI can follow. This is **Reasoning Engineering**. We tackle **Few-Shot Prompting**, learning how to provide the model with examples to define the output format. \n\n\`\`\`text\n# A professional System Prompt / CoT instruction\nSystem: You are a Senior Logic Analyst.\nUser: Solve this problem.\nInstruction: First, identify the core variables. Second, analyze the dependencies. Third, state your reasoning. Finally, give the answer.\n\`\`\`\n\n### AI Agents and Tool Use\n\nWe will tackle **AI Agents**. You'll understand how to build systems where the AI can 'Decide' to use a tool—like a calculator or a database—to solve a problem. This is the future of software, where the AI is the 'Controller'. This is **Autonomous Interaction**. \n\n:::PROMPT COMMANDER PROTOCOL:::\nWe will build a 'Complex Logic Helper' that uses multi-step reasoning to solve university-level physics and math problems. By the end of this module, you'll be a **Prompt Engineer Specialist**, capable of building the complex 'Thinkers' that power modern AI assistants. You are moving from 'Interface' to **Logic Design**, developing the linguistic precision needed for AI leadership. Command the model.`,
            assignment: "Chain of Thought", 
            pocketProject: "Complex logic helper", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Chain of Thought' (CoT)?", options: ["A type of necklace", "A technique where the AI is instructed to reason step-by-step", "A save file", "A virus"], correctAnswer: 1 },
              { text: "Few-Shot prompting involves ____.", options: ["A camera", "Providing the model with a few examples of the desired task", "Deleting text", "Running fast"], correctAnswer: 1 },
              { text: "A 'System Prompt' defines ____.", options: ["The PC name", "The core identity, rules, and behavior of the AI", "The font", "The screen brightness"], correctAnswer: 1 },
              { text: "An AI Agent is a system that can ____.", options: ["Only chat", "Make decisions and use tools to achieve a goal", "Only draw", "Delete data"], correctAnswer: 1 },
              { text: "Zero-Shot prompting means ____.", options: ["The model has no examples and must rely on its base knowledge", "The model is off", "The code is broken", "No text"], correctAnswer: 0 },
              { text: "Tool-Use allow an AI to ____.", options: ["Buy tools", "Call external functions or apps (like a weather API) to get real-world data", "Play sports", "Draw"], correctAnswer: 1 },
              { text: "Steering a model refers to ____.", options: ["Driving a car", "Using prompts to guide the AI's output toward a specific goal", "Deleting code", "Printing"], correctAnswer: 1 },
              { text: "Hallucination in AI is when ____.", options: ["The computer is tired", "The model confidently generates false information", "The screen flickers", "A mouse moves"], correctAnswer: 1 },
              { text: "Temperature in prompting affects ____.", options: ["How hot the PC is", "The randomness and creativity of the output", "The font color", "The file size"], correctAnswer: 1 },
              { text: "Prompt Engineering is considered ____.", options: ["A hobby", "A critical skill for directing and integrating AI models into software", "A game", "Useless"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "ML Project", 
            topics: ["Model Serving", "Cloud Infrastructure (AWS/GCP)", "API Deployment", "Continuous Monitoring"],
            content: `### Taking AI to the World\n\nYour AI works on your computer. But how do you give it to 1,000,000 people? In this lesson, we master **Model Deployment**. We move beyond 'Local Notebooks' into the **Cloud Infrastructure**. This is **Machine Learning Operations (MLOps)**. We are moving from 'Experimental' to **Global**. This is the graduation project for Term 1 of SSS 3.\n\n### Serving and APIs\n\nWe will explore **Model Serving**. You'll learned how to wrap your TensorFlow or Scikit-Learn models in a professional **FastAPI** wrapper, turning your algorithm into a global 'Service' that anyone can talk to over the internet. This is **API Engineering**. You'll learn about **Latency and Throughput**, ensuring your AI can answer 100 people at the same time without crashing. \n\n\`\`\`python\nfrom fastapi import FastAPI\nimport tensorflow as tf\n\napp = FastAPI()\nmodel = tf.keras.models.load_model("my_ai_model")\n\n@app.post("/predict")\ndef predict(data: list):\n    result = model.predict(data)\n    return {"prediction": result.tolist()}\n\`\`\`\n\n### Cloud and Scalability\n\nWe will tackle **Cloud Platforms** (AWS, Google Cloud, Azure). You'll understand how the world's biggest companies host their AI brains on massive server farms. We explore **Monitoring**, learning how to track if your AI is getting 'Smarter' or 'Dumber' over time in the real world. \n\n:::CLOUD COMMANDER PROTOCOL:::\nWe will build a 'Cloud AI Service' that hosts a deep learning model on a live web server accessible from any device. By the end of this module, you'll be a **Cloud ML Specialist**, ready to start your final year capstone development with a fully operational infrastructure. You've completed the first term of your final year. You are an architect of the future.`,
            assignment: "Model deployment", 
            pocketProject: "Cloud AI service", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Model Serving'?", options: ["Feeding the AI", "Exposing a trained model so it can be used by other applications (usually via an API)", "Deleting the model", "Printing code"], correctAnswer: 1 },
              { text: "FastAPI is popular for ML because it is ____.", options: ["Slow", "Extremely fast, modern, and supports asynchronous code", "Old", "A game"], correctAnswer: 1 },
              { text: "A Cloud Platform (like AWS) provides ____.", options: ["Weather info", "Scalable on-demand computer power and storage over the internet", "A physical desk", "None"], correctAnswer: 1 },
              { text: "Deployment means ____.", options: ["Writing code", "Moving code from development to a production environment where users can access it", "Deleting files", "Printing"], correctAnswer: 1 },
              { text: "MLOps is the combination of ____.", options: ["ML + Operations (DevOps for AI)", "ML + Math", "ML + Music", "ML + Art"], correctAnswer: 0 },
              { text: "Throughput in an API is ____.", options: ["The file size", "How many requests a system can handle per second", "The color", "The font"], correctAnswer: 1 },
              { text: "Monitoring a model is essential to detect ____.", options: ["Viruses", "Model Drift (when the model becomes less accurate over time as data changes)", "The weather", "The CPU fan"], correctAnswer: 1 },
              { text: "An API Endpoint is ____.", options: ["The end of a page", "A specific URL where the service can be reached (e.g., /predict)", "A mistake", "A variable"], correctAnswer: 1 },
              { text: "Scalability in the cloud allow you to ____.", options: ["Change colors", "Automatically add more servers when traffic is high", "Print more", "Draw"], correctAnswer: 1 },
              { text: "Term 1 of SSS 3 focused on ____.", options: ["Basic HTML", "Advanced Systems, Deep Learning, and Cloud Deployment", "History", "Sports"], correctAnswer: 1 }
            ]
          },
        ]
      },
      {
        id: "sss3-t2",
        name: "2nd Term – Capstone Development",
        lessons: [
          { 
            id: 1, 
            title: "Problem Identification", 
            topics: ["Market Research", "Feasibility Study", "User Personas", "Technical Impact Assessment"],
            content: `### Finding the 'Big Why'\n\nAI for the sake of AI is useless. Professional AI solves problems. In this lesson, we begin your **Final Year Capstone Project** by mastering **Problem Identification**. This is the most critical phase of engineering—if you build the wrong thing, it doesn't matter how good your code is. In SSS 3, we move from 'Assignments' to **Solutions**. We are moving from 'Following' to **Leading**.\n\n### Research and Feasibility\n\nWe will explore **Market Research**. You'll learned how to look at the world (your school, your community, your country) and identify a specific pain point that AI can fix. Is it predicting crop failures? Managing school traffic? Helping students with dyslexia? You'll learn the **Feasibility Study**, determining if you actually have the data, the time, and the compute power to solve the problem. This is **Pragmatic Engineering**.\n\n\`\`\`text\n# Capstone Problem Canvas\n1. Target Problem: [e.g., High energy waste in school buildings]\n2. AI Solution: [e.g., Predictive lighting control system]\n3. Target Users: [e.g., School administrators]\n4. Success Metric: [e.g., 20% reduction in electricity costs]\n5. Data Source: [e.g., Sensor logs from the past 6 months]\n\`\`\`\n\n### User Personas and Impact\n\nWe will tackle **User Personas**. You'll understand who is actually going to use your AI and why they might find it difficult. We explore the **Impact Assessment**, analyzing how your solution will change lives. \n\n:::CAPSTONE CHIEF PROTOCOL:::\nWe will build a 'Problem Discovery Report' that outlines the technical architecture, social impact, and budget for your final graduation project. By the end of this module, you'll be a **Product Strategist**, capable of pitching high-level technology solutions to investors or community leaders. You are moving from 'Student' to **Founder**, developing the entrepreneurial mindset needed for technology leadership. Solve a real problem.`,
            assignment: "Research paper", 
            pocketProject: "Problem report", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "Why is 'Problem Identification' so important?", options: ["It makes code faster", "It ensures you are building something that actually has value and solves a real need", "It's a way to skip code", "It has no value"], correctAnswer: 1 },
              { text: "A 'Feasibility Study' asks ____.", options: ["If the code is pretty", "Can this actually be built with available time and resources?", "Does everyone like the color?", "Is it secret?"], correctAnswer: 1 },
              { text: "A 'User Persona' represents ____.", options: ["A real person", "A fictional profile of the people likely to use your software", "A variable in Python", "A type of database"], correctAnswer: 1 },
              { text: "A Success Metric should be ____.", options: ["A guess", "A measurable number (like % accuracy or % time saved)", "A color", "A font"], correctAnswer: 1 },
              { text: "Market Research in AI involves ____.", options: ["Buying groceries", "Identifying existing solutions and finding gaps where AI can perform better", "Printing paper", "Drawing"], correctAnswer: 1 },
              { text: "SSS 3 Term 2 is about ____.", options: ["Basic Math", "Graduation Capstone Development", "Sports", "History"], correctAnswer: 1 },
              { text: "A 'Problem Statement' should be ____.", options: ["Vague", "Precise, clear, and focused on the user's pain", "A whole book", "A single word"], correctAnswer: 1 },
              { text: "Technical Impact refers to ____.", options: ["How hard you hit the keyboard", "The significant change your software causes in a business or community", "The file size", "The background color"], correctAnswer: 1 },
              { text: "Pragmatic Engineering means ____.", options: ["Building anything", "Building realistic, efficient solutions to real-world constraints", "Using the most expensive tools", "Doing nothing"], correctAnswer: 1 },
              { text: "The Goal of the Capstone is to ____.", options: ["Pass a test", "Demonstrate mastery of full-stack AI systems development", "Draw", "Play games"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Data Collection", 
            topics: ["Ethical Data Sourcing", "Data Scraping", "Synthetic Data", "Privacy Shielding"],
            content: `### The Search for Truth\n\nYour problem is defined. Now, you need the fuel. In this lesson, we master **Data Acquisition**. For your capstone, you can't just download a ready-made dataset from Kaggle; you must find, clean, and verify your own data. This is **Primary Data Engineering**. We are moving from 'Using Data' to **Owning the Pipeline**.\n\n### Sourcing and Ethics\n\nWe will explore **Ethical Data Sourcing**. You'll learned how to collect information while respecting privacy and legal boundaries. We tackle **Data Scraping**, teaching you how to build professional 'Spiders' that can gather information from the web automatically. You'll master the **Privacy Shield**, learning how to 'Anonymize' data so that no individual's identity is ever compromised. This is **Data Stewardship**.\n\n\`\`\`python\nimport pandas as pd\nimport requests\nfrom bs4 import BeautifulSoup\n\n# A professional scraper for public data\ndef get_public_insights(url):\n    res = requests.get(url)\n    soup = BeautifulSoup(res.text, 'html.parser')\n    # Process and clean data ethically\n    return clean_and_anonymize(soup.find_all('p'))\n\`\`\`\n\n### Synthetic Data and Augmentation\n\nWhat if you don't have enough data? We will tackle **Synthetic Data Generation**. You'll learn how to use AI to create 'Fake but Realistic' data to train your models more effectively. We explore **Data Augmentation**, where you flip, rotate, or modify existing data to create a 10x larger training set. \n\n:::DATA GUARDIAN PROTOCOL:::\nWe will build a 'Curated Dataset' for your graduation project, including an ethics audit and a privacy protection layer. By the end of this module, you'll be a **Lead Data Engineer**, capable of sourcing high-quality information for any enterprise challenge. You are moving from 'Consuming' to **Sourcing**, developing the rigorous and ethical mindset needed for data leadership. If the data is bad, the AI is bad.`,
            assignment: "Ethics approval", 
            pocketProject: "Curated dataset", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Anonymization' in data?", options: ["Deleting data", "Removing personal identifies so people cannot be recognized", "Renaming files", "Drawing"], correctAnswer: 1 },
              { text: "Data Scraping is the process of ____.", options: ["Cleaning a floor", "Automatically extracting data from websites", "Deleting the internet", "Saving a photo"], correctAnswer: 1 },
              { text: "Synthetic Data is ____.", options: ["A virus", "Artificially generated data that mimics real-world patterns", "Wrong data", "A type of font"], correctAnswer: 1 },
              { text: "Ethical Sourcing means ____.", options: ["Buying data", "Collecting data with permission, following laws, and respecting privacy", "Getting data for free", "Hiding data"], correctAnswer: 1 },
              { text: "Data Augmentation helps ____.", options: ["Print data", "Create more training data from a small set by making variations (like rotating images)", "Speed up the PC", "Add colors"], correctAnswer: 1 },
              { text: "A 'Spider' in web scraping is a ____.", options: ["Bug", "Program that crawls through the web to find data", "Virus", "A type of keyboard"], correctAnswer: 1 },
              { text: "Privacy Shielding is about ____.", options: ["Buying a case", "Protecting individual identities in your dataset", "Hiding the CPU", "Deleting files"], correctAnswer: 1 },
              { text: "Primary Data is data that ____.", options: ["Is for kids", "You collect yourself specifically for your project", "You find on Kaggle", "Is broken"], correctAnswer: 1 },
              { text: "Data Bias should be ____.", options: ["Ignored", "Identified and minimized during collection", "Increased", "Colorful"], correctAnswer: 1 },
              { text: "BeautifulSoup is a library for ____.", options: ["Cooking", "Parsing HTML and XML (used for web scraping)", "Playing sound", "Drawing"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Model Design", 
            topics: ["Architecture Selection", "Hyperparameter Tuning", "Ensemble Methods", "Multi-model Evaluation"],
            content: `### Architecting the Brain\n\nYou have the problem. You have the data. Now, you build the **Brain**. In this lesson, we master **Model Design** for your capstone project. In a professional setting, you don't just 'Try' one model; you design an experiment to find the absolute best architecture. This is **Experimental Science**. We are moving from 'Trying' to **Evaluating**.\n\n### Selection and Tuning\n\nWe will explore **Architecture Selection**. Based on your problem, should you use a CNN, a Transformer, a Random Forest, or an Ensemble? You'll learn how to justify your choice with data. We tackle **Hyperparameter Tuning**, using automated tools like 'Grid Search' to find the exact mathematical settings that deliver the highest accuracy. This is **Precision AI Optimization**.\n\n\`\`\`python\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Professional tuning of a capstone model\nparam_grid = {'n_estimators': [100, 200, 500], 'max_depth': [None, 10, 20]}\ngrid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)\ngrid_search.fit(X_train, y_train)\n\nprint(f"Best Configuration: {grid_search.best_params_}")\n\`\`\`\n\n### Ensemble Methods and Comparison\n\nWe will tackle **Ensemble Methods**. You'll learned how to combine multiple AI models into a 'Council' that votes on an answer, often achieving better results than any single model could. We explore **Multi-model Evaluation**, creating scripts that test 5 different architectures side-by-side to find the winner. \n\n:::ARCHITECTURAL LEAD PROTOCOL:::\nWe will build a 'Prototype Model' for your graduation project, including a full benchmark report comparing different designs. By the end of this module, you'll be an **AI Design Consultant**, capable of architecting complex systems that out-perform standard 'Out-of-the-box' software. You are moving from 'Code' to **Engineering Design**, developing the rigorous scientific thinking needed for high-stakes AI. The best model wins.`,
            assignment: "A/B Testing plan", 
            pocketProject: "Prototype model", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "Hyperparameter Tuning is about ____.", options: ["Buying more RAM", "Finding the best settings (like learning rate or tree depth) for a model", "Changing font size", "Deleting code"], correctAnswer: 1 },
              { text: "Grid Search is an automated way to ____.", options: ["Search Google", "Try multiple combinations of parameters to find the best ones", "Draw a grid", "Save a file"], correctAnswer: 1 },
              { text: "An 'Ensemble Method' combines ____.", options: ["Colors", "Results from multiple models to get a stronger prediction", "Music and Code", "Keyboard and Mouse"], correctAnswer: 1 },
              { text: "What is 'Architecture Selection'?", options: ["Choosing a house", "Choosing the type of model structure (e.g., CNN, RNN, or Forest) that fits the data", "Naming a variable", "Drawing a map"], correctAnswer: 1 },
              { text: "Multi-model evaluation means ____.", options: ["Running one model", "Testing different types of models on the same data to see which performs best", "Running no models", "Deleting data"], correctAnswer: 1 },
              { text: "A 'Prototype' is ____.", options: ["The final product", "An early version of a model built to test the core logic", "A type of game", "A video"], correctAnswer: 1 },
              { text: "A Benchmarking Report is used to ____.", options: ["Print a story", "Show proof of how well your model performs compared to others", "Draw", "Delete files"], correctAnswer: 1 },
              { text: "Over-tuning (over-optimization) can lead to ____.", options: ["Faster code", "Overfitting (making the model too specific to training data)", "Better gaming", "None"], correctAnswer: 1 },
              { text: "Cross-Validation (CV) is used to ____.", options: ["Check someone's work", "Split data multiple ways to ensure the model's accuracy is stable", "Print a list", "Save a file"], correctAnswer: 1 },
              { text: "AI Design requires ____ thinking.", options: ["Random", "Experimental and Scientific", "Quick only", "None"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Model Deployment", 
            topics: ["Dockerization", "Cloud Service Mapping", "API Gateways", "Load Balancing"],
            content: `### Launching to the Infinite\n\nYour model exists. Now, we make it immortal. In this lesson, we master **Industrial Deployment** for your capstone project. In the professional world, 'It works on my machine' is the mark of an amateur. You will learn to package your AI so it works everywhere, forever. This is **Infrastructure Reliability**. We are moving from 'Development' to **Production**.\n\n### Containerization and Docker\n\nWe will explore **Docker** in the context of your capstone. You'll learned how to create a 'Dockerfile'—a recipe that tells the cloud exactly how to build the environment for your AI. This ensures that the same libraries and versions you used are used in the cloud. We tackle **API Gateways**, learning how to protect your AI model from being overwhelmed by too many requests. This is **Scale Engineering**.\n\n\`\`\`dockerfile\n# A professional Docker configuration for an AI Capstone\nFROM python:3.9-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]\n\`\`\`\n\n### Cloud Hosting and Load Balancing\n\nWe will tackle **Cloud Orchestration**. You'll understand how to deploy your container to platforms like AWS or Google Cloud Run. We explore **Load Balancing**, ensuring that if your project becomes famous and gets 10,000 users in one minute, your system will automatically spin up more servers to handle the traffic. \n\n:::INFRASTRUCTURE LEAD PROTOCOL:::\nWe will build a 'Deployment Script' that automates the process of pushing your capstone model to a live, secure cloud URL. By the end of this module, you'll be a **Cloud Infrastructure Associate**, capable of managing the global distribution of advanced software systems. You are moving from 'Code' to **Cloud**, developing the industrial mindset needed for high-availability engineering. The world is your server.`,
            assignment: "Dockerization", 
            pocketProject: "Live AI app", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is the primary purpose of Docker?", options: ["To draw pictures", "To package applications and dependencies into containers that run anywhere", "To delete files", "To speed up the mouse"], correctAnswer: 1 },
              { text: "A 'Dockerfile' is ____.", options: ["A file that contains photos", "A script that contains instructions on how to build a Docker image", "A type of database", "A mistake"], correctAnswer: 1 },
              { text: "Horizontal Scaling means ____.", options: ["Making the screen wider", "Adding more servers to handle increased traffic", "Turning off the monitor", "Changing the font"], correctAnswer: 1 },
              { text: "A Load Balancer ____.", options: ["Adds weight to the PC", "Distributes incoming traffic across multiple servers", "Slows the connection", "None"], correctAnswer: 1 },
              { text: "Provisioning a server means ____.", options: ["Setting it up and preparing it for use", "Deleting it", "Drawing it", "Printing it"], correctAnswer: 0 },
              { text: "Cloud Run and AWS Lambda are examples of ____.", options: ["Serverless computing where the cloud manages scaling for you", "History books", "Games", "CSS frameworks"], correctAnswer: 0 },
              { text: "An API Gateway acts as ____.", options: ["A door", "A single entry point that manages and routes requests to your AI services", "A charger", "A screen saver"], correctAnswer: 1 },
              { text: "Uptime and Availability are measures of ____.", options: ["How pretty the app is", "How reliable and accessible the service is to users", "The background color", "The file size"], correctAnswer: 1 },
              { text: "Rolling Updates allow for ____.", options: ["Changing colors", "Updating software without any downtime for the users", "Stopping the server", "Deleting code"], correctAnswer: 1 },
              { text: "Infrastructure as Code (IaC) allows you to ____.", options: ["Write poems", "Manage your cloud servers using configuration files", "Draw maps", "None"], correctAnswer: 1 }
            ]
          },
          { 
            id: 5, 
            title: "Dashboard Creation", 
            topics: ["Real-time Visualization", "Feedback Loops", "Metric Cards", "Interactive Control Panels"],
            content: `### The Command Center\n\nYour AI is in the cloud. But you cannot 'See' it. In this lesson, we master **Dashboard Engineering** for your capstone project. You will build a professional interface that allows users to interact with your AI and see its thoughts in real-time. This is **Decision Intelligence Visualization**. We are moving from 'APIs' to **User Experiences**.\n\n### Interaction and Real-time Data\n\nWe will explore **Interactive Dashboards**. You'll learned how to use frameworks like Streamlit or React to build control panels where you can input data and watch your AI change its predictions instantly. We tackle **Metric Cards**, creating visual highlights for your Success Metrics—like showing a live counter of how much energy your AI has saved. This is **Data Storytelling in Motion**.\n\n\`\`\`javascript\n// Concept: A real-time AI status component\nconst AISummary = ({ prediction, confidence }) => (\n  <div className="command-card">\n    <h3>AI Intelligence Status</h3>\n    <p>Current Prediction: <strong>{prediction}</strong></p>\n    <p>Confidence Level: {confidence}%</p>\n  </div>\n);\n\`\`\`\n\n### Feedback Loops\n\nWe will tackle **User Feedback Loops**. You'll understand how to build 'Like/Dislike' buttons or correction fields that allow users to tell the AI when it's wrong. This data is then saved to your database for future training. This is **Active Learning Infrastructure**. \n\n:::INTERFACE LEAD PROTOCOL:::\nWe will build a 'Visual Stats Hub' for your graduation project, including live charts and interactive model controls. By the end of this module, you'll be a **Full-Stack AI Developer**, capable of building the complete bridge between complex algorithms and human users. You are moving from 'Back-end' to **Front-end**, developing the user-centric mindset needed for product leadership. Make the invisible visible.`,
            assignment: "User feedback loop", 
            pocketProject: "Visual stats hub", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is an 'AI Dashboard'?", options: ["A physical desk", "A visual interface for interacting with and monitoring AI models", "A type of mouse", "A printout"], correctAnswer: 1 },
              { text: "A 'Feedback Loop' allows ____.", options: ["The user to correct the AI, providing data to improve the model", "The sound to repeat", "The screen to flicker", "The code to delete itself"], correctAnswer: 0 },
              { text: "Real-time visualization means ____.", options: ["Seeing data from yesterday", "Seeing data and AI predictions instantly as they change", "Drawing a photo", "Waiting for a week"], correctAnswer: 1 },
              { text: "A 'Metric Card' is used to ____.", options: ["Pay for things", "Highlight key performance numbers (like accuracy or savings) clearly", "Save a file", "None"], correctAnswer: 1 },
              { text: "Streamlit is a popular library for ____.", options: ["Editing videos", "Quickly building interactive web apps for AI and data science in Python", "Drawing", "Printing"], correctAnswer: 1 },
              { text: "User Experience (UX) in AI focuses on ____.", options: ["The code length", "How easy and helpful it is for a human to interact with the AI", "The PC speed", "The font color"], correctAnswer: 1 },
              { text: "Interactive Controls (like sliders) allow users to ____.", options: ["Adjust inputs and see how the AI's prediction changes immediately", "Play games", "Delete data", "Draw lines"], correctAnswer: 0 },
              { text: "Data Storytelling involves ____.", options: ["Reading a story", "Communicating insights through a logical flow of visuals", "Hiding facts", "Writing long paragraphs"], correctAnswer: 1 },
              { text: "Activity Logs show ____.", options: ["The time", "A history of what the AI has done and what users have requested", "Photos", "Nothing"], correctAnswer: 1 },
              { text: "A 'Visual Stats Hub' helps stakeholders ____.", options: ["Sleep", "Quickly understand the value and performance of the AI system", "Buy more hardware", "Draw"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "System Testing", 
            topics: ["Stress Testing", "Load Testing", "UAT (User Acceptance Testing)", "Bug Regression"],
            content: `### The Final gauntlet\n\nYour system is live. Your dashboard is beautiful. But will it break under pressure? In this final lesson of Term 2, we master **System Testing** for your capstone project. In high-stakes engineering, you don't 'Hope' it works; you 'Prove' it works through brutal testing. This is **Quality Assurance Mastery**. We are moving from 'Building' to **Validating**.\n\n### Stress and Load Testing\n\nWe will explore **Load Testing**. You'll learned how to use tools to simulate 100, 500, or 1,000 users hitting your AI at the exact same second. We tackle **Stress Testing**, pushing the system until it actually crashes to find its 'Breaking Point'. This is **Failure Mode Analysis**. We learn how to build 'Graceful Failures'—where the system gives a helpful message instead of a scary error screen. \n\n\`\`\`bash\n# A professional Load Testing command\nlocust -f load_test.py --headless -u 100 -r 10 --run-time 1m\n\n# Result: Checking if the AI stays responsive at high volume\n\`\`\`\n\n### UAT and Regression\n\nWe will tackle **User Acceptance Testing (UAT)**. You'll understand how to watch real people use your app and record where they get confused. We explore **Bug Regression**, the process of ensuring that new fixes don't break old features. \n\n:::QUALITY LEAD PROTOCOL:::\nWe will build a 'Performance Audit' for your graduation project, proving its stability, speed, and accuracy under high-pressure conditions. By the end of this module, you'll be a **Quality Assurance Lead**, possessing the professional discipline needed for senior engineering roles. You have completed the second term of your final year. The final climb to graduation begins next term. You are ready.`,
            assignment: "Stress testing", 
            pocketProject: "Performance audit", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Load Testing'?", options: ["Checking the weight of the PC", "Simulating many users to see how the system performs under volume", "Printing paper", "Drawing"], correctAnswer: 1 },
              { text: "Stress Testing is about ____.", options: ["Getting angry", "Pushing the system beyond its limits to find the breaking point", "Sleeping", "Changing colors"], correctAnswer: 1 },
              { text: "A 'Breaking Point' is ____.", options: ["A pencil tip", "The limit at which a system crashes or stays responsive", "A mistake", "None"], correctAnswer: 1 },
              { text: "UAT (User Acceptance Testing) involves ____.", options: ["Computer tests only", "Real users testing the software to see if it meets their needs", "Printing code", "Deleting data"], correctAnswer: 1 },
              { text: "Regression Testing ensures that ____.", options: ["Code is shorter", "New changes haven't broken existing features", "The system is off", "The font is nice"], correctAnswer: 1 },
              { text: "Locust is a tool for ____.", options: ["Collecting bugs", "Scalable, distributed user load testing", "Drawing", "Sound editing"], correctAnswer: 1 },
              { text: "A 'Graceful Failure' means ____.", options: ["The system never fails", "The system handles errors politely without crashing the whole application", "Looking good while failing", "Deleting files"], correctAnswer: 1 },
              { text: "Performance Auditing is ____.", options: ["Checking the speed", "A thorough review of speed, memory, and reliability metrics", "A tax check", "None"], correctAnswer: 1 },
              { text: "Scalability Testing proves that ____.", options: ["Colors can change", "The system can grow as users are added", "The code is big", "Print quality"], correctAnswer: 1 },
              { text: "Congratulations on Term 2! What is next?", options: ["Junior school", "Final Project Presentation and Defense", "Drawing", "History"], correctAnswer: 1 }
            ]
          },
        ]
      },
      {
        id: "sss3-t3",
        name: "3rd Term – Final Year Project",
        lessons: [
          { 
            id: 1, 
            title: "Proposal", 
            topics: ["Thesis Formulation", "Requirement Engineering", "Scope Management", "Stakeholder Alignment"],
            content: `### The Technical Manifesto\n\nYour capstone is not just a project; it is a **Thesis**. In this lesson, we master **Requirement Engineering** and **Proposal Formulation**. In the professional world, before a line of code is written for a major system, a detailed proposal must be approved. This is **Project Governance**. In Term 3, we move from 'Execution' to **Graduation**. We are moving from 'Builder' to **Architect**.\n\n### Requirement Engineering\n\nWe will explore **Functional vs Non-Functional Requirements**. You'll learned how to explicitly state what your AI *must do* (Functional) and how well it *must perform* (Non-Functional—e.g., speed, security, reliability). We tackle **Scope Management**, ensuring that your project is ambitious enough to impress the board, but realistic enough to be finished on time. This is **Strategic Planning**.\n\n\`\`\`text\n# Capstone Project Thesis Outline\n1. Abstract: High-level overview of the AI solution.\n2. Problem Statement: Why does this project exist?\n3. Technical Stack: Why were these tools chosen over others?\n4. Methodology: How will the data be sourced and the model trained?\n5. Deployment Plan: How will the world access the service?\n\`\`\`\n\n### Stakeholder Alignment\n\nWe will tackle **Stakeholder Management**. You'll understand how to communicate your technical choices to non-technical people—like school heads or community leaders. You'll learn the art of the **Technical Elevator Pitch**, condensing years of learning into 60 seconds of value. \n\n:::THESIS LEAD PROTOCOL:::\nWe will build a 'Final Year Proposal' that serves as the official blueprint for your graduation defense. By the end of this module, you'll be a **Project Manager**, capable of leading complex technology initiatives from conception to board-level approval. You are moving from 'Coding' to **Engineering Leadership**, developing the executive mindset needed for professional life. Define your legacy.`,
            assignment: "Thesis outline", 
            pocketProject: "Scope document", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Requirement Engineering'?", options: ["Fixing an engine", "The process of defining, documenting, and maintaining requirements in the design process", "Writing code", "None"], correctAnswer: 1 },
              { text: "A 'Functional Requirement' describes ____.", options: ["How pretty the app is", "What the system should specifically do (e.g., 'The AI must detect cats')", "The file size", "The background color"], correctAnswer: 1 },
              { text: "A 'Non-Functional Requirement' describes ____.", options: ["A broken feature", "How the system should behave (e.g., 'The AI must respond in < 1 second')", "The font style", "A type of variable"], correctAnswer: 1 },
              { text: "Scope Creep is when ____.", options: ["The code gets faster", "Project requirements grow uncontrollably beyond the original plan", "The mouse moves slowly", "A bug appears"], correctAnswer: 1 },
              { text: "A 'Thesis' in this context is ____.", options: ["A short note", "A formal document detailing your research, development, and results", "A type of database", "A game"], correctAnswer: 1 },
              { text: "Stakeholder Management is about ____.", options: ["Ignoring the boss", "Communicating and aligning the project with people affected by its outcome", "Printing paper", "Drawing"], correctAnswer: 1 },
              { text: "Requirement Traceability ensures that ____.", options: ["You can find your keys", "Every requirement is tested and fulfilled in the final product", "The code is short", "The font is bold"], correctAnswer: 1 },
              { text: "A 'Milestone' is ____.", options: ["A shiny rock", "A significant point or event in the project timeline", "A type of error", "A variable"], correctAnswer: 1 },
              { text: "Technical Feasibility asks ____.", options: ["Is it pretty?", "Does the technology exist to build this solution within the constraints?", "Do I like it?", "None"], correctAnswer: 1 },
              { text: "The Goal of the Proposal is to ____.", options: ["Waste time", "Secure official approval and provide a clear roadmap for the final build", "Draw", "Play games"], correctAnswer: 1 }
            ]
          },
          { 
            id: 2, 
            title: "Development", 
            topics: ["Modular Construction", "Version Control Discipline", "Documentation-as-Code", "Refactoring"],
            content: `### The Final Assembly\n\nThe plan is approved. Now, we execute the **Final Build**. In this lesson, we master **Modular Development** for your graduation system. This is where your JSS logic, SSS 1 foundations, and SSS 2 advanced systems merge into one. This is **Professional Software Construction**. We are moving from 'Scripts' to **Enterprise Systems**.\n\n### Version Control and Git Flow\n\nWe will explore **Git Flow**. You'll learned how to use 'Branches' to work on different parts of your project (like the AI model and the Frontend) separately without breaking the main system. We tackle **Commit Discipline**, learning how to write messages that describe 'Why' a change was made, not just 'What'. This is **Collaborative Engineering**, even if you are working alone. \n\n\`\`\`bash\n# A professional commit workflow\ngit checkout -b feature/realtime-alerts\n# ... code ...\ngit commit -m "feat: implement predictive logic for energy spike detection"\ngit push origin feature/realtime-alerts\n\`\`\`\n\n### Modular Design and Refactoring\n\nWe will tackle **Modularization**. You'll understand how to split your code into independent 'Modules' (Auth, AI, Data, UI) so that one part can be updated without touching the rest. We explore **Refactoring**, the art of improving code structure without changing its behavior—making it cleaner, faster, and more professional. \n\n:::CONSTRUCTION LEAD PROTOCOL:::\nWe will build the 'Core System' of your graduation project, focusing on a robust, modular backend that can support all your planned features. By the end of this module, you'll be a **Senior Developer**, possessing the technical stamina needed to build industrial-grade solutions. You are moving from 'Writing Code' to **Building Systems**, developing the organizational mindset needed for large-scale engineering. Build it right.`,
            assignment: "Active coding", 
            pocketProject: "Core system", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Modular Development'?", options: ["Writing a single long file", "Breaking a system into smaller, independent, and reusable parts", "Using a mouse", "Printing"], correctAnswer: 1 },
              { text: "In Git, a 'Branch' allows you to ____.", options: ["Work on a new feature without affecting the stable main code", "Delete your project", "Change the color", "None"], correctAnswer: 0 },
              { text: "Git Commit messages should ____.", options: ["Be random", "Explain the intent and reason behind a code change", "Be empty", "Be very long poems"], correctAnswer: 1 },
              { text: "Refactoring means ____.", options: ["Deleting the code", "Improving code structure and readability without changing its behavior", "Changing what the app does", "Printing code"], correctAnswer: 1 },
              { text: "Technical Debt is ____.", options: ["Money owed to a bank", "The cost of rework caused by choosing an easy solution now instead of a better one", "A type of variable", "A mistake"], correctAnswer: 1 },
              { text: "Modular code is easier to ____.", options: ["Delete", "Test, maintain, and scale", "Print in color", "Draw"], correctAnswer: 1 },
              { text: "The 'Main' branch in Git represents ____.", options: ["The first file", "The stable, production-ready version of your software", "A type of font", "A screen saver"], correctAnswer: 1 },
              { text: "Version Control is essential for ____.", options: ["Playing games", "Tracking changes and being able to revert to previous versions if things break", "Saving photos", "None"], correctAnswer: 1 },
              { text: "Documentation-as-Code means ____.", options: ["Writing doc in a notebook", "Keeping technical documentation in the same repository as the code", "Writing in secret", "Printing"], correctAnswer: 1 },
              { text: "Enterprise Systems are designed for ____.", options: ["One person", "Reliability, scalability, and professional maintenance", "Games only", "History"], correctAnswer: 1 }
            ]
          },
          { 
            id: 3, 
            title: "Testing", 
            topics: ["Automated Test Suites", "User Testing Logs", "Accuracy Benchmarks", "Edge Case Discovery"],
            content: `### The Final Proof\n\nYour system is built. But is it perfect? In this lesson, we master **Final Validation** for your graduation thesis. In the professional world, 'Good enough' is never enough. You must prove your AI's accuracy and your system's stability with data. This is **Engineering Accountability**. We are moving from 'Building' to **Proving**.\n\n### Automated Testing and Benchmarks\n\nWe will explore **Automated Test Suites**. You'll learned how to write scripts that automatically check 100 different scenarios in your app in seconds. We tackle **Accuracy Benchmarks**, where you compare your AI's predictions against real-world 'Ground Truth' data. If your proposal promised 90% accuracy, you must prove it here. This is **Empirical Evidence**.\n\n\`\`\`python\n# A professional graduation benchmark test\ndef run_acc_benchmark(model, test_data):\n    predictions = model.predict(test_data.features)\n    acc = calculate_accuracy(predictions, test_data.labels)\n    print(f"Final Graduation Proof: {acc*100}% Accuracy Achieved")\n    assert acc >= 0.90, "Model did not meet proposal requirements!"\n\`\`\`\n\n### User Testing and Edge Cases\n\nWe will tackle **Edge Cases**. What happens if a user inputs gibberish? What happens if the internet goes down? You'll learn how to find and fix the 'Hidden Bugs' that only appear in rare situations. We explore the **User Testing Log**, recording the experiences of real people as they interact with your masterpiece. \n\n:::VALIDATION LEAD PROTOCOL:::\nWe will build a 'Bug Report Log' and a final performance dashboard that proves your system is ready for the world. By the end of this module, you'll be a **Verification Engineer**, possessing the rigorous attention to detail that separates great software from average code. You are at the summit of technical execution. Only documentation and presentation remain. Finish strong.`,
            assignment: "User acceptance", 
            pocketProject: "Bug report log", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Final Validation'?", options: ["Printing the code", "The process of proving that the system meets all its requirements and works as intended", "Saving a file", "Drawing"], correctAnswer: 1 },
              { text: "Ground Truth data is ____.", options: ["A lie", "The real, verified data used to check if AI predictions are correct", "Data from the moon", "Random data"], correctAnswer: 1 },
              { text: "An 'Edge Case' is ____.", options: ["A photo of an edge", "An unusual or extreme situation that can cause software to fail", "A type of table", "The end of a page"], correctAnswer: 1 },
              { text: "Accuracy Benchmarking is used to ____.", options: ["Color the code", "Measure and prove the performance of a model against a standard", "Draw a chart", "None"], correctAnswer: 1 },
              { text: "A 'Bug Report Log' tracks ____.", options: ["Insects", "Identified issues, their severity, and their fix status", "The weather", "Photos"], correctAnswer: 1 },
              { text: "Automated Tests are better than manual tests because ____.", options: ["They are colorful", "They are fast, repeatable, and can check many things instantly", "They are slow", "They are secret"], correctAnswer: 1 },
              { text: "Engineering Accountability means ____.", options: ["Taking a math test", "Being responsible for the accuracy and reliability of the system you built", "Having a lot of money", "None"], correctAnswer: 1 },
              { text: "Empirical Evidence refers to ____.", options: ["A guess", "Proof based on real data and observation", "A story", "Drawing"], correctAnswer: 1 },
              { text: "A 'Failure Rate' is ____.", options: ["The price of a car", "The percentage of times a system fails during testing", "A type of font", "A game score"], correctAnswer: 1 },
              { text: "Validation is the final step before ____.", options: ["Starting over", "Documentation and Presentation/Defense", "Deletion", "Printing"], correctAnswer: 1 }
            ]
          },
          { 
            id: 4, 
            title: "Optimization", 
            topics: ["Performance Profiling", "Resource Tuning", "Latency Reduction", "Code Quality Review"],
            content: `### The Master's Polish\n\nYour system works. Now, we make it efficient. In this lesson, we master **Professional Optimization** for your graduation project. In the high-stakes tech world, slow code is dead code. You will learn how to find and fix the 'Bottlenecks' that slow your AI down. This is **Efficiency Engineering**. We are moving from 'Functional' to **High-Performance**.\n\n### Profiling and Latency\n\nWe will explore **Performance Profiling**. You'll learned how to use 'Profilers'—tools that watch your code and tell you exactly which line is taking the most time and which variable is using the most memory. We tackle **Latency Reduction**, learning how to shave milliseconds off your AI's response time to ensure a snappy user experience. This is **Speed Engineering**. \n\n\`\`\`python\nimport cProfile\nimport pstats\n\n# Profiling the core capstone AI engine\nwith cProfile.Profile() as pr:\n    run_final_inference()\n    \nstats = pstats.Stats(pr)\nstats.sort_stats(pstats.SortKey.TIME).print_stats(10)\n\`\`\`\n\n### Resource Tuning and Clean-up\n\nWe will tackle **Resource Optimization**. You'll understand how to 'Quantize' your deep learning models, making them smaller and faster without losing accuracy. We explore the **Final Code Review**, where you look at your system one last time to remove messy code and ensure your architecture is elegant. \n\n:::OPTIMIZATION LEAD PROTOCOL:::\nWe will build an 'Efficient Build' of your graduation project, demonstrating a significant improvement in speed and memory usage compared to the first prototype. By the end of this module, you'll be a **Performance Specialist**, capable of tuning the world's most complex software systems for maximum efficiency. You are polishing the diamond. Only the legacy and the defense remain.`,
            assignment: "Code review", 
            pocketProject: "Efficient build", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Performance Profiling'?", options: ["Taking a photo", "Measuring exactly how much time and memory code uses during execution", "Writing code", "None"], correctAnswer: 1 },
              { text: "A 'Bottleneck' in code is ____.", options: ["A type of glass", "The part of a system that limits its overall performance or speed", "A variable", "A mistake"], correctAnswer: 1 },
              { text: "Latency is the measure of ____.", options: ["How big the file is", "The delay between a user's request and the system's response", "The color", "The font"], correctAnswer: 1 },
              { text: "Optimization should always be based on ____.", options: ["Guesses", "Measurement and data from profiling tools", "The current time", "None"], correctAnswer: 1 },
              { text: "Model Quantization involves ____.", options: ["Making the AI bigger", "Reducing the precision of AI weights to make the model smaller and faster", "Deleting the model", "Drawing"], correctAnswer: 1 },
              { text: "Refactoring for performance means ____.", options: ["Adding more features", "Cleaning and restructuring code specifically to make it run faster", "Printing", "Drawing"], correctAnswer: 1 },
              { text: "Memory Leaks happen when ____.", options: ["The PC is wet", "A program fails to release memory it no longer needs, slowing everything down", "The screen is bright", "None"], correctAnswer: 1 },
              { text: "The Goal of Optimization is to ____.", options: ["Write more code", "Achieve the best performance with the fewest resources", "Change colors", "Print more"], correctAnswer: 1 },
              { text: "Dead Code is code that ____.", options: ["Has a virus", "Is never executed and should be removed during polish", "Is written in red", "Is slow"], correctAnswer: 1 },
              { text: "A Code Review helps ____.", options: ["Identify bugs and performance issues before the final release", "Write comments", "Draw", "Print"], correctAnswer: 0 }
            ]
          },
          { 
            id: 5, 
            title: "Documentation", 
            topics: ["Technical Documentation", "User Manuals", "API Reference", "System Architecture Diagrams"],
            content: `### Writing the Legacy\n\nYou will move on, but your code must live on. In this lesson, we master **Enterprise Documentation** for your graduation project. In the professional world, code without documentation is garbage. You will learn to write for three audiences: the user, the developer, and the board. This is **Technical Communication Power**. We are moving from 'Code' to **Knowledge**.\n\n### User and Technical Manuals\n\nWe will explore **User-Centric Writing**. You'll learned how to write a 'User Manual' that a grandmother or a non-tech student could follow to use your AI. We tackle the **Technical Guide**, documenting the internal logic, the data schemas, and the API endpoints so that another developer could maintain your project for years. This is **Knowledge Transfer**.\n\n\`\`\`markdown\n# Project AI-Guardian Technical Guide\n## 1. Setup\n- Install Docker and Python 3.9\n- Run \`pip install -r requirements.txt\`\n\n## 2. Architecture\n- **Frontend**: React-based status dashboard\n- **Backend**: FastAPI with Predictive Neural Engine\n\`\`\`\n\n### Architecture and README\n\nWe will tackle **System Architecture Diagrams**. You'll learn how to draw professional maps of your data flows and server interactions. We explore the **README.md**, the 'Front door' of your project on platforms like GitHub, ensuring it looks world-class and professional. \n\n:::DOCUMENTATION CHIEF PROTOCOL:::\nWe will build a 'Technical Guide' and a 'User Manual' for your graduation project, including an interactive README that tells your project's story. By the end of this module, you'll be a **Technical Writer**, possessing the communication skills needed to lead teams and document global systems. Your code is the body; your documentation is the soul. One final step remains.`,
            assignment: "User manual", 
            pocketProject: "Technical guide", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is 'Technical Documentation'?", options: ["A list of parts", "Written material that explains how software works or how to use it", "Writing a poem", "None"], correctAnswer: 1 },
              { text: "A 'User Manual' is for ____.", options: ["The computer", "The end-users who will actually use the software", "Other developers only", "The printer"], correctAnswer: 1 },
              { text: "A 'README' file is usually the ____.", options: ["Last file to read", "Entrance point to a project, providing an overview and setup instructions", "A place for mistakes", "A photo"], correctAnswer: 1 },
              { text: "System Architecture Diagrams show ____.", options: ["The colors of the app", "The high-level structure and components of the software", "A list of fonts", "The user's face"], correctAnswer: 1 },
              { text: "Knowledge Transfer is about ____.", options: ["Learning faster", "Ensuring that other people can understand and maintain your work after you leave", "Buying books", "None"], correctAnswer: 1 },
              { text: "An 'API Reference' documents ____.", options: ["The user names", "How to interact with the software's API (endpoints, inputs, outputs)", "The background color", "The history of the PC"], correctAnswer: 1 },
              { text: "Documentation makes software ____.", options: ["Slower", "Maintainable and professional", "Heavier", "Blue"], correctAnswer: 1 },
              { text: "A 'Change Log' tracks ____.", options: ["The weather", "A history of updates and fixes made to the project", "Photo names", "None"], correctAnswer: 1 },
              { text: "Visual Aids (like screenshots) in documentation ____.", options: ["Waste space", "Help users and developers understand the UI and workflows quickly", "Slow down the read", "Are for kids"], correctAnswer: 1 },
              { text: "The Goal of Documentation is to ____.", options: ["Print paper", "Remove ambiguity and provide a clear map of the technology", "Draw", "Play games"], correctAnswer: 1 }
            ]
          },
          { 
            id: 6, 
            title: "Presentation & Defense", 
            topics: ["Public Speaking for Tech", "Demo Engineering", "Viva (Oral Examination) Prep", "Storytelling with Data"],
            content: `### The Moment of Triumph\n\nJSS 1 was the start. SSS 3 is the culmination. In this final lesson of the entire curriculum, we master **The Defense**. It's not enough to build greatness; you must be able to stand before a board, a community, or the world and defend your work. This is **Technical Leadership Mastery**. We are moving from 'Student' to **Engineer**.\n\n### The Demo and The Story\n\nWe will explore **Demo Engineering**. You'll learned how to show your graduation project in a way that highlights the 'Magic' while explaining the 'Math'. We tackle **Technical Storytelling**, learning how to weave the problem, the data, and the solution into a compelling narrative that wows your audience. This is **Presenation Performance**.\n\n\`\`\`text\n# Presentation Flow: The Hero's Journey\n1. The Hook: The big real-world problem you found.\n2. The Struggle: The data and technical challenges you faced.\n3. The Solution: A live, flawless demo of your AI in action.\n4. The Proof: Your accuracy benchmarks and user feedback.\n5. The Future: How this system can grow.\n\`\`\`\n\n### The Viva (Defense)\n\nWe will tackle **The Viva**. You'll understand how to answer difficult questions from technical experts. You'll learn to say 'I don't know, but here is my hypothesis' with confidence. This is the mark of a true scientist. \n\n:::COMMUNICATION LEAD PROTOCOL:::\nWe will build a 'Demo Showcase' and perform a mock defense of your entire graduation system. By the end of this module, you'll be a **Certified AI System Architect**, ready to enter university or the professional industry with a portfolio that beats most graduates. You have completed the 99-lesson journey. You are no longer just a pupil; you are a peer. Congratulations. The future is coded by you.`,
            assignment: "Viva prep", 
            pocketProject: "Demo showcase", 
            quiz: DEFAULT_QUIZ,
            questions: [
              { text: "What is a 'Tech Defense' (Viva)?", options: ["A fight", "An oral examination where you justify your technical choices and results", "A game", "None"], correctAnswer: 1 },
              { text: "Demo Engineering is about ____.", options: ["Building a road", "Preparing a reliable and impressive demonstration of your working software", "Drawing a map", "Printing code"], correctAnswer: 1 },
              { text: "Technical Storytelling helps ____.", options: ["Write a book", "Communicate the 'Why' and 'How' of your project in a way that engages the audience", "Lie about code", "None"], correctAnswer: 1 },
              { text: "When you don't know the answer to a technical question ____.", options: ["Run away", "State what you know and provide a logical hypothesis based on your engineering experience", "Guess randomly", "Stay silent"], correctAnswer: 1 },
              { text: "A 'Demo Flaw' should be ____.", options: ["Ignored", "Explained honestly with a plan for how to fix it in version 2.0", "Hidden", "Printed"], correctAnswer: 1 },
              { text: "Public Speaking for tech requires ____.", options: ["Loudness only", "Clarity, pace, and the ability to explain complex things simply", "A costume", "None"], correctAnswer: 1 },
              { text: "The 'Hook' in a presentation is ____.", options: ["A fish hook", "A compelling start that grabs the audience's attention", "The end", "A typo"], correctAnswer: 1 },
              { text: "A Mock Defense helps ____.", options: ["Draw", "Practice answering tough questions under pressure before the real exam", "Sleep", "Print"], correctAnswer: 1 },
              { text: "The Goal of the Defense is to ____.", options: ["Fight", "Demonstrate total mastery and ownership of the system you built", "Buy a degree", "None"], correctAnswer: 1 },
              { text: "Congratulations! You have finished SSS 3! What is your new title?", options: ["Student", "Certified AI System Architect / Junior Engineer", "Beginner", "None"], correctAnswer: 1 }
            ]
          },
        ]
      }
    ]
  }
];
