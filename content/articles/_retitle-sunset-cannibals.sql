-- Stop two live articles competing with the page that takes the sunset booking.
--
-- Paste into the Supabase SQL editor and run once. It changes titles and meta
-- only: no content, no slug, no URL, nothing unpublished, nothing deleted.
-- Every previous value is recorded in the comments so this is reversible by
-- hand in under a minute.
--
-- WHY, measured in Search Console over 13 Oct to 9 Nov 2026.
--
-- Nine Boattime URLs now compete in the sunset and Broadwater cluster. The
-- page that takes the booking, /luxury-broadwater-cruise, holds 2,210
-- impressions and 45 clicks. The eight articles around it hold 1,196
-- impressions and 4 clicks between them.
--
-- Two of those articles lead with the money page's own head term in the title
-- tag, which is the strongest on-page signal there is:
--
--   /luxury-broadwater-cruise          title: "Gold Coast Sunset Cruise on the Broadwater | Boattime"
--   ...the-complete-guide-to-cruising  title: "Gold Coast Sunset Cruise: Complete Broadwater Guide | Boattime"
--
-- The same four words, in the same order, at the front of both. The article
-- sits at position 11.7 and the booking page at 13.7 on the cluster, and for
-- the head term "sunset cruise gold coast" the article is at 13.4 against the
-- booking page's 5.3. The article took ONE click in 28 days across every query
-- it ranks for.
--
-- Note what the cluster's best performers look like, because it is the whole
-- argument: the two articles that do NOT carry the head term rank best of all
-- the articles. "sunset-cruise-vs-dinner-cruise" sits at 5.4 and
-- "what-time-do-sunset-cruises-leave" at 5.7. A specific question ranks and
-- does not compete. A "complete guide" carrying the head term competes and
-- does neither well.
--
-- WHAT THIS DOES NOT DO. It does not touch the slug, so no URL changes, no
-- redirect is needed and no history is lost. It does not unpublish anything.
-- The articles keep every word of their content.

begin;

-- 1. The direct collision. Re-angled onto the Broadwater terms it ALREADY
--    ranks for and the booking page does not chase: "gold coast broadwater
--    cruise" at 7.5, "gold coast broadwater scenic cruise" at 13.2,
--    "broadwater lunch cruises gold coast" at 36.3. Those are its own, and
--    they cover lunch and scenic trips as well as sunset, which the booking
--    page does not.
--
--    was title:            Gold Coast Sunset Cruise: The Complete Guide to Cruising the Broadwater
--    was meta_title:       Gold Coast Sunset Cruise: Complete Broadwater Guide | Boattime
--    was focus_keyword:    (left as found; set explicitly below)
update posts set
  title            = 'The Gold Coast Broadwater: A Guide for First Time Cruisers',
  meta_title       = 'Gold Coast Broadwater Cruising Guide | Boattime',
  meta_description = 'What the Broadwater is, what you pass on the way through it, and how scenic, lunch and evening trips differ. A plain guide for anyone cruising it for the first time.',
  focus_keyword    = 'gold coast broadwater cruise'
where slug = 'gold-coast-sunset-cruise-the-complete-guide-to-cruising-the-broadwater';

-- 2. The lighter one. Its H1 is a genuine how-to and stays exactly as it is.
--    Only the meta_title led with the head term, and it sits at 33.6, far
--    enough from the booking page that nothing else needs changing.
--
--    was meta_title:       Best Sunset Cruise Gold Coast: How to Choose | Boattime
update posts set
  meta_title = 'How to Choose a Gold Coast Sunset Cruise | Boattime'
where slug = 'how-to-choose-the-best-sunset-cruise-on-the-gold-coast';

-- Check before committing: this should return exactly 2 rows, with the new
-- titles, and both still published.
select slug, title, meta_title, published
from posts
where slug in (
  'gold-coast-sunset-cruise-the-complete-guide-to-cruising-the-broadwater',
  'how-to-choose-the-best-sunset-cruise-on-the-gold-coast'
);

commit;
