import {
  createInkServerAiProvider,
  createOpenAiProvider,
  inkAi,
  INK_AI_DEMO_PROVIDER_ID,
  INK_AI_INK_SERVER_PROVIDER_ID,
  INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
  INK_AI_OPENAI_PROVIDER_ID,
} from '@forgedevstack/ink';
import { AUTH_TOKEN_STORAGE_KEY } from '@hooks/auth.const';
import { INK_API_URL } from '@const/billing.const';
import { PORTAL_OPENAI_KEY, PORTAL_OPENAI_PROXY_BASE_URL } from './portalAi.const';

let registered = false;

export const resolvePortalAiProviderId = (): string => {
  if (INK_API_URL) return INK_AI_INK_SERVER_PROVIDER_ID;
  if (PORTAL_OPENAI_KEY) return INK_AI_OPENAI_PROVIDER_ID;
  return INK_AI_DEMO_PROVIDER_ID;
};

export const registerPortalAiProviders = (): void => {
  if (registered) return;
  registered = true;

  if (PORTAL_OPENAI_KEY) {
    inkAi.registerProvider(
      createOpenAiProvider({
        apiKey: PORTAL_OPENAI_KEY,
        modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
        baseUrl: PORTAL_OPENAI_PROXY_BASE_URL,
      }),
    );
  }

  if (INK_API_URL) {
    inkAi.registerProvider(
      createInkServerAiProvider({
        apiUrl: INK_API_URL,
        getToken: () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY),
        modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
      }),
    );
  }
};
