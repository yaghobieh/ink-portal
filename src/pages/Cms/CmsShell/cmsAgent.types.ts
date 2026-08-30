import type { ReactNode } from 'react';

export type CmsAgentApplyDetail = {
  templateId: string;
};

export type CmsAgentBarProps = {
  onApply: (templateId: string) => void;
};

export type CmsAgentDockProps = {
  side: 'left' | 'right';
  onOpenAi: () => void;
  onOpenCrew: () => void;
  crewUnread: number;
  crewOpen: boolean;
  crewPanel: ReactNode;
};
