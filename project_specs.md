# Project Specs — Boattime Yacht Charters Website

## What the app does and who uses it

A luxury marketing website for Boattime Yacht Charters (Gold Coast & Brisbane, AU). Visitors browse cruise experiences, learn about the fleet, and submit booking enquiries. An admin dashboard lets the Boattime team publish and manage news articles without touching code.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 + CSS custom properties (brand tokens)
- **Animations:** GSAP 3 + ScrollTrigger + @gsap/react
- **Fonts:** next/font/google — Cormorant Garamond, Montserrat
- **Deployment:** Vercel
- **Backend:** Supabase (Postgres + Auth + RLS)
- **Supabase packages:** `@supabase/supabase-js`, `@supabase/ssr`

## Pages & User Flows

### Public
1. `/` — Home page (all existing sections)
2. `/boattime-news` — News listing (fetches published posts from Supabase)

### Admin (requires login)
1. `/admin` — Login page (email + password via Supabase Auth)
2. `/admin/news` — Article list: see all posts, toggle published, delete
3. `/admin/news/new` — Create a new article
4. `/admin/news/[id]` — Edit an existing article

Admin routes are protected via middleware — unauthenticated users are redirected to `/admin`.

## Campaign Page — Sky to Sea (Boattime × Gold Coast Helitours)

### What it is & who uses it
A standalone partnership sales/landing page at **`/humpbackhelitours`** promoting a co-branded bundle between **Boattime Yacht Charters** and **Gold Coast Helitours** — witnessing humpback whales from both a luxury yacht (sea) and a helicopter (sky). Built for ad/social traffic; conversion-focused, premium, single-scroll.

### Tech & conventions (matches existing campaign pages)
- Route `app/humpbackhelitours/page.tsx` (metadata only) → renders client component `components/CampaignSkyToSea.tsx`.
- Same design system: `var(--navy)` / `var(--gold)` tokens, Cormorant + Montserrat, GSAP Ken-Burns + parallax hero, inline-styled sections, `Nav` + `Footer` wrappers, Rezdy `<Script>` + `<iframe>` booking widget.
- Co-brand touch: dual logo lockup (Boattime + Gold Coast Helitours), a gold "partnership" eyebrow, subtle heli/sea split motifs — Boattime navy/gold stays the dominant identity.

### Sections (top → bottom)
1. **Hero** — Ken-Burns bg (whale/ocean image as placeholder for a future heli-over-water shot), partnership eyebrow, headline *"Sky to Sea — The Ultimate Gold Coast Experience"* + sub *"Two ways to witness one of nature's greatest journeys."*, dual-brand lockup, primary CTA **Book Now** (→ `#book`), bottom info bar (season / duration / departs / price-from).
2. **The Partnership** — short intro: Boattime (sea) × Gold Coast Helitours (sky) co-present one bundle.
3. **The Experience** — the two halves as cards (Sky: ~scenic heli flight; Sea: luxury whale-watch cruise) + "How it works" 3–4 step timeline.
4. **What's Included** — gold-tick inclusion list (both operators).
5. **Pricing** — bundle price card(s) (dummy figures, clearly placeholder).
6. **Social Proof** — Facebook + Google star blocks (reused pattern) and 2–3 testimonials.
7. **Book Now** (`#book`) — Rezdy iframe (dummy `src` placeholder until the real product exists).

### Decisions / defaults (open to change)
- **Not added to the main nav** (standalone campaign page, like Riverfire/NYE landing patterns for ad traffic). Can be added on request.
- **Helicopter imagery**: none in `/public` yet → styled placeholder block + whale/ocean photos used now; swap in real heli shot when supplied.
- **Rezdy widget**: dummy iframe/placeholder — real product URL to be supplied.
- **Pricing & exact inclusions**: placeholder copy — to be confirmed with Gold Coast Helitours.

### What "done" looks like (this page)
- `npm run build` passes, no TS errors; page renders at `/humpbackhelitours` with no console errors.
- Hero, experience, inclusions, pricing, social proof, and a clearly-marked dummy booking section all present and responsive (mobile overrides via existing `globals.css` patterns).
- Visually consistent with existing premium Boattime pages; co-branding visible but Boattime-led.

## Data Model

### `posts` table (Supabase Postgres)

| Column       | Type        | Notes                          |
|--------------|-------------|--------------------------------|
| id           | uuid        | Primary key, auto-generated    |
| title        | text        | Article title                  |
| slug         | text        | URL-friendly, unique           |
| excerpt      | text        | Short description              |
| content      | text        | Full article body (plain text) |
| image_url    | text        | Image URL                      |
| categories   | text[]      | Array of category tags         |
| published    | boolean     | Default false (draft)          |
| published_at | timestamptz | Set when published = true      |
| created_at   | timestamptz | Auto                           |

### RLS rules
- Public: SELECT where published = true only
- Admin (authenticated): full SELECT, INSERT, UPDATE, DELETE

## Feature — Blog viewer location tracking

### What it is & who uses it
Right now each article only stores a single `views` counter (via the `increment_post_views` RPC) — no information about *who* viewed or *from where*. This feature starts recording each individual view together with the visitor's approximate location (country / region / city), so the admin can see where their blog readers come from.

### How location is detected (no third-party API)
The site is deployed on Vercel, which automatically attaches the visitor's approximate location to every request via headers (`x-vercel-ip-country`, `x-vercel-ip-country-region`, `x-vercel-ip-city`). We read those server-side. **No raw IP address is stored** — only country/region/city. This keeps it privacy-friendly and free (no external geolocation service).
- Note: these headers only exist in production on Vercel. In local dev they're empty → location saved as `Unknown`. That's expected.

### Data model — new `post_views` table (Supabase Postgres)
| Column     | Type        | Notes                                  |
|------------|-------------|----------------------------------------|
| id         | uuid        | Primary key, auto-generated            |
| post_slug  | text        | Which article was viewed               |
| country    | text        | e.g. "AU" (nullable / "Unknown")       |
| region     | text        | State/region (nullable)                |
| city       | text        | City (nullable)                        |
| viewed_at  | timestamptz | Default now()                          |

**RLS rules**
- Public/anon: **cannot** read or write this table directly.
- Inserts happen only through a server API route using the service-role key (bypasses RLS safely on the server).
- Admin (authenticated): SELECT only (to read the breakdown).

The existing `posts.views` counter stays as-is (kept in sync) so nothing else breaks.

### How it works (flow)
1. A visitor opens an article → `ArticlePage` sends a POST to a new route `app/api/track-view/route.ts` with the article slug (replaces the current direct `increment_post_views` RPC call).
2. The route reads the Vercel location headers, then (a) inserts one row into `post_views` and (b) increments `posts.views` — both server-side with the service-role client. `console.log` at start and end per project rules.
3. Admin opens `/admin/news` → each post shows its total views plus a small location breakdown (e.g. top countries: "AU 30 · US 8 · UK 4"). Fetched by querying `post_views` grouped by country.

### Files touched
- `supabase/schema.sql` — add `post_views` table + RLS policies (admin SELECT only).
- `app/api/track-view/route.ts` — **new** API route (insert view + read geo headers + increment counter).
- `components/ArticlePage.tsx` — swap the direct RPC call for a `fetch('/api/track-view')`.
- `components/admin/AdminNewsList.tsx` — show per-post location breakdown.

### Privacy note
Country/region/city are personal-ish data under Australian Privacy Principles / GDPR. We store only coarse location (no raw IP, no names, no tracking cookie), which is the low-risk approach. If you later want a "we collect anonymous location analytics" line in a privacy policy, that's a separate copy task.

### What "done" looks like (this feature)
- `npm run build` passes, no TS errors.
- Opening an article inserts a `post_views` row (verifiable in Supabase) and still bumps `posts.views`.
- Admin list shows total views + a country breakdown per article.
- Anon users cannot read `post_views` directly (RLS verified).
- No console errors.

## Feature — "Kai" AI booking assistant chat widget

### What it is & who uses it
A floating chat widget on the public site. A visitor clicks the launcher, types a question ("do you do sunset cruises for 12 people on 14 March?"), and Kai — an AI booking assistant — answers, checks live availability against our Rezdy account, and shows matching Boattime products as cards inside the chat.

Kai is a **separate, already-deployed service** (`https://kai-six-virid.vercel.app`) that already has a tenant record for us (slug `boattime`, wired to our real Rezdy products). We do not touch Kai's codebase or database. Its JSON API is the entire contract.

Users: public website visitors. No login, no Supabase involvement in this feature at all.

### Why a server-side proxy (not a direct browser call)
Kai's widget API does not send CORS headers, so a browser on `boattimeyachtcharters.com` is not allowed to call it directly. So:

`Browser (our chat component) → our /api/kai/* routes (our server) → Kai's /api/widget/* (their server)`

Our own routes are same-origin, so the browser is happy. Our server-to-server `fetch` isn't subject to CORS at all. Same pattern the sister project `bluepass-redesign` already uses against this backend (`lib/services/kai-core/client.ts`).

### Third-party services
- **Kai** (external AI booking service) — the only new service. No new Supabase tables, no Stripe in this phase.
- Kai internally talks to **Rezdy** (our existing booking system) for live availability/pricing. We never call Rezdy ourselves here.

### Environment variables (add to `.env.local`, and to Vercel for production)
| Key | Value | What it does |
|-----|-------|--------------|
| `KAI_API_BASE_URL` | `https://kai-six-virid.vercel.app` | Where Kai lives |
| `KAI_WIDGET_KEY` | `pk_test_boattime` | Identifies us as the `boattime` tenant |
| `KAI_ORIGIN` | `https://boattimeyachtcharters.com` | Sent as the `origin` header; must match Kai's allowlist for our tenant |

All three are **server-only** (no `NEXT_PUBLIC_` prefix) so the widget key never reaches the browser.

**Allowlist status — verified live, no action needed.** I probed Kai's config endpoint with both origins and both returned `200` with our real tenant payload:
- `https://boattimeyachtcharters.com` → OK
- `http://localhost:3000` → OK

So local dev works as-is; nothing needs adding on the Kai side. If a `403 ORIGIN_NOT_ALLOWED` ever appears later, that's a Kai-side config change, not a bug here.

### Data models
No database. State is per-browser-session and lives in React state only:

| Thing | Where it lives | Notes |
|-------|----------------|-------|
| `conversationId` | React state in the widget | Returned by `/api/kai/session`, sent on every message |
| Message list | React state | Not persisted — closing the tab loses history (acceptable for v1) |
| Config (title, welcome message) | React state, fetched once on open | |

Kai is stateless from our side beyond the `conversationId`. No cookies, no session storage on their end that we manage.

### Our API routes (thin proxies — forward, shape, return; no business logic)

**1. `GET /api/kai/config`** → Kai's `GET /api/widget/config?key=…`
Returns tenant branding + capabilities. Used for the widget title and welcome message.

**2. `POST /api/kai/session`** → Kai's `POST /api/widget/session`, body `{ key }`
Returns `{ conversationId }`. Called once when the widget first opens, or on "start new conversation".

**3. `POST /api/kai/messages`** → Kai's `POST /api/widget/messages`, body `{ key, conversationId, content }`
The main chat turn. Returns the assistant reply plus optional `productCards`, `contactRequest`, `paymentRequest`, `manualInquiry`.

Each route: `console.log` at start and end (project rule), never leaks the widget key to the client, and maps Kai failures to a clean `{ error }` + status.

Shared fetch/config/type code goes in **`lib/kai.ts`** so the routes stay thin.

#### ⚠️ Contract correction — `capabilities` shape
The brief typed `capabilities` as `{ supportedLocales: string[]; pmsProvider: string; enabledFeatures: string[] }`. The **live response has no `supportedLocales` field.** Actual shape returned today:

```
capabilities: {
  supportedChannels: ["WEB_WIDGET"],
  enabledFeatures: ["widget_config", "mock_pms", "boattime_local_demo", "bluepass_stripe_pms_checkout"],
  bookingMode: "MANUAL_INQUIRY",
  pmsProvider: "REZDY"
}
```
There is also a top-level `businessPack` object not mentioned in the brief. Our types will match what the API actually returns, and every field the UI reads will be treated as optional so a Kai-side shape change degrades rather than crashes. **Flagging, not fixing** — if `supportedLocales` is meant to exist, that's a Kai-side change.

### Product cards (the whole point of a custom widget)
Rendered as our own styled cards in the chat stream, directly under the assistant message that produced them.

Price line logic:
| Condition | Shown |
|-----------|-------|
| `priceLabel` present | the label as-is (e.g. `A$159`) |
| `priceLabel` null **and** `dateChecked` true | "Not available on this date" |
| `priceLabel` null **and** `dateChecked` false/absent | "Share your date for pricing" |

**Card actions.** The card is *not* a single big link. Making the whole card clickable was ambiguous — the price line ("Share your date for pricing") reads as an instruction, so a click could equally mean "pick this one" or "open the page", and the surprise was always a page navigation. Each intention now gets its own labelled button:

- **Choose this** (gold, primary) — sends `I'd like the <title>` as a normal chat message, keeping the traveller in the conversation. Disabled while a turn is in flight.
- **View page** (ghost, secondary) — opens `productUrl` in a new tab. Hidden entirely when `productUrl` is null.

**⚠️ Known data issue — flagged, not fixed:** the `productUrl` values Kai has on file for our products point at a demo/localhost URL, not our real product pages. Cards will link wherever Kai says until that's corrected on the Kai side. Nothing in this repo will paper over it.

**⚠️ Also worth a look:** our tenant's `enabledFeatures` currently includes `mock_pms` and `boattime_local_demo`. If those flags mean availability/pricing is coming from mock data rather than the real Rezdy account, live prices in the cards may not be real yet. Kai-side question, not something to fix here.

### Contact capture
If `contactRequest` comes back non-null, show a small inline name / email / phone form.
Validation: name ≥ 2 chars · basic email regex · phone digits ≥ 6.
On submit, it is sent as a **normal chat message** in natural language — `My name is X, email is Y, phone number is Z` — because Kai has no structured contact endpoint and expects it this way.

### Payments — in-chat card form still out of scope
Kai has `POST /api/widget/payments/intent` and `/confirm` for an **in-chat Stripe card form**. That is still **not built** and remains Phase 2.

Live testing showed Kai already returns a working `paymentRequest.checkoutUrl` (a hosted Stripe checkout page). Leaving the traveller to select and copy a 300-character URL by hand was not acceptable, so the booking summary now renders a **"Complete secure payment"** button linking to that URL, opening in a new tab (the chat only lives in memory — navigating away would lose it). When `checkoutUrl` is null we fall back to the original "we'll be in touch to complete payment" note.

This uses only the `checkoutUrl` already present in the Phase 1 response. It does **not** call `payments/intent` or `payments/confirm`.

### Message rendering
- URLs inside Kai's replies are rendered as real links. Long ones display as `hostname/…` (full URL preserved in the `href`) so a checkout link doesn't fill ten lines.
- All message text, card text and payment rows use `overflow-wrap: anywhere`, and `.kai-stream` sets `overflow-x: hidden`. The chat must never scroll sideways.

### Design
Our design system only — **not** Kai's default teal. `branding.primaryColor` from Kai (`#0b4f6c`) is deliberately ignored; it's a fallback for tenants with no site of their own.

- Colours via existing CSS tokens (`var(--navy)`, `var(--navy-mid)`, `var(--gold)`, `var(--cream)`, `var(--text-muted)`, `var(--border-subtle)`). Because these tokens already flip in `[data-theme='light']`, the widget **automatically works in both light and dark mode** with no extra work.
- Cormorant Garamond for the widget title, Montserrat for messages and UI.
- Sharp corners (`--radius: 0`), hairline gold borders, uppercase letterspaced labels — consistent with `Nav`, `Inquiry`, and the cruise pages.
- Launcher: fixed bottom-right, gold, discreet; subtle scale/fade transitions using `--ease-brand`. No emoji icons — a minimal inline SVG mark.
- Panel: ~380px wide desktop, near-fullscreen on mobile, `--glass-bg` backdrop.

### Behaviour
- **On first open:** call `/api/kai/session` and `/api/kai/config` in parallel → show the welcome message.
- **On send:** optimistically append the traveller's message → call `/api/kai/messages` → append the assistant reply → render any `productCards` beneath it.
- **Loading:** a typing indicator while waiting. Kai can legitimately take several seconds (live Rezdy availability checks), so no aggressive timeout.
- **Errors:** inline, human-readable ("Kai isn't responding right now — please try again"), with a retry. Never a blank panel, never a raw stack trace.
- Input disabled while a turn is in flight; Enter sends, Shift+Enter newlines.

### Files touched
| File | New? | Purpose |
|------|------|---------|
| `.env.local` | edit | 3 new keys |
| `lib/kai.ts` | **new** | Types + server-side Kai fetch helper (base URL, key, origin header) |
| `app/api/kai/config/route.ts` | **new** | Proxy → Kai widget config |
| `app/api/kai/session/route.ts` | **new** | Proxy → start conversation |
| `app/api/kai/messages/route.ts` | **new** | Proxy → chat turn |
| `components/kai/KaiWidget.tsx` | **new** | Launcher + panel + message stream (client component) |
| `components/kai/KaiProductCard.tsx` | **new** | One product card |
| `components/kai/KaiContactForm.tsx` | **new** | Inline name/email/phone form |
| `app/globals.css` | edit | `.kai-*` styles, appended at the end (existing convention) |
| `app/layout.tsx` | edit | Mount `<KaiWidget />` inside `ThemeProvider` so it's on every page |

No new top-level folders. No changes to any existing component, page, or Supabase code.

### What "done" looks like (this feature)
- `npm run build` passes with no TypeScript errors.
- Widget launcher visible on every public page; opens and closes cleanly.
- Opening it starts a real conversation and shows Kai's welcome message.
- Sending a message returns a real assistant reply from the live Kai service.
- A product-oriented question renders real Boattime product cards, styled in our navy/gold system, with the correct price line for all three cases.
- `contactRequest` renders the form; submitting it sends the natural-language message and Kai acknowledges.
- `paymentRequest` shows details as text + "we'll be in touch" (no payment UI).
- Errors and slow replies are handled visibly, no console errors.
- Widget looks correct in **both** light and dark theme.
- Widget key never appears in any browser network request or page source.

## What "done" looks like

- `npm run build` succeeds with no TypeScript errors
- Admin can log in at `/admin` and is redirected to `/admin/news`
- Admin can create, edit, delete, and publish/unpublish articles
- `/boattime-news` shows only published articles, fetched from Supabase
- Category filter and pagination work with live data
- Unauthenticated users hitting `/admin/*` are redirected to `/admin`
- No console errors

---

## Feature — SEO Repair (laporan tim SEO, Sept 2026)

### Apa ini & siapa yang terdampak
Perbaikan empat masalah SEO yang dilaporkan tim SEO. Semuanya sudah diverifikasi langsung terhadap situs production (`https://www.boattimeyachtcharters.com`) sebelum spec ini ditulis. Yang terdampak: Google/AI search engine yang meng-crawl situs, dan calon pelanggan yang menemukan kita lewat pencarian.

### Hasil verifikasi (bukan asumsi — sudah dicek live)

| # | Laporan | Status | Akar masalah sebenarnya |
|---|---------|--------|-------------------------|
| 1 | Semua sub-page canonical ke homepage | **Benar** | `app/layout.tsx` menyetel `alternates.canonical` ke URL homepage. Di Next.js metadata ini **diwariskan** ke semua halaman anak yang tidak menyetel canonical-nya sendiri. Hanya `/cruise-tickets-luxury-whale-watching` dan artikel `/boattime-news/[slug]` yang punya canonical sendiri. |
| 2 | 32 blog post di sitemap 404 | **Benar** | **Bukan bug kode.** Database Supabase (`atcafncwghxfynsfkjil.supabase.co`) tidak lagi resolve di DNS — project-nya ter-pause/terhapus. Semua artikel tersimpan di sana. Halaman `/boattime-news` menampilkan "No articles", tiap artikel 404. Sitemap yang masih memuat 32 URL adalah **cache lama Vercel** (`age: 519319` detik ≈ 6 hari), bukan data hidup. |
| 3 | Tidak ada structured data (JSON-LD) | **Benar** | Nol JSON-LD di seluruh halaman marketing. Kode JSON-LD sudah ada, tapi **hanya** di `app/boattime-news/[slug]/page.tsx` — dan halaman itu sedang 404, jadi tidak pernah tampil. |
| 4 | Halaman yacht & About 404 | **Benar** | Route-nya terhapus dari git, tapi komponennya masih ada. URL mati: `/sun-goddess-gold-coast`, `/mermaid-spirit-gold-coast`, `/about-boattime`. |

### ⚠️ Blocker — butuh tindakan di luar kode (masalah #2)
Artikel blog **tidak bisa dipulihkan lewat kode**. Kontennya ada di Supabase, dan project Supabase-nya sedang mati. Kemungkinan terbesar: Supabase free tier otomatis mem-*pause* project yang tidak diakses selama ~7 hari, dan subdomain API-nya berhenti resolve saat di-pause. Timing-nya cocok dengan cache sitemap yang berumur 6 hari.

Tindakan: buka dashboard Supabase → pilih project → klik **Restore/Resume**. Begitu hidup, 32 artikel kembali 200 tanpa perubahan kode apapun. Pekerjaan kode di bawah mengasumsikan database kembali hidup.

### Lingkup pekerjaan

**A. Canonical per-halaman (masalah #1 — paling mendesak)**
- Hapus `alternates.canonical` dari `app/layout.tsx` supaya tidak lagi diwariskan.
- Tambahkan `alternates: { canonical: '<url halaman itu sendiri>' }` ke metadata setiap halaman publik (16 halaman statis + homepage).
- Halaman whale watching dan artikel blog sudah benar — tidak disentuh.

**B. Hidupkan kembali halaman yacht & About (masalah #4)**
- Pulihkan dari git: `app/sun-goddess-gold-coast/page.tsx`, `app/mermaid-spirit-gold-coast/page.tsx`, `app/about-boattime/page.tsx`, `components/AboutPage.tsx`.
- Komponen `YachtPageSunGoddess.tsx` dan `YachtPageMermaidSpirit.tsx` masih ada di repo dan import-nya masih valid.
- Tambahkan ketiga URL itu ke `app/sitemap.ts`.
- Tambahkan link ke ketiganya di `components/Footer.tsx` (saat ini "Sun Goddess"/"Mermaid Spirit" mengarah ke `#fleet`, dan link About masih di-comment).

**C. Structured data / JSON-LD (masalah #3)**
File baru `lib/schema.ts` berisi helper pembangun schema, dipakai lintas halaman. Yang ditambahkan:
- `Organization` + `LocalBusiness` (nama, telepon `+61 477 667 644`, email, alamat Main Beach QLD 4217, jam, area layanan, profil sosial) — di layout root, jadi tampil di semua halaman.
- `WebSite` dengan `SearchAction` — di layout root.
- `BoatTrip`/`TouristAttraction` + `Offer` per halaman cruise (harga diambil dari copy yang sudah ada di halaman).
- `Service` per halaman charter (private / corporate / wedding).
- `Product`-style entity untuk kedua kapal di halaman yacht (Sun Goddess 114ft, Mermaid Spirit 100ft).
- `AggregateRating` — **hanya** memakai angka yang sudah dipublikasikan di situs: 1.341 review, rating 4.7. Tidak ada angka karangan.
- `FAQPage` di halaman yang sudah punya section FAQ, dibangun dari teks FAQ yang sudah ada.
- `BreadcrumbList` di semua sub-page.

**D. Kebersihan sitemap**
- Tambahkan tiga route yang dipulihkan.
- Jika query artikel gagal, sitemap tetap terbit dengan URL statis saja (perilaku ini sudah ada) — supaya tidak pernah lagi mengiklankan URL mati.

### Yang TIDAK dikerjakan
- Tidak menulis ulang copy atau desain halaman manapun.
- Tidak membuat artikel blog baru — 32 artikel lama kembali sendiri begitu Supabase hidup.
- Tidak mengarang rating, harga, atau review untuk schema. Hanya angka yang sudah tampil di situs.
- Tidak menyentuh Kai, Supabase schema, admin, atau halaman campaign.

### File yang disentuh
| File | Baru? | Untuk apa |
|------|-------|-----------|
| `app/layout.tsx` | edit | Buang canonical warisan; pasang JSON-LD Organization/LocalBusiness/WebSite |
| 16 × `app/*/page.tsx` | edit | Canonical sendiri + JSON-LD per halaman |
| `app/page.tsx` | edit | Canonical homepage + JSON-LD |
| `lib/schema.ts` | **baru** | Helper pembangun JSON-LD |
| `app/sun-goddess-gold-coast/page.tsx` | **pulih** | Halaman Sun Goddess |
| `app/mermaid-spirit-gold-coast/page.tsx` | **pulih** | Halaman Mermaid Spirit |
| `app/about-boattime/page.tsx` | **pulih** | Halaman About |
| `components/AboutPage.tsx` | **pulih** | Isi halaman About |
| `app/sitemap.ts` | edit | Tambah 3 route yang pulih |
| `components/Footer.tsx` | edit | Link ke halaman yacht & About |

### Definisi "selesai"
- `npm run build` lolos, tanpa error TypeScript.
- Setiap halaman publik punya `<link rel="canonical">` yang menunjuk ke dirinya sendiri (dicek di HTML hasil build).
- `/sun-goddess-gold-coast`, `/mermaid-spirit-gold-coast`, `/about-boattime` balas 200 dan tampil benar.
- Setiap halaman publik memuat minimal satu blok `application/ld+json` yang lolos Google Rich Results Test.
- Sitemap memuat ketiga route baru.
- Tidak ada error console di dev server.
- Terpisah, tergantung tindakan pemilik situs: Supabase hidup kembali → 32 artikel balas 200.

### Status penyelesaian — 21 September 2026

**Masalah #2 (blog 404): SELESAI oleh pemilik situs.** Supabase kena batas free plan sehingga project-nya dibatasi. Plan sudah di-upgrade. Terverifikasi: 32 artikel published kembali terbaca, `/boattime-news` kembali me-link artikel, halaman artikel balas 200. Tidak ada perubahan kode yang diperlukan.

**Masalah #1, #3, #4: SELESAI lewat kode.** `npm run build` lolos (34 route), tidak ada error TypeScript, tidak ada error di dev server.

Terverifikasi pada 20 halaman publik + halaman artikel:
- Semua balas 200.
- Semua punya `<link rel="canonical">` yang menunjuk ke dirinya sendiri.
- Semua memuat JSON-LD yang valid dan ter-parse.
- Sitemap kini 52 URL (20 statis + 32 artikel), memuat tiga route yang dipulihkan.
- Halaman yang dipulihkan merender Nav, H1, isi, dan Footer dengan benar.

Struktur JSON-LD yang dihasilkan:
- Setiap halaman: `Organization`/`LocalBusiness`/`TouristAttraction` + `WebSite` (dari root layout) + `BreadcrumbList`.
- Homepage: + `FAQPage` (dibangun dari `lib/faqs.ts`, sumber yang sama dengan FAQ yang tampil).
- Halaman cruise: + `BoatTrip` dengan `Offer` dan `BoatTerminal` keberangkatan.
- Halaman charter: + `Service`.
- Halaman kapal: + `Product` (panjang kapal, kapasitas tamu).
- `/about-boattime`: + `AboutPage`.
- `/boattime-news`: + `Blog`; artikel: + `BlogPosting` (+ `FAQPage` bila ada).

Catatan implementasi yang berbeda dari rencana:
- `lib/faqs.ts` dibuat (tidak ada di rencana awal). Data FAQ sebelumnya berada di dalam `components/Faq.tsx` yang ber-`'use client'`; ekspor dari file client tidak terbaca sebagai array di sisi server, sehingga build gagal. Data dipindah ke modul biasa dan di-import oleh keduanya — satu sumber kebenaran, JSON-LD tidak akan melenceng dari FAQ yang tampil.
- `components/JsonLd.tsx` dibuat untuk merender blok schema.
- Koordinat geo di `lib/schema.ts` sudah **dikonfirmasi** ke titik depart resmi: Marine Stadium Jetty & Pontoon, Main Beach (-27.9407977, 153.4237125) — https://maps.app.goo.gl/ef21zFGntpZDjmB17

### Perbaikan lanjutan — disetujui & selesai

**1. Judul halaman kepanjangan & brand ganda (17 halaman).** `title.template` di root layout menambahkan brand, sedangkan judul tiap halaman sudah memuatnya sendiri, sehingga judul jadi 76–133 karakter — Google hanya menampilkan sekitar 60. Diperbaiki dengan: suffix brand dibuang dari judul tiap halaman, dan template dipendekkan dari `'%s | Boattime Yacht Charters'` menjadi `'%s | Boattime'`. Hasil: **20 dari 20 halaman kini ≤ 60 karakter** (terpanjang 57). Judul homepage tidak diubah.

**2. Bug H1 hero pada halaman charter.** `CharterHero` di `components/CharterSections.tsx` menulis mati teks `<h1>` ("Private Yacht Charter / Gold Coast • Brisbane") dan mengabaikan prop `headline` yang dikirim halaman. Akibatnya halaman **Corporate dan Wedding menampilkan H1 milik halaman Private** — Google membaca kedua halaman itu sebagai halaman private charter. H1 adalah sinyal on-page terkuat, jadi ini merusak relevansi dua halaman komersial.

Diperbaiki: `<h1>` kini merender `{headline}`, dan tipe prop diubah dari `string` menjadi `React.ReactNode` supaya tiap halaman menentukan sendiri titik pemenggalan barisnya — pola yang sama dengan `CruiseHero` yang sudah benar. Ketiga halaman charter kini mengirim headline dua baris. Hero halaman Private tidak berubah sama sekali (teks identik dengan versi hardcoded sebelumnya).

**3. Judul artikel blog memuat brand tiga kali.** `app/boattime-news/[slug]/page.tsx` menyusun judul sebagai `${meta_title} · Boattime News`, lalu template layout menambahkan brand lagi. Contoh nyata: "Luxury Whale Watching Gold Coast | Boattime Yacht Charters · Boattime News | Boattime" (87 karakter). Diperbaiki dengan helper `stripBrandSuffix()` yang membuang suffix brand yang terlanjur diketik editor ke dalam `meta_title`, dan suffix "· Boattime News" tidak lagi ditambahkan. Hasil: artikel yang lewat 60 karakter turun dari **31/32 menjadi 19/32**; contoh di atas kini 43 karakter.

Audit prop terabaikan dijalankan ke seluruh `components/` — tidak ada komponen lain yang mengabaikan prop yang dikirim.

### Sisa pekerjaan — tugas konten, bukan kode
19 dari 32 artikel masih punya `meta_title` di atas 60 karakter (61–71), misalnya "Mother and Calf Whale Encounters | Gold Coast Whale Watching". Ini judul yang ditulis manual, bukan bug — diperpendek lewat admin di `/admin/news`, bukan lewat kode. Tidak dikerjakan karena menulis ulang 32 judul adalah keputusan copywriting pemilik situs.

---

## Koreksi — Poin 4 sebelumnya BELUM tuntas (ditemukan 21 September 2026)

### Apa yang terlewat
Laporan tim SEO berbunyi: *"Sun Goddess, Mermaid Spirit and About Boat Time are still in Google's index and now dead."* Sebelumnya saya menafsirkan ini sebagai route yang terhapus dari git, lalu memulihkan `/sun-goddess-gold-coast`, `/mermaid-spirit-gold-coast`, dan `/about-boattime`. Itu **asumsi yang salah**.

URL yang sebenarnya ada di index Google berasal dari **situs WordPress lama**, dengan struktur berbeda:

| Ada di index Google | Status sebelum koreksi |
|---|---|
| `boattimeyachtcharters.com/sun-goddess/` | 404 |
| `boattimeyachtcharters.com/mermaid-spirit/` | 404 |
| `boattimeyachtcharters.com/about-boat-time/` | 404 |

Frasa "About Boat Time" (tiga kata terpisah) di laporan persis cocok dengan slug lama `/about-boat-time/` — petunjuk yang sebelumnya terlewat. Memulihkan route baru tidak menyentuh URL-URL ini sama sekali; ketiganya tetap mati.

### Cara menemukan cakupan sebenarnya
Daftar URL situs lama diambil dari index Wayback Machine (`web.archive.org/cdx`), disaring dari aset dan boilerplate tema, lalu tiap kandidat diuji terhadap situs live. Hasil: **78 URL situs lama yang masih 404**, jauh melampaui tiga yang disebut laporan — termasuk halaman layanan (`/private-charter/`, `/weddings/`, `/corporate-event/`, `/cruise-tickets/`, `/catering/`, `/menus/`), halaman musiman (`/valentines-day-cruise/`, `/riverfire-2024/`), index blog beserta paginasinya, dan sekitar 25 artikel lama.

### Perbaikan
Pengalihan permanen ditambahkan di `next.config.ts` sebagai daftar `OLD_SITE_REDIRECTS`, dipetakan ke halaman padanan terdekat. Setiap `source` sudah diverifikasi pernah ada di situs lama dan 404 hari ini.

Hasil verifikasi lokal: **67 dari 78 URL lama kini berujung HTTP 200.**

11 sisanya sengaja dibiarkan 404 karena memang tidak layak diindeks: `/auto-draft/`, `/home-btyc/`, `/homelink/`, `/sunsets-whale-draft/`, `/boattime-yc-runsheet/`, `/1813-2/`, `/2024/01/09/`, `/comments/feed/`, `/sitemap`, `/thank-you/`. Mengalihkan sampah hanya membuat Google terus merayapinya.

Catatan: URL dengan garis miring di akhir melewati dua lompatan (`/sun-goddess/` → `/sun-goddess` → `/sun-goddess-gold-coast`) karena normalisasi bawaan Next.js. Google menangani rantai pendek seperti ini tanpa masalah.

### Perlu keputusan — `/privacy-policy/`
`/privacy-policy/` ada di index Google dan kini 404, tetapi situs baru **tidak punya halaman privasi sama sekali**. Tidak dialihkan karena tidak ada tujuan yang tepat. Mengingat situs mengumpulkan data enquiry dan analitik lokasi pengunjung (lihat fitur pelacakan lokasi di atas), halaman ini sebaiknya dibuat ulang — itu tugas konten, bukan kode.

---

## Halaman kapal dibuat informatif — 21 September 2026

### Sumber kebenaran
Pemilik situs menetapkan section homepage **"Two vessels. One horizon."** (`components/Fleet.tsx`) sebagai sumber data dan foto yang benar. Semua angka dan gambar diambil dari sana.

### Konflik data yang diselesaikan
Sebelumnya angka kapal bertabrakan antar halaman:

| Data | Homepage (benar) | Halaman kapal (sebelumnya) |
|---|---|---|
| Sun Goddess — panjang | 34 m / 114 ft | spec bar tertulis **110 ft** |
| Sun Goddess — tamu | 135 | schema saya tertulis **150** |
| Mermaid Spirit — tamu harian | 150 | spec bar tertulis **100** |

Semua kini mengikuti homepage. Diverifikasi: nol penyebutan "110 ft" tersisa di situs.

### File baru
- **`lib/vessels.ts`** — satu sumber data kedua kapal (nama, ukuran, kapasitas, foto + alt text, tabel spesifikasi, fitur, URL tur 360°, FAQ). Halaman, metadata, dan JSON-LD membaca dari sini, sehingga angkanya tidak bisa melenceng lagi.
- **`components/YachtSections.tsx`** — empat section yang dipakai kedua halaman: `VesselGallery`, `VesselSpecTable`, `VesselFaq`, `VesselCrossLinks`.

### Foto stok diganti foto asli
Kedua halaman sebelumnya memakai **14 foto stok Unsplash** — kapal milik orang lain — termasuk di hero, overview, kartu charter, dan tiga dek Mermaid Spirit. Semuanya diganti foto milik sendiri dari `public/`. Diverifikasi: **nol referensi Unsplash tersisa**, dan seluruh path gambar terbukti ada.

### Section baru untuk SEO
1. **Galeri** — 6 foto Sun Goddess, 5 foto Mermaid Spirit, tiap foto punya alt text deskriptif (bobot pencarian gambar), plus tombol tur 360° Kuula yang sebelumnya hanya ada di homepage.
2. **Tabel spesifikasi** — 10 baris `<table>` teks biasa per kapal, bisa dibaca mesin pencari dan orang yang membandingkan dua kapal.
3. **FAQ** — 6 pertanyaan per kapal (kapasitas, ukuran, titik keberangkatan, wedding, bar, jenis charter / dek, aktivitas air, Brisbane River). Jawaban selalu ada di DOM meski accordion tertutup, supaya crawler membacanya.
4. **Cross-link** — 4 link internal per halaman ke kapal satunya dan halaman charter/cruise terkait.

### Hasil terverifikasi
- `npm run build` lolos, tanpa error TypeScript; dev server tanpa error.
- HTML per halaman naik dari ~63 KB ke **105–108 KB**; 11 section H2 per halaman.
- JSON-LD per halaman: `Product` (7 foto Sun Goddess / 6 Mermaid Spirit, panjang + kapasitas benar), `FAQPage` 6 pertanyaan, `BreadcrumbList`, plus blok bisnis dan `WebSite` dari layout.
- Aturan mobile ditambahkan di `globals.css` supaya 6 thumbnail galeri tidak menyempit di layar HP.
- Seluruh 20 halaman tetap lolos audit: 200, canonical benar, JSON-LD ada, judul ≤ 60 karakter, tepat satu H1.

---

## Bug — scrollbar ganda di seluruh situs (diperbaiki 21 September 2026)

### Gejala
Setiap halaman menampilkan **dua scrollbar vertikal** bersebelahan di tepi kanan. Roda scroll berebut antara keduanya, sehingga halaman terasa macet dan sulit di-scroll. Dilaporkan saat melihat halaman Mermaid Spirit, tetapi pengukuran menunjukkan bug ini ada di **semua halaman** dan sudah lama ada — bukan akibat pekerjaan SEO.

### Penyebab
Aturan CSS di `app/globals.css`:

```css
body { overflow-x: hidden; }
main { overflow-x: hidden; }
```

Menurut spesifikasi CSS, ketika satu sumbu `overflow` disetel ke `hidden`, sumbu lainnya yang bernilai `visible` otomatis dihitung menjadi `auto`. Jadi `overflow-x: hidden` diam-diam mengubah `overflow-y` menjadi `auto`, dan elemen itu berubah menjadi **scroll container tersendiri**.

Pemicunya: bingkai dekoratif di halaman-halaman ini diposisikan dengan offset negatif (`bottom: -24`, `right: -24`), sehingga isi `<main>` meluber sekitar 30 piksel. Luberan sekecil itu sudah cukup membuat `<main>` menampilkan scrollbar sendiri di samping scrollbar halaman.

Diverifikasi lewat Chrome DevTools Protocol: `main` memiliki `overflowY: auto` dengan `scrollHeight 9383` melawan `clientHeight 9353`.

### Perbaikan
- `html` kini yang memegang `overflow-x: hidden` (html memang scroller halaman, jadi tidak menimbulkan scrollbar kedua), dan aturan itu dihapus dari `body`.
- `main` memakai `overflow-x: clip`. Berbeda dengan `hidden`, nilai `clip` **tidak** memaksa `overflow-y` menjadi `auto`, sehingga luberan tetap terpotong tanpa membuat kotak scroll baru.

### Hasil terverifikasi
- Diukur ulang di 7 halaman: satu-satunya scroll container yang tersisa adalah `html` — persis seperti seharusnya. `main` tidak lagi menjadi scroller di halaman manapun.
- `.mobile-drawer` masih punya `overflow-y: auto`, tetapi `visibility: hidden` dan `opacity: 0` di desktop sehingga tidak pernah tergambar. Dibiarkan.
- **Perilaku `position: sticky` diuji dan tetap utuh** — ini risiko utama dari perubahan `clip`. Panel "Horizons" di homepage tetap terkunci di 120px dan bilah filter blog tetap di 72px sepanjang scroll.
- `npm run build` lolos; ke-20 halaman tetap lolos audit SEO; pengalihan URL lama tetap berfungsi.

---

## Tahun berdiri disamakan menjadi 2014 (21 September 2026)

### Masalah
Homepage menyebut dua tahun berdiri yang berbeda: Footer menulis *"since 2014"*, sedangkan StatsBar menulis *"Est. 2017"*.

### Tahun mana yang benar
**2014.** Dikuatkan oleh tiga sumber lain yang saling cocok:
- `components/Footer.tsx` — "since 2014"
- `components/StatsBar.jsx` (versi file ini sebelum ditulis ulang ke TypeScript) — "Est. 2014"
- `app/about-boattime/page.tsx` — "12+ years operating"; `components/CruisePageWhale.tsx` — "over a decade of tours"

"Est. 2017" tampaknya salah ketik yang masuk saat StatsBar ditulis ulang ke TypeScript.

### Akibat lanjutan yang ikut diperbaiki
Angka **"8+ seasons operating"** cocoknya dengan 2017, bukan 2014. Kalau hanya tahunnya yang diubah, homepage justru jadi kontradiktif dengan cara baru. Dari 2014 ke 2026 adalah **12 musim** — angka yang memang sudah dipakai halaman About ("12+ years") dan halaman whale ("over a decade").

Angka ini muncul di dua komponen homepage, keduanya diperbaiki.

### Perubahan
| File | Sebelum | Sesudah |
|---|---|---|
| `components/StatsBar.tsx` | `'Est. 2017 · Family owned & operated'` | `'Est. 2014 · …'` |
| `components/StatsBar.tsx` | `end: 8` (Seasons operating) | `end: 12` |
| `components/AboutOwners.tsx` | `8+` seasons operating | `12+` |

### Hasil terverifikasi
- `npm run build` lolos.
- Homepage yang sudah dirender diperiksa lewat browser: hanya ada `Est. 2014` dan `since 2014` — nol penyebutan 2017 tersisa di seluruh `components/*.tsx`.
- Penghitung StatsBar yang beranimasi diverifikasi berhenti di **12+**, dan blok AboutOwners menampilkan **12+ seasons operating**.

Catatan: file lama `components/StatsBar.jsx` dan `Footer.jsx` sudah memuat 2014 dan tidak di-import oleh apapun (Next memilih varian `.tsx`), jadi dibiarkan apa adanya.

---

## Link "View Sun Goddess / View Mermaid Spirit" (21 September 2026)

Tim SEO meminta link eksplisit dari homepage ke masing-masing halaman kapal. Footer sudah dikerjakan sebelumnya, tetapi section fleet ("Two vessels. One horizon.") belum: satu-satunya CTA di kartu kapal adalah tombol tur 360°, yang membuka modal dan bukan link — sehingga halaman entitas kapal tidak punya link masuk dari section yang justru membahasnya.

Ditambahkan `pageHref` + `pageLabel` pada data kartu di `components/Fleet.tsx`, dirender sebagai link `<a>` sungguhan di samping tombol tur, dibungkus `.yacht-cta-row` (flex, wrap di layar sempit).

Terverifikasi lokal: homepage kini memuat 4 link ke halaman kapal — "View Sun Goddess" dan "View Mermaid Spirit" di kartu fleet, plus dua link footer. `npm run build` lolos.

---

## Koreksi schema — entitas bisnis tidak terdeteksi validator (21 September 2026)

### Temuan
Saat menyiapkan bukti untuk tim SEO, screenshot dari `validator.schema.org` pada homepage hanya menampilkan **dua** schema (`WebSite` dan `FAQPage`), padahal HTML memuat **tiga** blok. Yang hilang dari daftar justru blok bisnisnya — bagian paling penting untuk operator wisata lokal.

### Penyebab
`@type` ditulis sebagai array tiga tipe sekaligus:

```json
"@type": ["Organization", "LocalBusiness", "TouristAttraction"]
```

Dua masalah:
1. **Berlebihan** — `LocalBusiness` di hierarki schema.org sudah merupakan turunan `Organization`, jadi menyebut keduanya mubazir.
2. **Mencampur kategori** — `TouristAttraction` adalah turunan `Place`, bukan `Organization`. Mencampur Organization dengan Place membuat entitasnya ambigu, dan validator tidak bisa memberi nama pada blok tersebut.

### Perbaikan
`@type` disederhanakan menjadi satu tipe: **`LocalBusiness`**. Ini tipe yang dipakai dokumentasi structured data Google untuk bisnis lokal, dan secara hierarki tetap mencakup `Organization` — sehingga referensi `provider`, `publisher`, dan `brand` yang menunjuk ke `@id` yang sama tetap sah.

Seluruh isi blok tidak berubah: nama, telepon, email, alamat, geo, area layanan, rentang harga, rating agregat, dan profil sosial tetap lengkap.

### Terverifikasi lokal
```
/                         -> LocalBusiness, WebSite, FAQPage
/sun-goddess-gold-coast   -> LocalBusiness, WebSite, Product, FAQPage, BreadcrumbList
/wedding-yacht-charter    -> LocalBusiness, WebSite, Service, BreadcrumbList
```
`npm run build` lolos. Tiap blok kini punya satu tipe bersih yang bisa dinamai validator.

### Catatan — `/about` bukan URL lama yang terindeks
Pemilik situs mengecek `https://www.boattimeyachtcharters.com/about` dan menemukan 404. Diperiksa terhadap index Wayback: satu-satunya URL About yang pernah ada di situs lama adalah **`/about-boat-time/`**, dan itu sudah dialihkan ke `/about-boattime` (200). `/about` tidak pernah ada sehingga tidak pernah terindeks.

Meski begitu `/about` dan `/about-us` tetap ditambahkan ke daftar redirect — keduanya alamat yang wajar ditebak orang atau dipakai link eksternal, dan biayanya nol.

---

## Halaman About: foto asli + pindah ke `/about` (21 September 2026)

### Foto stok diganti
`components/AboutPage.tsx` memakai **4 foto stok Unsplash** — kapal milik orang lain — di hero, blok portrait, dan kedua kartu kapal. Semuanya diganti foto sendiri: `sun-goddess-main-upscale.png`, `sungoddess-page-boat.jpeg`, `mermaid-spirit-main.jpg`. Terverifikasi nol referensi Unsplash tersisa.

### Angka kapal ikut diperbaiki
Halaman ini menyimpan angka lama yang bertentangan dengan homepage:

| Data | Sebelumnya | Sekarang (ikut homepage) |
|---|---|---|
| Sun Goddess — panjang | 110 ft (2 tempat + body copy) | **114 ft** |
| Mermaid Spirit — kapasitas | 100 Guests | **150 Guests** |

### URL dipindah `/about-boattime` → `/about`
Pemilik situs meminta halaman About berada di `/about` supaya alamat itu tidak 404. Route dipindah dengan `git mv` agar riwayat file terjaga.

Yang ikut disesuaikan:
- `PATH` di dalam page → canonical, `AboutPage` schema `@id`/`url`, dan breadcrumb otomatis mengikuti.
- `app/sitemap.ts` → `/about`.
- `components/Footer.tsx` → link ke `/about`.
- `next.config.ts` → `/about-boat-time`, `/about-boattime`, dan `/about-us` semua diarahkan ke `/about`.

**Penting:** aturan `{ source: '/about', destination: '/about-boattime' }` yang sempat ditambahkan sebelumnya **dihapus**. Kalau dibiarkan, `/about` yang kini halaman sungguhan akan mengalihkan ke dirinya sendiri lewat rantai dan menimbulkan redirect loop.

`/about-boattime` sempat live satu deploy dan sudah masuk sitemap, jadi ia mendapat redirect sendiri — bukan sekadar dihapus.

### Terverifikasi lokal
```
/about              200
/about-boat-time/   308 → 308 → 200  → /about
/about-boattime     308 → 200        → /about
/about-us           308 → 200        → /about
```
Tidak ada redirect loop. Sitemap tetap 52 URL, semuanya 200; canonical `/about` menunjuk ke dirinya sendiri; schema `LocalBusiness, WebSite, AboutPage, BreadcrumbList`. `npm run build` lolos.

---

## Optimasi halaman sunset cruise (21 September 2026)

### Kenapa halaman ini
Data Search Console (19 Jun – 17 Sep) menunjukkan `sunset cruise gold coast` adalah **permintaan terbesar yang belum dimenangkan**: 1.689 tampilan, hanya 32 klik, posisi rata-rata 8,6 (CTR 1,9%). Bandingkan dengan whale watching yang berada di posisi 1,6–1,8.

Pola pendukungnya jelas dari blog: dari 32 artikel, **17 tentang whale watching, 0 tentang sunset**. Yang ditulis banyak artikel menang; yang tidak ditulis kalah.

### Aturan yang dipegang
Pemilik situs meminta: hanya memakai fakta yang sudah ada di situs, **tidak boleh mengarang**. Karena itu penambahan landmark rute (Marina Mirage, kanal Surfers Paradise, dll) **ditunda** — rute asli kapal belum dikonfirmasi, dan menuliskannya tanpa konfirmasi berarti membuat klaim palsu di situs klien.

### Yang dikerjakan

**1. Judul kata kunci di atas, judul pilihan klien tetap di bawahnya**
Hero kini memuat keduanya dalam satu `<h1>`:

```
Sunset Cruise Gold Coast                                  ← krem, baris utama
Twilight Drift — Broadwater Sunset Tour & Scenic Cruise    ← italic emas, satu baris
```

Klien ingin "Twilight Drift / Broadwater Sunset Tour & Scenic Cruise" dipertahankan, sementara kata kunci pencarian perlu berada di depan. Dua-duanya dipenuhi tanpa kompromi.

Agar itu mungkin, tipe prop `titleAccent` pada `CruiseHero` diubah dari `string` menjadi `React.ReactNode` sehingga sebuah halaman bisa mengirim pemenggalan baris sendiri. `string` tetap valid sebagai `ReactNode`, jadi **enam halaman lain yang memakai `titleAccent` tidak tersentuh** — sudah diverifikasi masing-masing masih punya tepat satu H1 dengan isi aslinya.

Atas permintaan pemilik situs, nama produk dijadikan **satu baris**. Karena panjangnya 54 karakter, baris itu diberi ukuran relatif terhadap heading — sekarang `fontSize: '0.62em'` (diperbesar dari `0.5em` atas permintaan pemilik situs) (memanfaatkan `titleAccent` yang kini `ReactNode`), dan `titleFontSize` disetel ke `clamp(40px, 5.4vw, 76px)`.

Diperiksa dengan tangkapan layar di 1440px, 1280px, dan 390px: satu baris utuh di kedua lebar desktop, membungkus jadi dua baris di ponsel (tak terhindarkan pada lebar 390px, tetap terbaca dan tidak meluber). Jarak logo ke menu nav pada 1280px diukur 36px — sama di homepage dan halaman lain, jadi bukan efek perubahan ini.

Penempatan kata kunci lainnya:
- **Title tag** → `Sunset Cruise Gold Coast — Twilight Drift | Boattime` (52 karakter).
- **Eyebrow** → "Cruise Tickets · Sunset Cruise Gold Coast".
- **H2** → tanda pisah dihapus menjadi "Luxury Sunset Cruise Gold Coast" supaya frasanya menyatu.

Frasa "sunset cruise gold coast" kini muncul **6 kali** di halaman (sebelumnya nol dalam bentuk persis).

**2. Section FAQ + schema `FAQPage`**
Halaman sebelumnya punya **nol kalimat tanya**. Ditambahkan 8 pertanyaan di `lib/cruise-faqs.ts`, **setiap jawaban menyalin fakta yang sudah tercetak di halaman** — blok jadwal (4:30/5:00/7:00, Jumat–Minggu), tabel harga, daftar inclusions, deskripsi kapal, dan ketentuan pembatalan. Tidak ada klaim baru.

**3. Jumlah review diperbaiki — melanggar aturan Google**
Structured data menyebut 1.341 review, padahal halaman menampilkan Facebook 2.047 + Google 1.863. Google mensyaratkan angka di schema sama dengan yang terlihat; kalau tidak, rich result diabaikan.

Ternyata 1.341 juga **mustahil secara aritmetika** — lebih kecil dari Facebook saja. Angka itu muncul di homepage (StatsBar, Hero, Reviews, AboutOwners) sementara 6 halaman lain memakai 2.047/1.863.

Diperbaiki: schema memakai **4,7 / 1.863 (Google saja)** — satu sumber, bisa diverifikasi, cocok dengan yang tercetak. Tampilan di situs diperbaiki dari 1.341 menjadi **3.910+** (2.047 + 1.863, dengan "+" karena angka Tripadvisor tidak dipublikasikan). Nol sisa "1.341" di seluruh kode.

**4. Harga di schema jadi rentang, bukan satu angka**
Sebelumnya `Offer` dengan `price: 129` ("dua tiket") — terlihat mahal dibanding pesaing yang menampilkan "from $45pp". Sekarang `AggregateOffer` **$59–$229**, sesuai tabel harga di halaman (anak $59 · 1 dewasa $79 · 2 dewasa $129 · 4 dewasa $229). Helper `buildOffer` di `lib/schema.ts` menerima `highPrice` opsional.

**5. Link internal diperbanyak**
Halaman sunset ditambahkan ke cross-link halaman Sun Goddess dan Mermaid Spirit. Total link menuju halaman sunset naik dari **5 menjadi 19**.

### Hasil terverifikasi
| | Sebelum | Sesudah |
|---|---|---|
| Jumlah kata | 1.107 | **1.895** |
| Kalimat tanya | 0 | **27** |
| Schema | BoatTrip, Breadcrumb | **+ FAQPage (8 pertanyaan)**, offer jadi rentang |
| Link internal masuk | 5 | **19** |

`npm run build` lolos. Ke-20 halaman tetap lolos audit (200, self-canonical, ada JSON-LD, judul ≤ 60 karakter, tepat satu H1).

### Belum dikerjakan
- **Landmark rute** — menunggu konfirmasi rute asli dari klien.
- **Artikel blog sunset** — 5 judul sudah diusulkan; ini yang berpotensi membawa dari posisi 8 ke 3, tapi butuh penulisan.

### Koreksi FAQ setelah audit sumber (22 September 2026)
Pemilik situs meminta pembuktian bahwa setiap jawaban FAQ bersumber dari halaman. Audit 27 klaim dijalankan terhadap `components/CruisePageBroadwater.tsx`; semuanya terverifikasi, tetapi dua hal dilaporkan dan kemudian diperbaiki:

1. **Kalimat yang tidak bersumber — dihapus.** Jawaban tentang satwa laut memuat tambahan *"though sightings are never guaranteed"*. Kata "guarantee" tidak ada sama sekali di halaman; kalimat itu ditulis sebagai pengaman, bukan dikutip. Atas instruksi pemilik situs, dihapus. Jawabannya sekarang berhenti pada apa yang memang tertulis di halaman.

2. **Kapasitas Sun Goddess diselaraskan 100 → 135.** Halaman sunset menuliskan "room for up to 100 guests", satu-satunya sumber di situs yang menyebut 100; homepage (Fleet), `lib/vessels.ts`, dan halaman Sun Goddess semuanya menyebut 135. Diperbaiki di deskripsi vessel halaman sunset **dan** di jawaban FAQ. Nol sisa "100 guests" untuk Sun Goddess di seluruh kode.

Audit ulang dijalankan untuk kata-kata berisiko (`guarantee`, `never`, `always`, `best`): tidak ada lagi kata dalam jawaban FAQ yang tidak punya padanan di halaman. Dua kemunculan "never" yang tersisa berada di komentar kode dan di copy gift voucher milik halaman, bukan di jawaban FAQ.

Catatan: titik keberangkatan diubah pemilik situs dari "Sea World Drive" menjadi "Marine Stadium Jetty & Pontoon, Main Beach" dan sudah konsisten di `lib/vessels.ts`, `lib/schema.ts`, `lib/cruise-faqs.ts`, serta halaman sunset.

### Cara mengatur ukuran baris nama produk
Nilainya ada di satu tempat: prop `titleAccent` pada `CruiseHero` di `components/CruisePageBroadwater.tsx` — `<span style={{ fontSize: '0.62em' }}>`.

Satuan `em` berarti kelipatan dari ukuran heading utama (`titleFontSize`, maksimum 76px di desktop), jadi baris itu otomatis mengecil bersama heading di layar sempit. Diukur di browser: pada `0.62em` hasilnya 47px dengan lebar 891px di 1440px, dan tetap satu baris di 1600, 1440, 1280, serta 1100px.

Ruang yang tersisa sebelum membungkus di 1440px adalah sekitar 1.072px, jadi batas praktisnya kira-kira **`0.74em`**. Di atas itu barisnya akan pecah jadi dua di desktop.

## Feature — Search bar di hero homepage (Level 1) — 5 Oktober 2026

**Status: SELESAI dibangun di branch `feature/hero-search` (5 Oktober 2026) — menunggu keputusan pemilik situs untuk digabung ke `master`.**

Catatan implementasi: agar bar tidak tertutup info bar di layar pendek, `Hero.tsx` ikut disesuaikan — tinggi minimum hero 720 → 780px dan ukuran judul sekarang ikut tinggi layar (`min(8vw, 13.5vh)`). Di layar tinggi tampilannya tidak berubah.

### Apa & untuk siapa
Permintaan dari Tony: pengunjung bisa langsung memilih jenis pengalaman dari hero homepage, tanpa menjelajah menu dulu. Menu navigasi **tidak berubah**.

Ini **Level 1**: search bar hanya **mengarahkan** pengunjung ke halaman yang tepat. Ia tidak membawa tanggal dan tidak mengecek ketersediaan kursi. Tanggal dan jumlah tamu tetap dipilih di widget booking Rezdy di halaman tujuan (seperti sekarang).

**Keputusan (5 Oktober 2026):** kolom Date dan Guests **dibuang dari Level 1**. Widget Rezdy belum tentu bisa menerima tanggal dari luar, dan kolom yang tidak berpengaruh apa-apa akan menyesatkan pengunjung. Date dan Guests masuk ke **Level 2**, bersama pengecekan ketersediaan lewat Rezdy API.

### Tampilan
Satu bar horizontal bergaya kaca (navy transparan + garis emas tipis, sama dengan badge di hero), diletakkan di hero **di antara tombol "Whale Watching / Private Charter" dan info bar bawah**. Dua tombol yang sudah ada tetap dipertahankan.

| Kolom | Isi |
|---|---|
| **Type** | `Cruise` atau `Private Charter` |
| **Experience** | Berubah mengikuti Type (lihat di bawah) |
| **Search** | Tombol emas |

- Type = Cruise -> Experience berisi `EXPERIENCE_PRODUCTS` dari `lib/products.ts`. Cruise makan siang/malam otomatis ikut tersembunyi selama `DINING_CRUISES_AVAILABLE = false`, jadi tidak ada daftar kedua yang perlu dirawat.
- Type = Private Charter -> Experience berisi `CHARTER_PRODUCTS` yang sesuai: Private, Corporate, Wedding. Catering & Menus tidak dimasukkan (bukan charter). Buffet dinner/lunch ikut tersembunyi lewat flag yang sama.
- Mobile: kolom ditumpuk vertikal, tombol Search selebar layar. Mendukung mode terang & gelap.

### Perilaku saat Search ditekan
- Pilihan **Experience** dipetakan ke `href` produk di `lib/products.ts`, lalu pengunjung diarahkan ke halaman itu.
- Cruise -> halaman cruise, langsung scroll ke widget booking (`#book`).
- Private Charter -> halaman charter masing-masing (`/private-yacht-charter`, `/corporate-yacht-charter`, `/wedding-yacht-charter`).
- Experience belum dipilih -> pesan error kecil di bawah kolom itu (tidak diam saja).

### Berkas
| Berkas | Perubahan |
|---|---|
| `components/HeroSearch.tsx` | **Baru** - komponen search bar (satu komponen, satu berkas) |
| `components/Hero.tsx` | Menyisipkan `<HeroSearch />` |
| `app/globals.css` | Gaya responsif mobile (mengikuti pola `hero-infobar` yang ada) |

`Inquiry.tsx` dan halaman cruise **tidak disentuh**. Tidak ada folder top-level baru, tabel Supabase baru, route API baru, atau paket npm baru.

### Di luar cakupan (sengaja tidak dikerjakan)
- Kolom Date & Guests, dan cek ketersediaan kursi real-time (Level 2).
- Perubahan menu navigasi.
- Halaman hasil pencarian.

### Selesai berarti
- `npm run build` lolos tanpa error TypeScript.
- Di browser, tanpa error console: (a) Cruise -> halaman benar + scroll ke `#book`; (b) Private Charter -> halaman charter yang benar; (c) validasi Experience kosong tampil; (d) tampilan mobile rapi; (e) mode terang & gelap sama-sama terbaca.
- Hero, info bar, dan dua tombol lama tetap berfungsi.

### Pertanyaan terbuka untuk Tony
1. Posisi bar di hero (di bawah dua tombol) sudah sesuai, atau mau menggantikan tombol itu?
2. Tony tadi menyebut "the dates". Apakah oke kalau tanggal ditunda ke Level 2?

### Revisi — search bar yang bisa diketik (5 Oktober 2026)

**Status: DISETUJUI (5 Oktober 2026) — pencarian hanya untuk products (cruise, charter, catering), tanpa artikel blog.**

Versi dua-dropdown (commit `dfc2351` di branch `feature/hero-search`) dinilai kurang cocok: yang dimaksud Tony kemungkinan kolom pencarian yang bisa **diketik**. Revisi ini **mengganti** dua dropdown dengan satu kolom ketik, di posisi yang sama. Versi dropdown tetap aman di riwayat git.

**Tampilan**
- Satu bar kaca gelap (gaya sama dengan sekarang): ikon kaca pembesar, kolom ketik, tombol Search emas.
- Placeholder: *Search cruises & charters* (singkat, supaya tidak terpotong di HP).

**Perilaku**
- Fokus ke kolom → muncul daftar semua pilihan. Mengetik → daftar tersaring langsung (tanpa menunggu server).
- Pencocokan memakai nama produk, sub-judul, dan kata kunci umum (mis. "whale", "sunset", "wedding", "corporate", "menu", "heli").
- Pilih dengan klik, atau panah atas/bawah + Enter. Esc menutup daftar.
- Enter tanpa memilih → membuka hasil teratas. Tidak ada hasil → pesan "No matches — try "whale" or "wedding"."
- Tujuan sama seperti sebelumnya: cruise → halaman + `#book`; charter/catering → halaman masing-masing.
- Daftar sumber: `PRODUCTS` di `lib/products.ts` (cruise + charter + Catering & Menus). Cruise makan siang/malam tetap otomatis tersembunyi lewat flag yang ada.

**Berkas**
| Berkas | Perubahan |
|---|---|
| `components/HeroSearch.tsx` | Ditulis ulang: kolom ketik + daftar saran (satu komponen) |
| `app/globals.css` | Gaya blok `.hero-search` disesuaikan |
| `components/Hero.tsx` | Tidak berubah lagi |

Peta kata kunci disimpan di `HeroSearch.tsx` supaya `lib/products.ts` (dipakai menu nav dan CMS berita) tidak disentuh.

**Di luar cakupan**: mencari artikel blog/FAQ, tanggal & ketersediaan (Level 2), perubahan menu navigasi.

**Selesai berarti**: `npm run build` lolos; di browser tanpa error console: mengetik menyaring daftar, klik/Enter/panah berfungsi, "tidak ada hasil" tampil, mobile & mode terang rapi.

**Pertanyaan terbuka**: apakah pencarian hanya untuk cruise & charter, atau juga artikel blog? (Usulan: hanya cruise & charter dulu.)

### Revisi 2 — posisi di pojok kanan atas (5 Oktober 2026)

Atas permintaan pemilik situs, search bar dipindah dari bawah tombol hero ke **pojok kanan atas hero** (di bawah header, rata kanan, lebar ±420px). Isi dan perilaku pencarian tidak berubah.

- Desktop: `position: absolute; top: 118px; right: 48px`. Daftar saran sekarang membuka **ke bawah** (ruang di bawahnya lega).
- Tablet (≤1024px): lebar 380px dan turun ke 142px supaya tidak menabrak judul.
- Mobile (≤768px): pojok kanan atas bertabrakan dengan header dan judul, jadi di HP bar menempel di bagian bawah hero (di atas tombol "Ask Kai"), saran membuka ke atas.
- Berkas: `Hero.tsx` (memindahkan satu pembungkus), `globals.css`. `HeroSearch.tsx` tidak berubah.

**Penyelarasan (5 Oktober 2026):** hero terasa tidak simetris karena bar melayang di tinggi sembarang. Sekarang di desktop garis tengah bar **sama persis dengan garis tengah eyebrow** ("SUPERYACHT CHARTERS ...") di kiri, dan tepi kanannya **lurus dengan badge rating** (gutter 48px). Rumusnya memakai `max(124px, 50vh - 300px)`, sama dengan titik mulai konten hero, jadi tetap sejajar di semua tinggi layar (diukur di 720, 768, 900, dan 1080px). Titik mulai konten hero dinaikkan dari 100px ke 124px supaya bar tidak menyentuh pita header krem di mode terang. Bar dibuat lebih ramping (400px lebar, ±53px tinggi). Placeholder di mode terang diperbaiki (sebelumnya gelap di atas kaca gelap).
