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

export interface HomeAiFeature {
  id: string;
  titleKey: HomeAiFeatureKey;
  bodyKey: HomeAiFeatureBodyKey;
}
