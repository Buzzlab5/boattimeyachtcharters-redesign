import { PHONE_HREF, PHONE_LABEL } from './contact';

export default function PreviewFooter() {
  return (
    <footer className="hp-footer">
      <div className="hp-footer__cols">
        <div>
          <h4>Contact</h4>
          <a href="mailto:info@boattimeyachtcharters.com.au">info@boattimeyachtcharters.com.au</a>
          <a href={PHONE_HREF}>{PHONE_LABEL}</a>
          <address>
            Marine Stadium Jetty &amp; Pontoon
            <br />
            Main Beach, Gold Coast QLD 4217
          </address>
        </div>
        <div>
          <h4>Cruises</h4>
          <a href="/tickets">Cruise Tickets</a>
          <a href="/luxury-broadwater-cruise">Luxury Sunset</a>
          <a href="/nye-2026">New Year&rsquo;s Eve 2026</a>
          <a href="/cruise-tickets-luxury-whale-watching">Luxury Whale Watching</a>
        </div>
        <div>
          <h4>Charters</h4>
          <a href="/private-yacht-charter">Private Charter</a>
          <a href="/corporate-yacht-charter">Corporate Charter</a>
          <a href="/wedding-yacht-charter">Wedding Charter</a>
          <a href="/sun-goddess-gold-coast">Sun Goddess</a>
          <a href="/mermaid-spirit-gold-coast">Mermaid Spirit</a>
        </div>
        <div>
          <h4>Follow</h4>
          <a href="https://www.instagram.com/boattimeyachtcharters/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/boattimeyachtcharters/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="/boattime-news">Blog</a>
        </div>
      </div>

      <div className="hp-footer__mark" aria-hidden="true">BOATTIME</div>

      <div className="hp-footer__legal">
        <span>&copy; 2026 Boattime Yacht Charters. All rights reserved.</span>
        <span>Design preview. Not the live homepage.</span>
      </div>
    </footer>
  );
}
