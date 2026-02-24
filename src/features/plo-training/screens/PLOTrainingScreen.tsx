import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { PokerTable } from '../components';
import type { PLOStackParamList } from '../navigation';

type PLOTrainingScreenProps = StackScreenProps<PLOStackParamList, 'PLOTraining'>;

export default function PLOTrainingScreen({ route }: PLOTrainingScreenProps) {
  const { mode } = route.params;
  const [score, _setScore] = useState(0);

  // Sample player data
  const [players] = useState([
    { position: 1, name: 'Player 1', chipAmount: 500, isDealer: false },
    { position: 2, name: 'Player 2', chipAmount: 350, isDealer: false },
    { position: 3, name: 'Player 3', chipAmount: 420, isDealer: true },
    { position: 4, name: 'Player 4', chipAmount: 680, isDealer: false },
    { position: 5, name: 'Player 5', chipAmount: 290, isDealer: false },
    { position: 6, name: 'Player 6', chipAmount: 540, isDealer: false },
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.modeText}>{mode.toUpperCase()} MODE</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.tableWrapper}>
        <PokerTable players={players} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  tableWrapper: {
    marginVertical: SPACING.xl,
    alignItems: 'center',
    flex: 1,
  },
});
