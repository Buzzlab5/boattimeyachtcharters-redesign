'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A row of rounded photos from a public/ folder (served by /api/gallery/[folder]).
 * Scrolls sideways with the arrows or a swipe; a click opens a full-size view.
 */
export default function GalleryStrip({ folder, label = 'Photo' }: { folder: string; label?: string }) {
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/gallery/${folder}`)
      .then((r) => r.json())
      .then((d: { images?: string[] }) => setImages(d.images ?? []))
      .catch(() => {});
  }, [folder]);

  // One photo per click. At the last photo, Next wraps to the first (and Previous at the first wraps to the last).
  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    const first = el?.querySelector<HTMLElement>('.st-strip__item');
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const stride = first.offsetWidth + gap;
    const max = el.scrollWidth - el.clientWidth;
    let left: number;
    if (dir === 1 && el.scrollLeft >= max - 2) left = 0;
    else if (dir === -1 && el.scrollLeft <= 2) left = max;
    else left = Math.min(max, Math.max(0, (Math.round(el.scrollLeft / stride) + dir) * stride));
    el.scrollTo({ left, behavior: 'smooth' });
  }, []);

  const move = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? null : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, move]);

  if (images.length === 0) return <div className="st-strip st-strip--empty" aria-hidden="true" />;

  return (
    <div className="st-strip-wrap">
      <div className="st-strip" ref={track}>
        {images.map((src, i) => (
          <button key={src} type="button" className="st-strip__item" onClick={() => setOpen(i)} aria-label={`Open ${label} ${i + 1}`}>
            <img src={src} alt={`${label} ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      <div className="st-strip__nav">
        <button type="button" onClick={() => step(-1)} aria-label="Previous photos">
          ←
        </button>
        <span>{images.length} photos</span>
        <button type="button" onClick={() => step(1)} aria-label="Next photos">
          →
        </button>
      </div>

      {open !== null && (
        <div className="st-lightbox" role="dialog" aria-modal="true" aria-label={`${label} ${open + 1} of ${images.length}`} onClick={() => setOpen(null)}>
          <img src={images[open]} alt={`${label} ${open + 1}`} onClick={(e) => e.stopPropagation()} />
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
    </div>
  );
}
