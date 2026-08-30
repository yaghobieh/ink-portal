import type { BearWidgetDef } from '../ContentEdit/ContentEdit.types';
import { CUSTOM_WIDGET_ID_PREFIX, CUSTOM_WIDGETS_STORAGE_KEY } from './customWidgets.const';

const isWidget = (value: unknown): value is BearWidgetDef => {
  if (!value || typeof value !== 'object') return false;
  const entry = value as BearWidgetDef;
  return (
    typeof entry.id === 'string' &&
    typeof entry.label === 'string' &&
    typeof entry.bearComponent === 'string' &&
    typeof entry.html === 'string'
  );
};

export const loadCustomWidgets = (): BearWidgetDef[] => {
  try {
    const raw = localStorage.getItem(CUSTOM_WIDGETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isWidget);
  } catch {
    return [];
  }
};

export const saveCustomWidgets = (widgets: BearWidgetDef[]): void => {
  localStorage.setItem(CUSTOM_WIDGETS_STORAGE_KEY, JSON.stringify(widgets));
};

export const createCustomWidget = (label: string, html: string): BearWidgetDef => ({
  id: `${CUSTOM_WIDGET_ID_PREFIX}${Date.now()}`,
  label,
  bearComponent: 'Custom',
  html,
});
