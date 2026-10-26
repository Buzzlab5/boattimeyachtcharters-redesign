import type { Metadata } from 'next';
import ValentinesPage from '@/components/CruisePageValentines';
import JsonLd from '@/components/JsonLd';
import { boatTripSchema, breadcrumbSchema } from '@/lib/schema';

const PATH = '/valentines-day';

export const metadata: Metadata = {
  title: "Valentine's Day Cruise Gold Coast",
  description:
    "An evening of refined indulgence aboard Sun Goddess on the Gold Coast Broadwater. Champagne, gourmet dining, complimentary photography. Enquire about this year's date and availability.",
  alternates: { canonical: `https://www.boattimeyachtcharters.com${PATH}` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          boatTripSchema({
            name: "Valentine's Day Cruise: Gold Coast",
            description:
              "A Valentine's Day evening cruise aboard the Sun Goddess superyacht on the Gold Coast Broadwater, with champagne, gourmet dining and complimentary photography.",
            path: PATH,
            image: '/valentines-day-images/valentine1.webp',
            // No offer block. The Valentine's product in Rezdy is PM0Q7Y, marked
            // ZZZ (this account's own marker for a retired product) with no
            // sessions, so declaring a price and InStock would advertise a cruise
            // the checkout cannot sell.
          }),
          breadcrumbSchema([{ name: "Valentine's Day", path: PATH }]),
        ]}
      />
      <ValentinesPage />
    </>
  );
}
