import { INK_API_URL } from '@const/billing.const';
import { CMS_CHAT_HISTORY_KEY, CONTENT_TYPE_JSON } from '@const/strings.const';
import { authHeaders } from '@sdk/modules/auth';
import {
  AI_CAPABILITY_CHAT,
  AI_COMPLETE_PATH,
  CMS_CHAT_HISTORY_LIMIT,
} from './CmsChat.const';
import type { CmsChatCompleteResult, CmsChatMessage } from './CmsChat.types';

export const loadChatHistory = (): CmsChatMessage[] => {
  try {
    const raw = localStorage.getItem(CMS_CHAT_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CmsChatMessage => {
      if (!item || typeof item !== 'object') return false;
      const row = item as CmsChatMessage;
      return typeof row.id === 'string' && typeof row.text === 'string';
    });
  } catch {
    return [];
  }
};

export const saveChatHistory = (messages: CmsChatMessage[]): void => {
  const next = messages.slice(-CMS_CHAT_HISTORY_LIMIT);
  localStorage.setItem(CMS_CHAT_HISTORY_KEY, JSON.stringify(next));
};

export const completeCmsChat = async (
  token: string,
  prompt: string,
): Promise<CmsChatCompleteResult> => {
  if (!token) {
    return { ok: false, text: '', status: 0 };
  }
  const response = await fetch(`${INK_API_URL}${AI_COMPLETE_PATH}`, {
    method: 'POST',
    headers: {
      ...authHeaders(token),
      'Content-Type': CONTENT_TYPE_JSON,
    },
    body: JSON.stringify({ prompt, capability: AI_CAPABILITY_CHAT }),
  });
  const data = (await response.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!response.ok) {
    return {
      ok: false,
      text: typeof data.error === 'string' ? data.error : '',
      status: response.status,
    };
  }
  return {
    ok: true,
    text: typeof data.text === 'string' ? data.text : '',
    status: response.status,
  };
};
