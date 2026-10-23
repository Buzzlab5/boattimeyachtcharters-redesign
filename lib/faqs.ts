/**
 * The FAQ questions shown on the homepage.
 *
 * Kept in a plain module (not inside the client component) so the server can
 * import it to build the FAQPage JSON-LD. A 'use client' file's exports become
 * client references on the server, which would arrive as a proxy, not an array.
 */
export const FAQS = [
  {
    q: 'Where do your boats depart from?',
    a: 'Our boats depart from Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast — about ten minutes from Surfers Paradise and fifteen from Broadbeach.',
  },
  {
    q: 'Do you offer pre-made charter packages?',
    a: "Three starting points: Beaches and BBQs — a midday run to the islands, watersports, and buffet. Sunset cocktails and canapés — five o'clock out of Marine Stadium Jetty & Pontoon, Main Beach into golden hour. Or a fully custom charter — tell us the occasion and we write the afternoon.",
  },
  {
    q: 'What about food and drinks?',
    a: 'Each vessel has two bars with bar-tab or consumption options. Our culinary partners — Private Chefs of Brisbane — handle everything from grazing boards and canapés to gourmet BBQ, buffet, and fine dining. No external food or beverages are permitted onboard.',
  },
  {
    q: 'What destinations can we visit?',
    a: 'Most charters run the calm Broadwater — Wave Break Island, Sanctuary Cove, Jumpinpin, the Scottish Prince wreck, the mansions at Sovereign Islands. When conditions invite, we push north into Moreton Bay for Tangalooma, Moreton Island and Stradbroke.',
  },
  {
    q: 'Will I get seasick?',
    a: 'We operate in the protected waters of the Gold Coast Broadwater, where swell is minimal. If we head offshore into open ocean there is a possibility of larger waves — your skipper reads the day and the route accordingly.',
  },
  {
    q: 'Are your charters accessible for guests with limited mobility?',
    a: 'Our charters are currently not wheelchair accessible. Boarding requires a step up from the marina pontoon, and space onboard can be limited depending on the vessel and guest needs. \nIn some cases, exceptions may be possible if we are notified at least 1 week before departure. This allows our team to review the requirements, arrange adequate crew support, and confirm whether the charter can be accommodated safely. \nFor safety reasons, electric wheelchairs are not permitted onboard.',
  },
];

/**
 * The FAQ questions shown on the corporate charter page. Same plain-module
 * reason as FAQS above: the page is a client component, so the server route
 * imports this to build the FAQPage JSON-LD.
 */
export const CORPORATE_FAQS = [
  {
    q: 'How many people can we have on board?',
    a: 'Sun Goddess carries up to 135 guests on a day charter and Mermaid Spirit up to 150, so a whole-vessel charter suits groups from about 20 up to 150. For a group of 20 to 60 with no budget for a whole vessel, the ticketed Luxury Scenic Sunset Cruise has 100 seats on every Saturday and Sunday sailing and can be booked seat by seat.',
  },
  {
    q: 'Where do your boats depart from?',
    a: 'Our boats depart from Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast, approximately 10 minutes from Surfers Paradise and 15 minutes from Broadbeach. Free parking is available.',
  },
  {
    q: 'Can we customise the catering and drinks?',
    a: 'Absolutely. From grazing boards and canapes to private chef fine dining, we work with our culinary partners to build a menu around your event. Bar packages are fully customisable.',
  },
  {
    q: 'Is AV equipment available for presentations?',
    a: 'Yes. Both vessels have flat-screen TVs and premium audio throughout. Let us know your AV requirements at the time of enquiry.',
  },
  {
    q: 'What transport options are there for large groups?',
    a: 'Maxi taxis are the most popular and cost-effective option. The pontoon also has ample free parking.',
  },
  {
    q: 'Can we add corporate branding or custom signage?',
    a: 'Yes. Corporate branding, custom menus, and event theming can all be arranged. Contact us with your requirements and we will accommodate where possible.',
  },
  {
    q: 'Are accessibility requirements catered for?',
    a: 'We welcome guests with limited mobility. We recommend contacting us before booking so we can assess specific requirements.',
  },
];

/**
 * The FAQ questions shown on the wedding charter page.
 * Same plain-module reason as FAQS above: the page is a client component,
 * so the server route imports this to build the FAQPage JSON-LD.
 */
export const WEDDING_FAQS = [
    {
      q: 'How many guests can we have?',
      a: 'The Sun Goddess accommodates up to 135 guests for a day charter. The Mermaid Spirit hosts up to 150 guests. Both vessels offer distinct experiences — get in touch and we can help you choose.',
    },
    {
      q: 'Where do we depart?',
      a: 'Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast — approximately 10 minutes from Surfers Paradise and 15 minutes from Broadbeach. Free parking is available.',
    },
    {
      q: 'Can we have a ceremony on board?',
      a: "Yes. We can host your ceremony on the foredeck with the Broadwater as your backdrop. We recommend coordinating with a registered marriage celebrant — we're happy to recommend partners if needed.",
    },
    {
      q: 'What catering options are available?',
      a: 'From canapés and platters to private chef fine dining — we work with our culinary partners to craft menus suited to your occasion. Grazing boards, buffets, and multi-course seated dinners are all available.',
    },
    {
      q: 'Can we arrange flowers and styling?',
      a: "Yes. Floral arrangements, table styling, and custom décor can all be coordinated through our event team. Let us know your vision and we'll connect you with the right suppliers.",
    },
    {
      q: 'What if it rains?',
      a: 'Both vessels have covered deck areas and interior spaces that keep your event running regardless of the weather. We will always have a contingency plan in place.',
    },
];


/**
 * The FAQ questions shown on the private charter page.
 * Same plain-module reason as FAQS above: the page is a client component,
 * so the server route imports this to build the FAQPage JSON-LD.
 */
export const PRIVATE_FAQS = [
    {
      q: 'Where do your boats depart from?',
      a: 'Our boats depart from Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast — about 10 minutes from Surfers Paradise and 15 minutes from Broadbeach.',
    },
    {
      q: 'Where can I park?',
      a: 'There is plentiful free parking at Marine Stadium Jetty & Pontoon, Main Beach which you are permitted to use. Please check signage at time of parking and if parking overnight consider street parking to avoid towing.',
    },
    {
      q: 'What about other transport options?',
      a: 'There are lots of ways to get to the boat! The most popular (and cost effective/convenient) is often via Maxi Taxis.',
    },
    {
      q: 'Can you help with catering/drinks?',
      a: 'Yes, we also offer catering and drinks service for your convenience. Please request our full catering list as advance bookings are required. We offer a range of catering options from grazing boards, to canapes and private chefs.',
    },
    {
      q: 'Do you have Eskies on board?',
      a: 'Yes we have Fridges & Eskies and we also provide ice.',
    },
    {
      q: 'Where can we go on our charter?',
      a: 'We mainly operate in the calm, protected waters of the Gold Coast Broadwater. In a 3 hour charter during the day our guests usually love a swim stop at Wavebreak Island. In the evening we will generally sail north to watch the sunset and return to the southern part of the Broadwater to enjoy the city lights after dark.',
    },
    {
      q: 'Will I get seasick?',
      a: 'We mainly operate in the calm, protected waters of the Gold Coast Broadwater. If we go offshore (into the open ocean) there is a possibility of large waves.',
    },
];


/**
 * The FAQ questions shown on the whale watching page.
 * Same plain-module reason as FAQS above: the page is a client component,
 * so the server route imports this to build the FAQPage JSON-LD.
 */
export const WHALE_FAQS = [
    {
      q: "Will I get seasick?",
      a: "If you are prone to seasickness, we recommend taking a motion sickness tablet at least 30 minutes prior to departure. Sun Goddess is a large, stable superyacht — one of the fastest and most stable whale watching vessels on the Gold Coast.",
    },
    {
      q: "Are children welcome?",
      a: "Absolutely — all ages are welcome aboard. Life jackets and full safety briefings are provided. Our marine biologist makes the commentary fun and engaging for kids too.",
    },
    {
      q: "What if it rains?",
      a: "All cruises operate in all weather unless conditions are unsafe. Sun Goddess has covered viewing areas on every deck, plus a warm galley with complimentary hot chocolate and coffee.",
    },
    {
      q: "How close do we get to the whales?",
      a: "We follow all marine park regulations and maintain a respectful distance — but humpbacks are naturally curious and often approach the vessel. Our marine biologist will explain their behaviour in real time.",
    },
];
