-- Draft article for the Boattime posts table.
-- Generated from gold-coast-yacht-wedding-planning-guide.md on 2026-10-23. published = false: nothing goes live
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
