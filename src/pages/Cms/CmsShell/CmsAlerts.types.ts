export type CmsAlertSeverity = 'success' | 'info' | 'warning' | 'error';

export type CmsAlertId = 'alert-document' | 'alert-toolbar' | 'alert-calendar' | 'alert-builder';

export type CmsAlertFilter = 'all' | 'unseen' | 'seen';

export type CmsAlertDef = {
  id: CmsAlertId;
  href: string;
  severity: CmsAlertSeverity;
};
