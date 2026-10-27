import Image from 'next/image';

export interface PhotoCardItem {
  href: string;
  image: string;
  alt: string;
  tag?: string;
  title: string;
  text: string;
  /** small line at the bottom left */
  left?: string;
  /** big bottom-right value, e.g. "from $79" */
  price?: string;
  unit?: string;
}

/** Rounded photo cards that link to a page (cruises, vessels, charter types). */
export default function PhotoCardGrid({ items, columns }: { items: PhotoCardItem[]; columns?: 2 | 3 }) {
  const cols = columns ?? (items.length === 3 ? 3 : 2);
  return (
    <div className={cols === 3 ? 'st-exp-grid' : 'st-grid2'}>
      {items.map((it) => (
        <a key={it.title} href={it.href} className="st-card on-photo">
          <Image src={it.image} alt={it.alt} fill sizes="(max-width: 720px) 100vw, 560px" />
          <div className="st-card__body">
            {it.tag && <span className="st-card__tag">{it.tag}</span>}
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            <div className="st-card__foot">
              <span>{it.left ?? 'View page'}</span>
              {it.price && (
                <span className="st-card__price">
                  {it.price}
                  {it.unit && <small>{it.unit}</small>}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
