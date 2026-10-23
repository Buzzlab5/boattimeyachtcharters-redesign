import type { Metadata } from 'next';
import DiningCruisePage from '@/components/CruisePageDiningCruise';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/buffet-dinner-and-lunch-cruise';

export const metadata: Metadata = {
  title: 'Gold Coast Buffet Dinner & Lunch Cruise',
  description:
    'A golden-hour Buffet Dinner Cruise or a relaxed Flavours of Australia Lunch Cruise aboard Mermaid Spirit on the Gold Coast. Adults from $99.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          boatTripSchema({
            name: 'Buffet Dinner & Lunch Cruise — Flavours of Australia',
            description:
              'A buffet dining cruise aboard the Mermaid Spirit tri-deck catamaran on the Gold Coast Broadwater, available as a golden-hour dinner session or a relaxed lunch session.',
            path: PATH,
            image: '/sunset-buffet/sunset-buffet1.jpg',
            offer: { price: '99', description: 'Adult ticket, from' },
          }),
          breadcrumbSchema([{ name: 'Buffet Dinner & Lunch Cruise', path: PATH }]),
        ]}
      />
      <DiningCruisePage />
    </>
  );
}
