import { CMS_ALERTS_SEEN_KEY } from '@const/strings.const';
import { CMS_ALERTS, CMS_ALERT_FILTERS } from './CmsAlerts.const';
import type { CmsAlertDef, CmsAlertFilter, CmsAlertId } from './CmsAlerts.types';

export const loadSeenAlertIds = (): Set<CmsAlertId> => {
  try {
    const raw = localStorage.getItem(CMS_ALERTS_SEEN_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is CmsAlertId => typeof id === 'string'));
  } catch {
    return new Set();
  }
};

export const saveSeenAlertIds = (ids: Set<CmsAlertId>): void => {
  localStorage.setItem(CMS_ALERTS_SEEN_KEY, JSON.stringify([...ids]));
};

export const filterAlerts = (
  alerts: CmsAlertDef[],
  seen: Set<CmsAlertId>,
  filter: CmsAlertFilter,
): CmsAlertDef[] => {
  if (filter === CMS_ALERT_FILTERS.UNSEEN) {
    return alerts.filter((alert) => !seen.has(alert.id));
  }
  if (filter === CMS_ALERT_FILTERS.SEEN) {
    return alerts.filter((alert) => seen.has(alert.id));
  }
  return alerts;
};

export const unseenAlertCount = (seen: Set<CmsAlertId>): number =>
  CMS_ALERTS.filter((alert) => !seen.has(alert.id)).length;
