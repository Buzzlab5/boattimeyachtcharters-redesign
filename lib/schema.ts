/**
 * JSON-LD structured data builders.
 *
 * One place for every schema.org object the site emits, so the business
 * details (name, phone, address, rating) are written down once and reused.
 *
 * Rule: only facts already published on the site go in here. No invented
 * ratings, prices, or review counts.
 */

export const BASE_URL = 'https://www.boattimeyachtcharters.com';

// Stable @id anchors so separate schema blocks can reference the same entity
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

const PHONE = '+61477667644';
const EMAIL = 'info@boattimeyachtcharters.com.au';
const LOGO = `${BASE_URL}/boattime-logo.png`;

const SAME_AS = [
  'https://www.facebook.com/boattimeyachtcharters/',
  'https://www.instagram.com/boattimeyachtcharters/',
];

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Marine Stadium Jetty & Pontoon',
  addressLocality: 'Main Beach',
  addressRegion: 'QLD',
  postalCode: '4217',
  addressCountry: 'AU',
};

// Departure point — Marine Stadium Jetty & Pontoon, Main Beach.
const GEO = {
  '@type': 'GeoCoordinates',
  latitude: -27.9407977,
  longitude: 153.4237125,
};

// Must match what visitors can see. The review blocks across the cruise pages
// publish Google 4.7 from 1,863 reviews, so that is what is declared here.
// (Facebook's 5.0 from 2,047 is shown too, but mixing two platforms into one
// aggregate is not something we could defend if Google checked.)
const AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: '4.7',
  reviewCount: '1863',
  bestRating: '5',
  worstRating: '1',
};

const AREA_SERVED = [
  { '@type': 'City', name: 'Gold Coast' },
  { '@type': 'City', name: 'Brisbane' },
  { '@type': 'State', name: 'Queensland' },
];

/** The business itself. Emitted once, in the root layout. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    // A single type, not an array. `LocalBusiness` already IS an `Organization`
    // in the schema.org hierarchy, so listing both was redundant, and
    // `TouristAttraction` is a `Place` — mixing it in muddied the entity and
    // left validators unable to name the business at all (schema.org's
    // validator listed the WebSite and FAQPage blocks but not this one).
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: 'Boattime Yacht Charters',
    alternateName: 'Boattime',
    description:
      "Gold Coast superyacht charter company operating the Sun Goddess and Mermaid Spirit for private, corporate, and wedding charters, whale watching, and dining cruises.",
    url: BASE_URL,
    logo: { '@type': 'ImageObject', url: LOGO },
    image: `${BASE_URL}/sun-goddess-main-upscale.png`,
    telephone: PHONE,
    email: EMAIL,
    address: ADDRESS,
    geo: GEO,
    areaServed: AREA_SERVED,
    priceRange: '$$$',
    currenciesAccepted: 'AUD',
    // No aggregateRating. Google does not show stars for a business rating
    // itself ("self-serving"), and Googlebot's render counted this block twice,
    // flagging every page with "Review has multiple aggregate ratings".
    sameAs: SAME_AS,
  };
}

/** Site-level entity, enables the sitelinks search box. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BASE_URL,
    name: 'Boattime Yacht Charters',
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-AU',
  };
}

/** Breadcrumb trail. Pass the path segments below the homepage. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      ...trail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${BASE_URL}${crumb.path}`,
      })),
    ],
  };
}

type OfferInput = {
  /** Lowest advertised price, as a plain number string, e.g. '99'. */
  price: string;
  /** Highest advertised price. Set it to publish a range instead of one figure. */
  highPrice?: string;
  /** What the price buys, e.g. 'Adult ticket'. */
  description?: string;
};

function buildOffer(offer: OfferInput) {
  const base = {
    priceCurrency: 'AUD',
    availability: 'https://schema.org/InStock',
    url: `${BASE_URL}/tickets`,
    ...(offer.description ? { description: offer.description } : {}),
  };

  // With a ceiling given, publish the real range so search results can show a
  // "from" price rather than the cost of a multi-ticket bundle.
  return offer.highPrice
    ? {
        '@type': 'AggregateOffer',
        lowPrice: offer.price,
        highPrice: offer.highPrice,
        ...base,
      }
    : { '@type': 'Offer', price: offer.price, ...base };
}

type TripInput = {
  name: string;
  description: string;
  path: string;
  image: string;
  /** ISO 8601 duration, e.g. 'PT2H30M'. Omit when it varies. */
  duration?: string;
  offer?: OfferInput;
};

/** A bookable ticketed cruise (whale watching, dining, sunset, event nights). */
export function boatTripSchema(trip: TripInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BoatTrip',
    '@id': `${BASE_URL}${trip.path}/#trip`,
    name: trip.name,
    description: trip.description,
    url: `${BASE_URL}${trip.path}`,
    image: trip.image.startsWith('http') ? trip.image : `${BASE_URL}${trip.image}`,
    provider: { '@id': ORG_ID },
    departureBoatTerminal: {
      '@type': 'BoatTerminal',
      name: 'Marine Stadium Jetty & Pontoon, Main Beach',
      address: ADDRESS,
      // Coordinates as well as an address, because the berth is the fact most
      // often got wrong about this business: answers and third-party listings
      // keep placing it at Mariners Cove or in Surfers Paradise. These match
      // the Rezdy product record exactly.
      geo: GEO,
    },
    // No aggregateRating: Google only accepts review snippets on certain types
    // (Product, LocalBusiness, Event…). On a BoatTrip it is flagged as
    // "Invalid object type for field <parent_node>". The business rating is
    // already declared once, on the LocalBusiness block in the root layout.
    ...(trip.duration ? { duration: trip.duration } : {}),
    ...(trip.offer ? { offers: buildOffer(trip.offer) } : {}),
  };
}

type ServiceInput = {
  name: string;
  description: string;
  path: string;
  image: string;
  serviceType: string;
};

/** A quote-based charter service (private, corporate, wedding, catering). */
export function serviceSchema(service: ServiceInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}${service.path}/#service`,
    name: service.name,
    description: service.description,
    url: `${BASE_URL}${service.path}`,
    image: service.image.startsWith('http')
      ? service.image
      : `${BASE_URL}${service.image}`,
    serviceType: service.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
    // No aggregateRating — Service is not a review-snippet type (see BoatTrip).
  };
}

type VesselInput = {
  name: string;
  description: string;
  path: string;
  image: string;
  /** e.g. '114 ft' */
  length: string;
  /** Maximum guests aboard. */
  capacity: number;
  /** Additional photographs of the vessel. */
  gallery?: string[];
};

/** One of the two named vessels — the business's main entities. */
export function vesselSchema(vessel: VesselInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}${vessel.path}/#vessel`,
    name: vessel.name,
    description: vessel.description,
    url: `${BASE_URL}${vessel.path}`,
    image: [vessel.image, ...(vessel.gallery ?? [])].map((src) =>
      src.startsWith('http') ? src : `${BASE_URL}${src}`,
    ),
    category: 'Yacht charter',
    brand: { '@id': ORG_ID },
    aggregateRating: AGGREGATE_RATING,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Length', value: vessel.length },
      {
        '@type': 'PropertyValue',
        name: 'Guest capacity',
        value: String(vessel.capacity),
      },
    ],
  };
}

/** FAQ block. Only pass questions and answers already shown on the page. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
