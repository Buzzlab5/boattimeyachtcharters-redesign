'use client';

/**
 * Sections shared by the two vessel pages (Sun Goddess, Mermaid Spirit).
 *
 * These exist to give each vessel page real, crawlable substance: its own
 * photographs, a full specification table, a virtual tour, and answers to the
 * questions buyers actually ask. The two vessels are the business's main named
 * entities, so these pages carry the detail rather than pointing back to the
 * homepage.
 */

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow, ItalicEm, Button } from './Shared';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 9,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  fontWeight: 600,
};

const BODY: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  fontWeight: 300,
  color: 'rgba(245,240,232,0.78)',
  lineHeight: 1.85,
};

function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="yr">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        className="yr"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(32px, 4vw, 52px)',
          lineHeight: 1.05,
          marginBottom: 40,
        }}
      >
        {children}
      </h2>
    </>
  );
}

/** Scroll-reveal for any block of `.yr` children. */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.yr'), {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export type GalleryImage = { src: string; alt: string };

/**
 * The vessel's own photographs. Descriptive alt text on every shot — these are
 * the only images of these boats anywhere on the site, so they carry the image
 * search weight too.
 */
export function VesselGallery({
  vesselName,
  images,
  tourUrl,
}: {
  vesselName: string;
  images: GalleryImage[];
  tourUrl?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useReveal(ref);

  const step = useCallback(
    (dir: number) =>
      setActive((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeading eyebrow="Gallery">
          Step aboard <ItalicEm>{vesselName}</ItalicEm>.
        </SectionHeading>

        <div
          className="yr"
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            border: '1px solid rgba(201,168,76,0.15)',
            overflow: 'hidden',
            marginBottom: 16,
          }}
        >
          {images.map((img, i) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 900px) 100vw, 1200px"
              priority={i === 0}
              style={{
                objectFit: 'cover',
                opacity: i === active ? 1 : 0,
                transition: 'opacity 0.6s var(--ease-brand, ease)',
              }}
            />
          ))}

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => step(-1)}
            className="carousel-arrow"
            style={arrowStyle('left')}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => step(1)}
            className="carousel-arrow"
            style={arrowStyle('right')}
          >
            ›
          </button>
        </div>

        <div
          className="yr yacht-gallery-thumbs"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${images.length}, 1fr)`,
            gap: 10,
          }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              aria-current={i === active}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                border:
                  i === active
                    ? '1px solid var(--gold)'
                    : '1px solid rgba(201,168,76,0.15)',
                opacity: i === active ? 1 : 0.55,
                cursor: 'pointer',
                padding: 0,
                background: 'none',
                transition: 'opacity 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="200px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>

        {tourUrl && (
          <div className="yr" style={{ marginTop: 40, textAlign: 'center' }}>
            <Button variant="outline" href={tourUrl}>
              Take the 360° tour of {vesselName}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(10,22,40,0.6)',
    border: '1px solid rgba(201,168,76,0.3)',
    // The chip paints its own navy, so the glyph is a literal cream —
    // var(--cream) flips to navy in light mode and vanished against it.
    color: '#F5F0E8',
    fontSize: 24,
    lineHeight: 1,
    cursor: 'pointer',
    zIndex: 2,
  };
}

// ── Specification table ───────────────────────────────────────────────────────

export type Spec = { label: string; value: string };

// The table rows and the "On Board" list rows share these, so their lines match.
const ROW_BORDER: React.CSSProperties = {
  borderBottom: '1px solid rgba(201,168,76,0.12)',
};
const ROW_TEXT: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  fontWeight: 300,
  lineHeight: '24px',
  color: 'var(--cream)',
};

/**
 * The full spec sheet as a real table. Plain text rows so search engines — and
 * anyone comparing two boats — can read the numbers without parsing a graphic.
 */
export function VesselSpecTable({
  vesselName,
  specs,
  features,
}: {
  vesselName: string;
  specs: Spec[];
  features: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy-mid, var(--navy))' }}
    >
      {/* Four grid cells, placed by .yacht-spec-grid: heading and "On Board" label share
          row 1, the table and the list share row 2, so both start on the same line. */}
      <div
        className="cruise-overview-grid yacht-spec-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 80,
          rowGap: 0,
          alignItems: 'start',
        }}
      >
        <div className="ys-head">
          <SectionHeading eyebrow="Specifications">
            {vesselName} <ItalicEm>at a glance</ItalicEm>.
          </SectionHeading>
        </div>

        <table
          className="yr ys-table"
          style={{ width: '100%', borderCollapse: 'collapse' }}
        >
          <tbody>
            {specs.map((s) => (
              <tr key={s.label} style={ROW_BORDER}>
                <th
                  scope="row"
                  style={{
                    ...LABEL,
                    textAlign: 'left',
                    padding: '16px 0',
                    width: '45%',
                  }}
                >
                  {s.label}
                </th>
                <td style={{ ...ROW_TEXT, padding: '16px 0' }}>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="yr ys-label">
          <Eyebrow>On Board</Eyebrow>
        </div>

        <ul
          className="yr ys-list"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {features.map((f) => (
            <li
              key={f}
              style={{
                ...ROW_BORDER,
                display: 'flex',
                gap: 14,
                alignItems: 'baseline',
                padding: '16px 0',
                ...ROW_TEXT,
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: 11 }}>—</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export type Faq = { q: string; a: string };

/**
 * Per-vessel questions. These are the queries people type before booking, so
 * answering them on the page is what earns the FAQ rich result and gives AI
 * search engines something concrete to quote.
 */
export function VesselFaq({
  vesselName,
  faqs,
}: {
  vesselName: string;
  faqs: Faq[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  useReveal(ref);

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy)' }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <SectionHeading eyebrow="Questions">
          Chartering <ItalicEm>{vesselName}</ItalicEm>.
        </SectionHeading>

        {faqs.map((f, i) => (
          <div
            key={f.q}
            className="yr"
            style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 24,
                padding: '24px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(19px, 2vw, 24px)',
                color: 'var(--cream)',
              }}
            >
              {f.q}
              <span
                style={{
                  color: 'var(--gold)',
                  fontSize: 22,
                  lineHeight: 1,
                  flexShrink: 0,
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                +
              </span>
            </button>
            {/* Always in the DOM so crawlers read every answer, open or not. */}
            <div
              style={{
                maxHeight: open === i ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.45s ease',
              }}
            >
              <p style={{ ...BODY, paddingBottom: 26 }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Cross-links to the other vessel and the charter types ────────────────────

export function VesselCrossLinks({
  links,
}: {
  links: { label: string; href: string; note: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  // Cards per row: up to four on one row, otherwise split in two near-equal rows
  // (5 -> 3 + 2). Cards grow to fill their row, so there is never an empty cell.
  const perRow = links.length <= 4 ? links.length : Math.ceil(links.length / 2);

  return (
    <section
      ref={ref}
      className="cruise-section"
      style={{ padding: '100px 48px', background: 'var(--navy-mid, var(--navy))' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeading eyebrow="Explore">
          Where she <ItalicEm>takes you</ItalicEm>.
        </SectionHeading>

        <div
          className="yacht-crosslink-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="yr"
              style={{
                display: 'block',
                flex: `1 1 calc((100% - ${perRow - 1}px) / ${perRow})`,
                boxSizing: 'border-box',
                padding: '36px 30px',
                background: 'var(--navy)',
                textDecoration: 'none',
              }}
            >
              <div style={{ ...LABEL, marginBottom: 12 }}>{l.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'rgba(245,240,232,0.7)',
                  lineHeight: 1.7,
                }}
              >
                {l.note}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
