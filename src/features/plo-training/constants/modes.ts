import { PLODifficulty } from '../types';

export interface PLOModeOption {
  difficulty: PLODifficulty;
  label: string;
  description: string;
}

export const PLO_MODES: PLOModeOption[] = [
  { difficulty: 'easy', label: 'Easy', description: 'Preflop pot calculations' },
  { difficulty: 'medium', label: 'Medium', description: 'Multi-street pots' },
  { difficulty: 'advanced', label: 'Advanced', description: 'Complex scenarios' },
];
