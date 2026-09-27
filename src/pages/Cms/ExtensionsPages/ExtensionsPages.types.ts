export type ExtensionStatus = 'available' | 'installed' | 'coming';

export type ExtensionItem = {
  id: string;
  name: string;
  description: string;
  version: string;
  tags: string[];
  status: ExtensionStatus;
};
