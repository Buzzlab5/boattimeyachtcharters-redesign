// Hero with real yacht photography — echoes reference "Luxury on the water, unforgettable"
const heroStyles = {
  section: { position: 'relative', height: '100vh', minHeight: 720, overflow: 'hidden', background: 'var(--navy)' },
  img: {
    position: 'absolute', inset: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=2400&q=80)',
    backgroundSize: 'cover', backgroundPosition: 'center 40%',
  },
  ovl: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to right, rgba(10,22,40,0.75) 0%, rgba(10,22,40,0.35) 55%, rgba(10,22,40,0.2) 100%), linear-gradient(to top, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.15) 45%)',
  },
  horizon: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    height: 80, background: 'linear-gradient(to top, var(--navy), transparent)',
  },
  content: { position: 'absolute', left: 48, bottom: 120, right: 48, maxWidth: 1100 },
  badge: {
    position: 'absolute', top: 120, right: 48,
    padding: '12px 20px', border: '1px solid rgba(201,168,76,0.4)',
    background: 'rgba(10,22,40,0.55)', backdropFilter: 'blur(8px)',
    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.3em',
    textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: 12,
  },
  h1: {
    fontFamily: 'var(--font-display)', fontWeight: 300,
    fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: 0.98, letterSpacing: '-0.02em',
    color: 'var(--cream)', margin: '0 0 28px',
  },
  sub: {
    fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 300,
    color: 'rgba(245,240,232,0.85)', maxWidth: 540, lineHeight: 1.7, margin: '0 0 40px',
  },
  btns: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  scrollCue: {
    position: 'absolute', right: 48, bottom: 40,
    display: 'flex', alignItems: 'center', gap: 14,
    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.3em',
    textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500,
  },
  scrollLine: { width: 60, height: 1, background: 'var(--gold)', opacity: 0.6 },
  fade: { opacity: 0, transform: 'translateY(32px)', animation: 'heroFade 1s cubic-bezier(.2,.6,.2,1) forwards' },
};

const Hero = ({ onReserve, onCruises }) => (
  <section style={heroStyles.section}>
    <style>{`
      @keyframes heroFade { to { opacity: 1; transform: translateY(0); } }
      @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
      .hero-img { animation: slowZoom 18s ease-out forwards; }
      .hd1 { animation-delay: 0.1s; } .hd2 { animation-delay: 0.3s; }
      .hd3 { animation-delay: 0.5s; } .hd4 { animation-delay: 0.7s; }
    `}</style>
    <div className="hero-img" style={heroStyles.img}/>
    <div style={heroStyles.ovl}/>
    <div style={heroStyles.horizon}/>
    <div className="hd1" style={{ ...heroStyles.badge, ...heroStyles.fade }}>
      <Icon name="star" size={11} color="var(--gold)"/> 4.9 · 3,900+ guest reviews
    </div>
    <div style={heroStyles.content}>
      <div className="hd1" style={heroStyles.fade}><Eyebrow>Superyacht Charters &middot; Gold Coast &amp; Brisbane</Eyebrow></div>
      <h1 className="hd2" style={{ ...heroStyles.h1, ...heroStyles.fade }}>
        Luxury <ItalicEm>on the water,</ItalicEm><br/>unforgettable.
      </h1>
      <p className="hd3" style={{ ...heroStyles.sub, ...heroStyles.fade }}>
        Two superyachts berthed at Muriel Henchman Public Pontoon, Main Beach 4217. Whale watching in season, sunset
        cruises year-round, private charters on your afternoon. Tell us the occasion —
        we&rsquo;ll write the day.
      </p>
      <div className="hd4" style={{ ...heroStyles.btns, ...heroStyles.fade }}>
        <Button variant="primary" onClick={onCruises}>Explore Cruises</Button>
        <Button variant="ghost" onClick={onReserve}>Booking Enquiry</Button>
      </div>
    </div>
    <div style={heroStyles.scrollCue}>
      <span>Scroll</span><div style={heroStyles.scrollLine}/>
    </div>
  </section>
);
window.Hero = Hero;
