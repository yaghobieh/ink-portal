import { ROUTES } from './routes.const';

export type DemoCardId =
  | 'featureRich'
  | 'ai'
  | 'collab'
  | 'document'
  | 'tables'
  | 'markdown'
  | 'playground'
  | 'mobile'
  | 'titles'
  | 'sheet'
  | 'graph';

export interface DemoCard {
  id: DemoCardId;
  href: string;
}

export const DEMO_CARDS: DemoCard[] = [
  { id: 'featureRich', href: ROUTES.DEMO_FEATURE },
  { id: 'ai', href: ROUTES.DEMO_AI },
  { id: 'collab', href: ROUTES.DEMO_COLLAB },
  { id: 'document', href: ROUTES.DEMO_DOCUMENT },
  { id: 'tables', href: ROUTES.DEMO_TABLES },
  { id: 'markdown', href: ROUTES.DEMO_MARKDOWN },
  { id: 'playground', href: ROUTES.PLAYGROUND },
  { id: 'mobile', href: ROUTES.DEMO_MOBILE },
  { id: 'titles', href: ROUTES.DEMO_TITLES },
  { id: 'sheet', href: ROUTES.DEMO_EXCEL },
  { id: 'graph', href: ROUTES.DEMO_GRAPH },
];

export const DEMO_HTML_FEATURE =
  '<h1>Quarterly product update</h1><p>Ink ships a <strong>soft document shell</strong> with tables, comments, track changes, and pluggable AI.</p><ul><li>Headings & lists</li><li>Links & images</li><li>Undo / redo</li></ul><p>Try the toolbar — teal accents, soft paper card.</p>';

export const DEMO_HTML_COLLAB =
  '<h2>Design review notes</h2><p>Lily suggested clarifying the <mark class="Ink-comment-mark" data-ink-comment="hl-demo-1" style="background-color:#fde047">onboarding copy</mark> before launch.</p><p>Jack will <ins class="Ink-tc-insert" data-ink-tc="tc-demo-1">add acceptance criteria</ins> for the comments archive.</p><p><del class="Ink-tc-delete" data-ink-tc="tc-demo-2">Remove the old purple accent tokens.</del></p>';

export const DEMO_HTML_DOCUMENT =
  '<h1>Customer Support Metrics Report</h1><h2>Overview</h2><p>This report summarizes support performance. Use block handles on the left to reorder sections.</p><h2>Ticket volume</h2><p>During the period the team processed <strong>184,600</strong> tickets.</p><h2>Summary</h2><p>Overall performance remained within expected ranges.</p>';

export const DEMO_HTML_TABLES =
  '<h2>Channel distribution</h2><p>Insert a table from the toolbar, or edit this sample:</p><table class="Ink-table"><thead><tr><th>Channel</th><th>Share</th><th>Change</th></tr></thead><tbody><tr><td>Email</td><td>54%</td><td>-3%</td></tr><tr><td>Live Chat</td><td>31%</td><td>+5%</td></tr><tr><td>In-App</td><td>15%</td><td>-2%</td></tr></tbody></table><p>Paste an image or use the image button.</p>';

export const DEMO_HTML_TITLES =
  '<h1>Titles</h1><p>Select a word, then open Titles and pick a style. Slash <code>/ti</code> inserts the first style.</p><p class="Ink-title Ink-title--t16" data-ink-title="t16">Ink</p><p class="Ink-title Ink-title--t13" data-ink-title="t13">Title</p>';

export const DEMO_HTML_SHEET =
  '<h1>Sheet</h1><p>Open Sheet to edit a grid or import CSV, then insert it as a table.</p><table class="Ink-table"><thead><tr><th contenteditable="true">Month</th><th contenteditable="true">North</th><th contenteditable="true">South</th></tr></thead><tbody><tr><td contenteditable="true">Jan</td><td contenteditable="true">40</td><td contenteditable="true">22</td></tr><tr><td contenteditable="true">Feb</td><td contenteditable="true">55</td><td contenteditable="true">31</td></tr></tbody></table><p><br></p>';

export const DEMO_HTML_GRAPH =
  '<h1>Graph</h1><p>Right-click the chart to switch bar, line, or pie, edit values, or ask Ink AI.</p><p class="Ink-graph-block" data-ink-graph="bar" data-ink-graph-points="%5B%7B%22label%22%3A%22A%22%2C%22value%22%3A40%7D%2C%7B%22label%22%3A%22B%22%2C%22value%22%3A70%7D%2C%7B%22label%22%3A%22C%22%2C%22value%22%3A55%7D%2C%7B%22label%22%3A%22D%22%2C%22value%22%3A90%7D%5D"><svg class="Ink-graph" viewBox="0 0 320 180" width="320" height="180"><rect x="24" y="97.33" width="62" height="58.67" fill="#0E8A6E" rx="2"/><text x="55" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">A</text><rect x="94" y="53.33" width="62" height="102.67" fill="#0E8A6E" rx="2"/><text x="125" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">B</text><rect x="164" y="75.33" width="62" height="80.67" fill="#0E8A6E" rx="2"/><text x="195" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">C</text><rect x="234" y="24" width="62" height="132" fill="#0E8A6E" rx="2"/><text x="265" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">D</text></svg></p><p><br></p>';

export const DEMO_HTML_AI =
  '<h2>Operational summary</h2><p>Select text and open Ink AI for rewrite, summarize, expand, tone, review, or translate. Chat keeps multi-turn history in the side panel.</p><p>The demo provider runs locally — connect Claude, Gemini, or GPT via <code>inkAi.registerProvider</code>.</p>';

export const MOCK_COLLAB_COMMENTS = [
  {
    id: 'cmt-lily',
    author: 'Lily',
    body: 'Can we make the onboarding copy less jargon-heavy?',
    timestamp: Date.now() - 1000 * 60 * 45,
    highlightId: 'hl-demo-1',
    replies: [
      {
        id: 'reply-jack',
        author: 'Jack',
        body: 'Agreed — I will draft a plain-language version.',
        timestamp: Date.now() - 1000 * 60 * 20,
      },
    ],
  },
];

export const MOCK_COLLAB_TRACK = [
  {
    id: 'tc-demo-1',
    type: 'insert' as const,
    html: 'add acceptance criteria',
    author: 'Jack',
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    id: 'tc-demo-2',
    type: 'delete' as const,
    html: 'Remove the old purple accent tokens.',
    author: 'Lily',
    timestamp: Date.now() - 1000 * 60 * 15,
  },
];
