import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import SiteShell from '@/components/site/SiteShell';
import SectionHead from '@/components/site/SectionHead';
import GalleryGrid from '@/components/site/GalleryGrid';
import JsonLd from '@/components/JsonLd';
import { BASE_URL, breadcrumbSchema } from '@/lib/schema';

const PATH = '/gallery';

export const metadata: Metadata = {
  title: 'Photo Gallery Gold Coast Cruises',
  description:
    'Photos from Boattime cruises on the Gold Coast: whale watching, sunset on the Broadwater, private charters and life aboard Sun Goddess and Mermaid Spirit.',
  alternates: { canonical: `${BASE_URL}${PATH}` },
};

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
// Logos, badges, video posters and email images are not guest-facing photos.
const SKIP = /logo|badge|poster|icon/i;
const SKIP_FOLDERS = new Set(['email']);

/** Every photo already on the site: loose images in public/ plus its photo folders. */
function listPhotos(): string[] {
  const root = path.join(process.cwd(), 'public');
  const photos: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile() && IMAGE.test(entry.name) && !SKIP.test(entry.name)) {
      photos.push(`/${entry.name}`);
    } else if (entry.isDirectory() && !SKIP_FOLDERS.has(entry.name)) {
      for (const f of fs.readdirSync(path.join(root, entry.name))) {
        if (IMAGE.test(f)) photos.push(`/${entry.name}/${f}`);
      }
    }
  }
  return photos.sort();
}

export default function GalleryPage() {
  const photos = listPhotos();
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema([{ name: 'Gallery', path: PATH }])]} />
      <SiteShell>
        <div className="st-section st-gal-page">
          <div className="st-wrap st-wrap--wide">
            <a href="/" className="st-gal-back">
              <span aria-hidden="true">←</span> Back to home
            </a>
            <SectionHead
              align="left"
              eyebrow="Gallery"
              title={<>Moments <em>on the water</em></>}
              sub="Browse photos from our cruises, charters and the two superyachts."
            />
            <GalleryGrid photos={photos} />
          </div>
        </div>
      </SiteShell>
    </>
  );
}
