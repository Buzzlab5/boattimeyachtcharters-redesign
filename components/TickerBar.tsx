'use client';

import { useEffect, useState } from 'react';

function sunsetFallback(): string {
  const month = new Date().getMonth();
  const h = [18, 18, 18, 17, 17, 17, 17, 17, 17, 18, 18, 18][month];
  const m = [45, 30, 5, 45, 30, 20, 25, 40, 55, 10, 25, 40][month];
  return `${h}:${String(m).padStart(2, '0')}`;
}

interface Conditions {
  sunset: string;
  seaState: string;
  nextWhale: string;
  availability: string;
}

export default function TickerBar() {
  const [visible, setVisible] = useState(false);
  const [conditions, setConditions] = useState<Conditions>({
    sunset: sunsetFallback(),
    seaState: '— · —',
    nextWhale: '—',
    availability: '—',
  });

  // Show/hide on scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch live conditions once on mount
  useEffect(() => {
    fetch('/api/conditions')
      .then((r) => r.json())
      .then((data: Conditions) => setConditions(data))
      .catch(() => {}); // keep fallback values on error
  }, []);

  const ITEMS = [
    { label: "Today's Sunset", value: conditions.sunset, accent: true },
    { label: 'Sea State',      value: conditions.seaState },
    { label: 'Next Whale',     value: conditions.nextWhale },
    { label: 'Availability',   value: conditions.availability },
  ];

  return (
    <div
      className="ticker-bar-wrap"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10,22,40,0.97)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '1px solid rgba(201,168,76,0.14)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.2,0.6,0.2,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 48px',
        height: 52,
        gap: 24,
      }}
    >
      {/* Status items */}
      <div className="ticker-items" style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0 }}>
        {ITEMS.map((item) => (
          <div key={item.label} className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.7)',
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '0.1em',
                color: item.accent ? 'var(--gold)' : 'rgba(245,240,232,0.9)',
                fontWeight: item.accent ? 600 : 400,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
