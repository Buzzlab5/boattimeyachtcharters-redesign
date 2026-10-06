'use client';

import Script from 'next/script';
import Nav from './Nav';
import Footer from './Footer';
import DiningUnavailableNotice from './DiningUnavailableNotice';
import { DINING_CRUISES_AVAILABLE } from '@/lib/products';
import { CruiseHero, CruiseGallery, CruiseItinerary } from './CruiseSections';
import type { ReactNode } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────

const GL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 9,
  letterSpacing: '0.28em',
  textTransform: 'uppercase' as const,
  color: 'var(--gold)',
  fontWeight: 600,
};

const GALLERY_MAIN = '/sunset-buffet/sunset-buffet1.jpg';
const GALLERY_THUMBS = [
  '/sunset-buffet/sunset-buffet2.jpg',
  '/sunset-buffet/sunset-buffet3.jpg',
  '/sunset-buffet/sunset-buffet4.jpg',
  '/sunset-buffet/sunset-buffet5.jpg',
];
const GALLERY_WIDE =
  'https://images.unsplash.com/photo-1548093237-8b67b5c8b5c1?w=2000&q=80';

const MENU_SECTIONS = [
  {
    heading: 'Cold',
    items: [
      'Local Queensland king prawns served with 1000 island dressing and fresh lemon wedges (gf)',
      "Chef's Mango, lime and chilli mussels (gf, df)",
    ],
  },
  {
    heading: 'Hot',
    items: [
      'Succulent Queensland Bangalow salt and pepper pork belly with a crackling crumble (gf, df)',
      'Australian tender sovereign lamb served with a pan jus',
      'Penne pasta with a rich tomato Napoli sauce infused with Barossa reserve red wine and wild spinach (vg, v)',
    ],
  },
  {
    heading: 'Sides',
    items: [
      "Tender potato salad with parsley, chives, shallots, salt, pepper, farmer's market mustard and whole egg mayonnaise (v,gf)",
      'Roasted sweet potato and cauliflower tossed through cous cous with chickpeas, dried fruits and toasted sliced almonds',
      'Dressed with house-made Moroccan inspired dressing (V,df)',
      'Australian green Leaf salad with a green goddess dressing (v,vg, gf, df)',
      'Assorted array of bakers warm bread rolls with butter',
    ],
  },
];

const ITINERARY_INTRO: ReactNode = (
  <div
    style={{
      fontFamily: 'var(--font-body)',
      color: 'rgba(245,240,232,0.75)',
      lineHeight: 1.9,
    }}
  >
    <p style={{ marginBottom: 20, fontSize: 15 }}>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 72,
          float: 'left',
          lineHeight: 0.78,
          color: 'var(--gold)',
          marginRight: 10,
          marginTop: 6,
          fontStyle: 'italic',
        }}
      >
        B
      </span>
      oard the Mermaid Spirit as the sun melts into the Gold Coast horizon. The
      Sunset Twilight Buffet combines the finest Australian produce, golden-hour
      views, and effortless Broadwater cruising.
    </p>
    <p style={{ fontSize: 14, clear: 'both', marginBottom: 28 }}>
      <strong style={{ color: 'var(--cream)', fontWeight: 500 }}>
        Flavours of Australia:
      </strong>{' '}
      From chilled Queensland prawns to Bangalow pork belly, every dish reflects
      the natural abundance of the region. Arrive for drinks, drift through the
      golden hour, and disembark with memories that linger long after the
      evening ends.
    </p>
    <div style={{ marginBottom: 28 }}>
      <div style={{ ...GL, marginBottom: 14 }}>Inclusions</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {[
          'Full Australian-inspired buffet — cold, warm, sides & dessert',
          'Beverage service including licensed bar',
          'Golden-hour Broadwater cruise',
          'Wildlife spotting — dolphins, turtles & dugongs',
          'Indoor & open-air outdoor seating',
        ].map((item) => (
          <li
            key={item}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              fontSize: 13,
              color: 'rgba(245,240,232,0.7)',
              marginBottom: 10,
            }}
          >
            <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 1 }}>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <div style={{ ...GL, marginBottom: 14 }}>Optional Extras</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {[
          'Cocktail packages on request',
          'Upgrade to premium seating on the top deck',
        ].map((item) => (
          <li
            key={item}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              fontSize: 13,
              color: 'rgba(245,240,232,0.7)',
              marginBottom: 10,
            }}
          >
            <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 1 }}>
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ITINERARY = [
  {
    title: 'Schedule',
    content: (
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'rgba(245,240,232,0.7)',
          lineHeight: 1.85,
        }}
      >
        <p style={{ marginBottom: 12 }}>
          Boarding 5:00 PM &middot; Departure 5:30 PM &middot; Returning 7:30 PM
        </p>
        <p style={{ marginBottom: 12 }}>
          Departs from Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast.
        </p>
        <p style={{ color: 'rgba(245,240,232,0.5)' }}>
          Operational Fridays, Saturdays and Sundays only.
        </p>
      </div>
    ),
  },
  {
    title: 'Pricing',
    content: (
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'rgba(245,240,232,0.7)',
          lineHeight: 1.85,
        }}
      >
        {[
          { label: 'Adult', price: '$99', note: 'per person' },
          { label: 'Child (3–13)', price: '$79', note: 'per child' },
          { label: 'Family', price: '$349', note: '2 adults + 2 children' },
        ].map((p, i, arr) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 12,
              marginBottom: 12,
              borderBottom:
                i < arr.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
            }}
          >
            <div>
              <span style={{ color: 'var(--cream)', fontWeight: 500 }}>
                {p.label}
              </span>
              <span
                style={{
                  color: 'rgba(245,240,232,0.45)',
                  fontSize: 12,
                  marginLeft: 8,
                }}
              >
                {p.note}
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                color: 'var(--gold)',
                lineHeight: 1,
              }}
            >
              {p.price}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Dietary & Accessibility',
    content: (
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'rgba(245,240,232,0.7)',
          lineHeight: 1.85,
        }}
      >
        <p style={{ marginBottom: 12 }}>
          The buffet includes vegetarian options (penne pesto pasta). Please
          advise of any dietary requirements at the time of booking.
        </p>
        <p>
          The Mermaid Spirit is accessible on the lower deck. Contact us in
          advance for mobility assistance.
        </p>
      </div>
    ),
  },
  {
    title: 'Gift Voucher T&Cs',
    content: (
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'rgba(245,240,232,0.7)',
          lineHeight: 1.85,
        }}
      >
        <p style={{ marginBottom: 12 }}>
          Gift vouchers never expire and can be redeemed online for any
          available Sunset Twilight Buffet session. Perfect for birthdays,
          anniversaries, or a special treat.
        </p>
        <p style={{ marginBottom: 12 }}>
          Vouchers can be purchased from $79. To redeem, enter your voucher code
          during checkout at the booking portal.
        </p>
        <p>Valid for Fridays, Saturdays and Sundays year-round.</p>
      </div>
    ),
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BuffetPage() {
  return (
    <>
      <Script
        src="https://boattimeyachtcharters.rezdy.com/pluginJs"
        strategy="lazyOnload"
      />
      <Nav />
      <main>
        {/* 1 ── HERO */}
        <CruiseHero
          notice={DINING_CRUISES_AVAILABLE ? undefined : <DiningUnavailableNotice />}
          eyebrow="Cruise Tickets · Dinner Cruise"
          title="Gold Coast: Chef's Table Dinner"
          titleAccent="Flavours of Australia"
          titleFontSize="clamp(36px, 5vw, 72px)"
          image="/sunset-twilight.png"
          stats={[
            { label: 'Duration', value: '2.5 hours' },
            { label: 'Adults from', value: '$99' },
            { label: 'Departs', value: '5:30 PM' },
            { label: 'Days', value: 'Fri Sat Sun' },
          ]}
          bookingUrl="#book"
        />

        {/* 2 ── PROMO BANNER */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            padding: '72px 48px',
            borderBottom: '1px solid rgba(201,168,76,0.12)',
          }}
        >
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(22px, 3vw, 34px)',
                color: 'var(--gold-light)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              Sunset Twilight Buffet &ndash; Flavours of Australia Aboard the
              Mermaid Spirit
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'rgba(245,240,232,0.75)',
                lineHeight: 1.85,
                marginBottom: 28,
                maxWidth: 680,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Join us for a Family Friendly Evening right on the Gold Coast.
              Step aboard the Mermaid Spirit and enjoy a memorable sunset cruise
              designed for families and friends to come together. The Twilight
              Buffet features an impressive range of buffet-style quality dishes
              for all ages and tastes.
            </p>

            <div
              style={{
                maxWidth: 620,
                margin: '0 auto 32px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div>
                <div style={{ ...GL, marginBottom: 6 }}>The Experience</div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                  }}
                >
                  <strong style={{ color: 'rgba(245,240,232,0.85)' }}>
                    Departure:
                  </strong>{' '}
                  Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast —
                  5:30 PM sharp.
                </p>
              </div>
              <div>
                <div style={{ ...GL, marginBottom: 6 }}>What Awaits</div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                  }}
                >
                  As we cruise through the stunning Broadwater, savour the
                  breathtaking views of the skyline and serene natural
                  surroundings. As the sun sets, enjoy the perfect combination
                  of picturesque scenery and delightful Australian flavours —
                  making this an unforgettable evening on the water.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 32,
              }}
            >
              <a
                href="#book"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '14px 28px',
                }}
              >
                Buy Tickets
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6h8M6 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#book"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'transparent',
                  color: 'var(--gold)',
                  border: '1px solid rgba(201,168,76,0.5)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '14px 28px',
                }}
              >
                Gift Vouchers
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6h8M6 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(201,168,76,0.3)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ margin: '0 auto' }}
            >
              <circle cx="12" cy="5" r="3" />
              <line x1="12" y1="22" x2="12" y2="8" />
              <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
            </svg>
          </div>
        </section>

        {/* 3 ── MERMAID SPIRIT OVERVIEW */}
        <section
          className="cruise-section"
          style={{ background: 'var(--navy)', padding: '100px 48px' }}
        >
          <div
            className="cruise-page-split"
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'start',
            }}
          >
            {/* Left — image */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
              }}
            >
              <img
                src="/sunset-boat.jpg"
                alt="Mermaid Spirit sunset cruise"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
              />
              {/* Award badge overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 12,
                  boxShadow: '0 8px 32px rgba(201,168,76,0.35)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--navy)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  Best of
                  <br />
                  QLD
                  <br />
                  Experience
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div>
              <div style={{ ...GL, marginBottom: 20 }}>Mermaid Spirit</div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  color: 'var(--cream)',
                  marginBottom: 24,
                }}
              >
                Where Family Fun Meets{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
                  Stunning Sunset Views
                </em>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: 'rgba(245,240,232,0.72)',
                  lineHeight: 1.85,
                  marginBottom: 32,
                }}
              >
                This hugely spacious and beautifully appointed tri-deck
                catamaran is the perfect venue for families and groups seeking
                an unforgettable evening on the Gold Coast Broadwater.
              </p>

              {/* Sub-callout */}
              <div
                style={{
                  borderLeft: '2px solid var(--gold)',
                  paddingLeft: 24,
                  marginBottom: 36,
                }}
              >
                <div style={{ ...GL, marginBottom: 10 }}>
                  Savour the Flavours Together
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.8,
                  }}
                >
                  Kick off your family dining experience by savouring our cold
                  starters, followed by a Q&apos;ld chicken dinner with a range
                  of hot dishes. Serving roughly 100–1000 island dressing and
                  zesty lemon vinaigrette — perfect for sharing!
                </p>
              </div>

              {/* Vessel specs */}
              <div
                className="vessel-specs-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  paddingTop: 28,
                  borderTop: '1px solid rgba(201,168,76,0.12)',
                }}
              >
                {[
                  { label: 'Vessel', value: 'Mermaid Spirit' },
                  { label: 'Capacity', value: 'Up to 150 guests' },
                  { label: 'Type', value: 'Tri-deck catamaran' },
                  { label: 'Length', value: '30m (100ft)' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ ...GL, marginBottom: 4 }}>{s.label}</div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.75)',
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 ── PHOTO GALLERY */}
        <CruiseGallery
          main={GALLERY_MAIN}
          thumbs={GALLERY_THUMBS}
          wide={GALLERY_WIDE}
        />

        {/* 5 ── CHEF BRENDAN */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            padding: '100px 48px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div
            className="cruise-page-split"
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1.6fr',
              gap: 80,
              alignItems: 'center',
            }}
          >
            {/* Left — portrait */}
            <div style={{ position: 'relative' }}>
              <img
                src="/chef-brandon.jpeg"
                alt="Executive Chef Brendan Ward"
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                className="on-photo"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '48px 32px 32px',
                  background:
                    'linear-gradient(to top, rgba(10,22,40,0.95) 0%, transparent 100%)',
                }}
              >
                <div style={{ ...GL, marginBottom: 6 }}>Executive Chef</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    fontWeight: 300,
                    color: 'var(--cream)',
                    lineHeight: 1.1,
                  }}
                >
                  Brendan Ward
                </div>
              </div>
            </div>

            {/* Right — bio */}
            <div>
              <div style={{ ...GL, marginBottom: 20 }}>Meet the Chef</div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  color: 'var(--cream)',
                  marginBottom: 28,
                }}
              >
                Chef{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
                  Brendan Ward
                </em>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: 'rgba(245,240,232,0.72)',
                  lineHeight: 1.9,
                  marginBottom: 24,
                }}
              >
                Brendan Ward&apos;s cuisine is a masterclass in high-stakes
                culinary excellence. From Superyachts to Your Table. This is the
                environment where Executive Chef Brendan Ward honed his craft,
                serving the world&apos;s most discerning palates on superyachts
                across the globe.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(245,240,232,0.58)',
                  lineHeight: 1.85,
                  marginBottom: 24,
                }}
              >
                Today, he brings that same level of &ldquo;Dining
                five-star&rdquo; excellence on the ocean from behind
                Brendan&apos;s kitchen aboard the Mermaid Spirit. Brendan&apos;s
                creations made like a world table. His journey through
                international waters required more than just cooking — it
                demanded a mastery of logistics, an obsession with ingredient
                sourcing, and the ability to deliver extraordinary results at a
                moment&apos;s notice.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'rgba(245,240,232,0.58)',
                  lineHeight: 1.85,
                  marginBottom: 36,
                }}
              >
                His approach has always been defined by one thing: bringing the
                high-end service of luxury yachting into a seamless mobile
                catering experience. He brings the skill, the skill on the cream
                — leaving hosts with nothing to do but enjoy.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  paddingTop: 28,
                  borderTop: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: 'var(--gold)',
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                  }}
                >
                  Head of Culinary · Boattime Yacht Charters
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 ── SOCIAL PROOF BAR */}
        <div
          className="light-adapt-section cruise-section"
          style={{
            background: 'var(--navy-mid)',
            padding: '28px 48px',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 64,
              flexWrap: 'wrap',
            }}
          >
            {[
              {
                platform: 'Facebook',
                score: '5.0',
                reviews: '2,047 reviews',
                stars: 5,
              },
              {
                platform: 'Google',
                score: '4.7',
                reviews: '1,863 reviews',
                stars: 5,
              },
            ].map((r) => (
              <div
                key={r.platform}
                style={{ display: 'flex', alignItems: 'center', gap: 14 }}
              >
                <div>
                  <div style={{ ...GL, marginBottom: 4 }}>
                    Boattime Yacht Charters
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.45)',
                      marginBottom: 6,
                    }}
                  >
                    {r.platform}
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span style={{ color: 'var(--gold)', fontSize: 13 }}>
                      {'★'.repeat(r.stars)}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 18,
                        color: 'var(--cream)',
                        lineHeight: 1,
                      }}
                    >
                      {r.score}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        color: 'rgba(245,240,232,0.45)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {r.reviews}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 ── "ENJOY A MOMENT UNDER THE SUNSET" */}
        <section
          className="cruise-section"
          style={{ background: 'var(--navy)', padding: '100px 48px' }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'rgba(245,240,232,0.75)',
                lineHeight: 1.9,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 72,
                  float: 'left',
                  lineHeight: 0.78,
                  color: 'var(--gold)',
                  marginRight: 10,
                  marginTop: 6,
                  fontStyle: 'italic',
                }}
              >
                E
              </span>
              njoy a Moment Under the Sunset. As we traverse the delightful
              dishes and watch the horizon fade, before the horizon you&apos;ll
              enjoy an assortment of loose bread rolls served with butter,
              making the dining experience cozy and family-friendly.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'rgba(245,240,232,0.62)',
                lineHeight: 1.85,
                marginBottom: 40,
                clear: 'both',
              }}
            >
              With a return to the dock at 7:30 PM, you&apos;ll carry stories to
              relate, laugh, and make lasting memories together as the sky
              transitions into a canvas of colour. This is the perfect chance to
              unwind and connect with the ones you love while experiencing the
              beauty of the Gold Coast at dusk.
            </p>

            <a
              href="#book"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--gold)',
                color: 'var(--navy)',
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
                padding: '14px 32px',
              }}
            >
              Buy Tickets
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* 8 ── MENU DISPLAY */}
        <section
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            padding: '100px 48px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: 32,
                      height: 1,
                      background: 'var(--gold)',
                    }}
                  />
                  Flavours of Australia
                  <span
                    style={{
                      display: 'block',
                      width: 32,
                      height: 1,
                      background: 'var(--gold)',
                    }}
                  />
                </div>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  lineHeight: 1.05,
                  color: 'var(--cream)',
                  letterSpacing: '-0.02em',
                }}
              >
                The{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
                  Buffet Menu
                </em>
              </h2>
            </div>

            {/* Menu card */}
            <div
              className="cruise-menu-card-inner"
              style={{
                border: '1px solid rgba(201,168,76,0.2)',
                background: 'rgba(255,255,255,0.02)',
                padding: '60px 72px',
                position: 'relative',
              }}
            >
              {/* Boattime watermark logo */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.04,
                  fontSize: 120,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                boattime
              </div>

              {/* Boattime wordmark top */}
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: 48,
                  paddingBottom: 40,
                  borderBottom: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'var(--gold)',
                    textTransform: 'lowercase',
                    marginBottom: 8,
                  }}
                >
                  boattime
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.5)',
                    fontWeight: 500,
                  }}
                >
                  Yacht Charters · Gold Coast
                </div>
              </div>

              {/* Menu title */}
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 5vw, 60px)',
                    fontWeight: 300,
                    color: 'var(--cream)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    marginBottom: 10,
                  }}
                >
                  Menu
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                  }}
                >
                  Main Buffet
                </div>
              </div>

              {/* Menu columns */}
              <div
                className="cruise-page-menu-cols"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 40,
                }}
              >
                {MENU_SECTIONS.map((section) => (
                  <div key={section.heading}>
                    <div
                      style={{
                        ...GL,
                        marginBottom: 20,
                        paddingBottom: 12,
                        borderBottom: '1px solid rgba(201,168,76,0.15)',
                      }}
                    >
                      {section.heading}
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {section.items.map((item) => (
                        <li
                          key={item}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 13,
                            color: 'rgba(245,240,232,0.72)',
                            lineHeight: 1.7,
                            marginBottom: 10,
                            display: 'flex',
                            gap: 10,
                            alignItems: 'flex-start',
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--gold)',
                              flexShrink: 0,
                              fontSize: 11,
                              marginTop: 2,
                            }}
                          >
                            ·
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom anchor icon */}
              <div
                style={{
                  marginTop: 48,
                  paddingTop: 40,
                  borderTop: '1px solid rgba(201,168,76,0.12)',
                  textAlign: 'center',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(201,168,76,0.35)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ margin: '0 auto 12px' }}
                >
                  <circle cx="12" cy="5" r="3" />
                  <line x1="12" y1="22" x2="12" y2="8" />
                  <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                </svg>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.4)',
                    fontWeight: 500,
                  }}
                >
                  Marine Stadium Jetty & Pontoon · Main Beach, Gold Coast
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9 ── DETAILS & ITINERARY */}
        <CruiseItinerary items={ITINERARY} intro={ITINERARY_INTRO} />

        {/* 11 ── INLINE BOOKING WIDGET */}
        <section
          id="book"
          className="cruise-section"
          style={{
            background: 'var(--navy-mid)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '80px 48px 100px',
          }}
        >
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ marginBottom: 48, textAlign: 'center' }}>
              <div
                className="section-eyebrow"
                style={{ justifyContent: 'center' }}
              >
                Book Your Session
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 5vw, 60px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: 'var(--cream)',
                  marginBottom: 16,
                }}
              >
                Reserve your{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
                  spot
                </em>
                .
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: 'var(--text-muted)',
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: '0 auto',
                }}
              >
                Fridays, Saturdays, and Sundays at sunset year-round. Instant
                confirmation — cancel up to 24 hours before for a full refund.
              </p>
            </div>

            <div
              style={{
                border: '1px solid var(--border-subtle)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <iframe
                seamless
                width="100%"
                height="1000px"
                frameBorder="0"
                className="rezdy"
                src="https://boattimeyachtcharters.rezdy.com/745586/twilight-buffet-flavours-of-australia-on-board-the-mermaid-spirit?iframe=true"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
