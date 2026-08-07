import {
  INK_EXCEL_GITHUB_URL,
  INK_EXCEL_NPM_URL,
  INK_EXCEL_PACKAGE_NAME,
} from './urls.const';

export interface InkPluginCatalogEntry {
  id: string;
  name: string;
  packageName: string;
  npmUrl: string;
  gitUrl: string;
  descriptionKey: 'excelDescription';
}

export const INK_PLUGIN_CATALOG: InkPluginCatalogEntry[] = [
  {
    id: 'ink-excel',
    name: 'Ink Excel',
    packageName: INK_EXCEL_PACKAGE_NAME,
    npmUrl: INK_EXCEL_NPM_URL,
    gitUrl: INK_EXCEL_GITHUB_URL,
    descriptionKey: 'excelDescription',
  },
];
