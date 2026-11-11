// FAQ — accordion with real Boattime questions
const faqStyles = {
  section: { padding: '120px 48px', background: 'var(--navy)' },
  inner: { maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.3fr', gap: 80, alignItems: 'start' },
  h: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 4.5vw, 60px)', lineHeight: 1, letterSpacing: '-0.015em', color: 'var(--cream)', margin: '0 0 24px' },
  body: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 36, maxWidth: 360 },
  list: { borderTop: '1px solid rgba(201,168,76,0.2)' },
  item: { borderBottom: '1px solid rgba(201,168,76,0.14)' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '28px 0', cursor: 'pointer' },
  q: { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--cream)', lineHeight: 1.3, letterSpacing: '-0.005em', fontWeight: 400, flex: 1 },
  btn: { width: 36, height: 36, border: '1px solid rgba(201,168,76,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s ease, border-color 0.3s ease' },
  a: { overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(.2,.6,.2,1)' },
  aInner: { paddingBottom: 32, maxWidth: 620, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 },
};

const FAQS = [
  { q: 'Where do your boats depart from?', a: 'Our boats are berthed at Marine Stadium Jetty & Pontoon at Doug Jennings Park, Main Beach — about ten minutes from Surfers Paradise and fifteen from Broadbeach.' },
  { q: 'Do you offer pre-made charter packages?', a: 'Three starting points. Beaches and BBQs — a midday run to the islands, watersports, and buffet. Sunset cocktails and canapés — five o&rsquo;clock out of Marine Stadium Jetty & Pontoon at Doug Jennings Park, Main Beach, a slow line past Surfers into golden hour. Or a fully custom charter — tell us the occasion and we write the afternoon.' },
  { q: 'What about food and drinks?', a: 'Each vessel has two bars with bar-tab or consumption options. Our culinary partners — Private Chefs of Brisbane — handle everything from grazing boards and canapés to gourmet BBQ, buffet and fine dining.' },
  { q: 'What destinations can we visit?', a: 'Most charters run the calm Broadwater — Wave Break Island, Sanctuary Cove, Jumpinpin, the Scottish Prince wreck, the mansions at Sovereign Islands. When conditions invite, we push north into Moreton Bay for Tangalooma, Moreton Island and Stradbroke.' },
  { q: 'Will I get seasick?', a: 'We operate in the protected waters of the Gold Coast Broadwater, where swell is minimal. If we head offshore into open ocean there is a possibility of larger waves — your skipper will read the day and the route accordingly.' },
  { q: 'Are your charters accessible for guests with limited mobility?', a: 'We have welcomed many guests with limited mobility. Boarding requires a step up from the marina pontoon, and each guest is different — our team will walk you through the layout and accommodations before booking to make sure it is the right fit.' },
];

const FaqItem = ({ f, open, onToggle }) => {
  const ref = React.useRef(null);
  return (
    <div style={faqStyles.item}>
      <div style={faqStyles.head} onClick={onToggle}>
        <div style={faqStyles.q}>{f.q}</div>
        <div style={{ ...faqStyles.btn, background: open ? 'var(--gold)' : 'transparent', borderColor: open ? 'var(--gold)' : 'rgba(201,168,76,0.35)' }}>
          <Icon name={open ? 'minus' : 'plus'} size={14} color={open ? 'var(--navy)' : 'var(--gold)'}/>
        </div>
      </div>
      <div style={{ ...faqStyles.a, maxHeight: open ? (ref.current?.scrollHeight || 500) : 0 }}>
        <div ref={ref} style={faqStyles.aInner}>{f.a}</div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={faqStyles.section}>
      <div style={faqStyles.inner}>
        <div>
          <Eyebrow>Frequently Asked</Eyebrow>
          <h2 style={faqStyles.h}>Before you <ItalicEm>board</ItalicEm>.</h2>
          <p style={faqStyles.body}>Everything you need to know before a charter — parking, catering, destinations, mobility. Anything else, our concierge is at the other end of a phone.</p>
          <Button variant="outline">Contact Concierge</Button>
        </div>
        <div style={faqStyles.list}>
          {FAQS.map((f, i) => (
            <FaqItem key={i} f={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)}/>
          ))}
        </div>
      </div>
    </section>
  );
};
window.Faq = Faq;
