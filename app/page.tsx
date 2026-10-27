import type { Metadata } from 'next';
import Fleet from '@/components/Fleet';
import HashScroll from '@/components/HashScroll';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import SiteShell from '@/components/site/SiteShell';
import PageHero from '@/components/site/PageHero';
import FaqEnquiry from '@/components/site/FaqEnquiry';
import IncludedSection from '@/components/site/home/IncludedSection';
import CruiseTypeSection from '@/components/site/home/CruiseTypeSection';
import ExperiencesSection from '@/components/site/home/ExperiencesSection';
import GallerySection from '@/components/site/home/GallerySection';
import ReviewsSection from '@/components/site/home/ReviewsSection';
import { FAQS } from '@/lib/faqs';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.boattimeyachtcharters.com' },
};

export default function HomePage() {
  return (
    <>
      <GoogleAdsTag />
      <JsonLd schemas={[faqSchema(FAQS)]} />
      <HashScroll />
      <SiteShell>
        <PageHero
          size="full"
          cue
          image="/hero-poster.jpg"
          imageAlt="Aerial view of a Boattime superyacht cruising on deep blue water off the Gold Coast"
          videoUrl={process.env.NEXT_PUBLIC_HERO_VIDEO_URL}
          eyebrow="Superyacht cruises · Gold Coast"
          title={
            <>
              Discover <em>the Gold Coast</em>
            </>
          }
          lead="Whale watching, sunset cruises and private superyacht charters, all from Main Beach."
          note={
            <>
              Cruise tickets from <strong>$79</strong> per person &middot; Private charters on request
            </>
          }
          stats={[
            { value: '4.7', label: 'Guest rating', stars: true },
            { value: '3,910+', label: 'Guest reviews', stars: true },
          ]}
        />
        <div className="st-zigzag">
          <IncludedSection />
          <CruiseTypeSection />
          <ExperiencesSection />
          {/* "Two vessels. One horizon." is the existing Fleet section, unchanged. */}
          <div className="on-photo">
            <Fleet />
          </div>
          <GallerySection />
          <ReviewsSection />
          <FaqEnquiry faqs={FAQS} />
        </div>
      </SiteShell>
    </>
  );
}
