/**
 * "Currently unavailable" notice for the dining cruise pages.
 *
 * The nav, homepage and footer already hide these cruises while
 * DINING_CRUISES_AVAILABLE is false, so this only reaches visitors who land
 * on the page from an article link, Kai, Google or an old bookmark.
 */
export default function DiningUnavailableNotice() {
  return (
    <div
      role="status"
      className="hr"
      style={{
        maxWidth: 560,
        marginBottom: 32,
        padding: '18px 22px',
        borderLeft: '2px solid var(--gold)',
        background: 'rgba(10,22,40,0.62)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 9,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        Currently unavailable
      </div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          lineHeight: 1.65,
          color: 'var(--cream)',
          margin: 0,
        }}
      >
        This dining cruise is taking a short break and will be back soon. In the
        meantime, join us for a{' '}
        <a href="/luxury-broadwater-cruise" style={{ color: 'var(--gold-light)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Luxury Scenic Sunset Cruise
        </a>{' '}
        or{' '}
        <a href="/private-yacht-charter" style={{ color: 'var(--gold-light)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          plan a private charter
        </a>
        .
      </p>
    </div>
  );
}
