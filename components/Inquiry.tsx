'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow, ItalicEm, Button, Icon } from './Shared';
import { useTheme } from './ThemeProvider';
import { trackEnquiryConversion } from '@/lib/gtag';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  guests: '',
  vessel: 'Either — concierge to recommend',
  charter: 'Private Charter',
  note: '',
};

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  multi,
  select,
  options,
  isLight,
  hasError,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (name: keyof FormState, val: string) => void;
  type?: string;
  placeholder?: string;
  multi?: boolean;
  select?: boolean;
  options?: string[];
  isLight?: boolean;
  hasError?: boolean;
}) {
  const borderColor = hasError
    ? 'rgba(220,60,60,0.7)'
    : isLight
    ? 'rgba(10,22,40,0.18)'
    : 'rgba(245,240,232,0.22)';
  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 0,
    borderBottom: `1px solid ${borderColor}`,
    padding: '10px 0',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: isLight ? '#0A1628' : 'var(--cream)',
    borderRadius: 0,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.3s',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 24,
      }}
    >
      <label
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 9,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      {multi ? (
        <textarea
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={4}
          style={{ ...inputStyle, resize: 'none' }}
          onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderBottomColor = borderColor)}
        />
      ) : select ? (
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
          onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderBottomColor = borderColor)}
        >
          {options?.map((o) => (
            <option
              key={o}
              value={o}
              style={{ background: 'var(--navy)', color: 'var(--cream)' }}
            >
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderBottomColor = borderColor)}
        />
      )}
    </div>
  );
}

export default function Inquiry() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showErrors, setShowErrors] = useState(false);

  const update = (name: keyof FormState, val: string) =>
    setForm((prev) => ({ ...prev, [name]: val }));

  const requiredFields: (keyof FormState)[] = ['name', 'email', 'phone', 'date', 'guests', 'note'];
  const errors = requiredFields.reduce<Partial<Record<keyof FormState, boolean>>>(
    (acc, key) => ({ ...acc, [key]: !form[key].trim() }),
    {}
  );
  const hasErrors = requiredFields.some((key) => !form[key].trim());

  useGSAP(
    () => {
      gsap.from(leftRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      id="inquiry"
      className="relative overflow-hidden inquiry-section"
      style={{
        padding: '110px 48px',
        overflowX: 'hidden',
        background:
          'linear-gradient(to bottom, var(--navy-mid) 0%, var(--navy) 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at 85% 100%, rgba(201,168,76,0.08), transparent 50%)'
            : 'radial-gradient(ellipse at 85% 100%, rgba(201,168,76,0.12), transparent 50%), radial-gradient(ellipse at 10% 20%, rgba(26,58,92,0.5), transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="relative grid inquiry-layout"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* Left */}
        <div ref={leftRef}>
          <Eyebrow>Booking Enquiry</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(40px, 5vw, 70px)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              marginBottom: 28,
            }}
          >
            Tell us the <ItalicEm>occasion</ItalicEm>.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              marginBottom: 44,
              maxWidth: 420,
            }}
          >
            Every charter begins with a conversation. Share the afternoon you
            have in mind — the date, the guests, the reason — and our concierge
            replies within the hour.
          </p>

          <div
            style={{
              borderTop: '1px solid rgba(201,168,76,0.2)',
              paddingTop: 32,
              display: 'grid',
              gap: 18,
            }}
          >
            {[
              {
                key: 'Dock',
                icon: 'pin' as const,
                val: 'Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast',
              },
              {
                key: 'Hours',
                icon: 'clock' as const,
                val: '08:00 — 20:00 daily',
              },
              {
                key: 'Direct',
                icon: 'phone' as const,
                val: '+61 477 667 644',
                href: 'tel:+61477667644',
              },
              {
                key: 'Email',
                icon: 'mail' as const,
                val: 'info@boattimeyachtcharters.com.au',
                href: 'mailto:info@boattimeyachtcharters.com.au',
              },
            ].map((d) => (
              <div
                key={d.key}
                className="flex items-center gap-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--cream)',
                }}
              >
                <span
                  style={{
                    color: 'var(--gold)',
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    minWidth: 72,
                  }}
                >
                  {d.key}
                </span>
                <Icon name={d.icon} size={14} color="var(--gold)" />
                {'href' in d ? (
                  <a
                    href={d.href}
                    style={{
                      color: 'var(--text-muted)',
                      wordBreak: 'break-all',
                      overflowWrap: 'anywhere',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {d.val}
                  </a>
                ) : (
                  <span
                    style={{
                      color: 'var(--text-muted)',
                      wordBreak: 'break-all',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {d.val}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="inquiry-form"
          style={{
            background: isLight
              ? 'rgba(255,255,255,0.75)'
              : 'rgba(10,22,40,0.5)',
            backdropFilter: 'blur(10px)',
            border: isLight
              ? '1px solid rgba(10,22,40,0.1)'
              : '1px solid rgba(201,168,76,0.18)',
            padding: 48,
          }}
        >
          <div
            className="grid form-row-2"
            style={{ gridTemplateColumns: '1fr 1fr', gap: 28 }}
          >
            <Field
              label="Full Name"
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Eleanor Vance"
              isLight={isLight}
              hasError={showErrors && errors.name}
            />
            <Field
              label="Email"
              name="email"
              value={form.email}
              onChange={update}
              type="email"
              placeholder="eleanor@vance.co"
              isLight={isLight}
              hasError={showErrors && errors.email}
            />
          </div>
          <div
            className="grid form-row-2"
            style={{ gridTemplateColumns: '1fr 1fr', gap: 28 }}
          >
            <Field
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="+61"
              isLight={isLight}
              hasError={showErrors && errors.phone}
            />
            <Field
              label="Preferred Date"
              name="date"
              value={form.date}
              onChange={update}
              placeholder="Saturday, 3 May"
              isLight={isLight}
              hasError={showErrors && errors.date}
            />
          </div>
          <div
            className="grid form-row-2"
            style={{ gridTemplateColumns: '1fr 1fr', gap: 28 }}
          >
            <Field
              label="Charter Type"
              name="charter"
              value={form.charter}
              onChange={update}
              select
              options={[
                'Private Charter',
                'Corporate Charter',
                'Wedding Charter',
                'Cathering',
                'Custom',
              ]}
              isLight={isLight}
            />
            <Field
              label="Guests"
              name="guests"
              value={form.guests}
              onChange={update}
              placeholder="12"
              isLight={isLight}
              hasError={showErrors && errors.guests}
            />
          </div>
          <Field
            label="Preferred Vessel"
            name="vessel"
            value={form.vessel}
            onChange={update}
            select
            options={[
              'Either — concierge to recommend',
              'Sun Goddess',
              'Mermaid Spirit',
            ]}
            isLight={isLight}
          />
          <Field
            label="Anything else"
            name="note"
            value={form.note}
            onChange={update}
            multi
            placeholder="A quiet afternoon, champagne on the foredeck."
            isLight={isLight}
            hasError={showErrors && errors.note}
          />
          {showErrors && hasErrors && (
            <div
              style={{
                marginBottom: 16,
                color: 'rgba(220,80,80,0.9)',
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Please fill in all fields before sending.
            </div>
          )}
          <div style={{ marginTop: 8 }}>
            <Button
              variant="primary"
              onClick={async () => {
                if (status === 'sending') return;
                if (hasErrors) { setShowErrors(true); return; }
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
                    setForm(initialForm);
                  } else {
                    setStatus('error');
                  }
                } catch {
                  setStatus('error');
                }
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
            </Button>
          </div>

          {status === 'sent' && (
            <div
              style={{
                marginTop: 24,
                padding: '16px 20px',
                border: '1px solid var(--gold)',
                background: 'rgba(201,168,76,0.08)',
                color: 'var(--gold)',
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Received — our concierge replies within the hour.
            </div>
          )}

          {status === 'error' && (
            <div
              style={{
                marginTop: 24,
                padding: '16px 20px',
                border: '1px solid rgba(220,60,60,0.4)',
                background: 'rgba(220,60,60,0.06)',
                color: 'rgba(245,100,100,0.9)',
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Something went wrong — please email us directly at info@boattimeyachtcharters.com.au
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
