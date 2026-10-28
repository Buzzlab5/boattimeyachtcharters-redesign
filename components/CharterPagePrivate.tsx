'use client';

import CharterTemplate, { type AccordionSection } from './site/CharterTemplate';
import { PRIVATE_FAQS } from '@/lib/faqs';

// ── Shared accordion content (Yacht Layout, Dining, Inclusions, etc.) ─────────

const VESSEL_LAYOUT = (
  <div>
    <p style={{ marginBottom: 20 }}>
      <strong style={{ color: 'var(--cream)' }}>Mermaid Spirit –</strong>
    </p>
    <p style={{ marginBottom: 24 }}>
      Our newly renovated Mermaid Spirit can host up to 150 guests for day
      charters and can sleep 22 guests for overnight charters. A tri-deck
      catamaran, Mermaid Spirit boasts multiple entertainment decks and spaces
      and comes equipped with jet skis, kayaks, scuba diving gear, stinger proof
      pool and paddle boards for the more adventurous of guests.
    </p>
    <p style={{ marginBottom: 20 }}>
      <strong style={{ color: 'var(--cream)' }}>Sun Goddess –</strong>
    </p>
    <p>
      Our slightly larger vessel, Sun Goddess, can host up to 135 guests for day
      charters. We have a variety of route options depending on the requirements
      of your event. Whether your event is a birthday party, a corporate event
      or even a wedding celebration, our huge range of options will allow for us
      to work together to design your event.
    </p>
  </div>
);

const DINING_BARS = (
  <p>
    Each Vessel boasts 2 bars, with a Bar-Tab and Consumption options available,
    we can cater to your every dining need with our experienced staff and
    culinary partners &lsquo;Private Chefs of Brisbane&rsquo;.
  </p>
);

const INCLUSIONS = (
  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
    {[
      'Bars',
      'Entertainment areas',
      'Captain',
      'Crew',
      'Audio Throughout',
      "Flat Screen TV's",
      'Watersports (ask us!)',
      'Canoes',
      'Stand up paddle boards',
      'Inflatable stinger proof pool',
      'Banana boat',
    ].map((item) => (
      <li
        key={item}
        style={{
          padding: '6px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            width: 4,
            height: 4,
            background: 'var(--gold)',
            borderRadius: '50%',
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        {item}
      </li>
    ))}
  </ul>
);

const EXTRAS = (
  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
    {[
      'Catering',
      'Canapes',
      'Platters',
      'Gourmet BBQ',
      'Buffet style',
      'Fine dining',
      'Bar service',
      'Drinks packages available',
      'Bar tab (by consumption)',
      'Entertainment – DJ/band',
      'Extra Watersports',
      'Photography',
      'Videography',
    ].map((item) => (
      <li
        key={item}
        style={{
          padding: '6px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            width: 4,
            height: 4,
            background: 'var(--gold)',
            borderRadius: '50%',
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        {item}
      </li>
    ))}
  </ul>
);

const DESTINATIONS = (
  <div>
    <p style={{ marginBottom: 16 }}>
      Tour the northern Islands of the Coast&rsquo;s Broadwater or out into the
      ocean with a Surfers Paradise backdrop! We can customise your destination
      depending on availability and charter.
    </p>
    <p style={{ marginBottom: 10 }}>
      <strong style={{ color: 'var(--cream)' }}>Gold Coast</strong>
    </p>
    <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
      {[
        'Wave Break Island',
        'Sanctuary Cove',
        'Jumpinpin',
        'Scottish Prince Wreck',
      ].map((d) => (
        <li
          key={d}
          style={{
            padding: '5px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              background: 'var(--gold)',
              borderRadius: '50%',
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          {d}
        </li>
      ))}
    </ul>
    <p style={{ marginBottom: 10 }}>
      <strong style={{ color: 'var(--cream)' }}>Moreton Bay</strong>
    </p>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {[
        'Brisbane River',
        'Tangalooma',
        'Moreton Island',
        'Stradbroke Island',
      ].map((d) => (
        <li
          key={d}
          style={{
            padding: '5px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              background: 'var(--gold)',
              borderRadius: '50%',
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          {d}
        </li>
      ))}
    </ul>
  </div>
);

const AVAILABILITY = (
  <div>
    <p style={{ marginBottom: 16 }}>
      Availability depends on demand but we will always go out of our way to
      suit your preferred date and time! Please contact us on our booking
      enquiry form and we will be sure to get back to you as soon as possible.
    </p>
    <a
      href="/#inquiry"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#0A1628',
        background: '#C9A84C',
        padding: '11px 22px',
        textDecoration: 'none',
        display: 'inline-block',
      }}
    >
      Booking Enquiry →
    </a>
  </div>
);

const PRIVATE_FAQ = (
  <div>
    {PRIVATE_FAQS.map(({ q, a }) => (
      <div key={q} style={{ marginBottom: 16 }}>
        <p style={{ color: 'var(--cream)', fontWeight: 600, marginBottom: 6 }}>
          {q}
        </p>
        <p>{a}</p>
      </div>
    ))}
  </div>
);

const ACCORDION: AccordionSection[] = [
  { title: 'Yacht Layout Features', content: VESSEL_LAYOUT },
  { title: 'Dining and Bars', content: DINING_BARS },
  { title: 'Inclusions', content: INCLUSIONS },
  { title: 'Extras', content: EXTRAS },
  { title: 'Landings & Destinations', content: DESTINATIONS },
  { title: 'Availability & Booking Enquiry', content: AVAILABILITY },
  { title: 'FAQ', content: PRIVATE_FAQ },
];

// ── Left column: Packages text ─────────────────────────────────────────────────

const pStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  color: 'rgba(245,240,232,0.72)',
  lineHeight: 1.85,
  marginBottom: 16,
};

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--cream)',
  marginBottom: 16,
  marginTop: 40,
};

const dropCapStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 64,
  float: 'left',
  lineHeight: 0.78,
  color: 'var(--gold)',
  marginRight: 8,
  marginTop: 8,
  fontStyle: 'italic',
};

const LEFT_PACKAGES = (
  <div>
    <h3 style={h3Style}>Package 1 – Day-trip Beaches &amp; BBQ&rsquo;s</h3>
    <p style={pStyle}>
      <span style={dropCapStyle}>D</span>eparting at 12pm, our captain takes
      your crew out Island Hopping for a day of Watersports, BBQ buffet, Cold
      drinks and fun in the sun. Think Banana boats, cold beers, SUP&rsquo;s and
      multiple bars.
    </p>
    <p style={{ ...pStyle, clear: 'both' }}>
      This package is perfect for an Aussie Summer day, with up to 130
      passengers and a minimum run time of 4 hours this is definitely one the
      crew will remember.
    </p>

    <h3 style={h3Style}>Package 2 – Evening Cocktails &amp; Canap&eacute;s</h3>
    <p style={pStyle}>
      Departing at 5pm, this Sunset Cruise sets the mood for a night of world
      class luxury and celebration aboard Sun Goddess, Boattime&rsquo;s flagship superyacht.
      Touring the northern Islands of the Coast&rsquo;s Broadwater and cruising
      back to the Sun Setting over Surfers Paradise, this is the ideal venue to
      create special memories.
    </p>
    <p style={pStyle}>
      With a selection of platters, Canap&eacute;s, Cocktails and Champagne on
      the menu &ndash; come aboard with up to 130 guests and be entertained on a
      3-hour Luxury Cruise sure to stand out as unforgettable.
    </p>

    <h3 style={h3Style}>Option 3 – Custom Charter</h3>
    <p style={pStyle}>
      Want to create a Custom Charter event? We&rsquo;ve got it handled &ndash;
      Let us do the planning for you. Delicious food, plentiful drinks, and
      great entertainment. We have a lot of partners including Dining and
      Recreational activities available inclusive of the charter hire.
    </p>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

// ── Page ──────────────────────────────────────────────────────────────────────

const OVERVIEW = (
<div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(245,240,232,0.72)',
              lineHeight: 1.85,
            }}
          >
            <p style={{ marginBottom: 20 }}>
              Private yacht charters on the Gold Coast with
              Boattime Yacht Charters. Whether it&rsquo;s an intimate gathering
              or a large event, we offer tailored luxury experiences that
              promise an unforgettable time on the water.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Our Private Yacht Charter Services
              </strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              Boattime provides top-tier private boat charter services in Gold
              Coast for all occasions, with luxury yacht hire and experienced
              crew support.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>Why Choose Us?</strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              Choosing our yacht charter services in Gold Coast means opting for
              unparalleled luxury and comfort. We pride ourselves on offering
              personalized services to cater to your specific needs, ensuring
              every moment aboard our yachts is exceptional.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Customizable Packages
              </strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              We offer a variety of customizable packages to suit your needs,
              whether it&rsquo;s for a private celebration, corporate event, or
              a relaxing day out on the water. Our Gold Coast private yacht
              rental options are designed to provide maximum enjoyment and
              flexibility.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Luxurious Amenities
              </strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              Our yachts are equipped with state-of-the-art facilities to ensure
              your comfort and entertainment. From spacious decks to gourmet
              catering, we provide everything you need for a luxurious
              experience.
            </p>
            <p style={{ marginBottom: 6 }}>
              Ready to plan the ultimate in luxury on the Gold Coast waters?
              Contact us today to book your private yacht charter. Our team is
              here to help you plan every detail of your journey, ensuring a
              seamless and memorable experience.
            </p>
            <p style={{ fontWeight: 600, color: 'var(--cream)', marginTop: 8 }}>
              Book Your Private Yacht Charter Today
            </p>
          </div>
);

export default function CharterPagePrivate() {
  return (
    <CharterTemplate
      kind="Private"
      heroImage="/EDI_2899.jpg"
      heroLead="Private yacht charters on the Gold Coast with Boattime Yacht Charters. Whether it's an intimate gathering or a large event, we offer tailored luxury experiences that promise an unforgettable time on the water."
      overviewTitle="Private Yacht Charter Gold Coast"
      overview={OVERVIEW}
      galleryFolder="private-charter-images"
      packagesTitle={<>Day trips, sunsets and <em>custom charters</em></>}
      packages={LEFT_PACKAGES}
      accordion={ACCORDION}
      faqs={PRIVATE_FAQS}
    />
  );
}
