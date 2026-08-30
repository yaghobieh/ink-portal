export type CmsOnboardingProps = {
  onSkip: () => void;
  onStep: (navId: string) => void;
};

export type CmsOnboardingCommunityId = 'github' | 'discord' | 'x' | 'youtube' | 'linkedin';

export type CmsOnboardingStepKind = 'cta' | 'body' | 'none';

export type OnboardingStepRowProps = {
  id: number;
  navId: string;
  title: string;
  kind: CmsOnboardingStepKind;
  ctaLabel: string;
  body: string;
  active: boolean;
  onStep: (navId: string) => void;
};
