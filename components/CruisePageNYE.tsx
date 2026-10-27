'use client';

import Script from 'next/script';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteShell from './site/SiteShell';
import PageHero from './site/PageHero';
import FaqEnquiry from './site/FaqEnquiry';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Shared micro-components ───────────────────────────────────────────────────

function AnchorSvg() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', margin: '0 auto' }}
    >
      <circle cx="12" cy="5" r="2.5" />
      <line x1="12" y1="7.5" x2="12" y2="19" />
      <path d="M6 12 C6 12 6 19 12 19 C18 19 18 12 18 12" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

function GoldRope() {
  return (
    <div
      style={{
        height: 10,
        background:
          'repeating-linear-gradient(90deg, var(--gold) 0px, var(--gold) 8px, transparent 8px, transparent 14px)',
        opacity: 0.45,
      }}
    />
  );
}

function QldBadge() {
  return (
    <div
      style={{
        width: 148,
        height: 148,
        borderRadius: '50%',
        border: '2px solid #C9A84C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 16,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 6,
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.4)',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 7,
          letterSpacing: '0.2em',
          color: '#C9A84C',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}
      >
        RECOMMENDED BY
      </span>
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 36,
          color: '#C9A84C',
          lineHeight: 1,
        }}
      >
        Q
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 6,
          letterSpacing: '0.14em',
          color: '#C9A84C',
          textTransform: 'uppercase',
          lineHeight: 1.4,
        }}
      >
        BEST OF QUEENSLAND
        <br />
        EXPERIENCE
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: 8,
          color: '#C9A84C',
          letterSpacing: '0.1em',
        }}
      >
        2023
      </span>
    </div>
  );
}

// ── NYE CTA box ───────────────────────────────────────────────────────────────

function NYECTABox({ title, bookHref }: { title: string; bookHref: string }) {
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
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.06,
          pointerEvents: 'none',
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
              stroke="white"
              strokeWidth="1"
              fill="none"
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
            marginBottom: 44,
            maxWidth: 800,
            margin: '0 auto 44px',
          }}
        >
          {title}
        </h2>
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
          Buy Tickets &rarr;
        </a>
        <AnchorSvg />
      </div>
      <div style={{ marginTop: 40 }}>
        <GoldRope />
      </div>
    </section>
  );
}

// ── Event details row ─────────────────────────────────────────────────────────

function EventDetails({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <section
      className="cruise-section"
      style={{
        background: 'var(--navy)',
        padding: '60px 80px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div
        className="cruise-page-split"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px 60px',
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              padding: '14px 0',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <path
                d="M2 7L5.5 10.5L12 4"
                stroke="var(--gold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.82)',
                  lineHeight: 1.6,
                }}
              >
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Details & Itinerary content card ─────────────────────────────────────────

const h3s: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  fontWeight: 700,
  color: 'var(--cream)',
  marginBottom: 10,
  marginTop: 28,
};
const ps: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 13,
  color: 'rgba(245,240,232,0.72)',
  lineHeight: 1.8,
  marginBottom: 10,
  fontWeight: 300,
};

function NYEDetailsSection() {
  const MENU = [
    'Tomato, Onion, and Basil Bruschetta (V)',
    'Bourbon BBQ Glazed Pork Belly with Crackling Crumble (GF, DF)',
    'Beef Mignon wrapped in Aged Prosciutto with Horseradish and Onion Jam',
    'Chicken Satay Skewer with a 3-Nut Crumble (GF)',
    'Crab & Prawn Spoon with Lemon & Lime Mayonnaise (GF)',
    'Roasted Sweet Potato and Pumpkin Arancini (GF, VG)',
    'Prawn Twirler with Sweet Chilli Dipping Sauce (DF)',
    'Baked Chicken & Pesto Spoon with Vine Ripe Tomato (GF)',
  ];

  return (
    <section
      className="cruise-section"
      style={{
        background: 'var(--navy)',
        padding: '0 80px 80px',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section heading */}
        <div style={{ textAlign: 'center', padding: '60px 0 48px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'var(--gold)',
              lineHeight: 1.2,
            }}
          >
            Details &amp; Itinerary
          </h2>
        </div>

        {/* Content card */}
        <div
          style={{
            background: 'var(--navy-mid)',
            border: '1px solid rgba(201,168,76,0.18)',
            padding: '52px 56px',
            position: 'relative',
          }}
        >
          {/* Price highlight */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 40,
              paddingBottom: 32,
              borderBottom: '1px solid rgba(201,168,76,0.15)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(18px, 2.5vw, 26px)',
                color: 'var(--gold)',
                lineHeight: 1.3,
              }}
            >
              Price is $169 pp and includes ONE glass of sparkling
            </p>
          </div>

          <h3 style={h3s}>Luxurious Tri-Deck Catamaran: Mermaid Spirit</h3>
          <p style={ps}>
            Step aboard the Mermaid Spirit, a symbol of elegance and
            sophistication. This sleek and stylish yacht is more than just a
            vessel — it&rsquo;s an experience waiting to unfold. With dual bars,
            three spacious decks, a luxury galley, and state-of-the-art speakers
            throughout, the Mermaid Spirit is designed to offer an unparalleled
            New Year&rsquo;s Eve experience in the heart of Brisbane.
          </p>

          <h3 style={h3s}>Epic Views &amp; Entertainment</h3>
          <p style={ps}>
            The Brisbane River Fire event is a celebration of the city&rsquo;s
            vibrant spirit. As the Mermaid Spirit glides gracefully along the
            Brisbane River, you&rsquo;ll be treated to a mesmerising view of the
            city&rsquo;s skyline painted with the golden hues of the setting
            sun. But as dusk settles, the real spectacle begins. The skies above
            Brisbane will erupt in a dazzling display of fireworks, reflecting
            off the river&rsquo;s surface, and casting a magical glow over the
            city.
          </p>

          <h3 style={h3s}>Gourmet Dining</h3>
          <p style={ps}>
            Your New Year&rsquo;s experience is complemented by a culinary
            journey. Upon boarding, you&rsquo;ll be greeted with a glass of
            champagne, wine, or a premium beer. As the evening progresses, treat
            your palate to a selection of gourmet canapés:
          </p>
          <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
            {MENU.map((item) => (
              <li
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(201,168,76,0.06)',
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: 3 }}
                >
                  <path
                    d="M2 7L5.5 10.5L12 4"
                    stroke="var(--gold)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: 'rgba(245,240,232,0.72)',
                    lineHeight: 1.65,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <h3 style={h3s}>A Night to Remember</h3>
          <p style={{ ...ps, marginBottom: 0 }}>
            The New Year&rsquo;s Eve event aboard the Mermaid Spirit is more
            than just a cruise — it&rsquo;s an immersive experience. With
            unmatched views of the city&rsquo;s iconic fireworks, impeccable
            service, and a luxurious ambiance, this promises to be an evening
            that will etch itself into your memories. Join us as we welcome 2027
            in style and elegance.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function NyePage() {

  

  return (
    <>
      <Script
        src="https://boattimeyachtcharters.rezdy.com/pluginJs"
        strategy="lazyOnload"
      />
      <SiteShell>
        {/* ── Hero ── */}
        <PageHero
          image="/nye2026.webp"
          imageAlt="Fireworks over the river on New Year's Eve"
          eyebrow="Boattime Yacht Charters · Event"
          title={<>Happy New Year <em>2027</em></>}
          lead="Ring in 2027 aboard the Mermaid Spirit!"
        />
        <div className="st-zigzag st-legacy">

        

        {/* ── Event details ── */}
        <EventDetails
          items={[
            { label: 'Date', value: 'Enquire for this year' },
            {
              label: 'Location',
              value: 'Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast',
            },
            {
              label: 'Venue',
              value: 'Mermaid Spirit on the Gold Coast Broadwater',
            },
            {
              label: 'Time',
              value: 'Boarding 9:00pm | Departing 9:30pm | Returning 1:30am',
            },
          ]}
        />

        {/* ── Details & Itinerary ── */}
        <NYEDetailsSection />

        

        
      <FaqEnquiry faqs={[]} formLead="Dates and tickets for this year are confirmed on enquiry. Mermaid Spirit is also available as a private charter." />
        </div>
      </SiteShell>
    </>
  );
}
