import type { Metadata } from 'next';
import CharterPageCorporate from '@/components/CharterPageCorporate';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/corporate-yacht-charter';

export const metadata: Metadata = {
  title: 'Corporate Yacht Charter Gold Coast',
  description:
    'Premium corporate yacht charters on the Gold Coast. Team building, client entertainment, award ceremonies, product launches and networking events aboard Sun Goddess or Mermaid Spirit.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          serviceSchema({
            name: 'Corporate Yacht Charter Gold Coast',
            description:
              'Corporate yacht charters on the Gold Coast for team building, client entertainment, award ceremonies, product launches and networking events aboard the Sun Goddess or Mermaid Spirit.',
            path: PATH,
            image: '/corporate-charter.webp',
            serviceType: 'Corporate event yacht charter',
          }),
          breadcrumbSchema([{ name: 'Corporate Yacht Charter', path: PATH }]),
        ]}
      />
      <GoogleAdsTag />
      <CharterPageCorporate />
    </>
  );
}
