import type { LabPageState } from './Lab.types';

export const LAB_EDITOR_HTML =
  '<h1>Lab</h1><p>Private sandbox for trying Ink features before they land in docs. Pause while typing for OpenAI ghost autocomplete (Tab to accept). Open the AI toolbar button for chat, rewrite, and suggestions.</p>';

export const LAB_INITIAL_STATE: LabPageState = {
  value: LAB_EDITOR_HTML,
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

export { PORTAL_OPENAI_KEY as LAB_OPENAI_KEY, PORTAL_OPENAI_PROXY_BASE_URL as LAB_OPENAI_PROXY_BASE_URL } from '@/ai/index';
