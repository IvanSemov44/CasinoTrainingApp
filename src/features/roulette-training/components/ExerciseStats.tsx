import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ExerciseStatsProps {
  score: number;
  attempts: number;
}

export default function ExerciseStats({ score, attempts }: ExerciseStatsProps) {
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <View style={styles.header}>
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>Score: {score}/{attempts}</Text>
        <Text style={styles.statsText}>Accuracy: {accuracy}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '600',
  },
});
