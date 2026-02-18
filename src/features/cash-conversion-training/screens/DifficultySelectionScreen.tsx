import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { DifficultyLevel } from '../types';
import { DIFFICULTY_MAX_BET } from '../constants/sectors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DifficultySelectionScreen({ navigation }: any) {
  const handleDifficultySelect = (difficulty: DifficultyLevel) => {
    navigation.navigate('CashConversionSectorSelection', { difficulty });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Select Difficulty</Text>
      <Text style={styles.subtitle}>Choose maximum bet per position</Text>

      <TouchableOpacity
        style={[styles.card, styles.easyCard]}
        onPress={() => handleDifficultySelect('easy')}
      >
        <Text style={styles.cardIcon}>🟢</Text>
        <Text style={styles.cardTitle}>Easy</Text>
        <Text style={styles.cardDescription}>Max ${DIFFICULTY_MAX_BET.easy} per position</Text>
        <Text style={styles.cardExample}>Example: Tier (6 pos) = ${DIFFICULTY_MAX_BET.easy * 6} max</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.mediumCard]}
        onPress={() => handleDifficultySelect('medium')}
      >
        <Text style={styles.cardIcon}>🟡</Text>
        <Text style={styles.cardTitle}>Medium</Text>
        <Text style={styles.cardDescription}>Max ${DIFFICULTY_MAX_BET.medium} per position</Text>
        <Text style={styles.cardExample}>Example: Voisins (9 pos) = ${DIFFICULTY_MAX_BET.medium * 9} max</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.hardCard]}
        onPress={() => handleDifficultySelect('hard')}
      >
        <Text style={styles.cardIcon}>🔴</Text>
        <Text style={styles.cardTitle}>Hard</Text>
        <Text style={styles.cardDescription}>Max ${DIFFICULTY_MAX_BET.hard} per position</Text>
        <Text style={styles.cardExample}>Example: Orphelins (5 pos) = ${DIFFICULTY_MAX_BET.hard * 5} max</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.gold,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.xl,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    borderWidth: 3,
    alignItems: 'center',
  },
  easyCard: {
    borderColor: '#22c55e',
  },
  mediumCard: {
    borderColor: '#eab308',
  },
  hardCard: {
    borderColor: '#ef4444',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.gold,
    marginBottom: SPACING.xs,
  },
  cardExample: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});
