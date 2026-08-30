import type { ToolbarOption } from '@forgedevstack/ink';
import type { LabDocId, LabPageState } from './Lab.types';

export const LAB_DOC_DESIGN: LabDocId = 'design';
export const LAB_DOC_NOTES: LabDocId = 'notes';

export const LAB_EDITOR_HTML =
  '<h1>Ink 1.1.8 Lab</h1><p>Select a phrase and press Link. Then try Titles, Sheet, and Graph from the toolbar. Right-click a graph to edit it.</p><ul><li><b>Link</b> — mark text, insert a URL, the selection stays wrapped.</li><li><b>Titles</b> — pick a style from the gallery.</li><li><b>Sheet</b> — fill the grid or import CSV, then insert.</li><li><b>Graph</b> — choose bar, line, or pie. Right-click to edit.</li></ul><p class="Ink-graph-block" data-ink-graph="bar" data-ink-graph-points="%5B%7B%22label%22%3A%22A%22%2C%22value%22%3A40%7D%2C%7B%22label%22%3A%22B%22%2C%22value%22%3A70%7D%2C%7B%22label%22%3A%22C%22%2C%22value%22%3A55%7D%2C%7B%22label%22%3A%22D%22%2C%22value%22%3A90%7D%5D"><svg class="Ink-graph" viewBox="0 0 320 180" width="320" height="180"><rect x="24" y="97.33" width="62" height="58.67" fill="#0E8A6E" rx="2"/><text x="55" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">A</text><rect x="94" y="53.33" width="62" height="102.67" fill="#0E8A6E" rx="2"/><text x="125" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">B</text><rect x="164" y="75.33" width="62" height="80.67" fill="#0E8A6E" rx="2"/><text x="195" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">C</text><rect x="234" y="24" width="62" height="132" fill="#0E8A6E" rx="2"/><text x="265" y="174" text-anchor="middle" font-size="10" fill="#5C5E56">D</text></svg></p><table class="Ink-table"><colgroup><col><col><col></colgroup><thead><tr><th contenteditable="true">Feature</th><th contenteditable="true">Ticket</th><th contenteditable="true">Try</th></tr></thead><tbody><tr><td contenteditable="true">HTML source</td><td contenteditable="true">INK-71</td><td contenteditable="true">Toolbar HTML</td></tr><tr><td contenteditable="true">Table picker</td><td contenteditable="true">INK-72</td><td contenteditable="true">Hover grid</td></tr><tr><td contenteditable="true">Link selection</td><td contenteditable="true">INK-71</td><td contenteditable="true">Mark then link</td></tr><tr><td contenteditable="true">Titles</td><td contenteditable="true">INK-71</td><td contenteditable="true">Gallery</td></tr><tr><td contenteditable="true">Sheet</td><td contenteditable="true">INK-71</td><td contenteditable="true">Grid or CSV</td></tr><tr><td contenteditable="true">Graph</td><td contenteditable="true">INK-71</td><td contenteditable="true">Right-click to edit</td></tr></tbody></table><p><br></p>';

export const LAB_NOTES_HTML =
  '<h1>Notes</h1><p>Second document for paying plans. Draft side notes without leaving the editor.</p><h2>Ideas</h2><p>Keep research, outlines, and snippets next to the main piece.</p>';

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
  htmlSource: true,
  titles: true,
  excel: true,
  graph: true,
  outline: true,
  fullscreen: true,
  theme: true,
} as const;

export const LAB_TOOLBAR: ToolbarOption[] = [
  'headingDropdown',
  'fontDropdown',
  'divider',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'divider',
  'listDropdown',
  'divider',
  'link',
  'image',
  'table',
  'titles',
  'excel',
  'graph',
  'outline',
  'theme',
  'fullscreen',
  'htmlSource',
  'code',
  'divider',
  'undo',
  'redo',
  'divider',
  'trackChanges',
  'comments',
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
