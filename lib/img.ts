/**
 * Serve a `public/` image through Next's image optimiser from a CSS background.
 *
 * A CSS background never passes through `next/image`, so every hero on this
 * site is delivered at its full stored resolution to every device. Measured on
 * the live site on 23 October 2026, in a 375x812 viewport at devicePixelRatio
 * 2, which is 750 device pixels wide:
 *
 *   /                                      3,259 KB of images
 *   /sun-goddess-gold-coast                4,082 KB
 *   /cruise-tickets-luxury-whale-watching  2,979 KB
 *   /luxury-broadwater-cruise                774 KB
 *
 * The sunset hero alone is 581 KB of that, a 2400 pixel wide JPEG painted into
 * 750 device pixels. The same file requested through the optimiser, which is
 * already live on this deployment:
 *
 *   raw file        581 KB
 *   w=828            65 KB   a phone
 *   w=1080          102 KB
 *   w=1920          270 KB   a desktop
 *
 * So this is a URL change inside the same `backgroundImage` property. The
 * element, the layout and the CSS are untouched, which is why it is safe in a
 * way that moving these to `next/image` with `fill` is not.
 *
 * `image-set()` lets the browser pick by device pixel ratio. A 1x screen takes
 * the 1080 variant and a 2x screen the 1920, and every browser that matters has
 * supported `image-set` since 2021. The plain `url()` stays as the last
 * declaration so anything that does not understand `image-set` still gets an
 * image: CSS drops a declaration it cannot parse and keeps the previous one.
 *
 * Note for whoever owns the Vercel account: image optimisation is metered on
 * some plans. These are a small number of files on a small number of routes,
 * and each transformation is cached, but it is worth a look at the usage page
 * before this is rolled out to every background on the site.
 */
export function heroBackground(src: string): string {
  if (!src.startsWith('/') || src.startsWith('/_next/')) {
    return `url(${src})`;
  }
  const at = (w: number) =>
    `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
  return `image-set(url("${at(1080)}") 1x, url("${at(1920)}") 2x)`;
}
