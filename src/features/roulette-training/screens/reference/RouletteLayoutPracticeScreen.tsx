import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSelectedChipValue, placeBet, clearBets } from '@store/rouletteSlice';
import RouletteLayout from '@components/roulette/RouletteLayout';
import ChipSelector from '@components/ChipSelector';
import { RouletteNumber } from '@app-types/roulette.types';
import { BetType } from '@app-types/roulette.types';
import { getNumberColor } from '@constants/roulette.constants';
import { getPayoutForBetType } from '@features/roulette-training/constants/payouts';
import { useTheme } from '@contexts/ThemeContext';
import { LayoutPracticeHeader } from '../../components/LayoutPracticeHeader';
import { LayoutPracticeGuides } from '../../components/LayoutPracticeGuides';
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
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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
      <LayoutPracticeHeader
        totalBets={placedBets.length}
        totalAmount={getTotalBetAmount()}
        selectedNumber={selectedNumber}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ChipSelector
          selectedValue={selectedChipValue}
          onSelectChip={handleChipSelect}
        />

        <View style={styles.layoutContainer}>
          <RouletteLayout
            onNumberPress={handleNumberPress}
            onBetAreaPress={handleBetAreaPress}
            placedBets={placedBets}
            selectedChipValue={selectedChipValue}
          />
        </View>

        <LayoutPracticeGuides />

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 8,
    },
    layoutContainer: {
      marginTop: 8,
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
      backgroundColor: colors.status.error,
      borderColor: colors.status.error,
    },
    backButton: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.gold,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
}
