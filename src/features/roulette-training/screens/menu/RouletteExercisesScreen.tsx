import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TrainingSelectionModal } from '@components/roulette';
import { useTheme } from '@contexts/ThemeContext';
import type { RouletteTrainingStackParamList } from '../../navigation';

type RouletteExercisesScreenProps = StackScreenProps<RouletteTrainingStackParamList, 'RouletteExercises'>;

export default function RouletteExercisesScreen(_props: RouletteExercisesScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Roulette Training</Text>
        <Text style={styles.subtitle}>Master payout calculations for all bet types</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleOpenModal}
          accessibilityLabel="Start Training"
          accessibilityRole="button"
        >
          <Text style={styles.startButtonIcon}>🎯</Text>
          <Text style={styles.startButtonText}>Start Training</Text>
          <Text style={styles.startButtonHint}>Select from all available exercises</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Available Training Types</Text>
          <View style={styles.trainingTypesList}>
            <Text style={styles.trainingTypeItem}>• Straight Up (35:1)</Text>
            <Text style={styles.trainingTypeItem}>• Split (17:1)</Text>
            <Text style={styles.trainingTypeItem}>• Street (11:1)</Text>
            <Text style={styles.trainingTypeItem}>• Corner (8:1)</Text>
            <Text style={styles.trainingTypeItem}>• Six Line (5:1)</Text>
            <Text style={styles.trainingTypeItem}>• Mixed Bets</Text>
            <Text style={styles.trainingTypeItem}>• Cash Handling</Text>
          </View>
        </View>
      </View>

      <TrainingSelectionModal
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
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
    infoSection: {
      marginTop: 40,
      padding: 20,
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      width: '100%',
      maxWidth: 400,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.gold,
      marginBottom: 12,
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
  /* eslint-enable react-native/no-unused-styles */
}
