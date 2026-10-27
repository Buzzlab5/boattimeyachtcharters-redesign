import SectionHead from '../SectionHead';

// Three of the guest reviews already shown on the live homepage
// (components/Reviews.tsx). Initials replace the stock avatar photos.
const REVIEWS = [
  {
    name: 'Helen C R',
    when: '3 months ago',
    text: 'We watched a whale breach fifty times. At the end of the trip we saw three whales breach and swim together. The trip was worthy, definitely: good seats up top, professional crew.',
  },
  {
    name: 'James Nguyen',
    when: '2 months ago',
    text: 'Booked for my wife’s birthday and it exceeded every expectation. The sunset over the Broadwater was otherworldly. Worth every cent.',
  },
  {
    name: 'Sarah Mitchell',
    when: '4 months ago',
    text: 'We used Sun Goddess for our company Christmas party: 80 guests, three decks, completely seamless. The catering team were exceptional.',
  },
];

export default function ReviewsSection() {
  return (
    <div role="region" className="st-section st-dark on-photo" aria-labelledby="st-reviews">
      <div className="st-wrap">
        <SectionHead
          eyebrow="Trusted by guests"
          title={
            <span id="st-reviews">
              A premium cruise with <em>seamless flow</em>
            </span>
          }
        />
        <div className="st-rate">
          <div>
            <b>4.7</b>
            <span className="st-stars" aria-hidden="true">★★★★★</span>
            <small>3,910+ reviews</small>
          </div>
        </div>
        <div className="st-grid3">
          {REVIEWS.map((r) => (
            <article key={r.name} className="st-review">
              <div className="st-review__who">
                <span className="st-avatar" aria-hidden="true">{r.name[0]}</span>
                <div>
                  <strong>{r.name}</strong>
                  <small>{r.when}</small>
                </div>
              </div>
              <span className="st-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
