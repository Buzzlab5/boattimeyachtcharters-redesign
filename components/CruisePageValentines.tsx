'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './Nav';
import Footer from './Footer';
import { CharterGallery } from './CharterSections';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Shared styles ─────────────────────────────────────────────────────────────

const GL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 9,
  letterSpacing: '0.28em',
  textTransform: 'uppercase' as const,
  color: 'var(--gold)',
  fontWeight: 600,
};

// ── Anchor SVG ────────────────────────────────────────────────────────────────

function AnchorSvg() {
  return (
    <svg
      width="44" height="44" viewBox="0 0 24 24"
      fill="none" stroke="var(--gold)"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', margin: '0 auto' }}
    >
      <circle cx="12" cy="5" r="2.5" />
      <line x1="12" y1="7.5" x2="12" y2="19" />
      <path d="M6 12 C6 12 6 19 12 19 C18 19 18 12 18 12" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

// ── Navy CTA box (matching original "BOARDING…" and "DEPARTS…" boxes) ─────────

function ValCTABox({ title, bookHref }: { title: string; bookHref: string }) {
  return (
    <section
      className="cruise-section"
      style={{
        background: 'var(--navy)',
        padding: '72px 40px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle wave background */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: 0.06, pointerEvents: 'none',
        }}
        preserveAspectRatio="none"
        viewBox="0 0 1200 300"
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const y = 12 + i * 16;
          return (
            <path
              key={i}
              d={`M0 ${y} Q300 ${y - 10} 600 ${y} Q900 ${y + 10} 1200 ${y}`}
              stroke="white" strokeWidth="1" fill="none"
            />
          );
        })}
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--gold)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 36,
            maxWidth: 700,
            margin: '0 auto 36px',
          }}
        >
          {title}
        </h2>

        {/* Location row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 48,
            flexWrap: 'wrap',
            marginBottom: 44,
          }}
        >
          {/* Ship icon + location 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20L12 4l10 16H2z"/>
              <line x1="12" y1="4" x2="12" y2="14"/>
              <line x1="7" y1="14" x2="17" y2="14"/>
            </svg>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'rgba(245,240,232,0.85)', letterSpacing: '0.04em',
            }}>
              Boarding at 5.30. From Marine Stadium Jetty & Pontoon, Main Beach
            </span>
          </div>

          {/* Anchor icon + location 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2" />
              <line x1="12" y1="7" x2="12" y2="17" />
              <path d="M6 11 C6 11 6 17 12 17 C18 17 18 11 18 11" />
              <line x1="3" y1="11" x2="21" y2="11" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'rgba(245,240,232,0.85)', letterSpacing: '0.04em',
            }}>
              Marine Stadium Jetty & Pontoon, Main Beach QLD 4217
            </span>
          </div>
        </div>

        {/* Book Now button */}
        <a
          href={bookHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 44px',
            border: '1px solid var(--gold)',
            color: 'var(--gold)',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 44,
            transition: 'background 0.25s, color 0.25s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'var(--gold)';
            el.style.color = '#0A1628';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'transparent';
            el.style.color = 'var(--gold)';
          }}
        >
          Enquire &rarr;
        </a>

        <AnchorSvg />
      </div>

      {/* Gold rope border */}
      <div
        style={{
          marginTop: 40,
          height: 10,
          background:
            'repeating-linear-gradient(90deg, var(--gold) 0px, var(--gold) 8px, transparent 8px, transparent 14px)',
          opacity: 0.45,
        }}
      />
    </section>
  );
}

// ── Inline accordion (single itinerary item) ──────────────────────────────────

function ItineraryAccordion() {
  const [open, setOpen] = useState(false);

  const ITEMS = [
    { time: '5:30 PM', label: 'Boarding — Welcome aboard with sparkling wine or premium beer' },
    { time: '6:00 PM', label: 'Departure from Marine Stadium Jetty & Pontoon, Main Beach' },
    { time: '6:30 PM', label: 'Canapés served on deck as you cruise the Broadwater' },
    { time: '7:00 PM', label: 'Gourmet dinner served in the dining room or al fresco on deck' },
    { time: '8:00 PM', label: 'Return journey as you enjoy the Gold Coast city lights' },
    { time: '8:30 PM', label: 'Arrival back at Marine Stadium Jetty & Pontoon, Main Beach' },
  ];

  return (
    <section
      className="cruise-section"
      style={{
        background: 'var(--navy)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        padding: '0 48px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            width: '100%',
            padding: '28px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            borderBottom: open ? '1px solid rgba(201,168,76,0.12)' : 'none',
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
            Itinerary
          </span>
          <span
            style={{
              color: 'var(--gold)',
              fontSize: 26,
              fontWeight: 300,
              lineHeight: 1,
              transition: 'transform 0.25s',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}
          >
            +
          </span>
        </button>

        {open && (
          <div style={{ padding: '24px 0 40px' }}>
            {ITEMS.map((item) => (
              <div
                key={item.time}
                style={{
                  display: 'flex',
                  gap: 32,
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(201,168,76,0.08)',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    ...GL,
                    flexShrink: 0,
                    minWidth: 64,
                    fontSize: 10,
                  }}
                >
                  {item.time}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: 'rgba(245,240,232,0.72)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Valentine's menu card ─────────────────────────────────────────────────────

function DinnerMenuCard() {
  const MENU = [
    'Roasted Garlic, Spinach, and Three Cheese Arancini (V)',
    'Smoked Salmon Blini with Dill Cream Cheese and Black Caviar',
    'Baked Chicken and Pesto Spoon with Vine Ripe Tomato (GF)',
    'Thick Vegetable Spring Rolls with Plum Sauce (VG)',
    'Diced Chicken, Tomato, Onion, and Basil Bruschetta',
    'Sicilian Chicken with Parsley, Seasoning, and Lemon Zest Wrapped in Puff Pastry',
    'Beef Croquette with Pan Sauce',
    'Tempura Battered Tiger Prawn with Black Caviar Aioli',
  ];

  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid rgba(201,168,76,0.25)',
        padding: '52px 40px 48px',
        position: 'relative',
      }}
    >
      {/* Top gold bar */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: 'var(--gold)',
        }}
      />

      {/* Corner accents */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
        <div
          key={c}
          style={{
            position: 'absolute',
            top: c.startsWith('t') ? 12 : 'auto',
            bottom: c.startsWith('b') ? 12 : 'auto',
            left: c.endsWith('l') ? 12 : 'auto',
            right: c.endsWith('r') ? 12 : 'auto',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: 20, height: 1,
            background: 'rgba(201,168,76,0.4)',
            transform: c.endsWith('r') ? 'translateX(-100%)' : undefined,
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: 1, height: 20,
            background: 'rgba(201,168,76,0.4)',
            transform: c.startsWith('b') ? 'translateY(-100%)' : undefined,
          }} />
        </div>
      ))}

      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ ...GL, marginBottom: 8, fontSize: 8 }}>Valentine&rsquo;s Day</div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 32,
            color: 'var(--cream)',
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          Dinner Menu
        </h3>
        <div
          style={{
            width: 48,
            height: 1,
            background: 'var(--gold)',
            margin: '20px auto 0',
            opacity: 0.6,
          }}
        />
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {MENU.map((item) => (
          <li
            key={item}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid rgba(201,168,76,0.08)',
              display: 'flex',
              alignItems: 'flex-start',
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
                marginTop: 6,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'rgba(245,240,232,0.78)',
                lineHeight: 1.65,
                letterSpacing: '0.02em',
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Heart motif */}
      <div style={{ textAlign: 'center', marginTop: 32, opacity: 0.5 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--gold)">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ValentinesPage() {
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
      scrollTrigger: {
        trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true,
      },
    });
  }, { scope: heroRef });

  const SPECS = [
    'Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast',
    'Two guests',
    'Enquire for this year',
    '2.5 Hours',
    'Sparkling or Beer on Arrival',
    'Canapés',
  ];

  const pStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'rgba(245,240,232,0.72)',
    lineHeight: 1.85,
    marginBottom: 16,
    fontWeight: 300,
  };

  const dropCap: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: 64,
    float: 'left',
    lineHeight: 0.78,
    color: 'var(--gold)',
    marginRight: 8,
    marginTop: 8,
    fontStyle: 'italic',
  };

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'flex-end' }}
        >
          <div
            ref={bgRef}
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: 'url(/sungoddess-page-boat.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.55) 55%, rgba(10,22,40,0.18) 100%), linear-gradient(to top, rgba(10,22,40,0.94) 0%, rgba(10,22,40,0.08) 50%)',
            }}
          />

          {/* Two-column hero content */}
          <div
            ref={textRef}
            className="relative z-10 w-full cruise-hero-content cruise-page-split"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              padding: '100px 80px 88px',
              maxWidth: 1400,
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* Left: heading + CTA */}
            <div>
              <div className="hr section-eyebrow" style={{ marginBottom: 24 }}>
                BOATTIME YC LUXURY
              </div>
              <h1
                className="hr"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(40px, 6vw, 80px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  color: 'var(--cream)',
                  marginBottom: 44,
                }}
              >
                Luxury Valentines Cruise
              </h1>
              <div className="hr">
                <a
                  href="#book"
                  className="hero-gold-tag"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 36px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Enquire &rarr;
                </a>
              </div>
            </div>

            {/* Right: spec checklist */}
            <div className="hr">
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {SPECS.map((spec) => (
                  <li
                    key={spec}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(201,168,76,0.12)',
                    }}
                  >
                    {/* Gold checkmark */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.85)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {spec}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Top CTA box ── */}
        <ValCTABox
          title="BOARDING 5:30PM ON THE 14TH OF FEBRUARY"
          bookHref="#book"
        />

        {/* ── Photo gallery ── */}
        <CharterGallery folder="valentines-day-images" />

        {/* ── Split: description left · menu card right ── */}
        <section className="cruise-section" style={{ background: 'var(--navy)', borderTop: '1px solid rgba(201,168,76,0.08)', padding: '0 0' }}>
          <div
            className="cruise-page-split"
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: 0,
            }}
          >
            {/* Left: description */}
            <div className="charter-split-col" style={{ padding: '80px 56px 80px 48px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  color: 'var(--gold)',
                  lineHeight: 1.15,
                  marginBottom: 40,
                }}
              >
                Spoil your loved one this Valentines Day
              </h2>

              <p style={pStyle}>
                <span style={dropCap}>E</span>xperience the ultimate in luxury this Valentine&rsquo;s Day with Boattime Yacht
                Charters&rsquo; exclusive Superyacht Cruise. As you board at 5.30pm, you&rsquo;ll be
                welcomed aboard with a glass of sparkling, setting the tone for a lavish evening
                on the open water.
              </p>

              <p style={{ ...pStyle, clear: 'both' }}>
                Our professional photographers will be on hand to capture a memorable boarding photo,
                the perfect memento of this special occasion. As the sun sets on the horizon, you&rsquo;ll
                be treated to a gourmet dinner prepared by our talented culinary team, served in the
                elegant dining room or al fresco on the deck.
              </p>

              <p style={pStyle}>
                Throughout the evening, our fully stocked bar will offer a range of top-quality
                drinks to choose from, ensuring that you and your loved one have a truly indulgent
                experience. And with a variety of entertainment options on board, there&rsquo;s
                something for everyone to enjoy.
              </p>

              <p style={pStyle}>
                When the night comes to a close, our experienced crew will ensure a smooth and safe
                return to shore at 8.30pm. Don&rsquo;t miss out on this unforgettable opportunity to
                celebrate Valentine&rsquo;s Day in the lap of luxury. Enquire about this
                year&rsquo;s Boattime Yacht Charters Valentine&rsquo;s Day Superyacht Cruise.
              </p>
            </div>

            {/* Right: dinner menu card */}
            <div
              className="charter-split-right"
              style={{
                padding: '80px 48px',
                borderLeft: '1px solid rgba(201,168,76,0.1)',
                background: 'var(--navy)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <DinnerMenuCard />
            </div>
          </div>
        </section>

        {/* ── Itinerary accordion ── */}
        <ItineraryAccordion />

        {/* ── Bottom CTA box ── */}
        <ValCTABox
          title="DEPARTS 5:30PM ON THE 14TH OF FEBRUARY"
          bookHref="#book"
        />

        {/* ── Booking widget ── */}
        <section
          id="book"
          className="cruise-section"
          style={{
            background: 'var(--navy-mid, #0d1f38)',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            padding: '80px 48px 100px',
          }}
        >
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ ...GL, marginBottom: 16, display: 'block' }}>Enquire</div>
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
                Enquire about your <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>evening</em>.
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
                Dates and tickets for this year are confirmed on enquiry. Sun
                Goddess is also available as a private charter.
              </p>
            </div>

            {/* The Rezdy widget here pointed at zzz-luxury-valentines-sunset-cruise
                (product PM0Q7Y). ZZZ is this account's own marker for a retired
                product and it has no sessions, so the widget rendered a checkout
                that could not sell anything. Enquiry route until a product is
                loaded, with the two dining cruises that ARE bookable offered
                beside it. */}
            <div
              style={{
                border: '1px solid rgba(201,168,76,0.15)',
                background: 'rgba(255,255,255,0.02)',
                padding: '48px 24px',
                textAlign: 'center',
              }}
            >
              <a
                href="/#inquiry"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: '#0A1628',
                  background: '#C9A84C',
                  padding: '14px 28px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Enquire about Valentine&rsquo;s Day
              </a>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.6)',
                  lineHeight: 1.8,
                  marginTop: 24,
                }}
              >
                Booking tonight instead? The{' '}
                <a
                  href="/luxury-broadwater-cruise"
                  style={{ color: 'var(--gold)', textDecoration: 'none' }}
                >
                  sunset cruise
                </a>{' '}
                and the{' '}
                <a
                  href="/sunset-twilight-buffet-flavours-of-australia-aboard-the-mermaid-spirit"
                  style={{ color: 'var(--gold)', textDecoration: 'none' }}
                >
                  twilight dining cruise
                </a>{' '}
                both sail regularly.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
