import type { InkCollaborator, InkDocument, InkFolder, ToolbarOption } from '@forgedevstack/ink';
import type { LabPageState } from './Lab.types';

export const LAB_DOC_RELEASE = 'doc-release-119';
export const LAB_DOC_COLLAB = 'doc-collab-guide';
export const LAB_DOC_NOTES = 'doc-notes';

export const LAB_DEFAULT_DOCUMENTS: InkDocument[] = [
  {
    id: LAB_DOC_RELEASE,
    title: 'Ink 1.2.0 Lab',
    folderId: 'folder-specs',
    content: `<h1>Ink 1.2.0 — the document can be shared</h1>
<p>This lab is wired to the <b>local Ink build</b>. Select this sentence, then use the floating AI actions. Type <b>@</b> to mention John, Sarah, or Alex.</p>
<h2>What to try</h2>
<ul>
  <li><b>Selection AI</b>: Improve, Shorter, Longer, Fix, Tone, Translate, then Apply.</li>
  <li><b>Markdown</b>: Import or export, or type <code># </code>, <code>&gt; </code>, and <code>1. </code> at the start of a line.</li>
  <li><b>Word and PDF</b>: Export Word downloads a .docx. Export PDF opens the print dialog.</li>
  <li><b>Versions</b>: Save a snapshot, edit, then restore or compare.</li>
  <li><b>Image</b>: Click the green mark below for width, align, alt, and caption.</li>
  <li><b>Comments</b>: Add one, resolve it (the highlight stays), reopen it, and click the thread to scroll.</li>
  <li><b>Format painter and case</b>: Copy bold onto the next selection, or switch case.</li>
  <li><b>Table</b>: Right-click a cell to merge right, split, set background, or change vertical align.</li>
</ul>
<p><img alt="Ink mark" width="240" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='80'%3E%3Crect width='240' height='80' rx='8' fill='%230E8A6E'/%3E%3Ctext x='20' y='48' fill='white' font-size='22' font-family='sans-serif'%3EInk 1.2.0%3C/text%3E%3C/svg%3E" /></p>
<table class="Ink-table"><colgroup><col><col><col></colgroup><thead><tr><th>Feature</th><th>Where</th><th>Ticket</th></tr></thead><tbody><tr><td>Selection AI</td><td>Text selection</td><td>FORGE-168</td></tr><tr><td>Markdown</td><td>Toolbar</td><td>FORGE-167</td></tr><tr><td>Word and PDF</td><td>Toolbar</td><td>FORGE-169</td></tr><tr><td>Office paste</td><td>Paste</td><td>FORGE-170</td></tr><tr><td>Versions</td><td>Toolbar</td><td>FORGE-171</td></tr></tbody></table>
<p class="Ink-graph-block" data-ink-graph="bar" data-ink-graph-points="%5B%7B%22label%22%3A%22Tabs%22%2C%22value%22%3A95%7D%2C%7B%22label%22%3A%22Collab%22%2C%22value%22%3A88%7D%2C%7B%22label%22%3A%22AI%22%2C%22value%22%3A92%7D%2C%7B%22label%22%3A%22Plugins%22%2C%22value%22%3A85%7D%5D"><svg class="Ink-graph" viewBox="0 0 320 180" width="320" height="180"><rect x="24" y="24" width="62" height="132" fill="#0E8A6E" rx="2"/><text x="55" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">Tabs</text><rect x="94" y="38" width="62" height="118" fill="#0E8A6E" rx="2"/><text x="125" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">Collab</text><rect x="164" y="30" width="62" height="126" fill="#0E8A6E" rx="2"/><text x="195" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">AI</text><rect x="234" y="45" width="62" height="111" fill="#0E8A6E" rx="2"/><text x="265" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">Plugins</text></svg></p>`,
    updatedAt: Date.now(),
  },
  {
    id: LAB_DOC_COLLAB,
    title: 'Real-Time Collaboration',
    folderId: 'folder-specs',
    content: `<h1>Real-Time Collaboration Guide</h1>
<p>Presence and collaboration hooks stay beside the 1.2.0 share tools.</p>
<h2>Key Capabilities</h2>
<ul>
  <li><b>PresenceStack</b>: Floating avatar stack displaying active editors in the current workspace.</li>
  <li><b>Remote Cursors</b>: Dynamic cursor markers with collaborator name tags and distinctive user colors.</li>
  <li><b>Room Channels</b>: Easy binding to WebSockets, BroadcastChannel, or WebRTC data backplanes.</li>
</ul>
<p>Try splitting this view using the split icons in the header to compare documents side-by-side!</p>`,
    updatedAt: Date.now() - 3600000,
  },
  {
    id: LAB_DOC_NOTES,
    title: 'Research & Draft Notes',
    folderId: 'folder-notes',
    content: `<h1>Draft Notes</h1>
<p>Keep secondary research, outlines, and snippets next to the main document buffer without losing your place.</p>
<blockquote>Ink 1.2.0 keeps the document as HTML and adds the tools to share it.</blockquote>`,
    updatedAt: Date.now() - 7200000,
  },
];

export const LAB_DEFAULT_FOLDERS: InkFolder[] = [
  { id: 'folder-specs', name: 'Specifications' },
  { id: 'folder-notes', name: 'Notes & Drafts' },
];

export const LAB_COLLABORATORS: InkCollaborator[] = [
  {
    id: 'collab-1',
    name: 'John Yaghobieh',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
    color: '#0E8A6E',
    status: 'active',
  },
  {
    id: 'collab-2',
    name: 'Sarah Dev',
    color: '#3B82F6',
    status: 'active',
  },
  {
    id: 'collab-3',
    name: 'Alex Design',
    color: '#8B5CF6',
    status: 'idle',
  },
];

export const LAB_INITIAL_STATE: LabPageState = {
  documents: LAB_DEFAULT_DOCUMENTS,
  activeDocumentId: LAB_DOC_RELEASE,
  folders: LAB_DEFAULT_FOLDERS,
  splitMode: 'none',
  secondaryDocumentId: LAB_DOC_COLLAB,
};

export const LAB_FEATURES = {
  table: true,
  trackChanges: true,
  comments: true,
  ai: true,
  blocks: true,
  slash: true,
  signature: true,
  findReplace: true,
  horizontalRule: true,
  htmlSource: true,
  titles: true,
  excel: true,
  graph: true,
  outline: true,
  fullscreen: true,
  theme: true,
  markdown: true,
  export: true,
  versionHistory: true,
  mentions: true,
  formatPainter: true,
} as const;

export const LAB_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'fontDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'listDropdown',
  'divider',
  'link',
  'image',
  'table',
  'titles',
  'excel',
  'graph',
  'outline',
  'theme',
  'fullscreen',
  'htmlSource',
  'importMarkdown',
  'exportMarkdown',
  'exportDocx',
  'exportPdf',
  'versions',
  'formatPainter',
  'changeCase',
  'code',
  'divider',
  'undo',
  'redo',
  'divider',
  'trackChanges',
  'comments',
  'ai',
];

export { PORTAL_OPENAI_KEY as LAB_OPENAI_KEY, PORTAL_OPENAI_PROXY_BASE_URL as LAB_OPENAI_PROXY_BASE_URL } from '@/ai/index';
