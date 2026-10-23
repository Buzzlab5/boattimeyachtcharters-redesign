import type { Metadata } from 'next';
import BroadwaterPage from '@/components/CruisePageBroadwater';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SUNSET_FAQS } from '@/lib/cruise-faqs';

const PATH = '/luxury-broadwater-cruise';

export const metadata: Metadata = {
  title: 'Gold Coast Sunset Cruise on a Superyacht',
  description:
    'Sunset on the Broadwater aboard Sun Goddess, 150 minutes from Main Beach. Saturdays and Sundays at 5pm. Adults $79, two for $149, children $55.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          boatTripSchema({
            name: 'Luxury Scenic Sunset Cruise: Superyacht Sunset on the Broadwater',
            description:
              'A 150-minute sunset scenic cruise through the Gold Coast Broadwater aboard the Sun Goddess superyacht, departing Marine Stadium Jetty & Pontoon, Main Beach. Saturdays and Sundays at 5:00 PM.',
            path: PATH,
            image: '/twilight-drift.jpeg',
            duration: 'PT2H30M',
            offer: {
              price: '55',
              highPrice: '79',
              description: 'Per person: child aged 3 to 13 $55, adult $79. Infant under 3 $11. Two adults together $149.',
            },
          }),
          faqSchema(SUNSET_FAQS),
          breadcrumbSchema([{ name: 'Luxury Scenic Sunset Cruise', path: PATH }]),
        ]}
      />
      <GoogleAdsTag />
      <BroadwaterPage />
    </>
  );
}
