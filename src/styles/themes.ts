/**
 * App theme definitions — Midnight Black + Casino Green.
 * AppColors mirrors the shape of COLORS so all existing usage patterns transfer.
 */

export interface AppColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    tertiaryLight: string;
    overlay: string;
    dark: string;
    darkGray: string;
    mediumGray: string;
    hint: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    placeholder: string;
    gold: string;
  };
  border: {
    primary: string;
    primaryDark: string;
    gold: string;
    hint: string;
  };
  status: {
    success: string;
    successAlt: string;
    error: string;
    errorAlt: string;
    errorBorder: string;
    warning: string;
    info: string;
    streak: string;
  };
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
  };
}

export type ThemeId = 'midnight' | 'casino-green';

/** ─── Midnight Black ─────────────────────────────────────────────── */
export const midnightTheme: AppColors = {
  background: {
    primary:       '#0A0A0F',
    secondary:     '#14142A',
    tertiary:      '#1D1D3A',
    tertiaryLight: '#22224A',
    overlay:       'rgba(0,0,0,0.85)',
    dark:          '#000000',
    darkGray:      '#0D0D18',
    mediumGray:    '#1A1A30',
    hint:          '#1A2048',
  },
  text: {
    primary:     '#FFFFFF',
    secondary:   '#9090A8',
    muted:       '#606078',
    placeholder: '#505068',
    gold:        '#F5C518',
  },
  border: {
    primary:     '#2D2D50',
    primaryDark: '#1E1E3A',
    gold:        '#F5C518',
    hint:        '#2A2A4A',
  },
  status: {
    success:     '#22C55E',
    successAlt:  '#0E2A18',
    error:       '#EF4444',
    errorAlt:    '#2A0E0E',
    errorBorder: '#EF4444',
    warning:     '#F59E0B',
    info:        '#3B82F6',
    streak:      '#FF6B00',
  },
  difficulty: {
    easy:   '#22C55E',
    medium: '#F59E0B',
    hard:   '#EF4444',
  },
};

/** ─── Casino Green (elevated) ────────────────────────────────────── */
export const casinoGreenTheme: AppColors = {
  background: {
    primary:       '#060E08',
    secondary:     '#0D1F10',
    tertiary:      '#152A18',
    tertiaryLight: '#1A3620',
    overlay:       'rgba(0,0,0,0.80)',
    dark:          '#000000',
    darkGray:      '#080F09',
    mediumGray:    '#111C12',
    hint:          '#1A3022',
  },
  text: {
    primary:     '#FFFFFF',
    secondary:   '#A0B8A4',
    muted:       '#6B8870',
    placeholder: '#506855',
    gold:        '#FFD700',
  },
  border: {
    primary:     '#1E4A28',
    primaryDark: '#152D1A',
    gold:        '#FFD700',
    hint:        '#2A5A35',
  },
  status: {
    success:     '#22C55E',
    successAlt:  '#0D2D15',
    error:       '#EF4444',
    errorAlt:    '#2D0E0E',
    errorBorder: '#EF4444',
    warning:     '#F59E0B',
    info:        '#3B82F6',
    streak:      '#FF8C42',
  },
  difficulty: {
    easy:   '#22C55E',
    medium: '#F59E0B',
    hard:   '#EF4444',
  },
};

export const THEMES: Record<ThemeId, AppColors> = {
  'midnight':     midnightTheme,
  'casino-green': casinoGreenTheme,
};

export const THEME_LABELS: Record<ThemeId, string> = {
  'midnight':     'Midnight',
  'casino-green': 'Casino',
};
