import type { FC } from 'react';
import { CmsShell, CMS_NAV_IDS } from '../CmsShell';
import { SensorsView } from '@pages/Sensors';

export const DatabasePages: FC = () => (
  <CmsShell activeNavId={CMS_NAV_IDS.DATABASE}>
    <SensorsView embedded />
  </CmsShell>
);
