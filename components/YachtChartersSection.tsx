'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow, ItalicEm, Icon } from './Shared';
import { DINING_CRUISES_AVAILABLE } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CharterCard {
  cat: string;
  title: string;
  em: string;
  body: string;
  stat: string;
  col: string;
  row: string;
  img: string;
  href: string;
  linkLabel?: string;
}

const CHARTERS: CharterCard[] = [
  {
    cat: 'Private',
    title: 'Private Yacht',
    em: 'Charter',
    body: 'Full vessel hire for intimate gatherings or large events — island hopping, watersports, BBQs, and bespoke celebrations on the Gold Coast Broadwater.',
    stat: 'Up to 135 guests',
    col: 'span 7',
    row: 'span 2',
    img: '/private-charter.jpeg',
    href: '/private-yacht-charter',
  },
  {
    cat: 'Corporate',
    title: 'Corporate',
    em: 'Charter',
    body: 'Impress clients and reward your team with a world-class event on the water — networking nights, awards ceremonies, team building, and product launches.',
    stat: 'Customisable Packages',
    col: 'span 5',
    row: 'span 2',
    img: '/corporate-charter.webp',
    href: '/corporate-yacht-charter',
  },
  {
    cat: 'Wedding',
    title: 'Wedding',
    em: 'Yacht Charter',
    body: 'Say "I Do" aboard a luxury superyacht. The idyllic floating venue for Gold Coast wedding ceremonies and receptions with up to 135 guests.',
    stat: 'Up to 135 guests',
    col: 'span 5',
    row: 'span 2',
    img: '/wedding-charter.webp',
    href: '/wedding-yacht-charter',
  },
  {
    cat: 'Dining',
    title: 'Catering',
    em: '& Menus',
    body: 'Tailored menus from our award-winning executive chef — canapés, buffets, fine dining, and custom bar packages crafted around your event.',
    stat: 'Fully Customisable',
    col: 'span 7',
    row: 'span 2',
    img: '/catering-charter.webp',
    href: '/yacht-charter-menus',
  },
  {
    cat: 'Dining Cruise',
    title: 'Buffet Dinner & Lunch',
    em: 'Cruise',
    body: '"Flavours of Australia" aboard the Mermaid Spirit on the Gold Coast Broadwater. Dinner cruise: boards 5:30 PM · departs 6:00 PM · returns 8:00 PM. Lunch cruise (from 3 Oct): boards 11:30 AM · departs 12:00 PM · returns 2:00 PM.',
    stat: 'Adults from $99',
    col: 'span 12',
    row: 'span 1',
    img: '/sunset-boat.jpg',
    href: '/buffet-dinner-and-lunch-cruise',
    linkLabel: 'Book Now',
  },
];

function CharterCard({ c }: { c: CharterCard }) {
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.to(imgRef.current, {
        scale: hovered ? 1.06 : 1,
        duration: 0.75,
        ease: 'power2.out',
      });
      gsap.to(descRef.current, {
        opacity: hovered ? 1 : 0,
        y: hovered ? 0 : 8,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(linkRef.current, {
        opacity: hovered ? 1 : 0.75,
        duration: 0.35,
        ease: 'power2.out',
      });
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
        height: '100%',
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
            'linear-gradient(to top, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.38) 55%, rgba(10,22,40,0.1) 100%)',
        }}
      />
      <div className="absolute" style={{ left: 32, right: 32, bottom: 32 }}>
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
            fontSize: 'clamp(24px, 2.5vw, 38px)',
            color: 'var(--cream)',
            lineHeight: 1.1,
            marginBottom: 12,
            letterSpacing: '-0.01em',
          }}
        >
          {c.title}{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
            {c.em}
          </span>
        </div>
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
            <Icon name="anchor" size={10} color="var(--gold)" /> {c.stat}
          </span>
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
          {c.linkLabel ?? 'View Charter'}{' '}
          <Icon name="arrow" size={11} color="var(--gold)" />
        </span>
      </div>
    </a>
  );
}

export default function YachtChartersSection() {
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

      gsap.from(sectionRef.current!.querySelectorAll('.charter-card-wrap'), {
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
      id="charters"
      className="charters-section-wrap"
      style={{ padding: '110px 0', background: 'var(--navy)' }}
    >
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          maxWidth: 780,
          margin: '0 auto 72px',
          padding: '0 48px',
        }}
      >
        <Eyebrow>Private and Corporate Yacht Charter &middot; Gold Coast</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
          }}
        >
          Charter your own <ItalicEm>horizon</ItalicEm>.
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
          Full vessel hire for private celebrations, corporate retreats, and
          wedding receptions — tailored to every detail, from catering to
          destination.
        </p>
      </div>

      <div
        className="charter-mosaic"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '340px',
          gap: 2,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 48px',
        }}
      >
        {CHARTERS.filter(c => DINING_CRUISES_AVAILABLE || c.href !== '/buffet-dinner-and-lunch-cruise').map((c, i) => (
          <div
            key={i}
            className="charter-card-wrap"
            style={{ gridColumn: c.col, gridRow: c.row }}
          >
            <CharterCard c={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
