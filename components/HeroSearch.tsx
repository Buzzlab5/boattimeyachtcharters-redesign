'use client';

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { EXPERIENCE_PRODUCTS, PRODUCTS, type Product } from '@/lib/products';

// Extra words people are likely to type. Kept here (not in lib/products.ts) so
// the nav menus and the news CMS that read that file stay untouched. A product
// with no entry is still found by its name and sub-title.
const KEYWORDS: Record<string, string> = {
  'whale-watching': 'whale whales humpback watching migration',
  'twilight-drift': 'sunset twilight broadwater evening drift',
  'chefs-table-lunch': 'lunch chef dining food',
  'twilight-dining': 'dinner chef dining food',
  'riverfire-2026': 'riverfire brisbane fireworks river',
  'nye-2026': 'new year nye eve fireworks celebration',
  'valentines-day': 'valentine valentines romantic romance love couple',
  helitours: 'heli helicopter sky',
  'private-charter': 'private yacht charter hire boat',
  'corporate-charter': 'corporate team event business client',
  'wedding-charter': 'wedding marry marriage bride',
  'buffet-dinner-lunch': 'buffet dinner lunch food',
  catering: 'catering menu menus food package packages',
};

// Only products that have a booking widget on their page.
const BOOKABLE_IDS = new Set(EXPERIENCE_PRODUCTS.map((p) => p.id));

const normalise = (s: string) => s.toLowerCase().replace(/['’]/g, '');

// Every typed word must appear somewhere; name matches rank above keyword matches.
function search(query: string): Product[] {
  const tokens = normalise(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return PRODUCTS;

  const scored: { product: Product; score: number }[] = [];
  for (const product of PRODUCTS) {
    const name = normalise(product.label);
    const rest = normalise(`${product.sub} ${KEYWORDS[product.id] ?? ''}`);
    let score = 0;
    for (const token of tokens) {
      if (name.includes(token)) score += 2;
      else if (rest.includes(token)) score += 1;
      else {
        score = 0;
        break;
      }
    }
    if (score > 0) scored.push({ product, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((x) => x.product);
}

export default function HeroSearch() {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  // True once the visitor has moved through the list with the arrow keys, so an
  // empty search + Enter opens the list instead of jumping to the first product.
  const [arrowed, setArrowed] = useState(false);

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${listId}-${active}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, open, listId]);

  function go(product: Product) {
    // Cruises jump straight to the booking widget; charters just open their page.
    router.push(BOOKABLE_IDS.has(product.id) ? `${product.href}#book` : product.href);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setActive(0);
    setArrowed(false);
    setOpen(true);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (results.length === 0) return;
      setArrowed(true);
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (i + step + results.length) % results.length);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const product = results[active];
    if ((!query.trim() && !arrowed) || !product) {
      setOpen(true);
      return;
    }
    go(product);
  }

  return (
    <form ref={rootRef} className="hero-search" onSubmit={handleSubmit} role="search" noValidate>
      <div className="hero-search__bar">
        <svg
          className="hero-search__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.2" y2="16.2" />
        </svg>

        <input
          type="text"
          className="hero-search__input"
          placeholder="Search cruises & charters"
          aria-label="Search cruises and charters"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />

        <button type="submit" className="hero-search__submit">
          Search
        </button>

        {open && (
          <ul id={listId} className="hero-search__menu" role="listbox" aria-label="Results">
            {results.length === 0 ? (
              <li className="hero-search__empty" role="presentation">
                No matches — try &ldquo;whale&rdquo; or &ldquo;wedding&rdquo;.
              </li>
            ) : (
              results.map((p, i) => (
                <li
                  key={p.id}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={`hero-search__option${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(p)}
                >
                  <span className="hero-search__option-label">{p.label}</span>
                  <span className="hero-search__option-sub">{p.sub}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </form>
  );
}
