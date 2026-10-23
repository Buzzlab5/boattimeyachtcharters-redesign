import type { Metadata } from 'next';
import NyePage from '@/components/CruisePageNYE';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/nye-2026';

export const metadata: Metadata = {
  title: "NYE 2026 Cruise: Gold Coast Broadwater",
  description:
    "Welcome 2026 aboard the Mermaid Spirit tri-deck catamaran. Champagne, gourmet canapés, fireworks. 31 December 2025 · 18+ · $169 pp.",
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          boatTripSchema({
            name: "New Year's Eve Cruise 2026 — Gold Coast Broadwater",
            description:
              "A New Year's Eve cruise aboard the Mermaid Spirit tri-deck catamaran on the Gold Coast Broadwater, with champagne, gourmet canapés and fireworks. 18+.",
            path: PATH,
            image: '/nye2026.webp',
            offer: { price: '169', description: 'Per person' },
          }),
          breadcrumbSchema([{ name: "New Year's Eve 2026", path: PATH }]),
        ]}
      />
      <NyePage />
    </>
  );
}
