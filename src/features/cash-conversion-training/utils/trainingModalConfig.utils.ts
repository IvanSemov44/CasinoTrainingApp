import type { NumberInputConfig, StepConfig, SummaryItem } from '@components/shared';
import type { DifficultyLevel, SectorType } from '../types';
import {
  DIFFICULTY_OPTIONS,
  EXERCISE_COUNT_OPTIONS,
  SECTOR_OPTIONS,
} from '../constants/trainingOptions.constants';

interface StepBuilderParams {
  selectedDifficulty: DifficultyLevel | null;
  selectedSector: SectorType | null;
  onDifficultySelect: (key: string) => void;
  onSectorSelect: (key: string) => void;
  onToggleDifficulty: () => void;
  onToggleSector: () => void;
  isDifficultyOpen: boolean;
  isSectorOpen: boolean;
}

interface NumberInputBuilderParams {
  selectedSector: SectorType | null;
  exerciseCount: string;
  onExerciseCountChange: (value: string) => void;
  onToggleCount: () => void;
  isCountOpen: boolean;
}

export function buildCashConversionSteps({
  selectedDifficulty,
  selectedSector,
  onDifficultySelect,
  onSectorSelect,
  onToggleDifficulty,
  onToggleSector,
  isDifficultyOpen,
  isSectorOpen,
}: StepBuilderParams): StepConfig[] {
  const steps: StepConfig[] = [
    {
      number: 1,
      title: 'Difficulty',
      items: DIFFICULTY_OPTIONS,
      selectedKey: selectedDifficulty,
      onSelect: onDifficultySelect,
      showDropdown: isDifficultyOpen,
      onToggleDropdown: onToggleDifficulty,
      placeholder: 'Select difficulty...',
    },
  ];

  if (selectedDifficulty) {
    steps.push({
      number: 2,
      title: 'Sector',
      items: SECTOR_OPTIONS,
      selectedKey: selectedSector,
      onSelect: onSectorSelect,
      showDropdown: isSectorOpen,
      onToggleDropdown: onToggleSector,
      placeholder: 'Select sector...',
    });
  }

  return steps;
}

export function buildCashConversionNumberInput({
  selectedSector,
  exerciseCount,
  onExerciseCountChange,
  onToggleCount,
  isCountOpen,
}: NumberInputBuilderParams): NumberInputConfig | undefined {
  if (!selectedSector) return undefined;

  return {
    number: 3,
    title: 'Exercise Count',
    value: exerciseCount,
    onChange: onExerciseCountChange,
    presets: EXERCISE_COUNT_OPTIONS,
    presetLabel: 'exercises',
    showDropdown: isCountOpen,
    onToggleDropdown: onToggleCount,
  };
}

export function buildCashConversionSummary(
  selectedDifficulty: DifficultyLevel | null,
  selectedSector: SectorType | null,
  exerciseCount: string
): SummaryItem[] {
  if (!selectedDifficulty || !selectedSector) return [];

  return [
    {
      label: 'Difficulty',
      value: DIFFICULTY_OPTIONS.find(d => d.key === selectedDifficulty)?.label || '',
    },
    {
      label: 'Sector',
      value: SECTOR_OPTIONS.find(s => s.key === selectedSector)?.label || '',
    },
    {
      label: 'Exercises',
      value: exerciseCount,
    },
  ];
}

export function canStartCashConversion(
  selectedDifficulty: DifficultyLevel | null,
  selectedSector: SectorType | null,
  exerciseCount: string
): boolean {
  const count = parseInt(exerciseCount, 10);
  return !!selectedDifficulty && !!selectedSector && !!exerciseCount && count > 0;
}
