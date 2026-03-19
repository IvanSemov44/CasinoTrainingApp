import React, { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, ScrollView, Platform } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { useModalAnimation } from '../useModalAnimation/useModalAnimation';
import type { BaseTrainingModalProps } from './BaseTrainingModal.types';
import { makeStyles } from './BaseTrainingModal.styles';
import BaseTrainingModalSteps from './BaseTrainingModalSteps';
import BaseTrainingModalNumberInput from './BaseTrainingModalNumberInput';
import BaseTrainingModalSummary from './BaseTrainingModalSummary';

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
  const styles = useThemedStyles(makeStyles);
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
            <BaseTrainingModalSteps steps={steps} />
            {numberInput && <BaseTrainingModalNumberInput numberInput={numberInput} />}
            <BaseTrainingModalSummary
              summaryItems={summaryItems}
              canStart={canStart}
              onStart={onStart}
            />
          </ScrollView>
        </AnimatedView>
      </AnimatedView>
    </Modal>
  );
}

export default BaseTrainingModal;
