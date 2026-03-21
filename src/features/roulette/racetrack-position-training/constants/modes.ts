import { PositionMode } from '../types';

export interface PositionModeOption {
  mode: PositionMode;
  title: string;
  description: string;
  color: string;
}

// Accent colors for position training modes - visual hierarchy indicators
export const POSITION_ACCENT_COLORS: Record<PositionMode, string> = {
  single: '#3b82f6', // Blue
  random: '#10b981', // Green
};

export const POSITION_MODE_OPTIONS: PositionModeOption[] = [
  {
    mode: 'single',
    title: 'Single Number',
    description: 'Tap the exact number on the racetrack',
    color: POSITION_ACCENT_COLORS.single,
  },
  {
    mode: 'random',
    title: 'Random Training',
    description: 'Practice finding numbers randomly',
    color: POSITION_ACCENT_COLORS.random,
  },
];
