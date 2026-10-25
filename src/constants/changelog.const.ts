import type { ChangelogEntry } from './changelog.types';

export type { ChangelogEntry } from './changelog.types';

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: '1.2.2',
    defaultOpen: true,
    items: [
      'Portal tracks @forgedevstack/ink 1.2.2',
      'Split view follows the Ink Pro license. The single editor stays available without it',
      'The license also unlocks theme tokens, toolbar icons, rich paste, image upload, and WYSIWYG mode',
    ],
  },
  {
    version: '1.2.1',
    defaultOpen: false,
    items: [
      'License key shape accepts Ink Pro keys',
    ],
  },
  {
    version: '1.2.0',
    defaultOpen: false,
    items: [
      'Selection AI on a text highlight: Improve, Shorter, Longer, Fix, Tone, Translate',
      'Markdown import, export, and block shortcuts',
      'Word (.docx) download and PDF via the print dialog',
      'Word and Google Docs paste cleanup',
      'Local version history with restore and compare',
      '@mentions, image frame, comment resolve, format painter, and table cell styles',
    ],
  },
  {
    version: '1.1.9',
    defaultOpen: false,
    items: [
      'Multi-document InkWorkspace with useInkWorkspace hook',
      'PresenceStack avatars and real-time remote cursor tracking',
      'useInkCollaboration hook with themeable collab tokens',
      'InkTabs document navigation and tab management',
      'Modular plugin architecture (Excel, AI, Graph, Titles, Collab)',
    ],
  },
  {
    version: '1.1.7',
    items: [
      'Document chrome: grouped toolbar, outline rail, Ask Ink AI, slash search',
      'Light heading dropdown portaled under the trigger',
      'Status bar words / chars / synced',
      'Portal marketing uses the live 1.1.7 editor, not classic snow theme',
    ],
  },
  {
    version: '1.1.6',
    items: [
      'Ship as portal release line (closes 1.1.5 track as 1.1.6)',
      'OpenAI ghost autocomplete on /ai + Playground (no demo stub)',
      'Lab + public login chrome hidden for marketing build',
      'Docs media per slug + mobile TOC',
      'Ink CMS shell: Crew, Live edit, Extensions, Content edit polish',
      'Pricing GridTable plan diffs + Bifrost Install CMS CTA',
    ],
  },
  {
    version: '1.1.5',
    items: [
      'CMS dashboard / docs API / Cloudinary / plans (merged into 1.1.6)',
      'Editor variants chrome',
      'GIF + GUID docs scaffolding',
    ],
  },
  {
    version: '1.1.4',
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
