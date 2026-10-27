import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  /** id of the heading inside, for screen readers */
  labelledBy?: string;
  /** `wide` lets the content use the full 1440px column (galleries, mosaics) */
  wide?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * One band of a page. Put sections inside <div className="st-zigzag">: the
 * background alternates white / navy by position, so two neighbours are never
 * the same colour and no divider line is needed between them.
 */
export default function Section({ id, labelledBy, wide, className = '', children }: SectionProps) {
  return (
    <div id={id} role="region" aria-labelledby={labelledBy} className={`st-section ${className}`.trim()}>
      <div className={`st-wrap${wide ? ' st-wrap--wide' : ''}`}>{children}</div>
    </div>
  );
}
