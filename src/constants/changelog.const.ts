export type ChangelogEntry = {
  version: string;
  defaultOpen?: boolean;
  items: string[];
};

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: '1.1.5 (planned)',
    items: [
      'GIF + GUID on every docs page',
      '.ink plugin packages (drag-drop install)',
      'CMS org / plan / token editor control',
      'Real login + connect',
      'Translation',
      'Remove AI from marketing top bar (portal)',
    ],
  },
  {
    version: '1.1.4',
    defaultOpen: true,
    items: [
      'OpenAI provider + ghost autocomplete (Tab accept)',
      'Table dark header + right-click row/col insert & delete',
      'Toolbar heading / font / list / find-replace dropdowns',
      'Portal plugins nav + ink-excel catalog links',
      '@forgedevstack/ink@1.1.4 on npm',
    ],
  },
  {
    version: '1.1.3',
    items: [
      'Docs: live DocDemo (Demo / Code / HTML / Payload)',
      'Pin @forgedevstack/ink@1.1.3',
      'Vercel deploys only from main/master (release merges)',
    ],
  },
  {
    version: '1.1.2',
    items: [
      'Sign pad, keep-in-memory drafts, find and replace, horizontal rule',
      'Docs pages + code examples for sign pad / memory / find-replace',
      'Product copy cleanup — Ink-only voice',
    ],
  },
  {
    version: '1.1.0',
    items: [
      'Document shell, document variant, block handles, slash commands',
      'Tables, track changes, comments archive, undo/redo toolbar',
      'Ink AI suite — chat, quick actions, review, translate, demo provider',
      'Portal demos hub, AI marketing page, playground module toggles',
    ],
  },
  {
    version: '1.0.1',
    items: [
      'Expanded README: props, toolbar options, CSS variables',
      'Theme CSS classes documented for snow / bubble / dark / minimal',
      'Portal docs + playground ship alongside',
    ],
  },
];
