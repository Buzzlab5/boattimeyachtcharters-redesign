'use client';

import { PHONE_HREF, PHONE_LABEL } from './contact';

export interface HeroAction {
  label: string;
  href: string;
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/**
 * Hero buttons. Enquiry scrolls to the enquiry form, which every page carries
 * at the bottom (components/site/FaqEnquiry). With a `primary` action (for
 * example "Book now") that button leads and Enquiry becomes the quieter one.
 */
export default function HeroActions({ primary }: { primary?: HeroAction }) {
  function goToEnquiry(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const form = document.querySelector('#inquiry');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // no form on this page: hand over to the home page form (HashScroll finishes the scroll)
      sessionStorage.setItem('scrollTo', '#inquiry');
      window.location.href = '/';
    }
  }

  return (
    <div className="st-hero__actions">
      {primary && (
        <a href={primary.href} className="st-btn st-btn--primary st-btn--lg">
          {primary.label}
        </a>
      )}
      <a
        href="#inquiry"
        className={`st-btn st-btn--lg${primary ? '' : ' st-btn--primary'}`}
        onClick={goToEnquiry}
      >
        Enquiry
      </a>
      <a href={PHONE_HREF} className="st-btn st-btn--lg">
        <PhoneIcon />
        Call {PHONE_LABEL}
      </a>
    </div>
  );
}
