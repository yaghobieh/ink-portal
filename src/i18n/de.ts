import { en } from './en';
import type { Messages } from './types';

export const de: Messages = {
  ...en,
  cmsShell: {
    ...en.cmsShell,
    online: 'Online',
    crewChat: 'Team-Chat',
    newRoom: 'Neuer Raum',
    chatWith: 'Chat',
    addToRoom: 'Zum Raum hinzufügen',
    settings: 'Einstellungen',
  },
  cmsTasks: {
    ...en.cmsTasks,
    title: 'Aufgabenboard',
    add: 'Neue Aufgabe',
    todo: 'Zu tun',
    inProgress: 'In Arbeit',
    decline: 'Abgelehnt',
    inReview: 'In Prüfung',
    done: 'Fertig',
    issueTitle: 'Vorgang',
    saveIssue: 'Vorgang speichern',
    boardSettings: 'Board-Einstellungen',
  },
  settings: {
    ...en.settings,
    locale: 'Sprache',
    localeEn: 'Englisch',
    localeEs: 'Spanisch',
    localeHe: 'Hebräisch',
    localeFr: 'Französisch',
    localeDe: 'Deutsch',
    notifyTitle: 'Benachrichtigungen',
    notifyInApp: 'In-App-Hinweise',
    notifyEmail: 'E-Mail-Hinweise',
    themeLooks: 'Farbvorlagen',
  },
};
