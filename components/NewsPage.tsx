'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteShell from './site/SiteShell';
import PageHero from './site/PageHero';
import { Icon } from './Shared';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'All',
  'Business',
  'Celebration',
  'Company',
  'Holiday Cruises',
  'Lifestyle',
  'Luxury Whale Watching',
  'Luxury Yacht Hire',
  'Sunset Cruises',
  'Yacht Charter Wedding',
];

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  categories: string[];
  published_at: string | null;
  created_at: string;
  reading_time?: number;
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80';

function fmtDate(dateStr: string | null | undefined) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const POSTS_PER_PAGE = 9;

// ── Hero ──────────────────────────────────────────────────────────────────────

function NewsHero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(bgRef.current, { scale: 1.06 }, { scale: 1, duration: 12, ease: 'none' });
      gsap.from(textRef.current!.querySelectorAll('.hr'), {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.15,
      });
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex items-end news-hero-section"
      style={{ minHeight: '60vh', background: 'var(--navy)' }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.55) 50%, rgba(10,22,40,0.2) 100%)',
        }}
      />
      <div
        ref={textRef}
        style={{ position: 'relative', zIndex: 2, padding: '0 48px 72px', maxWidth: 800 }}
      >
        <div
          className="hr"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 16,
          }}
        >
          Boattime News
        </div>
        <h1
          className="hr"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 72px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f5f0e8',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Stories from the water
        </h1>
        <p
          className="hr"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.8,
            marginTop: 20,
            maxWidth: 480,
          }}
        >
          Guides, inspiration, and local knowledge from Gold Coast&rsquo;s premier yacht charter
          company.
        </p>
      </div>
    </section>
  );
}

// ── Featured card ─────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/boattime-news/${post.slug}`}
      className="feat-card"
      style={{
        display: 'block',
        textDecoration: 'none',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'var(--border-subtle)'}`,
        overflow: 'hidden',
        transition: 'border-color 0.3s',
        background: 'var(--navy)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${post.image_url || FALLBACK_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: 16,
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          {post.categories.map((cat) => (
            <span
              key={cat}
              className="news-cat-label"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 8,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                padding: '3px 10px',
                fontWeight: 600,
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: '24px 24px 28px' }}>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 10,
          }}
        >
          {fmtDate(post.published_at ?? post.created_at)}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 21,
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--cream)',
            lineHeight: 1.3,
            margin: '0 0 12px',
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            margin: '0 0 20px',
          }}
        >
          {post.excerpt}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 600,
          }}
        >
          Read more <Icon name="arrow" size={10} color="var(--gold)" />
        </div>
      </div>
    </a>
  );
}

// ── Featured section ──────────────────────────────────────────────────────────

function FeaturedPosts({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll('.feat-card'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div style={{ background: 'var(--navy)' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 48px 56px' }}>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 32,
          }}
        >
          Featured Articles
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 24 }}
        >
          {posts.map((post) => (
            <FeaturedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Category filter ───────────────────────────────────────────────────────────

function CategoryFilter({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (cat: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Stick exactly under the site header. Its height changes (taller at the top of the
  // page, shorter once scrolled), so a fixed `top` left a gap or tucked the bar under it.
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const update = () => setStickyTop(header.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  function scrollByAmount(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  }

  return (
    <div
      style={{
        background: 'var(--navy)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: stickyTop,
        zIndex: 30,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '18px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <ScrollArrow direction="left" onClick={() => scrollByAmount(-240)} />
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            minWidth: 0,
            overflowX: 'auto',
            display: 'flex',
            gap: 8,
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === active;
            return (
              <FilterPill
                key={cat}
                label={cat}
                isActive={isActive}
                onSelect={() => onSelect(cat)}
              />
            );
          })}
        </div>
        <ScrollArrow direction="right" onClick={() => scrollByAmount(240)} />
      </div>
    </div>
  );
}

function ScrollArrow({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={direction === 'left' ? 'Scroll categories left' : 'Scroll categories right'}
      style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: `1px solid ${hovered ? 'var(--gold)' : 'rgba(201,168,76,0.25)'}`,
        background: 'var(--navy)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
    >
      <span
        style={{
          display: 'flex',
          transform: direction === 'left' ? 'rotate(180deg)' : undefined,
        }}
      >
        <Icon name="chevron" size={12} color={hovered ? 'var(--gold)' : 'var(--text-muted)'} />
      </span>
    </button>
  );
}

function FilterPill({
  label,
  isActive,
  onSelect,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={isActive ? 'filter-pill filter-pill--active' : 'filter-pill'}
      style={{
        flexShrink: 0,
        fontFamily: 'var(--font-body)',
        fontSize: 9,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        fontWeight: 500,
        padding: '8px 18px',
        border: isActive ? undefined : `1px solid ${hovered ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
        background: isActive ? undefined : 'transparent',
        color: isActive ? undefined : hovered ? 'var(--cream)' : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

// ── Post card (horizontal) ────────────────────────────────────────────────────

function PostCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/boattime-news/${post.slug}`}
      className="post-card post-card-link"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'var(--border-subtle)'}`,
        overflow: 'hidden',
        transition: 'border-color 0.3s',
        background: 'var(--navy)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mobile thumbnail — full width at top */}
      <div
        className="block sm:hidden"
        style={{ height: 180, flexShrink: 0, position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${post.image_url || FALLBACK_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      {/* Desktop thumbnail — side column */}
      <div
        className="hidden sm:block"
        style={{ width: 210, flexShrink: 0, position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${post.image_url || FALLBACK_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {fmtDate(post.published_at ?? post.created_at)}
            </div>
            {post.reading_time && post.reading_time > 0 ? (
              <>
                <div style={{ width: 1, height: 12, background: 'rgba(201,168,76,0.2)' }} />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                  {post.reading_time} min read
                </div>
              </>
            ) : null}
            <div style={{ width: 1, height: 12, background: 'rgba(201,168,76,0.2)' }} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 8,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--cream)',
              lineHeight: 1.3,
              margin: '0 0 12px',
            }}
          >
            {post.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {post.excerpt}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 600,
            marginTop: 20,
          }}
        >
          Read more <Icon name="arrow" size={10} color="var(--gold)" />
        </div>
      </div>
    </a>
  );
}

// ── Post grid + pagination ────────────────────────────────────────────────────

function PostGrid({
  posts,
  page,
  total,
  onPageChange,
}: {
  posts: Post[];
  page: number;
  total: number;
  onPageChange: (p: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.from(ref.current.querySelectorAll('.post-card'), {
        x: -16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref, dependencies: [posts] },
  );

  return (
    <div style={{ background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 48px 96px' }}>
        {/* Section label */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 9,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 32,
          }}
        >
          All Articles
        </div>

        {posts.length === 0 ? (
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--text-muted)',
              padding: '48px 0',
            }}
          >
            No articles in this category yet.
          </div>
        ) : (
          <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              marginTop: 56,
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationBtn
                key={p}
                label={String(p)}
                isActive={p === page}
                onClick={() => onPageChange(p)}
              />
            ))}
            {page < totalPages && (
              <button
                onClick={() => onPageChange(page + 1)}
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid rgba(201,168,76,0.2)',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Icon name="arrow" size={12} color="var(--gold)" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PaginationBtn({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40,
        height: 40,
        border: `1px solid ${isActive ? 'var(--gold)' : hovered ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
        background: isActive ? 'var(--gold)' : 'transparent',
        color: isActive ? '#0a1628' : hovered ? 'var(--cream)' : 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        letterSpacing: '0.1em',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function NewsPage({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  const featured = posts.slice(0, 3);

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.categories.includes(activeCategory));

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <>
      <SiteShell>
        <PageHero
          image="/sunset-boat.jpg"
          imageAlt="Sunset over the Gold Coast from a Boattime deck"
          eyebrow="Boattime News"
          title={<>Stories from the <em>water</em></>}
          lead="Guides, inspiration, and local knowledge from Gold Coast's premier yacht charter company."
        />
        <div className="st-zigzag st-legacy">
        {featured.length > 0 && <FeaturedPosts posts={featured} />}
        <CategoryFilter active={activeCategory} onSelect={handleCategorySelect} />
        <PostGrid
          posts={paginatedPosts}
          page={page}
          total={filteredPosts.length}
          onPageChange={setPage}
        />
      </div>
      </SiteShell>
    </>
  );
}
