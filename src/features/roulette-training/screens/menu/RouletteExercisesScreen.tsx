import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseType } from '../types/roulette.types';
import { BET_CONFIGS } from '../config/betConfigs';

const POSITION_CATEGORIES = [
  {
    id: '1',
    type: 'STRAIGHT_UP',
    title: 'Straight Up',
    description: 'Single number bets (35:1). Includes payout calculations and cash handling.',
    difficulty: 'easy' as const,
    hasMultipleVersions: true,
  },
  {
    id: '2',
    type: 'SPLIT',
    title: 'Split',
    description: 'Two adjacent numbers (17:1). Payout calculations.',
    difficulty: 'easy' as const,
    hasMultipleVersions: true,
  },
  {
    id: '3',
    type: 'STREET',
    title: 'Street',
    description: 'Three numbers in a row (11:1). Payout calculations.',
    difficulty: 'easy' as const,
    hasMultipleVersions: true,
  },
  {
    id: '4',
    type: 'CORNER',
    title: 'Corner',
    description: 'Four numbers (8:1). Payout calculations.',
    difficulty: 'easy' as const,
    hasMultipleVersions: true,
  },
  {
    id: '5',
    type: 'SIX_LINE',
    title: 'Six Line',
    description: 'Six numbers - double street (5:1). Payout calculations.',
    difficulty: 'easy' as const,
    hasMultipleVersions: true,
  },
  {
    id: '6',
    type: 'MIXED_CALCULATION',
    title: 'Mixed Bets - Straight & Split',
    description: 'Calculate total payouts combining straight ups (35:1) and splits (17:1).',
    difficulty: 'medium' as const,
    hasMultipleVersions: true,
  },
  {
    id: '7',
    type: 'TRIPLE_MIXED_CALCULATION',
    title: 'Mixed Bets - Triple Mix',
    description: 'Combines straight ups (35:1), splits (17:1), and corners (8:1).',
    difficulty: 'hard' as const,
    hasMultipleVersions: true,
  },
  {
    id: '8',
    type: 'ALL_POSITIONS_CALCULATION',
    title: 'All Positions - Master Level',
    description: 'Calculate total payouts combining all bet types: straight ups, splits, corners, streets, and six lines.',
    difficulty: 'hard' as const,
    hasMultipleVersions: true,
  },
];

export default function RouletteExercisesScreen({ navigation }: any) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#666666';
    }
  };

  const handleExercisePress = (category: any) => {
    // Navigate to position selection screen for all positions
    navigation.navigate('PositionSelection', { positionType: category.type });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roulette Exercises</Text>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {POSITION_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.exerciseCard}
            onPress={() => handleExercisePress(category)}
          >
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseTitle}>{category.title}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(category.difficulty) }]}>
                <Text style={styles.difficultyText}>{category.difficulty.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.exerciseDescription}>{category.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f1f',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  exerciseCard: {
    backgroundColor: '#1a5f3f',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#2a7f4f',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  exerciseDescription: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 20,
  },
  versionsText: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
