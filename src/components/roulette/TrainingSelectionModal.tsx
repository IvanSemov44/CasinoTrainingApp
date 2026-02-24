import React, { useMemo, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BaseTrainingModal,
  type DropdownItem,
  type StepConfig,
  type SummaryItem,
  type NumberInputConfig,
} from '@components/shared';
import {
  type PositionType,
  CASH_CONFIGS,
} from '@features/roulette-training/config/exerciseDefinitions';
import type { BetConfigKey } from '@config/betConfigs';
import type { RouletteTrainingStackParamList } from '@features/roulette-training/navigation';
import type { CashConfigKey } from '@config/cashConfigs';

// Training types available for selection
const TRAINING_TYPES: DropdownItem[] = [
  { key: 'STRAIGHT_UP', label: 'Straight Up', icon: '🎯', extraInfo: 'Payout: 35:1' },
  { key: 'SPLIT', label: 'Split', icon: '↔️', extraInfo: 'Payout: 17:1' },
  { key: 'STREET', label: 'Street', icon: '📏', extraInfo: 'Payout: 11:1' },
  { key: 'CORNER', label: 'Corner', icon: '⬜', extraInfo: 'Payout: 8:1' },
  { key: 'SIX_LINE', label: 'Six Line', icon: '🔷', extraInfo: 'Payout: 5:1' },
  { key: 'MIXED_CALCULATION', label: 'Mixed (Straight + Split)', icon: '🔀', extraInfo: 'Payout: Varies' },
  { key: 'TRIPLE_MIXED_CALCULATION', label: 'Triple Mixed', icon: '🎰', extraInfo: 'Payout: Varies' },
  { key: 'ALL_POSITIONS_CALCULATION', label: 'All Positions', icon: '🏆', extraInfo: 'Payout: Varies' },
];

// Chip denominations
const CHIP_DENOMINATIONS: DropdownItem[] = CASH_CONFIGS.map(config => ({
  key: config.cashConfigKey,
  label: config.chipValue,
  icon: '💰',
  extraInfo: `${config.difficulty} difficulty`,
}));

// Chip count options
const CHIP_COUNT_OPTIONS = [1, 2, 3, 4, 5, 10, 15, 20, 25];

interface TrainingSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TrainingSelectionModal({ visible, onClose }: TrainingSelectionModalProps) {
  const navigation = useNavigation<StackNavigationProp<RouletteTrainingStackParamList>>();

  // State for cascading dropdowns
  const [selectedTrainingType, setSelectedTrainingType] = useState<PositionType | null>(null);
  const [selectedDenomination, setSelectedDenomination] = useState<CashConfigKey | null>(null);
  const [chipCount, setChipCount] = useState<string>('3');
  const [showTrainingDropdown, setShowTrainingDropdown] = useState(false);
  const [showDenominationDropdown, setShowDenominationDropdown] = useState(false);
  const [showChipCountDropdown, setShowChipCountDropdown] = useState(false);

  // Get the screen name for navigation
  const getScreenName = useCallback((trainingType: PositionType): string => {
    switch (trainingType) {
      case 'STRAIGHT_UP':
      case 'SPLIT':
      case 'STREET':
      case 'CORNER':
      case 'SIX_LINE':
        return 'Calculation';
      case 'MIXED_CALCULATION':
        return 'MixedCalculation';
      case 'TRIPLE_MIXED_CALCULATION':
        return 'TripleMixedCalculation';
      case 'ALL_POSITIONS_CALCULATION':
        return 'AllPositionsCalculation';
      default:
        return 'Calculation';
    }
  }, []);

  // Get bet config key for training type
  const getBetConfigKey = useCallback((trainingType: PositionType): BetConfigKey | undefined => {
    const mapping: Record<string, BetConfigKey> = {
      STRAIGHT_UP: 'STRAIGHT_UP',
      SPLIT: 'SPLIT',
      STREET: 'STREET',
      CORNER: 'CORNER',
      SIX_LINE: 'SIX_LINE',
    };
    return mapping[trainingType];
  }, []);

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    setSelectedTrainingType(null);
    setSelectedDenomination(null);
    setChipCount('3');
    setShowTrainingDropdown(false);
    setShowDenominationDropdown(false);
    setShowChipCountDropdown(false);
    onClose();
  }, [onClose]);

  // Handle training type selection
  const handleTrainingTypeSelect = useCallback((key: string) => {
    setSelectedTrainingType(key as PositionType);
    setShowTrainingDropdown(false);
    // Reset downstream selections
    setSelectedDenomination(null);
  }, []);

  // Handle denomination selection
  const handleDenominationSelect = useCallback((key: string) => {
    setSelectedDenomination(key as CashConfigKey);
    setShowDenominationDropdown(false);
  }, []);

  // Handle chip count change
  const handleChipCountChange = useCallback((value: string) => {
    setChipCount(value);
    setShowChipCountDropdown(false);
  }, []);

  // Toggle dropdown handlers
  const toggleTrainingDropdown = useCallback(() => {
    setShowTrainingDropdown(prev => !prev);
    setShowDenominationDropdown(false);
    setShowChipCountDropdown(false);
  }, []);

  const toggleDenominationDropdown = useCallback(() => {
    setShowDenominationDropdown(prev => !prev);
    setShowTrainingDropdown(false);
    setShowChipCountDropdown(false);
  }, []);

  const toggleChipCountDropdown = useCallback(() => {
    setShowChipCountDropdown(prev => !prev);
    setShowTrainingDropdown(false);
    setShowDenominationDropdown(false);
  }, []);

  // Handle start training
  const handleStartTraining = useCallback(() => {
    if (!selectedTrainingType) return;

    const screenName = getScreenName(selectedTrainingType);
    const betConfigKey = getBetConfigKey(selectedTrainingType);
    const count = parseInt(chipCount, 10);

    // Build navigation params
    const params: {
      betConfigKey?: BetConfigKey;
      cashConfigKey?: CashConfigKey;
      betTypes?: string[];
      chipCount?: number;
    } = {};

    if (betConfigKey) params.betConfigKey = betConfigKey;
    if (selectedDenomination) params.cashConfigKey = selectedDenomination;
    if (count > 0) params.chipCount = count;

    // For mixed calculations, set bet types
    if (selectedTrainingType === 'MIXED_CALCULATION') {
      params.betTypes = ['STRAIGHT', 'SPLIT'];
    } else if (selectedTrainingType === 'TRIPLE_MIXED_CALCULATION') {
      params.betTypes = ['STRAIGHT', 'SPLIT', 'CORNER'];
    } else if (selectedTrainingType === 'ALL_POSITIONS_CALCULATION') {
      params.betTypes = ['STRAIGHT', 'SPLIT', 'CORNER', 'STREET', 'SIX_LINE'];
    }

    handleClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation.navigate(screenName as any, Object.keys(params).length > 0 ? params : undefined);
  }, [selectedTrainingType, selectedDenomination, chipCount, getScreenName, getBetConfigKey, navigation, handleClose]);

  // Check if can start training
  const canStartTraining = useMemo(() => {
    return selectedTrainingType && chipCount && parseInt(chipCount, 10) > 0;
  }, [selectedTrainingType, chipCount]);

  // Build steps configuration
  const steps: StepConfig[] = useMemo(() => {
    const baseSteps: StepConfig[] = [
      {
        number: 1,
        title: 'Training Type',
        items: TRAINING_TYPES,
        selectedKey: selectedTrainingType,
        onSelect: handleTrainingTypeSelect,
        showDropdown: showTrainingDropdown,
        onToggleDropdown: toggleTrainingDropdown,
        placeholder: 'Select training type...',
      },
    ];

    // Only add denomination step if training type is selected (cascading)
    if (selectedTrainingType) {
      baseSteps.push({
        number: 2,
        title: 'Chip Denomination',
        optional: true,
        items: CHIP_DENOMINATIONS,
        selectedKey: selectedDenomination,
        onSelect: handleDenominationSelect,
        showDropdown: showDenominationDropdown,
        onToggleDropdown: toggleDenominationDropdown,
        placeholder: 'Select chip value (optional)...',
      });
    }

    return baseSteps;
  }, [
    selectedTrainingType,
    selectedDenomination,
    showTrainingDropdown,
    showDenominationDropdown,
    handleTrainingTypeSelect,
    handleDenominationSelect,
    toggleTrainingDropdown,
    toggleDenominationDropdown,
  ]);

  // Number input configuration for chip count
  const numberInputConfig: NumberInputConfig | undefined = useMemo(() => {
    if (!selectedTrainingType) return undefined;

    return {
      number: selectedDenomination ? 3 : 2,
      title: 'Chip Count',
      value: chipCount,
      onChange: handleChipCountChange,
      presets: CHIP_COUNT_OPTIONS,
      presetLabel: 'chips',
      showDropdown: showChipCountDropdown,
      onToggleDropdown: toggleChipCountDropdown,
    };
  }, [selectedTrainingType, selectedDenomination, chipCount, showChipCountDropdown, handleChipCountChange, toggleChipCountDropdown]);

  // Build summary items
  const summaryItems: SummaryItem[] = useMemo(() => {
    if (!selectedTrainingType) return [];

    const items: SummaryItem[] = [
      {
        label: 'Type',
        value: TRAINING_TYPES.find(t => t.key === selectedTrainingType)?.label || '',
      },
    ];

    if (selectedDenomination) {
      items.push({
        label: 'Denomination',
        value: CHIP_DENOMINATIONS.find(d => d.key === selectedDenomination)?.label || '',
      });
    }

    items.push({
      label: 'Chips',
      value: chipCount,
    });

    return items;
  }, [selectedTrainingType, selectedDenomination, chipCount]);

  return (
    <BaseTrainingModal
      visible={visible}
      onClose={handleClose}
      title="Training Setup"
      steps={steps}
      numberInput={numberInputConfig}
      summaryItems={summaryItems}
      canStart={!!canStartTraining}
      onStart={handleStartTraining}
    />
  );
}
