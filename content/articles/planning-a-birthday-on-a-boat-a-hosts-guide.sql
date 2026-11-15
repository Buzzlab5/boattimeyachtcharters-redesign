-- Draft article for the Boattime posts table.
-- Generated from planning-a-birthday-on-a-boat-a-hosts-guide.md by build_sql.py. content is HTML, which is what
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
  'planning-a-birthday-on-a-boat-a-hosts-guide',
  'Planning a Birthday on a Boat: A Host''s Guide',
  'Planning a Birthday on a Boat: A Host''s Guide',
  'Day or evening, guest list, catering, getting everyone there and home. What to decide, in order, when the party for a 21st, 40th or 60th is on the water.',
  'birthday on a boat',
  'A milestone birthday on the water is easy to love and easy to under-plan. Here is what to decide, in the order it needs deciding.',
  'Boattime Yacht Charters',
  5,
  false,
  '/private-charter.jpeg',
  'Sun Goddess under way on the Gold Coast Broadwater on a clear day',
  'https://www.boattimeyachtcharters.com/boattime-news/planning-a-birthday-on-a-boat-a-hosts-guide',
  '<p>A 21st, a 40th, a 60th. Somebody suggests doing it on the water, and everyone agrees before anyone has worked out what that means. A boat makes a very good party room. It is also a room that leaves at a fixed time and comes back at a fixed time, and that changes how you plan it.</p><p>If you already know you want a whole vessel for your guests, the page that takes the enquiry is <a href="/private-yacht-charter">private yacht charter on the Gold Coast</a>. What follows is for getting the plan straight first.</p><h2>1. Choose day or evening before anything else</h2><p>It decides the menu, the dress, the music and who comes.</p><ul><li><p><strong>A day on the water</strong> suits a relaxed, mixed-age crowd. On a three hour day charter the usual plan is a swim stop at Wave Break Island, with food on board.</p></li><li><p><strong>An evening</strong> suits a party. The boat generally heads north to watch the sun go down, then returns to the southern Broadwater for the city lights after dark. Sunset cocktails and canapés, leaving Main Beach at five o''clock, is one of the standard starting points.</p></li></ul><p>If the guest of honour cannot pick, ask what they would want the photos to look like. That usually settles it.</p><h2>2. Get the guest list into the right bracket</h2><p>You do not need final numbers yet. You need the bracket, because it picks the boat:</p><ul><li><p><strong>Sun Goddess</strong> is a 114 foot superyacht for up to 135 guests on a day charter, with two entertainment decks, two licensed bars and Bose sound throughout.</p></li><li><p><strong>Mermaid Spirit</strong> is a 100 foot tri-deck catamaran for up to 150 guests by day, with a chef''s kitchen on board and three full decks to spread across.</p></li></ul><p><strong>If it is a small group</strong>, a whole vessel may be more boat than the party needs. The Luxury Scenic Sunset Cruise is booked seat by seat, two and a half hours on the Broadwater, with the current price shown on the booking page. You share the boat with other guests, so it suits a dinner-sized group celebrating together rather than a party with speeches and a playlist.</p><h2>3. Settle food and drink early</h2><p>Both vessels have two bars, run on a bar tab or on consumption, and food is handled by the operator''s culinary partners: grazing boards and canapés through to a barbecue, a buffet or a private chef. Catering has to be booked in advance, so ask for the full list when you enquire.</p><p>One rule catches people out: <strong>no outside food or drink is allowed on board.</strong> That includes the cake. Ask about it when you book the catering rather than turning up with one.</p><h2>4. Work out how everyone gets there and home</h2><p>Every guest boards at Marine Stadium Jetty &amp; Pontoon, Doug Jennings Park, Main Beach, about ten minutes from Surfers Paradise and fifteen from Broadbeach. There is free parking at the pontoon. Check the signs, and if anyone plans to leave a car overnight, street parking avoids a tow.</p><p>For a party, plan for nobody to drive. Maxi taxis are the usual answer for groups, and booking them for the return trip before the night starts saves the scramble at the pontoon.</p><h2>5. Tell the crew about anyone who needs help boarding</h2><p>Boarding is a step up from the pontoon and the charters are not currently wheelchair accessible. Exceptions may be possible with at least a week''s notice, so the crew can review what is needed and confirm whether it can be done safely. Electric wheelchairs cannot come on board. If a grandparent or anyone else needs a hand, say so when you enquire, not on the day.</p><h2>6. Write the invitation around the boarding time</h2><p>The boat leaves on schedule, and a guest who is ten minutes late watches it go. So the invitation should give:</p><ul><li><p>the boarding time, set earlier than departure</p></li><li><p>the boarding place, by name, with a map link</p></li><li><p>day or evening, and what that means for clothes and shoes</p></li><li><p>how people are getting home</p></li></ul><h2>Frequently asked questions</h2><h3>How many people can you have at a birthday on a boat?</h3><p>On a whole-vessel charter, up to 135 guests on Sun Goddess and up to 150 by day on Mermaid Spirit. A smaller group that does not need a boat to itself can book seats on the Luxury Scenic Sunset Cruise.</p><h3>Can we bring our own birthday cake?</h3><p>No outside food or drink is permitted on board, so raise the cake when you book the catering and ask whether a cake can be included in the order.</p><h3>Can we swim during a birthday cruise?</h3><p>On a day charter the usual plan includes a swim stop at Wave Break Island. An evening charter follows the sunset and the city lights instead.</p><h3>Will guests get seasick?</h3><p>Charters mainly run in the calm, protected waters of the Gold Coast Broadwater. If a trip goes offshore into the open ocean there is a possibility of larger waves, and the skipper plans the route around the day''s conditions.</p><h3>Where do guests board?</h3><p>At Marine Stadium Jetty &amp; Pontoon, Doug Jennings Park, Main Beach, with free parking at the pontoon.</p><h2>Start with the date</h2><p>A vessel takes one party at a time, so the date comes first. Send the occasion, the rough guest count, day or evening, and the date through the <a href="/private-yacht-charter">private yacht charter</a> page, and the rest can be settled from there.</p>',
  ARRAY['Charter']::text[],
  ARRAY['birthday', 'milestone birthday', 'party planning', 'celebration', 'gold coast', 'broadwater']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;
