import { EMPTY_STRING } from '@const/strings.const';
import {
  LAB_BLOCK_CLOSE_PATTERN,
  LAB_BOLD_PATTERN,
  LAB_BR_PATTERN,
  LAB_FILE_DOC,
  LAB_FILE_HTML,
  LAB_FILE_MD,
  LAB_FILE_TXT,
  LAB_HEADING_CLOSE_PATTERN,
  LAB_HEADING_OPEN_PATTERN,
  LAB_ITALIC_PATTERN,
  LAB_LI_PATTERN,
  LAB_MIME_HTML,
  LAB_MIME_MARKDOWN,
  LAB_MIME_TEXT,
  LAB_MIME_WORD,
  LAB_MULTI_NL_PATTERN,
  LAB_PRINT_CLEANUP_MS,
  LAB_SHARE_TITLE,
  LAB_TAG_PATTERN,
} from './Lab.const';

const downloadBlob = (filename: string, mime: string, body: string): void => {
  const blob = new Blob([body], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const wrapHtmlDocument = (html: string): string =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${LAB_SHARE_TITLE}</title></head><body>${html}</body></html>`;

export const htmlToPlainText = (html: string): string =>
  html
    .replace(LAB_BR_PATTERN, '\n')
    .replace(LAB_BLOCK_CLOSE_PATTERN, '\n')
    .replace(LAB_TAG_PATTERN, EMPTY_STRING)
    .replace(LAB_MULTI_NL_PATTERN, '\n\n')
    .trim();

export const htmlToMarkdown = (html: string): string =>
  html
    .replace(LAB_BR_PATTERN, '\n')
    .replace(LAB_HEADING_OPEN_PATTERN, (_, level: string) => `${'#'.repeat(Number(level))} `)
    .replace(LAB_HEADING_CLOSE_PATTERN, '\n\n')
    .replace(LAB_BOLD_PATTERN, '**')
    .replace(LAB_ITALIC_PATTERN, '_')
    .replace(LAB_LI_PATTERN, '- ')
    .replace(LAB_BLOCK_CLOSE_PATTERN, '\n\n')
    .replace(LAB_TAG_PATTERN, EMPTY_STRING)
    .replace(LAB_MULTI_NL_PATTERN, '\n\n')
    .trim();

export const downloadHtml = (html: string): void => {
  downloadBlob(LAB_FILE_HTML, LAB_MIME_HTML, wrapHtmlDocument(html));
};

export const downloadWord = (html: string): void => {
  downloadBlob(LAB_FILE_DOC, LAB_MIME_WORD, wrapHtmlDocument(html));
};

export const downloadMarkdown = (html: string): void => {
  downloadBlob(LAB_FILE_MD, LAB_MIME_MARKDOWN, htmlToMarkdown(html));
};

export const downloadText = (html: string): void => {
  downloadBlob(LAB_FILE_TXT, LAB_MIME_TEXT, htmlToPlainText(html));
};

export const printHtml = (html: string): void => {
  const frame = document.createElement('iframe');
  frame.setAttribute('aria-hidden', 'true');
  frame.style.position = 'fixed';
  frame.style.right = '0';
  frame.style.bottom = '0';
  frame.style.width = '0';
  frame.style.height = '0';
  frame.style.border = '0';
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  if (!doc) {
    frame.remove();
    return;
  }
  doc.open();
  doc.write(wrapHtmlDocument(html));
  doc.close();
  frame.contentWindow?.focus();
  frame.contentWindow?.print();
  window.setTimeout(() => frame.remove(), LAB_PRINT_CLEANUP_MS);
};
