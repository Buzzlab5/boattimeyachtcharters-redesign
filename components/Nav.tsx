'use client';

import { useState, useEffect, useRef } from 'react';
import { EXPERIENCE_PRODUCTS as EXPERIENCE_ITEMS, CHARTER_PRODUCTS as CHARTER_ITEMS } from '@/lib/products';

function handleHashNav(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('/#')) return;
  const hash = href.slice(1);
  const local = document.querySelector(hash);
  if (local) {
    e.preventDefault();
    const el = local;
    if (!el) return;
    const navH = (document.querySelector('.site-header') as HTMLElement)?.offsetHeight ?? 90;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  } else {
    e.preventDefault();
    sessionStorage.setItem('scrollTo', hash);
    window.location.href = '/';
  }
}

// The site navbar. The old section links (Fleet, Whale, FAQ) are gone on purpose: they
// pointed at homepage sections. The two dropdown labels open their menu instead
// of jumping to a section.
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function openDD(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  }

  function closeDD() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }

  // Props for the "Experiences" / "Yacht Charter" labels: they only open their dropdown.
  function ddLabelProps(key: string) {
    return {
      role: 'button' as const,
      tabIndex: 0,
      style: { cursor: 'pointer' },
      onClick: () => openDD(key),
      onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDD(key);
        }
      },
    };
  }

  return (
    <>
      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
        {/* Logo */}
        <a href="/" className="site-header__logo">
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

        {/* Desktop nav */}
        <nav className="site-header__nav">
          

          {/* Experiences dropdown */}
          <div
            className="site-header__nav-dropdown"
            onMouseEnter={() => openDD('experiences')}
            onMouseLeave={closeDD}
          >
            <a
              className={`site-header__nav-link site-header__nav-link--dd${activeDropdown === 'experiences' ? ' site-header__nav-link--dd-open' : ''}`}
              {...ddLabelProps('experiences')}
            >
              Experiences
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true" className="nav-dd-chevron">
                <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div
              className={`site-header__dropdown site-header__dropdown--wide${activeDropdown === 'experiences' ? ' site-header__dropdown--open' : ''}`}
              onMouseEnter={() => openDD('experiences')}
              onMouseLeave={closeDD}
            >
              <div className="site-header__dropdown-grid">
                {EXPERIENCE_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} className="site-header__dropdown-item">
                    <span className="site-header__dropdown-label">{item.label}</span>
                    <span className="site-header__dropdown-sub">{item.sub}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Yacht Charter dropdown */}
          <div
            className="site-header__nav-dropdown"
            onMouseEnter={() => openDD('charter')}
            onMouseLeave={closeDD}
          >
            <a
              className={`site-header__nav-link site-header__nav-link--dd${activeDropdown === 'charter' ? ' site-header__nav-link--dd-open' : ''}`}
              {...ddLabelProps('charter')}
            >
              Yacht Charter
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true" className="nav-dd-chevron">
                <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div
              className={`site-header__dropdown${activeDropdown === 'charter' ? ' site-header__dropdown--open' : ''}`}
              onMouseEnter={() => openDD('charter')}
              onMouseLeave={closeDD}
            >
              {CHARTER_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="site-header__dropdown-item">
                  <span className="site-header__dropdown-label">{item.label}</span>
                  <span className="site-header__dropdown-sub">{item.sub}</span>
                </a>
              ))}
            </div>
          </div>

          
          <a href="/boattime-news" className="site-header__nav-link">
            Blogs
          </a>
        </nav>

        {/* Right side */}
        <div className="site-header__right">
          <a href="/tickets" className="site-header__tickets">
            <span>Tickets</span>
          </a>

          <button
            className={`site-header__menu-btn${mobileOpen ? ' site-header__menu-btn--active' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="site-header__menu-line" />
            <span className="site-header__menu-line" />
          </button>
        </div>
      </header>

      {/* Full-screen mobile drawer */}
      <div
        className={`mobile-drawer${mobileOpen ? ' mobile-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="mobile-drawer__nav">
          

          {/* Experiences accordion */}
          <li style={{ '--i': 2 } as React.CSSProperties} className="mobile-drawer__nav-section">
            <button
              className="mobile-drawer__nav-trigger"
              onClick={() => setMobileExpanded(s => s === 'experiences' ? null : 'experiences')}
              aria-expanded={mobileExpanded === 'experiences'}
            >
              <span><em>Experiences</em></span>
              <svg
                width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                className={`mobile-drawer__nav-chevron${mobileExpanded === 'experiences' ? ' mobile-drawer__nav-chevron--open' : ''}`}
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul className={`mobile-drawer__nav-sub${mobileExpanded === 'experiences' ? ' mobile-drawer__nav-sub--open' : ''}`}>
              {EXPERIENCE_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="mobile-drawer__nav-sub-link" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* Yacht Charter accordion */}
          <li style={{ '--i': 3 } as React.CSSProperties} className="mobile-drawer__nav-section">
            <button
              className="mobile-drawer__nav-trigger"
              onClick={() => setMobileExpanded(s => s === 'charter' ? null : 'charter')}
              aria-expanded={mobileExpanded === 'charter'}
            >
              <span><em>Yacht Charter</em></span>
              <svg
                width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                className={`mobile-drawer__nav-chevron${mobileExpanded === 'charter' ? ' mobile-drawer__nav-chevron--open' : ''}`}
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul className={`mobile-drawer__nav-sub${mobileExpanded === 'charter' ? ' mobile-drawer__nav-sub--open' : ''}`}>
              {CHARTER_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="mobile-drawer__nav-sub-link" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li style={{ '--i': 4 } as React.CSSProperties}>
            <a href="/boattime-news" onClick={() => setMobileOpen(false)}>
              <span><em>Blogs</em></span>
            </a>
          </li>
          
        </ul>

        <div className="mobile-drawer__footer">
          <div className="mobile-drawer__footer-info">
            <div className="mobile-drawer__footer-block">
              <span className="mobile-drawer__footer-label">Direct</span>
              <a href="tel:+61477667644" className="mobile-drawer__footer-value">
                +61 477 667 644
              </a>
            </div>
            <div className="mobile-drawer__footer-block">
              <span className="mobile-drawer__footer-label">Berth</span>
              <span className="mobile-drawer__footer-value">Marine Stadium Jetty & Pontoon · Main Beach, Gold Coast</span>
            </div>
          </div>
          <div className="mobile-drawer__footer-ctas">
            <a href="/#inquiry" className="mobile-drawer__cta" onClick={(e) => { handleHashNav(e, '/#inquiry'); setMobileOpen(false); }}>
              Reserve a Cruise →
            </a>
            <a
              href="/#inquiry"
              className="mobile-drawer__cta mobile-drawer__cta--secondary"
              onClick={(e) => { handleHashNav(e, '/#inquiry'); setMobileOpen(false); }}
            >
              Custom Enquiry →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
