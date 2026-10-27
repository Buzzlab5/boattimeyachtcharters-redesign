import EnquiryForm from './EnquiryForm';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Standard last section of every page: FAQ on the left, the enquiry form on the
 * right (id="inquiry": the Enquiry buttons scroll here).
 */
export default function FaqEnquiry({
  faqs,
  eyebrow = 'FAQ',
  title = 'Frequently Asked Questions',
  formLead,
}: {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  /** replaces the default intro line above the enquiry form */
  formLead?: string;
}) {
  if (faqs.length === 0) {
    // pages without FAQs: just the form, centred
    return (
      <div role="region" className="st-section" aria-label="Booking enquiry">
        <div className="st-wrap st-wrap--narrow">
          <div id="inquiry" className="st-form-wrap">
            <EnquiryForm lead={formLead} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="faq" role="region" className="st-section" aria-labelledby="st-faq">
      <div className="st-wrap st-faq-grid">
        <div>
          <div className="st-eyebrow st-eyebrow--left">{eyebrow}</div>
          <h2 id="st-faq" className="st-h2 st-h2--left">
            {title}
          </h2>
          <div className="st-faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <i aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div id="inquiry" className="st-form-wrap">
          <EnquiryForm lead={formLead} />
        </div>
      </div>
    </div>
  );
}
