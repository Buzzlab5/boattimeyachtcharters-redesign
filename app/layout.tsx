import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import KaiWidget from '@/components/kai/KaiWidget';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Boattime Yacht Charters | Gold Coast Superyacht Hire',
    template: '%s | Boattime',
  },
  description:
    'Sun Goddess and Mermaid Spirit: two Gold Coast superyachts for private charter, corporate events, weddings and scenic cruises from Main Beach.',
  metadataBase: new URL('https://www.boattimeyachtcharters.com'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.boattimeyachtcharters.com',
    siteName: 'Boattime Yacht Charters',
    title: 'Boattime Yacht Charters | Gold Coast Superyacht Hire',
    description:
      'Sun Goddess and Mermaid Spirit: two Gold Coast superyachts for private charter, corporate events, weddings and scenic cruises from Main Beach.',
    images: [
      {
        url: '/sun-goddess-main-upscale.png',
        width: 1200,
        height: 630,
        alt: 'Sun Goddess superyacht, Boattime Yacht Charters, Gold Coast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boattime Yacht Charters | Gold Coast Superyacht Hire',
    description:
      'Sun Goddess and Mermaid Spirit: two Gold Coast superyachts for charter and scenic cruises.',
    images: ['/sun-goddess-main-upscale.png'],
  },
  // NOTE: no `alternates.canonical` here on purpose. Next.js inherits metadata
  // into child pages, so a canonical set at the root would tell Google every
  // sub-page is a duplicate of the homepage. Each page declares its own.
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Runs before React hydrates — prevents flash of wrong theme
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var t=s||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Business + site entities — present on every page */}
        <JsonLd schemas={[organizationSchema(), websiteSchema()]} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <KaiWidget />
        </ThemeProvider>

        {/* GA4 */}
        <GoogleAnalytics />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1016449916853118');fbq('track','PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1016449916853118&ev=PageView&noscript=1" alt="" />
        </noscript>
      </body>
    </html>
  );
}
