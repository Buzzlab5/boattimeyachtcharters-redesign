const ADS_CONVERSION_LABEL = 'AW-18035686182/hcZSCM6erJccEKb2iphD';

type Gtag = (...args: unknown[]) => void;

/**
 * Dipanggil sekali setelah enquiry berhasil terkirim.
 * Mengirim konversi ke Google Ads dan event generate_lead ke GA4.
 * Aman kalau gtag diblokir (ad blocker) — tidak melempar error.
 */
export function trackEnquiryConversion() {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', 'conversion', {
    send_to: ADS_CONVERSION_LABEL,
    value: 1.0,
    currency: 'AUD',
  });
  gtag('event', 'generate_lead');
}
