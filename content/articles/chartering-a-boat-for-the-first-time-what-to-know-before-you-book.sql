-- Draft article for the Boattime posts table.
-- Generated from chartering-a-boat-for-the-first-time-what-to-know-before-you-book.md by build_sql.py. content is HTML, which is what
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
  'chartering-a-boat-for-the-first-time-what-to-know-before-you-book',
  'Chartering a Boat for the First Time: What to Know Before You Book',
  'Chartering a Boat for the First Time: What to Know',
  'Whole boat or a ticket, what the crew does, what is on board, where you go and what to ask. The questions first-time charter guests ask, answered in order.',
  'chartering a boat for the first time',
  'You have never hired a whole boat before. Here is what a charter actually is, what comes with it, and the questions worth asking before you commit.',
  'Boattime Yacht Charters',
  5,
  false,
  '/mermaid-spirit-main.jpg',
  'Mermaid Spirit, a 100 ft tri-deck catamaran, on the Gold Coast Broadwater',
  'https://www.boattimeyachtcharters.com/boattime-news/chartering-a-boat-for-the-first-time-what-to-know-before-you-book',
  '<p>Most people who charter a boat have never done it before. They have been on a ferry, maybe a ticketed cruise, and now they are looking at hiring a whole vessel for an occasion. The words are unfamiliar and nobody wants to ask a basic question. This covers the basic questions.</p><p>If you already know what you want, the page that takes the enquiry is <a href="/private-yacht-charter">private yacht charter on the Gold Coast</a>. Read on if you are still working out what you would be asking for.</p><h2>A charter means the whole boat is yours</h2><p>On a ticketed cruise you buy a seat and share the boat with strangers on a fixed route. On a charter you hire the vessel and its crew for your group alone. The time, the route within the operating area, the food and the music are built around you.</p><p>That changes the question you ask. With a ticket, you ask what the cruise includes. With a charter, you say what you want and the crew tells you how the day can run.</p><p>If your group is small, a charter can be more boat than you need. A scheduled cruise such as the <a href="/luxury-broadwater-cruise">Luxury Scenic Sunset Cruise</a> is booked seat by seat and is often the better first step.</p><h2>The crew drives, and you do not need a licence</h2><p>A crewed charter comes with a skipper and crew. You are a guest, not the person at the wheel. That is the main difference from self-drive boat hire, where you take a small boat out yourself. On a crewed charter the skipper reads the weather and the water and chooses the route on the day.</p><h2>Match the boat to the number of guests</h2><p>Capacity is the first thing to settle, because it decides which vessel you are talking about. Boat Time runs two:</p><ul><li><p><strong>Sun Goddess</strong>, a 114 ft superyacht with two entertainment decks and two licensed bars, for up to 135 guests on a day charter. <a href="/sun-goddess-gold-coast">See Sun Goddess</a>.</p></li><li><p><strong>Mermaid Spirit</strong>, a 100 ft tri-deck catamaran with a chef''s kitchen, for up to 150 guests by day, and sleeping 22 overnight. <a href="/mermaid-spirit-gold-coast">See Mermaid Spirit</a>.</p></li></ul><p>A firm guest number, even a range, is the most useful thing you can give in a first enquiry.</p><h2>Food and drink are arranged with the boat</h2><p>Each vessel has two bars, run on a bar tab or on consumption. Food comes through Boat Time''s culinary partners, from grazing boards and canapes through buffets to a private chef. Ask for the catering list when you enquire, because catering is booked in advance.</p><p>Do not assume you can bring your own. The homepage FAQ says no external food or beverages are permitted on board. If something matters to you, such as a cake, ask the question in writing at enquiry and keep the answer.</p><h2>Where you go depends on the time of day</h2><p>Most charters run the Gold Coast Broadwater, which is calm and protected. On a three hour day charter, guests usually stop for a swim at Wave Break Island. In the evening the boat generally heads north for the sunset and returns to the southern Broadwater for the city lights after dark. When conditions allow, the crew can push north into Moreton Bay.</p><p>Mermaid Spirit also carries jet skis, paddle boards and a stinger-proof pool deployed at anchor, so a day charter on her can be built around time in the water.</p><h2>Getting there, and getting on</h2><p>Both boats depart from Marine Stadium Jetty &amp; Pontoon at Doug Jennings Park, Main Beach: about ten minutes from Surfers Paradise and fifteen from Broadbeach. There is free parking; check the signs when you park. For groups, maxi taxis are the usual answer.</p><p>Boarding is a step up from the pontoon. The charters are not wheelchair accessible and electric wheelchairs are not permitted on board. If a guest needs help, tell the team at least a week before departure so the crew can work out whether it can be done safely.</p><h2>Questions worth asking before you commit</h2><ul><li><p>Which vessel suits our number, and for how many hours?</p></li><li><p>What does the catering list look like, and how far ahead must it be confirmed?</p></li><li><p>Is the bar a tab or on consumption, and can we set a limit?</p></li><li><p>What happens to the plan if the weather turns?</p></li><li><p>What time should guests arrive, and when does the boat actually leave?</p></li></ul><p>For what drives the price, read <a href="/boattime-news/how-much-does-it-cost-to-charter-a-yacht-on-the-gold-coast">how much it costs to charter a yacht on the Gold Coast</a>.</p><h2>Frequently asked questions</h2><h3>Do I need a boat licence to charter a yacht?</h3><p>No. A crewed charter comes with a skipper and crew who run the vessel. You and your guests are on board as passengers.</p><h3>What is the difference between a charter and a cruise?</h3><p>A cruise sells seats on a fixed route shared with other passengers. A charter hires the whole vessel and crew for your group, with the timing and plan built around your occasion.</p><h3>Will we get seasick?</h3><p>Most charters stay inside the Gold Coast Broadwater, which is protected water with little swell. If the plan goes offshore into open ocean, larger waves are possible, and the skipper chooses the route on the day.</p><h3>Can we bring our own food and drinks?</h3><p>The site''s main FAQ says no external food or beverages are permitted on board, and catering is arranged through Boat Time''s culinary partners. Ask about anything specific when you enquire.</p><h3>What if it rains?</h3><p>Both vessels have covered decks and interior spaces, so a charter can carry on in rain. Ask what the wet weather plan is for your date when you book.</p><h2>The next step</h2><p>Send the date, the number of guests and the occasion. That is enough to start. Enquire through <a href="/private-yacht-charter">private yacht charter on the Gold Coast</a>.</p>',
  ARRAY['Charter']::text[],
  ARRAY['first time charter', 'private charter', 'what to expect', 'broadwater', 'main beach', 'gold coast']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;
