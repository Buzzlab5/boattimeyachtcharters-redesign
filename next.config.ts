import type { NextConfig } from 'next';

/**
 * Permanent redirects from the old WordPress site.
 *
 * The redesign changed nearly every URL. Google still has the old ones indexed
 * and they were all returning 404, throwing away years of accumulated ranking —
 * most damagingly for the two vessels, which are the business's main named
 * entities. Every source below was confirmed to exist on the old site (via the
 * Wayback Machine's URL index) and to 404 today.
 *
 * Sources are written without a trailing slash: Next normalises `/foo/` to
 * `/foo` first, so both spellings land here.
 *
 * Deliberately NOT redirected: drafts and internal pages that should stay 404
 * (`/auto-draft`, `/home-btyc`, `/homelink`, `/sunsets-whale-draft`,
 * `/boattime-yc-runsheet`, `/1813-2`, `/thank-you`). Redirecting junk would
 * only invite Google to keep crawling it.
 */
const OLD_SITE_REDIRECTS: { source: string; destination: string }[] = [
  // ── The two vessels + About: the pages the SEO audit called out ──────────
  { source: '/sun-goddess', destination: '/sun-goddess-gold-coast' },
  { source: '/our-yachts/sun-goddess', destination: '/sun-goddess-gold-coast' },
  { source: '/mermaid-spirit', destination: '/mermaid-spirit-gold-coast' },
  { source: '/mermaid-spirit-3', destination: '/mermaid-spirit-gold-coast' },
  {
    source: '/mermaid-spirit/mermaid-spirit-gallery',
    destination: '/mermaid-spirit-gold-coast',
  },
  {
    source: '/mermaid-spirit-3/mermaid-spirit-gallery',
    destination: '/mermaid-spirit-gold-coast',
  },
  { source: '/our-yachts/mermaid-spirit', destination: '/mermaid-spirit-gold-coast' },
  { source: '/our-yachts', destination: '/#fleet' },
  // The About page lives at /about. `/about-boattime` was its address for one
  // deploy and reached the sitemap, so it gets a redirect of its own rather
  // than being dropped. No rule for `/about` itself — that is the real page now,
  // and a redirect pointing at it would loop.
  { source: '/about-boat-time', destination: '/about' },
  { source: '/about-boattime', destination: '/about' },
  { source: '/about-us', destination: '/about' },

  // ── Charter & service pages ──────────────────────────────────────────────
  // `/yacht-charter/gold-coast` is not a guess: Google was observed serving it
  // on page one for "private yacht charter gold coast" on 23 Oct 2026, and it
  // returns 404, so every click from that result lands on nothing.
  { source: '/yacht-charter/gold-coast', destination: '/private-yacht-charter' },
  { source: '/yacht-charter', destination: '/private-yacht-charter' },
  { source: '/private-charter', destination: '/private-yacht-charter' },
  { source: '/luxury-sailing', destination: '/private-yacht-charter' },
  { source: '/bachelor-party', destination: '/private-yacht-charter' },
  { source: '/hens-party', destination: '/private-yacht-charter' },
  { source: '/accommodation', destination: '/private-yacht-charter' },
  { source: '/weddings', destination: '/wedding-yacht-charter' },
  { source: '/corporate-event', destination: '/corporate-yacht-charter' },

  // ── Catering & menus ─────────────────────────────────────────────────────
  { source: '/catering', destination: '/yacht-charter-menus' },
  { source: '/menus', destination: '/yacht-charter-menus' },
  { source: '/menus2023', destination: '/yacht-charter-menus' },
  { source: '/cocktail-menu', destination: '/yacht-charter-menus' },
  { source: '/broadwater-bbq-by-boattime', destination: '/yacht-charter-menus' },

  // ── Cruises & ticketing ──────────────────────────────────────────────────
  { source: '/cruise-tickets', destination: '/tickets' },
  {
    source: '/luxury-whale-watching-experience',
    destination: '/cruise-tickets-luxury-whale-watching',
  },
  {
    source: '/cruise-tickets-luxury-whale-watchingold',
    destination: '/cruise-tickets-luxury-whale-watching',
  },
  { source: '/6-reasons-superyacht-whale-tour', destination: '/cruise-tickets-luxury-whale-watching' },
  { source: '/sunset-cruise-gold-coast', destination: '/luxury-broadwater-cruise' },
  { source: '/luxury-broadwater-cruiseold', destination: '/luxury-broadwater-cruise' },
  { source: '/5-reasons-luxury-sunset-cruise', destination: '/luxury-broadwater-cruise' },
  { source: '/summer-vibes-cruise', destination: '/luxury-broadwater-cruise' },

  // ── Seasonal & event pages ───────────────────────────────────────────────
  { source: '/valentines-day-cruise', destination: '/valentines-day' },
  { source: '/valentines-day-cruise-2', destination: '/valentines-day' },
  {
    source: '/valentines-day-superyacht-cruise-gold-coast',
    destination: '/valentines-day',
  },
  { source: '/riverfire-2024', destination: '/riverfire-2026' },
  { source: '/celebrate-new-years-eve-luxury-yacht-charter', destination: '/nye-2027' },
  { source: '/nye-2026', destination: '/nye-2027' },
  { source: '/christmas-chart', destination: '/private-yacht-charter' },

  // ── Contact ──────────────────────────────────────────────────────────────
  { source: '/contact', destination: '/#inquiry' },

  // ── Blog index, its pagination, and the old tag archives ─────────────────
  { source: '/blog', destination: '/boattime-news' },
  { source: '/blog/page/:page', destination: '/boattime-news' },
  { source: '/news', destination: '/boattime-news' },
  { source: '/news/page/:page', destination: '/boattime-news' },
  { source: '/latest-news', destination: '/boattime-news' },
  { source: '/latest-news/page/:page', destination: '/boattime-news' },

  // ── Old articles → the closest article or service page we publish now ────
  {
    source: '/why-should-you-go-for-whale-watching',
    destination: '/boattime-news/luxury-whale-watching-on-the-gold-coast-the-complete-guide',
  },
  {
    source: '/wonders-luxury-whale-watching-cruise',
    destination: '/boattime-news/luxury-whale-watching-on-the-gold-coast-the-complete-guide',
  },
  {
    source: '/whale-watching-gold-coast-best-spots-tours',
    destination:
      '/boattime-news/best-places-to-see-whales-on-the-gold-coast-land-lookouts-vs-whale-watching-cruises',
  },
  {
    source: '/whale-watching-gold-coast-humpback-conservation',
    destination: '/boattime-news/why-humpback-whales-migrate-past-the-gold-coast-every-year',
  },
  {
    source: '/whale-watching-gold-coast-deals-things-to-consider-before-choosing',
    destination: '/boattime-news/how-to-choose-the-best-whale-watching-tour-on-the-gold-coast',
  },
  {
    source: '/guide-planning-dream-luxury-yacht-wedding',
    destination: '/wedding-yacht-charter',
  },
  {
    source: '/planning-perfect-yacht-charter-wedding',
    destination: '/wedding-yacht-charter',
  },
  {
    source:
      '/stunning-wedding-destinations-say-i-do-aboard-a-gold-coast-and-brisbane-yacht-charter',
    destination: '/wedding-yacht-charter',
  },
  {
    source: '/corporate-events-aboard-a-yacht-charter',
    destination: '/corporate-yacht-charter',
  },
  {
    source: '/planning-corporate-event-on-a-superyacht-charter',
    destination: '/corporate-yacht-charter',
  },
  {
    source: '/yacht-based-team-building-activities',
    destination: '/corporate-yacht-charter',
  },
  {
    source: '/an-ultimate-guide-to-celebrating-special-occasions-on-a-private-yacht-charter-2',
    destination: '/private-yacht-charter',
  },
  {
    source: '/elevate-your-bachelor-or-hen-party-on-a-gold-coast-yacht-charter',
    destination: '/private-yacht-charter',
  },
  {
    source: '/milestone-celebration-on-a-superyacht-charter',
    destination: '/private-yacht-charter',
  },
  {
    source: '/plan-your-memorable-special-event-aboard-a-superyacht',
    destination: '/private-yacht-charter',
  },
  {
    source: '/create-family-moments-on-a-superyacht-charter',
    destination: '/private-yacht-charter',
  },
  {
    source: '/water-activities-on-your-superyacht-charter',
    destination: '/private-yacht-charter',
  },
  {
    source: '/cultural-experiences-superyacht-charter',
    destination: '/private-yacht-charter',
  },
  {
    source: '/planning-your-superyacht-charter-adventure',
    destination: '/private-yacht-charter',
  },
  {
    source: '/choose-superyacht-charter-for-gold-coast-getaway',
    destination: '/private-yacht-charter',
  },
  {
    source: '/top-superyacht-features-for-gold-coast-brisbane-charters',
    destination: '/private-yacht-charter',
  },
  { source: '/6-must-do-gold-coast-experiences', destination: '/boattime-news' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return OLD_SITE_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
