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
