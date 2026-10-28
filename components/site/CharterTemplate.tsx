import type { ReactNode } from 'react';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import SiteShell from './SiteShell';
import PageHero from './PageHero';
import Section from './Section';
import SectionHead from './SectionHead';
import GalleryStrip from './GalleryStrip';
import PhotoCardGrid from './PhotoCardGrid';
import FaqEnquiry, { type FaqItem } from './FaqEnquiry';
import { PHONE_HREF, PHONE_LABEL } from './contact';

export interface AccordionSection {
  title: string;
  content: ReactNode;
}

interface CharterTemplateProps {
  /** e.g. "Private" -> used in headings */
  kind: string;
  heroImage: string;
  heroLead: string;
  /** big heading of the overview, e.g. "Private Yacht Charter Gold Coast" */
  overviewTitle: string;
  /** the long overview copy (the page's existing JSX) */
  overview: ReactNode;
  /** one gallery for the whole page (a public/ folder) ... */
  galleryFolder?: string;
  /** ... or several, each under its own heading */
  galleryGroups?: { title: string; folder: string }[];
  packagesTitle: ReactNode;
  /** the packages / vessel text (existing JSX) */
  packages: ReactNode;
  /** the old accordion: Availability becomes the call-to-action band, FAQ moves to the FAQ section, the rest become cards */
  accordion: AccordionSection[];
  faqs: FaqItem[];
  vesselOrder?: ('sun-goddess' | 'mermaid-spirit')[];
}

/**
 * Card widths on a 6-column grid. The first two cards share a row (4 + 2), the rest
 * go three to a row (2 + 2 + 2); if that leaves one or two cards over, they widen to
 * fill the row (6, or 3 + 3), so no row is ever left with a lone or lopsided card.
 */
function detailWidth(i: number, total: number): string {
  if (total < 3) return total === 1 ? ' st-detail--w6' : ' st-detail--w3';
  if (i === 0) return ' st-detail--w4';
  if (i === 1) return '';
  const rest = total - 2;
  const left = rest % 3;
  const idxInRest = i - 2;
  if (left === 1 && idxInRest === rest - 1) return ' st-detail--w6';
  if (left === 2 && idxInRest >= rest - 2) return ' st-detail--w3';
  return '';
}

const VESSELS = {
  'sun-goddess': {
    href: '/sun-goddess-gold-coast',
    image: '/sun-goddess-main-upscale.png',
    alt: 'Sun Goddess superyacht at sea',
    tag: 'Flagship',
    title: 'Sun Goddess',
    text: 'Our 34 m flagship superyacht: two decks, two bars and Bose sound throughout, for up to 135 guests.',
    left: 'Up to 135 guests',
  },
  'mermaid-spirit': {
    href: '/mermaid-spirit-gold-coast',
    image: '/mermaid-spirit-main.jpg',
    alt: 'Mermaid Spirit catamaran on the Broadwater',
    tag: 'Tri-deck catamaran',
    title: 'Mermaid Spirit',
    text: 'Three decks with jet skis, kayaks, paddle boards and a stinger-proof pool, for up to 150 day guests.',
    left: 'Up to 150 day guests',
  },
} as const;

/**
 * The charter page layout (private, corporate, wedding): hero, overview with a
 * sticky side card, photos, packages, detail cards, yachts, availability, FAQ and form.
 */
export default function CharterTemplate({
  kind,
  heroImage,
  heroLead,
  overviewTitle,
  overview,
  galleryFolder,
  galleryGroups,
  packagesTitle,
  packages,
  accordion,
  faqs,
  vesselOrder = ['sun-goddess', 'mermaid-spirit'],
}: CharterTemplateProps) {
  const availability = accordion.find((a) => a.title.startsWith('Availability'));
  const details = accordion.filter((a) => !a.title.startsWith('Availability') && a.title !== 'FAQ');
  const yachts = vesselOrder.map((v) => VESSELS[v]).map((v) => ({ ...v, tag: v.tag }));

  return (
    <>
      <GoogleAdsTag />
      <SiteShell>
        <PageHero
          image={heroImage}
          imageAlt={`${kind} yacht charter on the Gold Coast`}
          eyebrow="Boattime Yacht Charters"
          title={
            <>
              {kind} Yacht Charter <em>Gold Coast</em>
            </>
          }
          lead={heroLead}
        />

        <div className="st-zigzag">
          <Section labelledBy="st-ch-overview">
            <div className="st-split">
              <div>
                <div className="st-eyebrow st-eyebrow--left">{kind} charters</div>
                <h2 id="st-ch-overview" className="st-h2 st-h2--left" style={{ marginBottom: 28 }}>
                  {overviewTitle}
                </h2>
                <div className="st-prose">{overview}</div>
              </div>
              <aside className="st-aside" aria-label="Plan your charter">
                <h3>Plan your charter</h3>
                <p>Tell us the date, the guests and the occasion. We reply within the hour.</p>
                <ul className="st-aside__facts">
                  <li>
                    <span>Sun Goddess</span>
                    <b>Up to 135 guests</b>
                  </li>
                  <li>
                    <span>Mermaid Spirit</span>
                    <b>Up to 150 guests</b>
                  </li>
                  <li>
                    <span>Bars</span>
                    <b>Two on each yacht</b>
                  </li>
                  <li>
                    <span>Departs</span>
                    <b>Main Beach, Gold Coast</b>
                  </li>
                </ul>
                <a href="#inquiry" className="st-btn st-btn--primary st-btn--lg">
                  Booking enquiry
                </a>
                <a href={PHONE_HREF} className="st-btn st-btn--lg">
                  Call {PHONE_LABEL}
                </a>
              </aside>
            </div>
          </Section>

          <Section wide labelledBy="st-ch-gallery">
            <SectionHead eyebrow="Gallery" title={<span id="st-ch-gallery">On board, <em>up close</em></span>} />
            {galleryGroups ? (
              galleryGroups.map((g) => (
                <div key={g.folder} className="st-gallery-group">
                  <h3 className="st-gallery-group__title">{g.title}</h3>
                  <GalleryStrip folder={g.folder} label={g.title} />
                </div>
              ))
            ) : (
              galleryFolder && <GalleryStrip folder={galleryFolder} label={`${kind} charter photo`} />
            )}
          </Section>

          <Section labelledBy="st-ch-packages">
            <SectionHead eyebrow="Packages" title={<span id="st-ch-packages">{packagesTitle}</span>} align="left" />
            <div className="st-prose" style={{ maxWidth: 860 }}>
              {packages}
            </div>
          </Section>

          <Section labelledBy="st-ch-details">
            <SectionHead eyebrow="On board and on the water" title={<span id="st-ch-details">Everything <em>included</em>, and what you can add</span>} />
            <div className="st-detail-grid">
              {details.map((d, i) => (
                <article key={d.title} className={`st-detail${detailWidth(i, details.length)}`}>
                  <h3>{d.title}</h3>
                  <div className="st-prose">{d.content}</div>
                </article>
              ))}
            </div>
          </Section>

          <Section labelledBy="st-ch-yachts">
            <SectionHead eyebrow="Our yachts" title={<span id="st-ch-yachts">Choose your <em>yacht</em></span>} sub="Two superyachts, one berth at Main Beach. Tell us the group and we will recommend the right one." />
            <PhotoCardGrid items={yachts} columns={2} />
          </Section>

          {availability && (
            <Section labelledBy="st-ch-avail">
              <div className="st-cta">
                <div className="st-eyebrow">Availability</div>
                <h2 id="st-ch-avail" className="st-h2">
                  Availability &amp; <em>booking enquiry</em>
                </h2>
                <div className="st-prose">{availability.content}</div>
              </div>
            </Section>
          )}

          <FaqEnquiry faqs={faqs} />
        </div>
      </SiteShell>
    </>
  );
}
