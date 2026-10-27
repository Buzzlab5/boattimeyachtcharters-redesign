// Footer mirroring real Boattime nav + credits
const footStyles = {
  foot: { padding: '80px 48px 40px', background: 'var(--navy)', borderTop: '1px solid rgba(201,168,76,0.12)' },
  inner: { maxWidth: 1200, margin: '0 auto' },
  top: { display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 60, marginBottom: 72, paddingBottom: 56, borderBottom: '1px solid rgba(201,168,76,0.12)' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 },
  logoMark: { width: 40, height: 40, border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--gold)' },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, letterSpacing: '0.02em' },
  logoSub: { fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 },
  tag: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 340, marginBottom: 28 },
  socials: { display: 'flex', gap: 10 },
  social: { width: 38, height: 38, border: '1px solid rgba(201,168,76,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', transition: 'background 0.3s ease, border-color 0.3s ease', cursor: 'pointer' },
  colHead: { fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 22 },
  link: { display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream)', textDecoration: 'none', padding: '7px 0', cursor: 'pointer', transition: 'color 0.25s ease' },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' },
  bottomLinks: { display: 'flex', gap: 32 },
};

const FootLink = ({ children }) => (
  <a style={footStyles.link}
     onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
     onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}>{children}</a>
);

const Footer = () => (
  <footer style={footStyles.foot}>
    <div style={footStyles.inner}>
      <div style={footStyles.top}>
        <div>
          <div style={footStyles.logoWrap}>
            <div style={footStyles.logoMark}>B</div>
            <div>
              <div style={footStyles.logoText}><span style={{color:'var(--gold)'}}>Boat</span><span style={{color:'var(--cream)'}}>Time</span></div>
              <div style={footStyles.logoSub}>Yacht Charters</div>
            </div>
          </div>
          <p style={footStyles.tag}>Superyacht charters on the Gold Coast and Brisbane. Two vessels, one unhurried coastline — since 2014.</p>
          <div style={footStyles.socials}>
            <a style={footStyles.social}><Icon name="instagram" size={14}/></a>
            <a style={footStyles.social}><Icon name="facebook" size={14}/></a>
            <a style={footStyles.social}><Icon name="mail" size={14}/></a>
          </div>
        </div>
        <div>
          <div style={footStyles.colHead}>Cruise Tickets</div>
          <FootLink>Luxury Whale Watching</FootLink>
          <FootLink>Broadwater Sunset</FootLink>
          <FootLink>New Year&rsquo;s Eve 2027</FootLink>
          <FootLink>Valentine&rsquo;s Cruise</FootLink>
          <FootLink>Riverfire 2026</FootLink>
          <FootLink>Relaxed Lunch</FootLink>
          <FootLink>Twilight Buffet</FootLink>
        </div>
        <div>
          <div style={footStyles.colHead}>Yacht Charters</div>
          <FootLink>Private Charter</FootLink>
          <FootLink>Corporate Charter</FootLink>
          <FootLink>Wedding Charter</FootLink>
          <FootLink>Catering &amp; Menus</FootLink>
          <div style={{ ...footStyles.colHead, marginTop: 32 }}>Our Yachts</div>
          <FootLink>Sun Goddess</FootLink>
          <FootLink>Mermaid Spirit</FootLink>
        </div>
        <div>
          <div style={footStyles.colHead}>Contact</div>
          <FootLink>Muriel Henchman Public Pontoon</FootLink>
          <FootLink>Main Beach 4217</FootLink>
          <FootLink>+61 7 5528 0400</FootLink>
          <FootLink>info@boattimeyachtcharters.com.au</FootLink>
          <div style={{ ...footStyles.colHead, marginTop: 32 }}>Studio</div>
          <FootLink>About BoatTime</FootLink>
          <FootLink>Boattime News</FootLink>
          <FootLink>Booking Enquiry</FootLink>
        </div>
      </div>
      <div style={footStyles.bottom}>
        <div>© 2026 Boattime Yacht Charters · All rights reserved</div>
        <div style={footStyles.bottomLinks}>
          <FootLink>Privacy</FootLink>
          <FootLink>Terms</FootLink>
          <FootLink>Cookies</FootLink>
        </div>
      </div>
    </div>
  </footer>
);
window.Footer = Footer;
