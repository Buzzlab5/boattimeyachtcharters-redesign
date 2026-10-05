'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { EXPERIENCE_PRODUCTS, CHARTER_PRODUCTS } from '@/lib/products';

type SearchType = 'cruise' | 'charter';

interface Option {
  value: string;
  label: string;
  sub?: string;
}

const TYPE_OPTIONS: Option[] = [
  { value: 'cruise', label: 'Cruise', sub: 'Whale watching, sunset & events' },
  { value: 'charter', label: 'Private Charter', sub: 'Private, corporate & wedding' },
];

// Only the charter products that are real "charter types" (not Catering & Menus).
const CHARTER_IDS = ['private-charter', 'corporate-charter', 'wedding-charter'];
const CHARTER_OPTIONS = CHARTER_PRODUCTS.filter((p) => CHARTER_IDS.includes(p.id));

// Custom dropdown (instead of a native <select>) so the menu matches the dark
// hero in both light and dark mode. It opens upward because the hero info bar
// sits just below the search bar and would cover a downward menu.
function Dropdown({
  label,
  placeholder,
  value,
  options,
  onChange,
  hasError,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className="hero-search__cell">
      <button
        type="button"
        className={`hero-search__trigger${hasError ? ' is-error' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="hero-search__label">{label}</span>
        <span className={`hero-search__value${selected ? '' : ' is-placeholder'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`hero-search__chevron${open ? ' is-open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul className="hero-search__menu" role="listbox" aria-label={label}>
          {options.map((o) => (
            <li key={o.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                className={`hero-search__option${o.value === value ? ' is-selected' : ''}`}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                <span className="hero-search__option-label">{o.label}</span>
                {o.sub && <span className="hero-search__option-sub">{o.sub}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HeroSearch() {
  const router = useRouter();
  const [type, setType] = useState<SearchType>('cruise');
  const [experience, setExperience] = useState('');
  const [showError, setShowError] = useState(false);

  const products = type === 'cruise' ? EXPERIENCE_PRODUCTS : CHARTER_OPTIONS;
  const experienceOptions: Option[] = products.map((p) => ({
    value: p.id,
    label: p.label,
    sub: p.sub,
  }));

  function changeType(value: string) {
    setType(value as SearchType);
    setExperience('');
    setShowError(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const product = products.find((p) => p.id === experience);
    if (!product) {
      setShowError(true);
      return;
    }
    // Cruises jump straight to the booking widget; charters open their page.
    router.push(type === 'cruise' ? `${product.href}#book` : product.href);
  }

  return (
    <form className="hero-search" onSubmit={handleSubmit} noValidate>
      <div className="hero-search__bar">
        <Dropdown
          label="I'm looking for"
          placeholder="Select"
          value={type}
          options={TYPE_OPTIONS}
          onChange={changeType}
        />
        <Dropdown
          label="Experience"
          placeholder="Choose an experience"
          value={experience}
          options={experienceOptions}
          onChange={(v) => {
            setExperience(v);
            setShowError(false);
          }}
          hasError={showError}
        />
        <button type="submit" className="hero-search__submit">
          Search
        </button>
      </div>
      {showError && (
        <p className="hero-search__error" role="alert">
          Please choose an experience to continue.
        </p>
      )}
    </form>
  );
}
