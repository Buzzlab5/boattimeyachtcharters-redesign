import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Fleet from '@/components/Fleet';
import PreviewHero from './PreviewHero';
import IncludedSection from './IncludedSection';
import CruiseTypeSection from './CruiseTypeSection';
import ExperiencesSection from './ExperiencesSection';
import GallerySection from './GallerySection';
import ReviewsSection from './ReviewsSection';
import FaqSection from './FaqSection';
import PreviewFooter from './PreviewFooter';
import './preview.css';

// Internal design preview: kept out of Google and out of sitemap.ts.
export const metadata: Metadata = {
  title: 'Homepage Design Preview',
  robots: { index: false, follow: false },
};

export default function HomepagePreview() {
  return (
    <>
      {/* Same navbar as the live site, minus the links to homepage sections. */}
      <Nav preview />
      <div className="hp-root">
        <main>
          <PreviewHero />
          <IncludedSection />
          <CruiseTypeSection />
          <ExperiencesSection />
          {/* "Two vessels. One horizon." is kept exactly as on the live homepage. */}
          <Fleet />
          <GallerySection />
          <ReviewsSection />
          <FaqSection />
        </main>
        <PreviewFooter />
      </div>
    </>
  );
}
