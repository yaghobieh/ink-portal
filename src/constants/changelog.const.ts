export type ChangelogEntry = {
  version: string;
  defaultOpen?: boolean;
  items: string[];
};

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: '1.1.5 (planned)',
    items: [
      'Configurable keyboard shortcuts (GitHub #30)',
      'Real AI agent path (hosted OpenAI + live autocomplete / suggestions)',
      'Table split cells + Tab row/col flows (#24, #29)',
      'MCP Excel plugin block',
      'Docs GIF walkthroughs (Editor.js-style)',
    ],
  },
  {
    version: '1.1.4 (in progress)',
    defaultOpen: true,
    items: [
      'Editor.js-inspired inline toolbar, borderless chrome, colorMode light/dark',
      'Toolbar customize / hide via right-click; opaque context menus',
      'Font / list / find-replace dropdowns; LTR/RTL; block grip DnD',
      'Portal: Lab local-only, token usage meter, Google login path',
      'Common components + SCSS theming',
    ],
  },
  {
    version: '1.1.3',
    defaultOpen: true,
    items: [
      'Docs: live DocDemo (Demo / Code / HTML / Payload) on Configuration, Blocks, Tables, TC, Comments, Sign pad, Memory, Find/replace, AI',
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
      'Ink AI suite — chat, quick actions, review, translate, demo provider, model catalog',
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
  {
    version: '1.0.0',
    items: [
      'Initial InkEditor release with toolbar, typo auto-fix MVP, AI stub',
      'Angular helpers and WordPress plugin stub',
    ],
  },
];
