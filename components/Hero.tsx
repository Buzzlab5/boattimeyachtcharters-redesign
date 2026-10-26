'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Shared';
import { useTheme } from './ThemeProvider';
import HeroSearch from './HeroSearch';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function getGoldCoastSunset(): string {
  const now = new Date();
  const yr = now.getFullYear();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(yr, 0, 0).getTime()) / 86400000,
  );
  const lat = -27.9 * (Math.PI / 180);
  const lon = 153.4;
  const B = (2 * Math.PI * (dayOfYear - 81)) / 364;
  const decl = 23.45 * Math.sin(B) * (Math.PI / 180);
  const cosH =
    (Math.cos(90.833 * (Math.PI / 180)) - Math.sin(decl) * Math.sin(lat)) /
    (Math.cos(decl) * Math.cos(lat));
  if (Math.abs(cosH) > 1) return '—';
  const H = Math.acos(cosH) * (180 / Math.PI);
  const noon = 12 - (lon - 150) / 15;
  const sunset = noon + H / 15;
  const h = Math.floor(sunset);
  const m = Math.floor((sunset - h) * 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

// Split "Calm · 0.4m" → ["Calm", " · 0.4m"] for em-tag styling
function splitVal(val: string): [string, string | null] {
  const idx = val.indexOf(' · ');
  if (idx === -1) return [val, null];
  return [val.slice(0, idx), val.slice(idx)];
}

interface InfobarData {
  sunset: string;
  seaState: string;
  nextWhale: string;
  availability: string;
}

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [infobar, setInfobar] = useState<InfobarData>({
    sunset: getGoldCoastSunset(),
    seaState: 'Calm · 0.4m',
    nextWhale: '—',
    availability: '—',
  });

  useEffect(() => {
    fetch('/api/conditions')
      .then((r) => r.json())
      .then((data: InfobarData) => setInfobar(data))
      .catch(() => {});
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Ken Burns on background
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 14, ease: 'none' },
      );

      // 2. Orchestrated load sequence
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(eyebrowRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
        .from(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          {
            y: '105%',
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.35',
        )
        .from(
          subtitleRef.current,
          { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5',
        )
        .from(
          bottomRowRef.current,
          { y: 18, opacity: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.45',
        )
        .from(
          badgeRef.current,
          { x: 30, opacity: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.6',
        )
        .from(
          scrollCueRef.current,
          { opacity: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3',
        );

      // 3. Scroll cue line pulse loop
      gsap.to(scrollLineRef.current, {
        scaleY: 0.4,
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // 4. Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 5. Subtle content lift on scroll
      gsap.to(
        [
          eyebrowRef.current,
          line1Ref.current,
          line2Ref.current,
          line3Ref.current,
          subtitleRef.current,
          bottomRowRef.current,
        ],
        {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex"
      style={{ height: '100vh', minHeight: 720, background: 'var(--navy)' }}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/new-hero-img.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      />

      {/* Gradient overlay — left to right + bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0.45) 55%, rgba(10,22,40,0.25) 100%), linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.1) 45%)',
        }}
      />

      {/* Bottom horizon gradient — hidden in light mode (var(--navy) is cream there) */}
      {!isLight && (
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: 100,
            background: 'linear-gradient(to top, var(--navy), transparent)',
          }}
        />
      )}

      {/* Rating badge — top right */}
      {/* <div
        ref={badgeRef}
        className="absolute z-10 hero-rating-badge"
        style={{
          top: 120,
          right: 48,
          padding: '14px 22px',
          border: '1px solid rgba(201,168,76,0.4)',
          background: 'rgba(10,22,40,0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 500,
        }}
      >
        <Icon name="star" size={11} color="var(--gold)" />
        4.7 · 3,910+ guest reviews
      </div> */}

      {/* Main content */}
      <div
        className="relative z-10 w-full hero-content"
        style={{
          paddingLeft: 48,
          paddingRight: 48,
          paddingBottom: 80,
          maxWidth: 1200,
          alignSelf: 'flex-start',
          marginTop: 'max(100px, calc(50vh - 300px))',
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="section-eyebrow"
          style={{ marginBottom: 28 }}
        >
          Superyacht Charters &middot; Gold Coast &amp; Brisbane
        </div>

        {/* Title — masked line-by-line reveal */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(56px, 8vw, 120px)',
            lineHeight: 0.96,
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            margin: '0 0 28px',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <span ref={line1Ref} style={{ display: 'block' }}>
              Luxury
            </span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span
              ref={line2Ref}
              style={{
                display: 'block',
                fontStyle: 'italic',
                color: 'var(--gold-light)',
              }}
            >
              on the water,
            </span>
          </div>
          <div
            style={{
              overflow: 'hidden',
              paddingBottom: '0.12em',
              marginBottom: '-0.12em',
            }}
          >
            <span ref={line3Ref} style={{ display: 'block' }}>
              unforgettable.
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.82)',
            maxWidth: 500,
            lineHeight: 1.75,
            margin: '0 0 32px',
          }}
        >
          Yacht Hire, Luxury Sunset and Whale Watching Cruises Gold Coast
        </p>

        {/* Reviews badge with the search bar beside it (same height) */}
        <div ref={bottomRowRef} className="hero-bottom-row">
          <div
            className="hero-stats-badge hidden md:flex"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(10,22,40,0.65)',
              backdropFilter: 'blur(8px)',
              padding: '0 24px',
              alignItems: 'center',
              gap: 18,
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 500,
                // lining figures: the default old-style ones sit low in the box
                fontFeatureSettings: '"lnum" 1',
                lineHeight: 1,
                color: '#F5F0E8',
              }}
            >
              3,910+
            </div>
            <div
              aria-hidden="true"
              style={{ width: 1, alignSelf: 'stretch', margin: '12px 0', background: 'rgba(201,168,76,0.35)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div
                style={{
                  color: 'var(--gold)',
                  fontSize: 11,
                  letterSpacing: 3,
                  lineHeight: 1,
                }}
              >
                ★★★★★
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.6)',
                  lineHeight: 1,
                }}
              >
                5-Star Reviews
              </div>
            </div>
          </div>

          <div className="hero-search-wrap">
            <HeroSearch />
          </div>
        </div>
      </div>

      {/* Info bar — pinned to bottom */}
      <div className="hero-infobar">
        <div className="hero-infobar-cell">
          <div className="hero-infobar-label">Today&apos;s Sunset</div>
          <div className="hero-infobar-value">
            {infobar.sunset} <em>· gold</em>
          </div>
        </div>
        <div className="hero-infobar-cell">
          <div className="hero-infobar-label">Sea State</div>
          <div className="hero-infobar-value">
            {(() => { const [a, b] = splitVal(infobar.seaState); return <>{a}{b && <em>{b}</em>}</>; })()}
          </div>
        </div>
        <div className="hero-infobar-cell">
          <div className="hero-infobar-label">Next Whale</div>
          <div className="hero-infobar-value">
            {(() => { const [a, b] = splitVal(infobar.nextWhale); return <>{a}{b && <em>{b}</em>}</>; })()}
          </div>
        </div>
        <div className="hero-infobar-cell status">
          <div className="hero-infobar-label">Availability</div>
          <div className="hero-infobar-value">{infobar.availability}</div>
        </div>
      </div>

    </section>
  );
}
