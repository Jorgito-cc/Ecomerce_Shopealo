import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
type Ctx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const DarkModeContext = createContext<Ctx | null>(null);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  // init: lee localStorage o media query
  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Theme | null);
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = saved ?? prefers;
    apply(initial);
  }, []);

  const apply = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    const root = document.documentElement;
    if (t === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  };

  const setTheme = (t: Theme) => apply(t);
  const toggle = () => apply(theme === 'dark' ? 'light' : 'dark');

  const value = useMemo(() => ({ theme, toggle, setTheme }), [theme]);
  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error('useDarkMode must be used inside DarkModeProvider');
  return ctx;
};
