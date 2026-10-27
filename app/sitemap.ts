import type { MetadataRoute } from 'next';
import { createPublicClient } from '@/lib/supabase/public';

const BASE_URL = 'https://www.boattimeyachtcharters.com';

export const revalidate = 3600;

/**
 * `lastModified` is a real date per route, not `new Date()`.
 *
 * Every static route used to report "modified just now" on every build, and
 * this file revalidates hourly, so all 20 pages claimed a fresh change every
 * hour forever. Google learns to ignore `lastmod` from a sitemap that does
 * that, which costs the pages that genuinely did change.
 *
 * When you edit a page, change its date here in the same commit.
 */
const staticRoutes: Array<{
  path: string;
  lastModified: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '', lastModified: '2026-10-23', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/private-yacht-charter', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/corporate-yacht-charter', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/wedding-yacht-charter', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/luxury-broadwater-cruise', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cruise-tickets-luxury-whale-watching', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/buffet-dinner-and-lunch-cruise', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.8 },
  {
    path: '/relaxed-lunch-cruise-flavours-of-australia-aboard-the-mermaid-spirit',
    lastModified: '2026-10-23',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/sunset-twilight-buffet-flavours-of-australia-aboard-the-mermaid-spirit',
    lastModified: '2026-10-23',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  { path: '/sun-goddess-gold-coast', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/mermaid-spirit-gold-coast', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/yacht-charter-menus', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/tickets', lastModified: '2026-10-13', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/boattime-news', lastModified: '2026-10-13', changeFrequency: 'daily', priority: 0.7 },
  { path: '/humpbackhelitours', lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/gallery', lastModified: '2026-10-27', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/nye-2027', lastModified: '2026-10-27', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/riverfire-2026', lastModified: '2026-10-13', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/valentines-day', lastModified: '2026-10-13', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/industry-partnership', lastModified: '2026-10-13', changeFrequency: 'monthly', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = createPublicClient();
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, published_at, created_at')
      .eq('published', true);

    newsEntries = (posts ?? []).map((post) => ({
      url: `${BASE_URL}/boattime-news/${post.slug}`,
      lastModified: new Date(post.published_at ?? post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch {
    newsEntries = [];
  }

  return [...staticEntries, ...newsEntries];
}
