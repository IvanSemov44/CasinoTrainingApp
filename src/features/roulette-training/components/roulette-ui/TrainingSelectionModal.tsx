import React, { useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BaseTrainingModal,
  type StepConfig,
  type SummaryItem,
  type NumberInputConfig,
} from '@shared';
import { useCascadingDropdowns } from '@hooks/useCascadingDropdowns';
import { type PositionType } from '@features/roulette-training/config/exerciseDefinitions';
import type { BetConfigKey } from '@config/betConfigs';
import type { RouletteTrainingStackParamList } from '@features/roulette-training/navigation';
import type { CashConfigKey } from '@config/cashConfigs';
import {
  getTrainingBetConfig,
  getTrainingBetTypes,
  getTrainingScreen,
} from '@features/roulette-training/utils/trainingSelection.utils';
import {
  buildTrainingSelectionNumberInput,
  buildTrainingSelectionSteps,
  buildTrainingSelectionSummary,
} from '@features/roulette-training/utils/trainingSelectionModalConfig.utils';

interface TrainingSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TrainingSelectionModal({ visible, onClose }: TrainingSelectionModalProps) {
  const navigation = useNavigation<StackNavigationProp<RouletteTrainingStackParamList>>();

  // Use cascading dropdowns hook for state management
  const { selections, isOpen, toggle, select, reset, resetFrom } = useCascadingDropdowns({
    dropdowns: ['trainingType', 'denomination', 'chipCount'],
    initialValues: { chipCount: '3' },
  });

  const selectedTrainingType = selections.trainingType as PositionType | null;
  const selectedDenomination = selections.denomination as CashConfigKey | null;
  const chipCount = selections.chipCount || '3';

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  // Handle training type selection
  const handleTrainingTypeSelect = useCallback(
    (key: string) => {
      select('trainingType', key);
      resetFrom('trainingType');
    },
    [select, resetFrom]
  );

  // Handle denomination selection
  const handleDenominationSelect = useCallback(
    (key: string) => {
      select('denomination', key);
    },
    [select]
  );

  // Handle chip count change
  const handleChipCountChange = useCallback(
    (value: string) => {
      select('chipCount', value);
    },
    [select]
  );

  // Handle start training
  const handleStartTraining = useCallback(() => {
    if (!selectedTrainingType) return;

    const screenName = getTrainingScreen(selectedTrainingType);
    const betConfigKey = getTrainingBetConfig(selectedTrainingType);
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

    const betTypes = getTrainingBetTypes(selectedTrainingType);
    if (betTypes) params.betTypes = betTypes;

    handleClose();
    const navigate = navigation.navigate as (...args: unknown[]) => void;
    navigate(screenName, Object.keys(params).length > 0 ? params : undefined);
  }, [selectedTrainingType, selectedDenomination, chipCount, navigation, handleClose]);

  // Check if can start training
  const canStartTraining = useMemo(() => {
    return selectedTrainingType && chipCount && parseInt(chipCount, 10) > 0;
  }, [selectedTrainingType, chipCount]);

  // Build steps configuration
  const steps: StepConfig[] = useMemo(() => {
    return buildTrainingSelectionSteps({
      selectedTrainingType,
      selectedDenomination,
      onTrainingTypeSelect: handleTrainingTypeSelect,
      onDenominationSelect: handleDenominationSelect,
      onToggleTrainingType: () => toggle('trainingType'),
      onToggleDenomination: () => toggle('denomination'),
      isTrainingTypeOpen: isOpen('trainingType'),
      isDenominationOpen: isOpen('denomination'),
    });
  }, [
    selectedTrainingType,
    selectedDenomination,
    handleTrainingTypeSelect,
    handleDenominationSelect,
    isOpen,
    toggle,
  ]);

  // Number input configuration for chip count
  const numberInputConfig: NumberInputConfig | undefined = useMemo(() => {
    return buildTrainingSelectionNumberInput({
      selectedTrainingType,
      selectedDenomination,
      chipCount,
      onChipCountChange: handleChipCountChange,
      onToggleChipCount: () => toggle('chipCount'),
      isChipCountOpen: isOpen('chipCount'),
    });
  }, [
    selectedTrainingType,
    selectedDenomination,
    chipCount,
    handleChipCountChange,
    isOpen,
    toggle,
  ]);

  // Build summary items
  const summaryItems: SummaryItem[] = useMemo(() => {
    return buildTrainingSelectionSummary(selectedTrainingType, selectedDenomination, chipCount);
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
