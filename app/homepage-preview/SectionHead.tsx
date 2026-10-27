import type { ReactNode } from 'react';

export default function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="hp-head">
      <div className="hp-eyebrow">{eyebrow}</div>
      <h2 className="hp-h2">{title}</h2>
      {sub && <p className="hp-sub">{sub}</p>}
    </div>
  );
}
