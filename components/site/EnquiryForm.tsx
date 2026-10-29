'use client';

import { useState } from 'react';
import { trackEnquiryConversion } from '@/lib/gtag';

// Same fields, same validation and same endpoint (/api/inquiry) as the form
// in components/Inquiry.tsx, so an enquiry sent from the preview reaches the
// Boattime team exactly like one sent from the live homepage.

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  vessel: string;
  charter: string;
  note: string;
}

const INITIAL: FormState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  guests: '',
  vessel: 'Either — concierge to recommend',
  charter: 'Private Charter',
  note: '',
};

const REQUIRED: (keyof FormState)[] = ['name', 'email', 'phone', 'date', 'guests', 'note'];
const CHARTERS = ['Private Charter', 'Corporate Charter', 'Wedding Charter', 'Catering', 'Custom'];
const VESSELS = ['Either — concierge to recommend', 'Sun Goddess', 'Mermaid Spirit'];

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  options,
  multiline,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (name: keyof FormState, value: string) => void;
  error?: boolean;
  type?: string;
  placeholder?: string;
  options?: string[];
  multiline?: boolean;
}) {
  const id = `st-enq-${name}`;
  const common = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>) =>
      onChange(name, e.target.value),
    className: `st-field__control${error ? ' st-field__control--error' : ''}`,
    'aria-invalid': error || undefined,
  };

  return (
    <div className="st-field">
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select {...common}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea {...common} rows={4} placeholder={placeholder} />
      ) : (
        <input {...common} type={type} placeholder={placeholder} />
      )}
    </div>
  );
}

export default function EnquiryForm({ lead }: { lead?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showErrors, setShowErrors] = useState(false);

  const update = (name: keyof FormState, value: string) => setForm((f) => ({ ...f, [name]: value }));
  const missing = (key: keyof FormState) => showErrors && !form[key].trim();
  const hasErrors = REQUIRED.some((key) => !form[key].trim());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    if (hasErrors) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStatus('sending');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        trackEnquiryConversion();
        setStatus('sent');
        setForm(INITIAL);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="st-form" onSubmit={submit} noValidate aria-labelledby="st-enquiry-title">
      <div className="st-eyebrow st-eyebrow--left">Booking enquiry</div>
      <h3 id="st-enquiry-title" className="st-form__title">
        Tell us the <em>occasion</em>
      </h3>
      <p className="st-form__lead">
        {lead ?? 'Share the date, the guests and the reason, and our concierge replies within the hour.'}
      </p>

      <div className="st-form__row">
        <Field label="Full name" name="name" value={form.name} onChange={update} placeholder="Eleanor Vance" error={missing('name')} />
        <Field label="Email" name="email" value={form.email} onChange={update} type="email" placeholder="eleanor@vance.co" error={missing('email')} />
      </div>
      <div className="st-form__row">
        <Field label="Phone" name="phone" value={form.phone} onChange={update} type="tel" placeholder="+61" error={missing('phone')} />
        <Field label="Preferred date" name="date" value={form.date} onChange={update} placeholder="Saturday, 12 December" error={missing('date')} />
      </div>
      <div className="st-form__row">
        <Field label="Charter type" name="charter" value={form.charter} onChange={update} options={CHARTERS} />
        <Field label="Guests" name="guests" value={form.guests} onChange={update} placeholder="12" error={missing('guests')} />
      </div>
      <Field label="Preferred vessel" name="vessel" value={form.vessel} onChange={update} options={VESSELS} />
      <Field label="Anything else" name="note" value={form.note} onChange={update} multiline placeholder="A quiet afternoon, champagne on the foredeck." error={missing('note')} />

      {showErrors && hasErrors && (
        <p className="st-form__msg st-form__msg--error" role="alert">
          Please fill in all fields before sending.
        </p>
      )}

      <button type="submit" className="st-btn st-btn--primary st-btn--lg st-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>

      {status === 'sent' && (
        <p className="st-form__msg st-form__msg--ok" role="status">
          Received. Our concierge replies within the hour.
        </p>
      )}
      {status === 'error' && (
        <p className="st-form__msg st-form__msg--error" role="alert">
          Something went wrong. Please email us directly at info@boattimeyachtcharters.com.au
        </p>
      )}
    </form>
  );
}
