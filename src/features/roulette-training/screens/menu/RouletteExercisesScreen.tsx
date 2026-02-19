import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TrainingSelectionModal } from '@components/roulette';
import type { RouletteTrainingStackParamList } from '../../navigation';

type RouletteExercisesScreenProps = StackScreenProps<RouletteTrainingStackParamList, 'RouletteExercises'>;

export default function RouletteExercisesScreen({ navigation }: RouletteExercisesScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f1f',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a7f4f',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#1a5f3f',
    borderRadius: 16,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a7f4f',
    marginTop: 20,
  },
  startButtonIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  startButtonHint: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  infoSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgba(26, 95, 63, 0.5)',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 12,
  },
  trainingTypesList: {
    gap: 6,
  },
  trainingTypeItem: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
});
