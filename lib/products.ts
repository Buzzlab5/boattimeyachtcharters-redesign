export interface Product {
  id: string;
  label: string;
  sub: string;
  href: string;
  /** Lunch/dinner dining cruise — hidden while DINING_CRUISES_AVAILABLE is false. */
  dining?: boolean;
}

// Dining cruises (Chef's Table lunch & dinner, Buffet Dinner & Lunch) are
// currently not running. Set this back to `true` to show them again in the
// nav, homepage sections, footer and "related" links. Their pages still work
// if someone opens the URL directly.
export const DINING_CRUISES_AVAILABLE = false;

const isShown = (p: Product) => DINING_CRUISES_AVAILABLE || !p.dining;

// Single source of truth for the site's product menus.
// The header dropdowns (components/Nav.tsx) and the "Related products" picker in
// the news CMS both read from these lists, so they can never drift apart.

const ALL_EXPERIENCE_PRODUCTS: Product[] = [
  { id: 'whale-watching',    label: 'Luxury Whale Watching',                       sub: 'Gold Coast Cruise',       href: '/cruise-tickets-luxury-whale-watching' },
  { id: 'twilight-drift',    label: 'Luxury Scenic Sunset Cruise',                 sub: 'Superyacht Sunset',       href: '/luxury-broadwater-cruise' },
  { id: 'chefs-table-lunch', label: "Chef's Table – Flavours of Australia",        sub: 'Lunch Cruise',            href: '/relaxed-lunch-cruise-flavours-of-australia-aboard-the-mermaid-spirit', dining: true },
  { id: 'twilight-dining',   label: "Chef's Table Dinner – Flavours of Australia", sub: 'Dinner Cruise',           href: '/sunset-twilight-buffet-flavours-of-australia-aboard-the-mermaid-spirit', dining: true },
  { id: 'riverfire-2026',    label: 'Riverfire 2026',                             sub: 'Brisbane Event',          href: '/riverfire-2026' },
  { id: 'nye-2026',          label: "New Year's Eve 2026",                        sub: 'Celebration Cruise',      href: '/nye-2026' },
  { id: 'valentines-day',    label: "Valentine's Day",                            sub: 'Romance Evening',         href: '/valentines-day' },
  { id: 'helitours',         label: 'Gold Coast Helitours',                       sub: 'Sky to Sea Partnership',  href: '/humpbackhelitours' },
];

const ALL_CHARTER_PRODUCTS: Product[] = [
  { id: 'private-charter',    label: 'Private Yacht Charter',        sub: 'Tailored experiences',    href: '/private-yacht-charter' },
  { id: 'corporate-charter',  label: 'Corporate Charter',            sub: 'Team & client events',    href: '/corporate-yacht-charter' },
  { id: 'wedding-charter',    label: 'Wedding Yacht Charter',        sub: 'Celebrate in style',      href: '/wedding-yacht-charter' },
  { id: 'buffet-dinner-lunch',label: 'Buffet Dinner & Lunch Cruise', sub: 'Flavours of Australia',   href: '/buffet-dinner-and-lunch-cruise', dining: true },
  { id: 'catering',           label: 'Catering & Menus',             sub: 'Menus & packages',        href: '/yacht-charter-menus' },
];

export const EXPERIENCE_PRODUCTS: Product[] = ALL_EXPERIENCE_PRODUCTS.filter(isShown);
export const CHARTER_PRODUCTS: Product[] = ALL_CHARTER_PRODUCTS.filter(isShown);
export const PRODUCTS: Product[] = [...EXPERIENCE_PRODUCTS, ...CHARTER_PRODUCTS];

/**
 * Fallback for the "Related Experiences" sidebar on an article.
 *
 * `posts.related_products` is picked by hand in the CMS, and when it is left
 * empty the sidebar renders nothing, so that article offers a reader no route
 * to a bookable page at all. Measured on the live site on 23 October 2026:
 * 9 of 39 published articles were in that state, and across all 39 there were
 * only 45 in-body links to a commercial page, with 14 articles having none and
 * five commercial pages receiving none at all.
 *
 * Used ONLY when nothing was picked by hand, so the CMS always wins.
 *
 * Two deliberate rules, both from that measurement:
 *
 * 1. Every article gets one charter-lane link as well as a topical one. The
 *    charter pages are the ones with no internal equity from the content, and
 *    a reader of "how much does whale watching cost" is a plausible charter
 *    enquiry. Picking only on topic sent every article to the same four
 *    ticketed pages and none to charter, which is the problem rather than the
 *    fix.
 * 2. Riverfire is not a fallback target. Riverfire 2026 was in September, so
 *    an automatic link would send readers to a passed event. A hand-picked set
 *    can still include it.
 */
const TOPIC_RULES: { id: string; match: RegExp }[] = [
  { id: 'whale-watching', match: /whale|humpback|calf|dolphin|migration/i },
  { id: 'twilight-drift', match: /sunset|twilight|golden hour|broadwater|scenic/i },
  { id: 'valentines-day', match: /valentine|romance|romantic/i },
  { id: 'nye-2026',       match: /new year|nye/i },
  { id: 'catering',       match: /menu|catering|food|dining|chef|canape|buffet|lunch|dinner/i },
  { id: 'helitours',      match: /helicopter|heli|scenic flight/i },
];

const CHARTER_RULES: { id: string; match: RegExp }[] = [
  { id: 'wedding-charter',   match: /wedding|engagement|bride|ceremony|proposal/i },
  { id: 'corporate-charter', match: /corporate|team|christmas|end of year|work party|conference|riverfire|group/i },
  { id: 'private-charter',   match: /.*/ },
];

export function fallbackProductIds(input: {
  title?: string | null;
  categories?: string[] | null;
  tags?: string[] | null;
}): string[] {
  const haystack = [
    input.title ?? '',
    ...(input.categories ?? []),
    ...(input.tags ?? []),
  ].join(' ');

  const available = new Set(PRODUCTS.map(p => p.id));
  const keep = (ids: string[]) => ids.filter(id => available.has(id));

  const topical = keep(TOPIC_RULES.filter(r => r.match.test(haystack)).map(r => r.id)).slice(0, 2);
  // CHARTER_RULES ends in a catch-all, so this always yields exactly one.
  const charter = keep(CHARTER_RULES.filter(r => r.match.test(haystack)).map(r => r.id)).slice(0, 1);

  const out = [...topical, ...charter];
  // An article matching no topic at all still gets the two ticketed cruises.
  if (topical.length === 0) {
    return [...keep(['whale-watching', 'twilight-drift']), ...charter].slice(0, 3);
  }
  return out.slice(0, 3);
}
