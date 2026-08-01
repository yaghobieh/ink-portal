import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';

interface SectionTitleProps {
  children: string;
}

export const SectionTitle: FC<SectionTitleProps> = (props) => {
  const { children } = props;

  return (
    <Typography
      variant="caption"
      className="uppercase tracking-widest font-semibold text-slate-400 mb-2 mt-4 block"
    >
      {children}
    </Typography>
  );
};
