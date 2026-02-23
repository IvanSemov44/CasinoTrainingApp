import React, { useMemo, useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Pressable,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DifficultyLevel, SectorType } from '../types';
import { SECTOR_NAMES, SECTOR_POSITIONS, DIFFICULTY_MAX_BET } from '../constants/sectors';
import type { CashConversionStackParamList } from '../navigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Difficulty options
const DIFFICULTY_OPTIONS: { key: DifficultyLevel; name: string; icon: string; description: string }[] = [
  { key: 'easy', name: 'Easy', icon: '🟢', description: `Max $${DIFFICULTY_MAX_BET.easy} per position` },
  { key: 'medium', name: 'Medium', icon: '🟡', description: `Max $${DIFFICULTY_MAX_BET.medium} per position` },
  { key: 'hard', name: 'Hard', icon: '🔴', description: `Max $${DIFFICULTY_MAX_BET.hard} per position` },
];

// Sector options
const SECTOR_OPTIONS: { key: SectorType; name: string; icon: string; positions?: number }[] = [
  { key: 'tier', name: 'Tier', icon: '🎯', positions: SECTOR_POSITIONS.tier },
  { key: 'orphelins', name: 'Orphelins', icon: '🎪', positions: SECTOR_POSITIONS.orphelins },
  { key: 'voisins', name: 'Voisins', icon: '🎭', positions: SECTOR_POSITIONS.voisins },
  { key: 'zero', name: 'Zero', icon: '⭕', positions: SECTOR_POSITIONS.zero },
  { key: 'neighbors', name: 'Neighbors', icon: '👥', positions: SECTOR_POSITIONS.neighbors },
  { key: 'random', name: 'Random', icon: '🎲' },
];

// Exercise count options
const EXERCISE_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];

interface CashConversionTrainingModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CashConversionTrainingModal({ visible, onClose }: CashConversionTrainingModalProps) {
  const navigation = useNavigation<StackNavigationProp<CashConversionStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // State for cascading dropdowns
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorType | null>(null);
  const [exerciseCount, setExerciseCount] = useState<string>('10');
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showSectorDropdown, setShowSectorDropdown] = useState(false);
  const [showCountDropdown, setShowCountDropdown] = useState(false);

  // Animation effects
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 65,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setSelectedDifficulty(null);
      setSelectedSector(null);
      setExerciseCount('10');
      setShowDifficultyDropdown(false);
      setShowSectorDropdown(false);
      setShowCountDropdown(false);
    }
  }, [visible]);

  // Handle keyboard escape
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add keyboard listener for web
  useEffect(() => {
    if (Platform.OS === 'web' && visible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  // Handle difficulty selection
  const handleDifficultySelect = useCallback((difficulty: DifficultyLevel) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyDropdown(false);
  }, []);

  // Handle sector selection
  const handleSectorSelect = useCallback((sector: SectorType) => {
    setSelectedSector(sector);
    setShowSectorDropdown(false);
  }, []);

  // Handle exercise count selection
  const handleCountSelect = useCallback((count: number) => {
    setExerciseCount(count.toString());
    setShowCountDropdown(false);
  }, []);

  // Handle start training
  const handleStartTraining = useCallback(() => {
    if (!selectedDifficulty || !selectedSector) return;

    const count = parseInt(exerciseCount, 10);

    onClose();
    navigation.navigate('CashConversionTraining', {
      difficulty: selectedDifficulty,
      sector: selectedSector,
      exerciseCount: count > 0 ? count : undefined,
    });
  }, [selectedDifficulty, selectedSector, exerciseCount, navigation, onClose]);

  // Check if can start training
  const canStartTraining = useMemo(() => {
    return selectedDifficulty && selectedSector && exerciseCount && parseInt(exerciseCount, 10) > 0;
  }, [selectedDifficulty, selectedSector, exerciseCount]);

  // Render dropdown item
  const renderDropdownItem = (
    label: string,
    isSelected: boolean,
    onPress: () => void,
    icon?: string,
    extraInfo?: string
  ) => (
    <TouchableOpacity
      key={label}
      style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
      onPress={onPress}
    >
      {icon && <Text style={styles.dropdownItemIcon}>{icon}</Text>}
      <View style={styles.dropdownItemContent}>
        <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>
          {label}
        </Text>
        {extraInfo && <Text style={styles.dropdownItemExtra}>{extraInfo}</Text>}
      </View>
      {isSelected && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Cash Conversion Setup</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
          >
            {/* Step 1: Difficulty Selection */}
            <View style={styles.stepContainer}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepTitle}>Difficulty</Text>
              </View>
              
              <TouchableOpacity
                style={[styles.dropdownTrigger, selectedDifficulty && styles.dropdownTriggerSelected]}
                onPress={() => {
                  setShowDifficultyDropdown(!showDifficultyDropdown);
                  setShowSectorDropdown(false);
                  setShowCountDropdown(false);
                }}
              >
                {selectedDifficulty ? (
                  <View style={styles.dropdownTriggerContent}>
                    <Text style={styles.dropdownTriggerIcon}>
                      {DIFFICULTY_OPTIONS.find(d => d.key === selectedDifficulty)?.icon}
                    </Text>
                    <View>
                      <Text style={styles.dropdownTriggerText}>
                        {DIFFICULTY_OPTIONS.find(d => d.key === selectedDifficulty)?.name}
                      </Text>
                      <Text style={styles.dropdownTriggerSubtext}>
                        {DIFFICULTY_OPTIONS.find(d => d.key === selectedDifficulty)?.description}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.dropdownTriggerPlaceholder}>Select difficulty...</Text>
                )}
                <Text style={styles.dropdownArrow}>{showDifficultyDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {showDifficultyDropdown && (
                <View style={styles.dropdownList}>
                  {DIFFICULTY_OPTIONS.map((diff) =>
                    renderDropdownItem(
                      diff.name,
                      selectedDifficulty === diff.key,
                      () => handleDifficultySelect(diff.key),
                      diff.icon,
                      diff.description
                    )
                  )}
                </View>
              )}
            </View>

            {/* Step 2: Sector Selection (shown after difficulty is selected) */}
            {selectedDifficulty && (
              <View style={styles.stepContainer}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepTitle}>Sector</Text>
                </View>
                
                <TouchableOpacity
                  style={[styles.dropdownTrigger, selectedSector && styles.dropdownTriggerSelected]}
                  onPress={() => {
                    setShowSectorDropdown(!showSectorDropdown);
                    setShowDifficultyDropdown(false);
                    setShowCountDropdown(false);
                  }}
                >
                  {selectedSector ? (
                    <View style={styles.dropdownTriggerContent}>
                      <Text style={styles.dropdownTriggerIcon}>
                        {SECTOR_OPTIONS.find(s => s.key === selectedSector)?.icon}
                      </Text>
                      <View>
                        <Text style={styles.dropdownTriggerText}>
                          {SECTOR_OPTIONS.find(s => s.key === selectedSector)?.name}
                        </Text>
                        {SECTOR_OPTIONS.find(s => s.key === selectedSector)?.positions && (
                          <Text style={styles.dropdownTriggerSubtext}>
                            {SECTOR_OPTIONS.find(s => s.key === selectedSector)?.positions} positions
                          </Text>
                        )}
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.dropdownTriggerPlaceholder}>Select sector...</Text>
                  )}
                  <Text style={styles.dropdownArrow}>{showSectorDropdown ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {showSectorDropdown && (
                  <View style={styles.dropdownList}>
                    {SECTOR_OPTIONS.map((sector) =>
                      renderDropdownItem(
                        sector.name,
                        selectedSector === sector.key,
                        () => handleSectorSelect(sector.key),
                        sector.icon,
                        sector.positions ? `${sector.positions} positions` : 'Random sector'
                      )
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Step 3: Exercise Count (shown after sector is selected) */}
            {selectedSector && (
              <View style={styles.stepContainer}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepTitle}>Exercise Count</Text>
                </View>
                
                <View style={styles.chipCountContainer}>
                  <TouchableOpacity
                    style={[styles.dropdownTrigger, styles.chipCountTrigger]}
                    onPress={() => {
                      setShowCountDropdown(!showCountDropdown);
                      setShowDifficultyDropdown(false);
                      setShowSectorDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownTriggerText}>{exerciseCount} exercises</Text>
                    <Text style={styles.dropdownArrow}>{showCountDropdown ? '▲' : '▼'}</Text>
                  </TouchableOpacity>

                  <View style={styles.chipCountInputContainer}>
                    <Text style={styles.chipCountInputLabel}>Or enter custom:</Text>
                    <TextInput
                      style={styles.chipCountInput}
                      value={exerciseCount}
                      onChangeText={setExerciseCount}
                      keyboardType="numeric"
                      placeholder="10"
                      placeholderTextColor="#666"
                      maxLength={3}
                    />
                  </View>
                </View>

                {showCountDropdown && (
                  <View style={styles.dropdownList}>
                    {EXERCISE_COUNT_OPTIONS.map((count) =>
                      renderDropdownItem(
                        `${count} exercises`,
                        parseInt(exerciseCount, 10) === count,
                        () => handleCountSelect(count),
                        '📝'
                      )
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Summary and Start Button */}
            {selectedDifficulty && selectedSector && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Training Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Difficulty:</Text>
                  <Text style={styles.summaryValue}>
                    {DIFFICULTY_OPTIONS.find(d => d.key === selectedDifficulty)?.name}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Sector:</Text>
                  <Text style={styles.summaryValue}>
                    {SECTOR_OPTIONS.find(s => s.key === selectedSector)?.name}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Exercises:</Text>
                  <Text style={styles.summaryValue}>{exerciseCount}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.startButton, !canStartTraining && styles.startButtonDisabled]}
                  onPress={handleStartTraining}
                  disabled={!canStartTraining}
                >
                  <Text style={styles.startButtonIcon}>🚀</Text>
                  <Text style={styles.startButtonText}>Start Training</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: SCREEN_WIDTH > 600 ? 520 : SCREEN_WIDTH - 32,
    maxHeight: SCREEN_HEIGHT * 0.85,
    backgroundColor: '#0a2f1f',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      default: {
        elevation: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 24,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a7f4f',
    backgroundColor: '#0f4f2f',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a5f3f',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2a7f4f',
  },
  dropdownTriggerSelected: {
    borderColor: '#FFD700',
    backgroundColor: '#1a6f4f',
  },
  dropdownTriggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownTriggerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  dropdownTriggerText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  dropdownTriggerSubtext: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 2,
  },
  dropdownTriggerPlaceholder: {
    fontSize: 15,
    color: '#888',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#FFD700',
    marginLeft: 10,
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: '#1a5f3f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a7f4f',
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a5f3f',
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
  dropdownItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  dropdownItemTextSelected: {
    color: '#FFD700',
    fontWeight: '600',
  },
  dropdownItemExtra: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  chipCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chipCountTrigger: {
    flex: 1,
  },
  chipCountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipCountInputLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginRight: 8,
  },
  chipCountInput: {
    width: 60,
    backgroundColor: '#1a5f3f',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2a7f4f',
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: 'rgba(26, 95, 63, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#2a7f4f',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  summaryValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 16,
  },
  startButtonDisabled: {
    backgroundColor: '#2a5f3f',
    opacity: 0.6,
  },
  startButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});