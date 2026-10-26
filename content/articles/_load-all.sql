-- All four drafted articles, in one transaction.
--
-- Paste this into the Supabase SQL editor and run it once. It inserts the four
-- drafts shipped in PRs #9 and #12 as UNPUBLISHED posts: published = false, so
-- nothing appears on the site until someone ticks Published for each one in
-- /admin.
--
-- Safe to run twice: every insert is `on conflict (slug) do nothing`, so a
-- second run changes nothing and errors on nothing.
--
-- The individual .sql files beside this one are unchanged, for loading one at a
-- time if that is preferred.
--
-- Generated 23 October 2026. Every price, date and duration in these drafts was
-- read from the Rezdy Supplier API that day. If a figure has changed since,
-- fix it in the matching .md and regenerate before loading.

begin;

-- christmas-end-of-year-boat-parties-gold-coast
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
  'christmas-end-of-year-boat-parties-gold-coast',
  'Christmas and End of Year Boat Parties on the Gold Coast: What Fits Your Group',
  'Christmas Party Boat Gold Coast: Group Sizes and Dates',
  'Work Christmas parties on the Gold Coast Broadwater, for 20 to 150 guests. Charter a superyacht or book sunset cruise seats from $79 a head.',
  'christmas party boat gold coast',
  'Two ways to put a group on the water before the end of the year, and the group size decides which one. Here are the real December dates and what each option costs.',
  'Boattime Yacht Charters',
  5,
  false,
  '/corporate-charter.webp',
  'Guests on the deck of a superyacht on the Gold Coast Broadwater',
  'https://www.boattimeyachtcharters.com/boattime-news/christmas-end-of-year-boat-parties-gold-coast',
  'The first question is always the same, and it is not about the boat. It is how
many people are coming. Answer that and the rest of the decision makes itself,
because on the Gold Coast Broadwater there are really only two shapes of
end-of-year party on the water, and the number of guests picks one.

## If you have 20 to 60 people: book seats, not a boat

Most work parties are smaller than the room they get offered. A group of 30 does
not need a 150-guest vessel and should not be paying for one.

The Luxury Scenic Sunset Cruise takes 100 guests a sailing and sells seat by
seat. It runs every Saturday and Sunday through December, departing 5:00 PM from
Marine Stadium Jetty & Pontoon at Main Beach and back at 7:30 PM. A group of 30
books 30 seats and shares the boat with other guests, which for a casual team
drinks is usually the point rather than the compromise.

**The December sailings:** Saturday 5th, Sunday 6th, Saturday 12th, Sunday 13th,
Saturday 19th, Sunday 20th, Saturday 26th and Sunday 27th. There is no sailing
on 24, 25 or 31 December.

**What a seat costs:** $79 an adult, $149 for two adults together, $55 for a
child aged 3 to 13, $11 for an infant under 3.

## If you have 60 to 150 people, or you want the boat to yourselves: charter

A whole-vessel charter is a different product. You set the date, the time, the
route, the catering and the bar, and nobody else is aboard.

**Sun Goddess** is 114 feet, takes up to 135 guests, and has two entertainment
decks, two licensed bars and a dual-level galley. **Mermaid Spirit** is a 100
foot tri-deck catamaran for up to 150 guests by day, with a chef''s kitchen, a
stinger pool and a sun lounge, and 11 en suite cabins that sleep 22 if the party
turns into a weekend.

Charter is quoted rather than ticketed, because the price moves with the date,
the hours, the catering and the bar package. There is no list rate, and any
hourly figure for these vessels published on a broker''s website is not ours.

## The three things that decide a December date

**Saturdays go first.** Eight sunset sailings exist in December and only four of
them are Saturdays. For a charter, December Saturdays are the scarcest thing on
the calendar and they are gone earliest.

**Catering is a lead time, not a menu.** Grazing boards and canapes are quick.
Private chef fine dining for 100 is not. The menu conversation should happen at
the same time as the date conversation, not after it.

**Transport is the detail people forget.** Maxi taxis are the usual answer for a
group, and the pontoon has free parking. Marine Stadium Jetty & Pontoon is about
ten minutes from Surfers Paradise and fifteen from Broadbeach.

## Frequently asked questions

### How many people can you fit on a Gold Coast party boat?

Sun Goddess carries up to 135 guests on a day charter and Mermaid Spirit up to
150, so a whole-vessel charter suits groups from about 20 up to 150. For a group
of 20 to 60, the Luxury Scenic Sunset Cruise has 100 seats a sailing and can be
booked seat by seat instead.

### How much is a Christmas party boat on the Gold Coast?

Seats on the Luxury Scenic Sunset Cruise are $79 an adult, or $149 for two
adults together. A whole-vessel charter is quoted on the date, the hours, the
catering and the bar package, so it needs an enquiry rather than a list price.

### What dates are available for a December boat party on the Gold Coast?

The sunset cruise sails every Saturday and Sunday in December: the 5th, 6th,
12th, 13th, 19th, 20th, 26th and 27th. There is no sailing on 24, 25 or 31
December. Charter dates are separate and are confirmed on enquiry.

### Where does the boat leave from?

Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast. Roughly ten minutes from
Surfers Paradise and fifteen from Broadbeach, with free parking at the pontoon.

### Can we bring our own food or drinks?

No. Both vessels have two bars each, with bar tab or consumption options, and
catering is arranged through our culinary partners. No external food or beverage
is permitted on board.

## Where to start

If you know your numbers and your date, the enquiry form is the fastest route:
it goes straight to the team who hold the calendar. If you are between the two
options, say how many people and roughly when, and we will tell you which one
makes sense rather than which one is bigger.',
  ARRAY['Charter', 'Events']::text[],
  ARRAY['christmas party', 'corporate events', 'group bookings', 'gold coast', 'broadwater']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;

-- gold-coast-yacht-wedding-planning-guide
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
  'gold-coast-yacht-wedding-planning-guide',
  'Planning a Wedding on a Yacht on the Gold Coast: The Practical Guide',
  'Gold Coast Yacht Wedding: A Practical Planning Guide',
  'Guest numbers, the ceremony, the celebrant, the light and the wet weather plan. What actually decides a Gold Coast yacht wedding, in order.',
  'gold coast yacht wedding',
  'The decisions that matter, in the order they matter. Guest count picks the vessel, the celebrant is yours to book, and the light decides your ceremony time.',
  'Boattime Yacht Charters',
  6,
  false,
  '/wedding-charter-images/wedding1.webp',
  'A wedding ceremony on the foredeck of a yacht on the Gold Coast Broadwater',
  'https://www.boattimeyachtcharters.com/boattime-news/gold-coast-yacht-wedding-planning-guide',
  'A wedding on the water is not a venue with a different view. It is a venue with
a fixed guest list, a fixed timeline and a departure time, and those three
things decide most of what follows. Here is the order the decisions actually
come in, rather than the order the inspiration photos suggest.

## 1. Your guest count picks the vessel, not the other way round

This is first because nothing else can be settled until it is. There are two
vessels and the number decides which one.

**Sun Goddess** takes up to 135 guests on a day charter. It is 114 feet, with
two entertainment decks, two licensed bars and a dual-level galley, and the
foredeck is the part most couples are picturing.

**Mermaid Spirit** takes up to 150 guests by day. It is a 100 foot tri-deck
catamaran with a chef''s kitchen, and it has 11 en suite cabins that sleep 22, so
it is the one to ask about if the wedding party is staying aboard.

A boat has a hard ceiling in a way a function room does not. A room can squeeze
in ten more; a vessel cannot. So the guest list needs to be close to final
earlier than it would be on land, and it is worth deciding before you fall in
love with a particular deck.

## 2. The ceremony can happen on board, and the celebrant is yours to book

Yes, you can marry on the foredeck with the Broadwater behind you. What people
do not always realise is that the celebrant is a separate booking: you need a
registered marriage celebrant, and they come to the boat. We can recommend
partners if you do not already have someone.

Treat it as its own line on the plan with its own confirmation, because it is
the one element that cannot be improvised on the day.

## 3. The light decides your ceremony time

On land you pick a time and the light is whatever it is. On the Broadwater the
light is the reason you are there, so run it the other way: decide when you want
the ceremony photographed, then build the timeline backwards from it.

A late afternoon ceremony puts the vows in soft light and the reception into
golden hour and dusk, which is the sequence most couples are after. An earlier
start gives you brighter, higher-contrast photographs and a longer reception
before dark. Neither is better. They are different evenings, and choosing
deliberately is better than discovering which one you booked.

## 4. Catering is a lead time before it is a menu

Everything from canapes and grazing boards through buffets to multi-course
seated dinners and private chef fine dining is available, through our culinary
partners. The thing to know early is that the ambition level sets the lead time.
Canapes for 60 is a short conversation. A seated multi-course dinner for 130 is
not, and it needs to be settled at roughly the same time as the date rather than
two months out.

Bar service runs on a bar tab or by consumption, and drinks packages are
available. No external food or beverage comes aboard, so the catering
conversation is the whole food conversation.

## 5. Styling, flowers and the things you can add

Floral arrangements, table styling and custom decor can all be coordinated
through the event team, so you are not obliged to bring a separate supplier for
each. Entertainment is available as a DJ or a band. Photography and videography
can be arranged, and on some charters watersports are available if the day turns
into an afternoon rather than an evening.

The useful question to ask is not what is possible but what is coordinated: the
more that runs through one team, the fewer vendors you are managing from a boat
that has already left the pontoon.

## 6. Have the wet weather answer before you need it

Both vessels have covered deck areas and interior spaces, so an event runs
whatever the sky does, and there is always a contingency plan. Ask for yours in
writing when you book rather than on the morning. It usually comes down to where
the ceremony moves to, and knowing that in advance is the difference between a
change of plan and a crisis.

## 7. Getting everyone there

Departure is from Marine Stadium Jetty & Pontoon at Main Beach, roughly ten
minutes from Surfers Paradise and fifteen from Broadbeach, with free parking at
the pontoon. For a guest list in the dozens, maxi taxis are the usual answer.

The one instruction worth repeating on the invitation: a boat leaves. Put a
be-there-by time on the invite that is well before the departure time, because
the vessel cannot wait for the car that took a wrong turn.

## What it costs

Charter is quoted rather than priced from a list, because the figure moves with
the date, the hours, the guest count, the catering and the bar. There is no list
rate, and any hourly figure for these vessels published on a broker''s website is
not ours.

If you want a real number, the fastest route is to send a date, a rough guest
count and the kind of catering you have in mind. That is enough to quote
against.

## Frequently asked questions

### How many guests can you have at a yacht wedding on the Gold Coast?

Sun Goddess accommodates up to 135 guests for a day charter and Mermaid Spirit
up to 150. Mermaid Spirit also has 11 en suite cabins sleeping 22, for a wedding
party staying on board.

### Can you legally get married on a boat on the Gold Coast?

Yes. The ceremony can be held on the foredeck with the Broadwater as the
backdrop. You need to book a registered marriage celebrant separately, and they
join the vessel. We can recommend partners if you do not have one.

### Where does a Gold Coast yacht wedding depart from?

Marine Stadium Jetty & Pontoon, Main Beach, about ten minutes from Surfers
Paradise and fifteen from Broadbeach. There is free parking at the pontoon.

### What happens if it rains on a yacht wedding?

Both vessels have covered deck areas and interior spaces, so the event runs
regardless of the weather, and a contingency plan is agreed in advance. Ask for
yours in writing at the time of booking.

### How much does a yacht wedding cost on the Gold Coast?

It is quoted rather than listed, because the price moves with the date, the
hours, the guest count, the catering and the bar package. A date and a rough
guest count are enough to quote against. Any hourly rate for these vessels
published on a broker''s site is not the operator''s.

### Can you arrange flowers, styling and entertainment?

Yes. Floral arrangements, table styling and custom decor are coordinated through
the event team, and a DJ or band, photography and videography can all be
arranged.

## Where to start

Send a date, a guest count and the catering you are imagining. The date is the
scarce part, particularly on a Saturday, so it is worth asking about before the
rest is decided.',
  ARRAY['Charter', 'Weddings']::text[],
  ARRAY['wedding', 'yacht wedding', 'gold coast', 'broadwater', 'ceremony', 'reception']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;

-- how-much-does-it-cost-to-charter-a-yacht-on-the-gold-coast
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
  'how-much-does-it-cost-to-charter-a-yacht-on-the-gold-coast',
  'How Much Does It Cost to Charter a Yacht on the Gold Coast?',
  'What a Gold Coast Yacht Charter Actually Costs',
  'What moves the price of a Gold Coast yacht charter, why the hourly rates you find online are not the operator''s, and what a quote needs from you.',
  'how much does it cost to charter a yacht on the gold coast',
  'Nobody can quote this from a web page, and anyone who does is guessing. Here is what actually moves the number, and the four things a real quote needs.',
  'Boattime Yacht Charters',
  5,
  false,
  '/corporate-charter.webp',
  'A superyacht on the Gold Coast Broadwater',
  'https://www.boattimeyachtcharters.com/boattime-news/how-much-does-it-cost-to-charter-a-yacht-on-the-gold-coast',
  'This is the most asked question in the category and the least honestly answered.
Most pages that rank for it give you a range wide enough to be useless, or an
hourly rate that turns out not to be the operator''s. So here is the mechanism
instead: what moves the number, and what a real quote needs from you.

## Why there is no list price, and why that is not evasion

A charter is not a ticket. A ticketed cruise has one price because it has one
route, one duration and a fixed inclusion list. A charter has none of those
fixed until you set them, and each one moves the cost:

- **The date.** A Saturday in December and a Tuesday in February are not the
  same product, because demand for the first is finite and the second is not.
- **The hours.** Crew, fuel and catering all scale with duration, and a three
  hour charter and a six hour charter are not proportional, because the fixed
  costs of getting underway are the same for both.
- **The guest count.** This drives catering, bar and crew, and it determines
  which vessel you need.
- **The catering and bar.** Canapes for 40 and a seated multi-course dinner for
  130 are different businesses. The bar can run as a tab or by consumption,
  which also changes how the final figure lands.
- **The extras.** Entertainment, styling, photography, watersports. Each is
  optional and each is additive.

A list price that covered all of that would have to be a worst-case number, and
you would be quoted something higher than what you actually want.

## The hourly rates you will find online are usually not the operator''s

If you search for a specific vessel you will often find an hourly rate on a
broker or boat-hire aggregator. Those figures are set by the site publishing
them, not by the operator, and they frequently include that site''s own margin or
describe a package the operator does not sell.

A worked example from this market: a boat hire aggregator currently publishes
an hourly figure for Sun Goddess. Boat Time does not publish an hourly rate for
Sun Goddess at all. Whichever number is right, only one of those two parties
takes the booking.

The practical advice is narrow: treat any price you did not get from the
operator as an indication of what a middleman wants to charge, and check it
against a direct quote before you budget around it.

## What a quote needs from you, and why it is only four things

1. **A date,** or two or three candidate dates.
2. **A rough guest count.** Rough is fine. The difference between 40 and 120
   matters; the difference between 48 and 52 does not.
3. **How long you want to be out.** If you do not know, say what the occasion is
   and a sensible duration gets suggested.
4. **What kind of food and drink you are imagining.** Canapes, a BBQ, a buffet,
   or a seated dinner. That is enough.

With those four, a quote is a short conversation. Without them, any number
anyone gives you is a guess dressed as an answer.

## Where a ticketed cruise is the better answer

Sometimes the honest answer to "what does a charter cost" is that you do not
want a charter.

If you have 20 to 60 people and the occasion is drinks rather than a private
event, seats on the Luxury Scenic Sunset Cruise cost $79 an adult, with 100
seats a sailing and a published schedule. You share the vessel, which for team
drinks or a birthday is usually the point rather than a compromise. A charter
makes sense when you need the boat to yourselves, the route to be yours, or the
guest list to be above about 60.

## What Boat Time has, so you can size the question

**Sun Goddess:** 114 feet, up to 135 guests on a day charter, two entertainment
decks, two licensed bars.

**Mermaid Spirit:** a 100 foot tri-deck catamaran, up to 150 guests by day, 11
en suite cabins sleeping 22 overnight, chef''s kitchen, stinger pool.

Both depart Marine Stadium Jetty & Pontoon at Main Beach, roughly ten minutes
from Surfers Paradise, with free parking at the pontoon.

## Frequently asked questions

### How much does it cost to charter a yacht on the Gold Coast?

It is quoted rather than listed, because the price moves with the date, the
duration, the guest count, the catering and the bar package. A date and a rough
guest count are enough to get a real number.

### Why do you not publish a price?

Because a single figure would have to assume the most expensive version of every
variable. A charter has no fixed route, duration or inclusion list until you set
them, and each of those changes the cost.

### Are the hourly rates on boat hire websites accurate?

They are set by the website publishing them rather than by the operator, and
they often include that site''s margin or describe a package the operator does not
sell. Check any such figure against a direct quote before budgeting around it.

### What is the cheapest way to get a group on the water on the Gold Coast?

For 20 to 60 people where you do not need the vessel to yourselves, seats on the
Luxury Scenic Sunset Cruise are $79 an adult, with 100 seats a sailing. A charter
is the answer when you need exclusivity, a custom route, or more than about 60
guests.

### What do you need from me to quote a charter?

A date or a few candidate dates, a rough guest count, roughly how long you want
to be out, and the kind of catering you have in mind.

## Ask for the number

Send the four things above. The date is the part that runs out, especially on a
Saturday and especially in December.',
  ARRAY['Charter']::text[],
  ARRAY['yacht charter', 'cost', 'gold coast', 'private charter', 'quote']::text[],
  ARRAY['Article', 'FAQPage']::text[]
)
on conflict (slug) do nothing;

-- what-happens-on-a-gold-coast-sunset-cruise
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

commit;

-- After running, confirm with:
--   select slug, published, created_at from posts
--    where slug in (
--      'christmas-end-of-year-boat-parties-gold-coast',
--      'gold-coast-yacht-wedding-planning-guide',
--      'how-much-does-it-cost-to-charter-a-yacht-on-the-gold-coast',
--      'what-happens-on-a-gold-coast-sunset-cruise')
--    order by slug;
