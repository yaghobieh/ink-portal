import { ROUTES } from './routes.const';

export type DemoCardId =
  | 'featureRich'
  | 'ai'
  | 'collab'
  | 'document'
  | 'tables'
  | 'markdown'
  | 'playground'
  | 'mobile';

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
];

export const DEMO_HTML_FEATURE =
  '<h1>Quarterly product update</h1><p>Ink ships a <strong>soft document shell</strong> with tables, comments, track changes, and pluggable AI.</p><ul><li>Headings & lists</li><li>Links & images</li><li>Undo / redo</li></ul><p>Try the toolbar — teal accents, soft paper card.</p>';

export const DEMO_HTML_COLLAB =
  '<h2>Design review notes</h2><p>Lily suggested clarifying the <mark class="Ink-comment-mark" data-ink-comment="hl-demo-1" style="background-color:#fde047">onboarding copy</mark> before launch.</p><p>Jack will <ins class="Ink-tc-insert" data-ink-tc="tc-demo-1">add acceptance criteria</ins> for the comments archive.</p><p><del class="Ink-tc-delete" data-ink-tc="tc-demo-2">Remove the old purple accent tokens.</del></p>';

export const DEMO_HTML_DOCUMENT =
  '<h1>Customer Support Metrics Report</h1><h2>Overview</h2><p>This report summarizes support performance. Use block handles on the left to reorder sections.</p><h2>Ticket volume</h2><p>During the period the team processed <strong>184,600</strong> tickets.</p><h2>Summary</h2><p>Overall performance remained within expected ranges.</p>';

export const DEMO_HTML_TABLES =
  '<h2>Channel distribution</h2><p>Insert a table from the toolbar, or edit this sample:</p><table class="Ink-table"><thead><tr><th>Channel</th><th>Share</th><th>Change</th></tr></thead><tbody><tr><td>Email</td><td>54%</td><td>-3%</td></tr><tr><td>Live Chat</td><td>31%</td><td>+5%</td></tr><tr><td>In-App</td><td>15%</td><td>-2%</td></tr></tbody></table><p>Paste an image or use the image button.</p>';

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
