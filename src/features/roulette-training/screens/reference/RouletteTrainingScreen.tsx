import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSelectedChipValue, placeBet } from '@store/rouletteSlice';
import RouletteLayout from '@components/roulette/RouletteLayout';
import Racetrack from '@components/Racetrack';
import ChipSelector from '@components/ChipSelector';
import { RouletteNumber } from '@app-types/roulette.types';
import { BetType } from '@app-types/roulette.types';
import { useTheme } from '@contexts/ThemeContext';
import type { RouletteTrainingStackParamList } from '../../navigation';

type RouletteTrainingScreenRouteProp = RouteProp<RouletteTrainingStackParamList, 'RouletteTraining'>;

interface RouletteTrainingScreenProps {
  route: RouletteTrainingScreenRouteProp;
}

export default function RouletteTrainingScreen({ route }: RouletteTrainingScreenProps) {
  const { exercise } = route.params;
  const dispatch = useAppDispatch();
  const selectedChipValue = useAppSelector(state => state.roulette.selectedChipValue);
  const [highlightedNumbers, setHighlightedNumbers] = useState<RouletteNumber[]>([]);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const handleNumberPress = (number: RouletteNumber) => {
    // Add number to highlighted list
    setHighlightedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      return [...prev, number];
    });

    // Create a bet
    const bet = {
      id: `${Date.now()}-${number}`,
      type: BetType.STRAIGHT,
      numbers: [number],
      amount: selectedChipValue,
      payout: 35,
      timestamp: Date.now(),
    };

    dispatch(placeBet(bet));

    Alert.alert(
      'Bet Placed',
      `${selectedChipValue} on number ${number}`,
      [{ text: 'OK' }]
    );
  };

  const handleChipSelect = (value: number) => {
    dispatch(setSelectedChipValue(value));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.description}>{exercise.description}</Text>
      </View>

      <ChipSelector
        selectedValue={selectedChipValue}
        onSelectChip={handleChipSelect}
      />

      <RouletteLayout
        onNumberPress={handleNumberPress}
      />

      <Racetrack
        onNumberPress={handleNumberPress}
        highlightedNumbers={highlightedNumbers}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Tap numbers on the layout or racetrack to place bets
        </Text>
      </View>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.primary,
    },
    header: {
      backgroundColor: colors.background.secondary,
      borderBottomColor: colors.border.gold,
      borderBottomWidth: 2,
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text.gold,
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: colors.text.primary,
    },
    infoBox: {
      backgroundColor: colors.background.secondary,
      padding: 16,
      margin: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border.gold,
      marginBottom: 24,
    },
    infoText: {
      color: colors.text.primary,
      fontSize: 14,
      textAlign: 'center',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}
