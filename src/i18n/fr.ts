import { en } from './en';
import type { Messages } from './types';

export const fr: Messages = {
  ...en,
  cmsShell: {
    ...en.cmsShell,
    online: 'En ligne',
    crewChat: 'Chat d’équipe',
    newRoom: 'Nouveau salon',
    chatWith: 'Chat',
    addToRoom: 'Ajouter au salon',
    settings: 'Réglages',
  },
  cmsTasks: {
    ...en.cmsTasks,
    title: 'Tableau des tâches',
    add: 'Nouvelle tâche',
    todo: 'À faire',
    inProgress: 'En cours',
    decline: 'Refusé',
    inReview: 'En revue',
    done: 'Terminé',
    issueTitle: 'Ticket',
    saveIssue: 'Enregistrer',
    boardSettings: 'Réglages du tableau',
  },
  settings: {
    ...en.settings,
    locale: 'Langue',
    localeEn: 'Anglais',
    localeEs: 'Espagnol',
    localeHe: 'Hébreu',
    localeFr: 'Français',
    localeDe: 'Allemand',
    notifyTitle: 'Notifications',
    notifyInApp: 'Alertes dans l’app',
    notifyEmail: 'Alertes e-mail',
    themeLooks: 'Modèles de couleurs',
  },
};
