export interface HtmlTagLevel {
  id: number;
  description: string;
  visualMock: string;
  expectedTags: string[];
  hint: string;
}

export interface HtmlTagStage {
  id: number;
  title: string;
  description: string;
  levels: HtmlTagLevel[];
}

export const HTML_TAG_STAGES: HtmlTagStage[] = [
  {
    id: 1,
    title: "Stage 1: Basic Tags",
    description: "Learn the foundational building blocks of every web page.",
    levels: [
      { id: 1, description: "The largest and most important heading on a page.", visualMock: "Heading 1", expectedTags: ["h1", "<h1>", "<h1></h1>"], hint: "Heading level 1" },
      { id: 2, description: "A standard block of text.", visualMock: "This is a paragraph of text on the website.", expectedTags: ["p", "<p>", "<p></p>"], hint: "Stands for 'paragraph'" },
      { id: 3, description: "A hyperlink to another page or website.", visualMock: "Click here to visit our site", expectedTags: ["a", "<a>", "<a></a>"], hint: "Stands for 'anchor'" },
      { id: 4, description: "Used to embed an image in the document.", visualMock: "[ Image appears here ]", expectedTags: ["img", "<img>", "<img/>"], hint: "Short for image" },
      { id: 5, description: "An unordered list with bullet points.", visualMock: "• Item 1\n• Item 2", expectedTags: ["ul", "<ul>", "<ul></ul>"], hint: "Stands for Unordered List" },
      { id: 6, description: "An ordered list with numbers.", visualMock: "1. Item 1\n2. Item 2", expectedTags: ["ol", "<ol>", "<ol></ol>"], hint: "Stands for Ordered List" },
      { id: 7, description: "A single item inside any list (ul or ol).", visualMock: "• Just one list item", expectedTags: ["li", "<li>", "<li></li>"], hint: "Stands for List Item" },
      { id: 8, description: "A generic container for grouping elements (block-level).", visualMock: "[ A generic box of content ]", expectedTags: ["div", "<div>", "<div></div>"], hint: "Stands for division" },
      { id: 9, description: "A generic inline container for phrasing content.", visualMock: "Just a small piece of text", expectedTags: ["span", "<span>", "<span></span>"], hint: "Used to span across a portion of text" },
      { id: 10, description: "Produces a single line break in text.", visualMock: "First line...\n...Second line", expectedTags: ["br", "<br>", "<br/>"], hint: "Stands for break" },
      { id: 11, description: "A thematic break, often displayed as a horizontal line.", visualMock: "----------------------------------------", expectedTags: ["hr", "<hr>", "<hr/>"], hint: "Stands for Horizontal Rule" },
      { id: 12, description: "The second level heading.", visualMock: "Heading 2", expectedTags: ["h2", "<h2>", "<h2></h2>"], hint: "Heading level 2" },
      { id: 13, description: "The third level heading.", visualMock: "Heading 3", expectedTags: ["h3", "<h3>", "<h3></h3>"], hint: "Heading level 3" },
      { id: 14, description: "The fourth level heading.", visualMock: "Heading 4", expectedTags: ["h4", "<h4>", "<h4></h4>"], hint: "Heading level 4" },
      { id: 15, description: "The smallest heading level.", visualMock: "Heading 6", expectedTags: ["h6", "<h6>", "<h6></h6>"], hint: "Heading level 6" }
    ]
  },
  {
    id: 2,
    title: "Stage 2: Formatting & Semantic Text",
    description: "Add meaning and emphasis to your text.",
    levels: [
      { id: 1, description: "Makes text bold to draw attention without adding semantic importance.", visualMock: "This text is **bold**", expectedTags: ["b", "<b>", "<b></b>"], hint: "Stands for bold" },
      { id: 2, description: "Makes text italic, often used for technical terms or thoughts.", visualMock: "This text is *italic*", expectedTags: ["i", "<i>", "<i></i>"], hint: "Stands for italic" },
      { id: 3, description: "Indicates that its contents have strong importance or urgency.", visualMock: "Warning: Proceed with **STRONG** caution!", expectedTags: ["strong", "<strong>", "<strong></strong>"], hint: "Strong importance" },
      { id: 4, description: "Marks text that has stress emphasis (usually italicized).", visualMock: "I *really* mean it.", expectedTags: ["em", "<em>", "<em></em>"], hint: "Stands for emphasis" },
      { id: 5, description: "Represents text highlighted for reference purposes.", visualMock: "Highlighted text with yellow background", expectedTags: ["mark", "<mark>", "<mark></mark>"], hint: "Like a highlighter marker" },
      { id: 6, description: "Represents side-comments and small print (like copyright).", visualMock: "Tiny text at the bottom", expectedTags: ["small", "<small>", "<small></small>"], hint: "Small print" },
      { id: 7, description: "Represents text that has been deleted from a document.", visualMock: "~~Strikethrough text~~", expectedTags: ["del", "<del>", "<del></del>"], hint: "Stands for deleted" },
      { id: 8, description: "Represents text that has been inserted into a document.", visualMock: "Underlined added text", expectedTags: ["ins", "<ins>", "<ins></ins>"], hint: "Stands for inserted" },
      { id: 9, description: "Defines subscript text (appears half a character below normal line).", visualMock: "H₂O", expectedTags: ["sub", "<sub>", "<sub></sub>"], hint: "Subscript" },
      { id: 10, description: "Defines superscript text (appears half a character above normal line).", visualMock: "E = mc²", expectedTags: ["sup", "<sup>", "<sup></sup>"], hint: "Superscript" },
      { id: 11, description: "Displays a fragment of computer code.", visualMock: "console.log('Hello')", expectedTags: ["code", "<code>", "<code></code>"], hint: "Used for code snippets" },
      { id: 12, description: "Displays preformatted text, preserving spaces and line breaks.", visualMock: "   This text retains\n   its spacing.", expectedTags: ["pre", "<pre>", "<pre></pre>"], hint: "Stands for preformatted" },
      { id: 13, description: "Indicates a section that is quoted from another source.", visualMock: "\"To be, or not to be...\"", expectedTags: ["blockquote", "<blockquote>", "<blockquote></blockquote>"], hint: "A block of a quote" },
      { id: 14, description: "Defines a short inline quotation.", visualMock: "He said \"hello\".", expectedTags: ["q", "<q>", "<q></q>"], hint: "Short for quote" },
      { id: 15, description: "Defines an abbreviation or an acronym.", visualMock: "NASA", expectedTags: ["abbr", "<abbr>", "<abbr></abbr>"], hint: "Stands for abbreviation" }
    ]
  },
  {
    id: 3,
    title: "Stage 3: Document Structure & Semantics",
    description: "Organize your page with structural HTML5 tags.",
    levels: [
      { id: 1, description: "The root element of an HTML page.", visualMock: "[ The entire webpage document ]", expectedTags: ["html", "<html>", "<html></html>"], hint: "The name of the language" },
      { id: 2, description: "Contains meta-information about the HTML page (not visible).", visualMock: "[ Metadata, Title, Scripts ]", expectedTags: ["head", "<head>", "<head></head>"], hint: "The 'brain' of the document" },
      { id: 3, description: "Defines the document's visible body containing all contents.", visualMock: "[ Everything you see on the page ]", expectedTags: ["body", "<body>", "<body></body>"], hint: "The 'body' of the document" },
      { id: 4, description: "Sets the title of the document (shown in the browser tab).", visualMock: "My Webpage - Mozilla Firefox", expectedTags: ["title", "<title>", "<title></title>"], hint: "The name in the browser tab" },
      { id: 5, description: "Represents introductory content or a set of navigational links at the top.", visualMock: "[ Logo | Home | About | Contact ]", expectedTags: ["header", "<header>", "<header></header>"], hint: "Goes at the top (head...er)" },
      { id: 6, description: "Represents the bottom section of a page or section (copyright, links).", visualMock: "© 2026 My Website", expectedTags: ["footer", "<footer>", "<footer></footer>"], hint: "Goes at the bottom (foot...er)" },
      { id: 7, description: "Represents a section providing navigation links.", visualMock: "Home > Products > Shoes", expectedTags: ["nav", "<nav>", "<nav></nav>"], hint: "Short for navigation" },
      { id: 8, description: "Specifies the dominant content of the body of a document.", visualMock: "[ The core primary content area ]", expectedTags: ["main", "<main>", "<main></main>"], hint: "The primary/main part" },
      { id: 9, description: "Represents a self-contained composition (like a blog post or news item).", visualMock: "[ A standalone blog post block ]", expectedTags: ["article", "<article>", "<article></article>"], hint: "Like in a newspaper" },
      { id: 10, description: "Represents a generic standalone section of a document.", visualMock: "[ A themed grouping of content ]", expectedTags: ["section", "<section>", "<section></section>"], hint: "A part or section" },
      { id: 11, description: "Represents content tangentially related to the main content (a sidebar).", visualMock: "[ Sidebar with related links ]", expectedTags: ["aside", "<aside>", "<aside></aside>"], hint: "Put it to the 'side'" },
      { id: 12, description: "Creates a disclosure widget from which the user can obtain additional info.", visualMock: "▶ Click to expand details", expectedTags: ["details", "<details>", "<details></details>"], hint: "Show more details" },
      { id: 13, description: "Specifies a summary, caption, or legend for a <details> element.", visualMock: "The visible clickable text of a details block", expectedTags: ["summary", "<summary>", "<summary></summary>"], hint: "A short summary" },
      { id: 14, description: "Represents self-contained content like an illustration, diagram, or photo.", visualMock: "[ An image with a caption below it ]", expectedTags: ["figure", "<figure>", "<figure></figure>"], hint: "Like Figure 1 in a book" },
      { id: 15, description: "Defines a caption for a <figure> element.", visualMock: "Fig 1. A cute dog.", expectedTags: ["figcaption", "<figcaption>", "<figcaption></figcaption>"], hint: "Figure caption" }
    ]
  },
  {
    id: 4,
    title: "Stage 4: Forms & Tables",
    description: "Collect user input and display tabular data.",
    levels: [
      { id: 1, description: "A container for user input fields to be submitted to a server.", visualMock: "[ Login Area: Username, Password, Submit ]", expectedTags: ["form", "<form>", "<form></form>"], hint: "Fill out a form" },
      { id: 2, description: "A typed data field that allows the user to edit data.", visualMock: "[ ___________ ] (text field)", expectedTags: ["input", "<input>", "<input/>"], hint: "To put data IN" },
      { id: 3, description: "A multi-line text input control.", visualMock: "[ ____________ ]\n[ ____________ ]\n[ ____________ ]", expectedTags: ["textarea", "<textarea>", "<textarea></textarea>"], hint: "Area for text" },
      { id: 4, description: "A clickable element used to submit forms or trigger actions.", visualMock: "[ Click Me ]", expectedTags: ["button", "<button>", "<button></button>"], hint: "You press it" },
      { id: 5, description: "A drop-down list.", visualMock: "Dropdown: [ Choose Option ▼ ]", expectedTags: ["select", "<select>", "<select></select>"], hint: "To select an item" },
      { id: 6, description: "Defines an option in a drop-down list.", visualMock: "• Option 1\n• Option 2", expectedTags: ["option", "<option>", "<option></option>"], hint: "One of the choices" },
      { id: 7, description: "Defines a caption for an <input> element.", visualMock: "Username: [ _______ ]", expectedTags: ["label", "<label>", "<label></label>"], hint: "A name tag or label" },
      { id: 8, description: "Used to display data in a two-dimensional grid.", visualMock: "| Name | Age |\n| Bob  | 25  |", expectedTags: ["table", "<table>", "<table></table>"], hint: "Rows and columns" },
      { id: 9, description: "Defines a row of cells in a table.", visualMock: "| Row Data 1 | Row Data 2 |", expectedTags: ["tr", "<tr>", "<tr></tr>"], hint: "Stands for Table Row" },
      { id: 10, description: "Defines a header cell in a table (usually bold and centered).", visualMock: "**Column Name**", expectedTags: ["th", "<th>", "<th></th>"], hint: "Stands for Table Header" },
      { id: 11, description: "Defines a standard data cell in a table.", visualMock: "Some regular table text", expectedTags: ["td", "<td>", "<td></td>"], hint: "Stands for Table Data" },
      { id: 12, description: "Groups the header content in a table.", visualMock: "[ Table Headings Group ]", expectedTags: ["thead", "<thead>", "<thead></thead>"], hint: "Table head" },
      { id: 13, description: "Groups the body content in a table.", visualMock: "[ Table Main Data Group ]", expectedTags: ["tbody", "<tbody>", "<tbody></tbody>"], hint: "Table body" },
      { id: 14, description: "Groups the footer content in a table.", visualMock: "[ Table Totals Group at Bottom ]", expectedTags: ["tfoot", "<tfoot>", "<tfoot></tfoot>"], hint: "Table foot" },
      { id: 15, description: "Defines a title/caption for a table.", visualMock: "Table 1: Monthly Sales", expectedTags: ["caption", "<caption>", "<caption></caption>"], hint: "Same as a figure caption" }
    ]
  },
  {
    id: 5,
    title: "Stage 5: Advanced & Meta",
    description: "Master embeds, scripts, and document metadata.",
    levels: [
      { id: 1, description: "Embeds another HTML page within the current page.", visualMock: "[ A webpage inside a box ]", expectedTags: ["iframe", "<iframe>", "<iframe></iframe>"], hint: "Inline frame" },
      { id: 2, description: "Used to embed sound content.", visualMock: "▶ (Play) ━━━● (Seek) 🔊", expectedTags: ["audio", "<audio>", "<audio></audio>"], hint: "Sound/Audio" },
      { id: 3, description: "Used to embed video content.", visualMock: "[ Video Player Interface ]", expectedTags: ["video", "<video>", "<video></video>"], hint: "Moving pictures/Video" },
      { id: 4, description: "Used to draw graphics on the fly via scripting (usually JavaScript).", visualMock: "[ A drawable blank 2D surface ]", expectedTags: ["canvas", "<canvas>", "<canvas></canvas>"], hint: "A painter's canvas" },
      { id: 5, description: "A container for vector graphics.", visualMock: "[ Scalable Vector Icon ]", expectedTags: ["svg", "<svg>", "<svg></svg>"], hint: "Stands for Scalable Vector Graphics" },
      { id: 6, description: "Used to embed executable client-side scripts.", visualMock: "function() { alert('Hi'); }", expectedTags: ["script", "<script>", "<script></script>"], hint: "Code script" },
      { id: 7, description: "Contains style information for a document (CSS).", visualMock: "body { background: red; }", expectedTags: ["style", "<style>", "<style></style>"], hint: "For styling" },
      { id: 8, description: "Defines metadata about an HTML document.", visualMock: "<... charset='UTF-8'>", expectedTags: ["meta", "<meta>", "<meta/>"], hint: "Data about data (meta)" },
      { id: 9, description: "Defines the relationship between the document and an external resource.", visualMock: "<... rel='stylesheet' href='style.css'>", expectedTags: ["link", "<link>", "<link/>"], hint: "Link to a resource" },
      { id: 10, description: "Specifies the base URL for all relative URLs in a document.", visualMock: "<... href='https://example.com/'>", expectedTags: ["base", "<base>", "<base/>"], hint: "Base address" },
      { id: 11, description: "Defines a dialog box or window.", visualMock: "[ A popup modal ]", expectedTags: ["dialog", "<dialog>", "<dialog></dialog>"], hint: "Like a conversation/dialogue box" },
      { id: 12, description: "Represents the completion progress of a task.", visualMock: "[██████░░░░] 60%", expectedTags: ["progress", "<progress>", "<progress></progress>"], hint: "Progress bar" },
      { id: 13, description: "Represents a scalar measurement within a known range.", visualMock: "[Disk Usage: ||||||....]", expectedTags: ["meter", "<meter>", "<meter></meter>"], hint: "Like a thermometer or gauge" },
      { id: 14, description: "A container used to specify multiple <source> elements for an <img>.", visualMock: "[ Responsive Image Set ]", expectedTags: ["picture", "<picture>", "<picture></picture>"], hint: "A framing picture" },
      { id: 15, description: "Specifies multiple media resources for <picture>, <audio>, or <video>.", visualMock: "<... src='video.mp4' type='video/mp4'>", expectedTags: ["source", "<source>", "<source/>"], hint: "The origin/source of media" }
    ]
  }
];
