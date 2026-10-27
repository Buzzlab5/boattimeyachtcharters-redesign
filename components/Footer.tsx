'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DINING_CRUISES_AVAILABLE } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function FootLink({
  children,
  href = '#',
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--text-muted)',
        textDecoration: 'none',
        padding: '7px 0',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
    >
      {children}
    </a>
  );
}

function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 9,
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        fontWeight: 500,
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

export default function Footer() {
  const footRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(footRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footRef.current,
          start: 'top 92%',
          once: true,
        },
      });
    },
    { scope: footRef },
  );

  return (
    <footer
      ref={footRef}
      className="footer-section"
      style={{
        padding: '80px 48px 80px',
        background: 'var(--navy)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top grid */}
        <div
          className="grid footer-top-grid"
          style={{
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 56,
            marginBottom: 64,
            paddingBottom: 52,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Brand */}
          <div>
            <a
              href="/"
              className="site-header__logo"
              style={{ marginBottom: 20 }}
            >
              <img
                src="/boattime-logo.png"
                alt="Boattime Yacht Charters"
                className="site-header__logo-img"
              />
              <div className="site-header__logo-text">
                <strong>Boattime</strong>
                <em>Yacht Charters</em>
              </div>
            </a>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                maxWidth: 300,
                marginBottom: 28,
              }}
            >
              Superyacht charters on the Gold Coast and Brisbane. Two vessels,
              one unhurried coastline — since 2014.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/boattimeyachtcharters/"
                aria-label="Facebook"
                className="flex items-center justify-center"
                style={{
                  width: 38,
                  height: 38,
                  border: '1px solid rgba(201,168,76,0.28)',
                  color: 'var(--gold)',
                  transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.color = 'var(--navy)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)';
                  e.currentTarget.style.color = 'var(--gold)';
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/boattimeyachtcharters/"
                aria-label="Instagram"
                className="flex items-center justify-center"
                style={{
                  width: 38,
                  height: 38,
                  border: '1px solid rgba(201,168,76,0.28)',
                  color: 'var(--gold)',
                  transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.color = 'var(--navy)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)';
                  e.currentTarget.style.color = 'var(--gold)';
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Cruise Tickets */}
          <div>
            <ColHead>Cruise Tickets</ColHead>
            <FootLink href="/cruise-tickets-luxury-whale-watching">
              Luxury Whale Watching
            </FootLink>
            <FootLink href="/luxury-broadwater-cruise">
              Luxury Scenic Sunset Cruise
            </FootLink>
            <FootLink href="/nye-2027">New Year&rsquo;s Eve 2027</FootLink>
            <FootLink href="/valentines-day">Valentine&rsquo;s Cruise</FootLink>
            <FootLink href="/riverfire-2026">Riverfire 2026</FootLink>
            {DINING_CRUISES_AVAILABLE && (
              <>
                <FootLink href="/relaxed-lunch-cruise-flavours-of-australia-aboard-the-mermaid-spirit">
                  Relaxed Lunch
                </FootLink>
                <FootLink href="/sunset-twilight-buffet-flavours-of-australia-aboard-the-mermaid-spirit">
                  Twilight Buffet
                </FootLink>
              </>
            )}
          </div>

          {/* Charters + Yachts */}
          <div>
            <ColHead>Yacht Charters</ColHead>
            <FootLink href="/private-yacht-charter">Private Charter</FootLink>
            <FootLink href="/corporate-yacht-charter">
              Corporate Charter
            </FootLink>
            <FootLink href="/wedding-yacht-charter">Wedding Charter</FootLink>
            <FootLink href="/yacht-charter-menus">
              Catering &amp; Menus
            </FootLink>
            <div style={{ marginTop: 28 }}>
              <ColHead>Our Yachts</ColHead>
            </div>
            <FootLink href="/sun-goddess-gold-coast">Sun Goddess</FootLink>
            <FootLink href="/mermaid-spirit-gold-coast">Mermaid Spirit</FootLink>
          </div>

          {/* Contact */}
          <div>
            <ColHead>Contact</ColHead>
            <FootLink href="tel:+61477667644">+61 477 667 644</FootLink>
            <FootLink href="mailto:info@boattimeyachtcharters.com.au">
              info@boattimeyachtcharters.com.au
            </FootLink>
            <div style={{ marginTop: 28 }}>
              <ColHead>Company</ColHead>
            </div>
            <FootLink href="/about">About Boattime</FootLink>
            <FootLink href="/boattime-news">Boattime News</FootLink>
            <FootLink href="#inquiry">Booking Enquiry</FootLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center footer-bottom-bar"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <div>© 2026 Boattime Yacht Charters · All rights reserved</div>
          <div className="flex gap-8">
            <FootLink>Privacy</FootLink>
            <FootLink>Terms</FootLink>
            <FootLink>Cookies</FootLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
