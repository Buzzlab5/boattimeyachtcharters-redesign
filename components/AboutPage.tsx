'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteShell from './site/SiteShell';
import FaqEnquiry from './site/FaqEnquiry';
import PageHero from './site/PageHero';
import { Eyebrow, ItalicEm, Button } from './Shared';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 9,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  fontWeight: 600,
  marginBottom: 8,
};

// ── Hero ──────────────────────────────────────────────────────────────────────

function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef   = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(bgRef.current, { scale: 1.08 }, { scale: 1, duration: 14, ease: 'none' });
    gsap.from(textRef.current!.querySelectorAll('.hr'), {
      y: 30, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'power2.out', delay: 0.15,
    });
    gsap.to(bgRef.current, {
      yPercent: 25, ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex items-end"
      style={{ minHeight: '100vh', background: 'var(--navy)' }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            'url(/sun-goddess-main-upscale.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.6) 55%, rgba(10,22,40,0.22) 100%), linear-gradient(to top, rgba(10,22,40,0.94) 0%, rgba(10,22,40,0.08) 50%)',
        }}
      />
      <div
        ref={textRef}
        className="relative z-10 w-full cruise-hero-content"
        style={{ paddingLeft: 80, paddingRight: 48, paddingTop: 100, paddingBottom: 88, maxWidth: 1200 }}
      >
        <div className="hr section-eyebrow" style={{ marginBottom: 24 }}>
          Gold Coast · Est. 2013
        </div>
        <h1
          className="hr"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(48px, 7vw, 92px)', lineHeight: 0.95,
            letterSpacing: '-0.02em', color: 'var(--cream)', marginBottom: 28,
          }}
        >
          About{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Boattime</em>
        </h1>
        <p
          className="hr"
          style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75,
            color: 'rgba(245,240,232,0.72)', letterSpacing: '0.03em',
            maxWidth: 560, marginBottom: 48, fontWeight: 300,
          }}
        >
          Your premier destination for unforgettable maritime experiences on the stunning Gold Coast.
        </p>
        <div className="hr flex flex-wrap gap-6">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 42, color: 'var(--gold-light)', lineHeight: 1,
              }}
            >
              5.0
            </div>
            <div style={{ ...GL, marginTop: 6, marginBottom: 0 }}>Facebook · 2,047 reviews</div>
          </div>
          <div
            style={{
              width: 1, background: 'rgba(201,168,76,0.3)',
              alignSelf: 'stretch', margin: '0 8px',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 42, color: 'var(--gold-light)', lineHeight: 1,
              }}
            >
              4.7
            </div>
            <div style={{ ...GL, marginTop: 6, marginBottom: 0 }}>Google · 1,863 reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About Us (2-col) ──────────────────────────────────────────────────────────

function AboutIntro() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.rv'), {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 80px', background: 'var(--navy)' }}>
      <div
        className="cruise-overview-grid"
        style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
        }}
      >
        <div>
          <div className="rv"><Eyebrow>Who We Are</Eyebrow></div>
          <h2
            className="rv"
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, marginBottom: 32,
            }}
          >
            Gold Coast&rsquo;s most <ItalicEm>trusted charter</ItalicEm>.
          </h2>
          <p className="rv" style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300, color: 'rgba(245,240,232,0.78)', lineHeight: 1.85, marginBottom: 20 }}>
            Boattime Yacht Charters is home to two of the Gold Coast&rsquo;s finest superyachts — the 114ft
            Sun Goddess and the tri-deck Mermaid Spirit. Together they host everything from intimate sunset
            escapes to large-scale corporate events and milestone celebrations.
          </p>
          <p className="rv" style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300, color: 'rgba(245,240,232,0.78)', lineHeight: 1.85, marginBottom: 40 }}>
            Whether you&rsquo;re booking a whale watching adventure, a luxury cruise ticket, or a fully
            bespoke private charter — our crew, our vessels, and our experience are here to make it
            exceptional.
          </p>
          <div className="rv" style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid rgba(201,168,76,0.12)' }}>
            {[
              'Whale Watching Adventures',
              'Sunset & Broadwater Cruises',
              'Riverfire Cruises',
              'New Year & Special Events',
              'Valentine\'s & Romantic Cruises',
              'Private & Corporate Charters',
            ].map((s) => (
              <div
                key={s}
                style={{
                  padding: '14px 0', borderBottom: '1px solid rgba(201,168,76,0.1)',
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.08em',
                  color: 'rgba(245,240,232,0.72)',
                }}
              >
                <span
                  style={{
                    width: 4, height: 4, background: 'var(--gold)',
                    borderRadius: '50%', flexShrink: 0,
                  }}
                />
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="rv" style={{ position: 'relative' }}>
          <div
            style={{
              aspectRatio: '4/5',
              backgroundImage:
                'url(/sungoddess-page-boat.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(201,168,76,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute', top: 24, right: -24, bottom: -24, left: 24,
              border: '1px solid rgba(201,168,76,0.1)', zIndex: -1, pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Social proof strip ────────────────────────────────────────────────────────

function SocialProofStrip() {
  const STATS = [
    { value: '5.0', suffix: '★', label: 'Facebook Rating', sub: 'Based on 2,047 reviews' },
    { value: '4.7', suffix: '★', label: 'Google Rating',   sub: 'Based on 1,863 reviews' },
    { value: '12+', suffix: '',  label: 'Years Operating', sub: 'Gold Coast & Brisbane' },
    { value: '2',   suffix: '',  label: 'World-class Vessels', sub: 'Sun Goddess & Mermaid Spirit' },
  ];

  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.sp'), {
      y: 20, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
    });
  }, { scope: ref });

  return (
    <div ref={ref} style={{ background: 'var(--gold)' }}>
      <div
        className="grid stats-grid"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1200, margin: '0 auto' }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className="sp"
            style={{
              padding: '44px 40px',
              borderRight: i < 3 ? '1px solid rgba(10,22,40,0.15)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#0a1628', opacity: 0.9, fontWeight: 600,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: 'clamp(40px, 5vw, 60px)', color: '#0a1628',
                lineHeight: 1, letterSpacing: '-0.02em',
              }}
            >
              {s.value}
              {s.suffix && (
                <span style={{ fontStyle: 'italic', fontSize: '0.5em', opacity: 0.9, marginLeft: 4 }}>
                  {s.suffix}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)', fontSize: 11,
                color: '#0a1628', opacity: 0.85, letterSpacing: '0.05em',
              }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Our Superyachts ───────────────────────────────────────────────────────────

function OurSuperyachts() {
  const VESSELS = [
    {
      name: 'Sun Goddess',
      tagline: '114ft Luxury Superyacht',
      img: '/sun-goddess-main-upscale.png',
      specs: [
        { label: 'Capacity', value: '135 Guests' },
        { label: 'Size',     value: '34m (114ft)' },
        { label: 'Decks',    value: '2 Levels' },
        { label: 'Bars',     value: '2 Onboard' },
      ],
      features: [
        'Dual bars & entertainment areas',
        'Dual-level galley',
        'Speakers throughout',
        'Watersports deck',
        'Award-winning catering available',
      ],
      href: '/sun-goddess-gold-coast',
    },
    {
      name: 'Mermaid Spirit',
      tagline: 'Tri-deck Catamaran',
      img: '/mermaid-spirit-main.jpg',
      specs: [
        { label: 'Capacity', value: '150 Guests' },
        { label: 'Size',     value: '30m (100ft)' },
        { label: 'Decks',    value: '3 Levels' },
        { label: 'Bars',     value: '2 Onboard' },
      ],
      features: [
        'Three expansive decks',
        "Chef's kitchen & well-appointed galley",
        'Sun lounge & stinger-proof pool',
        'Jet skis, kayaks & paddleboards',
        'Scuba gear available',
      ],
      href: '/mermaid-spirit-gold-coast',
    },
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.sy'), {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 80px', background: 'var(--navy-mid)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>Meet Our Fleet</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05,
            }}
          >
            Two extraordinary <ItalicEm>superyachts</ItalicEm>.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'rgba(201,168,76,0.08)' }}>
          {VESSELS.map((v, vi) => (
            <div
              key={v.name}
              className="sy about-vessel"
              style={{
                background: 'var(--navy-mid)',
                display: 'grid',
                // minmax(0, 1fr): a plain 1fr lets the photo's own size widen its column and squeeze the text
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                gap: 0,
              }}
            >
              <div
                className="about-vessel-photo"
                style={{
                  minHeight: 420,
                  backgroundImage: `url(${v.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  order: vi % 2 === 0 ? 0 : 1,
                }}
              />
              <div
                className="about-vessel-text"
                style={{
                  padding: '64px 56px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  order: vi % 2 === 0 ? 1 : 0,
                }}
              >
                <div style={{ ...GL, marginBottom: 12 }}>{v.tagline}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontSize: 44, color: 'var(--cream)', lineHeight: 1.05, marginBottom: 32,
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: 2, background: 'rgba(201,168,76,0.08)', marginBottom: 36,
                  }}
                >
                  {v.specs.map((spec) => (
                    <div
                      key={spec.label}
                      style={{ background: 'var(--navy-mid)', padding: '16px 18px' }}
                    >
                      <div style={{ ...GL, marginBottom: 4 }}>{spec.label}</div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)', fontStyle: 'italic',
                          fontSize: 20, color: 'var(--cream)',
                        }}
                      >
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 28, marginBottom: 36 }}>
                  {v.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 3, height: 3, background: 'var(--gold)',
                          borderRadius: '50%', flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: 13,
                          color: 'rgba(245,240,232,0.72)', letterSpacing: '0.04em',
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={v.href}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none',
                    fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  View {v.name} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services grid ─────────────────────────────────────────────────────────────

function ServicesGrid() {
  const SERVICES = [
    {
      label: 'Luxury Whale Watching',
      desc: 'June – November · 2.5 hrs · Daily departures',
      href: '/cruise-tickets-luxury-whale-watching',
    },
    {
      label: 'Luxury Scenic Sunset Cruise',
      desc: 'Year-round · 2.5 hrs · Couples & families',
      href: '/luxury-broadwater-cruise',
    },
    {
      label: 'Riverfire Cruise',
      desc: 'Annual event · Brisbane River · Limited tickets',
      href: '/riverfire-2026',
    },
    {
      label: 'NYE Cruise 2027',
      desc: 'New Year\'s Eve · 18+ · Canapés & fireworks',
      href: '/nye-2027',
    },
    {
      label: 'Valentine\'s Cruise',
      desc: 'February · Romantic · Photography included',
      href: '/valentines-day',
    },
    {
      label: 'Private Charters',
      desc: 'Any occasion · Fully tailored · Up to 135 guests',
      href: '/private-yacht-charter',
    },
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.sg'), {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 80px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>What We Offer</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05,
            }}
          >
            Every kind of <ItalicEm>experience on the water</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2, background: 'rgba(201,168,76,0.08)',
          }}
        >
          {SERVICES.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="sg"
              style={{
                background: 'var(--navy)', padding: '44px 36px',
                textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 12,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--navy)';
              }}
            >
              <div style={{ width: 32, height: 1, background: 'var(--gold)' }} />
              <div
                style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontSize: 26, color: 'var(--cream)', lineHeight: 1.1,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  color: 'rgba(245,240,232,0.55)', lineHeight: 1.6, letterSpacing: '0.04em',
                }}
              >
                {s.desc}
              </div>
              <div
                style={{
                  marginTop: 'auto', fontFamily: 'var(--font-body)', fontSize: 9,
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'var(--gold)', fontWeight: 600,
                }}
              >
                Learn more →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.bc'), {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: '120px 80px', background: 'var(--navy-mid)',
        textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.12)',
      }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="bc"><Eyebrow>Get in Touch</Eyebrow></div>
        <h2
          className="bc"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, marginBottom: 24,
          }}
        >
          Ready to experience <ItalicEm>Boattime?</ItalicEm>
        </h2>
        <p
          className="bc"
          style={{
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
            color: 'rgba(245,240,232,0.62)', lineHeight: 1.8, marginBottom: 48,
          }}
        >
          Whether you&rsquo;re booking a cruise ticket or planning a fully bespoke private charter —
          our team is ready to help you create something unforgettable.
        </p>
        <div className="bc flex justify-center gap-4 flex-wrap">
          <Button variant="primary" href="/#inquiry">Booking Enquiry</Button>
          <Button variant="ghost" href="tel:+61477667644">+61 477 667 644</Button>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <SiteShell>
        <PageHero
          image="/sun-goddess-main-upscale.png"
          imageAlt="Sun Goddess superyacht on the Gold Coast"
          eyebrow="Gold Coast · Est. 2013"
          title={<>About <em>Boattime</em></>}
          lead="Your premier destination for unforgettable maritime experiences on the stunning Gold Coast."
          stats={[
            { value: '5.0', label: 'Facebook rating', stars: true },
            { value: '4.7', label: 'Google rating', stars: true },
          ]}
        />
        <div className="st-zigzag st-legacy">
        <AboutIntro />
        <SocialProofStrip />
        <OurSuperyachts />
        <ServicesGrid />
        <AboutCTA />
      <FaqEnquiry faqs={[]} />
        </div>
      </SiteShell>
    </>
  );
}
