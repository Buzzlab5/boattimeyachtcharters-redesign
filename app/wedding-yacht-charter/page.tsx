import type { Metadata } from 'next';
import CharterPageWedding from '@/components/CharterPageWedding';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { WEDDING_FAQS } from '@/lib/faqs';

const PATH = '/wedding-yacht-charter';

export const metadata: Metadata = {
  title: 'Wedding Yacht Charter Gold Coast',
  description:
    "Wedding ceremonies and receptions aboard a Gold Coast superyacht, for up to 150 guests, with catering and bar packages on the Broadwater.",
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
          faqSchema(WEDDING_FAQS),
          breadcrumbSchema([{ name: 'Wedding Yacht Charter', path: PATH }]),
        ]}
      />
      <GoogleAdsTag />
      <CharterPageWedding />
    </>
  );
}
