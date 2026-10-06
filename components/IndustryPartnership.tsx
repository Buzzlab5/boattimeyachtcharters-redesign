'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './Nav';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function IconGlobe({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────

function Field({
  label, id, type = 'text', placeholder, value, onChange, required, prefix,
}: {
  label: string; id: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean; prefix?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label htmlFor={id} style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
        {label}{required && <span style={{ marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span style={{ position: 'absolute', left: 14, color: 'rgba(245,240,232,0.3)', fontSize: 12, fontFamily: 'var(--font-body)', pointerEvents: 'none' }}>
            {prefix}
          </span>
        )}
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} required={required}
          style={{ width: '100%', padding: prefix ? '14px 16px 14px 36px' : '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.18)', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', borderRadius: 0 }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'; }}
        />
      </div>
    </div>
  );
}

// ── Contact form (company only) ────────────────────────────────────────────────

const EMPTY = { companyName: '', companyWebsite: '', email: '', phone: '', address: '', message: '' };

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (key: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [key]: v }));

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!consent) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'company', companyName: form.companyName, companyWebsite: form.companyWebsite, companyEmail: form.email, companyPhone: form.phone, companyAddress: form.address, message: form.message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Unknown error');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '64px 32px' }}>
        <div style={{ width: 56, height: 56, border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: 14 }}>MESSAGE RECEIVED</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 14 }}>
          Thank you for <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>reaching out.</em>
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 380, margin: '0 auto' }}>
          We&rsquo;ll be in touch within 2–3 business days to explore what&rsquo;s possible together.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Company Name" id="companyName" placeholder="Your company name" value={form.companyName} onChange={set('companyName')} required />
        </div>
        <Field label="Website" id="companyWebsite" type="url" placeholder="https://yourcompany.com" value={form.companyWebsite} onChange={set('companyWebsite')} prefix={<IconGlobe />} />
        <Field label="Email Address" id="email" type="email" placeholder="hello@company.com" value={form.email} onChange={set('email')} required />
        <Field label="Phone Number" id="phone" type="tel" placeholder="+61 4XX XXX XXX" value={form.phone} onChange={set('phone')} required />
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Address" id="address" placeholder="Street, Suburb, State, Postcode" value={form.address} onChange={set('address')} required />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label htmlFor="message" style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
              What are you thinking?
            </label>
            <textarea
              id="message" rows={4}
              placeholder="Tell us about your business and what kind of partnership you have in mind…"
              value={form.message} onChange={(e) => set('message')(e.target.value)}
              style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.18)', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', resize: 'vertical', borderRadius: 0, lineHeight: 1.7 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'; }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <button type="button" onClick={() => setConsent((p) => !p)} aria-pressed={consent}
          style={{ flexShrink: 0, width: 18, height: 18, border: `1px solid ${consent ? 'var(--gold)' : 'rgba(201,168,76,0.28)'}`, background: consent ? 'var(--gold)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, transition: 'all 0.2s', borderRadius: 0 }}>
          {consent && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="#0A1628" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </button>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(245,240,232,0.45)', lineHeight: 1.7 }}>
          I consent to Boattime Yacht Charters collecting my information to process this enquiry. My details won&rsquo;t be shared without permission.<span style={{ color: 'var(--gold)', marginLeft: 3 }}>*</span>
        </p>
      </div>

      {status === 'error' && (
        <p style={{ marginTop: 14, fontFamily: 'var(--font-body)', fontSize: 13, color: '#e06c75' }}>
          Something went wrong — please try again or email us directly.
        </p>
      )}

      <div style={{ marginTop: 32 }}>
        <button type="submit" disabled={!consent || status === 'loading'} className="btn btn-primary"
          style={{ opacity: (!consent || status === 'loading') ? 0.45 : 1, cursor: (!consent || status === 'loading') ? 'not-allowed' : 'pointer' }}>
          {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
        </button>
      </div>
    </form>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function IndustryPartnership() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(bgRef.current, { scale: 1.08 }, { scale: 1, duration: 14, ease: 'none' });
    gsap.from(textRef.current!.querySelectorAll('.hr'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out', delay: 0.15 });
    gsap.to(bgRef.current, { yPercent: 16, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
  }, { scope: heroRef });

  const STEPS = [
    { n: '01', body: 'Partner provides discounted accommodation, experiences, or services.' },
    { n: '02', body: 'We match the opportunity with relevant creators in our network.' },
    { n: '03', body: 'Creators produce high-quality content around the experience.' },
    { n: '04', body: 'Both brands cross-promote to each other\'s audiences.' },
  ];

  const BENEFITS = [
    'Professional content creation at no extra cost',
    'Exposure to engaged travel & lifestyle audiences',
    'Cross-promotion across social channels',
    'Increased brand awareness on the Gold Coast',
    'Long-term marketing partnerships',
  ];

  const OPPORTUNITIES = [
    { label: 'Hotels', icon: '🏨' },
    { label: 'Resorts', icon: '🌴' },
    { label: 'Tour Operators', icon: '🧭' },
    { label: 'Restaurants', icon: '🍽️' },
    { label: 'Tourism Experiences', icon: '✨' },
  ];

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden on-photo"
          style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <div ref={bgRef} className="absolute inset-0 will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/twilight-drift.jpeg" alt="" aria-hidden="true"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
          </div>
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, rgba(10,22,40,0.5) 0%, rgba(10,22,40,0.85) 70%), linear-gradient(to top, rgba(10,22,40,1) 0%, rgba(10,22,40,0) 40%)' }} />

          <div ref={textRef} className="relative z-10 w-full"
            style={{ padding: '160px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="hr section-eyebrow" style={{ marginBottom: 22, justifyContent: 'center' }}>
              BOATTIME YACHT CHARTERS · GOLD COAST
            </div>
            <h1 className="hr"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(44px, 6.5vw, 92px)', lineHeight: 0.97, letterSpacing: '-0.025em', color: 'var(--cream)', marginBottom: 26, maxWidth: 800 }}>
              Partner With{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-light)', display: 'block' }}>Boattime Yacht Charters.</em>
            </h1>
            <p className="hr"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.7vw, 17px)', color: 'rgba(245,240,232,0.72)', lineHeight: 1.8, fontWeight: 300, maxWidth: 440, marginBottom: 38 }}>
              Access our creator network and collaborate on mutually beneficial marketing campaigns.
            </p>
            <div className="hr">
              <a href="#contact" className="btn btn-primary">Become a Partner</a>
            </div>
          </div>

          <div className="hero-infobar" style={{ width: '100%' }}>
            {[
              { label: 'Based in', value: 'Gold Coast' },
              { label: 'Fleet', value: '2 Vessels' },
              { label: 'Rating', value: '5.0 Stars', em: '2,000+ reviews' },
              { label: 'Open to', value: 'Industry Partners' },
            ].map((c) => (
              <div key={c.label} className="hero-infobar-cell">
                <div className="hero-infobar-label">{c.label}</div>
                <div className="hero-infobar-value">{c.value}{c.em && <em> · {c.em}</em>}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section style={{ background: 'var(--navy)', padding: '96px 80px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: 18 }}>THE PROCESS</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--cream)' }}>
                How it{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>works.</em>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.14)' }}>
              {STEPS.map((s) => (
                <div key={s.n} style={{ background: 'var(--navy)', padding: '40px 32px 44px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 48, color: 'rgba(201,168,76,0.25)', lineHeight: 1, marginBottom: 20 }}>
                    {s.n}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(245,240,232,0.72)', lineHeight: 1.8, fontWeight: 300 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section style={{ background: 'var(--navy-mid)', padding: '96px 80px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: 18 }}>WHAT YOU GET</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--cream)' }}>
                Partnership{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>benefits.</em>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid rgba(201,168,76,0.14)' }}>
              {BENEFITS.map((b, i) => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px 32px', background: i % 2 === 0 ? 'var(--navy)' : 'rgba(255,255,255,0.02)', borderBottom: i < BENEFITS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="9" cy="9" r="8.5" stroke="rgba(201,168,76,0.3)" />
                    <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'rgba(245,240,232,0.8)', lineHeight: 1.5 }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Opportunities ── */}
        <section style={{ background: 'var(--navy)', padding: '96px 80px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: 18 }}>WHO WE WORK WITH</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--cream)' }}>
                Current partnership{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>opportunities.</em>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.14)' }}>
              {OPPORTUNITIES.map((o) => (
                <div key={o.label} style={{ background: 'var(--navy)', padding: '44px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 16, lineHeight: 1 }}>{o.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20, color: 'var(--cream)', letterSpacing: '-0.01em' }}>
                    {o.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <a href="#contact" className="btn btn-primary">Become a Partner</a>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          style={{ background: 'var(--navy-mid)', borderTop: '1px solid rgba(201,168,76,0.08)', padding: '96px 80px 120px' }}
        >
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: 18 }}>GET IN TOUCH</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 50px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--cream)', marginBottom: 14 }}>
                Let&rsquo;s{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>talk.</em>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(245,240,232,0.5)', lineHeight: 1.75, maxWidth: 400, margin: '0 auto', fontWeight: 300 }}>
                Drop us a message and we&rsquo;ll be in touch within 2–3 business days.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
