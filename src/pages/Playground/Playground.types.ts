import type { ToolbarOption } from '@forgedevstack/ink';

export type PlaygroundTheme = 'snow' | 'bubble' | 'dark' | 'minimal';
export type ToolbarPreset = 'full' | 'simple' | 'minimal';
export type PlaygroundView = 'preview' | 'code';
export type PlaygroundVariant =
  | 'classic'
  | 'document'
  | 'simple'
  | 'agent'
  | 'docx'
  | 'notion-like';

export interface PlaygroundConfig {
  toolbarPreset: ToolbarPreset;
  variant: PlaygroundVariant;
  typoAutoFix: boolean;
  allowImagePaste: boolean;
  showCharCount: boolean;
  readOnly: boolean;
  table: boolean;
  trackChanges: boolean;
  comments: boolean;
  ai: boolean;
  blocks: boolean;
  theme: PlaygroundTheme;
}

export interface PlaygroundToolbarMap {
  full: ToolbarOption[];
  simple: ToolbarOption[];
  minimal: ToolbarOption[];
}
