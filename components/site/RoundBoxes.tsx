'use client';

import { useEffect } from 'react';

/**
 * The older page sections draw their cards, panels and photo tiles with a
 * hundred different class names and inline styles, all with square corners. This
 * rounds every visible card-like box that is still square, so no page can show a
 * sharp corner by accident: 24px for photo tiles, 16px for other boxes.
 *
 * It only touches boxes that are really cards: 100px+ wide, 48px+ tall, with a
 * border, a background that differs from their surroundings, or a photo. Full-width
 * bands, the footer, the navbar and anything already rounded are left alone, and so
 * are boxes inside an already rounded, clipped parent (the cells of a rounded grid).
 */

const PHOTO_RADIUS = '24px';
const BOX_RADIUS = '16px';

type RGBA = { r: number; g: number; b: number; a: number };

function parse(color: string): RGBA | null {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[ ,/]+/).map(Number);
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
}

function isSquare(cs: CSSStyleDeclaration) {
  return (
    cs.borderTopLeftRadius === '0px' &&
    cs.borderTopRightRadius === '0px' &&
    cs.borderBottomLeftRadius === '0px' &&
    cs.borderBottomRightRadius === '0px'
  );
}

function roundSquareBoxes(root: HTMLElement) {
  const vw = window.innerWidth;
  const todo: { el: HTMLElement; photo: boolean }[] = [];

  root.querySelectorAll<HTMLElement>('div, a, article, li, figure, details, section').forEach((el) => {
    if (el.dataset.stRound) return;
    if (el.closest('header, footer, svg, iframe, .kai-panel, .st-flipbook, .st-widget, .mobile-drawer, .st-lightbox')) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 100 || rect.height < 48 || rect.width > vw * 0.96) return;

    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') return;
    if (!isSquare(cs)) {
      el.dataset.stRound = '1';
      return;
    }

    // a sliding track (a slider that moves with translateX, or a row wider than itself):
    // clipping it would cut off its own slides, so only the slides inside get rounded
    // (not marked as done: a card that is only mid-entrance-animation gets rounded on a later pass)
    if (cs.transform !== 'none' || el.scrollWidth > el.clientWidth + 2) return;

    // a cell of an already rounded, clipped parent: its corners are not visible
    const parent = el.parentElement;
    if (parent) {
      const pcs = getComputedStyle(parent);
      if (!isSquare(pcs) && pcs.overflow !== 'visible') {
        el.dataset.stRound = '1';
        return;
      }
    }

    const hasPhotoBg = (node: Element) => {
      const bgi = getComputedStyle(node).backgroundImage;
      return bgi !== 'none' && bgi.includes('url(');
    };
    const photo =
      hasPhotoBg(el) ||
      Array.from(el.children).some((k) => k.tagName === 'IMG' || k.tagName === 'VIDEO' || hasPhotoBg(k));

    const border = parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderLeftWidth) > 0;
    const borderColor = parse(cs.borderTopColor);
    const hasBorder = border && !!borderColor && borderColor.a > 0.04;

    const bg = parse(cs.backgroundColor);
    const parentBg = parent ? parse(getComputedStyle(parent).backgroundColor) : null;
    const hasBg =
      !!bg &&
      bg.a >= 0.03 &&
      (!parentBg || parentBg.a < 0.5 || Math.abs(bg.r - parentBg.r) + Math.abs(bg.g - parentBg.g) + Math.abs(bg.b - parentBg.b) > 12);

    if (photo || hasBorder || hasBg) todo.push({ el, photo });
  });

  todo.forEach(({ el, photo }) => {
    el.style.borderRadius = photo ? PHOTO_RADIUS : BOX_RADIUS;
    if (photo) el.style.overflow = 'hidden';
    el.dataset.stRound = '1';
  });
}

export default function RoundBoxes() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    if (!main) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => roundSquareBoxes(main);
    const later = () => {
      clearTimeout(timer);
      timer = setTimeout(run, 350);
    };

    requestAnimationFrame(() => requestAnimationFrame(run));
    const t1 = setTimeout(run, 1200); // after the entrance animations
    const t2 = setTimeout(run, 3200);
    const observer = new MutationObserver(later); // lists and galleries that load after the page
    observer.observe(main, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, []);

  return null;
}
