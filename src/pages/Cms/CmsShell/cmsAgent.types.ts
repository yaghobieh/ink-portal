export type CmsAgentApplyDetail = {
  templateId: string;
};

export type CmsAgentBarProps = {
  onApply: (templateId: string) => void;
};

export type CmsAgentDockProps = {
  side: 'left' | 'right';
  onApply: (templateId: string) => void;
  onCreate: () => void;
};
