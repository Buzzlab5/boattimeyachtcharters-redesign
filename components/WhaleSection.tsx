'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Shared';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WhaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(leftRef.current!.children, {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from(sectionRef.current!.querySelectorAll('.whale-floating-stat'), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="whale" className="whale-feature">
      <div className="whale-bg" />

      <div className="whale-content">
        {/* Left column */}
        <div ref={leftRef} className="whale-left">
          <div className="whale-tag">
            <span className="whale-tag-dot" />
            <span>Season Opens · 30 May 2026</span>
          </div>

          <h2 className="whale-headline">
            Humpbacks,
            <br />
            <em>at close range.</em>
          </h2>

          <p className="whale-desc">
            Every year from May to November, fifty thousand humpback whales
            migrate up the Australian East Coast — straight past the Gold Coast.
            Sun Goddess takes you out to meet them. Warm galley, hot coffee,
            marine biologist commentary, and the{' '}
            <em>stability of a 34-metre superyacht</em> that makes
            everyone&apos;s photos come out sharp.
          </p>

          <div className="whale-facts">
            <div className="whale-fact">
              <div className="whale-fact-num">
                100<em>%</em>
              </div>
              <div className="whale-fact-label">
                Sighting Guarantee
                <br />
                or you return free
              </div>
            </div>
            <div className="whale-fact">
              <div className="whale-fact-num">
                2.5<em>h</em>
              </div>
              <div className="whale-fact-label">
                Tour Duration
                <br />
                rotating viewing decks
              </div>
            </div>
            <div className="whale-fact">
              <div className="whale-fact-num">
                May<em>—Nov</em>
              </div>
              <div className="whale-fact-label">
                Migration Season
                <br />
                peak July to September
              </div>
            </div>
          </div>

          <div className="whale-cta-row">
            <Button
              variant="primary"
              href="/cruise-tickets-luxury-whale-watching"
            >
              Book Whale Watching
            </Button>
            <span className="whale-price">from $79.50 / adult</span>
          </div>
        </div>

        {/* Right — circular image */}
        <div ref={rightRef} className="whale-right">
          <div className="whale-circle-ring-2" />
          <div className="whale-circle-ring" />
          <div className="whale-circle">
            <img
              src="/humpback-circle.jpg"
              alt="Humpback whale breach from Sun Goddess"
              loading="lazy"
            />
          </div>

          <div className="whale-floating-stat whale-floating-stat-1">
            <div className="whale-floating-label">Species Spotted</div>
            <div className="whale-floating-value">
              Humpback · Dolphin · Turtle · Dugong
            </div>
          </div>

          <div className="whale-floating-stat whale-floating-stat-2">
            <div className="whale-floating-label">Daily Sessions</div>
            <div className="whale-floating-value">Morning · 9:00 AM</div>
            <div className="whale-floating-value">Afternoon · 12:00 PM</div>
          </div>
        </div>
      </div>
    </section>
  );
}
