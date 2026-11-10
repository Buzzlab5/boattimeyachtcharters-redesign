import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const OWNER_EMAIL = 'info@boattimeyachtcharters.com.au';
const FROM_EMAIL =
  process.env.FROM_EMAIL ??
  'Boattime Yacht Charters <noreply@boattimeyachtcharters.com>';

// Resend's SDK has no timeout of its own, so a hung request would hold the
// visitor on "Sending" until the function is killed. Together these keep the
// request inside a 10-second function limit.
const OWNER_TIMEOUT_MS = 6000;
const GUEST_TIMEOUT_MS = 3000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timed out after ${ms} ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

// What Resend said, without anything the visitor typed: the error's name,
// status and message, with any email address in the message blanked out.
function describe(err: unknown): string {
  if (!err) return 'no email id returned';
  const e = (typeof err === 'object' ? err : { message: err }) as {
    name?: unknown;
    statusCode?: unknown;
    message?: unknown;
  };
  const message = String(e.message ?? '').replace(/\S+@\S+/g, '[email]');
  return [e.name, e.statusCode, message].filter((v) => v != null && v !== '').join(' ');
}

export async function POST(req: Request) {
  console.log('[inquiry] POST received');

  if (!process.env.RESEND_API_KEY) {
    console.error('[inquiry] RESEND_API_KEY not set');
    return NextResponse.json(
      { error: 'Email service not configured.' },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = await req.json();
  const { name, email, phone, date, guests, vessel, charter, note } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required.' },
      { status: 400 },
    );
  }

  try {
    // 1. Notify the Boattime team. This email is the enquiry, so Resend's answer
    //    decides the response: no accepted email id, no "sent", no lead counted.
    //    The SDK returns { data, error } on a rejected send instead of throwing.
    const owner = await withTimeout(
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New Enquiry — ${name} · ${charter}`,
        html: ownerEmail({
          name,
          email,
          phone,
          date,
          guests,
          vessel,
          charter,
          note,
        }),
      }),
      OWNER_TIMEOUT_MS,
    );
    if (owner.error || !owner.data?.id) {
      console.error('[inquiry] owner email not accepted:', describe(owner.error));
      return NextResponse.json(
        { error: 'Your enquiry could not be sent.' },
        { status: 502 },
      );
    }

    // 2. Confirmation to the guest. The team already has the enquiry, so a
    //    failure here is logged, not returned: a retry would send a duplicate.
    try {
      const guest = await withTimeout(
        resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "Your Boattime Enquiry — We'll Be in Touch Shortly",
          html: guestEmail({ name, charter, date, guests, vessel }),
        }),
        GUEST_TIMEOUT_MS,
      );
      if (guest.error) {
        console.error('[inquiry] guest confirmation not accepted:', describe(guest.error));
      }
    } catch (err) {
      console.error('[inquiry] guest confirmation failed:', describe(err));
    }

    console.log('[inquiry] owner email accepted, Resend id', owner.data.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[inquiry] owner email failed:', describe(err));
    return NextResponse.json(
      { error: 'Your enquiry could not be sent.' },
      { status: 502 },
    );
  }
}

/* ── Owner notification ──────────────────────────────────────── */
function ownerEmail({
  name,
  email,
  phone,
  date,
  guests,
  vessel,
  charter,
  note,
}: Record<string, string>) {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#8a7a5a;font-family:sans-serif;white-space:nowrap;border-bottom:1px solid #1e2e45;">${label}</td>
          <td style="padding:10px 16px;font-size:14px;color:#f5f0e8;font-family:sans-serif;border-bottom:1px solid #1e2e45;">${value}</td>
        </tr>`
      : '';

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a1628;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1628;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1f38;border:1px solid #1e3a5a;border-radius:2px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0a1628;padding:28px 32px;border-bottom:2px solid #c9a84c;">
            <p style="margin:0;font-family:sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a84c;font-weight:600;">New Booking Enquiry</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:24px;font-weight:300;color:#f5f0e8;">${name}</h1>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:8px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Charter Type', charter)}
              ${row('Preferred Date', date)}
              ${row('Guests', guests)}
              ${row('Vessel', vessel)}
              ${row('Phone', phone)}
              ${row('Email', email)}
            </table>
          </td>
        </tr>

        ${
          note
            ? `
        <!-- Notes -->
        <tr>
          <td style="padding:8px 32px 0;">
            <p style="margin:0;font-family:sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;">Additional Notes</p>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 32px 28px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:rgba(245,240,232,0.75);line-height:1.7;font-style:italic;">"${note}"</p>
          </td>
        </tr>`
            : ''
        }

        <!-- Reply CTA -->
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #1e3a5a;">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 28px;background:#c9a84c;color:#0a1628;font-family:sans-serif;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;border-radius:1px;">Reply to ${name}</a>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Guest confirmation ───────────────────────────────────────── */
function guestEmail({
  name,
  charter,
  date,
  guests,
  vessel,
}: Record<string, string>) {
  const firstName = name.split(' ')[0];

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a1628;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1628;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1f38;border:1px solid #1e3a5a;border-radius:2px;overflow:hidden;">

        <!-- Gold accent bar -->
        <tr><td style="height:3px;background:linear-gradient(to right,#c9a84c,#e8c96b,#c9a84c);"></td></tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:44px 40px 28px;text-align:center;">
            <p style="margin:0 0 6px;font-family:sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#c9a84c;font-weight:600;">Boattime Yacht Charters</p>
            <h1 style="margin:16px 0 0;font-family:Georgia,serif;font-size:30px;font-weight:300;color:#f5f0e8;line-height:1.2;">Thank you, ${firstName}.</h1>
            <p style="margin:18px 0 0;font-family:Georgia,serif;font-size:16px;font-style:italic;color:rgba(245,240,232,0.6);line-height:1.6;">Your enquiry is in good hands.</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #1e3a5a;margin:0;"></td></tr>

        <!-- Body copy -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 18px;font-family:sans-serif;font-size:14px;color:rgba(245,240,232,0.75);line-height:1.8;">
              We've received your booking request and our concierge team will be in touch within the hour to confirm availability and answer any questions you have.
            </p>
            <p style="margin:0;font-family:sans-serif;font-size:14px;color:rgba(245,240,232,0.75);line-height:1.8;">
              In the meantime, if you need to reach us directly, call us at <strong style="color:#c9a84c;">+61 477 667 644</strong> or reply to this email.
            </p>
          </td>
        </tr>

        <!-- Enquiry summary -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1628;border:1px solid #1e3a5a;border-radius:2px;">
              <tr><td colspan="2" style="padding:14px 20px 10px;"><p style="margin:0;font-family:sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a84c;font-weight:600;">Your Enquiry Summary</p></td></tr>
              ${charter ? `<tr><td style="padding:8px 20px;font-family:sans-serif;font-size:11px;color:rgba(245,240,232,0.45);letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;">Charter</td><td style="padding:8px 20px;font-family:sans-serif;font-size:13px;color:#f5f0e8;">${charter}</td></tr>` : ''}
              ${date ? `<tr><td style="padding:8px 20px;font-family:sans-serif;font-size:11px;color:rgba(245,240,232,0.45);letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;">Date</td><td style="padding:8px 20px;font-family:sans-serif;font-size:13px;color:#f5f0e8;">${date}</td></tr>` : ''}
              ${guests ? `<tr><td style="padding:8px 20px;font-family:sans-serif;font-size:11px;color:rgba(245,240,232,0.45);letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;">Guests</td><td style="padding:8px 20px;font-family:sans-serif;font-size:13px;color:#f5f0e8;">${guests}</td></tr>` : ''}
              ${vessel ? `<tr><td style="padding:8px 20px 14px;font-family:sans-serif;font-size:11px;color:rgba(245,240,232,0.45);letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;">Vessel</td><td style="padding:8px 20px 14px;font-family:sans-serif;font-size:13px;color:#f5f0e8;">${vessel}</td></tr>` : ''}
            </table>
          </td>
        </tr>

        <!-- Closing -->
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;font-style:italic;color:rgba(245,240,232,0.5);line-height:1.7;">"Leave with a memory worth telling."</p>
            <p style="margin:12px 0 0;font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a84c;">— The Boattime Family, Gold Coast</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #1e3a5a;text-align:center;">
            <p style="margin:0;font-family:sans-serif;font-size:11px;color:rgba(245,240,232,0.3);line-height:1.6;">
              Boattime Yacht Charters · Marine Stadium Jetty & Pontoon, Main Beach, Gold Coast<br>
              <a href="https://boattimeyachtcharters.com.au" style="color:#c9a84c;text-decoration:none;">boattimeyachtcharters.com.au</a>
            </p>
          </td>
        </tr>

        <!-- Gold accent bar bottom -->
        <tr><td style="height:2px;background:linear-gradient(to right,#c9a84c,#e8c96b,#c9a84c);"></td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
