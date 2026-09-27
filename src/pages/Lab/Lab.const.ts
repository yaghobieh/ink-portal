import type { InkCollaborator, InkDocument, InkFolder, ToolbarOption } from '@forgedevstack/ink';
import type { LabPageState } from './Lab.types';

export const LAB_DOC_RELEASE = 'doc-release-119';
export const LAB_DOC_COLLAB = 'doc-collab-guide';
export const LAB_DOC_NOTES = 'doc-notes';

export const LAB_DEFAULT_DOCUMENTS: InkDocument[] = [
  {
    id: LAB_DOC_RELEASE,
    title: 'Ink 1.1.9 Release Notes',
    folderId: 'folder-specs',
    content: `<h1>Ink 1.1.9 — Multi-Doc Workspace & Real-Time Collaboration</h1>
<p>Welcome to the <b>Ink 1.1.9 Lab</b>. This workspace showcases the highest version of the Ink editor library, bringing tabbed multi-document management, dual split-screen buffers, remote presence avatars, and extensible plugins together in a single workspace.</p>
<h2>✨ What's New in Ink 1.1.9</h2>
<ul>
  <li><b>Multi-Document Tabs (InkTabs)</b>: Switch smoothly between open document buffers with isolated history and active tab states.</li>
  <li><b>Workspace Explorer (InkWorkspace)</b>: Document tree, folder hierarchies, search filter, and document creation/deletion.</li>
  <li><b>Split-Screen Views</b>: Dual buffer side-by-side (vertical) or stacked (horizontal) layout for comparing drafts.</li>
  <li><b>Real-Time Presence & Avatars</b>: Live presence indicators, collaborator avatars with active/idle status, and remote cursor support.</li>
  <li><b>Rich Plugin Suite</b>: Titles Word-style gallery, Sheet grid & CSV import, interactive Charts (bar/line/pie), Outline rail, and Theme switcher.</li>
</ul>
<table class="Ink-table"><colgroup><col><col><col></colgroup><thead><tr><th>Feature</th><th>Component</th><th>Status</th></tr></thead><tbody><tr><td>Multi-Doc Tabs</td><td>InkTabs</td><td>Available (v1.1.9)</td></tr><tr><td>Workspace Explorer</td><td>InkWorkspace</td><td>Available (v1.1.9)</td></tr><tr><td>Presence Avatars</td><td>PresenceStack</td><td>Available (v1.1.9)</td></tr><tr><td>Split View</td><td>InkWorkspace</td><td>Available (v1.1.9)</td></tr><tr><td>AI Sidebar</td><td>InkAi</td><td>Available (OpenAI/InkServer)</td></tr></tbody></table>
<p class="Ink-graph-block" data-ink-graph="bar" data-ink-graph-points="%5B%7B%22label%22%3A%22Tabs%22%2C%22value%22%3A95%7D%2C%7B%22label%22%3A%22Collab%22%2C%22value%22%3A88%7D%2C%7B%22label%22%3A%22AI%22%2C%22value%22%3A92%7D%2C%7B%22label%22%3A%22Plugins%22%2C%22value%22%3A85%7D%5D"><svg class="Ink-graph" viewBox="0 0 320 180" width="320" height="180"><rect x="24" y="24" width="62" height="132" fill="#0E8A6E" rx="2"/><text x="55" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">Tabs</text><rect x="94" y="38" width="62" height="118" fill="#0E8A6E" rx="2"/><text x="125" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">Collab</text><rect x="164" y="30" width="62" height="126" fill="#0E8A6E" rx="2"/><text x="195" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">AI</text><rect x="234" y="45" width="62" height="111" fill="#0E8A6E" rx="2"/><text x="265" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">Plugins</text></svg></p>`,
    updatedAt: Date.now(),
  },
  {
    id: LAB_DOC_COLLAB,
    title: 'Real-Time Collaboration',
    folderId: 'folder-specs',
    content: `<h1>Real-Time Collaboration Guide</h1>
<p>Ink 1.1.9 introduces full presence and collaboration hooks for multi-user editing sessions.</p>
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
<blockquote>Ink 1.1.9 is designed for fast, modular publishing pipelines and headless enterprise workspaces.</blockquote>`,
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
