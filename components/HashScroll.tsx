'use client';
import { useEffect } from 'react';

export default function HashScroll() {
  useEffect(() => {
    // Target dari menu situs (sessionStorage), atau dari URL (#inquiry dari iklan,
    // sitelink, dan tombol "Booking Enquiry" di halaman lain).
    const stored = sessionStorage.getItem('scrollTo');
    if (stored) sessionStorage.removeItem('scrollTo');
    const target = stored || (window.location.hash.length > 1 ? window.location.hash : '');
    if (!target) return;

    // Section bisa dimuat terlambat dan GSAP ScrollTrigger mengubah tinggi halaman,
    // jadi tunggu sampai elemennya ada, scroll, lalu koreksi sekali setelah layout tenang.
    let tries = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;
    const scrollToTarget = () => {
      let el: Element | null = null;
      try {
        el = document.querySelector(target);
      } catch {
        return true;
      }
      if (!el) return false;
      const navH = (document.querySelector('.site-header') as HTMLElement)?.offsetHeight ?? 90;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'auto' });
      return true;
    };
    const poll = setInterval(() => {
      tries += 1;
      if (scrollToTarget() || tries > 40) {
        clearInterval(poll);
        settle = setTimeout(scrollToTarget, 1200);
      }
    }, 250);

    return () => {
      clearInterval(poll);
      if (settle) clearTimeout(settle);
    };
  }, []);

  return null;
}
