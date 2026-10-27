import { Urbanist } from 'next/font/google';

// Free stand-in for bluuu.tours' Petrov Sans (a paid Fontfabric font).
// Chosen by measurement, not by eye: the width of 12 strings and five letter
// proportions (x-height, cap height, o, O, i) were measured in Petrov Sans on
// bluuu.tours and compared with ~60 Google fonts that have 400 and 600 weights.
// Urbanist came out closest (about 3% average difference; next best 4.5%) and has
// a real 600 weight. Like bluuu, only the two upright weights are loaded, so
// italics are the browser's slanted version of the upright face.
//
// To switch to Petrov Sans after buying a web licence: replace this with a
// next/font/local call that exposes the same CSS variable.
export const bluuuFont = Urbanist({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal'],
  variable: '--font-bluuu',
  display: 'swap',
});
