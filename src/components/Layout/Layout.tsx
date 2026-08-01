import type { FC, ReactNode } from 'react';
import { useBear } from '@forgedevstack/bear';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children, hideFooter = false } = props;
  const { mode } = useBear();
  const shellClass = mode === 'dark' ? 'ink-shell ink-shell--dark' : 'ink-shell';

  return (
    <div className={shellClass}>
      <Navbar />
      <main className="ink-main">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
