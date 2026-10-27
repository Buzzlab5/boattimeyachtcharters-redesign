'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteShell from './site/SiteShell';
import { Icon } from './Shared';
import { PRODUCTS, fallbackProductIds } from '@/lib/products';
import { VESSEL_LINKS } from '@/lib/vessels';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  categories: string[];
  published_at: string | null;
  created_at: string;
  updated_at?: string | null;
  reading_time?: number;
  author?: string;
  related_products?: string[];
  tags?: string[];
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  image_url: string | null;
  categories: string[];
  published_at: string | null;
  reading_time?: number;
}

function fmtDate(dateStr: string | null | undefined) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtDateShort(dateStr: string | null | undefined) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Left sidebar: Related products ────────────────────────────────────────────

function ProductSidebar({ productIds }: { productIds: string[] }) {
  const items = PRODUCTS.filter(p => productIds.includes(p.id));

  return (
    <aside className="article-sidebar">
      {items.length > 0 && (
        <>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
            Related Experiences
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map(product => (
              <a key={product.id} href={product.href} style={{ textDecoration: 'none', display: 'block', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{product.sub}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.25, marginBottom: 10 }}>{product.label}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  View experience <Icon name="arrow" size={8} color="var(--gold)" />
                </div>
              </a>
            ))}
          </div>
        </>
      )}
      {/* The fleet. Always shown: both vessel pages received zero in-body
          links from any of the 39 published articles, and Google answers both
          vessel-name queries with the homepage rather than the vessel page.
          See VESSEL_LINKS in lib/vessels.ts. */}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 8,
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginTop: items.length > 0 ? 36 : 0,
          marginBottom: 20,
          paddingBottom: 12,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        The Fleet
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {VESSEL_LINKS.map(vessel => (
          <a
            key={vessel.id}
            href={vessel.href}
            style={{ textDecoration: 'none', display: 'block', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
              {vessel.sub}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.3 }}>
              {vessel.label}
            </div>
          </a>
        ))}
      </div>
    </aside>
  );
}

// ── Right sidebar: You might also like ───────────────────────────────────────

function RelatedSidebar({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return <aside className="article-sidebar" />;

  return (
    <aside className="article-sidebar">
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 8,
        letterSpacing: '0.36em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 20,
        paddingBottom: 12,
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        You Might Also Like
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {posts.map(post => (
          <a
            key={post.id}
            href={`/boattime-news/${post.slug}`}
            style={{ textDecoration: 'none', display: 'block', paddingBottom: 20, marginBottom: 4, borderBottom: '1px solid var(--border-subtle)' }}
          >
            {post.image_url && (
              <div style={{
                width: '100%',
                height: 130,
                backgroundImage: `url(${post.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: 12,
              }} />
            )}
            {post.categories?.[0] && (
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 7,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 6,
              }}>
                {post.categories[0]}
              </div>
            )}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 15,
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.3,
              marginBottom: 8,
            }}>
              {post.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
            }}>
              {fmtDateShort(post.published_at)}
              {post.reading_time ? ` · ${post.reading_time} min read` : ''}
            </div>
          </a>
        ))}
      </div>
    </aside>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function ArticleHero({ post }: { post: Post }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(bgRef.current, { scale: 1.06 }, { scale: 1, duration: 12, ease: 'none' });
    gsap.from(textRef.current!.querySelectorAll('.hr'), {
      y: 28, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'power2.out', delay: 0.1,
    });
    gsap.to(bgRef.current, {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: heroRef });

  // Only show "Updated" once a real edit happened after it first went live
  const publishedOn = post.published_at ?? post.created_at;
  const showUpdated =
    !!post.updated_at && new Date(post.updated_at).getTime() > new Date(publishedOn).getTime() + 60_000;

  return (
    <section ref={heroRef} className="relative overflow-hidden flex items-end on-photo" style={{ minHeight: '65vh', background: 'var(--navy)' }}>
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ backgroundImage: `url(${post.image_url || FALLBACK_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.6) 45%, rgba(10,22,40,0.15) 100%)' }} />
      <div ref={textRef} style={{ position: 'relative', zIndex: 2, padding: '0 48px 72px', maxWidth: 900 }}>
        <div className="hr" style={{ marginBottom: 20 }}>
          <a href="/boattime-news" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={10} color="var(--gold)" /></span>
            Boattime News
          </a>
        </div>
        <div className="hr" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {(post.categories ?? []).map(cat => (
            <span key={cat} style={{ fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--gold)', padding: '3px 12px', fontWeight: 600 }}>{cat}</span>
          ))}
        </div>
        <h1 className="hr" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 62px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.1, margin: '0 0 20px' }}>
          {post.title}
        </h1>
        <div className="hr" style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(245,240,232,0.55)', letterSpacing: '0.12em' }}>
          <span>{fmtDate(post.published_at ?? post.created_at)}</span>
          {showUpdated ? (
            <><span style={{ width: 1, height: 12, background: 'rgba(201,168,76,0.3)' }} /><span>Updated {fmtDate(post.updated_at)}</span></>
          ) : null}
          {post.reading_time && post.reading_time > 0 ? (
            <><span style={{ width: 1, height: 12, background: 'rgba(201,168,76,0.3)' }} /><span>{post.reading_time} min read</span></>
          ) : null}
          <span style={{ width: 1, height: 12, background: 'rgba(201,168,76,0.3)' }} />
          <span>{post.author || 'Boattime Yacht Charters'}</span>
        </div>
      </div>
    </section>
  );
}

// ── Article body ──────────────────────────────────────────────────────────────

function ArticleBody({ post, relatedPosts }: { post: Post; relatedPosts: RelatedPost[] }) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Load Instagram embed.js when the article contains Instagram embeds
  useEffect(() => {
    if (!post.content?.includes('instagram-media')) return;
    const w = window as Window & { instgrm?: { Embeds: { process: () => void } } };
    if (w.instgrm) { w.instgrm.Embeds.process(); return; }
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.contains(script) && document.body.removeChild(script); };
  }, [post.content]);

  // Track views — fires once per article load. The API route logs the visitor's
  // approximate location and bumps the views counter in one server-side call.
  useEffect(() => {
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: post.slug }),
    }).catch((err) => console.warn('[views] track failed:', err));
  }, [post.slug]);

  useGSAP(() => {
    gsap.from(contentRef.current, {
      y: 30, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: contentRef.current, start: 'top 85%', once: true },
    });
  }, { scope: contentRef });

  // A hand-picked set in the CMS always wins, but only the ids that still
  // resolve to a shown product count as a pick.
  //
  // Three products are hidden while DINING_CRUISES_AVAILABLE is false, and the
  // dining articles are exactly the ones whose hand-picked set is made of
  // those three. A non-empty array of hidden ids used to pass the length test
  // and then filter to nothing, so those articles rendered an empty rail: the
  // same fault #10 set out to fix, on the articles least able to afford it,
  // since their own product is not on sale. Caught by the live verification in
  // the Asri record rather than by review.
  const picked = (post.related_products ?? []).filter(id =>
    PRODUCTS.some(p => p.id === id),
  );
  const productIds = picked.length > 0 ? picked : fallbackProductIds(post);

  return (
    <div style={{ background: 'var(--navy)' }}>
      <div className="article-grid">
        {/* Left: Related products (selected by admin) */}
        <ProductSidebar productIds={productIds} />

        {/* Centre: Article content */}
        <div ref={contentRef}>
          {post.excerpt && (
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.2vw, 24px)', fontStyle: 'italic', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.5, marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--border-subtle)' }}>
              {post.excerpt}
            </p>
          )}
          {post.content ? (
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.85 }}
            />
          ) : (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)' }}>No content yet.</p>
          )}
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
            <a href="/boattime-news" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
              <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={10} color="var(--gold)" /></span>
              Back to all articles
            </a>
          </div>
        </div>

        {/* Right: Auto-recommended related articles */}
        <RelatedSidebar posts={relatedPosts} />
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ArticlePage({ post, relatedPosts }: { post: Post; relatedPosts: RelatedPost[] }) {
  return (
    <>
      <SiteShell>
        <ArticleHero post={post} />
        <ArticleBody post={post} relatedPosts={relatedPosts} />
      </SiteShell>
    </>
  );
}
