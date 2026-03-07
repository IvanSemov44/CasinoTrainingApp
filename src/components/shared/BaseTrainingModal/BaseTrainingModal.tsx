import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useModalAnimation } from '../useModalAnimation/useModalAnimation';
import { DropdownSelector } from '../DropdownSelector/DropdownSelector';
import type { BaseTrainingModalProps } from './BaseTrainingModal.types';
import { makeStyles } from './BaseTrainingModal.styles';

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
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { fadeAnim, scaleAnim } = useModalAnimation(visible);
  const AnimatedView = Animated.View ?? View;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (Platform.OS === 'web' && visible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }

    return undefined;
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
      <AnimatedView style={[styles.overlay, { opacity: fadeAnim }]}>
        <AnimatedView style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
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
            {steps.map(step => (
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
                    <Text style={styles.dropdownArrow}>{numberInput.showDropdown ? '▲' : '▼'}</Text>
                  </TouchableOpacity>
                  <View style={styles.customInputContainer}>
                    <Text style={styles.customInputLabel}>Or enter custom:</Text>
                    <TextInput
                      style={styles.customInput}
                      value={numberInput.value}
                      onChangeText={numberInput.onChange}
                      keyboardType="numeric"
                      placeholder={numberInput.presets[0].toString()}
                      placeholderTextColor={colors.text.placeholder}
                      maxLength={3}
                    />
                  </View>
                </View>
                {numberInput.showDropdown && (
                  <View style={styles.dropdownList}>
                    {numberInput.presets.map(preset => (
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
                            parseInt(numberInput.value, 10) === preset &&
                              styles.dropdownItemTextSelected,
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

            {summaryItems.length > 0 && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Summary</Text>
                {summaryItems.map(item => (
                  <View key={`${item.label}-${item.value}`} style={styles.summaryRow}>
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
        </AnimatedView>
      </AnimatedView>
    </Modal>
  );
}

export default BaseTrainingModal;
