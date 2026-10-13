import Script from 'next/script';

const GOOGLE_ADS_ID = 'AW-18035686182';

/**
 * Google Ads tag.
 * Dipasang per-halaman (bukan di root layout) supaya hanya aktif
 * di halaman kampanye yang diminta.
 * gtag.js sendiri dimuat sekali oleh GoogleAnalytics (root layout),
 * jadi di sini hanya menambah konfigurasi Ads.
 */
export default function GoogleAdsTag() {
  return (
    <Script id="google-ads-gtag" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('config', '${GOOGLE_ADS_ID}');`}
    </Script>
  );
}
