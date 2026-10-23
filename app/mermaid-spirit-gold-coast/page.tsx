import type { Metadata } from 'next';
import MermaidSpiritPage from '@/components/YachtPageMermaidSpirit';
import JsonLd from '@/components/JsonLd';
import { vesselSchema, breadcrumbSchema, faqSchema, BASE_URL } from '@/lib/schema';
import { MERMAID_SPIRIT as V } from '@/lib/vessels';

const PATH = `/${V.slug}`;

export const metadata: Metadata = {
  title: 'Mermaid Spirit: 100ft Catamaran Gold Coast',
  description:
    "Charter Mermaid Spirit, a 100ft tri-deck catamaran for up to 150 guests on the Gold Coast Broadwater. Three decks, chef's kitchen, stinger pool.",
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    title: 'Mermaid Spirit: 100ft Catamaran Gold Coast',
    description:
      "A 100ft tri-deck catamaran for up to 150 guests. Three decks, chef's kitchen, stinger pool and jet skis.",
    images: [{ url: V.heroImage, width: 1200, height: 630, alt: V.heroAlt }],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          vesselSchema({
            name: V.name,
            description: V.intro[0],
            path: PATH,
            image: V.heroImage,
            gallery: V.gallery.map((g) => g.src),
            length: `${V.lengthFt} ft`,
            capacity: V.dayGuests,
          }),
          faqSchema(V.faqs),
          breadcrumbSchema([{ name: V.name, path: PATH }]),
        ]}
      />
      <MermaidSpiritPage />
    </>
  );
}
