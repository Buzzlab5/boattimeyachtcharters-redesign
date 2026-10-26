import type { Metadata } from 'next';
import CharterPagePrivate from '@/components/CharterPagePrivate';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { PRIVATE_FAQS } from '@/lib/faqs';

const PATH = '/private-yacht-charter';

export const metadata: Metadata = {
  title: 'Private and Superyacht Charter Gold Coast',
  description:
    'Private yacht charter on the Gold Coast Broadwater for up to 150 guests. Birthdays, celebrations and corporate events, catering and bar included.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          serviceSchema({
            name: 'Private Yacht Charter Gold Coast',
            description:
              'Private yacht charter on the Gold Coast Broadwater aboard the Sun Goddess or Mermaid Spirit, for intimate gatherings through to events of up to 150 guests.',
            path: PATH,
            image: '/private-charter.jpeg',
            serviceType: 'Private yacht charter',
          }),
          faqSchema(PRIVATE_FAQS),
          breadcrumbSchema([{ name: 'Private Yacht Charter', path: PATH }]),
        ]}
      />
      <GoogleAdsTag />
      <CharterPagePrivate />
    </>
  );
}
