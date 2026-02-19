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
import {
  type PositionType,
  CASH_CONFIGS,
} from '@features/roulette-training/config/exerciseDefinitions';
import type { BetConfigKey } from '@config/betConfigs';
import type { RouletteTrainingStackParamList } from '@features/roulette-training/navigation';
import type { CashConfigKey } from '@config/cashConfigs';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Training types available for selection
const TRAINING_TYPES: { key: PositionType; name: string; payout: string; icon: string }[] = [
  { key: 'STRAIGHT_UP', name: 'Straight Up', payout: '35:1', icon: '🎯' },
  { key: 'SPLIT', name: 'Split', payout: '17:1', icon: '↔️' },
  { key: 'STREET', name: 'Street', payout: '11:1', icon: '📏' },
  { key: 'CORNER', name: 'Corner', payout: '8:1', icon: '⬜' },
  { key: 'SIX_LINE', name: 'Six Line', payout: '5:1', icon: '🔷' },
  { key: 'MIXED_CALCULATION', name: 'Mixed (Straight + Split)', payout: 'Varies', icon: '🔀' },
  { key: 'TRIPLE_MIXED_CALCULATION', name: 'Triple Mixed', payout: 'Varies', icon: '🎰' },
  { key: 'ALL_POSITIONS_CALCULATION', name: 'All Positions', payout: 'Varies', icon: '🏆' },
];

// Chip denominations
const CHIP_DENOMINATIONS = CASH_CONFIGS.map(config => ({
  key: config.cashConfigKey,
  label: config.chipValue,
  value: config.cashConfigKey,
  difficulty: config.difficulty,
}));

// Chip count options
const CHIP_COUNT_OPTIONS = [1, 2, 3, 4, 5, 10, 15, 20, 25];

interface TrainingSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TrainingSelectionModal({ visible, onClose }: TrainingSelectionModalProps) {
  const navigation = useNavigation<StackNavigationProp<RouletteTrainingStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
      setSelectedTrainingType(null);
      setSelectedDenomination(null);
      setChipCount('3');
      setShowTrainingDropdown(false);
      setShowDenominationDropdown(false);
      setShowChipCountDropdown(false);
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

  // Handle training type selection
  const handleTrainingTypeSelect = useCallback((type: PositionType) => {
    setSelectedTrainingType(type);
    setShowTrainingDropdown(false);
    setSelectedDenomination(null); // Reset denomination when training type changes
  }, []);

  // Handle denomination selection
  const handleDenominationSelect = useCallback((denom: CashConfigKey) => {
    setSelectedDenomination(denom);
    setShowDenominationDropdown(false);
  }, []);

  // Handle chip count selection
  const handleChipCountSelect = useCallback((count: number) => {
    setChipCount(count.toString());
    setShowChipCountDropdown(false);
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

    onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation.navigate(screenName as any, Object.keys(params).length > 0 ? params : undefined);
  }, [selectedTrainingType, selectedDenomination, chipCount, getScreenName, getBetConfigKey, navigation, onClose]);

  // Check if can start training
  const canStartTraining = useMemo(() => {
    return selectedTrainingType && chipCount && parseInt(chipCount, 10) > 0;
  }, [selectedTrainingType, chipCount]);

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
            <Text style={styles.modalTitle}>Training Setup</Text>
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
            {/* Step 1: Training Type Selection */}
            <View style={styles.stepContainer}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepTitle}>Training Type</Text>
              </View>
              
              <TouchableOpacity
                style={[styles.dropdownTrigger, selectedTrainingType && styles.dropdownTriggerSelected]}
                onPress={() => {
                  setShowTrainingDropdown(!showTrainingDropdown);
                  setShowDenominationDropdown(false);
                  setShowChipCountDropdown(false);
                }}
              >
                {selectedTrainingType ? (
                  <View style={styles.dropdownTriggerContent}>
                    <Text style={styles.dropdownTriggerIcon}>
                      {TRAINING_TYPES.find(t => t.key === selectedTrainingType)?.icon}
                    </Text>
                    <View>
                      <Text style={styles.dropdownTriggerText}>
                        {TRAINING_TYPES.find(t => t.key === selectedTrainingType)?.name}
                      </Text>
                      <Text style={styles.dropdownTriggerSubtext}>
                        Payout: {TRAINING_TYPES.find(t => t.key === selectedTrainingType)?.payout}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.dropdownTriggerPlaceholder}>Select training type...</Text>
                )}
                <Text style={styles.dropdownArrow}>{showTrainingDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {showTrainingDropdown && (
                <View style={styles.dropdownList}>
                  {TRAINING_TYPES.map((type) =>
                    renderDropdownItem(
                      type.name,
                      selectedTrainingType === type.key,
                      () => handleTrainingTypeSelect(type.key),
                      type.icon,
                      `Payout: ${type.payout}`
                    )
                  )}
                </View>
              )}
            </View>

            {/* Step 2: Chip Denomination (shown after training type is selected) */}
            {selectedTrainingType && (
              <View style={styles.stepContainer}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepTitle}>Chip Denomination (Optional)</Text>
                </View>
                
                <TouchableOpacity
                  style={[styles.dropdownTrigger, selectedDenomination && styles.dropdownTriggerSelected]}
                  onPress={() => {
                    setShowDenominationDropdown(!showDenominationDropdown);
                    setShowTrainingDropdown(false);
                    setShowChipCountDropdown(false);
                  }}
                >
                  {selectedDenomination ? (
                    <View style={styles.dropdownTriggerContent}>
                      <Text style={styles.dropdownTriggerIcon}>💰</Text>
                      <View>
                        <Text style={styles.dropdownTriggerText}>
                          {CHIP_DENOMINATIONS.find(d => d.key === selectedDenomination)?.label}
                        </Text>
                        <Text style={styles.dropdownTriggerSubtext}>
                          {CHIP_DENOMINATIONS.find(d => d.key === selectedDenomination)?.difficulty} difficulty
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.dropdownTriggerPlaceholder}>Select chip value (optional)...</Text>
                  )}
                  <Text style={styles.dropdownArrow}>{showDenominationDropdown ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {showDenominationDropdown && (
                  <View style={styles.dropdownList}>
                    {CHIP_DENOMINATIONS.map((denom) =>
                      renderDropdownItem(
                        denom.label,
                        selectedDenomination === denom.key,
                        () => handleDenominationSelect(denom.key),
                        '💰',
                        `${denom.difficulty} difficulty`
                      )
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Step 3: Chip Count (shown after training type is selected) */}
            {selectedTrainingType && (
              <View style={styles.stepContainer}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{selectedDenomination ? '3' : '2'}</Text>
                  </View>
                  <Text style={styles.stepTitle}>Chip Count</Text>
                </View>
                
                <View style={styles.chipCountContainer}>
                  <TouchableOpacity
                    style={[styles.dropdownTrigger, styles.chipCountTrigger]}
                    onPress={() => {
                      setShowChipCountDropdown(!showChipCountDropdown);
                      setShowTrainingDropdown(false);
                      setShowDenominationDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownTriggerText}>{chipCount} chips</Text>
                    <Text style={styles.dropdownArrow}>{showChipCountDropdown ? '▲' : '▼'}</Text>
                  </TouchableOpacity>

                  <View style={styles.chipCountInputContainer}>
                    <Text style={styles.chipCountInputLabel}>Or enter custom:</Text>
                    <TextInput
                      style={styles.chipCountInput}
                      value={chipCount}
                      onChangeText={setChipCount}
                      keyboardType="numeric"
                      placeholder="3"
                      placeholderTextColor="#666"
                      maxLength={3}
                    />
                  </View>
                </View>

                {showChipCountDropdown && (
                  <View style={styles.dropdownList}>
                    {CHIP_COUNT_OPTIONS.map((count) =>
                      renderDropdownItem(
                        `${count} chips`,
                        parseInt(chipCount, 10) === count,
                        () => handleChipCountSelect(count),
                        '🎰'
                      )
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Summary and Start Button */}
            {selectedTrainingType && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Training Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Type:</Text>
                  <Text style={styles.summaryValue}>
                    {TRAINING_TYPES.find(t => t.key === selectedTrainingType)?.name}
                  </Text>
                </View>
                {selectedDenomination && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Denomination:</Text>
                    <Text style={styles.summaryValue}>
                      {CHIP_DENOMINATIONS.find(d => d.key === selectedDenomination)?.label}
                    </Text>
                  </View>
                )}
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Chips:</Text>
                  <Text style={styles.summaryValue}>{chipCount}</Text>
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
