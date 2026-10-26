'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow, ItalicEm, Button } from './Shared';
import { SUN_GODDESS, MERMAID_SPIRIT } from '@/lib/vessels';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Style constants ───────────────────────────────────────────────────────────

export const GL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 9,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  fontWeight: 600,
  marginBottom: 8,
};

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CharterPackage {
  title: string;
  time?: string;
  duration?: string;
  capacity?: string;
  description: string;
  highlights: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

// ── CHARTER HERO ──────────────────────────────────────────────────────────────

export function CharterHero({
  eyebrow,
  headline,
  subtext,
  image,
  ctas,
}: {
  eyebrow: string;
  headline: React.ReactNode;
  subtext: string;
  image: string;
  ctas: { label: string; href: string; variant?: 'primary' | 'ghost' }[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 14, ease: 'none' },
      );
      gsap.from(textRef.current!.querySelectorAll('.hr'), {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.15,
      });
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: heroRef },
  );

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
          backgroundImage: `url(${image})`,
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
        style={{
          paddingLeft: 80,
          paddingRight: 48,
          paddingTop: 100,
          paddingBottom: 88,
          maxWidth: 1200,
        }}
      >
        <div className="hr section-eyebrow" style={{ marginBottom: 24 }}>
          {eyebrow}
        </div>
        <h1
          className="hr"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(48px, 7vw, 92px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            marginBottom: 28,
          }}
        >
          {headline}
        </h1>
        <p
          className="hr"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            lineHeight: 1.75,
            color: 'rgba(245,240,232,0.72)',
            letterSpacing: '0.03em',
            maxWidth: 560,
            marginBottom: 44,
            fontWeight: 300,
          }}
        >
          {subtext}
        </p>
        <div className="hr flex flex-wrap gap-3">
          {ctas.map((cta) => (
            <Button
              key={cta.label}
              variant={cta.variant ?? 'primary'}
              href={cta.href}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CHARTER OVERVIEW (2-col text + image) ─────────────────────────────────────

export function CharterOverview({
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  imageRight = true,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string[];
  image: string;
  imageRight?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.rv'), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  const textCol = (
    <div>
      <div className="rv">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        className="rv"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(32px, 4vw, 52px)',
          lineHeight: 1.05,
          marginBottom: 32,
        }}
      >
        {title}
        {titleAccent && (
          <>
            <br />
            <ItalicEm>{titleAccent}</ItalicEm>
          </>
        )}
      </h2>
      {description.map((p, i) => (
        <p
          key={i}
          className="rv"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.78)',
            lineHeight: 1.85,
            marginBottom: 16,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );

  const imgCol = (
    <div className="rv" style={{ position: 'relative' }}>
      <div
        style={{
          aspectRatio: '4/5',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 24,
          bottom: -24,
          ...(imageRight ? { right: -24, left: 24 } : { left: -24, right: 24 }),
          border: '1px solid rgba(201,168,76,0.1)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy)' }}
    >
      <div
        className="cruise-overview-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        {imageRight ? (
          <>
            {textCol}
            {imgCol}
          </>
        ) : (
          <>
            {imgCol}
            {textCol}
          </>
        )}
      </div>
    </section>
  );
}

// ── CHARTER PACKAGES ──────────────────────────────────────────────────────────

export function CharterPackages({ packages }: { packages: CharterPackage[] }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.pk'), {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>Our Packages</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Tailored to your <ItalicEm>occasion</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
          }}
        >
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="pk"
              style={{
                background: 'var(--navy-mid)',
                padding: '44px 36px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ ...GL, marginBottom: 12 }}>
                Package {String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 28,
                  color: 'var(--cream)',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                {pkg.title}
              </div>
              {(pkg.time || pkg.duration || pkg.capacity) && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  {pkg.time && (
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        padding: '5px 12px',
                      }}
                    >
                      Departs {pkg.time}
                    </span>
                  )}
                  {pkg.duration && (
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.6)',
                        border: '1px solid rgba(245,240,232,0.15)',
                        padding: '5px 12px',
                      }}
                    >
                      {pkg.duration}
                    </span>
                  )}
                  {pkg.capacity && (
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.6)',
                        border: '1px solid rgba(245,240,232,0.15)',
                        padding: '5px 12px',
                      }}
                    >
                      {pkg.capacity}
                    </span>
                  )}
                </div>
              )}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(245,240,232,0.65)',
                  lineHeight: 1.75,
                  marginBottom: 28,
                }}
              >
                {pkg.description}
              </p>
              <div
                style={{
                  marginTop: 'auto',
                  borderTop: '1px solid rgba(201,168,76,0.15)',
                  paddingTop: 24,
                }}
              >
                {pkg.highlights.map((h, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        height: 3,
                        background: 'var(--gold)',
                        flexShrink: 0,
                        borderRadius: '50%',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.72)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── VESSEL CARDS ──────────────────────────────────────────────────────────────

export function VesselCards() {
  const VESSELS = [
    {
      name: 'Mermaid Spirit',
      tagline: 'Tri-deck catamaran',
      specs: ['150 day guests', '22 overnight guests', '3 decks'],
      description:
        'A stunning tri-deck catamaran offering three distinct levels of entertainment. Equipped with jet skis, kayaks, scuba gear, a stinger-proof pool, and paddle boards.',
      href: '/mermaid-spirit-gold-coast',
      img: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=800&q=80',
    },
    {
      name: 'Sun Goddess',
      tagline: '114ft luxury superyacht',
      specs: ['135 day guests', 'Dual bars', 'Watersports deck'],
      description:
        "Gold Coast's premier luxury superyacht. Spacious decks, dual bars, state-of-the-art sound, and fully customisable routes for any occasion.",
      href: '/sun-goddess-gold-coast',
      img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    },
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.vc'), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>The Fleet</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Two world-class <ItalicEm>vessels</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-overview-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
          }}
        >
          {VESSELS.map((v) => (
            <div
              key={v.name}
              className="vc"
              style={{
                background: 'var(--navy)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  aspectRatio: '16/9',
                  backgroundImage: `url(${v.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div
                style={{
                  padding: '40px 36px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ ...GL, marginBottom: 12 }}>{v.tagline}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 32,
                    color: 'var(--cream)',
                    lineHeight: 1.1,
                    marginBottom: 20,
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 20,
                  }}
                >
                  {v.specs.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        padding: '5px 12px',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                    marginBottom: 28,
                  }}
                >
                  {v.description}
                </p>
                <a
                  href={v.href}
                  onClick={(e) => {
                    // Only the homepage fleet anchor needs the stored-scroll
                    // handoff. A real page link is followed normally.
                    if (v.href !== '/#fleet') return;
                    e.preventDefault();
                    sessionStorage.setItem('scrollTo', '#fleet');
                    window.location.href = '/';
                  }}
                  style={{
                    marginTop: 'auto',
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderTop: '1px solid rgba(201,168,76,0.15)',
                    paddingTop: 24,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                  }}
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

// ── INCLUSIONS + EXTRAS ───────────────────────────────────────────────────────

export function CharterInclusionsExtras() {
  const INCLUDED = [
    {
      label: 'Bars',
      detail:
        'Two fully stocked bars per vessel, with bar-tab and consumption options.',
    },
    {
      label: 'Entertainment Areas',
      detail:
        'Dedicated spaces for dancing, mingling and dining across each deck.',
    },
    {
      label: 'Captain & Crew',
      detail:
        'Professional captain and experienced crew for your entire charter.',
    },
    {
      label: 'Audio System',
      detail: 'Premium sound throughout — connect your playlist or bring a DJ.',
    },
    {
      label: 'Flat Screen TVs',
      detail:
        'Multiple screens for presentations, slideshows or entertainment.',
    },
    {
      label: 'Watersports',
      detail:
        'Canoes, stand-up paddleboards, stinger-proof pool, banana boats.',
    },
  ];

  const EXTRAS = [
    {
      label: 'Gourmet Catering',
      detail:
        'Canapés, platters, grazing boards, gourmet BBQ, buffet and fine dining via Private Chefs of Brisbane.',
    },
    {
      label: 'Bar Packages',
      detail:
        'Custom drinks packages with premium spirits, wines, beer and cocktails.',
    },
    {
      label: 'DJ or Live Band',
      detail: 'Professional entertainment matched to the vibe of your event.',
    },
    {
      label: 'Photography & Film',
      detail:
        'Professional photographers and videographers to capture every moment.',
    },
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ie'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          className="cruise-overview-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}
        >
          <div>
            <Eyebrow>What&rsquo;s Included</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.1,
                marginBottom: 48,
              }}
            >
              Everything you <ItalicEm>need on board</ItalicEm>.
            </h2>
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
              {INCLUDED.map((item, i) => (
                <div
                  key={i}
                  className="ie"
                  style={{
                    padding: '20px 0',
                    borderBottom: '1px solid rgba(201,168,76,0.12)',
                  }}
                >
                  <div style={{ ...GL, marginBottom: 6 }}>{item.label}</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      color: 'rgba(245,240,232,0.62)',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Optional Extras</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.1,
                marginBottom: 48,
              }}
            >
              Elevate your <ItalicEm>experience</ItalicEm>.
            </h2>
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
              {EXTRAS.map((item, i) => (
                <div
                  key={i}
                  className="ie"
                  style={{
                    padding: '20px 0',
                    borderBottom: '1px solid rgba(201,168,76,0.12)',
                  }}
                >
                  <div style={{ ...GL, marginBottom: 6 }}>{item.label}</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      color: 'rgba(245,240,232,0.62)',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── DESTINATIONS ──────────────────────────────────────────────────────────────

export function CharterDestinations() {
  const REGIONS = [
    {
      name: 'Gold Coast',
      places: [
        'Wave Break Island',
        'Sanctuary Cove',
        'Jumpinpin',
        'Scottish Prince Wreck',
      ],
    },
    {
      name: 'Moreton Bay',
      places: [
        'Brisbane River',
        'Tangalooma',
        'Moreton Island',
        'Stradbroke Island',
      ],
    },
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.dt'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>Destinations</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Your charter, <ItalicEm>your route</ItalicEm>.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.75,
              maxWidth: 560,
              margin: '20px auto 0',
              fontWeight: 300,
            }}
          >
            Departing from Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast — 10
            minutes from Surfers Paradise. Free parking available.
          </p>
        </div>
        <div
          className="cruise-overview-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
          }}
        >
          {REGIONS.map((region) => (
            <div
              key={region.name}
              className="dt"
              style={{ background: 'var(--navy)', padding: '52px 48px' }}
            >
              <div style={{ ...GL, marginBottom: 20 }}>{region.name}</div>
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                {region.places.map((place) => (
                  <div
                    key={place}
                    style={{
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.1)',
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 24,
                      color: 'var(--cream)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        background: 'var(--gold)',
                        borderRadius: '50%',
                        flexShrink: 0,
                        display: 'inline-block',
                      }}
                    />
                    {place}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export function CharterFAQ({ items }: { items: FaqItem[] }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.fq'), {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>Frequently Asked</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Good to <ItalicEm>know</ItalicEm>.
          </h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
          {items.map((item, i) => (
            <div
              key={i}
              className="fq"
              style={{
                padding: '32px 0',
                borderBottom: '1px solid rgba(201,168,76,0.12)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--cream)',
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                {item.q}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(245,240,232,0.65)',
                  lineHeight: 1.8,
                }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CHARTER BOOKING CTA ───────────────────────────────────────────────────────

export function CharterBookingCTA({
  heading,
  headingAccent,
  subtext,
}: {
  heading?: string;
  headingAccent?: string;
  subtext?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.bc'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: '120px 80px',
        background: 'var(--navy)',
        textAlign: 'center',
        borderTop: '1px solid rgba(201,168,76,0.12)',
      }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="bc">
          <Eyebrow>Get in Touch</Eyebrow>
        </div>
        <h2
          className="bc"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          {heading ?? 'Ready to plan your'}{' '}
          <ItalicEm>{headingAccent ?? 'charter?'}</ItalicEm>
        </h2>
        <p
          className="bc"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'rgba(245,240,232,0.62)',
            lineHeight: 1.8,
            marginBottom: 48,
            fontWeight: 300,
          }}
        >
          {subtext ??
            "Our team works with you to build an experience that's uniquely yours. Send an enquiry and we'll be in touch within 24 hours."}
        </p>
        <div className="bc flex justify-center gap-4 flex-wrap">
          <Button variant="primary" href="/#inquiry">
            Booking Enquiry
          </Button>
          <Button variant="ghost" href="tel:+61477667644">
            +61 477 667 644
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── CORPORATE SERVICE TYPES ───────────────────────────────────────────────────

export function CorporateServiceTypes() {
  const TYPES = [
    'Corporate Retreats',
    'Team Building Activities',
    'Client Entertainment',
    'Conference Venues',
    'Meeting Spaces',
    'Networking Events',
    'Product Launches',
    'Award Ceremonies',
    'Charity Events',
    'CSR Events',
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.st'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: '80px 80px',
        background: 'var(--navy)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow>Event Types</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.05,
            }}
          >
            Every occasion, <ItalicEm>elevated</ItalicEm>.
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          {TYPES.map((type) => (
            <div
              key={type}
              className="st"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cream)',
                border: '1px solid rgba(201,168,76,0.25)',
                padding: '14px 28px',
                fontWeight: 400,
              }}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WEDDING ADDITIONAL SERVICES ───────────────────────────────────────────────

export function WeddingAdditionalServices() {
  const SERVICES = [
    {
      label: 'Photography & Videography',
      detail:
        'Professional photographers and videographers capture every precious moment on the water.',
    },
    {
      label: 'DJ or Live Band',
      detail:
        'Entertainment tailored to your style — from a jazz quartet to DJ sets that keep the dance floor alive.',
    },
    {
      label: 'Floral Arrangements',
      detail:
        'Curated floral design to complement the setting — from the ceremony arch to table centrepieces.',
    },
    {
      label: 'Wedding Planning',
      detail:
        'Our experienced event team coordinates every detail so you can focus on enjoying your day.',
    },
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ws'), {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>Additional Services</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Every detail, <ItalicEm>taken care of</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.label}
              className="ws"
              style={{ background: 'var(--navy)', padding: '44px 32px' }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: 'var(--gold)',
                  marginBottom: 24,
                }}
              />
              <div style={{ ...GL, marginBottom: 14 }}>{s.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.62)',
                  lineHeight: 1.75,
                }}
              >
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CATERING MENU GRID ────────────────────────────────────────────────────────

export function CateringMenuGrid() {
  const MENUS = [
    {
      label: 'Grazing Boards',
      detail:
        'Abundant boards of artisan cheeses, cured meats, seasonal fruit and house-made accompaniments. Perfect for mingling guests.',
      img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
    },
    {
      label: 'Canapés',
      detail:
        'Elegant bite-sized creations passed by our crew — crafted from the finest Australian produce by our culinary partners.',
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    },
    {
      label: 'Gourmet BBQ',
      detail:
        'A relaxed yet premium feast — market fish, premium meats, salads and sides grilled to perfection on the sun deck.',
      img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
    },
    {
      label: 'Buffet',
      detail:
        'Generous, self-serve spreads built around Australian cuisine. Ideal for larger groups and extended charters.',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    },
    {
      label: 'Fine Dining',
      detail:
        'A seated multi-course experience with matched wines — elevated, intimate, and unforgettable for your most special occasions.',
      img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
    },
    {
      label: 'Drinks Packages',
      detail:
        'Premium beverage packages tailored to your group — from sparkling on arrival to fully stocked bars with craft spirits and cocktails.',
      img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    },
  ];

  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.cm'), {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <Eyebrow>Catering Options</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Cuisine crafted for <ItalicEm>the water</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-menu-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
          }}
        >
          {MENUS.map((menu) => (
            <div
              key={menu.label}
              className="cm"
              style={{ background: 'var(--navy)', overflow: 'hidden' }}
            >
              <div
                style={{
                  height: 200,
                  backgroundImage: `url(${menu.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              />
              <div style={{ padding: '32px 32px 40px' }}>
                <div style={{ ...GL, marginBottom: 12 }}>{menu.label}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                  }}
                >
                  {menu.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CHARTER INFO BOX (navy overview / bottom CTA box) ────────────────────────

export function CharterInfoBox({
  heading,
  children,
  compact = false,
  vesselOrder = ['sun-goddess', 'mermaid-spirit'] as (
    | 'sun-goddess'
    | 'mermaid-spirit'
  )[],
}: {
  heading: string;
  children?: React.ReactNode;
  compact?: boolean;
  vesselOrder?: ('sun-goddess' | 'mermaid-spirit')[];
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ib'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  const buttons = vesselOrder.map((v) =>
    v === 'sun-goddess'
      ? {
          label: 'View The Sun Goddess →',
          vessel: 'sun-goddess',
          href: `/${SUN_GODDESS.slug}`,
        }
      : {
          label: 'View The Mermaid Spirit →',
          vessel: 'mermaid-spirit',
          href: `/${MERMAID_SPIRIT.slug}`,
        },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: compact ? '40px 48px' : '64px 48px',
        background: 'var(--navy)',
      }}
    >
      <div
        className="charter-info-inner"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          border: '1px solid rgba(201,168,76,0.2)',
          background: 'var(--navy-mid)',
          padding: compact ? '48px 64px' : '60px 72px',
          position: 'relative',
        }}
      >
        {/* Corner accents */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
          <div
            key={c}
            style={{
              position: 'absolute',
              top: c.startsWith('t') ? 0 : 'auto',
              bottom: c.startsWith('b') ? 0 : 'auto',
              left: c.endsWith('l') ? 0 : 'auto',
              right: c.endsWith('r') ? 0 : 'auto',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 28,
                height: 1,
                background: 'var(--gold)',
                transform: c.endsWith('r') ? 'translateX(-100%)' : undefined,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1,
                height: 28,
                background: 'var(--gold)',
                transform: c.startsWith('b') ? 'translateY(-100%)' : undefined,
              }}
            />
          </div>
        ))}

        <h2
          className="ib"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.6vw, 20px)',
            fontWeight: 700,
            color: 'var(--gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          {heading}
        </h2>

        {children && <div className="ib">{children}</div>}

        <div
          className="ib"
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {buttons.map((b) => (
            <a
              key={b.vessel}
              href={b.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#0A1628',
                background: '#C9A84C',
                padding: '13px 26px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              {b.label}
            </a>
          ))}
        </div>

        <div className="ib" style={{ textAlign: 'center', marginTop: 28 }}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="2.5" />
            <line x1="12" y1="7.5" x2="12" y2="19" />
            <path d="M6 12 C6 12 6 19 12 19 C18 19 18 12 18 12" />
            <line x1="3" y1="12" x2="21" y2="12" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── CHARTER PHOTO ROW ─────────────────────────────────────────────────────────

export function CharterPhotoRow({ images }: { images: string[] }) {
  return (
    <div
      className="charter-photo-row"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            height: 280,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </div>
  );
}

// ── CHARTER GALLERY (folder-based slider + lightbox) ──────────────────────────

const PER_PAGE = 3;

const circleArrow: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: 52,
  height: 52,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(6,15,28,0.65)',
  border: '1px solid rgba(201,168,76,0.28)',
  backdropFilter: 'blur(8px)',
  cursor: 'pointer',
  padding: 0,
  transition: 'border-color 0.3s, background 0.3s',
};

export function CharterGallery({ folder }: { folder: string }) {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left');
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/gallery/${folder}`)
      .then((r) => r.json())
      .then((data: { images?: string[] }) => setImages(data.images ?? []))
      .catch(() => {});
  }, [folder]);

  const totalPages = Math.max(1, Math.ceil(images.length / PER_PAGE));

  const goTo = (nextPage: number, dir: 'left' | 'right') => {
    setSlideDir(dir);
    setPage(nextPage);
    setAnimKey((k) => k + 1);
  };

  const prev = () => goTo((page - 1 + totalPages) % totalPages, 'right');
  const next = () => goTo((page + 1) % totalPages, 'left');

  const lbPrev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  const lbNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  const lbClose = () => setActiveIndex(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') lbClose();
      if (e.key === 'ArrowLeft') lbPrev();
      if (e.key === 'ArrowRight') lbNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, images.length]);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  if (images.length === 0) {
    return <div style={{ height: 340, background: 'var(--navy)' }} />;
  }

  const visible = images.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const pageLabel = `${String(page + 1).padStart(2, '0')} / ${String(totalPages).padStart(2, '0')}`;

  return (
    <>
      <style>{`
        @keyframes galSlideLeft {
          from { opacity: 0; transform: translateX(56px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes galSlideRight {
          from { opacity: 0; transform: translateX(-56px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* ── Slider ── */}
      <div style={{ background: 'var(--navy)', paddingBottom: 72 }}>
        <div style={{ position: 'relative' }}>
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous photos"
            style={{ ...circleArrow, left: 16 }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--gold)';
              el.style.background = 'rgba(201,168,76,0.12)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(201,168,76,0.28)';
              el.style.background = 'rgba(6,15,28,0.65)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 4 L6 9 L11 14"
                stroke="var(--gold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Image grid — key changes trigger slide-in animation */}
          <div
            key={animKey}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              animation:
                animKey > 0
                  ? `${slideDir === 'left' ? 'galSlideLeft' : 'galSlideRight'} 0.52s cubic-bezier(0.22, 1, 0.36, 1) both`
                  : 'none',
            }}
          >
            {visible.map((img, i) => {
              const globalIndex = page * PER_PAGE + i;
              const isHovered = hoveredImg === globalIndex;
              return (
                <button
                  key={img}
                  onClick={() => setActiveIndex(globalIndex)}
                  onMouseEnter={() => setHoveredImg(globalIndex)}
                  onMouseLeave={() => setHoveredImg(null)}
                  aria-label={`Open photo ${globalIndex + 1}`}
                  style={{
                    height: 320,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: 'none',
                    cursor: 'zoom-in',
                    padding: 0,
                    display: 'block',
                    position: 'relative',
                    transition: 'transform 0.45s ease',
                    transform: isHovered ? 'scale(1.015)' : 'scale(1)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isHovered
                        ? 'rgba(10,22,40,0.3)'
                        : 'rgba(10,22,40,0)',
                      transition: 'background 0.4s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(201,168,76,0.9)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                      }}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next photos"
            style={{ ...circleArrow, right: 16 }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--gold)';
              el.style.background = 'rgba(201,168,76,0.12)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(201,168,76,0.28)';
              el.style.background = 'rgba(6,15,28,0.65)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M7 4 L12 9 L7 14"
                stroke="var(--gold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Premium pagination — thin lines + counter */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 18,
              paddingTop: 32,
            }}
          >
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > page ? 'left' : 'right')}
                  aria-label={`Go to page ${i + 1}`}
                  style={{
                    width: i === page ? 36 : 14,
                    height: 1.5,
                    background:
                      i === page ? 'var(--gold)' : 'rgba(201,168,76,0.22)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'block',
                    transition:
                      'width 0.42s cubic-bezier(0.4, 0, 0.2, 1), background 0.42s ease',
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 9,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--gold-ink)',
                userSelect: 'none',
              }}
            >
              {pageLabel}
            </span>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {activeIndex !== null && (
        <div
          onClick={lbClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(6,15,28,0.97)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={lbClose}
            aria-label="Close lightbox"
            style={{
              position: 'absolute',
              top: 20,
              right: 28,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(245,240,232,0.7)',
              fontSize: 38,
              lineHeight: 1,
              fontWeight: 200,
              padding: '4px 8px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                'rgba(245,240,232,0.7)';
            }}
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                lbPrev();
              }}
              aria-label="Previous"
              style={{
                ...circleArrow,
                position: 'fixed',
                left: 20,
                top: '50%',
                width: 56,
                height: 56,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--gold)';
                el.style.background = 'rgba(201,168,76,0.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(201,168,76,0.28)';
                el.style.background = 'rgba(6,15,28,0.65)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 4 L6 9 L11 14"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <img
            src={images[activeIndex]}
            alt={`Photo ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '88vw',
              maxHeight: '84vh',
              objectFit: 'contain',
              display: 'block',
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          />

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                lbNext();
              }}
              aria-label="Next"
              style={{
                ...circleArrow,
                position: 'fixed',
                right: 20,
                top: '50%',
                width: 56,
                height: 56,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--gold)';
                el.style.background = 'rgba(201,168,76,0.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(201,168,76,0.28)';
                el.style.background = 'rgba(6,15,28,0.65)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M7 4 L12 9 L7 14"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div
            style={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.4)',
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(images.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </>
  );
}

// ── CHARTER SPLIT SECTION (left text + right accordion) ───────────────────────

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(201,168,76,0.14)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          padding: '18px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--cream)',
            fontWeight: 600,
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: 'var(--gold)',
            fontSize: 22,
            fontWeight: 300,
            lineHeight: 1,
            flexShrink: 0,
            transition: 'transform 0.25s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: 20,
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.8,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export interface AccordionSection {
  title: string;
  content: React.ReactNode;
}

export function CharterSplitSection({
  leftContent,
  accordionSections,
}: {
  leftContent: React.ReactNode;
  accordionSections: AccordionSection[];
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.sp'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--navy)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div
        className="charter-split-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
        }}
      >
        <div
          className="sp charter-split-col"
          style={{ padding: '72px 56px 72px 48px' }}
        >
          {leftContent}
        </div>
        <div
          className="sp charter-split-right"
          style={{
            padding: '72px 48px 72px 48px',
            borderLeft: '1px solid rgba(201,168,76,0.1)',
            background: 'var(--navy-mid)',
          }}
        >
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.14)' }}>
            {accordionSections.map((s) => (
              <AccordionItem key={s.title} title={s.title}>
                {s.content}
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CATERING CONSULTATION ─────────────────────────────────────────────────────

export function CateringConsultation() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.cc'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 80px', background: 'var(--navy-mid)' }}
    >
      <div
        className="cruise-overview-grid"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 80,
          alignItems: 'center',
        }}
      >
        <div>
          <div className="cc">
            <Eyebrow>Custom Menus</Eyebrow>
          </div>
          <h2
            className="cc"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Talk to us about your <ItalicEm>catering requirements</ItalicEm>.
          </h2>
          <p
            className="cc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Every charter is different. We work with our culinary partners to
            build menus that suit your guest count, dietary requirements, and
            occasion. Get in touch and we&rsquo;ll take care of the rest.
          </p>
        </div>
        <div className="cc" style={{ flexShrink: 0 }}>
          <Button variant="primary" href="/#inquiry">
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
