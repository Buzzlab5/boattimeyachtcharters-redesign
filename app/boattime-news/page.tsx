import type { Metadata } from 'next';
import { createPublicClient } from '@/lib/supabase/public';
import NewsPage, { type Post } from '@/components/NewsPage';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, BASE_URL, ORG_ID } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Boattime News · Yacht Charter Guides & Stories',
  description:
    "Guides, inspiration, and local knowledge from Gold Coast's premier yacht charter company.",
  alternates: { canonical: `${BASE_URL}/boattime-news` },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${BASE_URL}/boattime-news/#blog`,
  name: 'Boattime News',
  description:
    "Guides, inspiration, and local knowledge from Gold Coast's premier yacht charter company.",
  url: `${BASE_URL}/boattime-news`,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-AU',
};

// The index lists published articles, so it caches on the same terms as the
// articles themselves. See the note in [slug]/page.tsx for the measurement.
export const revalidate = 60;

export default async function Page() {
  console.log('[boattime-news] fetching published posts');

  let posts: Post[] = [];

  try {
    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, title, excerpt, image_url, categories, published_at, created_at, reading_time')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.log('[boattime-news] fetch error', error.message);
    } else {
      posts = (data as Post[]) ?? [];
      console.log('[boattime-news] loaded', posts.length, 'posts');
    }
  } catch (err) {
    console.log('[boattime-news] client error', err);
  }

  return (
    <>
      <JsonLd
        schemas={[
          blogSchema,
          breadcrumbSchema([{ name: 'Boattime News', path: '/boattime-news' }]),
        ]}
      />
      <NewsPage posts={posts} />
    </>
  );
}
