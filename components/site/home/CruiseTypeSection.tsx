import Image from 'next/image';
import SectionHead from '../SectionHead';

const TYPES = [
  {
    href: '/tickets',
    img: '/luxury-whale-watching/humpbacks.jpg',
    alt: 'Guests watching two humpback whales from the deck',
    tag: 'Shared cruise',
    title: 'Cruise Tickets',
    text: 'Join a scheduled cruise with other guests: whale watching, sunset on the Broadwater and seasonal events. Book a seat and step aboard.',
    left: 'Scheduled departures',
    price: 'from $79',
    unit: '/ person',
  },
  {
    href: '/private-yacht-charter',
    img: '/sun-goddess-main-upscale.png',
    alt: 'Sun Goddess superyacht at sea',
    tag: 'Private',
    title: 'Private Charter',
    text: 'The whole yacht is yours. Choose the date and route, and tell us the occasion: birthdays, weddings, corporate events or a day out with friends.',
    left: 'Tailored to your group',
    price: 'Get a quote',
    unit: '',
  },
];

export default function CruiseTypeSection() {
  return (
    <div role="region" id="cruise-type" className="st-section st-dark on-photo" aria-labelledby="st-cruise-type">
      <div className="st-wrap">
        <SectionHead
          eyebrow="Two ways to sail"
          title={
            <span id="st-cruise-type">
              Choose your <em>cruise type</em>
            </span>
          }
          sub="Same coastline, different experience. Pick the format that fits your group."
        />
        <div className="st-grid2">
          {TYPES.map((t) => (
            <a key={t.title} href={t.href} className="st-card on-photo">
              <Image src={t.img} alt={t.alt} fill sizes="(max-width: 720px) 100vw, 560px" />
              <div className="st-card__body">
                <span className="st-card__tag">{t.tag}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <div className="st-card__foot">
                  <span>{t.left}</span>
                  <span className="st-card__price">
                    {t.price}
                    {t.unit && <small>{t.unit}</small>}
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
