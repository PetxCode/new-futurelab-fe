
import { StudentProfile, Metric, LearningResource, Subject, ChartDataPoint, Assignment, SubCourse } from './types';

export const MOCK_STUDENT: StudentProfile = {
  name: "Leo Sterling",
  grade: "11th Grade • Tech Honors",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  academicLevel: 28,
  levelProgress: 82,
  achievements: ["Python Master", "Robotics Lead", "AI Ethicist"]
};

export const ACADEMIC_METRICS: Metric[] = [
  { label: "Current GPA", value: "3.94", trend: 'up', percentage: 4, color: 'text-emerald-400' },
  { label: "Lines of Python", value: "12.4k", trend: 'up', percentage: 22, color: 'text-indigo-400' },
  { label: "Lab Hours", value: "86h", trend: 'up', percentage: 12, color: 'text-violet-400' },
  { label: "Robot Efficiency", value: "94%", trend: 'neutral', percentage: 0, color: 'text-cyan-400' }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'a1', title: 'Neural Network Optimization', subject: 'AI Foundations', dueDate: 'Tomorrow', priority: 'High', status: 'In Progress', points: 100 },
  { id: 'a2', title: 'PID Controller Implementation', subject: 'Robotics Engineering', dueDate: 'Oct 15', priority: 'High', status: 'Not Started', points: 150 },
  { id: 'a3', title: 'Data Cleaning Script', subject: 'Python for Data Science', dueDate: 'Oct 12', priority: 'Medium', status: 'Completed', points: 50 },
  { id: 'a4', title: 'Ethics of Autonomous Systems', subject: 'AI Foundations', dueDate: 'Oct 20', priority: 'Low', status: 'Review', points: 80 }
];

export const SUBJECTS: Subject[] = [
  {
    id: "s1",
    title: "AI Foundations",
    teacher: "Dr. K. Aris",
    status: "Exam Prep",
    grade: "A",
    progress: 92,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
    description: "Exploration of neural networks, machine learning algorithms, and real-world AI implementation.",
    schedule: "Mon/Wed 10:00 AM",
    subCourses: [
      { id: 'sc1', title: 'Perceptrons & Basic Neurons', duration: '12m', description: 'Understanding the building blocks of neural networks.', videoUrl: 'https://www.youtube.com/embed/aircAruvnKk', isCompleted: true, badgeIcon: '🧠' },
      { id: 'sc2', title: 'Backpropagation Explained', duration: '22m', description: 'Mathematical walkthrough of gradient descent.', videoUrl: 'https://www.youtube.com/embed/IHZwWFHWa-w', isCompleted: false, badgeIcon: '⚡' },
      { id: 'sc3', title: 'CNN Architecture', duration: '18m', description: 'Computer vision basics with Convolutional Neural Nets.', videoUrl: 'https://www.youtube.com/embed/YRhxdVk_sIs', isCompleted: false, badgeIcon: '👁️' }
    ]
  },
  {
    id: "s2",
    title: "Robotics Engineering",
    teacher: "Prof. H. Vane",
    status: "Steady",
    grade: "A-",
    progress: 78,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
    description: "Mechanical design, electronics, and firmware for mobile robotics and automation.",
    schedule: "Tue/Thu 1:00 PM",
    subCourses: [
      { id: 'rc1', title: 'Introduction to ROS2', duration: '15m', description: 'Setting up your first workspace in ROS2.', videoUrl: 'https://www.youtube.com/embed/L93-ZJp_fU0', isCompleted: true, badgeIcon: '🤖' },
      { id: 'rc2', title: 'PID Loop Tuning', duration: '25m', description: 'Balancing P, I, and D constants for smooth motion.', videoUrl: 'https://www.youtube.com/embed/4Y7zG48uHRo', isCompleted: false, badgeIcon: '⚙️' },
      { id: 'rc3', title: 'LiDAR Data Processing', duration: '20m', description: 'Mapping environments using Laser Scanners.', videoUrl: 'https://www.youtube.com/embed/xL8pZf6_m2s', isCompleted: false, badgeIcon: '📡' }
    ]
  },
  {
    id: "s3",
    title: "Python for Data Science",
    teacher: "Ms. Sarah Chen",
    status: "Needs Review",
    grade: "B+",
    progress: 62,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=400",
    description: "NumPy, Pandas, and Matplotlib used to derive insights from complex datasets.",
    schedule: "Fri 11:30 AM",
    subCourses: [
      { id: 'pc1', title: 'Vectorized Ops with NumPy', duration: '10m', description: 'Array manipulation without for-loops.', videoUrl: 'https://www.youtube.com/embed/ZDa-Z5JzLYM', isCompleted: true, badgeIcon: '🐍' },
      { id: 'pc2', title: 'Pandas DataFrames', duration: '30m', description: 'Ingesting and cleaning large datasets.', videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg', isCompleted: false, badgeIcon: '📊' },
      { id: 'pc3', title: 'Plotting with Seaborn', duration: '14m', description: 'Creating professional statistical visualizations.', videoUrl: 'https://www.youtube.com/embed/6guX0PScU98', isCompleted: false, badgeIcon: '🎨' }
    ]
  }
];

export const SUGGESTED_RESOURCES: LearningResource[] = [
  {
    id: "r1",
    category: "Practice",
    title: "Python Engine",
    difficulty: "Coding",
    estimatedTime: "1h 20m",
    reward: "800 XP",
    icon: "🐍",
    tags: ["Deep Learning", "Python"]
  },
  {
    id: "r2",
    category: "Python",
    title: "Python 101: Fundamentals",
    difficulty: "Lectures",
    estimatedTime: "2h 30m",
    reward: "1200 XP",
    icon: "🧠",
    tags: ["Python", "Basics"],
    missions: [
      {
        id: "m1",
        title: "Introduction to Variables",
        description: "The absolute foundation of Python.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Store the future, one variable at a time."</p>
            <p>In this first module, you will learn the absolute foundation of Python: Variables. They are the memory banks for your applications.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>What is a variable?</li>
                 <li>How to declare variables in Python</li>
                 <li>Naming conventions and rules</li>
               </ul>
            </div>
            <p>Check the <strong>Lecture</strong> tab for the full detailed notes and examples!</p>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Introduction to Variables</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            In the world of programming, imagine a <strong>variable</strong> as a labeled storage box. 
            Before a computer can process data—like your character's score, a robot's speed, or a user's name—it needs a place to keep that information in memory.
          </p>
          
          <div class="bg-indigo-600/10 border-l-4 border-indigo-500 p-8 my-8 rounded-r-[2rem]">
            <h4 class="text-indigo-400 font-black uppercase tracking-widest mb-3">The Purpose</h4>
            <p class="text-slate-400 leading-relaxed">
              Variables allow us to store data, give it a meaningful name, and retrieve or change it later. 
              Instead of using hard-coded values like <code class="text-indigo-300">10</code> everywhere, we use a variable like <code class="text-indigo-300">speed_limit = 10</code>.
            </p>
          </div>

          <h3 class="text-2xl font-black text-white mb-6">How to Declare a Variable</h3>
          <p class="mb-6 text-slate-300 leading-relaxed">
            In Python, declaring a variable is incredibly simple. You don't need to specify the "type" of data beforehand; 
            you just pick a name and assign a value using the assignment operator (<code class="text-indigo-400">=</code>).
          </p>

          <div class="bg-slate-950 p-8 rounded-3xl border border-slate-800 mb-8 shadow-inner">
            <h5 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Python Example</h5>
            <div class="space-y-3 font-mono text-sm">
              <div class="flex items-center space-x-2">
                <span class="text-indigo-400">player_name</span>
                <span class="text-white">=</span>
                <span class="text-emerald-400">"Leo Sterling"</span>
                <span class="text-slate-600 ml-4"># Stores text (String)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-indigo-400">score</span>
                <span class="text-white">=</span>
                <span class="text-amber-400">1500</span>
                <span class="text-slate-600 ml-4"># Stores a whole number (Integer)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-indigo-400">battery_level</span>
                <span class="text-white">=</span>
                <span class="text-amber-400">94.5</span>
                <span class="text-slate-600 ml-4"># Stores a decimal (Float)</span>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-black text-white mb-4 italic underline underline-offset-8 decoration-indigo-500/30">Variable Naming Rules</h3>
          <ul class="space-y-4 text-slate-400">
            <li class="flex items-start">
              <span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3 mt-1 text-xs">1</span>
              <span>Must start with a letter or an underscore (_).</span>
            </li>
            <li class="flex items-start">
              <span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3 mt-1 text-xs">2</span>
              <span>Cannot start with a number.</span>
            </li>
            <li class="flex items-start">
              <span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3 mt-1 text-xs">3</span>
              <span>Can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ ).</span>
            </li>
            <li class="flex items-start">
              <span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3 mt-1 text-xs">4</span>
              <span>Are case-sensitive (<code class="text-indigo-300">age</code>, <code class="text-indigo-300">Age</code>, and <code class="text-indigo-300">AGE</code> are three different variables).</span>
            </li>
          </ul>
        `,
        practiceTest: [
          {
            question: "Which keyword is used to assign a value to a variable?",
            options: ["var", "=", "assign", "set"],
            correctAnswer: 1,
            explanation: "In Python, the '=' operator is used to assign a value to a variable name."
          },
          {
             question: "What is the correct way to name a multi-word variable in Python?",
             options: ["myVariable", "my_variable", "MyVariable", "my-variable"],
             correctAnswer: 1,
             explanation: "Snake_case (my_variable) is the standard naming convention for variables in Python (PEP 8)."
          },
          {
             question: "Which of these is a valid variable name?",
             options: ["2my_var", "my-var", "_my_var", "my var"],
             correctAnswer: 2,
             explanation: "Variable names can start with a letter or an underscore, but not a number. Spaces and hyphens are not allowed."
          },
          {
             question: "What happens if you assign a new value to an existing variable?",
             options: ["It throws an error", "It creates a second variable", "It updates the existing value", "It deletes the variable"],
             correctAnswer: 2,
             explanation: "Variables are 'dynamic'; assigning a new value simply replaces the old one."
          },
          {
             question: "Can a variable change its datatype in Python?",
             options: ["Yes", "No", "Only if it's a string", "Only if it's a number"],
             correctAnswer: 0,
             explanation: "Python is dynamically typed, meaning a variable originally holding a number can later hold a string."
          },
          {
             question: "Which function is used to display output in Python?",
             options: ["display()", "output()", "print()", "show()"],
             correctAnswer: 2,
             explanation: "The print() function sends data to the console."
          },
          {
             question: "How do you define a constant in Python by convention?",
             options: ["const MY_VAR = 10", "MY_VAR = 10 (All caps)", "let MY_VAR = 10", "static MY_VAR = 10"],
             correctAnswer: 1,
             explanation: "Python doesn't have true 'constants', but programmers use ALL_CAPS to signal that a value should not be changed."
          },
          {
             question: "What is 'case sensitivity' in Python variables?",
             options: ["'Age' and 'age' are the same", "'Age' and 'age' are different", "Python ignores case", "Only the first letter matters"],
             correctAnswer: 1,
             explanation: "Python is case-sensitive; 'age', 'Age', and 'AGE' are three distinct variables."
          }
        ],
        bannerImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200",
        difficulty: "Elementary",
        isLocked: false,
        isCompleted: true,
        reward: "50 XP",
        icon: "📦",
        tags: ["Basics"]
      },
      {
        id: "m2",
        title: "Python Datatypes",
        description: "Explore integers, floats, strings, and booleans.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Understanding the DNA of your data."</p>
            <p>Every value in Python has a nature. Knowing whether you're working with a number or text is the difference between a working script and a crash.</p>
            <div class="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
               <h4 class="text-emerald-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Identify the 4 core primitive datatypes</li>
                 <li>Use type() to inspect variables</li>
                 <li>Convert between types with Casting</li>
               </ul>
            </div>
            <p>Check the <strong>Lecture</strong> tab for the deep dive into casting and type inspection!</p>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">The Building Blocks: Python Datatypes</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            In Python, every piece of data has a <strong>type</strong>. The type defines what kind of operations you can perform on that data. 
            For example, you can add two numbers, but you can't "add" a number to a word without converting it first.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-indigo-600/5 border border-indigo-500/20 p-6 rounded-[2rem] hover:bg-indigo-600/10 transition-colors">
              <div class="flex items-center space-x-3 mb-3">
                <span class="p-2 bg-indigo-500 rounded-lg text-white font-black text-xs">INT</span>
                <h4 class="text-white font-black">Integers</h4>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">Whole numbers, positive or negative, without decimals. Perfect for counting items.</p>
              <code class="block mt-4 text-xs text-indigo-300 font-mono">count = 10</code>
            </div>

            <div class="bg-emerald-600/5 border border-emerald-500/20 p-6 rounded-[2rem] hover:bg-emerald-600/10 transition-colors">
              <div class="flex items-center space-x-3 mb-3">
                <span class="p-2 bg-emerald-500 rounded-lg text-white font-black text-xs">FLT</span>
                <h4 class="text-white font-black">Floats</h4>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">Numbers with scientific precision, containing one or more decimals.</p>
              <code class="block mt-4 text-xs text-emerald-300 font-mono">pi = 3.14159</code>
            </div>

            <div class="bg-amber-600/5 border border-amber-500/20 p-6 rounded-[2rem] hover:bg-amber-600/10 transition-colors">
              <div class="flex items-center space-x-3 mb-3">
                <span class="p-2 bg-amber-500 rounded-lg text-white font-black text-xs">STR</span>
                <h4 class="text-white font-black">Strings</h4>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">Sequences of characters wrapped in quotes. Used for storing text or labels.</p>
              <code class="block mt-4 text-xs text-amber-300 font-mono">msg = "Hello World"</code>
            </div>

            <div class="bg-rose-600/5 border border-rose-500/20 p-6 rounded-[2rem] hover:bg-rose-600/10 transition-colors">
              <div class="flex items-center space-x-3 mb-3">
                <span class="p-2 bg-rose-500 rounded-lg text-white font-black text-xs">BOL</span>
                <h4 class="text-white font-black">Booleans</h4>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed">The logic gates of code. Can only be <code class="text-rose-400">True</code> or <code class="text-rose-400">False</code>.</p>
              <code class="block mt-4 text-xs text-rose-300 font-mono">is_active = True</code>
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-6">Checking the Type</h3>
          <p class="mb-6 text-slate-300 leading-relaxed">
            Not sure what type a variable is? Python provides the built-in <code class="text-indigo-400">type()</code> function to inspect any value.
          </p>

          <div class="bg-slate-950 p-8 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="flex items-center space-x-2">
              <span class="text-slate-600">>>></span>
              <span class="text-indigo-400">x = 5</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-slate-600">>>></span>
              <span class="text-indigo-400">print(type(x))</span>
            </div>
            <div class="text-slate-500 italic mt-1"># Output: &lt;class 'int'&gt;</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-6">Type Casting</h3>
          <p class="mb-6 text-slate-300 leading-relaxed">
            Sometimes you need to change a variable from one type to another. This is called <strong>casting</strong>.
          </p>

          <ul class="space-y-4 text-slate-400 mb-8">
            <li class="flex items-start">
              <span class="font-black text-white mr-2">int()</span>
              <span>- Constructs an integer from an integer literal, a float literal (by removing all decimals), or a string literal (providing the string represents a whole number).</span>
            </li>
            <li class="flex items-start">
              <span class="font-black text-white mr-2">float()</span>
              <span>- Constructs a float from an integer literal, a float literal, or a string literal (providing the string represents a float or an integer).</span>
            </li>
            <li class="flex items-start">
              <span class="font-black text-white mr-2">str()</span>
              <span>- Constructs a string from a wide variety of data types, including strings, integer literals, and float literals.</span>
            </li>
          </ul>

          <div class="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20 italic text-slate-400">
            <strong>Pro Tip:</strong> Python is dynamically typed, meaning you can reassign a variable to a completely different type later in your code! <br/>
            <code class="text-xs text-indigo-400 mt-2 block">data = 10 # data is int</code>
            <code class="text-xs text-indigo-400 block">data = "Ten" # data is now str</code>
          </div>
        `,
        practiceTest: [
          {
            question: "What is the datatype of the value 7.0?",
            options: ["int", "float", "str", "bool"],
            correctAnswer: 1,
            explanation: "Even though it's a whole number, the presence of the decimal point makes it a 'float' in Python."
          },
          {
             question: "What is the result of type(10.5)?",
             options: ["int", "float", "number", "decimal"],
             correctAnswer: 1,
             explanation: "Numbers with a decimal point are stored as 'float' in Python."
          },
          {
             question: "Which datatype represents a sequence of characters?",
             options: ["char", "text", "string", "list"],
             correctAnswer: 2,
             explanation: "The 'str' (string) type represents text data."
          },
          {
             question: "How do you represent a Boolean value in Python?",
             options: ["true / false", "True / False", "1 / 0", "yes / no"],
             correctAnswer: 1,
             explanation: "Booleans must be capitalized in Python: True or False."
          },
          {
             question: "What is the output of int(3.9)?",
             options: ["3", "4", "3.0", "Error"],
             correctAnswer: 0,
             explanation: "Casting a float to an int always 'truncates' (chops off) the decimal, moving towards zero."
          },
          {
             question: "What is the result of 10 + True in Python?",
             options: ["11", "10True", "Error", "10"],
             correctAnswer: 0,
             explanation: "In Python, Booleans are a subclass of integers. True is 1, False is 0."
          },
          {
             question: "Which function tells you the datatype of a variable?",
             options: ["typeof()", "datatype()", "check()", "type()"],
             correctAnswer: 3,
             explanation: "The type() function returns the class of the data."
          },
          {
             question: "How do you convert the number 5 into a string?",
             options: ["string(5)", "toString(5)", "str(5)", "val(5)"],
             correctAnswer: 2,
             explanation: "The str() function converts any value into its string representation."
          }
        ],
        difficulty: "Elementary",
        isLocked: false,
        isCompleted: false,
        reward: "100 XP",
        icon: "🔢",
        tags: ["Types"],
        unlockRequirement: "Introduction to Variables"
      },
      {
        id: "m3",
        title: "Dynamic Strings",
        description: "Master string manipulation and methods.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Crafting narratives with code."</p>
            <p>Strings are more than just text; they are one of the most powerful and flexible datatypes in Python. In this mission, you'll learn how to slice, dice, and transform text effortlessly.</p>
            <div class="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
               <h4 class="text-amber-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Master concatenation and f-strings</li>
                 <li>Use string methods like .upper(), .strip(), and .replace()</li>
                 <li>Understand string indexing, slicing, and escaping</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Mastering Dynamic Strings</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            In Python, strings are immutable sequences of character data. They are created by enclosing characters in quotes. 
            Python treats single quotes (<code class="text-amber-400">'</code>) and double quotes (<code class="text-amber-400">"</code>) exactly same.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. Multi-line Strings & Escaping</h3>
          <p class="mb-4 text-slate-400">Assign a multiline string using triple quotes, or use **Escape Characters** to insert illegal characters:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-amber-400">quote = "He said, \\"Python is awesome\\" "</div>
            <div class="text-slate-500 italic"># \\" inserts a double quote</div>
            <div class="text-indigo-400 mt-4">multi = """Line one<br/>Line two"""</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Concatenation & F-Strings</h3>
          <p class="mb-4 text-slate-400">To combine strings, use the <code class="text-indigo-400">+</code> operator. For embedding variables, **F-Strings** are the pro standard:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm">
            <div class="text-amber-400">name = "Cyborg"</div>
            <div class="text-amber-400">level = 5</div>
            <div class="text-emerald-400 font-bold">print(f"Level {level} {name}, power up!")</div>
            <div class="text-slate-500 mt-2"># Output: Level 5 Cyborg, power up!</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Power Tools: String Methods</h3>
          <p class="mb-6 text-slate-300">Think of these as built-in transformers for your text:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-indigo-400 font-bold">.upper() / .lower()</span>
              <p class="text-[10px] text-slate-500 mt-1">"bot".upper() -> "BOT"</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-indigo-400 font-bold">.strip()</span>
              <p class="text-[10px] text-slate-500 mt-1">Removes spaces: " hi ".strip() -> "hi"</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-indigo-400 font-bold">.replace(a, b)</span>
              <p class="text-[10px] text-slate-500 mt-1">"Cat".replace("C", "B") -> "Bat"</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-indigo-400 font-bold">.capitalize()</span>
              <p class="text-[10px] text-slate-500 mt-1">Capitalizes the first character.</p>
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">4. Advanced Slicing</h3>
          <p class="mb-4 text-slate-400">You can return a range of characters by using the slice syntax <code class="text-indigo-300">[start:stop:step]</code>:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 font-mono text-sm leading-relaxed mb-6">
            <span class="text-indigo-400">s = "ELECTRONIC"</span><br/>
            <span class="text-amber-400">print(s[0:3])</span> <span class="text-slate-600"># ELE (0 to 3)</span><br/>
            <span class="text-amber-400">print(s[::2])</span> <span class="text-slate-600"># EETONC (Every 2nd char)</span><br/>
            <span class="text-emerald-400">print(s[::-1])</span> <span class="text-slate-600"># CINO RTCELE (Reversed!)</span>
          </div>

          <div class="bg-amber-600/5 p-8 rounded-[2.5rem] border border-amber-500/20 italic text-slate-400">
            <strong>Pro Hack:</strong> String indices can be negative! <code class="text-amber-300">word[-1]</code> always gives you the very last character of a string, regardless of its length.
          </div>
        `,
        practiceTest: [
          {
            question: "Which of these is a valid f-string?",
            options: ['f"Hello {name}"', '"Hello {name}"', 's"Hello {name}"', 'format("Hello {name}")'],
            correctAnswer: 0,
            explanation: "F-strings must start with an 'f' before the opening quote."
          },
          {
             question: "What does '.strip()' do to a string?",
             options: ["Changes it to uppercase", "Removes leading/trailing spaces", "Reverses the string", "Splits it into a list"],
             correctAnswer: 1,
             explanation: ".strip() cleans up extra spaces at the start and end of a string."
          },
          {
             question: "What is the output of 'Python'[0:2]?",
             options: ["Py", "Pyt", "P", "y"],
             correctAnswer: 0,
             explanation: "Slicing [start:stop] starts at the first index and stops BEFORE the second index."
          },
          {
             question: "How do you find the length of a string?",
             options: ["string.length()", "len(string)", "size(string)", "count(string)"],
             correctAnswer: 1,
             explanation: "The global len() function returns the number of characters in a string."
          },
          {
             question: "What is the index of the LAST character in any string?",
             options: ["0", "length", "length - 1 (or -1)", "1"],
             correctAnswer: 2,
             explanation: "Python uses 0-based indexing, so the last char is length-1. You can also use -1."
          },
          {
             question: "Which method replaces text within a string?",
             options: [".swap()", ".change()", ".replace()", ".sub()"],
             correctAnswer: 2,
             explanation: ".replace('old', 'new') creates a new string with the replacements."
          },
          {
             question: "What does 'Python' * 2 result in?",
             options: ["Error", "PythonPython", "Python 2", "PYTHONYTHON"],
             correctAnswer: 1,
             explanation: "The '*' operator repeats a string a specified number of times."
          },
          {
             question: "How do you insert a newline into a string?",
             options: ["/n", "\\n", "n", "<br>"],
             correctAnswer: 1,
             explanation: "The escape character '\\n' represents a newline."
          }
        ],
        difficulty: "Easy",
        isLocked: true,
        isCompleted: false,
        reward: "150 XP",
        icon: "🔤",
        tags: ["Strings"],
        unlockRequirement: "Python Datatypes"
      },
      {
        id: "m4",
        title: "Numbers & Math",
        description: "Perform calculations using Python numbers.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Computing the physical world."</p>
            <p>From simple addition to complex physics simulations, numbers are the core of logic. Master the operators that make Python a powerful calculator.</p>
            <div class="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20">
               <h4 class="text-rose-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Use floor division (//) and modulus (%)</li>
                 <li>Understand operator precedence (PEMDAS)</li>
                 <li>Learn shorthand assignment and rounding</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Numbers & Mathematical Logic</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            Python supports various numeric types, but integers and floats are the most common. 
            What makes Python special is how intuitive its mathematical syntax is.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. Arithmetic Operators Grid</h3>
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between">
              <span class="text-indigo-400 font-black">+ , -</span>
              <span class="text-slate-500 text-xs text-right">Add / Sub</span>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between">
              <span class="text-indigo-400 font-black">* , /</span>
              <span class="text-slate-500 text-xs text-right">Mult / Div</span>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between">
              <span class="text-rose-400 font-black">//</span>
              <span class="text-slate-500 text-xs text-right">Floor Div (3 // 2 = 1)</span>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between">
              <span class="text-rose-400 font-black">%</span>
              <span class="text-slate-500 text-xs text-right">Mod (10 % 3 = 1)</span>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between">
              <span class="text-indigo-400 font-black">**</span>
              <span class="text-slate-500 text-xs text-right">Power (2 ** 3 = 8)</span>
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Order of Operations (PEMDAS)</h3>
          <p class="mb-4 text-slate-400">Python follows mathematical standard priorities:</p>
          <ul class="space-y-2 mb-8 text-sm">
            <li class="flex items-center text-emerald-400"><span class="w-16 font-bold">P</span>arentheses ()</li>
            <li class="flex items-center text-emerald-400"><span class="w-16 font-bold">E</span>xponents **</li>
            <li class="flex items-center text-slate-400"><span class="w-16 font-bold">M/D</span>Multiplication/Division</li>
            <li class="flex items-center text-slate-400"><span class="w-16 font-bold">A/S</span>Addition/Subtraction</li>
          </ul>
          <div class="bg-indigo-600/5 p-6 rounded-3xl border border-indigo-500/20 font-mono text-sm mb-8">
             <span class="text-white">result = 5 + 3 * 2</span> <span class="text-slate-500"># Output: 11</span><br/>
             <span class="text-white">result = (5 + 3) * 2</span> <span class="text-slate-500"># Output: 16</span>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Power Functions</h3>
          <p class="mb-4 text-slate-400">Beyond basic math, Python includes helpful global functions:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-xs space-y-2">
            <div><span class="text-indigo-400">abs(-5)</span> <span class="text-slate-600"># Returns 5 (Absolute)</span></div>
            <div><span class="text-indigo-400">round(3.14159, 2)</span> <span class="text-slate-600"># Returns 3.14</span></div>
            <div><span class="text-indigo-400">max(1, 5, 2)</span> <span class="text-slate-600"># Returns 5</span></div>
          </div>

          <div class="bg-rose-500/10 border-l-4 border-rose-500 p-8 my-8 rounded-r-[2rem]">
            <h4 class="text-rose-400 font-black uppercase tracking-widest mb-3">The Modulo Trick</h4>
            <p class="text-slate-400 leading-relaxed text-sm">
              The <code class="text-rose-300">%</code> operator is incredibly useful for checking if a number is even or odd. 
              If <code class="text-white">number % 2 == 0</code>, the number is even!
            </p>
          </div>
        `,
        practiceTest: [
          {
            question: "What is the result of 10 % 3?",
            options: ["3", "1", "0.33", "0"],
            correctAnswer: 1,
            explanation: "The modulo (%) operator returns the remainder of a division (10 / 3 = 3 remainder 1)."
          },
          {
             question: "What is the result of 2 ** 3?",
             options: ["6", "8", "9", "5"],
             correctAnswer: 1,
             explanation: "The '**' operator represents exponentiation (2 to the power of 3)."
          },
          {
             question: "What is the result of 10 // 4?",
             options: ["2.5", "2", "3", "0.4"],
             correctAnswer: 1,
             explanation: "Floor division (//) returns the largest integer less than or equal to the result."
          },
          {
             question: "Which operation is performed FIRST in: 10 + 5 * 2?",
             options: ["10 + 5", "5 * 2", "Both at once", "Left to right"],
             correctAnswer: 1,
             explanation: "Multiplication has higher precedence than addition (PEMDAS)."
          },
          {
             question: "How do you round 3.567 to 2 decimal places?",
             options: ["round(3.567, 2)", "math.round(3.567)", "floor(3.567)", "round(3.567)"],
             correctAnswer: 0,
             explanation: "The round() function takes the number and the number of digits as arguments."
          },
          {
             question: "How do you increment a variable 'x' by 5?",
             options: ["x = 5", "x += 5", "x == 5", "x + 5"],
             correctAnswer: 1,
             explanation: "The shorthand '+=' adds the value on the right to the existing variable."
          },
          {
             question: "What is the output of abs(-10)?",
             options: ["-10", "10", "0", "Error"],
             correctAnswer: 1,
             explanation: "abs() returns the absolute (positive) value of a number."
          },
          {
             question: "What is the result of 10 / 2?",
             options: ["5", "5.0", "Error", "2"],
             correctAnswer: 1,
             explanation: "Standard division (/) always returns a float in Python."
          }
        ],
        difficulty: "Easy",
        isLocked: true,
        isCompleted: false,
        reward: "150 XP",
        icon: "➕",
        tags: ["Math"],
        unlockRequirement: "Dynamic Strings"
      },
      {
        id: "m5",
        title: "list and it's methods",
        description: "Learn how to store collections of items.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Organizing the chaos."</p>
            <p>Lists are the most versatile collection type in Python. They allow you to store multiple items in a single variable, maintaining their order and allowing for easy manipulation.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Create, access, and slice lists</li>
                 <li>Master essential methods like .append(), .pop(), and .sort()</li>
                 <li>Understand nested lists and data organization</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Python Lists: Power in Collections</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            Lists are used to store multiple items in a single variable. They are ordered, changeable, and allow duplicate values. 
            Lists use <strong>Zero-based Indexing</strong>, meaning the first item is always at index <code class="text-indigo-400">0</code>.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. Creation & Accessing</h3>
          <p class="mb-4 text-slate-400">Lists are defined by square brackets <code class="text-indigo-400">[ ]</code>:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm">
            <div class="text-indigo-400">inventory = ["Shield", "Sword", "Potion"]</div>
            <div class="text-amber-400">print(inventory[1])</div> <div class="text-slate-600 mt-1"># Output: Sword</div>
            <div class="text-amber-400">print(inventory[-1])</div> <div class="text-slate-600 mt-1"># Output: Potion (Last Item)</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. The Methods Toolbox</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-indigo-400 font-black">.append("x")</span>
              <p class="text-[10px] text-slate-500 mt-1">Adds "x" to the end.</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-indigo-400 font-black">.pop(i)</span>
              <p class="text-[10px] text-slate-500 mt-1">Removes item at index i.</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
               <span class="text-indigo-400 font-black">.sort()</span>
               <p class="text-[10px] text-slate-500 mt-1">Sorts list alphabetically/numerically.</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800">
               <span class="text-indigo-400 font-black">.reverse()</span>
               <p class="text-[10px] text-slate-500 mt-1">Flips the order of the list.</p>
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Slicing Lists</h3>
          <p class="mb-4 text-slate-400">Just like strings, lists can be sliced to get a sub-list:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 font-mono text-sm leading-relaxed mb-8">
            <span class="text-indigo-400">nums = [0, 1, 2, 3, 4, 5]</span><br/>
            <span class="text-amber-400">print(nums[1:4])</span> <span class="text-slate-600"># [1, 2, 3]</span><br/>
            <span class="text-amber-400">print(nums[:3])</span> <span class="text-slate-600"># [0, 1, 2] (Start to 3)</span>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">4. Nested Lists (2D Arrays)</h3>
          <p class="mb-4 text-slate-400">A list can contain other lists! This is how we create grids or matrices:</p>
          <div class="bg-indigo-600/5 p-6 rounded-3xl border border-indigo-500/20 font-mono text-sm mb-6">
            <span class="text-indigo-400">matrix = [ [1,2], [3,4] ]</span><br/>
            <span class="text-amber-400">print(matrix[0][1])</span> <span class="text-slate-600"># Output: 2</span>
          </div>

          <div class="bg-indigo-950/40 p-8 rounded-[2.5rem] border border-indigo-500/30">
            <h4 class="text-indigo-300 font-black mb-2">Check Length</h4>
            <p class="text-sm text-slate-400">Use <code class="text-white">len(my_list)</code> to see how many items are currently in your list.</p>
          </div>
        `,
        practiceTest: [
          {
            question: "Which method is used to add an item to the VERY END of a list?",
            options: [".add()", ".insert()", ".append()", ".push()"],
            correctAnswer: 2,
            explanation: "In Python, .append() is the standard method to add an element to the end of an existing list."
          },
          {
             question: "How do you access the first item in a list named 'my_list'?",
             options: ["my_list[1]", "my_list(0)", "my_list[0]", "my_list.first()"],
             correctAnswer: 2,
             explanation: "Python uses 0-based indexing, so index 0 is the first item."
          },
          {
             question: "What does '.pop()' do by default if no index is provided?",
             options: ["Removes the first item", "Removes the last item", "Removes a random item", "Clears the list"],
             correctAnswer: 1,
             explanation: "Without an argument, .pop() removes and returns the last item in the list."
          },
          {
             question: "Which method counts how many times 'x' appears in a list?",
             options: [".total('x')", ".count('x')", ".occur('x')", "len('x')"],
             correctAnswer: 1,
             explanation: "The .count() method returns the number of times a specified value appears."
          },
          {
             question: "How do you check if 'Apple' is in a list?",
             options: ["'Apple' in list", "list.contains('Apple')", "list.has('Apple')", "check('Apple', list)"],
             correctAnswer: 0,
             explanation: "Python uses the 'in' keyword for membership testing."
          },
          {
             question: "What is the output of len([1, 2, [3, 4]])?",
             options: ["4", "3", "2", "Error"],
             correctAnswer: 1,
             explanation: "The sub-list [3, 4] counts as one single item in the parent list."
          },
          {
             question: "Which method removes a SPECIFIC value, like 'Sword', from a list?",
             options: [".pop('Sword')", ".delete('Sword')", ".remove('Sword')", ".strip('Sword')"],
             correctAnswer: 2,
             explanation: ".remove() finds and deletes the first occurrence of a specific value."
          },
          {
             question: "How do you clear all items from a list?",
             options: ["list.empty()", "list.clear()", "list = []", "Both list.clear() and list = []"],
             correctAnswer: 3,
             explanation: ".clear() empties the list, while reassignment to [] creates a new empty list."
          }
        ],
        difficulty: "Medium",
        isLocked: true,
        isCompleted: false,
        reward: "200 XP",
        icon: "📜",
        tags: ["Lists"],
        unlockRequirement: "Numbers & Math"
      },
      {
        id: "m6",
        title: "Conditional Logic",
        description: "Control program flow with if, elif, and else.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Teaching your code to decide."</p>
            <p>Logic is what transforms a script from a simple list of instructions into a smart, reactive application. Master the 'if' statement to handle different scenarios.</p>
            <div class="bg-cyan-500/10 p-6 rounded-2xl border border-cyan-500/20">
               <h4 class="text-cyan-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Understand Comparison Operators and nested logic</li>
                 <li>Master the if / elif / else structure</li>
                 <li>Learn Logical Operators (and; or; not) and Truthiness</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Conditional Logic: Branching Paths</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            Logic allows your program to make decisions based on data. Python relies on **Indentation** to define which code belongs to which branch.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. Comparison Operators</h3>
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs"><code class="text-cyan-400 font-mono">==</code> Equal</div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs"><code class="text-cyan-400 font-mono">!=</code> Not Equal</div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs"><code class="text-cyan-400 font-mono">&gt;</code> Greater</div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs"><code class="text-cyan-400 font-mono">&lt;</code> Less</div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs"><code class="text-cyan-400 font-mono">&gt;=</code> GTE</div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs"><code class="text-cyan-400 font-mono">&lt;=</code> LTE</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Logical Operators (Combined Logic)</h3>
          <p class="mb-4 text-slate-400">Combine multiple conditions using <code class="text-indigo-400">and</code>, <code class="text-indigo-400">or</code>, and <code class="text-indigo-400">not</code>:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-xs leading-relaxed">
            <div class="text-cyan-400">if (age > 18) and (has_id):</div>
            <div class="text-white ml-6">print("Verified!")</div>
            <div class="text-cyan-400 mt-2">if not (is_raining or is_snowing):</div>
            <div class="text-white ml-6">print("Go outside!")</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Truthy & Falsy Values</h3>
          <p class="mb-4 text-slate-300">In Python, almost any value can be evaluated as a Boolean. Here is a quick cheat sheet:</p>
          <div class="space-y-3 mb-8">
            <div class="p-4 bg-rose-950/20 rounded-2xl border border-rose-500/20 flex items-center justify-between">
              <span class="text-rose-400 font-bold uppercase text-[10px]">Falsy</span>
              <span class="text-slate-400 font-mono text-xs">0, "", [], {}, None, False</span>
            </div>
            <div class="p-4 bg-emerald-950/20 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
              <span class="text-emerald-400 font-bold uppercase text-[10px]">Truthy</span>
              <span class="text-slate-400 font-mono text-xs">1, "hi", [1,2], True</span>
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">4. Ternary Operator (One-liners)</h3>
          <p class="mb-4 text-slate-400">For simple decisions, you can use a single line of code:</p>
          <div class="bg-indigo-600/5 p-6 rounded-3xl border border-indigo-500/20 font-mono text-sm">
             <span class="text-white">msg = "Adult" if age >= 18 else "Minor"</span>
          </div>
        `,
        practiceTest: [
          {
            question: "Which operator checks if two values are equal?",
            options: ["=", "==", "===", "is"],
            correctAnswer: 1,
            explanation: "The double equals '==' is the comparison operator for equality in Python."
          },
          {
             question: "What is the result of 'not True'?",
             options: ["True", "False", "None", "Error"],
             correctAnswer: 1,
             explanation: "The 'not' operator flips a boolean value."
          },
          {
             question: "Which keyword handles 'otherwise if' in a conditional chain?",
             options: ["else if", "elseif", "elif", "otherwise"],
             correctAnswer: 2,
             explanation: "Python uses 'elif' as a contraction of 'else if'."
          },
          {
             question: "What is a 'Truthy' value in Python?",
             options: ["Only the boolean True", "Anything that isn't False, 0, or empty", "Any number", "Any string"],
             correctAnswer: 1,
             explanation: "Most values in Python are 'Truthy' unless they are explicitly empty (like [], '', 0, or None)."
          },
          {
             question: "Which operator requires BOTH conditions to be True?",
             options: ["or", "and", "xor", "nor"],
             correctAnswer: 1,
             explanation: "The 'and' operator only returns True if everything is True."
          },
          {
             question: "How do you write 'a is greater than or equal to b'?",
             options: ["a => b", "a >= b", "a >== b", "a > b"],
             correctAnswer: 1,
             explanation: "The standard operator is '>='."
          },
          {
             question: "In an 'if-elif-else' block, how many 'else' statements can you have?",
             options: ["Unlimited", "Zero or one", "Two", "As many as elifs"],
             correctAnswer: 1,
             explanation: "There can only be one final 'else' to catch anything not matching the previous conditions."
          },
          {
             question: "What character follows an 'if' statement condition?",
             options: ["{", ";", ":", "."],
             correctAnswer: 2,
             explanation: "In Python, a colon ':' signals the start of an indented code block."
          }
        ],
        difficulty: "Medium",
        isLocked: true,
        isCompleted: false,
        reward: "250 XP",
        icon: "🔀",
        tags: ["Logic"],
        unlockRequirement: "list and it's methods"
      },
      {
        id: "m7",
        title: "Loops: For & While",
        description: "Repeat actions efficiently with loops.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Automating the repetitive."</p>
            <p>Loops are the workhorses of any program. They allow you to execute the same block of code multiple times, saving you from writing redundant logic.</p>
            <div class="bg-violet-500/10 p-6 rounded-2xl border border-violet-500/20">
               <h4 class="text-violet-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Master the for loop with range(start, stop, step)</li>
                 <li>Understand while loops and infinite loop dangers</li>
                 <li>Learn loop control: break, continue, and else</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Loops: Mastering Repetition</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            Loops allow you to execute a block of code multiple times. Python provides two main ways to loop: <code class="text-indigo-400">for</code> and <code class="text-indigo-400">while</code>.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. The range() Explorer</h3>
          <p class="mb-4 text-slate-400">The <code class="text-indigo-400">range()</code> function is often used with for loops. It can take up to three arguments:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-violet-400">for i in range(2, 10, 2):</div>
            <div class="text-white ml-6">print(i) <span class="text-slate-600"># Prints: 2, 4, 6, 8</span></div>
            <div class="text-slate-500 italic mt-4"># range(start, stop, step)</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Looping Through Collections</h3>
          <p class="mb-4 text-slate-400">You can iterate through lists, strings, and even dictionaries:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-xs">
            <div class="text-indigo-400">skills = {"Python": 10, "JS": 8}</div>
            <div class="text-violet-400">for lang, level in skills.items():</div>
            <div class="text-white ml-6">print(f"{lang} is level {level}")</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Break, Continue & Else</h3>
          <p class="mb-6 text-slate-300">Control the flow of your loop precisely:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-rose-400 font-black">break</span>
              <p class="text-[10px] text-slate-500 mt-2">Stops the loop instantly. Used when you find what you're looking for.</p>
            </div>
            <div class="p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <span class="text-emerald-400 font-black">continue</span>
              <p class="text-[10px] text-slate-500 mt-2">Skips to the next cycle. Used to ignore specific data.</p>
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">4. Nested Loops</h3>
          <p class="mb-4 text-slate-400">You can put a loop inside another loop. This is useful for working with 2D data (like grids):</p>
          <div class="bg-violet-600/5 p-6 rounded-3xl border border-violet-500/20 font-mono text-sm leading-relaxed mb-6">
            <span class="text-violet-400">for row in range(3):</span><br/>
            <span class="text-white ml-6">for col in range(2):</span><br/>
            <span class="text-white ml-12">print(f"Cell: {row},{col}")</span>
          </div>

          <div class="bg-rose-950/20 p-8 rounded-[2.5rem] border border-rose-500/30">
            <h4 class="text-rose-400 font-black mb-2">Infinite Loop Warning!</h4>
            <p class="text-sm text-slate-400 italic">
              A <code class="text-white">while</code> loop will run forever if its condition never becomes False. Always ensure your variable changes inside the loop!
            </p>
          </div>
        `,
        practiceTest: [
          {
            question: "Which keyword is used to skip the rest of the current loop iteration and move to the next one?",
            options: ["break", "stop", "continue", "skip"],
            correctAnswer: 2,
            explanation: "The 'continue' statement allows you to skip only the current cycle of the loop and jump straight back to the condition/iterator."
          },
          {
             question: "How many times will a loop 'for i in range(5)' run?",
             options: ["4", "5", "6", "Infinite"],
             correctAnswer: 1,
             explanation: "range(5) generates numbers 0, 1, 2, 3, 4, which is 5 iterations."
          },
          {
             question: "Which keyword is used to exit a loop completely?",
             options: ["exit", "stop", "break", "return"],
             correctAnswer: 2,
             explanation: "The 'break' statement terminates the loop immediately."
          },
          {
             question: "What is the danger of a 'while True:' loop?",
             options: ["It's always faster", "It can become an infinite loop", "It only runs once", "It's illegal syntax"],
             correctAnswer: 1,
             explanation: "A loop with condition 'True' will never stop unless a 'break' or 'return' is hit internally."
          },
          {
             question: "Which function is used to loop through a sequence and get the index AND value?",
             options: ["index()", "iterate()", "enumerate()", "zip()"],
             correctAnswer: 2,
             explanation: "enumerate() returns pairs of (index, item) for each element in a collection."
          },
          {
             question: "What does range(2, 10, 2) generate?",
             options: ["2, 3, 4, 5, 6, 7, 8, 9", "2, 4, 6, 8, 10", "2, 4, 6, 8", "0, 2, 4, 6, 8"],
             correctAnswer: 2,
             explanation: "It starts at 2, goes up to (but not including) 10, with a step of 2."
          },
          {
             question: "Can you use an 'else' statement with a 'for' loop?",
             options: ["Yes, it runs if the loop finishes normally", "No, else only works with if", "Only with a while loop", "Yes, it runs only if the loop breaks"],
             correctAnswer: 0,
             explanation: "In Python, 'else' on a loop runs if the loop completes all iterations (without hitting a 'break')."
          },
          {
             question: "Which of these is NOT a valid loop in Python?",
             options: ["for", "while", "do-while", "nested for"],
             correctAnswer: 2,
             explanation: "Python does not have a built-in 'do-while' loop like C or Java."
          }
        ],
        difficulty: "Medium",
        isLocked: true,
        isCompleted: false,
        reward: "300 XP",
        icon: "🔁",
        tags: ["Loops"],
        unlockRequirement: "Conditional Logic"
      },
      {
        id: "m8",
        title: "Defining Functions",
        description: "Package code into reusable blocks.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Building reusable tools."</p>
            <p>Functions are the ultimate way to stay DRY (Don't Repeat Yourself). By grouping logic into named blocks, you can build complex systems that are easy to maintain and test.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Define functions with parameters and default values</li>
                 <li>Master Positional vs Keyword arguments</li>
                 <li>Understand variable Scope (Local vs Global)</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Functions: Modular Thinking</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            A function is a block of code which only runs when it is called. 
            They allow you to write logic once and reuse it across your entire application.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. Parameters & Default Values</h3>
          <p class="mb-4 text-slate-400">You can define parameters that take a default value if no argument is passed:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">def greet(name="Citizen"):</div>
            <div class="text-white ml-6">print(f"Hello, {name}")</div>
            <div class="text-white mt-4">greet("Leo") <span class="text-slate-600"># Output: Hello, Leo</span></div>
            <div class="text-white">greet() <span class="text-slate-600"># Output: Hello, Citizen</span></div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. The Return Statement</h3>
          <p class="mb-4 text-slate-400">Functions use <code class="text-indigo-400">return</code> to send a result back to the caller. Once a return is executed, the function exits immediately.</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-xs">
            <div class="text-indigo-400">def calc_area(w, h):</div>
            <div class="text-white ml-6">return w * h</div>
            <div class="text-emerald-400 mt-2">area = calc_area(10, 5)</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Global vs Local Scope</h3>
          <p class="mb-4 text-slate-300 leading-relaxed">Where you define a variable matters! A variable created <strong>inside</strong> a function belongs to that function's <strong>Local Scope</strong> and cannot be seen from the outside.</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-xs leading-relaxed">
            <span class="text-indigo-400">x = 300 <span class="text-slate-600"># Global</span></span><br/>
            <span class="text-indigo-400">def myfunc():</span><br/>
            <span class="text-white ml-6 italic">x = 200 <span class="text-slate-600"># Local (Different variable!)</span></span><br/>
            <span class="text-white ml-6">print(x)</span><br/>
            <span class="text-white mt-2">myfunc() <span class="text-slate-600"># Prints 200</span></span><br/>
            <span class="text-white">print(x) <span class="text-slate-600"># Prints 300</span></span>
          </div>

          <div class="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20">
             <h4 class="text-indigo-300 font-black mb-2">Arbitrary Args (*args)</h4>
             <p class="text-[10px] text-slate-400">
               If you don't know how many arguments will be passed, add a <code class="text-white">*</code> before the parameter. 
               The function will receive a <strong>tuple</strong> of arguments.
             </p>
          </div>
        `,
        practiceTest: [
          {
            question: "Which keyword is used to create a function in Python?",
            options: ["function", "func", "def", "create"],
            correctAnswer: 2,
            explanation: "In Python, 'def' (short for define) is the keyword used to start a function definition."
          },
          {
             question: "What is a 'parameter' in a function?",
             options: ["The value you pass in", "The variable defined in the function signature", "The result of the function", "The name of the function"],
             correctAnswer: 1,
             explanation: "Parameters are the variables listed in the function definition (e.g., def myfunc(parameter):)."
          },
          {
             question: "Which keyword is used to send a value back from a function?",
             options: ["send", "output", "return", "back"],
             correctAnswer: 2,
             explanation: "The 'return' statement exits the function and passes a result back to where it was called."
          },
          {
             question: "What happens to a function if no 'return' is specified?",
             options: ["It throws an error", "It returns 'None'", "It returns 0", "It returns the last line"],
             correctAnswer: 1,
             explanation: "In Python, functions always return 'None' by default if no explicit return is hit."
          },
          {
             question: "How do you define a function that takes ANY number of arguments?",
             options: ["def func(args):", "def func(*args):", "def func(all):", "def func(...):"],
             correctAnswer: 1,
             explanation: "The '*' prefix collects all passed positional arguments into a tuple."
          },
          {
             question: "Where is a variable 'x' accessible if it's defined INSIDE a function?",
             options: ["Everywhere", "Only inside that function", "Anywhere in the same file", "Only in other functions"],
             correctAnswer: 1,
             explanation: "This is called 'Local Scope'; the variable exists only during the function's execution."
          },
          {
             question: "How do you call a function named 'start'?",
             options: ["start", "call start", "start()", "run start"],
             correctAnswer: 2,
             explanation: "Parentheses () are required to execute (call) a function."
          },
          {
             question: "What are 'Keyword Arguments'?",
             options: ["Arguments passed by name (e.g., x=5)", "Special words like 'if'", "Arguments that are strings", "Mandatory arguments"],
             correctAnswer: 0,
             explanation: "Keyword arguments allow you to pass values to parameters by explicitly naming them."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "400 XP",
        icon: "⚙️",
        tags: ["Functions"],
        unlockRequirement: "Loops: For & While"
      },
      {
        id: "m9",
        title: "Object Oriented Python",
        description: "Introduction to Classes and Objects.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Modeling reality with code."</p>
            <p>Object-Oriented Programming (OOP) is a paradigm that allows you to group data and behavior into single entities called Objects. It's the secret behind building scalable, professional software.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Understand the relationship between Classes and Objects</li>
                 <li>Define classes and use the __init__() constructor</li>
                 <li>Create methods and understand basic Inheritance</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Introduction to OOP: Classes & Objects</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            A **Class** is like a "blueprint" for creating objects. An **Object** is a specific instance of that blueprint.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. The Constructor (__init__)</h3>
          <p class="mb-4 text-slate-400">The <code class="text-indigo-400">__init__</code> function is automatically called when a new object is created. Use it to set initial values:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">class CyberBot:</div>
            <div class="text-indigo-400 ml-6">def __init__(self, name, power):</div>
            <div class="text-white ml-12">self.name = name</div>
            <div class="text-white ml-12">self.power = power</div>
            <div class="text-white mt-4 font-bold">bot1 = CyberBot("Nexus", 9000)</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Methods & "self"</h3>
          <p class="mb-4 text-slate-400">Methods define what an object can **do**. The <code class="text-indigo-400">self</code> parameter is a reference to the current object itself:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400 ml-6">def fire_laser(self):</div>
            <div class="text-white ml-12">print(f"{self.name} fires a blast!")</div>
            <div class="text-emerald-400 mt-4">bot1.fire_laser()</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Intro to Inheritance</h3>
          <p class="mb-4 text-slate-300 leading-relaxed">Inheritance allows one class to derive features from another. This promotes code reuse:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-xs leading-relaxed">
            <div class="text-slate-500 italic"># Drone inherits from CyberBot</div>
            <div class="text-indigo-400">class Drone(CyberBot):</div>
            <div class="text-indigo-400 ml-6">def fly(self):</div>
            <div class="text-white ml-12">print("Taking flight...")</div>
            <div class="text-white mt-4">d1 = Drone("Vasp", 50)</div>
            <div class="text-white">d1.fire_laser() <span class="text-slate-600"># Inherited!</span></div>
          </div>

          <div class="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20 italic text-slate-400">
            <strong>Pro Hack:</strong> Use the <code class="text-indigo-400 font-mono">dir(object)</code> function to see all the properties and methods available for any Python object!
          </div>
        `,
        practiceTest: [
          {
            question: "Which keyword is used to create a class in Python?",
            options: ["object", "define", "class", "struct"],
            correctAnswer: 2,
            explanation: "In Python, 'class' is the keyword used to define a new class/blueprint for objects."
          },
          {
             question: "What is the name of the 'constructor' method in Python?",
             options: ["__init__", "__main__", "construct", "new"],
             correctAnswer: 0,
             explanation: "The '__init__' method is automatically called when a new instance of a class is created."
          },
          {
             question: "What does 'self' represent in a class method?",
             options: ["The class itself", "The instance (object) being called", "The parent class", "Nothing; it's just a word"],
             correctAnswer: 1,
             explanation: "'self' points to the specific object that is running the method, allowing access to its data."
          },
          {
             question: "Which concept allows a class to take attributes from another class?",
             options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
             correctAnswer: 2,
             explanation: "Inheritance allows a 'child' class to use and extend the 'parent' class's logic."
          },
          {
             question: "How do you create an instance (object) of a class 'Car'?",
             options: ["my_car = new Car()", "my_car = Car.create()", "my_car = Car()", "my_car = object(Car)"],
             correctAnswer: 2,
             explanation: "In Python, you instantiate a class by calling it like a function."
          },
          {
             question: "What is a 'Class Attribute'?",
             options: ["Data shared by ALL instances of a class", "Data unique to one object", "A method in a class", "Private data"],
             correctAnswer: 0,
             explanation: "Class attributes are defined directly in the class and are the same for every object created from it."
          },
          {
             question: "Which function checks if an object is an instance of a specific class?",
             options: ["check(obj, class)", "istype(obj, class)", "isinstance(obj, class)", "typeof(obj)"],
             correctAnswer: 2,
             explanation: "isinstance() returns True if an object matches the class or a subclass of it."
          },
          {
             question: "What is 'Polymorphism' roughly?",
             options: ["Hiding data", "Objects of different types responding to the same method name", "Copying objects", "Multiple inheritance"],
             correctAnswer: 1,
             explanation: "It allows different objects to provide their own implementation for a shared method name."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "500 XP",
        icon: "🏛️",
        tags: ["Classes", "OOP"],
        unlockRequirement: "Defining Functions"
      },
      {
        id: "m10",
        title: "Master Dictionaries",
        description: "Storing data with Key-Value pairs.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Map keys to values for lightning-fast lookups."</p>
            <p>Dictionaries are unordered, changeable, and indexed collections. They are used to store data values in key:value pairs, similar to a real-world dictionary where words map to definitions.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Create and access dictionaries</li>
                 <li>Add, update, and remove items</li>
                 <li>Loop through keys, values, and items</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Dictionaries: Key-Value Mapping</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            A dictionary is created using curly braces <code class="text-indigo-400">{}</code>. Every item has a unique key.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">1. Basics & Access</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">user = { "name": "Vasp", "level": 15 }</div>
            <div class="text-white">print(user["name"]) <span class="text-slate-600"># Prints 'Vasp'</span></div>
            <div class="text-white mt-2">level = user.get("level") <span class="text-slate-600"># Safer way</span></div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Modifying Data</h3>
          <p class="mb-4 text-slate-400">You can add new keys or update existing ones by assigning values:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">user["score"] = 500 <span class="text-slate-600"># Added new key</span></div>
            <div class="text-white">user.update({"level": 16}) <span class="text-slate-600"># Multiple updates</span></div>
            <div class="text-rose-400 mt-2">user.pop("name") <span class="text-slate-600"># Remove item</span></div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Iteration Table</h3>
          <div class="overflow-x-auto mb-8">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-white/5">
                  <th class="py-3 text-indigo-400 text-xs font-black uppercase">Method</th>
                  <th class="py-3 text-slate-500 text-xs font-black uppercase">What it returns</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-white/5">
                  <td class="py-4 font-mono text-white">.keys()</td>
                  <td class="py-4 text-slate-400">A list of all the keys in the dictionary.</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-4 font-mono text-white">.values()</td>
                  <td class="py-4 text-slate-400">A list of all the values in the dictionary.</td>
                </tr>
                <tr>
                  <td class="py-4 font-mono text-white">.items()</td>
                  <td class="py-4 text-slate-400">A list of tuples, each containing (key, value).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20 italic text-slate-400">
            <strong>Pro Hack:</strong> Use dictionary comprehensions <code class="text-indigo-400">{x: x**2 for x in range(5)}</code> to build maps instantly!
          </div>
        `,
        practiceTest: [
          {
            question: "Which characters are used to define a dictionary?",
            options: ["[]", "()", "{}", "<>"],
            correctAnswer: 2,
            explanation: "Curly braces {} are used to define dictionaries in Python."
          },
          {
             question: "How do you access the value associated with key 'age' in dict 'd'?",
             options: ["d.age", "d['age']", "d(age)", "d->age"],
             correctAnswer: 1,
             explanation: "The standard way to access a value is using square brackets d['key']."
          },
          {
             question: "What happens if you try to access a key that doesn't exist using d[key]?",
             options: ["Returns None", "Returns 0", "Throws a KeyError", "Creates the key"],
             correctAnswer: 2,
             explanation: "Accessing a missing key with square brackets causes a KeyError. Use .get() to avoid this."
          },
          {
             question: "Which method removes all items from a dictionary?",
             options: [".delete()", ".remove()", ".clear()", ".popall()"],
             correctAnswer: 2,
             explanation: "The .clear() method empties the dictionary completely."
          },
          {
             question: "What does the .items() method return?",
             options: ["Only the keys", "Only the values", "Pairs of (key, value) as tuples", "A string representation"],
             correctAnswer: 2,
             explanation: ".items() provides a view of both keys and values together."
          },
          {
             question: "Can dictionaries have duplicate keys?",
             options: ["Yes", "No", "Only if the values are different", "Only in Python 3.9+"],
             correctAnswer: 1,
             explanation: "Keys must be unique; assigning to an existing key will overwrite its old value."
          },
          {
             question: "Which function tells you how many key-value pairs are in a dictionary?",
             options: ["count()", "size()", "len()", "length()"],
             correctAnswer: 2,
             explanation: "The built-in len() function works on dictionaries just like lists."
          },
          {
             question: "How do you check if 'name' is a key in the dictionary 'u'?",
             options: ["u.has('name')", "if 'name' in u:", "u.contains('name')", "if u['name']:"],
             correctAnswer: 1,
             explanation: "The 'in' keyword is the standard Pythonic way to check for key existence."
          }
        ],
        difficulty: "Medium",
        isLocked: true,
        isCompleted: false,
        reward: "450 XP",
        icon: "📖",
        tags: ["Data Structures", "Dicts"],
        unlockRequirement: "Object Oriented Python"
      },
      {
        id: "m11",
        title: "Tuples & Sets",
        description: "Immutable sequences and unique collections.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Consistency with Tuples, Uniqueness with Sets."</p>
            <p>While Lists are for general sequences, Tuples are for data that shouldn't change, and Sets are for collections where duplicates aren't allowed.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Understand Tuple immutability</li>
                 <li>Perform Set operations (Union, Intersection)</li>
                 <li>Choose the right structure for performance</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Tuples & Sets: Specialized Collections</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. Tuples: The Relentless Sequence</h3>
          <p class="mb-4 text-slate-400">Defined with <code class="text-indigo-400">()</code>. Once created, they cannot be modified (Immutable).</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">coords = (10, 20)</div>
            <div class="text-white">x, y = coords <span class="text-slate-600"># Packing/Unpacking</span></div>
            <div class="text-rose-400 mt-2 italic"># coords[0] = 5  <-- Error! Tuples are frozen.</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Sets: The Orderless Uniques</h3>
          <p class="mb-4 text-slate-400">Defined with <code class="text-indigo-400">set()</code> or <code class="text-white">{}</code>. They automatically ignore duplicates.</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">ids = {101, 102, 101, 103}</div>
            <div class="text-white">print(ids) <span class="text-slate-600"># Prints {101, 102, 103}</span></div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Set Math</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div class="p-5 bg-slate-900 rounded-2xl border border-indigo-500/10">
              <span class="text-indigo-400 font-black text-xs block mb-1">UNION |</span>
              <p class="text-slate-400 text-xs">Combines items from both sets.</p>
            </div>
            <div class="p-5 bg-slate-900 rounded-2xl border border-indigo-500/10">
              <span class="text-indigo-400 font-black text-xs block mb-1">INTERSECTION &</span>
              <p class="text-slate-400 text-xs">Only items found in BOTH sets.</p>
            </div>
          </div>
        `,
        practiceTest: [
          {
            question: "What makes a Tuple different from a List?",
            options: ["It uses {}", "It is faster", "It cannot be changed (Immutable)", "It can only store numbers"],
            correctAnswer: 2,
            explanation: "Immutability is the defining feature of Tuples; they are constant once created."
          },
          {
             question: "Which characters are used to define a basic set?",
             options: ["[]", "()", "{}", "<>"],
             correctAnswer: 2,
             explanation: "Sets use curly braces {}, but unlike dictionaries, they don't use key-value pairs."
          },
          {
             question: "What happens if you add a duplicate item to a set?",
             options: ["Throws an error", "It is ignored", "It replaces the old one", "The set becomes a list"],
             correctAnswer: 1,
             explanation: "Sets inherently only store unique items; duplicates are silently discarded."
          },
          {
             question: "How do you create an EMPTY set?",
             options: ["s = {}", "s = set()", "s = []", "s = (,)"],
             correctAnswer: 1,
             explanation: "s = {} creates an empty dictionary. You must use s = set() for an empty set."
          },
          {
             question: "Which operator is used for the Intersection of two sets?",
             options: ["|", "&", "+", "^"],
             correctAnswer: 1,
             explanation: "The ampersand & returns only items present in both sets."
          },
          {
             question: "Can you change an item inside a tuple after it's created?",
             options: ["Yes, with .update()", "Yes, directly", "No", "Only if it contains a list"],
             correctAnswer: 2,
             explanation: "Tuples are immutable; you cannot reassign their internal elements."
          },
          {
             question: "Which set method adds a single item?",
             options: [".append()", ".add()", ".insert()", ".push()"],
             correctAnswer: 1,
             explanation: "Sets use .add(), while lists use .append()."
          },
          {
             question: "Are sets ordered?",
             options: ["Yes, always", "No, for speed they are unordered", "Only if they contain strings", "Yes, in Python 3.7+"],
             correctAnswer: 1,
             explanation: "Sets are unordered; you cannot rely on the position of items."
          }
        ],
        difficulty: "Medium",
        isLocked: true,
        isCompleted: false,
        reward: "450 XP",
        icon: "🧩",
        tags: ["Collections"],
        unlockRequirement: "Master Dictionaries"
      },
      {
        id: "m12",
        title: "List Comprehensions",
        description: "Elegant shortcuts for modifying lists.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Code less, do more."</p>
            <p>List comprehensions offer a shorter syntax when you want to create a new list based on the values of an existing list. It's the hallmark of 'Pythonic' code.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Transform loops into one-liners</li>
                 <li>Add conditions to comprehensions</li>
                 <li>Identify when NOT to use them for clarity</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Mastering List Comprehensions</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            Standard way to double numbers:
          </p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm opacity-50">
            nums = [1, 2, 3]<br/>
            double = []<br/>
            for n in nums: double.append(n * 2)
          </div>

          <h3 class="text-2xl font-black text-white mb-4">1. The One-Liner</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-indigo-500/30 mb-8 font-mono text-sm leading-relaxed">
            <span class="text-emerald-400">double = [n * 2 for n in nums]</span>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Adding 'if' Logic</h3>
          <p class="mb-4 text-slate-400">Filter data while building the list:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">evens = [x for x in range(10) if x % 2 == 0]</div>
            <div class="text-slate-500 italic mt-2"># Only keeps items that pass the 'if' test</div>
          </div>

          <div class="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20 text-slate-400">
            <strong>Pro Hack:</strong> Don't nest them too deep! If a comprehension is longer than one line, a regular loop might be more readable for your team.
          </div>
        `,
        practiceTest: [
          {
            question: "What is the primary benefit of list comprehensions?",
            options: ["Higher security", "More readable one-liners", "Automatic error fixing", "Unlimited memory"],
            correctAnswer: 1,
            explanation: "They allow for concise, elegant, and readable code for creating lists."
          },
          {
             question: "Which of these is a valid comprehension for squaring numbers?",
             options: ["[x^2 for x in nums]", "[for x in nums x*x]", "[x*x for x in nums]", "(x*x for x in nums)"],
             correctAnswer: 2,
             explanation: "The syntax is [expression for item in iterable]. Note: ^ is XOR in Python, use * or **."
          },
          {
             question: "Where does the 'if' statement go in a filtered comprehension?",
             options: ["At the start", "Before 'for'", "After the iterable", "In parentheses"],
             correctAnswer: 2,
             explanation: "Syntax: [expr for item in iterable IF condition]."
          },
          {
             question: "Can list comprehensions be used to nested loops?",
             options: ["Yes", "No", "Only for strings", "Only in functions"],
             correctAnswer: 0,
             explanation: "Yes, you can have multiple 'for' clauses in a single comprehension."
          },
          {
             question: "What is returned if you use (x for x in nums) instead of []?",
             options: ["A list", "A tuple", "A generator object", "A set"],
             correctAnswer: 2,
             explanation: "Parentheses create a generator, which is more memory-efficient than a list."
          },
          {
             question: "Is [x.upper() for x in ['a', 'b']] valid?",
             options: ["Yes, it returns ['A', 'B']", "No, strings don't work", "Only in lists of 3+", "Yes, it returns 'AB'"],
             correctAnswer: 0,
             explanation: "Comprehensions can perform any valid method on the items."
          },
          {
             question: "Which of these handles 'if-else' in comprehension?",
             options: ["[x if cond else y for x in list]", "[x for x in list if cond else y]", "[if cond x else y for x in list]", "Python doesn't allow else in comprehensions"],
             correctAnswer: 0,
             explanation: "When using else, the conditional expression moves to the FRONT of the for loop."
          },
          {
             question: "What happens to the internal variable 'x' after the comprehension finishes?",
             options: ["It is deleted (Python 3)", "It stays at the last value", "It becomes None", "It stays at the first value"],
             correctAnswer: 0,
             explanation: "In Python 3, list comprehensions have their own scope to prevent 'leaking' variables."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "500 XP",
        icon: "⚡",
        tags: ["Functional", "Shortcuts"],
        unlockRequirement: "Tuples & Sets"
      },
      {
        id: "m13",
        title: "Error Handling",
        description: "Preventing crashes with Try & Except.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Fail gracefully, don't crash."</p>
            <p>Bugs happen. Professional code anticipates them using error handling blocks. This ensures your app stays running even if something unexpected occurs.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Catch specific errors like ZeroDivisionError</li>
                 <li>Use Finally for cleanup tasks</li>
                 <li>Raise your own custom errors</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Error Handling: The Safety Net</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. The Try/Except Block</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">try:</div>
            <div class="text-white ml-6">num = 10 / 0</div>
            <div class="text-indigo-400">except ZeroDivisionError:</div>
            <div class="text-white ml-6">print("Cannot divide by zero!")</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Catching Multiple Errors</h3>
          <p class="mb-4 text-slate-400">Be specific! Catching 'Exception' is usually lazy and dangerous.</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">except (ValueError, TypeError) as e:</div>
            <div class="text-white ml-6">print(f"Duct tape needed: {e}")</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. The Complete Chain</h3>
          <ul class="space-y-4">
             <li class="flex items-start">
                <span class="text-indigo-400 font-black mr-3">Try:</span> 
                <span class="text-slate-400 text-sm">Code that might fail.</span>
             </li>
             <li class="flex items-start">
                <span class="text-rose-400 font-black mr-3">Except:</span> 
                <span class="text-slate-400 text-sm">Code to run IF it fails.</span>
             </li>
             <li class="flex items-start">
                <span class="text-emerald-400 font-black mr-3">Else:</span> 
                <span class="text-slate-400 text-sm">Code to run ONLY if it succeeds.</span>
             </li>
             <li class="flex items-start">
                <span class="text-amber-400 font-black mr-3">Finally:</span> 
                <span class="text-slate-400 text-sm">Code that runs NO MATTER WHAT.</span>
             </li>
          </ul>
        `,
        practiceTest: [
          {
            question: "Which block contains code that might throw an error?",
            options: ["catch", "try", "error", "handle"],
            correctAnswer: 1,
            explanation: "The 'try' block is where you place risky code."
          },
          {
             question: "Which keyword is used to catch a specific error?",
             options: ["catch", "except", "rescue", "failing"],
             correctAnswer: 1,
             explanation: "Python uses 'except', while languages like Java use 'catch'."
          },
          {
             question: "What does the 'finally' block do?",
             options: ["Exits the program", "Runs only if there is an error", "Runs no matter what happens", "Ignores the error"],
             correctAnswer: 2,
             explanation: "Finally is used for cleanup (like closing files) that must happen every time."
          },
          {
             question: "How do you manually trigger an error?",
             options: ["throw", "raise", "error()", "crash!"],
             correctAnswer: 1,
             explanation: "The 'raise' keyword is used to manually trigger an exception."
          },
          {
             question: "What is caught by 'except Exception:'?",
             options: ["Only SyntaxErrors", "Almost all standard errors", "Only custom errors", "Variables"],
             correctAnswer: 1,
             explanation: "Catching 'Exception' catches almost all non-system-exiting errors, but is less precise."
          },
          {
             question: "Which error occurs when you try to use a missing variable?",
             options: ["ValueError", "TypeError", "NameError", "KeyError"],
             correctAnswer: 2,
             explanation: "A NameError happens when a name (variable) is not found in the scope."
          },
          {
             question: "Can you have multiple 'except' blocks for one 'try'?",
             options: ["Yes", "No", "Only if they catch numbers", "Limit of 2"],
             correctAnswer: 0,
             explanation: "Yes, you can have as many as needed to handle different specific scenarios."
          },
          {
             question: "What does the 'else' block do in error handling?",
             options: ["Runs if an error occurred", "Runs if NO error occurred", "Same as finally", "Doesn't exist"],
             correctAnswer: 1,
             explanation: "The 'else' block runs only if the code in the 'try' block was successful."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "550 XP",
        icon: "🛡️",
        tags: ["Safety", "Bugs"],
        unlockRequirement: "List Comprehensions"
      },
      {
        id: "m14",
        title: "Working with Files",
        description: "Reading and writing data to files.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Persistence is key."</p>
            <p>Learn how to save your program's data permanently using File I/O. We'll cover opening, reading, writing, and the importance of closing files using the 'with' statement.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Open and close files safely</li>
                 <li>Read content line by line</li>
                 <li>Write and append data to text files</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">File I/O: Reading & Writing</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. The 'with' Statement</h3>
          <p class="mb-4 text-slate-400">Always use <code class="text-indigo-400">with</code> to open files. It automatically closes the file for you, preventing memory leaks.</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">with open("data.txt", "r") as f:</div>
            <div class="text-white ml-6">content = f.read()</div>
            <div class="text-white ml-6">print(content)</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. File Modes</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div class="p-4 bg-slate-900 rounded-xl border border-white/5 text-center">
              <span class="text-indigo-400 font-black block">"r"</span>
              <span class="text-[10px] text-slate-500 uppercase">Read</span>
            </div>
            <div class="p-4 bg-slate-900 rounded-xl border border-white/5 text-center">
              <span class="text-emerald-400 font-black block">"w"</span>
              <span class="text-[10px] text-slate-500 uppercase">Write</span>
            </div>
            <div class="p-4 bg-slate-900 rounded-xl border border-white/5 text-center">
              <span class="text-amber-400 font-black block">"a"</span>
              <span class="text-[10px] text-slate-500 uppercase">Append</span>
            </div>
            <div class="p-4 bg-slate-900 rounded-xl border border-white/5 text-center">
              <span class="text-rose-400 font-black block">"x"</span>
              <span class="text-[10px] text-slate-500 uppercase">Create</span>
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Reading Techniques</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-slate-500 italic"># Reading lines as a list</div>
            <div class="text-white">lines = f.readlines()</div>
            <div class="text-slate-500 italic mt-4"># Iterating line by line (Efficient!)</div>
            <div class="text-indigo-400">for line in f:</div>
            <div class="text-white ml-6">print(line.strip())</div>
          </div>
        `,
        practiceTest: [
          {
            question: "What is the safest way to open a file in Python?",
            options: ["open()", "with open()", "file.open()", "import file"],
            correctAnswer: 1,
            explanation: "The 'with' statement ensures the file is closed automatically, even if an error occurs."
          },
          {
             question: "Which mode should you use to add text to an existing file?",
             options: ["'r'", "'w'", "'a'", "'x'"],
             correctAnswer: 2,
             explanation: "'a' stands for append, which adds data to the end of the file without deleting existing content."
          },
          {
             question: "What does the 'w' mode do if the file already exists?",
             options: ["Appends text", "Throws an error", "Overwrites the file", "Opens it in read-only mode"],
             correctAnswer: 2,
             explanation: "'w' (write) mode deletes any existing content in the file as soon as it's opened."
          },
          {
             question: "Which method reads the entire file content into a single string?",
             options: [".read()", ".readline()", ".readlines()", ".getcontent()"],
             correctAnswer: 0,
             explanation: ".read() reads everything at once. Use with caution on very large files!"
          },
          {
             question: "How do you read a file line by line most memory-efficiently?",
             options: ["Using .read()", "Using .readlines()", "Looping directly over the file object", "Using a list comprehension"],
             correctAnswer: 2,
             explanation: "Looping 'for line in file' reads one line at a time from the disk, saving RAM."
          },
          {
             question: "What is the purpose of the .close() method?",
             options: ["To delete the file", "To save changes and free resources", "To encrypt the file", "To rename the file"],
             correctAnswer: 1,
             explanation: "Closing a file flushes the buffer and releases the system handle."
          },
          {
             question: "What exception is raised if you try to open a missing file in 'r' mode?",
             options: ["KeyError", "ValueError", "FileNotFoundError", "OSError"],
             correctAnswer: 2,
             explanation: "Python raises FileNotFoundError when a read operation is attempted on a non-existent path."
          },
          {
             question: "Which mode is used to open a file for BOTH reading and writing?",
             options: ["'rw'", "'r+'", "'wa'", "'a+'"],
             correctAnswer: 1,
             explanation: "'r+' opens the file for updating (reading and writing)."
          }
        ],
        difficulty: "Medium",
        isLocked: true,
        isCompleted: false,
        reward: "450 XP",
        icon: "📂",
        tags: ["IO", "Files"],
        unlockRequirement: "Error Handling"
      },
      {
        id: "m15",
        title: "Modules & Packages",
        description: "Organizing and importing code.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Don't reinvent the wheel."</p>
            <p>Python's ecosystem is vast. Modules allow you to use code written by others or organize your own project across multiple files.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Import built-in modules like math and random</li>
                 <li>Create and import your own modules</li>
                 <li>Understand the difference between module and package</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Modules: The Lego Blocks of Python</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. Basic Imports</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">import math</div>
            <div class="text-white">print(math.sqrt(16))</div>
            <div class="text-slate-500 italic mt-4"># Importing specific tools</div>
            <div class="text-indigo-400">from random import randint</div>
            <div class="text-white">num = randint(1, 10)</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Aliasing</h3>
          <p class="mb-4 text-slate-400">Rename modules to keep your code concise:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">import numpy as np</div>
            <div class="text-white">arr = np.array([1, 2, 3])</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Custom Modules</h3>
          <p class="mb-4 text-slate-300 leading-relaxed">Any <code class="text-indigo-400">.py</code> file is a module! If you have <code class="text-white">utils.py</code>, you can use <code class="text-white">import utils</code> in another file.</p>
          
          <div class="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20">
             <h4 class="text-indigo-300 font-black mb-2">The Standard Library</h4>
             <p class="text-xs text-slate-400">Python comes "batteries included". Modules like <code class="text-white">os</code>, <code class="text-white">sys</code>, and <code class="text-white">json</code> are ready to use out of the box!</p>
          </div>
        `,
        practiceTest: [
          {
            question: "Which keyword is used to bring a module into your script?",
            options: ["include", "using", "import", "require"],
            correctAnswer: 2,
            explanation: "In Python, 'import' is the standard way to load external modules."
          },
          {
             question: "How do you only import the 'choice' function from the 'random' module?",
             options: ["import choice from random", "from random import choice", "import random.choice", "from random choice import choice"],
             correctAnswer: 1,
             explanation: "'from module import function' allows you to use the function directly without the prefix."
          },
          {
             question: "What is an 'Alias' in an import statement?",
             options: ["A secret password", "A nickname for the module (e.g., as np)", "A way to hide code", "A syntax error"],
             correctAnswer: 1,
             explanation: "Aliasing (using 'as') makes long module names shorter and easier to type."
          },
          {
             question: "What is the standard name for Python's package manager?",
             options: ["npm", "gem", "pip", "brew"],
             correctAnswer: 2,
             explanation: "PIP is the tool used to install third-party packages from PyPI (Python Package Index)."
          },
          {
             question: "Which built-in module would you use to generate random numbers?",
             options: ["math", "random", "sys", "os"],
             correctAnswer: 1,
             explanation: "The random module provides functions like randint, choice, and shuffle."
          },
          {
             question: "What does 'import *' do?",
             options: ["Imports everything (Warning: Dangerous!)", "Imports only comments", "Deletes the module", "Checks if module exists"],
             correctAnswer: 0,
             explanation: "'import *' can lead to name conflicts; it's better to import exactly what you need."
          },
          {
             question: "Which file must be present in a directory to mark it as a Python Package?",
             options: ["main.py", "__init__.py", "setup.py", "package.json"],
             correctAnswer: 1,
             explanation: "The __init__.py file (even if empty) tells Python the directory is a package."
          },
          {
             question: "Which module provides functions for interacting with the operating system?",
             options: ["sys", "os", "platform", "env"],
             correctAnswer: 1,
             explanation: "The 'os' module allows you to list files, create directories, and more."
          }
        ],
        difficulty: "Medium",
        isLocked: true,
        isCompleted: false,
        reward: "450 XP",
        icon: "📦",
        tags: ["Modules", "Libraries"],
        unlockRequirement: "Working with Files"
      },
      {
        id: "m16",
        title: "Lambda Functions",
        description: "Anonymous one-line functions.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Quick logic for quick tasks."</p>
            <p>Sometimes you need a small function only once. Lambdas allow you to define functions without a name, perfect for map, filter, and sorting operations.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Master the Lambda syntax</li>
                 <li>Combine Lambdas with Map and Filter</li>
                 <li>Use Lambdas for custom sorting</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Lambda: The Anonymous Powerhouse</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. Syntax Comparison</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div class="bg-slate-950 p-6 rounded-2xl border border-white/5 font-mono text-xs">
              <span class="text-slate-500"># Standard</span><br/>
              def square(x):<br/>
              &nbsp;&nbsp;return x * x
            </div>
            <div class="bg-slate-950 p-6 rounded-2xl border border-indigo-500/30 font-mono text-xs">
              <span class="text-emerald-400"># Lambda</span><br/>
              square = lambda x: x * x
            </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Lambdas + Map</h3>
          <p class="mb-4 text-slate-400">Apply logic to every item in a list instantly:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">nums = [1, 2, 3]</div>
            <div class="text-white">doubled = list(map(lambda x: x*2, nums))</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Lambdas + Filter</h3>
          <p class="mb-4 text-slate-400">Keep only what matters:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-white">evens = list(filter(lambda x: x%2 == 0, range(10)))</div>
          </div>

          <div class="bg-indigo-600/5 p-8 rounded-[2.5rem] border border-indigo-500/20 text-slate-500 italic text-xs">
            <strong>Caution:</strong> Don't overuse Lambdas for complex logic. If it takes more than one expression, 'def' is better for readability.
          </div>
        `,
        practiceTest: [
          {
            question: "Which keyword is used to define an anonymous function?",
            options: ["anon", "func", "lambda", "def"],
            correctAnswer: 2,
            explanation: "Python uses the keyword 'lambda' for one-line, nameless functions."
          },
          {
             question: "How many expressions can a lambda function contain?",
             options: ["One", "Unlimited", "Two", "Zero"],
             correctAnswer: 0,
             explanation: "Lambda functions are restricted to a single expression. They cannot contain statements like 'return' or 'print'."
          },
          {
             question: "What is the return value of map(lambda x: x*2, [1, 2])?",
             options: ["[2, 4]", "A map object (iterator)", "4", "None"],
             correctAnswer: 1,
             explanation: "In Python 3, map() returns an iterator. You must wrap it in list() to see the results."
          },
          {
             question: "Which function uses a lambda to decide which items to KEEP in a list?",
             options: ["map", "filter", "reduce", "sort"],
             correctAnswer: 1,
             explanation: "filter() takes a function that returns True/False to decide which elements to include."
          },
          {
             question: "How would you write a lambda that adds two numbers x and y?",
             options: ["lambda x, y: x + y", "lambda(x, y) = x + y", "def lambda(x, y): x + y", "lambda x + y"],
             correctAnswer: 0,
             explanation: "Syntax: lambda arguments: expression."
          },
          {
             question: "When should you use 'def' instead of 'lambda'?",
             options: ["Always", "Never", "When logic is complex or reusable", "Only for math"],
             correctAnswer: 2,
             explanation: "Lambdas are for throw-away, simple logic. 'def' is for clear, documented, and multi-line functions."
          },
          {
             question: "What is 'Functional Programming' roughly?",
             options: ["Using only functions", "Programming where functions are treated as data", "Writing code that works", "Object-oriented code"],
             correctAnswer: 1,
             explanation: "Using map/filter/lambda is a style of functional programming in Python."
          },
          {
             question: "Can lambdas have default values for arguments?",
             options: ["Yes", "No", "Only for strings", "Only in Python 3.10+"],
             correctAnswer: 0,
             explanation: "Yes, e.g., lambda x, y=10: x + y is perfectly valid."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "500 XP",
        icon: "λ",
        tags: ["Functional", "Functions"],
        unlockRequirement: "Modules & Packages"
      },
      {
        id: "m17",
        title: "Datetime Mastery",
        description: "Working with time and dates.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Time waits for no one."</p>
            <p>From timestamps and log entries to countdowns, handling dates and times is a critical skill for any developer. We'll explore the 'datetime' module.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Get current date and time</li>
                 <li>Format dates as strings (strftime)</li>
                 <li>Calculate time differences using timedelta</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Datetime: Tracking the Clock</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. Getting 'Now'</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">from datetime import datetime</div>
            <div class="text-white">now = datetime.now()</div>
            <div class="text-white">print(now.year) <span class="text-slate-600"># e.g., 2025</span></div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Formatting (strftime)</h3>
          <p class="mb-4 text-slate-400">Convert date objects into pretty strings:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-white">formatted = now.strftime("%Y-%m-%d %H:%M")</div>
            <div class="text-slate-500 italic mt-2"># %Y = Year, %m = Month, %d = Day</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. Time Deltas</h3>
          <p class="mb-4 text-slate-300 leading-relaxed">Calculate the difference between two times:</p>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">from datetime import timedelta</div>
            <div class="text-white">tomorrow = now + timedelta(days=1)</div>
          </div>
        `,
        practiceTest: [
          {
            question: "Which module is used for date and time in Python?",
            options: ["time", "datetime", "clock", "date"],
            correctAnswer: 1,
            explanation: "The 'datetime' module is the standard library for date and time manipulation."
          },
          {
             question: "How do you get the current date and time?",
             options: ["datetime.today()", "datetime.now()", "datetime.current()", "datetime.now"],
             correctAnswer: 1,
             explanation: "datetime.now() returns the local date and time down to milliseconds."
          },
          {
             question: "What does strftime stand for?",
             options: ["String From Time", "String Format Time", "Structure Time", "Star Fire Time"],
             correctAnswer: 1,
             explanation: "It stands for 'String Format Time'; it formats a datetime object into a readable string."
          },
          {
             question: "Which formatting code represents the 4-digit year?",
             options: ["%y", "%year", "%Y", "%YY"],
             correctAnswer: 2,
             explanation: "%Y gives '2025', while %y gives the 2-digit '25'."
          },
          {
             question: "What is a 'Timedelta'?",
             options: ["A special time zone", "The difference between two dates", "A fast clock", "A function to stop time"],
             correctAnswer: 1,
             explanation: "timedelta objects represent a duration, or the difference between two date/time points."
          },
          {
             question: "Which code represents the full name of the month (e.g., January)?",
             options: ["%m", "%M", "%B", "%b"],
             correctAnswer: 2,
             explanation: "%B is the full month name, %b is the abbreviated name (Jan)."
          },
          {
             question: "Can you subtract two datetime objects directly?",
             options: ["Yes, it returns a timedelta", "No", "Only if they are in the same year", "Yes, it returns a string"],
             correctAnswer: 0,
             explanation: "Subtracting datetimes (dt2 - dt1) is a common way to measure time elapsed."
          },
          {
             question: "What is the unix epoch start date?",
             options: ["Jan 1, 1900", "Jan 1, 1970", "Jan 1, 2000", "Dec 31, 1969"],
             correctAnswer: 1,
             explanation: "The epoch is Jan 1, 1970, at 00:00:00 UTC."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "500 XP",
        icon: "⏰",
        tags: ["Time", "Utils"],
        unlockRequirement: "Lambda Functions"
      },
      {
        id: "m18",
        title: "Introduction to Recursion",
        description: "Functions that call themselves.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"To understand recursion, you must first understand recursion."</p>
            <p>Recursion is a powerful technique where a function calls itself to solve smaller instances of the same problem. It's essential for working with complex data structures like trees and graphs.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Identify the Base Case and Recursive Case</li>
                 <li>Trace the call stack to see how recursion works</li>
                 <li>Implement classic algorithms like Factorial</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Recursion: The Mirror Effect</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. The Two Golden Rules</h3>
          <p class="mb-4 text-slate-400">Every recursive function MUST have:</p>
          <ul class="space-y-4 mb-8">
             <li class="p-5 bg-slate-900 rounded-2xl border border-indigo-500/10">
                <span class="text-indigo-400 font-black block text-xs mb-1 uppercase">1. Base Case</span>
                <p class="text-slate-400 text-sm italic">The condition where the function STOPS calling itself.</p>
             </li>
             <li class="p-5 bg-slate-900 rounded-2xl border border-indigo-500/10">
                <span class="text-rose-400 font-black block text-xs mb-1 uppercase">2. Recursive Case</span>
                <p class="text-slate-400 text-sm italic">The logic that calls the function with a smaller input.</p>
             </li>
          </ul>

          <h3 class="text-2xl font-black text-white mb-4">2. The Classic Factorial</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">def factorial(n):</div>
            <div class="text-emerald-400 ml-6 italic">if n == 1: return 1 <span class="text-slate-600"># Base Case</span></div>
            <div class="text-white ml-6">return n * factorial(n - 1) <span class="text-slate-600"># Recursive Case</span></div>
          </div>

          <div class="bg-rose-500/5 p-8 rounded-[2.5rem] border border-rose-500/20 italic text-slate-400">
            <strong>Warning:</strong> Without a Base Case, you will hit a <code class="text-rose-400">RecursionError</code> (Maximum recursion depth exceeded)!
          </div>
        `,
        practiceTest: [
          {
            question: "What is recursion?",
            options: ["A loop that never ends", "A function that calls itself", "A way to delete files", "A math library"],
            correctAnswer: 1,
            explanation: "Recursion is the process of a function calling itself to break down a problem."
          },
          {
             question: "What happens if a recursive function has no base case?",
             options: ["It runs faster", "It returns None", "It results in an infinite loop/crash", "It works normally"],
             correctAnswer: 2,
             explanation: "Without a base case, the function never stops calling itself, causing a stack overflow."
          },
          {
             question: "What is the 'Base Case'?",
             options: ["The starting value", "The condition that stops the recursion", "The name of the function", "The most complex part"],
             correctAnswer: 1,
             explanation: "The base case is essential for preventing infinite recursion."
          },
          {
             question: "Which of these is a famous recursive sequence?",
             options: ["Fibonacci", "Alphabet", "Pi", "Prime numbers"],
             correctAnswer: 0,
             explanation: "Fibonacci (0, 1, 1, 2, 3, 5...) is a classic recursive problem."
          },
          {
             question: "What is the 'Call Stack' in recursion?",
             options: ["A list of variables", "The memory that tracks active function calls", "A way to sort data", "The hard drive"],
             correctAnswer: 1,
             explanation: "The stack keeps track of which function call is currently waiting for a result from another."
          },
          {
             question: "What is the result of factorial(3) if fact(1)=1?",
             options: ["3", "6", "9", "1"],
             correctAnswer: 1,
             explanation: "3 * factorial(2) -> 3 * (2 * factorial(1)) -> 3 * 2 * 1 = 6."
          },
          {
             question: "Can any recursive function be written as a loop instead?",
             options: ["Yes, usually", "No, never", "Only if it uses strings", "Only in Python"],
             correctAnswer: 0,
             explanation: "Most recursive problems can be solved iteratively (with loops), but recursion is often cleaner."
          },
          {
             question: "Which error is thrown when recursion goes too deep?",
             options: ["OverflowError", "RecursionError", "LimitError", "MemoryError"],
             correctAnswer: 1,
             explanation: "Python has a default limit (usually 1000) for safety."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "600 XP",
        icon: "🌀",
        tags: ["Logic", "Algorithms"],
        unlockRequirement: "Datetime Mastery"
      },
      {
        id: "m19",
        title: "Regular Expressions",
        description: "Pattern matching with Regex.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"Search like a pro."</p>
            <p>Regular Expressions (Regex) are sequences of characters that define a search pattern. They are used for complex string searching, validation (like emails), and data extraction.</p>
            <div class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
               <h4 class="text-indigo-400 font-black uppercase text-xs mb-2">Learning Objectives</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Use the 're' module for pattern matching</li>
                 <li>Identify emails and phone numbers in text</li>
                 <li>Master special characters like ^, $, and *</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Regex: String Pattern Power</h2>
          
          <h3 class="text-2xl font-black text-white mb-4">1. The 're' Module</h3>
          <div class="bg-slate-950 p-6 rounded-3xl border border-slate-800 mb-8 font-mono text-sm leading-relaxed">
            <div class="text-indigo-400">import re</div>
            <div class="text-white">text = "My code is beta"</div>
            <div class="text-white">match = re.search("^My.*beta$", text)</div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">2. Common Meta-characters</h3>
          <div class="overflow-x-auto mb-8">
            <table class="w-full text-left border-collapse bg-slate-900/40 rounded-2xl">
              <thead>
                <tr class="border-b border-white/5">
                  <th class="p-4 text-indigo-400 text-xs uppercase">Symbol</th>
                  <th class="p-4 text-slate-500 text-xs uppercase">Meaning</th>
                </tr>
              </thead>
              <tbody class="text-xs">
                <tr class="border-b border-white/5">
                  <td class="p-4 font-mono text-white">^</td>
                  <td class="p-4 text-slate-400">Starts with</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="p-4 font-mono text-white">$</td>
                  <td class="p-4 text-slate-400">Ends with</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="p-4 font-mono text-white">.</td>
                  <td class="p-4 text-slate-400">Any character (except newline)</td>
                </tr>
                <tr>
                  <td class="p-4 font-mono text-white">\\d</td>
                  <td class="p-4 text-slate-400">Any digit (0-9)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">3. findall() vs search()</h3>
          <p class="mb-4 text-slate-400">Use <code class="text-indigo-400">findall()</code> to get a list of all matches, and <code class="text-white">search()</code> to find only the first occurrence.</p>
        `,
        practiceTest: [
          {
            question: "Which module is needed for Regular Expressions?",
            options: ["regex", "pyregex", "re", "search"],
            correctAnswer: 2,
            explanation: "Python's built-in module for regex is simply named 're'."
          },
          {
             question: "In regex, which character means 'any single character'?",
             options: ["*", "$", ".", "^"],
             correctAnswer: 2,
             explanation: "The dot (.) is the wildcard character in regular expressions."
          },
          {
             question: "Which symbol marks the START of a string in regex?",
             options: ["^", "$", "!", "#"],
             correctAnswer: 0,
             explanation: "The caret ^ character anchors the pattern to the beginning of the string."
          },
          {
             question: "Which function returns a list of all occurrences that match the pattern?",
             options: ["search()", "match()", "findall()", "split()"],
             correctAnswer: 2,
             explanation: "findall() searches the entire string and returns every match found."
          },
          {
             question: "Which pattern matches any digit (0-9)?",
             options: ["\\w", "\\s", "\\d", "\\D"],
             correctAnswer: 2,
             explanation: "\\d is shorthand for any decimal digit."
          },
          {
             question: "What does the '*' quantifier mean?",
             options: ["Exactly one", "Zero or more", "One or more", "None"],
             correctAnswer: 1,
             explanation: "An asterisk * means the preceding character can appear 0 or many times."
          },
          {
             question: "How do you search for 'cat' or 'dog' in one pattern?",
             options: ["cat & dog", "cat | dog", "cat and dog", "cat || dog"],
             correctAnswer: 1,
             explanation: "The pipe | character acts as an OR operator in regex."
          },
          {
             question: "What does \\s match?",
             options: ["Strings", "Spaces and tabs (white space)", "Secrets", "Symbols"],
             correctAnswer: 1,
             explanation: "\\s matches any whitespace character, including newlines."
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "550 XP",
        icon: "🔍",
        tags: ["Strings", "Validation"],
        unlockRequirement: "Introduction to Recursion"
      },
      {
        id: "m20",
        title: "Capstone: CLI Adventure",
        description: "Building a terminal-based game engine.",
        longDescription: `
          <div class="space-y-6">
            <p class="text-lg text-slate-200 font-bold italic">"The Ultimate Test."</p>
            <p>You've mastered the basics! Now it's time to combine everything—Loops, Functions, OOP, Dictionaries, and Error Handling—into a fully functional Command Line Interface (CLI) Adventure game.</p>
            <div class="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
               <h4 class="text-emerald-400 font-black uppercase text-xs mb-2">Graduation Requirements</h4>
               <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
                 <li>Create a Player class with stats and inventory</li>
                 <li>Implement a dictionary-based world map</li>
                 <li>Use Loops for the main game cycles</li>
                 <li>Handle invalid player inputs safely</li>
               </ul>
            </div>
          </div>
        `,
        lectureContent: `
          <h2 class="text-3xl font-black text-white mb-6">Capstone: Putting it All Together</h2>
          <p class="mb-6 text-slate-300 leading-relaxed">
            This module doesn't teach new syntax; it teaches **Architecture**. A professional script is organized, readable, and robust.
          </p>

          <h3 class="text-2xl font-black text-white mb-4">Core Components of your Engine:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <div class="p-6 bg-slate-950 rounded-3xl border border-slate-800">
                <span class="text-indigo-400 font-black text-xs block mb-2 uppercase">Global Data</span>
                <p class="text-slate-400 text-xs">A nested dictionary containing room descriptions, items, and connections.</p>
             </div>
             <div class="p-6 bg-slate-950 rounded-3xl border border-slate-800">
                <span class="text-emerald-400 font-black text-xs block mb-2 uppercase">Player Object</span>
                <p class="text-slate-400 text-xs">An instance of your Class tracking health, inventory, and current location.</p>
             </div>
          </div>

          <h3 class="text-2xl font-black text-white mb-4">The Game Loop Template</h3>
          <div class="bg-indigo-950/40 p-6 rounded-3xl border border-indigo-500/20 font-mono text-xs leading-relaxed mb-8">
            <div class="text-indigo-400">while player.is_alive:</div>
            <div class="text-slate-500 ml-6 italic"># 1. Show environment</div>
            <div class="text-white ml-6">show_location(player.location)</div>
            <div class="text-slate-500 ml-6 italic"># 2. Get input</div>
            <div class="text-white ml-6">action = input("> ").split()</div>
            <div class="text-slate-500 ml-6 italic"># 3. Logic & Error Check</div>
            <div class="text-indigo-400 ml-6">try: handle_action(action)</div>
            <div class="text-rose-400 ml-6">except: print("Invalid move!")</div>
          </div>

          <p class="text-center font-black text-indigo-400 animate-pulse">GOOD LUCK, CODER! YOU'RE READY.</p>
        `,
        practiceTest: [
          {
            question: "In a CLI game, why is a dictionary better than a list for a world map?",
            options: ["It's faster", "You can link rooms by name keys", "It uses less RAM", "It's the only way"],
            correctAnswer: 1,
            explanation: "Dictionaries allow you to easily lookup room 'Hallway' and see its connected 'Kitchen' value."
          },
          {
             question: "Where should item data (like a sword's damage) be stored ideally?",
             options: ["Global strings", "Appended to name strings", "Inside the Player object or a dedicated Item class", "It shouldn't be stored"],
             correctAnswer: 2,
             explanation: "Using OOP (an Item class) keeps your code organized and scalable."
          },
          {
             question: "How do you keep a CLI game running until the player quits?",
             options: ["A long list of if statements", "A 'while' loop", "A recursion call", "An import statement"],
             correctAnswer: 1,
             explanation: "A 'while True' or 'while game_running' loop is the standard game architecture."
          },
          {
             question: "What is 'Input Sanitization' in a game?",
             options: ["Cleaning the keyboard", "Normalizing user input (e.g., lowercase, strip)", "Deleting suspicious files", "Randomizing player stats"],
             correctAnswer: 1,
             explanation: "Sanitization (like .lower().strip()) ensures your logic doesn't break if a user types ' GO ' instead of 'go'."
          },
          {
             question: "Why use a 'main()' function?",
             options: ["To prevent other scripts from running your code on import", "To make it run faster", "To hide variables", "Only for style"],
             correctAnswer: 0,
             explanation: "Using 'if __name__ == \"__main__\": main()' is professional practice."
          },
          {
             question: "Which pattern handles a player typing 'TAKE SWORD' as two words?",
             options: ["input().join()", "input().split()", "input().slice()", "input().words()"],
             correctAnswer: 1,
             explanation: "split() turns the string into a list like ['take', 'sword'], which is easy to parse."
          },
          {
             question: "How would you persist (save) a player's high score between sessions?",
             options: ["Keep the app open", "Write it to a file with 'w' mode", "Store it in a list", "Use a global variable"],
             correctAnswer: 1,
             explanation: "File I/O (Mission 14) is necessary for persistent data storage."
          },
          {
             question: "Final Question: What have you officially become?",
             options: ["A Python Beginner", "A FutureLab Pioneer", "A Digital Architect", "All of the above"],
             correctAnswer: 3,
             explanation: "Congratulations on completing the 20-Mission Python Journey!"
          }
        ],
        difficulty: "Hard",
        isLocked: true,
        isCompleted: false,
        reward: "1000 XP (Certificate)",
        icon: "🏆",
        tags: ["Integration", "Final Project"],
        unlockRequirement: "Regular Expressions"
      }
    ]
  },
  {
    id: "r3",
    category: "Coding",
    title: "Machine Learning",
    difficulty: "Hard",
    estimatedTime: "25m",
    reward: "200 XP",
    icon: "🐍",
    tags: ["Python", "Backend"]
  }
];

export const STUDY_CHART_DATA: ChartDataPoint[] = [
  { date: 'Mon', studyHours: 4, tasksCompleted: 5, codeCommits: 12 },
  { date: 'Tue', studyHours: 6, tasksCompleted: 8, codeCommits: 45 },
  { date: 'Wed', studyHours: 3, tasksCompleted: 4, codeCommits: 22 },
  { date: 'Thu', studyHours: 7, tasksCompleted: 10, codeCommits: 67 },
  { date: 'Fri', studyHours: 5, tasksCompleted: 6, codeCommits: 31 },
  { date: 'Sat', studyHours: 2, tasksCompleted: 2, codeCommits: 8 },
  { date: 'Sun', studyHours: 1, tasksCompleted: 1, codeCommits: 3 },
];
