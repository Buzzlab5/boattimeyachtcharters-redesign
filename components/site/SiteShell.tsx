import type { ReactNode } from 'react';
import Nav from '@/components/Nav';
import SiteFooter from './SiteFooter';
import RoundBoxes from './RoundBoxes';

/** The frame around every page: navbar, content, footer. */
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="st-page st-root">
      <Nav />
      <main>{children}</main>
      <RoundBoxes />
      <SiteFooter />
    </div>
  );
}
