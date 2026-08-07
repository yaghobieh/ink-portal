import type { LabPageState } from './Lab.types';

export const LAB_EDITOR_HTML =
  '<h1>Lab</h1><p>Private sandbox for trying Ink features before they land in docs. Right-click for the context menu; use the full toolbar for signature, find/replace, tables, and more.</p>';

export const LAB_INITIAL_STATE: LabPageState = {
  value: LAB_EDITOR_HTML,
  colorMode: 'light',
};

export const LAB_COLOR_MODES = ['light', 'dark'] as const;

export const LAB_FEATURES = {
  table: true,
  trackChanges: true,
  comments: true,
  ai: true,
  blocks: true,
  slash: true,
  signature: true,
  findReplace: true,
  horizontalRule: true,
} as const;
