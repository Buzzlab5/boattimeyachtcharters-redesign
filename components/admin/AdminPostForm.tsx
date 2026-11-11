'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import RichEditor from './RichEditor';
import { PRODUCTS } from '@/lib/products';

const ALL_CATEGORIES = [
  'Business', 'Celebration', 'Company', 'Holiday Cruises', 'Lifestyle',
  'Luxury Whale Watching', 'Luxury Yacht Hire', 'Sunset Cruises', 'Yacht Charter Wedding',
];

const SCHEMA_OPTIONS = [
  { value: 'Article', label: 'Article', desc: 'Default — all blog posts' },
  { value: 'FAQPage', label: 'FAQ Page', desc: 'Articles with Q&A sections' },
  { value: 'LocalBusiness', label: 'Local Business', desc: 'Location-based content' },
];

interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  image_alt: string;
  categories: string[];
  tags: string[];
  published: boolean;
  published_at: string | null;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  canonical_url: string;
  schema_types: string[];
  og_title: string;
  og_description: string;
  author: string;
  updated_at: string | null;
  reading_time: number;
  related_products: string[];
}

const empty: PostForm = {
  title: '', slug: '', excerpt: '', content: '', image_url: '', image_alt: '',
  categories: [], tags: [], published: false, published_at: null,
  meta_title: '', meta_description: '', focus_keyword: '', canonical_url: '',
  schema_types: ['Article'], og_title: '', og_description: '',
  author: 'Boattime Yacht Charters Editorial', updated_at: null, reading_time: 0,
  related_products: [],
};

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function calcReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
}

function checkKeyword(kw: string, title: string, metaTitle: string, content: string) {
  if (!kw.trim()) return null;
  const k = kw.toLowerCase();
  const titleText = (metaTitle || title).toLowerCase();
  const firstPara = stripHtml(content).slice(0, 400);
  const h2Text = [...content.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').toLowerCase()).join(' ');
  return {
    inTitle: titleText.includes(k),
    inFirstPara: firstPara.includes(k),
    inHeading: h2Text.includes(k),
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function CharCounter({ current, max }: { current: number; max: number }) {
  const over = current > max;
  const warn = current > max * 0.85;
  return (
    <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: over ? '#e07070' : warn ? '#c9a84c' : 'var(--text-muted)', marginLeft: 8 }}>
      {current}/{max}
    </span>
  );
}

function TagInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState('');

  function addTag(val: string) {
    const tag = val.trim().toLowerCase().replace(/,/g, '');
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input); }
    else if (e.key === 'Backspace' && !input && tags.length > 0) onChange(tags.slice(0, -1));
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', minHeight: 44 }}>
      {tags.map(tag => (
        <span key={tag} className="tag-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.08em' }}>
          {tag}
          <button type="button" onClick={() => onChange(tags.filter(t => t !== tag))} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: 15 }}>×</button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={tags.length === 0 ? 'Type a tag, press Enter…' : ''}
        style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 13, flex: 1, minWidth: 120 }}
      />
    </div>
  );
}

function fmtStamp(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function Stamp({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: value ? 'var(--cream)' : 'var(--text-muted)' }}>
        {value ?? '—'}
      </div>
    </div>
  );
}

function KwCheck({ label, ok }: { label: string; ok: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.1em', color: ok ? '#5cb85c' : 'var(--text-muted)' }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: ok ? 1 : 0.3 }}>
        {ok ? <polyline points="20 6 9 17 4 12" /> : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
      </svg>
      {label}
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AdminPostForm({ params }: { params?: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = params ? use(params) : null;
  const postId = resolvedParams?.id ?? null;
  const isEdit = !!postId;

  const [form, setForm] = useState<PostForm>(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!postId) return;
    console.log('[AdminPostForm] loading post', postId);
    const supabase = createClient();
    supabase.from('posts').select('*').eq('id', postId).single().then(({ data, error: err }) => {
      if (err || !data) {
        setError('Could not load article.');
      } else {
        setForm({
          title: data.title ?? '',
          slug: data.slug ?? '',
          excerpt: data.excerpt ?? '',
          content: data.content ?? '',
          image_url: data.image_url ?? '',
          image_alt: data.image_alt ?? '',
          categories: data.categories ?? [],
          tags: data.tags ?? [],
          published: data.published ?? false,
          published_at: data.published_at ?? null,
          meta_title: data.meta_title ?? '',
          meta_description: data.meta_description ?? '',
          focus_keyword: data.focus_keyword ?? '',
          canonical_url: data.canonical_url ?? '',
          schema_types: data.schema_types ?? ['Article'],
          og_title: data.og_title ?? '',
          og_description: data.og_description ?? '',
          author: data.author ?? 'Boattime Yacht Charters Editorial',
          updated_at: data.updated_at ?? null,
          reading_time: data.reading_time ?? 0,
          related_products: data.related_products ?? [],
        });
      }
      setLoading(false);
      console.log('[AdminPostForm] post loaded');
    });
  }, [postId]);

  function set<K extends keyof PostForm>(key: K, val: PostForm[K]) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleTitleChange(val: string) {
    setForm(f => ({ ...f, title: val, slug: isEdit ? f.slug : slugify(val) }));
  }

  function toggleCategory(cat: string) {
    setForm(f => ({ ...f, categories: f.categories.includes(cat) ? f.categories.filter(c => c !== cat) : [...f.categories, cat] }));
  }

  function toggleProduct(id: string) {
    setForm(f => ({ ...f, related_products: f.related_products.includes(id) ? f.related_products.filter(p => p !== id) : [...f.related_products, id] }));
  }

  function toggleSchema(val: string) {
    setForm(f => ({ ...f, schema_types: f.schema_types.includes(val) ? f.schema_types.filter(s => s !== val) : [...f.schema_types, val] }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    console.log('[AdminPostForm] uploading image', file.name);
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from('news-images').upload(filename, file, { upsert: true });
    if (upErr) { setError(`Image upload failed: ${upErr.message}`); setUploading(false); return; }
    const { data } = supabase.storage.from('news-images').getPublicUrl(filename);
    set('image_url', data.publicUrl);
    setUploading(false);
    console.log('[AdminPostForm] image uploaded', data.publicUrl);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) { setError('Title and slug are required.'); return; }
    setSaving(true);
    setError('');
    console.log('[AdminPostForm] saving post');

    const supabase = createClient();
    const readingTime = calcReadingTime(form.content);
    const now = new Date().toISOString();

    // Timestamps are automatic:
    //  · published_at  = the moment it went live the FIRST time, then never changes
    //  · updated_at    = the moment of this save, but only once it's been live before
    const firstPublish = form.published && !form.published_at;
    const publishedAt = form.published ? (form.published_at || now) : form.published_at;
    const updatedAt = isEdit && form.published_at && !firstPublish ? now : null;

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      image_url: form.image_url,
      image_alt: form.image_alt,
      categories: form.categories,
      tags: form.tags,
      published: form.published,
      published_at: publishedAt,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      focus_keyword: form.focus_keyword || null,
      canonical_url: form.canonical_url || null,
      schema_types: form.schema_types.length > 0 ? form.schema_types : ['Article'],
      og_title: form.og_title || null,
      og_description: form.og_description || null,
      author: form.author || 'Boattime Yacht Charters Editorial',
      updated_at: updatedAt,
      reading_time: readingTime,
      related_products: form.related_products,
    };

    const { error: err } = isEdit
      ? await supabase.from('posts').update(payload).eq('id', postId)
      : await supabase.from('posts').insert(payload);

    if (err) {
      setError(err.message);
      setSaving(false);
      console.log('[AdminPostForm] save error', err.message);
    } else {
      console.log('[AdminPostForm] saved successfully');
      router.push('/admin/news');
    }
  }

  const readingTime = calcReadingTime(form.content);
  const kwResult = checkKeyword(form.focus_keyword, form.title, form.meta_title, form.content);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)' }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, letterSpacing: '0.02em' }}>
            <span style={{ color: 'var(--gold)' }}>Boat</span><span style={{ color: 'var(--cream)' }}>Time</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)' }}>News CMS</div>
        </div>
        <button onClick={() => router.push('/admin/news')} style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 48px 96px' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
          {isEdit ? 'Edit article' : 'New article'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontStyle: 'italic', fontWeight: 300, color: 'var(--cream)', margin: '0 0 40px' }}>
          {isEdit ? 'Edit article' : 'Create new article'}
        </h1>

        <form onSubmit={handleSave} className="admin-form" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* ── ARTICLE INFO ── */}
          <Section title="Article">
            <div>
              <label style={labelStyle}>Title *</label>
              <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} required placeholder="e.g. Luxury Whale Watching Gold Coast: Your Complete Guide" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Slug * (URL path)</label>
              <input type="text" value={form.slug} onChange={e => set('slug', slugify(e.target.value))} required style={inputStyle} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>/boattime-news/{form.slug || '…'}</div>
            </div>
            <div>
              <label style={labelStyle}>Author</label>
              <input type="text" value={form.author} onChange={e => set('author', e.target.value)} placeholder="Boattime Yacht Charters Editorial" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Categories</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                {ALL_CATEGORIES.map(cat => {
                  const active = form.categories.includes(cat);
                  return (
                    <button key={cat} type="button" onClick={() => toggleCategory(cat)} style={{ padding: '7px 16px', border: `1px solid ${active ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--navy)' : 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Tags <span style={{ color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'none', fontSize: 10 }}>— keyword labels (press Enter to add)</span></label>
              <TagInput tags={form.tags} onChange={tags => set('tags', tags)} />
            </div>
            <div>
              <label style={labelStyle}>Related products <span style={{ color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'none', fontSize: 10 }}>— shown in the left sidebar of the article</span></label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                {PRODUCTS.map(product => {
                  const active = form.related_products.includes(product.id);
                  return (
                    <button key={product.id} type="button" onClick={() => toggleProduct(product.id)} style={{ padding: '7px 16px', border: `1px solid ${active ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`, background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--navy)' : 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {product.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Section>

          {/* ── CONTENT ── */}
          <Section title="Content">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Article body</label>
                {form.content && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    ~{readingTime} min read
                  </span>
                )}
              </div>
              <RichEditor value={form.content} onChange={val => set('content', val)} />
            </div>
            <div>
              <label style={labelStyle}>Excerpt <span style={{ color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'none', fontSize: 10 }}>— shown on article listing cards (not in Google)</span></label>
              <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={3} placeholder="Short teaser shown on the blog index page…" style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </Section>

          {/* ── FEATURED IMAGE ── */}
          <Section title="Featured Image">
            <div>
              <label style={labelStyle}>Article image</label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 22px', border: '1px solid var(--border-subtle)', color: uploading ? 'var(--text-muted)' : 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: uploading ? 'not-allowed' : 'pointer', marginBottom: 12, background: 'rgba(255,255,255,0.03)' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ display: 'none' }} />
                {uploading ? 'Uploading…' : 'Upload from computer'}
              </label>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.14em', marginBottom: 8 }}>Or paste an image URL</div>
              <input type="text" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://…" style={inputStyle} />
              {form.image_url && (
                <div style={{ marginTop: 12, height: 180, backgroundImage: `url(${form.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid var(--border-subtle)' }} />
              )}
            </div>
            <div>
              <label style={labelStyle}>Image alt text <span style={{ color: 'rgba(201,168,76,0.6)', fontWeight: 400 }}>— SEO signal for Google Images</span></label>
              <input type="text" value={form.image_alt} onChange={e => set('image_alt', e.target.value)} placeholder="e.g. Humpback whale breaching next to Sun Goddess superyacht, Gold Coast" style={inputStyle} />
            </div>
          </Section>

          {/* ── SEO ── */}
          <Section title="SEO Settings">
            <div>
              <label style={labelStyle}>
                Meta title <CharCounter current={form.meta_title.length} max={60} />
              </label>
              <input type="text" value={form.meta_title} onChange={e => set('meta_title', e.target.value)} maxLength={80} placeholder="e.g. Luxury Whale Watching Gold Coast | Boattime Yacht Charters" style={inputStyle} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Appears in Google search results & browser tab. If blank, defaults to article title.</div>
            </div>
            <div>
              <label style={labelStyle}>
                Meta description <CharCounter current={form.meta_description.length} max={160} />
              </label>
              <textarea value={form.meta_description} onChange={e => set('meta_description', e.target.value)} maxLength={200} rows={3} placeholder="e.g. Sail aboard the Sun Goddess superyacht for an unforgettable humpback whale watching experience. Morning & afternoon sessions, May–November, Gold Coast." style={{ ...inputStyle, resize: 'vertical' }} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Shown under the title in Google results. Separate from Excerpt — keep this focused on search intent.</div>
            </div>
            <div>
              <label style={labelStyle}>Focus keyword</label>
              <input type="text" value={form.focus_keyword} onChange={e => set('focus_keyword', e.target.value)} placeholder="e.g. whale watching gold coast" style={inputStyle} />
              {kwResult && (
                <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                  <KwCheck label="In title" ok={kwResult.inTitle} />
                  <KwCheck label="In first paragraph" ok={kwResult.inFirstPara} />
                  <KwCheck label="In a heading (H2/H3)" ok={kwResult.inHeading} />
                </div>
              )}
            </div>
            <div>
              <label style={labelStyle}>Canonical URL <span style={{ color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'none', fontSize: 10 }}>— leave blank to use the default page URL</span></label>
              <input type="url" value={form.canonical_url} onChange={e => set('canonical_url', e.target.value)} placeholder={`https://www.boattimeyachtcharters.com/boattime-news/${form.slug || '…'}`} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Schema type <span style={{ color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'none', fontSize: 10 }}>— controls Google rich results</span></label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {SCHEMA_OPTIONS.map(opt => {
                  const active = form.schema_types.includes(opt.value);
                  return (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                      <div
                        onClick={() => toggleSchema(opt.value)}
                        style={{ width: 16, height: 16, border: `1px solid ${active ? 'var(--gold)' : 'rgba(201,168,76,0.3)'}`, background: active ? 'var(--gold)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}
                      >
                        {active && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream)', fontWeight: 500 }}>{opt.label}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)' }}>{opt.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </Section>

          {/* ── SOCIAL ── */}
          <Section title="Social Share">
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7, marginTop: -8 }}>
              Controls how this article appears when shared on Facebook, LinkedIn, and Instagram stories. If left blank, falls back to Meta Title / Meta Description.
            </div>
            <div>
              <label style={labelStyle}>
                Social share title <CharCounter current={form.og_title.length} max={70} />
              </label>
              <input type="text" value={form.og_title} onChange={e => set('og_title', e.target.value)} maxLength={90} placeholder="Leave blank to use Meta Title" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>
                Social share description <CharCounter current={form.og_description.length} max={200} />
              </label>
              <textarea value={form.og_description} onChange={e => set('og_description', e.target.value)} maxLength={250} rows={3} placeholder="Leave blank to use Meta Description" style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </Section>

          {/* ── PUBLISH ── */}
          <Section title="Publish">
            <div>
              <label style={labelStyle}>Status</label>
              <div role="radiogroup" aria-label="Status" style={{ display: 'inline-flex', border: '1px solid var(--border-subtle)' }}>
                {([[false, 'Draft'], [true, 'Live on site']] as const).map(([value, text]) => {
                  const active = form.published === value;
                  return (
                    <button key={text} type="button" role="radio" aria-checked={active} onClick={() => set('published', value)} style={{ padding: '10px 22px', background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--navy)' : 'var(--text-muted)', border: 'none', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: active ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                      {text}
                    </button>
                  );
                })}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                {form.published ? 'Visible to visitors' : 'Not visible to visitors'} once you click {isEdit ? 'Save changes' : 'Create article'}.
              </div>
            </div>
            <div>
              <label style={labelStyle}>Timestamps <span style={{ color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'none', fontSize: 10 }}>— recorded automatically every time you save</span></label>
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', padding: '16px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                <Stamp label="First published" value={fmtStamp(form.published_at)} />
                <Stamp label="Last edited" value={fmtStamp(form.updated_at)} />
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                Shown on the article and sent to Google as datePublished / dateModified.
              </div>
            </div>
          </Section>

          {/* ── ERRORS + ACTIONS ── */}
          {error && (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#e07070', padding: '12px 16px', border: '1px solid rgba(224,112,112,0.3)' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', gap: 16, paddingTop: 8 }}>
            <button type="submit" disabled={saving} style={{ padding: '14px 36px', background: saving ? 'rgba(201,168,76,0.5)' : 'var(--gold)', color: 'var(--navy)', border: 'none', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create article'}
            </button>
            <button type="button" onClick={() => router.push('/admin/news')} style={{ padding: '14px 28px', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--cream)',
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--cream)',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
};
