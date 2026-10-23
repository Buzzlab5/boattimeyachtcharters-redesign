import type { Metadata } from 'next';
import WhalePage from '@/components/CruisePageWhale';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/cruise-tickets-luxury-whale-watching';

export const metadata: Metadata = {
  title: 'Gold Coast Whale Watching Cruise',
  description:
    'Humpback whale watching aboard the Sun Goddess superyacht, 150 minutes from Main Beach on the Gold Coast. Check the booking calendar for current sailings.',
  openGraph: {
    title: 'Luxury Whale Watching | Boattime Yacht Charters',
    description:
      'Humpback whale watching aboard the Sun Goddess superyacht, 150 minutes from Main Beach on the Gold Coast. Check the booking calendar for current sailings.',
    images: [{ url: '/humpbacks.jpg', width: 1200, height: 630, alt: 'Whale watching on the Gold Coast with Boattime Yacht Charters' }],
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
              'A 150-minute humpback whale watching cruise aboard the Sun Goddess superyacht, departing Marine Stadium Jetty & Pontoon, Main Beach.',
            path: PATH,
            image: '/humpbacks.jpg',
            duration: 'PT2H30M',
            offer: {
              price: '69',
              highPrice: '89',
              description: 'Per person: child aged 3 to 13 $69, adult $89. Infant under 3 free. Two people together $159, family of four $259.',
            },
          }),
          breadcrumbSchema([{ name: 'Luxury Whale Watching', path: PATH }]),
        ]}
      />
      <WhalePage />
    </>
  );
}
