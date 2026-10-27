import { DINING_CRUISES_AVAILABLE } from '@/lib/products';
import { PHONE_HREF, PHONE_LABEL } from './contact';

// One footer for every page. It keeps every link the old footer had: these are
// the internal links that point search engines at the cruise, charter and vessel pages.
export default function SiteFooter() {
  return (
    <footer className="st-footer">
      <div className="st-footer__cols">
        <div>
          <h4>Contact</h4>
          <address>
            Marine Stadium Jetty &amp; Pontoon
            <br />
            Main Beach, Gold Coast QLD 4217
          </address>
          <a href={PHONE_HREF}>{PHONE_LABEL}</a>
          <a href="mailto:info@boattimeyachtcharters.com.au">info@boattimeyachtcharters.com.au</a>
        </div>

        <div>
          <h4>Cruise tickets</h4>
          <a href="/tickets">All cruise tickets</a>
          <a href="/cruise-tickets-luxury-whale-watching">Luxury Whale Watching</a>
          <a href="/luxury-broadwater-cruise">Luxury Sunset Cruise</a>
          <a href="/nye-2027">New Year&rsquo;s Eve 2027</a>
          <a href="/valentines-day">Valentine&rsquo;s Cruise</a>
          <a href="/riverfire-2026">Riverfire 2026</a>
          {DINING_CRUISES_AVAILABLE && (
            <>
              <a href="/relaxed-lunch-cruise-flavours-of-australia-aboard-the-mermaid-spirit">Chef&rsquo;s Table Lunch</a>
              <a href="/sunset-twilight-buffet-flavours-of-australia-aboard-the-mermaid-spirit">Chef&rsquo;s Table Dinner</a>
            </>
          )}
        </div>

        <div>
          <h4>Yacht charters</h4>
          <a href="/private-yacht-charter">Private Charter</a>
          <a href="/corporate-yacht-charter">Corporate Charter</a>
          <a href="/wedding-yacht-charter">Wedding Charter</a>
          <a href="/yacht-charter-menus">Catering &amp; Menus</a>
        </div>

        <div>
          <h4>Our yachts</h4>
          <a href="/sun-goddess-gold-coast">Sun Goddess</a>
          <a href="/mermaid-spirit-gold-coast">Mermaid Spirit</a>
          <h4 className="st-footer__sub">Company</h4>
          <a href="/about">About Boattime</a>
          <a href="/boattime-news">Boattime News</a>
          <a href="/#inquiry">Booking Enquiry</a>
        </div>

        <div>
          <h4>Follow</h4>
          <a href="https://www.instagram.com/boattimeyachtcharters/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.facebook.com/boattimeyachtcharters/" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>

      <div className="st-footer__mark" aria-hidden="true">
        BOATTIME
      </div>

      <div className="st-footer__legal">
        <span>&copy; 2026 Boattime Yacht Charters. All rights reserved.</span>
        <span>Superyacht charters on the Gold Coast and Brisbane, since 2014.</span>
      </div>
    </footer>
  );
}
