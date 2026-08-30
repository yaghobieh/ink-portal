import { NUMBER_ONE, NUMBER_THREE, NUMBER_TWO } from '@const/numbers.const';
import {
  DISCORD_COMMUNITY_URL,
  GITHUB_URL,
  LINKEDIN_COMMUNITY_URL,
  X_COMMUNITY_URL,
  YOUTUBE_COMMUNITY_URL,
} from '@const/urls.const';
import { CMS_NAV_IDS } from '@pages/Cms/CmsShell/CmsShell.const';
import type { Messages } from '@i18n/types';
import type { CmsOnboardingCommunityId } from './CmsOnboarding.types';

export const CMS_ONBOARDING_STEPS = [
  { id: NUMBER_ONE, navId: CMS_NAV_IDS.BUILDER, titleKey: 'step1Title', kind: 'cta' },
  { id: NUMBER_TWO, navId: CMS_NAV_IDS.CONTENT, titleKey: 'step2Title', kind: 'body' },
  { id: NUMBER_THREE, navId: CMS_NAV_IDS.LIVE_EDIT, titleKey: 'step3Title', kind: 'none' },
] as const;

export const CMS_ONBOARDING_COMMUNITY = [
  { id: 'github', href: GITHUB_URL },
  { id: 'discord', href: DISCORD_COMMUNITY_URL },
  { id: 'x', href: X_COMMUNITY_URL },
  { id: 'youtube', href: YOUTUBE_COMMUNITY_URL },
  { id: 'linkedin', href: LINKEDIN_COMMUNITY_URL },
] as const;

export const CMS_ONBOARDING_COMMUNITY_LABEL: Record<
  CmsOnboardingCommunityId,
  keyof Messages['cmsOnboarding']
> = {
  github: 'github',
  discord: 'discord',
  x: 'x',
  youtube: 'youtube',
  linkedin: 'linkedin',
};

export const CMS_ONBOARDING_STEP_CTA = 'cta';
export const CMS_ONBOARDING_STEP_BODY = 'body';
export const CMS_ONBOARDING_ACTIVE_CLASS = 'ink-cms-onboarding__step--active';
