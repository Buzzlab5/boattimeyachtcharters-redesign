const ADS_CONVERSION_LABEL = 'AW-18035686182/hcZSCM6erJccEKb2iphD';

type Gtag = (...args: unknown[]) => void;

/**
 * Dipanggil sekali setelah enquiry berhasil terkirim.
 * Mengirim konversi ke Google Ads, event generate_lead ke GA4,
 * dan event standar Lead ke Meta Pixel (tanpa data pribadi, tanpa isi form).
 * Aman kalau gtag atau fbq diblokir (ad blocker): tidak melempar error.
 */
export function trackEnquiryConversion() {
  const w = window as unknown as { gtag?: Gtag; fbq?: Gtag };

  // Meta dikirim sebelum cek gtag, supaya tetap terkirim kalau gtag diblokir.
  try {
    if (typeof w.fbq === 'function') w.fbq('track', 'Lead', { content_name: 'Enquiry form' });
  } catch {
    // Pixel gagal: enquiry tetap terkirim, jadi jangan sampai form menampilkan error.
  }

  const gtag = w.gtag;
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
