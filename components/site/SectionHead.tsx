import type { ReactNode } from 'react';

export default function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`st-head${align === 'left' ? ' st-head--left' : ''}`}>
      <div className="st-eyebrow">{eyebrow}</div>
      <h2 className="st-h2">{title}</h2>
      {sub && <p className="st-sub">{sub}</p>}
    </div>
  );
}
