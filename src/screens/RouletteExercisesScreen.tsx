import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseType } from '../types/roulette.types';
import { BET_CONFIGS } from '../config/betConfigs';

const EXERCISES = [
  {
    id: '1',
    type: ExerciseType.PAYOUT_CALCULATION,
    title: 'Payout Calculation - Straight Ups',
    description: 'Calculate payouts for straight-up bets (35:1). Practice with random numbers and chip amounts.',
    difficulty: 'easy' as const,
    timeLimit: 300,
  },
  {
    id: '2',
    type: ExerciseType.SPLIT_CALCULATION,
    title: 'Payout Calculation - Splits',
    description: 'Calculate payouts for split bets (17:1). Practice with random adjacent numbers and chip amounts.',
    difficulty: 'easy' as const,
    timeLimit: 300,
  },
  {
    id: '3',
    type: ExerciseType.STREET_CALCULATION,
    title: 'Payout Calculation - Streets',
    description: 'Calculate payouts for street bets (11:1). Practice with random 3-number rows and chip amounts.',
    difficulty: 'easy' as const,
    timeLimit: 300,
  },
  {
    id: '4',
    type: ExerciseType.CORNER_CALCULATION,
    title: 'Payout Calculation - Corners',
    description: 'Calculate payouts for corner bets (8:1). Practice with random 4-number squares and chip amounts.',
    difficulty: 'easy' as const,
    timeLimit: 300,
  },
  {
    id: '5',
    type: ExerciseType.SIXLINE_CALCULATION,
    title: 'Payout Calculation - Six Lines',
    description: 'Calculate payouts for six line bets (5:1). Practice with random 6-number double streets and chip amounts.',
    difficulty: 'easy' as const,
    timeLimit: 300,
  },
  {
    id: '6',
    type: ExerciseType.MIXED_CALCULATION,
    title: 'Payout Calculation - Mixed Bets',
    description: 'Calculate total payouts for multiple bets. Combines straight ups (35:1) and splits (17:1).',
    difficulty: 'medium' as const,
    timeLimit: 300,
  },
  {
    id: '7',
    type: ExerciseType.TRIPLE_MIXED_CALCULATION,
    title: 'Payout Calculation - Triple Mix',
    description: 'Calculate total payouts for multiple bets. Combines straight ups (35:1), splits (17:1), and corners (8:1).',
    difficulty: 'hard' as const,
    timeLimit: 300,
  },
  {
    id: '8',
    type: ExerciseType.ALL_POSITIONS_CALCULATION,
    title: 'Payout Calculation - All Positions',
    description: 'Master level! Calculate total payouts combining all bet types: straight ups (35:1), splits (17:1), corners (8:1), streets (11:1), and six lines (5:1).',
    difficulty: 'hard' as const,
    timeLimit: 400,
  },
  {
    id: '9',
    type: ExerciseType.CASH_HANDLING,
    title: 'Cash Handling - Straight Ups',
    description: 'Practice converting payouts to chips + cash. Player requests cash (25, 50, or 75), calculate remaining chips. Example: 105 total with 50 cash = 55 chips.',
    difficulty: 'medium' as const,
    timeLimit: 300,
  },
  {
    id: '10',
    type: ExerciseType.CASH_HANDLING_TWO_DOLLAR,
    title: 'Cash Handling - $2 Chips',
    description: 'Cash handling with $2 chips. Calculate chips + cash breakdown. Cash requests by $50 increments. Example: 105 chips ($210) with $100 cash = 55 chips.',
    difficulty: 'medium' as const,
    timeLimit: 300,
  },
  {
    id: '11',
    type: ExerciseType.CASH_HANDLING_FIVE_DOLLAR,
    title: 'Cash Handling - $5 Chips',
    description: 'Cash handling with $5 chips. Calculate chips + cash breakdown. Cash requests by $100 increments. Example: 105 chips ($525) with $200 cash = 65 chips.',
    difficulty: 'medium' as const,
    timeLimit: 300,
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

  const handleExercisePress = (exercise: any) => {
    // Navigate to dedicated screen based on exercise type
    if (exercise.type === ExerciseType.ROULETTE_LAYOUT) {
      navigation.navigate('RouletteLayoutPractice');
    } else if (exercise.type === ExerciseType.PAYOUT_CALCULATION) {
      navigation.navigate('Calculation', { betConfig: BET_CONFIGS.STRAIGHT_UP });
    } else if (exercise.type === ExerciseType.SPLIT_CALCULATION) {
      navigation.navigate('Calculation', { betConfig: BET_CONFIGS.SPLIT });
    } else if (exercise.type === ExerciseType.STREET_CALCULATION) {
      navigation.navigate('Calculation', { betConfig: BET_CONFIGS.STREET });
    } else if (exercise.type === ExerciseType.CORNER_CALCULATION) {
      navigation.navigate('Calculation', { betConfig: BET_CONFIGS.CORNER });
    } else if (exercise.type === ExerciseType.SIXLINE_CALCULATION) {
      navigation.navigate('Calculation', { betConfig: BET_CONFIGS.SIX_LINE });
    } else if (exercise.type === ExerciseType.MIXED_CALCULATION) {
      navigation.navigate('MixedCalculation');
    } else if (exercise.type === ExerciseType.TRIPLE_MIXED_CALCULATION) {
      navigation.navigate('TripleMixedCalculation');
    } else if (exercise.type === ExerciseType.ALL_POSITIONS_CALCULATION) {
      navigation.navigate('AllPositionsCalculation');
    } else if (exercise.type === ExerciseType.CASH_HANDLING) {
      navigation.navigate('CashHandling');
    } else if (exercise.type === ExerciseType.CASH_HANDLING_TWO_DOLLAR) {
      navigation.navigate('CashHandlingTwoDollar');
    } else if (exercise.type === ExerciseType.CASH_HANDLING_FIVE_DOLLAR) {
      navigation.navigate('CashHandlingFiveDollar');
    } else {
      navigation.navigate('RouletteTraining', { exercise });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roulette Exercises</Text>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {EXERCISES.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => handleExercisePress(exercise)}
          >
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
                <Text style={styles.difficultyText}>{exercise.difficulty.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
            {exercise.timeLimit && (
              <Text style={styles.timeLimit}>⏱️ Time Limit: {exercise.timeLimit}s</Text>
            )}
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
  timeLimit: {
    color: '#FFD700',
    fontSize: 12,
    marginTop: 10,
    fontWeight: '600',
  },
});
