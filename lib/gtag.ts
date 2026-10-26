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

/**
 * Dipanggil saat pengunjung mengetuk link telepon atau email.
 * GA4: event phone_click / email_click. Meta: event standar Contact.
 * Aman kalau gtag atau fbq diblokir: tidak melempar error.
 */
export function trackContactClick(kind: 'phone' | 'email', location: string) {
  const w = window as unknown as { gtag?: Gtag; fbq?: Gtag };
  w.gtag?.('event', kind === 'phone' ? 'phone_click' : 'email_click', { click_location: location });
  w.fbq?.('track', 'Contact', { content_category: kind });
}
