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
import { DifficultyLevel, SectorType } from '../types';
import { SECTOR_POSITIONS, DIFFICULTY_MAX_BET } from '../constants/sectors';
import type { CashConversionStackParamList } from '../navigation';

// Difficulty options
const DIFFICULTY_OPTIONS: DropdownItem[] = [
  { key: 'easy', label: 'Easy', icon: '🟢', extraInfo: `Max $${DIFFICULTY_MAX_BET.easy} per position` },
  { key: 'medium', label: 'Medium', icon: '🟡', extraInfo: `Max $${DIFFICULTY_MAX_BET.medium} per position` },
  { key: 'hard', label: 'Hard', icon: '🔴', extraInfo: `Max $${DIFFICULTY_MAX_BET.hard} per position` },
];

// Sector options
const SECTOR_OPTIONS: DropdownItem[] = [
  { key: 'tier', label: 'Tier', icon: '🎯', extraInfo: `${SECTOR_POSITIONS.tier} positions` },
  { key: 'orphelins', label: 'Orphelins', icon: '🎪', extraInfo: `${SECTOR_POSITIONS.orphelins} positions` },
  { key: 'voisins', label: 'Voisins', icon: '🎭', extraInfo: `${SECTOR_POSITIONS.voisins} positions` },
  { key: 'zero', label: 'Zero', icon: '⭕', extraInfo: `${SECTOR_POSITIONS.zero} positions` },
  { key: 'neighbors', label: 'Neighbors', icon: '👥', extraInfo: `${SECTOR_POSITIONS.neighbors} positions` },
  { key: 'random', label: 'Random', icon: '🎲', extraInfo: 'Random sector' },
];

// Exercise count options
const EXERCISE_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];

interface CashConversionTrainingModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CashConversionTrainingModal({ visible, onClose }: CashConversionTrainingModalProps) {
  const navigation = useNavigation<StackNavigationProp<CashConversionStackParamList>>();

  // State for cascading dropdowns
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorType | null>(null);
  const [exerciseCount, setExerciseCount] = useState<string>('10');
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showSectorDropdown, setShowSectorDropdown] = useState(false);
  const [showCountDropdown, setShowCountDropdown] = useState(false);

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    setSelectedDifficulty(null);
    setSelectedSector(null);
    setExerciseCount('10');
    setShowDifficultyDropdown(false);
    setShowSectorDropdown(false);
    setShowCountDropdown(false);
    onClose();
  }, [onClose]);

  // Handle difficulty selection
  const handleDifficultySelect = useCallback((key: string) => {
    setSelectedDifficulty(key as DifficultyLevel);
    setShowDifficultyDropdown(false);
    // Reset downstream selections
    setSelectedSector(null);
  }, []);

  // Handle sector selection
  const handleSectorSelect = useCallback((key: string) => {
    setSelectedSector(key as SectorType);
    setShowSectorDropdown(false);
  }, []);

  // Handle exercise count change
  const handleExerciseCountChange = useCallback((value: string) => {
    setExerciseCount(value);
    setShowCountDropdown(false);
  }, []);

  // Toggle dropdown handlers
  const toggleDifficultyDropdown = useCallback(() => {
    setShowDifficultyDropdown(prev => !prev);
    setShowSectorDropdown(false);
    setShowCountDropdown(false);
  }, []);

  const toggleSectorDropdown = useCallback(() => {
    setShowSectorDropdown(prev => !prev);
    setShowDifficultyDropdown(false);
    setShowCountDropdown(false);
  }, []);

  const toggleCountDropdown = useCallback(() => {
    setShowCountDropdown(prev => !prev);
    setShowDifficultyDropdown(false);
    setShowSectorDropdown(false);
  }, []);

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
    return selectedDifficulty && selectedSector && exerciseCount && parseInt(exerciseCount, 10) > 0;
  }, [selectedDifficulty, selectedSector, exerciseCount]);

  // Build steps configuration
  const steps: StepConfig[] = useMemo(() => {
    const baseSteps: StepConfig[] = [
      {
        number: 1,
        title: 'Difficulty',
        items: DIFFICULTY_OPTIONS,
        selectedKey: selectedDifficulty,
        onSelect: handleDifficultySelect,
        showDropdown: showDifficultyDropdown,
        onToggleDropdown: toggleDifficultyDropdown,
        placeholder: 'Select difficulty...',
      },
    ];

    // Only add sector step if difficulty is selected (cascading)
    if (selectedDifficulty) {
      baseSteps.push({
        number: 2,
        title: 'Sector',
        items: SECTOR_OPTIONS,
        selectedKey: selectedSector,
        onSelect: handleSectorSelect,
        showDropdown: showSectorDropdown,
        onToggleDropdown: toggleSectorDropdown,
        placeholder: 'Select sector...',
      });
    }

    return baseSteps;
  }, [
    selectedDifficulty,
    selectedSector,
    showDifficultyDropdown,
    showSectorDropdown,
    handleDifficultySelect,
    handleSectorSelect,
    toggleDifficultyDropdown,
    toggleSectorDropdown,
  ]);

  // Number input configuration for exercise count
  const numberInputConfig: NumberInputConfig | undefined = useMemo(() => {
    if (!selectedSector) return undefined;

    return {
      number: 3,
      title: 'Exercise Count',
      value: exerciseCount,
      onChange: handleExerciseCountChange,
      presets: EXERCISE_COUNT_OPTIONS,
      presetLabel: 'exercises',
      showDropdown: showCountDropdown,
      onToggleDropdown: toggleCountDropdown,
    };
  }, [selectedSector, exerciseCount, showCountDropdown, handleExerciseCountChange, toggleCountDropdown]);

  // Build summary items
  const summaryItems: SummaryItem[] = useMemo(() => {
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
