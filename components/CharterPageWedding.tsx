'use client';

import Nav from './Nav';
import Footer from './Footer';
import {
  CharterHero,
  CharterInfoBox,
  CharterGallery,
  CharterSplitSection,
  type AccordionSection,
} from './CharterSections';
import { WEDDING_FAQS } from '@/lib/faqs';

// ── Accordion content (no Yacht Layout Features — it's in the left column) ────

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

const WEDDING_FAQ = (
  <div
    style={{ fontSize: 13, color: 'rgba(245,240,232,0.65)', lineHeight: 1.8 }}
  >
    {WEDDING_FAQS.map(({ q, a }) => (
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
  { title: 'Dining and Bars', content: DINING_BARS },
  { title: 'Inclusions', content: INCLUSIONS },
  { title: 'Extras', content: EXTRAS },
  { title: 'Landings & Destinations', content: DESTINATIONS },
  { title: 'Availability & Booking Enquiry', content: AVAILABILITY },
  { title: 'FAQ', content: WEDDING_FAQ },
];

// ── Left column: Yacht Layout Features ───────────────────────────────────────

const pStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  color: 'rgba(245,240,232,0.72)',
  lineHeight: 1.85,
  marginBottom: 16,
};

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 20,
  fontWeight: 400,
  fontStyle: 'italic',
  color: 'var(--cream)',
  marginBottom: 14,
  marginTop: 40,
};

const LEFT_VESSELS = (
  <div>
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 9,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        fontWeight: 600,
        marginBottom: 28,
      }}
    >
      Yacht Layout Features
    </div>

    <h3 style={{ ...h3Style, marginTop: 0 }}>Mermaid Spirit –</h3>
    <p style={pStyle}>
      Our newly renovated Mermaid Spirit can host up to 150 guests for day
      charters and can sleep 22 guests for overnight charters (Overnight
      Currently Unavailable). A tri-deck catamaran, Mermaid Spirit boasts
      multiple entertainment decks and spaces and comes equipped with jet skis,
      kayaks, scuba diving gear, stinger proof pool and paddle boards for the
      more adventurous of guests.
    </p>
    {/* <a
      href="/mermaid-spirit-gold-coast"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        textDecoration: 'none',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 40,
      }}
    >
      See Mermaid Spirit here →
    </a> */}

    <h3 style={h3Style}>Sun Goddess –</h3>
    <p style={pStyle}>
      Our slightly larger vessel, Sun Goddess, can host up to 135 guests for day
      charters. We have a variety of route options depending on the requirements
      of your event. Whether your event is a corporate event or even a wedding
      celebration, our varying route options allow for us to work together to
      design a sailing course perfect for your event.
    </p>
    {/* <a
      href="/sun-goddess-gold-coast"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        textDecoration: 'none',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      See Sun Goddess here →
    </a> */}
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CharterPageWedding() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero */}
        <CharterHero
          eyebrow="Boattime YC Luxury"
          headline={
            <>
              Wedding Yacht Charter
              <br />
              Gold Coast
            </>
          }
          subtext="Say 'I Do' on a Boattime Luxury Yacht Charter, the idyllic venue for your wedding ceremonies and reception. Celebrate your love as you cruise through the crystal blue waters of Gold Coast."
          image="/wedding-charter-images/25-DSC2845.webp"
          ctas={[
            { label: 'Booking Enquiry', href: '/#inquiry', variant: 'primary' },
          ]}
        />

        {/* 2. Overview box */}
        <CharterInfoBox
          heading="Wedding Yacht Charter Gold Coast"
          vesselOrder={['sun-goddess', 'mermaid-spirit']}
        >
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(245,240,232,0.72)',
              lineHeight: 1.85,
            }}
          >
            <p style={{ marginBottom: 20 }}>
              Say &ldquo;I Do&rdquo; on a Boattime Luxury Yacht Charter, the
              idyllic venue for your wedding ceremonies and reception. Celebrate
              your love with friends and family as you cruise through the
              crystal blue waters of Gold Coast, enjoying the fresh sea breeze
              and breathtaking scenery. If your heart is set on a magical
              wedding experience that combines luxury and adventure, a yacht
              wedding with Boattime Yacht Charters is the perfect choice.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Why Choose a Yacht Wedding?
              </strong>
            </p>
            <p style={{ marginBottom: 16 }}>
              A yacht wedding in Gold Coast is unique and unforgettable.
              Boattime Yacht Charters offers luxurious vessels, Sun Goddess and
              Mermaid Spirit, which can accommodate up to 135 and 150 guests
              respectively. Our experienced and professional staff are dedicated
              to delivering a truly luxurious and memorable experience.
            </p>
            <p style={{ marginBottom: 20 }}>
              Boattime Yacht Charters is one of the leading private function
              providers on the Gold Coast. Our experienced and professional
              staff are dedicated to delivering a truly luxurious and memorable
              experience.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Customizable Wedding Packages
              </strong>
            </p>
            <p style={{ marginBottom: 10 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Daytime Ceremony &amp; Reception:
              </strong>{' '}
              Host your ceremony and reception during the day with stunning
              ocean views. Our yacht can be customized to fit your needs,
              including dining and entertainment options.
            </p>
            <p style={{ marginBottom: 10 }}>
              <strong style={{ color: 'var(--cream)' }}>Sunset Wedding:</strong>{' '}
              Opt for a romantic sunset ceremony followed by a reception under
              the stars. Enjoy canapés, cocktails, and a picturesque backdrop.
            </p>
            <p style={{ marginBottom: 20 }}>
              <strong style={{ color: 'var(--cream)' }}>Custom Charter:</strong>{' '}
              Create a bespoke wedding experience with our help. From dining to
              entertainment, we cater to your every need to make your day
              perfect.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Luxurious Amenities
              </strong>
            </p>
            <p style={{ marginBottom: 20 }}>
              Both the Sun Goddess and Mermaid Spirit boast spacious decks, dual
              bars, flat-screen TVs, and state-of-the-art sound systems. We
              provide customized catering from our award-winning Executive Chef,
              ensuring your menu is tailored to your tastes and preferences.
            </p>
            <p style={{ marginBottom: 6 }}>
              <strong style={{ color: 'var(--cream)' }}>
                Additional Services
              </strong>
            </p>
            <p style={{ marginBottom: 10 }}>We can also arrange:</p>
            <ul style={{ margin: '0 0 8px', padding: 0, listStyle: 'none' }}>
              {[
                'Photography and videography',
                'DJ or live band',
                'Floral arrangements',
                'Wedding planning services',
              ].map((s) => (
                <li
                  key={s}
                  style={{
                    padding: '4px 0',
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
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </CharterInfoBox>

        {/* 3. Photo gallery */}
        <CharterGallery folder="wedding-charter-images" />

        {/* 4. Vessel layout left + Accordion right */}
        <CharterSplitSection
          leftContent={LEFT_VESSELS}
          accordionSections={ACCORDION}
        />

        {/* 5. Bottom CTA box */}
        <CharterInfoBox
          heading="Wedding Yacht Charter Gold Coast"
          compact
          vesselOrder={['mermaid-spirit', 'sun-goddess']}
        />
      </main>
      <Footer />
    </>
  );
}
