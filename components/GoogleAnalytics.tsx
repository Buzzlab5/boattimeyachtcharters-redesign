import Script from 'next/script';

const GA4_ID = 'G-LZVGRY36X5';

/**
 * GA4 / gtag.js tag.
 * Dipasang di root layout supaya aktif di semua halaman.
 * Ini yang memuat gtag.js — GoogleAdsTag hanya menambah konfigurasi Ads.
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
      </Script>
    </>
  );
}
