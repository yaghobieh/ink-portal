import type { FC } from 'react';
import { Button, Flex, Typography } from '@forgedevstack/bear';
import { NUMBER_ONE } from '@const/numbers.const';
import { ROUTES } from '@const/routes.const';
import { useI18n } from '@i18n/index';
import { communityLabel } from '@utils';
import { CMS_ONBOARDING_COMMUNITY, CMS_ONBOARDING_STEPS } from './CmsOnboarding.const';
import type { CmsOnboardingProps } from './CmsOnboarding.types';
import { OnboardingStepRow } from './helpers/OnboardingStepRow';

export const CmsOnboarding: FC<CmsOnboardingProps> = (props) => {
  const { onSkip, onStep } = props;
  const { t } = useI18n();

  return (
    <div className="ink-cms-onboarding">
      <Flex direction="column" gap={4} className="ink-cms-onboarding__main">
        <div>
          <Typography variant="h1" className="ink-cms-onboarding__title mb-2">
            {t.cmsOnboarding.title}
          </Typography>
          <Typography variant="body1" className="ink-cms__muted mb-0">
            {t.cmsOnboarding.body}
          </Typography>
        </div>
        <Typography variant="h4" className="ink-cms-onboarding__steps-title mb-0">
          {t.cmsOnboarding.stepsTitle}
        </Typography>
        <ol className="ink-cms-onboarding__steps">
          {CMS_ONBOARDING_STEPS.map((step) => (
            <OnboardingStepRow
              key={step.id}
              id={step.id}
              navId={step.navId}
              title={t.cmsOnboarding[step.titleKey]}
              kind={step.kind}
              ctaLabel={t.cmsOnboarding.step1Cta}
              body={t.cmsOnboarding.step2Body}
              active={step.id === NUMBER_ONE}
              onStep={onStep}
            />
          ))}
        </ol>
      </Flex>
      <aside className="ink-cms-onboarding__community">
        <Typography variant="h4" className="mb-2">
          {t.cmsOnboarding.joinCommunity}
        </Typography>
        <a className="ink-cms-onboarding__roadmap" href={ROUTES.CHANGELOG}>
          {t.cmsOnboarding.seeRoadmap}
        </a>
        <div className="ink-cms-onboarding__grid">
          {CMS_ONBOARDING_COMMUNITY.map((item) => (
            <a
              key={item.id}
              className="ink-cms-onboarding__social"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {communityLabel(item.id, t.cmsOnboarding)}
            </a>
          ))}
        </div>
      </aside>
      <Button variant="outline" className="ink-cms-onboarding__skip" onClick={onSkip}>
        {t.cmsOnboarding.skipTour}
      </Button>
    </div>
  );
};
