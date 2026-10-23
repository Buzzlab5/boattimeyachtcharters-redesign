import type { Metadata } from 'next';
import SunGoddessPage from '@/components/YachtPageSunGoddess';
import JsonLd from '@/components/JsonLd';
import { vesselSchema, breadcrumbSchema, faqSchema, BASE_URL } from '@/lib/schema';
import { SUN_GODDESS as V } from '@/lib/vessels';

const PATH = `/${V.slug}`;

export const metadata: Metadata = {
  title: 'Sun Goddess: 114ft Gold Coast Superyacht',
  description:
    'Charter Sun Goddess, a 114ft superyacht for up to 135 guests, departing Marine Stadium Jetty & Pontoon, Main Beach. Two licensed bars, two decks.',
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    title: 'Sun Goddess: 114ft Gold Coast Superyacht',
    description:
      'The 114ft flagship of the Boattime fleet. Up to 135 guests, two licensed bars and two entertainment decks on the Gold Coast Broadwater.',
    images: [{ url: V.heroImage, width: 1200, height: 630, alt: V.heroAlt }],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          vesselSchema({
            name: V.name,
            description: V.intro[0],
            path: PATH,
            image: V.heroImage,
            gallery: V.gallery.map((g) => g.src),
            length: `${V.lengthFt} ft`,
            capacity: V.dayGuests,
          }),
          faqSchema(V.faqs),
          breadcrumbSchema([{ name: V.name, path: PATH }]),
        ]}
      />
      <SunGoddessPage />
    </>
  );
}
