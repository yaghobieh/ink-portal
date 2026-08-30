export type ContentRowActionsProps = {
  id: string;
  openLabel: string;
  moreLabel: string;
  stageLabel: string;
  onOpen: (id: string) => void;
  onStage: (id: string) => void;
};
