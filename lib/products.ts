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
