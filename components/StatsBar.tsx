'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  {
    end: 3910,
    suffix: '+',
    unit: false,
    decimals: 0,
    comma: true,
    label: 'Verified reviews',
    note: 'Across Google, Facebook & Tripadvisor — more than any other GC operator.',
  },
  {
    end: 4.7,
    suffix: '★',
    unit: false,
    decimals: 1,
    comma: false,
    label: 'Average rating',
    note: 'Near-flawless, weighted across a four-year rolling window.',
  },
  {
    end: 114,
    suffix: 'ft',
    unit: true,
    decimals: 0,
    comma: false,
    label: 'Flagship',
    note: 'Sun Goddess, our flagship.',
  },
  {
    end: 12,
    suffix: '+',
    unit: false,
    decimals: 0,
    comma: false,
    label: 'Seasons operating',
    note: 'Family-run, locally crewed, obsessive about the Broadwater.',
  },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelectorAll('.stat-item'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      STATS.forEach((s, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: s.end,
          duration: 2.2,
          ease: 'power4.out',
          delay: i * 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true,
          },
          onUpdate() {
            const v = Math.min(s.end, Math.max(0, obj.val));
            el.textContent =
              s.decimals > 0
                ? v.toFixed(s.decimals)
                : s.comma
                  ? Math.round(v).toLocaleString()
                  : String(Math.round(v));
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--navy)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Top row: headline + body */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '96px 48px 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'flex-start',
        }}
        className="philosophy-header"
      >
        <div>
          <div className="section-eyebrow">Philosophy</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 4.5vw, 72px)',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.0,
            }}
          >
            Luxury,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
              uncomplicated.
            </em>
          </h2>

          {/* Key facts below heading */}
          <div
            style={{
              marginTop: 36,
              paddingTop: 28,
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {[
              "Gold Coast's most-reviewed superyacht operator",
              'Two vessels — up to 135 guests',
              'Est. 2014 · Family owned & operated',
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 1,
                    background: 'var(--gold)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--text-muted)',
              lineHeight: 1.85,
              maxWidth: 480,
            }}
          >
            Boattime is a family-run superyacht charter company: two boats on
            the Broadwater, the warmest crew on the water, and guests who return
            year after year.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--text-muted)',
              lineHeight: 1.85,
              maxWidth: 480,
              marginTop: 20,
            }}
          >
            We don&apos;t chase numbers. We chase moments — the kind that make
            your guests call us first next time they have something worth
            celebrating.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.55)',
              marginTop: 28,
            }}
          >
            &ldquo;Leave with a memory worth telling.&rdquo;
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: 10,
              fontWeight: 500,
            }}
          >
            — The Boattime family, est. Gold Coast
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px 48px 96px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 64,
        }}
        className="stats-grid"
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className="stat-item"
            style={{
              padding: '40px 0 0',
              borderRight: i < 3 ? '1px solid var(--border-subtle)' : 'none',
              paddingLeft: i === 0 ? 0 : 40,
              paddingRight: i === 3 ? 0 : 40,
            }}
          >
            {/* Label — top */}
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 500,
                marginBottom: 18,
              }}
            >
              {s.label}
            </div>

            {/* Number + styled suffix */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 4,
                marginBottom: 20,
              }}
            >
              <span
                ref={(el) => {
                  numRefs.current[i] = el;
                }}
                className="stat-num"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(80px, 9vw, 140px)',
                  fontWeight: 300,
                  color: 'var(--cream)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                0
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize:
                    s.suffix === '★'
                      ? 'clamp(44px, 5vw, 78px)'
                      : 'clamp(36px, 3.8vw, 60px)',
                  fontStyle: s.unit ? 'italic' : 'normal',
                  fontWeight: 300,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.suffix}
              </span>
            </div>

            {/* Note — bottom */}
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: 220,
              }}
            >
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
