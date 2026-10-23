import type { Metadata } from 'next';
import IndustryPartnership from '@/components/IndustryPartnership';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const PATH = '/industry-partnership';

export const metadata: Metadata = {
  title: 'Industry Partnership Gold Coast',
  description:
    'Partner with Boattime Yacht Charters: opportunities for content creators, influencers, tourism operators and hospitality brands on the Gold Coast.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema([{ name: 'Industry Partnership', path: PATH }])]} />
      <IndustryPartnership />
    </>
  );
}
