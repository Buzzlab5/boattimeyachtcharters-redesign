'use client';

import { useEffect } from 'react';
import SiteShell from './site/SiteShell';
import PageHero from './site/PageHero';
import Section from './site/Section';
import SectionHead from './site/SectionHead';
import FaqEnquiry from './site/FaqEnquiry';

export default function TicketsPage() {
  // Rezdy's booking plugin script (loads once)
  useEffect(() => {
    const existing = document.querySelector('script[src*="rezdy.com/pluginJs"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://boattimeyachtcharters.rezdy.com/pluginJs';
      s.defer = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <SiteShell>
      <PageHero
        image="/sunset-boat.jpg"
        imageAlt="Sunset over the Gold Coast from a Boattime deck"
        eyebrow="Boattime Yacht Charters · Gold Coast & Brisbane"
        title={
          <>
            Book your <em>experience</em>
          </>
        }
        lead="Select from our full range of cruises, whale watching tours, and private charter experiences, all bookable instantly online."
        primary={{ label: 'See all tickets', href: '#book' }}
      />

      <div className="st-zigzag">
        <Section id="book" labelledBy="st-tickets">
          <SectionHead
            eyebrow="Cruise tickets"
            title={
              <span id="st-tickets">
                Choose your <em>cruise</em>
              </span>
            }
            sub="Instant confirmation. Pick a date, pick your tickets, and you are booked."
          />
          <div className="st-widget">
            <iframe
              width="100%"
              height="1200px"
              frameBorder="0"
              className="rezdy"
              title="Boattime cruise tickets"
              src="https://boattimeyachtcharters.rezdy.com/catalog/312834/tours?iframe=true"
              style={{ display: 'block' }}
            />
          </div>
        </Section>

        <FaqEnquiry faqs={[]} />
      </div>
    </SiteShell>
  );
}
