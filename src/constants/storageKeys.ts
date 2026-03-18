/**
 * Centralized AsyncStorage keys for the app.
 * All storage key constants should be defined here to avoid
 * duplicates and typos across the codebase.
 */

export const STORAGE_KEYS = {
  // Theme
  THEME: '@app_theme',

  // Settings
  SETTINGS_SOUND: '@app_settings_sound',
  SETTINGS_HAPTIC: '@app_settings_haptic',

  // User progress & results
  USER_PROGRESS: '@casino_training_progress',
  EXERCISE_RESULTS: '@casino_training_results',

  // Redux persist
  REDUX_PERSIST: 'root',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
