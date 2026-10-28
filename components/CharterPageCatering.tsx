import GoogleAdsTag from '@/components/GoogleAdsTag';
import SiteShell from './site/SiteShell';
import PageHero from './site/PageHero';
import Section from './site/Section';
import SectionHead from './site/SectionHead';
import FaqEnquiry from './site/FaqEnquiry';
import GalleryStrip from './site/GalleryStrip';
import MenuFlipbook from './MenuFlipbook';
import { PHONE_HREF, PHONE_LABEL } from './site/contact';

export default function CharterPageCatering() {
  return (
    <>
      <GoogleAdsTag />
      <SiteShell>
        <PageHero
          image="/catering-charter.webp"
          imageAlt="Catering served aboard a Boattime yacht"
          eyebrow="Boattime Yacht Charters"
          title={
            <>
              Catering <em>Gold Coast</em>
            </>
          }
          lead="From grazing boards and canapés to gourmet BBQ, buffet and fine dining, prepared with our culinary partners, Private Chefs of Brisbane."
        />

        <div className="st-zigzag">
          <Section labelledBy="st-menus">
            <SectionHead
              eyebrow="Catering menus"
              title={
                <span id="st-menus">
                  Our <em>menus</em>
                </span>
              }
              sub="Turn the pages to see what we can serve on your charter."
            />
            <div className="st-flipbook">
              <MenuFlipbook pdfUrl="/boattime-menu-2026.pdf" />
            </div>
          </Section>

          <Section wide labelledBy="st-gallery">
            <SectionHead
              eyebrow="Gallery"
              title={
                <span id="st-gallery">
                  Fresh from <em>our galley</em>
                </span>
              }
              sub="Grazing boards, platters and dishes served on Boattime charters."
            />
            <GalleryStrip folder="catering" label="Catering photo" />
          </Section>

          <Section labelledBy="st-talk">
            <div className="st-cta">
              <div className="st-eyebrow">Get in touch</div>
              <h2 id="st-talk" className="st-h2">
                Talk to us about your <em>catering requirements</em>
              </h2>
              <p className="st-sub">Tell us the date, the guests and the style of food you have in mind and we will build the menu around it.</p>
              <div className="st-cta__buttons">
                <a href="#inquiry" className="st-btn st-btn--primary st-btn--lg">
                  Get in touch
                </a>
                <a href={PHONE_HREF} className="st-btn st-btn--lg">
                  Call {PHONE_LABEL}
                </a>
              </div>
            </div>
          </Section>

          <FaqEnquiry faqs={[]} />
        </div>
      </SiteShell>
    </>
  );
}
