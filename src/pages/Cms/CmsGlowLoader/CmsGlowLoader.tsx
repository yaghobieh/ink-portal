import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { BIFROST_GLOW_SIZE_PX, BIFROST_GLOW_SRC } from './CmsGlowLoader.const';
import type { CmsGlowLoaderProps } from './CmsGlowLoader.types';

export const CmsGlowLoader: FC<CmsGlowLoaderProps> = (props) => (
  <div className="ink-cms-screen-spinner" role="status" aria-live="polite">
    <div className="ink-cms-screen-spinner__card">
      <img
        src={BIFROST_GLOW_SRC}
        alt={props.label}
        width={BIFROST_GLOW_SIZE_PX}
        height={BIFROST_GLOW_SIZE_PX}
        className="ink-cms-glow-mark"
      />
      <Typography variant="body2" className="mb-0">
        {props.label}
      </Typography>
    </div>
  </div>
);
