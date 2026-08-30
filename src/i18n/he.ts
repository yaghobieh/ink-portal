import { en } from './en';
import type { Messages } from './types';

export const he: Messages = {
  ...en,
  brand: 'Ink',
  cmsShell: {
    ...en.cmsShell,
    online: 'מחוברים',
    crewChat: 'צ׳אט צוות',
    newRoom: 'חדר חדש',
    chatWith: 'צ׳אט',
    addToRoom: 'הוסף לחדר',
    settings: 'הגדרות',
  },
  cmsTasks: {
    ...en.cmsTasks,
    title: 'לוח משימות',
    add: 'משימה חדשה',
    todo: 'לביצוע',
    inProgress: 'בתהליך',
    decline: 'נדחה',
    inReview: 'בסקירה',
    done: 'הושלם',
    issueTitle: 'פנייה',
    saveIssue: 'שמור פנייה',
    boardSettings: 'הגדרות לוח',
  },
  settings: {
    ...en.settings,
    locale: 'שפה',
    localeEn: 'אנגלית',
    localeEs: 'ספרדית',
    localeHe: 'עברית',
    localeFr: 'צרפתית',
    localeDe: 'גרמנית',
    notifyTitle: 'התראות',
    notifyInApp: 'התראות באפליקציה',
    notifyEmail: 'התראות במייל',
    themeLooks: 'תבניות צבע',
  },
};
