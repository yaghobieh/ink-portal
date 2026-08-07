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
import { LAB_OPENAI_KEY, LAB_OPENAI_PROXY_BASE_URL } from './Lab.const';

let registered = false;

export const resolveLabAiProviderId = (): string => {
  if (LAB_OPENAI_KEY) return INK_AI_OPENAI_PROVIDER_ID;
  if (INK_API_URL) return INK_AI_INK_SERVER_PROVIDER_ID;
  return INK_AI_DEMO_PROVIDER_ID;
};

export const registerLabAiProviders = (): void => {
  if (registered) return;
  registered = true;

  if (LAB_OPENAI_KEY) {
    inkAi.registerProvider(
      createOpenAiProvider({
        apiKey: LAB_OPENAI_KEY,
        modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
        baseUrl: LAB_OPENAI_PROXY_BASE_URL,
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
