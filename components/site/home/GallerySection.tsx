import Image from 'next/image';
import SectionHead from '../SectionHead';

// No guest photos on file yet, so these are Boattime's own. Swap in guest
// photos later and the heading can go back to "Captured by our guests".
const PHOTOS = [
  { src: '/luxury-whale-watching/humpbacks.jpg', alt: 'Guests watching humpback whales from the deck', sizes: '(max-width: 720px) 100vw, 560px' },
  { src: '/sunset-boat.jpg', alt: 'Sunset over the Gold Coast skyline from the deck', sizes: '(max-width: 720px) 50vw, 280px' },
  { src: '/EDI_2760.jpg', alt: 'Open sun deck lounge seating aboard Sun Goddess', sizes: '(max-width: 720px) 50vw, 280px' },
  { src: '/mermaid-spirit-main.jpg', alt: 'Mermaid Spirit superyacht on the Broadwater', sizes: '(max-width: 720px) 50vw, 280px' },
  { src: '/luxury-whale.jpg', alt: 'Humpback whale beside the Boattime vessel', sizes: '(max-width: 720px) 50vw, 280px' },
];

export default function GallerySection() {
  return (
    <div role="region" className="st-section" aria-labelledby="st-gallery">
      <div className="st-wrap">
        <SectionHead
          eyebrow="Gallery"
          title={
            <span id="st-gallery">
              Moments <em>on the water</em>
            </span>
          }
        />
        <div className="st-gallery">
          {PHOTOS.map((p) => (
            <figure key={p.src}>
              <Image src={p.src} alt={p.alt} fill sizes={p.sizes} />
            </figure>
          ))}
          <a href="/sun-goddess-gold-coast" className="st-gallery__all">
            Show all photos
          </a>
        </div>
      </div>
    </div>
  );
}
