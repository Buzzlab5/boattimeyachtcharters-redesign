// Booking Enquiry form
const inqStyles = {
  section: {
    padding: '120px 48px',
    background: `linear-gradient(to bottom, var(--navy-mid) 0%, var(--navy) 100%)`,
    position: 'relative', overflow: 'hidden',
  },
  bg: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 85% 100%, rgba(201,168,76,0.14), transparent 50%), radial-gradient(ellipse at 10% 20%, rgba(26,58,92,0.5), transparent 50%)' },
  inner: { maxWidth: 1200, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' },
  h: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.02em', color: 'var(--cream)', margin: '0 0 32px' },
  em: { fontStyle: 'italic', color: 'var(--gold-light)', fontWeight: 400 },
  body: { fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 44, maxWidth: 440 },
  details: { borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 32, display: 'grid', gap: 20 },
  d: { display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream)' },
  dKey: { color: 'var(--gold)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500, minWidth: 76 },
  right: { background: 'rgba(10,22,40,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,168,76,0.18)', padding: 48 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 },
  field: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 },
  label: { fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500 },
  input: { background: 'transparent', border: 0, borderBottom: '1px solid rgba(245,240,232,0.25)', padding: '10px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--cream)', borderRadius: 0, outline: 'none', transition: 'border-color 0.3s ease', width: '100%' },
  select: { appearance: 'none', cursor: 'pointer' },
  textarea: { resize: 'none', minHeight: 90 },
  success: { marginTop: 28, padding: '18px 22px', border: '1px solid var(--gold)', background: 'rgba(201,168,76,0.08)', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 500 },
};

const Field = ({ label, type = 'text', multi, select, options, value, onChange, placeholder }) => (
  <div style={inqStyles.field}>
    <label style={inqStyles.label}>{label}</label>
    {multi
      ? <textarea style={{ ...inqStyles.input, ...inqStyles.textarea }} value={value} onChange={onChange} placeholder={placeholder}/>
      : select
      ? <select style={{ ...inqStyles.input, ...inqStyles.select }} value={value} onChange={onChange}>
          {options.map(o => <option key={o} value={o} style={{ background: 'var(--navy)' }}>{o}</option>)}
        </select>
      : <input type={type} style={inqStyles.input} value={value} onChange={onChange} placeholder={placeholder} onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'} onBlur={e => e.target.style.borderBottomColor = 'rgba(245,240,232,0.25)'}/>}
  </div>
);

const Inquiry = React.forwardRef((_, ref) => {
  const [f, setF] = React.useState({ name: '', email: '', phone: '', date: '', guests: '', vessel: 'Either — concierge to recommend', charter: 'Private Charter', note: '' });
  const [sent, setSent] = React.useState(false);
  const u = k => e => setF({ ...f, [k]: e.target.value });
  return (
    <section ref={ref} style={inqStyles.section} id="inquiry">
      <div style={inqStyles.bg}/>
      <div style={inqStyles.inner}>
        <div>
          <Eyebrow>Booking Enquiry</Eyebrow>
          <h2 style={inqStyles.h}>Tell us the<br/><ItalicEm>occasion</ItalicEm>.</h2>
          <p style={inqStyles.body}>Every charter begins with a conversation. Share the afternoon you have in mind — the date, the guests, the reason — and our concierge replies within the hour.</p>
          <div style={inqStyles.details}>
            <div style={inqStyles.d}><span style={inqStyles.dKey}>Dock</span><Icon name="pin" size={14} color="var(--gold)"/> Muriel Henchman Public Pontoon, Main Beach 4217</div>
            <div style={inqStyles.d}><span style={inqStyles.dKey}>Hours</span><Icon name="clock" size={14} color="var(--gold)"/> 08:00 — 20:00 daily</div>
            <div style={inqStyles.d}><span style={inqStyles.dKey}>Direct</span><Icon name="phone" size={14} color="var(--gold)"/> +61 7 5528 0400</div>
            <div style={inqStyles.d}><span style={inqStyles.dKey}>Email</span><Icon name="mail" size={14} color="var(--gold)"/> info@boattimeyachtcharters.com.au</div>
          </div>
        </div>
        <div style={inqStyles.right}>
          <div style={inqStyles.row}>
            <Field label="Full Name" value={f.name} onChange={u('name')} placeholder="Eleanor Vance"/>
            <Field label="Email" type="email" value={f.email} onChange={u('email')} placeholder="eleanor@vance.co"/>
          </div>
          <div style={inqStyles.row}>
            <Field label="Phone" value={f.phone} onChange={u('phone')} placeholder="+61"/>
            <Field label="Preferred Date" value={f.date} onChange={u('date')} placeholder="Saturday, 12 December"/>
          </div>
          <div style={inqStyles.row}>
            <Field label="Charter Type" select options={['Private Charter','Corporate Charter','Wedding Charter','Sunset Cruise','Whale Watching','Custom']} value={f.charter} onChange={u('charter')}/>
            <Field label="Guests" value={f.guests} onChange={u('guests')} placeholder="12"/>
          </div>
          <Field label="Preferred Vessel" select options={['Either — concierge to recommend','Sun Goddess','Mermaid Spirit']} value={f.vessel} onChange={u('vessel')}/>
          <Field label="Anything else" multi value={f.note} onChange={u('note')} placeholder="A quiet afternoon, champagne on the foredeck."/>
          <div style={{ marginTop: 8 }}>
            <Button variant="primary" onClick={() => setSent(true)}>Send Enquiry</Button>
          </div>
          {sent && <div style={inqStyles.success}>Received — our concierge replies within the hour</div>}
        </div>
      </div>
    </section>
  );
});
window.Inquiry = Inquiry;
