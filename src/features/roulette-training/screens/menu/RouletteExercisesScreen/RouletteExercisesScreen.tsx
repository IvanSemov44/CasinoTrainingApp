import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TrainingSelectionModal } from '@components/roulette';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { useModalState } from '@hooks/useModalState';
import { InfoSection } from '@components/shared';
import type { AppColors } from '@styles/themes';
import type { RouletteTrainingStackParamList } from '../../../navigation';

type RouletteExercisesScreenProps = StackScreenProps<
  RouletteTrainingStackParamList,
  'RouletteExercises'
>;

export default function RouletteExercisesScreen(_props: RouletteExercisesScreenProps) {
  const modal = useModalState();
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Roulette Training</Text>
        <Text style={styles.subtitle}>Master payout calculations for all bet types</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={modal.open}
          accessibilityLabel="Start Training"
          accessibilityRole="button"
        >
          <Text style={styles.startButtonIcon}>🎯</Text>
          <Text style={styles.startButtonText}>Start Training</Text>
          <Text style={styles.startButtonHint}>Select from all available exercises</Text>
        </TouchableOpacity>

        <InfoSection title="Available Training Types">
          <View style={styles.trainingTypesList}>
            <Text style={styles.trainingTypeItem}>• Straight Up (35:1)</Text>
            <Text style={styles.trainingTypeItem}>• Split (17:1)</Text>
            <Text style={styles.trainingTypeItem}>• Street (11:1)</Text>
            <Text style={styles.trainingTypeItem}>• Corner (8:1)</Text>
            <Text style={styles.trainingTypeItem}>• Six Line (5:1)</Text>
            <Text style={styles.trainingTypeItem}>• Mixed Bets</Text>
            <Text style={styles.trainingTypeItem}>• Cash Handling</Text>
          </View>
        </InfoSection>
      </View>

      <TrainingSelectionModal visible={modal.isVisible} onClose={modal.close} />
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text.gold,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    content: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
    },
    startButton: {
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      padding: 30,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.gold,
      marginTop: 20,
    },
    startButtonIcon: {
      fontSize: 48,
      marginBottom: 12,
    },
    startButtonText: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 8,
    },
    startButtonHint: {
      fontSize: 14,
      color: colors.text.muted,
    },
    trainingTypesList: {
      gap: 6,
    },
    trainingTypeItem: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
  });
}
