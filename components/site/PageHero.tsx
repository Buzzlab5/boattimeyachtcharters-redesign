import Image from 'next/image';
import type { ReactNode } from 'react';
import HeroActions, { type HeroAction } from './HeroActions';

export interface HeroStat {
  value: string;
  label: string;
  /** show five stars under the value (ratings) */
  stars?: boolean;
}

export interface HeroFact {
  label: string;
  value: string;
}

interface PageHeroProps {
  image: string;
  imageAlt: string;
  /** small pill above the title */
  eyebrow?: string;
  /** use <em> around the accent words */
  title: ReactNode;
  lead?: ReactNode;
  /** one line under the lead, e.g. "Cruise tickets from $79 per person" */
  note?: ReactNode;
  /** main button; Enquiry and Call are always offered */
  primary?: HeroAction;
  /** rating-style numbers under the buttons */
  stats?: HeroStat[];
  /** duration / price / season chips (cruise pages) */
  facts?: HeroFact[];
  /** `full` fills the screen (home), `tall` is the inner-page height */
  size?: 'full' | 'tall';
  /** MP4 URL (bunny.net). Plays over `image`, which stays as poster and fallback. */
  videoUrl?: string;
  /** keep the scroll cue only on the home page */
  cue?: boolean;
}

export default function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  lead,
  note,
  primary,
  stats,
  facts,
  size = 'tall',
  videoUrl,
  cue = false,
}: PageHeroProps) {
  return (
    <div role="region" className={`st-hero st-hero--${size}`} aria-label="Introduction">
      <div className="st-hero__bg">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
        {videoUrl && <video src={videoUrl} poster={image} autoPlay muted loop playsInline preload="metadata" />}
      </div>
      <div className="st-hero__shade" />

      <div className="st-hero__inner on-photo">
        {eyebrow && <div className="st-pill">{eyebrow}</div>}
        <h1>{title}</h1>
        {lead && <p className="st-hero__lead">{lead}</p>}
        {note && <p className="st-hero__price">{note}</p>}

        {facts && facts.length > 0 && (
          <dl className="st-facts">
            {facts.map((f) => (
              <div key={f.label} className="st-facts__item">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <HeroActions primary={primary} />

        {stats && stats.length > 0 && (
          <div className="st-hero__stats">
            {stats.map((s, i) => (
              <div key={s.label} style={{ display: 'contents' }}>
                {i > 0 && <div className="st-stat-rule" aria-hidden="true" />}
                <div className="st-stat">
                  <b>{s.value}</b>
                  {s.stars && (
                    <span className="st-stars" aria-hidden="true">
                      ★★★★★
                    </span>
                  )}
                  <small>{s.label}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cue && (
        <div className="st-hero__cue" aria-hidden="true">
          Explore
          <i />
        </div>
      )}
    </div>
  );
}
