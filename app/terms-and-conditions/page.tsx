import { Fragment } from 'react';
import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import JsonLd from '@/components/JsonLd';
import { BASE_URL, breadcrumbSchema } from '@/lib/schema';

const PATH = '/terms-and-conditions';

export const metadata: Metadata = {
  title: 'Charter Terms & Conditions',
  description:
    'Boattime Yacht Charters terms and conditions for private charters on the Gold Coast: deposits, cancellations, booking changes, weather, guest conduct and safety.',
  alternates: { canonical: `${BASE_URL}${PATH}` },
};

const TERMS = [
  {
    title: 'Booking Confirmation and Deposit',
    body: (
      <>
        <p>
          A <strong>30% deposit of the total charter fee</strong> is required to secure a booking. The charter
          booking will not be confirmed until the deposit has been received. Payment of the deposit constitutes
          acceptance of these Terms and Conditions. The remaining balance must be paid in full by the date specified
          on the booking invoice or as otherwise agreed in writing by Boattime Yacht Charters.
        </p>
        <p className="st-terms__note">
          <strong>
            Client cancellation: if the client cancels the charter, the 30% deposit is non-refundable, subject to
            applicable Australian Consumer Law and the circumstances of the cancellation.
          </strong>
        </p>
      </>
    ),
  },
  {
    title: 'Cancellation by the Client',
    body: (
      <p>
        All cancellations must be submitted in writing to Boattime Yacht Charters. If the client cancels, the 30%
        deposit will be retained. If the client cancels after paying the full charter fee, the deposit remains
        non-refundable, and any refund of additional payments will be assessed in accordance with the cancellation
        terms agreed at the time of booking and applicable Australian Consumer Law.
      </p>
    ),
  },
  {
    title: 'Changes to Bookings',
    body: (
      <p>
        Requests to change the charter date, duration, vessel or other booking arrangements must be submitted in
        writing and are subject to availability and approval by Boattime Yacht Charters. Additional charges may apply
        where changes result in increased costs.
      </p>
    ),
  },
  {
    title: 'Weather and Sea Conditions',
    body: (
      <p>
        The safety of passengers and crew is our highest priority. Boattime Yacht Charters may alter, delay,
        reschedule or cancel a charter where weather, sea conditions, mechanical issues or other safety concerns make
        the planned charter unsafe or impractical. Where Boattime Yacht Charters cancels, we will work with the client
        to arrange an alternative date or another suitable arrangement. If a suitable alternative cannot be agreed
        upon, any refund or other remedy will be determined in accordance with the booking terms and applicable
        Australian Consumer Law.
      </p>
    ),
  },
  {
    title: 'Passenger Numbers and Guest Conduct',
    body: (
      <p>
        The client must provide accurate passenger numbers before the charter. All passenger numbers must remain
        within the approved capacity of the booked vessel. Boattime Yacht Charters reserves the right to refuse
        boarding where passenger numbers exceed the vessel&rsquo;s permitted capacity. The client is responsible for
        ensuring that all guests behave appropriately and follow the instructions of the skipper and crew. The skipper
        may restrict or terminate activities where passenger behaviour presents a safety risk.
      </p>
    ),
  },
  {
    title: 'Damage to the Vessel',
    body: (
      <p>
        The client is responsible for damage to the vessel, equipment, furniture or fittings caused by the client or
        their guests through negligence, misuse or wilful misconduct, subject to applicable law. Additional charges
        may apply for reasonable repair, replacement or cleaning costs arising from such damage.
      </p>
    ),
  },
  {
    title: 'Catering, Beverages and Additional Services',
    body: (
      <p>
        Any catering, beverage packages, entertainment, decorations or additional services must be agreed upon in
        advance. Additional services may incur extra charges and may be subject to separate payment and cancellation
        terms.
      </p>
    ),
  },
  {
    title: 'Departure Times and Late Arrivals',
    body: (
      <p>
        Clients and guests must arrive at the designated boarding location at the agreed boarding time. Late arrival
        by the client or their guests does not automatically entitle the client to an extension of the charter
        duration or a refund. The vessel&rsquo;s departure and return times may be affected by operational, weather or
        safety requirements.
      </p>
    ),
  },
  {
    title: 'Safety and Skipper’s Authority',
    body: (
      <p>
        All passengers must comply with safety instructions issued by the skipper and crew. The skipper has final
        authority over the operation of the vessel and may refuse boarding, restrict activities or terminate a charter
        if necessary to protect the safety of passengers, crew or the vessel.
      </p>
    ),
  },
  {
    title: 'Limitation of Liability',
    body: (
      <p>
        Boattime Yacht Charters will exercise reasonable care in providing charter services. Nothing in these Terms
        and Conditions excludes, restricts or modifies any consumer guarantee, right or remedy that cannot lawfully be
        excluded, restricted or modified under Australian Consumer Law or other applicable legislation.
      </p>
    ),
  },
  {
    title: 'Acceptance of Terms',
    body: (
      <p>
        By paying the deposit, the client acknowledges that they have read, understood and agreed to these Charter
        Terms and Conditions.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema([{ name: 'Terms & Conditions', path: PATH }])]} />
      <SiteShell>
        <div className="st-section st-gal-page">
          <div className="st-wrap" style={{ maxWidth: 820 }}>
            <a href="/" className="st-gal-back">
              <span aria-hidden="true">←</span> Back to home
            </a>
            <div className="st-head st-head--left">
              <div className="st-eyebrow">Private charters · Bookings · Cancellations · Safety</div>
              <h1 className="st-h2">
                Charter <em>Terms &amp; Conditions</em>
              </h1>
            </div>
            <div className="st-prose">
              {TERMS.map((term, i) => (
                <Fragment key={term.title}>
                  <h3>
                    {i + 1}. {term.title}
                  </h3>
                  {term.body}
                </Fragment>
              ))}
              <p style={{ marginTop: 40 }}>
                Thank you for choosing Boattime Yacht Charters. We look forward to welcoming you and your guests on
                board.
              </p>
            </div>
          </div>
        </div>
      </SiteShell>
    </>
  );
}
