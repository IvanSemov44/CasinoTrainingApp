import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseType } from '../../../../types/roulette.types';
import type { BetConfigKey } from '../../../../config/betConfigs';
import type { CashConfigKey } from '../../../../config/cashConfigs';

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
            onPress: () => navigation.navigate('Calculation', { betConfigKey: 'STRAIGHT_UP' as BetConfigKey }),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Cash requests: 25, 50, or 75. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Cash requests by $50 increments. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Cash requests by $100 increments. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Cash requests by $100 increments. Calculate chips + cash breakdown.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Cash requests by $500 increments. Calculate chips + cash breakdown.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Cash requests by $500 increments. Calculate chips + cash breakdown.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
          },
        ];
      case 'SPLIT':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for split bets (17:1). Practice with random adjacent numbers and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfigKey: 'SPLIT' as BetConfigKey }),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Cash requests and chip/cash breakdown for split bets (17:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SPLIT' as BetConfigKey, cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Cash requests and chip/cash breakdown for split bets (17:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SPLIT' as BetConfigKey, cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Cash requests and chip/cash breakdown for split bets (17:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SPLIT' as BetConfigKey, cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Cash requests and chip/cash breakdown for split bets (17:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SPLIT' as BetConfigKey, cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Cash requests and chip/cash breakdown for split bets (17:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SPLIT' as BetConfigKey, cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Cash requests and chip/cash breakdown for split bets (17:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SPLIT' as BetConfigKey, cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
          },
        ];
      case 'STREET':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for street bets (11:1). Practice with random 3-number rows and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfigKey: 'STREET' as BetConfigKey }),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Cash requests and chip/cash breakdown for street bets (11:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'STREET' as BetConfigKey, cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Cash requests and chip/cash breakdown for street bets (11:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'STREET' as BetConfigKey, cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Cash requests and chip/cash breakdown for street bets (11:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'STREET' as BetConfigKey, cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Cash requests and chip/cash breakdown for street bets (11:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'STREET' as BetConfigKey, cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Cash requests and chip/cash breakdown for street bets (11:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'STREET' as BetConfigKey, cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Cash requests and chip/cash breakdown for street bets (11:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'STREET' as BetConfigKey, cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
          },
        ];
      case 'CORNER':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for corner bets (8:1). Practice with random 4-number squares and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfigKey: 'CORNER' as BetConfigKey }),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Cash requests and chip/cash breakdown for corner bets (8:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'CORNER' as BetConfigKey, cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Cash requests and chip/cash breakdown for corner bets (8:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'CORNER' as BetConfigKey, cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Cash requests and chip/cash breakdown for corner bets (8:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'CORNER' as BetConfigKey, cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Cash requests and chip/cash breakdown for corner bets (8:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'CORNER' as BetConfigKey, cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Cash requests and chip/cash breakdown for corner bets (8:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'CORNER' as BetConfigKey, cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Cash requests and chip/cash breakdown for corner bets (8:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'CORNER' as BetConfigKey, cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
          },
        ];
      case 'SIX_LINE':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate payouts for six line bets (5:1). Practice with random 6-number double streets and chip amounts.',
            difficulty: 'easy',
            onPress: () => navigation.navigate('Calculation', { betConfigKey: 'SIX_LINE' as BetConfigKey }),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Cash requests and chip/cash breakdown for six line bets (5:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SIX_LINE' as BetConfigKey, cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Cash requests and chip/cash breakdown for six line bets (5:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SIX_LINE' as BetConfigKey, cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Cash requests and chip/cash breakdown for six line bets (5:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SIX_LINE' as BetConfigKey, cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Cash requests and chip/cash breakdown for six line bets (5:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SIX_LINE' as BetConfigKey, cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Cash requests and chip/cash breakdown for six line bets (5:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SIX_LINE' as BetConfigKey, cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Cash requests and chip/cash breakdown for six line bets (5:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('CashHandling', { betConfigKey: 'SIX_LINE' as BetConfigKey, cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
          },
        ];
      case 'MIXED_CALCULATION':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Calculate total payouts combining straight ups (35:1) and splits (17:1).',
            difficulty: 'medium',
            onPress: () => navigation.navigate('MixedCalculation'),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Mixed bets with $1 chips. Calculate total payout with cash denomination.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('MixedCalculation', { cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Mixed bets with $2 chips. Calculate total payout with cash denomination.',
            difficulty: 'medium',
            onPress: () => navigation.navigate('MixedCalculation', { cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Mixed bets with $5 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('MixedCalculation', { cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Mixed bets with $10 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('MixedCalculation', { cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Mixed bets with $25 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('MixedCalculation', { cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Mixed bets with $100 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('MixedCalculation', { cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
          },
        ];
      case 'TRIPLE_MIXED_CALCULATION':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Combines straight ups (35:1), splits (17:1), and corners (8:1).',
            difficulty: 'hard',
            onPress: () => navigation.navigate('TripleMixedCalculation'),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'Triple mixed bets with $1 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('TripleMixedCalculation', { cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'Triple mixed bets with $2 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('TripleMixedCalculation', { cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'Triple mixed bets with $5 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('TripleMixedCalculation', { cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'Triple mixed bets with $10 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('TripleMixedCalculation', { cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'Triple mixed bets with $25 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('TripleMixedCalculation', { cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'Triple mixed bets with $100 chips. Calculate total payout with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('TripleMixedCalculation', { cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
          },
        ];
      case 'ALL_POSITIONS_CALCULATION':
        return [
          {
            id: '1',
            title: 'Payout Calculation',
            description: 'Master level! Combines all bet types: straight ups, splits, corners, streets, and six lines.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('AllPositionsCalculation'),
          },
          {
            id: '2',
            title: 'Cash Handling - $1 Chips',
            description: 'All positions with $1 chips. Ultimate challenge with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('AllPositionsCalculation', { cashConfigKey: 'ONE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '3',
            title: 'Cash Handling - $2 Chips',
            description: 'All positions with $2 chips. Ultimate challenge with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('AllPositionsCalculation', { cashConfigKey: 'TWO_DOLLAR' as CashConfigKey }),
          },
          {
            id: '4',
            title: 'Cash Handling - $5 Chips',
            description: 'All positions with $5 chips. Ultimate challenge with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('AllPositionsCalculation', { cashConfigKey: 'FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '5',
            title: 'Cash Handling - $10 Chips',
            description: 'All positions with $10 chips. Ultimate challenge with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('AllPositionsCalculation', { cashConfigKey: 'TEN_DOLLAR' as CashConfigKey }),
          },
          {
            id: '6',
            title: 'Cash Handling - $25 Chips',
            description: 'All positions with $25 chips. Ultimate challenge with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('AllPositionsCalculation', { cashConfigKey: 'TWENTY_FIVE_DOLLAR' as CashConfigKey }),
          },
          {
            id: '7',
            title: 'Cash Handling - $100 Chips',
            description: 'All positions with $100 chips. Ultimate challenge with cash denomination.',
            difficulty: 'hard',
            onPress: () => navigation.navigate('AllPositionsCalculation', { cashConfigKey: 'ONE_HUNDRED_DOLLAR' as CashConfigKey }),
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
