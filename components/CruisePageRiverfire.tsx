"use client";

import Script from "next/script";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./Nav";
import Footer from "./Footer";

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
      style={{ display: "block", margin: "0 auto" }}
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
          "repeating-linear-gradient(90deg, var(--gold) 0px, var(--gold) 8px, transparent 8px, transparent 14px)",
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
        borderRadius: "50%",
        border: "2px solid #C9A84C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: 16,
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 6,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.4)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 7,
          letterSpacing: "0.2em",
          color: "#C9A84C",
          textTransform: "uppercase",
          lineHeight: 1.3,
        }}
      >
        RECOMMENDED BY
      </span>
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 36,
          color: "#C9A84C",
          lineHeight: 1,
        }}
      >
        Q
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 6,
          letterSpacing: "0.14em",
          color: "#C9A84C",
          textTransform: "uppercase",
          lineHeight: 1.4,
        }}
      >
        BEST OF QUEENSLAND
        <br />
        EXPERIENCE
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 8,
          color: "#C9A84C",
          letterSpacing: "0.1em",
        }}
      >
        2023
      </span>
    </div>
  );
}

// ── CTA box ───────────────────────────────────────────────────────────────────

function RiverCTABox({
  title,
  description,
  footnote,
  bookHref,
}: {
  title: string;
  description?: string;
  footnote?: React.ReactNode;
  bookHref: string;
}) {
  return (
    <section
      className="cruise-section"
      style={{
        background: "var(--navy)",
        padding: "72px 40px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.06,
          pointerEvents: "none",
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
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--gold)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontSize: 17,
            fontWeight: 700,
            marginBottom: description ? 24 : 44,
            maxWidth: 800,
            margin: description ? "0 auto 24px" : "0 auto 44px",
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "rgba(245,240,232,0.78)",
              lineHeight: 1.8,
              maxWidth: 700,
              margin: "0 auto 44px",
              fontWeight: 300,
            }}
          >
            {description}
          </p>
        )}
        {footnote && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "rgba(245,240,232,0.78)",
              lineHeight: 1.8,
              maxWidth: 700,
              margin: "-24px auto 44px",
              fontWeight: 300,
            }}
          >
            {footnote}
          </p>
        )}
        <a
          href={bookHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 44px",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 44,
            transition: "background 0.25s, color 0.25s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "var(--gold)";
            el.style.color = "#0A1628";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "transparent";
            el.style.color = "var(--gold)";
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

// ── Social proof ──────────────────────────────────────────────────────────────

function SocialProof() {
  const Stars = () => (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section
      className="cruise-section"
      style={{
        background: "var(--navy)",
        padding: "60px 40px",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: 80,
          flexWrap: "wrap",
        }}
      >
        {/* Facebook */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--cream)",
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Boattime Yacht Charters
            </div>
            <Stars />
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "rgba(245,240,232,0.55)",
                marginTop: 3,
                letterSpacing: "0.05em",
              }}
            >
              5.0 Stars · Based on 2,047 User Reviews
            </div>
          </div>
        </div>
        {/* Google */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="36" height="36" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--cream)",
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Boattime Yacht Charters
            </div>
            <Stars />
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "rgba(245,240,232,0.55)",
                marginTop: 3,
                letterSpacing: "0.05em",
              }}
            >
              4.7 Stars · Based on 1,863 User Reviews
            </div>
          </div>
        </div>
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
        background: "var(--navy)",
        padding: "60px 80px",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div
        className="cruise-page-split"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px 60px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              padding: "14px 0",
              borderBottom: "1px solid rgba(201,168,76,0.1)",
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
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(245,240,232,0.82)",
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

// ── Vessel card ───────────────────────────────────────────────────────────────

function VesselCard() {
  return (
    <section
      className="cruise-section"
      style={{
        background: "var(--navy)",
        padding: "0 80px 80px",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "60px 0 40px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--gold)",
              lineHeight: 1.2,
            }}
          >
            Mermaid Spirit
          </h2>
        </div>
        <div
          style={{
            background: "var(--navy-mid)",
            border: "1px solid rgba(201,168,76,0.18)",
            overflow: "hidden",
          }}
        >
          {/* Vessel image */}
          <div
            className="vessel-carousel-overlay"
            style={{
              height: 320,
              backgroundImage: "url(/mermaid-spirit-gold-coast)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              background: "linear-gradient(135deg, #0d1f38 0%, #060f1c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/mermaid-spirit-main.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                textAlign: "center",
                padding: "0 40px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(22px, 3vw, 36px)",
                  color: "var(--cream)",
                  marginBottom: 12,
                  lineHeight: 1.1,
                }}
              >
                Mermaid Spirit Riverfire 2026
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--gold)",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                Why Choose Mermaid Spirit for Riverfire 2026?
              </p>
            </div>
          </div>

          {/* Card content */}
          <div style={{ padding: "44px 52px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(245,240,232,0.72)",
                lineHeight: 1.8,
                marginBottom: 36,
                fontWeight: 300,
              }}
            >
              Experience Riverfire from a premium vantage point aboard Mermaid
              Spirit, with wide views across the Brisbane River and city
              skyline. But the experience aboard Mermaid Spirit is not just
              about the view; it&rsquo;s a journey into luxury and sophistication. As you
              witness Riverfire like never before, you&rsquo;ll revel in the
              opulence of our yacht. To complement the evening, indulge in a
              lavish spread of roaming canapés and bar services. And to ensure a
              premium experience for all our guests, we&rsquo;ve limited our
              ticket capacity. So don&rsquo;t miss out on this exclusive
              opportunity!
            </p>

            {/* Specs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
                marginBottom: 36,
                background: "rgba(201,168,76,0.06)",
              }}
            >
              {[
                { label: "PAX", value: "150 Guests" },
                { label: "SIZE", value: "30m (100ft)" },
                {
                  label: "FEATURES",
                  value:
                    "Dual Bars · 3 Spacious Decks · Dual Level Galley · Speakers Throughout · Epic Views!",
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  style={{ background: "var(--navy)", padding: "24px 28px" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 9,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {spec.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "var(--cream)",
                      lineHeight: 1.6,
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <a
                href="#book"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "13px 44px",
                  background: "var(--gold)",
                  color: "#0A1628",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                Register interest
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Details & Itinerary ───────────────────────────────────────────────────────

const h3s: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 14,
  fontWeight: 700,
  color: "var(--cream)",
  marginBottom: 10,
  marginTop: 28,
};
const ps: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 13,
  color: "rgba(245,240,232,0.72)",
  lineHeight: 1.8,
  marginBottom: 10,
  fontWeight: 300,
};

function RiverfireDetailsSection() {
  const MENU = [
    "Beef Arancini wrapped in Aged Prosciutto with a Horseradish and Onion Jam",
    "Chicken Chardonnay Pie",
    "Chicken Satay Skewer with a 3-Nut Crumble (GF)",
    "Thick Vegetable Spring Rolls with a Plum Sauce (VG)",
    "Roasted Sweet Potato and Pumpkin Arancini (GF, VG)",
    "Oysters Kilpatrick (GF, DF)",
    "Tempura Battered Tiger Prawn with a Black Caviar Aioli",
  ];

  return (
    <section
      className="cruise-section"
      style={{
        background: "var(--navy)",
        padding: "0 80px 80px",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "60px 0 48px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--gold)",
              lineHeight: 1.2,
            }}
          >
            Details &amp; Itinerary
          </h2>
        </div>

        <div
          style={{
            background: "var(--navy-mid)",
            border: "1px solid rgba(201,168,76,0.18)",
            padding: "52px 56px",
            position: "relative",
          }}
        >
          <h3 style={h3s}>Luxurious Tri-Deck Catamaran: Mermaid Spirit</h3>
          <p style={ps}>
            Step aboard the Mermaid Spirit, a symbol of elegance and luxury.
            This sleek and stylish yacht is not just a vessel but an experience
            waiting to unfold. With dual bars, three spacious decks, a luxury
            galley, and state-of-the-art speakers throughout, the Mermaid Spirit
            is designed to offer an unparalleled River Fire experience in the
            heart of Brisbane.
          </p>

          <h3 style={h3s}>Epic Views &amp; Entertainment</h3>
          <p style={ps}>
            The Brisbane River Fire event is a celebration of the city&rsquo;s
            vibrant spirit. As the Mermaid Spirit sails gracefully along the
            Brisbane River, you&rsquo;ll be treated to a mesmerising view of the
            city&rsquo;s skyline painted with the golden hues of the setting
            sun. But as dusk settles, the real spectacle begins. The skies above
            Brisbane will erupt in a dazzling display of fireworks, reflecting
            off the river&rsquo;s surface, and casting a magical glow over the
            city.
          </p>

          <h3 style={h3s}>Gourmet Dining</h3>
          <p style={ps}>
            Your River Fire experience is complemented by a culinary journey.
            Upon boarding, you&rsquo;ll be greeted with a glass of champagne,
            wine, or a premium beer. As the evening progresses, treat your
            palate to a selection of gourmet canapés:
          </p>
          <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none" }}>
            {MENU.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "6px 0",
                  borderBottom: "1px solid rgba(201,168,76,0.06)",
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
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(245,240,232,0.72)",
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
            The River Fire event aboard the Mermaid Spirit is more than just a
            cruise — it&rsquo;s an immersive experience. With unmatched views of
            Brisbane&rsquo;s most iconic fireworks display, impeccable service,
            and a luxurious ambiance, this promises to be an evening that will
            etch itself into your memories. Join us as we celebrate the spirit
            of Brisbane in style.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function RiverPage() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 14, ease: "none" },
      );
      gsap.from(textRef.current!.querySelectorAll(".hr"), {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.15,
      });
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef },
  );

  return (
    <>
      <Script
        src="https://boattimeyachtcharters.rezdy.com/pluginJs"
        strategy="lazyOnload"
      />
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{
            minHeight: "100vh",
            background: "var(--navy)",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            ref={bgRef}
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: "url(/Riverfire.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.6) 55%, rgba(10,22,40,0.22) 100%), linear-gradient(to top, rgba(10,22,40,0.94) 0%, rgba(10,22,40,0.08) 50%)",
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
              BOATTIME YC LUXURY
            </div>
            <h1
              className="hr"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(48px, 7vw, 92px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "var(--cream)",
                marginBottom: 28,
              }}
            >
              Riverfire 2026 Brisbane Fireworks Yacht Cruise
            </h1>
            {/* Event tags */}
            <div
              className="hr"
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 36,
                flexWrap: "wrap",
              }}
            >
              <span
                className="hero-gold-tag"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "6px 16px",
                  fontWeight: 700,
                }}
              >
                2026 TICKETS WERE $249
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  border: "1px solid rgba(201,168,76,0.5)",
                  padding: "6px 16px",
                  fontWeight: 600,
                }}
              >
                EVENT 18+
              </span>
            </div>
            <div className="hr">
              <a
                href="#book"
                className="hero-gold-tag"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 36px",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                Buy Tickets &rarr;
              </a>
            </div>
          </div>

          {/* QLD Badge */}
          <div
            className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block"
            style={{ zIndex: 10 }}
          >
            <QldBadge />
          </div>
        </section>

        {/* ── ABOUT THE EVENT CTA box ── */}
        <RiverCTABox
          title="ABOUT THE EVENT"
          description="Experience the Grandeur of Brisbane's most awaited night, Riverfire 2026, from the luxurious decks of Mermaid Spirit. As the cityscape of Brisbane lights up with a mesmerizing display of fireworks and scheduled flyovers, find yourself at the heart of the spectacle, surrounded by elegance, comfort, and an electric atmosphere. The official 2026 flyover period is confirmed, but the specific ADF aircraft have not yet been announced."
          footnote={
            <>
              Planning your Riverfire day? Read our{" "}
              <Link
                href="/boattime-news/riverfire-brisbane-2026-everything-you-need-to-know"
                style={{
                  color: "var(--gold)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                complete Riverfire Brisbane 2026 guide
              </Link>{" "}
              for event times, viewing information, transport advice and
              practical planning.
            </>
          }
          bookHref="#book"
        />

        {/* ── Social proof ── */}
        <SocialProof />

        {/* ── Event details ── */}
        <EventDetails
          items={[
            { label: "Date", value: "2026 has sailed: register for next year" },
            {
              label: "Pickup",
              value: "New Farm Recreational Hub, New Farm QLD 4005",
            },
            { label: "Venue", value: "Mermaid Spirit on the Brisbane River" },
            {
              label: "Time",
              value: "Boarding 3:00pm | Departing 3:30pm | Returning 8:30pm",
            },
          ]}
        />

        {/* ── Vessel card ── */}
        <VesselCard />

        {/* ── Details & Itinerary ── */}
        <RiverfireDetailsSection />

        {/* ── GET YOUR TICKETS NOW CTA box ── */}
        <RiverCTABox
          title="GET YOUR TICKETS NOW."
          description="Experience the Grandeur of Brisbane's most awaited night, Riverfire 2026, from the luxurious decks of Mermaid Spirit. As the cityscape of Brisbane lights up with a mesmerizing display of fireworks and scheduled flyovers, find yourself at the heart of the spectacle, surrounded by elegance, comfort, and an electric atmosphere. The official 2026 flyover period is confirmed, but the specific ADF aircraft have not yet been announced."
          bookHref="#book"
        />

        {/* ── Booking widget ── */}
        <section
          id="book"
          className="cruise-section"
          style={{
            background: "var(--navy-mid, #0d1f38)",
            borderTop: "1px solid rgba(201,168,76,0.1)",
            padding: "80px 48px 100px",
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Register Your Interest
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  color: "var(--cream)",
                  marginBottom: 16,
                }}
              >
                Register your{" "}
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                  interest
                </em>
                .
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(245,240,232,0.62)",
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: "0 auto",
                  fontWeight: 300,
                }}
              >
                Riverfire 2026 has sailed. Register your interest and we will
                come back to you with next year’s date and pricing when the
                fireworks programme is announced.
              </p>
            </div>
            {/* The Rezdy widget here pointed at
                mermaid-spirit-brisbane-riverfire-2026 (product P8TPLS). That
                product still exists and is not retired, but it has no sessions
                and the 2026 event has passed, so the widget rendered a checkout
                that could not take a booking. Restore it when next year's
                sessions are loaded. */}
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                background: "rgba(255,255,255,0.02)",
                padding: "48px 24px",
                textAlign: "center",
              }}
            >
              <a
                href="/#inquiry"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "#0A1628",
                  background: "#C9A84C",
                  padding: "14px 28px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Register for next Riverfire
              </a>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(245,240,232,0.6)",
                  lineHeight: 1.8,
                  marginTop: 24,
                }}
              >
                Mermaid Spirit is also available for private charter on the
                Brisbane River, and our Gold Coast cruises sail year round.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
