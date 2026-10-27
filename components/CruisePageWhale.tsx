"use client";

import Script from "next/script";
import Link from "next/link";
import SiteShell from './site/SiteShell';
import FaqEnquiry from './site/FaqEnquiry';
import {
  CruiseHero,
  CruiseGallery,
  CruiseItinerary,
  CruiseYachts,
  CruiseExperience,
} from "./CruiseSections";
import type { ReactNode } from "react";
import { WHALE_FAQS } from '@/lib/faqs';

// ── Data ──────────────────────────────────────────────────────────────────────

const GL: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 9,
  letterSpacing: "0.28em",
  textTransform: "uppercase" as const,
  color: "var(--gold)",
  fontWeight: 600,
};

const GALLERY_THUMBS = [
  "/luxury-whale-watching/IMG_0151.jpg",
  "/luxury-whale-watching/humpbacks.jpg",
  "/luxury-whale-watching/IMG_1613.JPG",
  "/luxury-whale-watching/IMG_1637.JPG",
];

const FEATURES = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Marine Biologist Commentary",
    desc: "A qualified marine biologist provides live commentary throughout the tour — whale behaviour, migration patterns, and the Gold Coast&apos;s unique marine ecosystem.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Complimentary Refreshments",
    desc: "Hot chocolate and espresso coffee are complimentary throughout the tour. The fully licensed bar and galley are also open for additional food and drinks.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Morning and Afternoon Sessions",
    desc: "Morning sessions depart at 9:00 AM and afternoon sessions at 12:00 PM through the southern humpback migration. The booking calendar shows the dates currently open.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "100% Sighting Guarantee",
    desc: "If we don't spot a whale, you come back free. In over a decade of tours, we've maintained one of the best sighting records on the Gold Coast.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "On Board Gift Store",
    desc: "Browse our on board gift shop for whale watching guidebooks, keepsake gifts, and souvenirs — available to purchase during your cruise while the memories are still fresh.",
  },
];

const ITINERARY_INTRO: ReactNode = (
  <div
    style={{
      fontFamily: "var(--font-body)",
      color: "rgba(245,240,232,0.75)",
      lineHeight: 1.9,
    }}
  >
    <p style={{ marginBottom: 20, fontSize: 15 }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 72,
          float: "left",
          lineHeight: 0.78,
          color: "var(--gold)",
          marginRight: 10,
          marginTop: 6,
          fontStyle: "italic",
        }}
      >
        S
      </span>
      ensational two and a half hour Luxury Gold Coast Whale Watching tours on
      board Sun Goddess — one of the fastest whale watching vessels on the Gold
      Coast. A stylish 34 metre superyacht with a fully licensed bar and
      rotating viewing decks so everyone gets an amazing view.
    </p>
    <p style={{ fontSize: 14, clear: "both", marginBottom: 20 }}>
      Jump aboard a clean, well appointed vessel for a truly international
      operation, away from the crowded big players. Live commentary from an
      onboard marine biologist guides you through an epic adventure learning
      about the unique marine life and whale migration off the Gold Coast.
    </p>
    <p style={{ fontSize: 14, marginBottom: 20 }}>
      Planning your whale watching trip? Read our{" "}
      <Link
        href="/boattime-news/luxury-whale-watching-on-the-gold-coast-the-complete-guide"
        style={{
          color: "var(--gold)",
          textDecoration: "underline",
          textUnderlineOffset: 3,
        }}
      >
        complete guide to luxury whale watching on the Gold Coast
      </Link>{" "}
      for season dates, sighting information, what to bring and practical
      planning.
    </p>
    <div style={{ marginBottom: 28 }}>
      <div style={{ ...GL, marginBottom: 14 }}>What&apos;s Included</div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {[
          "Marine biologist live commentary",
          "Complimentary hot chocolate & espresso coffee",
          "Two sessions daily — morning & afternoon",
          "100% whale sighting guarantee",
          "Fully licensed bar & galley",
          "On board gift shop — souvenirs & keepsakes",
        ].map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              fontSize: 13,
              color: "rgba(245,240,232,0.7)",
              marginBottom: 10,
            }}
          >
            <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 1 }}>
              ✓
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
    title: "Schedule",
    content: (
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(245,240,232,0.7)",
          lineHeight: 1.85,
        }}
      >
        <p style={{ marginBottom: 10 }}>
          <strong
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              fontSize: 11,
              textTransform: "uppercase" as const,
            }}
          >
            Morning Session
          </strong>
          <br />
          Boarding 8:30 AM &middot; Departs 9:00 AM &middot; Returns 11:30 AM
        </p>
        <p>
          <strong
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              fontSize: 11,
              textTransform: "uppercase" as const,
            }}
          >
            Afternoon Session
          </strong>
          <br />
          Boarding 11:30 AM &middot; Departs 12:00 PM &middot; Returns 2:30 PM
        </p>
        <p style={{ marginTop: 12, color: "rgba(245,240,232,0.5)" }}>
          Sailing dates vary through the season. The booking calendar shows
          what is open.
        </p>
      </div>
    ),
  },
  {
    title: "What You Should Bring",
    content: (
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(245,240,232,0.7)",
          lineHeight: 1.85,
        }}
      >
        {[
          "Sunscreen and sunglasses",
          "A camera or fully charged phone — you will want it",
          "A warm layer for open-deck viewing (the ocean breeze can be cool)",
          "Non-slip, comfortable shoes",
          "Seasickness medication if you're prone — take 30 minutes before boarding",
          "Photo ID for the licensed bar",
        ].map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 14,
              paddingBottom: 10,
              marginBottom: 10,
              borderBottom: i < 5 ? "1px solid rgba(201,168,76,0.08)" : "none",
            }}
          >
            <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Best Times For This Excursion",
    content: (
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(245,240,232,0.7)",
          lineHeight: 1.85,
        }}
      >
        <p style={{ marginBottom: 14 }}>
          The Gold Coast humpback season runs May through November. Morning
          sessions typically offer calmer sea conditions and more active whale
          behaviour.
        </p>
        <p style={{ marginBottom: 14 }}>
          September and October tend to have the highest whale density as
          thousands of humpbacks pass through on their southern migration.
        </p>
        <p>
          We operate daily throughout the season — and our whale sighting
          guarantee means you will always get value, no matter the conditions.
        </p>
      </div>
    ),
  },
  {
    title: "Frequently Asked",
    content: (
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(245,240,232,0.7)",
          lineHeight: 1.85,
        }}
      >
        {WHALE_FAQS.map((faq, i, arr) => (
          <div
            key={i}
            style={{
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom:
                i < arr.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none",
            }}
          >
            <div
              style={{
                color: "var(--cream)",
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              {faq.q}
            </div>
            <div>{faq.a}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Gift Voucher T&Cs",
    content: (
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(245,240,232,0.7)",
          lineHeight: 1.85,
        }}
      >
        <p style={{ marginBottom: 12 }}>
          Gift vouchers never expire and can be redeemed online for any
          available whale watching session — perfect for birthdays,
          anniversaries, or anyone who has everything.
        </p>
        <p style={{ marginBottom: 12 }}>
          Gift vouchers are $69. To redeem,
          simply enter your voucher code during checkout at our booking portal.
        </p>
        <p>
          Vouchers are valid for any session open for booking
          and can be gifted via email instantly.
        </p>
      </div>
    ),
  },
  {
    title: "Optional Extras & On Board Gift Shop",
    content: (
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(245,240,232,0.7)",
          lineHeight: 1.85,
        }}
      >
        {[
          "Mimosa on arrival — ask the crew when you board",
          "Cheese platter to share between two — available on arrival",
          "Bottle of bubbles with two glasses and strawberries — perfect for celebrations",
          "Toasted banana bread with butter — ideal for morning sessions",
          "Croissant with jam — pairs with your complimentary espresso",
          "Corona bucket with lime — for the afternoon session in the sun",
          "Whale watching guidebooks and keepsake gifts available in the on board gift shop",
          "Gift vouchers $69 — never expire, redeemable online",
        ].map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 14,
              paddingBottom: 10,
              marginBottom: 10,
              borderBottom: i < 8 ? "1px solid rgba(201,168,76,0.08)" : "none",
            }}
          >
            <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
];

// Sun Goddess listed first as primary vessel
const VESSELS = [
  {
    image: "/sun-goddess-main.jpeg",
    name: "Sun Goddess",
    description:
      "Sun Goddess is our primary whale watching vessel — and one of the fastest on the Gold Coast. This sleek 34-metre superyacht offers rotating viewing decks, dual bars, a dual-level galley, and Bose sound throughout. Built for up to 135 guests who expect room to breathe without giving up a single luxury.",
    pax: "135 Guests",
    size: "34m (114ft)",
    features: [
      "Primary Whale Vessel",
      "Rotating Viewing Decks",
      "Dual Bars",
      "Dual-level Galley",
      "Bose Audio",
    ],
    href: "/sun-goddess-gold-coast",
  },
  {
    image: "/mermaid-spirit-main.jpg",
    name: "Mermaid Spirit",
    description:
      "Our tri-deck catamaran for larger group charters and private events. Spacious sun lounge, chef's kitchen, stinger pool, and room for 150 guests. Available for private whale watching charters on request.",
    pax: "150 Guests",
    size: "30m (100ft)",
    features: [
      "3 Decks",
      "Well-Appointed Galley",
      "Sun Lounge",
      "Chef's Kitchen",
      "Dual Bars",
    ],
    href: "/mermaid-spirit-gold-coast",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WhalePage() {
  return (
    <>
      <Script
        src="https://boattimeyachtcharters.rezdy.com/pluginJs"
        strategy="lazyOnload"
      />
      <SiteShell>
        {/* 1 ── HERO */}
        <CruiseHero
          eyebrow="Cruise Tickets · Whale Watching"
          title="Luxury Whale Watching"
          image="/luxury-whale.jpg"
          stats={[
            { label: "Duration", value: "2.5 hours" },
            { label: "From", value: "$79.50 pp" },
            { label: "Season", value: "May – Nov" },
            { label: "Sessions", value: "2 Daily" },
          ]}
          bookingUrl="#book"
        />
        <div className="st-zigzag st-legacy">

        {/* 2 ── SOCIAL PROOF */}
        <div
          className="light-adapt-section cruise-section st-compact"
          style={{
            background: "var(--navy-mid)",
            padding: "28px 48px",
            borderTop: "1px solid rgba(201,168,76,0.1)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 64,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                platform: "Facebook",
                score: "5.0",
                reviews: "2,047 reviews",
                stars: 5,
              },
              {
                platform: "Google",
                score: "4.7",
                reviews: "1,863 reviews",
                stars: 5,
              },
            ].map((r) => (
              <div
                key={r.platform}
                style={{ display: "flex", alignItems: "center", gap: 14 }}
              >
                <div>
                  <div style={{ ...GL, marginBottom: 4 }}>
                    Boattime Yacht Charters
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.45)",
                      marginBottom: 6,
                    }}
                  >
                    {r.platform}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ color: "var(--gold)", fontSize: 13 }}>
                      {"★".repeat(r.stars)}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        color: "var(--cream)",
                        lineHeight: 1,
                      }}
                    >
                      {r.score}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        color: "rgba(245,240,232,0.45)",
                        letterSpacing: "0.06em",
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

        {/* 3 ── SESSION INFO BAR */}
        <div className="light-adapt-section cruise-section whale-infobar-wrap st-compact">
          <div className="whale-infobar-inner">
            <div className="whale-infobar-location">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="5" r="3" />
                <line x1="12" y1="22" x2="12" y2="8" />
                <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
              </svg>
              <a
                href="https://maps.app.goo.gl/ef21zFGntpZDjmB17"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(201,168,76,0.35)",
                }}
              >
                Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast
              </a>
            </div>

            <span className="whale-infobar-divider" />

            <div className="whale-infobar-grid">
              <div className="whale-infobar-cell">
                Morning Session · Departs 9:00 AM
              </div>
              <div className="whale-infobar-cell">
                Afternoon Session · Departs 12:00 PM
              </div>
              <div className="whale-infobar-cell whale-infobar-cell--wide">
                Check the booking calendar for dates
              </div>
            </div>
          </div>
        </div>

        {/* 3b ── DEPARTURE MAP */}
        <div
          className="light-adapt-section"
          style={{
            background: "var(--navy)",
            borderBottom: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <div
            style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 40px" }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.35)",
                marginBottom: 14,
              }}
            >
              Departure Location
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <iframe
                src="https://maps.google.com/maps?q=-27.9407977,153.4237125&z=17&output=embed"
                width="100%"
                height="300"
                style={{
                  display: "block",
                  border: "none",
                  filter: "grayscale(30%) contrast(1.05)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Departure point — Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast"
              />
            </div>
            <div style={{ marginTop: 12, textAlign: "right" }}>
              <a
                href="https://maps.app.goo.gl/ef21zFGntpZDjmB17"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  textDecoration: "none",
                }}
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* 4 ── WHY SUN GODDESS (new) */}
        <section
          className="cruise-section"
          style={{ background: "var(--navy)", padding: "100px 48px" }}
        >
          <div
            className="cruise-page-split"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left — image */}
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              <img
                src="/sungoddess-page-boat.jpeg"
                alt="Sun Goddess whale watching"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Fastest vessel badge */}
              <div
                className="photo-overlay-card"
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  background: "rgba(10,22,40,0.92)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  padding: "16px 24px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ ...GL, marginBottom: 6 }}>Primary Vessel</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 300,
                    color: "var(--cream)",
                    lineHeight: 1,
                  }}
                >
                  Sun Goddess
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "rgba(245,240,232,0.5)",
                    marginTop: 4,
                    letterSpacing: "0.05em",
                  }}
                >
                  34m · One of the fastest on the Gold Coast
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div>
              <div style={{ ...GL, marginBottom: 20 }}>The Vessel</div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: "var(--cream)",
                  marginBottom: 24,
                }}
              >
                Sun Goddess —{" "}
                <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
                  the fastest way to the whales
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "rgba(245,240,232,0.72)",
                  lineHeight: 1.85,
                  marginBottom: 32,
                }}
              >
                Sun Goddess is our primary whale watching vessel and one of the
                fastest on the Gold Coast. Her 34-metre hull means she reaches
                the migration corridor quickly — giving you more time with the
                whales and less time in transit.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(245,240,232,0.58)",
                  lineHeight: 1.85,
                  marginBottom: 36,
                }}
              >
                Rotating viewing decks ensure every passenger gets an
                unobstructed sightline. The warm galley, licensed bar, and
                onboard crew mean you&apos;re comfortable from the moment you
                step aboard to the moment you step off.
              </p>
              {/* Specs strip */}
              <div
                className="vessel-specs-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  paddingTop: 28,
                  borderTop: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                {[
                  { label: "Vessel", value: "Sun Goddess" },
                  { label: "Length", value: "34m (114ft)" },
                  { label: "Capacity", value: "Up to 135 guests" },
                  { label: "Speed", value: "Among Gold Coast's fastest" },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ ...GL, marginBottom: 4 }}>{s.label}</div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "rgba(245,240,232,0.75)",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/sun-goddess-gold-coast"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 28,
                }}
              >
                Sun Goddess: full specifications &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* 5 ── WHAT'S INCLUDED FEATURE GRID (new) */}
        <section
          className="cruise-section"
          style={{
            background: "var(--navy-mid)",
            padding: "100px 48px",
            borderTop: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: 32,
                      height: 1,
                      background: "var(--gold)",
                    }}
                  />
                  Every Ticket Includes
                  <span
                    style={{
                      display: "block",
                      width: 32,
                      height: 1,
                      background: "var(--gold)",
                    }}
                  />
                </div>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.05,
                  color: "var(--cream)",
                  letterSpacing: "-0.02em",
                }}
              >
                What&apos;s{" "}
                <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
                  Included
                </em>
              </h2>
            </div>

            {/* 3-column feature grid */}
            <div
              className="cruise-3col-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 2,
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  style={{
                    gridColumn:
                      FEATURES.length === 5 && i === 3
                        ? "2 / 4"
                        : FEATURES.length === 5 && i === 4
                          ? "4 / 6"
                          : "span 2",
                    padding: "40px 32px",
                    borderRight:
                      (i + 1) % 3 !== 0 && i !== FEATURES.length - 1
                        ? "1px solid rgba(201,168,76,0.08)"
                        : "none",
                    borderBottom:
                      i < 3 ? "1px solid rgba(201,168,76,0.08)" : "none",
                  }}
                >
                  <div style={{ color: "var(--gold)", marginBottom: 20 }}>
                    {f.icon}
                  </div>
                  <div style={{ ...GL, marginBottom: 12 }}>{f.title}</div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(245,240,232,0.65)",
                      lineHeight: 1.75,
                    }}
                    dangerouslySetInnerHTML={{ __html: f.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 ── ONBOARD UPGRADES */}
        <section
          className="cruise-section"
          style={{
            background: "var(--navy)",
            padding: "100px 48px",
            borderTop: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: 32,
                      height: 1,
                      background: "var(--gold)",
                    }}
                  />
                  Onboard Upgrades
                  <span
                    style={{
                      display: "block",
                      width: 32,
                      height: 1,
                      background: "var(--gold)",
                    }}
                  />
                </div>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.05,
                  color: "var(--cream)",
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                Enhance Your{" "}
                <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
                  Experience
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(245,240,232,0.5)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Optional upgrades available on arrival — ask the crew when you
                board
              </p>
            </div>

            {/* Upgrade cards */}
            <div
              className="cruise-3col-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              {[
                {
                  name: "Mimosa on Arrival",
                  desc: "Start your whale watching adventure the right way — a chilled mimosa ready as you step aboard.",
                },
                {
                  name: "Cheese Platter",
                  desc: "A curated cheese platter to share between two, perfect for grazing while you scan the horizon.",
                },
                {
                  name: "Bottle of Bubbles",
                  desc: "A bottle of sparkling with two glasses and fresh strawberries — ideal for birthdays or celebrations at sea.",
                },
                {
                  name: "Toasted Banana Bread",
                  desc: "Warm toasted banana bread served with butter — a comforting start to your morning session.",
                },
                {
                  name: "Croissant with Jam",
                  desc: "A freshly baked croissant served with jam — the perfect pairing with your complimentary espresso.",
                },
                {
                  name: "Corona Bucket with Lime",
                  desc: "A bucket of ice-cold Coronas with fresh lime — made for the afternoon session in the Gold Coast sun.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "36px 32px",
                    borderRight:
                      (i + 1) % 3 !== 0
                        ? "1px solid rgba(201,168,76,0.08)"
                        : "none",
                    borderBottom:
                      i < 3 ? "1px solid rgba(201,168,76,0.08)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: 600,
                    }}
                  >
                    {item.name}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(245,240,232,0.6)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8 ── GALLERY */}
        <CruiseGallery
          main="/humpback-circle.jpg"
          thumbs={GALLERY_THUMBS}
          wide="/luxury-whale.jpg"
        />

        {/* 7 ── QUICK INFO GRID */}
        <div
          className="light-adapt-section cruise-section"
          style={{
            background: "var(--navy-mid)",
            padding: "60px 48px",
            borderTop: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="cruise-3col-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              {[
                {
                  label: "Departure Point",
                  value: "Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast",
                },
                { label: "Sessions Per Day", value: "2 — Morning & Afternoon" },
                { label: "Sailing Dates", value: "See the booking calendar" },
                { label: "Duration", value: "2.5 Hours Per Session" },
                {
                  label: "Primary Vessel",
                  value: "Sun Goddess · 34m Superyacht",
                },
                { label: "Guarantee", value: "Whale Sighting Guaranteed" },
              ].map((item, i, arr) => (
                <div
                  key={i}
                  style={{
                    padding: "32px 28px",
                    borderRight:
                      (i + 1) % 3 !== 0
                        ? "1px solid rgba(201,168,76,0.08)"
                        : "none",
                    borderBottom:
                      i < arr.length - 3
                        ? "1px solid rgba(201,168,76,0.08)"
                        : "none",
                  }}
                >
                  <div style={{ ...GL, marginBottom: 8 }}>{item.label}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(245,240,232,0.78)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8 ── DETAILS & ITINERARY */}
        <CruiseItinerary items={ITINERARY} intro={ITINERARY_INTRO} />

        {/* 9 ── OUR YACHTS */}
        <CruiseYachts vessels={VESSELS} />

        {/* 10 ── THE BOATTIME EXPERIENCE */}
        <CruiseExperience videoId="4te3yFiKLmM" />

        {/* 11 ── INLINE BOOKING WIDGET */}
        <section
          id="book"
          className="cruise-section"
          style={{
            background: "var(--navy-mid)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "80px 48px 100px",
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <div
                className="section-eyebrow"
                style={{ justifyContent: "center" }}
              >
                Book Your Session
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(36px, 5vw, 60px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  color: "var(--cream)",
                  marginBottom: 16,
                }}
              >
                Reserve your{" "}
                <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
                  spot
                </em>
                .
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                Morning and afternoon sessions run daily May through November.
                Instant confirmation — cancel up to 24 hours before for a full
                refund.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--border-subtle)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <iframe
                seamless
                width="100%"
                height="1000px"
                frameBorder="0"
                className="rezdy"
                src="https://boattimeyachtcharters.rezdy.com/431872/luxury-whale-watching-experience?iframe=true"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </section>
      <FaqEnquiry faqs={[]} />
        </div>
      </SiteShell>
    </>
  );
}
