'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { EXPERIENCE_PRODUCTS as EXPERIENCE_ITEMS, CHARTER_PRODUCTS as CHARTER_ITEMS } from '@/lib/products';

function handleHashNav(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('/#')) return;
  const hash = href.slice(1);
  if (window.location.pathname === '/') {
    e.preventDefault();
    const el = document.querySelector(hash);
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

export default function Nav() {
  const { theme, toggle } = useTheme();
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
          <a href="/#fleet" className="site-header__nav-link" onClick={(e) => handleHashNav(e, '/#fleet')}>
            Fleet
          </a>
          <a href="/#whale" className="site-header__nav-link" onClick={(e) => handleHashNav(e, '/#whale')}>
            Whale
          </a>

          {/* Experiences dropdown */}
          <div
            className="site-header__nav-dropdown"
            onMouseEnter={() => openDD('experiences')}
            onMouseLeave={closeDD}
          >
            <a
              href="/#experiences"
              className={`site-header__nav-link site-header__nav-link--dd${activeDropdown === 'experiences' ? ' site-header__nav-link--dd-open' : ''}`}
              onClick={(e) => handleHashNav(e, '/#experiences')}
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
              href="/#horizons"
              className={`site-header__nav-link site-header__nav-link--dd${activeDropdown === 'charter' ? ' site-header__nav-link--dd-open' : ''}`}
              onClick={(e) => handleHashNav(e, '/#horizons')}
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

          <a href="/#faq" className="site-header__nav-link" onClick={(e) => handleHashNav(e, '/#faq')}>
            FAQ
          </a>
          <a href="/boattime-news" className="site-header__nav-link">
            Blogs
          </a>
        </nav>

        {/* Right side */}
        <div className="site-header__right">
          <button
            onClick={toggle}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

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
          <li style={{ '--i': 0 } as React.CSSProperties}>
            <a href="/#fleet" data-num="01" onClick={(e) => { handleHashNav(e, '/#fleet'); setMobileOpen(false); }}>
              <span><em>Fleet</em></span>
            </a>
          </li>

          <li style={{ '--i': 1 } as React.CSSProperties}>
            <a href="/#whale" data-num="02" onClick={(e) => { handleHashNav(e, '/#whale'); setMobileOpen(false); }}>
              <span><em>Whale</em></span>
            </a>
          </li>

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
            <a href="/boattime-news" data-num="05" onClick={() => setMobileOpen(false)}>
              <span><em>Blogs</em></span>
            </a>
          </li>
          <li style={{ '--i': 5 } as React.CSSProperties}>
            <a href="/#faq" data-num="06" onClick={(e) => { handleHashNav(e, '/#faq'); setMobileOpen(false); }}>
              <span><em>FAQ</em></span>
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
