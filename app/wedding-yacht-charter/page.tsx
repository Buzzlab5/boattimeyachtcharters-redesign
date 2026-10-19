import type { Metadata } from 'next';
import CharterPageWedding from '@/components/CharterPageWedding';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/wedding-yacht-charter';

export const metadata: Metadata = {
  title: 'Yacht Wedding Gold Coast',
  description:
    "Say 'I Do' on a Boattime luxury yacht. The idyllic Gold Coast venue for wedding ceremonies and receptions — up to 150 guests, world-class catering, and breathtaking Broadwater views.",
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          serviceSchema({
            name: 'Wedding Yacht Charter Gold Coast',
            description:
              'Yacht wedding ceremonies and receptions on the Gold Coast Broadwater for up to 150 guests, with world-class catering aboard the Sun Goddess or Mermaid Spirit.',
            path: PATH,
            image: '/wedding-charter.webp',
            serviceType: 'Wedding venue yacht charter',
          }),
          breadcrumbSchema([{ name: 'Wedding Yacht Charter', path: PATH }]),
        ]}
      />
      <GoogleAdsTag />
      <CharterPageWedding />
    </>
  );
}
