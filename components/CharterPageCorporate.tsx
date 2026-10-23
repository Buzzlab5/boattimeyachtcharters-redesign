'use client';

import Nav from './Nav';
import Footer from './Footer';
import { CORPORATE_FAQS } from '@/lib/faqs';
import {
  CharterHero,
  CharterInfoBox,
  CharterGallery,
  CharterSplitSection,
  type AccordionSection,
} from './CharterSections';

// ── Accordion content ─────────────────────────────────────────────────────────

const VESSEL_LAYOUT = (
  <div>
    <p style={{ marginBottom: 8 }}>
      <strong style={{ color: 'var(--cream)' }}>Mermaid Spirit –</strong>
    </p>
    <p
      style={{
        marginBottom: 20,
        fontSize: 13,
        color: 'rgba(245,240,232,0.65)',
        lineHeight: 1.8,
      }}
    >
      Our newly renovated Mermaid Spirit can host up to 150 guests for day
      charters and can sleep 22 guests for overnight charters. A tri-deck
      catamaran, Mermaid Spirit boasts multiple entertainment decks and spaces
      and comes equipped with jet skis, kayaks, scuba diving gear, stinger proof
      pool and paddle boards for the more adventurous of guests.
    </p>
    <p style={{ marginBottom: 8 }}>
      <strong style={{ color: 'var(--cream)' }}>Sun Goddess –</strong>
    </p>
    <p
      style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}
    >
      Our slightly larger vessel, Sun Goddess, can host up to 135 guests for day
      charters. We have a variety of route options depending on the requirements
      of your event. Whether your event is a birthday party, a corporate event
      or even a wedding celebration, our huge range of options will allow for us
      to work together to design your event.
    </p>
  </div>
);

const DINING_BARS = (
  <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}>
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
          fontSize: 13,
          color: 'rgba(245,240,232,0.65)',
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
          fontSize: 13,
          color: 'rgba(245,240,232,0.65)',
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
  <div
    style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}
  >
    <p style={{ marginBottom: 14 }}>
      Tour the northern Islands of the Coast&rsquo;s Broadwater or out into the
      ocean with a Surfers Paradise backdrop! We can customise your destination
      depending on availability and charter.
    </p>
    <p style={{ marginBottom: 8, color: 'var(--cream)', fontWeight: 600 }}>
      Gold Coast
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
    <p style={{ marginBottom: 8, color: 'var(--cream)', fontWeight: 600 }}>
      Moreton Bay
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
  <div
    style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}
  >
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

const CORPORATE_FAQ = (
  <div
    style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}
  >
    {CORPORATE_FAQS.map(({ q, a }) => (
      <div key={q} style={{ marginBottom: 16 }}>
        <p style={{ color: 'var(--cream)', fontWeight: 600, marginBottom: 6 }}>
          {q}
        </p>
        <p>{a}</p>
      </div>
    ))}
  </div>
);

const END_OF_YEAR = (
  <div
    style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}
  >
    <p style={{ marginBottom: 16 }}>
      Two ways to put a team on the water before the end of the year, depending
      on the size of the group and whether you want the whole vessel.
    </p>
    <p style={{ marginBottom: 8 }}>
      <strong style={{ color: 'var(--cream)' }}>
        The whole vessel, by quote
      </strong>
    </p>
    <p style={{ marginBottom: 16 }}>
      Sun Goddess takes up to 135 guests and Mermaid Spirit up to 150, which
      covers a group from about 20 up to 150. Catering, bar packages, AV and
      branding are all arranged around the event. December dates go first, so
      the enquiry form is the place to start.
    </p>
    <p style={{ marginBottom: 8 }}>
      <strong style={{ color: 'var(--cream)' }}>
        Seats on the Sunset Cruise, booked seat by seat
      </strong>
    </p>
    <p style={{ marginBottom: 16 }}>
      For a group of 20 to 60 with no budget for a whole vessel, the Luxury
      Scenic Sunset Cruise runs every Saturday and Sunday through December with
      100 seats a sailing, at $79 an adult. Eight December sailings: the 5th,
      6th, 12th, 13th, 19th, 20th, 26th and 27th. No sailing on 24, 25 or 31
      December.
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
      Enquire about a date
    </a>
  </div>
);

const ACCORDION: AccordionSection[] = [
  { title: 'Yacht Layout Features', content: VESSEL_LAYOUT },
  { title: 'Dining and Bars', content: DINING_BARS },
  { title: 'Inclusions', content: INCLUSIONS },
  { title: 'Extras', content: EXTRAS },
  { title: 'Landings & Destinations', content: DESTINATIONS },
  { title: 'Christmas and End of Year Events', content: END_OF_YEAR },
  { title: 'Availability & Booking Enquiry', content: AVAILABILITY },
  { title: 'FAQ', content: CORPORATE_FAQ },
];

// ── Left column: Packages text ────────────────────────────────────────────────

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

const LEFT_PACKAGES = (
  <div>
    <h3 style={{ ...h3Style, marginTop: 0 }}>
      Package 1 – Corporate Island Getaway
    </h3>
    <p style={pStyle}>
      Departing at 12pm, our captain takes your work crew out Island Hopping for
      a day of Watersports, BBQ buffet, Cold drinks, and fun in the sun. Think
      Banana boats, cold beers, SUP&rsquo;s and multiple bars.
    </p>
    <p style={pStyle}>
      This package is perfect for a day in the Sun with your work crew, with up
      to 130 passengers and a minimum run time of 4 hours this is definitely one
      your employees will remember.
    </p>

    <h3 style={h3Style}>
      Package 2 – Awards Night Cocktails &amp; Canap&eacute;s
    </h3>
    <p style={pStyle}>
      Departing at 5pm, this Sunset Cruise sets the mood for a night of
      world-class luxury and celebration aboard the Gold Coasts premiere
      Superyacht. Touring the northern Islands of the Coast&rsquo;s Broadwater
      and cruising back to the Sun Setting over Surfers Paradise, this is the
      ideal venue to create special memories.
    </p>
    <p style={pStyle}>
      With a selection of Canap&eacute;s, Cocktails, and Champagne on the menu
      &ndash; come aboard with up to 135 guests and be entertained on a 3-hour
      Luxury Cruise sure to stand out as unforgettable.
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

export default function CharterPageCorporate() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero */}
        <CharterHero
          eyebrow="Boattime YC Luxury"
          headline={
            <>
              Corporate Yacht Charter
              <br />
              Gold Coast
            </>
          }
          subtext="Welcome to Boattime Yacht Charters, where luxury meets business. Whether you're planning a networking event, team-building retreat, or product launch, we provide a unique and impressive setting that will leave a lasting impact on your guests."
          image="/corporate-charter-images/06_Mermaid-Insidfe-1-1.webp"
          ctas={[
            { label: 'Booking Enquiry', href: '/#inquiry', variant: 'primary' },
          ]}
        />

        {/* 2. Overview box */}
        <CharterInfoBox heading="Corporate Yacht Charter Gold Coast">
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(245,240,232,0.72)',
              lineHeight: 1.85,
            }}
          >
            <p style={{ marginBottom: 20 }}>
              Welcome to Boattime Yacht Charters, where luxury meets business.
              Hosting corporate events can be daunting, but we offer the perfect
              solution with our luxurious yacht charters in Gold Coast. Whether
              you&rsquo;re planning a networking event, team-building retreat,
              or product launch, we provide a unique and impressive setting that
              will leave a lasting impact on your guests.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Our Corporate Event Services
              </strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              Boattime Yacht Charters offers a range of customizable yacht
              charter options for various corporate events, including retreats,
              team building, client entertainment, conferences, meetings, and
              more. Our yachts, the Sun Goddess and Mermaid Spirit, provide a
              luxurious backdrop for your event, complete with top-notch
              amenities and professional crew. We provide the premier event
              venue for Corporate Yacht Charters on the Gold Coast.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>Our Offer:</strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              Boattime Yacht Charters offers a range of fully customizable yacht
              charter options for corporate events, including corporate
              retreats, team building, client entertainment, conference venues,
              meeting spaces, business events, corporate hospitality,
              professional development, networking events, product launches,
              award ceremonies, charity events, and corporate social
              responsibility events. We have a variety of yacht sizes to choose
              from to ensure that your corporate event meets your needs.
              Experience a luxury event for your Corporate Yacht Charters on the
              Gold Coast.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Why Boattime YC?
              </strong>
            </p>
            <p style={{ marginBottom: 16 }}>
              Our yacht charters provide a unique and luxurious setting that
              will impress your guests and leave a lasting impression. Our team
              of experienced event planners will work with you to customize
              every detail of your corporate event, ensuring that it meets your
              specific requirements and objectives.
            </p>
            <p style={{ marginBottom: 20 }}>
              We take care of everything from catering and entertainment to
              transportation and logistics, allowing you to focus on your
              professional goals and enjoy your event with your colleagues. At
              Boattime Yacht Charters, we pride ourselves on providing
              exceptional service and attention to detail. We understand the
              importance of corporate events and the impact they can have on
              your business, which is why we strive to make your event as
              stress-free and memorable as possible. Book your business event
              with us today and let us take care of everything else!
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>How to Book:</strong>
            </p>
            <p>
              Booking a yacht charter with Boattime Yacht Charters is easy. Fill
              in our Booking Enquiry or give us a call to speak with one of our
              event planning specialists. We will work with you to determine
              your specific needs and provide a customized quote for your event.
              Once you&rsquo;ve booked your yacht charter, our team will take
              care of everything else, so all you have to do is show up and
              enjoy the luxurious experience.
            </p>
          </div>
        </CharterInfoBox>

        {/* 3. Photo gallery */}
        <CharterGallery folder="corporate-charter-images" />

        {/* 4. Packages left + Accordion right */}
        <CharterSplitSection
          leftContent={LEFT_PACKAGES}
          accordionSections={ACCORDION}
        />

        {/* 5. Bottom CTA box */}
        <CharterInfoBox heading="Corporate Yacht Charter Gold Coast" compact />
      </main>
      <Footer />
    </>
  );
}
