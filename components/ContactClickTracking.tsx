'use client';

import { useEffect } from 'react';
import { trackContactClick } from '@/lib/gtag';

/**
 * Satu listener untuk semua link tel: dan mailto: di situs (menu, footer,
 * halaman charter, bagian enquiry), jadi tiap komponen tidak perlu diubah.
 * Dipasang di root layout.
 */
export default function ContactClickTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
      if (!link) return;
      const kind = link.getAttribute('href')!.startsWith('tel:') ? 'phone' : 'email';
      const location = link.closest('nav') ? 'nav' : link.closest('footer') ? 'footer' : 'page';
      trackContactClick(kind, location);
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
