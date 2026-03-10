import type { NumberInputConfig, StepConfig, SummaryItem } from '@components/shared';
import type { CashConfigKey } from '@config/cashConfigs';
import {
  type PositionType,
  CASH_CONFIGS,
} from '@features/roulette-training/config/exerciseDefinitions';
import {
  CHIP_COUNT_OPTIONS,
  TRAINING_TYPES,
} from '@features/roulette-training/constants/trainingTypes.constants';

const CHIP_DENOMINATIONS = CASH_CONFIGS.map(config => ({
  key: config.cashConfigKey,
  label: config.chipValue,
  icon: '💰',
  extraInfo: `${config.difficulty} difficulty`,
}));

interface StepBuilderParams {
  selectedTrainingType: PositionType | null;
  selectedDenomination: CashConfigKey | null;
  onTrainingTypeSelect: (key: string) => void;
  onDenominationSelect: (key: string) => void;
  onToggleTrainingType: () => void;
  onToggleDenomination: () => void;
  isTrainingTypeOpen: boolean;
  isDenominationOpen: boolean;
}

interface NumberInputBuilderParams {
  selectedTrainingType: PositionType | null;
  selectedDenomination: CashConfigKey | null;
  chipCount: string;
  onChipCountChange: (value: string) => void;
  onToggleChipCount: () => void;
  isChipCountOpen: boolean;
}

export function buildTrainingSelectionSteps({
  selectedTrainingType,
  selectedDenomination,
  onTrainingTypeSelect,
  onDenominationSelect,
  onToggleTrainingType,
  onToggleDenomination,
  isTrainingTypeOpen,
  isDenominationOpen,
}: StepBuilderParams): StepConfig[] {
  const steps: StepConfig[] = [
    {
      number: 1,
      title: 'Training Type',
      items: TRAINING_TYPES,
      selectedKey: selectedTrainingType,
      onSelect: onTrainingTypeSelect,
      showDropdown: isTrainingTypeOpen,
      onToggleDropdown: onToggleTrainingType,
      placeholder: 'Select training type...',
    },
  ];

  if (selectedTrainingType) {
    steps.push({
      number: 2,
      title: 'Chip Denomination',
      optional: true,
      items: CHIP_DENOMINATIONS,
      selectedKey: selectedDenomination,
      onSelect: onDenominationSelect,
      showDropdown: isDenominationOpen,
      onToggleDropdown: onToggleDenomination,
      placeholder: 'Select chip value (optional)...',
    });
  }

  return steps;
}

export function buildTrainingSelectionNumberInput({
  selectedTrainingType,
  selectedDenomination,
  chipCount,
  onChipCountChange,
  onToggleChipCount,
  isChipCountOpen,
}: NumberInputBuilderParams): NumberInputConfig | undefined {
  if (!selectedTrainingType) return undefined;

  return {
    number: selectedDenomination ? 3 : 2,
    title: 'Chip Count',
    value: chipCount,
    onChange: onChipCountChange,
    presets: CHIP_COUNT_OPTIONS,
    presetLabel: 'chips',
    showDropdown: isChipCountOpen,
    onToggleDropdown: onToggleChipCount,
  };
}

export function buildTrainingSelectionSummary(
  selectedTrainingType: PositionType | null,
  selectedDenomination: CashConfigKey | null,
  chipCount: string
): SummaryItem[] {
  if (!selectedTrainingType) return [];

  const summary: SummaryItem[] = [
    {
      label: 'Type',
      value: TRAINING_TYPES.find(t => t.key === selectedTrainingType)?.label || '',
    },
  ];

  if (selectedDenomination) {
    summary.push({
      label: 'Denomination',
      value: CHIP_DENOMINATIONS.find(d => d.key === selectedDenomination)?.label || '',
    });
  }

  summary.push({
    label: 'Chips',
    value: chipCount,
  });

  return summary;
}
