export interface TermLessonPlan {
  week: string;
  phase: string;
  topic: string;
  objective: string;
  activities: string;
  output: string;
}

export interface PDFTermPlan {
  id: string;
  name: string;
  theme: string;
  icon: string;
  lessons: TermLessonPlan[];
}

export const PDF_TERM_PLAN_DATA: PDFTermPlan[] = [
  {
    id: "pry4",
    name: "Primary 4",
    theme: "Blocks & Events",
    icon: "🟢",
    lessons: [
      { week: "1", phase: "Learn", topic: "Meet the Blocks", objective: "Find your way around the editor and make a sprite move.", activities: "Computer safety and care (10 min). Tour: stage, sprite, palette, script area. Unplugged \"Program the Teacher\": learners give step instructions to a classmate acting as a robot. Then drag move and turn blocks.", output: "Sprite that walks a square (using many blocks)." },
      { week: "2", phase: "Learn", topic: "Events", objective: "Use events to start a script.", activities: "Real-life events game (\"when I clap, you jump\"). Add when flag clicked and when key pressed. Control a sprite with arrow keys. Change the backdrop.", output: "Sprite controlled by arrow keys." },
      { week: "3", phase: "Learn", topic: "Looks and Sound", objective: "Change costumes, say things and play sounds.", activities: "Record own voice. Costume switching to fake walking. Say and think blocks with timing. Pair share: \"What does my character say?\"", output: "A character that talks and walks." },
      { week: "4", phase: "Learn", topic: "Repeat Loops", objective: "Use repeat and forever to avoid copying blocks.", activities: "Unplugged: \"repeat 4 claps\". Replace four move-turn pairs with one repeat 4. Forever loop for a dancing sprite. Spot the pattern cards.", output: "Square drawn with one loop; dancing sprite." },
      { week: "5", phase: "Build", topic: "Two Sprites Talk", objective: "Coordinate two sprites using wait and say-for-seconds.", activities: "Write a short dialogue on paper, act it out, then build it with blocks. Discuss why order matters.", output: "Two-sprite conversation." },
      { week: "6", phase: "Build", topic: "Storyboard Planning", objective: "Plan before you code.", activities: "Introduce the 3-box storyboard (start, middle, end). Learners sketch scenes for their name-card animation and list needed blocks.", output: "Completed storyboard." },
      { week: "7", phase: "Build", topic: "Position and Glide", objective: "Place and move sprites to chosen spots.", activities: "Floor grid with tape: learners walk to coordinates. Then go to x y and glide blocks. Move between scenes.", output: "Sprite glides between two scenes." },
      { week: "8", phase: "Build", topic: "Remix and Checkpoint 1", objective: "Combine events, loops and sound in one animation.", activities: "Build a 30-second animation using at least one event, one loop and one sound. Swap computers with a partner: test and give one star and one wish.", output: "30-second animation. Checkpoint 1 badge." },
      { week: "9", phase: "Project", topic: "Project 1: Name Card Build", objective: "Apply skills to a personal project.", activities: "Each letter of the learner's name becomes a sprite that reacts when clicked. Add costumes, sounds and a backdrop.", output: "Draft name card with at least 3 interactive letters." },
      { week: "10", phase: "Project", topic: "Project 2: Finish and Debug", objective: "Test, find and fix bugs.", activities: "Teach \"Test, find, fix\". Teacher-planted bug hunt on a sample project, then debug own work. Add polish (colour, sound, motion).", output: "Finished animated name card." },
      { week: "11", phase: "Review", topic: "Review Stations", objective: "Revise events, looks, loops and sound.", activities: "Rotating stations, one per skill, with a badge card to stamp. Unplugged quiz game (\"Block or Not Block\"). Catch-up time for unfinished work.", output: "Completed badge card." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Present work with confidence.", activities: "Gallery walk: each learner shows their name card and says one block they are proud of. Class gives star stickers. Parents may be invited.", output: "1-minute show-and-tell; stars and badges." }
    ]
  },
  {
    id: "pry5",
    name: "Primary 5",
    theme: "See the Boxes",
    icon: "🔵",
    lessons: [
      { week: "1", phase: "Learn", topic: "What Is a Website? Boxify Intro", objective: "See any page as boxes.", activities: "How a page reaches your screen (unplugged relay race: request, server, page). Draw boxes on printed Google.com, YouTube and a school notice board.", output: "Three pages boxified on paper." },
      { week: "2", phase: "Learn", topic: "Editor and First Tags", objective: "Create, save and preview an HTML file.", activities: "Open the editor, name files .html. Skeleton explained as a body frame. Write name and a short about-me with h1 and p.", output: "About-me page saved and previewed." },
      { week: "3", phase: "Learn", topic: "Text Tags", objective: "Structure text with headings, paragraphs and lists.", activities: "h1-h6 hierarchy, bold and italic, ordered and unordered lists. Write a \"My Favourite Things\" page.", output: "Page with headings and a list." },
      { week: "4", phase: "Learn", topic: "Images and Links", objective: "Add pictures and links.", activities: "img with src and alt; a with href. Discuss safe links and image sizes. Link to the school website.", output: "Page with an image and a working link." },
      { week: "5", phase: "Build", topic: "Box Tags: div, header, main, footer", objective: "Map boxes to tags.", activities: "Label Google.com boxes as header, search area, footer. Tag-matching card game. Convert the box map into div structure.", output: "Google skeleton with placeholder text in each box." },
      { week: "6", phase: "Build", topic: "Inputs and Buttons", objective: "Add form elements.", activities: "input, button, label. Build a search box with two buttons. Discuss what each element is for.", output: "Unstyled search box and two buttons." },
      { week: "7", phase: "Build", topic: "Boxify Challenge 1", objective: "Rebuild a page from a screenshot.", activities: "Given a simple notice-board screenshot, learners box it, then code the boxes in the right order.", output: "Page matching the screenshot's structure." },
      { week: "8", phase: "Build", topic: "Tidy Code and Bug Hunt (Checkpoint 1)", objective: "Read and fix errors.", activities: "Indentation, closing tags, nesting rules. \"Broken page\" bug hunt in pairs. Checkpoint: fix five bugs in 20 minutes.", output: "Fixed page. Checkpoint 1." },
      { week: "9", phase: "Project", topic: "Project 1: Box Map and Skeleton", objective: "Turn a real page into a plan and a skeleton.", activities: "Number every box on a printout of Google.com. Write the skeleton to match, box by box.", output: "Numbered box map and half-built skeleton." },
      { week: "10", phase: "Project", topic: "Project 2: Complete the Elements", objective: "Finish and check the page.", activities: "Add logo image, links, buttons, footer links. Check against the project checklist. Pair review: one star, one wish.", output: "Complete Google.com skeleton (no colours yet)." },
      { week: "11", phase: "Review", topic: "Review Stations", objective: "Revise tags and boxes.", activities: "Stations: tag quiz, bug hunt, Boxify race (fastest correct box map). Catch-up time.", output: "Skills passport stamped." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Explain work to an audience.", activities: "Learners show their box map and page and explain three boxes. Peers ask one question each.", output: "2-minute show-and-explain." }
    ]
  },
  {
    id: "pry6",
    name: "Primary 6",
    theme: "Box Model + Flex",
    icon: "🟡",
    lessons: [
      { week: "1", phase: "Learn", topic: "Recap and First CSS", objective: "Link CSS to HTML and style an element.", activities: "HTML speed-run (10 min). Selectors and rules. Link style.css. Change colours and fonts on the about-me page.", output: "Page linked to style.css with colours." },
      { week: "2", phase: "Learn", topic: "Colour, Text and Fonts", objective: "Style text and backgrounds.", activities: "color, background, font-family, font-size, text-align. Hex and rgb colours. Colour palette game.", output: "Styled about-me page." },
      { week: "3", phase: "Learn", topic: "The Box Model", objective: "Explain content, padding, border and margin.", activities: "Unplugged \"gift box\" model: gift, tissue (padding), box (border), space between boxes (margin). Use dev tools to inspect boxes. Style one card.", output: "Card with padding, border and margin." },
      { week: "4", phase: "Learn", topic: "Width, Display and Classes", objective: "Size boxes and style groups with classes.", activities: "width, height, block vs inline. Create .card class and reuse it. Repeat card three times.", output: "Three consistent cards." },
      { week: "5", phase: "Build", topic: "Flexbox: Rows", objective: "Arrange boxes in a row.", activities: "display flex, gap, justify-content. Flex-frogs style practice. Build a nav bar and a card row.", output: "Nav bar and row of three cards." },
      { week: "6", phase: "Build", topic: "Flexbox: Columns and Centring", objective: "Stack and centre boxes.", activities: "flex-direction, align-items. Centre a card on the page. Build a login card (username, password, button).", output: "Centred login card." },
      { week: "7", phase: "Build", topic: "Sidebar Layout", objective: "Combine fixed and flexible boxes.", activities: "Sidebar with fixed width and main area that fills the space. Build from a wireframe.", output: "Two-column layout." },
      { week: "8", phase: "Build", topic: "Checkpoint 1: Rebuild From Picture", objective: "Build a layout from an image within time.", activities: "Given a screenshot with a nav, card row and sidebar, rebuild in 45 minutes. Teacher checks against rubric.", output: "Rebuilt layout. Checkpoint 1." },
      { week: "9", phase: "Project", topic: "Project 1: Layout Lab Plan and Build", objective: "Plan and build three layouts.", activities: "Boxify sketches for a card row page, a login page and a sidebar page. Build the first two.", output: "Two layouts built." },
      { week: "10", phase: "Project", topic: "Project 2: Finish and Polish", objective: "Complete and refine.", activities: "Finish the third layout. Consistent colours and spacing using classes. Pair review.", output: "Three-layout Layout Lab page set." },
      { week: "11", phase: "Review", topic: "Review Stations", objective: "Revise CSS and flex.", activities: "Stations: box model, flex quiz, dev tools inspect, colour match. Catch-up time.", output: "Skills passport stamped." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Present and explain layouts.", activities: "Show the three layouts and explain how flex and the box model were used.", output: "2-minute demo." }
    ]
  },
  {
    id: "jss1",
    name: "JSS 1",
    theme: "Layout Systems",
    icon: "🟠",
    lessons: [
      { week: "1", phase: "Learn", topic: "Diagnostic and Site Teardown", objective: "Read a website as a design system.", activities: "Short HTML/CSS diagnostic. Teardown of futurelab.ng and two other sites: list sections, columns, spacing, colours, fonts.", output: "Annotated teardown sheet. Homework: List 5 sections on any site you use." },
      { week: "2", phase: "Learn", topic: "CSS Refresh: Cascade and Specificity", objective: "Understand why styles win or lose.", activities: "Selectors, cascade, inheritance, specificity. Fix a messy stylesheet in pairs. Dev tools inspection.", output: "Cleaned stylesheet. Homework: Fix three CSS conflicts in a sheet." },
      { week: "3", phase: "Learn", topic: "Typography", objective: "Build a readable type scale.", activities: "Font choice and pairing, rem and em, line-height, measure. Create heading and body styles.", output: "Type scale stylesheet. Homework: Pick two fonts and explain why." },
      { week: "4", phase: "Learn", topic: "Colour and Spacing Tokens", objective: "Create a design token file.", activities: "CSS variables in :root for primary, neutral, accent colours; contrast check; spacing scale (4, 8, 16, 24, 32).", output: "tokens.css used by a sample page. Homework: Extend colour palette with a dark shade." },
      { week: "5", phase: "Build", topic: "Flexbox Mastery", objective: "Use flex for navigation and card rows.", activities: "wrap, grow and shrink, align and justify. Build a responsive-ready nav bar and feature card row.", output: "Nav bar and feature cards. Homework: Add a footer nav using flex." },
      { week: "6", phase: "Build", topic: "CSS Grid", objective: "Build two-dimensional layouts.", activities: "grid-template-columns, gap, fr, repeat, auto-fit and minmax. Build a 3 by 2 feature grid.", output: "Feature grid. Homework: Make a 4-tile grid." },
      { week: "7", phase: "Build", topic: "Section Patterns", objective: "Build reusable page sections.", activities: "Hero, features, testimonial, CTA, footer. Build three of them with the token file.", output: "Three section patterns. Homework: Sketch a testimonial section." },
      { week: "8", phase: "Build", topic: "Polish and Checkpoint 1", objective: "Improve visuals and rebuild from a design.", activities: "Shadows, border-radius, object-fit, hover states. Checkpoint: recreate a hero and a 3-column section from a design image in 45 minutes.", output: "Checkpoint 1 pass. Homework: Practise the checkpoint layout." },
      { week: "9", phase: "Project", topic: "Project 1: Brand Kit and Wireframe", objective: "Plan a landing page for a chosen brand.", activities: "Choose a fictional club or business. Define colours, type and sections. Sketch wireframe. Create token file.", output: "Brand kit and wireframe. Homework: Collect 3 brand ideas." },
      { week: "10", phase: "Project", topic: "Project 2: Build the Landing Page", objective: "Build sections from the plan.", activities: "Build nav, hero, features, testimonial, CTA and footer using tokens, flex and grid. Test in dev tools.", output: "Landing page (desktop layout). Homework: Add hover states." },
      { week: "11", phase: "Review", topic: "Peer Code Review and Review", objective: "Give and receive constructive feedback.", activities: "Use a review checklist (structure, naming, spacing, tokens). Fix findings. Revise weak topics.", output: "Review notes and fixes. Homework: Write two review comments on a classmate's code." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Present a design decision.", activities: "Present the landing page and explain one layout decision and one token choice.", output: "2-minute presentation. Homework: Prepare demo notes." }
    ]
  },
  {
    id: "jss2",
    name: "JSS 2",
    theme: "Figma Foundations",
    icon: "🟣",
    lessons: [
      { week: "1", phase: "Learn", topic: "What Is Product Design?", objective: "Understand roles and process.", activities: "UI vs UX vs engineering. Teardown of a familiar app. Create Figma account, tour the interface, set up file with pages.", output: "Teardown sheet and Figma file set up." },
      { week: "2", phase: "Learn", topic: "Frames and Shapes", objective: "Draw and arrange basic shapes.", activities: "Frame sizes for mobile, shapes, boolean tools, alignment, constraints. Design an app icon.", output: "App icon in a phone frame." },
      { week: "3", phase: "Learn", topic: "Text and Colour", objective: "Build visual hierarchy.", activities: "Text styles (heading, body, caption), colour styles, hex, basic contrast. Apply to a login screen mock.", output: "Login screen with clear hierarchy." },
      { week: "4", phase: "Learn", topic: "Grids, Layers and Alignment", objective: "Keep files organised and aligned.", activities: "Layout grids, snapping, spacing, naming layers, grouping. Rebuild a screen on a 4-column grid.", output: "Grid-aligned screen with clean layers." },
      { week: "5", phase: "Build", topic: "Auto Layout 1", objective: "Create flexible buttons and lists.", activities: "Padding, gap, direction, hug and fill. Buttons that resize with text. Simple list.", output: "Three flexible buttons and a list." },
      { week: "6", phase: "Build", topic: "Auto Layout 2", objective: "Build nested flexible cards.", activities: "Nested auto layout, alignment, resizing. Card with image, title, text and button.", output: "Card list screen." },
      { week: "7", phase: "Build", topic: "Components and Variants", objective: "Reuse parts of a design.", activities: "Main component vs instance, variants for button states (default, pressed, disabled), overrides.", output: "Button component with three variants." },
      { week: "8", phase: "Build", topic: "Checkpoint 1: Recreate a Screen", objective: "Rebuild a screen in Figma within a time limit.", activities: "Teacher provides a screenshot (a home screen of a common app). Learners rebuild in 60 minutes using styles and auto layout.", output: "Recreated screen. Checkpoint 1." },
      { week: "9", phase: "Project", topic: "Project 1: Choose and Plan", objective: "Plan a two-screen recreation with components.", activities: "Choose two screens (e.g. login and home). List components needed. Set up styles and grid.", output: "Plan and styles ready." },
      { week: "10", phase: "Project", topic: "Project 2: Build and Component Page", objective: "Build screens and a component page.", activities: "Build the two screens with auto layout. Create a Components page (buttons, inputs, cards).", output: "Two screens plus component sheet." },
      { week: "11", phase: "Review", topic: "Peer Critique and Review", objective: "Give constructive design feedback.", activities: "\"I like, I wish, What if\" critique in pairs. Fix findings. Review shortcut speed-run.", output: "Critique notes and fixes." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Present a design file.", activities: "Present in Figma's present mode: explain the screens, styles and one component.", output: "2-3 minute design presentation." }
    ]
  },
  {
    id: "jss3",
    name: "JSS 3",
    theme: "Prototyping",
    icon: "🔴",
    lessons: [
      { week: "1", phase: "Learn", topic: "Recap and Prototype Intro", objective: "Restart Figma skills and see what prototyping is.", activities: "Review JSS 2 work; clean up files. Watch and analyse three app prototypes. Explain why teams prototype.", output: "Cleaned file and prototype notes." },
      { week: "2", phase: "Learn", topic: "Prototype Basics", objective: "Connect screens.", activities: "Prototype tab, hotspots, connections, on click, navigate to. Build a three-screen flow.", output: "Three-screen clickable flow." },
      { week: "3", phase: "Learn", topic: "Flow Logic", objective: "Design realistic navigation.", activities: "Flow starting points, back actions, skip and next. Onboarding with three screens and a skip option.", output: "Onboarding flow with skip." },
      { week: "4", phase: "Learn", topic: "Transitions", objective: "Animate between screens.", activities: "Dissolve, slide, smart animate, easing and duration. Two-state screen with smooth change.", output: "Screen with animated transition." },
      { week: "5", phase: "Build", topic: "Interactive Components", objective: "Add interactions to components.", activities: "Variants with click interactions: toggle, checkbox, show/hide password.", output: "Password field with show/hide." },
      { week: "6", phase: "Build", topic: "Overlays", objective: "Add modals and sheets.", activities: "Overlay settings, bottom sheet, toast messages for errors.", output: "Bottom sheet and toast." },
      { week: "7", phase: "Build", topic: "Micro-Animations", objective: "Add feedback to actions.", activities: "Button press, loading spinner, success tick with after-delay triggers.", output: "Loading to success animation." },
      { week: "8", phase: "Build", topic: "Checkpoint 1: Flow From Words", objective: "Turn a written flow into a prototype.", activities: "Given a five-screen written flow, build a clickable prototype in 60 minutes.", output: "Checkpoint 1 prototype." },
      { week: "9", phase: "Project", topic: "Project 1: Storyboard and Build", objective: "Plan an onboarding experience.", activities: "Storyboard splash and three onboarding screens with value messages; set up components and transitions.", output: "Storyboard and first screens." },
      { week: "10", phase: "Project", topic: "Project 2: Interactions and Test", objective: "Finish the prototype and test it.", activities: "Add transitions and micro-interactions. Test on a phone with a classmate using think-aloud.", output: "Interactive onboarding prototype and test notes." },
      { week: "11", phase: "Review", topic: "Fix List and Review", objective: "Improve based on feedback.", activities: "Prioritise fixes from tests. Apply top three fixes. Review interaction terms.", output: "Updated prototype and fix log." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Present a working prototype.", activities: "Live demo on phone or laptop; explain two design decisions and one test finding.", output: "3-minute demo." }
    ]
  },
  {
    id: "sss1",
    name: "SSS 1",
    theme: "Logic Engine",
    icon: "⭐",
    lessons: [
      { week: "1", phase: "Learn", topic: "Terminal and Node Setup", objective: "Navigate with commands and run a JS file.", activities: "pwd, ls, cd, mkdir; install Node and VS Code; run node hello.js; console.log.", output: "hello.js and a project folder made via terminal." },
      { week: "2", phase: "Learn", topic: "Variables and Data Types", objective: "Store and print information.", activities: "let and const, strings, numbers, booleans, template literals, typeof.", output: "Personal info card program." },
      { week: "3", phase: "Learn", topic: "Operators and Input", objective: "Calculate with user input.", activities: "Arithmetic and comparison operators; readline for input; convert strings to numbers.", output: "Naira change and tip calculator." },
      { week: "4", phase: "Learn", topic: "Conditions", objective: "Make decisions in code.", activities: "if, else if, else, switch, && || !. Truth tables on paper first.", output: "Grade classifier." },
      { week: "5", phase: "Build", topic: "Loops 1", objective: "Repeat actions.", activities: "for and while loops, counters, break and continue. Trace loops on paper.", output: "Multiplication table and 1-100 sum." },
      { week: "6", phase: "Build", topic: "Loops 2 and Arrays", objective: "Store and loop through lists.", activities: "Arrays, push and pop, includes, iteration with loops and conditions.", output: "Number-guessing game with attempt limit." },
      { week: "7", phase: "Build", topic: "Functions", objective: "Reuse and organise code.", activities: "Parameters, return values, scope. Refactor earlier programs into functions.", output: "Refactored programs with functions." },
      { week: "8", phase: "Build", topic: "Objects and Debugging", objective: "Model data and find bugs.", activities: "Objects, arrays of objects, reading stack traces, console debugging. Checkpoint: debug five broken programs in 45 minutes.", output: "Fixed programs. Checkpoint 1." },
      { week: "9", phase: "Project", topic: "Project 1: Plan", objective: "Design a program before coding.", activities: "Requirements, pseudocode and flowchart for a menu app with two features: guessing game and grade calculator.", output: "Pseudocode and flowchart." },
      { week: "10", phase: "Project", topic: "Project 2: Build and Test", objective: "Turn a plan into working code.", activities: "Menu loop, functions, arrays of objects, input validation. Test with normal and bad input.", output: "Working menu app." },
      { week: "11", phase: "Review", topic: "Code Review and Refactor", objective: "Improve readability.", activities: "Peer review checklist: naming, functions, repeated code, input checks. Refactor and re-test.", output: "Reviewed and improved app." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Present and explain code.", activities: "Live run of the app and a walkthrough of one function and one loop.", output: "3-minute demo." }
    ]
  },
  {
    id: "sss2",
    name: "SSS 2",
    theme: "Your First API",
    icon: "🌐",
    lessons: [
      { week: "1", phase: "Learn", topic: "How the Web Talks", objective: "Understand requests, responses and JSON.", activities: "Diagnostic: quick JS check. Client and server model, HTTP methods and status codes. Browser Network tab. Call a public API from Postman.", output: "Request log sheet with method, URL and status." },
      { week: "2", phase: "Learn", topic: "Node Project Setup", objective: "Start an Express server.", activities: "npm init, package.json, installing packages, nodemon, first http server, then Express hello route.", output: "Server running on port 3000." },
      { week: "3", phase: "Learn", topic: "Routes and GET", objective: "Return data from routes.", activities: "app.get, route params, query strings, res.json. In-memory array of students.", output: "/api/health and /api/students/:id." },
      { week: "4", phase: "Learn", topic: "POST and Body Parsing", objective: "Receive data from clients.", activities: "express.json, req.body, status 201, basic validation with error messages.", output: "POST /api/notes." },
      { week: "5", phase: "Build", topic: "CRUD Part 1", objective: "Create and read a resource.", activities: "Design notes resource. Implement create and list. Build a Postman collection.", output: "Notes create and list with tests." },
      { week: "6", phase: "Build", topic: "CRUD Part 2", objective: "Update and delete.", activities: "PUT or PATCH, DELETE, 404 handling, consistent error format.", output: "Full CRUD on notes." },
      { week: "7", phase: "Build", topic: "Structure and Middleware", objective: "Organise code.", activities: "routes and controllers folders, custom logging middleware, error middleware.", output: "Refactored project." },
      { week: "8", phase: "Build", topic: "Persistence and Checkpoint 1", objective: "Save data to a file.", activities: "Use fs (from SSS 1) to persist JSON. Checkpoint: build a books resource with GET list, GET by id and POST in 90 minutes.", output: "Books API. Checkpoint 1." },
      { week: "9", phase: "Project", topic: "Project 1: Design the API", objective: "Design before building.", activities: "Endpoint table, sample JSON, validation rules for a to-do or notes API. Start build.", output: "API design doc and routes started." },
      { week: "10", phase: "Project", topic: "Project 2: Build and Test", objective: "Finish and test the API.", activities: "Complete CRUD, persistence and errors. Postman tests for each endpoint. Write README with endpoint docs.", output: "Working API and README." },
      { week: "11", phase: "Review", topic: "Peer Testing and Review", objective: "Test another learner's API.", activities: "Swap Postman collections and README; report bugs. Security hygiene basics (no secrets in code). Fix bugs.", output: "Bug reports and fixes." },
      { week: "12", phase: "Demo Day", topic: "Demo Day", objective: "Demonstrate an API.", activities: "Live demo with Postman: run all endpoints and explain one design decision.", output: "3-4 minute demo." }
    ]
  }
];
