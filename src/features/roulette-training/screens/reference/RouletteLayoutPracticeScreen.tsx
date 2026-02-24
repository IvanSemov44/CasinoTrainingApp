import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSelectedChipValue, placeBet, clearBets } from '@store/rouletteSlice';
import RouletteLayout from '@components/roulette/RouletteLayout';
import ChipSelector from '@components/ChipSelector';
import { RouletteNumber } from '@app-types/roulette.types';
import { BetType } from '@app-types/roulette.types';
import { getNumberColor } from '@constants/roulette.constants';
import { getPayoutForBetType } from '@features/roulette-training/constants/payouts';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '@features/roulette-training/constants/theme';
import type { RouletteTrainingStackParamList } from '../../navigation';

type RouletteLayoutPracticeNavigationProp = StackNavigationProp<RouletteTrainingStackParamList, 'RouletteLayoutPractice'>;

interface RouletteLayoutPracticeScreenProps {
  navigation: RouletteLayoutPracticeNavigationProp;
}

export default function RouletteLayoutPracticeScreen({ navigation }: RouletteLayoutPracticeScreenProps) {
  const dispatch = useAppDispatch();
  const selectedChipValue = useAppSelector(state => state.roulette.selectedChipValue);
  const placedBets = useAppSelector(state => state.roulette.placedBets);
  const [_highlightedNumbers, setHighlightedNumbers] = useState<RouletteNumber[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<RouletteNumber | null>(null);

  const handleNumberPress = (number: RouletteNumber) => {
    setSelectedNumber(number);
    
    // Toggle highlight
    setHighlightedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      return [...prev, number];
    });
  };

  const handleBetAreaPress = (betType: BetType, numbers: RouletteNumber[]) => {
    // Create a bet
    const bet = {
      id: `${Date.now()}-${numbers.join('-')}`,
      type: betType,
      numbers: numbers,
      amount: 1,
      payout: getPayoutForBetType(betType),
      timestamp: Date.now(),
    };

    dispatch(placeBet(bet));
    
    // Show bet info
    const color = getNumberColor(numbers[0]);
    const colorText = color === 'red' ? '🔴 Red' : color === 'black' ? '⚫ Black' : '🟢 Green';
    
    Alert.alert(
      `${betType} Bet`,
      `Numbers: ${numbers.join(', ')}\n${numbers.length === 1 ? colorText : ''}\nChip Value: ${selectedChipValue}\nPayout: ${getPayoutForBetType(betType)}:1`,
      [{ text: 'OK' }]
    );
  };

  const handleChipSelect = (value: number) => {
    dispatch(setSelectedChipValue(value));
  };

  const handleClearBets = () => {
    dispatch(clearBets());
    setHighlightedNumbers([]);
    setSelectedNumber(null);
    Alert.alert('Cleared', 'All bets have been cleared', [{ text: 'OK' }]);
  };

  const getTotalBetAmount = () => {
    return placedBets.reduce((sum, bet) => sum + bet.amount, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header with stats */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Roulette Layout Practice</Text>
        <Text style={styles.headerSubtitle}>Learn the table layout and number positions</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Bets</Text>
            <Text style={styles.statValue}>{placedBets.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Amount</Text>
            <Text style={styles.statValue}>${getTotalBetAmount()}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Selected</Text>
            <Text style={styles.statValue}>{selectedNumber ?? '-'}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Chip Selector */}
        <ChipSelector 
          selectedValue={selectedChipValue}
          onSelectChip={handleChipSelect}
        />
        
        {/* Roulette Layout */}
        <View style={styles.layoutContainer}>
          <RouletteLayout 
            onNumberPress={handleNumberPress}
            onBetAreaPress={handleBetAreaPress}
            placedBets={placedBets}
            selectedChipValue={selectedChipValue}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 How to Practice:</Text>
          <Text style={styles.infoText}>
            • Tap any number to see its color and position{'\n'}
            • Select different chip values to practice betting{'\n'}
            • Numbers turn yellow when selected{'\n'}
            • Red numbers: 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36{'\n'}
            • Black numbers: All other numbers except 0{'\n'}
            • Green: 0 (zero)
          </Text>
        </View>

        {/* Layout Guide */}
        <View style={styles.guideSection}>
          <Text style={styles.guideTitle}>📋 Table Layout Guide:</Text>
          <View style={styles.guideContent}>
            <Text style={styles.guideText}>
              <Text style={styles.guideBold}>Top Row:</Text> 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36{'\n'}
              <Text style={styles.guideBold}>Middle Row:</Text> 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35{'\n'}
              <Text style={styles.guideBold}>Bottom Row:</Text> 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34{'\n\n'}
              <Text style={styles.guideBold}>Outside Bets:</Text>{'\n'}
              • Dozens: 1-12, 13-24, 25-36 (Pays 2:1){'\n'}
              • Columns: Top, Middle, Bottom rows (Pays 2:1){'\n'}
              • Even Money: Red/Black, Even/Odd, 1-18/19-36 (Pays 1:1)
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.clearButton]}
            onPress={handleClearBets}
          >
            <Text style={styles.buttonText}>🗑️ Clear All Bets</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>⬅️ Back to Exercises</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderBottomWidth: BORDERS.width.medium,
    borderBottomColor: COLORS.border.gold,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
    color: COLORS.text.gold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.sm,
  },
  layoutContainer: {
    marginTop: SPACING.sm,
  },
  infoSection: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: BORDERS.radius.md,
    marginTop: SPACING.md,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.gold,
  },
  infoTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.primary,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  guideSection: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: BORDERS.radius.md,
    marginTop: SPACING.md,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.primary,
  },
  guideTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
  },
  guideContent: {
    backgroundColor: COLORS.background.dark,
    padding: 12,
    borderRadius: BORDERS.radius.sm,
  },
  guideText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.primary,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  guideBold: {
    fontWeight: 'bold',
    color: COLORS.text.gold,
  },
  actionButtons: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
  },
  clearButton: {
    backgroundColor: COLORS.status.error,
    borderColor: COLORS.status.error,
  },
  backButton: {
    backgroundColor: COLORS.background.secondary,
    borderColor: COLORS.border.gold,
  },
  buttonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
