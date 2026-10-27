'use client';

import Script from 'next/script';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteShell from './site/SiteShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ============================================================
   Gold Coast Helitours campaign page — presented by Boattime.
   Promotional landing page showcasing Gold Coast Helitours'
   scenic helicopter flights over the Gold Coast coast & city.
   Boattime presents this campaign as a thank-you to GCH for
   hosting Boattime's departures; Gold Coast Helitours assets.
   ============================================================ */

const GCH_TOURS = [
  { n: 1, duration: '5 min', name: 'Broadwater Scenic', adult: 85, child: 75, route: 'Main Beach, Sea World, Wave Break Island and South Stradbroke Island — a quick lap of the harbour from above.', img: 'https://goldcoasthelitours-redesign.vercel.app/assets/tours/tour1.jpg' },
  { n: 2, duration: '10 min', name: 'Local City Scenic', adult: 155, child: 135, route: 'Gold Coast Turf Club, The Star, Broadbeach, Surfers Paradise, Main Beach and Sea World — the full city skyline.', img: 'https://goldcoasthelitours-redesign.vercel.app/assets/tours/tour2.jpg' },
  { n: 3, duration: '15 min', name: 'Golf Course Scenic', adult: 235, child: 205, route: 'Royal Pines, Bond University, Robina, The Star Casino, Broadbeach and the coastal foreshores northward.', img: 'https://goldcoasthelitours-redesign.vercel.app/assets/tours/tour3.jpg' },
  { n: 4, duration: '20 min', name: 'Stadium & Island', adult: 295, child: 275, route: 'Sea World, Sovereign Islands, Runaway Bay, Royal Pines, Robina, Hedges Avenue ("Millionaires Row") and Q1.', img: 'https://goldcoasthelitours-redesign.vercel.app/assets/tours/tour4.jpg' },
  { n: 6, duration: '30 min', name: 'Theme Parks Scenic', adult: 395, child: 375, route: 'South Stradbroke Island, Sovereign Islands, Sanctuary Cove, Coomera, Dreamworld, Movie World and the beaches.', img: 'https://goldcoasthelitours-redesign.vercel.app/assets/tours/tour6.jpg' },
  { n: 7, duration: '45 min', name: 'Ultimate G.C. Scenic', adult: 595, child: 575, route: 'Royal Pines, Tallebudgera and Currumbin Valleys, Point Danger, Tweed River, Fingal — the full Gold Coast experience.', img: 'https://goldcoasthelitours-redesign.vercel.app/assets/tours/tour7.jpg' },
];

// ── Icons ─────────────────────────────────────────────────────────────────────


function HeliIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6.5h18" />
      <path d="M12 6.5v3.2" />
      <path d="M6.5 13.2a3 3 0 0 1 3-3h3c2.6 0 4.8 1.4 6 3.3l-2.2 1.2H8.5a2 2 0 0 1-2-1.5z" />
      <path d="M9 16v2.2h6" />
      <path d="M4.5 18.2H9" />
    </svg>
  );
}

function BadgeCheckIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M12 2l2.4 1.8 3 .2.2 3L20 12l-2.4 2.8-.2 3-3 .2L12 20l-2.4-1.8-3-.2-.2-3L4 12l2.4-2.8.2-3 3-.2L12 2Z"
        opacity="0.45"
      />
      <path d="M8.5 12l2.4 2.4L16 9" />
    </svg>
  );
}

function Tick() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0, marginTop: 3 }}
      aria-hidden="true"
    >
      <path
        d="M2 7L5.5 10.5L12 4"
        stroke="var(--gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#C9A84C">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── Dual-brand lockup (real logos) ──────────────────────────────────────────────

function BrandLockup() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/gch-logo.png"
        alt="Gold Coast Helitours"
        style={{ height: 54, width: 'auto' }}
      />
    </div>
  );
}

// ── Section heading helper ──────────────────────────────────────────────────────

function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'center',
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? 760 : undefined,
        margin: align === 'center' ? '0 auto' : undefined,
      }}
    >
      <div
        className="section-eyebrow"
        style={{
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          marginBottom: 22,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(32px, 4.5vw, 58px)',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          color: 'var(--cream)',
          marginBottom: sub ? 20 : 0,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 580,
            margin: align === 'center' ? '0 auto' : undefined,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Marquee urgency strip ───────────────────────────────────────────────────────

function UrgencyStrip() {
  const items = [
    'SCENIC FLIGHTS · 7 DAYS A WEEK',
    'LIMITED SEATS EACH FLIGHT',
    `TOURS FROM $85`,
    '30+ YEARS OF FLIGHT',
    'INSTANT CONFIRMATION',
  ];
  const row = [...items, ...items];
  return (
    <div
      style={{
        background: 'var(--gold)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '12px 0',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: 0,
          animation: 'skyseaMarquee 26s linear infinite',
        }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              letterSpacing: '0.22em',
              fontWeight: 700,
              color: '#0A1628',
              padding: '0 28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 28,
            }}
          >
            {t}
            <span style={{ opacity: 0.4 }}>&bull;</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes skyseaMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

// ── Sticky bottom book bar ──────────────────────────────────────────────────────

function StickyBookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className="skysea-stickybar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(6,14,28,0.94)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderTop: '1px solid rgba(201,168,76,0.28)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        padding: '14px 32px',
        transform: show ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.4s cubic-bezier(0.2,0.6,0.2,1)',
      }}
    >
      <div className="skysea-stickybar-info" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
            }}
          >
            Gold Coast Helitours
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--cream)',
              marginTop: 3,
            }}
          >
            from <strong style={{ color: 'var(--gold-light)' }}>$85</strong> pp
            <span
              className="skysea-stickybar-save"
              style={{ color: 'rgba(245,240,232,0.5)', marginLeft: 10 }}
            >
              5 to 45 min flights
            </span>
          </div>
        </div>
      </div>
      <a href="#book" className="btn btn-primary btn-sm">
        Book Now
      </a>
      <style>{`@media (max-width:768px){.skysea-stickybar{padding:10px 16px !important}.skysea-stickybar-save{display:none !important}}`}</style>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CampaignSkyToSea() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoReady, setVideoReady] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.12 },
        { scale: 1, duration: 16, ease: 'none' },
      );
      gsap.from(textRef.current!.querySelectorAll('.hr'), {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power2.out',
        delay: 0.2,
      });
      gsap.to(bgRef.current, {
        yPercent: 18,
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

  const TESTIMONIALS = [
    {
      quote:
        'Seeing the whole Gold Coast laid out beneath us was unreal — the beaches, the skyline, the hinterland all in one loop. Hands-down the best thing we did on our trip.',
      name: 'Hannah & Marcus',
      detail: 'Scenic Flight · Melbourne',
    },
    {
      quote:
        'The flight was absolutely breathtaking. You don’t realise how beautiful this coastline is until you see it from the air — worth every cent.',
      name: 'David L.',
      detail: 'Scenic Flight · Sydney',
    },
    {
      quote:
        'Faultless from the heliport to landing. The crew made it feel seamless and genuinely special — a memory we won’t forget.',
      name: 'Priya R.',
      detail: 'Scenic Flight · Brisbane',
    },
  ];

  const FAQS = [
    {
      q: 'When can I take a scenic flight?',
      a: 'Gold Coast Helitours flies 7 days a week, year round, from 8:30am to 5:00pm — weather permitting. With seven routes to choose from, there’s a flight for every schedule.',
    },
    {
      q: 'What will I see from the air?',
      a: 'Depending on your route, you’ll take in Surfers Paradise, Main Beach, Sea World, the islands of the Broadwater, the hinterland golf courses, the theme parks and miles of coastline — the Gold Coast from a view most people never get.',
    },
    {
      q: 'How long do the flights go for?',
      a: 'Flights range from a quick 5-minute harbour lap right up to a 45-minute grand tour of the coast and hinterland, so you can pick the experience that suits you.',
    },
    {
      q: 'Is it suitable for kids and first-time flyers?',
      a: 'Absolutely — the flights are family-friendly and the pilots are the most experienced on the coast. If it’s your first time in a helicopter, you’re in safe hands.',
    },
    {
      q: 'How do I secure my seats?',
      a: 'Book online for instant confirmation, or enquire and the team will hold a spot for you. Seats per flight are strictly limited, so early booking is recommended.',
    },
  ];

  const ctaBlock = (
    label: string,
    style?: React.CSSProperties,
  ) => (
    <a href="#book" className="btn btn-primary" style={style}>
      {label}
    </a>
  );

  return (
    <>
      <Script
        src="https://boattimeyachtcharters.rezdy.com/pluginJs"
        strategy="lazyOnload"
      />
      <SiteShell>
        {/* ── Hero (helicopter video) ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{
            minHeight: '100vh',
            background: 'var(--navy)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            ref={bgRef}
            className="absolute inset-0 will-change-transform"
            style={{ inset: 0 }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onPlaying={() => setVideoReady(true)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                background: 'var(--navy)',
                opacity: videoReady ? 1 : 0,
                transition: 'opacity 0.7s ease',
              }}
            >
              <source src="/gch-hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.5) 55%, rgba(10,22,40,0.2) 100%), linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.04) 52%)',
            }}
          />

          <div
            ref={textRef}
            className="relative z-10 w-full cruise-hero-content"
            style={{
              paddingLeft: 80,
              paddingRight: 48,
              paddingTop: 120,
              paddingBottom: 128,
              maxWidth: 1240,
            }}
          >
            <div className="hr" style={{ marginBottom: 28 }}>
              <BrandLockup />
            </div>
            <div className="hr section-eyebrow" style={{ marginBottom: 22 }}>
              GOLD COAST HELITOURS · PRESENTED BY BOATTIME
            </div>
            <h1
              className="hr"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(32px, 5vw, 80px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--cream)',
                marginBottom: 22,
              }}
            >
              See the city from the{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>sky.</em>
              <br />
              A coastline you&rsquo;ll never{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>forget.</em>
            </h1>
            <p
              className="hr"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 2vw, 19px)',
                color: 'rgba(245,240,232,0.82)',
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: 560,
                marginBottom: 30,
              }}
            >
              A scenic helicopter flight over the Gold Coast with the region&rsquo;s
              most experienced pilots. Beaches, skyline, islands and hinterland —
              the whole coast laid out beneath you in one unforgettable loop.
            </p>

            {/* inline social proof + price */}
            <div
              className="hr"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                flexWrap: 'wrap',
                marginBottom: 34,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Stars />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'rgba(245,240,232,0.75)',
                    letterSpacing: '0.04em',
                  }}
                >
                  4.9 from 600+ guests
                </span>
              </div>
              <span style={{ color: 'rgba(201,168,76,0.4)' }}>|</span>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'rgba(245,240,232,0.75)',
                  letterSpacing: '0.04em',
                }}
              >
                Flights from{' '}
                <strong style={{ color: 'var(--gold-light)' }}>
                  $85
                </strong>{' '}
                pp · 5 to 45 min tours
              </div>
            </div>

            <div
              className="hr gch-btn-row"
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            >
              <a href="#book" className="btn btn-primary">
                Book Your Flight
              </a>
              <a href="#experience" className="btn btn-ghost">
                Explore the Flights
              </a>
            </div>
          </div>

          {/* Hero info bar */}
          <div className="hero-infobar">
            {[
              { label: 'Flights', value: 'From $85' },
              { label: 'Duration', value: '5 – 45 min', em: 'seven routes' },
              { label: 'Departs', value: 'Marina Mirage' },
              { label: 'Open', value: '7 days', em: 'a week' },
            ].map((c) => (
              <div key={c.label} className="hero-infobar-cell">
                <div className="hero-infobar-label">{c.label}</div>
                <div className="hero-infobar-value">
                  {c.value} {c.em && <em>· {c.em}</em>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Urgency marquee ── */}
        <UrgencyStrip />

        {/* ── The promise ── */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy)',
            padding: '104px 80px',
          }}
        >
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <SectionHead
              eyebrow="ONE COAST · A WHOLE NEW VIEW"
              title={
                <>
                  Most people see the Gold Coast from the ground.
                  <br />
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                    You&rsquo;ll see all of it.
                  </em>
                </>
              }
              sub="Boattime is proud to put Gold Coast Helitours in the spotlight — the region&rsquo;s most experienced scenic flight operator. From several hundred feet up, the beaches, skyline, islands and hinterland come together in a single breathtaking view."
            />

            <div
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 2,
                marginTop: 56,
                background: 'rgba(201,168,76,0.16)',
                border: '1px solid rgba(201,168,76,0.18)',
              }}
            >
              {[
                { num: '7', label: 'Scenic routes' },
                { num: '30+', label: 'Years of flight' },
                { num: '100%', label: 'Safety record' },
                { num: '$85', label: 'Flights from' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="stat-item"
                  style={{
                    background: 'var(--navy)',
                    padding: '42px 24px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      fontSize: 'clamp(38px, 5vw, 64px)',
                      color: 'var(--gold)',
                      lineHeight: 1,
                      marginBottom: 12,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.6)',
                      fontWeight: 600,
                      lineHeight: 1.5,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GCH Scenic Flights Catalog ── */}
        <section
          id="experience"
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            padding: '104px 80px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <SectionHead
              eyebrow="SCENIC FLIGHTS · CHOOSE YOUR TOUR"
              title={
                <>
                  Seven routes.{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                    One coast.
                  </em>
                </>
              }
              sub="From a five-minute harbour buzz to a 45-minute grand tour of the hinterland — every flight departs from Mirage Heliport at Marina Mirage, Main Beach. Minimum two adults per booking."
            />

            {/* Tours grid */}
            <style>{`@media (max-width:768px){.gch-tours-grid{grid-template-columns:1fr !important;margin-top:40px !important}.gch-tours-grid>div{min-width:0}.gch-tours-foot{flex-wrap:wrap;gap:14px !important}}`}</style>
            <div
              className="gch-tours-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                marginTop: 56,
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.14)',
              }}
            >
              {GCH_TOURS.map((t) => (
                <div key={t.n} style={{ background: 'var(--navy)', display: 'flex', flexDirection: 'column' }}>
                  <div className="photo-overlay-card" style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={t.img}
                      alt={t.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 55%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 16,
                        left: 20,
                        fontFamily: 'var(--font-body)',
                        fontSize: 9,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        fontWeight: 600,
                      }}
                    >
                      Tour {t.n} · {t.duration} flight
                    </div>
                  </div>
                  <div style={{ padding: '28px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        fontSize: 24,
                        color: 'var(--cream)',
                        marginBottom: 10,
                        lineHeight: 1.15,
                      }}
                    >
                      {t.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.55)',
                        lineHeight: 1.75,
                        fontWeight: 300,
                        flex: 1,
                        marginBottom: 22,
                      }}
                    >
                      {t.route}
                    </p>
                    <div className="gch-tours-foot" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
                      <div style={{ display: 'flex', gap: 20 }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: 4 }}>Adult</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 30, color: 'var(--gold)', lineHeight: 1 }}>${t.adult}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: 4 }}>Child</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 30, color: 'rgba(201,168,76,0.55)', lineHeight: 1 }}>${t.child}</div>
                        </div>
                      </div>
                      <a href="#book" className="btn btn-primary" style={{ fontSize: 11, padding: '10px 20px', whiteSpace: 'nowrap' }}>
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="gch-btn-row" style={{ textAlign: 'center', marginTop: 48, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#book" className="btn btn-primary">Book Below via Rezdy</a>
              <a href="https://www.goldcoasthelitours.com.au/scenic-flights" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                View on their website
              </a>
            </div>
          </div>
        </section>

        {/* ── GCH Brand Spotlight ── */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy)',
            borderTop: '1px solid rgba(201,168,76,0.08)',
            overflow: 'hidden',
          }}
        >
          <style>{`@media (max-width:768px){.gch-spot-content{padding:48px 20px 44px !important;justify-content:flex-start !important;min-width:0 !important}.gch-spot-stats{grid-template-columns:repeat(2,1fr) !important}.gch-spot-img{min-height:300px !important;min-width:0 !important}.gch-contact-grid{grid-template-columns:1fr !important;gap:22px 0 !important}.gch-contact-val{word-break:break-word}.gch-badges img{height:84px !important;width:84px !important}.gch-proof{gap:14px !important;flex-wrap:nowrap !important}.gch-proof-item{flex:1 1 0 !important;min-width:0 !important;flex-direction:column !important;align-items:center !important;text-align:center;gap:12px !important}.gch-proof-item>div{display:flex !important;flex-direction:column !important;align-items:center !important}.gch-btn-row{display:grid !important;grid-template-columns:minmax(0,max-content) !important;justify-content:start !important;gap:12px !important;max-width:100% !important}.gch-btn-row--center{justify-content:center !important}.gch-btn-row>.btn{width:auto !important;justify-self:stretch !important;max-width:100% !important}}`}</style>
          <div
            className="cruise-page-split"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: 640,
            }}
          >
            {/* Left: content */}
            <div
              className="gch-spot-content"
              style={{
                padding: '96px 64px 96px 80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ marginBottom: 26 }}>
                <img
                  src="/gch-logo.png"
                  alt="Gold Coast Helitours"
                  style={{ height: 48, objectFit: 'contain', objectPosition: 'left' }}
                />
              </div>
              <div className="section-eyebrow" style={{ marginBottom: 20 }}>
                OUR PARTNER IN THE SKY
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(30px, 3.8vw, 56px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--cream)',
                  marginBottom: 26,
                }}
              >
                Thirty years.<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>One heliport.</em><br />
                Zero incidents.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14.5,
                  color: 'rgba(245,240,232,0.7)',
                  lineHeight: 1.85,
                  fontWeight: 300,
                  maxWidth: 480,
                  marginBottom: 38,
                }}
              >
                Gold Coast Helitours has been lifting off from their private heliport at Marina Mirage since the early 1990s — CASA-certified, flown by the region&rsquo;s most experienced pilots, and recognised three years running as a Best of Queensland Experience. They are the reason you&rsquo;ll see the Gold Coast from several hundred feet in the air.
              </p>
              <div
                className="gch-spot-stats"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 2,
                  background: 'rgba(201,168,76,0.14)',
                  border: '1px solid rgba(201,168,76,0.18)',
                  marginBottom: 40,
                }}
              >
                {[
                  { num: '30+', label: 'Years of flight' },
                  { num: '100%', label: 'Safety record' },
                  { num: '3×', label: 'Best of QLD' },
                  { num: '7 days', label: 'A week' },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{ background: 'var(--navy)', padding: '24px 16px', textAlign: 'center' }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        fontSize: 28,
                        color: 'var(--gold)',
                        lineHeight: 1,
                        marginBottom: 8,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 8.5,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.5)',
                        fontWeight: 600,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="gch-btn-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a
                  href="https://www.goldcoasthelitours.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit Gold Coast Helitours
                </a>
                <a href="tel:+61755918457" className="btn btn-ghost">
                  07 5591 8457
                </a>
              </div>
            </div>
            {/* Right: image */}
            <div className="gch-spot-img" style={{ position: 'relative', overflow: 'hidden', minHeight: 500 }}>
              <img
                src="/gch-heli.jpg"
                alt="Gold Coast Helitours helicopter over the coast"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  position: 'absolute',
                  inset: 0,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to right, rgba(10,22,40,0.55) 0%, transparent 45%)',
                }}
              />
            </div>
          </div>
        </section>

        {/* ── GCH Location & Awards ── */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy)',
            padding: '104px 80px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div
              className="cruise-itinerary-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 0.7fr',
                gap: 80,
                alignItems: 'center',
              }}
            >
              <div>
                <div className="section-eyebrow" style={{ marginBottom: 20 }}>
                  VISIT THEM DIRECTLY
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    fontSize: 'clamp(28px, 3.5vw, 52px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--cream)',
                    marginBottom: 36,
                  }}
                >
                  Find them at<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Marina Mirage.</em>
                </h2>
                <div
                  className="gch-contact-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px 48px',
                    marginBottom: 44,
                  }}
                >
                  {[
                    { label: 'Address', value: '74 Seaworld Drive, Main Beach QLD 4217' },
                    { label: 'Phone', value: '07 5591 8457' },
                    { label: 'Hours', value: '8:30am – 5:00pm · 7 days a week' },
                    { label: 'Email', value: 'info@goldcoasthelitours.com.au' },
                  ].map((d) => (
                    <div key={d.label}>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 8.5,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'var(--gold)',
                          fontWeight: 600,
                          marginBottom: 7,
                        }}
                      >
                        {d.label}
                      </div>
                      <div
                        className="gch-contact-val"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 13.5,
                          color: 'rgba(245,240,232,0.72)',
                          lineHeight: 1.55,
                          fontWeight: 300,
                        }}
                      >
                        {d.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="gch-btn-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <a
                    href="https://www.goldcoasthelitours.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Visit their website
                  </a>
                  <a
                    href="https://maps.google.com/?q=74+Seaworld+Drive+Main+Beach+QLD+4217"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    Get directions
                  </a>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 8.5,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.35)',
                    fontWeight: 600,
                    marginBottom: 28,
                  }}
                >
                  Recommended by Travellers
                </div>
                <div className="gch-badges" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                  {['2023', '2024', '2025'].map((year) => (
                    <img
                      key={year}
                      src={`/badge-${year}.png`}
                      alt={`Best of Queensland Experience ${year}`}
                      style={{ height: 110, width: 110, objectFit: 'contain' }}
                    />
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    color: 'rgba(245,240,232,0.35)',
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginTop: 22,
                  }}
                >
                  Best of Queensland Experience<br />2023 · 2024 · 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Value stack / savings ── */}
        {/* <section
          className="cruise-section"
          style={{
            background: 'var(--navy)',
            padding: '104px 80px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <SectionHead
              eyebrow="THE BUNDLE"
              title={
                <>
                  Two premium experiences.{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                    One smart price.
                  </em>
                </>
              }
            />

            <div
              className="cruise-overview-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 24,
                marginTop: 56,
                alignItems: 'stretch',
              }}
            >
              <div
                style={{
                  background: 'var(--navy-mid)',
                  border: '1px solid rgba(201,168,76,0.14)',
                  padding: '44px 44px 48px',
                }}
              >
                <div
                  className="cruise-page-split"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0 40px',
                  }}
                >
                  {[
                    { head: 'In the air', icon: <HeliIcon size={22} />, items: INCLUSIONS_SKY },
                    { head: 'On the water', icon: <WhaleIcon size={22} />, items: INCLUSIONS_SEA },
                  ].map((col) => (
                    <div key={col.head}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          paddingBottom: 16,
                          marginBottom: 16,
                          borderBottom: '1px solid rgba(201,168,76,0.16)',
                        }}
                      >
                        {col.icon}
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 400,
                            fontSize: 19,
                            color: 'var(--cream)',
                          }}
                        >
                          {col.head}
                        </span>
                      </div>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {col.items.map((it) => (
                          <li
                            key={it}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 10,
                              padding: '8px 0',
                            }}
                          >
                            <Tick />
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 13,
                                color: 'rgba(245,240,232,0.76)',
                                lineHeight: 1.55,
                              }}
                            >
                              {it}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: 'var(--navy-mid)',
                  border: '1px solid var(--gold)',
                  padding: '44px 40px 46px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                    marginBottom: 22,
                  }}
                >
                  Sky to Sea Bundle
                </div>

                {[
                  { label: 'Scenic helicopter flight', val: `$${HELI_PRICE}` },
                  { label: 'Luxury whale cruise', val: `$${CRUISE_PRICE}` },
                ].map((r) => (
                  <div
                    key={r.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '9px 0',
                      borderBottom: '1px solid rgba(245,240,232,0.06)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.7)',
                      }}
                    >
                      {r.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.5)',
                        textDecoration: 'line-through',
                      }}
                    >
                      {r.val}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '12px 0 6px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'rgba(245,240,232,0.55)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Booked separately
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      color: 'rgba(245,240,232,0.55)',
                      textDecoration: 'line-through',
                    }}
                  >
                    ${SEPARATE_TOTAL}
                  </span>
                </div>

                <div style={{ margin: '20px 0 8px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    Bundle price · per person
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        fontSize: 'clamp(48px, 6vw, 64px)',
                        color: 'var(--cream)',
                        lineHeight: 1,
                      }}
                    >
                      ${BUNDLE_PRICE}
                    </span>
                    <span
                      className="hero-gold-tag"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        padding: '5px 12px',
                      }}
                    >
                      Save ${SAVING}
                    </span>
                  </div>
                </div>

                {ctaBlock('Book the Bundle', { width: '100%', marginTop: 22 })}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10.5,
                    color: 'rgba(245,240,232,0.4)',
                    lineHeight: 1.6,
                    marginTop: 16,
                    textAlign: 'center',
                  }}
                >
                  Indicative pricing — final figures confirmed with Gold Coast
                  Helitours.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* ── Trust band (risk reversal + reassurance) ── */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            padding: '92px 80px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <SectionHead
              eyebrow="BOOK WITH CONFIDENCE"
              title={
                <>
                  No catch.{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                    Just the view.
                  </em>
                </>
              }
            />
            <div
              className="cruise-3col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                marginTop: 52,
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.14)',
              }}
            >
              {[
                {
                  icon: <HeliIcon size={28} />,
                  title: 'Every seat’s a window',
                  body: 'Every flight gives you sweeping, unobstructed views of the coast — there’s no bad seat in the aircraft.',
                },
                {
                  icon: <BadgeCheckIcon />,
                  title: 'Instant confirmation',
                  body: 'Book online in minutes and your seats in the sky are locked in straight away.',
                },
                {
                  icon: (
                    <div style={{ paddingTop: 4 }}>
                      <Stars size={17} />
                    </div>
                  ),
                  title: 'Rated five stars',
                  body: 'Hundreds of five-star reviews for Gold Coast Helitours from travellers across the world.',
                },
              ].map((c) => (
                <div
                  key={c.title}
                  style={{ background: 'var(--navy)', padding: '46px 40px 50px' }}
                >
                  <div style={{ marginBottom: 22, minHeight: 28 }}>{c.icon}</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontSize: 24,
                      color: 'var(--cream)',
                      marginBottom: 14,
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13.5,
                      color: 'rgba(245,240,232,0.68)',
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social proof — star blocks ── */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy)',
            padding: '80px 40px 24px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <SectionHead
            eyebrow="LOVED BY GUESTS"
            title={
              <>
                Rated{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                  five stars
                </em>{' '}
                by travellers
              </>
            }
          />
          <div
            className="gch-proof"
            style={{
              maxWidth: 760,
              margin: '48px auto 0',
              display: 'flex',
              justifyContent: 'center',
              gap: 80,
              flexWrap: 'wrap',
            }}
          >
            {[
              { name: 'Boattime Yacht Charters', rating: '5.0 Stars · 2,047 Reviews', net: 'fb' },
              { name: 'Gold Coast Helitours', rating: '4.9 Stars · 600+ Reviews', net: 'google' },
            ].map((b) => (
              <div key={b.name} className="gch-proof-item" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {b.net === 'fb' ? (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'var(--cream)',
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {b.name}
                  </div>
                  <Stars />
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      color: 'rgba(245,240,232,0.55)',
                      marginTop: 3,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {b.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section
          className="cruise-section"
          style={{ background: 'var(--navy)', padding: '40px 80px 104px' }}
        >
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div
              className="cruise-3col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
              }}
            >
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: 'var(--navy-mid)',
                    border: '1px solid rgba(201,168,76,0.12)',
                    padding: '36px 34px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ marginBottom: 20 }}>
                    <Stars />
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      fontSize: 19,
                      lineHeight: 1.5,
                      color: 'var(--cream)',
                      letterSpacing: '-0.01em',
                      marginBottom: 28,
                      flex: 1,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'var(--cream)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9.5,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      fontWeight: 500,
                      marginTop: 6,
                    }}
                  >
                    {t.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ (objection handling) ── */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            padding: '104px 80px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div
            className="cruise-itinerary-grid"
            style={{
              maxWidth: 1080,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '0.8fr 1.2fr',
              gap: 64,
              alignItems: 'start',
            }}
          >
            <div>
              <SectionHead
                align="left"
                eyebrow="GOOD TO KNOW"
                title={
                  <>
                    Questions,{' '}
                    <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                      answered
                    </em>
                  </>
                }
              />
              <div style={{ marginTop: 28 }}>{ctaBlock('Book Now')}</div>
            </div>

            <div>
              {FAQS.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={f.q}
                    style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 20,
                        padding: '22px 0',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 400,
                          fontSize: 'clamp(18px, 2.2vw, 23px)',
                          color: open ? 'var(--gold-light)' : 'var(--cream)',
                          lineHeight: 1.25,
                          transition: 'color 0.2s',
                        }}
                      >
                        {f.q}
                      </span>
                      <span
                        style={{
                          flexShrink: 0,
                          color: 'var(--gold)',
                          fontSize: 22,
                          fontWeight: 300,
                          transform: open ? 'rotate(45deg)' : 'rotate(0)',
                          transition: 'transform 0.25s',
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      style={{
                        maxHeight: open ? 240 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.35s ease, opacity 0.25s',
                        opacity: open ? 1 : 0,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          color: 'rgba(245,240,232,0.7)',
                          lineHeight: 1.8,
                          fontWeight: 300,
                          padding: '0 0 24px',
                          maxWidth: 580,
                        }}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Closing urgency band ── */}
        <section
          className="cta-band"
          style={{
            position: 'relative',
            padding: '120px 40px',
            textAlign: 'center',
            overflow: 'hidden',
            borderTop: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/gch-heli.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,22,40,0.86), rgba(6,14,28,0.92))',
            }}
          />
          <div
            className="cta-band-content"
            style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}
          >
            <div
              className="section-eyebrow"
              style={{ justifyContent: 'center', marginBottom: 22 }}
            >
              SCENIC FLIGHTS · SEATS ARE LIMITED
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: 'var(--cream)',
                marginBottom: 24,
              }}
            >
              Don&rsquo;t just visit the Gold Coast.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-light)', whiteSpace: 'nowrap' }}>
                See all of it.
              </em>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'rgba(245,240,232,0.78)',
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: 520,
                margin: '0 auto 36px',
              }}
            >
              There are only so many seats in the sky each day. Lock in your
              scenic flight with Gold Coast Helitours and see the coast the way it
              was meant to be seen.
            </p>
            {ctaBlock('Book Your Flight')}
          </div>
        </section>

        {/* ── Book Now (Rezdy — dummy) ── */}
        <section
          id="book"
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            padding: '100px 48px 130px',
          }}
        >
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div
                className="section-eyebrow"
                style={{ justifyContent: 'center', marginBottom: 18 }}
              >
                BOOK YOUR SCENIC FLIGHT
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(32px, 4.5vw, 56px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: 'var(--cream)',
                  marginBottom: 16,
                }}
              >
                Reserve your{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                  seats
                </em>
                .
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(245,240,232,0.62)',
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: '0 auto',
                  fontWeight: 300,
                }}
              >
                Gold Coast Helitours flies 7 days a week, year round. Limited
                daily departures — book early to secure your seat in the sky.
              </p>
            </div>

            <div style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.02)' }}>
              <iframe
                seamless
                width="100%"
                height="1000px"
                frameBorder="0"
                className="rezdy"
                src="https://boattimeyachtcharters.rezdy.com/catalog/651100/helitours?iframe=true"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </section>
      </SiteShell>
      <StickyBookBar />
    </>
  );
}
