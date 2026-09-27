import {
  GITHUB_URL,
  INK_EXCEL_GITHUB_URL,
  INK_EXCEL_NPM_URL,
  INK_EXCEL_PACKAGE_NAME,
  NPM_URL,
} from './urls.const';
import { ROUTES } from './routes.const';

import type { InkPluginCatalogEntry } from './plugins.types';

export type { InkPluginCatalogEntry } from './plugins.types';

export const INK_PLUGIN_CATALOG: InkPluginCatalogEntry[] = [
  {
    id: 'ink-excel',
    name: 'Ink Excel',
    packageName: INK_EXCEL_PACKAGE_NAME,
    npmUrl: INK_EXCEL_NPM_URL,
    gitUrl: INK_EXCEL_GITHUB_URL,
    demoUrl: ROUTES.DEMO_EXCEL,
    description: 'Spreadsheet grid, formulas, and CSV/XLSX import',
    explanation: 'Embeds a full spreadsheet calculation grid inside Ink. Supports column letters, row numbers, formula evaluation, real-time cell editing, and bidirectional import/export with CSV and Microsoft Excel XLSX files.',
  },
  {
    id: 'ink-ai',
    name: 'Ink AI',
    packageName: '@forgedevstack/ink/plugins/ai',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    demoUrl: ROUTES.DEMO_AI,
    description: 'Autonomous writing assistant, inline autocomplete, and prompt chat',
    explanation: 'Brings generative AI capabilities directly into the editor workflow. Features ghost autocomplete suggestions (press Tab to accept), multi-turn chat panel, tone adjustment, content expansion, summarizing, and custom LLM provider adapters (OpenAI, Anthropic, or custom private backends).',
  },
  {
    id: 'ink-graph',
    name: 'Ink Graph',
    packageName: '@forgedevstack/ink/plugins/graph',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    demoUrl: ROUTES.DEMO_GRAPH,
    description: 'Interactive bar, line, and pie charts embedded in documents',
    explanation: 'Generates responsive SVG vector charts directly in document content. Users can toggle between Bar, Line, and Pie visualizations, right-click any chart to edit data points in real time, and customize theme color palettes.',
  },
  {
    id: 'ink-titles',
    name: 'Ink Titles',
    packageName: '@forgedevstack/ink/plugins/titles',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    demoUrl: ROUTES.DEMO_TITLES,
    description: 'Styled title gallery, decorative banners, and header presets',
    explanation: 'Offers 30 Word-era and modern title treatments in a visual dropdown gallery. Quickly inserts gradient banners, framed headings, neon glows, and geometric header dividers into editorial articles.',
  },
  {
    id: 'ink-collab',
    name: 'Ink Collab',
    packageName: '@forgedevstack/ink/collab',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    demoUrl: ROUTES.DEMO_COLLAB,
    description: 'Multi-document tabs, presence avatars, and real-time remote cursors',
    explanation: 'Powers real-time collaborative editing sessions with isolated undo/redo per document, tabbed multi-doc workspace (InkTabs/InkWorkspace), live presence avatars with active/idle indicators (PresenceStack), and colored remote carets with collaborator name tags.',
  },
  {
    id: 'ink-theme',
    name: 'Ink Theme',
    packageName: '@forgedevstack/ink/plugins/theme',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    demoUrl: ROUTES.LAB,
    description: 'Dynamic editor theming: Paper, Snow, Ink, and Dark modes',
    explanation: 'Applies scoped typography and color palettes to the editor and workspace chrome without polluting global CSS. Switch effortlessly between warm vintage Paper, crisp Snow, signature Ink, and high-contrast Dark themes.',
  },
];
