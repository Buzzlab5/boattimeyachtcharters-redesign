'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow, ItalicEm, Icon } from './Shared';
import { DINING_CRUISES_AVAILABLE } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CruiseData {
  cat: string;
  title: string;
  em: string;
  body: string | null;
  dur: string;
  vessel: string;
  sessions?: string;
  lg?: boolean;
  breakTitle?: boolean;
  col: string;
  row: string;
  img: string;
  href: string;
  dining?: boolean;
}

const CRUISES: CruiseData[] = [
  {
    cat: 'Whale Season',
    title: 'Luxury',
    em: 'Whale Watching',
    body: null,
    dur: '2.5 hrs',
    vessel: 'Sun Goddess',
    sessions: 'Morning 9 AM · Afternoon 12 PM',
    lg: true,
    col: 'span 7',
    row: 'span 2',
    img: '/luxury-whale.jpg',
    href: '/cruise-tickets-luxury-whale-watching',
  },
  {
    cat: 'Sunset',
    title: 'Luxury Scenic Sunset Cruise',
    em: 'Superyacht Sunset on the Broadwater',
    breakTitle: true,
    body: null,
    dur: '2 hrs',
    vessel: 'Sun Goddess',
    col: 'span 5',
    row: 'span 2',
    img: '/dinner-lunch-buffet/sunset-buffet1.jpg',
    href: '/luxury-broadwater-cruise',
  },
  {
    cat: 'Galley',
    title: "Gold Coast: Chef's Table",
    em: 'Flavours of Australia',
    breakTitle: true,
    body: null,
    dur: '3 hrs',
    vessel: 'Mermaid Spirit',
    col: 'span 4',
    row: 'span 2',
    img: '/relaxed-lunch/relaxed_lunch_2.webp',
    href: '/relaxed-lunch-cruise-flavours-of-australia-aboard-the-mermaid-spirit',
    dining: true,
  },
  {
    cat: 'Dining',
    title: "Gold Coast: Chef's Table Dinner",
    em: 'Flavours of Australia',
    breakTitle: true,
    body: null,
    dur: '3.5 hrs',
    vessel: 'Mermaid Spirit',
    col: 'span 8',
    row: 'span 2',
    img: '/sunset-twilight.png',
    href: '/sunset-twilight-buffet-flavours-of-australia-aboard-the-mermaid-spirit',
    dining: true,
  },
  {
    cat: 'Event',
    title: 'Riverfire 2026',
    em: 'Brisbane Fireworks Yacht Cruise',
    breakTitle: true,
    body: null,
    dur: '4 hrs',
    vessel: 'Mermaid Spirit',
    col: 'span 5',
    row: 'span 2',
    img: '/Riverfire.jpg',
    href: '/riverfire-2026',
  },
  {
    cat: 'Celebration',
    title: "New Year's",
    em: 'Eve 2027',
    body: null,
    dur: '5 hrs',
    vessel: 'Mermaid Spirit',
    col: 'span 3',
    row: 'span 2',
    img: '/nye2026.webp',
    href: '/nye-2027',
  },
  {
    cat: 'Romance',
    title: "Valentine's",
    em: 'evening',
    body: null,
    dur: '3 hrs',
    vessel: 'Mermaid Spirit',
    col: 'span 4',
    row: 'span 2',
    img: '/valentines-day-images/valentine3.webp',
    href: '/valentines-day',
  },
];

function CruiseCard({ c }: { c: CruiseData }) {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.to(imgRef.current, {
        scale: hovered ? 1.06 : 1,
        duration: 0.75,
        ease: 'power2.out',
      });
      if (descRef.current) {
        gsap.to(descRef.current, {
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 8,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
      if (linkRef.current) {
        gsap.to(linkRef.current, {
          opacity: hovered ? 1 : 0.75,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    },
    { dependencies: [hovered] },
  );

  return (
    <a
      href={c.href}
      className="relative overflow-hidden cursor-pointer cruise-card-inner"
      style={{
        gridColumn: c.col,
        gridRow: c.row,
        background: 'var(--ocean)',
        display: 'block',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${c.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.2) 55%, rgba(10,22,40,0.05) 100%)',
        }}
      />
      <div
        className="absolute cruise-card-content"
        style={{
          left: c.lg ? 40 : 28,
          right: c.lg ? 40 : 28,
          bottom: c.lg ? 36 : 28,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          {c.cat}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(17px, 3.5vw, 26px)',
            color: 'var(--cream)',
            lineHeight: 1.1,
            marginBottom: 10,
            letterSpacing: '-0.01em',
          }}
        >
          {c.title}
          {c.breakTitle ? <br /> : ' '}
          <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
            {c.em}
          </span>
        </div>
        {c.body && (
          <div
            ref={descRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'rgba(245,240,232,0.78)',
              lineHeight: 1.65,
              marginBottom: 14,
              maxWidth: 380,
              opacity: 0,
            }}
          >
            {c.body}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          <span className="flex items-center gap-1.5">
            <Icon name="clock" size={10} color="var(--gold)" /> {c.dur}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="anchor" size={10} color="var(--gold)" /> {c.vessel}
          </span>
          {c.sessions && (
            <span className="flex items-center gap-1.5">
              <Icon name="clock" size={10} color="var(--gold)" /> {c.sessions}
            </span>
          )}
        </div>
        <span
          ref={linkRef}
          className="flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 600,
            opacity: 0.75,
            display: 'inline-flex',
          }}
        >
          View Experience <Icon name="arrow" size={11} color="var(--gold)" />
        </span>
      </div>
    </a>
  );
}

export default function Cruises() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(sectionRef.current!.querySelectorAll('.cruise-card-wrap'), {
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      id="experiences"
      className="cruises-section"
      style={{ padding: '110px 0', background: 'var(--navy)' }}
    >
      <div
        ref={headerRef}
        className="cruise-header-wrap"
        style={{
          textAlign: 'center',
          maxWidth: 780,
          margin: '0 auto 72px',
          padding: '0 48px',
        }}
      >
        <Eyebrow>Cruise Tickets &middot; Sunset and Whale Watching, Gold Coast</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
          }}
        >
          Choose your <ItalicEm>afternoon</ItalicEm>.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--text-muted)',
            marginTop: 22,
            lineHeight: 1.75,
          }}
        >
          Seven scheduled cruises running year-round from Marine Stadium Jetty & Pontoon,
          Main Beach, Gold Coast — from whale season mornings to New
          Year&rsquo;s Eve across three decks.
        </p>
      </div>

      <div
        className="cruise-mosaic"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '240px',
          gap: 2,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 48px',
        }}
      >
        {CRUISES.filter(c => DINING_CRUISES_AVAILABLE || !c.dining).map((c, i) => (
          <div
            key={i}
            className="cruise-card-wrap"
            style={{ gridColumn: c.col, gridRow: c.row }}
          >
            <CruiseCard c={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
