import Image from 'next/image';
import SectionHead from './SectionHead';

// Prices are the ones already published on each product page.
const EXPERIENCES = [
  {
    href: '/luxury-broadwater-cruise',
    img: '/sunset-boat.jpg',
    alt: 'Sunset over the Gold Coast skyline from the deck',
    tag: 'Superyacht sunset',
    title: 'Luxury Sunset Cruise',
    text: 'Golden hour on the Broadwater, with the Gold Coast skyline lighting up around you.',
    price: 'from $79',
    unit: '/ adult',
  },
  {
    href: '/nye-2026',
    img: '/nye2026.webp',
    alt: 'Fireworks over the river on New Year’s Eve',
    tag: 'Celebration cruise',
    title: 'New Year’s Eve 2026',
    text: 'See the year out from the water, with the fireworks on show from your own deck.',
    price: '$169',
    unit: '/ person',
  },
  {
    href: '/cruise-tickets-luxury-whale-watching',
    img: '/luxury-whale.jpg',
    alt: 'Humpback whale beside the Boattime vessel',
    tag: 'Gold Coast cruise',
    title: 'Luxury Whale Watching',
    text: 'Humpback season from the upper deck, with crew commentary and plenty of room to watch.',
    price: 'from $79.50',
    unit: '/ adult',
  },
];

export default function ExperiencesSection() {
  return (
    <div role="region" id="experiences" className="hp-section" aria-labelledby="hp-experiences">
      <div className="hp-wrap">
        <SectionHead
          eyebrow="Experiences"
          title={
            <span id="hp-experiences">
              Three ways to see <em>the coast</em>
            </span>
          }
          sub="Our featured cruises, ready to book."
        />
        <div className="hp-exp-grid">
          {EXPERIENCES.map((e) => (
            <a key={e.title} href={e.href} className="hp-card on-photo">
              <Image src={e.img} alt={e.alt} fill sizes="(max-width: 1024px) 100vw, 360px" />
              <div className="hp-card__body">
                <span className="hp-card__tag">{e.tag}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
                <div className="hp-card__foot">
                  <span>View cruise</span>
                  <span className="hp-card__price">
                    {e.price}
                    <small>{e.unit}</small>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
