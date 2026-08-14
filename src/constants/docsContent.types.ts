import type { InkEditorProps, ToolbarOption, InkCommentThread, InkTrackChange } from '@forgedevstack/ink';

export type DocsBlock =
  | { type: 'p'; text: string }
  | { type: 'code'; code: string; language?: 'tsx' | 'html' | 'json' | 'bash' }
  | { type: 'html'; html: string }
  | { type: 'steps'; title?: string; items: { title: string; body: string }[] }
  | DocDemoBlock
  | { type: 'payload'; label: string; data: unknown };

export interface DocDemoEditorConfig {
  toolbar?: ToolbarOption[];
  features?: InkEditorProps['features'];
  variant?: InkEditorProps['variant'];
  keepInMemory?: boolean;
  memoryKey?: string;
  trackChangesEnabled?: boolean;
  trackChanges?: InkTrackChange[];
  comments?: InkCommentThread[];
  showCommentsPanel?: boolean;
  ai?: InkEditorProps['ai'];
  typoAutoFix?: boolean;
  showCharCount?: boolean;
  author?: string;
  tableRows?: number;
  tableCols?: number;
  placeholder?: string;
  minHeight?: number;
  slashCommands?: boolean;
}

export interface DocDemoBlock {
  type: 'demo';
  id: string;
  title?: string;
  description?: string;
  initialHtml: string;
  code: string;
  editor?: DocDemoEditorConfig;
  payload?: { label: string; data: unknown };
  showLiveHtml?: boolean;
}

export interface DocsPageContent {
  id: string;
  labelKey:
    | 'tocInstallation'
    | 'tocQuickstart'
    | 'tocConfiguration'
    | 'tocToolbar'
    | 'tocModules'
    | 'tocTables'
    | 'tocTrackChanges'
    | 'tocComments'
    | 'tocBlocks'
    | 'tocSignPad'
    | 'tocMemory'
    | 'tocFindReplace'
    | 'tocThemes'
    | 'tocTypo'
    | 'tocAi'
    | 'tocPlugins'
    | 'tocAngular'
    | 'tocWordpress'
    | 'tocA11y'
    | 'tocPremium'
    | 'tocCollaboration';
  blocks: DocsBlock[];
}
