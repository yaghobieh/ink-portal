import type { Messages } from '@i18n/types';
import type { CmsOnboardingCommunityId } from '@pages/Cms/CmsOnboarding/CmsOnboarding.types';
import { CMS_ONBOARDING_COMMUNITY_LABEL } from '@pages/Cms/CmsOnboarding/CmsOnboarding.const';

export const communityLabel = (
  id: CmsOnboardingCommunityId,
  copy: Messages['cmsOnboarding'],
): string => copy[CMS_ONBOARDING_COMMUNITY_LABEL[id]];
