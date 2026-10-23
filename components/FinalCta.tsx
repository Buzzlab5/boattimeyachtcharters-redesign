'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Shared';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(sectionRef.current!.querySelectorAll('.final-reveal'), {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });

      gsap.from(sectionRef.current!.querySelectorAll('.contact-item'), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="book" className="final-cta">
      <div className="final-cta-bg" />

      <div className="final-cta-inner">
        <div className="section-eyebrow final-eyebrow final-reveal">Reservations Open</div>

        <h2 className="final-headline final-reveal">
          Your next <em>great</em> night<br />
          begins at the marina.
        </h2>

        <p className="final-sub final-reveal">
          Tell us the occasion and the date. We&apos;ll return with exactly what&apos;s
          possible, what it costs, and how good it will be — usually within a day.
        </p>

        <div className="final-actions final-reveal">
          <Button variant="primary" href="/#inquiry">
            Begin an Enquiry
          </Button>
          <Button
            variant="ghost"
            href="https://boattimeyachtcharters.rezdy.com/700304/luxury-sunset-cruise"
          >
            Reserve a Public Cruise
          </Button>
        </div>

        <div className="final-contact-row">
          <div className="contact-item">
            <div className="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.28 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.18 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="contact-label">Direct</div>
            <a href="tel:+61477667644" className="contact-value">+61 477 667 644</a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="contact-label">Email</div>
            <a href="mailto:info@boattimeyachtcharters.com.au" className="contact-value">info@boattimeyachtcharters.com.au</a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="contact-label">Berth</div>
            <div className="contact-value">Marine Stadium Jetty & Pontoon, Main Beach</div>
          </div>
        </div>
      </div>
    </section>
  );
}
