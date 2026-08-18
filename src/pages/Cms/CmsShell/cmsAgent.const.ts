export const AGENT_TEMPLATE_IDS = {
  LANDING: 'landing-hero',
  DOCS: 'docs-article',
  BLANK: 'blank-canvas',
} as const;

export const AGENT_SUGGESTION_IDS = [
  AGENT_TEMPLATE_IDS.LANDING,
  AGENT_TEMPLATE_IDS.DOCS,
  AGENT_TEMPLATE_IDS.BLANK,
] as const;

export const AGENT_BAR_CLASS = 'ink-cms__agent-bar';
export const AGENT_BAR_COPY_CLASS = 'ink-cms__agent-bar-copy';
export const AGENT_DOCK_CLASS = 'ink-cms__agent-dock';
export const AGENT_DOCK_LEFT_CLASS = 'ink-cms__agent-dock ink-cms__agent-dock--left';
export const AGENT_BUBBLE_CLASS = 'ink-cms__agent-bubble';
export const AGENT_PANEL_CLASS = 'ink-cms__agent-panel';
export const AGENT_AVATAR_INITIALS = 'AI';
export const BOTTOM_NAV_SHOW_LABELS = 'always' as const;
export const USER_MENU_MIN_WIDTH = 220;
