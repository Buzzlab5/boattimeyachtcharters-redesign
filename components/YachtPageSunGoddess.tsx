'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteShell from './site/SiteShell';
import FaqEnquiry from './site/FaqEnquiry';
import { CruiseHero, CruiseBookingCTA } from './CruiseSections';
import { Eyebrow, ItalicEm, Button } from './Shared';
import {
  VesselGallery,
  VesselSpecTable,
  VesselFaq,
  VesselCrossLinks,
} from './YachtSections';
import { SUN_GODDESS as V } from '@/lib/vessels';

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
    { label: 'Length', value: '114', suffix: 'ft' },
    { label: 'Capacity', value: '135', suffix: 'guests' },
    { label: 'Bars', value: '2', suffix: 'onboard' },
    { label: 'Location', value: 'Gold', suffix: 'Coast' },
  ];
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.sp'), {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} style={{ background: 'var(--gold)' }}>
      <div
        className="grid stats-grid"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {SPECS.map((s, i) => (
          <div
            key={i}
            className="sp"
            style={{
              padding: '44px 40px',
              borderRight: i < 3 ? '1px solid rgba(10,22,40,0.15)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#0a1628',
                opacity: 0.9,
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(44px, 5vw, 64px)',
                color: '#0a1628',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
              }}
            >
              {s.value}
              <span
                style={{
                  fontStyle: 'italic',
                  fontSize: '0.45em',
                  opacity: 0.9,
                }}
              >
                {s.suffix}
              </span>
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
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.rv'), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div
        className="cruise-overview-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        <div>
          <div className="rv">
            <Eyebrow>The Vessel</Eyebrow>
          </div>
          <h2
            className="rv"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            A superyacht built for <ItalicEm>extraordinary moments</ItalicEm>.
          </h2>
          {[
            "Sun Goddess is Gold Coast's most celebrated luxury superyacht — 114 feet of sweeping teak decks, open-air entertainer's spaces, and a professional crew dedicated to making every charter unforgettable.",
            "Whether you're hosting a wedding on the foredeck, a corporate event for 135 guests, or a private sunset cruise for two, Sun Goddess adapts entirely to your vision. The Broadwater is her home.",
          ].map((p, i) => (
            <p
              key={i}
              className="rv"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                fontWeight: 300,
                color: 'rgba(245,240,232,0.78)',
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              {p}
            </p>
          ))}
          <div className="rv" style={{ marginTop: 32 }}>
            <Button variant="outline" href={INQUIRY}>
              Request a Charter
            </Button>
          </div>
        </div>
        <div className="rv" style={{ position: 'relative' }}>
          <div
            style={{
              aspectRatio: '4/5',
              backgroundImage:
                'url(/sungoddess-page-boat.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(201,168,76,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: -24,
              bottom: -24,
              left: 24,
              border: '1px solid rgba(201,168,76,0.1)',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── On Board features ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    label: 'Dual Licensed Bars',
    detail:
      'Two fully stocked bars with bar-tab and consumption options for all charter styles.',
  },
  {
    label: 'Entertainment System',
    detail:
      'Flat-screen TVs and premium audio throughout every deck and interior space.',
  },
  {
    label: 'Catering Galley',
    detail:
      'Fully equipped galley serviced by award-winning executive chefs and catering staff.',
  },
  {
    label: 'Watersports Deck',
    detail:
      'Dedicated launch area for banana boats, SUP boards, canoes, and inflatables.',
  },
  {
    label: 'Stinger-Proof Pool',
    detail:
      'Inflatable ocean pool deployed at anchor for safe open-water swimming.',
  },
  {
    label: 'Professional Crew',
    detail:
      'Full crew complement including captain, deck crew, bar staff, and event coordinators.',
  },
];

function OnBoard() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ft'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>On Board</Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Built to <ItalicEm>impress</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="ft"
              style={{ padding: '40px 32px', background: 'var(--navy-mid)' }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: 'var(--gold)',
                  marginBottom: 20,
                  opacity: 0.5,
                }}
              />
              <div style={{ ...GL }}>{f.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.62)',
                  lineHeight: 1.7,
                }}
              >
                {f.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Charter experiences ───────────────────────────────────────────────────────

const CHARTERS = [
  {
    label: 'Luxury Scenic Sunset Cruise',
    img: '/twilight-drift.jpeg',
    href: '/luxury-broadwater-cruise',
  },
  {
    label: 'Luxury Whale Watching',
    img: '/humpbacks.jpg',
    href: '/cruise-tickets-luxury-whale-watching',
  },
  {
    label: 'Wedding Charter',
    img: '/wedding-charter.webp',
    href: INQUIRY,
  },
  {
    label: 'Corporate Event',
    img: '/corporate-charter.webp',
    href: INQUIRY,
  },
  {
    label: 'Birthday Party',
    img: '/sun-goddess-interior/sun3.jpeg',
    href: INQUIRY,
  },
  {
    label: 'Private Charter',
    img: '/private-charter.jpeg',
    href: INQUIRY,
  },
];

function CharterExperiences() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ch'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <Eyebrow>Charter Experiences</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.05,
            }}
          >
            Every occasion, <ItalicEm>one vessel</ItalicEm>.
          </h2>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {CHARTERS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="ch photo-overlay-card"
              style={{
                position: 'relative',
                display: 'block',
                aspectRatio: '4/3',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${c.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.55s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.1) 55%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                <div style={{ ...GL, color: 'var(--gold)', marginBottom: 6 }}>
                  Charter
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 22,
                    color: 'var(--cream)',
                    lineHeight: 1,
                  }}
                >
                  {c.label}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Watersports ───────────────────────────────────────────────────────────────

function WatersportsSection() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ws'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  const items = [
    {
      label: 'Banana Boats',
      detail: 'High-speed tows for groups up to 6 behind the vessel at anchor.',
    },
    {
      label: 'SUP Boards',
      detail:
        'Stand-up paddleboards for relaxed exploration around the anchorage.',
    },
    {
      label: 'Canoes & Kayaks',
      detail: 'Flat-water paddling for guests of all ages and ability levels.',
    },
    {
      label: 'Inflatable Pool',
      detail:
        'Stinger-proof inflatable pool deployed at anchor for safe open-water swimming.',
    },
  ];

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy-mid)' }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
        className="cruise-overview-grid"
      >
        <div>
          <div className="ws">
            <Eyebrow>Watersports & Activities</Eyebrow>
          </div>
          <h2
            className="ws"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.05,
              marginBottom: 40,
            }}
          >
            Adventures <ItalicEm>on the water</ItalicEm>.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {items.map((item, i) => (
              <div
                key={i}
                className="ws"
                style={{
                  paddingBottom: 24,
                  marginBottom: 24,
                  borderBottom:
                    i < items.length - 1
                      ? '1px solid rgba(201,168,76,0.1)'
                      : 'none',
                }}
              >
                <div style={{ ...GL }}>{item.label}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.68)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ws" style={{ position: 'relative' }}>
          <div
            style={{
              aspectRatio: '4/5',
              backgroundImage:
                'url(/broadwater.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(201,168,76,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: -24,
              bottom: -24,
              right: 24,
              border: '1px solid rgba(201,168,76,0.1)',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Catering ──────────────────────────────────────────────────────────────────

const CATERING = [
  {
    label: 'Grazing Boards',
    detail:
      'Artisan cheese, charcuterie, seasonal fruits, dips, and crackers for casual entertaining.',
  },
  {
    label: 'Canapés',
    detail:
      'Elegant bite-sized selections curated to match your occasion and guest count.',
  },
  {
    label: 'Gourmet BBQ',
    detail:
      'Premium cuts grilled to order by our chef, served with house-made sides and salads.',
  },
  {
    label: 'Buffet Service',
    detail:
      'Full spread laid across the dining deck — ideal for larger groups and long charters.',
  },
  {
    label: 'Fine Dining',
    detail:
      'Plated multi-course dinners delivered with white-glove service for intimate events.',
  },
  {
    label: 'Drinks Packages',
    detail:
      'Custom bar packages including premium spirits, wines, cocktails, and non-alcoholic options.',
  },
];

function CateringSection() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.ct'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 32,
            marginBottom: 64,
          }}
        >
          <div>
            <Eyebrow>Catering</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1.05,
              }}
            >
              Award-winning <ItalicEm>executive chefs</ItalicEm>.
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.7,
              maxWidth: 400,
            }}
          >
            Every menu is tailored to your event. From a casual grazing board to
            a five-course fine-dining experience — the galley is yours.
          </p>
        </div>
        <div
          className="cruise-inclusions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          {CATERING.map((c, i) => (
            <div
              key={i}
              className="ct"
              style={{
                padding: '36px 28px',
                borderRight: [2, 5].includes(i)
                  ? 'none'
                  : '1px solid rgba(201,168,76,0.08)',
              }}
            >
              <div style={{ ...GL }}>{c.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.6)',
                  lineHeight: 1.7,
                }}
              >
                {c.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SunGoddessPage() {
  return (
    <>
      <SiteShell>
        <CruiseHero
          eyebrow="Our Fleet · Sun Goddess"
          title="Sun Goddess"
          titleAccent="114ft Superyacht"
          image="/sun-goddess-main-upscale.png"
          stats={[
            { label: 'Length', value: '114 ft' },
            { label: 'Guests', value: 'Up to 135' },
            { label: 'Location', value: 'Gold Coast' },
            { label: 'Bars', value: '2 on board' },
          ]}
          bookingUrl={INQUIRY}
        />
        <div className="st-zigzag st-legacy">
        <SpecBar />
        <VesselOverview />
        <OnBoard />
        <CharterExperiences />
        <WatersportsSection />
        <CateringSection />
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
        
        <VesselCrossLinks
          links={[
            {
              label: 'Mermaid Spirit',
              href: '/mermaid-spirit-gold-coast',
              note: 'Our 100ft tri-deck catamaran — three decks, jet skis and a stinger pool.',
            },
            {
              label: 'Private Charter',
              href: '/private-yacht-charter',
              note: 'Build the day around your occasion, from an intimate group to 135 guests.',
            },
            {
              label: 'Wedding Charter',
              href: '/wedding-yacht-charter',
              note: 'Licensed for ceremonies, with the foredeck as your aisle.',
            },
            {
              label: 'Luxury Whale Watching',
              href: '/cruise-tickets-luxury-whale-watching',
              note: 'Humpback season aboard Sun Goddess.',
            },
            {
              label: 'Luxury Scenic Sunset Cruise',
              href: '/luxury-broadwater-cruise',
              note: 'Two hours across the Broadwater at golden hour, Friday to Sunday.',
            },
          ]}
        />
        <CruiseBookingCTA bookingUrl={INQUIRY} />
      <FaqEnquiry faqs={V.faqs} />
        </div>
      </SiteShell>
    </>
  );
}
