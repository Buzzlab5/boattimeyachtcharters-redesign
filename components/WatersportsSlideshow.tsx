'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  { src: '/sun-goddess-watersports/01-inflatable-platform.webp', alt: 'Guests on the inflatable platform behind Sun Goddess', position: 'center' },
  { src: '/sun-goddess-watersports/02-anchored-aerial.webp', alt: 'Sun Goddess anchored in clear green water off the Gold Coast', position: '30% center' },
  { src: '/sun-goddess-watersports/03-bow-deck.webp', alt: 'Guests posing on the bow deck of Sun Goddess', position: '25% center' },
  { src: '/sun-goddess-watersports/04-yacht-broadwater.webp', alt: 'Sun Goddess cruising the Gold Coast Broadwater', position: 'center' },
  { src: '/sun-goddess-watersports/05-bar-drinks.webp', alt: 'Crew member at the Sun Goddess bar with drinks on the deck', position: '30% center' },
];

const INTERVAL_MS = 5000;

const ARROW: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 42,
  height: 42,
  padding: 0,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(7, 15, 31, 0.55)',
  border: '1px solid rgba(255, 255, 255, 0.35)',
  backdropFilter: 'blur(6px)',
};

function Chevron({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** The photo beside "Adventures on the water": fades through the photos, with dots to pick one. */
export default function WatersportsSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, active]);

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <div
      style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.15)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: s.position,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }}
        />
      ))}
      <button type="button" onClick={() => go(-1)} aria-label="Previous photo" style={{ ...ARROW, left: 14 }}>
        <Chevron d="M15 5l-7 7 7 7" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label="Next photo" style={{ ...ARROW, right: 14 }}>
        <Chevron d="M9 5l7 7-7 7" />
      </button>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 16, display: 'flex', justifyContent: 'center', gap: 8 }}>
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            style={{
              width: i === active ? 22 : 8,
              height: 8,
              padding: 0,
              border: 0,
              borderRadius: 4,
              cursor: 'pointer',
              background: i === active ? '#fff' : 'rgba(255,255,255,0.55)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
