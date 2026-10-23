import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPublicClient } from '@/lib/supabase/public';
import ArticlePage from '@/components/ArticlePage';
import GoogleAdsTag from '@/components/GoogleAdsTag';
import { breadcrumbSchema } from '@/lib/schema';

/**
 * Articles are cached at the edge and revalidated, not rendered per request.
 *
 * With `dynamic = 'force-dynamic'` every article answered every request with a
 * live Supabase query and shipped `cache-control: no-store`, so the edge cache
 * missed every time. Measured against the live site on 23 October 2026, three
 * runs per URL, median of each:
 *
 *   static prerendered pages   159 ms to first byte, x-vercel-cache: HIT
 *   articles                  1108 ms to first byte, x-vercel-cache: MISS
 *                             slowest 1566 ms
 *
 * Seven times slower, on 39 of the 59 URLs in the sitemap.
 *
 * `revalidate = 60` keeps the CMS feeling live, since an edit appears within a
 * minute, while turning almost every request into a cache hit. Raise it if a
 * minute is tighter than the editors need.
 */
export const revalidate = 60;

const BASE_URL = 'https://www.boattimeyachtcharters.com';
const FALLBACK_OG = `${BASE_URL}/sun-goddess-main-upscale.png`;

// Artikel yang memakai Google Ads tag (AW-18035686182)
const GOOGLE_ADS_SLUGS = [
  'can-children-go-whale-watching-on-the-gold-coast-a-family-guide',
  'best-time-for-whale-watching-on-the-gold-coast-a-month-by-month-guide',
  'what-are-your-chances-of-seeing-whales-on-the-gold-coast',
];

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Prerender every published article at build time.
 *
 * If the build cannot reach Supabase this returns an empty list rather than
 * failing the build: `dynamicParams` is true by default, so those pages render
 * on first request and are cached from then on.
 */
export async function generateStaticParams() {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('posts')
      .select('slug')
      .eq('published', true);
    return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────

const BRAND_SUFFIXES = [
  '| Boattime Yacht Charters',
  '· Boattime Yacht Charters',
  '— Boattime Yacht Charters',
  '| Boattime',
  '· Boattime News',
];

function stripBrandSuffix(title: string): string {
  let out = title.trim();
  for (const suffix of BRAND_SUFFIXES) {
    if (out.endsWith(suffix)) out = out.slice(0, -suffix.length).trim();
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('posts')
      .select('title, excerpt, meta_title, meta_description, image_url, image_alt, og_title, og_description, canonical_url, published_at, tags, author')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (data) {
      // The root layout's template already appends "| Boattime", so strip any
      // brand the editor typed into meta_title and don't add a second suffix —
      // otherwise the title reads "… | Boattime Yacht Charters · Boattime News
      // | Boattime" and Google truncates it well before the useful words.
      const pageTitle = stripBrandSuffix(data.meta_title || data.title);
      const pageDesc = data.meta_description || data.excerpt || '';
      const canonicalUrl = data.canonical_url || `${BASE_URL}/boattime-news/${slug}`;
      const ogImage = data.image_url || FALLBACK_OG;
      const ogTitle = data.og_title || data.meta_title || data.title;
      const ogDesc = data.og_description || data.meta_description || data.excerpt || '';

      return {
        title: pageTitle,
        description: pageDesc,
        keywords: data.tags?.length ? data.tags.join(', ') : undefined,
        alternates: { canonical: canonicalUrl },
        openGraph: {
          type: 'article',
          url: canonicalUrl,
          title: ogTitle,
          description: ogDesc,
          publishedTime: data.published_at ?? undefined,
          authors: [data.author || 'Boattime Yacht Charters'],
          images: [{ url: ogImage, width: 1200, height: 630, alt: data.image_alt || data.title }],
        },
        twitter: {
          card: 'summary_large_image',
          title: ogTitle,
          description: ogDesc,
          images: [ogImage],
        },
      };
    }
  } catch {}
  return { title: 'Boattime News' };
}

// ── JSON-LD helpers ───────────────────────────────────────────────────────────

type PostData = {
  title: string;
  meta_title?: string | null;
  meta_description?: string | null;
  excerpt?: string | null;
  content?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  published_at?: string | null;
  created_at: string;
  updated_at?: string | null;
  author?: string | null;
  tags?: string[] | null;
  schema_types?: string[] | null;
};

function extractFAQ(html: string): { q: string; a: string }[] {
  const pairs: { q: string; a: string }[] = [];
  const parts = html.split(/(<h[23][^>]*>.*?<\/h[23]>)/i);
  for (let i = 0; i < parts.length - 1; i++) {
    const heading = parts[i].match(/^<h[23][^>]*>(.*?)<\/h[23]>$/i);
    if (heading) {
      const q = heading[1].replace(/<[^>]+>/g, '').trim();
      const paraMatch = parts[i + 1].match(/<p[^>]*>(.*?)<\/p>/i);
      const a = paraMatch ? paraMatch[1].replace(/<[^>]+>/g, '').trim() : '';
      if (q && a) pairs.push({ q, a });
    }
  }
  return pairs.slice(0, 10);
}

function buildSchemas(post: PostData, slug: string) {
  const pageUrl = `${BASE_URL}/boattime-news/${slug}`;
  const types = post.schema_types?.length ? post.schema_types : ['Article'];
  const schemas = [];

  if (types.includes('Article')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      image: post.image_url || FALLBACK_OG,
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at || post.published_at || post.created_at,
      author: { '@type': 'Organization', name: post.author || 'Boattime Yacht Charters', url: BASE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'Boattime Yacht Charters',
        url: BASE_URL,
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/boattime-logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      keywords: post.tags?.join(', ') || undefined,
    });
  }

  if (types.includes('FAQPage')) {
    const faqItems = extractFAQ(post.content || '');
    if (faqItems.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      });
    }
  }

  // No LocalBusiness block here. The root layout emits the business on every
  // page with a stable @id; repeating it without one made 22 articles declare
  // two separate businesses, which Google can read as two different operators.
  // A post's `schema_types` may still list 'LocalBusiness' — it is satisfied by
  // the layout's block, so nothing is lost.

  return schemas;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Page({ params }: Props) {
  const { slug } = await params;
  console.log('[article] fetching slug', slug);

  try {
    const supabase = createPublicClient();
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !post) {
      console.log('[article] not found', slug);
      notFound();
    }

    console.log('[article] loaded', post.title);

    const schemas = [
      ...buildSchemas(post as PostData, slug),
      breadcrumbSchema([
        { name: 'Boattime News', path: '/boattime-news' },
        { name: post.title, path: `/boattime-news/${slug}` },
      ]),
    ];

    // Fetch up to 3 related posts from the same categories
    const categories = (post.categories as string[]) ?? [];
    let relatedPosts: {
      id: string; slug: string; title: string; image_url: string | null;
      categories: string[]; published_at: string | null; reading_time: number;
    }[] = [];
    if (categories.length > 0) {
      const { data: related } = await supabase
        .from('posts')
        .select('id, slug, title, image_url, categories, published_at, reading_time')
        .eq('published', true)
        .neq('slug', slug)
        .overlaps('categories', categories)
        .order('published_at', { ascending: false })
        .limit(3);
      relatedPosts = related ?? [];
    }

    return (
      <>
        {GOOGLE_ADS_SLUGS.includes(slug) && <GoogleAdsTag />}
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <ArticlePage post={post} relatedPosts={relatedPosts} />
      </>
    );
  } catch {
    notFound();
  }
}
