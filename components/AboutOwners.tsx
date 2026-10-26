'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Shared';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Drop team-photo.jpg into /public/ to activate
const TEAM_PHOTO = '/team-photo.webp';

export default function AboutOwners() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(imgRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      gsap.from(textRef.current!.children, {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.11,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="ao-section">
      <div className="ao-inner">
        {/* ── Photo column ── */}
        <div ref={imgRef} className="ao-img-wrap">
          <img
            src={TEAM_PHOTO}
            alt="The Boattime team on board Sun Goddess"
            className="ao-img"
          />
          {/* Gold corner brackets */}
          <span className="ao-corner ao-corner--tl" />
          <span className="ao-corner ao-corner--tr" />
          <span className="ao-corner ao-corner--bl" />
          <span className="ao-corner ao-corner--br" />
          {/* Caption overlay */}
          <div className="ao-img-caption">The Boattime Family · Gold Coast</div>
        </div>

        {/* ── Copy column ── */}
        <div ref={textRef} className="ao-content">
          <div className="section-eyebrow">About BoatTime</div>

          <h2 className="ao-headline">
            Where luxury meets <em>affordability.</em>
          </h2>

          <p className="ao-body">
            Our fleet includes two impressive yachts,
            Sun Goddess and the Mermaid Spirit, which are available for yacht
            hire and event boat hire for any occasion.
          </p>

          <p className="ao-body">
            We offer our customers the perfect combination of luxury, space and
            affordability. Our yachts are equipped with the latest amenities and
            technologies to ensure that your experience is nothing short of
            exceptional. We are committed to
            providing our customers with an unforgettable experience, no matter
            the occasion.
          </p>

          <p className="ao-body">
            Make your next event unforgettable with Boattime Yacht Charters.
            Secure your booking today and let us craft an extraordinary
            experience that will create memories to last a lifetime.
          </p>

          {/* Stat strip */}
          <div className="ao-stats">
            <div className="ao-stat">
              <span className="ao-stat-num">
                3,910<em>+</em>
              </span>
              <span className="ao-stat-label">5-star reviews</span>
            </div>
            <div className="ao-stat-divider" />
            <div className="ao-stat">
              <span className="ao-stat-num">
                12<em>+</em>
              </span>
              <span className="ao-stat-label">seasons operating</span>
            </div>
            <div className="ao-stat-divider" />
            <div className="ao-stat">
              <span className="ao-stat-num">150</span>
              <span className="ao-stat-label">guests capacity</span>
            </div>
          </div>

          <div className="ao-cta">
            <Button variant="primary" href="/#inquiry">
              Booking Enquiry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
