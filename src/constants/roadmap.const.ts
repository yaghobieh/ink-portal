export type RoadmapItem = {
  id: string;
  title: string;
  body: string;
};

export const ROADMAP_1_1_5: RoadmapItem[] = [
  {
    id: 'yjs-collab',
    title: 'Yjs / CRDT realtime collab',
    body: 'Ship Realtime Collab extension with live cursors — competitive parity with Tiptap/Hocuspocus.',
  },
  {
    id: 'docs-gif-guid',
    title: 'GIF + GUID on every doc',
    body: 'Each docs page gets a short GIF and a stable GUID for CMS / deep links.',
  },
  {
    id: 'nav-no-ai',
    title: 'Remove AI from top bar',
    body: 'AI stays in the editor sidebar / Lab — not a primary marketing nav item.',
  },
  {
    id: 'translation',
    title: 'Translation',
    body: 'Real translate flows (editor + portal copy) beyond the AI panel stub.',
  },
  {
    id: 'real-login',
    title: 'Real login + connect',
    body: 'Google/GitHub OAuth end-to-end; entitlements from ink-server drive the editor.',
  },
  {
    id: 'ink-package',
    title: '.ink plugin packages',
    body: 'Drag-drop .ink (like .vsix): loading UI → install → plugin active. npm/CMS remain first-class paths.',
  },
  {
    id: 'new-plugins',
    title: 'New plugins',
    body: 'Expand catalog beyond ink-excel (MCP Excel block, more BYO handlers).',
  },
  {
    id: 'cms-token',
    title: 'CMS site control by token',
    body: 'Register user → org + plan → token. That token scopes the full editor (features + plugins) per site.',
  },
  {
    id: 'shortcuts',
    title: 'Configurable shortcuts',
    body: 'User-overridable key map for bold, lists, headings, find, and custom commands.',
  },
  {
    id: 'tables',
    title: 'Table power tools',
    body: 'Tab auto-advance between cells; polish row/col UX after 1.1.4 context menu.',
  },
];
