import { ROUTES } from './routes.const';
import {
  INK_EXCEL_GITHUB_URL,
  INK_EXCEL_NPM_URL,
  INK_EXCEL_PACKAGE_NAME,
  INK_GRAPH_GITHUB_URL,
  INK_GRAPH_NPM_URL,
  INK_GRAPH_PACKAGE_NAME,
  INK_TITLES_GITHUB_URL,
  INK_TITLES_NPM_URL,
  INK_THEME_GITHUB_URL,
  INK_THEME_NPM_URL,
  INK_THEME_PACKAGE_NAME,
  INK_TITLES_PACKAGE_NAME,
} from './urls.const';

export type PluginDescriptionKey =
  | 'excelDescription'
  | 'titlesDescription'
  | 'sheetDescription'
  | 'graphDescription'
  | 'themeDescription';

export interface InkPluginCatalogEntry {
  id: string;
  name: string;
  packageName: string;
  npmUrl: string;
  gitUrl: string;
  href: string;
  descriptionKey: PluginDescriptionKey;
}

export const INK_PLUGIN_CATALOG: InkPluginCatalogEntry[] = [
  {
    id: 'titles',
    name: 'Titles',
    packageName: INK_TITLES_PACKAGE_NAME,
    npmUrl: INK_TITLES_NPM_URL,
    gitUrl: INK_TITLES_GITHUB_URL,
    href: ROUTES.DEMO_TITLES,
    descriptionKey: 'titlesDescription',
  },
  {
    id: 'sheet',
    name: 'Sheet',
    packageName: INK_EXCEL_PACKAGE_NAME,
    npmUrl: INK_EXCEL_NPM_URL,
    gitUrl: INK_EXCEL_GITHUB_URL,
    href: ROUTES.DEMO_EXCEL,
    descriptionKey: 'sheetDescription',
  },
  {
    id: 'graph',
    name: 'Graph',
    packageName: INK_GRAPH_PACKAGE_NAME,
    npmUrl: INK_GRAPH_NPM_URL,
    gitUrl: INK_GRAPH_GITHUB_URL,
    href: ROUTES.DEMO_GRAPH,
    descriptionKey: 'graphDescription',
  },
  {
    id: 'theme',
    name: 'Theme',
    packageName: INK_THEME_PACKAGE_NAME,
    npmUrl: INK_THEME_NPM_URL,
    gitUrl: INK_THEME_GITHUB_URL,
    href: `${ROUTES.DOCS}/plugins`,
    descriptionKey: 'themeDescription',
  },
  {
    id: 'ink-excel',
    name: 'Sheet pack',
    packageName: INK_EXCEL_PACKAGE_NAME,
    npmUrl: INK_EXCEL_NPM_URL,
    gitUrl: INK_EXCEL_GITHUB_URL,
    href: ROUTES.DEMO_EXCEL,
    descriptionKey: 'excelDescription',
  },
];
