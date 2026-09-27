export type DemoCardId =
  | 'featureRich'
  | 'ai'
  | 'collab'
  | 'document'
  | 'tables'
  | 'markdown'
  | 'playground'
  | 'mobile';

export interface DemoCard {
  id: DemoCardId;
  href: string;
}
