# Article drafts, ready to load

Articles live in the Supabase `posts` table, not in this repository, so a pull
request cannot publish one. These files are the drafts in a form that loads in
one step, and the owner's approver still decides whether they go live.

## How to load one

**Either** open `/admin`, create a post, and copy each field from the `.md`
file's front matter into the matching field in the form.

**Or** paste the matching `.sql` file into the Supabase SQL editor and run it.
Each insert sets `published = false`, so nothing goes live until someone ticks
Published in the admin. Each one is also `on conflict (slug) do nothing`, so
running it twice is safe.

## What is in here, and why

Both drafts answer a query where this site was measured on 23 October 2026 as
ranking nowhere, or as needing defending. The measurement is in the Asri record
at `clients/boattime/seo/rankings-2026-10-23.md`.

| File | Query it answers | Why |
|---|---|---|
| `christmas-end-of-year-boat-parties-gold-coast` | "christmas party boat gold coast" and its variants | Nothing from this site appeared in the top 30. The competing results are venue directories that list by capacity, which is exactly what this buyer searches. Eight December sunset sailings were holding 787 unsold seats when Rezdy was read on 23 October |
| `what-happens-on-a-gold-coast-sunset-cruise` | The three questions Google's own "People also ask" box returned for "gold coast sunset cruise" | This site is already on page one at about position four for that term. The job is to defend it and to be the source an AI answer quotes, not to chase it |
| `gold-coast-yacht-wedding-planning-guide` | "gold coast yacht wedding" and its variants | `/wedding-yacht-charter` receives **zero** in-body links from any of the 39 published articles, because not one of them is about weddings. The October citation pass found that answer held by Easy Weddings and Bridebook, with Boat Time named in September and not in October |
| `how-much-does-it-cost-to-charter-a-yacht-on-the-gold-coast` | "How much does it cost to hire a yacht on the Gold Coast", which Google itself returned in the "People also ask" box for "private yacht charter gold coast" | Verified demand, and the page currently holding that answer is a competitor's guide. Charter has no published rate, so the article answers the mechanism rather than inventing a figure |

## Every figure in these drafts

Read from the Rezdy Supplier API on 23 October 2026. If a price, a date or a
duration has changed since, fix it here before loading, because the booking
system is the source of truth for this account and the website is not.

No review count, no star rating and no award appears in either draft. There is
no verified source for any of the figures this site has published for those.

## The rule every future article follows, added 10 November 2026

**An article may not carry a money page's head term at the front of its title
tag.** This is not style. It is measured.

Across 13 October to 9 November the sunset and Broadwater cluster held nine
Boattime URLs. `/luxury-broadwater-cruise`, which takes the booking, had 2,210
impressions and 45 clicks. The eight articles around it had 1,196 impressions
and **4 clicks between them**, and the two that lead with the booking page's own
head term took one click each while sitting directly above or below it in the
results.

The two best-performing articles in the same cluster are the two that answer a
specific question and carry no head term:

| Article | Position |
|---|---|
| `sunset-cruise-vs-dinner-cruise-gold-coast-which-is-right-for-you` | **5.4** |
| `what-time-do-sunset-cruises-leave-on-the-gold-coast-best-times-explained` | **5.7** |
| `gold-coast-sunset-cruise-the-complete-guide-to-cruising-the-broadwater` | 11.7 |
| `how-to-choose-the-best-sunset-cruise-on-the-gold-coast` | 33.6 |

A specific question ranks and does not compete. A "complete guide" carrying the
head term competes and does neither well.

So, before writing:

1. Pull Search Console for the last 28 days by query and page.
2. List the head commercial queries a money page already owns.
3. The new article may not target any of them, or a close variant, in its
   title, H1 or slug. Informational long tail only.
4. Link to the money page for the topic, early, with an anchor that names the
   product.

`_retitle-sunset-cannibals.sql` is the repair for the two that broke this rule
before it was written down.

## State of this folder, checked 13 November 2026

**All four October drafts are live, and all four are live as raw Markdown.**
Each slug returns 200. Each page has zero `<h2>`, zero `<h3>` and one `<p>`,
with literal `##` and `**` in the text, because `components/ArticlePage.tsx`
injects `posts.content` as HTML and the SQL Asri supplied held Markdown. The
FAQ schema is missing on all four for the same reason. The fault is in the
files, not in how they were loaded.

| File | What to do | State |
|---|---|---|
| `_fix-markdown-content.sql` | **Run this first.** Replaces `content` on the four live rows with the same words as HTML. Touches only rows still holding Markdown, so it is safe to run twice | Not run |
| `planning-a-work-event-on-the-water-organisers-checklist.sql` | New draft, already HTML, `published = false` | Not loaded |
| `_retitle-sunset-cannibals.sql` | Nothing | Run: both live titles are the new ones |
| The four October `.sql` files and `_load-all.sql` | Nothing. They are `on conflict (slug) do nothing`, so they are inert now the rows exist. **Do not reuse them as a pattern**: their `content` is Markdown | Superseded |

## How a draft becomes SQL from now on

`python3 build_sql.py insert <slug>` reads `<slug>.md` and writes `<slug>.sql`
with `content` as HTML: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<strong>` and
`<a>`. It stops with an error on any Markdown it does not handle, rather than
passing it through. `python3 build_sql.py fix <slug>` prints an `update` for a
row that is already live.

## The new draft, and the check it passed

`planning-a-work-event-on-the-water-organisers-checklist` is for the person
handed a team day or client evening. It links to `/corporate-yacht-charter` in
its second paragraph with the anchor "corporate yacht charter on the Gold
Coast".

The head terms `/corporate-yacht-charter` holds in Search Console are
"corporate yacht charter", "corporate cruise charter", "corporate yacht
events", "yacht corporate events" and "corporate boat hire gold coast". None
appears in the article's title, H1 or slug. That list is from the 28 days to
11 November: Search Console could not be re-pulled on 13 November.

Its figures: vessel capacities from `lib/vessels.ts`, the event details from
`CORPORATE_FAQS` in `lib/faqs.ts`, and the sunset cruise's $79 adult price, 100
seats and Saturday and Sunday sailings from Rezdy, read on 13 November 2026.

## The FAQ schema reads the FAQ section

`extractFAQ()` in `app/boattime-news/[slug]/page.tsx` used to emit the first ten
headings of any kind as questions. An article with eight section headings above
its FAQ published those as its FAQ schema and never reached the real questions.
It now reads only the section under an `<h2>` reading "Frequently asked
questions" when there is one, and behaves as before when there is not. So end
every article with that heading and put each question in an `<h3>`.
