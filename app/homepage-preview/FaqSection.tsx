'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/faqs';
import EnquiryForm from './EnquiryForm';

const FIRST = 3;

export default function FaqSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div id="faq" role="region" className="hp-section hp-section--alt" aria-labelledby="hp-faq">
      <div className="hp-wrap hp-faq-grid">
        <div>
          <div className="hp-eyebrow hp-eyebrow--left">FAQ</div>
          <h2 id="hp-faq" className="hp-h2 hp-h2--left">
            Frequently Asked Questions
          </h2>
          <div className="hp-faq">
            {FAQS.slice(0, showAll ? FAQS.length : FIRST).map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <i aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
            {FAQS.length > FIRST && (
              <button type="button" className="hp-faq__more" onClick={() => setShowAll((s) => !s)}>
                {showAll ? 'Show fewer questions' : 'See all questions →'}
              </button>
            )}
          </div>
        </div>

        {/* The Enquiry button in the hero scrolls here. */}
        <div id="inquiry" className="hp-form-wrap">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
