/**
 * The two vessels, in one place.
 *
 * Every number and photo here comes from the homepage "Two vessels. One
 * horizon." section (`components/Fleet.tsx`), which the owner confirmed as the
 * source of truth. The vessel pages, their JSON-LD and their metadata all read
 * from here, so the figures can never drift apart again.
 */

export type Vessel = {
  slug: string;
  name: string;
  /** Short descriptor used after the name, e.g. "114ft Superyacht". */
  descriptor: string;
  tagline: string;
  /** Paragraphs for the page intro. */
  intro: string[];
  lengthFt: number;
  lengthM: number;
  /** Maximum guests for a day charter. */
  dayGuests: number;
  decks: number;
  heroImage: string;
  heroAlt: string;
  gallery: { src: string; alt: string }[];
  /** Full spec sheet rendered as a table. */
  specs: { label: string; value: string }[];
  features: string[];
  tourUrl: string;
  faqs: { q: string; a: string }[];
};

export const SUN_GODDESS: Vessel = {
  slug: 'sun-goddess-gold-coast',
  name: 'Sun Goddess',
  descriptor: '114ft Superyacht',
  tagline: 'She turns every head in the marina — and earns it.',
  intro: [
    'At 114 feet, Sun Goddess is our flagship. Dual bars, two entertainment decks, a dual-level galley, and Bose sound throughout. Built for up to 135 guests who expect room to breathe without giving up a single luxury.',
    'Whether you are hosting a wedding on the foredeck, a corporate event for 135 guests, or a private sunset cruise for two, Sun Goddess adapts entirely to your vision. The Gold Coast Broadwater is her home, departing Marine Stadium Jetty & Pontoon, Main Beach.',
  ],
  lengthFt: 114,
  lengthM: 34,
  dayGuests: 135,
  decks: 2,
  heroImage: '/sun-goddess-main-upscale.png',
  heroAlt:
    'Sun Goddess 114ft superyacht cruising the Gold Coast Broadwater',
  gallery: [
    {
      src: '/sun-goddess-interior/sun1.jpeg',
      alt: 'Sun Goddess main deck lounge and bar set for a charter',
    },
    {
      src: '/sun-goddess-interior/sun2.jpeg',
      alt: 'Sun Goddess interior dining area with panoramic Broadwater views',
    },
    {
      src: '/sun-goddess-interior/sun3.jpeg',
      alt: 'Sun Goddess entertainment deck arranged for a private event',
    },
    {
      src: '/sun-goddess-interior/sun4.jpeg',
      alt: 'Sun Goddess licensed bar with seating for guests',
    },
    {
      src: '/sun-goddess-interior/sun5.jpeg',
      alt: 'Sun Goddess upper sun deck open-air seating',
    },
    {
      src: '/sun-goddess-interior/sun6.jpg',
      alt: 'Sun Goddess teak deck and lounge seating at anchor',
    },
  ],
  specs: [
    { label: 'Vessel', value: 'SG-34M · Ocean Fast Yacht' },
    { label: 'Length', value: '34 m / 114 ft' },
    { label: 'Day guests', value: 'Up to 135' },
    { label: 'Decks', value: '2 entertainment decks' },
    { label: 'Bars', value: '2 licensed bars' },
    { label: 'Galley', value: 'Dual-level catering galley' },
    { label: 'Audio', value: 'Bose sound throughout' },
    { label: 'Refit', value: '2019' },
    { label: 'Departs', value: 'Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast' },
    { label: 'Cruising area', value: 'Gold Coast Broadwater & Brisbane' },
  ],
  features: [
    'Bose audio throughout',
    'Dual-level galley',
    'Upper sun deck',
    'Flat-screen televisions',
    'BBQ facilities',
    'Licensed for weddings',
    'Two licensed bars',
    'Professional crew and event coordinators',
  ],
  tourUrl:
    'https://kuula.co/share/collection/7M9TC?logo=-1&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1',
  faqs: [
    {
      q: 'How many guests can Sun Goddess hold?',
      a: 'Sun Goddess carries up to 135 guests on a day charter across two entertainment decks, with room to move between the indoor lounge, the open foredeck and the upper sun deck.',
    },
    {
      q: 'How big is Sun Goddess?',
      a: 'She is 34 metres — 114 feet — making her the largest vessel in the Boattime fleet and the most spacious superyacht in her category on the Gold Coast.',
    },
    {
      q: 'Where does Sun Goddess depart from?',
      a: 'Sun Goddess departs from Marine Stadium Jetty & Pontoon, Main Beach on the Gold Coast — about ten minutes from Surfers Paradise and fifteen from Broadbeach.',
    },
    {
      q: 'Can you hold a wedding on Sun Goddess?',
      a: 'Yes. Sun Goddess is licensed for weddings, and the foredeck is a popular ceremony space with the reception moving inside to the main deck lounge afterwards.',
    },
    {
      q: 'Is there a bar on board?',
      a: 'There are two fully licensed bars with bar-tab or consumption options. No external food or beverages are permitted on board — catering is handled by our culinary partners.',
    },
    {
      q: 'What kind of charters does Sun Goddess run?',
      a: 'Private charters, corporate events, weddings, whale watching cruises and sunset Broadwater cruises. The vessel is configured to suit the occasion rather than a fixed format.',
    },
  ],
};

export const MERMAID_SPIRIT: Vessel = {
  slug: 'mermaid-spirit-gold-coast',
  name: 'Mermaid Spirit',
  descriptor: '100ft Tri-deck Catamaran',
  tagline: 'Three decks built for the best night of your life.',
  intro: [
    "A tri-deck catamaran engineered for celebrations. Three full decks, a chef's kitchen, stinger pool, sun lounge, jet skis, and room for 150 by day or 22 overnight. The Gold Coast's ultimate floating venue.",
    'Her width gives her the stability of a much larger vessel and the deck space of a waterfront venue. She works the Gold Coast Broadwater and runs up the Brisbane River for events such as Riverfire.',
  ],
  lengthFt: 100,
  lengthM: 30,
  dayGuests: 150,
  decks: 3,
  heroImage: '/mermaid-spirit-main.jpg',
  heroAlt:
    'Mermaid Spirit 100ft tri-deck catamaran on the Gold Coast Broadwater',
  gallery: [
    {
      src: '/mermaid-spirit-interior/mermaid1.jpg',
      alt: 'Mermaid Spirit main deck lounge and bar',
    },
    {
      src: '/mermaid-spirit-interior/mermaid2.jpg',
      alt: 'Mermaid Spirit upper deck dining terrace overlooking the Broadwater',
    },
    {
      src: '/mermaid-spirit-interior/mermaid3.jpg',
      alt: 'Mermaid Spirit sky deck with open-air sun lounges',
    },
    {
      src: '/mermaid-spirit-interior/mermaid4.jpg',
      alt: "Mermaid Spirit chef's kitchen and catering galley",
    },
    {
      src: '/mermaid-spirit-interior/mermaid5.jpg',
      alt: 'Mermaid Spirit interior seating arranged for a celebration',
    },
  ],
  specs: [
    { label: 'Vessel', value: 'MS-30M · Tri-deck catamaran' },
    { label: 'Length', value: '30 m / 100 ft' },
    { label: 'Day guests', value: 'Up to 150' },
    { label: 'Overnight berths', value: 'Sleeps 22' },
    { label: 'Decks', value: '3 full decks' },
    { label: 'Galley', value: "Chef's kitchen" },
    { label: 'Water features', value: 'Stinger-proof pool, jet skis, paddle boards, scuba gear' },
    { label: 'Condition', value: 'New refit' },
    { label: 'Departs', value: 'Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast' },
    { label: 'Cruising area', value: 'Gold Coast Broadwater & Brisbane River' },
  ],
  features: [
    "Chef's kitchen",
    'Jet skis',
    'Stinger-proof pool',
    'Paddle boards',
    'Sun lounge',
    'Scuba gear',
    'Three full decks',
    'Sleeps 22 overnight',
  ],
  tourUrl:
    'https://kuula.co/share/collection/7MvRw?logo=-1&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1',
  faqs: [
    {
      q: 'How many guests can Mermaid Spirit hold?',
      a: 'Mermaid Spirit carries up to 150 guests on a day charter across three full decks, and sleeps 22 overnight.',
    },
    {
      q: 'How big is Mermaid Spirit?',
      a: 'She is 30 metres — 100 feet — and as a tri-deck catamaran her beam gives her the deck space and stability of a much larger monohull.',
    },
    {
      q: 'What is on each deck?',
      a: 'The main deck holds the bars, catering galley and lounge. The upper deck is an open-air dining terrace with a premium sound system for a DJ or live band. The sky deck is fully open with sun lounges and 360-degree views.',
    },
    {
      q: 'Does Mermaid Spirit have water activities?',
      a: 'Yes — jet skis, paddle boards, scuba gear and a stinger-proof inflatable pool deployed at anchor for safe open-water swimming.',
    },
    {
      q: 'Can Mermaid Spirit cruise the Brisbane River?',
      a: 'Yes. As well as the Gold Coast Broadwater she runs up the Brisbane River, including for Riverfire, where the sky deck is one of the best fireworks vantage points on the water.',
    },
    {
      q: 'Is Mermaid Spirit suitable for a party?',
      a: 'She was built for it. Three decks let a celebration spread out — cocktails on the main deck, dinner on the upper deck, dancing under the open sky — with a chef’s kitchen on board to cater the whole night.',
    },
  ],
};

/**
 * The two vessels as links, for the article rail.
 *
 * Kept here rather than added to PRODUCTS in lib/products.ts, because PRODUCTS
 * is also the source for the header dropdowns and changing it would change the
 * navigation. This list is used by the article sidebar only.
 *
 * Why it exists: read against Google on 23 October 2026, the queries
 * "sun goddess gold coast superyacht" and "mermaid spirit gold coast" both
 * return this site's HOMEPAGE and not the vessel page built for them, while
 * broker sites (thesuperyachtpeople.com, chapmanyachting.com,
 * boatcharterservices.com.au, prestigeharbourcruises.com.au) rank above the
 * operator on the operator's own vessel names.
 *
 * Measured the same day: across all 39 published articles there were 45
 * in-body links to a commercial page, and both vessel pages received ZERO.
 * They sit at priority 0.9 in the sitemap and the redirect comments in
 * next.config.ts call them "the business's main named entities", so having no
 * internal route to them from any of the content is the likeliest reason
 * Google ranks the homepage instead.
 */
export const VESSEL_LINKS = [
  { id: SUN_GODDESS.slug, label: SUN_GODDESS.name, sub: `${SUN_GODDESS.lengthFt} ft, up to ${SUN_GODDESS.dayGuests} guests`, href: `/${SUN_GODDESS.slug}` },
  { id: MERMAID_SPIRIT.slug, label: MERMAID_SPIRIT.name, sub: `${MERMAID_SPIRIT.lengthFt} ft, up to ${MERMAID_SPIRIT.dayGuests} guests`, href: `/${MERMAID_SPIRIT.slug}` },
];
