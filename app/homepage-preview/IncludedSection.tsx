import type { ReactNode } from 'react';
import SectionHead from './SectionHead';

// DRAFT copy: taken from features already published on the site (vessel
// specs, FAQ, guest reviews). The team should confirm each one applies to
// every ticketed cruise before this goes live.

const ICON = {
  width: 52,
  height: 52,
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  className: 'hp-inc__icon',
};

const ITEMS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: 'Superyacht Comfort',
    text: 'Spacious lounges and open decks aboard Sun Goddess or Mermaid Spirit.',
    icon: (
      <svg {...ICON}>
        <path d="M6 30h36l-5 9H12z" />
        <path d="M14 30V20h16l6 10" />
        <path d="M22 20v-8" />
        <path d="M22 12l8 5" />
        <path d="M4 44c4-2 6-2 10 0s6 2 10 0 6-2 10 0 6 2 10 0" />
      </svg>
    ),
  },
  {
    title: 'Bose Sound & Screens',
    text: 'Bose audio throughout and flat-screens on board.',
    icon: (
      <svg {...ICON}>
        <path d="M6 20v8h8l10 8V12l-10 8z" />
        <path d="M31 18a8 8 0 0 1 0 12" />
        <path d="M36 13a15 15 0 0 1 0 22" />
      </svg>
    ),
  },
  {
    title: 'Two Bars Aboard',
    text: 'Two bars on each vessel, with bar-tab or pay-as-you-go options.',
    icon: (
      <svg {...ICON}>
        <path d="M10 8h28L24 26z" />
        <path d="M24 26v14" />
        <path d="M16 40h16" />
        <path d="M15 14h18" />
      </svg>
    ),
  },
  {
    title: 'Expert Crew',
    text: 'A friendly, knowledgeable crew, with live commentary on whale cruises.',
    icon: (
      <svg {...ICON}>
        <circle cx="24" cy="15" r="7" />
        <path d="M10 41c1-8 6-13 14-13s13 5 14 13" />
        <path d="M18 9c1-3 3-4 6-4s5 1 6 4" />
      </svg>
    ),
  },
  {
    title: 'Open Sun Decks',
    text: 'An upper sun deck with open-air views of the Broadwater and the coast.',
    icon: (
      <svg {...ICON}>
        <circle cx="24" cy="24" r="8" />
        <path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.5 10.5l4.2 4.2M33.3 33.3l4.2 4.2M10.5 37.5l4.2-4.2M33.3 14.7l4.2-4.2" />
      </svg>
    ),
  },
  {
    title: 'Easy Departure',
    text: 'Board at Marine Stadium Jetty & Pontoon, Main Beach, ten minutes from Surfers Paradise.',
    icon: (
      <svg {...ICON}>
        <path d="M24 43s-13-12-13-22a13 13 0 0 1 26 0c0 10-13 22-13 22z" />
        <circle cx="24" cy="21" r="5" />
      </svg>
    ),
  },
];

export default function IncludedSection() {
  return (
    <div role="region" className="hp-section" aria-labelledby="hp-included">
      <div className="hp-wrap">
        <SectionHead
          eyebrow="Included"
          title={
            <span id="hp-included">
              Everything you want is already <em>covered</em>
            </span>
          }
          sub="Everything on board, so you can focus on the day."
        />
        <div className="hp-grid3">
          {ITEMS.map((item, i) => (
            <article key={item.title} className="hp-inc">
              <span className="hp-inc__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              {item.icon}
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
