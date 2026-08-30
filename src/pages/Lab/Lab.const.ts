import type { ToolbarOption } from '@forgedevstack/ink';
import type { LabDocId, LabPageState } from './Lab.types';

export const LAB_DOC_DESIGN: LabDocId = 'design';
export const LAB_DOC_NOTES: LabDocId = 'notes';

export const LAB_EDITOR_HTML =
  '<h1>Ink Editor</h1><p>A lightweight document editor with an outline rail, grouped toolbar, and slash commands.</p><ul><li><b>Lightweight</b> — tiny footprint. Fast to load, faster to type.</li><li><b>Extensible</b> — plug in AI, comments, track changes, and more.</li><li><b>Developer Friendly</b> — typed React API. CSS themes. Bring your own LLM.</li></ul><blockquote class="Ink-callout"><p>Write less configuration. Ship more product.</p></blockquote><h2>Overview</h2><p>Type <b>/</b> to insert a block. The outline on the left follows headings as you write.</p><h2>Core features</h2><p>Status bar shows words, characters, line, and column. Ask Ink AI sits on the toolbar.</p><h3>Getting started</h3><p>This Lab uses the document variant so the chrome matches the product editor.</p>';

export const LAB_NOTES_HTML =
  '<h1>Notes</h1><p>A second document for paying plans. Draft side notes without leaving the editor.</p><h2>Ideas</h2><p>Keep research, outlines, and snippets next to the main piece.</p>';

export const LAB_INITIAL_STATE: LabPageState = {
  activeId: LAB_DOC_DESIGN,
  docs: {
    design: LAB_EDITOR_HTML,
    notes: LAB_NOTES_HTML,
  },
};

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

export const LAB_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'bulletList',
  'orderedList',
  'checklist' as ToolbarOption,
  'blockquote',
  'divider',
  'image',
  'link',
  'table',
  'code',
  'divider',
  'undo',
  'redo',
  'ai',
];

export const LAB_SHARE_TITLE = 'Ink Editor';
export const LAB_SHARE_PDF = 'pdf';
export const LAB_SHARE_WORD = 'word';
export const LAB_SHARE_HTML = 'html';
export const LAB_SHARE_MARKDOWN = 'markdown';
export const LAB_SHARE_TEXT = 'text';
export const LAB_SHARE_PRINT = 'print';
export const LAB_SHARE_MENU_MIN_WIDTH = 180;
export const LAB_FILE_HTML = 'ink-editor.html';
export const LAB_FILE_DOC = 'ink-editor.doc';
export const LAB_FILE_MD = 'ink-editor.md';
export const LAB_FILE_TXT = 'ink-editor.txt';
export const LAB_MIME_HTML = 'text/html;charset=utf-8';
export const LAB_MIME_WORD = 'application/msword;charset=utf-8';
export const LAB_MIME_MARKDOWN = 'text/markdown;charset=utf-8';
export const LAB_MIME_TEXT = 'text/plain;charset=utf-8';
export const LAB_PRINT_CLEANUP_MS = 1200;
export const LAB_TAG_PATTERN = /<[^>]+>/g;
export const LAB_BR_PATTERN = /<br\s*\/?>/gi;
export const LAB_BLOCK_CLOSE_PATTERN = /<\/(p|h1|h2|h3|li|div|blockquote)>/gi;
export const LAB_BOLD_PATTERN = /<\/?(strong|b)>/gi;
export const LAB_ITALIC_PATTERN = /<\/?(em|i)>/gi;
export const LAB_HEADING_OPEN_PATTERN = /<h([1-3])>/gi;
export const LAB_HEADING_CLOSE_PATTERN = /<\/h[1-3]>/gi;
export const LAB_LI_PATTERN = /<li>/gi;
export const LAB_MULTI_NL_PATTERN = /\n{3,}/g;

export { PORTAL_OPENAI_KEY as LAB_OPENAI_KEY, PORTAL_OPENAI_PROXY_BASE_URL as LAB_OPENAI_PROXY_BASE_URL } from '@/ai/index';
