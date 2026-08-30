export type HomeAiFeatureKey =
  | 'aiAutocompleteTitle'
  | 'aiGenerateTitle'
  | 'aiHostedTitle'
  | 'aiByoTitle';

export type HomeAiFeatureBodyKey =
  | 'aiAutocompleteBody'
  | 'aiGenerateBody'
  | 'aiHostedBody'
  | 'aiByoBody';

export type HeroEditorCopy = {
  title: string;
  lead: string;
  toolbarLabel: string;
  toolbarBody: string;
  slashLabel: string;
  slashBody: string;
  outlineLabel: string;
  outlineBody: string;
  callout: string;
  whatsNewTitle: string;
  whatsNewBody: string;
  aiTitle: string;
  aiBody: string;
};
