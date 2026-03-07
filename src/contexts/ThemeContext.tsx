import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type AppColors, type ThemeId, THEMES } from '@styles/themes';

const STORAGE_KEY = '@app_theme';

interface ThemeContextValue {
  themeId: ThemeId;
  colors: AppColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: 'midnight',
  colors: THEMES['midnight'],
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('midnight');

  // Load persisted preference once on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(stored => {
        if (stored === 'midnight' || stored === 'casino-green') {
          setThemeId(stored);
        }
      })
      .catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeId(prev => {
      const next: ThemeId = prev === 'midnight' ? 'casino-green' : 'midnight';
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ themeId, colors: THEMES[themeId], toggleTheme }),
    [themeId, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
