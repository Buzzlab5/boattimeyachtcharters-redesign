'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './Nav';
import Footer from './Footer';
import { CruiseHero, CruiseBookingCTA } from './CruiseSections';
import { Eyebrow, ItalicEm, Button } from './Shared';
import {
  VesselGallery,
  VesselSpecTable,
  VesselFaq,
  VesselCrossLinks,
} from './YachtSections';
import { MERMAID_SPIRIT as V } from '@/lib/vessels';
import { DINING_CRUISES_AVAILABLE } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 9,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  fontWeight: 600,
  marginBottom: 8,
};

const INQUIRY = '/#inquiry';

// ── Spec strip ────────────────────────────────────────────────────────────────

function SpecBar() {
  const SPECS = [
    { label: 'Length',    value: '100',       suffix: 'ft' },
    { label: 'Capacity',  value: '150',       suffix: 'guests' },
    { label: 'Decks',     value: '3',         suffix: 'levels' },
    { label: 'Status',    value: 'New',       suffix: 'refit' },
  ];
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.sp'), {
      y: 20, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
    });
  }, { scope: ref });

  return (
    <div ref={ref} style={{ background: 'var(--gold)' }}>
      <div
        className="grid stats-grid"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1200, margin: '0 auto' }}
      >
        {SPECS.map((s, i) => (
          <div
            key={i}
            className="sp"
            style={{
              padding: '44px 40px',
              borderRight: i < 3 ? '1px solid rgba(10,22,40,0.15)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0a1628', opacity: 0.9, fontWeight: 600 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(44px, 5vw, 64px)', color: '#0a1628', lineHeight: 1, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              {s.value}
              <span style={{ fontStyle: 'italic', fontSize: '0.45em', opacity: 0.9 }}>{s.suffix}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Vessel overview ───────────────────────────────────────────────────────────

function VesselOverview() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.rv'), {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 48px', background: 'var(--navy)' }}>
      <div
        className="cruise-overview-grid"
        style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
      >
        <div className="rv" style={{ position: 'relative' }}>
          <div style={{ aspectRatio: '4/5', backgroundImage: 'url(/mermaid-spirit-interior/mermaid1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(201,168,76,0.15)' }} />
          <div style={{ position: 'absolute', top: 24, left: -24, bottom: -24, right: 24, border: '1px solid rgba(201,168,76,0.1)', zIndex: -1, pointerEvents: 'none' }} />
        </div>
        <div>
          <div className="rv"><Eyebrow>The Vessel</Eyebrow></div>
          <h2 className="rv" style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, marginBottom: 32 }}>
            Three decks of <ItalicEm>pure possibility</ItalicEm>.
          </h2>
          {[
            'Mermaid Spirit is a 100-foot tri-deck catamaran — newly refitted, spectacularly appointed, and purpose-built for events that demand a backdrop worthy of the occasion.',
            'Three expansive decks give guests the freedom to move, mingle, dine, and dance. From intimate sunset dinners to Riverfire fireworks celebrations for 100, she handles everything with effortless elegance.',
          ].map((p, i) => (
            <p key={i} className="rv" style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300, color: 'rgba(245,240,232,0.78)', lineHeight: 1.85, marginBottom: 16 }}>
              {p}
            </p>
          ))}
          <div className="rv" style={{ marginTop: 32 }}>
            <Button variant="outline" href={INQUIRY}>Request a Charter</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Three decks ───────────────────────────────────────────────────────────────

const DECKS = [
  {
    number: '01',
    name: 'Main Deck',
    subtitle: 'The social heart of the vessel',
    description: 'The main deck is where it all happens — dual bars running port and starboard, the fully equipped catering galley, and a spacious lounge that converts from cocktail reception to seated dinner with ease. The aft swim platform puts you one step from the water.',
    image: '/mermaid-spirit-interior/mermaid2.jpg',
  },
  {
    number: '02',
    name: 'Upper Deck',
    subtitle: 'Dining, entertainment & panoramic views',
    description: 'The upper deck elevates the experience — literally. An open-air dining terrace overlooking the bow, premium sound system for DJ or live band, and unobstructed 180° views across the Broadwater. This is where dinner becomes a memory.',
    image: '/mermaid-spirit-interior/mermaid3.jpg',
  },
  {
    number: '03',
    name: 'Sky Deck',
    subtitle: 'Open air · sun lounges · 360° views',
    description: 'The sky deck is the jewel of the vessel — fully open to the sky with wrap-around views in every direction. Sun lounges, high-top bars, and a front-row seat for fireworks, sunsets, and whale watching. Completely unforgettable.',
    image: '/mermaid-spirit-interior/mermaid4.jpg',
  },
];

function ThreeDecks() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.dk'), {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Eyebrow>The Vessel · Three Decks</Eyebrow></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}>
            Three levels of <ItalicEm>uncompromised luxury</ItalicEm>.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {DECKS.map((deck, i) => (
            <div
              key={i}
              className="dk"
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: 0,
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              {/* Text panel — alternates side */}
              {i % 2 !== 0 && (
                <div
                  style={{
                    backgroundImage: `url(${deck.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: 340,
                  }}
                />
              )}
              <div style={{ padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 48, color: 'rgba(201,168,76,0.18)', lineHeight: 1, marginBottom: 12 }}>{deck.number}</div>
                <div style={{ ...GL, marginBottom: 10 }}>{deck.subtitle}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--cream)', lineHeight: 1.05, marginBottom: 20 }}>{deck.name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 300, color: 'rgba(245,240,232,0.7)', lineHeight: 1.8 }}>{deck.description}</p>
              </div>
              {/* Image panel */}
              {i % 2 === 0 && (
                <div
                  style={{
                    backgroundImage: `url(${deck.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: 340,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Destinations ──────────────────────────────────────────────────────────────

const DESTINATIONS = [
  { area: 'Gold Coast Broadwater', places: ['Wave Break Island', 'Sanctuary Cove', 'Jumpinpin Bar', 'Scottish Prince Wreck'] },
  { area: 'Brisbane River',        places: ['New Farm Riverfire', 'South Bank', 'Story Bridge', 'Brisbane CBD'] },
  { area: 'Extended Range',        places: ['Tangalooma, Moreton Island', 'Stradbroke Island', 'Calypso Bay', 'Couran Cove'] },
];

function Destinations() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.ds'), {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 48px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="cruise-overview-grid">
          <div>
            <Eyebrow>Operating Areas</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.05, marginBottom: 16 }}>
              Gold Coast to <ItalicEm>Moreton Bay</ItalicEm>.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8, marginBottom: 40 }}>
              Mermaid Spirit operates across South East Queensland&rsquo;s finest waterways — from the sheltered Broadwater to the open waters of Moreton Bay and the Brisbane River.
            </p>
            <Button variant="outline" href={INQUIRY}>Plan Your Route</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {DESTINATIONS.map((d, i) => (
              <div key={i} className="ds">
                <div style={{ ...GL, marginBottom: 14 }}>{d.area}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {d.places.map((p) => (
                    <div key={p} style={{ padding: '6px 14px', border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(245,240,232,0.65)', letterSpacing: '0.06em' }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Adventure activities ──────────────────────────────────────────────────────

const ACTIVITIES = [
  { label: 'Jet Skis',          detail: 'High-performance jet skis for guests wanting an adrenaline surge from the swim platform.' },
  { label: 'Scuba Diving',      detail: 'Full scuba gear available for certified divers exploring reefs and the Scottish Prince Wreck.' },
  { label: 'Kayaks & SUPs',     detail: 'Paddleboards and kayaks for relaxed exploration around the anchorage or island shores.' },
  { label: 'Stinger-Proof Pool',detail: 'Inflatable ocean pool deployed at anchor for safe swimming in open water.' },
  { label: 'Banana Boats',      detail: 'High-speed banana boat tows for groups — a crowd favourite at every family charter.' },
  { label: 'Snorkelling',       detail: 'Snorkel gear provided for exploring the shallow reefs around Moreton Bay and the Broadwater.' },
];

function AdventureActivities() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.ac'), {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Eyebrow>Adventure Activities</Eyebrow></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}>
            Beyond the <ItalicEm>deck</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.08)' }}
        >
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="ac" style={{ padding: '40px 32px', background: 'var(--navy-mid)' }}>
              <div style={{ width: 32, height: 1, background: 'var(--gold)', marginBottom: 20, opacity: 0.5 }} />
              <div style={{ ...GL }}>{a.label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(245,240,232,0.62)', lineHeight: 1.7 }}>{a.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Premium services ──────────────────────────────────────────────────────────

const SERVICES = [
  { label: 'DJ & Live Band',            detail: 'Full PA system with DJ booth, or space for a live band on the upper deck.' },
  { label: 'Cocktail Mixologist',       detail: 'Professional mixologist crafting custom cocktail menus for your event.' },
  { label: 'Photography & Film',        detail: 'In-house photography and videography packages to capture every moment.' },
  { label: 'Fireworks Display',         detail: 'Licensed marine pyrotechnics arranged directly from the vessel at anchor.' },
  { label: 'Helicopter Transfers',      detail: 'Dramatic arrival and departure by helicopter — arrangements handled by our team.' },
  { label: 'Roving Entertainment',      detail: 'Acrobats, magicians, caricaturists, and roving performers for your event.' },
];

function PremiumServices() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll('.ps'), {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="cruise-section" style={{ padding: '100px 48px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 64 }}>
          <div>
            <Eyebrow>Premium Services</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}>
              Everything <ItalicEm>arranged for you</ItalicEm>.
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(245,240,232,0.6)', lineHeight: 1.7, maxWidth: 380 }}>
            We coordinate every detail — from the DJ brief to the fireworks licence. You arrive, we deliver.
          </p>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.08)' }}
        >
          {SERVICES.map((s, i) => (
            <div key={i} className="ps" style={{ padding: '36px 28px' }}>
              <div style={{ ...GL }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MermaidSpiritPage() {
  return (
    <>
      <Nav />
      <main>
        <CruiseHero
          eyebrow="Our Fleet · Mermaid Spirit"
          title="Mermaid Spirit"
          titleAccent="100ft Tri-deck Catamaran"
          image="/mermaid-spirit-main.jpg"
          stats={[
            { label: 'Length',   value: '100 ft' },
            { label: 'Guests',   value: 'Up to 150' },
            { label: 'Decks',    value: '3 levels' },
            { label: 'Status',   value: 'New refit' },
          ]}
          bookingUrl={INQUIRY}
        />
        <SpecBar />
        <VesselOverview />
        <ThreeDecks />
        <Destinations />
        <AdventureActivities />
        <PremiumServices />
        <VesselGallery
          vesselName={V.name}
          images={V.gallery}
          tourUrl={V.tourUrl}
        />
        <VesselSpecTable
          vesselName={V.name}
          specs={V.specs}
          features={V.features}
        />
        <VesselFaq vesselName={V.name} faqs={V.faqs} />
        <VesselCrossLinks
          links={[
            {
              label: 'Sun Goddess',
              href: '/sun-goddess-gold-coast',
              note: 'Our 114ft flagship superyacht — dual bars and room for 135 guests.',
            },
            {
              label: 'Riverfire Cruise',
              href: '/riverfire-2026',
              note: 'The sky deck is one of the best fireworks vantage points on the river.',
            },
            ...(DINING_CRUISES_AVAILABLE
              ? [{
                  label: 'Dining Cruises',
                  href: '/buffet-dinner-and-lunch-cruise',
                  note: "Buffet lunch and dinner sessions from the chef's kitchen on board.",
                }]
              : []),
            {
              label: 'Private Charter',
              href: '/private-yacht-charter',
              note: 'Three decks to spread a celebration across, for up to 150 guests.',
            },
            {
              label: 'Luxury Scenic Sunset Cruise',
              href: '/luxury-broadwater-cruise',
              note: 'Golden hour on the Broadwater aboard the Sun Goddess.',
            },
          ]}
        />
        <CruiseBookingCTA bookingUrl={INQUIRY} />
      </main>
      <Footer />
    </>
  );
}
