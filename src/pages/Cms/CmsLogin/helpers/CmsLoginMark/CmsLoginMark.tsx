import type { FC } from 'react';
import {
  CMS_LOGIN_MARK_BLUE,
  CMS_LOGIN_MARK_CLIP_HEIGHT,
  CMS_LOGIN_MARK_CLIP_ID,
  CMS_LOGIN_MARK_CX,
  CMS_LOGIN_MARK_CY,
  CMS_LOGIN_MARK_GRADIENT_ID,
  CMS_LOGIN_MARK_OPACITY_INNER,
  CMS_LOGIN_MARK_OPACITY_MID,
  CMS_LOGIN_MARK_PINK,
  CMS_LOGIN_MARK_R_INNER,
  CMS_LOGIN_MARK_R_MID,
  CMS_LOGIN_MARK_R_OUTER,
  CMS_LOGIN_MARK_STOP_END,
  CMS_LOGIN_MARK_STOP_MID,
  CMS_LOGIN_MARK_STOP_START,
  CMS_LOGIN_MARK_STROKE_WIDTH,
  CMS_LOGIN_MARK_VIEWBOX,
  CMS_LOGIN_MARK_VIOLET,
} from './CmsLoginMark.const';
import type { CmsLoginMarkProps } from './CmsLoginMark.types';

export const CmsLoginMark: FC<CmsLoginMarkProps> = (props) => {
  const { size, title } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox={CMS_LOGIN_MARK_VIEWBOX}
      className="ink-cms-login__mark-svg"
      aria-hidden="true"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={CMS_LOGIN_MARK_GRADIENT_ID} x1="4" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset={CMS_LOGIN_MARK_STOP_START} stopColor={CMS_LOGIN_MARK_BLUE} />
          <stop offset={CMS_LOGIN_MARK_STOP_MID} stopColor={CMS_LOGIN_MARK_VIOLET} />
          <stop offset={CMS_LOGIN_MARK_STOP_END} stopColor={CMS_LOGIN_MARK_PINK} />
        </linearGradient>
        <clipPath id={CMS_LOGIN_MARK_CLIP_ID}>
          <rect x="0" y="0" width="64" height={CMS_LOGIN_MARK_CLIP_HEIGHT} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${CMS_LOGIN_MARK_CLIP_ID})`}>
        <circle
          cx={CMS_LOGIN_MARK_CX}
          cy={CMS_LOGIN_MARK_CY}
          r={CMS_LOGIN_MARK_R_OUTER}
          fill="none"
          stroke={`url(#${CMS_LOGIN_MARK_GRADIENT_ID})`}
          strokeWidth={CMS_LOGIN_MARK_STROKE_WIDTH}
          strokeLinecap="round"
        />
        <circle
          cx={CMS_LOGIN_MARK_CX}
          cy={CMS_LOGIN_MARK_CY}
          r={CMS_LOGIN_MARK_R_MID}
          fill="none"
          stroke={`url(#${CMS_LOGIN_MARK_GRADIENT_ID})`}
          strokeWidth={CMS_LOGIN_MARK_STROKE_WIDTH}
          strokeLinecap="round"
          opacity={CMS_LOGIN_MARK_OPACITY_MID}
        />
        <circle
          cx={CMS_LOGIN_MARK_CX}
          cy={CMS_LOGIN_MARK_CY}
          r={CMS_LOGIN_MARK_R_INNER}
          fill="none"
          stroke={`url(#${CMS_LOGIN_MARK_GRADIENT_ID})`}
          strokeWidth={CMS_LOGIN_MARK_STROKE_WIDTH}
          strokeLinecap="round"
          opacity={CMS_LOGIN_MARK_OPACITY_INNER}
        />
      </g>
    </svg>
  );
};
