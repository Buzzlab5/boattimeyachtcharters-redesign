const STAR = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={STAR} fill="currentColor" />
    </svg>
  );
}

/**
 * Five stars filled to match the score: 5.0 is all five, 4.7 leaves the last
 * star 70% filled. Each star is a grey one with an amber copy clipped on top.
 */
export default function RatingStars({ score }: { score: number }) {
  return (
    <span className="st-rating-stars" role="img" aria-label={`${score} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, score - i));
        return (
          <span key={i} className="st-rs-star">
            <span className="st-rs-empty">
              <Star />
            </span>
            <span className="st-rs-fill" style={{ width: `${fill * 100}%` }}>
              <Star />
            </span>
          </span>
        );
      })}
    </span>
  );
}
