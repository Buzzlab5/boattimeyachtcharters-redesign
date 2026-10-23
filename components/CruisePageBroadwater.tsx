'use client';

import Script from 'next/script';
import Nav from './Nav';
import Footer from './Footer';
import { CruiseHero, CruiseYachts, CruiseItinerary } from './CruiseSections';
import { VesselFaq } from './YachtSections';
import { SUNSET_FAQS } from '@/lib/cruise-faqs';
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

const VESSELS = [
  {
    image: '/sun-goddess-main.jpeg',
    name: 'Sun Goddess',
    description:
      "Get ready to elevate your Gold Coast adventure with Boattime Yacht Charters aboard the stunning Sun Goddess! This luxury yacht offers 360-degree views and provides an unforgettable backdrop for a magical sunset experience. With top-notch amenities and breathtaking views of the Broadwater and the iconic Gold Coast skyline, you're in for an evening to remember.\n\nWhether you're celebrating a milestone or simply seeking an extraordinary escape, our dedicated team is here to ensure your sunset cruise is nothing short of spectacular. With room for up to 135 guests, there's plenty of space for everyone to relax, unwind, and soak in the beauty of the setting sun.",
    pax: '135 Guests',
    size: '34m (114ft)',
    features: [
      'Dual Bars',
      '2 Decks',
      'Air-Conditioned',
      '360° Views',
      'Licensed Bar',
    ],
    href: '/#fleet',
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
        L
      </span>
      uxurious Super Yacht. Our first-class luxury Superyacht is designed with
      your comfort in mind. With spacious, air-conditioned decks and a variety
      of seating options, you can enjoy the fresh Gold Coast air in absolute
      comfort.
    </p>
    <p style={{ fontSize: 14, clear: 'both', marginBottom: 28 }}>
      <strong style={{ color: 'var(--cream)', fontWeight: 500 }}>
        Epic Views &amp; Entertainment:
      </strong>{' '}
      Keep an eye out for marine life such as dolphins, turtles, and dugongs as
      you navigate the Seaway. And as the day ends, watch the sunset over the
      iconic Gold Coast skyline, a sight that will surely take your breath away.
    </p>
    {/* Inclusions */}
    <div style={{ marginBottom: 28 }}>
      <div style={{ ...GL, marginBottom: 14 }}>Inclusions</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {[
          'The Sunset tour',
          'Light commentary of surrounds',
          'Drinks Service',
          'Nibbles share plate for two',
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
    {/* Additional Extras */}
    <div>
      <div style={{ ...GL, marginBottom: 14 }}>Additional Extras</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {[
          'Cocktails',
          'Snacks',
          'On board photo opportunity',
          'One Sparkling / Beer on Arrival',
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
          Boarding at 4:30 PM &middot; Departure 5:00 PM &middot; Returning at
          7:00 PM
        </p>
        <p style={{ marginBottom: 12 }}>
          Return trip from Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast set the beautiful Main
          Beach Spit.
        </p>
        <p style={{ marginBottom: 12 }}>
          360 degree views: epic sunset over the Broadwater and Gold Coast
          Skyline.
        </p>
        <p style={{ color: 'rgba(245,240,232,0.5)' }}>
          Saturdays and Sundays, plus Friday 20 November.
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
          { label: '1 Adult', price: '$79', note: 'per person' },
          { label: '2 Adults', price: '$149', note: '$74.50 per person' },
          { label: 'Child (3 to 13)', price: '$55', note: 'per child' },
          { label: 'Infant (under 3)', price: '$11', note: 'per infant' },
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
          available sunset cruise session. Perfect for birthdays, anniversaries,
          or a spontaneous treat.
        </p>
        <p style={{ marginBottom: 12 }}>
          Vouchers can be purchased from $79 (one adult ticket). To redeem,
          simply enter your voucher code during checkout at our booking portal.
        </p>
        <p>Valid for any sunset session with seats available.</p>
      </div>
    ),
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────


export default function BroadwaterPage() {
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
          eyebrow="Cruise Tickets · Sunset Cruise Gold Coast"
          title="Sunset Cruise Gold Coast"
          titleAccent={
            /* One line. Sized down relative to the heading so the whole
               product name fits without wrapping on a desktop width. */
            <span style={{ fontSize: '0.62em' }}>
              Luxury Scenic Sunset Cruise: Superyacht Sunset on the Broadwater
            </span>
          }
          titleFontSize="clamp(40px, 5.4vw, 76px)"
          image="/dinner-lunch-buffet/sunset-buffet1.jpg"
          stats={[
            { label: 'Duration', value: '2.5 hours' },
            { label: 'From', value: '$74.50 pp' },
            { label: 'Departs', value: '5:00 PM' },
            { label: 'Days', value: 'Sat & Sun' },
          ]}
          bookingUrl="#book"
        />

        {/* 2 ── PROMOTIONAL BANNER */}
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
              Luxury Sunset Cruise Gold Coast
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
              Join us for a delightful sunset tour, where you&apos;ll embark on
              a 150-minute cruise. Experience the tranquil
              beauty of the Gold Coast&apos;s waterways while indulging in a
              delicious cheese platter and sipping on a complimentary sparkling
              or beer on arrival.
            </p>
            <div
              style={{
                maxWidth: 620,
                margin: '0 auto 24px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--gold)',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Departure &amp; Scenic Route
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                  }}
                >
                  <strong style={{ color: 'rgba(245,240,232,0.85)' }}>
                    Starting Point:
                  </strong>{' '}
                  Depart from Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast.
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--gold)',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Cruising Highlights
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                    marginBottom: 10,
                  }}
                >
                  Glide through the stunning Broadwater, soaking in the
                  breathtaking views of the skyline, luxurious waterfront
                  properties, and the serene natural surroundings.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.75,
                  }}
                >
                  As the sun sets, enjoy the perfect combination of picturesque
                  views and delightful flavours, making this an unforgettable
                  evening on the water.
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

        <VesselFaq vesselName="the Sunset Cruise" faqs={SUNSET_FAQS} />

        {/* 3 ── OUR YACHTS — Sun Goddess */}
        <CruiseYachts vessels={VESSELS} />

        {/* 4 ── SOCIAL PROOF */}
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
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 9,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
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

        {/* 6 ── DETAILS & ITINERARY */}
        <CruiseItinerary items={ITINERARY} intro={ITINERARY_INTRO} />

        {/* 8 ── INLINE BOOKING WIDGET */}
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
                Saturdays and Sundays, plus Friday 20 November. Instant
                confirmation.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 24,
                  padding: '10px 20px',
                  border: '1px solid rgba(201,168,76,0.4)',
                  background: 'rgba(201,168,76,0.08)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 9,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                  }}
                >
                  Now Booking
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    letterSpacing: '0.02em',
                    color: 'var(--cream)',
                  }}
                >
                  Tours commence 1 September 2026
                </span>
              </div>
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
                src="https://boattimeyachtcharters.rezdy.com/414058/twilight-drift-broadwater-sunset-tour-scenic-cruise?iframe=true"
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
