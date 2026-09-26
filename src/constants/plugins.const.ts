import {
  GITHUB_URL,
  INK_EXCEL_GITHUB_URL,
  INK_EXCEL_NPM_URL,
  INK_EXCEL_PACKAGE_NAME,
  NPM_URL,
} from './urls.const';

export interface InkPluginCatalogEntry {
  id: string;
  name: string;
  packageName: string;
  npmUrl: string;
  gitUrl: string;
  description: string;
}

export const INK_PLUGIN_CATALOG: InkPluginCatalogEntry[] = [
  {
    id: 'ink-excel',
    name: 'Ink Excel',
    packageName: INK_EXCEL_PACKAGE_NAME,
    npmUrl: INK_EXCEL_NPM_URL,
    gitUrl: INK_EXCEL_GITHUB_URL,
    description: 'Spreadsheet grid, formulas, and CSV/XLSX import',
  },
  {
    id: 'ink-ai',
    name: 'Ink AI',
    packageName: '@forgedevstack/ink/plugins/ai',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    description: 'Autonomous writing assistant, inline autocomplete, and prompt chat',
  },
  {
    id: 'ink-graph',
    name: 'Ink Graph',
    packageName: '@forgedevstack/ink/plugins/graph',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    description: 'Interactive bar, line, and pie charts embedded in documents',
  },
  {
    id: 'ink-titles',
    name: 'Ink Titles',
    packageName: '@forgedevstack/ink/plugins/titles',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    description: 'Styled title gallery, decorative banners, and header presets',
  },
  {
    id: 'ink-collab',
    name: 'Ink Collab',
    packageName: '@forgedevstack/ink/collab',
    npmUrl: NPM_URL,
    gitUrl: GITHUB_URL,
    description: 'Multi-document tabs, presence avatars, and real-time remote cursors',
  },
];

