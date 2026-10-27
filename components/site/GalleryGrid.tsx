'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

/** Square photo grid. A click opens a full-size view with arrows and keyboard support. */
export default function GalleryGrid({ photos, threeAcross = false }: { photos: string[]; threeAcross?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, move]);

  return (
    <>
      <div className={`st-gal${threeAcross ? ' st-gal--3' : ''}`}>
        {photos.map((src, i) => (
          <button key={src} type="button" className="st-gal__item" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${photos.length}`}>
            <Image src={src} alt="" fill sizes="(max-width: 600px) 50vw, (max-width: 960px) 33vw, 25vw" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="st-lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${open + 1} of ${photos.length}`} onClick={() => setOpen(null)}>
          <img src={photos[open]} alt={`Boattime photo ${open + 1}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="st-lightbox__close" onClick={() => setOpen(null)} aria-label="Close">
            ×
          </button>
          <button type="button" className="st-lightbox__prev" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous photo">
            ←
          </button>
          <button type="button" className="st-lightbox__next" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next photo">
            →
          </button>
        </div>
      )}
    </>
  );
}
