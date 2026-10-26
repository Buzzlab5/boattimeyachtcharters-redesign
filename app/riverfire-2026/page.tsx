import type { Metadata } from 'next';
import RiverPage from '@/components/CruisePageRiverfire';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/riverfire-2026';

export const metadata: Metadata = {
  title: 'Riverfire Brisbane Fireworks Cruise',
  description:
    "Brisbane's iconic Riverfire fireworks from the best seat on the river, aboard the Mermaid Spirit tri-deck catamaran. Riverfire 2026 has sailed: register for next year's date.",
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <GoogleAdsTag />
      <JsonLd
        schemas={[
          boatTripSchema({
            name: 'Riverfire: Brisbane Fireworks Yacht Cruise',
            description:
              "A Brisbane River cruise aboard the Mermaid Spirit tri-deck catamaran for the Riverfire fireworks. 18+.",
            path: PATH,
            image: '/Riverfire.jpg',
            // No offer block. Riverfire 2026 has passed and product P8TPLS has
            // no sessions, so declaring a price and InStock would advertise a
            // cruise the checkout cannot sell. Restore it against the live
            // product when next year's date is loaded.
          }),
          breadcrumbSchema([{ name: 'Riverfire', path: PATH }]),
        ]}
      />
      <RiverPage />
    </>
  );
}
