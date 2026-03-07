import { useMemo } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import type { AppColors } from '@styles/themes';

export function useThemedStyles<T>(makeStylesFn: (colors: AppColors) => T): T {
  const { colors } = useTheme();
  return useMemo(() => makeStylesFn(colors), [colors, makeStylesFn]);
}
