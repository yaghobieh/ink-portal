import type { FC } from 'react';
import { Badge, Flex } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_CHAT_SIDE_LEFT } from '@const/index';
import { NUMBER_ZERO } from '@const/numbers.const';
import {
  AGENT_BUBBLE_CLASS,
  AGENT_DOCK_CLASS,
  AGENT_DOCK_LEFT_CLASS,
} from '../cmsAgent.const';
import type { CmsAgentDockProps } from '../cmsAgent.types';

export const CmsAgentDock: FC<CmsAgentDockProps> = (props) => {
  const { side, onOpenAi, onOpenCrew, crewUnread, crewOpen, crewPanel } = props;
  const { t } = useI18n();
  const dockClass = side === CMS_CHAT_SIDE_LEFT ? AGENT_DOCK_LEFT_CLASS : AGENT_DOCK_CLASS;
  const dockAlign = side === CMS_CHAT_SIDE_LEFT ? 'start' : 'end';
  return (
    <div className={dockClass}>
      <Flex direction="column" gap={2} align={dockAlign}>
        <button
          type="button"
          className={`${AGENT_BUBBLE_CLASS} ink-cms__agent-bubble--ai`}
          aria-label={t.cmsShell.dockAi}
          onClick={onOpenAi}
        >
          {t.cmsShell.dockAi}
        </button>
        <span className="ink-cms__agent-chat-wrap">
          {crewOpen && crewPanel}
          <button
            type="button"
            className={`${AGENT_BUBBLE_CLASS} ink-cms__agent-bubble--chat`}
            aria-label={t.cmsShell.dockChat}
            onClick={onOpenCrew}
          >
            {t.cmsShell.dockChat}
          </button>
          {crewUnread > NUMBER_ZERO && (
            <Badge variant="error" className="ink-cms__agent-chat-badge text-xs">
              {crewUnread}
            </Badge>
          )}
        </span>
      </Flex>
    </div>
  );
};
