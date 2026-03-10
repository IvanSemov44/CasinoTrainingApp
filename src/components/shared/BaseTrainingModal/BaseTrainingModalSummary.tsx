import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { SummaryItem } from './BaseTrainingModal.types';
import { makeStyles } from './BaseTrainingModal.styles';

interface BaseTrainingModalSummaryProps {
  summaryItems: SummaryItem[];
  canStart: boolean;
  onStart: () => void;
}

export default function BaseTrainingModalSummary({
  summaryItems,
  canStart,
  onStart,
}: BaseTrainingModalSummaryProps) {
  const styles = useThemedStyles(makeStyles);

  if (summaryItems.length === 0) {
    return null;
  }

  return (
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
  );
}
