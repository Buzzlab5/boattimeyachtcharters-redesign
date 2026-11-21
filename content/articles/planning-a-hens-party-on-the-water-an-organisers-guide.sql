-- Draft article for the Boattime posts table.
-- Generated from planning-a-hens-party-on-the-water-an-organisers-guide.md by build_sql.py. content is HTML, which is what
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
  'planning-a-hens-party-on-the-water-an-organisers-guide',
  'Planning a Hens Party on the Water: An Organiser''s Guide',
  'Planning a Hens Party on the Water: An Organiser''s Guide',
  'Day or evening, how many to invite, food and drink rules, getting the group to the pontoon and home again. What the person in charge decides, in order.',
  'hens party on the water',
  'You have been put in charge of the hens. Here is what to settle first when the plan is a boat, and what catches organisers out.',
  'Boattime Yacht Charters',
  5,
  false,
  '/private-charter.jpeg',
  'Sun Goddess under way on the Gold Coast Broadwater on a clear day',
  'https://www.boattimeyachtcharters.com/boattime-news/planning-a-hens-party-on-the-water-an-organisers-guide',
  '<p>Somebody has to organise the hens, and it is you. The group chat has voted for a boat. That is a good call: one room, one view, nobody wandering off between venues. It is also a room that leaves at a fixed time and returns at a fixed time, so it rewards a plan made in the right order.</p><p>If you already know you want a whole vessel for the group, the page that takes the enquiry is <a href="/private-yacht-charter">private yacht charter on the Gold Coast</a>. What follows is for getting the plan straight before you send it.</p><h2>1. Decide day or evening first</h2><p>Everything else follows from it.</p><ul><li><p><strong>A day on the water</strong> is the relaxed version. On a three hour day charter the usual plan includes a swim stop at Wave Break Island, with food on board. Pack swimwear and a towel and say so on the invitation.</p></li><li><p><strong>An evening</strong> is the party version. The boat generally heads north to watch the sun go down, then comes back to the southern Broadwater for the city lights after dark. Sunset cocktails and canapés, leaving Main Beach at five o''clock, is one of the standard starting points.</p></li></ul><p>If the bride cannot choose, ask her which photo she wants on the fridge afterwards: the swim stop or the skyline.</p><h2>2. Get the numbers into a bracket</h2><p>You do not need a final headcount to enquire. You need the bracket, because it decides whether a whole boat makes sense:</p><ul><li><p><strong>Sun Goddess</strong> is a 114 foot superyacht for up to 135 guests on a day charter, with two entertainment decks, two licensed bars and Bose sound throughout.</p></li><li><p><strong>Mermaid Spirit</strong> is a 100 foot tri-deck catamaran for up to 150 guests by day, with a chef''s kitchen on board and three decks to spread across.</p></li></ul><p><strong>For a small hens group</strong>, a whole vessel can be more boat than you need. The Luxury Scenic Sunset Cruise is booked seat by seat, two and a half hours on the Broadwater, with the current price on the booking page. You share the boat with other guests, so it suits a dinner-sized group out together rather than a party with games and a playlist of your own.</p><h2>3. Sort food and drink before anything else is booked</h2><p>Both vessels have two bars, run on a bar tab or on consumption, and food is handled by the operator''s catering partners: grazing boards and canapés through to a barbecue, a buffet or a private chef. Catering has to be booked ahead, so ask for the full list when you enquire.</p><p>The rule that trips organisers up: <strong>no outside food or drink is allowed on board.</strong> That covers the cake, the bottle of champagne someone brings for the bride and the lolly bags. Raise anything you were planning to bring when you book the catering, not at the pontoon.</p><p>Decide early who is paying the bar tab, and whether the bride drinks free. Settling that before the night saves an awkward conversation at the bar.</p><h2>4. Plan the trip there and home for everyone</h2><p>The whole group boards at Marine Stadium Jetty &amp; Pontoon, Doug Jennings Park, Main Beach, about ten minutes from Surfers Paradise and fifteen from Broadbeach. There is free parking at the pontoon; check the signs, and if anyone means to leave a car overnight, street parking avoids a tow.</p><p>For a hens party, assume nobody drives. Maxi taxis are the usual answer for groups, and booking the return pick-up before the night starts beats a dozen people trying to order rides from the pontoon at once.</p><h2>5. Ask about anyone who needs help boarding</h2><p>Boarding is a step up from the pontoon and the charters are not currently wheelchair accessible. Exceptions may be possible with at least a week''s notice, so the crew can work out whether it can be done safely. Electric wheelchairs cannot come on board. If a mother, grandmother or anyone else in the group needs a hand, say so when you enquire.</p><h2>6. Write the invitation around the boarding time</h2><p>The boat leaves on schedule, and anyone ten minutes late waves from the jetty. The invitation should give:</p><ul><li><p>the boarding time, set earlier than departure</p></li><li><p>the boarding place, by name, with a map link</p></li><li><p>day or evening, and what that means for shoes and clothes</p></li><li><p>any theme or dress code, and whether it works on deck</p></li><li><p>how everyone is getting home, and who has booked it</p></li></ul><h2>Frequently asked questions</h2><h3>How many people can come to a hens party on a boat?</h3><p>On a whole-vessel charter, up to 135 guests on Sun Goddess and up to 150 by day on Mermaid Spirit. A smaller group that does not need a boat to itself can book seats on the Luxury Scenic Sunset Cruise.</p><h3>Can we bring our own drinks or a cake?</h3><p>No outside food or drink is permitted on board. Both vessels have two bars, and anything you were planning to bring should be raised when you book the catering.</p><h3>Can we swim during the party?</h3><p>On a day charter the usual plan includes a swim stop at Wave Break Island. An evening charter follows the sunset and the city lights instead.</p><h3>Will anyone get seasick?</h3><p>Charters mainly run in the calm, protected waters of the Gold Coast Broadwater. If a trip goes offshore into the open ocean, larger waves are possible, and the skipper plans the route around the day''s conditions.</p><h3>What happens if it rains?</h3><p>Both vessels have covered decks and indoor spaces, so the party carries on under cover.</p><h2>Start with the date</h2><p>A vessel takes one group at a time, so the date comes first. Send the occasion, the rough number of guests, day or evening, and the date through the <a href="/private-yacht-charter">private yacht charter</a> page, and the rest can be settled from there.</p>',
  ARRAY['Charter']::text[],
  ARRAY['hens party', 'hens night', 'party planning', 'celebration', 'gold coast', 'broadwater']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;
