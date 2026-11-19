-- Draft article for the Boattime posts table.
-- Generated from taking-children-on-a-boat-trip-a-parents-planning-guide.md by build_sql.py. content is HTML, which is what
-- the article page renders. published = false: nothing goes live until
-- someone ticks Published in /admin.
-- Safe to run twice: on conflict (slug) do nothing.

insert into posts (
  slug,
  title,
  meta_title,
  meta_description,
  focus_keyword,
  excerpt,
  author,
  reading_time,
  published,
  image_url,
  image_alt,
  canonical_url,
  content,
  categories,
  tags,
  schema_types
) values (
  'taking-children-on-a-boat-trip-a-parents-planning-guide',
  'Taking Children on a Boat Trip: A Parent''s Planning Guide',
  'Taking Children on a Boat Trip: A Parent''s Guide',
  'Which trip suits which age, how to handle tickets for children and babies, what to pack, and how to keep a young crew happy on the water. A plain planning guide for parents.',
  'taking children on a boat trip',
  'Bringing the kids changes how you plan a cruise. Here is how to choose the right trip, what to pack and what to ask before you book.',
  'Boattime Yacht Charters',
  5,
  false,
  '/sun-goddess-main.jpeg',
  'Sun Goddess, a 114 ft superyacht, on the Gold Coast Broadwater',
  'https://www.boattimeyachtcharters.com/boattime-news/taking-children-on-a-boat-trip-a-parents-planning-guide',
  '<p>A boat trip with children is a different trip. The view is the same, but the plan has to account for nap times, snacks, sun and a short attention span. Get those right and a cruise is one of the easier family outings there is: nobody has to walk anywhere and the scenery keeps moving.</p><p>If you are planning a family outing for a small group, the <a href="/luxury-broadwater-cruise">Luxury Scenic Sunset Cruise</a> is booked seat by seat, with its own ticket types for children and for infants. For a larger family occasion, such as a milestone birthday, a reunion or grandparents'' anniversary, a <a href="/private-yacht-charter">private yacht charter</a> gives the whole boat to your group.</p><h2>Choose the trip by the youngest guest</h2><p>Plan around the youngest person coming. A trip that suits a twelve-year-old can be a long evening for a two-year-old.</p><ul><li><p><strong>A scheduled cruise</strong> runs to a fixed time and route. It suits families with school-age children who can sit through a set length, and it is the simplest way to go out as a small group.</p></li><li><p><strong>A private charter</strong> runs to your timing. You choose day or evening, how long to stay out and what the food is, which helps when there are babies or toddlers in the group and the day has to bend around them.</p></li></ul><p>Check the duration before you book. The sunset cruise runs for two and a half hours, from boarding to return.</p><h2>Tickets for children and babies</h2><p>Children and infants are priced separately from adults on the sunset cruise, so choose the right ticket type for each child when you book rather than booking everyone as an adult. The ticket page lists the age bands.</p><p>On a private charter the price is for the vessel and the arrangements, so the question is the total guest count. Count children in that number, because capacity is set by people on board, not by adults.</p><h2>What to pack for children</h2><ul><li><p><strong>Sun cover.</strong> Hats, sunscreen and a light long-sleeved layer. The Broadwater reflects the sun, and an open deck can be bright even late in the day.</p></li><li><p><strong>A warm layer for the way back.</strong> Evenings on the water cool down faster than on land.</p></li><li><p><strong>Flat, grippy shoes.</strong> Decks can be wet. Leave anything with a heel at home.</p></li><li><p><strong>Something to do.</strong> A small book or a pair of binoculars for spotting birds and boats goes further than a screen.</p></li><li><p><strong>Nappies and a change of clothes</strong> for babies and toddlers, and any medication your child takes.</p></li></ul><h2>Ask about food and drink before the day</h2><p>No outside food or drink is permitted on board, and catering is arranged with the boat. If your child has an allergy, a dietary need or is simply a fussy eater, raise it when you book so the crew and the caterer can plan for it. Do not assume you can bring a lunchbox.</p><h2>On the boat</h2><p>Sun Goddess, the vessel for the sunset cruise, has an indoor lounge as well as the open foredeck and the upper sun deck. That matters with children: if the wind picks up or a toddler needs a quiet corner, there is somewhere out of the weather.</p><p>Keep young children within reach on the open decks, and agree a simple rule before you board, such as staying with a grown-up whenever they are outside. Children take a boat''s rules more seriously when they hear them from the crew, so let them listen to the safety briefing.</p><h2>Questions parents ask</h2><h3>Are children allowed on the sunset cruise?</h3><p>Yes. The cruise sells separate ticket types for children and for infants. Choose the matching ticket for each child when booking.</p><h3>Will my child get seasick?</h3><p>The cruises mainly run in the calm, protected waters of the Gold Coast Broadwater rather than on the open ocean. If a child is prone to motion sickness, speak to your pharmacist before the day.</p><h3>Can we bring a pram?</h3><p>Ask when you book. Boarding is from a pontoon, and a compact, foldable pram is easier to stow than a large one.</p><h3>Where do we board?</h3><p>At Marine Stadium Jetty &amp; Pontoon, Doug Jennings Park, Main Beach, which has free parking. Arrive with time to spare: getting children out of the car always takes longer than planned.</p><h2>Book the right trip for your group</h2><p>For a small family outing, choose a date for the <a href="/luxury-broadwater-cruise">Luxury Scenic Sunset Cruise</a> and pick the right ticket for each child. For a family celebration where the whole boat is yours, send the occasion, the guest count and the date through the <a href="/private-yacht-charter">private yacht charter</a> page.</p>',
  ARRAY['Planning']::text[],
  ARRAY['family', 'children', 'what to bring', 'broadwater', 'main beach', 'gold coast']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;
