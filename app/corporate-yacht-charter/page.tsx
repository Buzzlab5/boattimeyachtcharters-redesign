import type { Metadata } from 'next';
import CharterPageCorporate from '@/components/CharterPageCorporate';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { CORPORATE_FAQS } from '@/lib/faqs';

const PATH = '/corporate-yacht-charter';

export const metadata: Metadata = {
  title: 'Corporate Yacht Charter Gold Coast',
  description:
    'Corporate and Christmas party yacht charters on the Gold Coast for 20 to 150 guests. Team events, client entertainment and end of year functions.',
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
              'Corporate and end of year yacht charters on the Gold Coast for team building, client entertainment, award ceremonies, product launches, networking events and Christmas functions, aboard the Sun Goddess for up to 135 guests or the Mermaid Spirit for up to 150.',
            path: PATH,
            image: '/corporate-charter.webp',
            serviceType: 'Corporate event yacht charter',
          }),
          faqSchema(CORPORATE_FAQS),
          breadcrumbSchema([{ name: 'Corporate Yacht Charter', path: PATH }]),
        ]}
      />
      <GoogleAdsTag />
      <CharterPageCorporate />
    </>
  );
}
