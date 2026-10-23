-- Draft article for the Boattime posts table.
-- Generated from what-happens-on-a-gold-coast-sunset-cruise.md on 2026-10-23. published = false: nothing goes live
-- until someone ticks Published in /admin.
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
  'what-happens-on-a-gold-coast-sunset-cruise',
  'What Happens on a Gold Coast Sunset Cruise',
  'What Happens on a Gold Coast Sunset Cruise',
  'Boarding at 4:30 PM, 150 minutes on the Broadwater, back at 7:30 PM. What the sunset cruise includes, what to wear and what you will see.',
  'gold coast sunset cruise',
  'The questions people actually ask before booking: what the two and a half hours are made of, what is included, what to wear, and where to look.',
  'Boattime Yacht Charters',
  4,
  false,
  '/twilight-drift.jpeg',
  'Sun Goddess on the Gold Coast Broadwater at sunset',
  'https://www.boattimeyachtcharters.com/boattime-news/what-happens-on-a-gold-coast-sunset-cruise',
  'Most people booking a sunset cruise have not been on one, and the listings tend
to sell the view rather than explain the evening. Here is what the two and a half
hours are actually made of.

## The shape of the evening

Boarding opens at 4:30 PM at Marine Stadium Jetty & Pontoon, Main Beach.
Departure is 5:00 PM. You are back at the pontoon at 7:30 PM, so 150 minutes on
the water.

The route runs north through the Broadwater toward the islands, turns, and comes
back with the sun going down over Surfers Paradise. That direction matters: the
skyline is lit from behind on the way out and in front of you on the way home,
which is when most people take the photograph they keep.

The vessel is Sun Goddess, 114 feet, with two entertainment decks and two
licensed bars. There are 100 seats on a sailing, so it is a shared cruise rather
than a private charter, and there is room to move between the indoor lounge, the
open foredeck and the upper sun deck as the light changes.

## What is included and what is extra

Included: the cruise, light commentary on the surrounds, drinks service, and a
nibbles share plate for two.

Available on board as extras: cocktails, snacks, a sparkling or beer on arrival,
and an on-board photo opportunity.

No external food or beverage is permitted on board, so the bar and the kitchen
are the only sources once you are aboard.

## What to wear, and the one thing people get wrong

Smart casual. Flat shoes are better than heels on a deck. The thing people get
wrong is the temperature: the Broadwater in the evening is noticeably cooler than
the car park, especially once the sun is down and the boat is moving, so bring a
layer even in summer. Sunglasses are more useful on the outbound leg than you
would expect, because you are heading into the glare.

## What you might see

Marine life is often about in the Seaway as the yacht navigates it: dolphins,
turtles and dugongs are all regular. None of that is guaranteed on a given
evening, and anyone promising you a dolphin on a sunset cruise is selling you
something they cannot deliver.

What is reliable is the light. The Broadwater is a sheltered body of water with
the skyline on one side and the Spit on the other, which is why the evening works
whichever way the weather goes.

## When it sails, and what it costs

Saturdays and Sundays, departing 5:00 PM, with one extra sailing on Friday 20
November. Through to 3 January, with no sailing on 24, 25 or 31 December or on
1 January.

Adult $79. Two adults together $149. Child aged 3 to 13 $55. Infant under 3 $11.

## Frequently asked questions

### What time does the Gold Coast sunset cruise depart?

Boarding opens at 4:30 PM, Sun Goddess departs at 5:00 PM and returns at 7:30
PM, from Marine Stadium Jetty & Pontoon at Main Beach.

### How long is the sunset cruise?

150 minutes on the water, from a 5:00 PM departure to a 7:30 PM return.

### What happens on a sunset cruise?

You board at 4:30 PM, depart at 5:00, run north through the Broadwater toward
the islands, then turn and come back with the sun setting over Surfers Paradise.
Drinks service and a nibbles share plate for two are included, with cocktails,
snacks and arrival drinks available on board.

### What should I wear on a Gold Coast sunset cruise?

Smart casual, flat shoes rather than heels, and a layer for the trip home. The
Broadwater is cooler in the evening than the shore, particularly once the boat is
moving.

### Is the sunset cruise a private charter?

No. It is a shared cruise with 100 seats a sailing, booked seat by seat. Sun
Goddess is also available as a private charter for up to 135 guests, which is
quoted separately.

### Can you see wildlife on the sunset cruise?

Dolphins, turtles and dugongs are often about as the yacht navigates the Seaway.
Sightings are not guaranteed on any particular sailing.

## Booking

Seats are on the ticket page and confirm instantly. If you are a group of 20 or
more, say so when you book, because the seating works better when the group is
seated together rather than scattered across three decks.',
  ARRAY['Cruises']::text[],
  ARRAY['sunset cruise', 'broadwater', 'gold coast', 'sun goddess', 'what to expect']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;
