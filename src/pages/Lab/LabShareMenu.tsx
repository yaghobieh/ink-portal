import type { FC } from 'react';
import { Button, Dropdown } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import {
  LAB_SHARE_HTML,
  LAB_SHARE_MARKDOWN,
  LAB_SHARE_MENU_MIN_WIDTH,
  LAB_SHARE_PDF,
  LAB_SHARE_PRINT,
  LAB_SHARE_TEXT,
  LAB_SHARE_WORD,
} from './Lab.const';
import type { LabShareMenuProps } from './LabShareMenu.types';
import {
  downloadHtml,
  downloadMarkdown,
  downloadText,
  downloadWord,
  printHtml,
} from './Lab.utils';

export const LabShareMenu: FC<LabShareMenuProps> = (props) => {
  const { html } = props;
  const { t } = useI18n();

  return (
    <Dropdown
      placement="bottom-end"
      minWidth={LAB_SHARE_MENU_MIN_WIDTH}
      trigger={
        <Button size="sm" variant="outline">
          {t.lab.share}
        </Button>
      }
      items={[
        {
          key: LAB_SHARE_PDF,
          label: t.lab.sharePdf,
          onClick: () => printHtml(html),
        },
        {
          key: LAB_SHARE_WORD,
          label: t.lab.shareWord,
          onClick: () => downloadWord(html),
        },
        {
          key: LAB_SHARE_HTML,
          label: t.lab.shareHtml,
          onClick: () => downloadHtml(html),
        },
        {
          key: LAB_SHARE_MARKDOWN,
          label: t.lab.shareMarkdown,
          onClick: () => downloadMarkdown(html),
        },
        {
          key: LAB_SHARE_TEXT,
          label: t.lab.shareText,
          onClick: () => downloadText(html),
        },
        {
          key: LAB_SHARE_PRINT,
          label: t.lab.sharePrint,
          onClick: () => printHtml(html),
        },
      ]}
    />
  );
};
