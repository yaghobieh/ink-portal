import { INK_AI_OPENAI_MODEL_GPT_4_1_MINI } from '@forgedevstack/ink';
import { resolvePortalAiProviderId } from './registerPortalAi';

export const cmsInkAiProps = () => ({
  enabled: true,
  placement: 'sidebar' as const,
  autocomplete: true,
  providerId: resolvePortalAiProviderId(),
  modelId: INK_AI_OPENAI_MODEL_GPT_4_1_MINI,
});
