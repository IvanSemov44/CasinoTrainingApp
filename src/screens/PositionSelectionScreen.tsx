import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseType } from '../types/roulette.types';
import { BET_CONFIGS } from '../config/betConfigs';
import { CASH_CONFIGS } from '../config/cashConfigs';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onPress: () => void;
}

export default function PositionSelectionScreen({ route, navigation }: any) {
  const { positionType } = route.params;

  const getExercisesForPosition = (): Exercise[] => {
    switch (positionType) {
      case 'STRAIGHT_UP':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for straight-up bets (35:1). Practice with random numbers and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfig: BET_CONFIGS.STRAIGHT_UP }),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Cash requests: 25, 50, or 75. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfig: CASH_CONFIGS.ONE_DOLLAR }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Cash requests by $50 increments. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfig: CASH_CONFIGS.TWO_DOLLAR }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Cash requests by $100 increments. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfig: CASH_CONFIGS.FIVE_DOLLAR }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Cash requests by $100 increments. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfig: CASH_CONFIGS.TEN_DOLLAR }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Cash requests by $500 increments. Calculate chips + cash breakdown.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { cashConfig: CASH_CONFIGS.TWENTY_FIVE_DOLLAR }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Cash requests by $500 increments. Calculate chips + cash breakdown.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { cashConfig: CASH_CONFIGS.ONE_HUNDRED_DOLLAR }),
          },
        ];
      case 'SPLIT':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for split bets (17:1). Practice with random adjacent numbers and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfig: BET_CONFIGS.SPLIT }),
          },
        ];
      case 'STREET':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for street bets (11:1). Practice with random 3-number rows and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfig: BET_CONFIGS.STREET }),
          },
        ];
      case 'CORNER':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for corner bets (8:1). Practice with random 4-number squares and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfig: BET_CONFIGS.CORNER }),
          },
        ];
      case 'SIX_LINE':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for six line bets (5:1). Practice with random 6-number double streets and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfig: BET_CONFIGS.SIX_LINE }),
          },
        ];
      default:
        return [];
    }
  };

  const getPositionTitle = (): string => {
    switch (positionType) {
      case 'STRAIGHT_UP': return 'Straight Up';
      case 'SPLIT': return 'Split';
      case 'STREET': return 'Street';
      case 'CORNER': return 'Corner';
      case 'SIX_LINE': return 'Six Line';
      default: return 'Position';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#666666';
    }
  };

  const exercises = getExercisesForPosition();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getPositionTitle()}</Text>
      <Text style={styles.subtitle}>Choose your training mode</Text>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={exercise.onPress}
          >
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
                <Text style={styles.difficultyText}>{exercise.difficulty.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  exerciseCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 12,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
