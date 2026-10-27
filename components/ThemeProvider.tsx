'use client';

import { createContext, useContext } from 'react';

// The site has a single look now (white sections alternating with navy), so there is
// no theme to switch. This stays only so the few components that still call
// useTheme() keep working; remove it together with them.
type Theme = 'light';

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeCtx.Provider value={{ theme: 'light', toggle: () => {} }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
