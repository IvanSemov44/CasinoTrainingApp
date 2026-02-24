import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useModalAnimation } from './useModalAnimation';
import { DropdownSelector, DropdownItem } from './DropdownSelector';
import { COLORS } from '@styles/colors';

/**
 * Configuration for a step in the modal
 */
export interface StepConfig {
  /** Step number (1, 2, 3, etc.) */
  number: number;
  /** Step title */
  title: string;
  /** Whether this step is optional */
  optional?: boolean;
  /** Items for the dropdown */
  items: DropdownItem[];
  /** Currently selected item key */
  selectedKey: string | null;
  /** Callback when an item is selected */
  onSelect: (key: string) => void;
  /** Whether the dropdown is open */
  showDropdown: boolean;
  /** Callback to toggle dropdown */
  onToggleDropdown: () => void;
  /** Placeholder text for dropdown */
  placeholder: string;
}

/**
 * Configuration for a number input step
 */
export interface NumberInputConfig {
  /** Step number */
  number: number;
  /** Step title */
  title: string;
  /** Current value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Preset options to display */
  presets: number[];
  /** Label for each preset (e.g., "chips" or "exercises") */
  presetLabel: string;
  /** Whether the dropdown is open */
  showDropdown: boolean;
  /** Callback to toggle dropdown */
  onToggleDropdown: () => void;
}

/**
 * Summary item to display in the summary section
 */
export interface SummaryItem {
  label: string;
  value: string;
}

/**
 * Props for BaseTrainingModal component
 */
export interface BaseTrainingModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Steps to display (rendered in order) */
  steps: StepConfig[];
  /** Optional number input configuration */
  numberInput?: NumberInputConfig;
  /** Items to display in the summary section */
  summaryItems: SummaryItem[];
  /** Whether the start button should be enabled */
  canStart: boolean;
  /** Callback when start button is pressed */
  onStart: () => void;
}

/**
 * Reusable base modal for training configuration.
 * Provides a consistent UI for selecting training options across different training types.
 * 
 * @example
 * <BaseTrainingModal
 *   visible={isVisible}
 *   onClose={handleClose}
 *   title="Training Setup"
 *   steps={[
 *     {
 *       number: 1,
 *       title: "Difficulty",
 *       items: difficultyOptions,
 *       selectedKey: selectedDifficulty,
 *       onSelect: handleDifficultySelect,
 *       showDropdown: showDifficultyDropdown,
 *       onToggleDropdown: toggleDifficultyDropdown,
 *       placeholder: "Select difficulty...",
 *     },
 *   ]}
 *   summaryItems={[
 *     { label: "Difficulty", value: "Easy" },
 *   ]}
 *   canStart={true}
 *   onStart={handleStart}
 * />
 */
export function BaseTrainingModal({
  visible,
  onClose,
  title,
  steps,
  numberInput,
  summaryItems,
  canStart,
  onStart,
}: BaseTrainingModalProps) {
  const { fadeAnim, scaleAnim } = useModalAnimation(visible);

  // Handle keyboard escape for web
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (Platform.OS === 'web' && visible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
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
            {/* Render steps */}
            {steps.map((step) => (
              <View key={step.number} style={styles.stepContainer}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{step.number}</Text>
                  </View>
                  <Text style={styles.stepTitle}>
                    {step.title}
                    {step.optional && <Text style={styles.optionalText}> (Optional)</Text>}
                  </Text>
                </View>
                <DropdownSelector
                  placeholder={step.placeholder}
                  items={step.items}
                  selectedKey={step.selectedKey}
                  onSelect={step.onSelect}
                  showDropdown={step.showDropdown}
                  onToggleDropdown={step.onToggleDropdown}
                />
              </View>
            ))}

            {/* Render number input if provided */}
            {numberInput && (
              <View style={styles.stepContainer}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{numberInput.number}</Text>
                  </View>
                  <Text style={styles.stepTitle}>{numberInput.title}</Text>
                </View>
                <View style={styles.numberInputContainer}>
                  <TouchableOpacity
                    style={[styles.dropdownTrigger, styles.numberInputTrigger]}
                    onPress={numberInput.onToggleDropdown}
                  >
                    <Text style={styles.dropdownTriggerText}>
                      {numberInput.value} {numberInput.presetLabel}
                    </Text>
                    <Text style={styles.dropdownArrow}>
                      {numberInput.showDropdown ? '▲' : '▼'}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.customInputContainer}>
                    <Text style={styles.customInputLabel}>Or enter custom:</Text>
                    <TextInput
                      style={styles.customInput}
                      value={numberInput.value}
                      onChangeText={numberInput.onChange}
                      keyboardType="numeric"
                      placeholder={numberInput.presets[0].toString()}
                      placeholderTextColor="#666"
                      maxLength={3}
                    />
                  </View>
                </View>
                {numberInput.showDropdown && (
                  <View style={styles.dropdownList}>
                    {numberInput.presets.map((preset) => (
                      <TouchableOpacity
                        key={preset}
                        style={[
                          styles.dropdownItem,
                          parseInt(numberInput.value, 10) === preset && styles.dropdownItemSelected,
                        ]}
                        onPress={() => numberInput.onChange(preset.toString())}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            parseInt(numberInput.value, 10) === preset && styles.dropdownItemTextSelected,
                          ]}
                        >
                          {preset} {numberInput.presetLabel}
                        </Text>
                        {parseInt(numberInput.value, 10) === preset && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Summary section */}
            {summaryItems.length > 0 && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Summary</Text>
                {summaryItems.map((item, index) => (
                  <View key={index} style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>{item.label}:</Text>
                    <Text style={styles.summaryValue}>{item.value}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={[styles.startButton, !canStart && styles.startButtonDisabled]}
                  onPress={onStart}
                  disabled={!canStart}
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primary,
    backgroundColor: COLORS.background.secondary,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text.gold,
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
    color: COLORS.text.primary,
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
    backgroundColor: COLORS.text.gold,
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
    color: COLORS.text.primary,
  },
  optionalText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text.muted,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },
  numberInputTrigger: {
    flex: 1,
  },
  dropdownTriggerText: {
    fontSize: 15,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 12,
    color: COLORS.text.gold,
    marginLeft: 10,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customInputLabel: {
    fontSize: 12,
    color: COLORS.text.muted,
    marginRight: 8,
  },
  customInput: {
    width: 60,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    color: COLORS.text.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primaryDark,
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.text.primary,
    flex: 1,
  },
  dropdownItemTextSelected: {
    color: COLORS.text.gold,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: COLORS.text.gold,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: 'rgba(26, 95, 63, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.gold,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.text.muted,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.status.success,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 16,
  },
  startButtonDisabled: {
    backgroundColor: COLORS.border.primaryDark,
    opacity: 0.6,
  },
  startButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
});
