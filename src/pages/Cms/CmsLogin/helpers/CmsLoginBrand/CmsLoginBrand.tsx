import type { FC } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import { CMS_LOGIN_BRAND_MARK_SIZE_PX } from '../../CmsLogin.const';
import { CmsLoginMark } from '../CmsLoginMark';
import type { CmsLoginBrandProps } from './CmsLoginBrand.types';

export const CmsLoginBrand: FC<CmsLoginBrandProps> = (props) => {
  const { brand, headline, body, quote, quoteBy } = props;
  return (
    <div className="ink-cms-login__brand">
      <span className="ink-cms-login__glow" />
      <Flex align="center" gap={2} className="ink-cms-login__brand-mark">
        <CmsLoginMark size={CMS_LOGIN_BRAND_MARK_SIZE_PX} title={brand} />
        <Typography variant="h6" className="ink-cms-login__brand-word mb-0">
          {brand}
        </Typography>
      </Flex>
      <div className="ink-cms-login__brand-mid">
        <Typography variant="h2" className="ink-cms-login__headline mb-0">
          {headline}
        </Typography>
        <Typography variant="body2" className="ink-cms-login__brand-body mb-0">
          {body}
        </Typography>
      </div>
      <div className="ink-cms-login__quote">
        <Typography variant="body2" className="ink-cms-login__quote-text mb-0">
          {quote}
        </Typography>
        <Typography variant="caption" className="ink-cms-login__quote-by mb-0">
          {quoteBy}
        </Typography>
      </div>
    </div>
  );
};
