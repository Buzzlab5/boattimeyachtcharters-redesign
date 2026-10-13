import type { Metadata } from 'next';
import BuffetPage from '@/components/CruisePageBuffet';
import JsonLd from '@/components/JsonLd';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH =
  '/sunset-twilight-buffet-flavours-of-australia-aboard-the-mermaid-spirit';

export const metadata: Metadata = {
  title: "Gold Coast Dinner Cruise — Chef's Table",
  description:
    'A 2.5-hour sunset buffet dinner with Executive Chef Brendan Ward. Australian cuisine, golden-hour Broadwater views. Family-friendly. From $99.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          boatTripSchema({
            name: "Sunset Twilight Buffet — Chef's Table, Flavours of Australia",
            description:
              'A 2.5-hour sunset buffet dinner cruise aboard the Mermaid Spirit with Executive Chef Brendan Ward, serving Australian cuisine over golden-hour Broadwater views.',
            path: PATH,
            image: '/sunset-twilight.png',
            duration: 'PT2H30M',
            offer: { price: '99', description: 'Adult ticket, from' },
          }),
          breadcrumbSchema([{ name: 'Sunset Twilight Buffet Cruise', path: PATH }]),
        ]}
      />
      <GoogleAdsTag />
      <BuffetPage />
    </>
  );
}
