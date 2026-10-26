import type { Metadata } from 'next';
import NyePage from '@/components/CruisePageNYE';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/nye-2026';

export const metadata: Metadata = {
  title: "New Year's Eve Cruise Gold Coast",
  description:
    "New Year's Eve on the Gold Coast Broadwater aboard Mermaid Spirit, a 100ft tri-deck catamaran. Enquire about this year's date and availability.",
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          boatTripSchema({
            name: "New Year's Eve Cruise: Gold Coast Broadwater",
            description:
              "A New Year's Eve cruise aboard the Mermaid Spirit tri-deck catamaran on the Gold Coast Broadwater, with champagne, gourmet canapes and fireworks. 18+.",
            path: PATH,
            image: '/nye2026.webp',
            // No offer block. There is no New Year product with sessions in
            // Rezdy, so declaring a price and InStock would advertise something
            // the checkout cannot sell.
          }),
          breadcrumbSchema([{ name: "New Year's Eve", path: PATH }]),
        ]}
      />
      <NyePage />
    </>
  );
}
