import type { FC } from 'react';
import { BearIcons, Tooltip } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { CMS_ICON_SIZE } from '@const/numbers.const';
import { CMS_HEALTH_DOT_ID } from './CmsHealthDot.const';
import { CMS_LIVE_CONNECTING, CMS_LIVE_OK } from './CmsLive.const';
import { useCmsLive } from './CmsLiveProvider';

export const CmsHealthDot: FC = () => {
  const { t } = useI18n();
  const { health } = useCmsLive();
  const tone =
    health.status === CMS_LIVE_CONNECTING
      ? 'warn'
      : health.status === CMS_LIVE_OK && health.db
        ? 'ok'
        : 'down';
  const hint =
    tone === 'ok'
      ? t.cmsShell.healthOkHint
      : tone === 'warn'
        ? t.cmsShell.healthConnectingHint
        : t.cmsShell.healthDownHint;

  return (
    <Tooltip content={hint} placement="bottom">
      <span
        id={CMS_HEALTH_DOT_ID}
        className={`ink-cms-health ink-cms-health--${tone}`}
        aria-label={hint}
      >
        <BearIcons.DatabaseIcon size={CMS_ICON_SIZE} />
      </span>
    </Tooltip>
  );
};
