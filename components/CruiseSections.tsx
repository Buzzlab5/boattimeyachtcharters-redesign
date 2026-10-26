'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow, ItalicEm, Button } from './Shared';
import { heroBackground } from '@/lib/img';

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

export interface StatPill {
  label: string;
  value: string;
}
export interface Inclusion {
  title: string;
  detail: string;
}
export interface Stop {
  label: string;
  time: string;
}
export interface PriceTier {
  label: string;
  price: string;
  note?: string;
}
export interface FoodSect {
  heading: string;
  items: string[];
}

// ── HERO ──────────────────────────────────────────────────────────────────────

export function CruiseHero({
  eyebrow,
  title,
  titleAccent,
  image,
  stats,
  bookingUrl,
  titleFontSize,
  notice,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: React.ReactNode;
  image: string;
  stats: StatPill[];
  bookingUrl: string;
  titleFontSize?: string;
  /** Optional message shown above the eyebrow, e.g. a "currently unavailable" notice. */
  notice?: React.ReactNode;
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
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: '100vh', background: 'var(--navy)' }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: heroBackground(image),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.58) 55%, rgba(10,22,40,0.28) 100%), linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.08) 50%)',
        }}
      />
      <div
        ref={textRef}
        className="relative z-10 w-full cruise-hero-content"
        style={{
          paddingLeft: 48,
          paddingRight: 48,
          paddingTop: 100,
          maxWidth: 1200,
        }}
      >
        {notice}
        <div className="section-eyebrow hr" style={{ marginBottom: 24 }}>
          {eyebrow}
        </div>
        <h1
          className="hr"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: titleFontSize ?? 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            marginBottom: 36,
          }}
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
                {titleAccent}
              </span>
            </>
          )}
        </h1>
        <div
          className="hr flex flex-wrap cruise-stats-row"
          style={{ gap: 10, marginBottom: 44 }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                padding: '12px 22px',
                border: '1px solid rgba(201,168,76,0.38)',
                background: 'rgba(10,22,40,0.52)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ ...GL, marginBottom: 5 }}>{s.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  color: 'var(--cream)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
        <div className="hr flex gap-4 flex-wrap">
          <Button variant="primary" href={bookingUrl}>
            Book Now
          </Button>
          <Button variant="ghost" href="#itinerary">
            View Details
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── OVERVIEW (2-col text + image) ────────────────────────────────────────────

export function CruiseOverview({
  title,
  titleAccent,
  description,
  image,
}: {
  title: string;
  titleAccent?: string;
  description: string[];
  image: string;
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

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
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
        <div>
          <div className="rv">
            <Eyebrow>The Experience</Eyebrow>
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
              right: -24,
              bottom: -24,
              left: 24,
              border: '1px solid rgba(201,168,76,0.1)',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── INCLUSIONS (numbered card grid) ──────────────────────────────────────────

export function CruiseInclusions({ items }: { items: Inclusion[] }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ic'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
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
      style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>What&rsquo;s Included</Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Everything you <ItalicEm>need on board</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="ic"
              style={{ padding: '40px 32px', background: 'var(--navy-mid)' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 40,
                  color: 'rgba(201,168,76,0.2)',
                  lineHeight: 1,
                  marginBottom: 18,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ ...GL }}>{item.title}</div>
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
    </section>
  );
}

// ── SCHEDULE + DETAILS ────────────────────────────────────────────────────────

export function CruiseScheduleDetails({
  schedule,
  dates,
  location,
  vessel,
  availability,
}: {
  schedule: Stop[];
  dates: string;
  location: string;
  vessel: string;
  availability?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  const detailRows = [
    { label: 'Departure Point', value: location },
    { label: 'Vessel', value: vessel },
    { label: 'When', value: dates },
    ...(availability ? [{ label: 'Availability', value: availability }] : []),
  ];

  return (
    <section
      id="details"
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div
        className="cruise-details-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
        }}
      >
        <div>
          <Eyebrow>Schedule</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              lineHeight: 1.05,
              marginBottom: 48,
            }}
          >
            Departure <ItalicEm>timetable</ItalicEm>.
          </h2>
          {schedule.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 24 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                  width: 16,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                {i < schedule.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      flex: 1,
                      background: 'rgba(201,168,76,0.2)',
                      minHeight: 40,
                    }}
                  />
                )}
              </div>
              <div style={{ marginBottom: 28 }}>
                <div style={{ ...GL }}>{s.label}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32,
                    color: 'var(--cream)',
                    lineHeight: 1,
                  }}
                >
                  {s.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Eyebrow>Details</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              lineHeight: 1.05,
              marginBottom: 48,
            }}
          >
            Getting <ItalicEm>there</ItalicEm>.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            {detailRows.map((d) => (
              <div key={d.label}>
                <div style={{ ...GL }}>{d.label}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.78)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PRICING CARDS ─────────────────────────────────────────────────────────────

export function CruisePricingCards({
  pricing,
  bookingUrl,
}: {
  pricing: PriceTier[];
  bookingUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.pc'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
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
      style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>Pricing</Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Transparent <ItalicEm>pricing</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-pricing-grid"
          style={{
            display: 'flex',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          {pricing.map((p, i) => (
            <div
              key={i}
              className="pc"
              style={{
                flex: 1,
                minWidth: 160,
                padding: '48px 32px',
                background: 'var(--navy-mid)',
                textAlign: 'center',
                borderRight:
                  i < pricing.length - 1
                    ? '2px solid rgba(201,168,76,0.08)'
                    : 'none',
              }}
            >
              <div style={{ ...GL, textAlign: 'center' }}>{p.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 'clamp(44px, 5vw, 64px)',
                  color: 'var(--cream)',
                  lineHeight: 1,
                  margin: '16px 0 12px',
                }}
              >
                {p.price}
              </div>
              {p.note && (
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    color: 'rgba(245,240,232,0.45)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {p.note}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Button variant="primary" href={bookingUrl}>
            Secure Your Tickets
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── BOOKING CTA ───────────────────────────────────────────────────────────────

export function CruiseBookingCTA({ bookingUrl }: { bookingUrl: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: '120px 48px',
        background: 'var(--navy-mid)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.07), transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Eyebrow>Ready to book?</Eyebrow>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Your place on the water <ItalicEm>awaits</ItalicEm>.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.75,
            marginBottom: 44,
            maxWidth: 460,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Secure your tickets in under two minutes. Gift vouchers available.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button variant="primary" href={bookingUrl}>
            Book Now
          </Button>
          <Button variant="ghost" href="/#inquiry">
            Enquire
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── EVENT BANNER (date + vessel callout) ─────────────────────────────────────

export function CruiseEventBanner({
  date,
  vessel,
  tagline,
  adultsOnly,
  urgency,
}: {
  date: string;
  vessel: string;
  tagline?: string;
  adultsOnly?: boolean;
  urgency?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.eb'), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: '80px 48px',
        background: 'var(--navy)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        <div className="eb">
          <div style={{ ...GL, marginBottom: 12 }}>Event Date</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: 'var(--gold-light)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            {date}
          </div>
        </div>
        <div
          className="eb"
          style={{
            borderLeft: '1px solid rgba(201,168,76,0.2)',
            paddingLeft: 48,
          }}
        >
          <div style={{ ...GL, marginBottom: 12 }}>Vessel</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 28,
              color: 'var(--cream)',
              lineHeight: 1,
            }}
          >
            {vessel}
          </div>
          {tagline && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'rgba(245,240,232,0.55)',
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              {tagline}
            </div>
          )}
        </div>
        <div
          className="eb"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'flex-end',
          }}
        >
          {adultsOnly && (
            <div
              style={{
                padding: '8px 18px',
                border: '1px solid rgba(201,168,76,0.4)',
                fontFamily: 'var(--font-body)',
                fontSize: 9,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 600,
              }}
            >
              18+ Event
            </div>
          )}
          {urgency && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'rgba(245,240,232,0.6)',
                letterSpacing: '0.06em',
              }}
            >
              {urgency}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── SESSIONS (morning / afternoon split) ─────────────────────────────────────

export function CruiseSessions({
  morning,
  afternoon,
}: {
  morning: { boarding: string; departs: string; returns: string };
  afternoon: { boarding: string; departs: string; returns: string };
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ss'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  function SessionCard({
    label,
    times,
  }: {
    label: string;
    times: { boarding: string; departs: string; returns: string };
  }) {
    return (
      <div className="ss" style={{ flex: 1, padding: '48px 40px' }}>
        <div style={{ ...GL, marginBottom: 20 }}>Session</div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontStyle: 'italic',
            color: 'var(--cream)',
            marginBottom: 32,
          }}
        >
          {label}
        </div>
        {[
          { l: 'Boarding', v: times.boarding },
          { l: 'Departure', v: times.departs },
          { l: 'Return', v: times.returns },
        ].map((row) => (
          <div
            key={row.l}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 14,
              marginBottom: 14,
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.5)',
                fontWeight: 500,
              }}
            >
              {row.l}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                color: 'var(--gold-light)',
              }}
            >
              {row.v}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '0 48px', background: 'var(--navy-mid)' }}
    >
      <div
        className="cruise-sessions-inner"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          background: 'rgba(201,168,76,0.06)',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <SessionCard label="Morning Session" times={morning} />
        <div
          style={{
            width: 1,
            background: 'rgba(201,168,76,0.15)',
            flexShrink: 0,
          }}
        />
        <SessionCard label="Afternoon Session" times={afternoon} />
      </div>
    </section>
  );
}

// ── GUARANTEE BANNER ─────────────────────────────────────────────────────────

export function CruiseGuaranteeBanner() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 20,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: '72px 48px',
        background: 'var(--navy)',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Eyebrow>Our Guarantee</Eyebrow>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.15,
            color: 'var(--gold-light)',
            marginBottom: 16,
          }}
        >
          &ldquo;If no whales are sighted, we&rsquo;ll give you a complimentary
          return ticket — no questions asked.&rdquo;
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'rgba(245,240,232,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Whale Sighting Guarantee
        </p>
      </div>
    </section>
  );
}

// ── DEAL BANNER ───────────────────────────────────────────────────────────────

export function CruiseDealBanner({
  headline,
  sub,
}: {
  headline: string;
  sub: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(ref.current, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
    });
  });

  return (
    <div
      ref={ref}
      className="cruise-deal-banner"
      style={{ background: 'var(--gold)', padding: '24px 48px' }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              fontWeight: 700,
              opacity: 0.7,
            }}
          >
            Special Offer
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 300,
              color: 'var(--navy)',
              lineHeight: 1,
            }}
          >
            {headline}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'rgba(10,22,40,0.6)',
            letterSpacing: '0.06em',
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

// ── PERFECT FOR ───────────────────────────────────────────────────────────────

export function CruisePerfectFor({
  categories,
}: {
  categories: { label: string; description: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.pf'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '80px 48px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Eyebrow>Perfect For</Eyebrow>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 2,
            marginTop: 40,
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          {categories.map((c, i) => (
            <div
              key={i}
              className="pf"
              style={{
                flex: 1,
                padding: '36px 28px',
                borderRight:
                  i < categories.length - 1
                    ? '1px solid rgba(201,168,76,0.1)'
                    : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 26,
                  color: 'var(--gold-light)',
                  marginBottom: 12,
                  lineHeight: 1,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.62)',
                  lineHeight: 1.7,
                }}
              >
                {c.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FOOD MENU ─────────────────────────────────────────────────────────────────

export function CruiseFoodMenu({
  sections,
  title = 'The Menu',
  titleAccent = 'On Board',
}: {
  sections: FoodSect[];
  title?: string;
  titleAccent?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.mc'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
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
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>The Menu</Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            {title} <ItalicEm>{titleAccent}</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-menu-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(sections.length, 3)}, 1fr)`,
            gap: 0,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          {sections.map((s, i) => (
            <div
              key={i}
              className="mc"
              style={{
                padding: '44px 36px',
                borderRight:
                  i < sections.length - 1
                    ? '1px solid rgba(201,168,76,0.1)'
                    : 'none',
              }}
            >
              <div style={{ ...GL, marginBottom: 24 }}>{s.heading}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {s.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'rgba(245,240,232,0.72)',
                      lineHeight: 1,
                      paddingBottom: 14,
                      marginBottom: 14,
                      borderBottom:
                        j < s.items.length - 1
                          ? '1px solid rgba(201,168,76,0.08)'
                          : 'none',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CHEF PROFILE ─────────────────────────────────────────────────────────────

export function CruiseChefSection({
  name,
  role,
  bio,
  image,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.cf'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}
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
        <div className="cf" style={{ position: 'relative' }}>
          <div
            style={{
              aspectRatio: '1/1',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              border: '1px solid rgba(201,168,76,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: -24,
              bottom: -24,
              right: 24,
              border: '1px solid rgba(201,168,76,0.1)',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
        </div>
        <div>
          <div className="cf">
            <Eyebrow>In the Kitchen</Eyebrow>
          </div>
          <h2
            className="cf"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.05,
              marginBottom: 8,
            }}
          >
            {name}
          </h2>
          <div
            className="cf"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            {role}
          </div>
          <p
            className="cf"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              fontWeight: 300,
              color: 'rgba(245,240,232,0.78)',
              lineHeight: 1.85,
            }}
          >
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
}

// ── FAMILY CALLOUT ────────────────────────────────────────────────────────────

export function CruiseFamilyCallout({ bookingUrl }: { bookingUrl: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{
        padding: '80px 48px',
        background: 'var(--navy)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 40,
        }}
      >
        <div>
          <Eyebrow>Family Pricing</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.05,
            }}
          >
            Bring the <ItalicEm>whole family</ItalicEm>.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(245,240,232,0.65)',
              lineHeight: 1.7,
              marginTop: 16,
              maxWidth: 480,
            }}
          >
            Family package covers 2 adults and 2 children. Children aged 3–12
            welcome aboard. Suitable for all ages.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.1)',
            flexShrink: 0,
          }}
        >
          {[
            { l: 'Adult', p: '$99', n: 'Per person' },
            { l: 'Child (3–12)', p: '$79', n: 'Per child' },
            { l: 'Family', p: '$349', n: '2 adults + 2 children' },
          ].map((t, i) => (
            <div
              key={i}
              style={{
                padding: '28px 28px',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                minWidth: 120,
              }}
            >
              <div style={{ ...GL, textAlign: 'center' }}>{t.l}</div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 36,
                  color: 'var(--cream)',
                  lineHeight: 1,
                  margin: '10px 0 6px',
                }}
              >
                {t.p}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  color: 'rgba(245,240,232,0.4)',
                  letterSpacing: '0.06em',
                }}
              >
                {t.n}
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" href={bookingUrl}>
          Book for the Family
        </Button>
      </div>
    </section>
  );
}

// ── SOCIAL PROOF ─────────────────────────────────────────────────────────────

export function CruiseSocialProof({
  ratings,
}: {
  ratings: { score: string; label: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.sp'), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '72px 48px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Eyebrow>Our Reputation</Eyebrow>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 64,
            flexWrap: 'wrap',
            marginTop: 32,
            paddingTop: 32,
            borderTop: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          {ratings.map((r) => (
            <div key={r.label} className="sp" style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 48,
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}
              >
                {r.score}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  marginTop: 8,
                }}
              >
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PHOTOGRAPHY FEATURE ───────────────────────────────────────────────────────

export function CruisePhotographyFeature() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ph'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '0 48px', background: 'var(--navy)' }}
    >
      <div
        className="cruise-photo-feature-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'rgba(201,168,76,0.05)',
          border: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div style={{ padding: '60px 48px' }}>
          <div className="ph">
            <Eyebrow>Complimentary Inclusion</Eyebrow>
          </div>
          <h2
            className="ph"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Professional <ItalicEm>photography</ItalicEm> included.
          </h2>
          <p
            className="ph"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 300,
              color: 'rgba(245,240,232,0.7)',
              lineHeight: 1.8,
            }}
          >
            Our professional photographer captures your boarding moment and the
            golden hour on the Broadwater. The images are yours — no extra
            charge. A keepsake of the evening that will last long after the
            night does.
          </p>
        </div>
        <div
          className="ph"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 320,
          }}
        />
      </div>
    </section>
  );
}

// ── PHOTO GALLERY ─────────────────────────────────────────────────────────────

export function CruiseGallery({
  main,
  thumbs,
}: {
  main: string;
  thumbs: string[];
  wide?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const touchStartX = useRef<number>(0);
  const allImages = [main, ...thumbs.slice(0, 4)];

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length));
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? null : (i + 1) % allImages.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, allImages.length]);

  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.gl'), {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  const imgTile = (src: string, idx: number, style: React.CSSProperties) => (
    <div
      key={idx}
      onClick={() => setLightbox(idx)}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'zoom-in',
        ...style,
      }}
    />
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ background: 'var(--navy)', padding: '80px 48px 80px' }}
    >
      {/* ── Lightbox overlay ── */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
              if (diff > 0) setLightbox((lightbox + 1) % allImages.length);
              else setLightbox((lightbox - 1 + allImages.length) % allImages.length);
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allImages.length) % allImages.length); }}
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(201,168,76,0.85)', border: 'none', borderRadius: '50%', width: 52, height: 52, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
            aria-label="Previous"
          >
            <svg width="18" height="14" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="#0A1628" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Image */}
          <img
            src={allImages[lightbox]}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '76vw', maxHeight: '88vh', objectFit: 'contain', userSelect: 'none' }}
            alt=""
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allImages.length); }}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(201,168,76,0.85)', border: 'none', borderRadius: '50%', width: 52, height: 52, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
            aria-label="Next"
          >
            <svg width="18" height="14" viewBox="0 0 14 10" fill="none"><path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="#0A1628" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18, lineHeight: 1 }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.2em' }}>
            {lightbox + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* ── Desktop grid (hidden on mobile) ── */}
      <div className="cruise-gallery-desktop" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div
          className="gl cruise-gallery-top"
          style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 2, height: 400 }}
        >
          {imgTile(main, 0, { minHeight: 400 })}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2 }}>
            {thumbs.slice(0, 4).map((src, i) => imgTile(src, i + 1, {}))}
          </div>
        </div>
      </div>

      {/* ── Mobile looping slider (hidden on desktop) ── */}
      <div className="cruise-gallery-mobile">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Slides */}
          <div style={{ display: 'flex', transform: `translateX(-${slideIdx * 100}%)`, transition: 'transform 0.35s ease' }}>
            {allImages.map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                style={{ flex: '0 0 100%', height: 280, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'zoom-in' }}
              />
            ))}
          </div>
          {/* Prev arrow */}
          <button
            onClick={() => setSlideIdx((slideIdx - 1 + allImages.length) % allImages.length)}
            aria-label="Previous"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="white" strokeWidth="1.5"/></svg>
          </button>
          {/* Next arrow */}
          <button
            onClick={() => setSlideIdx((slideIdx + 1) % allImages.length)}
            aria-label="Next"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="white" strokeWidth="1.5"/></svg>
          </button>
        </div>
        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              aria-label={`Slide ${i + 1}`}
              style={{ width: i === slideIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === slideIdx ? 'var(--gold)' : 'rgba(245,240,232,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.25s, background 0.25s' }}
            />
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 10, fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)' }}>
          Tap photo to enlarge
        </p>
      </div>
    </section>
  );
}

// ── DETAILS & ITINERARY ACCORDION ────────────────────────────────────────────

export function CruiseItinerary({
  items,
  intro,
}: {
  items: { title: string; content: ReactNode }[];
  intro?: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ia'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="itinerary"
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="ia" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>Plan Your Visit</Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Details &amp; <ItalicEm>Itinerary</ItalicEm>.
          </h2>
        </div>
        <div
          className="ia cruise-itinerary-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: intro ? '5fr 7fr' : '1fr',
            gap: intro ? 80 : 0,
            alignItems: 'start',
          }}
        >
          {/* Left: intro descriptive text */}
          {intro && <div>{intro}</div>}
          {/* Right: accordion */}
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.18)' }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{ borderBottom: '1px solid rgba(201,168,76,0.18)' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '22px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: open === i ? 'var(--gold)' : 'var(--cream)',
                    transition: 'color 0.2s',
                    textAlign: 'left',
                  }}
                >
                  {item.title}
                  <span
                    style={{
                      fontSize: 22,
                      lineHeight: 1,
                      color: 'var(--gold)',
                      fontWeight: 300,
                      flexShrink: 0,
                      marginLeft: 24,
                      display: 'inline-block',
                      transition: 'transform 0.25s',
                      transform: open === i ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: open === i ? 800 : 0,
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <div style={{ paddingBottom: 28 }}>{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── OUR YACHTS (full-bleed carousel) ────────────────────────────────────────

interface VesselData {
  image: string;
  name: string;
  description: string;
  pax: string;
  size: string;
  features: string[];
  href: string;
}

export function CruiseYachts({ vessels }: { vessels: VesselData[] }) {
  const [current, setCurrent] = useState(0);
  const vessel = vessels[current];
  const prev = () =>
    setCurrent((c) => (c - 1 + vessels.length) % vessels.length);
  const next = () => setCurrent((c) => (c + 1) % vessels.length);

  return (
    <section style={{ background: 'var(--navy)' }}>
      {/* Section header */}
      <div
        className="cruise-section"
        style={{ textAlign: 'center', padding: '80px 48px 48px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Eyebrow>The Fleet</Eyebrow>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.05,
          }}
        >
          Our <ItalicEm>Yachts</ItalicEm>.
        </h2>
      </div>

      {/* Full-bleed carousel */}
      <div
        className="vessel-carousel-overlay"
        style={{ position: 'relative', minHeight: 580 }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${vessel.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,22,40,0.68)',
          }}
        />

        {/* Centred content overlay */}
        <div
          className="vessel-carousel-content"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '72px 140px 100px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontStyle: 'italic',
              color: 'var(--cream)',
              marginBottom: 20,
              lineHeight: 1,
            }}
          >
            {vessel.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(245,240,232,0.78)',
              lineHeight: 1.85,
              marginBottom: 36,
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {vessel.description}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <div
              style={{
                padding: '0 36px',
                borderRight: '1px solid rgba(201,168,76,0.3)',
              }}
            >
              <div style={{ ...GL, textAlign: 'center' }}>PAX</div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  color: 'var(--cream)',
                  lineHeight: 1,
                  marginTop: 4,
                }}
              >
                {vessel.pax}
              </div>
            </div>
            <div style={{ padding: '0 36px' }}>
              <div style={{ ...GL, textAlign: 'center' }}>SIZE</div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  color: 'var(--cream)',
                  lineHeight: 1,
                  marginTop: 4,
                }}
              >
                {vessel.size}
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'rgba(245,240,232,0.72)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 32,
            }}
          >
            <span
              style={{ color: 'var(--gold)', fontWeight: 600, marginRight: 8 }}
            >
              Features:
            </span>
            {vessel.features.join(' · ')}
          </div>
          <a
            href={vessel.href}
            onClick={(e) => {
              // The homepage fleet section is an anchor on another route, so it
              // still needs the stored-scroll handoff. A real page link does
              // not: let the browser follow it.
              if (vessel.href !== '/#fleet') return;
              e.preventDefault();
              sessionStorage.setItem('scrollTo', '#fleet');
              window.location.href = '/';
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            View {vessel.name}
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

        {/* Navigation arrows */}
        {vessels.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous yacht"
              style={{
                position: 'absolute',
                left: 32,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.4)',
                color: 'var(--gold)',
                width: 52,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 20,
              }}
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next yacht"
              style={{
                position: 'absolute',
                right: 32,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.4)',
                color: 'var(--gold)',
                width: 52,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 20,
              }}
            >
              →
            </button>
          </>
        )}

        {/* Dot indicators */}
        {vessels.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: 28,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 8,
              zIndex: 2,
            }}
          >
            {vessels.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to yacht ${i + 1}`}
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  background:
                    i === current ? 'var(--gold)' : 'rgba(201,168,76,0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── THE BOATTIME EXPERIENCE (YouTube) ────────────────────────────────────────

export function CruiseExperience({ videoId }: { videoId: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ex'), {
        y: 30,
        opacity: 0,
        duration: 0.9,
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
      style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="ex" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>See It For Yourself</Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            The Boattime <ItalicEm>Experience</ItalicEm>.
          </h2>
        </div>
        <div
          className="ex"
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title="The Boattime Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
              border: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── GIFT VOUCHER CALLOUT ──────────────────────────────────────────────────────

export function CruiseGiftVoucherCallout({
  bookingUrl,
}: {
  bookingUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '72px 48px', background: 'var(--navy)' }}
    >
      <div
        className="gift-voucher-inner"
        style={{
          maxWidth: 900,
          margin: '0 auto',
          border: '1px solid rgba(201,168,76,0.25)',
          padding: '52px 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        <div>
          <div style={{ ...GL, marginBottom: 16 }}>Gift Vouchers</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(24px, 3vw, 40px)',
              lineHeight: 1.05,
            }}
          >
            The <ItalicEm>perfect gift</ItalicEm> for someone special.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.7,
              marginTop: 12,
              maxWidth: 420,
            }}
          >
            Gift a Valentine&rsquo;s cruise and let them choose the date.
            Vouchers never expire and can be redeemed for any cruise.
          </p>
        </div>
        <Button variant="outline" href={bookingUrl}>
          Buy a Gift Voucher
        </Button>
      </div>
    </section>
  );
}
