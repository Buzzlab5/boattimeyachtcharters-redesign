import type { Metadata } from 'next';
import WhalePage from '@/components/CruisePageWhale';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/cruise-tickets-luxury-whale-watching';

export const metadata: Metadata = {
  title: 'Gold Coast Whale Watching Cruise',
  description:
    'Board the Sun Goddess superyacht for an extraordinary encounter with humpback whales. Morning & afternoon sessions May–November, Gold Coast.',
  openGraph: {
    title: 'Luxury Whale Watching | Boattime Yacht Charters',
    description:
      'Board the Sun Goddess superyacht for an extraordinary encounter with humpback whales. Morning & afternoon sessions May–November, Gold Coast.',
    images: [{ url: '/humpbacks.jpg', width: 1200, height: 630, alt: 'Whale Watching Gold Coast — Boattime Yacht Charters' }],
    url: `https://www.boattimeyachtcharters.com${PATH}`,
  },
  alternates: {
    canonical: `https://www.boattimeyachtcharters.com${PATH}`,
  },
};

export default function Page() {
  return (
    <>
      <GoogleAdsTag />
      <JsonLd
        schemas={[
          boatTripSchema({
            name: 'Luxury Whale Watching',
            description:
              'A 2.5-hour luxury humpback whale watching cruise aboard the Sun Goddess superyacht, departing Marine Stadium Jetty & Pontoon, Main Beach. Morning and afternoon sessions, May to November.',
            path: PATH,
            image: '/humpbacks.jpg',
            duration: 'PT2H30M',
            offer: { price: '79.50', description: 'Adult ticket, from' },
          }),
          breadcrumbSchema([{ name: 'Luxury Whale Watching', path: PATH }]),
        ]}
      />
      <WhalePage />
    </>
  );
}
