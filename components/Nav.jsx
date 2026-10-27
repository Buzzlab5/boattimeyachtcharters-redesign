// Nav matching real Boattime site structure (with submenus)
const navStyles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    padding: '18px 48px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, padding 0.4s ease',
    borderBottom: '1px solid transparent',
  },
  scrolled: {
    background: 'rgba(10,22,40,0.97)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottomColor: 'rgba(201,168,76,0.14)',
    padding: '14px 48px',
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', cursor: 'pointer' },
  logoMark: {
    width: 36, height: 36, border: '1px solid var(--gold)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--gold)',
  },
  logo: {
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22,
    letterSpacing: '0.02em', lineHeight: 1,
  },
  logoSub: {
    fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.32em',
    textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4, fontWeight: 500,
  },
  links: { display: 'flex', gap: 32, alignItems: 'center' },
  link: {
    position: 'relative',
    fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: '0.22em',
    textTransform: 'uppercase', color: 'var(--cream)', textDecoration: 'none',
    fontWeight: 500, cursor: 'pointer', transition: 'color 0.3s ease',
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 0',
  },
  caret: { opacity: 0.6 },
  sub: {
    position: 'absolute', top: 'calc(100% + 6px)', left: -22,
    minWidth: 260,
    background: 'rgba(10,22,40,0.97)', backdropFilter: 'blur(12px)',
    border: '1px solid rgba(201,168,76,0.18)',
    padding: '18px 0',
    opacity: 0, transform: 'translateY(6px)', pointerEvents: 'none',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
  },
  subOpen: { opacity: 1, transform: 'translateY(0)', pointerEvents: 'auto' },
  subItem: {
    display: 'block', padding: '10px 26px',
    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: 'var(--cream)', textDecoration: 'none',
    transition: 'color 0.25s ease, background 0.25s ease', cursor: 'pointer',
    fontWeight: 400,
  },
};

const NAV = [
  { label: 'Home' },
  { label: 'About' },
  { label: 'Cruise Tickets', sub: [
    'Luxury Whale Watching',
    'Broadwater Sunset Cruise',
    'New Year’s Eve 2027',
    'Valentine’s Cruise',
    'Riverfire 2026',
    'Relaxed Lunch Cruise',
    'Sunset Twilight Buffet',
  ]},
  { label: 'Yacht Charters', sub: [
    'Private Charter',
    'Corporate Charter',
    'Wedding Charter',
    'Catering',
  ]},
  { label: 'Our Yachts', sub: [
    'Sun Goddess',
    'Mermaid Spirit',
  ]},
  { label: 'Journal' },
];

const NavItem = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const hasSub = !!item.sub;
  return (
    <div style={{ position: 'relative' }}
         onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a style={navStyles.link}
         onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
         onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}>
        {item.label}
        {hasSub && <span style={navStyles.caret}><Icon name="chevronDown" size={10}/></span>}
      </a>
      {hasSub && (
        <div style={{ ...navStyles.sub, ...(open ? navStyles.subOpen : {}) }}>
          {item.sub.map(s => (
            <a key={s} style={navStyles.subItem}
               onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
               onMouseLeave={e => { e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.background = 'transparent'; }}>
              {s}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const Nav = ({ onReserve }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{ ...navStyles.nav, ...(scrolled ? navStyles.scrolled : {}) }}>
      <a style={navStyles.logoWrap}>
        <div style={navStyles.logoMark}>B</div>
        <div>
          <div style={navStyles.logo}>
            <span style={{ color: 'var(--gold)' }}>Boat</span>
            <span style={{ color: 'var(--cream)' }}>Time</span>
          </div>
          <div style={navStyles.logoSub}>Yacht Charters</div>
        </div>
      </a>
      <div style={navStyles.links}>
        {NAV.map(n => <NavItem key={n.label} item={n}/>)}
      </div>
      <Button variant="outline" onClick={onReserve} small>Booking Enquiry</Button>
    </nav>
  );
};
window.Nav = Nav;
