import Image from 'next/image';
import HeroActions from './HeroActions';

// When the video is ready on bunny.net, paste its MP4 URL here and the hero
// plays it behind the same photo (the photo stays as the poster/fallback).
const HERO_VIDEO_URL = '';

export default function PreviewHero() {
  return (
    <div role="region" className="hp-hero" aria-label="Welcome">
      <div className="hp-hero__bg">
        <Image src="/new-hero-img.jpg" alt="Sun Goddess superyacht beside a humpback whale off the Gold Coast" fill priority sizes="100vw" />
        {HERO_VIDEO_URL && (
          <video src={HERO_VIDEO_URL} poster="/new-hero-img.jpg" autoPlay muted loop playsInline preload="metadata" />
        )}
      </div>
      <div className="hp-hero__shade" />

      <div className="hp-hero__inner on-photo">
        <div className="hp-pill">Superyacht cruises &middot; Gold Coast</div>
        <h1>
          Discover <em>the Gold Coast</em>
        </h1>
        <p className="hp-hero__lead">
          Whale watching, sunset cruises and private superyacht charters, all from Main Beach.
        </p>
        <p className="hp-hero__price">
          Cruise tickets from <strong>$79</strong> per person &middot; Private charters on request
        </p>
        <HeroActions />

        <div className="hp-hero__stats">
          <div className="hp-stat">
            <b>4.7</b>
            <span className="hp-stars" aria-hidden="true">★★★★★</span>
            <small>Guest rating</small>
          </div>
          <div className="hp-stat-rule" aria-hidden="true" />
          <div className="hp-stat">
            <b>3,910+</b>
            <span className="hp-stars" aria-hidden="true">★★★★★</span>
            <small>Guest reviews</small>
          </div>
        </div>
      </div>

      <div className="hp-hero__cue" aria-hidden="true">
        Explore
        <i />
      </div>
    </div>
  );
}
