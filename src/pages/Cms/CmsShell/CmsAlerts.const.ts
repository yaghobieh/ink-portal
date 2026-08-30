import { ROUTES } from '@const/routes.const';
import {
  CMS_ALERT_FILTER_ALL,
  CMS_ALERT_FILTER_SEEN,
  CMS_ALERT_FILTER_UNSEEN,
} from '@const/strings.const';
import type { CmsAlertDef, CmsAlertFilter, CmsAlertId } from './CmsAlerts.types';

export const CMS_ALERT_IDS = {
  DOCUMENT: 'alert-document',
  TOOLBAR: 'alert-toolbar',
  CALENDAR: 'alert-calendar',
  BUILDER: 'alert-builder',
} as const satisfies Record<string, CmsAlertId>;

export const CMS_ALERTS: CmsAlertDef[] = [
  { id: CMS_ALERT_IDS.DOCUMENT, href: ROUTES.CMS_TEMPLATES, severity: 'warning' },
  { id: CMS_ALERT_IDS.TOOLBAR, href: ROUTES.CMS_CONTENT, severity: 'info' },
  { id: CMS_ALERT_IDS.CALENDAR, href: ROUTES.CMS_CALENDAR, severity: 'info' },
  { id: CMS_ALERT_IDS.BUILDER, href: ROUTES.CMS_BUILDER, severity: 'success' },
];

export const CMS_ALERT_FILTERS = {
  ALL: CMS_ALERT_FILTER_ALL,
  UNSEEN: CMS_ALERT_FILTER_UNSEEN,
  SEEN: CMS_ALERT_FILTER_SEEN,
} as const satisfies Record<string, CmsAlertFilter>;
