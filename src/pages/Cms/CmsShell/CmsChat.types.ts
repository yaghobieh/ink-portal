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
