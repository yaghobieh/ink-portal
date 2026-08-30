import { CMS_CHAT_HISTORY_LIMIT } from '@const/numbers.const';
import { AI_CAPABILITY_CHAT, AI_COMPLETE_PATH, EMPTY_STRING } from '@const/strings.const';

export { CMS_CHAT_HISTORY_LIMIT, AI_CAPABILITY_CHAT, AI_COMPLETE_PATH };

export const CMS_CHAT_INPUT_ID = 'ink-cms-chat-input';
export const CMS_CHAT_EMPTY = EMPTY_STRING;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_IMPLEMENTED = 501;

export const CMS_CHAT_PROMPT_IDS = {
  CREATE_PAGE: 'create-page',
  TEMPLATE: 'template',
  THEME: 'theme',
} as const;

export const CMS_CHAT_PROMPTS = [
  CMS_CHAT_PROMPT_IDS.CREATE_PAGE,
  CMS_CHAT_PROMPT_IDS.TEMPLATE,
  CMS_CHAT_PROMPT_IDS.THEME,
] as const;
