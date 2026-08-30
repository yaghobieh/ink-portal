export type CmsChatRole = 'user' | 'assistant';

export type CmsChatMessage = {
  id: string;
  role: CmsChatRole;
  text: string;
};

export type CmsChatCompleteResult = {
  ok: boolean;
  text: string;
  status: number;
};

export type CmsChatProps = {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  side: 'left' | 'right';
  crewAvailable: boolean;
  onOpenCrew: () => void;
};
