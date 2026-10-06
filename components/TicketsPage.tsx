'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Nav from './Nav';
import Footer from './Footer';

gsap.registerPlugin(useGSAP);

function GoldRope() {
  return (
    <div
      style={{
        height: 2,
        background:
          'repeating-linear-gradient(90deg, var(--gold) 0px, var(--gold) 8px, transparent 8px, transparent 14px)',
        opacity: 0.5,
      }}
    />
  );
}

export default function TicketsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from(titleRef.current, { y: 24, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .from(subRef.current, { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    },
    { scope: heroRef },
  );

  useEffect(() => {
    const existing = document.querySelector('script[src*="rezdy.com/pluginJs"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://boattimeyachtcharters.rezdy.com/pluginJs';
      s.defer = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <>
      <Nav />

      <main>
      {/* Hero */}
      <section
        ref={heroRef}
        style={{
          background: 'var(--navy)',
          paddingTop: 140,
          paddingBottom: 80,
          paddingLeft: 48,
          paddingRight: 48,
          borderBottom: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div
            ref={eyebrowRef}
            className="section-eyebrow"
            style={{ marginBottom: 24, justifyContent: 'center' }}
          >
            Boattime Yacht Charters — Gold Coast &amp; Brisbane
          </div>

          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(40px, 5vw, 80px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              margin: '0 0 24px',
            }}
          >
            Book Your{' '}
            <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>
              Experience
            </em>
          </h1>

          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              fontWeight: 300,
              color: 'rgba(245,240,232,0.7)',
              lineHeight: 1.8,
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            Select from our full range of cruises, whale watching tours, and
            private charter experiences — all bookable instantly online.
          </p>
        </div>
      </section>

      <GoldRope />

      {/* Rezdy catalog */}
      <section
        style={{
          background: 'var(--navy)',
          padding: '64px 0 80px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <iframe
            seamless
            width="100%"
            height="1200px"
            frameBorder={0}
            className="rezdy"
            src="https://boattimeyachtcharters.rezdy.com/catalog/312834/tours?iframe=true"
            style={{ display: 'block' }}
          />
        </div>
      </section>

      <GoldRope />
      </main>

      <Footer />
    </>
  );
}
