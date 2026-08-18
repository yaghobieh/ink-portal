import type { FC } from 'react';
import { Avatar, Chip, Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import {
  AGENT_AVATAR_INITIALS,
  AGENT_BAR_CLASS,
  AGENT_BAR_COPY_CLASS,
  AGENT_SUGGESTION_IDS,
  AGENT_TEMPLATE_IDS,
} from '../cmsAgent.const';
import type { CmsAgentBarProps } from '../cmsAgent.types';

const suggestionLabel = (
  id: string,
  t: ReturnType<typeof useI18n>['t'],
): string => {
  const labels: Record<string, string> = {
    [AGENT_TEMPLATE_IDS.LANDING]: t.cmsShell.agentSuggestLanding,
    [AGENT_TEMPLATE_IDS.DOCS]: t.cmsShell.agentSuggestDocs,
    [AGENT_TEMPLATE_IDS.BLANK]: t.cmsShell.agentSuggestBlank,
  };
  return labels[id] || id;
};

export const CmsAgentBar: FC<CmsAgentBarProps> = (props) => {
  const { onApply } = props;
  const { t } = useI18n();
  return (
    <div className={AGENT_BAR_CLASS}>
      <Avatar initials={AGENT_AVATAR_INITIALS} size="sm" variant="circle" />
      <div className={AGENT_BAR_COPY_CLASS}>
        <Typography variant="caption" className="mb-0 font-medium">
          {t.cmsShell.agentName}
        </Typography>
        <Typography variant="caption" className="ink-cms__muted mb-0">
          {t.cmsShell.agentGreeting}
        </Typography>
      </div>
      <Flex gap={1} className="flex-wrap">
        {AGENT_SUGGESTION_IDS.map((id) => (
          <Chip key={id} size="sm" onClick={() => onApply(id)}>
            {suggestionLabel(id, t)}
          </Chip>
        ))}
      </Flex>
    </div>
  );
};
