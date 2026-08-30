import type { FC, MouseEvent } from 'react';
import { BearIcons, Dropdown } from '@forgedevstack/bear';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { CONTENT_MORE_MENU_MIN_WIDTH } from '@pages/Cms/ContentPages/ContentPages.const';
import {
  CONTENT_ACTIONS_CLASS,
  CONTENT_ICON_BTN_CLASS,
  CONTENT_LINK_CLASS,
  CONTENT_MENU_KEY_STAGE,
  CONTENT_MENU_PLACEMENT,
} from './ContentRowActions.const';
import type { ContentRowActionsProps } from './ContentRowActions.types';

export const ContentRowActions: FC<ContentRowActionsProps> = (props) => {
  const { id, openLabel, moreLabel, stageLabel, onOpen, onStage } = props;
  const stopOpen = (event: MouseEvent) => {
    event.stopPropagation();
    onOpen(id);
  };
  return (
    <div className={CONTENT_ACTIONS_CLASS}>
      <button type="button" className={CONTENT_LINK_CLASS} onClick={stopOpen}>
        {openLabel}
      </button>
      <Dropdown
        placement={CONTENT_MENU_PLACEMENT}
        minWidth={CONTENT_MORE_MENU_MIN_WIDTH}
        trigger={
          <button type="button" className={CONTENT_ICON_BTN_CLASS} aria-label={moreLabel}>
            <BearIcons.MoreHorizIcon size={CMS_ICON_SIZE} />
          </button>
        }
        items={[
          {
            key: CONTENT_MENU_KEY_STAGE,
            label: stageLabel,
            onClick: () => onStage(id),
          },
        ]}
      />
    </div>
  );
};
