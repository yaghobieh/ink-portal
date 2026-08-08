import type { PlaygroundVariant } from '@pages/Playground/Playground.types';

export const EDITORS_COLLECTION = 'editors';

export const EDITOR_VARIANT_ORDER: PlaygroundVariant[] = [
  'classic',
  'document',
  'simple',
  'agent',
  'docx',
  'notion-like',
];

export const EDITOR_PREVIEW_MIN_HEIGHT_PX = 320;

export const FALLBACK_EDITOR_HTML: Record<PlaygroundVariant, string> = {
  classic: '<h2>Classic</h2><p>Boxed toolbar — default product chrome.</p>',
  document: '<h2>Document</h2><p>Long-form paper with block outlines.</p>',
  simple: '<p>Simple — quiet toolbar for notes.</p>',
  agent: '<h2>Agent</h2><p>Ask bar above the document.</p>',
  docx: '<h1>Docx page</h1><p>Word-like canvas for formal writing.</p>',
  'notion-like': '<h1>Untitled</h1><p>Wide column, minimal chrome.</p>',
};
