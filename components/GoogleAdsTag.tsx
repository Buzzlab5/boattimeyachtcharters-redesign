import Script from 'next/script';

const GOOGLE_ADS_ID = 'AW-18035686182';

// Konversi "Call (+61 477 667 644)" (Phone call leads, panggilan 60 detik ke atas).
// Untuk pengunjung dari iklan Google, Google mengganti nomor di halaman dengan nomor
// penerusan, lalu menghitung panggilan yang berlangsung 60 detik atau lebih.
const CALL_CONVERSION = 'AW-18035686182/YiLzCJrsspccEKb2iphD';
const PHONE_NUMBER = '+61 477 667 644';

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
gtag('config', '${GOOGLE_ADS_ID}');
gtag('config', '${CALL_CONVERSION}', { phone_conversion_number: '${PHONE_NUMBER}' });`}
    </Script>
  );
}
