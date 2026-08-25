import { useState, type FC } from 'react';
import { Avatar, Button, Card, Chip, Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_CHAT_SIDE_LEFT } from '@const/index';
import {
  AGENT_AVATAR_INITIALS,
  AGENT_BUBBLE_CLASS,
  AGENT_DOCK_CLASS,
  AGENT_DOCK_LEFT_CLASS,
  AGENT_PANEL_CLASS,
  AGENT_SUGGESTION_IDS,
  AGENT_TEMPLATE_IDS,
} from '../cmsAgent.const';
import type { CmsAgentDockProps } from '../cmsAgent.types';

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

export const CmsAgentDock: FC<CmsAgentDockProps> = (props) => {
  const { side, onApply, onCreate } = props;
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const dockClass = side === CMS_CHAT_SIDE_LEFT ? AGENT_DOCK_LEFT_CLASS : AGENT_DOCK_CLASS;
  return (
    <div className={dockClass}>
      {open ? (
        <Card className={AGENT_PANEL_CLASS}>
          <Flex direction="column" gap={2}>
            <Flex align="center" gap={2}>
              <Avatar initials={AGENT_AVATAR_INITIALS} size="sm" variant="circle" />
              <Typography variant="body2" className="mb-0 font-medium">
                {t.cmsShell.agentName}
              </Typography>
            </Flex>
            <Typography variant="caption" className="ink-cms__muted mb-0">
              {t.cmsShell.agentCreateHint}
            </Typography>
            <Flex gap={1} className="flex-wrap">
              {AGENT_SUGGESTION_IDS.map((id) => (
                <Chip key={id} size="sm" onClick={() => onApply(id)}>
                  {suggestionLabel(id, t)}
                </Chip>
              ))}
            </Flex>
            <Button size="sm" variant="ink" onClick={onCreate}>
              {t.dashboard.newPage}
            </Button>
          </Flex>
        </Card>
      ) : null}
      <button
        type="button"
        className={AGENT_BUBBLE_CLASS}
        aria-label={t.cmsShell.agentName}
        onClick={() => setOpen((current) => !current)}
      >
        {AGENT_AVATAR_INITIALS}
      </button>
    </div>
  );
};
