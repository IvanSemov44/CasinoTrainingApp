export type CallBetMode = 'tier' | 'orphelins' | 'voisins' | 'zero' | 'random';

export interface CallBetModeOption {
  key: CallBetMode;
  label: string;
  description: string;
}

export const CALL_BET_MODES: CallBetModeOption[] = [
  { key: 'tier', label: 'Tier', description: 'Learn the Tier bet (12 positions)' },
  { key: 'orphelins', label: 'Orphelins', description: 'Learn the Orphelins bet (8 positions)' },
  { key: 'voisins', label: 'Voisins', description: 'Learn the Voisins bet (17 positions)' },
  { key: 'zero', label: 'Zero', description: 'Learn the Zero bet (7 positions)' },
  { key: 'random', label: 'Random Mode', description: 'Mix all call bet types' },
] as const;
