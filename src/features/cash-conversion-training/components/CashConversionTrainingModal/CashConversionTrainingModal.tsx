import React, { useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCascadingDropdowns } from '@hooks/useCascadingDropdowns';
import {
  BaseTrainingModal,
  type NumberInputConfig,
  type StepConfig,
  type SummaryItem,
} from '@shared';
import { DifficultyLevel, SectorType } from '../../types';
import type { CashConversionStackParamList } from '../../navigation';
import type { CashConversionTrainingModalProps } from './CashConversionTrainingModal.types';
import {
  buildCashConversionNumberInput,
  buildCashConversionSteps,
  buildCashConversionSummary,
  canStartCashConversion,
} from '../../utils/trainingModalConfig.utils';

export default function CashConversionTrainingModal({
  visible,
  onClose,
}: CashConversionTrainingModalProps) {
  const navigation = useNavigation<StackNavigationProp<CashConversionStackParamList>>();

  // Use cascading dropdowns hook for state management
  const { selections, isOpen, toggle, select, reset, resetFrom } = useCascadingDropdowns({
    dropdowns: ['difficulty', 'sector', 'count'],
    initialValues: { count: '10' },
  });

  const selectedDifficulty = selections.difficulty as DifficultyLevel | null;
  const selectedSector = selections.sector as SectorType | null;
  const exerciseCount = selections.count || '10';

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  // Handle difficulty selection
  const handleDifficultySelect = useCallback(
    (key: string) => {
      select('difficulty', key);
      resetFrom('difficulty');
    },
    [select, resetFrom]
  );

  // Handle sector selection
  const handleSectorSelect = useCallback(
    (key: string) => {
      select('sector', key);
    },
    [select]
  );

  // Handle exercise count change
  const handleExerciseCountChange = useCallback(
    (value: string) => {
      select('count', value);
    },
    [select]
  );

  // Handle start training
  const handleStartTraining = useCallback(() => {
    if (!selectedDifficulty || !selectedSector) return;

    const count = parseInt(exerciseCount, 10);

    handleClose();
    navigation.navigate('CashConversionTraining', {
      difficulty: selectedDifficulty,
      sector: selectedSector,
      exerciseCount: count > 0 ? count : undefined,
    });
  }, [selectedDifficulty, selectedSector, exerciseCount, navigation, handleClose]);

  // Check if can start training
  const canStartTraining = useMemo(() => {
    return canStartCashConversion(selectedDifficulty, selectedSector, exerciseCount);
  }, [selectedDifficulty, selectedSector, exerciseCount]);

  // Build steps configuration
  const steps: StepConfig[] = useMemo(() => {
    return buildCashConversionSteps({
      selectedDifficulty,
      selectedSector,
      onDifficultySelect: handleDifficultySelect,
      onSectorSelect: handleSectorSelect,
      onToggleDifficulty: () => toggle('difficulty'),
      onToggleSector: () => toggle('sector'),
      isDifficultyOpen: isOpen('difficulty'),
      isSectorOpen: isOpen('sector'),
    });
  }, [
    selectedDifficulty,
    selectedSector,
    handleDifficultySelect,
    handleSectorSelect,
    isOpen,
    toggle,
  ]);

  // Number input configuration for exercise count
  const numberInputConfig: NumberInputConfig | undefined = useMemo(() => {
    return buildCashConversionNumberInput({
      selectedSector,
      exerciseCount,
      onExerciseCountChange: handleExerciseCountChange,
      onToggleCount: () => toggle('count'),
      isCountOpen: isOpen('count'),
    });
  }, [selectedSector, exerciseCount, handleExerciseCountChange, isOpen, toggle]);

  // Build summary items
  const summaryItems: SummaryItem[] = useMemo(() => {
    return buildCashConversionSummary(selectedDifficulty, selectedSector, exerciseCount);
  }, [selectedDifficulty, selectedSector, exerciseCount]);

  return (
    <BaseTrainingModal
      visible={visible}
      onClose={handleClose}
      title="Cash Conversion Setup"
      steps={steps}
      numberInput={numberInputConfig}
      summaryItems={summaryItems}
      canStart={!!canStartTraining}
      onStart={handleStartTraining}
    />
  );
}
