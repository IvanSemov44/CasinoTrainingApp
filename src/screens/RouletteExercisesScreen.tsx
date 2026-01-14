import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseType } from '../types/roulette.types';

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
      navigation.navigate('PayoutCalculation');
    } else if (exercise.type === ExerciseType.SPLIT_CALCULATION) {
      navigation.navigate('SplitCalculation');
    } else if (exercise.type === ExerciseType.STREET_CALCULATION) {
      navigation.navigate('StreetCalculation');
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
