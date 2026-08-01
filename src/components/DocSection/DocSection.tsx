import type { FC, ReactNode } from 'react';
import { Typography } from '@forgedevstack/bear';

interface DocSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const DocSection: FC<DocSectionProps> = (props) => {
  const { id, title, children } = props;

  return (
    <section id={id} className="mb-14 scroll-mt-28">
      <Typography variant="h2" className="text-2xl font-bold mb-4 tracking-tight">
        {title}
      </Typography>
      <div className="space-y-4 text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
};
