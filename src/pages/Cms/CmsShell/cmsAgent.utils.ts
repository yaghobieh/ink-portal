import { CMS_AGENT_APPLY_EVENT } from '@const/index';
import type { CmsAgentApplyDetail } from './cmsAgent.types';

export const dispatchAgentApply = (templateId: string): void => {
  const detail: CmsAgentApplyDetail = { templateId };
  window.dispatchEvent(new CustomEvent(CMS_AGENT_APPLY_EVENT, { detail }));
};

export const isAgentApplyEvent = (
  event: Event,
): event is CustomEvent<CmsAgentApplyDetail> =>
  event instanceof CustomEvent && typeof event.detail?.templateId === 'string';
