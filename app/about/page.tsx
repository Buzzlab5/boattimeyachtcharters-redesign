import type { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, BASE_URL, ORG_ID } from '@/lib/schema';

const PATH = '/about';

export const metadata: Metadata = {
  title: 'About Boattime Yacht Charters · Gold Coast',
  description:
    'Meet the team behind Boattime Yacht Charters. Two superyachts on the Gold Coast Broadwater, operating since 2014, for charter and scenic cruises.',
  alternates: { canonical: `${BASE_URL}${PATH}` },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${BASE_URL}${PATH}/#about`,
  name: 'About Boattime Yacht Charters',
  url: `${BASE_URL}${PATH}`,
  mainEntity: { '@id': ORG_ID },
  inLanguage: 'en-AU',
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[aboutSchema, breadcrumbSchema([{ name: 'About Boattime', path: PATH }])]}
      />
      <AboutPage />
    </>
  );
}
