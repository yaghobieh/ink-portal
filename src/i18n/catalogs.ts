import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { he } from './he';
import type { Locale, Messages } from './types';

export const I18N_CATALOGS: Record<Locale, Messages> = { en, es, he, fr, de };
