import type { Metadata } from 'next';
import LunchPage from '@/components/CruisePageLunch';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH =
  '/relaxed-lunch-cruise-flavours-of-australia-aboard-the-mermaid-spirit';

export const metadata: Metadata = {
  title: "Gold Coast Lunch Cruise: Chef's Table",
  description:
    'A leisurely 2-hour lunch cruise with Executive Chef Brendan Ward. Australian cuisine, 360° Broadwater views, family-friendly. From $99.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          boatTripSchema({
            name: "Relaxed Lunch Cruise — Chef's Table, Flavours of Australia",
            description:
              'A 2-hour lunch cruise aboard the Mermaid Spirit with Executive Chef Brendan Ward, serving Australian cuisine with 360° Gold Coast Broadwater views.',
            path: PATH,
            image: '/relaxed-lunch/relaxed_lunch_2.webp',
            duration: 'PT2H',
            offer: { price: '99', description: 'Adult ticket, from' },
          }),
          breadcrumbSchema([{ name: 'Relaxed Lunch Cruise', path: PATH }]),
        ]}
      />
      <LunchPage />
    </>
  );
}
