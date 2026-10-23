import type { Metadata } from 'next';
import CampaignSkyToSea from '@/components/CampaignSkyToSea';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const PATH = '/humpbackhelitours';

export const metadata: Metadata = {
  title: 'Scenic Helicopter Flights Gold Coast',
  description:
    'Scenic helicopter flights over the Gold Coast with Gold Coast Helitours, from a five-minute harbour lap to a 45-minute coast and hinterland tour.',
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema([{ name: 'Gold Coast Helitours', path: PATH }])]} />
      <CampaignSkyToSea />
    </>
  );
}
